import axios from 'axios';
let _STORED_LOCAL = {
    defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
};
export const fetchChanelChild = () => {
        return dispatch => {
            axios
                .get(`/common/chanel-child/1115`)
                .then(response => {
                    let data = response.data;
                    dispatch(chanelChild(data));
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                    }
                });
        };
};

export const fetchInfo = () => {
    return dispatch => {
        axios
            .get(`/pfs-list/get-info/${mortgage.mortgageId}`)
            .then(response => {
                let data = response.data.data;
                dispatch(infoMortgage(data));
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const changeRequestStatus = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/change-request-status`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message, "Thông báo", function(){
                    location.reload();
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const createMortgageRequest = (dataPost,callback = null) => {
    return dispatch => {
        axios
            .post(`/mortgage/create-mortgage-request`,dataPost)
            .then(response => {
                let data = response.data;
                if(callback !== null)
                    callback(data);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

const chanelChild = data => ({
    type: "FETCH_CHANEL_CHILD",
    payload: data
});

const infoMortgage = data => ({
    type: "FETCH_INFO_MORTGAGE",
    payload: data
});

const validFields = {
    "loan": "Số tiền khách hàng muốn vay không đúng",
    "initCapital": "Số tiền khách hàng có sẵn không đúng",
    "documents": {
        "1119": "Số tiền thu nhập từ Lương không đúng",
        "1120": "Số tiền thu nhập từ Cho thuê nhà không đúng",
        "1121": "Số tiền thu nhập từ Cho thuê xe không đúng",
        "1122": "Số tiền thu nhập từ Kinh doanh hộ gia đình không đúng",
        "1123": "Số tiền thu nhập từ Chủ doanh nghiệp/Cổ đông doanh nghiệp không đúng"
    }
}

export const checkValid = function(dataPost) {
    let listField = Object.keys(validFields);
    for (let field of listField) {
        // if(){

        // }
        // if((dataPost[field] == null || dataPost[field] == "" || dataPost[field] == 0) && validFields[field]) { // nếu nó là string
        //     return validFields[field];
        //     // || isNaN(dataPost[field])
        // }
        if(Array.isArray(dataPost[field]) && dataPost[field].length != 0) { // nếu nó là array
            let lstDoc = dataPost[field];
            for(let item of lstDoc) {
                if((parseInt(item.income) == 0 && validFields[field][item.channelTypeId] ) || isNaN(item.income) ) {
                    return validFields[field][item.channelTypeId];
                }
            }
        }else{ // không phải array
            if( ((dataPost[field] == null || dataPost[field] == "" || dataPost[field] == 0) && validFields[field] ) || isNaN(dataPost[field])) { // nếu nó là string
                return validFields[field];
                // || isNaN(dataPost[field])
            }
        }
    }
    return true;
}

export const updateValidateField = (dataPost) => {
    return dispatch => {
        axios
            .post(`/pfs-list/send-validate-field`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message, "Thông báo", function(){
                    location.reload();
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const actRejectProfile = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/reject-profile`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message, "Thông báo", function(){
                    location.reload();
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

const listReasonReject = data => ({
    type: "SET_LIST_REASON_REJECT",
    data: data
});

export const actGetListReasonReject = () => {
    let reasons = [_STORED_LOCAL.defaultValue];
    return dispatch => {
        axios
            .get(`/mortgage/get-reason-reject/`)
            .then(response => {                
                let content = response.data.data.map((it) => {
                    return {value: it.id, label: it.name};
                });
                reasons = reasons.concat(content);
                dispatch(listReasonReject(reasons));
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const actSetDataReasonReject = (value, data) => {
    return {
        type: "SET_SELECT_DATA_REASON_REJECT",
        value,
        data
    };
}

export const actResetDataReasonReject = () => {
    return {
        type: "RESET_DATA_REASON_REJECT"
    };
}

export const actSetRejectProfile = (data) => {
    return {
        type: "SET_REJECT_PROFILE",
        data
    };
}

export const actUpdateResultBank = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/update-result-bank`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message, "Thông báo", function(){
                    location.reload();
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const actDownloadProfile = (id) => {
    return dispatch => {
        axios
            .get(`/mortgage/download-profile/${id}`,)
            .then(response => {
                let data = response.data;
                if (data.result) {
                    window.location = data.data.linkFile;
                } else {
                    showPropzyAlert(response.message);
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

const listUserMortgage = data => ({
    type: "SET_LIST_USER_MORTGAGE",
    data: data
});

export const actGetListUserMortgage = () => {
    let users = [_STORED_LOCAL.defaultValue];
    return dispatch => {
        axios
            .get(`/mortgage/get-list-user-mortgage`)
            .then(response => {                
                let content = response.data.data.map((it) => {
                    return {value: it.userId, label: it.name};
                });
                users = users.concat(content);
                dispatch(listUserMortgage(users));
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};

export const actSetSelectDataReassign = (value, data) => {
    return {
        type: "SET_SELECT_DATA_REASSIGN",
        value,
        data
    };
}

export const actResetDataReassign = () => {
    return {
        type: "RESET_DATA_REASSIGN"
    };
}

export const actSetDataReassign = (data) => {
    return {
        type: "SET_DATA_REASSIGN",
        data
    };
}

export const actReassign = (dataPost) => {
    return dispatch => {
        axios
            .post(`/mortgage/reassign`,dataPost)
            .then(response => {
                let data = response.data;
                showPropzyAlert(data.message, "Thông báo", function(){
                    location.reload();
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                }
            });
    };
};