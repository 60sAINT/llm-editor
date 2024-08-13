export interface ReadingHistory {
  name: string;
  time: string;
}

export interface RecentPaperType {
  paper_id: string;
  title: string;
  last_read_at: string;
}

export interface RecommendPaperType {
  arxiv_id: string;
  authors: Array<string>;
  categories: Array<string>;
  doi: string;
  pdf_url: string;
  summary: string;
  title: string;
}
