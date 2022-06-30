var BASE_URL = "";

if (location.hostname === "test.dashboard.propzy.vn" || location.hostname === "localhost") {
    var root_url_path_img = "http://test.cdn.propzy.vn/media_test/";
    var url_path_video = "http://test.cdn.propzy.vn/media_test/video/";
}else if (location.hostname === "develop.dashboard.propzy.vn" || location.hostname === "localhost") {
    var root_url_path_img = "http://develop.cdn.propzy.vn/media_test/";
    var url_path_video = "http://develop.cdn.propzy.vn/media_test/video/";
} else {
    var root_url_path_img = "http://cdn.propzy.vn/";
    var url_path_video = "http://cdn.propzy.vn/video/";
}

var url_thumb = root_url_path_img + "thumbnail_for_similar/";
var url_large = root_url_path_img + "thumbnail_for_gridview/";
var url_path_img = root_url_path_img + "images/ ";
var url_path_use_right_type_img = root_url_path_img + "use_right_type/ ";


var isBuilding = true;
var moveInDate;
var buildingObject;
var blockObject;
var blocksObject;
var agents;
var building = {
    nameBuilding: "",
    blockBuilding: 0,
    block: [],
    infoManager: "",
    nameManager: "",
    emailManager: "",
    phoneManager: "",
    telephoneManager: ""
}

var blockBuiding = {
    blockId: 1,
    nameBlock: "",
    floorBlock: 0,
    basementBlock: 0,
    yearBuiltBlock: 0,
    elevatorBlock: 0,
    yearFixBlock: 0,
    motobikeBlock: 0,
    carBlock: 0,
    cleaningFeeBlock: "",
    utilitiesBuildingBlocks: [],
    utilitiesBuildingBlock: "",
    descriptionBlock: "",
}

var listingObjectBuilding = {
    "sizeWidth": 0,
    "sizeLength": 0,
    "deposit": 2,
    "moveInDate": moveInDate,
    "allowChange": true,
    "bathRooms": 1.5,
    "bedRooms": 2,
    "description": "",
    "floors": 2,
    "floorSize": 100,
    "minPrice": 0,
    "noteForMinPrice": "",
    "lotSize": 1000,
    "smallSize": 32354.5,
    "price": 2344545,
    "currency": "",
    "title": "",
    "yearBuilt": 2014,
    "mainPhoto": [],
    "photo": [],
    "mainVideo": [],
    "video": [],
    "source": 9,
    "unit": "ABC1080",
    "linkOfListing": "",
    "modelCode": "",
    "floorsTo": null,
    "totalHomeForm": null,
    "numberAvailable": null,
    "requestId": null,
    "transactionId": null,
    "isPrivate": true,
    "isAvailable": true,
    "reasonId": null,
    "solutionId": null,
    "useRightType": {
        "useRightTypeId": 1
    },
    "numberOfFloorsBuilding": null,
    "minContractDeadline": null,
    "commissionText": null,
    "depositText":null,
    "alley": null,
    "listing": {
        "listingId": 2,
        "title": "",
        "latitude": 10.79997,
        "longitude": 106.718483,
        "address": "",
        "shortAddress": "",
        "listingType": {
            "listingTypeID": 2
        },
        "project": {
            "pId": 1
        },
        "propertyType": {
            "propertyTypeID": 4
        },
        "purpose": {
            "purPoseID": 2
        },
        "listingTypeName": "",
        "purposeName": "",
        "propertyTypeName": "",
        "yearBuilt": 2013,
        "yearFixed": 2014,
        "numberBasement": 1, //(=null khi không có dữ liệu)
        "numberElevator": 1, //(=null khi không có dữ liệu)
        "numberFloor": 1, //(=null khi không có dữ liệu)
        "cityId": 1,
        "districtId": 14,
        "wardId": 1,
        "isMezzanine": false,
        "isRooftop": false,
        "isPenhouse": false
    },
    "city": {
        "cityId": 1
    },
    "direction": {
        "dId": 1
    },
    "district": {
        "districtId": 14
    },
    "ward": {
        "wardId": 3
    },
    "socialUser": {
        "socialUid": ""
    },
    "account": {
        "accountId": ""
    },
    "amenitiesOtherList": [],
    "amenitiesList": [
        {
            "id": {
                "amenityId": 1
            },
            "amenityName": ""
        },
        {
            "id": {
                "amenityId": 2
            },
            "amenityName": ""
        }
    ],
    "relatedListingFees": [
        {
            "id": {
                "feesTypeId": 1
            },
            "feesName": "",
            "price": 232.3,
            "currency": "USD"
        },
        {
            "id": {
                "feesTypeId": 2
            },
            "feesName": "test2",
            "price": 232.3,
            "currency": "VND"
        }
    ],
    "relatedListingMetaTags": [
        {
            "metaName": "title",
            "metaContent": "",
            "metaContentEn": "",
        },
        {
            "metaName": "description",
            "metaContent": "",
            "metaContentEn": ""
        },
        {
            "metaName": "keywords",
            "metaContent": "",
            "metaContentEn": ""
        }
    ],
    "commissionList": [
    ],
    "socialCommunications": [
        {
            "id": {
                "socialUid": -1
            },
            "email": "",
            "name": "",
            "address": "",
            "phone": ""
        }
    ],
    "commissionFrom": null,
    "commissionTo": null,
    "commissionPrice": null,
    "rlLanguages": []
}

var listingObjectNotBuilding = {
    "sizeWidth": 320,
    "sizeLength": 12,
    "deposit": 2,
    "moveInDate": moveInDate,
    "allowChange": true,
    "bathRooms": 1.5,
    "bedRooms": 2,
    "description": "",
    "floors": null,
    "floorSize": null,
    "lotSize": 1000,
    "smallSize": 32354.5,
    "price": 2344545,
    "minPrice": 0,
    "noteForMinPrice": "",
    "currency": "vnd",
    "title": "",
    "yearBuilt": 2014,
    "mainPhoto": [],
    "photo": [],
    "mainVideo": [],
    "video": [],
    "source": 9,
    "unit": "ABC1080",
    "linkOfListing": "",
    "modelCode": "",
    "floorsTo": null,
    "totalHomeForm": null,
    "numberAvailable": null,
    "requestId": null,
    "transactionId": null,
    "isPrivate": true,
    "isAvailable": true,
    "reasonId": null,
    "solutionId": null,
    "depositText":null,
    "useRightType": {
        "useRightTypeId": 1
    },
    "numberOfFloorsBuilding": null,
    "minContractDeadline": null,
    "commissionText": null,
    "alley": null,
    "listing": {
        "listingId": 2,
        "title": "",
        "latitude": 10.79997,
        "longitude": 106.718483,
        "address": "",
        "shortAddress": "",
        "listingType": {
            "listingTypeID": 2
        },
        "project": {
            "pId": 1
        },
        "propertyType": {
            "propertyTypeID": 2
        },
        "purpose": {
            "purPoseID": 1
        },
        "listingTypeName": "",
        "purposeName": "",
        "propertyTypeName": "",
        "yearBuilt": 2013,
        "yearFixed": 2014,
        "cityId": 1,
        "districtId": 14,
        "wardId": 1,
        "numberFloor": 1,
        "isMezzanine": false,
        "isRooftop": false,
        "isPenhouse": false,
    },
    "direction": {
        "dId": 1
    },
    "city": {
        "cityId": 1
    },
    "district": {
        "districtId": 14
    },
    "ward": {
        "wardId": 3
    },
    "socialUser": {
        "socialUid": ""
    },
    "account": {
        "accountId": ""
    },
    "amenitiesOtherList": null,
    "amenitiesList": [],
    "relatedListingFees": [],
    "relatedListingMetaTags": [
        {
            "metaName": "title",
            "metaContent": "",
            "metaContentEn": ""
        },
        {
            "metaName": "description",
            "metaContent": "",
            "metaContentEn": ""
        },
        {
            "metaName": "keywords",
            "metaContent": "",
            "metaContentEn": ""
        }
    ],
    "commissionList": [
    ],
    "socialCommunications": [
        {
            "id": {
                "socialUid": -1
            },
            "email": "",
            "name": "",
            "phone": ""
        }
    ],
    "commissionFrom": null,
    "commissionTo": null,
    "commissionPrice": null,
    "rlLanguages": [],
}

var socialAgent = {
    "id": {
        "socialUid": ""
    },
    "email": "",
    "name": "",
    "phone": "",
    "address": "",
    "agentType": {
        "agentTypeId": 1
    }
}
var rlMoveInDate = {
    "moveInNow": false,
    "afterSigningContract": false,
    "moveInDate": null,
    "afterNumberDays": null,
};

