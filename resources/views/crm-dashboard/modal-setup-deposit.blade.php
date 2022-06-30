<div id="modalSetupDeposit" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formSetupDeposit" method="post" >
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
                <input type="hidden" id="fromTaskId" name="fromTaskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Thông tin</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-4">Khách hàng *</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="customerSendToTransactionCenter" id="customerSendToTransactionCenter">
                                <option value=""></option>
                                <option value="1">Đồng ý</option>
                                <option value="0">Không đồng ý</option>
                            </select>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Lý do</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="1" name="customerReason" id="customerReason"></textarea>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Địa điểm hẹn *</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="1" name="customerPlace" id="customerPlace"></textarea>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group row">
                        <label class="col-sm-4">Chủ tin đăng *</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="ownerListingSendToTransactionCenter" id="ownerListingSendToTransactionCenter">
                                <option value=""></option>
                                <option value="1">Đồng ý</option>
                                <option value="0">Không đồng ý</option>
                            </select>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Lý do</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="1" name="ownerListingReason" id="ownerListingReason"></textarea>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-4">Địa điểm hẹn *</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="1" name="ownerListingPlace" id="ownerListingPlace"></textarea>
                            <span class="errors"></span>
                        </div>
                    </div>
                    <hr>
                    <div class="form-group row">
                        <label class="col-sm-4">Lịch hẹn *</label>
                        <div class="col-md-4">
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input id="scheduleTime" name="scheduleTime" type="text" class="form-control input-small whenTime" value="">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group date">
                                <input id="scheduleDate" name="scheduleDate" class="form-control" value="{{date('d/m/Y')}}" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>					
                        </div>
                        <div class="col-sm-offset-4 col-sm-8">
                            <span class="errors datetimepicker"></span>
                        </div>
                    </div>


                </div>
                <div class="modal-footer">
                    <button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>
<script type="text/javascript">

    function showModalSetupDeposit(fromTaskId) {
        $("#modalSetupDeposit").modal();
        $('#scheduleTime').timepicker({
            showMeridian: false
        });
        $('#scheduleDate').datepicker({
            format: "dd/mm/yyyy",
        });
    }

    //save 
    $("#modalSetupDeposit .btnSave").on("click", function (event) {
        $("#modalSetupDeposit").find('.errors').html('');
        event.preventDefault();
        var isValidated = true;

        var customerSendToTransactionCenter = $("#customerSendToTransactionCenter option:selected").val();
        if (customerSendToTransactionCenter.trim() == '') {
            isValidated = false;
            $("#customerSendToTransactionCenter").parent().find('.errors').html('Chưa chọn');
        }

        var customerReason = $("#customerReason").val();
        if (customerSendToTransactionCenter == '0') {
            if (customerReason.trim() == '') {
                isValidated = false;
                $("#customerReason").parent().find('.errors').html('Chưa nhập lý do');
            }
        }

        if (customerSendToTransactionCenter == '1') {
            customerSendToTransactionCenter = true;
        } else if (customerSendToTransactionCenter == '0') {
            customerSendToTransactionCenter = false;
        }

        if (customerReason.trim() != '') {
            customerReason = customerReason.trim();
        } else {
            customerReason = null;
        }

        var customerPlace = $("#customerPlace").val();
        if (customerPlace.trim() == '') {
            isValidated = false;
            $("#customerPlace").parent().find('.errors').html('Chưa nhập điểm hẹn');
        }


        var ownerListingSendToTransactionCenter = $("#ownerListingSendToTransactionCenter option:selected").val();

        if (ownerListingSendToTransactionCenter.trim() == '') {
            isValidated = false;
            $("#ownerListingSendToTransactionCenter").parent().find('.errors').html('Chưa chọn');
        }

        var ownerListingReason = $("#ownerListingReason").val();
        if (ownerListingSendToTransactionCenter == '0') {
            if (ownerListingReason.trim() == '') {
                isValidated = false;
                $("#ownerListingReason").parent().find('.errors').html('Chưa nhập lý do');
            }
        }

        if (ownerListingSendToTransactionCenter == '1') {
            ownerListingSendToTransactionCenter = true;
        } else if (ownerListingSendToTransactionCenter == '0') {
            ownerListingSendToTransactionCenter = false;
        }

        if (ownerListingReason.trim() != '') {
            ownerListingReason = ownerListingReason.trim();
        } else {
            ownerListingReason = null;
        }

        var ownerListingPlace = $("#ownerListingPlace").val();
        if (ownerListingPlace.trim() == '') {
            isValidated = false;
            $("#ownerListingPlace").parent().find('.errors').html('Chưa nhập điểm hẹn');
        }

        var scheduleTime = $("#scheduleTime").val();
        var scheduleDate = moment($("#scheduleDate").val(), 'DD/MM/YYYY', true).format('YYYY-MM-DD');
        var timestamp = moment(scheduleDate + ' ' + scheduleTime + ':00').format("x");
        var currentDate = moment().format("x");
        if (currentDate > timestamp || timestamp == 'Invalid date' || timestamp == '' || timestamp == 0) {
            isValidated = false;
            $(".datetimepicker").html('Thời gian không hợp lệ (phải lớn hơn hiện tại)');
        }
        timestamp = parseInt(timestamp);

        if (isValidated == false) {
            return false;
        }

        var customer = {
            "sendToTransactionCenter": customerSendToTransactionCenter,
            "reason": customerReason,
            "place": customerPlace
        };
        var ownerListing = {
            "sendToTransactionCenter": ownerListingSendToTransactionCenter,
            "reason": ownerListingReason,
            "place": ownerListingPlace
        };
        var postData = {
            "taskId": taskId,
            "defineId": defineId,
            "scheduleTime": timestamp,
            "customer": customer,
            "ownerListing": ownerListing
        };

        console.log(postData);

        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/save-task-form/' + taskId + "/" + defineId,
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                $("#modalSetupDeposit").modal('hide');
                $("#customerReason").val('');
                $("#customerPlace").val('');
                $("#ownerListingReason").val('');
                $("#ownerListingPlace").val('');
                showModalCreateTasks(taskId);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });

        hidePropzyLoading();
    });
</script>