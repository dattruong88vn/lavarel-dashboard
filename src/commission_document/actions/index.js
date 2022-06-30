import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';

export const apiGetDocumentList = params => dispatch => {
    return callApi('/commission-document/get-document-list', 'POST', params).then(res => {
        dispatch(actSetDocumentList(res.data.data));
    });
};

export const apiGetTypeList = id => dispatch => {
    return callApi('/commission-document/get-type-list', 'GET', {}).then(res => {
        dispatch(actSetTypeList(res.data.data, id));
        if(id) {
            dispatch(apiGetDetailDocument(id));
        }
    });
};

export const apiGetDetailDocument = id => dispatch => {
    return callApi(`/commission-document/get-detail-document/${id}`, 'GET', {}).then(res => {
        dispatch(actSetDetailForm(res.data.data));
    });
};

export const apiUploadFile = event => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    return (dispatch) => {
        return callApi('/document/api/upload', 'POST', formData).then(res => {
            dispatch(actChangeFileForm(res.data.data));
        });
    };
};

export const apiAddDocument = data => dispatch => {
    return callApi('/commission-document/add-document', 'POST', data).then(res => {
        dispatch(actShowMessage(res.data.result, res.data.message));
    });
};

export const apiUpdateDocument = data => dispatch => {
    return callApi('/commission-document/update-document', 'POST', data).then(res => {
        dispatch(actShowMessage(res.data.result, res.data.message));
    });
};

export const actSetDocumentList = data => {
    return {
        type: types.SET_DOCUMENT_LIST,
        data
    };
};

export const actSetTypeList = (data, id) => {
    return {
        type: types.SET_TYPE_LIST,
        data,
        id
    };
};

export const actSetDetailForm = data => {
    return {
        type: types.SET_DETAIL_FORM,
        data
    }
};

export const actChangeInputForm = event => {
    return {
        type: types.CHANGE_INPUT_FORM,
        event
    };
};

export const actChangeCheckBoxForm = event => {
    return {
        type: types.CHANGE_CHECKBOX_FORM,
        event
    };
};

export const actChangeFileForm = data => {
    return {
        type: types.CHANGE_FILE_FORM,
        data
    };
};

export const actDeleteFileForm = data => {
    return {
        type: types.DELETE_FILE_FORM,
        data
    };
};

export const actChangeDateForm = event => {
    return {
        type: types.CHANGE_DATE_FORM,
        event
    };
};

export const actChangeSelectForm = data => {
    return {
        type: types.CHANGE_SELECT_FORM,
        data
    };
};

export const actClearForm = () => {
    return {
        type: types.CLEAR_FORM
    }
};

export const actShowMessage = (result, mess) => {
    return {
        type: types.SHOW_MESSAGE,
        result,
        mess
    };
};

export const actRedirect = url => {
    return {
        type: types.REDIRECT,
        url
    };
};

export const actChangePagination = page => {
    return {
        type: types.CHANGE_PAGINATION,
        page
    }
};

export const actCheckAllValidation = () => {
    return {
        type: types.CHECK_ALL_VALIDATION
    }
};




