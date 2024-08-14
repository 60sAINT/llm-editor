import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class PdfApi {
  public async getPaperById(token: string, paper_id: string) {
    const result = await axios.get(
      `${apikeyPrefix}/paper?paper_id=${paper_id}`,
      {
        headers: { "X-Authorization": token },
      }
    );
    console.log(result);
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
      {
        headers: { "X-Authorization": token },
      }
    );
    return result.data.data;
  }
}

export const pdfApi = new PdfApi();
