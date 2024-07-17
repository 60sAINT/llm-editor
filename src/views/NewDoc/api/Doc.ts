import { axios } from "../../../api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export type UpdateDocParams = {
  docId: string;
  title: string;
  content: string;
  token: string;
};
export class DocApi {
  public async newDoc(title: string, content: string) {
    const result = await axios.post(`${apikeyPrefix}/doc/new`, {
      title,
      content,
    });
    return result.data;
  }
  public async updateDoc({ docId, title, content, token }: UpdateDocParams) {
    const result = await axios.post(`${apikeyPrefix}/doc/update`, {
      docId,
      title,
      content,
      headers: { Authorization: token },
    });
    return result.data;
  }
  public async getDocList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/doc/list`, {
      headers: { Authorization: token },
    });
    return result.data;
  }
  public async getDocByDocId(docId: string) {
    const result = await axios.get(`${apikeyPrefix}/doc?doc_id=${docId}`);
    return result.data;
  }
  public async deleteDoc(doc_id: string) {
    const result = await axios.post(`${apikeyPrefix}/doc/delete`, {
      doc_id,
    });
    return result.data;
  }
}

export const docApi = new DocApi();
