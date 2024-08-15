import { axios } from "@/api/AxiosInstance";
import { TagType } from "../interface";

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
export interface SubmitInterestTagsParams {
  token: string;
  interestTags: TagType[];
}
export interface GetUserInterestTagsParams {
  token: string;
}

export class PaperApi {
  public async getRecentPaperList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/paper/recent`, {
      headers: { "X-Authorization": token },
    });
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
    return result.data.data;
  }
  public async submitInterestTags({
    token,
    interestTags,
  }: SubmitInterestTagsParams) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/interest`,
      { tags: interestTags },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async getUserInterestTags({ token }: GetUserInterestTagsParams) {
    const result = await axios.get(`${apikeyPrefix}/paper/interest`, {
      headers: { "X-Authorization": token },
    });
    return result.data.data;
  }
}

export const paperApi = new PaperApi();
