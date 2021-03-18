import React, {
  createContext, useContext, useState, FC,
} from "react";
import { useQuery, gql } from "@apollo/client";

import { Query, User } from "../graphql/__generated__/graphql-schema";

const Context = createContext<User | undefined>(undefined);

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
      name
      email
      avatarUrl
    }
  }
`;

type Props = {
  children: any
}

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useQuery<Query>(MY_USER, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser as User);
    },
  });

  return (
    <Context.Provider value={user}>
      {user && children}
    </Context.Provider>
  );
};
