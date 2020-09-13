import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../context/Authentication";
import { useDispatch } from "react-redux";
import { logout } from "../../store/ducks/auth/actions";
import { useUserContext } from "../utils";

import { Avatar } from "./Avatar";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

export const Navbar = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const userContextData = useUserContext();
  const userInfo = userContextData?.userInfo;
  const history = useHistory();

  if (!userInfo) return null;

  const doLogout = () => dispatch(logout());
  const openProfile = () => {
    history.push("/user/profile");
  };

  return (
    <nav className="h-16 bg-primary-normal w-full flex items-center px-8 z-40">
      <div className="flex-grow">
        <Link className="flex-start" to="/">
          <img alt="Logo do Unifeso" className="h-16" src={unifesoLogo}></img>
        </Link>
      </div>
      <div className="group inline-block relative text-white font-medium hover:bg-primary-dark p-2 hover:shadow-lg cursor-pointer">
        <div className="flex flex-row items-center space-x-2">
          <span>{userInfo.name || auth.user.email}</span>
          <Avatar src={userInfo.avatarUrl} className="w-12"/>
        </div>
        <div className="absolute hidden pt-1 group-hover:block w-full right-0 text-black">
          <ul className="mt-2 bg-white rounded shadow-md border border-gray-300 font-light">
            <li
              className="rounded-t py-2 px-4 block whitespace-no-wrap hover:bg-gray-200 border-b border-gray-300"
              onClick={() => openProfile()}
            >
              <p>Perfil</p>
            </li>
            <li
              className="py-2 px-4 block whitespace-no-wrap hover:bg-gray-200"
              onClick={() => doLogout()}
            >
              <p>Sair</p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
