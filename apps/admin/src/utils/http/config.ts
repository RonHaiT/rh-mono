import type { CreateAxiosDefaults } from "axios";
function getBaseURL() {
  let baseURL: string;
  if (import.meta.env.VITE_APP_API == "development") {
    baseURL = "/api/v1";
  } else {
    baseURL = import.meta.env.VITE_APP_API;
  }
  return baseURL;
}
export default {
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  isToken: true,
  method: "get",
  data: {},
  params: {},
  responseType: "json",
  loading: true,
  isLoading: true,
} as CreateAxiosDefaults;
