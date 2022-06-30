
import client from 'api/client';
import { CollectionResponse } from 'api/api'
import DealModel from 'model/DealModel';
import DealFilter from 'model/filter/DealFilter';
import { IDealDataPost } from 'model/DealModel/index.d';

export const getDeals = async (filter: DealFilter & IDealDataPost): Promise<CollectionResponse<DealModel>> => {
    const page = filter.pagination?.page
    const limit = filter.pagination?.limit
    const url = `/deal/get-deals/${page}/${limit}`

    const resp = await client.post(url, {
        dealIds: filter.dealIds,
        rListingId: filter.rListingId
    });
    return resp
};