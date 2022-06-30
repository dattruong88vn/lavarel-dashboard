;(function ($) {
    $.fn.addRequired = function () {
        this.addClass("required")
        return this
    }
    $.fn.removeRequired = function () {
        this.removeClass("required")
        return this
    }
    $.fn.requiredError = function (option) {
        var setting = {
            val: null,
        }
        var id = this.attr("id")
        $.extend(setting, option)
        $('label[for="' + id + '"]').removeClass("form-label-danger")
        let isErr = false
        if (!isVal(setting.val)) {
            isErr = true
            $('label[for="' + id + '"]').addClass("form-label-danger")
        }
        return isErr
    }
    $.fn.requiredErrorRemove = function () {
        var id = this.attr("id")
        $('label[for="' + id + '"]').removeClass("form-label-danger")
    }

    $.fn.validateInputData = function (option) {
        var setting = {
            val: null,
            name: "",
            noShowMess: false,
            id: null,
            optionsErr: [],
        }
        var id = this.attr("id")
        $.extend(setting, option)

        $(".validate-" + id).remove()
        this.removeClass("form-input-danger")
        this.removeClass("pos-feild-err-is-null")
        this.removeClass("pos-feild-err-is-negative")
        $(".label-" + id).removeClass("form-label-danger")
        $(".label-" + setting.label).removeClass("form-label-danger")
        var errMessenger = $("<small>").addClass("text-danger validate-" + id)

        hasErr = false

        if (
            !isVal(setting.val) ||
            ($.inArray("notNegative", setting.optionsErr) != -1 &&
                setting.val < 0)
        ) {
            hasErr = true
            this.addClass("form-input-danger")

            if (!isVal(setting.val)) {
                this.addClass("pos-feild-err-is-null")
            } else if ($.inArray("notNegative", setting.optionsErr) != -1) {
                this.addClass("pos-feild-err-is-negative")
            }

            if (!setting.noShowMess) {
                if (this.data("select2")) {
                    $(errMessenger)
                        .html(setting.name + " không hợp lệ")
                        .insertAfter(this.parent().find(".select2"))
                } else {
                    if (isVal(setting.nameFull)) {
                        $(errMessenger).html(setting.nameFull).insertAfter(this)
                    } else {
                        $(errMessenger)
                            .html(setting.name + " không hợp lệ")
                            .insertAfter(this)
                    }
                }
            }
            if (isVal(setting.label)) {
                $(".label-" + setting.label).addClass("form-label-danger")
            } else {
                $(".label-" + id).addClass("form-label-danger")
            }
        }

        return hasErr
    }
    $.fn.basicAddErr = function (option) {
        var setting = {
            name: "",
            noShowMess: false,
            areaId: null,
        }
        $.extend(setting, option)
        var errorMsg = $("<small>").addClass("text-danger basic-err")
        if (!setting.noShowMess) {
            if (isVal(setting.areaId)) {
                $(errorMsg)
                    .html(setting.name + " không hợp lệ")
                    .appendTo(this)
            } else {
                $(errorMsg)
                    .html(setting.name + " không hợp lệ")
                    .insertAfter(this)
            }
        }
        this.addClass("form-input-danger")
    }
    $.fn.basicRemoveErr = function () {
        this.removeClass("form-input-danger")
        this.parent().find(".basic-err").remove()
    }
})(jQuery)

function clearAllValidate() {
    $(".form-label-danger").removeClass("form-label-danger")
    $(".form-input-danger").removeClass("form-input-danger")
    $("small.text-danger").remove()
}

function isVal(val) {
    var result = false
    if ($.type(val) !== "undefined" && val != null) {
        var type = $.type(val)
        if (type == "string") {
            if ($.trim(val) != "" && $.trim(val) != "null") {
                result = true
            }
        } else if (type == "object") {
            if (!$.isEmptyObject(val)) {
                result = true
            }
        } else if (type == "array") {
            if (val.length != 0) {
                result = true
            }
        } else {
            result = true
        }
    }
    return result
}

function getNewPhone() {
    var phones = $(".blc-phone-items")
        .map(function (idx, elem) {
            var phone = $(elem).find(".phone-multi").val()
            if ($.isNumeric(phone)) {
                return {
                    phoneSub: $(elem).find(".phone-multi").val(),
                    noteForPhone: $(elem).find(".phone-note").val(),
                }
            }
        })
        .get()
    return phones
}

function posPhoneCallRender(options) {
    const lines = $("#pos-phone-call-line-number").html("")
    const newPhone = $("#pos-phone-call-new-phone").html("")

    let setting = {
        phones: [],
        phonesAgent: [],
        isShowPhone: 1, //0 : show agent and owner, 1 show owner , 2 show agent
    }
    $.extend(setting, options)

    switch (setting.isShowPhone) {
        case 0: {
            break
        }
        case 1: {
            if (setting.phones.length > 0) {
                let primary = setting.phones.find((it) => it.isPrimary)

                if (!isVal(primary)) {
                    primary = {
                        phone: "",
                        noteForPhone: "",
                        isAgent: false,
                        isPrimary: true,
                    }
                }
                const lineP = posPhoneCallPhoneItem(primary)

                let subPhones = setting.phones.filter((it) => !it.isPrimary)
                let htmlS = ""
                if (subPhones && subPhones.length > 0) {
                    subPhones.forEach((it) => {
                        htmlS += posPhoneCallPhoneItem(it)
                    })
                }

                if (htmlS) {
                    lines.html(
                        '<div class="block-phones">' +
                            '<h4 class="title-primary">Số chính</h4>' +
                            lineP +
                            "</div>" +
                            '<div class="block-phones">' +
                            '<h4 class="title-sub">Số phụ</h4>' +
                            '<div class="form-group" style="text-align: right"><a id="btn-pos-phone-call-remove">Xóa</a> | <a id="btn-check-duplicated-phone">Kiểm tra</a></div>' +
                            htmlS +
                            "</div>"
                    )
                } else {
                    lines.html(
                        '<div class="block-phones">' +
                            '<h4 class="title-primary">Số chính</h4>' +
                            lineP +
                            "</div>"
                    )
                }

                // add html new subphone
                newPhone.html(
                    '<div class="block-phones">' +
                        '<div class="form-inline">' +
                        '<label class="checkbox control-label" style="visibility: hidden"><input type="checkbox">' +
                        '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                        "</label>" +
                        '<div class="form-group">' +
                        '<input type="text" class="form-control pos-phone-call-new-input-number" id="pos-phone-call-new-input-number" placeholder="Nhập số điện thoại" value="">' +
                        '<input type="text" class="form-control pos-phone-call-new-input-note" id="pos-phone-call-new-input-note" placeholder="Nhập ghi chú" value="">' +
                        '<div class="btn-pos-phone-call-group">' +
                        '<i class="btn-fa-circle btn-fa-circle-green fa fa-plus" id="btn-pos-phone-call-add"></i>' +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                )

                $("#make-call-action").show()
            } else {
                lines.html(
                    "<p>Không tồn tại số điện thoại. Xin vui lòng nhập số điện thoại cho chủ nhà</p>"
                )
                $(".btn-pos-phone-action-footer").hide()
                $("#btn-pos-close-phone").show()
            }
            break
        }
        case 2: {
            if (setting.phonesAgent.length > 0) {
                // get primary
                const primary = setting.phonesAgent.find((it) => it.isPrimary)
                const lineP = posPhoneCallPhoneItem(primary)

                lines.html(
                    '<div id="pos-phone-call-line-number">' +
                        '<div class="block-phones">' +
                        '<h4 class="title-agent">Số chính môi giới</h4>' +
                        lineP +
                        "</div>" +
                        "</div>"
                )
                // get subphone

                /*$.each(setting.phones, function (i, v) {
                    const line = posPhoneCallPhoneItem(v);

                });*/
                $("#make-call-action").show()
            } else {
                lines.html(
                    "<p>Vui lòng liên hệ bộ phận Agent Support để cập nhật lại thông tin số điện thoại</p>"
                )
                $(".btn-pos-phone-action-footer").hide()
                $("#btn-pos-close-phone").show()
            }
            break
        }
    }
}

function posPhoneCallPhoneItem(options) {
    let settings = {
        isAgent: false,
        phone: "",
        noteForPhone: "",
    }

    $.extend(settings, options)

    let line = ""
    if (settings.isAgent) {
        const noteForPhone = isVal(settings.noteForPhone)
            ? settings.noteForPhone
            : ""
        if (settings.isPrimary) {
            line =
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<label class="checkbox control-label" style="visibility: hidden"><input type="checkbox">' +
                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                "</label>" +
                '<input type="text" class="form-control pos-phone-call-input-number-agent pos-phone-list" readonly disabled placeholder="ghi chú" value="' +
                settings.phone +
                '">' +
                '<input type="text" class="form-control pos-phone-call-input-note-agent" placeholder="ghi chú" value="' +
                noteForPhone +
                '" >' +
                '<div class="btn-pos-phone-call-group">' +
                '<i class="btn-fa-circle btn-fa-circle-green fa fa-whatsapp make-call-action"></i>' +
                "</div>" +
                "</div>" +
                "</div>"
        } else {
            line =
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<label class="checkbox control-label" style="visibility: hidden"><input type="checkbox">' +
                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                "</label>" +
                '<input type="text" class="form-control pos-phone-call-input-number-agent pos-phone-list" readonly disabled placeholder="ghi chú" value="' +
                settings.phone +
                '">' +
                '<input type="text" class="form-control pos-phone-call-input-note-agent" placeholder="ghi chú" value="' +
                noteForPhone +
                '" >' +
                '<div class="btn-pos-phone-call-group">' +
                '<i class="btn-fa-circle btn-fa-circle-green fa fa-whatsapp make-call-action"></i>' +
                "</div>" +
                "</div>" +
                "</div>"
        }
    }

    if (!settings.isAgent) {
        const noteForPhone = isVal(settings.noteForPhone)
            ? settings.noteForPhone
            : ""
        if (settings.isPrimary) {
            line =
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<label class="checkbox control-label" style="visibility: hidden"><input type="checkbox">' +
                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                "</label>" +
                '<input type="text" class="form-control pos-phone-call-input-number-primary pos-phone-list" readonly disabled placeholder="số điện thoại" value="' +
                settings.phone +
                '">' +
                '<input type="text" class="form-control pos-phone-call-input-note-primary" placeholder="ghi chú" value="' +
                noteForPhone +
                '" >' +
                '<div class="btn-pos-phone-call-group">' +
                '<i class="btn-fa-circle btn-fa-circle-green fa fa-whatsapp make-call-action"></i>' +
                "</div>" +
                "</div>"
        } else {
            const isNew = settings.isNew ? "" : 'style="visibility: hidden"'
            line =
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<label class="checkbox control-label"><input type="checkbox" class="pos-phone-call-checkbox">' +
                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                "</label>" +
                '<input type="text" class="form-control pos-phone-call-input-number pos-phone-list" readonly disabled placeholder="số điện thoại" value="' +
                settings.phone +
                '">' +
                '<input type="text" class="form-control pos-phone-call-input-note" placeholder="ghi chú" value="' +
                noteForPhone +
                '" >' +
                '<div class="btn-pos-phone-call-group">' +
                '<i class="btn-fa-circle btn-fa-circle-green fa fa-whatsapp make-call-action"></i>' +
                '<i class="btn-fa-circle btn-fa-circle-primary fa fa-repeat btn-pos-phone-call-set-primary"></i>' +
                "</div>" +
                "</div>" +
                "</div>"
        }
    }

    return line
}

function renderHtmlModalCallAddPhone(phones, options) {
    var lines = $(".line-phone-number").html("")
    var agent = ""
    var primary = ""
    var secondaries = []
    var settings = {
        type: 1, // 1: owner, 2 : agent
        disableAddNewSubPhones: false,
        // showCheckBtn: false // only for add new primary phone
    }
    $.extend(settings, options)

    $.each(phones, function (i, data) {
        var line = renderLinePhoneAdd(data)

        if (isVal(data.isAgent) && data.isAgent) {
            agent = line
        } else if (isVal(data.isPrimary) && data.isPrimary) {
            primary = line
        } else {
            secondaries.push(line)
        }
    })

    if (settings.type == 2) {
        if (!isVal(phones)) {
            $(".new-subPhone").hide()
            $("#make-call-action").hide()
            $(".line-phone-number").html(
                "<p>Vui lòng liên hệ bộ phận Agent Support để cập nhật lại thông tin số điện thoại</p>"
            )
            return false
        } else {
            $(".new-subPhone").show()
            $("#make-call-action").show()
        }
        $("#btn-check-duplicated-phone").hide()
    } else {
        if (!isVal(phones)) {
            $(".new-subPhone").hide()
            $("#make-call-action").hide()
            $("#btn-check-duplicated-phone").hide()
            $(".line-phone-number").html(
                "<p>Không tồn tại số điện thoại. Xin vui lòng nhập số điện thoại cho chủ nhà</p>"
            )
            return false
        } else {
            $(".new-subPhone").show()
            $("#make-call-action").show()
        }
    }
    // $('.new-subPhone').show();
    if (isVal(primary)) {
        for (var i = 0; i < secondaries.length; i++) {
            lines.append(secondaries[i])
        }
        lines.prepend('<h4 class="title-sub">Số phụ của chủ nhà</h4>')
        lines
            .prepend(primary)
            .prepend('<h4 class="title-primary">Số chủ nhà</h4>')
        $(".new-subPhone").show()
    } else {
        $(".new-subPhone").hide()
    }
    if (isVal(agent)) {
        lines.prepend(agent).prepend('<h4 class="title-agent">Số môi giới</h4>')
    }
    if (settings.disableAddNewSubPhones == true) {
        $(".new-subPhone input").prop("disabled", true)
        $(".new-subPhone button").prop("disabled", true)
    } else {
        $(".new-subPhone input").prop("disabled", false)
        $(".new-subPhone button").prop("disabled", false)
    }
    if (hasValue(settings.showCheckBtn)) {
        if (settings.showCheckBtn == true) {
            $("#btn-check-duplicated-phone").show()
        } else {
            $("#btn-check-duplicated-phone").hide()
        }
    }
}

function renderLinePhoneAdd(phones) {
    var data = {
        phoneSub: null,
        isNew: false,
        noteForPhone: "",
        isPrimary: false,
    }
    $.extend(data, phones)
    data.noteForPhone = isVal(data.noteForPhone) ? data.noteForPhone : ""
    var line = $('<div class="form-inline">')
    line.append(
        '<div class="form-group"><label class="radio control-label col-xs-12"><input type="radio" value="' +
            data.phoneSub +
            '" name="phone-list"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ' +
            data.phoneSub +
            "</label><div>"
    )
    if (!isVal(data.isAgent) || !data.isAgent) {
        line.append(
            '<div class="form-group"><input type="text" class="form-control input-note-phone" placeholder="ghi chú" style="width: 338px" value="' +
                data.noteForPhone +
                '"></div>'
        )
    } else {
        line.append(
            '<div class="form-group"><p type="text" class="form-control-static">' +
                data.noteForPhone +
                "</p>"
        )
    }
    if (isVal(data.isNew) && data.isNew) {
        line.append(
            '<button type="button" class="btn btn-danger btn-sm btn-phone-remove btn-sub-phone">xóa</button>'
        )
    }
    if (isVal(data.isPrimary) && data.isPrimary) {
        line.find('input[name="phone-list"]').addClass("isPrimary")
    }
    return line
}

function renderHtmlCheckExistOwner(data) {
    var table = $(
        "<table style='width: 900px' id='table-check-exist-owner'></table>"
    ).addClass("table table-hover")
    table.append(
        "<thead><tr><th>#</th><th>Tên</th><th>Email</th><th>SĐT</th><th>Địa chỉ</th><th>Loại</th></tr></thead>"
    )
    var tbody = $("<tbody></tbody>")
    $.map(data, function (item) {
        var row = $("<tr></tr>")
        row.append($("<td></td>").text(""))
        row.append($("<td></td>").html(item.name))
        row.append($("<td></td>").text(item.email))
        row.append($("<td></td>").text(item.phone))
        row.append($("<td></td>").html(item.address))
        row.append($("<td></td>").text(item.typeName))
        tbody.append(row)
    })
    table.append(tbody)
    return table
}

function getPhoneSub(data) {
    var phones = $.grep(data, function (e) {
        return isVal(e.isNew) && e.isNew
    })
    return phones
}

function renderField(field) {
    switch (field.type) {
        case "select2":
            if (
                isVal(field.optionsList.type) &&
                field.optionsList.type == "ajax"
            ) {
                function getAjax() {
                    field.optionsList.data().done(function (response) {
                        var _optionList = field.optionsList.callBack(response)
                        $(field.id).html("")
                        $.each(_optionList, function (i, item) {
                            var attr = ""
                            if (isVal(item.data)) {
                                $.each(item.data, function (key, val) {
                                    attr += "data-" + key + '="' + val + '"'
                                })
                            }
                            const disabled = item.disabled ? ' disabled' : ''
                            if (isVal(item.selected)) {
                                $(field.id).append(
                                    '<option value="' +
                                        item.value +
                                        '" ' +
                                        attr +
                                        disabled +
                                        " selected>" +
                                        item.text +
                                        "</option>"
                                )
                            } else {
                                $(field.id).append(
                                    '<option value="' +
                                        item.value +
                                        '" ' +
                                        attr +
                                        disabled +
                                        ">" +
                                        item.text +
                                        "</option>"
                                )
                            }
                        })
                        if (isVal(field.value)) {
                            $(field.id).val(field.value)
                        }
                        if (isVal(field.attr)) {
                            $(field.id).attr(field.attr)
                        }

                        if (isVal(field.select2Attr)) {
                            $(field.id).select2(field.select2Attr)
                        } else {
                            $(field.id).select2()
                        }
                        if (isVal(field.optionsList.callBackFinish)) {
                            field.optionsList.callBackFinish(response)
                        }
                    })
                }

                getAjax()
                if (isVal(field.optionsList.changedBy)) {
                    $("body").on(
                        "change",
                        field.optionsList.changedBy,
                        function (e) {
                            e.preventDefault()
                            $(field.id).html("")
                            getAjax()
                        }
                    )
                }
            }
            if (
                isVal(field.optionsList.type) &&
                field.optionsList.type == "static"
            ) {
                function getStatic() {
                    $(field.id).html("")
                    $.each(field.optionsList.data(), function (i, item) {
                        var attr = ""
                        if (isVal(item.data)) {
                            $.each(item.data, function (key, val) {
                                attr += "data-" + key + '="' + val + '"'
                            })
                        }
                        if (isVal(item.selected)) {
                            $(field.id).append(
                                '<option value="' +
                                    item.value +
                                    '" ' +
                                    attr +
                                    " selected>" +
                                    item.text +
                                    "</option>"
                            )
                        } else {
                            $(field.id).append(
                                '<option value="' +
                                    item.value +
                                    '" ' +
                                    attr +
                                    ">" +
                                    item.text +
                                    "</option>"
                            )
                        }
                    })
                    if (isVal(field.value)) {
                        $(field.id).val(field.value)
                    }
                    if (isVal(field.attr)) {
                        $(field.id).attr(field.attr)
                    }
                    if (isVal(field.select2Attr)) {
                        $(field.id).select2(field.select2Attr)
                    } else {
                        $(field.id).select2()
                    }
                }

                getStatic()
                if (isVal(field.optionsList.changedBy)) {
                    $("body").on(
                        "change",
                        field.optionsList.changedBy,
                        function (e) {
                            e.preventDefault()
                            getStatic()
                        }
                    )
                }
            }
            if (isVal(field.afterRender)) {
                $(document).ready(function () {
                    field.afterRender(field)
                })
            }

            if (isVal(field.onChange)) {
                $("body")
                    .off("change", field.id)
                    .on("change", field.id, function (e) {
                        e.preventDefault()
                        field.onChange(field)
                    })
            }
            break
        case "input":
            if (isVal(field.value)) {
                $(field.id).val(field.value)
            }
            if (isVal(field.attr)) {
                $(field.id).attr(field.attr)
            }
            if (isVal(field.afterRender)) {
                $(document).ready(function () {
                    field.afterRender(field)
                })
            }
            break
        case "a":
            if (isVal(field.value)) {
                $(field.id).text(field.value)
            }
            if (isVal(field.attr)) {
                $(field.id).attr(field.attr)
            }
            if (isVal(field.afterRender)) {
                $(document).ready(function () {
                    field.afterRender(field)
                })
            }
            break
    }
}

async function proccessAsynchRenderField(array) {
    array.forEach(async (field) => {
        await renderField(field)
    })
}

function proccessSynchRenderField(array) {
    array.forEach((field) => {
        renderField(field)
    })
}

function showErrLog($err, $messInfo = "") {
    if (!isVal($messInfo)) {
        $messInfo = POS_MESSAGE.get("PROCESS_ERR")
    }
    console.group()
    console.info($messInfo)
    console.error($err)
    console.groupEnd()
}

function posNotifyAlert($options) {
    let options = {
        title: "Thông Báo",
        showProgressbar: false,
        placement: {
            from: "top",
            align: "center",
        },
        offset: 20,
        spacing: 10,
        z_index: 10000000000,
        delay: 3000,
        timer: 1000,
        message: "",
        type: "pos-notify-default",
        allow_dismiss: true,
    }
    $.extend(options, $options)
    $.notify(
        {
            title: options.title,
            message: options.message,
        },
        {
            type: options.type,
            showProgressbar: options.showProgressbar,
            placement: options.placement,
            offset: options.offset,
            spacing: options.spacing,
            z_index: options.z_index,
            delay: options.delay,
            timer: options.timer,
            allow_dismiss: options.allow_dismiss,
            position: "fixed",
            animate: {
                enter: "animated bounceInDown",
                exit: "animated bounceOutUp",
            },
            template:
                '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button"  class="close" data-notify="dismiss">×</button>' +
                '<span data-notify="title">{1}</span>' +
                '<span data-notify="message">{2}</span>' +
                "</div>",
        }
    )
}

function isPromise(promise) {  
    return !!promise && typeof promise.then === 'function'
}

// sprintf
!(function () {
    "use strict"
    var g = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/,
    }
    function y(e) {
        return (function (e, t) {
            var r,
                n,
                i,
                s,
                a,
                o,
                p,
                c,
                l,
                u = 1,
                f = e.length,
                d = ""
            for (n = 0; n < f; n++)
                if ("string" == typeof e[n]) d += e[n]
                else if ("object" == typeof e[n]) {
                    if ((s = e[n]).keys)
                        for (r = t[u], i = 0; i < s.keys.length; i++) {
                            if (null == r)
                                throw new Error(
                                    y(
                                        '[sprintf] Cannot access property "%s" of undefined value "%s"',
                                        s.keys[i],
                                        s.keys[i - 1]
                                    )
                                )
                            r = r[s.keys[i]]
                        }
                    else r = s.param_no ? t[s.param_no] : t[u++]
                    if (
                        (g.not_type.test(s.type) &&
                            g.not_primitive.test(s.type) &&
                            r instanceof Function &&
                            (r = r()),
                        g.numeric_arg.test(s.type) &&
                            "number" != typeof r &&
                            isNaN(r))
                    )
                        throw new TypeError(
                            y("[sprintf] expecting number but found %T", r)
                        )
                    switch ((g.number.test(s.type) && (c = 0 <= r), s.type)) {
                        case "b":
                            r = parseInt(r, 10).toString(2)
                            break
                        case "c":
                            r = String.fromCharCode(parseInt(r, 10))
                            break
                        case "d":
                        case "i":
                            r = parseInt(r, 10)
                            break
                        case "j":
                            r = JSON.stringify(
                                r,
                                null,
                                s.width ? parseInt(s.width) : 0
                            )
                            break
                        case "e":
                            r = s.precision
                                ? parseFloat(r).toExponential(s.precision)
                                : parseFloat(r).toExponential()
                            break
                        case "f":
                            r = s.precision
                                ? parseFloat(r).toFixed(s.precision)
                                : parseFloat(r)
                            break
                        case "g":
                            r = s.precision
                                ? String(Number(r.toPrecision(s.precision)))
                                : parseFloat(r)
                            break
                        case "o":
                            r = (parseInt(r, 10) >>> 0).toString(8)
                            break
                        case "s":
                            ;(r = String(r)),
                                (r = s.precision
                                    ? r.substring(0, s.precision)
                                    : r)
                            break
                        case "t":
                            ;(r = String(!!r)),
                                (r = s.precision
                                    ? r.substring(0, s.precision)
                                    : r)
                            break
                        case "T":
                            ;(r = Object.prototype.toString
                                .call(r)
                                .slice(8, -1)
                                .toLowerCase()),
                                (r = s.precision
                                    ? r.substring(0, s.precision)
                                    : r)
                            break
                        case "u":
                            r = parseInt(r, 10) >>> 0
                            break
                        case "v":
                            ;(r = r.valueOf()),
                                (r = s.precision
                                    ? r.substring(0, s.precision)
                                    : r)
                            break
                        case "x":
                            r = (parseInt(r, 10) >>> 0).toString(16)
                            break
                        case "X":
                            r = (parseInt(r, 10) >>> 0)
                                .toString(16)
                                .toUpperCase()
                    }
                    g.json.test(s.type)
                        ? (d += r)
                        : (!g.number.test(s.type) || (c && !s.sign)
                              ? (l = "")
                              : ((l = c ? "+" : "-"),
                                (r = r.toString().replace(g.sign, ""))),
                          (o = s.pad_char
                              ? "0" === s.pad_char
                                  ? "0"
                                  : s.pad_char.charAt(1)
                              : " "),
                          (p = s.width - (l + r).length),
                          (a = s.width && 0 < p ? o.repeat(p) : ""),
                          (d += s.align
                              ? l + r + a
                              : "0" === o
                              ? l + a + r
                              : a + l + r))
                }
            return d
        })(
            (function (e) {
                if (p[e]) return p[e]
                var t,
                    r = e,
                    n = [],
                    i = 0
                for (; r; ) {
                    if (null !== (t = g.text.exec(r))) n.push(t[0])
                    else if (null !== (t = g.modulo.exec(r))) n.push("%")
                    else {
                        if (null === (t = g.placeholder.exec(r)))
                            throw new SyntaxError(
                                "[sprintf] unexpected placeholder"
                            )
                        if (t[2]) {
                            i |= 1
                            var s = [],
                                a = t[2],
                                o = []
                            if (null === (o = g.key.exec(a)))
                                throw new SyntaxError(
                                    "[sprintf] failed to parse named argument key"
                                )
                            for (
                                s.push(o[1]);
                                "" !== (a = a.substring(o[0].length));

                            )
                                if (null !== (o = g.key_access.exec(a)))
                                    s.push(o[1])
                                else {
                                    if (null === (o = g.index_access.exec(a)))
                                        throw new SyntaxError(
                                            "[sprintf] failed to parse named argument key"
                                        )
                                    s.push(o[1])
                                }
                            t[2] = s
                        } else i |= 2
                        if (3 === i)
                            throw new Error(
                                "[sprintf] mixing positional and named placeholders is not (yet) supported"
                            )
                        n.push({
                            placeholder: t[0],
                            param_no: t[1],
                            keys: t[2],
                            sign: t[3],
                            pad_char: t[4],
                            align: t[5],
                            width: t[6],
                            precision: t[7],
                            type: t[8],
                        })
                    }
                    r = r.substring(t[0].length)
                }
                return (p[e] = n)
            })(e),
            arguments
        )
    }
    function e(e, t) {
        return y.apply(null, [e].concat(t || []))
    }
    var p = Object.create(null)
    "undefined" != typeof exports &&
        ((exports.sprintf = y), (exports.vsprintf = e)),
        "undefined" != typeof window &&
            ((window.sprintf = y),
            (window.vsprintf = e),
            "function" == typeof define &&
                define.amd &&
                define(function () {
                    return { sprintf: y, vsprintf: e }
                }))
})()
