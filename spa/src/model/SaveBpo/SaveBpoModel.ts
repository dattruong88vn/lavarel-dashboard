import { Category, CategoryConfig } from "model";

export interface SaveBpoRequest {
    rlistingId: number;
    assignedTo: number;
    grade: number;
    comments: Category[];
}

export interface CategoryConfigBuySideResponse {
    minimumNumberOfMembers: number;
    config: CategoryConfig[];
}

export interface CategoryConfigBuySideRequest {
    rListingId: number;
    assignedTo: number;
}
