import { CategoryConfig, Category } from "model";

export interface ConflictDetailResponse {
    gradeSA: number;
    avgGradeBAs: number;
    config: CategoryConfig[];
}

export interface ConflictDetailRequest {
    rlistingId: number;
}

export interface ResolveConflictRequest {
    rlistingId: number;
    grade: number;
    comments: Category[];
}
