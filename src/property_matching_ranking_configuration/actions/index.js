import * as types from "./actionTypes";
import axios from "axios";

export const actGetCriteriaOption = (data) => {
    let listData = [];
    return (dispatch) => {
        showPropzyLoading();
        axios
            .get(
                `matching-configuration/get-criteria-list/${data.screenId}/${data.propId}`
            )
            .then((response) => {
                hidePropzyLoading();
                let content = response.data.data.map((it) => {
                    return { value: it.code, label: it.name };
                });
                listData = listData.concat(content);
                dispatch({
                    type: types.GET_CRITERIA_OPTIONS,
                    data: listData,
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const actGetCriteriaItems = (data) => {
    return (dispatch) => {
        showPropzyLoading();
        axios
            .get(
                `matching-configuration/get-criteria-items/${data.screenId}/${data.propId}`
            )
            .then((response) => {
                hidePropzyLoading();
                let content = response.data.data;
                dispatch({
                    type: types.GET_CRITERIA_ITEM,
                    data: content,
                });
                dispatch({
                    type: types.SET_TAB_ID_PROP_ID,
                    data: data,
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const actOnCriteriaListChange = (data, ids) => {
    showPropzyLoading();
    return (dispatch) => {
        axios
            .get(
                `matching-configuration/get-criteria-item/${data.value}/${ids.screenId}/${ids.propId}`
            )
            .then((response) => {
                hidePropzyLoading();
                let content = response.data.data;
                dispatch({
                    type: types.GET_CRITERIA_OPTION_DETAIL,
                    data: content,
                });
                dispatch({
                    type: types.SET_CRITERIA_OPTION_SELECTED,
                    data: data,
                });
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(error);
                }
            });
    };
};

export const actRemoveCriteria = (id, name) => {
    return {
        type: types.REMOVE_CRITERIA,
        data: {id, name}
    };
};

export const actCriteriaItemChange = (data) => {
    return {
        type: types.ON_CRITERIA_ITEM_CHANGE,
        data
    };
};

export const actOnCriteriaSubItemAdd = (data) => {
    return {
        type: types.ADD_CRITERIA_SUB_ITEM,
        data
    };
};

export const actOnCriteriaSubItemDelete = (data) => {
    return {
        type: types.DELETE_CRITERIA_SUB_ITEM,
        data
    };
};
