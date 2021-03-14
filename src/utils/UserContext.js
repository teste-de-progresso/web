import React, {
  createContext, useMemo, useContext, useState,
} from "react";
import { useQuery, gql } from "@apollo/client";

import { BadConnection } from "../screens/BadConnection";

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
    currentUser {
      id
      avatarUrl
    }
  }
`;

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(true);
  const providerValue = useMemo(() => ({ userInfo }), [userInfo]);

  useQuery(MY_USER, {
    onCompleted: ({ currentUser }) => {
      setUserInfo(currentUser);
    },
    onError: () => {
      setUserInfo(false);
    },
  });

  return (
    <Context.Provider value={providerValue}>
      {userInfo ? children : <BadConnection />}
    </Context.Provider>
  );
};
