export interface PaperInformationType {
  doc_id: string;
  tags: [string];
  comment: string;
  records: string;
  page_count: 0;
  last_read_page: 0;
  created_at: string;
  detail_url: string;
  last_read_at: string;
  paper_id: string;
  doi: string;
  title: string;
  author: Array<string>;
  published_at: string;
  abstract: string;
  figures: {
    figures: [
      {
        caption: string;
        page: 0;
        url: string;
        type: "Figure";
        boundary: {
          left: 0;
          top: 0;
          width: 0;
          height: 0;
        };
      }
    ];
  };
  references: {
    references: [
      {
        key: 0;
        title: string;
        author: string;
        published_at: string;
        publisher: string;
      }
    ];
  };
}

export interface ProfileProps {
  paperInformation: PaperInformationType;
}
