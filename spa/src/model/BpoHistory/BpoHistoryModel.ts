export enum BpoFinalCaseId {
    INCOMPLETE_BPO = 1,
    COMPLETE_BUT_CONFLICT = 2,
    FINALIZED_BPO_WITH_SOLVE_CONFLICT = 3,
    FINALIZED_BPO = 4,
}

export enum UserStatusId {
    AWAITING_APPROVAL = 1,
    ACTIVE = 2,
    LOCKED = 3,
}
export interface BpoHistoryDateTimeResponse {
    ratingId: number;
    createdDate: number;
}

export interface BpoHistoryDateTimeRequest {
    rlistingId: number;
}

export interface BpoHistoryResponse {
    ratingId: number;
    bpoCreatedDate: number;
    ratingUsers: RatingUsers[];
    finalRating: FinalRating;
}

export interface RatingUsers {
    ratingDate: number;
    ratingUser: number;
    ratingUserName: string;
    assignedTo: number;
    assignedToName: string;
    grade: number;
    bpoCloseDate: number;
    isSA: boolean;
    isRemoved: boolean;
    removedReason: string;
    removedDate: number;
    answer: string;
    userStatusId: UserStatusId;
    userStatus: string;
    hasComment: boolean;
}
export interface FinalRating {
    bpoCloseGradeDate: number;
    bpoCloseGrade: number;
    bpoCloseDate: number;
    saGrade: number;
    resolveUser: string;
    bpoStatus: number;
    bpoStatusName: string;
    bpoStatusId: number;
    formatBpoStatus: any;
    avgBAGrade: number;
    saId: number;
    bpoFinalCaseId: BpoFinalCaseId;
    bpoFinalCase: string;
    hasCommentSolvedConflict: boolean;
}

export interface BpoHistoryRequest {
    rlistingId: number;
    ratingId: number;
}
