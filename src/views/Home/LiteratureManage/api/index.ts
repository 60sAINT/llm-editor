import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export interface UploadPdfParams {
  token: string;
  file: any;
}
export interface SearchPapersParams {
  token: string;
  search_input?: string;
}

export class LiteratureApi {
  public async getLiteratureList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/list`, {
      headers: { "X-Authorization": token },
    });
    return result.data.data.paper_list;
  }
}

export const literatureApi = new LiteratureApi();
