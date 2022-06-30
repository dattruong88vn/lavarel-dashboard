import { get, put } from './client';

let { REACT_APP_BASE_URL } = process.env;
if(window?.BASE_API_CALL){
    REACT_APP_BASE_URL = window.BASE_API_CALL;
}

export const getListLeadDealPrescreenRlistings = async (phone) => {
    return await get(REACT_APP_BASE_URL, `/3cx/get-lead-deal-prescreen-rlistings-for-dropdown-label/${phone}`);
};

export const updateTrackHistoryCall = async (dataPut) => {
    return await put(REACT_APP_BASE_URL, '/3cx/update-track-history-call', dataPut);
}; 