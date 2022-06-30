
import axios from 'axios';
import { fetchInfo } from './../../ba_mortgage/actions/index'; 

const _API_PAGE = {
    'GET_INFO_STEP' : '/kyc-api/get-info-step',
};
export const KYC_HEADER_STEP_GET_INFO_DEAL = 'KYC_HEADER_STEP/GET_INFO_DEAL';

export const fetchInfoStepThunk = (dealId, callback = null) => {
    return (dispatch) => {
        return axios.post(_API_PAGE.GET_INFO_STEP, {'dealId' : dealId})
            .then(xhr => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(getInfoDeal(response));
                    if(callback) {
                        callback(xhr.data.data);
                    }

                    // call api fetch data for loan-advise
                    const pathname = window.location.pathname;
                    if (pathname == '/kyc/loan-advice-step-one') {
                        dispatch(fetchInfo(response.customerHomeKyc.leadId))
                    }
                }
                if (['507','405','401'].indexOf(xhr.data.code) > -1) {
                    propzyNotifyAlert({type: "propzy-notify-warning", message : xhr.data.message + ' Trang sẽ chuyển sau 3s'});
                    setTimeout(function () {
                        location.replace('/kyc/checking');
                    }, 3000);
                }
            })
            .catch(error => {
                throw(error);
            });
    };
};
export const getInfoDeal = (data) => ({
    type : KYC_HEADER_STEP_GET_INFO_DEAL,
    payload : data
});