$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    $('#price').mask("#,##0", {reverse: true});
    $('#minPrice').mask("#,##0", {reverse: true});
    get_property_type();
    $('#listingTypeId').change(function (event) {
        get_property_type();
    });
    $("#btnCreateListing").on("click", function (event) {
        event.preventDefault();
        var postData = preparePostData();
        if (!validateData(postData)) {
            showPropzyAlert("Dữ liệu không hợp lệ.");
            return false;
        }
        //console.log(postData);
        //return false;
        showPropzyLoading();
        $.ajax({
            "url": "/diy/create-listing",
            "type": "post",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message ? response.message : "Tháo tác thành công!");
            if (response.result) {
                window.location = "/diy";
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $("#btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = preparePostData();
        if (!validateData(postData)) {
            showPropzyAlert("Dữ liệu không hợp lệ.");
            return false;
        }
        //console.log(postData);
        //return false;
        showPropzyLoading();
        $.ajax({
            "url": "/diy/save",
            "type": "post",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message ? response.message : "Tháo tác thành công!");
            if (response.result) {
                window.location.reload();
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    /*
     Address with google
     */
    $("#address").geocomplete().bind("geocode:result", function (event, result) {
        console.log(result);
        $('#latitude').val(result.geometry.location.lat());
        $('#longitude').val(result.geometry.location.lng());
    });
    if (sourceType == 2 || listingItem.isSend) {
        $("#email").prop("disabled", true);
    }

    getDistricts([1]);
    if (districtId) {
        getWards(districtId);
    }
    if (wardId) {
        getStreets(wardId);
    }
    $("#districtId").change(function (event) {
        var id = $(this).val();
        getWards(id);
    });
    $("#wardId").change(function (event) {
        var id = $(this).val();
        getStreets(id);
    });
});


function get_property_type() {
    var listingTypeId = $('#listingTypeId').val();
    var url_property_type = "/property_type/list/" + listingTypeId;

    get_sync(url_property_type, true, function (data) {
        var html = "<option value=''>Chọn một</option>";
        var includeId = [
            1, 2, 7, 8, 11, 13
        ];
        $.each(data, function (index, value) {
            if ($.inArray(value.propertyTypeID, includeId) == -1) {
                return;
            }
            html += '<option value="' + value.propertyTypeID + '" ' + (value.propertyTypeID == listingItem.propertyTypeId ? "selected" : "") + '>' + value.typeName + '</option>';
        });
        $('#propertyTypeId').html(html);
    });
}

function preparePostData() {
    var listingData = {
        "fromId": listingItem.id,
        "sourceType": sourceType,
        "address": null,
        "shortAddress": null,
        "bathRooms": null,
        "bedRooms": null,
        "description": null,
        "vat": null,
        "isVAT": true,
        "redBookPhoto": "",
        "lotSize": null,
        "floorSize": null,
        "numberOfFloorsBuilding": null,
        "mainPhoto": null,
        "mainDrawingPhoto": null,
        "photo": null,
        "source": 14,
        "isHotListing": false,
        "photos": null,
        "videos": null,
        "sizeLength": null,
        "sizeWidth": null,
        "price": null,
        "minPrice": null,
        "currency": "VND",
        "deposit": null,
        "depositText": null,
        "title": null,
        "noteForAgent": null,
        "propertyPosition": null,
        "alley": null,
        "commissionText": null,
        "houseNumber": $("#houseNumber").val(),
        "city": {
            "cityId": 1
        },
        "direction": null,
        "district": null,
        "ward": null,
        "moveInDate": null,
        "minContractDeadline": null,
        isGuaranteed: $("#isGuaranteed").prop("checked"),
        "listing": {
            "listingId": null,
            "address": null,
            "shortAddress": null,
            "isDeleted": false,
            "latitude": 0,
            "listingTypeName": null,
            "longitude": 0,
            "cityId": 1,
            "districtId": null,
            "numberFloor": null,
            "numberRelated": 0,
            "numberRelatedSold": 0,
            "isMezzanine": false,
            "isRooftop": false,
            "isPenhouse": false,
            "propertyTypeName": null,
            "purposeName": null,
            "title": null,
            "photos": null,
            "listingType": null,
            "propertyType": null,
            "purpose": null
        },
        "useRightType": null,
        "socialCommunications": [],
        "rlMoveInDate": null,
        "block": null
    };

    listingData.address = $("#houseNumber").val() + ", " + $("#streetId option:selected").html() + ", Phường " + $("#wardId option:selected").html() + ", " + $("#districtId option:selected").html() + ", " + $("#cityId option:selected").html();
    listingData.listing.address = listingData.address;
    listingData.alley = $("#alley").val();
    listingData.lotSize = $("#lotSize").val();
    listingData.sizeLength = $("#sizeLength").val();
    listingData.sizeWidth = $("#sizeWidth").val();
    listingData.floorSize = $("#floorSize").val();
    listingData.listing.numberFloor = $("#numberFloor").val();
    listingData.numberOfFloorsBuilding = $("#numberOfFloorsBuilding").val();
    listingData.bedRooms = $("#bedRooms").val();
    listingData.bathRooms = $("#bathRooms").val();
    var useRightType = $("#useRightType").val();
    if (useRightType.trim() != "") {
        listingData.useRightType = {
            "useRightTypeId": useRightType
        };
    }

    var moveInDate = moment($("#moveInDate").val(), "DD/MM/YYYY");
    if (moveInDate.isValid()) {
        listingData.moveInDate = moveInDate.unix() * 1000;
    }

    var socialCommunication = {
        "id": {
            "socialUid": -1
        },
        "email": $("#email").val(),
        "name": $("#name").val(),
        "address": listingData.address,
        "phone": $("#phone").val(),
        "isDeleted": false
    };

    listingData.socialCommunications.push(socialCommunication);
    listingData.listing.longitude = $("#longitude").val();
    listingData.listing.latitude = $("#latitude").val();
    listingData.listing.listingType = {
        listingTypeID: $("#listingTypeId").val()
    };
    listingData.listing.propertyType = {
        propertyTypeID: $("#propertyTypeId").val()
    };
    if ($("#districtId").val() != "") {
        listingData.district = {
            "districtId": $("#districtId").val()
        };
        listingData.listing.districtId = listingData.district.districtId;
    }
    if ($("#wardId").val() != "") {
        listingData.ward = {
            "wardId": $("#wardId").val()
        };
        listingData.listing.wardId = listingData.ward.wardId;
    }
    if ($("#streetId").val() != "") {
        listingData.street = {
            "streetId": $("#streetId").val()
        };
        //listingData.listing.streetId = listingData.street.streetId;
    }

    listingData.isVAT = ($("#isVAT").val() == 1);
    listingData.commissionText = $("#commissionText").val();
    listingData.description = $("#description").val();
    listingData.price = $("#price").val();
    listingData.price = listingData.price.replace(/,/g, '');
    listingData.minPrice = $("#minPrice").val();
    listingData.minPrice = listingData.minPrice.replace(/,/g, '');
    listingData.depositText = $("#depositText").val();
    listingData.minContractDeadline = $("#minContractDeadline").val();

    for (var x in listingData) {
        if (listingData[x] === "") {
            listingData[x] = null;
        }
    }
    for (var x in listingData.listing) {
        if (listingData[x] === "") {
            listingData[x] = null;
        }
    }
    listingData.mainPhoto = [];
    listingData.photo = [];
    if (listingItem.diyListings != null) {
        for (var i = 0; i < listingItem.diyListings.length; i++) {
            var diy = listingItem.diyListings[i];
            for (var j = 0; j < diy.photoList.length; j++) {
                var photo = diy.photoList[j];
                console.log(photo);
                var arrLink = photo.link.split("/");
                var photoName = arrLink[arrLink.length - 1];
                var mainPhoto = {
                    isPrivate: false,
                    url_path: uploadUrl,
                    url_thumb: uploadUrl + "thumbnail_for_similar/" + photoName,
                    url_large: uploadUrl + "thumbnail_for_gridview/" + photoName,
                    file_id: null,
                    caption: diy.categoryName
                };
                listingData.photo.push(photo);
                listingData.mainPhoto.push(mainPhoto);
            }
        }
    }
    listingData.mainPhoto = JSON.stringify(listingData.mainPhoto);
    listingData.photo = JSON.stringify(listingData.photo);

    return listingData;

}

function validateData(data) {
    $(".errors").html("");
    var isValid = true;
    if (data.address === undefined || data.address == null) {
        $("#address").parent().find(".errors").html("Nhập địa chỉ");
        isValid = false;
    }
    if (data.price === undefined || data.price == null) {
        $("#price").parent().find(".errors").html("Nhập giá");
        isValid = false;
    }
    if (data.commissionText === undefined || data.commissionText == null) {
        $("#commissionText").parent().find(".errors").html("Nhập hoa hồng");
        isValid = false;
    }

    if ($("#propertyTypeId").val() == undefined || $("#propertyTypeId").val() == "") {
        $("#propertyTypeId").parent().find(".errors").html("Chọn loại hình");
        isValid = false
    }
    if ($("#listingTypeId").val() == undefined || $("#listingTypeId").val() == "") {
        $("#listingTypeId").parent().find(".errors").html("Chọn loại hình BĐS");
        isValid = false
    }

    if (data.district == null) {
        $("#districtId").parent().find(".errors").html("Chọn quận");
        isValid = false;
    }
    if (data.ward == null) {
        $("#wardId").parent().find(".errors").html("Chọn phường");
        isValid = false;
    }
    if (data.street == null) {
        $("#streetId").parent().find(".errors").html("Chọn đường");
        isValid = false;
    }
    console.log(data);
    return isValid;
}

$(".btnSaveOwner").on("click", function () {
    var postData = {
        "email": $("#email").val(),
        "name": $("#name").val(),
        "phone": $("#phone").val(),
        "sourceType": sourceType,
        "note": $("#note").val(),
        "id": listingItem.id
    };

    showPropzyLoading();
    $.ajax({
        "url": "/diy/update-owner",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message ? response.message : "Tháo tác thành công!");
    }).always(function () {
        hidePropzyLoading();
    });

});

function getDistricts(cityIds) {
    var postData = {
        "regionIdsList": null,
        "cityIdsList": cityIds
    }
    showPropzyLoading();
    $.ajax({
        url: "/zone/get-districts-by-cities",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        //console.log(response);
        var html = "<option value=''>Chọn quận</option>";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<option value='" + item.districtId + "' " + (item.districtId == districtId ? "selected" : "") + " >" + item.districtName + "</option>";
        }
        $("#districtId").html(html);
    }).always(function () {
        hidePropzyLoading();
    });
}


function getWards(districtId) {
    showPropzyLoading();
    $.ajax({
        url: "/common/get-ward/" + districtId,
        type: "get"
    }).done(function (response) {
        //console.log(response);
        var html = "<option value=''>Chọn phường</option>";
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            html += "<option value='" + item.wardId + "' " + (item.wardId == wardId ? "selected" : "") + " >" + item.wardName + "</option>";
        }
        $("#wardId").html(html);
    }).always(function () {
        hidePropzyLoading();
    });
}

function getStreets(wardId) {
    showPropzyLoading();
    $.ajax({
        url: "/zone/get-streets/" + wardId,
        type: "get"
    }).done(function (response) {
        //console.log(response);
        var html = "<option value=''>Chọn đường</option>";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<option value='" + item.streetId + "' " + (item.streetId == streetId ? "selected" : "") + " >" + item.streetName + "</option>";
        }
        $("#streetId").html(html);
    }).always(function () {
        hidePropzyLoading();
    });
}