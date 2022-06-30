$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

var calendarMeetings = {
    ini_events: function(ele) {
        ele.each(function() {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });

        });
    }
}

var meeting = {
    init: function() {
        if ($("#meetingId").val()) {
            requestCallback.initCallback(2);
            meeting.getMeeting(function(response) {
                requestCallback.addCallbackToQueue();
                if (response.result) {
                    $("#meeting-modal").modal('show');
                    // Init Lso Id
                    $("#meetingLsoId").val(response.data.lsoId);
                    // Init datepicker
                    $("#meeting-date").datepicker({
                        format: 'dd/mm/yyyy',
                        autoclose: true
                    });
                    $("#meeting-date").datepicker('setDate', moment(response.data.startDate).format('DD/MM/YYYY'));

                    $("#meeting-time").timepicker();
                    $("#meeting-time").timepicker('setTime', moment(response.data.startDate).format('hh:mm A'));

                    // Init lay danh sach nhan vien 
                    meeting.getLsoMembers(function(response2) {
                        requestCallback.addCallbackToQueue();
                        if (response.result) {
                            var members = [];
                            $.map(response2.data, function(item) {
                                members.push({
                                    id: item.userId,
                                    text: item.name
                                });
                            });
                            $("#meeting-lso-members").select2({
                                data: members
                            }).select2('val', response.data.assignedTo, false);
                        }
                    });
                    $("#meeting-address").val(response.data.address);
                    // Note
                    CKEDITOR.instances['meetingNote'].setData(response.data.note);
                    // Hidden field
                    $("#createdBy").val(response.data.createdBy);
                    $("#createdDate").val(response.data.createdDate);
                    $("#updatedBy").val(response.data.updatedBy);
                    $("#updatedDate").val(response.data.updatedDate);
                    $("#isClosed").val((response.data.isClosed) ? "1" : "0");
                }
            });
        } else {
            requestCallback.initCallback();
            // Init datepicker
            $("#meeting-date").datepicker({format: 'dd/mm/yyyy', autoclose: true});
            $("#meeting-time").timepicker();

             $("#meeting-date").datepicker('setDate', $("#meetingDate").val());

            $("#meeting-time").timepicker({
                defaultTime: $("#meetingTime").val()
            });
            $("#meeting-modal").modal('show');
            // Init lay danh sach nhan vien 
            requestCallback.sendRequest();
            meeting.getLsoMembers(function(response) {
                requestCallback.addCallbackToQueue();            
                if (response.result) {
                    var members = [];
                    $.map(response.data, function(item) {
                        members.push({id: item.userId, text: item.name});
                    });                
                    $("#meeting-lso-members").select2({data: members}).select2('val', $("#hiddenLoggedInUserId").val(), false);
                }
            });
            // Note
            CKEDITOR.replace('meetingNote');
        }
    },
    getMeeting: function(callback) {
        $.ajax({
            url: "/lso/get-meeting-detail/" + $("#meetingId").val(),
            type: "GET"
        }).done(function(response) {
            callback(response);
        });
    },
    updateMeeting: function() {
        if (meeting.validateMeeting()) {
            showPropzyLoading();
            meeting.updateListingMeeting(function(response) {
                hidePropzyLoading();
                if (response.result) {
                    $("#meeting-modal").modal('hide');
                    $('#calendar').fullCalendar('refetchEvents');
                }
                showPropzyAlert(response.message);
            });
        } else {
            showPropzyAlert("Xin vui long kiem tra lai gia tri nhap");
        }
    },
    updateListingMeeting: function(callback) {
        var startDate = $("#meeting-date").val() + " " + $("#meeting-time").val();
        var formatStartDate = moment(startDate, 'DD/MM/YYYY hh:mm A').valueOf();
        var postData = {
            "id": parseInt($("#meetingId").val()),
            "assignedTo": parseInt($("#meeting-lso-members").val()),
            "address": $("#meeting-address").val(),
            "lsoId": parseInt($("#meetingLsoId").val()),
            "startDate": formatStartDate,
            "meetingTime": 30,
            "note": CKEDITOR.instances.meetingNote.getData(),
            "createdBy": parseInt($("#createdBy").val()),
            "createdDate": parseInt($("#createdDate").val()),
            "updatedBy": parseInt($("#updatedBy").val()),
            "updatedDate": parseInt($("#updatedDate").val()),
            "isClosed": ($("#isClosed").val() == 1) ? true : false
        }

        $.ajax({
            url: "/lso/create-listing-meeting",
            type: "POST",
            data: JSON.stringify(postData)
        }).done(function(response) {
            callback(response);
        });
    },
    getLsoMembers: function(callback) {
        $.ajax({
            url: "/lso/get-lso-members",
            type: "GET",
            success: function(response) {
                callback(response);
            }
        });
    },
    validateMeeting: function() {
        var isValid = true;
        var listFields = [{
                id: "#meeting-date",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập ngày"
            },
            {
                id: "#meeting-time",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập giờ"
            },
            {
                id: "#meeting-address",
                field: "text",
                type: "empty",
                message: "Xin vui lòng nhập địa chỉ"
            },
            {
                id: "#meeting-lso-members",
                field: "text",
                type: "empty",
                message: "Xin vui lòng chọn nhân viên LSO"
            },
            {
                id: "#meetingNote",
                field: "textarea",
                type: "empty",
                message: "Xin vui lòng nhập ghi chú"
            },
        ];
        // Validate
        $.map(listFields, function(item) {
            if (item.type == "empty") {
                switch (item.field) {
                    case "text":
                        if (!$(item.id).val()) {
                            isValid = false;
                            $(item.id).parent().append("<code>" + item.message + "</code>");
                            $(item.id).css("border-color", "red");
                        }
                        break;
                    case "textarea":
                        if (item.id == "#meetingNote") {
                            if (CKEDITOR.instances.meetingNote.getData() == "") {
                                isValid = false;
                                $(item.id).css("border-color", "red");
                                $(item.id).parent().append("<code>" + item.message + "</code>");
                            }
                        }
                        break;
                }
            }
        });
        return isValid;
    }
};
var requestCallback = {
    // Queue callbacks (5)
    numOfQueue: 5,
    countQueue: 0,
    initCallback: function(numOfQueue) {
        requestCallback.numOfQueue = numOfQueue;
        requestCallback.countQueue = 0;
        showPropzyLoading();
    },
    sendRequest: function() {
        requestCallback.numOfQueue++;
    },
    addCallbackToQueue: function() {
        requestCallback.countQueue++;
        if (requestCallback.numOfQueue == requestCallback.countQueue) {
            hidePropzyLoading();
        }
    }
};

$(function() {
    CKEDITOR.replace('meetingNote');
    /* initialize the external events
     -----------------------------------------------------------------*/
    calendarMeetings.ini_events($('#external-events div.external-event'));

    /* initialize the calendar
     -----------------------------------------------------------------*/
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
            today: 'today',
            month: 'month',
            week: 'week',
            day: 'day'
        },
        //Random default events
        events: {
            url: "/lso/get-list-meetings",
        },
        eventClick: function(calEvent, jsEvent, view) {
            // Reset state
            $("#meetingId").val("");
            $("#meetingLsoId").val("");
            $("#meetingDate").val("");
            $("#meetingTime").val("");
            // Set id
            $("#meetingId").val(calEvent.id);
            meeting.init();
        },
        // dayClick: function(date, jsEvent, view) {
        //     // Reset state
        //     $("#meetingId").val("");
        //     $("#meetingLsoId").val("");
        //     $("#meetingDate").val("");
        //     $("#meetingTime").val("");
        //     // Set value
        //     $("#meetingDate").val(date.format("DD/MM/YYYY"));
        //     $("#meetingTime").val(date.format("hh:mm a"));
        //     // meeting.init();
        // },
        loading: function(bool) {
            if (bool)
                showPropzyLoading();
            else {
                hidePropzyLoading();
            }
        },
    });

    // Hide datepicker
    $(".datepicker-inline").hide();

    $("body").on("click", "#create-meeting-listing-btn", function(e) {
        e.preventDefault();
        meeting.updateMeeting();
    });
});