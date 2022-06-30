import * as types from '../actions/actionTypes';

const defaultState = {
    formTypes: [],
    formFormularTypes: [],
    formFormularOperators: [],
    formFormularLogicals: [],
    formFormularCurrencies: [],
    userPositions: []
};

const CommissionConfigFormReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.GET_COMISSION_CONFIG_FORM_DATA_TYPE:
            return {...state, formTypes: action.data.data};

        case types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_TYPE:
            return {...state, formFormularTypes: action.data.data};

        case types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_OPERATOR:
            return {...state, formFormularOperators: action.data.data};

        case types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_LOGICAL:
            return {...state, formFormularLogicals: action.data.data};

        case types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_CURRENCY:
            return {...state, formFormularCurrencies: action.data.data};

        case types.GET_COMISSION_CONFIG_USER_POSITION:
            return {...state, userPositions: action.data.data};

        default:
            return state;
    }
};

export default CommissionConfigFormReducer;

