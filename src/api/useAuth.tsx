// src/api/useAuth.ts
import { useAuth0 } from "@auth0/auth0-react";

export const useAuth = () => {
  const {
    isAuthenticated,
    user,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  return {
    isAuthenticated,
    user,               
    isLoading,          
    login: () => loginWithRedirect(),
    logout: () =>
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  }),

    getToken: () => getAccessTokenSilently(),
  };
};
