import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class PaperApi {
  public async getRecentPaperList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/recent`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  public async getRecommendPaperList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/recommend`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  // public async newDirectory({ token, dir_name }: NewDirectoryParams) {
  //   const result = await axios.post(
  //     `${apikeyPrefix}/dir/new`,
  //     { dir_name },
  //     { headers: { "X-Authorization": token } }
  //   );
  //   return result.data;
  // }
}

export const paperApi = new PaperApi();
