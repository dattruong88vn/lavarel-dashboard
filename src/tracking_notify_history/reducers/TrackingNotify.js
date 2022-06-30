import moment from "moment";
var defaultState = {
	postData: {
		"fromDate": moment(new Date()).startOf("date").unix() * 1000,
		"toDate" : moment(new Date()).endOf("date").unix() * 1000,
		"userPhone": null,
		"userEmail": null,
        "statusId": null,
        "notifyType": null,
        "fromSource": null
	},
    statusList: [
        {label: "Tất cả", value: null},
        {label: "Đã đọc", value: 0},
        {label: "Chưa đọc", value: 1}
    ],
    notifyTypeList: [
        {label: "Tất cả", value: null},
        {label: "Khóa học", value: 1},
        {label: "Hợp đồng", value: 2},
        {label: "Book tour", value: 3},
        {label: "Tin đăng", value: 4},
        {label: "Check trống", value: 5},
        {label: "Sự kiện", value: 6}
    ],
    fromSourceList: [
        {label: "Tất cả", value: null},
        {label: "Hệ Thống", value: 9},
        {label: "CMS", value: 8}
    ],
    dataTableNotifyHistory: [],
    dataTableRead: [],
    dataTableUnread: [],
	filterSelect : {
        statusId : null,
        notifyType: null,
        fromSource: null
	},
    table : null,
    totalNotify: 0,
    showModalRead: false,
    showModalUnread: false
};

export default function Tracking(state = defaultState, action) {
	switch(action.type){
		case 'SET_DATA_POST': {
			let _postData = Object.assign({}, {...state.postData}, action.data);
			return {...state, postData: _postData};
        }
        case 'SET_FILTER_DATA_SELECT' : {
			const _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
			const _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state , filterSelect : _fSelect, postData: _post};
        }
        case "SET_TABLE" : {
			state.table = action.table;
            return state;
        }
        case 'SET_TOTAL_NOTIFY': {
			let newState = {...state, totalNotify: action.data};
			return newState;
        }
        case 'SET_SHOW_MODAL_READ': {
			let newState = {...state, showModalRead: action.data};
			return newState;
        }
        case 'SET_SHOW_MODAL_UNREAD': {
			let newState = {...state, showModalUnread: action.data};
			return newState;
        }
        case 'SET_DATA_TABLE_NOTIFY_HISTORY' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableNotifyHistory : newData};
        }
		case 'SET_DATA_TABLE_READ' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableRead : newData};
        }
        case 'SET_DATA_TABLE_UNREAD' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, dataTableUnread : newData};
        }
        case 'RESET_FILTER' :
			return {...state,
				postData : defaultState.postData,
				filterSelect : defaultState.filterSelect
			};
		default:
			return state;
	}
}