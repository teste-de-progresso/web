import React, {
  createContext, useContext, useState, FC
} from "react";
import { useDispatch } from "react-redux";
import { useQuery, gql } from "@apollo/client";

import { Query, UserRoles } from "../__generated__/graphql-schema";
import { deleteSession } from "../services/store/auth"

export type UserContext = {
  user?: Query['currentUser']
  refetch: () => void
  isOnlyTeacher: boolean
}

const Context = createContext<UserContext>({
  refetch: () => {
  },
  isOnlyTeacher: false
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
}

export const UserContext: FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState<Query['currentUser']>();
  const isOnlyTeacher = !!(user?.roles.includes(UserRoles.Teacher) && user?.roles.length === 1)

  const { refetch: refetchUserQuery } = useQuery<Query>(CurrentUserQuery, {
    onCompleted: ({ currentUser }) => {
      setUser(currentUser)
    },
    onError: ({ message }) => {
      console.error('token error:', message)
      dispatch(deleteSession())
    }
  })

  const refetch = async () => {
    const { data: { currentUser } } = await refetchUserQuery()
    setUser(currentUser)
  }

  return (
    <Context.Provider value={{ user, refetch, isOnlyTeacher }}>
      {user && children}
    </Context.Provider>
  );
};
