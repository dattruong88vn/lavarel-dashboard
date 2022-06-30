import { get } from '..';

const API_GETWAY = window.apiGateway;
const CONTRACT_MANAGEMENT_SERVICE = `${API_GETWAY}/contract-management/api`;

export const contractPermission = async requestData => {
  const {contractId, actionCode} = requestData;
  const endpoint = `contract/check-permission/${actionCode}/${contractId}`;
  const response = await get(CONTRACT_MANAGEMENT_SERVICE,endpoint);
  return response;
};