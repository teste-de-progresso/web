import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/ducks/auth/actions";
import { useUserContext } from "../../utils";

import { Avatar } from "../Avatar";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";
import logoImgUnifeso from "../../img/logoImgUnifeso.png";

export const AppBar = () => {
  const dispatch = useDispatch();
  const user = useUserContext();
  const history = useHistory();

  if (!user) return null;

  const doLogout = () => dispatch(logout());
  const openProfile = () => {
    history.push("/user/profile");
  };

  return (
    <nav className="h-16 bg-primary-normal w-full flex items-center px-1 sm:px-8 z-10">
      <div className="flex-grow">
        <img alt="Logo do Unifeso" className="h-10 sm:h-12" src={window.screen.width > 640 ? unifesoLogo : logoImgUnifeso} />
      </div>
      <div className="group inline-block relative text-white text-sm sm:text-base font-medium hover:bg-primary-dark p-2 hover:shadow-lg cursor-pointer">
        <div className="flex flex-row items-center space-x-2">
          <span>{user?.name || user?.email}</span>
          <Avatar src={user?.avatarUrl ?? ""} className="w-10 sm:w-12" />
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
    </nav>
  );
};