import axios from "axios";

const API = {
    GET_CHANNEL_SUB_TYPE: '/kyc-api/get-list-channel-sub-type',
    GET_PROPERTY_TYPE_LIST: '/lso/get-property-type-list'
};

export const  fetchChannelSubType = async (type) => {
    return axios.get(API.GET_CHANNEL_SUB_TYPE + '/' + type);
};
export const  _serFetchPropertyType = async (listingTypeId) => {
    return axios.get(API.GET_PROPERTY_TYPE_LIST + '/' + listingTypeId);
};