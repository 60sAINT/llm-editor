import { axios } from "../../../api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export type UpdateDocParams = {
  doc_id: string;
  title: string;
  content: string;
  token: string;
};
export type RenameDocParams = {
  token: string;
  doc_id: string;
  new_doc_name: string;
};

export class DocApi {
  public async newDoc(
    token: string,
    title: string,
    content: string,
    dir_id?: string
  ) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/new`,
      {
        title,
        content,
        dir_id,
      },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data;
  }
  public async updateDoc({ doc_id, title, content, token }: UpdateDocParams) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/update`,
      {
        doc_id,
        title,
        content,
      },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data;
  }
  public async getDocList(token: string) {
    const result = await axios.get(`${apikeyPrefix}/doc/recent`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  public async getDocByDocId(token: string, docId: string) {
    const result = await axios.get(`${apikeyPrefix}/doc?doc_id=${docId}`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  public async deleteDoc(token: string, doc_list: string[]) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/delete`,
      {
        doc_list,
      },
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data;
  }
  public async renameDoc({ token, doc_id, new_doc_name }: RenameDocParams) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/rename`,
      { doc_id, new_doc_name },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
}

export const docApi = new DocApi();
