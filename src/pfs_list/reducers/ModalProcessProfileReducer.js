import * as types from './../actions/actionTypes';

var defaultState = {
    postData: {
        "mortgageRequestId": null,
        "isSatisfactory": true,
        "note": null,
        "bankIds": []
    },
    listDataBank: [],
    dataTableBank: [],
    tableBank : null,
    showHideModalPP: false,
    filterSelect: {
        bank: null
    },
    postSelectBank: {
        "bank": null
    }
};

export default function ModalProcessProfileReducer(state = defaultState, action) {
    switch(action.type){
        case types.PP_SET_DATA_POST: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.PP_RESET_DATA_POST: {
            return {...state,
                postData : {
                    mortgageRequestId: null,
                    isSatisfactory: false,
                    note: null,
                    bankIds: []
                }
            };
        }
        case types.PP_SET_TABLE: {
            state.tableBank = action.data;
            return state;
        }
        case types.PP_SET_LIST_DATA_BANK : {
			let newData = [];
			if (Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listDataBank : newData};
        }
        case types.PP_SHOW_HIDE_MODAL: {
            let newState = {...state, showHideModalPP: action.data};
            return newState;
        }
        case types.PP_SET_DATA_FILTER_SELECT : {
            let _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
            let _postSelectBank = Object.assign({}, {...state.postSelectBank}, action.data ? action.data : null);
            return {...state , filterSelect : _fSelect, postSelectBank: _postSelectBank};
        }
        case types.PP_SET_DATA_BANK: {
            let _dataTableBank = state.dataTableBank;
            let dataBank = _dataTableBank.filter(function(item) {
                return item.bankId === action.data.bankId;
            });
            if (dataBank.length === 0) {
                _dataTableBank.push(action.data);
            }
            let _postData = state.postData;
            let _bankIds = _postData.bankIds;
            let indexBank = _bankIds.indexOf(action.data.bankId);
            if (indexBank < 0) {
                _bankIds.push(action.data.bankId);
            }
			return {...state, dataTableBank: _dataTableBank, postData: _postData};
        }
        case types.PP_RESET_DATA_BANK: {
            return {...state,
                dataTableBank : [],
                filterSelect : defaultState.filterSelect,
                postSelectBank: defaultState.postSelectBank
            };
        }
        case types.PP_DELETE_DATA_BANK: {
            let _dataTableBank = state.dataTableBank;
            let index = _dataTableBank.findIndex(item => item.bankId === action.data.bankId);
            if(index !== -1) {
                _dataTableBank.splice(index, 1);
            }

            let _postData = state.postData;
            let _bankIds = _postData.bankIds;
            let indexBank = _bankIds.indexOf(action.data.bankId);
            if(indexBank !== -1) {
                _bankIds.splice(index, 1);
            }

			return {...state, dataTableBank : _dataTableBank, postData: _postData};
        }
        case types.PP_SEND_PROCESS_PROFILE: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.PP_SET_SUGGEST_DATA_BANK : {
			let newData = [];
			if (Array.isArray(action.data)) {
				newData = action.data;
            }
            let _postData = state.postData;
            action.data.forEach(item => {
                _postData.bankIds.push(item.bankId);
            });
			return {...state, dataTableBank: newData, postData: _postData};
        }
        default:
            return state;
    }
}