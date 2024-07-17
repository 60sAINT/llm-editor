import { axios } from "@/api/AxiosInstance";
import { CreateKnowledgeParams, FileBase, KnowledgeBase } from "../interface";

const apikeyPrefix = "/api/v1/knowledge";

export class KnowledgeApi {
    public async getKnowledgeList(): Promise<KnowledgeBase[]> {
        const result = await axios.get(`${apikeyPrefix}/db/list`);
        return result.data.data.db_list;
    }

    public async createKnowledge(body: CreateKnowledgeParams) {
        const result = await axios.post(
            `${apikeyPrefix}/db/new?db_name=${body.db_name}`
        );
        return result.data;
    }

    public async delKnowledge(db_name: string) {
        const result = await axios.post(
            `${apikeyPrefix}/db/delete?db_name=${db_name}`
        );
        return result.data;
    }

    public async downloadKnowledge(db_name: string) {
        const result = await axios.get(
            `${apikeyPrefix}/db/download?db_name=${db_name}`
        );
        return result.data;
    }

    public async getFiles(db_name: string): Promise<FileBase[]> {
        const result = await axios.get(
            `${apikeyPrefix}/file/list?db_name=${db_name}`
        );
        return result.data.data.file_list;
    }
}

export const knowledgeApi = new KnowledgeApi();
