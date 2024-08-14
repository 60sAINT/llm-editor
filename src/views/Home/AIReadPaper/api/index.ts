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
export interface GetAllInterestTagsParams {
  token: string;
}

export class PaperApi {
  public async getRecentPaperList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/recent`, {
      headers: { "X-Authorization": token },
    });
    console.log(result);
    return result.data.data.recent_paper_list;
  }
  public async uploadPdf({ token, file }: UploadPdfParams) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/upload`,
      { file },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
  public async searchPapers({ token, search_input }: SearchPapersParams) {
    const result = await axios.get(
      `${apikeyPrefix}/paper/search?search_input=${search_input}`,
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
  public async getAllInterestTags({ token }: GetAllInterestTagsParams) {
    const result = await axios.get(`${apikeyPrefix}/paper/interest/all`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
}

export const paperApi = new PaperApi();
