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
}

export const pdfApi = new PdfApi();
