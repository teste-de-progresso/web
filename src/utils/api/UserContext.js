import React, {
  createContext, useMemo, useContext, useState,
} from "react";
import { useQuery, gql } from "@apollo/client";
import { Loading, NotAllowed } from "../../screens";

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

export const UserContext = ({ children }) => {
  const [userRoles, setUserRoles] = useState();
  const [isNotAllowed, setIsNotAllowed] = useState(true);
  const [loading, setLoading] = useState(true);
  const providerValue = useMemo(() => ({ userRoles }), [userRoles]);

  useQuery(MY_USER, {
    onCompleted: ({ myUser }) => {
      if (!myUser || myUser.length === 0) {
        setIsNotAllowed(true);
        setLoading(false);
      } else {
        setUserRoles(myUser.roles);
        setIsNotAllowed(false);
        setLoading(false);
      }
    },
  });

  if (loading) return <Loading />;
  if (isNotAllowed) return <NotAllowed />;

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
};
