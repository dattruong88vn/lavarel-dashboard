import { ConflictDetailResponse, ConflictDetailRequest, ResolveConflictRequest } from "model";
import { FullResponse } from "../api";
import client from "../client";

export const getConflictDetail = async ( request: ConflictDetailRequest ): Promise<FullResponse<ConflictDetailResponse>> => {
    const dataRespose = await client.get( `/bpo/get-detail-conflict/${request.rlistingId}`);
    return dataRespose;
};

export const resolveConflictBpo = async (dataPost: ResolveConflictRequest): Promise<any> => {
    return await client.post("/bpo/resolve-conflict", dataPost);
};
