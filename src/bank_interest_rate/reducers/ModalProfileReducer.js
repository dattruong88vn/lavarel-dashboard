import * as types from './../actions/actionTypes';

var defaultState = {
    postDataProfile: {
        requestId: null,
        fileRequires: []
    },
    showHideModalProfile: false,
    listProfile: []
};

export default function ModalProfileReducer(state = defaultState, action) {
    switch(action.type){
        case types.SET_DATA_POST_PROFILE: {
            let _postDataProfile = Object.assign({}, {...state.postDataProfile}, action.data);
            return {...state, postDataProfile: _postDataProfile};
        }
        case types.SHOW_HIDE_MODAL_PROFILE: {
            let newState = {...state, showHideModalProfile: action.data};
            return newState;
        }
        case types.RESET_DATA_POST_PROFILE: {
            return {...state,
                postDataProfile : {
                    requestId: null,
                    fileRequires: []
                }
            };
        }
        case types.SET_DATA_LIST_PROFILE : {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listProfile : newData};
        }
        case types.SEND_PROFILE: {
            let _postDataProfile = Object.assign({}, {...state.postDataProfile}, action.data);
            return {...state, postDataProfile: _postDataProfile};
        }
        default:
            return state;
    }
}