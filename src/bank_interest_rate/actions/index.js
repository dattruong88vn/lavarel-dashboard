import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';
let _STORED_LOCAL = {
    defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
};

export const apiSaveBank = (dataPost) => {
    return (dispatch) => {
        return callApi('/bank-interest-rate/save-bank', 'POST', dataPost).then(res => {
            showPropzyAlert(res.data.message)
            dispatch(actSaveBank(res.data.data));
        });
    };
}
export const apiGetDataListProfile = (id) => {
    return (dispatch) => {
        return callApi(`/bank-interest-rate/get-list-profile/${id}`, 'GET', null).then(res => {
            dispatch(actSetDataListProfile(res.data.data));
        });
    };
}
export const apiSendProfile = (dataPost) => {
    return (dispatch) => {
        return callApi('/bank-interest-rate/send-profile', 'POST', dataPost).then(res => {
            showPropzyAlert(res.data.message)
            dispatch(actSendProfile(res.data.data));
        });
    };
}

// actions
export const actShowHideModalBank = (data) => {
    return {
        type: types.SHOW_HIDE_MODAL_BANK,
        data
    };
}
export const actSetTableBank = (data) => {
    return {
        type: types.SET_TABLE_BANK,
        data
    };
}
export const actResetDataSearch = () => {
    return {
        type: types.RESET_DATA_SEARCH
    };
}
export const actSetDataSearch = (data) => {
    return {
        type: types.SET_DATA_SEARCH,
        data
    };
}
export const actResetDataPost = () => {
    return {
        type: types.RESET_DATA_POST
    };
}
export const actSetDataPost = (data) => {
    return {
        type: types.SET_DATA_POST,
        data
    };
}
export const actSaveBank = (data) => {
    return {
        type: types.SAVE_BANK,
        data
    };
}
export const actGetListSelectBank = () => {
    let users = [_STORED_LOCAL.defaultValue];
    return dispatch => {
        axios
            .get(`/bank-interest-rate/get-list-select-bank`)
            .then(response => {                
                let content = response.data.data.map((it) => {
                    return {value: it.id, label: it.name, isDisabled: it.isInterestedRate};
                });
                users = users.concat(content);
                dispatch({
                    type: types.SET_LIST_SELECT_BANK,
                    data: users
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};
export const actSetFilterSelectBank = (value, data) => {
    return {
        type: types.SET_FILTER_SELECT_BANK,
        value,
        data
    };
}

// Modal profile
export const actShowHideModalProfile = (data) => {
    return {
        type: types.SHOW_HIDE_MODAL_PROFILE,
        data
    };
}
export const actSetDataPostProfile = (data) => {
    return {
        type: types.SET_DATA_POST_PROFILE,
        data
    };
}
export const actResetDataPostProfile = () => {
    return {
        type: types.RESET_DATA_POST_PROFILE
    };
}
export const actSetDataListProfile = (data) => {
    return {
        type: types.SET_DATA_LIST_PROFILE,
        data
    };
}
export const actSendProfile = (data) => {
    return {
        type: types.SEND_PROFILE,
        data
    };
}