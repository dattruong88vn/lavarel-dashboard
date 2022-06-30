<div id="modalCreateTasks" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCreateTask" method="post" class="form-horizontal">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                <input type="hidden" id="fromTaskId" name="fromTaskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Tạo công việc</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-4">Việc tiếp theo</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="nextTaskId" id="nextTaskId"><option></option></select>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Vào lúc</label>
                        <div class="col-md-4">
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="whenTimeDefinition" name="whenTime" type="text" class="form-control input-small whenTime" value="">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group date">
                                <input id="whenDateDefinition" name="whenDate" class="form-control" value="{{date('d/m/Y')}}" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>					
                        </div>
                        <div class="col-sm-offset-4 col-sm-8">
                            <span class="errors datetimepicker"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Ưu tiên</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="priorityId" id="priorityId">
                                <option value="">Chọn</option>
                                <option value="1">Low</option>
                                <option value="2">High</option>
                                <option value="3">Medium</option>
                            </select>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Ghi chú</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="4" name="note" id="note"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" id="btnDoCreateTask">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

<script type="text/javascript">

    function showModalCreateTasks(fromTaskId) {
        var modalCreateTask = $("#modalCreateTasks");
        $.ajax({
            url: "/crm-dashboard/get-crm-task-definition",
            type: "get",
        }).done(function (response) {
            var html = "<option value=''></option>";
            if (response.result) {
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    if (item.type == 'parent') {
                        html += "<option value='" + item.id + "' disabled style=\"background-color:#CCC\"> -- " + item.name + " -- </option>";
                    } else {
                        html += "<option value='" + item.id + "'>" + item.name + "</option>";
                    }
                }
            }
            modalCreateTask.find("#nextTaskId").html(html);
            if (fromTaskId) {
                modalCreateTask.find("#fromTaskId").val(fromTaskId);
            } else {
                modalCreateTask.find("#fromTaskId").val(taskId);
            }
            modalCreateTask.find('#whenTimeDefinition').timepicker({
                showMeridian: false
            });
            modalCreateTask.find('#whenDateDefinition').datepicker({
                format: "dd/mm/yyyy",
            });
            modalCreateTask.modal();
            modalCreateTask.on('hidden.bs.modal', function (e) {
                $(".dashboard #button-action").find('.btn').remove();
            });

        }).always(function () {
            hidePropzyLoading();
        });
    }
//save 
    $("#btnDoCreateTask").on("click", function (event) {
        var modalCreateTask = $("#modalCreateTasks");
        modalCreateTask.find('.errors').html('');
        event.preventDefault();
        var isValidated = true;
        if (modalCreateTask.find("#fromTaskId").val() != "") {
            var fromTaskId = parseInt(modalCreateTask.find("#fromTaskId").val());
        } else {
            var fromTaskId = null;
        }
        var nextTaskId = modalCreateTask.find("#nextTaskId option:selected");
        if (nextTaskId.val().trim() == '') {
            isValidated = false;
            modalCreateTask.find("#nextTaskId").parent().find('.errors').html('Chưa chọn việc tiếp theo');
        }
        nextTaskId = parseInt(nextTaskId.val());

        var whenTimeDefinition = modalCreateTask.find("#whenTimeDefinition").val();
        var whenDateDefinition = moment(modalCreateTask.find("#whenDateDefinition").val(), 'DD/MM/YYYY', true).format('YYYY-MM-DD');
        var timestamp = moment(whenDateDefinition + ' ' + whenTimeDefinition + ':00').format("x");
        var currentDate = moment().format("x");
        if (currentDate > timestamp || timestamp == 'Invalid date' || timestamp == '' || timestamp == 0) {
            isValidated = false;
            modalCreateTask.find(".datetimepicker").html('Thời gian không hợp lệ (phải lớn hơn hiện tại)');
        }
        timestamp = parseInt(timestamp);
        var priorityId = modalCreateTask.find("#priorityId option:selected");
        if (priorityId.val().trim() == '') {
            isValidated = false;
            modalCreateTask.find("#priorityId").parent().find('.errors').html('Chưa chọn ưu tiên');
        }
        priorityId = parseInt(priorityId.val());

        if (modalCreateTask.find("#note").val().trim() != "") {
            var note = modalCreateTask.find("#note").val();
        } else {
            var note = null;
        }

        if (isValidated == false) {
            return false;
        }
        var postData = {
            "taskId": null,
            "defineId": nextTaskId,
            "reminderDate": null,
            "scheduleTime": timestamp,
            "priorityId": priorityId,
            "fromTaskId": fromTaskId,
            "note": note
        };

        // console.log(JSON.stringify( postData) );return false;
        showPropzyLoading();
        $.ajax({
            url: "/crm-dashboard/create-task",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            modalCreateTask.modal('hide');
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
</script>