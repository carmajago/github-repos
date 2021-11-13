import { AxiosRequestConfig } from "axios";
import { requestSSO } from "../api/Request";
import { Account } from "../interfaces/userAccount";

// constantes
const dataInit = {
  token: localStorage.getItem("token"),
  user: {},
};

// types

type AuthAction = {
  type: "LOGIN" | "LOGOUT" | "PROFILE";
  payload: Account;
};

// reducer
export const authReducer = (state = dataInit, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, token: action.payload.token };
    case "PROFILE":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: {} };
    default:
      return state;
  }
};

// actions
export const loginAction =
  (email: string, password: string, callback: Function) =>
  async (dispatch: Function, getState: Function) => {
    const body = { email, password };

    const req = await requestSSO
      .post<Account>("account/login", body)
      .catch((error) => {
        callback({
          ok: false,
          message: error.response ? error.response.data.message : "",
        });
      });


    if (req) {
      localStorage.token = req.data.token;
      dispatch({
        type: "LOGIN",
        payload: req.data,
      });
      callback({ ok: true });
    }
  };

  export const logout =
  (callback: Function) => async (dispatch: Function, getState: Function) => {
  
    localStorage.removeItem("token");
    dispatch({
        type: "LOGOUT",
      });  
    callback(); 
  };

export const accountInformation =
  (callback: Function) => async (dispatch: Function, getState: Function) => {
    const { token } = getState().auth;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await requestSSO
      .get<Account>("/account/profile", config)
      .catch((error) => {
        callback({
          ok: false,
          message: error.response ? error.response.data.message : "",
        });
      });

    if (req) {
      dispatch({
        type: "PROFILE",
        payload: req.data,
      });
      callback({ ok: true });
    }
  };


  export const gitAccessToken =
  (code:string, callback: Function) => async (dispatch: Function, getState: Function) => {
    const { token } = getState().auth;

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const req = await requestSSO
      .post<Account>("/github/auth", {code},config)
      .catch((error) => {
        callback({
          ok: false,
          message: error.response ? error.response.data.message : "",
        });
      });

    if (req) {
      dispatch({
        type: "PROFILE",
        payload: req.data,
      });
      callback({ ok: true });
    }
  };



