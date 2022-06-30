<div id="modalDoneMeeting" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Done meeting</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label for="sel1" class="col-sm-2">Chọn lý do:</label>
                    <div class="col-sm-10">
                        <select class="form-control reasonId">
                        </select>
                        <div class="errors errors-reasonId"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="sel2" class="col-sm-12">Ghi chú</label>
                    <p id="note" class="col-sm-12">
                        <textarea class="note form-control" rows="4"></textarea>
                    </p>
                </div>
                <div class="form-group row">
                    <label class="col-sm-12"><input type="checkbox" class="isCreateNewMeeting" /> Tạo meeting mới</label>
                </div>
                <div class="formNewMeeting" style="display: none;">
                    <div class="form-group row">
                        <label class="col-sm-3">Chọn trung tâm giao dịch:</label>
                        <div class="col-sm-9">
                            <?php
                            $tcs = get_transaction_centers();
                            ?>
                            <select class="form-control tCId">
                                <option value="-1">Chọn</option>
                                <?php foreach ($tcs as $tc): ?>
                                    <option value="{{$tc->id}}">{{$tc->name}}</option>
                                <?php endforeach; ?>
                            </select>                            
                            <div class="errors errors-tCId"></div>
                        </div>
                    </div>

                    <div class="form-group row chooseAddress">
                        <label class="col-sm-3">Chọn địa chỉ:</label>
                        <div class="col-sm-9">
                            <input id="address" name="address" type="text" class="form-control address" placeholder="Chưa Có Dữ Liệu" value="" />
                            <div class="errors"></div>
                        </div>
                        <div class="col-md-6 col-xs-12 hidden">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Lat</label>
                                        <input id="lat" name="lat" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="" disabled="disabled">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Long</label>
                                        <input id="long" name="long" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="" disabled="disabled">           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Chọn ngày</label>
                        <div class="col-sm-10">
                            <div class="row" >
                                <div class="col-md-6">
                                    <div class="input-group date">
                                        <input name="whenDate" class="form-control whenDate" value="{{date('d/m/Y')}}" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input type="text" class="form-control input-small whenTime">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="errors errors-reminderDate"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Ghi chú</label>
                        <div class="col-sm-10">
                            <textarea class="noteCrm form-control" rows="6"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btnConfirm">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>
    var ModalDoneMeeting = (function () {
        var myModal = $("#modalDoneMeeting");
        var config = null;
        var isCreateNewMeeting = false;
        var postData = {
            "meetingId": null,
            "reasonId": null,
            "note": null,
            "newMeeting": null
        };



        myModal.find('.whenDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "0 days"
        });

        myModal.find('.whenTime').timepicker({
            showMeridian: false
        });


        var showModal = function (params) {
            config = {
                "meetingId": params.meetingId
            };
            postData.meetingId = params.meetingId;
            initSelectReasonId();
            myModal.find('.reasonId').val(-1);
            myModal.find(".isCreateNewMeeting").prop("checked", false);
            myModal.find(".formNewMeeting").hide();
            myModal.find(".tCId").val(-1);
            myModal.find(".note").val("");
            myModal.find(".noteCrm").val("");
            setChooseAddressVisible(myModal, false);

            $(myModal.find(".address")).geocomplete()
                    .bind("geocode:result", function (event, result) {
                        console.log(result);
                        myModal.find('#lat').val(result.geometry.location.lat());
                        myModal.find('#long').val(result.geometry.location.lng());
                    });
            myModal.modal();
        }

        function initSelectReasonId() {
            var html = "<option value='-1'>Chọn lý do</option>";
            for (var x in doneReasons) {
                html += "<option value='" + x + "'>" + doneReasons[x] + "</option>";
            }
            myModal.find(".reasonId").html(html);
        }

        myModal.find(".reasonId").change(function () {
            var reasonId = $(this).val();
            if (reasonId == 3) {
                myModal.find(".isCreateNewMeeting").prop("checked", false);
                myModal.find(".isCreateNewMeeting").trigger("change");
                myModal.find(".isCreateNewMeeting").prop("disabled", true);
            } else {
                myModal.find(".isCreateNewMeeting").prop("disabled", false);
            }
        });

        myModal.find(".isCreateNewMeeting").change(function () {
            isCreateNewMeeting = $(this).prop("checked");
            if (isCreateNewMeeting) {
                myModal.find(".formNewMeeting").show();
            } else {
                myModal.find(".formNewMeeting").hide();
            }
        });

        myModal.find(".btnConfirm").on("click", function (event) {
            event.preventDefault();
            postData.reasonId = parseInt(myModal.find('.reasonId').val());
            postData.note = myModal.find(".note").val();
            postData.newMeeting = null;
            var isValid = true;
            myModal.find(".errors").html("");
            if (postData.reasonId === -1) {
                myModal.find(".errors-reasonId").html("Vui lòng chọn lý do!");
                isValid = false;
            }
            if (isCreateNewMeeting) {

                postData.newMeeting = {
                    "noteCrm": myModal.find(".noteCrm").val()
                };
                var whenDate = myModal.find(".whenDate").val().trim();
                var whenTime = myModal.find(".whenTime").val().trim();
                var now = moment();
                if (whenDate !== "" && whenTime !== "") {
                    var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                    if (reminderTime.isValid()) {
                        postData.newMeeting.reminderDate = reminderTime.unix() * 1000;
                        if (reminderTime.unix() < now.unix()) {
                            myModal.find(".errors-reminderDate").html("Ngày phải lớn hơn ngày hiện tại.");
                            isValid = false;
                        }
                    }
                } else {
                    myModal.find(".errors-reminderDate").html("Vui lòng chọn giờ!");
                    isValid = false;
                }

                postData.newMeeting.tCId = parseInt(myModal.find(".tCId").val());
                if (postData.newMeeting.tCId == -1) {
                    myModal.find(".errors-tCId").html("Chọn trung tâm giao dịch.");
                    isValid = false;
                }

                if (postData.newMeeting.tCId == 0) {
                    postData.newMeeting.address = myModal.find(".address").val();
                    if (postData.newMeeting.address.trim() == "") {
                        myModal.find(".address").parent().find(".errors").html("Chọn địa chỉ");
                        myModal.find('#lat').val();
                        myModal.find('#long').val();
                        isValid = false;
                    } else if (myModal.find('#lat').val().trim() == "" || myModal.find('#long').val().trim() == "") {
                        myModal.find(".address").parent().find(".errors").html("Địa chỉ không hợp lệ vui lòng chọn lại.");
                        myModal.find(".address").val();
                        postData.newMeeting.address = null;
                        isValid = false;
                    } else {
                        postData.newMeeting.longitude = myModal.find('#long').val().trim();
                        postData.newMeeting.latitude = myModal.find('#lat').val().trim();
                    }
                }

            }
            if (!isValid) {
                return false;
            }
            showPropzyLoading();
            $.ajax({
                "url": "/deal-meeting/done",
                "type": "post",
                "data": JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    myModal.modal('hide');
                    MeetingList.loadDataTable();
                    myModal.find(".tCId").val(-1);
                    myModal.find(".address").val("");
                    myModal.find("#long").val("");
                    myModal.find("#lat").val("");
                    // if (postData.reasonId == 3) {
                    window.location = "/crm-dashboard/task-detail/" + response.data.taskId + "?defineId=" + response.data.defineId;
                    // }
                }
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        });

        myModal.find(".tCId").change(function () {
            var tcId = $(this).val();
            setChooseAddressVisible(myModal, tcId == 0);
        });
        
        return {
            "showModal": showModal
        }
    })();
</script>