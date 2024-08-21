import { fetch } from "@/api/FetchInstance";

const apikeyPrefix = "/api/v1";

export class ToolBarApi {
  private knowledgeBaseName: string | null;

  constructor() {
    this.knowledgeBaseName = localStorage.getItem("knowledge_base_name");
  }

  public async textContinue(text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/continue?text=${text}&knowledge_base_name=${this.knowledgeBaseName}`,
      token
    );
    return result.body;
  }

  public async textTranslate(tar_lang: string, text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/translate?tar_lang=${tar_lang}&text=${text}&knowledge_base_name=${this.knowledgeBaseName}`,
      token
    );
    return result.body;
  }

  public async textRevise(text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/revise?text=${text}&knowledge_base_name=${this.knowledgeBaseName}`,
      token
    );
    return result.body;
  }

  public async textPolish(text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/polish?text=${text}&knowledge_base_name=${this.knowledgeBaseName}`,
      token
    );
    return result.body;
  }

  public async textPolishDoc(content: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/text/polish_doc`,
      {
        content,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }

  public async textSummary(text: string, token: string) {
    const result = await fetch.get(
      `${apikeyPrefix}/text/summary?text=${text}&knowledge_base_name=${this.knowledgeBaseName}`,
      token
    );
    return result.body;
  }

  public async imageOcr(url: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/image/ocr`,
      {
        url,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }

  public async imageDetection(url: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/image/detection`,
      {
        url,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }

  public async videoDetection(url: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/video/detection`,
      {
        url,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }

  public async recognition(url: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/video/recognition`,
      {
        url,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }

  public async audioRecognition(url: string, token: string) {
    const result = await fetch.post(
      `${apikeyPrefix}/audio/recognition`,
      {
        url,
        knowledge_base_name: this.knowledgeBaseName,
      },
      token
    );
    return result.body;
  }
}

export const sideMenuApi = new ToolBarApi();
