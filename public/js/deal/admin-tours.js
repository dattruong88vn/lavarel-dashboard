$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    var dataTableTours = $('#dataTableTours').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/deal/tours-data",
        scrollX: true,
        "lengthChange": false,
        "paging": true,
        "searching": false,
        "ordering": false,
        "columns": [
            {data: "dealId", render: renderDealId},
            {data: "tmName"},
            {data: "customerName", render: renderCustomer},
            {data: "supportTouring", render: renderSupportTouring},
            {data: "flaggedTouring", render: renderFlaggedListings},
            {data: "lateTouring", render: renderLateTouring},
            {data: "endedTouring", render: renderEndedTouring},
            {data: "solvedTouring", render: renderSolvedTouring, width: "80px"},
            {data: "cancelTouring", render: renderCancelTouring}
        ]
    });
    $(".btnSavePing").on("click", function (event) {
        event.preventDefault();
        var theForm = $("#formPingManager");
        var scheduleId = theForm.find(".scheduleId").val();
        var note = theForm.find(".note").val();
        var postData = {
            scheduleId: scheduleId,
            solvedNote: note
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
});
var renderDealId = function (data, type, object) {
    return "<a href='/deal/update/" + data + "' target='_blank'>" + data + "</a>";
};
var renderSupportTouring = function (data, type, object) {
    if (!data) {
        return "";
    }
    returnValue = "";
    returnValue += "<a href='#' onclick=\"pingManager(this, " + object.scheduleId + ")\">" + data.note + "</a>";
    return returnValue;
};
var renderCustomer = function (data, type, object) {
    var returnValue = "";
    if (object.customerName) {
        returnValue += "<div>" + object.customerName + "</div>";
    }
    if (object.customerPhone) {
        returnValue += "<div>" + object.customerPhone + "</div>";
    }
    return returnValue;
};
var renderFlaggedListings = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "";
    for (var i = 0; i < data.length; i++) {
        var listing = data[i];
        returnValue = "Listing: " + listing.rlistingId + ", lý do: " + listing.reasonName;
    }
    return returnValue;
};
var renderSolvedTouring = function (data, type, object) {
    if (data === null) {
        return "";
    }
    var returnValue = moment(data.solvedDate).format("HH:mm DD-MM-YYYY");
    return returnValue;
};
var renderLateTouring = function (data, type, object) {
    if (data === null) {
        return "N/A";
    }
    var returnValue = "";
    return returnValue;
};

var renderCancelTouring = function (data, type, object) {
    if (data === null) {
        return "";
    }
    var returnValue = "<div>Lý do: " + data.reasonName + "</div>";
    if (data.list) {
        for (var i = 0; i < data.list.length; i++) {
            var listing = data.list[i];
            returnValue += "<div>- " + moment(listing.scheduleTime).format("HH:mm DD-MM-YYYY") + " tại <a href='/listing/" + listing.rlistingId + "' target='_blank'>" + listing.address + "</a></div>";
        }
    }
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
        theForm.find(".tm-note").html(item.note);
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
