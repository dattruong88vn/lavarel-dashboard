import axios from 'axios';

export const actShowHideModalPaymentSchedule = (data) => {
    return {
        type: "LOAN_ADVICE_SHOW_HIDE_MODAL_PAYMENT_SCHEDULE",
        data
    };
};

export const actSetDataPostPaymentSchedule = (data) => {
    return {
        type: "LOAN_ADVICE_SET_DATA_POST_PAYMENT_SCHEDULE",
        data
    };
};

export const actGetDetailPaymentSchedule = (dataPost) => {
    return (dispatch) => {
        axios.post(`/kyc-api/get-detail-payment-schedule`, dataPost)
            .then(response => {
                if(response.data.result == true) {
                    dispatch({
                        type: "LOAN_ADVICE_SET_DATA_PAYMENT_SCHEDULE",
                        data: response.data.data
                    });
                }
            });
    };
}