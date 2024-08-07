export enum OPERATE {
  CREATE = "create",
  WRITE = "write",
  UPLOAD = "upload",
}

export interface TableData {
  doc_id: any;
  last_saved_at: string;
  title: string;
}
