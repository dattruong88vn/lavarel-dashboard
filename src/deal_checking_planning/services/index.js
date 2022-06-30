import axios from 'axios';

export const getDetailPlanning = (dealId) => {
    let url = `/deal/get-planning-detail/${dealId}`;
    return axios.get(url);
}

export const submitPlanning = (dataPost) => {
    return axios.post(`/deal/submit-planning`, dataPost)
}