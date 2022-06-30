import {KYC_PRODUCT_ADVICE_GET_LIST_RELATED_LISTING,
    KYC_PRODUCT_ADVICE_GET_DETAIL_RELATED_LISTING,
    KYC_PRODUCT_ADVICE_CHANGE_INDEX_LISTING,
    KYC_PRODUCT_ADVICE_CHANGE_FEEDBACK,
    KYC_PRODUCT_REMOVE_LISTING,
    KYC_PRODUCT_ADD_LISTING_TOUR,
    KYC_PRODUCT_REMOVE_LISTING_TOUR,
    KYC_PRODUCT_ADVICE_GET_REASON_DENY_TOUR,
    KYC_PRODUCT_ADVICE_BOOK_TOUR_PERMISSION
} from "../Actions/ProductAdviceActions";

const defaultState = {
    rListings : [],
    feedbackListingId : null,
    currentListing : null,
    detailListing : {},
    listingsTour : [],
    reasonDenyTour: [],
    bookTourPermission: null,
};

export default function reducer(state = defaultState, action) {

    switch(action.type) {
        case KYC_PRODUCT_ADVICE_GET_LIST_RELATED_LISTING : {
            let currentListing = null;
            if (action.payload.listings.length > 0) {
                currentListing = action.payload.listings[0].rlistingId;
            }
            return {...state,
                rListings: action.payload.listings,
                feedbackListingId :  action.payload.feedbackListingId,
                currentListing : currentListing
            };
        }
        case KYC_PRODUCT_ADVICE_GET_DETAIL_RELATED_LISTING : {
            return {...state, detailListing: action.payload};
        }
        case KYC_PRODUCT_ADVICE_GET_REASON_DENY_TOUR : {
            return {...state, reasonDenyTour: action.payload};
        }
        case KYC_PRODUCT_ADVICE_CHANGE_INDEX_LISTING : {
            return {...state, currentListing: action.payload};
        }
        case KYC_PRODUCT_ADVICE_CHANGE_FEEDBACK : {
            return {...state, feedbackListingId: action.payload};
        }
        case KYC_PRODUCT_REMOVE_LISTING : {
            if (action.payload != undefined) {
                const rlisting = action.payload;
                const newList = state.listingsTour.map(it => rlisting);
                const newListing = [];
                state.rListings.forEach(it => {
                    if (it.rlistingId != rlisting) {
                        newListing.push(it);
                    }
                });
                let currentListing = newListing.length > 0 ? newListing[0].rlistingId : null;
                let detailListing = newListing.length > 0 ? newListing[0] : {};
                return {...state,
                    rListings : newListing,
                    currentListing :currentListing,
                    detailListing : detailListing,
                    listingsTour : newList
                };
            }
            return  {...state};
        }
        case KYC_PRODUCT_ADD_LISTING_TOUR : {
            if (action.payload != undefined) {
                const rlisting = action.payload;
                const listRemove = state.listingsTour.filter(it => it != rlisting);
                const newList = [...listRemove, rlisting];
                return {...state, listingsTour: newList};
            }
            return {...state};
        }
        case KYC_PRODUCT_REMOVE_LISTING_TOUR : {
            if (action.payload != undefined) {
                const rlisting = action.payload;
                const newList = state.listingsTour.filter(it => it != rlisting);
                return {...state, listingsTour: newList};
            }
            return {...state};
        }
        case KYC_PRODUCT_ADVICE_BOOK_TOUR_PERMISSION : {
            return {...state, bookTourPermission: action.payload};
        }
        default:
            return state;
    }
}