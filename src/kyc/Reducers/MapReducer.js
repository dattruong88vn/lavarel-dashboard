
const defaultState = {
    isOpen: false,
    listingId:null,
    collection:{
        isCollection:false,
        listingId:[]
    },
    listingDetail:null,
    compareListing: {
        infoListings:null,
        listingSelect:[]
    },
    dataPostSeachListing : {
        stepOne:null,
        stepTwo:null
    }
};

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case "MAP_OPEN_INFO_WINDOW":
            return {...state,
                isOpen:true,
                listingId:action.listingId
            };
        case "MAP_FETCH_LISTING_DETAIL":
            return {...state,
                listingDetail:action.listingDetail
            }
        case "SET_COMPARE_LISTING":
            return {...state,
                compareListing : action.compareListing}
        case "MAP_COLLECTION":
            return {...state,
                collection:action.collection
            }
        case "MAP_SET_DATA_POST_SEARCH_LISTING":
            let _state = {...state};
            _state.dataPostSeachListing[action.step] = action.dataPost;
            
            return _state;
        default:
            return state;
    }
}