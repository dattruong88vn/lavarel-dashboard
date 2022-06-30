$(".fromDate").datepicker({
    "format": "dd/mm/yyyy"
});
$(".toDate").datepicker({
    "format": "dd/mm/yyyy"
});

var loadCrmsSelect = function () {
    $.ajax({
        "url": "/account/get-list-json/12",
        "type": "get"
    }).done(function (response) {
        var html = "<option value='-1'>Chọn người phụ trách meeting</option>";
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                html += "<option value='" + response.data[i].userId + "' >" + response.data[i].name + "</option>";
            }
        }
        $(".userId").html(html);
    });
};

loadCrmsSelect();

var validateExportForm = function () {
    $(".errors").html("");
    var isValid = true;
    if ($(".userId").val().trim() == "" || $(".userId").val() == "-1") {
        $(".userId")
          .parent()
          .find(".errors")
          .html("Chọn người phụ trách meeting");
        isValid = false;
    }
    return isValid;
}

$(".export-tour-per-request").on("click", function () {

//    if (!validateExportForm()) {
//        return false;
//    }

    var exportUrl = "/crm-dashboard/export-reports";

    var fromDate = $(".fromDate").val().trim();
    if (fromDate != "") {
        fromDate = moment(fromDate, "DD/MM/YYYY").unix() * 1000;
        exportUrl += "?fromDate=" + fromDate;
    } else {
        exportUrl += "?fromDate=" + 0;
    }

    var toDate = $(".toDate").val().trim();
    if (toDate != "") {
        toDate = moment(toDate, "DD/MM/YYYY").unix() * 1000;
        exportUrl += "&toDate=" + toDate;
    } else {
        exportUrl += "&toDate=" + (moment().unix() * 1000);
    }

    var userId = $(".userId").val();
    if (userId != -1) {
        exportUrl += "&userId=" + userId;
    }

    showPropzyLoading();
    $.post(exportUrl, {}, function (response) {
        if (response.result) {
            window.location.href = response.data.linkFile;
        } else {
            alert(response.message);
        }
        hidePropzyLoading();
    });
    return false;
});
