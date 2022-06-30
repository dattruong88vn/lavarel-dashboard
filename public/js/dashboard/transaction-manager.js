$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
function getTaskBox() {
    $.ajax({
        'url': '/dashboard/get-task-box',
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            var dataLength = response.data.length;
            for (var i = 0; i < dataLength; i++) {
                var boxItem = response.data[i];
                var priority = boxItem.priority;
                var box = $("#tasks .box-" + (i + 1));
                box.find('.title').html(boxItem.label);
                var content = "<ul class='task-list nav nav-stacked'>";
                var taskItems = boxItem.list;
                var taskItemCount = taskItems.length;
                for (var taskIndex = 0; taskIndex < taskItemCount; taskIndex++) {
                    var taskItem = taskItems[taskIndex];
                    //console.log(taskItem);
                    content += "<li><a href='/dashboard/sub-tasks/" + priority + "/" + taskItem.defineId + "' >" + taskItem.name + " <span class='pull-right badge'> " + taskItem.numberOfChilds + " </span></a></li>";
                }
                content += "</ul>";
                box.find('.box-body').html(content);
            }
        }
    }).always(function () {

    });
}

getTaskBox();
$(document).ready(function () {
    setInterval(getTaskBox, 10000);
    console.log(window.location.hash);
});

function doneCrmTask(taskId, leadId, defineId, meetingId) {

    switch (defineId) {
        case 50:
            tmGenerateDeal(taskId, leadId);
            break;
        case 51:
            showUpdateOrCreateMeetingForm(meetingId);
            break;
        case 30:
            setDoneCrmTask(taskId);
            break;
        default:
            setDoneCrmTask(taskId);
    }
}

var modalCreateMeeting = $("#modalCreateMeeting");

function tmGenerateDeal(taskId, leadId) {
    var postData = {
        "leadID": leadId,
        "taskId": taskId
    };
    showPropzyLoading();
    window.location = "/lead/detail/" + leadId;
    /*
     $.ajax({
     url: "/lead/tm-generate-deal",
     type: "post",
     data: JSON.stringify(postData)
     }).done(function (response) {
     showPropzyAlert(response.message);
     if (response.result) {
     window.location.reload();
     }
     }).always(function () {
     hidePropzyLoading();
     });
     */
}


function setDoneCrmTask(taskId) {
    showPropzyLoading();
    $.ajax({
        url: "/crm-dashboard/done-task/" + taskId,
        type: "get"
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });

}


$(".btnUpdateMeeting").on("click", function (event) {
    event.preventDefault();
    var whenDate = modalCreateMeeting.find(".whenDate").val();
    var whenTime = modalCreateMeeting.find(".whenTime").val();
    var date = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm");
    var meetingData = {
        "id": modalCreateMeeting.find(".meetingId").val(),
        "reminderDate": date.unix() * 1000,
        "assignTo": parseInt(modalCreateMeeting.find(".assignTo").val()),
        //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
        "noteTm": modalCreateMeeting.find(".noteTm").val()
    };
    $("#isSpecialDeal").prop("checked", true);
    showPropzyLoading();
    $.ajax({
        url: "/deal/update-meeting",
        type: "post",
        data: JSON.stringify(meetingData)
    }).done(function (response) {
        modalCreateMeeting.modal('hide');
        showPropzyAlert(response.message);
        if (response.result) {
            //window.location = "/deal/update/" + meetingData.dealId;
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

function showTaskDetail(taskId, defineId, leadId) {
    if ($.inArray(defineId, [30, 51]) >= 0) {
        showPropzyLoading();
        $("#modalTaskDetail .taskContent").load("/crm-dashboard/task-detail/" + taskId + "/?defineId=" + defineId + " #tasks", null, function () {
            $(".taskContent .btn").remove();
            $("#tasks .content-header").remove();
            $("#modalTaskDetail").modal();
            hidePropzyLoading();
        });
    } else if (defineId == 10000) {
        window.location = "/lead/detail/" + leadId;
        //} else if (defineId == 57) {
    } else if ($.inArray(defineId, [57, 101, 106]) >= 0) {
        showPropzyLoading();
        window.location = "/crm-dashboard/task-detail/" + taskId + "?defineId=" + defineId;
    }
    return false;
}
$("#modalTaskDetail").on("hide.bs.modal", function () {
    if (action == "show_task_detail") {
        window.location = "/";
    }
});