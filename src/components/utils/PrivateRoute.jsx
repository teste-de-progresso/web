import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {AuthenticationContext} from "../../context/Authentication";
import {Login} from "../screens/Login";
import {store} from "../../store";
import {loadAuthentication} from "../../store/ducks/auth/actions";
import {useDispatch} from "react-redux";

export const PrivateRoute = (props) => {
    return (
        <AuthenticationContext.Consumer>
            {
                value => {
                    console.log(value);
                    return value.isLoggedIn ? <Route {...props}/> : <Login/>
                }
            }
        </AuthenticationContext.Consumer>
    )
}
