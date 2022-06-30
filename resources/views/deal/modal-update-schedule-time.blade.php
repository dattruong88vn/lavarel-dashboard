<div class="panelChangeScheduleTime panelEditable" style="position:absolute; top:0px; z-index; 10;left: 0px; z-index: 10; display:block; background: #fff; padding: 16px; width: 400px; display: none; box-shadow: rgb(10 10 10 / 20%) 0px 2px 5px 3px">
    <input type="hidden" class="scheduleId" value="" />
    <div class="form-group row">
        <label class="control-label col-sm-4">Chọn Ngày</label>
        <div class="col-sm-8">
            <input class="scheduleDate form-control" />
        </div>
    </div>
    <div class="form-group row">
        <label class="control-label col-sm-4">Chọn giờ</label>
        <div class="col-sm-8">
            <div class="input-group bootstrap-timepicker timepicker">
                <input class="scheduleTime form-control" />
                <span class="input-group-addon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
            <div>                
                <label class="errors errors-scheduleTime" ></label>
            </div>
        </div>
    </div>
    <div class="form-group row">
        <label class="control-label col-sm-4">Chọn lý do</label>
        <div class="col-sm-8">
            <select class="reasons form-control"></select>
            <label class="errors errors-reasons" ></label>
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-12 text-right">
            <button class="btnSave btn btn-warning">Chọn</button>            
            <button class="btnCancel btn btn-danger">Hủy</button>            
        </div>
    </div>
</div>
<script>

    var ChangeScheduleTime = (function () {
        var panel = $(".panelChangeScheduleTime");
        panel.find(".scheduleDate").datepicker({
            "format": "dd/mm/yyyy",
            autoclose: true
        });
        panel.find(".scheduleTime").timepicker({
            showMeridian: false
        });
        function getChangeScheduleTimeReasons() {
            $.ajax({
                "url": "/common/get-change-schedule-time-reasons"
            }).done(function (response) {
                if (response.result) {
                    var htmlOptions = "<option value='' >Chọn lý do</option>";
                    for (var i = 0; i < response.data.length; i++) {
                        var item = response.data[i];
                        htmlOptions += "<option value='" + item.id + "' >" + item.name + "</option>";
                    }
                    panel.find(".reasons").html(htmlOptions);
                    panel.find(".scheduleTime").val("");
                } else {
                    getChangeScheduleTimeReasons();
                }
            }).always(function () {

            });
        }

        function resetForm() {
            panel.find(".scheduleId").val("");
            panel.find(".scheduleDate").val("");
            panel.find(".scheduleTime").val("");
        }
        $(document).ready(function () {
            getChangeScheduleTimeReasons();
            panel.find(".btnCancel").on("click", function (event) {
                event.preventDefault();
                resetForm();
                panel.hide();
            });
            $(".btnUpdateScheduleTime").on("click", function (event) {
                event.preventDefault();
                resetForm();
                $('.panelEditable').hide();
                panel.find('.scheduleDate').datepicker('setDate', new Date());
                panel.find('.scheduleDate').datepicker("setStartDate", moment().format("DD/MM/YYYY"));
                panel.find('.scheduleTime').timepicker("setTime", moment().add(0.5, "h").format("HH:mm:ss"));
                panel.find('.reasons').val('');
                panel.show();
                panel.position({
                    "my": "center top+10",
                    "at": "center bottom",
                    "of": $(this)
                });
                var scheduleId = $(this).attr("data-schedule-id");
                panel.find(".scheduleId").val(scheduleId);                
            });

            panel.find(".btnSave").on("click", function (event) {
                panel.find(".errors").html("");
                event.preventDefault();
                var typeId = panel.find(".reasons").val();
                var scheduleTime = null;
                var scheduleId = panel.find(".scheduleId").val();
                var isValid = true;
                var whenDate = panel.find(".scheduleDate").val().trim();
                var whenTime = panel.find(".scheduleTime").val().trim();
                if (whenDate !== "" && whenTime !== "") {
                    var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                    console.log(reminderTime);
                    if (reminderTime.isValid()) {
                        scheduleTime = reminderTime.unix() * 1000;
                        $(".schedule-date-full-" + scheduleId).val(scheduleTime);
                    }
                } else {
                    panel.find(".errors-scheduleTime").html("Chọn ngày giờ đi xem!");
                    isValid = false;
                }
                
                if(typeId==""){
                    panel.find(".errors-reasons").html("Chọn lý do!");
                    isValid = false;
                }

                if (!isValid) {
                    return false;
                }            

                if(getListingsFromTable && getScheduleListingsRow) {
                    var listingIds = getListingsFromTable(scheduleId, scheduleTime).map(item => item.rlistingId);
                    getScheduleListingsRow(scheduleId, listingIds, scheduleTime, function(res) {
                        panel.hide();

                        var data = (res && res.data) ? res.data : {};
                        var scheduleTime = moment(
                            whenTime + " " + whenDate,
                            "HH:mm DD/MM/YYYY"
                        ).unix() * 1000;
                        var estimatedDate = moment(
                            whenTime + " " + whenDate,
                            "HH:mm DD/MM/YYYY"
                        ).add(data.estimatedTime, "s").unix() * 1000;
                        var schedulePanel = $('#schedule' + scheduleId);
                        
                        $('.lbScheduleDay-' + scheduleId).html(whenDate);
                        $(".schedule-date-" + scheduleId).val(whenDate);
                        $('.lbScheduleTime-' + scheduleId).html(whenTime);
                        $('.lbEstimatedTime-' + scheduleId).html(formatTime((data.estimatedTime || 0) / 60));
                        $('.lbEstimatedDate-' + scheduleId).html(moment(estimatedDate).format('HH:mm'));
                        schedulePanel.find('[data-estimate-distance]').data('estimate-distance', data.distance);
                        schedulePanel.find('[data-schedule-time]').data('schedule-time', scheduleTime);
                        schedulePanel.find('[data-estimate-date]').data('estimate-date', estimatedDate);
                        schedulePanel.find('[data-estimate-time]').data('estimate-time', data.estimatedTime);
                    });
                }

                $('#schedule' + scheduleId).find('[data-schedule-time]').data('schedule-time', scheduleTime);
                $('#schedule' + scheduleId).find('[data-reason-change-id]').data('reason-change-id', typeId);
            });

            
        });

    })();
</script>