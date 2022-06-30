import * as constants from "src_redux/constants/lead"

export const initialState = {
    dataPost: null,
    formatFilterForm: null,
    itemDetail: null,
    matchingListingData: null,
    modals: {
        adjustCriteria: null
    }
}

export const LeadReducer = (state, action = null) => {
    switch (action.type) {
        case constants.GET_LEAD_DETAIL:
            state.itemDetail = action.payload

            break
        case constants.UPDATE_DATA_POST:
            state.dataPost = action.payload

            break
        case constants.FORMAT_FILTER_FORM:
            state.formatFilterForm = action.payload

            break
        case constants.GET_LIST_MATCHING_LISTING:
            state.matchingListingData = action.payload

            break
        case constants.GET_ADJUST_CRITERIA:
            state.modals.adjustCriteria = action.payload

            break
        
        default:            
            break
    }

    return state
}