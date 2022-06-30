import * as types from './../actions/actionTypes';

var defaultState = {
    postDataProgress: {
        "mortgageRequestId":null,
        "progressId": null
    },
    selectProgress: {
        progressId: null
    },
    listProgress: []
};

export default function DropdownProgressReducer(state = defaultState, action) {
    switch(action.type){
        case types.DP_SET_DATA_POST: {
            let _postDataProgress = Object.assign({}, {...state.postDataProgress}, action.data);
            return {...state, postDataProgress: _postDataProgress};
        }
        case types.DP_RESET_DATA_POST: {
            return {...state,
                searchData : defaultState.searchData
            };
        }
        case types.DP_SET_LIST_PROGRESS: {
			let newData = [];
			if (Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listProgress : newData};
        }
        case types.DP_SET_DATA_SELECT : {
            const _selectProgress = Object.assign({}, {...state.selectProgress}, action.value);
            const _postDataProgress = Object.assign({}, {...state.postDataProgress}, action.data ? action.data : null);
            return {...state , selectProgress : _selectProgress, postDataProgress: _postDataProgress};
        }
        case types.DP_UPDATE_PROGRESS: {
            let _postDataProgress = Object.assign({}, {...state.postDataProgress}, action.data);
            return {...state, postDataProgress: _postDataProgress};
        }
        default:
            return state;
    }
}