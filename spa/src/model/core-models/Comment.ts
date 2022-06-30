export interface Photo {
    link: string;
    isPrivate: boolean;
    source: string;
    isApproved: boolean;
}

export interface Comment {
    suggestionId: number;
    comment: string;
}

export interface CommentSuggestionResponse {
    categoryId: number;
    comments: Comment[];
}

export interface Category {
    categoryId: number;
    photos: Photo[];
    comments: Comment[];
}
