
import {combineReducers} from 'redux';
import {mortgageReducer as ba_mortgage} from './../../ba_mortgage/reducers/index';

import {
    KYC_LOAN_ADVICE_GET_LIST_RELATED_LISTING,
    KYC_LOAN_ADVICE_GET_DETAIL_RELATED_LISTING,
    KYC_LOAN_ADVICE_CHANGE_INDEX_LISTING,
    KYC_LOAN_ADVICE_SHOW_LOAN_DEMAND_INFO,
    KYC_LOAN_ADVICE_SHOW_CALC_LOAN_DEMAND,
    KYC_LOAN_ADVICE_UPDATE_CURRENT_LOAN_INFO,
    KYC_LOAN_ADVICE_CHANGE_CALC_TYPE,
} from '../Actions/LoanAdviceActionsNew';

const defaultState = {
    postData: {
        dealId: null,
        employeeNumber: '',
        hobby: '',
        otherHobby: ''
    },
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
    },
    currentLoanInfo: {
        defaultLoan: 0,
        maxLoan: 0,
        maxFormatedLoan: '',
        defaultMonthPayment: 60,
        maxMonthPayment: 35 * 60,
        defaultLoanTime: 0,
        maxLoanTime: 0,
        banks: [],
        bankList: []
    },
    currentListing: null,
    isLoadedCurrentListing: false
};

export const loanAdviceReducerNew = (state = defaultState, action) => {
    switch (action.type) {
        case "LOAN_ADVICE_SET_DATA_POST": {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case "LOAN_ADVICE_RESET_DATA_POST": {
            return {
                ...state,
                postData: defaultState.postData
            };
        }
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
        case KYC_LOAN_ADVICE_GET_LIST_RELATED_LISTING: {
            let currentListing = null;
            if (action.payload.listings.length > 0) {
                currentListing = action.payload.listings[0].rlistingId;
            }
            return {
                ...state,
                isLoadedCurrentListing: true,
                rListings: action.payload.listings,
                feedbackListingId: action.payload.feedbackListingId,
                currentListing: currentListing,
            };
        }
        case KYC_LOAN_ADVICE_GET_DETAIL_RELATED_LISTING: {
            return {...state, detailListing: action.payload};
        }
        case KYC_LOAN_ADVICE_CHANGE_INDEX_LISTING: {
            return {...state, currentListing: action.payload};
        }
        case KYC_LOAN_ADVICE_SHOW_LOAN_DEMAND_INFO: {
            state.currentLoanInfo = action.payload;
            state.calcType = state.calcType || 2;
            state.getSuccess = true;

            return {...state};
        }
        case KYC_LOAN_ADVICE_SHOW_CALC_LOAN_DEMAND: {
            return {...state, loanCalcResult: action.payload};
        }
        case KYC_LOAN_ADVICE_CHANGE_CALC_TYPE: {
            return {...state, calcType: action.payload};
        }
        case KYC_LOAN_ADVICE_UPDATE_CURRENT_LOAN_INFO: {
            state.currentLoanInfo.defaultLoan = Number(String(action.payload.loan).split(',').join(''));
            state.currentLoanInfo.defaultLoanTime = Number(String(action.payload.loanTime).split(',').join(''));
            state.currentLoanInfo.defaultMonthPayment = Number(String(action.payload.monthPayment).split(',').join(''));

            return {...state};
        }
        default:
            return state;
    }
}

export default combineReducers({loanAdviceReducerNew, ba_mortgage})