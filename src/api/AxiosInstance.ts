import axios from "axios";
export const GATEWAY = "http://43.138.11.21:12099";
// export const GATEWAY = "https://88eaxctef0i61cqf.aistudio-hub.baidu.com";
// export const GATEWAY = "http://113.54.230.2:12097";
// export const GATEWAY = "http://localhost:8000";
export const baseUrl = `${GATEWAY}`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: "token 523e30f63c241a80401a68b61afa1f7708b0eb8c",
  },
});
axiosInstance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (res) => {
    const msg = res.response?.data?.msg ?? res.message;
    const stack = res.response?.data?.details ?? res.stack;
    const detail = res.response?.data?.detail;
    return Promise.reject({ message: msg, stack, detail });
  }
);

export { axiosInstance as axios };
