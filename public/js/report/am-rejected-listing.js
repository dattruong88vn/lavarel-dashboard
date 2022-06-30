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
    if (itemsTable) {
        itemsTable.destroy();
    }
    var keySearch = $("#keySearch").val()?$("#keySearch").val():"";
    itemsTable = $("#items").DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': '/report/am-rejected-listing-data?fromDate=' + fromDate + "&toDate=" + toDate + "&keySearch=" + keySearch,
        "lengthChange": false,
        "ordering": false,
        "searching": false,
        "columns": [
            {data: "reasonName"},
            {data: "amount", render: renderShowDetailLink}
        ]
    });
    return false;
}



var renderShowDetailLink = function (data, type, object, meta) {
    /*
     if (data <= 0) {
     return data;
     }
     */
    console.log(object);
    data = "<a href='#' onclick=\"return showDetail('" + (object.keySearch ? object.keySearch : '') + "', '" + object.reasonId + "')\">" + data + "</a>";
    return data;
};


function showDetail(keySearch, reasonId) {
    if (itemDetailTable) {
        itemDetailTable.destroy();
    }
    itemDetailTable = $("#itemDetail").DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': '/report/agents-listing-rejected?keySearch=' + keySearch + "&reasonId=" + reasonId + "&fromDate=" + fromMoment + "&toDate=" + toMoment,
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