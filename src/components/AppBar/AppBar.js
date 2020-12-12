import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { AppBar as AppBarBase, Toolbar } from "@material-ui/core";
import { Avatar } from "../Avatar";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

export const Navbar = () => {
  const user = firebase.auth().currentUser;

  const history = useHistory();

  if (!user) return null;

  const doLogout = () => {
    firebase.auth().signOut();
  };

  const openProfile = () => {
    history.push("/user/profile");
  };

  return (
    <AppBarBase position="static">
      <Toolbar>
        <div className="flex-grow">
          <img alt="Logo do Unifeso" className="h-12" src={unifesoLogo} />
        </div>
        <div className="group inline-block relative text-white font-medium hover:bg-primary-dark p-2 hover:shadow-lg cursor-pointer">
          <div className="flex flex-row items-center space-x-2">
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} className="w-12" />
          </div>
          <div className="absolute hidden pt-1 group-hover:block w-full right-0 text-black">
            <div className="mt-2 bg-white rounded shadow-md border border-gray-300 font-light">
              <div
                className="rounded-t py-2 px-4 block whitespace-no-wrap hover:bg-gray-200 border-b border-gray-300"
                onClick={() => openProfile()}
              >
                <p>Perfil</p>
              </div>
              <div
                className="py-2 px-4 block whitespace-no-wrap hover:bg-gray-200"
                onClick={() => doLogout()}
              >
                <p>Sair</p>
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBarBase>
  );
};
