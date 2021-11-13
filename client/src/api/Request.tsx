import axios from "axios";
const { REACT_APP_API_SSO } = process.env;

export const requestSSO = axios.create({
  baseURL: REACT_APP_API_SSO,
});

