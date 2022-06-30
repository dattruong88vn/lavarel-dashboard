import axios from "axios"
import { fetchPropertyTypes, fetchPropertyGroup } from "../Services/KycCommons"
const API = {
    GET_CHANNEL_SUB_TYPE: "/kyc-api/get-list-channel-sub-type",
    GET_PROPERTY_TYPE_LIST: "/lso/get-property-type-list",
    GET_CHANNEL_USER_RIGHT_TYPE: "/pos/prescreener/user-right-types",
    GET_ZONE_DISTRICTS: "/zone/get-district-list-by-city",
    GET_ZONE_WARDS: "/zone/get-wards",
    GET_ZONE_STREETS: "/zone/get-streets",
    INSERT_LISTING_PRE: "/pos/prescreener/insert-listing",
}
export const KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1601 =
    "KYC_CREATE_LISTING/SET_EXPERIENCE_QUESTION_1601"
export const KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1604 =
    "KYC_CREATE_LISTING/SET_EXPERIENCE_QUESTION_1604"
export const KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1607 =
    "KYC_CREATE_LISTING/SET_EXPERIENCE_QUESTION_1607"

export const KYC_CREATE_LISTING_UPDATE_DATA = "KYC_CREATE_LISTING/UPDATE_DATA"
export const KYC_CREATE_LISTING_SET_PROPERTY_GROUP_LIST =
    "KYC_CREATE_LISTING/SET_PROPERTY_GROUP_LIST"
export const KYC_CREATE_LISTING_SET_PROPERTY_TYPES_LIST =
    "KYC_CREATE_LISTING/SET_PROPERTY_TYPES_LIST"
export const KYC_CREATE_LISTING_SET_USER_RIGHT_TYPE =
    "KYC_CREATE_LISTING/SET_USER_RIGHT_TYPE"
export const KYC_CREATE_LISTING_SET_ZONE_DISTRICTS =
    "KYC_CREATE_LISTING/SET_ZONE_DISTRICTS"
export const KYC_CREATE_LISTING_SET_ZONE_WARDS =
    "KYC_CREATE_LISTING/SET_ZONE_WARDS"
export const KYC_CREATE_LISTING_SET_ZONE_STREETS =
    "KYC_CREATE_LISTING/SET_ZONE_STREETS"
export const KYC_CREATE_LISTING_SET_OWNER_INFOS =
    "KYC_CREATE_LISTING/SET_OWNER_INFO"

export const setChannelSubType = (id, data = {}) => {
    switch (id) {
        case 1601: {
            return {
                type: KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1601,
                payload: data,
            }
        }
        case 1604: {
            return {
                type: KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1604,
                payload: data,
            }
        }
        case 1607: {
            return {
                type: KYC_CREATE_LISTING_SET_EXPERIENCE_QUESTION_1607,
                payload: data,
            }
        }
    }
}
export const udpateData = (data = {}) => ({
    type: KYC_CREATE_LISTING_UPDATE_DATA,
    payload: data,
})
export const setPropertyGroupList = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_PROPERTY_GROUP_LIST,
    payload: data,
})
export const setPropertyTypesList = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_PROPERTY_TYPES_LIST,
    payload: data,
})
export const setUserRightType = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_USER_RIGHT_TYPE,
    payload: data,
})
export const setZoneDistricts = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_ZONE_DISTRICTS,
    payload: data,
})
export const setZoneWards = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_ZONE_WARDS,
    payload: data,
})
export const setZoneStreets = (data = []) => ({
    type: KYC_CREATE_LISTING_SET_ZONE_STREETS,
    payload: data,
})
export const setOwnerInfo = (data = {}) => ({
    type: KYC_CREATE_LISTING_SET_OWNER_INFOS,
    payload: data,
})
// fetch
export const fetchChannelSubType = (id = null) => {
    return (dispatch) => {
        return axios
            .get(API.GET_CHANNEL_SUB_TYPE + "/" + id)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    dispatch(setChannelSubType(id, xhr.data.data))
                }
            })
            .catch((err) => {
                throw error
            })
    }
}
export const fetchPropertyGroupForSelect = () => {
    showPropzyLoading()
    return (dispatch) => {
        fetchPropertyGroup((result) => {
            let { data } = result
            let propertyTypeGroup = data.map((item) => {return {value: item.id, label: item.name}})
            dispatch(setPropertyGroupList(propertyTypeGroup))
            hidePropzyLoading()
        })
    }
}
export const fetchPropertyType = (propertyTypeGroupId, listingTypeId) => {
    showPropzyLoading()
    return (dispatch) => {
        fetchPropertyTypes(propertyTypeGroupId, listingTypeId,  (result) => {
            let { data } = result
            let propertyTypes = data.map((item) => { return {value: item.propertyTypeId, label: item.typeName, data: {formId: item.formId}, disabled: !item.active }})
            dispatch(setPropertyTypesList(propertyTypes))
            hidePropzyLoading()
        })
    }
}
export const fetchUserRightTypeThunk = () => {
    return (dispatch) => {
        return axios
            .get(API.GET_CHANNEL_USER_RIGHT_TYPE)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    dispatch(setUserRightType(xhr.data.data))
                }
            })
            .catch((err) => {
                throw error
            })
    }
}
export const fetchDistrictsThunk = (id = 1) => {
    return (dispatch) => {
        return axios
            .get(API.GET_ZONE_DISTRICTS + "/" + id)
            .then((xhr) => {
                if (xhr.data && xhr.data.result) {
                    dispatch(setZoneDistricts(xhr.data.data))
                }
            })
            .catch((err) => {
                throw error
            })
    }
}
export const fetchWardsThunk = (id = 1) => {
    return (dispatch) => {
        return axios
            .get(API.GET_ZONE_WARDS + "/" + id)
            .then((xhr) => {
                let data = []
                if (xhr.data && xhr.data.result) {
                    data = xhr.data.data
                }
                dispatch(setZoneWards(data))
            })
            .catch((err) => {
                throw error
            })
    }
}
export const fetchStreetsThunk = (id = 1) => {
    return (dispatch) => {
        return axios
            .get(API.GET_ZONE_STREETS + "/" + id)
            .then((xhr) => {
                let data = []
                if (xhr.data && xhr.data.result) {
                    data = xhr.data.data
                }
                dispatch(setZoneStreets(data))
            })
            .catch((err) => {
                throw error
            })
    }
}
export const fetchInsetListing = (
    data = {},
    exData = { type: 1, dealId: null }
) => {
    return (dispatch) => {
        showPropzyLoading()
        return axios
            .post(API.INSERT_LISTING_PRE, JSON.stringify(data))
            .then((xhr) => {
                hidePropzyLoading()
                if (xhr.data && xhr.data.result) {
                    showPropzyConfirm({
                        message: "Bạn có muốn tạo thêm tin mới không ?",
                        okCallback: function () {
                            if (exData.dealId) {
                                window.location.replace(
                                    `/kyc/create-listing?type=2&dealId=${exData.dealId}`
                                )
                            } else {
                                window.location.replace(
                                    `/kyc/create-listing?type=2`
                                )
                            }
                        },
                        cancelCallback: function () {
                            if (exData.dealId) {
                                window.location.replace(
                                    `/kyc/buyer-confirm-requirements?dealId=${exData.dealId}`
                                )
                            } else {
                                window.location.replace(`/kyc/checking`)
                            }
                        },
                    })
                } else {
                    propzyNotifyAlert({
                        type: "propzy-notify-danger",
                        message: xhr.data.message,
                    })
                }
            })
            .catch((err) => {
                hidePropzyLoading()
                propzyNotifyAlert({
                    type: "propzy-notify-danger",
                    message: "Có lỗi xảy ra không thể tạo mới tin đăng",
                })
                throw error
            })
    }
}
