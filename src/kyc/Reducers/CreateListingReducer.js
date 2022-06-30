import {
    KYC_CREATE_LISTING_SET_PROPERTY_GROUP_LIST,
    KYC_CREATE_LISTING_SET_PROPERTY_TYPES_LIST,
    KYC_CREATE_LISTING_UPDATE_DATA,
    KYC_CREATE_LISTING_SET_USER_RIGHT_TYPE,
    KYC_CREATE_LISTING_SET_ZONE_DISTRICTS,
    KYC_CREATE_LISTING_SET_ZONE_WARDS,
    KYC_CREATE_LISTING_SET_ZONE_STREETS,
    KYC_CREATE_LISTING_SET_OWNER_INFOS,
    KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1601,
    KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1604,
    KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1607,
} from "../Actions/CreateListingActions"

const defaultState = {
    listingTypeList: [
        { value: 1, label: "Bán" },
        { value: 2, label: "Cho Thuê" }
    ],
    propertyGroupList: [],
    propertyTypesList: [],
    userRightTypeList: [],
    districts: [],
    wards: [],
    streets: [],
    purposes: {
        1601: [],
        1604: [],
        1607: [],
    },
    data: {
        listingTypeId: null,
        propertyTypeGroupId: null,
        propertyTypeGroup: null,
        propertyTypeId: null,
        useRightTypeId: null,
        cityId: 1,
        districtId: null,
        wardId: null,
        streetId: null,
        houseNumber: null,
        price: null,
        sourceId: 177, //TC
        crawlerStatus: 2, // Owner
        tcid: null,
        owner: {
            name: null,
            phone: null,
            email: null,
        },
        purposes: [],
    },
    disabled: {
        useRightTypeId: true,
    },
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case KYC_CREATE_LISTING_UPDATE_DATA: {
            const data = action.payload
            const disabled = state.disabled
            const dataState = {
                ...state,
                data: Object.assign(state.data, data),
            }
            disabled.useRightTypeId = dataState.data.listingTypeId !== 1
            const wards = dataState.data.districtId ? state.wards : []
            const streets = dataState.data.wardId ? state.streets : []
            return {
                ...state,
                disabled,
                wards,
                streets,
            }
        }
        case KYC_CREATE_LISTING_SET_OWNER_INFOS: {
            return {
                ...state,
                data: {
                    ...state.data,
                    owner: action.payload,
                },
            }
        }
        case KYC_CREATE_LISTING_SET_PROPERTY_GROUP_LIST: {
            return {
                ...state,
                propertyGroupList: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_PROPERTY_TYPES_LIST: {
            return {
                ...state,
                propertyTypesList: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_USER_RIGHT_TYPE: {
            return {
                ...state,
                userRightTypeList: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_ZONE_DISTRICTS: {
            return {
                ...state,
                districts: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_ZONE_WARDS: {
            return {
                ...state,
                wards: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_ZONE_STREETS: {
            return {
                ...state,
                streets: action.payload,
            }
        }
        case KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1601: {
            return {
                ...state,
                purposes: {
                    ...state.purposes,
                    1601: action.payload,
                },
            }
        }
        case KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1604: {
            return {
                ...state,
                purposes: {
                    ...state.purposes,
                    1604: action.payload,
                },
            }
        }
        case KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1607: {
            return {
                ...state,
                purposes: {
                    ...state.purposes,
                    1607: action.payload,
                },
            }
        }

        default:
            return state
    }
}
