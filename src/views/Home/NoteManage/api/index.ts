import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class LiteratureApi {
  public async getLiteratureList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/list`, {
      headers: { "X-Authorization": token },
    });
    return result.data.data.paper_list;
  }
}

export const literatureApi = new LiteratureApi();
