import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export interface NewPostParams {
  token: string;
  title: string;
  content: string;
  cover: string;
}

export class PublicPostApi {
  public async newPost({ token, title, content, cover }: NewPostParams) {
    const result = await axios.post(
      `${apikeyPrefix}/post/new_post`,
      { title, content, cover },
      { headers: { "X-Authorization": token } }
    );
    return result.data;
  }
}

export const publicPostApi = new PublicPostApi();
