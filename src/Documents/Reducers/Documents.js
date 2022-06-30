const defaultState = {
    documents: [],
    tableDocuments: null
}

export default function Documents(state = defaultState, action){
    switch(action.type){
        case "SET_TABLE_INSTANCE": {
            let newState = Object.assign({}, state, {tableDocuments: action.data.tableDocuments});
            return newState;
        }
        case 'FETCH_DOCUMENTS': {
            state.tableDocuments.ajax.reload(null, false);
            return state;
        }
        case 'SET_DOCUMENTS' :{
            let newState = Object.assign({}, state, {documents: action.data});
            return newState;
        }
        case 'DELETE_DOCUMENT':{

            break;
        }
        default:
            return state;
    }
}