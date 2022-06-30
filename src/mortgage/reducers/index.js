import { combineReducers } from 'redux';
import DropdownProgress from './../../pfs_list/reducers/DropdownProgressReducer';
import ModalProcess from './../../pfs_list/reducers/ModalProcessProfileReducer';
import ModalProfile from './../../bank_interest_rate/reducers/ModalProfileReducer';
import {mortgageReducer as mortgagePage} from './../../ba_mortgage/reducers/index'; 

let initState = {
    chanel:[],
    infoMortgage: {
        rlistingId:null,
        resultBanks:null
    },
    rejectProfile: {
        requestId: null,
        reasonId: null
    },
    listReasonReject: [],
    filterSelect : {
		reasonId : null
    },
    listUserMortgage: [],
    filterSelectUser : {
		assignedTo : null
    },
    reassign: {
        id: null,
        assignedTo: null,
        note: ""
    }      
};
export const mortgageReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_CHANEL_CHILD":
            return {...state,chanel : action.payload}
        case "FETCH_INFO_MORTGAGE":
            return {...state,infoMortgage : action.payload}
        case "SET_LISTING_INFO":
            return Object.assign({}, {...state.infoMortgage}, {
				rlistingId : action.listingId,
            });
        case "SET_REJECT_PROFILE": {
            return {...state, rejectProfile : action.data}
        }
        case "RESET_REJECT_PROFILE": {
            return {...state, rejectProfile : {
                requestId: null,
                reasonId: null
            }}
        }
        case "SET_LIST_REASON_REJECT": {
            return {...state, listReasonReject : action.data}
        }
        case "RESET_DATA_REASON_REJECT": {
            return {...state,
                rejectProfile : {
                    requestId: null,
                    reasonId: null
                },
                filterSelect: {
                    reasonId : null
                }
            };
        }
        case "SET_SELECT_DATA_REASON_REJECT": {
			let _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
            let _post = Object.assign({}, {...state.rejectProfile}, action.data ? action.data : null);            
			return {...state , filterSelect : _fSelect, rejectProfile: _post};
        }
        case "SET_FIELD_BANK":
            let _infoMortgage = Object.assign({}, {...state.infoMortgage}); 
            _infoMortgage.resultBanks = action.value;
            return {...state,infoMortgage: _infoMortgage};
        case "SET_LIST_USER_MORTGAGE": {
            return {...state, listUserMortgage : action.data}
        }
        case "RESET_DATA_REASSIGN": {
            return {...state,
                filterSelectUser : {
                    assignedTo : null
                },
                reassign: {
                    id: null,
                    assignedTo: null,
                    note: ""
                }    
            };
        }
        case "SET_SELECT_DATA_REASSIGN": {
			let _fSelect = Object.assign({}, {...state.filterSelectUser}, action.value);
            let _post = Object.assign({}, {...state.reassign}, action.data ? action.data : null);            
			return {...state , filterSelectUser : _fSelect, reassign: _post};
        }
        case "SET_DATA_REASSIGN": {
            let _postData = Object.assign({}, {...state.reassign}, action.data);
            return {...state, reassign: _postData};
        }
        default:
            return state;
    }
}

export default combineReducers({mortgageReducer, DropdownProgress, ModalProcess, ModalProfile,mortgagePage})