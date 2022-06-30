import {
    CategoryConfigResponse,
    BaModelResponse,
    CreateBpoRequest,
    CategoryConfigRequest,
} from "model";
import { CollectionResponse, FullResponse, Response } from "../api";
import client from "api/client";

export const getCategoryConfig = async (
    request: CategoryConfigRequest
): Promise<FullResponse<CategoryConfigResponse>> => {
    return await client.get(
        `/bpo/config/get-comment-category-config/${request.rListingId}`
    );
};

export const getListBa = async (
    listingTypeId: number
): Promise<CollectionResponse<BaModelResponse>> => {
    return await client.get(`/user/list-ba-updated-bpo/${listingTypeId}`);
};

export const createBpo = async (dataPost: CreateBpoRequest): Promise<any> => {
    return await client.post("/bpo/create-bpo", dataPost);
};
