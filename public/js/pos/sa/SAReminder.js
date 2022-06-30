function SAReminder() {
    var _this = this

    _this.init = function () {
        initVAR()
        bindData()
        bindEvent()
    }

    function initVAR() {
        var api = Window.sa.api

        _this.reminderReasonId = "#reminder-reason"
        _this.reminderNoteId = "#reminder-note"
        _this.reminderData = {
            assignedTo: hasValue(currentUser) ? currentUser.userId : null,
            reminderDate: null,
            workTypeId: null,
            rlistingId: hasValue(Window.jsDetailData)
                ? Window.jsDetailData.rlistingId
                : null,
            note: null,
        }
        _this.reminderChannelStatusId = "#reminder-channel-status"
        _this.createReminderId = "#sa-create-reminder"
        _this.createReminderModalId = "#create-reminder-modal"
        _this.cancelListingModalId = "#cancel-listing-modal"
        _this.showNoteRemiderModelId = "#show-note-reminder-modal"

        _this.isValid = {
            date: true,
            time: true,
        }

        _this.createReminder = function () {
            buildReminderData()
            return api.createReminder(_this.reminderData)
        }

        _this.closeReminder = function (reminderId) {
            return api.closeReminder({
                reminderId: reminderId,
            })
        }

        _this.closeReminderLocal = function () {
            var id = _this.getRemiderId()
            var lsoId = Window.sa.data.data().rlistingId

            if (hasValue(id)) {
                _this.closeReminder(id).done(function (response) {
                    localStorage.removeItem("idReminderSa-" + lsoId)
                    _this.getReminder()
                })
            }
        }

        _this.getRemiderId = function () {
            var lsoId = Window.sa.data.data().rlistingId
            var id = localStorage.getItem("idReminderSa-" + lsoId)
            hasValue(id) ? parseInt(id) : null
            return id
        }

        _this.getReminder = function () {
            api.getReminder().done(function (response) {
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
                                .data("lsoid", item.rlistingId)
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
                                    item.rlistingId +
                                    '" class="notify-reminder-tag">' +
                                    "<h4>" +
                                    name +
                                    '<small><span class="badge">#' +
                                    item.rlistingId +
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
                                "SA: Bạn có <code>" +
                                sizeOfReminder +
                                "</code> thông báo.",
                        })
                    }
                }
            })
        }
    }

    function bindData() {
        initCreateReminderModal()
        if (currentUser.departments[0].departmentId == 17) {
            _this.getReminder()
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
                        if (response.result) {
                            showPropzyAlert(
                                "Tạo reminder thành công",
                                "Thông báo",
                                function (e) {
                                    $(_this.createReminderModalId).modal("hide")
                                    location.reload()
                                }
                            )
                        } else {
                            showPropzyAlert("Tạo reminder không thành công")
                        }
                    })
                }
            })

        $("body")
            .off("click", ".notify-reminder-tag")
            .on("click", ".notify-reminder-tag", function (e) {
                var lsoId = $(this).data("lsoid")
                var id = $(this).data("id")
                localStorage.setItem("idReminderSa-" + lsoId, id)
                window.open("/pos/sa/detail/" + lsoId, "_blank")
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
                localStorage.setItem("idReminderSa-" + lsoId, id)
                window.open("/pos/sa/detail/" + lsoId, "_blank")
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
                $(_this.reminderReasonId).val(63)
                $(_this.reminderReasonId).trigger("change")
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
                $(_this.reminderChannelStatusId).val(25)
                $(_this.reminderChannelStatusId).trigger("change")
            }
        })
    }
}
