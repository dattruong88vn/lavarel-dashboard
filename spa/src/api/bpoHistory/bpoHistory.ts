import {
    BpoHistoryDateTimeResponse,
    BpoHistoryDateTimeRequest,
    BpoHistoryResponse,
    BpoHistoryRequest,
    CurrentBpoConflictRequest,
    BpoCommentHistoryResponse,
    CurrentBpoSaBaRequest,
    BpoHistoryConflictRequest,
    BpoHistorySaBaRequest
} from "model";
import { Response, FullResponse } from "../api";
import client from "../client";

//sa
export const saGetCreatedDateBpoHistory = async (request: BpoHistoryDateTimeRequest): Promise<FullResponse<BpoHistoryDateTimeResponse[]>> => {
    const dataRespose = await client.get(`/bpo/get-created-date-bpo-history/${request.rlistingId}`);
    return dataRespose;
};

export const saGetBpoHistory = async (request: BpoHistoryRequest): Promise<Response<BpoHistoryResponse>> => {
    const dataRespose = await client.post("/bpo/get-bpo-by-rating-id", request);
    return dataRespose;
};

//ba
export const baGetCreatedDateBpoHistory = async (request: BpoHistoryDateTimeRequest): Promise<FullResponse<BpoHistoryDateTimeResponse[]>> => {
    const dataRespose = await client.get(`/bpo/get-created-date-bpo-history-for-ba/${request.rlistingId}`);
    return dataRespose;
};

export const baGetBpoHistory = async (request: BpoHistoryRequest): Promise<Response<BpoHistoryResponse>> => {
    const dataRespose = await client.post("/bpo/get-bpo-by-rating-id-for-ba",request);
    return dataRespose;
};

//comment
export const getCommentsCurrentBpoConflict = async (request: CurrentBpoConflictRequest): Promise<Response<BpoCommentHistoryResponse[]>> => {
    const dataRespose = await client.post("/bpo/get-comments", request);
    return dataRespose;
};

export const getCommentsCurrentBpoSaBa = async (request: CurrentBpoSaBaRequest): Promise<Response<BpoCommentHistoryResponse[]>> => {
    const dataRespose = await client.post("/bpo/get-comments", request);
    return dataRespose;
};

export const getCommentsBpoHistoryConflict = async (request: BpoHistoryConflictRequest): Promise<Response<BpoCommentHistoryResponse[]>> => {
    const dataRespose = await client.post("/bpo/get-comments", request);
    return dataRespose;
};

export const getCommentsBpoHistorySaBa = async (request: BpoHistorySaBaRequest): Promise<Response<BpoCommentHistoryResponse[]>> => {
    const dataRespose = await client.post("/bpo/get-comments", request);
    return dataRespose;
};
