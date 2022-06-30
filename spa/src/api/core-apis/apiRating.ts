import { VoteOptionsResponse } from "model";
import { CollectionResponse, Response } from "../api";
import client from "api/client";

export const getVoteOptions = async (): Promise<
    CollectionResponse<VoteOptionsResponse>
> => {
    const response = await client.get("/bpo/config/grades");

    return response;
};
