import * as types from './actionTypes';
import httpServices from '../utils/http';

export const getCrawlerList = (pagination, dataPost, clickedTabId = null, activeTab = null) => dispatch => {
    dispatch(change(true, '_LOADING'));
    httpServices.getCrawlerList(pagination, dataPost).then(res => {
        dispatch(change(false, '_LOADING'));
        if (res.data.result) {
            dispatch(setCrawlerData(res.data.data));
            dispatch(change(pagination.page, '_PAGINATION'));
            if (clickedTabId && clickedTabId !== activeTab) {
                dispatch(change(clickedTabId, '_TAB'));
            }
            dispatch(onIdSelected([]));
        }
    });
};

export const onIdSelected = data => {
    return {
        type: types.ON_ID_SELECTED_DATA,
        data
    };
};

export const setDataPost = (filter, callback) => {
    return {
        type: types.SET_DATA_POST,
        filter,
        callback
    };
}

export const setCrawlerData = data => {
    return {
        type: types.SET_CRAWLER_DATA,
        data
    };
};

export const setOptionList = (data, field) => {
    return {
        type: types.SET_OPTION_LIST,
        data,
        field
    };
};

export const changeSelect = (data, name) => {
    return {
        type: types.CHANGE_SELECT,
        data,
        name
    };
};

export const changeInput = (data = {}) => {
    return {
        type: types.CHANGE_INPUT,
        data
    };
};

export const resetSelect = (fieldValue, fieldOptions = null) => {
    return {
        type: types.RESET_SELECT,
        fieldValue,
        fieldOptions
    };
};

export const change = (data, prefix = '') => {
    return {
        type: 'CHANGE' + prefix,
        data
    };
};

export const showModal = (field, boolean) => {
    return {
        type: types.SHOW_MODAL,
        field,
        boolean
    }
};

export const showNotification = (boolean, notification = null) => {
    return {
        type: types.SHOW_NOTIFICATION,
        boolean,
        notification
    }
};

export const reset = (prefix = '') => {
    return {
        type: 'RESET' + prefix,
        prefix
    };
};

export const resetFilterForm = () => {
    return {
        type: types.RESET_FILTER_FORM
    }
};

export const setSorting = (data, cb = null) => {
    return {
        type: types.SET_SORTING,
        data,
        callback: cb
    };
};