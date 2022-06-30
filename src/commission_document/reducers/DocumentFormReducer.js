import * as types from '../actions/actionTypes';

const defaultState = {
    document: {
        id: null,
        fileName: null,
        listingTypeIds: null,
        expectedDate: new Date().getTime(),
        statusId: null,
        files: []
    },
    documentTypes: [],
    message: {
        isShowed: false,
        type: null,
        content: null
    },
    validation: {
        fileName: {
            isShowed: false,
            value: false 
        },
        listingTypeIds: {
            isShowed: false,
            value: true 
        },
        files: {
            isShowed: false,
            value: false 
        },
        statusId: {
            isShowed: false,
            value: false 
        }
    },
    passedValidation: false,
    redirecting: null
};

const DocumentFormReducer = (state = defaultState, action) => {
    let document = {...state.document, files: [...state.document.files]},
        documentTypes = [...state.documentTypes],
        message = {...state.message},
        validation = {...state.validation, 
                        fileName: {...state.validation.fileName},
                        listingTypeIds: {...state.validation.listingTypeIds},
                        files: {...state.validation.files},
                        statusId: {...state.validation.statusId}
                    },
        passedValidation = state.passedValidation,
        passed;
    switch (action.type) {
        case types.SET_DETAIL_FORM:
            action.data.listingTypeIds.split(',').forEach(id => {
                documentTypes.find(type => type.id == id).checked = true;
            });
            Object.keys(validation).forEach(val => {
                validation[val].value = true;
            });
            return {...state, document: action.data, documentTypes, validation};
        case types.SET_TYPE_LIST:
            if(action.id) {
                documentTypes = action.data.map(type => ({...type, checked: false}));
            } else {
                documentTypes = action.data.map(type => ({...type, checked: true}));
                document.listingTypeIds = documentTypes.map(type => type.id).join();
            }
            return {...state, document, documentTypes};   
        case types.CHANGE_INPUT_FORM:
            document.fileName = action.event.target.value;
            validation.fileName = document.fileName ? {isShowed: false, value: true} : {isShowed: true, value: false};
            return {...state, document, validation};
        case types.CHANGE_CHECKBOX_FORM:
            documentTypes.find(type => type.id == action.event.target.value).checked = action.event.target.checked;
            document.listingTypeIds = documentTypes.filter(type => type.checked).map(type => type.id).join();
            validation.listingTypeIds = document.listingTypeIds ? {isShowed: false, value: true} : {isShowed: true, value: false};
            return {...state, document, documentTypes, validation};
        case types.CHANGE_FILE_FORM:
            const indexOfChar = action.data.file_name.lastIndexOf('/');
            const originalFileName = action.data.file_name.slice(indexOfChar + 1);
            let fileType = originalFileName.split('.').pop();
            if(fileType === 'doc' || fileType === 'docx') {
                fileType = 'word';
            } else if(fileType === 'xls' || fileType === 'xlsx') {
                fileType = 'excel';
            }
            document.files.push({
                link: action.data.link,
                type: fileType,
                name: originalFileName 
            });
            validation.files = document.files.length > 0 ? {isShowed: false, value: true} : {isShowed: true, value: false};
            return {...state, document, validation};
        case types.CHANGE_DATE_FORM:
            document.expectedDate = new Date(action.event.target.value).getTime();
            return {...state, document};    
        case types.CHANGE_SELECT_FORM:
            document.statusId = parseInt(action.data.value);
            validation.statusId = document.statusId ? {isShowed: false, value: true} : {isShowed: true, value: false};
            return {...state, document, validation};     
        case types.DELETE_FILE_FORM:
            document.files.splice(action.data, 1);
            validation.files = document.files.length > 0 ? {isShowed: false, value: true} : {isShowed: true, value: false};
            return {...state, document, validation};
        case types.CHECK_ALL_VALIDATION:
            Object.keys(validation).forEach(val => {
                if(!validation[val].value) {
                    validation[val].isShowed = true;
                }
            });
            passed = Object.keys(validation).find(val => !validation[val].value) ? false : true;
            if(!passed) {
                message = {
                    isShowed: true,
                    type: false,
                    content: 'Xin vui lòng nhập đầy đủ thông tin'
                };
            }
            return {...state, validation, passedValidation: passed, message};
        case types.SHOW_MESSAGE:
            passedValidation = false;
            message = {
                isShowed: true,
                type: action.result,
                content: action.mess
            }
            return {...state, message, passedValidation};    
        case types.CLEAR_FORM:
            return {...defaultState};    
        case types.REDIRECT:
            return {...state, redirecting: action.url};   
        default:
            return state;
    }
};

export default DocumentFormReducer;