$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
var itemsTable = null;
var itemDetailTable = null;
var filterType = 1;
var fromMoment = moment().startOf('day');
var toMoment = moment().endOf('day');
$(document).ready(function () {
    $('.datepicker').datepicker();
    $(".chooseDate").hide();
    $("#keySearch").select2();
    //initItemsTable(filterType);    
    initItemsTable(fromMoment, toMoment);
    $(".btn-filter").on('click', function (event) {
        event.preventDefault();
        $(".chooseDate").hide();
        $(".btn-filter").removeClass("active");
        $(this).addClass("active");
        filterType = $(this).attr("data-filter-type");
        //console.log(filerType);
        switch (filterType) {
            case "1":
                fromMoment = moment().startOf('day');
                initItemsTable(fromMoment, toMoment);
                break;
            case "2":
                fromMoment = moment().startOf('isoweek');
                toMoment = moment().endOf('isoweek');
                initItemsTable(fromMoment, toMoment);
                break;
            case "3":
                fromMoment = moment().startOf('month');
                toMoment = moment().endOf('month');
                initItemsTable(fromMoment, toMoment);
                break;
            case "4":
                // xử lý cho chọn fromdate - todate
                if (itemsTable) {
                    itemsTable.clear().draw();
                    //scoreTable.destroy();
                }
                $(".chooseDate").show();
                break;
        }
    });
    $(".btnSearch").on("click", function (event) {
        event.preventDefault();
        if (filterType == 4) {
            if ($("#fromDate").val() === "") {
                showPropzyAlert("Chọn ngày bắt đầu");
                return false;
            }
            if ($("#toDate").val() === "") {
                showPropzyAlert("Chọn ngày kết thúc");
                return false;
            }
            var fromDate = $("#fromDate").val();
            if (fromDate !== "") {
                fromMoment = moment(fromDate);
            }
            var toDate = $("#toDate").val();
            if (toDate !== "") {
                toMoment = moment(toDate);
            }
        }
        initItemsTable(fromMoment, toMoment);
    });
});
function initItemsTable(fromDate, toDate) {
    $("#itemDetail").hide();
    var dataUrl = "/report/am-as-ls-data";
    var postData = {
        "fromDate": fromDate.unix() * 1000,
        "toDate": toDate.unix() * 1000,
        "keySearch": $("#keySearch").val() ? $("#keySearch").val()+"" : null
    };
    $.ajax({
        "url": dataUrl,
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                html += "<tr>";
                html += "<td>" + item.name + "</td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.live + "', " + item.listingAgent.agentType + ", " + item.listingAgent.listingType + ");\">" + item.listingAgent.live + "</a></td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.reviewing + "', " + item.listingAgent.agentType + ", " + item.listingAgent.listingType + ");\">" + item.listingAgent.reviewing + "</a></td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.rejected + "', " + item.listingAgent.agentType + ", " + item.listingAgent.listingType + ");\">" + item.listingAgent.rejected + "</a></td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.live + "', " + item.salesAgent.agentType + ", " + item.salesAgent.listingType + ");\">" + item.salesAgent.live + "</a></td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.reviewing + "', " + item.salesAgent.agentType + ", " + item.salesAgent.listingType + ");\">" + item.salesAgent.reviewing + "</a></td>";
                html += "<td><a href='#' onclick=\"return showDetail('" + (item.status.keySearch ? item.status.keySearch : "") + "', '" + item.status.rejected + "', " + item.salesAgent.agentType + ", " + item.salesAgent.listingType + ");\">" + item.salesAgent.rejected + "</a></td>";
                html += "</tr>";
            }
            $("#items tbody").html(html);
        }
    }).always(function () {

    });
}
function showDetail(keySearch, statusId, agentType, listingType) {
    var postData = {
        "keySearch": keySearch ? keySearch : null,
        "fromDate": fromMoment.unix() * 1000,
        "toDate": toMoment.unix() * 1000,
        "statusId": statusId,
        "agentType": agentType,
        "listingType": listingType
    };


    if (itemDetailTable) {
        itemDetailTable.destroy();
    }
    var queryString = "";
    for (var prop in postData) {
        queryString += "&" + prop + "=" + (postData[prop] ? postData[prop] : "");
    }
    itemDetailTable = $("#itemDetail").DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': '/report/number-of-listing-for-agent?ajax=1' + queryString,
        "lengthChange": false,
        "ordering": false,
        "searching": false,
        "columns": [
            {data: "agentName", render: renderAgentDetailLink},
            {data: "amount"}
        ]
    });
    $("#itemDetail").show();
    return false;
}


var renderAgentDetailLink = function (data, type, object) {
    if (data == null || '' === data.trim()) {
        return data;
    }
    if (object.agentId) {
        data = "<a href='/agent-manager/detail/" + object.agentId + "'>" + data + "</a>";
    }
    return data;

};