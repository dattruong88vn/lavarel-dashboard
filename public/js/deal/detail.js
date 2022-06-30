$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $("#csrf-token").val(),
        },
    })

    CKEDITOR.replace("emailContent")
    var modalCreateMeeting = $("#modalCreateMeeting")
    $("#btnSendToCrm").on("click", function (event) {
        event.preventDefault()
        triggerSendToCrm()
    })

    $(".btnSaveMeeting").on("click", function (event) {
        event.preventDefault()
        var meetingData = {
            leadId: null,
            dealId: parseInt(deal.dealId),
            assignTo: parseInt(modalCreateMeeting.find(".assignTo").val()),
            reminderDate: null,
            //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
            noteTm: modalCreateMeeting.find(".noteTm").val(),
        }
        var whenDate = modalCreateMeeting.find(".whenDate").val()
        var whenTime = modalCreateMeeting.find(".whenTime").val()
        var date = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm")
        if (date.isValid()) {
            meetingData.reminderDate = date.unix() * 1000
        }
        saveMeeting(meetingData)
        /*
         if (!lead.dealId) {
         generateDeal(function (response) {
         meetingData.dealId = response.data.dealId;
         saveMeeting(meetingData);
         });
         } else {
         meetingData.dealId = lead.dealId;
         saveMeeting(meetingData);
         }
         */
    })

    $(".makeCall").on("click", function (event) {
        event.preventDefault()
        //$('body').css('pointer-events', 'none');
        var phoneNumber = $(".customerPhone").val().trim()
        // phoneNumber = Base64.decode(phoneNumber);
        if ($(".customerPhone").val().indexOf(",") > 0) {
            phoneNumbers = phoneNumber.split(",")
            let phoneNumbersParse = phoneNumbers.map((phone, key) => {
                return Base64.decode(phone)
            })
            ModalChoosePhoneNumber.showModal({
                phoneNumbers: phoneNumbersParse,
                onItemChosen: function (data) {
                    DealFunctions.makeCall({
                        type: 78,
                        phoneNumber: data.phoneNumber,
                        dealId: deal.dealId,
                        leadId: null,
                    })
                },
            })
        } else {
            DealFunctions.makeCall({
                type: 78,
                phoneNumber: Base64.decode(phoneNumber),
                dealId: deal.dealId,
                leadId: null,
            })
        }
    })

    var timer = new SendTimerCounter({
        key: `deal-${deal.dealId}`,
        timeDoAction: deal.timeInactive
    })
    timer.init()

    // check close, reload browser
    var _BrowserCloseAction = new BrowserCloseAction(
        `deal-${deal.dealId}`,
        function () {
            if (
                deal.statusId != 27 &&
                deal.progressQuoId != 3 &&
                deal.progressQuoId != 4
            ) {
                timer.submit({ dealId: deal.dealId })
            }
        },
        function () {
            if (
                deal.statusId != 27 &&
                deal.progressQuoId != 3 &&
                deal.progressQuoId != 4
            ) {
                timer.submit({ dealId: deal.dealId })
            }
        }
    )
    _BrowserCloseAction.init()

    $(".btnCancelDeal").on("click", function (event) {
        event.preventDefault()
        ModalUpdateStatusPendingReason.showModal({
            postData: {
                typeNeedName: "deal",
                needId: deal.dealId,
                progressQuoId: 3,
                isSet: true,
            },
        })
    })

    //Thêm infos
    $(".btnAddInfos").on("click", function (event) {
        event.preventDefault()
        var newAgentEmail = ""
        var newAgentPhone = ""
        $.ajax({
            url: "/deal/customer-main-phone/" + deal.customerId,
            type: "get",
        })
            .done(function (response) {
                var htmlEmail = ""
                var htmlPhone = ""
                if (response.result) {
                    if (response.data.emailList.length == 0) {
                        // popup get email : newAgentEmail
                        $("#modalAddEmailAgent").modal()
                        $("#modalAddEmailAgent")
                            .find(".btn-add-email")
                            .on("click", function (event) {
                                event.preventDefault()
                                $("#modalAddEmailAgent")
                                    .find(".errors")
                                    .html("")
                                newAgentEmail = $("#modalAddEmailAgent")
                                    .find("#newAgentEmail")
                                    .val()
                                    .trim()
                                if (
                                    newAgentEmail == "" ||
                                    !isValidEmail(newAgentEmail)
                                ) {
                                    $("#newAgentEmail")
                                        .parent()
                                        .find(".errors")
                                        .html("Email không hợp lệ")
                                    return false
                                } else {
                                    $("#modalAddEmailAgent").modal("hide")
                                }

                                if (response.data.phoneList.length == 1) {
                                    newAgentPhone =
                                        response.data.phoneList[0].phone
                                    ModalAddInfosNewCustomer.showModal({
                                        dealId: parseInt(deal.dealId),
                                        oldCustomerId: deal.customerId,
                                        newAgentEmail: newAgentEmail,
                                        newAgentPhone: newAgentPhone,
                                    })
                                } else if (response.data.phoneList.length > 1) {
                                    for (
                                        var i = 0;
                                        i < response.data.phoneList.length;
                                        i++
                                    ) {
                                        htmlPhone +=
                                            '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="' +
                                            response.data.phoneList[i].phone +
                                            '"/> ' +
                                            response.data.phoneList[i].phone +
                                            " "
                                    }
                                    $("#modalChooseMainPhone").modal()
                                    if (htmlPhone != "") {
                                        $("#modalChooseMainPhone")
                                            .find("#phoneList")
                                            .html(
                                                "Số điện thoại : " + htmlPhone
                                            )
                                    }
                                    $("#modalChooseMainPhone")
                                        .find(".btn-choose-main-phone")
                                        .on("click", function (event) {
                                            event.preventDefault()
                                            newAgentPhone = $(
                                                "#modalChooseMainPhone"
                                            )
                                                .find(
                                                    'input[name="chosenPhoneMain"]:checked'
                                                )
                                                .val()
                                            if (!newAgentPhone) {
                                                showPropzyAlert(
                                                    "Vui lòng chọn số điện thoại"
                                                )
                                                return false
                                            } else {
                                                $(
                                                    "#modalChooseMainPhone"
                                                ).modal("hide")
                                                ModalAddInfosNewCustomer.showModal(
                                                    {
                                                        dealId: parseInt(
                                                            deal.dealId
                                                        ),
                                                        oldCustomerId:
                                                            deal.customerId,
                                                        newAgentEmail: newAgentEmail,
                                                        newAgentPhone: newAgentPhone,
                                                    }
                                                )
                                            }
                                        })
                                }
                            }) //end btn-add-email click
                    } // end emailList.length = 0
                    else if (response.data.emailList.length == 1) {
                        newAgentEmail = response.data.emailList[0].email
                        if (!newAgentEmail) {
                            // tồn tại emailList nhưng email = null
                            // popup get email : newAgentEmail
                            $("#modalAddEmailAgent").modal()
                            $("#modalAddEmailAgent")
                                .find(".btn-add-email")
                                .on("click", function (event) {
                                    event.preventDefault()
                                    $("#modalAddEmailAgent")
                                        .find(".errors")
                                        .html("")
                                    newAgentEmail = $("#modalAddEmailAgent")
                                        .find("#newAgentEmail")
                                        .val()
                                        .trim()
                                    if (
                                        newAgentEmail == "" ||
                                        !isValidEmail(newAgentEmail)
                                    ) {
                                        $("#newAgentEmail")
                                            .parent()
                                            .find(".errors")
                                            .html("Email không hợp lệ")
                                        return false
                                    } else {
                                        $("#modalAddEmailAgent").modal("hide")
                                    }

                                    if (response.data.phoneList.length == 1) {
                                        newAgentPhone =
                                            response.data.phoneList[0].phone
                                        ModalAddInfosNewCustomer.showModal({
                                            dealId: parseInt(deal.dealId),
                                            oldCustomerId: deal.customerId,
                                            newAgentEmail: newAgentEmail,
                                            newAgentPhone: newAgentPhone,
                                        })
                                    } else if (
                                        response.data.phoneList.length > 1
                                    ) {
                                        for (
                                            var i = 0;
                                            i < response.data.phoneList.length;
                                            i++
                                        ) {
                                            htmlPhone +=
                                                '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="' +
                                                response.data.phoneList[i]
                                                    .phone +
                                                '"/> ' +
                                                response.data.phoneList[i]
                                                    .phone +
                                                " "
                                        }
                                        $("#modalChooseMainPhone").modal()
                                        if (htmlPhone != "") {
                                            $("#modalChooseMainPhone")
                                                .find("#phoneList")
                                                .html(
                                                    "Số điện thoại : " +
                                                        htmlPhone
                                                )
                                        }
                                        $("#modalChooseMainPhone")
                                            .find(".btn-choose-main-phone")
                                            .on("click", function (event) {
                                                event.preventDefault()
                                                newAgentPhone = $(
                                                    "#modalChooseMainPhone"
                                                )
                                                    .find(
                                                        'input[name="chosenPhoneMain"]:checked'
                                                    )
                                                    .val()
                                                if (!newAgentPhone) {
                                                    showPropzyAlert(
                                                        "Vui lòng chọn số điện thoại"
                                                    )
                                                    return false
                                                } else {
                                                    $(
                                                        "#modalChooseMainPhone"
                                                    ).modal("hide")
                                                    ModalAddInfosNewCustomer.showModal(
                                                        {
                                                            dealId: parseInt(
                                                                deal.dealId
                                                            ),
                                                            oldCustomerId:
                                                                deal.customerId,
                                                            newAgentEmail: newAgentEmail,
                                                            newAgentPhone: newAgentPhone,
                                                        }
                                                    )
                                                }
                                            })
                                    }
                                })
                        } else {
                            if (response.data.phoneList.length == 1) {
                                newAgentPhone = response.data.phoneList[0].phone
                                ModalAddInfosNewCustomer.showModal({
                                    dealId: parseInt(deal.dealId),
                                    oldCustomerId: deal.customerId,
                                    newAgentEmail: newAgentEmail,
                                    newAgentPhone: newAgentPhone,
                                })
                            } else if (response.data.phoneList.length > 1) {
                                for (
                                    var i = 0;
                                    i < response.data.phoneList.length;
                                    i++
                                ) {
                                    htmlPhone +=
                                        '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="' +
                                        response.data.phoneList[i].phone +
                                        '"/> ' +
                                        response.data.phoneList[i].phone +
                                        " "
                                }
                                $("#modalChooseMainPhone").modal()
                                if (htmlPhone != "") {
                                    $("#modalChooseMainPhone")
                                        .find("#phoneList")
                                        .html("Số điện thoại : " + htmlPhone)
                                }
                                $("#modalChooseMainPhone")
                                    .find(".btn-choose-main-phone")
                                    .on("click", function (event) {
                                        event.preventDefault()
                                        newAgentPhone = $(
                                            "#modalChooseMainPhone"
                                        )
                                            .find(
                                                'input[name="chosenPhoneMain"]:checked'
                                            )
                                            .val()
                                        if (!newAgentPhone) {
                                            showPropzyAlert(
                                                "Vui lòng chọn số điện thoại"
                                            )
                                            return false
                                        } else {
                                            $("#modalChooseMainPhone").modal(
                                                "hide"
                                            )
                                            ModalAddInfosNewCustomer.showModal({
                                                dealId: parseInt(deal.dealId),
                                                oldCustomerId: deal.customerId,
                                                newAgentEmail: newAgentEmail,
                                                newAgentPhone: newAgentPhone,
                                            })
                                        }
                                    })
                            }
                        }
                    } // end emailList.length = 1
                    else if (response.data.emailList.length > 1) {
                        if (response.data.phoneList.length == 1) {
                            newAgentPhone = response.data.phoneList[0].phone
                            //modalChooseMainEmail
                            for (
                                var i = 0;
                                i < response.data.emailList.length;
                                i++
                            ) {
                                htmlEmail +=
                                    '<input class="chosenEmail chosen-select-email" type="radio" name="chosenEmailMain" value="' +
                                    response.data.emailList[i].email +
                                    '"/> ' +
                                    response.data.emailList[i].email +
                                    " "
                            }
                            $("#modalChooseMainEmail").modal()
                            if (htmlEmail != "") {
                                $("#modalChooseMainEmail")
                                    .find("#emailList")
                                    .html("Email : " + htmlEmail)
                            }
                            //
                            $("#modalChooseMainEmail")
                                .find(".btn-choose-main-email")
                                .on("click", function (event) {
                                    event.preventDefault()
                                    newAgentEmail = $("#modalChooseMainEmail")
                                        .find(
                                            'input[name="chosenEmailMain"]:checked'
                                        )
                                        .val()
                                    if (!newAgentEmail) {
                                        showPropzyAlert("Vui lòng chọn email")
                                        return false
                                    } else {
                                        $("#modalChooseMainEmail").modal("hide")
                                        ModalAddInfosNewCustomer.showModal({
                                            dealId: parseInt(deal.dealId),
                                            oldCustomerId: deal.customerId,
                                            newAgentEmail: newAgentEmail,
                                            newAgentPhone: newAgentPhone,
                                        })
                                    }
                                })
                        } else if (response.data.phoneList.length > 1) {
                            $("#modalChooseMainPhoneEmail").modal()
                            for (
                                var i = 0;
                                i < response.data.emailList.length;
                                i++
                            ) {
                                htmlEmail +=
                                    '<input class="chosenEmail chosen-select-email" type="radio" name="chosenEmailMain" value="' +
                                    response.data.emailList[i].email +
                                    '"/> ' +
                                    response.data.emailList[i].email +
                                    " "
                            }
                            for (
                                var i = 0;
                                i < response.data.phoneList.length;
                                i++
                            ) {
                                htmlPhone +=
                                    '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="' +
                                    response.data.phoneList[i].phone +
                                    '"/> ' +
                                    response.data.phoneList[i].phone +
                                    " "
                            }
                            if (htmlEmail != "") {
                                $("#modalChooseMainPhoneEmail")
                                    .find("#emailListing")
                                    .html("Email : " + htmlEmail)
                            }
                            if (htmlPhone != "") {
                                $("#modalChooseMainPhoneEmail")
                                    .find("#phoneList")
                                    .html("Số điện thoại : " + htmlPhone)
                            }
                            //
                            $("#modalChooseMainPhoneEmail")
                                .find(".btn-chosen-main-email-phone")
                                .on("click", function (event) {
                                    event.preventDefault()
                                    newAgentEmail = $(
                                        "#modalChooseMainPhoneEmail"
                                    )
                                        .find(
                                            'input[name="chosenEmailMain"]:checked'
                                        )
                                        .val()
                                    if (!newAgentEmail) {
                                        showPropzyAlert("Vui lòng chọn Email")
                                        return false
                                    }
                                    newAgentPhone = $(
                                        "#modalChooseMainPhoneEmail"
                                    )
                                        .find(
                                            'input[name="chosenPhoneMain"]:checked'
                                        )
                                        .val()
                                    if (!newAgentPhone) {
                                        showPropzyAlert(
                                            "Vui lòng chọn số điện thoại"
                                        )
                                        return false
                                    }

                                    if (
                                        newAgentEmail != "" &&
                                        newAgentPhone != ""
                                    ) {
                                        $("#modalChooseMainPhoneEmail").modal(
                                            "hide"
                                        )
                                        ModalAddInfosNewCustomer.showModal({
                                            dealId: parseInt(deal.dealId),
                                            oldCustomerId: deal.customerId,
                                            newAgentEmail: newAgentEmail,
                                            newAgentPhone: newAgentPhone,
                                        })
                                    }
                                })
                        }
                    } // end emailList.length > 1
                }
            })
            .always(function () {
                hidePropzyLoading()
            })
    })

    $(".btnUnlockDeal").on("click", function (event) {
        event.preventDefault()
        ModalUnclock.showModal({
            type: "deal",
            progressQuoId: 3,
            needId: parseInt(deal.dealId),
            reasonCode: -1,
            note: null,
        })
    })

    $(".btnSendMail").on("click", function (event) {
        event.preventDefault()
        EmailSmsSender.sendMailOrSms({
            dealId: deal.dealId,
            leadId: null,
            customerEmails: deal.customerEmails,
            customerPhones: Base64.decode(deal.customerPhones),
        })
    })

    $(".btnReassign").on("click", function (event) {
        event.preventDefault()
        $("#modalReassignResponsiblePerson").modal()
    })
    $(".btnSaveReassignResponsiblePerson").on("click", function (event) {
        var postData = {
            dealId: deal.dealId,
            leadId: null,
            reason: $("#leadReassignReason").val(),
            assignedTo: $("#modalReassignResponsiblePerson .assignedTo").val(),
        }
        var isValidated = true
        if (postData.reason.trim() === "") {
            $("#leadReassignReason").parent().find(".errors").html("Nhập lý do")
            isValidated = false
        }
        if ("" === postData.assignedTo.trim()) {
            $("#modalReassignResponsiblePerson .assignedTo")
                .parent()
                .find(".errors")
                .html("Chọn người chịu trách nhiệm chính")
        }
        if (false === isValidated) {
            return false
        }
        showPropzyLoading()
        $.ajax({
            url: "/lead/reassign-responsible-person",
            type: "post",
            data: JSON.stringify(postData),
        })
            .done(function (response) {
                if (response.result) {
                    // window.location = window.location;
                    // window.location.replace("/");
                    window.location.reload()
                }
                showPropzyAlert(response.message)
                $("#modalReassignResponsiblePerson").modal("hide")
            })
            .always(function () {
                hidePropzyLoading()
            })
    })

    $(".btnShowConfig").on("click", function (event) {
        event.preventDefault()
        ConfigNewListings.showModal(deal.dealId)
    })
})

function isQuestionFormComplete(leadId, callBack) {
    var postData = { leadId: leadId }
    $.ajax({
        url: "/question/check-complete-question-form",
        data: JSON.stringify(postData),
        type: "post",
    }).done(function (response) {
        if (response.result == true) {
            callBack()
        } else {
            alert(response.message)
        }
    })
}

$(".btnOpenEmailForm").on("click", function (event) {
    event.preventDefault()
    var photos = []
    var photosPreview = ""
    var txtRListingIds = $("#arrayStoreListingForAction").val().trim()

    if (txtRListingIds.length <= 0) {
        showPropzyAlert("Không có listing để gửi")
        return false
    }
    var rListingIds = JSON.parse($("#arrayStoreListingForAction").val())
    if (rListingIds.length <= 0) {
        showPropzyAlert("Không có listing để gửi")
        return false
    } else if (rListingIds.length > 3) {
        showPropzyAlert("Chỉ được chọn tối đa 3 listing")
        return false
    }
    
    let phoneNumber = deal.customerPhones;
    // phoneNumber = Base64.decode(phoneNumber);
    if (phoneNumber.indexOf(",") > 0) {
        phoneNumbers = phoneNumber.split(",")
        let phoneNumbersParse = phoneNumbers.map((phone, key) => {
            return Base64.decode(phone)
        })
        ListingsEmailSmsSender.sendMailOrSms({
            leadId: null,
            dealId: deal.dealId,
            customerEmails: deal.customerEmails,
            customerPhones: phoneNumbersParse.toString(','),
            rListingIds: rListingIds,
            photosPreview: photosPreview,
            photos: photos,
        })
    } else {
        ListingsEmailSmsSender.sendMailOrSms({
            leadId: null,
            dealId: deal.dealId,
            customerEmails: deal.customerEmails,
            customerPhones: Base64.decode(phoneNumber),
            rListingIds: rListingIds,
            photosPreview: photosPreview,
            photos: photos,
        })
    }
    // ListingsEmailSmsSender.sendMailOrSms({
    //     leadId: null,
    //     dealId: deal.dealId,
    //     customerEmails: deal.customerEmails,
    //     customerPhones: Base64.decode(deal.customerPhones),
    //     rListingIds: rListingIds,
    //     photosPreview: photosPreview,
    //     photos: photos,
    // })
    return false
})

$(".btn-quick-check-listings").on("click", function () {
    var listingIdsJsonText = $("#arrayStoreListingForAction").val().trim()
    if (listingIdsJsonText == "") {
        showPropzyAlert("Chọn listing để gửi check")
    }

    var rlistingIds = JSON.parse(listingIdsJsonText)
    QuickCheckListings.showQuickCheckModal({
        dealId: deal.dealId,
        leadId: deal.leadId,
        rlistingIds: rlistingIds,
    })
})

$(".btnShowScheduleModal").on("click", function (event) {
    event.preventDefault()
    
    if(isPendingDeal) {
        showPropzyAlert(`Không thể đặt lịch xem do deal đang ở trạng thái <strong>${dealStatus}</strong>`)
        return false
    }
    if(!addTourPermission) {
        showPropzyAlert("Bạn không có quyền thực hiện tính năng này")
        return false
    }
    if (!deal.isUpdateCustomerInfo) {
        $("#updateCustomerAgent").modal("show")
        return false
    }
    var listingIdsJsonText = $("#arrayStoreListingForAction").val().trim()
    if (listingIdsJsonText == "") {
        showPropzyAlert("Chọn listing để gửi ĐLX")
    }
    var rlistingIds = JSON.parse(listingIdsJsonText).map(item => parseFloat(item));

    var resultStatusListing = getStatusOfListings(rlistingIds)
    if (resultStatusListing.result == false) {
        Schedule.showModalByListingIds({
            listingIds: rlistingIds,
        })
    } else {
        bootbox.confirm({
            message: resultStatusListing.messages,
            buttons: {
                confirm: {
                    label: "Tiếp tục",
                    className: "btn-success",
                },
                cancel: {
                    label: "Hủy",
                    className: "btn-danger",
                },
            },
            callback: function (result) {
                if (result) {
                    Schedule.showModalByListingIds({
                        listingIds: rlistingIds,
                    })
                }
            },
        })
    }
})

$(".btn-show-market-report").on("click", function (event) {
    SearchListingsResultOverview.showModal({
        dealId: deal.dealId,
    })
})

$("#btnChangeCardType").on("click", function (event) {
    event.preventDefault()
    DealFunctions.getCardTypes()
    $("#modalChangeCardType").modal("show")
    $(".btnSaveChangeCardType").attr("disabled", true)
})
$("#scoreCardType").on("change", function () {
    if ($(this).val().length > 0) {
        $(".btnSaveChangeCardType").removeAttr("disabled")
    }
})

$(".btnSaveChangeCardType").on("click", function (event) {
    event.preventDefault()
    let postData = {
        dealId: deal.dealId,
        scorecardType: $("#scoreCardType").val(),
        description: $("#contentChangeCardType").val(),
    }
    if (postData.description.length == 0) {
        showPropzyAlert("Vui lòng nhập nội dung thay đổi")
        return false
    }
    showPropzyLoading()
    $.ajax({
        url: "/deal/save-change-card-type",
        data: JSON.stringify(postData),
        type: "post",
    })
        .done(function (response) {
            if (response.result) {
                window.location.reload()
            }
            showPropzyAlert(response.message)
            $("#modalChangeCardType").modal("hide")
        })
        .always(function () {
            hidePropzyLoading()
        })
})
