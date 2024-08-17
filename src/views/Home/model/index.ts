export enum OPERATE {
  CREATE = "create",
  WRITE = "write",
  UPLOAD = "upload",
  ACADEMIC = "academic",
  COURSEREPORT = "courseReport",
  SOCIALREPORT = "socialReport",
  ReadingNote = "readingNote",
  SPEECH = "speech",
  COMPOSITION = "composition",
  EXPERIMENT = "experiment",
  TRAIN = "train",
  TEACH = "teach",
  TEACHPLAN = "teachPlan",
  ANALYZE = "analyze",
}

export interface TableData {
  doc_id: any;
  last_saved_at: string;
  title: string;
}
