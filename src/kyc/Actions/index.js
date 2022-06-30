import axios from "axios"

import * as _RESP_CODE from "../constant/ResponseCode"
import * as _TYPE_CODE from "../constant/TypeCode"
import * as _API_CODE from "../constant/ApiCode"
import {MESSAGE_CHECKING_DUPLICATED} from "../constant/Message"

let _STORED_LOCAL = {
    defaultValue: {value: "", label: "--- Vui lòng chọn ---"},
}

/* Action Checking */
export const actShowHideModalChecking = (data) => {
    return {
        type: "CHECKING_SHOW_HIDE_MODAL",
        data,
    }
}

export const actShowHideModalHistoryCustomer = (data) => {
    return {
        type: "CHECKING_SHOW_HIDE_MODAL_HISTORY_CUSTOMER",
        data,
    }
}

export const actSetDataPostChecking = (data) => {
    return {
        type: "CHECKING_SET_DATA_POST",
        data,
    }
}

export const actResetDataPostChecking = () => {
    return {
        type: "CHECKING_RESET_DATA_POST",
    }
}

export const actSetDataSelectChecking = (value, data) => {
    return {
        type: "CHECKING_SET_DATA_FILTER_SELECT",
        value,
        data,
    }
}

export const actSetRightCustomer = (data) => {
    return {
        type: "CHECKING_SET_RIGHT_CUSTOMER",
        data,
    }
}

export const actResetRightCustomer = () => {
    return {
        type: "CHECKING_RESET_RIGHT_CUSTOMER",
    }
}

export const actShowContentChecking = (data) => {
    return {
        type: "CHECKING_SHOW_CONTENT_CHECKING",
        data,
    }
}

export const actSetTableChecking = (data) => {
    return {
        type: "CHECKING_SET_TABLE",
        data,
    }
}

export const actGetListRadioNeed = () => {
    return (dispatch) => {
        axios
            .get(`/kyc-api/get-list-channel-types/13`)
            .then(response => {
                let data = response.data.data[0].list;
                dispatch({type: "CHECKING_SET_LIST_RADIO_NEED", data: data});
            });
    };
};

export const actGetListGroup = () => {
    let data = [_STORED_LOCAL.defaultValue]
    return (dispatch) => {
        axios
            .get(`/common/real-estate-group`)
            .then((response) => {
                let result = response.data;
                let content = result.data.map((it) => {
                    return {value: it.id, label: it.name};
                });
                data = data.concat(content);
                dispatch({type: "CHECKING_SET_PROPERTY_TYPE_GROUP", data: data});
            });
    };
};

export const actGetListTypeLand = (group, type) => {
    let data = [_STORED_LOCAL.defaultValue]
    return (dispatch) => {
        axios
            .get(`/common/property-type-list-v2/${group}/${type}`)
            .then((response) => {
                let result = response.data;
                let content = result.data.map((it) => {
                    return {value: it.propertyTypeId, label: it.typeName, isDisabled: !it.active};
                });
                data = data.concat(content);
                dispatch({type: "CHECKING_SET_LIST_TYPE_LAND", data: data});
            });
    };
};

export const actGetListNeed = () => {
    let data = [_STORED_LOCAL.defaultValue]
    return (dispatch) => {
        axios
            .get(`/kyc-api/get-list-channel-sub-type/111`)
            .then((response) => {
                let content = response.data.data.map((it) => {
                    return {value: it.id, label: it.name};
                });
                data = data.concat(content);
                dispatch({type: "CHECKING_SET_LIST_NEED", data: data});
            });
    };
};

export const actGetListTypeCustomer = () => {
    let data = [_STORED_LOCAL.defaultValue]
    return (dispatch) => {
        axios
            .get(`/kyc-api/get-list-channel-sub-type/103`)
            .then((response) => {
                let content = response.data.data.map((it) => {
                    return {value: it.id, label: it.name};
                });
                data = data.concat(content);
                dispatch({type: "CHECKING_SET_LIST_TYPE_CUSTOMER", data: data});
            });
    };
};

export const actGetListLocationTc = () => {
    let data = [_STORED_LOCAL.defaultValue]
    return (dispatch) => {
        axios
            .get(`/kyc-api/get-list-location-tc`)
            .then((response) => {
                let content = response.data.data.map((it) => {
                    return {value: it.tcId, label: it.name}
                })
                data = data.concat(content)
                //remove first item
                data = data.filter((o) => {return (o.value !== "")})
                dispatch({type: "CHECKING_SET_LIST_LOCATION_TC", data: data});
            });
    };
};

export const actGetInfo = (dataPost) => {
    showPropzyLoading()
    return (dispatch) => {
        axios
            .post(`/kyc-api/get-info`, dataPost)
            .then((response) => {
                if (response.data.result == true) {
                    let data = response.data.data
                    dispatch({type: "CHECKING_SET_DATA_CHECKING", data: data})
                    dispatch(
                        actSetDataPostChecking({customerId: data.customerId})
                    )
                    hidePropzyLoading()
                } else {
                    hidePropzyLoading()
                    if (response.data.code == "401") {
                        propzyNotifyAlert({
                            type: "propzy-notify-warning",
                            message: "Bạn không có quyền truy cập",
                        })
                        setTimeout(() => {
                            location.replace("/kyc/checking")
                        }, 1000)
                    }
                }
            });
    };
};

export const actContinueChecking = (dataPost) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(`/kyc-api/continue-checking`, dataPost)
            .then((response) => {
                if (response.data.result == true) {
                    let data = response.data.data
                    let linkCreateListing =
                        data.dealId != null
                            ? "/kyc/create-listing?dealId=" + data.dealId
                            : "/kyc/create-listing"
                    let otherLink =
                        dataPost.otherTypeId != null &&
                            dataPost.otherTypeId == 111
                            ? "/kyc/checking"
                            : linkCreateListing
                    let path =
                        data.dealId != null
                            ? "/kyc/buyer-experience?dealId=" + data.dealId
                            : otherLink
                    propzyNotifyAlert({
                        type: "propzy-notify-success",
                        message: response.data.message,
                    })
                    setTimeout(() => {
                        location.replace(path)
                    }, 1000)
                    hidePropzyLoading()
                }
            })
    }
}

export const actCheckDuplicateLeadDeals = (dataPost, dataSave, dataGetDuplicateRequestDeal) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(`/kyc-api/check-duplicate-lead-deals`, dataPost)
            .then((response) => {
                if (response.data.result == true) {
                    let checkingDuplicate = null

                    if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                        checkingDuplicate = false
                    }

                    if (response.data.code === _RESP_CODE.CHECKING_IS_DUPLICATED) {
                        checkingDuplicate = true
                        propzyNotifyAlert({
                            type: "propzy-notify-warning",
                            message: MESSAGE_CHECKING_DUPLICATED,
                        })
                    }

                    dispatch({
                        type: _TYPE_CODE.CHECKING_DUPLICATED,
                        data: {
                            ...dataSave,
                            requestType: dataSave.listingTypeId,
                            checkingDuplicate
                        }
                    })
                } else {
                    propzyNotifyAlert({
                        type: "propzy-notify-warning",
                        message: response.data.message,
                    })
                    dispatch(actGetInfo(dataGetDuplicateRequestDeal));
                }
            }).finally(() => {
                hidePropzyLoading()
            });
    };
}

export const actRightCustomer = (dataPost, dataChecking) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(`/kyc-api/right-customer`, dataPost)
            .then((response) => {
                if (response.data.result == true) {
                    // is cloning deal, show modal CloneDeal
                    if (
                        response.data.code ===
                        _RESP_CODE.CLONE_DEAL_FROM_OTHER_BA
                    ) {
                        dispatch(actToggleModalCloneDeal(true))
                    } else {
                        // redirect to 6 KYC steps
                        const data = response.data.data
                        const path =
                            data.dealId != null
                                ? "/kyc/buyer-experience?dealId=" + data.dealId
                                : "/kyc/seller"
                        location.replace(path)
                    }
                } else {
                    if (response.data.code == "401") {
                        propzyNotifyAlert({
                            type: "propzy-notify-warning",
                            message: "Bạn không có quyền truy cập",
                        })
                        setTimeout(() => {
                            location.replace("/kyc/checking")
                        }, 1000)
                    } else if (response.data.code == "5005")  {
                        // case lead là group lead có deal đặt cọc
                        propzyNotifyAlert({
                            type: "propzy-notify-warning",
                            message: response.data.message,
                        })
                        setTimeout(() => {
                            dispatch(actGetInfo(dataChecking.postData))
                        }, 1000)
                    } else {
                        propzyNotifyAlert({
                            type: "propzy-notify-warning",
                            message: response.data.message,
                        })
                    }
                }
            })
            .finally(() => {
                hidePropzyLoading()
            })
    }
}

export const actToggleModalCloneDeal = (statusModal) => {
    return {
        type: _TYPE_CODE.TOGGLE_MODAL_CLONE_DEAL,
        data: statusModal,
    }
}

export const actGetClonedReasons = (data) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(_API_CODE.GET_LIST_CLONED_REASONS, data)
            .then((response) => {
                if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                    dispatch({
                        type: _TYPE_CODE.GET_LIST_CLONED_REASONS,
                        data: response.data.data,
                    })
                }
            }).finally(() => {
                hidePropzyLoading()
            })
    }
}

export const actSaveClonedReasons = (data) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(_API_CODE.SAVE_CLONED_DEAL, data)
            .then((response) => {
                if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                    propzyNotifyAlert({
                        type: "propzy-notify-success",
                        message: response.data.message,
                    })
                    setTimeout(() => {
                        location.replace(
                            `/kyc/buyer-experience?dealId=${response.data.data.dealId}`
                        )
                    }, 1000)
                } else {
                    propzyNotifyAlert({
                        type: "propzy-notify-warning",
                        message: response.data.message,
                    })
                }
            })
            .finally(() => {
                hidePropzyLoading()
            })
    }
}

export const getListReason = () => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .get(_API_CODE.GET_LIST_REASONS)
            .then((response) => {
                if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                    dispatch({
                        type: _TYPE_CODE.GET_LIST_REASONS,
                        data: response.data.data,
                    })
                }
            })
            .finally(() => {
                hidePropzyLoading()
            })
    }
}

export const unlockDealLead = (dataPost) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(_API_CODE.UNLOCK_DEAL_LEAD, dataPost)
            .then((response) => {
                if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                    // reset param unlock deal
                    dispatch({
                        type: _TYPE_CODE.UNLOCK_DEAL_LEAD,
                        data: false,
                    })

                    propzyNotifyAlert({
                        type: "propzy-notify-success",
                        message: response.data.message,
                    })
                    setTimeout(() => {
                        location.replace(
                            `/kyc/buyer-experience?dealId=${dataPost.needId}`
                        )
                    }, 1000)
                }
            })
            .finally(() => {
                hidePropzyLoading()
            })
    }
}

export const actGetDealGroup = (dataPost) => {
    return (dispatch) => {
        showPropzyLoading()
        axios
            .post(_API_CODE.GET_DEAL_GROUP, dataPost)
            .then((response) => {
                if (response.data.code === _RESP_CODE.CODE_SUCCESS) {
                    dispatch({
                        type: _TYPE_CODE.GET_DEAL_GROUP,
                        data: response.data.data,
                    })
                }
            })
            .finally(() => {
                hidePropzyLoading()
            })
    }
}

export const goKycChecking = () => {
    return {
        type: _TYPE_CODE.GO_BACK_KYC_CHECKING,
    }
}
/******************/
