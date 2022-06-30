import Axios from 'axios';

const SERVER = '/';
const COMMISSION_DEAL = 'commission-deal/';

const http = Axios.create({
    baseURL: SERVER,
    headers: {
        'Content-type': 'application/json'
    }
});

/**
 * Get list of commistion deal list
 * @param page 
 * @param itemsPerPage
 * @param searchValue
 * Date: 2020/07/14
 * Author: thu.tran@propzy.com
 */

const getCommissionDealList = (page = 1, itemsPerPage = 10, search = '') => {
    return http.post(`${COMMISSION_DEAL}getCommissionDealList`, {
        page: page,
        itemsPerPage,
        search
    });
}

/**
 * Get collected money methods
 */

const moneyCollectedDetails = (dealFinId) => {
    const params = new URLSearchParams();
        params.append('dealFinId', `${dealFinId}`);

    const url = `${COMMISSION_DEAL}getMoneyCollectedDetail?${params}`;
    return http.get(url);
}


/**
 * Handle money collection action
 */
const postMoneyCollected = (values) => {
    return http.post(`${COMMISSION_DEAL}postMoneyCollected`, values);
}

/**
 * Handle collected completion action
 */
const postCollectedCompletion = (values) => {
    return http.post(`${COMMISSION_DEAL}postCollectedCompletion`, values);
}

/**
 * Get list of money collected history
 * @param dealFinId
 */
const getMoneyCollectedHistoryList = (params) => {
    return http.post(`${COMMISSION_DEAL}getMoneyCollectedHistoryList`, params);
}

/**
 * Get list of contract news categories
 */
const getContractNewsCategories = () => {
    return http.get(`${COMMISSION_DEAL}getContractNewsCategories`);
}

/**
 * Update record
 * if record is fulfilled
 *     fulfilled has value of true
 * else 
 *     fulfilled has value of false
 */
const updateRecord = (values) => {
    return http.post(`${COMMISSION_DEAL}updateRecord`, values);
}

/**
 * Get deal fin detail with file
 * @param {*} dealId 
 */
const getDealFinDetails = dealFinId => {
    const params = new URLSearchParams();
    params.append('dealFinId', `${dealFinId}`);

    const url = `${COMMISSION_DEAL}getDealFinDetails?${params}`;
    return http.get(url);
} 

/**
 * Get list of money collected plan list
 */
const getMoneyCollectedPlanList = (dealId) => {
    const params = new URLSearchParams()
    params.append('dealId', `${dealId}`);
    return http.get(`${COMMISSION_DEAL}getMondeyCollectedPlanList?${params}`);
}

/**
 * Post money collected plan
 */
const postMoneyCollectedPlanList = (values) => {
    return http.post(`${COMMISSION_DEAL}postMoneyCollectedPlanList`, values);
}

export default {
    getCommissionDealList,
    moneyCollectedDetails,
    postMoneyCollected,
    postCollectedCompletion,
    getMoneyCollectedHistoryList,
    getContractNewsCategories,
    updateRecord,
    getMoneyCollectedPlanList,
    postMoneyCollectedPlanList,
    getDealFinDetails
}