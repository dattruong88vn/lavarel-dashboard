import * as types from '../actions/actionTypes';
import {PaginationFilter} from '../../commonComponents/pagination/Pagination';

const defaultState = {
    crawlerData: [],
    idsSelected: [],
    activeTab: '1',
    totalItems: null,
    totalPages: null,
    pagination: new PaginationFilter(),
    loading: false,
    isNotification: false,
    notification: {
        type: 'success',
        message: ''
    }
};

const CrawlerDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_CRAWLER_DATA:
            const {list, totalPages, totalItems} = action.data;
            return {...state, crawlerData: list, totalPages: totalPages, totalItems: totalItems};
        case types.CHANGE_TAB:
            return {...state, activeTab: action.data};
        case types.CHANGE_PAGINATION:
            return {...state, pagination: {...state.pagination, page: action.data}};
        case types.CHANGE_LOADING:
            return {...state, loading: action.data};
        case types.ON_ID_SELECTED_DATA:
            return {...state, idsSelected: action.data.map(i => i)};  
        case types.SHOW_NOTIFICATION:
            state.notification = action.notification ? action.notification : {...defaultState.notification};
            return {...state, isNotification: action.boolean};     
        default:
            return state;
    }
};

export default CrawlerDataReducer;