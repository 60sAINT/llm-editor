import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export type NewDirectoryParams = {
  dir_name: string;
  token: string;
};
export type MoveDirectoryParams = {
  dir_id: string;
  to_dir_id: string;
  token: string;
};
export type MoveDocumentParams = {
  doc_id: string;
  to_dir_id: string;
  token: string;
};
export type DeleteDirectoryParams = {
  dir_list: Array<string>;
  token: string;
};

export class DirectoryApi {
  public async getDirectoryTree(token: string) {
    const result = await axios.get(`${apikeyPrefix}/dir/tree`, {
      headers: { "X-Authorization": token },
    });
    return result.data;
  }
  public async newDirectory({ token, dir_name }: NewDirectoryParams) {
    const result = await axios.post(
      `${apikeyPrefix}/dir/new`,
      { dir_name },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
  public async moveDirectory({
    token,
    dir_id,
    to_dir_id,
  }: MoveDirectoryParams) {
    const result = await axios.post(
      `${apikeyPrefix}/dir/move`,
      { dir_id, to_dir_id },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
  public async moveDocument({ token, doc_id, to_dir_id }: MoveDocumentParams) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/move`,
      { doc_id, to_dir_id },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
  public async deleteDirectory({ token, dir_list }: DeleteDirectoryParams) {
    const result = await axios.post(
      `${apikeyPrefix}/dir/delete`,
      { dir_list },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
}

export const directoryApi = new DirectoryApi();
