var DealFunctionsMatrix = (function () {

    const wrapBlock = ".modal-expand-matrix";
    
    function initSelectListingTypes() {
        $(`${wrapBlock} #listingTypeId`).change(function () {
            var listingTypeId = $(this).val();
            getPropertyTypes(listingTypeId);
        });
    }


    function getCardTypes() {
        var html = "<option value=''>--Tất cả nhãn--</option>";
        $(`${wrapBlock} #scoreCardType`).html(html).select2();
        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/get-card-type',
            type: 'get'
        }).done(function (response) {
            if (response.result) {
                for (i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<option value='" + item.code + "'>" + item.name + "</option>";
                }
                $(`${wrapBlock} #scoreCardType`).html(html);
                $(`${wrapBlock} #scoreCardType`).val($(`${wrapBlock} #btnChangeCardType`).attr("data-card-type"));
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }


    function getPropertyTypes(listingTypeId) {
        var html = "<option value=''>N/A</option>";
        if (!listingTypeId) {
            $(`${wrapBlock} #propertyTypeId`).html(html).select2();
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: '/common/get-property-type/' + listingTypeId,
            type: 'get'
        }).done(function (response) {
            for (i = 0; i < response.length; i++) {
                var item = response[i];
                html += "<option value='" + item.propertyTypeID + "'>" + item.typeName + "</option>";
            }
            $(`${wrapBlock} #propertyTypeId`).html(html);

        }).always(function () {
            hidePropzyLoading();
        });
    }


    function init(){
        initSelectListingTypes();
        getCardTypes();
    }


    return {
        "init":init
    };
})();