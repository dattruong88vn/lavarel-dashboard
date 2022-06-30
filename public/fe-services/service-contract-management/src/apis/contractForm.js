import { get, post, put } from './client';
let REACT_APP_BASE_URL = null;

if (window?.BASE_API_CALL) {
    REACT_APP_BASE_URL = window.apiGateway;
}

export const getPreListing = keywork => {
    return get(REACT_APP_BASE_URL, `/contract-management/api/contract/search-lso-listing/${keywork}`);
}

export const getAutofill = preId => {
    return get(REACT_APP_BASE_URL, `/contract-management/api/contract/customer-info-by-preid/${preId}`);
}

export const getDefines = () => {
    return get(REACT_APP_BASE_URL, `/contract-management/api/contract/get-type-define/ALL`);
}

export const getStatusContract = () => {
    return get(REACT_APP_BASE_URL, `/contract-management/api/contract/get-status-define/STATUS`);
}

export const createContract = dataPost => {
    return post(REACT_APP_BASE_URL, `/contract-management/api/contract/add`,dataPost);
}

export const updateContract = dataPost => {
    return put(REACT_APP_BASE_URL, `/contract-management/api/contract/update`,dataPost);
}

export const getContractDetail = (id) => {
    return get(REACT_APP_BASE_URL, `/contract-management/api/contract/detail/${id}`);
}