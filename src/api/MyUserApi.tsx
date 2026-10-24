import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const getApiUrl = () => {
  if (!API_BASE_URL) throw new TypeError("Profile API is not configured");
  return `${API_BASE_URL}/api/my/user`;
};

const localProfileKey = (auth0Id: string) => `pizzeria-profile:${auth0Id}`;

const getLocalProfile = (auth0Id?: string): User | null => {
  if (!auth0Id) return null;
  const value = localStorage.getItem(localProfileKey(auth0Id));
  return value ? (JSON.parse(value) as User) : null;
};

const saveLocalProfile = (auth0Id: string, profile: User) => {
  localStorage.setItem(localProfileKey(auth0Id), JSON.stringify(profile));
  return profile;
};

const getErrorMessage = async (response: Response, fallback: string) => {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message || fallback;
  } catch {
    return fallback;
  }
};

const isBackendUnavailable = (error: unknown) => error instanceof TypeError;

export const useGetMyUser = () => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const fetchCurrentUser = async (): Promise<User | null> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(getApiUrl(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      // A new Auth0 user has no application profile yet.
      if (response.status === 404) return getLocalProfile(user?.sub);
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Unable to load user profile"));
      }
      return response.json() as Promise<User>;
    } catch (error) {
      // Without a backend, use the browser-local profile instead of showing
      // "Failed to fetch" and blocking the profile form.
      if (isBackendUnavailable(error)) return getLocalProfile(user?.sub);
      throw error;
    }
  };

  const query = useQuery({
    queryKey: ["currentUser", user?.sub],
    queryFn: fetchCurrentUser,
    enabled: isAuthenticated,
    retry: false,
  });

  return {
    currentUser: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
};

type CreateUserRequest = { auth0Id: string; email: string };

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createUserFn = async (userData: CreateUserRequest): Promise<void> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Failed to create user"));
      }
    } catch (error) {
      // The local profile is written by the update mutation after this step.
      if (!isBackendUnavailable(error)) throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUserFn,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("User created!");
    },
    onError(error) {
      toast.error(error instanceof Error ? error.message : "Failed to create user");
    },
  });

  return {
    createUser: mutation.mutateAsync,
    isCreating: mutation.isPending,
    createError: mutation.error,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const queryClient = useQueryClient();

  const updateUserFn = async (data: UpdateMyUserRequest): Promise<User> => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(getApiUrl(), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(await getErrorMessage(response, "Failed to update user"));
      }
      return response.json() as Promise<User>;
    } catch (error) {
      if (!isBackendUnavailable(error) || !user?.sub) throw error;
      return saveLocalProfile(user.sub, {
        _id: user.sub,
        email: user.email ?? "",
        ...data,
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUserFn,
    onSuccess(userProfile) {
      queryClient.setQueryData(["currentUser", user?.sub], userProfile);
      toast.success("User profile updated!");
    },
    onError(error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user");
    },
  });

  return {
    updateUser: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
  };
};
