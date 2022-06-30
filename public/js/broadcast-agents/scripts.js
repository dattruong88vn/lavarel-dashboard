function broadcastAgent(element) {
    $.confirm({
        title: "Broadcast!",
        content:
            "" +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            "<label>Ghi chú thêm cho agents (không bắt buộc)</label>" +
            '<input type="text" placeholder="Ghi chú thêm ..." class="name form-control" required />' +
            "</div>" +
            "</form>",
        buttons: {
            formSubmit: {
                text: "Gửi",
                btnClass: "btn-blue",
                action: function () {
                    showPropzyLoading()
                    var name = this.$content.find(".name").val()
                    if (typeof deal === "undefined") {
                        var urlStore = "/broadcast/store/lead"
                        var postData = {
                            id: lead.leadId,
                            note: name,
                        }
                    } else {
                        var urlStore = "/broadcast/store"
                        var postData = {
                            id: deal.dealId,
                            note: name,
                            type: "deal",
                        }
                    }

                    $.ajax({
                        url: urlStore,
                        type: "post",
                        data: postData,
                    })
                        .done(function (response) {
                            if (response.response.result == true) {
                                $(element).hide()
                            }
                            $.alert(response.response.message)
                        })
                        .always(function () {
                            hidePropzyLoading()
                        })
                },
            },
            cancel: {
                text: "Hủy",
                action: function () {},
            },
        },
        onContentReady: function () {
            // bind to events
            var jc = this
            this.$content.find("form").on("submit", function (e) {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault()
                jc.$$formSubmit.trigger("click") // reference the button and click it
            })
        },
    })
}

var idBroadcastGobal = 0
var wasLoaded = false
var page = 1

function loadDetailBroadcast() {
    var postData = {
        id: idBroadcastGobal,
        page: page,
    }
    console.log(postData)
    return $.ajax({
        url: "/broadcast/get-broadcast-detail",
        type: "post",
        data: postData,
        beforeSend: function () {
            $(".right")
                .parents("div")
                .first()
                .append(
                    "<div id='load-icon-broadcast' class='text-center' style='position: absolute; padding: 10px 0px; top: 50%; left: 30%; width: 40%; border-radius: 3px; background-color: #00a7d0; font-size: 12px; color: #fff;'><i class='fa fa-spinner'></i><br> Đang tải dữ liệu...</div>"
                )
        },
    }).always(function () {
        hidePropzyLoading()
        $(".right").parents("div").first().find("#load-icon-broadcast").remove()
        window.location.hash = idBroadcastGobal
    })
}

function firstViewDetailBroadcast(element, idBroadcast) {
    idBroadcastGobal = idBroadcast
    wasLoaded = true
    page = 1
    $(".right").scrollTop(0)
    $.when(loadDetailBroadcast()).done(function (loadBroadcast) {
        console.log(loadBroadcast)
        if (loadBroadcast.length > 0) {
            $(".right .content").html(loadBroadcast)
            $(".right").data("idBroadcast", idBroadcastGobal)
            JMDetail ? JMDetail.openPhoto() : '';
            eventLoadMore()
            $(".box-footer").removeClass("active-comments")
            $(element).parents(".box-footer").addClass("active-comments")
        } else {
            alert("Đã có lỗi sảy ra")
        }
    })
}

function updateBroadcastStatus(element, broadcastResponseId) {
    var status = $(element).attr("data-status")
    var updateStatus
    if (status == 0) {
        updateStatus = 1
    } else {
        updateStatus = 0
    }
    var postData = {
        broadcastResponseId: broadcastResponseId,
        status: updateStatus,
    }
    $.ajax({
        url: "/broadcast/update-broadcast-status",
        type: "post",
        data: postData,
    })
        .done(function (response) {
            if (response.result == true) {
                $(element).attr("data-status", updateStatus)
                if (updateStatus == 0)
                    $(element).children().removeClass("bookmarked")
                else $(element).children().addClass("bookmarked")
            }
        })
        .always(function () {
            hidePropzyLoading()
        })
}

function updateBroadcastNote(element, broadcastResponseId) {
    var note = $(element).val()
    if (note == "") {
        showPropzyAlert("Vui lòng nhập ghi chú")
        return false
    }

    var postData = {
        broadcastResponseId: broadcastResponseId,
        note: note,
    }
    $.ajax({
        url: "/broadcast/update-broadcast-note",
        type: "post",
        data: postData,
    })
        .done(function (response) {
            if (response.response.result == true) {
                $(element)
                    .parent()
                    .parent()
                    .append('<span class="note-broadcast">' + note + "</span>")
                $(element).parent().parent().find(".edit-note").show()
                $(element).parent().remove()
            }
        })
        .always(function () {
            hidePropzyLoading()
        })
}

function editNote(element, broadcastResponseId) {
    var text = $(element).parent().find(".note-broadcast").text()
    $(element).parent().find(".note-broadcast").remove()
    $(element).parent().find(".edit-note").hide()
    $(element)
        .parent()
        .append(
            '<div class="img-push"><input type="text" required class="form-control input-sm broadcast-note" value="' +
                text +
                '" onkeydown="if (event.keyCode == 13) { updateBroadcastNote(this,' +
                broadcastResponseId +
                '); return false; }"></div>'
        )
}

function eventLoadMore() {
    $(".right").on("scroll", function () {
        if (
            $(this).scrollTop() + $(this).innerHeight() >=
            $(this)[0].scrollHeight
        ) {
            if (wasLoaded) {
                page++
                $.when(loadDetailBroadcast()).done(function (loadBroadcast) {
                    if (loadBroadcast.length > 0) {
                        $(".right .content").append(loadBroadcast)
                    } else {
                        wasLoaded = false
                    }
                })
            }
        }
    })
}

$(document).ready(function () {
    $("#startDate").datepicker({
        format: "dd-mm-yyyy",
        autoclose: true,
        minDate: 0,
    })
    $("#endDate")
        .datepicker({
            format: "dd-mm-yyyy",
            autoclose: true,
        })
        .on("show", function (e) {
            var startDate = $("#startDate").val()
            $(this).data("datepicker").setStartDate(startDate)
        })
    var itemBroadcast = $(".left .box-footer")
    var hashBroadcast = null
    if (window.location.hash) hashBroadcast = window.location.hash.substring(1)
    $.each(itemBroadcast, function (key, item) {
        if ($(item).find(".has-broadcast") && hashBroadcast == null) {
            $(item).find(".has-broadcast").trigger("click")
            $(".left").animate({ scrollTop: $(item).get(0).offsetTop }, 100)
            return false
        }
        if (
            hashBroadcast != null &&
            $(item).find(".has-broadcast").data("broadcast-id") == hashBroadcast
        ) {
            $(item).find(".has-broadcast").trigger("click")
            $(".left").animate(
                {
                    scrollTop: $(item).parents(".carousel").first().get(0)
                        .offsetTop,
                },
                100
            )
            $(item)
                .parents(".carousel-inner")
                .first()
                .find(".item")
                .removeClass("active")
            var active = $(item)
                .find(".has-broadcast")
                .parents(".item")
                .first()
                .addClass("active")

            $(item)
                .parents(".carousel")
                .first()
                .find(".carousel-indicators li")
                .removeClass("active")
            $(item)
                .parents(".carousel")
                .first()
                .find(".carousel-indicators li")
                .eq(active.data("slide-index"))
                .addClass("active")
            return false
        }
    })

    $("#btn-search").click(function () {
        var searchKey = $("#searchKey").val()
        var postData = {
            searchKey: searchKey,
        }
        $.ajax({
            url: "/broadcast/search-broadcast",
            type: "post",
            data: postData,
        })
            .done(function (response) {
                $(".left").html(response)
            })
            .always(function () {
                hidePropzyLoading()
            })
    })

    $(".btn-filter").click(function () {
        var page = 1
        var district = 0
        if ($("#district").val() > 0) {
            district = $("#district").val()
        }

        var bookmarked = 0
        if ($("#bookmarked").is(":checked")) {
            var bookmarked = 1
        }
        var startDate = 0
        if ($("#startDate").val()) {
            console.log($("#startDate").val())
            startDate = HumanToEpoch2($("#startDate").val())
            console.log(startDate)
        }

        var currentdate = new Date()
        var endDate =
            currentdate.getDate() +
            "-" +
            (currentdate.getMonth() + 1) +
            "-" +
            currentdate.getFullYear() +
            " " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds()
        endDate = HumanToEpoch2(endDate)
        if ($("#endDate").val()) {
            endDate = HumanToEpoch2($("#endDate").val() + " 23:59:59")
        }

        var postData = {
            id: idBroadcastGobal,
            page: page,
        }

        postData["filter"] = [
            {
                columnName: "br.createdDate",
                value: startDate + "-" + endDate,
            },
        ]

        if (district > 0) {
            postData["filter"].push({
                columnName: "districtId",
                value: district,
            })
        }

        postData["filter"].push({
            columnName: "br.isBookmarked",
            value: bookmarked,
        })

        if ($("#listingStatusId").val() != "-1") {
            postData["filter"].push({
                columnName: "br.listingStatusId",
                value: parseInt($("#listingStatusId").val()),
            })
        }
        //console.log(postData);
        $.ajax({
            url: "/broadcast/filter-broadcast",
            type: "post",
            data: postData,
        })
            .done(function (response) {
                $(".right .content").html(response)
            })
            .always(function () {
                hidePropzyLoading()
            })
    })
})

function parseMonth(mnth) {
    switch (mnth.toLowerCase()) {
        case "january":
        case "jan":
        case "enero":
            return 1
        case "february":
        case "feb":
        case "febrero":
            return 2
        case "march":
        case "mar":
        case "marzo":
            return 3
        case "april":
        case "apr":
        case "abril":
            return 4
        case "may":
        case "mayo":
            return 5
        case "jun":
        case "june":
        case "junio":
            return 6
        case "jul":
        case "july":
        case "julio":
            return 7
        case "aug":
        case "august":
        case "agosto":
            return 8
        case "sep":
        case "september":
        case "septiembre":
        case "setiembre":
            return 9
        case "oct":
        case "october":
        case "octubre":
            return 10
        case "nov":
        case "november":
        case "noviembre":
            return 11
        case "dec":
        case "december":
        case "diciembre":
            return 12
    }
    return mnth
}

function HumanToEpoch2(strDate) {
    strDate = strDate.replace(/[\,]/g, "")
    strDate = strDate.replace(/^\s+|\s+$/g, "")
    strDate = strDate.replace(/ +(?= )/g, "")
    strDate = strDate.replace(/^(\d+)\./, "$1")
    var ok = 0
    var skipDate = 0
    var content = ""
    var date = ""
    var format = ""
    var yr = 1970
    var mnth = 1
    var dy = 1
    var hr = 0
    var mn = 0
    var sec = 0
    var dmy = 1
    if (!ok) {
        var dateTimeSplit = strDate.split(" ")
        var dateParts = dateTimeSplit[0].split("-")
        if (dateParts.length === 1) dateParts = dateTimeSplit[0].split(".")
        if (dateParts.length === 1) {
            dmy = 0
            dateParts = dateTimeSplit[0].split("/")
        }
        if (dateParts.length === 1) {
            dmy = 1
            if (dateTimeSplit.length > 2) {
                if (dateTimeSplit[2].split(":").length === 1) {
                    strDate = strDate.replace(
                        dateTimeSplit[0] +
                            " " +
                            dateTimeSplit[1] +
                            " " +
                            dateTimeSplit[2],
                        dateTimeSplit[0] +
                            "-" +
                            dateTimeSplit[1] +
                            "-" +
                            dateTimeSplit[2]
                    )
                    dateTimeSplit = strDate.split(" ")
                    dateParts = dateTimeSplit[0].split("-")
                }
            }
        }
        if (dateParts.length === 1) {
            dateParts = dateTimeSplit
            if (dateTimeSplit.length > 3) timeParts = dateTimeSplit[4]
        }
        if (dateParts.length > 2) {
            if (dateParts[0] > 100) {
                yr = dateParts[0]
                mnth = parseMonth(dateParts[1])
                dy = dateParts[2]
                format = "YMD"
            } else {
                if (dmy) {
                    dy = dateParts[0]
                    mnth = parseMonth(dateParts[1])
                    yr = dateParts[2]
                    format = "DMY"
                    if (!parseFloat(mnth) || !parseFloat(dy)) {
                        dy = dateParts[1]
                        mnth = parseMonth(dateParts[0])
                        format = "MDY"
                    }
                } else {
                    mnth = parseMonth(dateParts[0])
                    dy = dateParts[1]
                    yr = dateParts[2]
                    format = "MDY"
                    if (!parseFloat(mnth) || !parseFloat(dy)) {
                        dy = dateParts[0]
                        mnth = parseMonth(dateParts[1])
                        format = "DMY"
                    }
                }
            }
            ok = 1
        }
        if (ok && dateTimeSplit[1]) {
            var timeParts = dateTimeSplit[1].split(":")
            if (timeParts.length >= 2) {
                hr = timeParts[0]
                mn = timeParts[1]
            }
            if (timeParts.length >= 3) {
                sec = timeParts[2]
            }
            if (
                dateTimeSplit[2] &&
                dateTimeSplit[2].toLowerCase() === "pm" &&
                parseFloat(hr) < 12
            )
                hr = parseFloat(hr) + 12
            if (
                dateTimeSplit[2] &&
                dateTimeSplit[2].toLowerCase() === "am" &&
                parseFloat(hr) === 12
            )
                hr = 0
        }
    }
    if (!ok) {
        date = new Date(strDate)
        if (date.getFullYear() > 1900) {
            ok = 1
            skipDate = 1
        }
    }
    if (ok) {
        if (!skipDate) {
            if (mnth !== parseFloat(mnth)) mnth = parseMonth(mnth)
            if (yr < 30) yr = 2000 + parseFloat(yr)
            if (yr < 200) yr = 1900 + parseFloat(yr)
            var usedGMT = 0
            if (
                (strDate.toUpperCase().indexOf("GMT") > 0 ||
                    strDate.toUpperCase().indexOf("UTC") > 0) &&
                strDate.toUpperCase().indexOf("GMT+") == -1 &&
                strDate.toUpperCase().indexOf("UTC+") == -1
            ) {
                date = new Date(Date.UTC(yr, mnth - 1, dy, hr, mn, sec))
                usedGMT = 1
            } else {
                date = new Date(yr, mnth - 1, dy, hr, mn, sec)
            }
        }
        content = date.getTime()
    }
    return content
}
