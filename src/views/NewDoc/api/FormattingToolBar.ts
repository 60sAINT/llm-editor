import { fetch } from "@/api/FetchInstance";

const apikeyPrefix = "/api/v1";

export class ToolBarApi {
  public async textContinue(text: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/continue?text=${text}`
    );
    return result.body;
  }

  public async textTranslate(tar_lang: string, text: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/translate?tar_lang=${tar_lang}&text=${text}`
    );
    return result.body;
  }
  public async textRevise(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/text/revise?text=${text}`);
    return result.body;
  }

  public async textPolish(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/text/polish?text=${text}`);
    return result.body;
  }

  public async textSummary(text: string) {
    const result = await fetch.get(`${apikeyPrefix}/text/summary?text=${text}`);
    return result.body;
  }
}

export const sideMenuApi = new ToolBarApi();
