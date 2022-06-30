
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$(function () {
    $("#table-agent").DataTable({
        "lengthChange": false,
        //"scrollY": "200",
        "processing": true,
        "serverSide": true,
        "ajax": "/agent-manager/contact-sent-to-am-data",
        "columns": [
            {"data": "amName"},
            {"data": "agentName"},
            {"data": "phone"},
            {"data": "districtNamesList"},
            {"data": "listingTypeNamesList"},
            {"data": "note"},
            {"data": "accountName", render: renderAccountName},
            {"data": "senderDate", render: renderDate},
            {"data": "verifiedDate", render: renderDate},
            {"data": "comment", render: renderComment}
        ]
    });
});
var renderDate = function (data, type, object) {
    if (!data) {
        return "";
    }
    return moment(data).format("DD/MM/YYYY HH:mm:ss");
};
var renderAccountName = function (data, type, object) {
    if (!data) {
        return "";
    }
    if (object.agentId === null) {
        data = "<a href='#' onclick=\"return createAgent('" + object.agentName + "', '" + object.phone + "', '" + object.email + "','" + object.amId + "')\">" + data + "</a>";
    }else{
        data = "<a href='/agent-manager/detail/"+object.agentId+"' >" + data + "</a>";        
    }
    return data;
};
var renderComment = function (data, type, object) {
    if (!data) {
        data = "";
    }
    data = "<input type='text' onblur=\"return updateComment(this, '" + object.contactId + "','" + object.contactType + "');\" value='" + data + "' />";
    return data;
}

function updateComment(item, contactId, contactType) {
    var content = $(item).val().trim();
    var postData = {
        "contactId": contactId,
        "contactType": contactType,
        "content": content !== "" ? content : null
    };
    //showPropzyLoading();
    $.ajax({
        "url": "/agent-manager/update-contact-comment",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (!response.result) {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        //hidePropzyLoading();
    });
}

function createAgent(name, phone, email, userId) {
    var postData = {
        "name": name,
        "phone": (phone && phone!=='null') ? phone : null,
        "email": (email && email!=='null') ? email : null,
        "userId": parseInt(userId)
    };
    showPropzyLoading();
    var isRedirect = false;
    $.ajax({
        "url": "/agent-manager/quick-create-agent",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            isRedirect = true;
            window.location = "/agent-manager/detail/" + response.data.agentId
        }
    }).always(function () {
        if (!isRedirect) {
            hidePropzyLoading();
        }
    });
}

function loadDistrict() {
    var postData = {
        "regionIdsList": null,
        "cityIdsList": [1]
    };
    $.ajax({
        "url": "/zone/get-districts-by-cities",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                html += "<option value='" + item.districtId + "'>" + item.districtName + "</option>";
            }
        }
        $("#districts").html(html).select2();
    }).always(function () {

    });
}
function loadPropertyTypes(listingTypesIds) {
    var listingTypeId = "";
    if (null === listingTypesIds || 0 === listingTypesIds.length) {
        $("#propertyTypes").html("");
        return;
    } else if (listingTypesIds.length === 1) {
        listingTypeId = listingTypesIds[0];
    }
    showPropzyLoading();
    $.ajax({
        "url": "/common/get-property-type/" + listingTypeId,
        "type": "get"
    }).done(function (response) {
        html = "";
        if (response) {
            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                html += "<option value=" + item.propertyTypeID + ">" + item.typeName + "</option>";
            }
        }
        $("#propertyTypes").html(html).select2();
    }).always(function () {
        hidePropzyLoading();
    });
}
$(".btnShowSendToAmModal").on("click", function () {
    loadDistrict();
    $("#listingTypes").select2();
    $("#propertyTypes").select2();
    $("#listingTypes").change(function () {
        var listingTypeIds = $(this).val();
        loadPropertyTypes(listingTypeIds);
    });
    $.ajax({
        "url": "/agent-manager/get-am-list",
        "type": "get"
    }).done(function (response) {
        var html = "<option value=''>Chọn agent manager</option>";
        console.log(response);
        if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
                html += "<option value=" + response.data[i].userId + ">" + response.data[i].name + "</option>"
            }
        }
        $("#amId").html(html).select2();
    }).always(function () {

    });
    $("#modalSendToAm").modal();
});
$(".btnSendToAm").on("click", function () {
    var isValidated = true;
    $(".errors").html("");
    $(".required").each(function () {
        if ($(this).val() === null || ($(this).val() + "").trim() === "") {
            $(this).parent().find(".errors").html("Vui lòng nhập");
            isValidated = false;
        }
    });
    if (!validatePhone($("#phone").val())) {
        $("#phone").parent().find(".errors").html("Số điện thoại không hợp lệ");
        isValidated = false;
    }
    if (isValidated === false) {
        return false;
    }
    var name = $("#name").val();
    var phone = $("#phone").val();
    var amId = $("#amId").val();
    var note = $(".note").val();
    var districtList = [];
    $("#districts option:selected").each(function () {
        districtList.push({
            "districtId": $(this).attr("value"),
            "districtName": $(this).text()
        });
    });
    var listingTypesList = [];
    $("#listingTypes option:selected").each(function () {
        listingTypesList.push({
            "listingTypeID": $(this).attr("value"),
            "typeName": $(this).text()
        });
    });
    var propertyTypesList = [];
    $("#propertyTypes option:selected").each(function () {
        propertyTypesList.push({
            "propertyTypeID": $(this).attr("value"),
            "typeName": $(this).text()
        });
    });
    var postData = {
        "name": name,
        "phone": phone,
        "socialUid": null,
        "districtsList": districtList,
        "amId": amId,
        "note": note,
        "propertyTypesList": propertyTypesList,
        "listingTypesList": listingTypesList, //
        "agentSettings": null
    };


    showPropzyLoading();
    //delete sendToAmData.listingTypesList;
    $.ajax({
        "url": "/agent-manager/send-contact-to-am",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});