import { createApiClient } from "./api";

export const AuthService = {
  init: (payload: any) => createApiClient(false).post("/auth/init", payload),
  login: (payload: any) => createApiClient(false).post("/auth/login", payload),
  register: (payload: any) => createApiClient(false).post("/auth/register", payload),
  verify: (payload:any) => createApiClient(false).post("/auth/device/verify", payload)
};
