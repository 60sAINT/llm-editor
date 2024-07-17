export interface KnowledgeBase {
    id: number;
    name: string;
    description: string;
}

export interface CreateKnowledgeParams {
    db_name: string;
    description: string;
}
