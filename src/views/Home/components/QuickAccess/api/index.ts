import { fetch } from "@/api/FetchInstance";

const apikeyPrefix = "/api/v1";

interface PaperOutlineProps {
  title: string;
  keywords: string[];
  subject: string;
  target: string;
  language: string;
  standard: string;
  token: string;
}
interface CourseReportProps {
  course: string;
  topic: string;
  outline: string;
  requirements: string;
  limit: number;
  token: string;
}

export class AIWritingApi {
  public async paperOutline({
    title,
    keywords,
    subject,
    target,
    language,
    standard,
    token,
  }: PaperOutlineProps) {
    const result = await fetch.post(
      `${apikeyPrefix}/aiwriting/paper_outline`,
      { title, keywords, subject, target, language, standard },
      token
    );
    return result.body;
  }
  public async courseReport({
    course,
    topic,
    outline,
    requirements,
    limit,
    token,
  }: CourseReportProps) {
    const result = await fetch.post(
      `${apikeyPrefix}/aiwriting/report`,
      { course, topic, outline, requirements, limit },
      token
    );
    return result.body;
  }
}

export const aiIWritingApi = new AIWritingApi();
