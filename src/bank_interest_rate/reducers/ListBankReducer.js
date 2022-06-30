import * as types from './../actions/actionTypes';

var defaultState = {
    searchData: {
        "keyword": null
    },
    tableBank : null
};

export default function ListBankReducer(state = defaultState, action) {
    switch(action.type){
        case types.SET_DATA_SEARCH: {
            let _searchData = Object.assign({}, {...state.searchData}, action.data);
            return {...state, searchData: _searchData};
        }
        case types.SET_TABLE_BANK: {
            state.tableBank = action.data;
            return state;
        }
        case types.RESET_DATA_SEARCH: {
            return {...state,
                searchData : defaultState.searchData
            };
        }
        default:
            return state;
    }
}