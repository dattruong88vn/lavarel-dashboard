$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

var listingList = [];
var isSaveSearchListing = true;
$("#formFindListings").hide();
$("#page-requests").hide();
$(".buttons .btn").on("click", function (event) {
    $(".buttons .btn").removeClass("active");
    $(this).addClass("active");
});
$("#btnNewStatusCheck").on("click", function (event) {
    event.preventDefault();
    isSaveSearchListing = true;
    $(".btnSaveSearchListing").show();
    $("#page-new").show();
    $("#page-requests").hide();
});
$("#btnStatusCheckRequests").on("click", function (event) {
    event.preventDefault();
    isSaveSearchListing = false;
    $(".btnSaveSearchListing").hide();
    $("#page-new").hide();
    $("#page-requests").show();
    setUpAgentRequestsDataTable();
});
$(".btnSearchAgent").on("click", function (event) {
    event.preventDefault();
    var phone = $("#searchPhone").val();
    if (!phone) {
        showPropzyAlert("Nhập số điện thoại.");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: "/agent/is-existed?phone=" + phone,
        type: "get"
    }).done(function (response) {
        if (response.data.isExisted) {
            $("#formFindListings").show();
        } else {
            var phone = $("#searchPhone").val();
            $("#modalCreateAgent .phone").val(phone);
            $("#modalCreateAgent").modal();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

$(".btnSaveNewAgent").on("click", function (event) {
    event.preventDefault();
    var formId = "#formCreateAgent";
    if (!validateCreateAgent(formId)) {
        return false;
    }
    var postData = {
        "name": $(formId + " .name").val(),
        "phone": $(formId + " .phone").val()
    };
    showPropzyLoading();
    $.ajax({
        url: "/agent/quick-create",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            $("#formFindListings").show();
            $("#modalCreateAgent").modal("hide");
            $("#searchPhone").val(postData.phone);
        } else {
            alert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

function validateCreateAgent(formId) {
    var isValid = true;
    var name = $(formId + " .name").val();
    if (name == null || name == "") {
        $(formId + " .name").parents("tr").find(".errors").html("Nhập tên");
        console.log($(formId + " .name").parents("tr").find("errors"));
        isValid = false;
    }
    var phone = $(formId + " .phone").val();
    if (phone == null || phone == "") {
        $(formId + " .phone").parents("tr").find(".errors").html("Nhập số điện thoại");
        isValid = false;
    }
    return isValid;
}
$(".btnSearchListing").on("click", function (event) {
    event.preventDefault();
    var formId = "#formFindListings";
    var term = $(formId + " #term").val();
    if (!term) {
        showPropzyAlert("Nhập thông tin cần tìm");
        $(formId + " #term").focus();
        return false;
    }
    var postData = {
        "term": term
    };
    showPropzyLoading();
    listingList = null;
    $.ajax({
        url: "/listing/get-list-from-agent",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            setUpItemsDataTable(response.data);
            listingList = response.data;
        }
    }).always(function () {
        hidePropzyLoading();
    });
});



var itemsDataTable = null;
var setUpItemsDataTable = function (dataSet) {
    if (itemsDataTable) {
        itemsDataTable.destroy();
    }
    itemsDataTable = $("#items").DataTable({
        "data": dataSet,
        "searching": false,
        "processing": true,
        "columns": [
            {data: "rlistingId", render: imageRender},
            {data: "rlistingId"},
            {data: "bedRooms", render: sizeRender},
            {data: "formatPrice"},
            {data: "address"},
            {data: "isAvailable", render: isAvalableRender}
        ]
    });
    return itemsDataTable;
};

var agentRequestsDataTable = null;
var setUpAgentRequestsDataTable = function () {
    if (agentRequestsDataTable) {
        agentRequestsDataTable.destroy();
    }
    agentRequestsDataTable = $("#agentRequests").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/listing/agent-search-listing",
        "scrollX": true,
        "ordering": false,
        "lengthChange": false,
        "searching": false,
        "columns": [
            {data: "searchId"},
            {data: 'agentName', render: agentNameRender},
            {data: 'nubmerOfListings'},
            {data: 'createdDate', render: dateRender},
            {data: 'note', render: agentSearchNoteRender}
        ]
    });
};


var agentSearchNoteRender = function (data, type, object) {
    if (!data) {
        data = "";
    }
    data = "<input style='width:100%' type='text' onblur=\"return updateAgentSearchNote(this, " + object.searchId + ");\" value='" + data + "' />";
    return data;
};
function updateAgentSearchNote(selector, searchId) {
    var note = $(selector).val();
    /*
     if (note.trim() === "") {
     return false;
     }
     */
    var postData = {
        "note": note,
        "searchId": searchId
    };
    showPropzyLoading();
    $.ajax({
        url: "/listing/update-note-for-agent-search",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}

var agentNameRender = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='#' onclick=\"return agentNameClicked('" + object.rlistingIds + "');\">" + data + "</a>";
    return data;
};

var agentNameClicked = function (rlistingIds) {
    rlistingIds = JSON.parse(rlistingIds);
    var postData = {
        "term": rlistingIds + ""
    };
    showPropzyLoading();
    listingList = null;
    $.ajax({
        url: "/listing/get-list-from-agent",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            setUpItemsDataTable(response.data);
            listingList = response.data;
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}


var imageRender = function (data, type, object) {
    if (!object.photo) {
        return "";
    }
    data = "<img src='" + object.photo.link + "' style='width:48px;' />";
    return data;
};

var sizeRender = function (data, type, object) {
    data = object.floorSize!==null?object.floorSize:"_ ";
    data += "(" + (object.bedRooms!==null?object.bedRooms:"_");
    data += " / " + (object.bathRooms!==null?object.bathRooms:"_") + ")";
    return data;
};

var isAvalableRender = function (data, type, object) {
    var isHidden = "";
    data = "";
    if (object.isAvailable) {
        data += "<input type='checkbox' onclick=\"return checkIsAvalable(this, " + object.rlistingId + ")\" value='" + object.rlistingId + "' />";
        isHidden = "hidden";
    }
    console.log(object.isAvailable);
    data += "<span class='" + isHidden + "'>";
    if (object.listingTypeId == 1 || object.listingTypeId == 3) {
        data += "Đã bán";
    } else if (object.listingTypeId == 2 || object.listingTypeId == 4) {
        data += "Đã thuê";
    }
    data += "</span>";
    return data;
};
function checkIsAvalable(selector, rlistingId) {
    var isChecked = $(selector).prop("checked");
    var postData = {
        "rlistingId": parseInt(rlistingId),
        "isAvailable": !isChecked
    };
    showPropzyLoading();
    $.ajax({
        "url": "/listing/set-available",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (!response.result) {
            showPropzyAlert(response.message);
            return false;
        } else {
            $(selector).parents("td").find("span.hidden").removeClass("hidden");
            $(selector).remove();
            if (isSaveSearchListing) {
                $(".btnSearchListing").click();
            }
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return true;
}

$(".btnSaveSearchListing").on("click", function (event) {
    event.preventDefault();
    var rlistingIds = [];
    if (listingList) {
        for (var i = 0; i < listingList.length; i++) {
            var item = listingList[i];
            rlistingIds.push(item.rlistingId);
        }
        var postData = {
            "phone": $("#searchPhone").val(),
            "rlistingIds": rlistingIds
        };
        showPropzyLoading();
        $.ajax({
            "url": "/listing/save-search-listing",
            "type": "post",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    }
});

$(".btnCreateLeadFromListing").on("click", function (event) {
    event.preventDefault();
    var rlistingIds = [];
    var currentSelector = $(this);
    if (listingList) {
        for (var i = 0; i < listingList.length; i++) {
            var item = listingList[i];
            if (!item.isAvailable) {
                continue;
            }
            rlistingIds.push(item.rlistingId);
        }
        var postData = {
            "phone": $("#searchPhone").val(),
            "rlistingIds": rlistingIds
        };
        showPropzyLoading();
        $.ajax({
            "url": "/listing/create-lead-from-available",
            "type": "post",
            "data": JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                currentSelector.prop("disabled", true);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
});