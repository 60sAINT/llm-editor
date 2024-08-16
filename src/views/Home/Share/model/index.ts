export interface ShareDocType {
  doc_id: string;
  owner_id: string;
  owner_email: string;
  owner_nickname: string;
  title: string;
  shared_at: string;
}

export interface ShareModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  currentDoc: ShareDocType;
}

export type SearchResultItemType = {
  user_id: string;
  nickname: string;
  email: string;
  permission: string;
};
export type SearchResultType = Array<SearchResultItemType>;
