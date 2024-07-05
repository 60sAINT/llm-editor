import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class LoginApi {
  public async loginAuth(username: string, password: string) {
    const result = await axios.post(
      `${apikeyPrefix}/login`,
      `username=${username}&password=${password}`
    );
    return result.data;
  }
  public async registerAuth(body: {
    nickname: string;
    password: string;
    email: string;
    phone: string;
    vericode: string;
  }) {
    const result = await axios.post(`${apikeyPrefix}/register`, body);
    return result.data;
  }
}

export const loginApi = new LoginApi();
