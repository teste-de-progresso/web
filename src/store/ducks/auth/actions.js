import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOAD, AUTHENTICATION_LOAD_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
} from './types';

export const requestAuthentication = (email, password) => ({
  type: AUTHENTICATION_REQUEST,
  payload: {
    email, password,
  },
});

export const successAuthentication = (token) => ({
  type: AUTHENTICATION_SUCCESS,
  payload: {
    token,
  },
});

export const failureAuthentication = (error) => ({
  type: AUTHENTICATION_FAILURE,
  payload: {
    error,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const loadAuthentication = () => ({
  type: AUTHENTICATION_LOAD,
});

export const failedLoadAuthentication = () => ({
  type: AUTHENTICATION_LOAD_FAILURE,
});
