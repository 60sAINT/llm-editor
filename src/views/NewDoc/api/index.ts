import { axios as axiosInstance } from "@/api/AxiosInstance";
import { fetch } from "@/api/FetchInstance";
import axios from "axios";

const apikeyPrefix = "/api/v1";

export interface UserInfoType {
  user_id: string;
  nickname: string;
  email: string;
  phone: string;
  paper_interest_tags: {
    tags: [
      {
        field: string;
        discipline: string;
      }
    ];
  };
}
export interface GetSelfDocPermissionParams {
  doc_id: string;
}

export class DefaultApi {
  public async getReference(text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/reference?text=${text}`,
      token
    );
    return result.body;
  }

  public async getMindMapData(input_text: string) {
    const result = await axiosInstance.post(`${apikeyPrefix}/view/mindmap`, {
      input_text,
    });
    return result.data;
  }

  public async getUrl() {
    const result = await axiosInstance.get(`${apikeyPrefix}/upload/get_url`);
    return result.data;
  }

  public async putObject(file: File, presignedUrl: string) {
    const instance = axios.create();
    await instance.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  }

  public async getUserInfo(): Promise<UserInfoType> {
    const result = await axiosInstance.get(`${apikeyPrefix}/user/self`);
    return result.data.data;
  }

  public async getColAuthToken() {
    const result = await axiosInstance.get(
      `${apikeyPrefix}/collaboration/auth`
    );
    return result.data.data;
  }

  public async getSelfDocPermission({ doc_id }: GetSelfDocPermissionParams) {
    const result = await axiosInstance.get(
      `${apikeyPrefix}/collaboration/doc_permission?doc_id=${doc_id}`
    );
    return result.data.data;
  }
}

export const defaultApi = new DefaultApi();
