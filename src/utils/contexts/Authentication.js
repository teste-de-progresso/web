import React, { useContext } from 'react';

export const AuthenticationContext = React.createContext({
  isLoggedIn: false,
  user: undefined,
  token: undefined,
});

export const useAuth = () => useContext(AuthenticationContext);
