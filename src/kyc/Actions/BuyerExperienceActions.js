import axios from 'axios';

const _API_PAGE = {
    'GET_CONTENT_BUY_EXPERIENCE' : '/kyc-api/get-content-buy-experience-page',
    'GET_CONTENT_RENT_EXPERIENCE' : '/kyc-api/get-content-rent-experience-page',
    'SAVE_PAGE' : '/kyc-api/save-page',
};

export const KYC_BUYER_EXPERIENCE_SET_BUY_EXPERIENCE = 'KYC_BUYER_EXPERIENCE/SET_BUY_EXPERIENCE';
export const KYC_BUYER_EXPERIENCE_SET_RENT_EXPERIENCE = 'KYC_BUYER_EXPERIENCE/SET_RENT_EXPERIENCE';
export const KYC_BUYER_EXPERIENCE_GET_CONTENT_BUY_EXPERIENCE = 'KYC_BUYER_EXPERIENCE/GET_CONTENT_BUY_EXPERIENCE';
export const KYC_BUYER_EXPERIENCE_GET_CONTENT_RENT_EXPERIENCE = 'KYC_BUYER_EXPERIENCE/GET_CONTENT_RENT_EXPERIENCE';

export const changeBuyExperience = (isExperience) => ({
    type : KYC_BUYER_EXPERIENCE_SET_BUY_EXPERIENCE,
    payload : isExperience
});

export const changeRentExperience = (isExperience) => ({
    type : KYC_BUYER_EXPERIENCE_SET_RENT_EXPERIENCE,
    payload : isExperience
});

export const setContentBuyExperience = (data = []) => ({
    type : KYC_BUYER_EXPERIENCE_GET_CONTENT_BUY_EXPERIENCE,
    payload : data
});

export const setContentRentExperience = (data = []) => ({
    type : KYC_BUYER_EXPERIENCE_GET_CONTENT_RENT_EXPERIENCE,
    payload : data
});

export const fetchContentBuyExperienceThunk = (data = {}) => {
    return (dispatch) => {
        return axios.post(_API_PAGE.GET_CONTENT_BUY_EXPERIENCE, data)
            .then(xhr => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    if (response.length > 0) {
                        dispatch(setContentBuyExperience(response[0].childs));
                    }
                }

            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchContentRentExperienceThunk = (data={}) => {
    return (dispatch) => {
        return axios.post(_API_PAGE.GET_CONTENT_RENT_EXPERIENCE, data )
            .then(xhr => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    if (response.length > 0) {
                        dispatch(setContentRentExperience(response[0].childs));
                    }
                }
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchSavePageDraffThunk = (data={}) => {
    return (dispatch) => {
        return axios.post(_API_PAGE.SAVE_PAGE, data )
            .then(xhr => {
            })
            .catch(error => {
                throw(error);
            });
    };
};

export const fetchSavePageThunk = (data={}, isClickHeader, callback) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.SAVE_PAGE, data )
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    propzyNotifyAlert({type: "propzy-notify-success", message : 'Xử lý yêu cầu thành công'});
                    if (!isClickHeader) {
                        window.location.replace(`/kyc/buyer-confirm-requirements?dealId=${data.dealId}`);
                    }
                    callback();
                    //this.props.history.push("/kyc/buyer-confirm-requirements?dealId=" + data.dealId);
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể lưu dữ liệu do có lỗi xảy ra'});
                }
            })
            .catch(error => {
                hidePropzyLoading();
                throw(error);
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể lưu dữ liệu do có lỗi xảy ra'});
            });
    };
};
