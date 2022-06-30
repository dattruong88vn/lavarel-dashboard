import Axios from 'axios';

const SERVER = '/';
const COMMISSION_REVENUE_REPORT = 'commission-revenue-report/';

const http = Axios.create({
    baseURL: SERVER,
    headers: {
        'Content-type': 'application/json'
    }
});

const zone = Axios.get(`${COMMISSION_REVENUE_REPORT}getZones`);
const team = Axios.get(`${COMMISSION_REVENUE_REPORT}getTeams`);
const dealStatus = Axios.get(`${COMMISSION_REVENUE_REPORT}getDealStatuses`);
const collectedStatus = Axios.get(`${COMMISSION_REVENUE_REPORT}getCollectedStatuses`);
const transactionType = Axios.get(`${COMMISSION_REVENUE_REPORT}getTransactionTypes`);
const paymentMethod = Axios.get(`${COMMISSION_REVENUE_REPORT}getPaymentMethods`);

const getAll = () => {
    return Axios.all([zone, team, dealStatus, collectedStatus, transactionType, paymentMethod]);
}

/**
 * Get list of teams 
 * @param {*} zoneIds number[] 
 */
const getTeams = (zoneIds) => http.post(`${COMMISSION_REVENUE_REPORT}getTeams`, { zoneIds });

/**
 * Get list of revenue report
 */
const getRevenueReports = filter => {
    return http.post(`${COMMISSION_REVENUE_REPORT}getRevenueReports`, filter);
}

/**
 * Get commission brokerage details of a dealId
 * @param dealId 
 */
const getCommissionBrokerageDetails = dealId => {
    const params = new URLSearchParams()
    params.append('dealId', dealId)
    return http.get(`${COMMISSION_REVENUE_REPORT}getCommissionBrokerageDetails?${params}`);
}

/**
 * Get accumulated commission history timeline
 */
const getCommissionUser = (userId, dealFinId) => {
    const params = new URLSearchParams()
    params.append('dealFinId', dealFinId)
    params.append('userId', userId)
    return http.get(`${COMMISSION_REVENUE_REPORT}getCommissionUser?${params}`);
}

/**
 * Get fixed commission brokerage details
 */
const getFixedCommissionBrokerage = timelineID => {
    const params = new URLSearchParams()
    params.append('timelineID', timelineID)
    return http.get(`${COMMISSION_REVENUE_REPORT}getFixedCommissionBrokerage?${params}`);
}

/**
 * Get commission history review
 */
const getCommissionHistoryReview = (data) => {
    return http.post(`${COMMISSION_REVENUE_REPORT}getCommissionHistoryReview`, data);
}

/**
 * Export report
 */
const exportCommissionReport = (data) => http.post(`${COMMISSION_REVENUE_REPORT}exportCommissionReport`, data)

export default {
    getAll,
    getTeams,
    getRevenueReports,
    getCommissionBrokerageDetails,
    getCommissionUser,
    getFixedCommissionBrokerage,
    getCommissionHistoryReview,
    exportCommissionReport
}