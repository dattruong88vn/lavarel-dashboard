import client from "../client";
import { CollectionResponse } from "../api";
import ChartModel from "model/ChartModel";
import { PagePermission } from "model";

export const getBaChart = async (): Promise<CollectionResponse<ChartModel.RootObject>> => {
    return await client.get("/bpo/get-ba-bpo-card-data");
};

export const getPagesPermission = async (): Promise<CollectionResponse<PagePermission>> => {
    return await client.get("/ba-dashboard/access");
};
