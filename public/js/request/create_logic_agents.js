var CreateLogicAgent = (function () {

    var validateOptions = {
        ignore: null,
        rules: {
            "sourceId": {required: true},
            "subjectId": {required: true},
            "listingTypeId": {required: true},
            "districtIds[]": {required: true},
            "preferDistrict": {required: true},
            "propertyTypeId": {required: true},
            "initialBudget": {required: true},
            "finalBudget": {required: true},
            "initialBudgetFixed": {required: true},
            "minSize": {required: true, validateNumber: true},
            "maxSize": {validateNumber: true},
            "position[positionId]": {required: true}
        },
        messages: {
            "sourceId": {required: "Chọn nguồn"},
            "subjectId": {required: "Chọn đối tượng"},
            "listingTypeId": {required: "Chọn hinh thức giao dịch"},
            "districtIds[]": {required: "Chọn quận"},
            "preferDistrict": {required: "Chọn quận yêu thích"},
            "propertyTypeId": {required: "Chọn loại bất động sản"},
            "initialBudget": {required: 'Nhập ngân sách min'},
            "finalBudget": {required: 'Nhập ngân sách max'},
            "initialBudgetFixed": {required: 'Nhập ngân sách khách đang có'},
            "minSize": {required: 'Nhập diện tích min'},
            "position[positionId]": {required: 'Chọn vị trí'}
        }
    }; 

    return {
        validateOptions : validateOptions,
    };
})();