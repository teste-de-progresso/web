import React, { createContext, useMemo, useContext, useState } from "react";
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
      avatarUrl
      name
    }
  }
`;

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const providerValue = useMemo(() => ({ userInfo }), [userInfo]);

  useQuery(MY_USER, {
    onCompleted: (data) => setUserInfo(data?.myUser),
  });

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
