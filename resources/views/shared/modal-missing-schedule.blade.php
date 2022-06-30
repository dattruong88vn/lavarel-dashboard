<div id="modalMissingSchedule" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">What happened?</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <p>
                        Tại sao chưa có tour cho khách hàng <span class="customer-name text-bold"></span> ở lead/deal <span class="deal-id"></span>
                    </p>
                </div>
                <div class="form-group row">
                    <label for="sel2" class="col-sm-12">Ghi chú của TM:</label>
                    <p id="content" class="col-sm-12">
                    </p>
                </div>
                <div class="form-group row">
                    <label for="sel1" class="col-sm-2">Chọn lý do:</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="modalMissingScheduleSelectId">
                            <option value="-1">Lý do ...</option>
                            <!-- <option value="1">Khách hàng hẹn ngày khác meeting lại</option> -->
                            <option value="2">Chưa có sản phẩm phù hợp</option>
                            <option value="3">Chưa quyết được ngày đi tour</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2">Ghi chú</label>
                    <div class="col-sm-10">
                        <textarea class="note form-control" rows="6"></textarea>
                    </div>
                </div>
                <div id="selectDateReminder" style="display: none;">
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
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Ghi chú</label>
                        <div class="col-sm-10">
                            <textarea class="note form-control" rows="6"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button id="modalMissingScheduleConfirm" type="button" class="btn btn-primary">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>
    var isModalMissingScheduleShown = false;
    $(function () {
        var self = this;
        var modalMissingSchedule = $("#modalMissingSchedule");

        modalMissingSchedule.find('.whenDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "0 days"
        });

        modalMissingSchedule.find('.whenTime').timepicker({
            showMeridian: false
        });

        modalMissingSchedule.on('shown.bs.modal', function () {
            isModalMissingScheduleShown = true;
        })
        modalMissingSchedule.on("hidden.bs.modal", function () {
            isModalMissingScheduleShown = false;
            // getMissingSchedules();
        });

        $("#modalMissingScheduleSelectId").change(function () {
            var selectId = $(this).val();
            if (selectId === "1") {
                $("#modalMissingSchedule #selectDateReminder").fadeIn();
            } else {
                $("#modalMissingSchedule #selectDateReminder").fadeOut();
            }
        });

        $("#modalMissingScheduleConfirm").click(function () {
            var postData = {
                "reasonId": parseInt($("#modalMissingScheduleSelectId").val()),
                "meetingId": missingSchedule.meetingId,
                "reasonData": {
                    "reminderDate": 0,
                    "note": modalMissingSchedule.find(".note").val() != '' ? modalMissingSchedule.find(".note").val() : null
                }
            };
            if (postData.reasonId === -1) {
                return showPropzyAlert("Vui lòng chọn lý do!");
            }
            if (postData.reasonId == 1) {
                var whenDate = modalMissingSchedule.find(".whenDate").val().trim();
                var whenTime = modalMissingSchedule.find(".whenTime").val().trim();
                if (whenDate !== "" && whenTime !== "") {
                    var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                    if (reminderTime.isValid()) {
                        postData.reasonData.reminderDate = reminderTime.unix() * 1000;
                    }
                } else {
                    showPropzyAlert("Vui lòng chọn giờ đi xem!");
                }
                postData.reasonData.note = modalMissingSchedule.find(".note").val();
            }
            showPropzyLoading();
            $.ajax({
                url: "/tour/what-happened",
                type: "post",
                data: postData
            }).done(function (response) {
                $('#modalMissingSchedule').modal("hide");

                showPropzyAlert(response.message);
                // getMissingSchedules();
            }).always(function () {
                hidePropzyLoading();
            });
        });


    });


    var missingSchedule = {};
    var getMissingSchedules = function (response) {
        // $.ajax({
        //     url: "/tour/missing-schedules",
        //     type: "get"
        // }).done(function (response) {
            //console.log(response)
            var data = response.data;
            if (response.result && data.length > 0 && !isModalMissingScheduleShown) {
                missingSchedule = data[0];
                var myModal = $("#modalMissingSchedule");
                myModal.find("#content").html(missingSchedule.note);
                myModal.find(".customer-name").html(missingSchedule.customerName);
                if(missingSchedule.dealId != null){
                   myModal.find(".deal-id").html("<a href='/deal/detail/"+missingSchedule.dealId+"'>"+missingSchedule.dealId+"</a>"); 
               }else{
                    if(missingSchedule.meetingItems != null){
                        var printHtml = [];
                        $.each(missingSchedule.meetingItems,function(k,v){
                            printHtml.push("<a href='/lead/detail/"+v.id.leadId+"'>"+v.id.leadId+"</a>");
                        })
                        myModal.find(".deal-id").html(printHtml.join(', '));
                    }
               }
                
                myModal.modal();
            }
        // });

    }

</script>