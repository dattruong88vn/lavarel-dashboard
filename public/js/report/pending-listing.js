$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
var itemTable = null;
$(document).ready(function () {
    $("#keySearch").select2();
    $(".btnSearch").on('click', function () {
        initItemTable();
    });
    initItemTable();
});

function initItemTable() {
    if (itemTable) {
        itemTable.destroy();
    }
    var keySearch = $("#keySearch").val();
    if (!keySearch) {
        keySearch = '';
    }
    itemTable = $("#items").DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': '/report/pending-listing-data?keySearch=' + keySearch,
        "lengthChange": false,
        "ordering": false,
        "searching": false,
        "columns": [
            {data: "reason"},
            {data: "pendingOne", render: renderShowDetailLink},
            {data: "pendingTwo", render: renderShowDetailLink},
            {data: "pendingThree", render: renderShowDetailLink}
        ]
    });
}

var renderShowDetailLink = function (data, type, object, meta) {
    if (data <= 0) {
        return data;
    }
    data = "<a href='#' onclick=\"return showDetail('" + (object.keySearch ? object.keySearch : '') + "', '" + object.reasonType + "', '" + meta.col + "' )\">" + data + "</a>";
    return data;
};
var itemDetailTable = null;
$("#itemDetail").hide();
function showDetail(keySearch, reasonType, pendingTime) {
    if (itemDetailTable) {
        itemDetailTable.destroy();
    }
    itemDetailTable = $("#itemDetail").DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': '/report/agents-listing-pending?keySearch=' + keySearch + "&reasonType=" + reasonType + "&pendingTime=" + pendingTime,
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