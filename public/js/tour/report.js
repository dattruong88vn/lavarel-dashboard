$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
var dataTables = {};
var globalVars = {
    fromDate: null,
    toDate: null
};
$(document).ready(function () {
    getCategories(0, moment().unix() * 1000);
    $(".fromDate").datepicker({
        autoclose: true
    }).on("changeDate", function () {
        $(".toDate").datepicker("setStartDate", $(".fromDate").val());
        handleChangeDate();
    });
    $(".toDate").datepicker({
        autoclose: true
    }).on("changeDate", function () {
        $(".fromDate").datepicker("setEndDate", $(".toDate").val());
        handleChangeDate();
    });
    $(".btn-filter").on("click", function () {
        $(".btn-filter").removeClass("active");
        $(this).addClass("active");
    });
});

function handleChangeDate() {
    var fromDate = moment($(".fromDate").val());
    var toDate = moment($(".toDate").val());
    if (fromDate.isValid() && toDate.isValid()) {
        getCategories(fromDate.unix() * 1000, toDate.unix() * 1000);
    }
}

$(".datepickers").hide();
$(".btn-from-to").on("click", function (event) {
    event.preventDefault();
    $(".fromDate").val("");
    $(".toDate").val("");
    $("#main-content").html("");
    $(".datepickers").show();
    var fromDate = $(".fromDate").val();
    if (fromDate) {
        postData.fromDate = moment(fromDate, "MM/DD/YYYY").unix() * 1000;
    }
    var toDate = $(".toDate").val();
    if (toDate) {
        postData.toDate = moment(toDate, "MM/DD/YYYY").unix() * 1000;
    }
});
$(".btn-from-begining").on("click", function (event) {
    event.preventDefault();
    getCategories(0, moment().unix() * 1000);
    $(".datepickers").hide();
});

function getCategories(fromDate, toDate) {
    var postData = {
        fromDate: fromDate,
        toDate: toDate
    };
    globalVars.fromDate = fromDate;
    globalVars.toDate = toDate;
    showPropzyLoading();
    $.ajax({
        url: "/tour/report-categories",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        //console.log(response);
        dataTables = {};
        $("#main-content").html(response);
        $(".btn-show-content:first-child").click();
    }).always(function () {
        hidePropzyLoading();
    });
}

function showCategoryContent(selector, id) {
    $(".btn-show-content").removeClass("active");
    $(selector).addClass("active");
    $(".category-content").addClass("hidden");
    $(".category-content-" + id).removeClass("hidden");
    switch (id) {
        case 5:
            showTourDealContent(id);
            break;
        case 6:
            showCanceledTourSummary(id);
            break;
        case 7:
            showLateTourContent(id);
            break;
        default:
            showDefaultCategoryContent(id);
    }
    return false;
}

function showDefaultCategoryContent(id) {
    var tableName = "dataTableContent" + id;

    try {
        dataTables[tableName].DataTable().destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    dataTables[tableName] = $("#" + tableName).dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/tour/report-detail/" + id + "?fromDate=" + globalVars.fromDate + "&toDate=" + globalVars.toDate,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "scheduleTime", render: shortDateRender},
            {data: "dealId"},
            {data: "numbers"},
            {data: "csName", render: renderCsName},
            {data: "tmName", render: renderTmName},
            {data: "crmName", render: renderCrmName, visible: !isCrm},
            {data: "customerName", render: renderCustomerName},
            {data: "scheduleTime", render: timeRender},
            {data: "note"}
        ]
    });
}

function showTourDealContent(id) {
    var tableName = "dataTableContent" + id;

    try {
        dataTables[tableName].DataTable().destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    dataTables[tableName] = $("#" + tableName).dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/tour/report-detail/" + id + "?fromDate=" + globalVars.fromDate + "&toDate=" + globalVars.toDate,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "dealId"},
            {data: "numbers"},
            {data: "tmName", render: renderTmName},
            {data: "crmName", render: renderCrmName, visible: !isCrm},
            {data: "customerName", render: renderCustomerName},
            {data: "scheduleTime", render: dateRender},
            {data: "note"}
        ]
    });

}


function showCanceledTourSummary(id) {
    $.ajax({
        url: "/tour/cancel-tours-summary/" + id + "?fromDate=" + globalVars.fromDate + "&toDate=" + globalVars.toDate,
        type: "get"
    }).done(function (response) {
        var html = "";
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                html += "<tr><th>" + item.reasonName + "</th><td><a href='#' onclick=\"return showCanceledTourContent(" + id + "," + item.reasonId + ");\" >" + (item.percentValue ? item.percentValue : 0) + " %</a></td></tr>";
            }
        }
        $("#canceledToursSummary tbody").html(html);
    });

}


function showCanceledTourContent(id, reasonId) {
    var tableName = "dataTableContent" + id;
    try {
        dataTables[tableName].DataTable().destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    dataTables[tableName] = $("#" + tableName).dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/tour/report-detail/" + id + "?fromDate=" + globalVars.fromDate + "&toDate=" + globalVars.toDate + "&reasonId=" + reasonId,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "scheduleTime", render: shortDateRender},
            {data: "dealId"},
            {data: "reasonName"},
            {data: "numbers"},
            {data: "csName", render: renderCsName},
            {data: "tmName", render: renderTmName},
            {data: "crmName", render: renderCrmName, visible: !isCrm},
            {data: "customerName", render: renderCustomerName},
            {data: "scheduleTime", render: timeRender},
            {data: "note"}
        ]
    });
}


function showLateTourContent(id) {
    var tableName = "dataTableContent" + id;

    try {
        dataTables[tableName].DataTable().destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    dataTables[tableName] = $("#" + tableName).dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/tour/report-detail/" + id + "?fromDate=" + globalVars.fromDate + "&toDate=" + globalVars.toDate,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "scheduleTime", render: shortDateRender},
            {data: "dealId"},
            {data: "numbers"},
            {data: "timeAvg", render: renderTimeAvg},
            {data: "csName", render: renderCsName},
            {data: "tmName", render: renderTmName},
            {data: "crmName", render: renderCrmName, visible: !isCrm},
            {data: "customerName", render: renderCustomerName},
            {data: "scheduleTime", render: timeRender},
            {data: "note"}
        ]
    });

}



var renderTimeAvg = function (data, type, object) {
    if (!data) {
        return "";
    }
    return data + " phút";
};

var renderCustomerName = function (data, type, object) {
    if (!data) {
        return "";
    }
    return data + "<br />" + object.customerPhone;
};

var renderCsName = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='#' onclick=\"return showMemberHistories(" + object.scheduleId + ", 1);\">" + data + "</a>";
};

var renderTmName = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='#' onclick=\"return showMemberHistories(" + object.scheduleId + ", 2);\">" + data + "</a>";
};

var renderCrmName = function (data, type, object) {
    if (!data) {
        return "";
    }
    return "<a href='#' onclick=\"return showMemberHistories(" + object.scheduleId + ", 3);\">" + data + "</a>";
};

var tableHistories = null;
function showMemberHistories(id, type) {
    try {
        tableHistories.DataTable().destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    var nameTitle = "Tên";
    if (type == 1) {
        nameTitle += " CS";
    } else if (type == 2) {
        nameTitle += " TM";
    } else if (type == 3) {
        nameTitle += " CRM";
    }
    tableHistories = $("#tableHistories").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/tour/member-history/" + id + "?type=" + type,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "assignedDate", render: dateRender},
            {data: "name", title: nameTitle}
        ]
    });
    $("#modalHistories").modal();
    return false;
}