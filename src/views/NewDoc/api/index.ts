import { axios } from "@/api/AxiosInstance";
import { fetch } from "@/api/FetchInstance";

const apikeyPrefix = "/api/v1";

export class DefaultApi {
  public async getReference(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/reference?text=${text}`);
    return result.body;
  }

  public async getMindMapData(input_text: string) {
    const result = await axios.post(`${apikeyPrefix}/view/mindmap`, {
      input_text,
    });
    return result.data;
  }
}

export const defaultApi = new DefaultApi();
