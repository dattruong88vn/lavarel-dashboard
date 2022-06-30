const defaultState = {
    selectedItem: null,
    dataPost: {
        "id": null,
        "name": 'abc',
        "description": '',
        "files": []
    },
    action: "CREATE" // CREATE | UPDATE
}

export default function Documents(state = defaultState, action){
    switch(action.type){
        case "SELECT_DOCUMENT": {
            let newState = Object.assign({}, state, {
                selectedItem: action.data,
                action: "UPDATE",
                dataPost: Object.assign({}, state.dataPost, action.data )
            });
            console.log(newState);
            return newState;
        }
        case "SET_DATAPOST" : {
            let newState = {...state,dataPost:action.dataPost};
            console.log('jljk', newState);
            return newState;
        }
        default:
            return state;
    }
}