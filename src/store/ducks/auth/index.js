import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_LOAD,
  AUTHENTICATION_LOAD_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  LOGOUT,
} from "./types";

const initialState = {
  token: undefined,
  isLoggedIn: false,
  error: undefined,
  isLoading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return {
        ...state,
        token: undefined,
        isLoggedIn: false,
        error: undefined,
        isLoading: true,
      };
    case AUTHENTICATION_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true,
        error: undefined,
        isLoading: false,
      };
    case AUTHENTICATION_FAILURE:
      return {
        ...state,
        token: undefined,
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
      localStorage.removeItem("auth");
      return {
        ...state,
        token: undefined,
        isLoggedIn: false,
        error: undefined,
        isLoading: false,
      };
    default:
      return state;
  }
};
