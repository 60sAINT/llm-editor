import { axios as axiosInstance } from "@/api/AxiosInstance";
import { fetch } from "@/api/FetchInstance";
import axios from "axios";

const apikeyPrefix = "/api/v1";

export class DefaultApi {
  public async getReference(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/reference?text=${text}`);
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
    console.log(result.data);
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
}

export const defaultApi = new DefaultApi();
