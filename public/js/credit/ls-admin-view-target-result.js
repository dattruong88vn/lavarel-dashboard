$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$("#fromDate").val(moment().format('MM/YYYY'));
$(document).ready(function () {
    getTargetList(moment());
});
$("#fromDate").datepicker({
    "changeMonth": true,
    changeYear: true,
    viewMode: "months",
    minViewMode: "months",
    format: "mm/yyyy"
}).on('changeDate', function (ev) {
    getTargetList(ev.date);
    $(this).blur();
    $(this).datepicker('hide');
});
var scoreTable = null;
var getTargetList = function (date) {
    var selectedMoment = moment(date);
    var postData = {
        "date": selectedMoment.unix() * 1000
    };

    showPropzyLoading();
    $.ajax({
        "url": "/credit/ls-target-in-month-data",
        "type": "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        try {
            scoreTable.destroy();
        } catch (ex) {
            console.log(ex);
        }
        scoreTable = $("#scoreTable").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": response.data,
            //"scrollX": true,
            "columns": [
                {"data": "userName"},
                {"data": "value", render: renderValue}
            ]
        });
    }).always(function () {
        hidePropzyLoading();
    });
};

var renderValue = function (data, type, object) {
    if (!data) {
        return "";
    }
    return data + "%";
}