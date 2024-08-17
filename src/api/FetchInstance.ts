import { GATEWAY } from "./AxiosInstance";
export const baseUrl = `${GATEWAY}`;

const fetchInstance = {
  get: async (url: string, token: string | null, config: RequestInit = {}) => {
    const response = await fetch(`${baseUrl}${url}`, {
      ...config,
      method: "GET",
      headers: {
        ...config.headers,
        "X-Authorization": token ? `Bearer ${token}` : "",
      },
    });
    return handleResponse(response);
  },
  post: async (
    url: string,
    data: any,
    token: string | null,
    config: RequestInit = {}
  ) => {
    const response = await fetch(`${baseUrl}${url}`, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token ? `Bearer ${token}` : "",
        ...config.headers,
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
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
