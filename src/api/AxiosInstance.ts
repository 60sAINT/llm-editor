import axios from "axios";
// export const GATEWAY = "http://localhost:8000";
export const GATEWAY = "http://113.54.230.2:12097";
export const baseUrl = `${GATEWAY}`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
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
