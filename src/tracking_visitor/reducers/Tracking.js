var defaultState = {
	postData: {
		"name": null,
		"phone" : null,
		"email": null,
		"customerId": null,
		"socialUid": null
	},
	postDataVisitor: {
		"needId": null,
		"typeCusId" : null,
		"tcId": null,
		"intent": null,
		"subTypeId": null
	},
	showModalSaveTracking: false,
	showModalInfoTracking: false,
	needList: [],
	typeCusList: [],
	tcList: [],
	otherTypeCusList: [],
	dataTableOwner: [],
	dataTableCustomer: [],
	dataTableAgent: [],
	dataTableVisitor: [],
	filterSelect : {
		needId : null,
		typeCusId : null,
		tcId : null,
		subTypeId: null
	},
	table : null
};

export default function Tracking(state = defaultState, action) {
	switch(action.type){
		case 'SET_DATA_POST': {
			let _postData = Object.assign({}, {...state.postData}, action.data);
			return {...state, postData: _postData};
		}
		case 'SET_DATA_POST_VISITOR': {
			let _postData = Object.assign({}, {...state.postDataVisitor}, action.data);
			const _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
			return {...state, filterSelect: _fSelect, postDataVisitor: _postData};
		}
		case 'SET_SHOW_MODAL_SAVE_TRACKING': {
			let newState = {...state, showModalSaveTracking: action.data};
			return newState;
		}
		case 'SET_SHOW_MODAL_INFO_TRACKING': {
			let newState = {...state, showModalInfoTracking: action.data};
			return newState;
		}
		case 'SET_DATA_TABLE_OWNER' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableOwner : newData};
		}
		case 'SET_DATA_TABLE_CUSTOMER' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableCustomer : newData};
		}
		case 'SET_DATA_TABLE_AGENT' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableAgent : newData};
		}
		case 'SET_DATA_TABLE_VISITOR' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableVisitor : newData};
		}
		case 'SET_DATA_LIST_NEED' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, needList : newData};
		}
		case 'SET_DATA_LIST_TYPE_CUS' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, typeCusList : newData};
		}
		case 'SET_DATA_LIST_TC' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, tcList : newData};
		}
		case "SET_TABLE_VISITOR" : {
			state.table = action.table;
			return state;
		}
		case 'SET_DATA_LIST_OTHER_TYPE_CUS' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, otherTypeCusList : newData};
		}
		default:
			return state;
	}
}