import { CancelToken } from "axios";
import {
    SalePipelineReportRequest,
    DataRowSalePipeline,
    DateRanger,
    SumPipeLineModel,
    FilterPipeLine,
    ListingGroup,
    SalePipelineTrackingRequest,
} from "model";

import { Response, FullResponse } from "../../api";
import { get, post } from "../../clientAxios";

const _window = (window as any).window;
const dealAPi = "/deal/api/";
const URL = _window.apiGateway?.replace(/\/$/, "") + dealAPi;

export const getSalesPipelineReport = async (
    request: SalePipelineReportRequest,
    cancelToken: CancelToken
): Promise<FullResponse<DataRowSalePipeline[]>> => {
    const dataResponse = await post(
        URL,
        `/sales-pipeline/report/${request.page}/${request.numberItem}`,
        {
            ...request.filter,
            ...request.listingGroup,
            expectedTimeRanges: request.expectedTimeRanges,
            removeEmpty: request.removeEmpty,
        },
        cancelToken
    );
    return dataResponse;
};

export const getListDateRanger = async (
    filter: FilterPipeLine,
    listingGroup: ListingGroup,
    removeEmpty: boolean
): Promise<FullResponse<DateRanger[]>> => {
    const dataResponse = await post(URL, "/sales-pipeline/get-range-time", {
        ...filter,
        ...listingGroup,
        removeEmpty,
    });
    return dataResponse;
};

export const getSumSalePipeline = async (
    filter: FilterPipeLine,
    listingGroup: ListingGroup
): Promise<FullResponse<SumPipeLineModel>> => {
    const dataResponse = await post(URL, "/sales-pipeline/get-sum", {
        ...filter,
        ...listingGroup,
    });
    return dataResponse;
};

export const salePipeLineTracking = async (
    request: SalePipelineTrackingRequest
): Promise<any> => {
    const dataRespose = await post(
        URL,
        "/sales-pipeline/save-view-sale-pipeline-tracking",
        request
    );
    return dataRespose;
};
