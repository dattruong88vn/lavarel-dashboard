
const defaultState = {
    dataCalculateLoan: {
        loanAmount: null,
        interestPay: null
    },
    modalPaymentSchedule: false,
    postPaymentSchedule: {
        loanAmount: null,
        bankId: null,
        maturity: null
    },
    dataPaymentSchedule: {
        totalInterestPaid: 0,
        total: 0,
        schedules: []
    }
};

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "LOAN_ADVICE_SET_DATA_CALCULATE_LOAN": {
            let _data = Object.assign({}, {...state.dataCalculateLoan}, action.data);
            return {...state, dataCalculateLoan: _data};
        }
        case "LOAN_ADVICE_SHOW_HIDE_MODAL_PAYMENT_SCHEDULE": {
            let newState = {...state, modalPaymentSchedule: action.data};
            return newState;
        }
        case "LOAN_ADVICE_SET_DATA_POST_PAYMENT_SCHEDULE": {
            let _postData = Object.assign({}, {...state.postPaymentSchedule}, action.data);
            return {...state, postPaymentSchedule: _postData};
        }
        case "LOAN_ADVICE_SET_DATA_PAYMENT_SCHEDULE": {
            let _postData = Object.assign({}, {...state.dataPaymentSchedule}, action.data);
            return {...state, dataPaymentSchedule: _postData};
        }
        default:
            return state;
    }
}