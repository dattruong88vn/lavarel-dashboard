import * as types from '../actions/actionTypes';
import { PaginationFilter } from '../../commonComponents/pagination/Pagination';

const defaultState = {
    documents : [],
    totalPages: 0,
    filter: {
        pagination: new PaginationFilter()
    }
};

const DocumentListReducer = (state = defaultState, action) => {
    switch(action.type) {
        case types.SET_DOCUMENT_LIST:
            return {...state, documents: action.data.list, totalPages: action.data.totalPages};
        case types.CHANGE_PAGINATION:
            const filter = {...state.filter};
            filter.pagination.page = action.page;
            return {...state, filter};     
        default:
            return state;    
    }
};

export default DocumentListReducer;

