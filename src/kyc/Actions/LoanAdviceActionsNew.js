import axios from 'axios';

const _API_PAGE = {
    URL_CREATE_DEBT_INFO_STEP_ONE: '/kyc-api/create-debt-info-step-one',
    GET_LIST_RELATED_LISTING: '/kyc-api/get-list-related-listing',
    GET_LOAN_DEMAND_INFO: '/kyc-api/get-loan-demand-info',
    CALC_LOAN_DEMAND: '/kyc-api/calc-loan-demand',
};

export const KYC_LOAN_ADVICE_GET_LIST_RELATED_LISTING =
    'KYC_LOAN_ADVICE/GET_LIST_RELATED_LISTING';

export const KYC_LOAN_ADVICE_GET_DETAIL_RELATED_LISTING =
    'KYC_LOAN_ADVICE/GET_DETAIL_RELATED_LISTING';

export const KYC_LOAN_ADVICE_CHANGE_INDEX_LISTING =
    'KYC_LOAN_ADVICE/CHANGE_INDEX_LISTING';

export const KYC_LOAN_ADVICE_SHOW_LOAN_DEMAND_INFO =
    'KYC_LOAN_ADVICE/SHOW_LOAN_DEMAND_INFO';

export const KYC_LOAN_ADVICE_SHOW_CALC_LOAN_DEMAND =
    'KYC_LOAN_ADVICE/SHOW_CALC_LOAN_DEMAND';

export const KYC_LOAN_ADVICE_UPDATE_CURRENT_LOAN_INFO =
    'KYC_LOAN_ADVICE/UPDATE_CURRENT_LOAN_INFO';

export const KYC_LOAN_ADVICE_CHANGE_CALC_TYPE =
    'KYC_LOAN_ADVICE/CHANGE_CALC_TYPE';

export const actLoanAdviceSetDataPost = (data) => {
    return {
        type: "LOAN_ADVICE_SET_DATA_POST",
        data
    };
}
export const actLoanAdviceResetDataPost = () => {
    return {
        type: "LOAN_ADVICE_RESET_DATA_POST"
    };
}
export const actShowHideModalPaymentSchedule = (data) => {
    return {
        type: "LOAN_ADVICE_SHOW_HIDE_MODAL_PAYMENT_SCHEDULE",
        data
    };
}
export const actSetDataPostPaymentSchedule = (data) => {
    return {
        type: "LOAN_ADVICE_SET_DATA_POST_PAYMENT_SCHEDULE",
        data
    };
}

export const actCreateFeedback = (dataPost) => {
    return (dispatch) => {
        axios.post(`/kyc-api/create-feedback`, dataPost)
            .then(response => {
                if (response.data.result == true) {
                    location.replace('/kyc/checking');
                }
            });
    };
}
export const actGetDetailPaymentSchedule = (dataPost) => {
    return (dispatch) => {
        axios.post(`/kyc-api/get-detail-payment-schedule`, dataPost)
            .then(response => {
                if (response.data.result == true) {
                    dispatch({
                        type: "LOAN_ADVICE_SET_DATA_PAYMENT_SCHEDULE",
                        data: response.data.data
                    });
                }
            });
    };
}

export const getListRelatedListing = (data = {}) => ({
    type: KYC_LOAN_ADVICE_GET_LIST_RELATED_LISTING,
    payload: data,
});

export const getDetailListing = (data = {}) => ({
    type: KYC_LOAN_ADVICE_GET_DETAIL_RELATED_LISTING,
    payload: data,
});

export const changeIndexListing = (index = null) => ({
    type: KYC_LOAN_ADVICE_CHANGE_INDEX_LISTING,
    payload: index,
});

export const fetchListRelatedListingThunk = (data = {}) => {
    return (dispatch) => {
        return axios
            .post(_API_PAGE.GET_LIST_RELATED_LISTING, data)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(getListRelatedListing(response));
                    if (response && response.listings && response.listings.length) {
                        let postData = {
                            rlistingId: response.listings[0].rlistingId,
                            dealId: data.dealId,
                        };
                        dispatch(getLoanDemandInfo(postData));
                        return;
                    }
                }
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const showLoanDemandInfo = (data = {}) => ({
    type: KYC_LOAN_ADVICE_SHOW_LOAN_DEMAND_INFO,
    payload: data,
});

export const getLoanDemandInfo = (data = {}) => {
    return (dispatch) => {
        return axios
            .post(_API_PAGE.GET_LOAN_DEMAND_INFO, data)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(showLoanDemandInfo(response));

                    let dataPostCalc = {
                        typeId: data.calcType ? data.calcType : 2,
                        loan: String(response.defaultLoan || 0),
                        monthPayment: String(response.defaultMonthPayment),
                        loanTime: String(response.defaultLoanTime || null),
                        bankIds: [],
                        rlistingId: data.rlistingId,
                        dealId: data.dealId
                    };
                    dispatch(calcLoanDemand(dataPostCalc));
                }
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const showCalcLoanDemand = (data = {}) => ({
    type: KYC_LOAN_ADVICE_SHOW_CALC_LOAN_DEMAND,
    payload: data,
});

export const calcLoanDemand = (data = {}) => {
    data.monthPayment = data.monthPayment === '0' ? '1000000' : data.monthPayment;
    return (dispatch) => {
        return axios
            .post(_API_PAGE.CALC_LOAN_DEMAND, data)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(showCalcLoanDemand(response));
                }
            })
            .catch((error) => {
                throw error;
            });
    };
};
export const updateCurrentLoanInfo = (data = {}) => ({
    type: KYC_LOAN_ADVICE_UPDATE_CURRENT_LOAN_INFO,
    payload: data,
});
export const changeCalcType = (calcType) => ({
    type: KYC_LOAN_ADVICE_CHANGE_CALC_TYPE,
    payload: calcType,
});

export function actCreateDebtInfoStepOne(dataPost, callback) {
    fetch(_API_PAGE.URL_CREATE_DEBT_INFO_STEP_ONE, {
        method: 'POST',
        body: JSON.stringify(dataPost)
    })
        .then(res => res.json())
        .then(
            (result) => {
                callback(result);
            }
        )
}