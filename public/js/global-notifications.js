var showMatchNotify = function (item) {
    var notifyClass = "";
    var targetLink = "";
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }

    // old way: check departmentId of currentUser
    // if (currentUser.departments[0].departmentId == 5) {
    //     notifyClass = "notify-match notify-match-lead-" + item.leadId;
    //     targetLink = "/lead/detail/" + item.leadId + "#boxListingMatchingJM";
    // } else {
    //     notifyClass = "notify-match notify-match-deal-" + item.dealId;
    //     targetLink = "/deal/detail/" + item.dealId + "#boxListingMatchingJM";
    // }

    // new way: check dealId | leadId
    if (item.leadId) {
        notifyClass = "notify-match notify-match-lead-" + item.leadId;
        targetLink = "/lead/detail/" + item.leadId + "#boxListingMatchingJM";
    } else {
        notifyClass = "notify-match notify-match-deal-" + item.dealId;
        targetLink = "/deal/detail/" + item.dealId + "#boxListingMatchingJM";
    }

    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' href='" +
        targetLink +
        "' target='_blank'" +
        "' >" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-match");
};

var showReassignNotify = function (item) {
    var notifyClass = "";
    var targetLink = "/deal";
    if (item.typeId == 38) {
        targetLink = "/lead";
    }
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    notifyClass = "notify-reassign";
    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' href='" +
        targetLink +
        "' >" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-reassign");
};

var showExpiredListingNotify = function (item) {
    var notifyClass = "";

    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }

    notifyClass = "notify-expired-listing";
    var html = `
        <li class='${notifyClass}'>
        <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
        <a class='close' mongo-id='${item.id}'>x</a>
        <a class='item-link notify-${item.id}' mongo-id='${item.id}' href='${item.linkList[0]}' > ${item.message} </a>
        </li>
    `;
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-expired-listing");
};

var setMatchNotificationRead = function (selector) {
    $(selector + " a.close").unbind("click");
    $(selector + " a.close").on("click", function (event) {
        event.preventDefault();
        var selector = $(this);
        var mongoId = $(selector).attr("mongo-id");
        setNotificationRead(mongoId, function (response) {
            selector.parents("li").remove();
        });
    });
};

const setMatchNotificationTaskRead = function (selector) {
    $(selector + " a.close").off("click").on("click", function (event) {
        event.preventDefault();

        const closeBtn = $(this);
        const mongoId = $(closeBtn).attr("mongo-id");
        setRemindTaskNotificationRead(mongoId, function (response) {
            closeBtn.parents("li").remove();
        });
    });
};

var showOnlyMesgNotify = function (item,urlShow = false) {
    var notifyClass = "";

    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }

    notifyClass = "notify-expired-listing";
    const url = !urlShow ? "#" : urlShow;

    var html = `
        <li class='${notifyClass}'>
        <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
        <a class='close' mongo-id='${item.id}'>x</a>
        <a class='item-link notify-${item.id}' mongo-id='${item.id}' href='${url}'> ${item.message} </a>
        </li>
    `;
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-expired-listing");
};

var showListingAdjustPrice = function (item) {
    var notifyClass = "";
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    let target = "";
    target = '/'+item.link == window.location.pathname? '' : '_blank';
    notifyClass = "notify-listing-adjust-price";
    var html = `
    <li class='${notifyClass}'>
        <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
        <a class='close' mongo-id='${item.id}'>x</a>
        <a target='${target}' href='/${item.link}' class='item-link notify-${item.id}' mongo-id='${item.id}'> Listing ${item.rlistingId +': '+item.message} </a>
    </li>
    `;
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-listing-adjust-price");
}

var showListingAdjustInfo = function(item) {
    var notifyClass = "";
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    let target = "";
    target = '/'+item.link == window.location.pathname? '' : '_blank';
    notifyClass = "notify-listing-adjust-info";
    var html = `
    <li class='${notifyClass}'>
        <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
        <a class='close' mongo-id='${item.id}'>x</a>
        <a target='${target}' href='/${item.link}' class='item-link notify-${item.id}' mongo-id='${item.id}'> Listing ${item.rlistingId +': '+item.message} </a>
    </li>
    `;
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-listing-adjust-info");
}

var showListingAdjustServices = function(item) {
    var notifyClass = "";
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    let target = "";
    target = '/'+item.link == window.location.pathname? '' : '_blank';
    notifyClass = "notify-listing-adjust-services";
    var html = `
    <li class='${notifyClass}'>
        <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
        <a class='close' mongo-id='${item.id}'>x</a>
        <a target='${target}' href='/${item.link}' class='item-link notify-${item.id}' mongo-id='${item.id}'> Listing ${item.rlistingId +': '+item.message} </a>
    </li>
    `;
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-listing-adjust-services");
}

const trackingTodo = (taskId) => {
    localStorage.setItem(
        'view_detail_task_tracking',
        JSON.stringify({
          source: 'notification',
        }),
    )

    window.open(`/calendar-task/detail/${taskId}`, '_blank')
}

const showNotifyRemindTask = function (item) {
    let notifyClass = 'notify-remind-task'
    let html = ''
    
    let getTaskId = null
    
    // Old response: array
    // items.map(item => {
    //     if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
    //         return false;
    //     }

    //     getTaskId = item.id

    //     let target = "";
    //     target = '/' + item.link == window.location.pathname ? '' : '_blank';
    //     html = `
    //     <li class='${notifyClass} ${notifyClass}-${getTaskId}'>
    //         <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
    //         <a class='close' mongo-id='${getTaskId}'>x</a>
    //         <a href='javascript:;' onclick='trackingTodo(${item.taskId})' class='item-link task-content notify-${getTaskId}' mongo-id='${getTaskId}'>
    //             <strong>${item.taskName}</strong>
    //             <div class='notify-detail'>
    //                 <span class='datetime'>${moment(item.taskCompletionTime).format('HH:mm')}</span>
    //                 <span class='type'>${item.taskType}</span>
    //             </div>
    //         </a>
    //     </li>
    //     `;
    // })

    // new response: object
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }

    getTaskId = item.id

    let target = "";
    target = '/' + item.link == window.location.pathname ? '' : '_blank';
    html = `
        <li class='${notifyClass} ${notifyClass}-${getTaskId}'>
            <a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>
            <a class='close' mongo-id='${getTaskId}'>x</a>
            <a href='javascript:;' onclick='trackingTodo(${item.taskId})' class='item-link task-content notify-${getTaskId}' mongo-id='${getTaskId}'>
                <strong>${item.taskName}</strong>
                <div class='notify-detail'>
                    <span class='datetime'>${moment(item.taskCompletionTime).format('HH:mm')}</span>
                    <span class='type'>${item.taskType}</span>
                </div>
            </a>
        </li>
    `;

    $("#notify-area .notifyList").append(html);
    setMatchNotificationTaskRead('.' + notifyClass)
}

function registerSocketNotification() {
    PfsNotifications.registerNotify();
    //time-counter
    TimeCounterNotifications.registerNotify();

    notification.register({
        key: "REMIND_TASK",
        callback: function (response) {
            const jsonResult = JSON.parse(response.body);
            showNotifyRemindTask(jsonResult);
        },
    });

    notification.register({
        key: "stop_activity",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            if (
                typeof lead !== "undefined" &&
                lead.leadId == jsonResult.leadId
            ) {
                if (typeof jsonResult.stopActionName !== "undefined") {
                    if (jsonResult.stopActionName == "question-form") {
                        $("#QuestionModal").modal("hide");
                    } else if (jsonResult.stopActionName == "create-meeting") {
                        $("#modalCreateMeeting").modal("hide");
                    }
                }
            }
        },
    });

    notification.register({
        key: "LISTING_ADJUST_PRICE",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showListingAdjustPrice(jsonResult);
        },
    });

    notification.register({
        key: "LISTING_ADJUST_INFO",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showListingAdjustInfo(jsonResult);
        },
    });

    notification.register({
        key: "LISTING_ADJUST_SERVICES",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showListingAdjustServices(jsonResult);
        },
    });

    notification.register({
        key: "reply_empty_check",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            if (jsonResult.checkListings.length != 0)
                QuickCheckListings.loadQuickCheckListingsResult(
                    jsonResult.checkListings[0].leadId
                );
        },
    });

    notification.register({
        key: "broadcast_notify_change_status",
        callback: function (response) {
            // var jsonResult = JSON.parse(response.body);
            showBroadcastNoti(JSON.parse(response.body).data);
            // QuickCheckListings.loadQuickCheckListingsResult(jsonResult.checkListings[0].leadId);
        },
    });

    notification.register({
        key: "deal_negotiation",
        callback: function (response) {
            showNegotiateNoti(JSON.parse(response.body).data);
        },
    });

    notification.register({
        key: "deal_deposit",
        callback: function (response) {
            showDepositNoti(JSON.parse(response.body).data);
        },
    });

    notification.register({
        key: "deal_deposit_meeting",
        callback: function (response) {
            showDepositNoti_1h(JSON.parse(response.body).data);
        },
    });

    notification.register({
        /* When to metting -> Show detail task */
        key: "deal_deposit_meeting_detail",
        callback: function (response) {
            showDepositDetail(JSON.parse(response.body).data);
        },
    });

    notification.register({
        key: "deal_negotiation_remider",
        callback: function (response) {
            showReminderNegotiation(JSON.parse(response.body).data);
        },
    });

    notification.register({
        key: "confirm_empty_check",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            if (jsonResult.checkListings.length != 0)
                QuickCheckListings.loadQuickCheckListingsResult(
                    jsonResult.checkListings[0].leadId
                );
        },
    });

    notification.register({
        key: "deal_assign",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showMatchNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "match_listing",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showMatchNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "lead_assign",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showMatchNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "customer_require_schedule",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showMatchNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "ba_cancel_meeting",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showNotiBaCancleMeeting(jsonResult.data);
        },
    });

    notification.register({
        key: "change_time_meeting",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showNotiChangeTimeMeeting(jsonResult.data);
        },
    });

    notification.register({
        key: "reminder_meeting",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showNotiTMReminderMeeting(jsonResult.data);
            // CRM_ModalQuestion.loadOnNotiy(jsonResult.data);
        },
    });

    notification.register({
        key: "re_assign_lead_deal",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showReassignNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "change_time_listing_diy",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showDiyChangeTimeNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "update_profile_customer",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showNotiUpdateAfterMeeting(jsonResult.data);
            // CRM_ModalQuestion.loadOnNotiy(jsonResult.data);
        },
    });

    notification.register({
        key: "saved_update_profile_customer",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            CRM_ModalQuestion.handleSavedNotify(jsonResult.data);
        },
    });

    notification.register({
        key: "TIME_COUNTER_LEAD_STAFF",
        callback: function (response) {},
    });
    notification.register({
        key: "SELLER_ADVISER_UPDATE_GUARANTEED",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showExpiredListingNotify(jsonResult);
            commonNotifyTimer.init();
        },
    });
    notification.register({
        key: "POS_MANAGER_UPDATE_GUARANTEED",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showExpiredListingNotify(jsonResult);
            commonNotifyTimer.init();
        },
    });
    notification.register({
        key: "UPDATE_STATUS_WAIT_LIVE",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showExpiredListingNotify(jsonResult);
        },
    });
    notification.register({
        key: "UPDATE_STATUS_RE_CALL",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showExpiredListingNotify(jsonResult);
        },
    });
    notification.register({
        key: "notification_fin_deal_deposit",
        callback: function (response) {},
    });
    notification.register({
        key: "DEAL_CLOSED_BY_DEPOSIT",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showOnlyMesgNotify(jsonResult);
        },
    });
    notification.register({
        key: "DEAL_REOPEN_BY_CANCEL_DEPOSIT",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showOnlyMesgNotify(jsonResult);
        },
    });
    notification.register({
        key: "DEAL_GROUP_CLOSED",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showOnlyMesgNotify(jsonResult);
        },
    });
    notification.register({
        key: "DEAL_NEGOTIATION_CLOSE",
        callback: function (response) {
            var jsonResult = JSON.parse(response.body);
            showOnlyMesgNotify(jsonResult);
        },
    });

    notification.register({
        key: "DEAL_DEPOSIT_FOR_FIN",
        callback: function (response) {
            const unreadNoti = +response.totalId;
            const currentNoti = +$(
                "#commission_deal_notification .commission-notification"
            ).html();
            $("#commission_deal_notification .commission-notification").html(
                unreadNoti + currentNoti
            );
        },
    });

    notification.register({
        key: "NOTI_UNREAD_MONGO",
        callback: function (response) {
            getUnreadNotifications(JSON.parse(response.body))
        },
    })
    notification.register({
        key: "TASK_EMERGENCY_MEETING",
        callback: function (response) {
            CrmNotify.getnotify(JSON.parse(response.body))
        },
    })
    notification.register({
        key: "SUPPORT_SCHEDULE",
        callback: function (response) {
            getSupportNotifies(JSON.parse(response.body))
        },
    })
    notification.register({
        key: "MISSING_SCHEDULE",
        callback: function (response) {
            getMissingSchedules(JSON.parse(response.body))
        },
    })
    notification.register({
        key: "NOTI_UNREAD_MYSQL",
        callback: function (response) {
            getDealNotify(JSON.parse(response.body));
            getDealNotifyBig(JSON.parse(response.body));
        },
    })
    notification.register({
        key: "lead_note",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item,`/lead/detail/${item.leadId}`);
        },
    })
    notification.register({
        key: "LEAD_NOTE_FOR_BA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item,`/deal/detail/${item.dealId}`);
        },
    })
    notification.register({
      key: "deal_note",
      callback: function (response) {
        let item = JSON.parse(response.body);
        showOnlyMesgNotify(item,`/deal/detail/${item.dealId}`);
      },
    }),
    // update noti for touring 03/2022
    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_BOOK_TOUR_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_BOOK_TOUR_SA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_CHANGE_TIME_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_CHANGE_TIME_SA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_REASSIGN_NEW_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_REASSIGN_OLD_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_ADD_LISTING_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_ADD_LISTING_SA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_SKIP_LISTING_SA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_CC",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },  
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_SA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });

    notification.register({
        key: "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_BA",
        callback: function (response) {
            let item = JSON.parse(response.body);
            showOnlyMesgNotify(item);
        },
    });
    // lead auto assign
    notification.register({
      key: "lead_auto_assign",
      callback: function (response) {
        var jsonResult = JSON.parse(response.body);
        showMatchNotify(jsonResult.data);
      },
    });

  // register noti from sam
  notification.register({
    key: "CS_SCHEDULE_DASHBOARD_START_TOUR_BA",
    callback: function (response) {
      let item = JSON.parse(response.body);
      showOnlyMesgNotify(item);
    },
  });

  notification.register({
    key: "CS_SCHEDULE_DASHBOARD_START_TOUR_SA",
    callback: function (response) {
      let item = JSON.parse(response.body);
      showOnlyMesgNotify(item);
    },
  });

  notification.register({
    key: "CS_SCHEDULE_DASHBOARD_ARRIVE_LISTING_BA",
    callback: function (response) {
      let item = JSON.parse(response.body);
      showOnlyMesgNotify(item);
    },
  });

  notification.register({
    key: "CS_SCHEDULE_DASHBOARD_END_TOUR_BA",
    callback: function (response) {
      let item = JSON.parse(response.body);
      showOnlyMesgNotify(item);
    },
  });

  notification.register({
    key: "CS_SCHEDULE_DASHBOARD_END_TOUR_SA",
    callback: function (response) {
      let item = JSON.parse(response.body);
      showOnlyMesgNotify(item);
    },
  });
}

var showDiyChangeTimeNotify = function (item) {
    var notifyClass = "";
    var targetLink =
        "/deal/tour/" + item.dealId + "#schedule" + item.scheduleId;
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    notifyClass = "notify-diy-change-time";
    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' href='" +
        targetLink +
        "' >" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);

    var selector = $("." + notifyClass);
    selector.find(".close").unbind("click");
    selector.find(".close").on("click", function (event) {
        event.preventDefault();
        var selector = $(this);
        var mongoId = $(selector).attr("mongo-id");
        setNotificationRead(mongoId, function (response) {
            selector.parents("li").remove();
        });
    });
};


var getUnreadNotifications = function (response) {
    // $.ajax({
    //     "url": "/notification/get-unread-notification",
    //     "type": "get",
    //     "async": false
    // }).done(function (response) {
    console.log("response", response)
    if (response.data && response.data.length > 0) {
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i]
            if (
                $.inArray(item.code, [
                    "lead_assign",
                    "deal_assign",
                    "match_listing",
                    "customer_require_schedule",
                    "lead_auto_assign"
                ]) >= 0
            ) {
                showMatchNotify(item)
            } else if (
                $.inArray(item.code, [
                    "reply_empty_check",
                    "confirm_empty_check",
                ]) >= 0 &&
                item.checkListings.length != 0
            ) {
                QuickCheckListings.loadQuickCheckListingsResult(
                    item.checkListings[0].leadId
                )
            } else if ($.inArray(item.code, ["re_assign_lead_deal"]) >= 0) {
                showReassignNotify(item)
            } else if ($.inArray(item.code, ["update_profile_customer"]) >= 0) {
                showNotiUpdateAfterMeeting(item)
            } else if ($.inArray(item.code, ["change_time_listing_diy"]) >= 0) {
                showDiyChangeTimeNotify(item)
            } else if (
                $.inArray(item.code, ["broadcast_notify_change_status"]) >= 0
            ) {
                showBroadcastNoti(item)
            } else if ($.inArray(item.code, ["deal_negotiation"]) >= 0) {
                showNegotiateNoti(item)
            } else if ($.inArray(item.code, ["deal_deposit"]) >= 0) {
                showDepositNoti(item)
            } else if ($.inArray(item.code, ["deal_deposit_meeting"]) >= 0) {
                showDepositNoti_1h(item)
            } else if (
                $.inArray(item.code, ["deal_deposit_meeting_detail"]) >= 0
            ) {
                showDepositDetail(item)
            } else if (item.code == "deal_negotiation_remider") {
                showReminderNegotiation(item)
            } else if (item.code == "ba_cancel_meeting") {
                showNotiBaCancleMeeting(item)
            } else if (item.code == "reminder_meeting") {
                showNotiTMReminderMeeting(item)
            } else if (item.code == "change_time_meeting") {
                showNotiChangeTimeMeeting(item)
            } else if (item.code == "lead_note") {
                showOnlyMesgNotify(item,`/lead/detail/${item.leadId}`)
            } else if (item.code == "LEAD_NOTE_FOR_BA") {
                showOnlyMesgNotify(item,`/deal/detail/${item.dealId}`)
            } else if (item.code == "deal_note") {
                showOnlyMesgNotify(item,`/deal/detail/${item.dealId}`)
            } else if (
                $.inArray(item.code, [
                    "RECEIVE_NEED_ADDTIONAL_PROFILE",
                    "RECEIVE_COMPLETE_PROFILE_PROCESSING",
                    "UPDATE_EVALUATION_RESULTS",
                    "PROFILE_CANCLED",
                    "PROFILE_FULL_INFO",
                    "MG_PROFILE_DONE",
                    "PROFILE_CHANGE_STATUS_NOTIFY_TO_ASSIGNED_TO",
                    "MORTGAGE_REASSIGN_TO_MORTGAGE",
                    "RECEIVE_LOANS_PROFILE",
                    "RECEIVE_ADDITIONAL_PROFILE",
                    "DEAL_DEPOSIT_FOR_FIN",
                ]) >= 0
            ) {
                PfsNotifications.showNotify(item)
            } else if (item.code == "LISTING_ADJUST_PRICE") {
                showListingAdjustPrice(item);
            } else if (item.code == "LISTING_ADJUST_INFO") {
                showListingAdjustInfo(item);
            } else if (item.code == "LISTING_ADJUST_SERVICES") {
                showListingAdjustServices(item);
            } else if (
                $.inArray(item.code, [
                    "CS_SCHEDULE_DASHBOARD_BOOK_TOUR_CC",
                    "CS_SCHEDULE_DASHBOARD_BOOK_TOUR_SA",
                    "CS_SCHEDULE_DASHBOARD_TOUR_CHANGE_TIME_CC",
                    "CS_SCHEDULE_DASHBOARD_TOUR_CHANGE_TIME_SA",
                    "CS_SCHEDULE_DASHBOARD_TOUR_REASSIGN_NEW_CC",
                    "CS_SCHEDULE_DASHBOARD_TOUR_REASSIGN_OLD_CC",
                    "CS_SCHEDULE_DASHBOARD_TOUR_ADD_LISTING_CC",
                    "CS_SCHEDULE_DASHBOARD_TOUR_ADD_LISTING_SA",
                    "CS_SCHEDULE_DASHBOARD_TOUR_SKIP_LISTING_SA",
                    "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_CC",
                    "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_SA",
                    "CS_SCHEDULE_DASHBOARD_TOUR_CANCEL_BA",
                    "CS_SCHEDULE_DASHBOARD_START_TOUR_BA",
                    "CS_SCHEDULE_DASHBOARD_START_TOUR_SA",
                    "CS_SCHEDULE_DASHBOARD_ARRIVE_LISTING_BA",
                    "CS_SCHEDULE_DASHBOARD_END_TOUR_BA",
                    "CS_SCHEDULE_DASHBOARD_END_TOUR_SA",
                ]) >= 0
            ) {
                showOnlyMesgNotify(item);
            }
        }
    }
    // }).always(function () {

    // });
}

function showNotiTMReminderMeeting(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-tm-remider-meeting";
    var html =
        "<li class='" +
        notifyClass +
        "' onclick='return setNotificationRead(\"" +
        item.id +
        "\", function (response) { return true;})'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/deal-meeting/list'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(notifyClass);
}

function showNotiBaCancleMeeting(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-ba-cancel-meeting";
    var html =
        "<li class='" +
        notifyClass +
        "' onclick='return setNotificationRead(\"" +
        item.id +
        "\", function (response) { return true;})'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/deal-meeting/list'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(notifyClass);
}

function showNotiChangeTimeMeeting(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "change-time-meeting";
    var html =
        "<li class='" +
        notifyClass +
        "' onclick='return setNotificationRead(\"" +
        item.id +
        "\", function (response) { return true;})'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/deal-meeting/list'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(notifyClass);
}

function showNotiUpdateAfterMeeting(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-ba-after-meeting";
    var html =
        "<li class='" +
        notifyClass +
        "' onclick='return setNotificationRead(\"" +
        item.id +
        "\", function (response) { return true;})'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/crm-dashboard/task-detail/" +
        item.taskId +
        "?defineId=32'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(notifyClass);
}

function showBroadcastNoti(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-broadcast";
    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/broadcast#" +
        item.broadcastId +
        "' >" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-broadcast");
}

function showNegotiateNoti(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-negotiate";
    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/crm-dashboard/task-detail/" +
        item.taskId +
        "?defineId=" +
        item.defineId +
        "'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-negotiate");
}

function showDepositNoti(item) {
    if (!item) return false;
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-deposit";
    var html =
        "<li class='" +
        notifyClass +
        "'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/crm-dashboard/task-detail/" +
        item.taskId +
        "?defineId=" +
        item.defineId +
        "'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(".notify-deposit");
}

function showDepositNoti_1h(item) {
    if ($("#notify-area .notifyList .notify-" + item.id).length > 0) {
        return false;
    }
    var notifyClass = "notify-deposit-1h";
    var html =
        "<li class='" +
        notifyClass +
        "' onclick='return setNotificationRead(\"" +
        item.id +
        "\", function (response) { return true;})'>" +
        "<a class='hideNotify' href='#' onclick='return hideNotification(this);' ><i class='fa fa-arrow-down'></i></a>" +
        "<a class='close' mongo-id='" +
        item.id +
        "' >x</a>" +
        "<a class='item-link notify-" +
        item.id +
        "' mongo-id='" +
        item.id +
        "' target='_blank' href='/crm-dashboard/task-detail/" +
        item.taskId +
        "?defineId=" +
        item.defineId +
        "'>" +
        item.message +
        "</a>" +
        "</li>";
    $("#notify-area .notifyList").append(html);
    setMatchNotificationRead(notifyClass);
}
function loadDetailTask(item) {
    return $.ajax({
        url:
            "/crm-dashboard/task-detail/" +
            item.taskId +
            "?defineId=" +
            item.defineId +
            "&json=true",
        type: "get",
        async: false,
    });
}
function setContentDetailTaskPopup(resDetail) {
    var owner = "";
    var buyer = "";
    $.each(resDetail.ownerAnswers, function (key, item) {
        if (item.value)
            owner += '<div style="padding: 5px;">- ' + item.answer + "</div>";
    });
    $.each(resDetail.buyerAnswers, function (key, item) {
        if (item.value) {
            if (item.control == "checkbox")
                buyer +=
                    '<div style="padding: 5px;">- ' + item.answer + "</div>";
            else if (item.control == "text")
                buyer +=
                    '<div style="padding: 5px;">- ' +
                    item.answer +
                    ": " +
                    item.value +
                    "</div>";
        }
    });
    var htmlDetail = "<h4>Thông tin giấy tờ</h4>";
    htmlDetail +=
        '<div style="padding: 7px 3px; border-botton:1px solid #eee; ">';
    htmlDetail +=
        '<div style="float:left; width: 50%; "><div><b>Người bán </b></div> ' +
        owner +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><div><b>Người mua </b></div> <b>' +
        resDetail.questionGroupName +
        "</b>" +
        buyer +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail += "</hr><h4>Thông tin đặt cọc</h4>";

    htmlDetail +=
        '<div style="padding: 7px 3px; border-botton:1px solid #eee; ">';
    htmlDetail +=
        '<div style="float:left; width: 50%; "><b>Người bán: </b> ' +
        resDetail.ownerName +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Người mua: </b> ' +
        resDetail.customerName +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px; border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Giá chốt bán: </b> ' +
        resDetail.formattedPrice +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Số tiền đặt cọc: </b> ' +
        resDetail.formattedDepositPrice +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";
    var options = { hour: "numeric", minute: "numeric", second: "numeric" };
    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Ngày gặp đặt cọc: </b> ' +
        new Date(resDetail.depositMeeting.scheduleTime).toLocaleDateString(
            "vi-VN",
            options
        ) +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Địa điểm: </b> ' +
        resDetail.depositMeeting.address +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Cần vay vốn: </b> ' +
        (resDetail.isLoanNeeded
            ? resDetail.depositMeeting.loanValue.toLocaleString("vi-VN")
            : "Không có") +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Ghi chú SA tới BA: </b> ' +
        resDetail.note +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';

    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Trạng thái: </b> ' +
        resDetail.statusName +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";
    $("#modal_deposit_task_detail .modal-body").html(htmlDetail);
}
function showDepositDetail(item) {
    $.when(loadDetailTask(item)).done(function (resDetail) {
        if (
            typeof resDetail.statusId != "undefined" &&
            resDetail.statusId &&
            resDetail.statusId != 9
        ) {
            /* Check task not finish */
            $("#finish-degotiate-task").unbind("click");
            $("#finish-degotiate-task").click(function () {
                window.location.href =
                    "/crm-dashboard/task-detail/" +
                    item.taskId +
                    "?defineId=" +
                    item.defineId;
            });
            if (typeof Storage !== "undefined") {
                if (!localStorage.getItem("check_show_detail_metting")) {
                    localStorage.setItem("check_show_detail_metting", "show");
                    setContentDetailTaskPopup(resDetail);
                    $("#modal_deposit_task_detail").modal("show");
                } else {
                    // Show popup detail metting
                    if ($("body").find("#" + item.id).length != 0) {
                        $("body")
                            .find("#" + item.id)
                            .remove();
                    }
                    var notififySmallHtml = $("<div>");
                    notififySmallHtml.attr("id", item.id);
                    notififySmallHtml.addClass("higlight-nofity-meting");
                    notififySmallHtml.css({
                        position: "fixed",
                        left: "190px",
                        bottom: "6px",
                        bottom: "6px",
                        "background-color": "#00a65a",
                        "border-color": "#008d4c",
                        color: "yellow",
                        zIndex: 100000000,
                        border: "1px solid rgb(0, 141, 76)",
                        borderRadius: "5px",
                        padding: "6px",
                        cursor: "pointer",
                    });
                    notififySmallHtml.bind("click", function () {
                        setContentDetailTaskPopup(resDetail);
                        $("#modal_deposit_task_detail").modal("show");
                        localStorage.setItem(
                            "check_show_detail_metting",
                            "show"
                        );
                    });
                    notififySmallHtml.html(
                        '<i class="fa fa-star"></i> Thông báo đã đến giờ đặt cọc'
                    );
                    $("body").prepend(notififySmallHtml);
                    // Check localStrogate to show modal
                    if (
                        localStorage.getItem("check_show_detail_metting") ==
                        "show"
                    ) {
                        setContentDetailTaskPopup(resDetail);
                        $("#modal_deposit_task_detail").modal("show");
                        notififySmallHtml.hide();
                    } else {
                        $("#modal_deposit_task_detail").modal("hide");
                        notififySmallHtml.show();
                    }
                }
            }
        } else {
            localStorage.removeItem("check_show_detail_metting");
        }
    });
}

function setContentReminderNegotiation(resDetail) {
    var htmlDetail = "";

    var options = { hour: "numeric", minute: "numeric", second: "numeric" };
    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Trạng thái: </b> ' +
        resDetail.statusName +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Ngày khởi tạo: </b> ' +
        new Date(resDetail.createdDate).toLocaleDateString("vi-VN", options) +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Giá thương lượng: </b> ' +
        resDetail.negotiationPrice +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Giá bán: </b> ' +
        resDetail.currentPrice +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>LID: </b> ' +
        resDetail.rListingId +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Deal: </b> ' +
        resDetail.dealId +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";

    htmlDetail +=
        '<div style="padding: 7px 3px;border-botton:1px solid #eee;">';
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Điều kiện chủ nhà tới người mua: </b> ' +
        resDetail.ownerNote +
        "</div>";
    htmlDetail +=
        '<div style="float:left; width: 50%"><b>Điều kiện người mua tới chủ nhà: </b> ' +
        resDetail.buyerNote +
        "</div>";
    htmlDetail += '<div style="clear: both"></div>';
    htmlDetail += "</div>";
    $("#modal_negotiate_reminder .modal-body").html(htmlDetail);
}
function showReminderNegotiation(item) {
    $("#modal_negotiate-reminder").modal("show");
    $.when(loadDetailTask(item)).done(function (resDetail) {
        if (typeof resDetail.negotiationId != "undefined") {
            setContentReminderNegotiation(resDetail);
            if (!$("#modal_negotiate_reminder").hasClass("in")) {
                $("#modal_negotiate_reminder").modal("show");
                $("#modal_negotiate_reminder button").on("click", function () {
                    if ($(this).data("dismiss") == "modal") {
                        setNotificationRead(item.id, function (response) {
                            return true;
                        });
                    }
                });
                $("#view-detail-task-negotiate").unbind("click");
                $("#view-detail-task-negotiate").click(function () {
                    setNotificationRead(item.id, function (response) {
                        return true;
                    });
                    window.location.href =
                        "/crm-dashboard/task-detail/" +
                        item.taskId +
                        "?defineId=" +
                        item.defineId;
                });
            }
        }
    });
}

function getAssignedNotification() {
    $.ajax({
        url: "/notification/assigned-listing",
        type: "GET",
    }).success(function (response) {
        $(".newAssignedListingCount").html(response.newItemsCount);
        $(".newAssignedCreateListingCount").html(response.newItemsCountCreate);
        var html = "";
        if (response.items) {
            for (i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                html +=
                    "<li class='" +
                    (item.isRead ? "" : "text-bold") +
                    "' ><a href='/listing/" +
                    item.rListingID +
                    "' item-id=" +
                    item.rListingID +
                    " ><i class='fa fa-building text-aqua'></i> " +
                    item.title +
                    "</a></li>";
            }
        }
        $(".assignedNotificationList").html(html);
        $(".assignedNotificationList li a").on("click", function (event) {
            event.preventDefault();
            var rlistingId = $(this).attr("item-id");
            var trackingUrl =
                "/notification/assigned-listing-clicked?rlistingId=" +
                rlistingId;
            var targetUrl = $(this).attr("href");
            $.ajax({
                url: trackingUrl,
                type: "GET",
            }).success(function (response) {
                window.location.href = targetUrl;
            });
        });

        // for creater
        var html = "";
        if (response.itemsCreate.length > 0) {
            for (i = 0; i < response.itemsCreate[0].list.length; i++) {
                var item = response.itemsCreate[0].list[i];
                html +=
                    "<li class='" +
                    (item.isRead ? "" : "text-bold") +
                    "' ><a href='' item-id=" +
                    item.id +
                    " ><i class='fa fa-building text-aqua'></i> Bạn có 1 yêu cầu tạo " +
                    item.quantity +
                    " Listing từ " +
                    response.itemsCreate[0].assignFrom +
                    "</a></li>";
            }
        }
        $(".assignedNotificationListCreate").html(html);
        $(".assignedNotificationListCreate li a").on("click", function (event) {
            event.preventDefault();
            var logId = $(this).attr("item-id");
            var trackingUrl =
                "/notification/assigned-listing-create-clicked?logId=" + logId;
            var targetUrl = $(this).attr("href");
            $.ajax({
                url: trackingUrl,
                type: "GET",
            }).success(function (response) {
                window.location.href = targetUrl;
            });
        });

        if (response.isNotify) {
            $(".assignedNotification .message").html(
                "<h3>Bạn được assign <span class='number'>" +
                    response.addedItemsCount +
                    "</span> listing mới</h3>"
            );
            $(".assignedNotification").show();
        }
        if (response.isNotifyCreate) {
            $(".assignedNotificationCreate .message").html(
                "<h3>Bạn vừa có yêu cầu tạo <span class='number'>" +
                    response.addedItemsCountCreate +
                    "</span> listing mới</h3>"
            );
            $(".assignedNotificationCreate").show();
        }
    });
    //getTmDealNotification();
}

function getTmDealNotification() {
    get_sync("/notification/tm-deal", true, function (response) {
        if (response.result && response.data.length > 0) {
            $(".tmDealNotificationCount").html(response.data.length);
            var html = "";
            for (i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                html +=
                    "<li class='" +
                    (item.isRead ? "" : "text-bold") +
                    "' ><a href='/deal/detail/" +
                    item.dealId +
                    "' item-id=" +
                    item.id +
                    " ><i class='fa fa-building text-aqua'></i> " +
                    item.fromName +
                    " - " +
                    item.actionName +
                    " deal " +
                    item.dealId +
                    "</a></li>";
            }
            $(".tmDealNotificationList").html(html);
            initDealNotifyItems(".tmDealNotificationList");
        }
    });
}

function getDealNotify(response) {
    // var url = "/deal/notify"
    // get_sync(url, true, function (response) {
        if (response.result && response.data.length > 0) {
            var newItemsCount = 0
            var html = ""
            for (i = 0; i < response.data.length; i++) {
                var item = response.data[i]
                if (!item.isRead) {
                    newItemsCount++
                }
                var href = "/"
                if ($.inArray(item.actionId, [8]) !== -1) {
                    href = "/lead/detail/" + item.leadId
                }
                if ($.inArray(item.actionId, [21]) !== -1) {
                    href = "/deal/detail/" + item.dealId
                }
                html +=
                    "<li class='" +
                    (item.isRead ? "" : "text-bold") +
                    " item' ><a href='" +
                    href +
                    "' item-id=" +
                    item.id +
                    " ><i class='fa fa-building text-aqua'></i> " +
                    item.message +
                    "</a></li>"
            }
            $(".dealNotifyCount").html(newItemsCount)
            $(".dealNotifyList").html(html)
            initDealNotifyItems(".dealNotifyList")
        }
    // })
}

function getListingMatchedOrderNotify() {
    var url = "/notification/listing-matched-order";
    get_sync(url, true, function (response) {
        if (response.result && response.data.length > 0) {
            var newItemsCount = 0;
            var html = "";
            for (i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                newItemsCount++;
                var href = "/lead/detail/" + item.leadId;
                html +=
                    "<li class='item' ><a href='" +
                    href +
                    "' item-id=" +
                    item.leadId +
                    " ><i class='fa-4x fa fa-building text-aqua'></i> " +
                    item.numberOfListingForOrders +
                    " listing hợp với order " +
                    item.orderId +
                    " - " +
                    showEllapseTimeInshort(item.createdDate, new Date()) +
                    " trước</a></li>";
            }
            $(".listingMatchedOrderNotifyCount").html(newItemsCount);
            $(".listingMatchedOrderNotifyList").html(html);
            //initDealNotifyItems('.dealNotifyList');
        }
    });
}

function showEllapseTimeInshort(from, to) {
    from = moment(from);
    to = moment(to);
    var diffDays = to.diff(from, "days");
    var diffHours = to.diff(from, "hours");
    var diffMinutes = to.diff(from, "minutes");
    if (diffMinutes <= 0) {
        diffMinutes = 1;
    }
    //diffMinutes = diffMinutes - diffHours * 60;
    //diffHours = diffHours - diffDays * 24;
    var returnValue = "";
    if (diffDays > 0) {
        return " " + diffDays + "d";
    }
    if (diffHours > 0) {
        return " " + diffHours + "h";
    }
    if (diffMinutes > 0) {
        return " " + diffMinutes + "'";
    }
    return returnValue.trim();
}

var leadReminders = null;
function leadReminderNotify() {
    var url = "/lead/list-reminders";
    $(".lead-reminder").remove();
    get_sync(url, true, function (response) {
        var type = "lead-reminder";
        var title = "Lead reminder";
        for (i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            var itemHtml =
                "<a class='content' data-item-index='" +
                i +
                "' href='#' >" +
                "<div>" +
                (item.subject.length < 36
                    ? item.subject.length
                    : item.subject.substring(0, 36) + "...") +
                "</div>" +
                "<div>" +
                item.customerName +
                "</div>" +
                "<div>" +
                item.customerPhone +
                "</div>" +
                "</a>";
            pushNotify(title, type, itemHtml);
        }

        $("#notify-area .notifyList ." + type + " a.close").unbind("click");
        $("#notify-area .notifyList ." + type + " a.close").on(
            "click",
            function () {
                $(this).parents("li").remove();
            }
        );
        $("#notify-area ." + type + " a.content").on("click", function (event) {
            event.preventDefault();
            var itemIndex = $(this).attr("data-item-index");
            var item = showReminderNotify(
                "lead",
                leadReminders,
                itemIndex,
                "Chi tiết lead reminder"
            );
            var parent = $(this).parents("li");
            $.ajax({
                url: "/lead/set-reminder-read/" + item.id,
                type: "get",
            })
                .done(function (response) {
                    if (response.result) {
                        $(parent).remove();
                    }
                })
                .always(function () {});
        });
        leadReminders = response.data;
    });
}

var dealReminders = null;
function dealReminderNotify() {
    var url = "/deal/list-reminders";
    $(".deal-reminder").remove();
    get_sync(url, true, function (response) {
        var type = "deal-reminder";
        var title = "Deal reminder";
        for (i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            var itemHtml =
                "<a class='content' data-item-index='" +
                i +
                "' href='#' >" +
                "<div>" +
                (item.subject.length < 36
                    ? item.subject.length
                    : item.subject.substring(0, 36) + "...") +
                "</div>" +
                "<div>" +
                item.customerName +
                "</div>" +
                "<div>" +
                item.customerPhone +
                "</div>" +
                "</a>";
            pushNotify(title, type, itemHtml);
        }

        $("#notify-area .notifyList ." + type + " a.close").unbind("click");
        $("#notify-area .notifyList ." + type + " a.close").on(
            "click",
            function () {
                $(this).parents("li").remove();
            }
        );
        $("#notify-area ." + type + " a.content").on("click", function (event) {
            event.preventDefault();
            var itemIndex = $(this).attr("data-item-index");
            var item = showReminderNotify(
                "deal",
                dealReminders,
                itemIndex,
                "Chi tiết deal reminder"
            );
            var parent = $(this).parents("li");
            $.ajax({
                url: "/deal/set-reminder-read/" + item.id,
                type: "get",
            })
                .done(function (response) {
                    if (response.result) {
                        $(parent).remove();
                    }
                })
                .always(function () {});
        });
        dealReminders = response.data;
    });
}

function showReminderNotify(type, items, itemIndex, title) {
    var item = items[itemIndex];
    var target = "/lead/detail/" + item.leadId;
    if (type === "deal") {
        target = "/deal/detail/" + item.dealId;
    }
    var itemHtml =
        "<div>" +
        "<div><a href='" +
        target +
        "'>" +
        (type === "deal"
            ? "<label>Deal Id: </label> " + item.dealId
            : "<label>Lead Id: </label> " + item.leadId) +
        " Chi tiết>>></a></div>" +
        "<div><label>Khách hàng: </label> " +
        item.customerName +
        "</div>" +
        "<div><label>Điện thoại: </label> " +
        item.customerPhone +
        "</div>" +
        "<div><label>Tiêu đề: </label> " +
        item.subject +
        "</div>" +
        "<div><label>Ngày: </label> " +
        moment(item.reminderDate).format("DD/MM/YYYY HH:mm") +
        "</div>" +
        "<div><label>Nội dung: </label> <hr />" +
        item.content +
        "</div>" +
        "</div>";
    showPropzyAlert(itemHtml, title);
    return item;
}

function pushNotify(title, type, content) {
    var html =
        "<li class='" +
        type +
        "'>" +
        "<b>" +
        title +
        "</b><hr style='margin:0px;padding:0px;' />" +
        "<a class='close'>x</a>" +
        content +
        "</li>";
    $("#notify-area .notifyList").append(html);
}

function initDealNotifyItems(selector) {
    $(selector + " li a").on("click", function (event) {
        event.preventDefault();
        var itemId = $(this).attr("item-id");
        var trackingUrl = "/notification/tm-deal-clicked?dealId=" + itemId;
        var targetUrl = $(this).attr("href");
        showPropzyLoading();
        $.ajax({
            url: trackingUrl,
            type: "GET",
        })
            .success(function (response) {
                if (response.result) {
                    window.location.href = targetUrl;
                }
            })
            .always(function () {
                hidePropzyLoading();
            });
    });
}

$(document).ready(function () {
    //getListingMatchedOrderNotify();
    //setInterval(getListingMatchedOrderNotify, 60000);
    //leadReminderNotify();

    // getAssignedNotification();
    // setInterval(getAssignedNotification, 60000);

    //setInterval(leadReminderNotify, 10000);
    //setInterval(dealReminderNotify, 10000);
    // $.ajax({
    //     url: "/option/get-dashboard-statitics",
    //     type: "GET",
    // });
    // $.ajax({
    //     url: "/option/get-everyday-listing-count",
    //     type: "GET",
    // });
    $(".close-notification").on("click", function () {
        $(this).parents(".alert").hide();
    });

    setInterval(checkAliveSession, 5 * 60 * 1000);
    toggleNotificationsContainer()
});
var supportNotifies = null;
function getSupportNotifies(response) {
    // $.ajax({
    //     url: "/tour/get-support-notifies",
    //     type: "get"
    // }).done(function (response) {
    supportNotifies = response.data
    if (response.result && response.data.length >= 0) {
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i]
            if ($(".notify-schedule-" + item.id).html()) {
                continue
            }
            var html = ""
            if (item.type == 1) {
                html =
                    "<li class='notify-schedule notify-schedule-" +
                    item.id +
                    "'>" +
                    //+ "<b>" + title + "</b><hr style='margin:0px;padding:0px;' />"
                    "<a class='close' onclick=\"return confirmScheduleNotify(" +
                    item.id +
                    ", " +
                    item.dealId +
                    ', null, false)">x</a>' +
                    item.conciergeName +
                    " đang gặp sự cố cần bạn hỗ trợ" +
                    "<div class='text-center'><button type='button' class='btn btn-success btn-confirm'  onclick=\"return confirmScheduleNotify(" +
                    item.id +
                    ", " +
                    item.dealId +
                    ', null, true)">Đồng ý</button></div>' +
                    "</li>"
            } else {
                html =
                    "<li class='notify-schedule notify-schedule-" +
                    item.id +
                    "'>" +
                    //+ "<b>" + title + "</b><hr style='margin:0px;padding:0px;' />"
                    "<a class='close' onclick=\"return confirmScheduleNotify(" +
                    item.id +
                    ", " +
                    item.dealId +
                    ', null, false)">x</a>' +
                    "Sự cố " +
                    item.conciergeName +
                    " vẫn chưa được giải quyết" +
                    "<div class='text-center'><button type='button' class='btn btn-success btn-confirm'  onclick=\"return confirmScheduleNotify(" +
                    item.id +
                    ", " +
                    item.dealId +
                    ", 3, null)\">Đã hoàn tất</button> <button type='button' class='btn btn-warning btn-confirm'  onclick=\"return confirmScheduleNotify(" +
                    item.id +
                    ", " +
                    item.dealId +
                    ', 2, null)">Đang giải quyết</button></div>' +
                    "</li>"
            }
            $("#notify-area .notifyList").append(html)
        }
        $(".notify-schedule").on("click", function () {})
    }
    // });
}

function confirmScheduleNotify(id, dealId, statusId, isConfirm) {
    var returnUrl = "/deal/tour/" + dealId;
    if (statusId == 3) {
        var item = null;
        for (var i = 0; i < supportNotifies.length; i++) {
            item = supportNotifies[i];
            if (item.id == id) {
                break;
            }
        }
        if (item != null && (item.note == null || item.note.trim() == "")) {
            statusId = 2;
            returnUrl = "?supportId=" + id;
        }
    }
    var postData = {
        id: id,
        note: null,
        statusId: statusId,
        isConfirmed: isConfirm,
    };
    $.ajax({
        url:
            "/tour/change-support-notify-status?data=" +
            JSON.stringify(postData),
        type: "get",
    })
        .done(function (response) {
            if (response.result) {
                $(".notify-schedule-" + id).remove();
                if (isConfirm === true || statusId == 2) {
                    window.location = returnUrl;
                } else if (statusId == 3) {
                    if (window.location.href.indexOf("deal/tour") > 0) {
                        window.location.reload();
                    }
                }
            } else {
                showPropzyAlert(response.message);
            }
        })
        .always(function () {});
}



function getDealNotifyBig(response) {
    // $.ajax({
    //     url: "/deal/notify",
    //     type: "get",
    // }).done(function (response) {
        var dealActionArray = [
            [
                [13, 23, 28, 30],
                "/crm-dashboard/task-detail/{taskId}?defineId={defineId}",
            ],
            [[16, 22], ""],
            [[19], "/"],
            [[14, 15, 18, 21, 24, 26], "/deal/detail/{dealId}"],
            [[25], "/deal/product/{dealId}"],
        ]
        var leadActionArray = [
            [[3, 9], ""],
            [[13], "/lead/product/{leadId}"],
            [[4, 7, 8, 12, 14], "/lead/detail/{leadId}"],
            [
                [5, 6, 11, 15, 16, 18],
                "/crm-dashboard/task-detail/{taskId}?defineId={defineId}",
            ],
        ]
        var actionArray = {
            1: dealActionArray,
            2: leadActionArray,
        }
        
        if (response.result && response.data.length >= 0) {
            supportNotifies = response.data;
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i]
                if ($(".notify-deal-" + item.id).html()) {
                    $(".notify-deal-" + item.id).remove()
                    //continue;
                }
                var html = ""
                var targetLink = ""

                if (departmentId == 5 && item.actionId == 6) {
                    targetLink =
                        "/?action=show_task_detail&taskId=" +
                        item.taskId +
                        "&defineId=" +
                        item.defineId
                } else {
                    $(actionArray[item.typeId]).each(function (idx, action) {
                        if (action[0].indexOf(item.actionId) >= 0) {
                            var tempLink = action[1]
                            $(Object.keys(item)).each(function (idx, key) {
                                if (tempLink.indexOf("{") < 0) {
                                    return false
                                }
                                if (item[key] != null) {
                                    tempLink = tempLink.replace(
                                        "{" + key + "}",
                                        item[key]
                                    )
                                }
                            })
                            targetLink = tempLink
                            return false
                        }
                    })
                }
                html =
                    "<li class='notify-deal notify-deal-" +
                    item.id +
                    "'>" +
                    "<a class='hideNotify' href='#' onclick='return hideNotification(this);' data-type-id=" +
                    item.typeId +
                    " data-id=" +
                    item.id +
                    " data-ids=" +
                    JSON.stringify(item.ids) +
                    "><i class='fa fa-arrow-down'></i></a>" +
                    "<a class='close' data-type-id=" +
                    item.typeId +
                    " data-id=" +
                    item.id +
                    " data-ids=" +
                    JSON.stringify(item.ids) +
                    ">x</a>" +
                    "<a class='item-link' href='" +
                    targetLink +
                    "' data-type-id=" +
                    item.typeId +
                    " data-id=" +
                    item.id +
                    " data-ids=" +
                    JSON.stringify(item.ids) +
                    ">" +
                    item.message +
                    "</a>" +
                    "</li>"
                $("#notify-area .notifyList").append(html)
            }
            $(".notify-deal a.item-link").on("click", function (event) {
                event.preventDefault()
                var targetLink = $(this).attr("href")
                var selector = $(this)
                var postData = {
                    id: $(this).attr("data-id"),
                    typeId: $(this).attr("data-type-id"),
                    ids: JSON.parse($(this).attr("data-ids")),
                }
                if (postData.ids === null) {
                    delete postData["ids"]
                } else {
                    for (var i = 0; i < postData.ids.length; i++) {
                        delete postData.ids[i]["meetingId"]
                        delete postData.ids[i]["time"]
                    }
                }
                showPropzyLoading()
                $.ajax({
                    url: "/deal/set-notify-read",
                    type: "post",
                    data: JSON.stringify(postData),
                })
                    .done(function (response) {
                        if (response.result) {
                            selector.parents("li.notify-schedule").remove()
                            window.location = targetLink
                        }
                    })
                    .always(function () {
                        hidePropzyLoading()
                    })
            })

            $(".notify-deal a.close").on("click", function (event) {
                event.preventDefault()
                var selector = $(this)
                var postData = {
                    id: $(this).attr("data-id"),
                    typeId: $(this).attr("data-type-id"),
                    ids: JSON.parse($(this).attr("data-ids")),
                }
                if (postData.ids === null) {
                    delete postData["ids"]
                } else {
                    for (var i = 0; i < postData.ids.length; i++) {
                        delete postData.ids[i]["meetingId"]
                        delete postData.ids[i]["time"]
                    }
                }
                showPropzyLoading()
                $.ajax({
                    url: "/deal/set-notify-read",
                    type: "post",
                    data: JSON.stringify(postData),
                })
                    .done(function (response) {
                        if (response.result) {
                            selector.parents("li.notify-deal").remove()
                        }
                    })
                    .always(function () {
                        hidePropzyLoading()
                    })
            })
        }
    // })
}

var CrmNotify = (function () {
    var myModal = $("#modalTaskDetail")
    var getnotify = function (response) {
        // $.ajax({
        //     "url": "/crm-dashboard/get-emergency-meeting",
        //     "type": "get"
        // }).done(function (response) {
        if (
            response.data &&
            response.data.length > 0 &&
            $.inArray("#modalTaskDetail", PropzyActivePopups) < 0
        ) {
            var currentModalTaskId = myModal.find(".modal-task-id").val()
            var isCloseCurrentModal = true
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i]
                if (item.taskId == currentModalTaskId) {
                    isCloseCurrentModal = false
                }
            }
            if (isCloseCurrentModal) {
                // myModal.modal("hide");
            }
            var item = response.data[0]
            myModal.find(".modal-task-id").val(item.taskId)
            myModal
                .find(".modal-body")
                .load(
                    "/crm-dashboard/task-detail/" +
                        item.taskId +
                        "/?defineId=" +
                        item.defineId +
                        " #tasks",
                    null,
                    function () {
                        //$("#tasks .content-header").remove();
                        var meetingId = $("#modalTaskDetail")
                            .find(".meetingId")
                            .val()
                        $("#modalTaskDetail .content-header a").remove()
                        if ($.inArray(item.defineId, [31, 58]) >= 0) {
                            ModalRejectMeeting.init(item.taskId, meetingId)
                        }
                        if ($.inArray(item.defineId, [57]) >= 0) {
                            ReassignMeeting()
                        }
                        myModal.modal({
                            backdrop: "static",
                            keyboard: false,
                        })
                        PropzyActivePopups.push("#modalTaskDetail")
                    }
                )
        } else {
            // myModal.modal("hide");
        }
        $("#modalTaskDetail").on("hidden.bs.modal", function () {
            try {
                while (PropzyActivePopups.indexOf("#modalTaskDetail") >= 0) {
                    PropzyActivePopups.splice(
                        PropzyActivePopups.indexOf("#modalTaskDetail"),
                        1
                    )
                }
            } catch (ex) {}
        })
        // }).always(function () {

        // });
    }

    return {
        start: function () {
            getnotify()
        },
        getnotify: getnotify,
    }
})()

$(document).ready(function () {
    var isItemIn = false;
    [12, 5, 20].forEach((element) => {
        if (currentUser.departmentIds.includes(element)) {
            isItemIn = true;
        }
    });
    // if (isShowModalTaskDetail && isItemIn) {
    //     CrmNotify.getnotify();
    //     setInterval(CrmNotify.getnotify, 10000);


    //     getSupportNotifies();
    //     setInterval(getSupportNotifies, 20000);



    //     getDealNotify();
    //     setInterval(getDealNotify, 60000);

    //     getDealNotifyBig();
    //     setInterval(getDealNotifyBig, 60000);

    //     getMissingSchedules();
    //     setInterval(getMissingSchedules, 30000);

    //     getUnreadNotifications();
    //     // setInterval(getUnreadNotifications, 300000); //5m get unread
    //     setInterval(getUnreadNotifications, 60000); //1m get unread
    // }

    registerSocketNotification();
});

$(".toggleNotifications").on("click", function (event) {
    event.preventDefault();
    $("#notify-area ul.notifyList>li").show();
    $(".hiddenDealNotifyCount").html(0);
});

var hideNotification = function (selector) {
    $(selector).parents("li").hide();
    try {
        var hiddenItemsCount = parseInt($(".hiddenDealNotifyCount").html().trim());
        hiddenItemsCount++;
        $(".hiddenDealNotifyCount").html(hiddenItemsCount);
        return false;
    } catch (error) {
        
    }
};

const setRemindTaskNotificationRead = function (mongoId, callback) {
    showPropzyLoading();
    $.ajax({
        url: "/notification/set-read-remind-task/" + mongoId,
        type: "get",
    })
        .done(function (response) {
            if (response.result) {
                if (callback) {
                    callback(response);
                }
            }
        })
        .error(function (resp) {
            if (resp.status === 500) {
                alert(resp.statusText)
            }
        })
        .always(function () {
            hidePropzyLoading();
        });
};

var setNotificationRead = function (mongoId, callback) {
    showPropzyLoading();
    $.ajax({
        url: "/notification/set-read/" + mongoId,
        type: "get",
    })
        .done(function (response) {
            if (response.result) {
                if (callback) {
                    callback(response);
                }
            }
        })
        .always(function () {
            hidePropzyLoading();
        });
};

const toggleNotificationsContainer = () => {
    $('.notifyList li:first-child').hide()
    $('.notifyList').bind('DOMSubtreeModified', function () {
        if ($('.notifyList li').length > 1) {
            $('.notifyList li:first-child').show()
        }
    });

    $('.toggle-notification').click(() => {
        if (!$('.toggle-notification').hasClass('right')) {
            $('.toggle-notification').addClass('right')
            $('.toggle-notification i').removeClass('fa-chevron-right').addClass('fa-chevron-left')
            $('.notifyList').css({'width': 0})
            $('.notifyList li .hideNotify').hide()
        } else {
            $('.toggle-notification').removeClass('right')
            $('.toggle-notification i').removeClass('fa-chevron-left').addClass('fa-chevron-right')
            $('.notifyList').css({'width': '520px'})
            $('.notifyList li .hideNotify').show()
        }

        return false
    })
}