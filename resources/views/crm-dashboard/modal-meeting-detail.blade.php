<div id="modalMeetingDetail" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCreateMeeting" method="post" >
                <input type="hidden" id="dealId" name="dealId" value="" />
                <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="" />
                <input type="hidden" id="taskId" name="taskId" class="taskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Chi tiết meeting</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">Ngày</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-6 lbDate">
                                </div>
                            </div>
                        </div>

                        <label class="col-sm-2">Giờ</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-6 lbTime">
                                </div>
                            </div>
                        </div>
                    </div>                                     
                    <div class="form-group row">
                        <label class="col-sm-2">Note</label>
                        <div class="col-sm-10">
                            <div class="lbNote">
                            </div>
                        </div>
                    </div>                 
                    <div class="form-group text-center">
                        <button class="btn btn-success btnShowReassign">Ressign</button>
                        <button class="btn btn-success btnDoneTask">ok</button>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>
<script>
    function showMeetingDetailPopup(taskId, meetingId) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/meeting-detail/" + meetingId,
            type: "get"
        }).done(function (response) {
            var date = moment(response.data.reminderDate);
            modalMeetingDetail.find(".taskId").val(taskId);
            modalMeetingDetail.find(".meetingId").val(meetingId);
            modalMeetingDetail.find(".lbNote").html(response.data.noteTm);
            modalMeetingDetail.find(".lbDate").html(date.format("MM/DD/YYYY"));
            modalMeetingDetail.find(".lbTime").html(date.format("HH:mm"));
            modalMeetingDetail.modal();
        }).always(function () {
            hidePropzyLoading();
        });
        return false;
    }
</script>