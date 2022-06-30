
var tbItems = null;
var dataStatus = null;
var renderDetailLink = function (data, type, object) {
    return "<a onclick='return initViewDetail(" + object.orderId + ")' href='/order/detail/" + object.orderId + "'>" + data + "</a>";
}

var showData = function (statusId) {
    $("#lead-list").DataTable().ajax.url("lead/get-list-lead/" + statusId + "").load();
    return false;
}

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    getDataTable("/order/get-list-data/");
    $(".btn-export").click(function () {
        showPropzyLoading();
        $.post("/report/export-report/lead-list----1", {}, function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });
    $(".status-filter").on("click", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        dataStatus = $(this).attr('data-status');
        getDataTable(url);
        console.log(dataStatus);
    });
});

function getDataTable(url) {
    if (url === "#") {
        return;
    }
    if (tbItems) {
        tbItems.destroy();
    }
    tbItems = $("#order-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": url,
        "scrollX": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "columns": [
            {data: 'orderId', render: renderDetailLink},
            {data: 'dealId', render: showLeadIdOrDealId},
            {data: 'createdDate', render: dateRender},
            {data: 'lastActivityDate', render: dateRender},
            {data: 'lastActivityName'},
            {data: 'statusReceived'},
            {data: 'statusOpened'},
            {data: 'statusResponseWithListing'},
            {data: 'statusResponseWithContact'},
        ]
    });
}

function initViewDetail(id) {
    var result = false;
    if (dataStatus === "3" || dataStatus === "4") {
        showPropzyLoading();
        $.ajax({
            url: '/order/update-read-status/' + id + '/' + dataStatus,
            type: 'get',
            async: false
        }).done(function (response) {
            result = response.result;
            if (!result) {
                showPropzyAlert(response.message);
            }
        }).fail(function () {
            return false;
        }).always(function () {
            hidePropzyLoading();
        });
    }else{
        result=true;
    }
    return result;
}