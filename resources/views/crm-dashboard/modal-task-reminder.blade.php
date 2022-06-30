<div id="modalTaskReminder" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formTaskReminder" method="post" class="form-horizontal">
                <input type="hidden" id="fromTaskId" name="fromTaskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Nhắc lại công việc</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-4">Vào lúc</label>
                        <div class="col-md-4">
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="whenTime" name="whenTime" type="text" class="form-control input-small whenTime" value="">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group date">
                                <input id="whenDate" name="whenDate" class="form-control" value="{{date('d/m/Y')}}" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>					
                        </div>
                        <div class="col-sm-offset-4 col-sm-8">
                            <span class="errors reminderDateErrors"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btnSave" >Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

<script type="text/javascript">
    var modalTaskReminder = $("#modalTaskReminder");
    $(".btnShowTaskReminder").on("click", function (event) {
        event.preventDefault();
        $(".current-select-reminder").removeClass("current-select-reminder");
        $(this).addClass("current-select-reminder");
		var d = new Date();
        var nextTimeData = new Date(d.getTime() + (15 - (d.getMinutes() % 15)) * 60 * 1000);
		var nextTime = nextTimeData.getHours() + ":" + nextTimeData.getMinutes() + ":" + nextTimeData.getSeconds();
		modalTaskReminder.find('#whenTime').timepicker({
            showMeridian: false,
			defaultTime: nextTime,
        });

        modalTaskReminder.find('#whenDate').datepicker({
            format: "dd/mm/yyyy",
        });
        modalTaskReminder.modal();
    });
    modalTaskReminder.find(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = {
            "taskId": (typeof taskId) != "undefined" && (taskId != null) && (typeof taskId)!="object" ? taskId : $(".current-select-reminder").attr("data-task-id"),
            "reminderDate": null
        };

        var whenTime = $("#whenTime").val();
        var whenDate = moment($("#whenDate").val(), 'DD/MM/YYYY', true).format('YYYY-MM-DD');
        postData.reminderDate = moment(whenDate + ' ' + whenTime + ':00').format("x");
        var currentDate = moment().format("x");
        $(".reminderDateErrors").html('');
        if (currentDate > postData.reminderDate || postData.reminderDate == 'Invalid date' || postData.reminderDate == '' || postData.reminderDate == 0) {
            isValidated = false;
            $(".reminderDateErrors").html('Thời gian không hợp lệ (phải lớn hơn hiện tại)');
        }
        postData.reminderDate = parseInt(postData.reminderDate);
        /*
         console.log(postData);
         return false;
         */
        showPropzyLoading();
        $.ajax({
            url: "/crm-dashboard/set-task-reminder",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            modalTaskReminder.modal('hide');
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
</script>