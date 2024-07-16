export interface KnowledgeBase {
  id: number;
  title: string;
  description: string;
}

export interface CreateKnowledgeParams {
  title: string;
  description: string;
}
