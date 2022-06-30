var defaultState = {
	searchData: {
		"searchKeyword": null
	},
	postData: {
		"name": "",
		"fullName": "",
		"cityId": 1,
		"districtId": null,
		"wardId": null,
		"streetId": null,
		"address": "",
		"shortAddress": "",
		"latitude": null,
		"longitude": null

	},
	filterSelect : {
		districtId : null,
		wardId : null,
		streetId : null
	},
	showModalSaveTc: false,
	tcList: [],
	districtList: [],
	wardList: [],
	streetList: [],
	table : null
};

export default function ListTc(state = defaultState, action) {
	switch(action.type){
		case 'SET_DATA_SEARCH': {
			let _searchData = Object.assign({}, {...state.searchData}, action.data);
			return {...state, searchData: _searchData};
		}
		case 'SET_DATA_POST': {
			let _postData = Object.assign({}, {...state.postData}, action.data);
			return {...state, postData: _postData};
		}
		case 'SET_FILTER_DATA_SELECT' : {
			const _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
			const _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state , filterSelect : _fSelect, postData: _post};
		}
		case 'SET_SHOW_MODAL_SAVE_TC': {
			let newState = {...state, showModalSaveTc: action.data};
			return newState;
		}
		case 'SET_DATA_LIST_TC' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, tcList : newData};
		}
		case 'SET_DATA_LIST_DISTRICT' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, districtList : newData};
		}
		case 'SET_DATA_LIST_WARD' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, wardList : newData};
		}
		case 'SET_DATA_LIST_STREET' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, streetList : newData};
		}
		case "SET_TABLE_TC" : {
			state.table = action.table;
			return state;
		}
		case 'RESET_SEARCH' : {
			return {...state,
				searchData : defaultState.searchData
			};
		}
		case 'RESET_DATA_POST' : {
			return {...state,
				postData : defaultState.postData,
				filterSelect: defaultState.filterSelect,
				wardList: defaultState.wardList,
				streetList: defaultState.streetList
			};
		}
		default:
			return state;
	}
}