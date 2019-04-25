import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as base from "../../config/const";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, isAuthenticated) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    isAuthenticated: isAuthenticated
  };
};

export const authFail = error => {
   //console.log("errror",error)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch, getState) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      role: 'super_admin'
      //returnSecureToken: true
    };
    let url = base.AUTH_BASE_URL;
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.result.userId);
        dispatch(
          authSuccess(
            response.data.token,
            response.data.result.userId,
            localStorage.getItem("jwtToken") !== null
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
        
      })
      .catch(err => {
         console.log("error",err.response.data.code);
        dispatch(authFail(err.response.data.code));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId, token !== null));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
