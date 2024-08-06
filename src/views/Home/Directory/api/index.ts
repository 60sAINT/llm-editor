import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class DirectoryApi {
  public async getDirectoryTree(token: string) {
    const result = await axios.get(`${apikeyPrefix}/dir/tree`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
}

export const directoryApi = new DirectoryApi();
