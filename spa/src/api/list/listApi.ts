import client from '../client';
import { Response, CollectionResponse } from '../api';
import { CenterModel, ChannelTypeModel, DataDealMatrixModel, DataPostGetListingDealMatrix, DataPostGetMemberList, DistrictModel, InformationChannelModel, InformationSourceModel, ListModel, MemberModel, PropertyModel, PropertyPrefixModel, WardModel, ZoneModel } from 'model/listing/ListingModel';
import { ListingDetailModel } from 'model/ListingDetailModel'

export const getZoneList = async (id: string | number, entity: string): Promise<CollectionResponse<ZoneModel>> => {
    return await client.post(`/departments/get-list-zone/${entity}/list/${id}`, {});
};

export const getTeamList = async (id: string | number, zoneId: Array<string | number> | null, entity: string): Promise<CollectionResponse<ZoneModel>> => {
    return await client.post(`/departments/get-list-team/${entity}/list/${id}`, {zoneIds: zoneId});
};

export const getDepartmentList = async (id: string | number, entity: string): Promise<CollectionResponse<ZoneModel>> => {
    return await client.post(`/departments/get-list-department/${entity}/list/${id}`, {});
};

export const getMemberList = async (id: string | number, dataPost: DataPostGetMemberList, entity: string): Promise<CollectionResponse<MemberModel>> => {
    return await client.post(`/departments/get-list-user/${entity}/list/${id}`, dataPost);
};

export const getDistrictList = async (id: string | number): Promise<CollectionResponse<DistrictModel>> => {
    return await client.get(`/districts/${id}`);
};

export const getWardList = async (id: string | number): Promise<CollectionResponse<WardModel>> => {
    return await client.get(`/get_wards/${id}`);
};

export const getInformationChannelList = async (type: string | number, parentId: string | number): Promise<Response<ListModel<InformationChannelModel>>> => {
    return await client.get(`/prescreen/channel-types-child-and-tc/${type}/${parentId}`);
};

export const getChannelType = async (id: string | number): Promise<CollectionResponse<ListModel<ChannelTypeModel>>> => {
    return await client.get(`/channel-types/${id}`);
};

export const getCardType = async () : Promise<CollectionResponse<ChannelTypeModel>> => {
    return await client.get('/channel-type/44/0');
};

export const getSellerChannelType = async (id: string | number): Promise<CollectionResponse<ListModel<ChannelTypeModel>>> => {
    return await client.get(`/seller/channel-types/${id}`);
};

export const getPrescreenChannelType = async (): Promise<CollectionResponse<ListModel<ChannelTypeModel>>> => {
    return await client.get('/prescreen/channel-types');
};

export const getPropertyList = async (id: string | number): Promise<Array<PropertyModel>> => {
    return await client.get(`/property_type/list/${id}`);
};

export const getPropertyListV2 = async (id: string | number): Promise<CollectionResponse<Array<PropertyPrefixModel>>> => {
    return await client.get(`/v2/property_type/list/${id}`);
};

export const getInformationSourceList = async (type: string | number, parentId: string | number): Promise<Response<ListModel<InformationSourceModel>>> => {
    return await client.get(`/prescreen/channel-types-child-and-tc/${type}/${parentId}`);
}

export const getCenterList = async (): Promise<CollectionResponse<CenterModel>> => {
    return await client.get('/transaction-center');
}

export const getListingDealMatrix = async (page: string | number, limit: string | number, dataPost: DataPostGetListingDealMatrix): Promise<CollectionResponse<DataDealMatrixModel>> => {
    return await client.post(`/bpo-listing-matrix/list/${page}/${limit}`, dataPost);
}

export const getTotalRecordsDealMatrix = async (dataPost: DataPostGetListingDealMatrix): Promise<Response<number>> => {
    return await client.post('/bpo-listing-matrix/count', dataPost);
}

export const getDetailListing = async (rlistingId: string | number | null): Promise<Response<ListingDetailModel>> => {
    return await client.get(`/relatelisting/bsa/${rlistingId}`);
};