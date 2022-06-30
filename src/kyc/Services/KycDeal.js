import apiCaller from "../../utils/apiCaller";

const URL_DEAL_DETAIL = "/deal/get-detail-json/";
const URL_SEARCH_LISTING = "/kyc-api/search-listings";
const URL_SEARCH_LISTING_MATCHING_RANKING = "/kyc-api/search-listings-matching-ranking";
const URL_FETCH_KML = "/kyc-api/kml";
const URL_SAVE_DEAL = "/kyc-api/update-deal";
const URL_LISTING_DETAIL = "/common/open-modal-listing-detail/json";
const URL_LISTING_DETAIL_V2 = "/kyc-api/get-listing-detail";
const URL_CREATE_COLLECTION = "/crm-dashboard/create-collection";
const URL_LISTING_COMPARE = "/kyc-api/get-listing-compare";

export function fetchDealDetail(id, callback) {
    fetch(URL_DEAL_DETAIL + id)
        .then(res => res.json())
        .then((result) => {
            callback(result.data);
        });
}

export function fetchSearchListings(postData, callback) {
    apiCaller(URL_SEARCH_LISTING, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}

export function fetchSearchListingsMatchingRanking(postData, callback) {
    apiCaller(URL_SEARCH_LISTING_MATCHING_RANKING, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}

export function fetchKMLLink(postData, callback) {
    apiCaller(URL_FETCH_KML, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data); //http://45.117.162.49:7777/kmz/42976.kmz
            // callback({
            //     "result": true,
            //     "code": "200",
            //     "message": "Thao tác thành công",
            //     "validatedMessage": null,
            //     "data": {"link": "https://cdn.propzy.vn/kmz1/ho-chi-minh.kmz"}
            // });
        })
}

export function postSaveDeal(postData, callback) {
    apiCaller(URL_SAVE_DEAL, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}

export function postCreateCollection(postData, callback) {
    apiCaller(URL_CREATE_COLLECTION, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}

export function fetchListingDetail(postData, callback) {
    apiCaller(URL_LISTING_DETAIL, "POST", JSON.stringify(postData))
        .then((res) => {
            if (!res)
                callback(false);
            else
                callback(res.data);
        })
}

export function fetchListingDetailV2(postData, callback) {
    apiCaller(URL_LISTING_DETAIL_V2, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}

export function getListingCompare(postData, callback) {
    apiCaller(URL_LISTING_COMPARE, "POST", JSON.stringify(postData))
        .then((res) => {
            callback(res.data);
        })
}
