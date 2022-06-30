import axios from 'axios';
const _API_PAGE = {
    'GET_LIST_RELATED_LISTING' : '/kyc-api/get-list-related-listing',
    'GET_DETAIL_RELATED_LISTING' : '/kyc-api/get-detail-Listing',
    'UPDATE_FEEDBACK_LISTING' : '/kyc-api/update-feedback-listing',
    'CREATE_REMINDER' : '/kyc-api/create-reminder',
    'REMOVE_LISTING_BASKET' : '/deal/delete-listing',
    'SEND_CHECK_EMPTY' : '/kyc-api/send-check-empty',
    'GET_LIST_REASON_DENY_TOUR' : '/kyc-api/get-list-channel-sub-type/1616',
    'SAVE_DENY_TOUR' : '/kyc-api/save-deny-tour',
    'GET_BOOK_TOUR_PERMISSION': '/deal/get-book-tour-permission',
};

export const KYC_PRODUCT_ADVICE_GET_LIST_RELATED_LISTING = 'KYC_PRODUCT_ADVICE/GET_LIST_RELATED_LISTING';
export const KYC_PRODUCT_ADVICE_GET_DETAIL_RELATED_LISTING = 'KYC_PRODUCT_ADVICE/GET_DETAIL_RELATED_LISTING';
export const KYC_PRODUCT_ADVICE_CHANGE_INDEX_LISTING = 'KYC_PRODUCT_ADVICE/CHANGE_INDEX_LISTING';
export const KYC_PRODUCT_ADVICE_CHANGE_FEEDBACK = 'KYC_PRODUCT_ADVICE/CHANGE_FEEDBACK';
export const KYC_PRODUCT_REMOVE_LISTING = 'KYC_PRODUCT_ADVICE/REMOVE_LISTING';
export const KYC_PRODUCT_ADD_LISTING_TOUR = 'KYC_PRODUCT_ADVICE/ADD_LISTING_TOUR';
export const KYC_PRODUCT_REMOVE_LISTING_TOUR = 'KYC_PRODUCT_ADVICE/REMOVE_LISTING_TOUR';
export const KYC_PRODUCT_ADVICE_GET_REASON_DENY_TOUR = 'KYC_PRODUCT_ADVICE_GET_REASON_DENY_TOUR';
export const KYC_PRODUCT_ADVICE_BOOK_TOUR_PERMISSION = 'KYC_PRODUCT_ADVICE_BOOK_TOUR_PERMISSION';

export const getListRelatedListing = (data = {}) => ({
    type : KYC_PRODUCT_ADVICE_GET_LIST_RELATED_LISTING,
    payload : data
});

export const getListReasonDenyTour = (data = {}) => ({
    type : KYC_PRODUCT_ADVICE_GET_REASON_DENY_TOUR,
    payload : data
});
export const getDetailListing = (data = {}) => ({
    type : KYC_PRODUCT_ADVICE_GET_DETAIL_RELATED_LISTING,
    payload : data
});
export const changeIndexListing = (index = null) => ({
    type : KYC_PRODUCT_ADVICE_CHANGE_INDEX_LISTING,
    payload : index
});
export const changeFeedback = (feedbackListingId = null) => ({
    type : KYC_PRODUCT_ADVICE_CHANGE_FEEDBACK,
    payload : feedbackListingId
});
export const removeListingToList = (rlisting) => ({
    type : KYC_PRODUCT_REMOVE_LISTING,
    payload : rlisting
});
export const addBookTour = (rlisting) => ({
    type : KYC_PRODUCT_ADD_LISTING_TOUR,
    payload : rlisting
});
export const removeBookTour = (rlisting) => ({
    type : KYC_PRODUCT_REMOVE_LISTING_TOUR,
    payload : rlisting
});
export const getBookTourPermission = (data = {}) => ({
    type : KYC_PRODUCT_ADVICE_BOOK_TOUR_PERMISSION,
    payload : data
});

export const fetchSendCheckEmpty = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.SEND_CHECK_EMPTY, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    //const response = xhr.data.data;
                    dispatch(fetchDetailListingThunk({
                        dealId : data.dealId,
                        rlistingId : data.checkListings[0].rlistingId
                    }));
                    propzyNotifyAlert({type: "propzy-notify-success", message : xhr.data.message});
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.data.message});
                }

            })
            .catch(error => {
                hidePropzyLoading();
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Đã có lỗi xảy ra. Xin vui lòng thử lại'});
                throw(error);
            });
    };
};
export const fetchListRelatedListingThunk = (data = {}) => {
    return (dispatch) => {
        //showPropzyLoading();
        return axios.post(_API_PAGE.GET_LIST_RELATED_LISTING, data)
            .then(xhr => {
                //hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(getListRelatedListing(response));
                }

            })
            .catch(error => {
                //hidePropzyLoading();
                throw(error);
            });
    };
};

export const fetchListReasonDenyTourThunk = () => {
    return (dispatch) => {
        //showPropzyLoading();
        return axios.post(_API_PAGE.GET_LIST_REASON_DENY_TOUR)
            .then(xhr => {
                //hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(getListReasonDenyTour(response));
                }
            })
            .catch(error => {
                //hidePropzyLoading();
                throw(error);
            });
    };
};

export const fetchDetailListingThunk = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.GET_DETAIL_RELATED_LISTING, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(getDetailListing(response));
                }

            })
            .catch(error => {
                hidePropzyLoading();
                throw(error);
            });
    };
};

export const fetchUpdateFeedbackThunk = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.UPDATE_FEEDBACK_LISTING, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    const response = xhr.data.data;
                    dispatch(changeFeedback(data.feedbackListingId));
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể cập nhật thông tin phản hồi'});
                }

            })
            .catch(error => {
                hidePropzyLoading();
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể cập nhật thông tin phản hồi'});
                throw(error);
            });
    };
};

export const setReminderThunk = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.CREATE_REMINDER, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    propzyNotifyAlert({type: "propzy-notify-success", message : 'Thành công!'});
                    setTimeout(function () {
                        window.location.replace(`/kyc/process-procedures?dealId=${data.dealId}`);
                    }, 1000);
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể tạo lịch hẹn, xin vui lòng thử lại'});
                }

            })
            .catch(error => {
                hidePropzyLoading();
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Không thể tạo lịch hẹn, xin vui lòng thử lại'});
                throw(error);
            });
    };
};

export const saveDenyTourThunk = (data = {}) => {

    return (dispatch) => {

        showPropzyLoading();
        return axios.post(_API_PAGE.SAVE_DENY_TOUR, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    propzyNotifyAlert({type: "propzy-notify-success", message : 'Lưu thành công!'});
                    // $(function () {
                    //     $('#modal').modal('toggle');
                    //  });
                    setTimeout(function () {
                        window.location.replace(`/kyc/extended-feedback?dealId=${data.dealId}`);
                    }, 1000);
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Lưu thất bại'});
                }

            })
            .catch(error => {
                hidePropzyLoading();
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Lưu thất bại'});
                throw(error);
            });

    };

};



export const removeListingOutCollection = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.REMOVE_LISTING_BASKET, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data && xhr.data.result) {
                    propzyNotifyAlert({type: "propzy-notify-success", message : 'Thành công!'});
                    dispatch(removeListingToList(data.rlistingIds[0]));
                } else {
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Có lỗi xảy ra không thể xóa listing ra khỏi bộ sưu tập'});
                }

            })
            .catch(error => {
                hidePropzyLoading();
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Có lỗi xảy ra không thể xóa listing ra khỏi bộ sưu tập'});
                throw(error);
            });
    };
};

export const fetchBookTourPermissionThunk = (data = {}) => {
    return (dispatch) => {
        showPropzyLoading();
        return axios.post(_API_PAGE.GET_BOOK_TOUR_PERMISSION, data)
            .then(xhr => {
                hidePropzyLoading();
                if (xhr.data) {
                    const response = xhr.data.data;
                    dispatch(getBookTourPermission(response));
                }

            })
            .catch(error => {
                hidePropzyLoading();
                throw(error);
            });
    };
};