$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    loadDataTableFeedbacks();
    $("#filter-group select").change(function () {
        loadDataTableFeedbacks();
    });
    $("#filter-group .searchKeywords").blur(function () {
        loadDataTableFeedbacks();
    });
    $("#filter-group .searchKeywords").keypress(function (event) {
        console.log(event);
        if (event.keyCode == 13 || event.keyCode == 32) {
            loadDataTableFeedbacks();
        }
    });
});
var dataTableFeedbacks = null;
function loadDataTableFeedbacks() {
    try {
        dataTableFeedbacks.destroy();
    } catch (Ex) {
        console.log(Ex);
    }
    var dataUrl = "/deal/feed-backs-data?ajax=1";
    if ("" != dealId) {
        dataUrl += "&dealId=" + dealId;
    }
    var tmName = $(".tmName").val();
    if (tmName) {
        dataUrl += "&tmName=" + tmName;
    }
    var csName = $(".csName").val();
    if (csName) {
        dataUrl += "&csName=" + csName;
    }
    var statusName = $(".statusName").val();
    if (statusName) {
        dataUrl += "&statusName=" + statusName;
    }
    var searchKeywords = $(".searchKeywords").val();
    if (searchKeywords) {
        dataUrl += "&searchKeywords=" + searchKeywords;
    }
    dataTableFeedbacks = $("#dataTableFeedbacks").DataTable({
        "proccessing": true,
        "searching": false,
        "serverSide": true,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "orderCellsTop": true,
        "order": [[1, 'desc']],
        "columns": [
            {'data': "feedbackId", render: renderId},
            {'data': "dateSendFeedback", render: dateRender},
            {'data': "customerName", orderable: false},
            {'data': "tmName", orderable: false},
            //{'data': "csName", orderable: false, visible: false},
            {'data': "dateCutomerFeedback", orderable: false, render: dateRender},
            {'data': "tmPoint", orderable: true},
            //{'data': "csPoint", visible: false},
            {'data': "dealId", orderable: false},
            {'data': "statusName", orderable: false}
        ]
    });
}
var renderId = function (data, type, object) {
    return "<a href='/deal/feedback-result-detail/" + data + "'>" + data + "</a>";
};
var renderName = function (data, type, object) {
    var newUpdate = "";
    if (object.isNewUpdate) {
        newUpdate = "new-update";
    }
    return "<a href='/agent-manager/detail/" + object.agentId + "' class='" + newUpdate + "'>" + data + "</a>";
};