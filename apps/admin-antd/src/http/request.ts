import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import config from "./config";
import router from "@/router";
import { notification } from "ant-design-vue";

// 防抖处理刷新 token
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

const instance: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: config.headers,
});

// 请求拦截器
instance.interceptors.request.use(
  async (cfg: AxiosRequestConfig<any>) => {
    const isToken = (cfg.headers as any)?.isToken === false;
    const { timeStamp, expiresIn, accessToken, refreshToken } =
      store.getters["user"];

    if (!isToken && accessToken) {
      const now = Date.now();
      const expired = (now - timeStamp) / 1000 > expiresIn - 5;

      if (!expired) {
        cfg.headers = {
          ...cfg.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      } else {
        if (!isRefreshing && refreshToken) {
          isRefreshing = true;
          try {
            const res = await oauthToken({
              grant_type: "refresh_token",
              client_secret: "123456",
              client_id: "app",
              refresh_token: refreshToken,
            });

            const { access_token, refresh_token, expires_in } = res.data;
            store.commit("user/USER_CHANGE_ACCESS_TOKEN", access_token);
            store.commit("user/USER_CHANGE_REFRESH_TOKEN", refresh_token);
            store.commit("user/USER_CHANGE_EXPIRES_IN", expires_in);
            store.commit("user/USER_CHANGE_TIME_STAMP", Date.now());

            onRefreshed(access_token);
          } catch (e) {
            store.commit("user/USER_CHANGE_ACCESS_TOKEN", "");
            store.commit("user/USER_CHANGE_REFRESH_TOKEN", "");
            store.commit("user/USER_CHANGE_EXPIRES_IN", "");
            store.commit("user/USER_CHANGE_TIME_STAMP", 0);

            notification.error({
              message: "提示",
              description: "登录信息已过期，请重新登录！",
            });
            router.push("/");
          } finally {
            isRefreshing = false;
          }
        }

        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            cfg.headers = {
              ...cfg.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(cfg);
          });
        });
      }
    }

    return cfg;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.responseType === "blob") {
      return response.data;
    }
    return response.data ?? JSON.parse(response.request.responseText);
  },
  (error) => {
    const { response } = error;
    if (response) {
      notification.error({
        message: "错误",
        description: response.data?.message || "请求出错",
      });

      if ([302, 303, 304].includes(response.status)) {
        router.push("/User/Login");
      }

      return Promise.reject(response.data);
    } else {
      notification.error({ message: "网络异常", description: error.message });
      return Promise.reject(error);
    }
  }
);

export default instance;
