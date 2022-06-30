import Axios from 'axios';

const SERVER = '/';
const CRAWLER_LIST = 'pos/crawler-list/';

const http = Axios.create({
    baseURL: SERVER,
    headers: {
        'Content-type': 'application/json'
    } 
});

const getSiteList = () => http.get(`${CRAWLER_LIST}getSiteList`);

const getDefaultList = (define) => http.get(`${CRAWLER_LIST}getDefaultList/${define}`);

const getPropertyList = (id) => http.get(`${CRAWLER_LIST}getPropertyListPrefix/${id}`);

const getDistrictList = () => http.get(`${CRAWLER_LIST}getDistrictList`);

const getWardList = (districtId) => http.get(`${CRAWLER_LIST}getWardList/${districtId}`);

const getStreetList = (streetId) => http.get(`${CRAWLER_LIST}getStreetList/${streetId}`);

const getDuplicatePhones = (dataPost) => http.post(`${CRAWLER_LIST}getDuplicatePhones`, dataPost);

const getDuplicateEmails = (dataPost) => http.post(`${CRAWLER_LIST}getDuplicateEmails`, dataPost);

const getDuplicateAddress = (dataPost) => http.post(`${CRAWLER_LIST}getDuplicateAddress`, dataPost);

const getCrawlerList = (pagination, dataPost) => http.post(`${CRAWLER_LIST}getCrawlerList`, {pagination, dataPost});

const transferCrawler = (dataPost) => http.post(`${CRAWLER_LIST}createPreListings`, dataPost);

const moveCrawler = (dataPost) => http.post(`${CRAWLER_LIST}moveCrawler`, dataPost);

const updateStatus = (dataPost) => http.post(`${CRAWLER_LIST}updateStatus`, dataPost);

const updateDuplicateItem = (dataPost) => http.post(`${CRAWLER_LIST}updateDuplicateItem`, dataPost);

const getListRelated = (dataPost) => http.post(`${CRAWLER_LIST}getListByIdsPhones`, dataPost);

export default {
    getSiteList,
    getDefaultList,
    getPropertyList,
    getDistrictList,
    getWardList,
    getStreetList,
    getDuplicatePhones,
    getDuplicateEmails,
    getDuplicateAddress,
    getCrawlerList,
    transferCrawler,
    moveCrawler,
    updateStatus,
    updateDuplicateItem,
    getListRelated
};
