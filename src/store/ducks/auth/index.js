import * as jwt from 'jsonwebtoken';
import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOAD, AUTHENTICATION_LOAD_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
} from './types';

const initialState = {
  token: undefined,
  user: undefined,
  isLoggedIn: false,
  error: undefined,
  isLoading: false,
  isTeacher: function() {
    if (this.isLoggedIn && this.user.roles) {
      return this.user.roles.includes("teacher");
    } else {
      return false;
    }
  }
};

export const reducer = (state = initialState, action) => {
  const guid = process.env.REACT_APP_JWT_SECRET_KEY || '1cb26f40-498b-4f72-a00a-e8633abc5957';

  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        token: undefined,
        user: undefined,
        isLoggedIn: false,
        error: undefined,
        isLoading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: jwt.verify(action.payload.token, guid), // TODO: PARSE JWT
        isLoggedIn: true,
        error: undefined,
        isLoading: false,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        token: undefined,
        user: undefined,
        isLoggedIn: false,
        error: action.payload.error,
        isLoading: false,
      };
    case AUTHENTICATION_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHENTICATION_LOAD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT:
      localStorage.removeItem('auth');
      return {
        ...state,
        token: undefined,
        user: undefined,
        isLoggedIn: false,
        error: undefined,
        isLoading: false,
      };
    default:
      return state;
  }
};
