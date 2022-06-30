$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
var selectedTimeStamp = null;
$(".datepicker").datepicker({
    onSelect: function (date) {
        selectedTimeStamp = moment(date).startOf("month").unix() * 1000;
        getConversionDetail(selectedTimeStamp);
        getKpiDetail(selectedTimeStamp);
    }
});

var tableConversionDetail = null;
var getConversionDetail = function (moment) {
    var postData = {
        "date": moment
    };
    showPropzyLoading();
    if (tableConversionDetail) {
        tableConversionDetail.destroy();
    }
    $.ajax({
        "url": "/activity/conversion-detail",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            tableConversionDetail = $("#tableConversionDetail").DataTable({
                "data": response.data,
                "searching": false,
                "lengthChange": false,
                "paging": false,
                "ordering": false,
                "columns": [
                    {data: "criteria"},
                    {data: "total", render: renderConversionDetailTotal}
                ]
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
};

var renderConversionDetailTotal = function (data, type, object) {
    if (object.type == 2) {
        data = "<a href='#' onclick=\"return showAssignedLead();\">" + data + "</a>";
    }
    return data;
}
var tableAssignedLead = null;
var showAssignedLead = function () {
    var postData = {
        "userId": null
    };
    showPropzyLoading();
    $.ajax({
        "url": "/activity/reassigned-leads",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                response.data[i].orders = i + 1;
            }
            tableAssignedLead = $("#tableAssignedLead").DataTable({
                "data": response.data,
                "searching": false,
                "lengthChange": false,
                "paging": false,
                "ordering": false,
                "columns": [
                    {data: "orders"},
                    {data: "leadId", render: renderLeadId},
                    {data: "assignFromName"},
                    {data: "note"},
                    {data: "createdDate", render: renderDateTime}
                ]
            });

        }
    }).always(function () {
        hidePropzyLoading();
    });
};

var renderLeadId = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='/lead/update/" + data + "' target='_blank' >" + data + "</a>";
    return data;
};

var renderDateTime = function (timeStamp) {
    return moment(timeStamp).format("DD/MM/YYYY HH:mm:ss");
};

var kpiDetail = null;
var getKpiDetail = function (moment) {
    var postData = {
        "date": moment
    };
    showPropzyLoading();
    if (kpiDetail) {
        kpiDetail.destroy();
    }
    $.ajax({
        "url": "/activity/kpi-detail",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            kpiDetail = $("#tableKpiDetail").DataTable({
                "data": response.data,
                "searching": false,
                "lengthChange": false,
                "paging": false,
                "ordering": false,
                "columns": [
                    {data: "typeName"},
                    {data: "creditValue"},
                    {data: "targetValue"},
                    {data: "execution"},
                    {data: "kpi"}
                ]
            });
            var totalCredit = 0;
            var totalTarget = 0;
            var totalExecution = 0;
            var totalKpi = 0;
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                totalKpi += item.kpi;
                totalCredit += item.creditValue;
                totalTarget += item.targetValue;
                totalExecution += item.execution;
            }
            kpiDetail.row.add(
                    {
                        typeName: "Tổng",
                        creditValue: "",
                        targetValue: "",
                        execution: "",
                        kpi: totalKpi
                    }
            ).draw(true);
        }
    }).always(function () {
        hidePropzyLoading();
    });
};