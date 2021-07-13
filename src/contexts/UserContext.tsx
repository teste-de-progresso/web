import React, {
  createContext, useContext, useState, FC
} from "react";
import { useQuery, gql } from "@apollo/client";
import firebase from "firebase";

import { Query, UserRoles } from "../__generated__/graphql-schema";

export type UserContext = {
  user?: Query['currentUser']
  refetch: () => void
  isOnlyTeacher: boolean
  authToken: string
}

const Context = createContext<UserContext>({
  refetch: () => {
  },
  isOnlyTeacher: false,
  authToken: ''
})

export const useUserContext = (): UserContext => {
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
            roles
        }
    }
`;

type Props = {
  children: any
  authToken: string
}

export const UserContext: FC<Props> = ({ children, authToken }) => {
  const [user, setUser] = useState<Query['currentUser']>();
  const isOnlyTeacher = !!(user?.roles.includes(UserRoles.Teacher) && user?.roles.length === 1)

  const { refetch: refetchUserQuery } = useQuery<Query>(CurrentUserQuery, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser)
    },
    onError: ({ message }) => {
      console.error('token error:', message)
      firebase.auth().signOut();
    }
  })

  const refetch = async () => {
    const { data: { currentUser } } = await refetchUserQuery()
    setUser(currentUser)
  }

  return (
    <Context.Provider value={{ user, refetch, isOnlyTeacher, authToken }}>
      {user && children}
    </Context.Provider>
  );
};
