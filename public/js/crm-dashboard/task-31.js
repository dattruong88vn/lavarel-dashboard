$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
var meetingId = $("#formCreateMeeting").find(".meetingId").val();
var taskId = $("#formCreateMeeting").find(".taskId").val();
$(".btnShowReassign").on("click", function (event) {
    event.preventDefault();
    showReassingMeetingPopup(taskId, meetingId);
});
ModalRejectMeeting.init(taskId, meetingId);
function saveMeeting(meetingData) {
    modalCreateMeeting.find(".errors").html("");
    var isValid = true;
    if (!meetingData.assignTo) {
        modalCreateMeeting
          .find(".assignTo")
          .parent()
          .find(".errors")
          .html("Chọn người phụ trách meeting.");
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





function validateReassignMeeting(data) {
    modalReassignMeeting.find(".errors").html("");
    var isValid = true;
    if (!data.assignTo) {
        modalReassignMeeting
          .find(".errors-assignTo")
          .html("Chọn người phụ trách meeting.");
        isValid = false;
    }
    if (!data.reasonId) {
        modalReassignMeeting.find(".errors-reasonId").html("Chọn lý do.");
        isValid = false;
    }
    if (!data.reasonNote) {
        modalReassignMeeting.find(".errors-reasonNote").html("nhập ghi chú.");
        isValid = false;
    }
    return isValid;
}
function checkIsMyTaskAvailable() {
    $.ajax({
        url: "/crm-dashboard/task-detail-json/" + taskId + "?defineId=" + defineId,
        type: "get"
    }).done(function (response) {
        if (response.assignTo != myUserId) {
            window.location.reload();
        }
    }).always(function () {

    });
}
setInterval(checkIsMyTaskAvailable, 20000);