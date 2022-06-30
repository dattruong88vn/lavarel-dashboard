$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
loadTasks();
setInterval(loadTasks, 30000);
function loadTasks() {
    showPropzyLoading();
    $.ajax({
        url: "/crm-dashboard/tasks-json",
        type: "get"
    }).done(function (response) {
        var tableTasksHtml = "";
        console.log("JSON ALL Task: ");
        console.log(response);
        if (response.result) {
            for (var defineIndex = 0; defineIndex < response.data.length; defineIndex++) {
                var define = response.data[defineIndex];
                tableTasksHtml += "<tr>";
                tableTasksHtml += "<th>" + define.defineName + " (<span class=row-item-count>0</span>)</th>";
                for (var priorityIndex = 0; priorityIndex < define.priorities.length; priorityIndex++) {
                    tableTasksHtml += "<td>";
                    var priority = define.priorities[priorityIndex];
                    for (var taskIndex = 0; taskIndex < priority.subTasks.length; taskIndex++) {
                        var task = priority.subTasks[taskIndex];
                        tableTasksHtml += "<p class='task'>";
                        tableTasksHtml += "<a href='/crm-dashboard/task-detail/" + task.taskId + "/?defineId=" + task.defineId + "' data-defineId=" + task.defineId + " data-taskId=" + task.taskId + " data-dealId=" + task.dealId + " > - " + task.taskName + "</a>";
                        tableTasksHtml += "</p>";
                    }
                    tableTasksHtml += "</td>";
                }
                tableTasksHtml += "</tr>";
            }
        }
        $("#tableTasks tbody").html(tableTasksHtml);
        $("#tableTasks .task a").on("click", function (event) {
            var defineId = $(this).attr("data-defineId");
            var taskId = $(this).attr("data-taskId");
            var dealId = $(this).attr("data-dealId");
            
            switch(defineId){
                // case "44":
                //     event.preventDefault();
                //     window.location = "/deal/detail/" + dealId;
                //     break;
                case "116":
                    showPropzyLoading();
                    $.ajax({
                        url: "/crm-dashboard/done-task/" + taskId,
                        type: "get"
                    }).done(function (response) {
                        if (response.result) {

                            console.log('done');

                        } else {
                            showPropzyAlert(response.message);
                        }
                    }).always(function () {
                        hidePropzyLoading();
                    });
                    break;
                case "47":
                    event.preventDefault();
                    showPropzyLoading();
                    $.ajax({
                        url: "/crm-dashboard/done-task/" + taskId,
                        type: "get"
                    }).done(function (response) {
                        if (response.result) {
                            window.location = "/deal/detail/" + dealId;
                        } else {
                            showPropzyAlert(response.message);
                        }
                    }).always(function () {
                        hidePropzyLoading();
                    });
            }
        });
        countTableTaskItems();
    }).always(function () {
        hidePropzyLoading();
    });
    // getDealNotifyBig();
}

function countTableTaskItems() {
    $("#tableTasks tbody tr").each(function (idx, item) {
        $(this).find(".row-item-count").html($(this).find(".task").length);
    });
    $("#tableTasks thead th").each(function (idx, item) {
        if ($(this).find(".column-item-count").length > 0) {
            var columnItemCount = $("#tableTasks tbody tr>td:nth-child(" + (idx + 1) + ")>.task").length;
            $(this).find(".column-item-count").html(columnItemCount);
        }
    });
}