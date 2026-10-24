import { useAuth0 } from "@auth0/auth0-react";
import {
  useCreateMyUser,
  useGetMyUser,
  useUpdateMyUser,
} from "@/api/MyUserApi";
import UserProfileForm, {
  type UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import type { User } from "@/types";

const UserProfilePage = () => {
  const { user: auth0User } = useAuth0();
  const { currentUser, isLoading: isGetLoading, error: getError } = useGetMyUser();
  const { createUser, isCreating } = useCreateMyUser();
  const { updateUser, isUpdating } = useUpdateMyUser();

  if (isGetLoading) {
    return <span className="text-foreground">Loading...</span>;
  }

  const newUser: User = {
    _id: "new-user",
    email: auth0User?.email ?? "",
    name: auth0User?.name ?? "",
    addressLine1: "",
    city: "",
    country: "",
  };

  const handleSave = async (profile: UserFormData) => {
    if (currentUser) {
      await updateUser(profile);
      return;
    }

    if (!auth0User?.sub || !auth0User.email) {
      throw new Error("Your Auth0 account does not include an email address.");
    }

    await createUser({
      auth0Id: auth0User.sub,
      email: auth0User.email,
    });

    await updateUser(profile);
  };

  return (
    <div className="space-y-4">
      {getError ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          Could not load your saved profile. You can still complete the form;
          check that the API is running at VITE_API_BASE_URL if saving fails.
        </p>
      ) : null}
      <UserProfileForm
        currentUser={currentUser ?? newUser}
        onSave={handleSave}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default UserProfilePage;