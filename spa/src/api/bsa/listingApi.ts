
import client from '../client';
import {CollectionResponse, Response, encode} from '../api';
import ListingFilter from 'model/filter/ListingFilter';
import ListingModel from 'model/listing/ListingModel';


export const getListings = async (filter: ListingFilter): Promise<CollectionResponse<ListingModel>> => {
    return await client.postDirectly(`/pos/SaApi/searchList`, filter);
};
export const getZones = async (filter: any): Promise<CollectionResponse<any>> => {
    return await client.postDirectly(`/common/get-zones`, filter);
};
export const getTeams = async (filter: any): Promise<CollectionResponse<any>> => {
    return await client.postDirectly(`/common/get-teams`, filter);
};
export const getDepartments = async (filter: any): Promise<CollectionResponse<any>> => {
    return await client.postDirectly(`/common/get-departments`, filter);
};
export const getMembers = async (filter: any): Promise<CollectionResponse<any>> => {
    return await client.postDirectly(`/common/get-members`, filter);
};
export const getDistricts = async (cityId: any = 1): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/common/get-districts/${cityId}`);
};
export const getWards = async (districtId: any = -1): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/common/get-wards/${districtId}`);
};
export const getChannelTypeList = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/pos/SaApi/get-channel-type-list`);
};
export const getPropertyTypes = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/lso/get-property-types`)
};
export const getPropertyTypeLists = async (typeId: any = -1): Promise<any> => {
    return await client.getDirectly(`/lso/get-property-type-list/${typeId}`)
};
export const getChannelTypes = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/pos/prescreener/channel-types`);
};
export const getChannelInformations = async (): Promise<any> => {
    return await client.getDirectly(`/pos/CommonPos/get-information-channel`);
};
export const getChannelInformationChilds = async (channelId: any = -1): Promise<any> => {
    return await client.getDirectly(`/pos/CommonPos/get-information-channel-child?parentId=${channelId}`);
};
export const getTransactionCenters = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/pos/SaApi/get-transaction-center`);
};
export const getListCards = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/pos/SaApi/get-list-card`);
};
export const getListBpos = async (): Promise<CollectionResponse<any>> => {
    return await client.getDirectly(`/pos/SaApi/get-list-bpo`);
};
