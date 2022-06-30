import {KYC_HEADER_STEP_GET_INFO_DEAL} from "../Actions/HeaderStepActions";

const defaultState = {
    customerHomeKyc : {
        "customerId": "KM27189",
        "customerName": "Lead 0987290808",
        "leadId": 31286,
        "tmName": "Liêm test",
        "listingTypeId": 1,
        "listingTypeName": "Mua",
        "createdDate": 1567078565000
    },
    dealId : 0,
    scoreCardType: 0,
    scoreCardTypeName: '',
    kycHomeResult : {
        kycHomeChannelTypes: [
            {
                "channelTypeId": 1,
                "channelTypeName": "Kinh nghiệm mua nhà",
                "isDone": false
            },
            {
                "channelTypeId": 2,
                "channelTypeName": "Xác nhận nhu cầu",
                "isDone": true
            },
            {
                "channelTypeId": 3,
                "channelTypeName": "Tư vấn nhu cầu mua",
                "isDone": true
            },
            {
                "channelTypeId": 4,
                "channelTypeName": "Mortgage",
                "isDone": false
            },
            {
                "channelTypeId": 5,
                "channelTypeName": "Quy trình/Thủ tục/Chi phí",
                "isDone": false
            },
            {
                "channelTypeId": 6,
                "channelTypeName": "Phản hồi/Mở rộng/Giới thiệu",
                "isDone": false
            }
        ],
        "score": 0
    },
    customerEvaluate: {}
};

export default function reducer(state = defaultState, action) {
    switch(action.type){
        case KYC_HEADER_STEP_GET_INFO_DEAL : 
            const { customerHomeKyc, dealId, scoreCardType, scoreCardTypeName, kycHomeResult, customerEvaluate } = action.payload;
            return {...state,
                customerHomeKyc : customerHomeKyc ? customerHomeKyc : {},
                dealId : dealId ? dealId : {},
                scoreCardType: scoreCardType ? scoreCardType : 0,
                scoreCardTypeName: scoreCardTypeName ? scoreCardTypeName : '',
                kycHomeResult : kycHomeResult ? kycHomeResult : {kycHomeChannelTypes : [], score : 0},
                customerEvaluate: customerEvaluate ? customerEvaluate : {}
            };
        default:
            return state;
    }
}