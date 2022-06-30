import moment from "moment";
const defaultState = {
	postData: {
		fromDate: moment(new Date()).startOf("date").unix() * 1000,
		toDate: moment(new Date()).endOf("date").unix() * 1000,
		name: null,
		phone: null,
		agentStatus: null,
		relatedListingStatus: null,
		leadStatus: null,
		dealStatus: null
	},
	filterSelect : {
		agentStatusId : null,
		relatedListingStatusId : null,
		leadStatusId : null,
		dealStatusId : null
	},
	agentStatusList: [],
	relatedListingStatusList: [],
	leadStatusList: [],
	dealStatusList: [],
	table : null
};

export default function Filter(state = defaultState, action) {
	switch(action.type) {
		case 'SET_FILTER_DATA_INPUT': {
			let _postData = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state, postData :  _postData};
		}
		case 'SET_FILTER_DATA_SELECT': {
			let _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
			let _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state , filterSelect : _fSelect, postData: _post};
		}
		case 'SET_AGENT_STATUS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, agentStatusList : newData};
		}
		case 'SET_RELATED_LISTING_STATUS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, relatedListingStatusList : newData};
		}
		case 'SET_LEAD_STATUS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, leadStatusList : newData};
		}
		case 'SET_DEAL_STATUS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dealStatusList : newData};
		}
		case 'RESET_FILTER': {
			return {...state, postData : defaultState.postData, filterSelect : defaultState.filterSelect};
		}
		case "SET_TABLE": {
			state.table = action.table;
			return state;
		}
		default:
			return state;
	}
}