import * as constants from "src_redux/constants/lead"

export const getItemDetail = (data) => {
    return {
        type: constants.GET_LEAD_DETAIL,
        payload: data
    }
}
export const formatFilterForm = (data) => {
    return {
        type: constants.FORMAT_FILTER_FORM,
        payload: data
    }
}
export const getListMatchingListing = (data) => {
    return {
        type: constants.GET_LIST_MATCHING_LISTING,
        payload: data
    }
}
export const updateDataPost = (data) => {
    return {
        type: constants.UPDATE_DATA_POST,
        payload: data
    }
}
export const getAdjusCriteriaData = (data) => {
    return {
        type: constants.GET_ADJUST_CRITERIA,
        payload: data
    }
}