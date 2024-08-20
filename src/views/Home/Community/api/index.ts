import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export interface GetPostListParams {
  token: string;
}

export class PostApi {
  public async getPostList({ token }: GetPostListParams) {
    const result = await axios.get(`${apikeyPrefix}/post/posts`, {
      headers: { "X-Authorization": token },
    });
    return result.data.data;
  }
}

export const postApi = new PostApi();
