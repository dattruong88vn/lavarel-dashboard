import {
    KYC_BUYER_EXPERIENCE_SET_BUY_EXPERIENCE,
    KYC_BUYER_EXPERIENCE_SET_RENT_EXPERIENCE,
    KYC_BUYER_EXPERIENCE_GET_CONTENT_BUY_EXPERIENCE,
    KYC_BUYER_EXPERIENCE_GET_CONTENT_RENT_EXPERIENCE
} from  './../Actions/BuyerExperienceActions';

const defaultState = {
    buy : {
        isExperience : false,
        yesExperience: {
            list : [],
            selected : []
        },
        noExperience : {
            selected : []
        }
    },
    rent : {
        isExperience : false,
        yesExperience: {
            list : [],
            selected : []
        },
        noExperience : {
            selected : []
        }
    }
};

export default function reducer(state = defaultState, action) {
    switch(action.type) {
        case KYC_BUYER_EXPERIENCE_SET_BUY_EXPERIENCE : {
            return {...state, buy: {...state.buy, isExperience: action.payload}};
        }
        case KYC_BUYER_EXPERIENCE_SET_RENT_EXPERIENCE : {
            return {...state, rent: {...state.rent, isExperience: action.payload}};
        }
        case KYC_BUYER_EXPERIENCE_GET_CONTENT_BUY_EXPERIENCE : {
            const listYesExperience = action.payload.find(it => it.id == 1251);
            const isExperience = listYesExperience ? listYesExperience.checked : false;
            return {...state, buy: {
                    ...state.buy, yesExperience: {
                        ...state.rent.yesExperience , list: listYesExperience ? listYesExperience.childs : []
                    },
                    isExperience : isExperience
                }
            };
        }
        case KYC_BUYER_EXPERIENCE_GET_CONTENT_RENT_EXPERIENCE : {
            const listYesExperience = action.payload.find(it => it.id == 1301);
            const isExperience = listYesExperience ? listYesExperience.checked : false;
            return {...state, rent: {
                    ...state.rent, yesExperience : {
                        ...state.rent.yesExperience , list : listYesExperience ? listYesExperience.childs : []
                    },
                    isExperience : isExperience
                }
            };
        }
        default:
            return state;
    }
};