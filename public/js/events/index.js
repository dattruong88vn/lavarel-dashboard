

function eventNameRender(data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a onclick='return showDetailModal(" + object.id + ")' href='#' >" + data + "</a>";
    return data;
}
function reminderTimeRender(data, type, object) {
    if (!data) {
        return "";
    }
    return data + " phút";
}
function statusRender(data, type, object) {
    if (!data) {
        return "";
    }
    return object.statusName;
}
function priorityRender(data, type, object) {
    if (!data) {
        return "";
    }
    return object.priorityName;
}
$("#event-list").DataTable({
    "processing": true,
    "serverSide": true,
    "ajax": "/events/get-items",
    "scrollX": true,
    "ordering": false,
    "lengthChange": false,
    "columns": [
        {data: 'eventName', render: eventNameRender},
        {data: 'address'},
        {data: 'reminderDate', render: shortDateRender},
        {data: 'statusId', render: statusRender},
        {data: 'priorityId', render: priorityRender},
        {data: 'createrName'}
    ],
    "createdRow": function (row, data, index) {
    }
});
function showDetailModal(id) {
    var getUrl = "/events/detail/" + id;
    get_sync(getUrl, true, function (response) {
        if (response.result) {
            var form = "#eventDetailModal";
            var item = response.data;
            $(form + " .eventName").html(item.eventName);
            $(form + " .address").html(item.address);
            $(form + " .participants").html(item.participants);
            $(form + " .reminderDate").html(moment(item.reminderDate).format("DD/MM/YYYY HH:mm"));
            $(form + " .reminderTime").html((item.reminderTime ? (item.reminderTime + " phút") : ""));
            $(form + " .status").html(item.statusName);
            $(form + " .priority").html(item.priorityName);
            $(form + " .descripiton").html(item.descripiton);
            $(form + " .createrName").html(item.createrName);
            $("#eventDetailModal").modal();
        } else {
            showPropzyAlert(response.message);
        }
    }, true);
}


$(".btn-export").click(function () {
    showPropzyLoading();
    var term = $(".dataTables_filter input[type='search']").val();
    
    var postData = {
        "searchKeywords": term ? term : null
    };
    $.post("/events/export", JSON.stringify(postData), function (response) {
        if (response.result) {
            window.location.href = response.data.linkFile;
        } else {
            alert(response.message);
        }
        hidePropzyLoading();
    });
    return false;
});