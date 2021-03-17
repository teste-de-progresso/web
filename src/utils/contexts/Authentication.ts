import React, { useContext } from "react";
import { UserRoles } from "../../graphql/__generated__/graphql-schema";

type ContextType = {
  isLoggedIn: Boolean;
  user?: {
    user_id: number;
    name: string;
    email: string;
    roles: UserRoles[];
  };
  token?: string;
};

export const AuthenticationContext = React.createContext<ContextType>({
  isLoggedIn: false,
  user: undefined,
  token: undefined,
});

export const useAuth = () => useContext(AuthenticationContext);
