<div id="modalReassignMeeting" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">            
            <div class="modal-header"></div>
            <div class="modal-body"></div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>
<script>
    var ReassignMeeting = (function () {
        var modalReassignMeeting = $("#modalReassignMeeting");
        var showModalReassingMeeting = function (taskId, meetingId) {
            showPropzyLoading();
            $.ajax({
                url: "/deal/meeting-detail/" + meetingId,
                type: "get"
            }).done(function (response) {
                modalReassignMeeting.find(".taskId").val(taskId);
                modalReassignMeeting.find(".meetingId").val(meetingId);
                modalReassignMeeting.find(".reminderDate").val(response.data.reminderDate);
                findFreeCrms(modalReassignMeeting, response.data.reminderDate)
                modalReassignMeeting.modal();

                modalReassignMeeting.find(".btnReassignMeeting").on("click", function (event) {
                    event.preventDefault();
                    var postData = {
                        "meetingId": modalReassignMeeting.find(".meetingId").val(),
                        "assignTo": modalReassignMeeting.find(".assignTo").val(),
                        "reasonId": modalReassignMeeting.find(".reasonId").val(),
                        "reasonNote": modalReassignMeeting.find(".reasonNote").val(),
                        "taskId": modalReassignMeeting.find(".taskId").val()
                    };
                    if (!validateReassignMeeting(postData)) {
                        return false;
                    }
                    showPropzyLoading();
                    $.ajax({
                        url: "/crm-dashboard/reassign-meeting",
                        type: "post",
                        data: JSON.stringify(postData)
                    }).done(function (response) {
                        modalReassignMeeting.modal('hide');
                        showPropzyAlert(response.message);
                        if (response.result) {
                            window.location = "/";
                            modalMeetingDetail.hide();
                        }
                    }).always(function () {
                        hidePropzyLoading();
                    });
                });
            }).always(function () {
                hidePropzyLoading();
            });
            return false;
        }

        function saveMeeting(meetingData) {
            modalCreateMeeting.find(".errors").html("");
            var isValid = true;
            if (!meetingData.assignTo) {
                modalCreateMeeting.find(".assignTo").parent().find(".errors").html("Chọn người phụ trách meeting.");
                isValid = false;
            }
            if (meetingData.reminderDate == null) {
                modalCreateMeeting.find(".whenDate").parent().parent().find(".errors").html("Chọn ngày / giờ");
                isValid = false;
            }
            if (!meetingData.noteTm.trim()) {
                modalCreateMeeting.find(".noteTm").parent().find(".errors").html("Nhập ghi chú");
                isValid = false;
            }
            if (!isValid) {
                return false;
            }
            showPropzyLoading();
            $.ajax({
                url: "/deal/create-meeting",
                type: "post",
                data: JSON.stringify(meetingData)
            }).done(function (response) {
                modalCreateMeeting.modal('hide');
                $("#isSpecialDeal").prop("checked", response.result);
                showPropzyAlert(response.message);
                if (response.result) {
                    //window.location = "/deal/update/" + meetingData.dealId;
                    window.location.reload();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
        return {
            showModalReassingMeeting: showModalReassingMeeting
        };
    })();

</script>