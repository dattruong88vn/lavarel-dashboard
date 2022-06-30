import {combineReducers} from 'redux';
import {mortgageReducer as jack} from './../../mortgage/reducers/index';
let initState = {
    info: {rlistingId: null, id: null, identifyId: null},
    listingCart: [],
    files: [],
    initLoadFiles: true,
    indexFiles: {}
};
let _STORED_LOCAL = {
    defaultValue: {value: '', label: "--- Vui lòng chọn ---"}
};
export const mortgageReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_INFO_MORTGAGE":
            return {...state, info: action.payload}
        case "SET_FILES":
            return {...state, files: action.files}
        case "SET_INDEX_FILES":
            return {...state, indexFiles: action.indexObj}
        case "INIT_LOAD_FILES":
            return {...state, initLoadFiles: action.status}
        case "FETCH_LISTING_CART":
            let options = action.payload.map(function (item, index) {
                return {value: item.rlistingId, label: item.rlistingId}
            })
            options.unshift(_STORED_LOCAL.defaultValue);
            // let _optionsFinal = _STORED_LOCAL.defaultValue.concat(options);
            return {...state, listingCart: options}
        case "SET_LISTING_INFO":
            // return Object.assign({}, {...state.info}, {
            // 	rlistingId : action.listingId,
            // });
            let _infoListing = Object.assign({}, {...state.info});
            _infoListing.rlistingId = action.listingId;
            return {...state, info: _infoListing};
        case "SET_FIELD":
            let _info = Object.assign({}, {...state.info});
            _info[action.name] = action.value;
            return {...state, info: _info};
        case "UPDATE_COLLATERAL":
            let _infoColl = Object.assign({}, {...state.info});
            _infoColl.collateral = action.item;
            return {...state, info: _infoColl};
        case "ADD_LISTING_INFO": {
            let list = Object.assign({}, {...state.info});
            let profiles = list.profiles.filter(function (item) {
                return item.typeId == 1115;
            });
            profiles[0].childs.push(action.data);
            return {...state, info: list};
        }
        case "DELETE_LISTING_INFO": {
            let list = Object.assign({}, {...state.info});
            let profiles = list.profiles.filter(function (item) {
                return item.typeId == 1115;
            });
            let indexData = profiles[0].childs.findIndex(obj => (obj.docId == null && obj.key === action.data.key) || (obj.docId != null && obj.docId === action.data.docId));
            if (profiles[0].childs.length > 1) {
                profiles[0].childs.splice(indexData, 1);
            } else {
                showPropzyAlert("Cần có ít nhất 1 nguồn thu nhập");
            }
            return {...state, info: list};
        }
        case 'REMOVE_PHOTO_IN_PROFILE': {
            let parents = action.parents;
            let images = action.data;
            let list = Object.assign({}, {...state.info});
            if (list.profiles && list.profiles.length > 0) {
                list.profiles.forEach((pro, indexProfile) => {
                    if (pro.typeId == parents.profileTypeId && pro.childs && pro.childs.length > 0) {
                        pro.childs.forEach((child, indexChild) => {
                            if (child.typeId == parents.childTypeId && child.profileInfos && child.profileInfos.length > 0) {
                                child.profileInfos.forEach((proInfo, indexProInfo) => {
                                    if (proInfo.typeId == parents.profileInfoTypeId) {
                                        list.profiles[indexProfile].childs[indexChild].profileInfos[indexProInfo].photoGcns = images;
                                    }
                                })
                            }
                        })
                    }
                })
            }
            return {...state, info: list};
        }
        default:
            return state;
    }
}

export default combineReducers({mortgageReducer, jack})