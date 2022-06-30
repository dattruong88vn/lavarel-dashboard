import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';
let _STORED_LOCAL = {
    defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
};

export const apiGetListButtonFilter = (dataPost) => {
    return (dispatch) => {
        return callApi(`/pfs-list/get-list-button-filter`, 'POST', dataPost).then(res => {
            dispatch(actSetListButtonFilter(res.data.data));
        });
    };
}

export const apiGetListBankPP = () => {
    let banks = [_STORED_LOCAL.defaultValue];
    return (dispatch) => {
        return callApi(`/pfs-list/get-list-bank`, 'GET', null).then(res => {
            let content = res.data.data.list.map((it) => {
                return {value: it, label: it.name};
            });
            banks = banks.concat(content);
            dispatch(actGetListDataBankPP(banks));
        });
    };
}

export const apiSendProcessProfile = (dataPost) => {
    return (dispatch) => {
        return callApi(`/pfs-list/send-process-profile`, 'POST', dataPost).then(res => {
            showPropzyAlert(res.data.message, "Thông báo", function(){
                location.reload();
            });
            dispatch(actSendProcessProfile(res.data.data));
        });
    };
}

// actions
export const actSetTablePfs = (data) => {
    return {
        type: types.PFS_SET_TABLE,
        data
    };
}
export const actSetDataSearch = (data) => {
    return {
        type: types.PFS_SET_DATA_SEARCH,
        data
    };
}
export const actResetDataSearch = () => {
    return {
        type: types.PFS_RESET_DATA_SEARCH
    };
}
export const actSetDataPost = (data) => {
    return {
        type: types.PFS_SET_DATA_POST,
        data
    };
}
export const actResetDataPost = () => {
    return {
        type: types.PFS_RESET_DATA_POST
    };
}
export const actSetListButtonFilter = (data) => {
    return {
        type: types.PFS_SET_LIST_BUTTON_FILTER,
        data
    };
}
export const actReceiveRequest = (id, statusId) => {
    return (dispatch) => {
        return callApi(`/pfs-list/receive-request/${id}/${statusId}`, 'GET', null).then(res => {
            location.replace("/pfs-list/detail/" + id);
            dispatch({
                type: types.PFS_RECEIVE_REQUEST,
                data: res.data.data
            });
        });
    };
}
export const actUpdateStatus = (dataPost) => {
    return (dispatch) => {
        return callApi(`/pfs-list/update-status`, 'POST', dataPost).then(res => {
            location.replace("/pfs-list/detail/" + dataPost.mortgageRequestId);
            dispatch({
                type: types.PFS_UPDATE_STATUS,
                data: res.data.data
            });
        });
    };
}
export const actGetListAssign = () => {
    let assign = [_STORED_LOCAL.defaultValue];
    return (dispatch) => {
        return callApi(`/pfs-list/get-list-assign`, 'GET', null).then(res => {
            let content = res.data.data.list.map((it) => {
                return {value: it.assignedTo, label: it.name};
            });
            assign = assign.concat(content);
            dispatch({
                type: types.PFS_SET_LIST_ASSIGN,
                data: assign
            });
        });
    };
}
export const actSetDataSelectAssign = (value, data) => {
    return {
        type: types.PFS_SET_FILTER_DATA_SELECT,
        value,
        data
    };
}
/*Modal Process Profile*/
export const actShowHideModalPP = (data) => {
    return {
        type: types.PP_SHOW_HIDE_MODAL,
        data
    };
}
export const actGetListDataBankPP = (data) => {
    return {
        type: types.PP_SET_LIST_DATA_BANK,
        data
    };
}
export const actSetDataSelectBank = (value, data) => {
    return {
        type: types.PP_SET_DATA_FILTER_SELECT,
        value,
        data
    };
}
export const actSetDataBankPP = (data) => {
    return {
        type: types.PP_SET_DATA_BANK,
        data
    };
}
export const actResetDataBankPP = () => {
    return {
        type: types.PP_RESET_DATA_BANK
    };
}
export const actDeleteDataBankPP = (data) => {
    return {
        type: types.PP_DELETE_DATA_BANK,
        data
    };
}
export const actSetDataPostPP = (data) => {
    return {
        type: types.PP_SET_DATA_POST,
        data
    };
}
export const actResetDataPostPP = (data) => {
    return {
        type: types.PP_RESET_DATA_POST,
        data
    };
}
export const actSendProcessProfile = (data) => {
    return {
        type: types.PP_SEND_PROCESS_PROFILE,
        data
    };
}
/*Dropdown Progress*/
export const actGetListProgressDP = () => {
    let propgress = [_STORED_LOCAL.defaultValue];
    return (dispatch) => {
        return callApi(`/pfs-list/get-list-progress`, 'GET', null).then(res => {
            let content = res.data.data.map((it) => {
                return {value: it.id, label: it.name};
            });
            propgress = propgress.concat(content);
            dispatch({
                type: types.DP_SET_LIST_PROGRESS,
                data: propgress
            });
        });
    };
}

export const actSetDataSelectProgress = (value, data) => {
    return {
        type: types.DP_SET_DATA_SELECT,
        value,
        data
    };
}

export const actUpdateProgress = (dataPost) => {
    return (dispatch) => {
        return callApi(`/pfs-list/update-progress`, 'POST', dataPost).then(res => {
            location.reload();
            dispatch({
                type: types.DP_UPDATE_PROGRESS,
                data: res.data.data
            });
        });
    };
}

export const actSetDataPostDP = (data) => {
    return {
        type: types.DP_SET_DATA_POST,
        data
    };
}
export const actResetDataPostDP = () => {
    return {
        type: types.DP_RESET_DATA_POST
    };
}

export const actSetDataBankSuggest = (data) => {
    return {
        type: types.PP_SET_SUGGEST_DATA_BANK,
        data
    };
}

export const actGetListBankSuggest = (id) => {
    return (dispatch) => {
        return callApi(`/pfs-list/get-list-bank-suggest/${id}`, 'GET', null).then(res => {
            dispatch(actSetDataBankSuggest(res.data.data.list));
        });
    };
}