import client from "../client";
import { CollectionResponse } from "../api";
import ChartModel from "../../model/ChartModel";

export const getCharts = async (): Promise<
    CollectionResponse<ChartModel.RootObject>
> => {
    return await client.get("/bpo/get-bsa-bpo-card-data");
};
