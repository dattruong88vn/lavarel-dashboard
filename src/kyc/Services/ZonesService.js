import apiCaller from "../../utils/apiCaller";
const URL_GET_DISTRICT_BY_CITY = "/common/get-district/";
const URL_GET_WARDS_BY_CITY = "/common/get-wards/";
const URL_GET_MATCHING_TABS = "/deal/get-list-matched-tabs-for-kyc";
const URL_GET_STREET_BY_WARD_IDS = "/zone/get-streets-by-ward-ids";

export function getMatchingTabs(callBack){
    apiCaller(URL_GET_MATCHING_TABS, "GET")
    .then((response)=>{
        callBack(response.data);
    })
}

export function getDistricts(cityId, callBack){
    apiCaller(URL_GET_DISTRICT_BY_CITY+cityId, "GET")
    .then((response)=>{
        callBack(response.data);
    })
}

export function getWards(districtId, callBack){
    apiCaller(URL_GET_WARDS_BY_CITY+districtId, "GET")
    .then((response)=>{
        callBack(response.data);
    })
}

export function getStreetsByWardIds(wardIds, callBack) {
    let postData = {
        wardIdsList: wardIds
    }
    apiCaller(URL_GET_STREET_BY_WARD_IDS, "POST", JSON.stringify(postData))
    .then((response)=>{
        callBack(response.data);
    })
}