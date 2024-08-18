import { HighlightArea } from "@react-pdf-viewer/highlight";

export interface BoundaryType {
  height: number;
  left: number;
  top: number;
  width: number;
  pageIndex: number;
}

export type ReferenceType = {
  key: number;
  title: string;
  author: string;
  published_at: string;
  publisher: string;
  detail_url: string;
};

export interface PaperInformationType {
  doc_id: string;
  tags: [string];
  comment: string;
  records: Array<Note>;
  page_count: number;
  last_read_page: number;
  created_at: string;
  detail_url: string;
  last_read_at: string;
  paper_id: string;
  pdf_url: string;
  doi: string;
  title: string;
  author: Array<string>;
  published_at: string;
  abstract: string;
  figures: {
    figures: [
      {
        caption: string;
        page: number;
        url: string;
        type: "Figure";
        boundary: BoundaryType;
      }
    ];
  };
  references: {
    references: [
      {
        key: number;
        title: string;
        author: string;
        detail_url: string;
        published_at: string;
        publisher: string;
      }
    ];
  };
}

export interface ProfileProps {
  paperInformation: PaperInformationType;
}

export interface Note {
  id: number;
  content: string;
  highlightAreas: HighlightArea[];
  quote: string;
}
