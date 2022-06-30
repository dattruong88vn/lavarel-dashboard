import * as types from '../actions/actionTypes';

const defaultState = {
    commissionConfigList: []
};

const CommissionConfigListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_COMISSION_CONFIG_LIST:
            return {...state, commissionConfigList: action.data.data};
        default:
            return state;
    }
};

export default CommissionConfigListReducer;

