import React, {
  createContext, useContext, useState, FC
} from "react";
import { useQuery, gql } from "@apollo/client";

import { Query } from "../graphql/__generated__/graphql-schema";

type UserContext = {
  user?: Query['currentUser']
  refetch: () => void
}

const Context = createContext<UserContext>({
  refetch: () => { },
})

export const useUserContext = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("You probably forgot to put <UserContext>.");
  }

  return context;
};

const CurrentUserQuery = gql`
  query CurrentUserQuery {
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
  const [user, setUser] = useState<Query['currentUser']>();

  const { refetch: refetchUserQuery } = useQuery<Query>(CurrentUserQuery, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser)
    }
  })

  const refetch = async () => {
    const { data: { currentUser } } = await refetchUserQuery()
    setUser(currentUser)
  }

  return (
    <Context.Provider value={{ user, refetch }}>
      {user && children}
    </Context.Provider>
  );
};
