import React, {
  createContext, useMemo, useContext, useState,
} from "react";
import { useQuery, gql } from "@apollo/client";

const Context = createContext(null);

export const useUserContext = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("You probably forgot to put <UserContext>.");
  }

  return context;
};

const MY_USER = gql`
  query {
    myUser {
      roles
    }
  }
`;

export const UserContextProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState();
  const providerValue = useMemo(() => ({ userRoles }), [userRoles]);

  useQuery(MY_USER, {
    onCompleted: ({ myUser: { roles } }) => {
      setUserRoles(roles);
    },
    onError: () => {
      setUserRoles(false);
    },
  });

  return (
    <Context.Provider value={providerValue}>
      {userRoles ? children : null}
    </Context.Provider>
  );
};
