import { axios } from "@/api/AxiosInstance";
import { SearchResultType } from "../model";

const apikeyPrefix = "/api/v1";

export interface GetShareDocListParams {
  token: string;
}
export interface SearchUserDocListParams {
  token: string;
  email: string;
  doc_id: string;
}
export interface ShareParams {
  token: string;
  to_email: string;
  doc_id: string;
  permission: string;
}
export interface UnShareParams {
  token: string;
  to_email: string;
  doc_id: string;
}
export interface GetDocParticipantsParams {
  token: string;
  doc_id: string;
}

export class ShareApi {
  public async getShareDocList({ token }: GetShareDocListParams) {
    const result = await axios.get(`${apikeyPrefix}/doc/shared_list`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  public async searchUser({
    token,
    email,
    doc_id,
  }: SearchUserDocListParams): Promise<SearchResultType> {
    const result = await axios.post(
      `${apikeyPrefix}/user/search`,
      { email, doc_id },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async share({ token, to_email, doc_id, permission }: ShareParams) {
    const result = await axios.post(
      `${apikeyPrefix}/collaboration/share`,
      { to_email, doc_id, permission },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async unShare({ token, to_email, doc_id }: UnShareParams) {
    const result = await axios.post(
      `${apikeyPrefix}/collaboration/unshare`,
      { to_email, doc_id },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async getDocParticipants({ token, doc_id }: GetDocParticipantsParams) {
    const result = await axios.get(
      `${apikeyPrefix}/collaboration/participants?doc_id=${doc_id}`,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
}

export const shareApi = new ShareApi();
