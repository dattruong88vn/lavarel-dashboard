import {get, post} from "..";

const API_GETWAY = window.apiGateway;
const CONTRACT_MANAGEMENT_SERVICE = `${API_GETWAY}/contract-management/api`;
const DASHBOARD_SERVICE = `${API_GETWAY}/dashboard/api`;

export const getContracts = async (requestData) => {
  const { page, limit, requestBody } = requestData;
  const endpoint = `contract/list/${page}/${limit}`;
  const response =  await post(CONTRACT_MANAGEMENT_SERVICE,endpoint,requestBody);
  return response;
};

export const getContractExtendData = async (requestData) => {
  const { preListingId } = requestData;
  const endpoint = `/contract/get-extend-data-from-lso/${preListingId}`;
  const response =  await get(DASHBOARD_SERVICE,endpoint);
  return response;
};