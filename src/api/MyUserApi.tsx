import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

// ————————————————
// Fetch current user
// ————————————————
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchCurrentUser = async (): Promise<User> => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  };

  const { data: currentUser, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
  });

  if (error instanceof Error) {
    toast.error(error.message);
  }

  return { currentUser, isLoading };
};

// ————————————————
// Create new user
// ————————————————
type CreateUserRequest = { auth0Id: string; email: string };

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createUserFn = async (user: CreateUserRequest) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Failed to create user");
  };

  const {
    mutateAsync: createUser,
    isLoading: isCreating,
    isError: createError,
    isSuccess: createSuccess,
  } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUserFn,
    onError(error) {
      toast.error((error as Error).message);
    },
    onSuccess() {
      toast.success("User created!");
    },
  });

  return { createUser, isCreating, createError, createSuccess };
};

// ————————————————
// Update existing user
// ————————————————
type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserFn = async (data: UpdateMyUserRequest) => {
    const token = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading: isUpdating,
    isSuccess: updateSuccess,
    isError: updateError,
    reset: resetUpdate,
  } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUserFn,
    onSuccess() {
      toast.success("User profile updated!");
    },
    onError(error) {
      toast.error((error as Error).message);
      resetUpdate();
    },
  });

  return { updateUser, isUpdating, updateSuccess, updateError };
};
