$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$(".sub-task").hide();
$(".toggleSubTask").on("click", function (event) {
    event.preventDefault();
    var taskId = $(this).parents("tr").attr("data-task-id");
    $(".sub-task").hide();
    $(".sub-task-" + taskId).show();
});
var modalMeetingDetail = $("#modalMeetingDetail");
var modalReassignMeeting = $("#modalReassignMeeting");
var modalConfirmMeetingRequest = $("#modalConfirmMeetingRequest");
modalMeetingDetail.find(".btnDoneTask").on("click", function (event) {
    event.preventDefault();
    var taskId = modalMeetingDetail.find(".taskId").val();
    acceptMeeting(taskId);
    return false;
});

function acceptMeeting(taskId) {
    showPropzyLoading();
    var postData = {
        "taskId": parseInt(taskId)
    };
    $.ajax({
        url: "/crm-dashboard/accept-meeting",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        modalMeetingDetail.modal("hide");
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

modalMeetingDetail.find(".btnShowReassign").on("click", function (event) {
    event.preventDefault();
    var taskId = modalMeetingDetail.find(".taskId").val();
    var meetingId = modalMeetingDetail.find(".meetingId").val();
    showReassingMeetingPopup(taskId, meetingId);
});
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
//window.location = "/deal/update/" + meetingData.dealId;
            modalMeetingDetail.hide();
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
modalConfirmMeetingRequest.find(".btnSave").on("click", function (event) {
    event.preventDefault();
    var postData = {
        "meetingId": modalConfirmMeetingRequest.find(".meetingId").val(),
        "taskId": modalConfirmMeetingRequest.find(".taskId").val(),
        "purpose": modalConfirmMeetingRequest.find(".purpose").val(),
        "buyFor": modalConfirmMeetingRequest.find(".buyFor").val(),
        "whoDecision": modalConfirmMeetingRequest.find(".whoDecision").val(),
        "price": modalConfirmMeetingRequest.find(".price").val(),
        "area": modalConfirmMeetingRequest.find(".area").val(),
        "budgetType": modalConfirmMeetingRequest.find(".budgetType").val(),
        "borrowPrice": modalConfirmMeetingRequest.find(".borrowPrice").val(),
        "time": modalConfirmMeetingRequest.find(".time").val(),
        "size": modalConfirmMeetingRequest.find(".size").val(),
        "direction": modalConfirmMeetingRequest.find(".direction").val(),
        "propertyPosition": modalConfirmMeetingRequest.find(".propertyPosition").val(),
        "importantFactor": modalConfirmMeetingRequest.find(".importantFactor").val(),
        "customer": {
            "job": modalConfirmMeetingRequest.find(".job").val(),
            "age": modalConfirmMeetingRequest.find(".age").val(),
            "purpose": modalConfirmMeetingRequest.find(".purpose").val(),
            "numberOfFamilyMembers": modalConfirmMeetingRequest.find(".numberOfFamilyMembers").val(),
            "accommodationType": modalConfirmMeetingRequest.find(".accommodationType").val(),
            "income": modalConfirmMeetingRequest.find(".income").val(),
            "address": modalConfirmMeetingRequest.find(".address").val()
        }
    };

    showPropzyLoading();
    $.ajax({
        url: "/crm-dashboard/confirm-meeting-request",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        modalConfirmMeetingRequest.modal('hide');
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
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

/*
 $(".btn-show-detail").on("click", function(event){
 event.preventDefault();
 var taskId = $(this).parents("tr").attr("data-task-id");
 showMeetingDetailPopup(taskId);
 });
 */

function doneTask(id, meetingId, defineId) {
    if (defineId == 32) {
        modalConfirmMeetingRequest.find(".taskId").val(id);
        modalConfirmMeetingRequest.find(".meetingId").val(meetingId);
        modalConfirmMeetingRequest.modal();
        return false;
    }

    showPropzyLoading();
    $.ajax({
        url: "/crm-dashboard/done-task/" + id,
        type: "get"
    }).done(function (response) {
        modalMeetingDetail.modal("hide");
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}