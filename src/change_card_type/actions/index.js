import * as types from './actionTypes';
import axios from 'axios';
import callApi from '../../utils/apiCaller';
let _STORED_LOCAL = {
    defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
};

export const apiSubmit = (dataPost) => {
    return (dispatch) => {
        return callApi('/pos/SaApi/update-card-type', 'POST', dataPost).then(res => {
            showPropzyAlert(res.data.message);
            setTimeout(function() {
                window.location.reload();
            }, 3000);
            dispatch(actSubmit(res.data.data));
        });
    };
}
// actions
export const actShowHideModalCardType = (data) => {
    return {
        type: types.SHOW_HIDE_MODAL_CARD_TYPE,
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
export const actSetDisableSave = (data) => {
    return {
        type: types.SET_DISABLE_SAVE,
        data
    };
}
export const actSubmit = (data) => {
    return {
        type: types.SUBMIT,
        data
    };
}
export const actGetListSelectCardType = () => {
    let listData = [_STORED_LOCAL.defaultValue];
    return dispatch => {
        axios.get(`/pos/SaApi/get-list-card`)
            .then(response => {                
                let content = response.data.data[0].list.map((it) => {
                    return {value: it.id, label: it.name};
                });
                listData = listData.concat(content);
                dispatch({
                    type: types.SET_LIST_SELECT_CARD_TYPE,
                    data: listData
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};
export const actSetSelectCardType = (value, data) => {
    return {
        type: types.SET_SELECT_CARD_TYPE,
        value,
        data
    };
}