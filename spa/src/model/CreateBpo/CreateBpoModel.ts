import { CategoryConfig, Category } from "model";
export interface CategoryConfigRequest {
    rListingId: number;
}
export interface CategoryConfigResponse {
    minimumNumberOfMembers: number;
    config: CategoryConfig[];
}

export interface CreateBpoRequest {
    rlistingId: number;
    baIds: number[];
    grade: number;
    comments: Category[];
}
