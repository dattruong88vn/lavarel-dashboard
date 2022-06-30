import * as types from '../actions/actionTypes';

const defaultState = {
    isShowModal: {
        modalTransfer: false,
        modalCancel: false,
        modalDuplicate: false,
        modalMove: false
    }
};

const CrawlerModalReducer = (state = defaultState, action) => {
    switch (action.type) {                  
        case types.SHOW_MODAL:
            state.isShowModal[action.field] = action.boolean;
            return {...state, isShowModal: {...state.isShowModal}};                   
        default:
            return state;
    }
};

export default CrawlerModalReducer;