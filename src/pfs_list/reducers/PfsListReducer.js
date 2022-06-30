import * as types from './../actions/actionTypes';
var urlParams = new URLSearchParams(window.location.search);
var statusId = urlParams.get('channelStatusId');
var defaultState = {
    searchData: {
        "fromDate": null,
		"toDate": null,
        "channelStatusId": null,
        "searchKeyword": null,
        "listAssignedTo": null
    },
    listButtonFilter: [],
    tablePfs : null,
    listAssign: [],
    filterSelect : {
		listAssignedTo : null
	},
};

export default function PfsListReducer(state = defaultState, action) {
    switch(action.type){
        case types.PFS_SET_DATA_SEARCH: {
            let _searchData = Object.assign({}, {...state.searchData}, action.data);
            return {...state, searchData: _searchData};
        }
        case types.PFS_SET_TABLE: {
            state.tablePfs = action.data;
            return state;
        }
        case types.PFS_RESET_DATA_SEARCH: {
            return {...state,
                searchData : defaultState.searchData,
                filterSelect: defaultState.filterSelect
            };
        }
        case types.PFS_SET_LIST_BUTTON_FILTER : {
			let newData = [];
			if (Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listButtonFilter : newData};
        }
        case types.PFS_SET_LIST_ASSIGN : {
			let newData = [];
			if (Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listAssign : newData};
        }
        case types.PFS_SET_FILTER_DATA_SELECT: {
			let _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
            let _post = Object.assign({}, {...state.searchData}, action.data ? action.data : null);            
			return {...state , filterSelect : _fSelect, searchData: _post};
		}
        default:
            return state;
    }
}