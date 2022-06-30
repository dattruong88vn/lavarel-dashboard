<div id="modalTaskDetail" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Task detail</h4>
            </div>
            <input type="hidden" class="modal-task-id" value="" />
            <div class="modal-body" ></div>
        </div>

    </div>
</div>
<script>
    var doneTask = function (taskId, showCreateNewTask) {
        showCreateNewTask = showCreateNewTask;
        showPropzyLoading();
        $.ajax({
            url: "/crm-dashboard/done-task/" + taskId,
            type: "get"
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                if (!showCreateNewTask) {
                    window.location.reload();
                } else {
                    $("#modalTaskDetail").modal("hide");
                    showModalCreateTasks(taskId);
                }
            }
        }).always(function () {
            hidePropzyLoading();
        });
        return false;
    };

    function acceptMeeting(taskId, successCalback) {
        showPropzyLoading();
        var postData = {
            "taskId": parseInt(taskId)
        };
        $.ajax({
            url: "/crm-dashboard/accept-meeting",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                $(".dashboard .btn").remove();
                if (successCalback) {
                    successCalback(response);
                } else {
                    $("#modalTaskDetail").modal("hide");
                    window.location.href = "/deal-meeting/list";
                    // showModalCreateTasks(taskId);
                    // $('.modalCreateTasks').on('hidden.bs.modal', function () {
                    //     window.location.href = "/deal-meeting/list";
                    // })
                }
            }else{
                var message = response.message;
                if(response.data && response.data.dealId){
                    message += "<br />Xem deal: <a href='/deal/detail/"+response.data.dealId+"'>"+response.data.dealId+"</a>";
                }
                showPropzyAlert(message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
</script>