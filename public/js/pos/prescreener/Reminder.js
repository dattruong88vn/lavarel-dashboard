function Reminder() {
    var _this = this

    _this.init = function () {
        initVAR()
        bindData()
        bindEvent()
    }

    function initVAR() {
        _this.reminderReasonId = "#reminder-reason"
        _this.reminderNoteId = "#reminder-note"
        _this.reminderData = {
            assignedTo: hasValue(currentUser) ? currentUser.userId : null,
            reminderDate: null,
            workTypeId: null,
            lsoId: hasValue(Window.jsDetailData)
                ? Window.jsDetailData.id
                : null,
            note: null,
            statusId: null,
        }
        _this.reminderChannelStatusId = "#reminder-channel-status"
        _this.createReminderId = "#create-reminder"
        _this.createReminderModalId = "#create-reminder-modal"
        _this.cancelListingModalId = "#cancel-listing-modal"
        _this.showNoteRemiderModelId = "#show-note-reminder-modal"
        _this.isValid = {
            date: true,
            time: true,
        }
    }

    _this.createReminder = function () {
        buildReminderData()
        return Listing.createReminder(_this.reminderData)
    }

    _this.closeReminder = function (reminderId) {
        return Listing.closeReminder({
            reminderId: reminderId,
        })
    }

    _this.closeReminderLocal = function () {
        var id = _this.getRemiderId()
        var lsoId = Window.globalVar.listingDetail.data.id

        if (hasValue(id)) {
            _this.closeReminder(id).done(function (response) {
                localStorage.removeItem("idReminder-" + lsoId)
                getReminder()
            })
        }
    }

    _this.clearLocalStored = function () {
        var lsoId = Window.globalVar.listingDetail.data.id
        localStorage.removeItem("idReminder-" + lsoId)
    }

    _this.closeModelBtn = function (callback) {
        $("body")
            .off("hidden.bs.modal", _this.createReminderModalId)
            .on("hidden.bs.modal", _this.createReminderModalId, function (e) {
                callback(e)
            })
    }

    _this.saveModelBtn = function (callback) {
        $("body")
            .off("click", _this.createReminderId)
            .on("click", _this.createReminderId, function (e) {
                callback(e)
            })
    }

    _this.getRemiderId = function () {
        var lsoId = Window.globalVar.listingDetail.data.id
        var id = localStorage.getItem("idReminder-" + lsoId)
        hasValue(id) ? parseInt(id) : null
        return id
    }

    function bindData() {
        initCreateReminderModal()
        if (currentUser.departments[0].departmentId == 16) {
            getReminder()
        }
    }

    function bindEvent() {
        $("body")
            .off("click", _this.createReminderId)
            .on("click", _this.createReminderId, function (e) {
                e.preventDefault()
                if (_this.isValid.date && _this.isValid.time) {
                    showPropzyLoading()
                    _this.createReminder().done(function (response) {
                        hidePropzyLoading()
                        showPropzyAlert(
                            response.message,
                            "Thông báo",
                            function (e) {
                                if (response.result) {
                                    Window.globalVar.listingDetail.data.statusId = $(
                                        "#reminder-channel-status"
                                    ).val()
                                    $(_this.createReminderModalId).modal("hide")
                                    location.reload()
                                }
                            }
                        )
                    })
                }
            })

        $("body")
            .off("click", ".notify-reminder-tag")
            .on("click", ".notify-reminder-tag", function (e) {
                var lsoId = $(this).data("lsoid")
                var id = $(this).data("id")
                localStorage.setItem("idReminder-" + lsoId, id)
                window.open("/pos/prescreener/detail/" + lsoId, "_blank")
            })

        $("body")
            .off("click", ".notify-remider-note")
            .on("click", ".notify-remider-note", function (e) {
                var modal = $(_this.showNoteRemiderModelId)
                modal.find("#remider-model-ownerId").html($(this).data("name"))
                modal
                    .find("#remider-model-lsoId")
                    .html("#" + $(this).data("lsoid"))
                modal
                    .find("#remider-model-input-lsoid")
                    .val($(this).data("lsoid"))
                modal.find("#remider-model-input-id").val($(this).data("id"))
                modal.find("#remider-model-time").html($(this).data("time"))
                modal
                    .find("#remider-model-workType")
                    .html($(this).data("workType"))
                modal.find("#remider-model-note").html($(this).data("note"))
                $(_this.showNoteRemiderModelId).modal("show")
            })

        $("body")
            .off("click", "#remider-model-redirect")
            .on("click", "#remider-model-redirect", function (e) {
                var lsoId = $(_this.showNoteRemiderModelId)
                    .find("#remider-model-input-lsoid")
                    .val()
                var id = $(_this.showNoteRemiderModelId)
                    .find("#remider-model-input-id")
                    .val()
                localStorage.setItem("idReminder-" + lsoId, id)
                window.open("/pos/prescreener/detail/" + lsoId, "_blank")
            })
    }

    function getReminder() {
        Listing.getReminder().done(function (response) {
            if (response.result) {
                var data = response.data
                var sizeOfReminder = data.length
                var noti = $("li.notifications-menu")

                // show number notify
                var oldNotiCount = 0
                var dealNotifyList = noti.find(".dealNotifyList")
                noti.find(".dealNotifyCount").html(
                    parseInt(oldNotiCount) + sizeOfReminder
                )
                var lis = ""
                dealNotifyList.html("")
                $.each(response.data, function (i, item) {
                    var note = ""
                    var name =
                        item.classify == 3 ? item.agentName : item.ownerName
                    if ($.trim(item.note).length > 0) {
                        note = $('<span class="notify-remider-note">')
                            .html("Xem ghi chú...")
                            .data("id", item.id)
                            .data("lsoid", item.lsoId)
                            .data("name", name)
                            .data("note", item.note)
                            .data("workType", item.workTypeName)
                            .data(
                                "time",
                                moment(item.reminderDate).format(
                                    "DD/MM/YYYY HH:mm"
                                )
                            )
                    }
                    var li = $("<li>")
                        .html(
                            '<a href="javascript:void(0)" data-id="' +
                                item.id +
                                '" data-lsoid="' +
                                item.lsoId +
                                '" class="notify-reminder-tag">' +
                                "<h4>" +
                                name +
                                '<small><span class="badge">#' +
                                item.lsoId +
                                "</span></small>" +
                                "</h4>" +
                                "<p>" +
                                item.workTypeName +
                                '<small><i class="fa fa-clock-o"></i> ' +
                                moment(item.reminderDate).format(
                                    "DD/MM/YYYY HH:mm"
                                ) +
                                "</small>" +
                                "</p>" +
                                "</a>"
                        )
                        .append(note)
                    dealNotifyList.append(li)
                })

                if (sizeOfReminder > 0) {
                    createBootstrapNotification({
                        message:
                            "Prescreen: Bạn có <code>" +
                            sizeOfReminder +
                            "</code> thông báo.",
                    })
                }
            }
        })
    }

    function initCreateReminderModal() {
        // check whether reminderReasonId existing
        if ($(_this.reminderReasonId).length > 0) {
            loadReminderReason()
        }
        // check whether reminderChannelStatusId existing
        if ($(_this.reminderChannelStatusId).length > 0) {
            loadReminderChannelStatus()
        }

        $("#reminder-date").datepicker({
            format: "dd/mm/yyyy",
            todayHighlight: true,
            startDate: new Date(),
        })

        $("#reminder-time").timepicker({
            showMeridian: false,
            defaultTime: moment().add(5, "minutes").format("HH:mm"),
        })

        $("#reminder-date").datepicker("setDate", new Date())
        $("#reminder-date").on("change", function (ev) {
            var option = {
                val: null,
                name: "Ngày",
            }
            var date = moment(
                $("#reminder-date").datepicker("getDate")
            ).isValid()
            if (date) {
                option.val = date
            }
            _this.isValid.date = !$("#reminder-date").validateInputData(option)
        })
        $("#reminder-time").on("change", function (ev) {
            var option = {
                val: null,
                name: "Thời gian",
            }
            var now = moment().unix()
            var timeSelect = moment(
                $("#reminder-date input").val() +
                    " " +
                    $("#reminder-time").val(),
                "DD/MM/YYYY HH:mm"
            ).unix()
            if (now < timeSelect) {
                option.val = $("#reminder-time").val()
            }
            _this.isValid.time = !$("#reminder-time").validateInputData(option)
        })
    }

    function buildReminderData() {
        var reminderDate = $("#reminder-date input").val().split("/")
        var reminderTime = $("#reminder-time").val().split(":")
        _this.reminderData.reminderDate =
            moment(
                reminderDate + " " + reminderTime,
                "DD/MM/YYYY HH:mm"
            ).unix() * 1000
        _this.reminderData.workTypeId = $(_this.reminderReasonId).val()
        _this.reminderData.note = $(_this.reminderNoteId).val()
        _this.reminderData.statusId = $(_this.reminderChannelStatusId).val()
        _this.reminderData.lsoId = hasValue(Window.jsDetailData)
            ? Window.jsDetailData.id
            : null
    }

    function loadReminderReason() {
        Listing.getChannelTypes().done(function (response) {
            if (response.result) {
                var responseData = $.map(response.data, function (data) {
                    if (data.type == 8) {
                        return data
                    } else {
                        // nothing
                    }
                })

                var options = ""

                $.each(responseData[0].list, function (i, item) {
                    options +=
                        '<option value="' +
                        item.id +
                        '">' +
                        item.name +
                        "</option>"
                })

                $(_this.reminderReasonId).html(options)
            }
        })
    }

    function loadReminderChannelStatus() {
        Listing.getChannelStatus().done(function (response) {
            if (response.result) {
                var responseData = $.map(response.data, function (data) {
                    if (data.type == 6) {
                        return data
                    } else {
                        // nothing
                    }
                })

                var options = ""

                $.each(responseData[0].list, function (i, item) {
                    options +=
                        '<option value="' +
                        item.id +
                        '">' +
                        item.name +
                        "</option>"
                })

                $(_this.reminderChannelStatusId).html(options)
            }
        })
    }
}
