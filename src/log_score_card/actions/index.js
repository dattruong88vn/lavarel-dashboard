import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';

export const actGetListHistory = (dataPost) => {
    return (dispatch) => {
        return callApi('/pos/SaApi/get-history-score-card', 'POST', dataPost).then(res => {
            if(res.data.code == 200) {
                dispatch({
                    type: types.SET_LIST_HISTORY,
                    data: res.data.data
                });
            }
        });
    };
}
// actions
export const actShowHideModal = (data) => {
    return {
        type: types.SHOW_HIDE_MODAL,
        data
    };
}
export const actSetListHistory = (data) => {
    return {
        type: types.SET_LIST_HISTORY,
        data
    };
}