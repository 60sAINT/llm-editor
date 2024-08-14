import { axios } from "@/api/AxiosInstance";
import { LiteratureType } from "..";

const apikeyPrefix = "/api/v1";

export interface DeleteLiteratureParams {
  token: string;
  paper_ids?: string[];
}

export class LiteratureApi {
  public async getLiteratureList(token: string): Promise<LiteratureType[]> {
    const result = await axios.get(`${apikeyPrefix}/paper/list`, {
      headers: { "X-Authorization": token },
    });
    return result.data.data.papers;
  }
  public async deleteLiterature({ token, paper_ids }: DeleteLiteratureParams) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/delete`,
      { paper_ids },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result;
  }
}

export const literatureApi = new LiteratureApi();
