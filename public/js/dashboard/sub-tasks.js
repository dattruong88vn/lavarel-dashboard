var taskDataTable = null;
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    taskDataTable = $('.task-data-table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": '/dashboard/sub-tasks-data/' + priority + '/' + parentId,
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        "columns": [
            {"data": "name", render: renderName},
            {"data": "customerName"},
            {"data": "customerPhone"},
            {"data": "taskId", render: renderAction}
        ]
    });
    taskDataTable.on('order.dt search.dt', function () {
        taskDataTable.column(0, {search: 'applied', order: 'applied'}).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
});
var renderName = function (data, type, object) {
    var dealOrLead = 'Lead Id: ' + object.leadId;
    if (object.dealId) {
        dealOrLead = 'Deal Id: ' + object.dealId;
    }
    return data + " - " + dealOrLead;
};
var renderAction = function (data, type, object) {
    var buttonRender = new ButtonRender(object);
    var returnValue = buttonRender.render();
    //returnValue += object.defineId;
    return returnValue;
};
var createTaskModel = {
    "taskId": null,
    "assignedTo": userId,
    "defineId": null,
    "name": null,
    "customerId": null,
    "customerName": null,
    "dealId": null,
    "leadId": null,
    "reminderDate": null,
    "fromTaskId": null
};
var doneTaskModel = {
    "taskId": null,
    "action": null,
    "reminderDate": null
};
var currentButton = null;
var isSetDone = false;
function callSuccess(selector, action) {
    currentButton = $(selector);
    $("#modalNoteTask .action").val(action);
    $("#modalNoteTask").modal();
}
$(".btnSaveNoteTask").on('click', function () {
    var defineId = parseInt($(currentButton).attr('data-define-id'));
    var taskId = $(currentButton).attr('data-task-id');
    var leadId = $(currentButton).attr('data-lead-id') ? parseInt($(currentButton).attr('data-lead-id')) : null;
    var action = $("#modalNoteTask .action").val();
    var noteTaskData = {
        "taskId": taskId,
        "note": $("#modalNoteTask .note").val()
    };
    if (noteTaskData.note.trim() === "") {
        $("#modalNoteTask .note").parent().find(".errors").html("Nhập nội dung");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        'url': '/task/add-note/' + taskId,
        'type': 'post',
        'data': JSON.stringify(noteTaskData)
    }).done(function (response) {
        $("#modalNoteTask").modal('hide');
        if (response.result) {
            if ($.inArray(defineId, [2, 4, 6, 15]) !== -1) {
                setDoneTask(defineId, taskId, action, null, leadId, function (response) {
                    if (response.result) {
                        $(currentButton).parents('td').find(".view-detail").each(function () {
                            this.click();
                        });
                    }
                });
            } else if ($.inArray(defineId, [3, 5, 7, 8, 9, 11]) !== -1) {
                createTaskModel.customerId = $(currentButton).attr('data-customer-id');
                createTaskModel.dealId = $(currentButton).attr('data-deal-id') ? parseInt($(currentButton).attr('data-deal-id')) : null;
                createTaskModel.leadId = leadId;
                createTaskModel.customerName = $(currentButton).attr('data-customer-name');
                createTaskModel.fromTaskId = taskId;
                showCreateTaskModal();
            }
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});


function createTask(selector) {
    //var defineId = parseInt($(selector).attr('data-define-id'));
    var taskId = $(selector).attr('data-task-id');
    var leadId = $(selector).attr('data-lead-id') ? parseInt($(selector).attr('data-lead-id')) : null;
    createTaskModel.customerId = $(selector).attr('data-customer-id');
    createTaskModel.dealId = $(selector).attr('data-deal-id') ? parseInt($(selector).attr('data-deal-id')) : null;
    createTaskModel.leadId = leadId;
    createTaskModel.customerName = $(selector).attr('data-customer-name');
    createTaskModel.fromTaskId = taskId;
    showCreateTaskModal();

}
function negotiate(dealId, fromTaskId) {
    var postData = {
        "dealId": dealId,
        "fromTaskId": fromTaskId
    };
    showPropzyLoading();
    $.ajax({
        'url': '/task/negotiate',
        'type': 'post',
        'data': JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            taskDataTable.ajax.reload();
        }
        showPropzyAlert(response.message);

    }).always(function () {
        hidePropzyLoading();
    });
}
function callLater(taskId) {
    doneTaskModel.taskId = taskId;
    doneTaskModel.action = 'notCalled';
    var modal = $("#editTaskModal");
    modal.find("#whenDate").datepicker({
        autoclose: true
    });
    modal.find("#whenTime").timepicker();
    modal.modal();
}
$(".btnSaveEditTask").on("click", function (event) {
    event.preventDefault();
    var modal = $("#editTaskModal");
    var whenDate = modal.find("#whenDate").val();
    var whenTime = modal.find("#whenTime").val();
    modal.find('.errors').html();
    var reminderDate = null;
    var isValidated = true;
    if (!whenDate) {
        modal.find("#whenDate").parent().parent().find('.errors').html('Chọn Ngày');
        isValidated = false;
    }
    if (!whenTime) {
        modal.find("#whenTime").parent().parent().find('.errors').html('Chọn giờ');
        isValidated = false;
    }
    if (isValidated) {
        reminderDate = moment(whenDate + " " + whenTime, "MM/DD/YYYY hh:mm A").unix() * 1000;
        if (reminderDate < moment().unix() * 1000) {
            modal.find("#whenDate").parent().parent().find('.errors').html('Ngày phải lớn hơn hiện tại');
            isValidated = false;
        }
    }
    if (!isValidated) {
        return false;
    }
    setDoneTask(null, doneTaskModel.taskId, doneTaskModel.action, reminderDate, null, function (response) {
        console.log('hide');
        $("#editTaskModal").modal('hide');
    });
});
function showCreateTaskModal() {
    event.preventDefault();
    var subjectHtml = "<option value=''>Chọn tiêu đề</option>";
    var modal = $("#createTaskModal");
    $.ajax({
        'url': '/common/get-task-definitions',
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            var itemsCount = response.data.length;
            for (var i = 0; i < itemsCount; i++) {
                var subjectItem = response.data[i];
                subjectHtml += "<option disabled >" + subjectItem.name + "</option>";
                var childItemsCount = subjectItem.childsList.length;
                for (var j = 0; j < childItemsCount; j++) {
                    var childSubjectItem = subjectItem.childsList[j];
                    subjectHtml += "<option value='" + childSubjectItem.name + "' data-id='" + childSubjectItem.defineId + "'>------- " + childSubjectItem.name + "</option>";
                }
            }
        }
        $("#createTaskModal .subject").html(subjectHtml);
    }).always(function () {

    });

    $("#createTaskModal #whenDate").datepicker({
        autoclose: true
    });
    modal.find("#whenTime").timepicker();
    $("#createTaskModal").modal();
}
$("#createTaskModal .subject").change(function () {
    $("#createTaskModal .defineId").val($(this).find("option:selected").attr('data-id'));
});
$(".btnSaveTask").on("click", function (event) {
    event.preventDefault();
    var modal = $("#createTaskModal");
    modal.find('.errors').html('');
    createTaskModel.defineId = modal.find(".defineId").val();
    createTaskModel.name = modal.find(".subject").val();
    modal.find('.customerName').html(createTaskModel.customerName);
    var isValidated = true;
    var whenDate = modal.find("#whenDate").val();
    var whenTime = modal.find("#whenTime").val();
    if (!whenDate) {
        modal.find("#whenDate").parent().parent().find('.errors').html('Chọn Ngày');
        isValidated = false;
    }
    if (!whenTime) {
        modal.find("#whenTime").parent().parent().find('.errors').html('Chọn giờ');
        isValidated = false;
    }
    if (isValidated) {
        createTaskModel.reminderDate = moment(whenDate + " " + whenTime, "MM/DD/YYYY hh:mm A").unix() * 1000;
        if (createTaskModel.reminderDate < moment().unix() * 1000) {
            modal.find("#whenDate").parent().parent().find('.errors').html('Ngày phải lớn hơn hiện tại');
            isValidated = false;
        }
    }
    if (!createTaskModel.name) {
        modal.find(".subject").parent().find('.errors').html('Chọn tên task');
        isValidated = false;
    }
    if (!isValidated) {
        return false;
    }
    //console.log(createTaskModel);
    //return false;
    delete createTaskModel.customerName;
    showPropzyLoading();
    $.ajax({
        'url': '/task/create',
        'type': 'post',
        'data': JSON.stringify(createTaskModel)
    }).done(function (response) {
        if (response.result) {
            taskDataTable.ajax.reload();
        }
        modal.modal('hide');
        showPropzyAlert(response.message);

    }).always(function () {
        hidePropzyLoading();
    });
});
function showEditScheduleModal(scheduleId, taskId) {
    $("#makeScheduleModal").modal();
}

function setDoneTask(defineId, taskId, action, reminderDate, leadId, successCallBack) {
    var postData = {
        "taskId": taskId,
        "action": action,
        "reminderDate": (reminderDate ? reminderDate : null)
    };
    showPropzyLoading();
    $.ajax({
        'url': '/task/set-done',
        'type': 'post',
        'data': JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            if (defineId == 6) {
                window.location = '/lead/detail/' + leadId;
            } else {
                taskDataTable.ajax.reload();
            }
        }
        if (successCallBack != undefined) {
            successCallBack(response);
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}
function doneTaskSchedule(dealId, leadId, taskId) {
    var action = "schedule";
    setDoneTask(null, taskId, action, null, null, function () {
        var link = '/lead/detail/' + leadId;
        if (dealId) {
            link = '/deal/detail/' + dealId;
        }
        window.location = link;
    });
}
function working_on() {
    showPropzyAlert('Đang làm chưa xong!');
}
function ButtonRender(object) {
    var btnCallSuccessGroup = [2, 3, 4, 5, 6, 7, 8, 9, 11, 15];
    var btnCallLaterGroup = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
    var btnUpdateScheduleGroup = [3];
    var btnPositiveGroup = [10, 16];
    var btnImpositiveGroup = [10, 16];
    var btnScheduleGroup = [12];
    var btnNotScheduleGroup = [12];
    var btnNegotiateGroup = [14];
    var btnCreateTaskGroup = [14];
    var btnDealOrLeadDetailGroup = [18];
    var btnDealDetailGroup = [20, 21, 23, 24, 29, 26, 28];
    var btnFinishTask = [18, 20, 21, 23, 24, 29, 26, 28];
    this.render = function () {
        var returnValue = "";
        if ($.inArray(object.defineId, btnCallSuccessGroup) !== -1) {
            returnValue += this.renderButtonCallSuccess(object);
        }
        if ($.inArray(object.defineId, btnCallLaterGroup) !== -1) {
            returnValue += this.renderButtonCallLater(object);
            returnValue += this.renderButtonDealOrLeadDetail(object);
        }
        if ($.inArray(object.defineId, btnUpdateScheduleGroup) !== -1) {
            returnValue += this.renderButtonUpdateSchedule(object);
        }
        if ($.inArray(object.defineId, btnPositiveGroup) !== -1) {
            returnValue += this.renderButtonPositive(object);
        }
        if ($.inArray(object.defineId, btnImpositiveGroup) !== -1) {
            returnValue += this.renderButtonImpositive(object);
        }
        if ($.inArray(object.defineId, btnScheduleGroup) !== -1) {
            returnValue += this.renderButtonSchedule(object);
        }
        if ($.inArray(object.defineId, btnNotScheduleGroup) !== -1) {
            returnValue += this.renderButtonNotSchedule(object);
        }
        if ($.inArray(object.defineId, btnNegotiateGroup) !== -1) {
            returnValue += this.renderButtonNegotiate(object);
        }
        if ($.inArray(object.defineId, btnCreateTaskGroup) !== -1) {
            returnValue += this.renderButtonCreateTask(object);
        }
        if ($.inArray(object.defineId, btnDealOrLeadDetailGroup) !== -1) {
            returnValue += this.renderButtonDealOrLeadDetail(object);
        }
        if ($.inArray(object.defineId, btnDealDetailGroup) !== -1) {
            returnValue += this.renderButtonDealDetail(object);
        }
        if ($.inArray(object.defineId, btnFinishTask) !== -1) {
            returnValue += this.renderButtonFinishTask(object);
        }
        //returnValue += object.defineId;
        return returnValue;
    };
    this.renderButtonCallSuccess = function (object) {
        var returnValue = " <button class='btn btn-success' data-task-id='" + object.taskId + "' data-define-id=" + object.defineId + " data-customer-id='" + object.customerId + "' data-customer-name='" + object.customerName + "' data-deal-id='" + (object.dealId ? object.dealId : '') + "' data-lead-id='" + object.leadId + "' onclick=\"return callSuccess(this, 'called');\">Gọi được</button>";
        return returnValue;
    };
    this.renderButtonCallLater = function (object) {
        var returnValue = " <button class='btn btn-danger' onclick=\"return callLater(" + object.taskId + ");\">Gọi lại sau</button>";
        return returnValue;
    };
    this.renderButtonUpdateSchedule = function (object) {
        var returnValue = " <button class='btn' onclick=\"return showEditScheduleModal(" + object.scheduleId + ", " + object.dealId + ", " + object.leadId + ");\">Sửa ĐLX</button>";
        return returnValue;
    };
    this.renderButtonPositive = function (object) {
        var returnValue = " <button class='btn' onclick=\"return setDoneTask(" + object.defineId + ", " + object.taskId + ", 'positive');\">Khả thi</button>";
        return returnValue;
    };
    this.renderButtonImpositive = function (object) {
        var returnValue = " <button class='btn'  data-task-id='" + object.taskId + "' data-define-id=" + object.defineId + " data-customer-id='" + object.customerId + "' data-customer-name='" + object.customerName + "' data-deal-id='" + (object.dealId ? object.dealId : '') + "' data-lead-id='" + object.leadId + "' onclick=\"return createTask(this);\">Không khả thi</button>";
        return returnValue;
    };
    this.renderButtonSchedule = function (object) {
        var returnValue = " <button class='btn' onclick=\"return doneTaskSchedule(" + object.dealId + ", " + object.leadId + ", " + object.taskId + ");\">Đặt lịch xem</button>";
        return returnValue;
    };
    this.renderButtonNotSchedule = function (object) {
        var returnValue = " <button class='btn' onclick=\"return setDoneTask(" + object.defineId + ", " + object.taskId + ", 'notSchedule');\">Không đặt lịch xem</button>";
        return returnValue;
    };
    this.renderButtonNegotiate = function (object) {
        var returnValue = " <button class='btn' onclick=\"return negotiate(" + object.dealId + ", " + object.taskId + ");\">Thương lượng</button>";
        return returnValue;
    };
    this.renderButtonCreateTask = function (object) {
        var returnValue = " <button class='btn'  data-task-id='" + object.taskId + "' data-define-id=" + object.defineId + " data-customer-id='" + object.customerId + "' data-customer-name='" + object.customerName + "' data-deal-id='" + (object.dealId ? object.dealId : '') + "' data-lead-id='" + object.leadId + "' onclick=\"return createTask(this);\">Tạo task</button>";
        return returnValue;
    };
    this.renderButtonDealOrLeadDetail = function (object) {
        var link = '/lead/detail/' + object.leadId;
        var btnText = 'lead';
        if (object.dealId) {
            link = '/deal/detail/' + object.dealId;
            btnText = 'deal'
        }
        var returnValue = " <a class='btn btn-warning view-detail' target='_blank' href='" + link + "' >Chi tiết " + btnText + "</a>";
        return returnValue;
    };
    this.renderButtonDealDetail = function (object) {
        var returnValue = " <a class='btn btn-warning view-detail' target='_blank' href='/deal/detail/" + object.dealId + "' >Xem chi tiết deal</a>";
        return returnValue;
    };
    this.renderButtonFinishTask = function (object) {
        var returnValue = " <button class='btn btn-success' onclick=\"return setDoneTask(" + object.defineId + ", " + object.taskId + ", 'done');\">Done</button>";
        return returnValue;
    };
}
var isEditingSchedule = true;
function showEditScheduleModal(scheduleId, dealId, leadId) {
    showPropzyLoading();
    var apiUrl = '/lead';
    if (dealId) {
        apiUrl = '/deal';
    }
    $.ajax({
        "url": apiUrl + '/schedule-detail/' + scheduleId,
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            isEditingSchedule = true;
            var addressList = [];
            var listingIdLinks = [];
            var listingIds = [];
            var briefFormLinks = [];
            var briefFormIds = [];

            $(response.data.listingsList).each(function (index, item) {
                if ($(this).prop("disabled")) {
                    return;
                }
                var listingId = '<span class="listing-group">'
                        + '<a href="/listing/' + item.id.rlistingId + '" target="_blank" >' + item.id.rlistingId + '</a>'
                        + '; </span>';
                listingIdLinks.push(listingId);
                listingIds.push(item.id.rlistingId);
                //var address = $(this).parents('tr').find('span.address').text();
                //addressList.push(address);
            });
            $(response.data.briefFormsList).each(function (index, item) {
                if ($(this).prop("disabled")) {
                    return;
                }
                var itemId = '<span class="listing-group">'
                        + '<a href="/listing/' + item.id.briefFormId + '" target="_blank" >' + item.id.briefFormId + '</a>'
                        + '; </span>';
                briefFormLinks.push(itemId);
                briefFormIds.push(item.id.briefFormId);
                //var address = $(this).parents('tr').find('span.address').text();
                //addressList.push(address);
            });

            $("#makeScheduleModal #dealId").val(response.data.dealId);
            $("#makeScheduleModal #leadId").val(response.data.leadId);
            $("#makeScheduleModal #scheduleId").val(response.data.scheduleId);
            $("#makeScheduleModal #customerId").val(response.data.customerId);
            $("#makeScheduleModal .customerName").html(response.data.customerName);
            $("#makeScheduleModal .phone").html(response.data.customerPhone);
            $("#makeScheduleModal .email").html(response.data.customerEmail);
            $("#makeScheduleModal .address").val(response.data.address);
            $("#makeScheduleModal #whenDate").val(moment(response.data.scheduleTime).format('MM/DD/YYYY'));
            $("#makeScheduleModal #whenTime").val(moment(response.data.scheduleTime).format('HH:mm'));
            $("#makeScheduleModal .note").val(response.data.note);
            if (listingIds.length > 0) {
                $("#makeScheduleModal .listings").html(listingIdLinks.join(''));
                $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
                $(".btnAddlisting").attr('href', '#listing-to-send');
                scheduleType = "listing";
            }
            if (briefFormIds.length > 0) {
                $("#makeScheduleModal .listings").html(briefFormLinks.join(''));
                $("#makeScheduleModal .briefFormIds").val(briefFormIds.join(';'));
                $(".btnAddlisting").attr('href', '#brief-form-list');
                scheduleType = "brief_form";
            }
            event.preventDefault();
            $("#makeScheduleModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}

$('#formMakeSchedule #whenTime').timepicker({
    showMeridian: false
});
$(".btnSaveSchedule").on("click", function (event) {
    event.preventDefault();
    var theForm = $("#formMakeSchedule");
    $("#formMakeSchedule .errors").html('');
    var address = theForm.find('.address');
    var isValidated = true;
    if (address.val().trim() === "") {
        address.parent().find('.errors').html('Nhập địa điểm');
        isValidated = false;
    }
    var date = theForm.find('#whenDate');
    if (date.val().trim() === "") {
        date.parent().parent().find('.errors').html('Chọn ngày');
        isValidated = false;
    }
    var time = theForm.find('#whenTime');
    if (time.val().trim() === "") {
        time.parent().parent().find('.errors').html('Chọn giờ');
        isValidated = false;
    }
    var theDate = moment(date.val() + " " + time.val(), 'MM/DD/YYYY HH:mm');
    var now = moment();
    console.log(theDate);
    console.log(theDate.isBefore(now));
    if (theDate.isBefore(now)) {
        date.parent().parent().find('.errors').html('Ngày phải lớn hơn thời điểm hiện tại');
        isValidated = false;
    }
    if (!isValidated) {
        return false;
    }
    var dealId = $("#makeScheduleModal #dealId").val();
    var apiUrl = '/lead';
    if (dealId) {
        apiUrl = '/deal';
    }

    showPropzyLoading();
    $.ajax({
        'url': apiUrl + '/make-schedule',
        'type': 'POST',
        'data': $("#formMakeSchedule").serialize()
    }).done(function (response) {
        if (response.result) {
            $("#makeScheduleModal").modal('hide');
            //generateScheduleTable(5);
            //getEmailListings();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
});

$(".btnCancelSchedule").on("click", function (event) {
    event.preventDefault();
    $("#makeScheduleModal").modal('hide');
});


