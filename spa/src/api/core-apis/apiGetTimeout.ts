import { TimeoutRequest, TimeoutResponse } from "model";
import { CollectionResponse, Response } from "../api";
import client from "api/client";

export const getTimeoutApi = async (request: TimeoutRequest): Promise<
    Response<TimeoutResponse>> => {
    const response = await client.get(`/system-config/get-time-inactive/${request.type}`);
    return response;
};
