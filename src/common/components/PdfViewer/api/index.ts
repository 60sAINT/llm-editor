import { axios } from "@/api/AxiosInstance";
import { Note } from "../interface";

const apikeyPrefix = "/api/v1";

export interface UpdateRecordsParams {
  token: string;
  paper_id: string;
  newRecords: Array<Note>;
}
export interface UpdateLastReadPageParams {
  token: string;
  paper_id: string;
  page: number;
}

export class PdfApi {
  public async getPaperById(token: string, paper_id: string) {
    const result = await axios.get(
      `${apikeyPrefix}/paper?paper_id=${paper_id}`,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async updateTags(
    token: string,
    paper_id: string,
    newTags: Array<string>
  ) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/tags?paper_id=${paper_id}`,
      newTags,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async updateComment(
    token: string,
    paper_id: string,
    newComment: string
  ) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/comment?paper_id=${paper_id}&new_comment=${newComment}`,
      {},
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async updateRecords({
    token,
    paper_id,
    newRecords,
  }: UpdateRecordsParams) {
    const result = await axios.post(
      `${apikeyPrefix}/paper/records?paper_id=${paper_id}`,
      newRecords,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async getQaSumNQuestions(token: string, paper_id: string) {
    const result = await axios.get(
      `${apikeyPrefix}/text/paper_summary_and_questions?paper_id=${paper_id}`,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
  public async getHistoryNToken(token: string, memory_id: string) {
    const result = await axios.get(
      `${apikeyPrefix}/text/chat_history_and_token?memor_id=${memory_id}`,
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
}

export const pdfApi = new PdfApi();
