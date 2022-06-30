$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    $(".btn-filter:first").addClass('active');
    loadDataTableHistory();
    $(".btn-filter").on("click", function (event) {
        event.preventDefault();
        $(".btn-filter").removeClass('active');
        $(this).addClass('active');
        type = $(this).attr('data-value');
        loadDataTableHistory();
    });
});
var dataTableHistory = null;
var type = 0;
function loadDataTableHistory() {
    var url = '/lead/history-data/' + leadId + "?type=" + type
    try {
        dataTableHistory.destroy();
    } catch (Ex) {
    }
    dataTableHistory = $('#dataTableHistory').DataTable({
        'searching': false,
        'lengthChange': false,
        "processing": true,
        "serverSide": true,
        "ajax": url,
        'ordering': true,
        "autoWidth": false,
        'order': [
            [1, 'desc']
        ],
        "columns": [
            //{"data": "rlistingId"},
            {"data": "typeName", orderable: false},
            {"data": "createdDate", render: dateRender, orderable: true},
            {"data": "note", orderable: false, width:"160px"},
            {"data": "content", orderable: false, render: renderHistoryContent, width: "300px"},
            {"data": "curator", render: renderCurator, orderable: false, width:"100px"},
            {"data": "participant", render: renderParticipant, orderable: false, width:"100px"}
        ]
    });
}

var renderCurator = function (data, type, object) {
    var type = "user-";
    switch (object.colorCurator) {
        case 1:
            type += "TM";
            break;
        case 2:
            type += "MG";
            break;
        case 3:
            type += "KH";
            break;
        default:
            type += "normal";
    }
    data = "<span class='" + type.toLowerCase() + "'>" + data + "</span>";
    return data;
};


var renderParticipant = function (data, type, object) {
    var type = "user-";
    switch (object.colorParticipant) {
        case 1:
            type = "TM";
            break;
        case 2:
            type = "MG";
            break;
        case 3:
            type = "KH";
            break;
        default:
            type += "normal";
    }
    data = "<span class='" + type.toLowerCase() + "'>" + data + "</span>";
    return data;
};