import {get, post } from "..";

const API_GETWAY = window.apiGateway;
const DASHBOARD_SERVICE = `${API_GETWAY}/dashboard/api`;
const CONTRACT_MANAGEMENT_SERVICE = `${API_GETWAY}/contract-management/api`;

// DASHBOARD_SERVICE
export const apiGetZones = async (requestData) => {
  const { entity, action, permissionId, requestBody } = requestData;

  const endpoint = `departments/get-list-zone/${entity}/${action}/${permissionId}`;
  const response =  await post(DASHBOARD_SERVICE,endpoint,requestBody);
  return response.data;
};

export const apiGetTeams = async (requestData) => {
  const { entity, action, permissionId, requestBody } = requestData;
  const endpoint = `departments/get-list-team/${entity}/${action}/${permissionId}`;
  const response =  await post(DASHBOARD_SERVICE,endpoint,requestBody);
  return response.data;
};

export const apiGetDepartments = async (requestData) => {
  const { entity, action, permissionId, requestBody } = requestData;
  const endpoint = `departments/get-list-department/${entity}/${action}/${permissionId}`;
  const response =  await post(DASHBOARD_SERVICE,endpoint,requestBody);
  return response.data;
};

export const apiGetUsers = async (requestData) => {
  const { entity, action, permissionId, requestBody } = requestData;
  const endpoint = `departments/get-list-user/${entity}/${action}/${permissionId}`;
  const response =  await post(DASHBOARD_SERVICE,endpoint,requestBody);
  return response.data;
};

// CONTRACT_MANAGEMENT_SERVICE
export const apiGetContractTypeDefine = async (requestData) => {
  const { code } = requestData;
  const endpoint = `contract/get-type-define/${code}`;
  const response =  await get(CONTRACT_MANAGEMENT_SERVICE,endpoint);
  return response.data;
};

export const apiGetStatus = async (requestData) => {
  const { code } = requestData;
  const endpoint = `contract/get-status-define/${code}`;
  const response =  await get(CONTRACT_MANAGEMENT_SERVICE,endpoint);
  return response.data;
};