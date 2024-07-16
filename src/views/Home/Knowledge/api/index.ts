import { axios } from "@/api/AxiosInstance";
import { CreateKnowledgeParams, KnowledgeBase } from "../interface";

const apikeyPrefix = "/api/v1";

export class KnowledgeApi {
  public async getKnowledgeList(): Promise<KnowledgeBase[]> {
    return initialData;
    const result = await axios.get(`${apikeyPrefix}/knowledge`);
    return result.data;
  }

  public async CreateKnowledge(body: CreateKnowledgeParams) {
    const result = await axios.post(`${apikeyPrefix}/knowledge/create`, body);
    return result.data;
  }
}

export const knowledgeApi = new KnowledgeApi();

const initialData: KnowledgeBase[] = [
  { id: 1, title: "YOLO工作室", description: "YOLO工作室介绍" },
  { id: 2, title: "UESTC Byte Library", description: "UESTC Byte Library介绍" },
  // 其他初始数据...
];
