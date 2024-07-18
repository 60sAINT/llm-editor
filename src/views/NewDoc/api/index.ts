import { fetch } from "@/api/FetchInstance";

const apikeyPrefix = "/api/v1";

export class DefaultApi {
  public async getReference(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/reference?text=${text}`);
    return result.body;
  }
}

export const defaultApi = new DefaultApi();
