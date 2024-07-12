import { axios } from "@/api/AxiosInstance";

const apikeyPrefix = "/api/v1";

export class DropdownMenuApi {
  public async downloadDoc(html: string, template: string) {
    const result = await axios.post(
      `${apikeyPrefix}/doc/export`,
      {
        html: html,
        template: template,
      },
      { responseType: "blob" }
    );
    return result.data;
  }
}

export const dropdownMenuApi = new DropdownMenuApi();
