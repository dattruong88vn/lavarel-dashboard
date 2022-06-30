var reminderNotify = {
    reminderId: "",
    meetingId: "",
    // Reminder
    reminderIdAlert: "",
    reminderAlert: "",
    reminderIds: [],
    meetingIds: [],
    callNotify: function(milliseconds) {
        // First call, then wait for interval
        reminderNotify.notify();
        // Wait for interval
        setInterval(function() {
            reminderNotify.notify();
        }, milliseconds);
    },
    // Phiên bản 2
    callNotify2: function(milliseconds) {
        setInterval(function() {
            reminderNotify.notify2();
        }, milliseconds);
    },
    notify: function() {
        reminderNotify.meetingPopupReminder(function(response) {
            if (response.result) {
                if (typeof response.data[0] != "undefined") {
                    $.map(response.data, function(item) {
                        // Chưa tồn tại
                        if (reminderNotify.meetingIds.indexOf(item.id) == -1) {
                            reminderNotify.meetingIds.push(item.id);
                            reminderNotify.reminderIdAlert = item.id;
                            reminderNotify.reminderAlert = "Bạn có meeting với " + item.ownerName + " vào lúc " + moment(item.startDate).format("DD/MM/YYYY hh:mm A");
                            reminderNotify.notifyDetail();
                        }
                    });
                }
            }
        });

        reminderNotify.reminderPopup(function(response) {
            if (response.result) {
                if (typeof response.data[0] != "undefined") {
                    $.map(response.data, function(item) {
                        // Chưa tồn tại
                        if (reminderNotify.reminderIds.indexOf(item.id) == -1) {
                            reminderNotify.reminderIds.push(item.id);
                            reminderNotify.reminderIdAlert = item.id;
                            reminderNotify.reminderAlert = "Reminder: " + item.ownerName + "  " + item.workTypeName + " vào lúc " + moment(item.reminderDate).format("DD/MM/YYYY hh:mm A");
                            reminderNotify.notifyReminderDetail();
                        }
                    });
                }
            }
        });
    },
    notifyDetail: function() {
        $.notify({
            // options
            icon: '',
            title: reminderNotify.reminderIdAlert,
            message: reminderNotify.reminderAlert,
            url: '',
            target: '_blank'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "danger",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: -1,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="meeting-popup col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" data-id="{1}" class="close-meeting-btn close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>' +
                '</div>'
        });
    },
    notifyReminderDetail: function() {
        $.notify({
            // options
            icon: '',
            title: reminderNotify.reminderIdAlert,
            message: reminderNotify.reminderAlert,
            url: '',
            target: '_blank'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "danger",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: -1,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="reminder-popup col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" data-id="{1}" class="close-reminder-btn close" data-notify="dismiss">×</button>' +
                '<span data-notify="icon"></span> ' +
                '<span data-notify="message">{2}</span>' +
                '</div>' +
                '</div>'
        });
    },
    // Notify phiên bản 2
    notify2: function() {
    	document.addEventListener('DOMContentLoaded', function() {
            if (Notification.permission !== "granted")
                Notification.requestPermission();
        });

        if (!Notification) {
            alert('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }

        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification('Notification title', {
                icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
                body: "Hey there! You've been notified!",
            });
            notification.onclick = function() {
                window.open("http://stackoverflow.com/a/13328397/1269037");
            };
        }
    },
    // Call Reminder 
    meetingPopupReminder: function(callback) {
        $.ajax({
            url: "/lso/meetingPopupReminder",
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
    meetingClosedPopupReminder: function(callback) {
        $.ajax({
            url: "/lso/meetingClosedPopupReminder/"+reminderNotify.meetingId,
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
    reminderPopup: function(callback) {
        $.ajax({
            url: "/lso/reminderPopup",
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
    reminderClosedPopup: function(callback) {
        $.ajax({
            url: "/lso/reminderClosedPopup/"+reminderNotify.reminderId,
            type: "GET"
        }).done(function(response) {
            callback(response);
        })
    },
};

// Start reminder every 30s
$(function() {
	reminderNotify.callNotify(30000);

    $("body").on('click', ".close-meeting-btn", function() {
        if ($.isNumeric($(this).data('id'))) {
            reminderNotify.meetingId = $(this).data('id');
        } else {
            return '';
        }
        reminderNotify.meetingClosedPopupReminder(function(response) {
            if (response.result) {
                console.log(response.data);
            } else {
                console.log(response.message);
            }
        });
    });

    $("body").on('click', ".close-reminder-btn", function() {
        if ($.isNumeric($(this).data('id'))) {
            reminderNotify.reminderId = $(this).data('id');
        } else {
            return '';
        }
        reminderNotify.reminderClosedPopup(function(response) {
            if (response.result) {
                console.log(response.data);
            } else {
                console.log(response.message);
            }
        });
    });
});

// function closeMeetingPopupReminder(id) {
//     if ($.isNumeric(id)) {
//         reminderNotify.meetingId = id;
//     } else {
//         return '';
//     }
//     reminderNotify.meetingClosedPopupReminder(function(response) {
//         if (response.result) {
//             console.log(response.data);
//         } else {
//             console.log(response.message);
//         }
//     });
// }

// function closePopupReminder(id) {
//     if ($.isNumeric(id)) {
//         reminderNotify.meetingId = id;
//     } else {
//         return '';
//     }
//     reminderNotify.reminderClosedPopup(function(response) {
//         if (response.result) {
//             console.log(response.data);
//         } else {
//             console.log(response.message);
//         }
//     });
// }
