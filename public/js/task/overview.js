$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
var selectedTimeStamp = null;
$(".datepicker").datepicker({
    onSelect: function (date) {
        selectedTimeStamp = moment(date).unix() * 1000;
        loadOverviewTable(selectedTimeStamp);
        loadTaskDetailTable(selectedTimeStamp);
    }
});

$(".task-type-all").on("click", function (event) {
    $(".task-type").prop("checked", $(this).prop("checked"));
});

$(".task-type").on("click", function (event) {
    if (!$(this).hasClass("task-type-all") && !$(this).prop("checked")) {
        $(".task-type-all").prop("checked", false);
    }
    if (selectedTimeStamp) {
        loadTaskDetailTable(selectedTimeStamp);
    }
});

var tableOverview = null;
function loadOverviewTable(timeStamp) {
    showPropzyLoading();
    if (tableOverview) {
        tableOverview.destroy();
    }
    $.ajax({
        "url": "/activity/task-overview-dataTable",
        "type": "post",
        "data": JSON.stringify({
            "date": timeStamp
        })
    }).done(function (response) {
        if (response.result) {
            tableOverview = $("#tableOverview").DataTable({
                "data": response.data,
                "searching": false,
                "lengthChange": false,
                "paging": false,
                "ordering": false,
                "columns": [
                    {data: "task"},
                    {data: "total"},
                    {data: "success"},
                    {data: "unSuccess"},
                    {data: "percentSuccess"},
                    {data: "timeAverage"}
                ]
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
}
var taskDetailTable = null;
function loadTaskDetailTable(timeStamp) {
    if (taskDetailTable) {
        taskDetailTable.destroy();
    }
    var taskType = [];
    $(".task-type:checked").each(function () {
        if (!$(this).hasClass("task-type-all")) {
            taskType.push($(this).val());
        }
    });
    var url = "/activity/task-detail?date=" + timeStamp + "&strTypeId=" + taskType;
    taskDetailTable = $("#taskDetailTable").DataTable({
        "ajax": url,
        "proccessing": true,
        serverSide: true,
        "searching": false,
        "lengthChange": false,
        "paging": false,
        "ordering": false,
        "columns": [
            {data: "task"},
            {data: "openedDate"},
            {data: "doneDate"},
            {data: "executeTime"},
            {data: "processSlow"},
            {data: "status"}
        ]
    });
}
