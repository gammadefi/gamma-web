import axios, { AxiosRequestConfig } from "axios";
import { Config } from "./config";
import { AuthActions, useAuth } from "../zustand/auth.store";

export const createApiClient = (auth = true,test = false) => {
  const config: AxiosRequestConfig | any = {
    baseURL: Config.apiUrl,
  };
  config.headers = {
    deviceName : "Linuxx",
    deviceip:"127.0.0.2"
  }
  if (auth && test === false) {
    const token: any = useAuth.getState().token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }else if(test === true) {
    const token: any = useAuth.getState().token;
    if (token) {
      config.headers = {
        
      };
  }
}
  const client = axios.create(config);
  client.interceptors.response.use(
    (res) => {
      return Promise.resolve(res);
    },
    (err) => {
      if (err.response) {
        if (
          err.response.data &&
          err.response.data.message === "Token Expired"
        ) {
          AuthActions.logout();
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
  return client;
};
