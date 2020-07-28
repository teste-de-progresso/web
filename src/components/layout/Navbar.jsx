import React from "react";
import {useAuth} from "../../context/Authentication";
import {useDispatch} from "react-redux";
import {logout} from "../../store/ducks/auth/actions";

export const Navbar = () => {
    const auth = useAuth();
    const dispatch = useDispatch();

    const doLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="h-16 bg-primary-normal w-full flex items-center px-8">
            <div className="flex-grow">
                <h1 className="text-white font-medium text-lg">UNIFESO</h1>
            </div>
            <div className="group inline-block relative text-white font-medium hover:bg-primary-dark rounded p-2 hover:shadow-lg cursor-pointer">
                <span>{auth.user.email}</span>
                <div className="absolute hidden pt-1 group-hover:block w-full right-0 text-black">
                    <ul className="mt-2 bg-white rounded shadow-md border border-gray-300 font-light">
                        <li className="rounded-t py-2 px-4 block whitespace-no-wrap hover:bg-gray-200 border-b border-gray-300">
                            <a>Perfil</a>
                        </li>
                        <li className="py-2 px-4 block whitespace-no-wrap hover:bg-gray-200" onClick={() => doLogout()}>
                            <a>Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
