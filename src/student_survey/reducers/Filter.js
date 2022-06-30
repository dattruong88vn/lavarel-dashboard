import moment from "moment";
const defaultState = {
	postData: {
		"phone" : null,
		"conciergeIds": null,
		"userIds": null,
		"confirmStatusIds": null,
		"districtId": null,
		"wardId": null,
		"streetId": null,
		"alleyId": null,
		"fromCreatedDate": moment(new Date()).startOf("date").unix() * 1000,
		"toCreatedDate":moment(new Date()).endOf("date").unix() * 1000,
	},
	filterSelect : {
		districtId : null,
		wardId : null,
		streetId : null,
		confirmStatusIds : null,
		alleyId : null,
		userIds : null,
		conciergeIds : null,
		emails : null,
		userReject : null
	},
	confirmStatus: [],
	districts: [],
	wards: [],
	streets: [],
	alleys: [],
	ccs:[],
	studentList: [],
	showModalSendMail: false,
	postDataSendMail: {
		"data": null,
		"tos": null,
		"subject": null
	},
	showModalAlert: false,
	showModalReject: false,
	postDataReviewSurvey : {
		"surveyId": null,
    	"reasonId": null,
    	"note": null,
    	"isSendEmail": null,
    	"isReject": null,
    	"mail": null
	},
	rejectSurveyList: [],
	showModalAccept: false,
	showModalExam: false,
	examList: []
};

export default function Filter(state = defaultState, action) {
	switch(action.type) {
		case 'SET_FILTER_DATA_INPUT' : {
			const _postData = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state, postData :  _postData};
		}
		case 'SET_FILTER_DATA_SELECT' : {
			const _fSelect = Object.assign({}, {...state.filterSelect}, action.value);
			const _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);
			return {...state , filterSelect : _fSelect, postData: _post};
		}
		case 'SET_DISTRICTS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			const _post = Object.assign({}, {...state.postData}, {
				districtId : null,
				wardId : null,
				streetId : null,
				alleyId : null,
			});
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				districtId : null,
				wardId : null,
				streetId : null,
				alleyId : null,
			});
			return {...state, districts : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_WARD_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			const _post = Object.assign({}, {...state.postData}, {
				wardId : null,
				streetId : null,
				alleyId : null,
			});
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				wardId : null,
				streetId : null,
				alleyId : null,
			});
			return {...state, wards : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_STREET_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			const _post = Object.assign({}, {...state.postData}, {
				streetId : null,
				alleyId : null,
			});
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				streetId : null,
				alleyId : null,
			});
			return {...state, streets : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_ALLEY_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			const _post = Object.assign({}, {...state.postData}, {
				alleyId : null,
			});
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				alleyId : null,
			});
			return {...state, alleys : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_STATUS_SURVEY' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, confirmStatus : newData,};
		}
		case 'SET_CC_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			const _post = Object.assign({}, {...state.postData}, {
				userIds : null,
			});
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				userIds : null,
			});
			return {...state, ccs : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_STUDENTS_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			};
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				userIds : null,
			});
			const _post = Object.assign({}, {...state.postData}, {
				userIds : null,
			});
			return {...state, studentList : newData, filterSelect: _fSelect, postData : _post};
		}
		case 'SET_SHOW_SEND_MAIL': {
			let newState = {...state, showModalSendMail: action.data};
			return newState;
		}
		case 'SET_SELECT_EMAIL': {
			const _fSelect = Object.assign({}, {...state.filterSelect}, {
				emails: action.data,
			});
			let newState = {...state, filterSelect: _fSelect};
			return newState;
		}
        case 'RESET_FILTER' :
			return {...state,
				postData : defaultState.postData,
				filterSelect : defaultState.filterSelect,
				wards : defaultState.wards,
				streets : defaultState.streets,
				alleys : defaultState.alleys,
                studentList : defaultState.studentList
			};
		case 'SET_DATA_SEND_MAIL': {
			let _postData = Object.assign({}, {...state.postDataSendMail}, action.data);
			return {...state, postDataSendMail: _postData};
		}
		case 'SET_SHOW_REJECT': {
			let newState = {...state, showModalReject: action.data};
			return newState;
		}
		case 'SET_DATA_REVIEW_SURVEY': {
			let _postData = Object.assign({}, {...state.postDataReviewSurvey}, action.data);
			return {...state, postDataReviewSurvey: _postData};
		}
		case 'SET_REJECT_SURVEY_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, rejectSurveyList : newData};
		}
		case 'SET_SHOW_ACCEPT': {
			let newState = {...state, showModalAccept: action.data};
			return newState;
		}
		case 'SET_USER_REJECT': {
			let _fSelect = Object.assign({}, {...state.filterSelect}, {
				userReject: action.data,
			});
			let newState = {...state, filterSelect: _fSelect};
			return newState;
		}
		case 'SET_SHOW_MODAL_EXAM': {
			let newState = {...state, showModalExam: action.data};
			return newState;
		}
		case 'SET_EXAM_LIST' : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, examList : newData};
		}
		default:
			return state;
	}
}