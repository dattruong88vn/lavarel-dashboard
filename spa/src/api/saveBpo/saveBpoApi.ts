import { CategoryConfigBuySideResponse, SaveBpoRequest, CategoryConfigBuySideRequest } from "model";
import { FullResponse } from "../api";
import client from "api/client";

export const getCategoryConfigBuySide = async (request: CategoryConfigBuySideRequest): Promise<FullResponse<CategoryConfigBuySideResponse>> => {
    return await client.get(`/bpo/config/get-comment-category-config-buy-side/${request.rListingId}/${request.assignedTo}`);
};

export const saveBpo = async (dataPut: SaveBpoRequest): Promise<any> => {
    return await client.put("/bpo/rating-bpo", dataPut);
};
