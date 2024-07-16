import { axios } from "../../../api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export type UpdateDocParams = {
  docId: string;
  title: string;
  content: string;
};
export class DocApi {
  public async newDoc(title: string, content: string) {
    const result = await axios.post(`${apikeyPrefix}/doc/new`, {
      title,
      content,
    });
    return result.data;
  }
  public async updateDoc({ docId, title, content }: UpdateDocParams) {
    const result = await axios.post(`${apikeyPrefix}/doc/update`, {
      docId,
      title,
      content,
    });
    return result.data;
  }
  public async getDocList() {
    const result = await axios.get(`${apikeyPrefix}/doc/list`);
    console.log("result", result);
    return result.data;
  }
}

export const docApi = new DocApi();
