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
    user,               // Auth0 profile object
    isLoading,          // Auth0 initialization flag
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
