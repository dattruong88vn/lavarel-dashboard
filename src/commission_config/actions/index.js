import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';

export const apiGetCommissionDetail = (id, callback = null) => {
    return (dispatch) => {
        return callApi('/commission-config/get-detail', 'POST', {id: id}).then(res => {
            if (callback !== null) {
                callback(res.data);
            }
        });
    }
};

export const apiSaveCommissionConfig = (model, callback = null) => {
    return (dispatch) => {
        return callApi('/commission-config/create-update', 'POST', model).then(res => {
            if (callback !== null) {
                callback(res.data);
            }
        });
    }
};

export const apiGetCommissionConfigList = (params = {}, callback = null) => {
    return (dispatch) => {
        return callApi('/commission-config/get-list', 'POST', params).then(res => {
            dispatch(actSetCommissionList(res.data));
            if (callback !== null) {
                callback(res.data);
            }
        });
    }
};
const actSetCommissionList = data => {
    return {
        type: types.GET_COMISSION_CONFIG_LIST,
        data: data
    }
};

export const apiGetCommissionConfigUserPosition = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-user-position', 'GET').then(res => {
            dispatch(actSetCommissionUserPosition(res.data));
        });
    }
};
const actSetCommissionUserPosition = data => {
    return {
        type: types.GET_COMISSION_CONFIG_USER_POSITION,
        data: data
    }
};

export const apiGetCommissionConfigDataType = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-form-data', 'POST', {type: types.DATA_SETTING_ID_TYPE}).then(res => {
            dispatch(actSetCommissionDataType(res.data));
        });
    }
};
const actSetCommissionDataType = data => {
    return {
        type: types.GET_COMISSION_CONFIG_FORM_DATA_TYPE,
        data: data
    }
};

export const apiGetCommissionConfigDataFormularOperator = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-form-data', 'POST', {type: types.DATA_SETTING_ID_FORMULAR_OPERATOR}).then(res => {
            dispatch(actSetCommissionDataFormularOperator(res.data));
        });
    }
};
const actSetCommissionDataFormularOperator = data => {
    return {
        type: types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_OPERATOR,
        data: data
    }
};

export const apiGetCommissionConfigDataFormularType = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-form-data', 'POST', {type: types.DATA_SETTING_ID_FORMULAR_TYPE}).then(res => {
            dispatch(actSetCommissionDataFormularType(res.data));
        });
    }
};
const actSetCommissionDataFormularType = data => {
    return {
        type: types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_TYPE,
        data: data
    }
};

export const apiGetCommissionConfigDataFormularLogical = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-form-data', 'POST', {type: types.DATA_SETTING_ID_FORMULAR_LOGICAL}).then(res => {
            dispatch(actSetCommissionDataFormularLogical(res.data));
        });
    }
};
const actSetCommissionDataFormularLogical = data => {
    return {
        type: types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_LOGICAL,
        data: data
    }
};

export const apiGetCommissionConfigDataFormularCurrency = () => {
    return (dispatch) => {
        return callApi('/commission-config/get-form-data', 'POST', {type: types.DATA_SETTING_ID_FORMULAR_CURRENCY}).then(res => {
            dispatch(actSetCommissionDataFormularCurrency(res.data));
        });
    }
};
const actSetCommissionDataFormularCurrency = data => {
    return {
        type: types.GET_COMISSION_CONFIG_FORM_DATA_FORMULAR_CURRENCY,
        data: data
    }
};

