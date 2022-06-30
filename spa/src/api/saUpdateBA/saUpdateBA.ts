import { BaModelResponse, ListBAAssignedResponse, SAUpdateBARequest } from "model";
import { CollectionResponse, FullResponse, Response } from "../api";
import client from "api/client";

export const getListBa = async (rlistingId: number): Promise<CollectionResponse<BaModelResponse>> => {
    return await client.get(`/user/list-ba-not-assign-bpo/${rlistingId}`);
};

export const getListBaAssigned = async (rlistingId: number): Promise<FullResponse<ListBAAssignedResponse>> => {
    return await client.get(`/bpo/get-ba-rating/${rlistingId}`);
};

export const updateBABPO = async (dataPost: SAUpdateBARequest, rlistingId : number): Promise<FullResponse<any>> => {
    return await client.put(`/bpo/update-list-ba-rating/${rlistingId}`, dataPost);
};
