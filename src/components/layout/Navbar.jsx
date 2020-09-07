import React from "react";
import { useAuth } from "../../context/Authentication";
import { useDispatch } from "react-redux";
import { logout } from "../../store/ducks/auth/actions";
import { Avatar } from "./Avatar";
import unifesoLogo from "../../img/unifeso-logo-branco.svg";

export const Navbar = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="h-16 bg-primary-normal w-full flex items-center px-8 z-50">
      <div className="flex-grow">
        <div className="flex-start">
          <img alt="Logo do Unifeso" className="h-16" src={unifesoLogo}></img>
        </div>
      </div>
      <div className="group inline-block relative text-white font-medium hover:bg-primary-dark p-2 hover:shadow-lg cursor-pointer">
        <div className="flex flex-row items-center space-x-2">
          <span>{auth.user.email}</span>
          <Avatar />
        </div>
        <div className="absolute hidden pt-1 group-hover:block w-full right-0 text-black">
          <ul className="mt-2 bg-white rounded shadow-md border border-gray-300 font-light">
            <li className="rounded-t py-2 px-4 block whitespace-no-wrap hover:bg-gray-200 border-b border-gray-300">
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
