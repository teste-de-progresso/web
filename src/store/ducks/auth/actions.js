import {
    AUTHENTICATION_FAILURE,
    AUTHENTICATION_LOAD,
    AUTHENTICATION_REQUEST,
    AUTHENTICATION_SUCCESS,
    LOGOUT
} from "./types";

export const requestAuthentication = (email, password) => {
    return {
        type: AUTHENTICATION_REQUEST,
        payload: {
            email, password
        }
    }
};

export const successAuthentication = (token) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        payload: {
            token
        }
    }
};

export const failureAuthentication = (error) => {
    return {
        type: AUTHENTICATION_FAILURE,
        payload: {
            error
        }
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const loadAuthentication = () => {
    return {
        type: AUTHENTICATION_LOAD
    };
}
