import * as types from './../actions/actionTypes';

var defaultState = {
    showHideModal: false,
    dataHistory: null
};

export default function ModalLogScoreCardReducer(state = defaultState, action) {
    switch(action.type){
        case types.SHOW_HIDE_MODAL: {
            let newState = {...state, 
                showHideModal: action.data
            };
            return newState;
        }
        case types.SET_LIST_HISTORY: {
            let _newData = Object.assign({}, {...state.dataHistory}, action.data);
            if(action.data == "reset"){
                _newData = "reset";   
            }
            return {...state, dataHistory: _newData};
        }
        default:
            return state;
    }
}