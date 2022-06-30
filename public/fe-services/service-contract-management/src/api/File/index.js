import { deleteRequest, post, put, get } from '..';

const API_GETWAY = window.apiGateway;
const CONTRACT_MANAGEMENT_SERVICE = `${API_GETWAY}/contract-management/api`;
const DOCUMENT_MANAGEMENT_SERVICE = `${API_GETWAY}/document-management/api`;

export const uploadFile = async requestData => {
  const endpoint = "document/upload";
  const response =  await post(DOCUMENT_MANAGEMENT_SERVICE,endpoint,requestData,"", "multipart/form-data");
  return response.data;
};

export const updateContractFile = async requestData => {
  const endpoint = "contract/contract-file/update";
  const response = await put(CONTRACT_MANAGEMENT_SERVICE,endpoint,requestData);
  return response;
};

export const deleteContractFile = async requestData => {
  const {contractId} = requestData;
  const endpoint = `contract/delete/${contractId}`;
  const response = await deleteRequest(CONTRACT_MANAGEMENT_SERVICE,endpoint);
  return response;
};

export const printContractFile = async requestData => {
  const {contractId} = requestData;
  const endpoint = `listing-contract/export/${contractId}`;
  const response = await get(DOCUMENT_MANAGEMENT_SERVICE,endpoint);
  return response;
};