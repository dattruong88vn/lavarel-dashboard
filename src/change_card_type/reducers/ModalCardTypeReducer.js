import * as types from './../actions/actionTypes';

var defaultState = {
    postData: {
        rListingId: parseInt($("#change_card_type").attr("data-rlisting")),
        scorecardType: null,
        description: ''
    },
    showHideModalCardType: false,
    disableSave: true,
    listSelectCardType: [],
    selectCardType: {
        scorecardType: null
    }
};

export default function ModalBankReducer(state = defaultState, action) {
    switch(action.type){
        case types.SET_DATA_POST: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.SET_DISABLE_SAVE: {
            let newState = {...state, disableSave: action.data};
            return newState;
        }
        case types.SHOW_HIDE_MODAL_CARD_TYPE: {
            let scorecard = parseInt($("#change_card_type").attr("data-scorecard"));
            let selectCardType = [...state.listSelectCardType].filter(x => x.value == scorecard)[0];
            let newState = {...state, 
                showHideModalCardType: action.data, 
                selectCardType: {
                    ...state.selectCardType, scorecardType: selectCardType
                }
            };
            return newState;
        }
        case types.RESET_DATA_POST: {
            return {...state,
                postData : defaultState.postData,
                selectCardType : defaultState.selectCardType,
                disableSave: true
            };
        }
        case types.SUBMIT: {
            let _postData = Object.assign({}, {...state.postData}, action.data);
            return {...state, postData: _postData};
        }
        case types.SET_LIST_SELECT_CARD_TYPE: {
			let newData = [];
			if(Array.isArray(action.data)) {
				newData = action.data;
			}
			return {...state, listSelectCardType : newData};
        }
        case types.SET_SELECT_CARD_TYPE: {
			let _fSelect = Object.assign({}, {...state.selectCardType}, action.value);
            let _post = Object.assign({}, {...state.postData}, action.data ? action.data : null);            
			return {...state , selectCardType : _fSelect, postData: _post};
        }
        default:
            return state;
    }
}