import { get, post } from './client';

let { REACT_APP_BASE_URL } = process.env;
if(window?.BASE_API_CALL){
    REACT_APP_BASE_URL = window.BASE_API_CALL;
}

export const getDetailCustomer = async (phone) => {
    return get(REACT_APP_BASE_URL, `/3cx/get-customer-name-and-type-by-phone/${phone}`);
}

export const getListings = async (phone) => {
    return get(REACT_APP_BASE_URL, `/3cx/get-lead-deal-prescreen-rlistings-by-phone/${phone}`); 
}

export const getPropzyId = (dataPost) => {
    return post(REACT_APP_BASE_URL, '/3cx/init-track-history-call',dataPost);
}

export const updateEndTime = (dataPost) => {
    return post(REACT_APP_BASE_URL, '/3cx/update-after-finish-calling',dataPost);
}

