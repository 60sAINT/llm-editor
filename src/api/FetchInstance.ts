import { GATEWAY } from "./AxiosInstance";
// export const GATEWAY = "http://43.138.11.21:12099";
export const baseUrl = `${GATEWAY}`;

const fetchInstance = {
  get: async (url: string, config: RequestInit = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      ...config,
      method: "GET",
    });
    return handleResponse(response);
  },
  post: async (url: string, data: any, config: RequestInit = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
  // put: async (url: string, data: any, config: RequestInit = {}) => {
  //   const response = await fetch(`${baseUrl}${url}`, {
  //     ...config,
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...config.headers,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   return handleResponse(response);
  // },
  // delete: async (url: string, config: RequestInit = {}) => {
  //   const response = await fetch(`${baseUrl}${url}`, {
  //     ...config,
  //     method: "DELETE",
  //   });
  //   return handleResponse(response);
  // },
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const msg = errorData.msg ?? response.statusText;
    const stack = errorData.details ?? new Error().stack;
    const detail = errorData.detail;
    return Promise.reject({ message: msg, stack, detail });
  }
  return Promise.resolve(response);
};

export { fetchInstance as fetch };
