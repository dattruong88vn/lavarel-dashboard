import { REASON_TYPE } from "../constant/RequestType"
import * as _TYPE_CODE from "../constant/TypeCode"

const defaultState = {
    postData: {
        name: "",
        phone: "",
        email: "",
        socialUid: null,
        customerId: null,
        // tcId: {value: 5, label: "Propzy 202 Điện Biên Phủ"},
        tcId: null,
        requestType: 97,
        needId: null,
        visitorType: null,
        listingTypeId: null,
        propertyTypeId: null,
        intent: null,
    },
    showContentChecking: false,
    modalNeedCustomer: false,
    modalHistoryCustomer: false,
    dataChecking: {
        customers: null,
    },
    listRadioNeed: [],
    listTypeLand: [],
    listNeed: [],
    listTypeCustomer: [],
    listLocationTc: [],
    filterSelect: {
        requestType: 97,
        visitorType: null,
        propertyTypeId: null,
        tcId: null,
    },
    rightCus: {
        leadId: 0,
        phone: "",
    },
    tableChecking: null,
    unlockLeadDeal: false,
    listReasons: [],
    dealGroup: null,
    dealCloning: {
        clonedReasons: null,
        isClonedDeal: false,
        reasonType: REASON_TYPE,
    },
}

export default function Checking(state = defaultState, action) {
    switch (action.type) {
        case "CHECKING_SHOW_HIDE_MODAL": {
            let newState = {...state, modalNeedCustomer: action.data};
            
            return newState;
        }
        case "CHECKING_SET_DATA_CHECKING": {
            let newState = { ...state, dataChecking: action.data }
            return newState
        }
        case "CHECKING_SET_DATA_POST": {
            let _postData = Object.assign(
                {},
                { ...state.postData },
                action.data
            )
            return { ...state, postData: _postData }
        }
        case "CHECKING_RESET_DATA_POST": {
            let newState = {
                ...state,
                postData: { ...defaultState.postData, requestType: null },
            }

            return newState
        }
        case "CHECKING_SHOW_HIDE_MODAL_HISTORY_CUSTOMER": {
            let newState = { ...state, modalHistoryCustomer: action.data }
            return newState
        }
        case "CHECKING_SET_LIST_RADIO_NEED": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
            return { ...state, listRadioNeed: newData }
        }
        case "CHECKING_SET_PROPERTY_TYPE_GROUP": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
            return { ...state, listGroup: newData }
        }
        case "CHECKING_SET_LIST_TYPE_LAND": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
            return { ...state, listTypeLand: newData }
        }
        case "CHECKING_SET_LIST_NEED": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
            return { ...state, listNeed: newData }
        }
        case "CHECKING_SET_LIST_TYPE_CUSTOMER": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
            return { ...state, listTypeCustomer: newData }
        }
        case "CHECKING_SET_LIST_LOCATION_TC": {
            let newData = []
            if (Array.isArray(action.data)) {
                newData = action.data
            }
			return {...state, listLocationTc : newData};
        }
        case "CHECKING_SET_DATA_FILTER_SELECT": {
            let _fSelect = Object.assign(
                {},
                { ...state.filterSelect },
                action.value
            )
            let _post = Object.assign(
                {},
                { ...state.postData },
                action.data ? action.data : null
            )
            return { ...state, filterSelect: _fSelect, postData: _post }
        }
        case "CHECKING_SET_RIGHT_CUSTOMER": {
            let _postData = Object.assign(
                {},
                { ...state.rightCus },
                action.data
            )
            return { ...state, rightCus: _postData }
        }
        case "CHECKING_RESET_RIGHT_CUSTOMER": {
            return { ...state, rightCus: defaultState.rightCus }
        }
        case "CHECKING_SHOW_CONTENT_CHECKING": {
            let newState = { ...state, showContentChecking: action.data }
            return newState
        }
        case "CHECKING_SET_TABLE": {
            state.tableChecking = action.data
            return state
        }
        case _TYPE_CODE.UNLOCK_DEAL_LEAD: {
            state.unlockLeadDeal = action.data
            return state
        }
        case _TYPE_CODE.GET_LIST_REASONS: {
            state.listReasons = action.data
            return state
        }
        case _TYPE_CODE.GET_LIST_CLONED_REASONS: {
            const newState = {
                ...state,
                dealCloning: {
                    ...state.dealCloning,
                    clonedReasons: action.data,
                },
            }
            return newState
        }
        case _TYPE_CODE.GET_DEAL_GROUP: {
            const newState = { ...state, dealGroup: action.data }
            return newState
        }
        case _TYPE_CODE.TOGGLE_MODAL_CLONE_DEAL: {
            const newState = {
                ...state,
                dealCloning: {
                    ...state.dealCloning,
                    isClonedDeal: action.data,
                },
            }
            return newState
        }
        case _TYPE_CODE.CHECKING_DUPLICATED: {
            const newState = {
                ...state,
                postData: {
                    ...state.postData,
                    ...action.data,
                },
            }
            return newState
        }
        case _TYPE_CODE.GO_BACK_KYC_CHECKING: {
            const newState = {
                ...state,
                dealGroup: defaultState.dealGroup,
            }
            return newState
        }
        default:
            return state
    }
}
