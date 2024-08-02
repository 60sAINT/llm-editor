import { axios } from "@/api/AxiosInstance";
import { CreateKnowledgeParams, FileBase, KnowledgeBase } from "../interface";

const apikeyPrefix = "/api/v1/knowledge";

export class KnowledgeApi {
  public async getKnowledgeList({
    token,
  }: {
    token: string;
  }): Promise<KnowledgeBase[]> {
    const result = await axios.get(`${apikeyPrefix}/db/list`, {
      headers: { "X-Authorization": `Bearer ${token}` },
    });
    return result.data.data.db_list;
  }

  public async createKnowledge(body: CreateKnowledgeParams, token: string) {
    const result = await axios.post(
      `${apikeyPrefix}/db/new?db_name=${body.db_name}`,
      {},
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }

  public async delKnowledge(db_name: string, token: string) {
    const result = await axios.post(
      `${apikeyPrefix}/db/delete?db_name=${db_name}`,
      {},
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }

  public async downloadKnowledge(db_name: string, token: string) {
    const result = await axios.get(
      `${apikeyPrefix}/db/download?db_name=${db_name}`,
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }

  public async getFiles(db_name: string, token: string): Promise<FileBase[]> {
    const result = await axios.get(
      `${apikeyPrefix}/file/list?db_name=${db_name}`,
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data.data.file_list;
  }

  public async delFile(db_name: string, file_name: string, token: string) {
    const result = await axios.post(
      `${apikeyPrefix}/file/delete?db_name=${db_name}&file_name=${file_name}`,
      {},
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }

  public async downloadFile(db_name: string, file_name: string, token: string) {
    const result = await axios.get(
      `${apikeyPrefix}/file/download?db_name=${db_name}&file_name=${file_name}`,
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }

  public async uploadFile(db_name: string, knowledge_files: [], token: string) {
    const result = await axios.post(
      `${apikeyPrefix}/file/upload?db_name=${db_name}`,
      { knowledge_files },
      { headers: { "X-Authorization": `Bearer ${token}` } }
    );
    return result.data;
  }
}

export const knowledgeApi = new KnowledgeApi();
