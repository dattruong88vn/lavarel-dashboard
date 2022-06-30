import { CommentSuggestionResponse } from "model";
import { Response } from "../api";
import client from "api/client";

export const getCommentSuggestion = async (
    code: string
): Promise<Response<CommentSuggestionResponse[]>> => {
    return await client.get(`/bpo/config/get-comment-suggestions/${code}`);
};
