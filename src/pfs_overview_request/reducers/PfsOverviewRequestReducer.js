import * as types from './../actions/actionTypes';

const defaultState = {
    data : []
};

export default function PfsListReducer(state = defaultState, action) {
    switch(action.type){
        case types.PFS_SET_OVERVIEW_REQUEST: {
           return {...state, data : Array.isArray(action.data) ? action.data : []};
        }
        default:
            return state;
    }
}