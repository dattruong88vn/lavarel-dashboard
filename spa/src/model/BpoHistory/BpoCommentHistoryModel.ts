import { Photo } from "model";

export enum BpoCommentHistoryType {
    CURRENT_BPO_CONFLICT = "CURRENT_BPO_CONFLICT",
    CURRENT_BPO = "CURRENT_BPO",
    BPO_HISTORY_CONFLICT = "BPO_HISTORY_CONFLICT",
    BPO_HISTORY = "BPO_HISTORY",
}

export interface BpoCommentHistoryResponse {
    categoryName: string;
    photos?: Photo[];
    comments?: string[];
}

export interface CurrentBpoConflictRequest {
    type: string;
    rlistingId: number;
}

export interface CurrentBpoSaBaRequest {
    type: string;
    rlistingId: number;
    assignedTo: number;
}

export interface BpoHistoryConflictRequest {
    type: string;
    ratingId: number;
}

export interface BpoHistorySaBaRequest {
    type: string;
    ratingId: number;
    assignedTo: number;
}
