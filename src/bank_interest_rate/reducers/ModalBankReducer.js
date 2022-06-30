import * as types from './../actions/actionTypes';

var defaultState = {
    postData: {
        name: "",
        interestRate1: "",
        interestRate2: "",
        loanRate: "",
        maxLoanTerm: "",
        earlyRepaymentFee: ""
    },
    showHideModalBank: false,
    listSelectBank: [],
    filterSelectBank: {
        name: null
    }
};

export default function ModalBankReducer(state = defaultState, action) {
    switch(action.type){
        case types.SET_DATA_POST: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.SHOW_HIDE_MODAL_BANK: {
            let newState = {...state, showHideModalBank: action.data};
            return newState;
        }
        case types.RESET_DATA_POST: {
            return {...state,
                postData : defaultState.postData,
                filterSelectBank : defaultState.filterSelectBank
            };
        }
        case types.SAVE_BANK: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.SET_LIST_SELECT_BANK : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listSelectBank : newData};
        }
        case types.SET_FILTER_SELECT_BANK: {
			let _fSelect = Object.assign({}, {...state.filterSelectBank}, action.value);
            let _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);            
			return {...state , filterSelectBank : _fSelect, postData: _post};
        }
        default:
            return state;
    }
}