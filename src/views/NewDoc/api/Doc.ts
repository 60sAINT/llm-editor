import { axios } from "../../../api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class DocApi {
  public async newDoc(title: string, content: string) {
    const result = await axios.post(`${apikeyPrefix}/doc/new`, {
      title: title,
      content: content,
    });
    return result.data;
  }
}

export const docApi = new DocApi();
