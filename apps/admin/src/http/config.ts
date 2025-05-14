import { type AxiosRequestConfig } from "axios";
export default {
  baseURL: "https://some-domain.com/api/",

  headers: { "X-Requested-With": "XMLHttpRequest" },
  timeout: 10000, // 默认值是 `0` (永不超时)
} as AxiosRequestConfig;
