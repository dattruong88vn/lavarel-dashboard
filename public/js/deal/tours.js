$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });

    loadDataTables();

    $("#dataTableTours .csName").on("blur", function (event) {
        var csName = $("#dataTableTours .csName").val();
        loadDataTablesTour("/deal/lated-started-tours-data?keySearch=" + csName);
    });

    $("#dataTableLateTours .csName").on("blur", function (event) {
        var csName = $("#dataTableLateTours .csName").val();
        loadDataTablesLateTours("/deal/lated-tours-data?keySearch=" + csName);
    });

    $("#dataTableCancelTours .csName").on("blur", function (event) {
        var csName = $("#dataTableCancelTours .csName").val();
        loadDataTablesCancelTours("/deal/get-cancel-tours-data?keySearch=" + csName);
    });

    $("#dataTableEndTours .csName").on("blur", function (event) {
        var csName = $("#dataTableEndTours .csName").val();
        loadDataTablesEndTours("/deal/get-end-tours-data?keySearch=" + csName);
    });

    $("#dataTableWrongLocationTours .csName").on("blur", function (event) {
        var csName = $("#dataTableWrongLocationTours .csName").val();
        loadDataTableWrongLocationTours("/deal/get-incorrect-location?keySearch=" + csName);
    });

    $(".btnSavePing").on("click", function (event) {
        event.preventDefault();
        var theForm = $("#formPingManager");
        var scheduleId = theForm.find(".scheduleId").val();
        var note = theForm.find(".note").val();
        var postData = {
            scheduleId: scheduleId,
            note: note
        };
        showPropzyLoading();
        $.ajax({
            url: "/deal/ping-manager",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                dataTableTours.ajax.reload();
                $("#modalPingManager").modal("hide");
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    // Report ~ Tour có thể trễ
    $('#exportTours').on("click", function() {
        var csName = $("#dataTableTours .csName").val();
        $.get("/deal/get-report/lated-start-for-tour?keySearch=" + csName, function(response, status) {
            window.location.href = response.data.linkFile;
        });
    });
    // Report ~ Tour đang đi có thể trễ
    $('#exportLateTours').on("click", function() {
        var csName = $("#dataTableLateTours .csName").val();
        $.get("/deal/get-report/lated?keySearch=" + csName, function(response, status) {
            window.location.href = response.data.linkFile;
        });
    });
    // Report ~ Hủy tour
    $('#exportCancelTours').on("click", function() {
        var csName = $("#dataTableCancelTours .csName").val();
        $.get("/deal/get-report/cancel?keySearch=" + csName, function(response, status) {
            window.location.href = response.data.linkFile;
        });
    });
    // Report ~ Sai vị trí
    $('#exportWrongLocationTours').on("click", function() {
        var csName = $("#dataTableWrongLocationTours .csName").val();
        $.get("/deal/get-report/incorrect-location?keySearch=" + csName, function(response, status) {
            window.location.href = response.data.linkFile;
        });
    });
});

function loadDataTables() {
    loadDataTablesTour("/deal/lated-started-tours-data");
    loadDataTablesLateTours("/deal/lated-tours-data");
    loadDataTablesCancelTours("/deal/get-cancel-tours-data");
    loadDataTableWrongLocationTours("/deal/get-incorrect-location");
    loadDataTablesGoingTours("/deal/get-going-tours-data");
    loadDataTablesEndTours("/deal/get-end-tours-data");
}

var dataTableTours = null;
function loadDataTablesTour(url) {
    try {
        dataTableTours.destroy();
    } catch (Ex) {
    }

    dataTableTours = $('#dataTableTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "customerNamewPhone", render: renderLinkCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
            {data: "tourTime", render: renderTourTime},
            {data: "ownerNamewPhone", render: renderOwnerNamewPhone},
            {data: "isResolved", render: renderTourResolved},
        ]
    });
}

var dataTableLateTours = null;
function loadDataTablesLateTours(url) {
    try {
        dataTableLateTours.destroy();
    } catch (Ex) {
    }

    dataTableLateTours = $('#dataTableLateTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "customerNamewPhone", render: renderLinkCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
            {data: "fromIdToId", render: renderfromIdToId},
            {data: "ownerNamewPhone", render: renderOwnerNamewPhone},
            {data: "scheduleTime", render: renderScheduleTime},
            {data: "isResolved", render: renderLateTourResolved},
        ]
    });
}

var dataTableCancelTours = null;
function loadDataTablesCancelTours(url) {
    try {
        dataTableCancelTours.destroy();
    } catch (Ex) {
    }

    dataTableCancelTours = $('#dataTableCancelTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "customerNamewPhone", render: renderLinkCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
            {data: "cancelTime", render: renderCancelTime},
            {data: "isResolved", render: renderCancelTourResolved},
        ]
    });
}

var dataTableWrongLocationTours = null;
function loadDataTableWrongLocationTours(url) {
    try {
        dataTableWrongLocationTours.destroy();
    } catch (Ex) {
    }

    dataTableWrongLocationTours = $('#dataTableWrongLocationTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "customerNamewPhone", render: renderLinkCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
            {data: "address", render: renderAddress},
            {data: "formatDistance", render: renderFormatDistance},
            {data: "isResolved", render: renderLocationTours},
        ]
    });
}

var dataTableGoingTours = null;
function loadDataTablesGoingTours(url) {
    try {
        dataTableGoingTours.destroy();
    } catch (Ex) {
    }

    dataTableGoingTours = $('#dataTableGoingTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "customerNamewPhone", render: renderLinkCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
            {data: "tourTime", render: renderCancelTime},
        ]
    });
}

var dataTableEndTours = null;
function loadDataTablesEndTours(url) {
    try {
        dataTableEndTours.destroy();
    } catch (Ex) {
    }

    dataTableEndTours = $('#dataTableEndTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "finishedDate", render: renderFinishedDate},
            {data: "customerNamewPhone", render: renderCustomerNamewPhone},
            {data: "csNamewPhone", render: renderCsNamewPhone},
        ]
    });
}

var dataTableDetailEndTours = null;
function loadDataTablesDetailEndTours(url) {
    try {
        dataTableDetailEndTours.destroy();
    } catch (Ex) {
    }

    dataTableDetailEndTours = $('#dataTableDetailEndTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "addressListing", render: renderAddressListing},
            {data: "percentValue", render: renderPercentValue},
        ]
    });
}

var renderSelect = function (data, type, object) {
    if (object.isPing) {
        return "<input type='radio' checked disabled />";
    }
    return "<input type='radio' onclick='return pingManager(this, " + data + ");' name='select-schedule' value='" + data + "' />";
};
var renderLateAbilityTouring = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "";
    returnValue = "Đang đi từ listing " + object.lateAbilityTouring.fromListing + " đến listing " + object.lateAbilityTouring.toListing;
    return returnValue;
};
var renderLateTouring = function (data, type, object) {
    if (data === null) {
        return "";
    }
    var returnValue = "";
    return returnValue;
};
var renderFlaggedTouring = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "<ul>";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        returnValue += "<li>Listing: " + item.rlistingId + " " + item.reasonName + "</li>";
    }
    returnValue += "</ul>";
    return returnValue;
};
var renderTouring = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "";
    returnValue = data.districtName;
    return returnValue;

};
var renderEndedTouring = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "";
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        returnValue += "<li>Listing " + item.rlistingId + " - " + (item.isDismiss ? item.status : item.score) + "</li>";
    }
    return returnValue;

};
var renderCustomerNamewPhone = function (data, type, object) {
    return (object.customerName ? object.customerName : "") + " - " + (object.customerPhone ? object.customerPhone : "");
}
var renderLinkCustomerNamewPhone = function (data, type, object) {
    var customerNamenPhone = (object.customerName ? object.customerName : "") + " - " + (object.customerPhone ? object.customerPhone : "");
    return "<a href='/deal/tour/" + object.dealId + "' target='_blank'>" + customerNamenPhone + "</a>";
}
var renderCsNamewPhone = function (data, type, object) {
    return (object.csName ? object.csName : "") + " - " + (object.csPhone ? object.csPhone : "");
}
var renderTourTime = function (data, type, object) {
    var schedule = moment(object.scheduleTime);
    var late = ((object.startedTime - object.scheduleTime)/60)/1000;

    if (late > 0) {
        return schedule.format("HH:mm") + convertMinuteToHour(late);
    }
    return schedule.format("HH:mm");
}
var renderOwnerNamewPhone = function (data, type, object) {
    return (object.ownerName ? object.ownerName : "") + " - " + (object.ownerPhone ? object.ownerPhone : "");
}
var renderTourResolved = function (data, type, object) {
    var checked = "";
    if (object.isSolved == true) {
        checked = "checked";
    }
    return "<input type='checkbox' onclick='return resolvedTour(" + object.id + ")' " + checked + " />";
}
var renderfromIdToId = function (data, type, object) {
    if (!object.fromId && !object.toId) {
        return "";
    }
    var fromId = (object.fromId == -1) ? "Propzy" : object.fromId;
    var result = fromId + " &rarr; " + object.toId;
    var late = ((object.arrivedTime - object.scheduleTime)/60)/1000;

    if (late > 0) {
        result += convertMinuteToHour(late);
    }
    return result;
}
var renderLateTourResolved = function (data, type, object) {
    var checked = "";
    if (object.isSolved == true) {
        checked = "checked";
    }
    return "<input type='checkbox' onclick='return resolvedLateTour(" + object.id + ")' " + checked + " />";
}
var renderScheduleTime = function (data, type, object) {
    var scheduleTime = moment(object.scheduleTime).format("HH:mm");
    return scheduleTime;
}
var renderCancelTime = function (data, type, object) {
    return object.numberOfListings + "/" + object.totalOfListings;
}
var renderCancelTourResolved = function (data, type, object) {
    var checked = "";
    if (object.isSolved == true) {
        checked = "checked";
    }
    return "<input type='checkbox' onclick='return resolvedCancelTour(" + object.id + ")' " + checked + " />";
}
var renderFinishedDate = function (data, type, object) {
    if (!object.finishedDate) {
        return "";
    }
    return "<a href='#' onclick='return displayEndTourModal(" + object.scheduleId + ")'>" + moment(object.finishedDate).format("HH:mm") + "</a>";
}
var renderAddressListing = function (data, type, object) {
    if (!object.address) {
        return "";
    }
    return object.address;
}
var renderPercentValue = function (data, type, object) {
    if (!object.percentValue && !object.reasonName) {
        return "N/A";
    }
    var returnValue = "<a href='#' onclick=\"return showListingFeedBack(" + object.scheduleId + "," + object.rlistingId + ");\">";
    if (!object.percentValue) {
        returnValue += object.reasonName;
    } else {
        returnValue += object.percentValue + "%";
    }
    returnValue += "</a>";
    return returnValue;
}
var renderAddress = function(data, type, object) {
    if (!object.address) {
        return "";
    }
    return object.address;
}
var renderFormatDistance = function(data, type, object) {
    if (!object.formatDistance) {
        return "";
    }
    return "Cách " + object.formatDistance + " từ địa chỉ tin đăng";
}
var renderLocationTours = function (data, type, object) {
    var checked = "";
    if (object.isSolved == true) {
        checked = "checked";
    }
    return "<input type='checkbox' onclick='return resolvedLocationTour(" + object.id + ")' " + checked + " />";
}

function pingManager(selector, itemId) {
    showPropzyLoading();
    $.ajax({
        url: "/deal/schedule-ping/" + itemId,
        type: "get"
    }).done(function (response) {
        console.log(response);
        var item = response.data;
        $(selector).prop('checked', true);
        var theForm = $("#formPingManager");
        theForm.find(".scheduleId").val(itemId);
        theForm.find(".deal-id").html(item.dealId);
        theForm.find(".customer-name").html(item.customerName);
        theForm.find(".customer-phone").html(item.customerPhone);
        theForm.find(".customer-email").html(item.customerEmail);
        theForm.find(".cs-name").html(item.agentName);
        theForm.find(".cs-phone").html(item.agentPhone);
        var tableBody = "";
        if (item.list) {
            for (var i = 0; i < item.list.length; i++) {
                var listing = item.list[i];
                tableBody += "<tr><td><a href='/listing/" + listing.rlistingId + "' target='_blank'>" + listing.rlistingId + "</a></td><td>" + listing.address + "</td><td>" + moment(listing.scheduleTime).format("HH:mm MM/DD/YYYY") + "</td></tr>";
            }
        }
        console.log(tableBody);
        theForm.find(".listing tbody").html(tableBody);
        $("#modalPingManager").modal({
            backdrop: 'static',
            keyboard: false
        });
    }).always(function () {
        hidePropzyLoading();
    });
}

function resolvedTour(id) {
    var postData = {"id": id};

    showPropzyLoading();
    $.ajax({
        url: "/deal/solved-tour",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            dataTableTours.ajax.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function resolvedLateTour(id) {
    var postData = {"id": id};

    showPropzyLoading();
    $.ajax({
        url: "/deal/solved-tour",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            dataTableLateTours.ajax.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function resolvedCancelTour(id) {
    var postData = {"id": id};

    showPropzyLoading();
    $.ajax({
        url: "/deal/solved-tour",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            dataTableCancelTours.ajax.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function resolvedLocationTour(id) {
    var postData = {"id": id};

    showPropzyLoading();
    $.ajax({
        url: "/deal/solved-tour",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            dataTableWrongLocationTours.ajax.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function displayEndTourModal(id) {
    loadDataTablesDetailEndTours("/deal/get-detail-end-tours-data/" + id);
    $("#makeFeedbackListingModal").modal({
        backdrop: 'static',
        keyboard: false
    });
    return false;
}

$(".btnCancelSchedule").on('click', function (event) {
    event.preventDefault();
    $("#makeFeedbackListingModal").modal('hide');
});