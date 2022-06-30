import * as types from '../actions/actionTypes';

const defaultState = {
    selectOptions: {
        siteOptions: [{value: '', label: '--Chọn trang Crawler--'}],
        listingTypeOptions: [{value: '', label: '--Chọn loại giao dịch--'}],
        propertyOptions: [{value: '', label: '--Chọn loại BĐS--'}],
        statusOptions: [{value: '', label: '--Chọn trạng thái--'}],
        districtOptions: [{value: '', label: '--Chọn Quận--'}],
        wardOptions: [{value: '', label: '--Chọn Phường--'}],
        streetOptions: [{value: '', label: '--Chọn Đường--'}],
        duplicateOptions: [{value: '', label: '--Chọn danh sách trùng--'}],
        legalOptions: [{value: '', label: '--Chọn danh sách pháp lý--'}],
        imageOptions: [{value: '', label: '--Chọn danh sách có hình--'}],
        reasonOptions: [{value: '', label: '--Chọn lý do hủy-'}],
        tabOptions: []
    },
    dataFields: {
        dateFrom: {value: ''},
        dateTo: {value: ''},
        priceFrom: {value: ''},
        priceTo: {value: ''},
        phones: {value: ''},
        address: {value: ''},
        email: {value: ''},
        siteId: {value: '', label: '--Chọn trang Crawler--'},
        listingTypeId: {value: '', label: '--Chọn loại giao dịch--'},
        propertyTypeId: {value: '', label: '--Chọn loại BĐS--'},
        statusId: {value: '1', label: 'Mới'},
        districtId: {value: '', label: '--Chọn Quận--'},
        wardId: {value: '', label: '--Chọn Phường--'},
        streetId: {value: '', label: '--Chọn Đường--'},
        isDuplicate: {value: '0', label: 'Không trùng'},
        legal: {value: '1', label: 'Đã xác định'},
        images: {value: '1', label: 'Có hình'},
        reasonId: {value: '', label: '--Chọn lý do hủy-'}
    },
    dataPost: {
        sort: {
            columnName: "createdDate",
            value: "desc"
        },
        filter: []
    }
};

const convertArray = (array, type) => {
    switch (type) {
        case 'siteOptions':
            return array.map(i => ({value: i.id, label: i.name}));
        case 'propertyOptions':
            return array.map(i => ({value: i.propertyTypeId, label: i.prefixName, isDisabled: !i.active}));
        case 'districtOptions':
            return array.map(i => ({value: i.districtId, label: i.districtName}));
        case 'wardOptions':
        case 'modalWardOptions':
            return array.map(i => ({value: i.wardId, label: i.wardName}));
        case 'streetOptions':
        case 'modalStreetOptions':
            return array.map(i => ({value: i.streetId, label: i.streetName}));
        case 'tabOptions':
            return array.map(i => ({value: i.item, label: i.value}));
        default:
            return array.map(i => ({value: i.item, label: i.value}));                                 
    }
};

const CrawlerFilterReducer = (state = defaultState, action) => {
    let selectOptions = {...state.selectOptions},
        dataFields = {...state.dataFields};
    switch (action.type) {
        case types.SET_DATA_POST: 
            if(action.callback) {
                action.callback({...state, dataPost: {...state.dataPost, filter: action.filter}});
            }
            return {...state, dataPost: {...state.dataPost, filter: action.filter}};
        case types.SET_OPTION_LIST:
            const options = [...defaultState.selectOptions[action.field]];
            action.data = convertArray(action.data, action.field);
            options.push(...action.data);
            selectOptions[action.field] = options;
            return {...state, selectOptions};
        case types.CHANGE_SELECT:
            dataFields[action.name] = action.data;
            return {...state, dataFields};
        case types.CHANGE_INPUT:
            dataFields[action.data.name] = {value: action.data.value};
            return {...state, dataFields};
        case types.RESET_SELECT:
            dataFields[action.fieldValue] = {...defaultState.dataFields[action.fieldValue]};
            if (action.fieldOptions) {
                selectOptions[action.fieldOptions] = [...defaultState.selectOptions[action.fieldOptions]];
            }
            return {...state, selectOptions, dataFields};
        case types.RESET_FILTER_FORM:
            return {...state, dataFields: {...defaultState.dataFields}};
        case types.SET_SORTING:
            if (action.callback) {
                action.callback({...state, dataPost: {...state.dataPost, sort: action.data}});
            }
            return {...state, dataPost: {...state.dataPost, sort: action.data}};
        default:
            return state;
    }
};

export default CrawlerFilterReducer;