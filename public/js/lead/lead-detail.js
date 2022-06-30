$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$(document).ready(function () {

    $("#districtIds").select2({
        templateSelection: function (item) {
            if (!item.id) {
                return item.text;
            }
            var currentPrefered = $("#preferDistrict").val().trim();
            var isPrefered = "";
            if (currentPrefered && item.id == currentPrefered) {
                isPrefered = "prefered-item";
            }
            var $returnVal = $('<span>' + item.text + ' <span class="district-prefer ' + isPrefered + '" onclick="return setPreferDistrict(this, ' + item.id + ')"><i class="fa fa-star" /></i></span></span>');
            return $returnVal;
        }
    });

    $("#directionIds").select2({
        templateSelection: function (item) {
            if (!item.id) {
                return item.text;
            }
            var currentPrefered = $("#preferDirection").val().trim();
            var isPrefered = "";
            if (currentPrefered && item.id == currentPrefered) {
                isPrefered = "prefered-item";
            }
            var $returnVal = $('<span>' + item.text + ' <span class="direction-prefer ' + isPrefered + '" onclick="return setPreferDirection(this, ' + item.id + ')"><i class="fa fa-star" /></i></span></span>');
            return $returnVal;
        }
    });

    $('#moveInDate').datepicker({startDate: '0d'});
    $(".makeCall").on("click", function (event) {
        event.preventDefault();
        //$('body').css('pointer-events', 'none');
        var phoneNumber = $("#customerPhone").val();
        phoneNumber = Base64.decode(phoneNumber);
        CCall.makeCall({
            "phoneNumber": phoneNumber,
            "onCallEnded": function (callInfo) {
                $('body').css('pointer-events', 'auto');
                ModalUpdateCall.showModal({
                    type: 78,
                    dealId: null,
                    leadId: lead.leadId,
                    duration: callInfo.duration,
                    resultCallId: callInfo.duration <= 0 ? 1 : 9999,
                    receiverPhone: phoneNumber
                });
            },
            showLoading: false
        });
    });
    $(".btnReAssign").on('click', function (event) {
        event.preventDefault();
        $('#modalReassignResponsiblePerson').modal();
    });
    $(".btnSaveReassignResponsiblePerson").on('click', function (event) {
        var postData = {
            "dealId": null,
            "leadId": leadId,
            "reason": $("#leadReassignReason").val(),
            "assignedTo": $("#modalReassignResponsiblePerson .assignedTo").val()
        };
        var isValidated = true;
        if (postData.reason.trim() === "") {
            $("#leadReassignReason").parent().find('.errors').html('Nhập lý do');
            isValidated = false;
        }
        if ("" === postData.assignedTo.trim()) {
            $("#modalReassignResponsiblePerson .assignedTo").parent().find('.errors').html('Chọn người chịu trách nhiệm chính');
        }
        if (false === isValidated) {
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/lead/reassign-responsible-person',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                // window.location = window.location;
                window.location.replace("/");
            }
            showPropzyAlert(response.message);
            $('#modalReassignResponsiblePerson').modal('hide');
        }).always(function () {
            hidePropzyLoading();
        });
    });
    if ($("#sourceId").val() == 7) {
        $("#sourceOther").show();
    }
    $('#whenTime').timepicker({
        showMeridian: false
    });
    $('.whenTime').timepicker({
        showMeridian: false
    });
    try {
        CKEDITOR.replace("emailContent");
    } catch (ex) {
    }

    $('#initialBudget').mask("#,##0", {reverse: true});
    $('#finalBudget').mask("#,##0", {reverse: true});
    $('#initialBudgetFixed').mask("#,##0", {reverse: true});
    $('#leadFinalBudget').mask("#,##0", {reverse: true});
    $("#btnSetOldCustomer").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        var currentSelector = $(this);
        $.ajax({
            'url': '/customer/set-old-request/' + $("#requestId").val(),
            'type': 'get'
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                currentSelector.remove();
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    //getPropertyTypes(1);
    $("#listingTypeId").change(function () {
        var listingTypeId = $(this).val();
        getPropertyTypes(listingTypeId);
        listingTypeId = $('#listingTypeId').val();
        var propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#propertyTypeId").change(function () {
        listingTypeId = $('#listingTypeId').val();
        propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#sourceId").change(function () {
        var sourceId = $(this).val();
        $("#sourceOther").val("");
        if (sourceId == 7) {
            $("#sourceOther").show();
        } else {
            $("#sourceOther").hide();
        }
    });
    $(".btnRemoveEmailListing").on("click", function (event) {
        event.preventDefault();
        var leadId = $("#leadId").val();
        var rlistingId = $(this).attr('data-id');
        showPropzyLoading();
        var current = $(this);
        $.ajax({
            url: "/lead/remove-email-listing/" + leadId + "/" + rlistingId,
            type: "get"
        }).done(function (response) {
            console.log(response);
            current.parents('tbody').html(response);
            /*
             $(".selected-listing-" + rlistingId).parent().show();
             $(".selected-listing-" + rlistingId).prop('checked', false);
             */
            if (current.parents("tr").find(".deactivate-listing").prop("checked")) {
                return;
            } else {
                $(".selected-listing-" + rlistingId).parents(".listing").show();
                $(".selected-listing-" + rlistingId).prop('checked', false);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $("#btnSave").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            // console.log(JSON.stringify($("#formCustomerInfo").serialize()));return false;
            showPropzyLoading();
            $.ajax({
                url: "/lead/do-update",
                data: $("#formCustomerInfo").serialize(),
                type: "post"
            }).done(function (response) {
                console.log(response);
                if (response.result === false) {
                    if (response.data && response.data.length > 0) {
                        $("#alertModal .message").html(response.message + ' (Mã KH :' + response.data[0].customerId + ')');
                    } else {
                        $("#alertModal .message").html(response.message);
                    }
                    $("#alertModal").modal();
                } else {
                    if (isBroadcast) {
                        doBroadcast();
                    } else {
                        showPropzyAlert(response.message);
                    }
                    findListing();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });
    $("#btnGenerateDeal").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            generateDeal(function (response) {
                showPropzyAlert(response.message);
                //window.location = "/deal/update/" + response.data.dealId;                
                window.location = "/";
            });
        }
    });

    $(".deactivate-listing").on("click", function (event) {
        var current = $(this);
        if ($(this).prop("checked")) {
            var rlistingId = parseInt($(this).val());
            var leadId = parseInt($("#leadId").val());
            var link = $(this).parents("tr").find("a").attr("href");
            showPropzyLoading();
            $.ajax({
                url: '/lead/deactivate-listing',
                type: 'post',
                data: JSON.stringify({
                    'rlistingId': rlistingId,
                    'leadId': leadId,
                    'link': link
                })
            }).done(function (response) {
                if (response.result) {
                    current.prop('disabled', true);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });
    $("#btnShowCustomerReviewForm").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajax({
            url: "/customer/review-form/" + $("#customerId").val().trim(),
            type: "get"
        }).done(function (response) {
            $("#customerForm").html(response);
            $('html, body').animate({
                scrollTop: $("#customerForm").offset().top - 60
            }, 500);
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $("#btnShowLoanAdviceForm").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajax({
            url: "/customer/loan-advice-form/" + $("#customerId").val().trim(),
            type: "get"
        }).done(function (response) {
            $("#customerForm").html(response);
            $('html, body').animate({
                scrollTop: $("#customerForm").offset().top - 60
            }, 500);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".select-customer-listing").on("click", function (event) {
        var current = $(this);
        if ($(this).prop("checked")) {
            var rlistingId = parseInt($(this).val());
            var leadId = parseInt($("#leadId").val());
            showPropzyLoading();
            $.ajax({
                url: '/lead/select-customer-listing',
                type: 'post',
                data: JSON.stringify({
                    'rlistingId': rlistingId,
                    'leadId': leadId
                })
            }).done(function (response) {
                if (response.result) {
                    current.prop('disabled', true);
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });

    $("#selectAllListing").on("click", function () {
        var current = $(this);
        $(".selected-listing").prop("checked", $(this).prop('checked'));
        var rlistingIds = [];
        $(".selected-listing").each(function () {
            rlistingIds.push(parseInt($(this).val()));
        });
        var leadId = parseInt($("#leadId").val());
        if ($(this).prop('checked')) {
            showPropzyLoading();
            $.ajax({
                url: "/lead/add-email-listings",
                type: "post",
                data: JSON.stringify({
                    'leadId': leadId,
                    'rlistingIds': rlistingIds
                })
            }).done(function (response) {
                $(".selected-listing").parent().hide();
                $("#listing-to-send tbody").html(response);
                current.prop('checked', false);
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });

    $("#btnOpenEmailForm").on("click", function (event) {
        event.preventDefault();

        var photos = [];
        var photosPreview = "";
        var rListingIds = [];
        $("#listings table tr .selected-email-listing:checked").each(function () {
            var rListingId = $(this).val();
            if (rListingId) {
                rListingIds.push(rListingId);
            }
            var redBookPhotos = $(this).parents('.item.listing').find(".redBookPhotos").val();
            if (redBookPhotos) {
                redBookPhotos = JSON.parse(redBookPhotos);
                $(redBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ đỏ", rListingId);
                });
            }
            var pinkBookPhotos = $(this).parents('.item.listing').find(".pinkBookPhotos").val();
            if (pinkBookPhotos) {
                pinkBookPhotos = JSON.parse(pinkBookPhotos);
                $(pinkBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ hồng", rListingId);
                });
            }

        });
        if (rListingIds.length <= 0) {
            showPropzyAlert('Không có listing để gửi');
            return false;
        } else if (rListingIds.length > 3) {
            showPropzyAlert('Chỉ được chọn tối đa 3 listing');
            return false;
        }
        showPropzyLoading();
        $("#emailToCustomer #isGoodsAvailable").val('1');
        $("#emailToCustomer #rlistingIds").val(rListingIds + "");
        $.ajax({
            url: "/lead/get-customer-email-template/" + leadId + "?rlistingIds=" + rListingIds,
            type: "get"
        }).done(function (response) {
            //$("#emailContent").val(response);
            CKEDITOR.instances['emailContent'].setData(response);
            $(".photos-preview").html(photosPreview);
            $(".btnRemovePhoto").on("click", function (event) {
                event.preventDefault();
                $(this).parent().remove();
            });
            console.log(photos);
            var content = $(response);
            var propertyType = content.find(".propertyType").html();
            $("#photos").val(photos);
            $("#emailsTo").val($("#customerEmail").val());
            //$("#emailSubject").val("Nhà phù hợp với nhu cầu của "+$("#customerName").val());
            $("#emailSubject").val("Propzy chia sẻ Bộ sưu tập " + propertyType + " phù hợp nhu cầu");
            $("#emailToCustomer").modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });


    $("#btnEmailNoListingToCustomer").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $("#emailToCustomer #isGoodsAvailable").val('0');
        $.ajax({
            url: "/lead/no-listing-email/" + leadId,
            type: "get"
        }).done(function (response) {
            //$("#emailContent").val(response);
            CKEDITOR.instances['emailContent'].setData(response);
            $("#emailToCustomer .photos-preview").html('');
            $("#emailToCustomer #photos").val('');
            $("#emailToCustomer #emailSubject").val(noListingEmailTitle);
            $("#emailsTo").val($("#customerEmail").val());
            $("#emailToCustomer").modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $("#btnSendMail").on("click", function (event) {
        event.preventDefault();
        var email = $("#formEmail").find("#emailsTo").val();
        if (email.trim() == "") {
            alert("Phải nhập email để gửi.");
            return false;
        } else if (!isEmail(email)) {
            alert("Email không hợp lệ.");
            return false;
        }
        for (var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
        var photos = [];
        $(".photos-preview img").each(function () {
            photos.push($(this).attr('src'));
        });
        $("#photos").val(photos);
        showPropzyLoading();
        $.ajax({
            url: "/deal/send-email-listing/" + leadId,
            type: 'post',
            data: $("#formEmail").serialize()
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                window.location = window.location;
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $("#btnBroadcast").on("click", function (event) {
        event.preventDefault();
        isBroadcast = true;
        $("#btnSave").click();
    });
    $(".makeCallReminder").on("click", function (event) {
        event.preventDefault();
        var subjectHtml = "<option value=''>Chọn tiêu đề</option>";
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
                        subjectHtml += "<option value='" + childSubjectItem.name + "' data-id='" + childSubjectItem.defineId + "'>---- " + childSubjectItem.name + "</option>";
                    }
                }
            }
            $("#makeCallReminderModal .subject").html(subjectHtml);
        }).always(function () {

        });
        $("#makeCallReminderModal").modal();
        $("#whenDate").datepicker();
        $("#whenTime").timepicker();
    });

    $(".btnSaveCallReminder").on("click", function (event) {
        event.preventDefault();
        if (!validateCallReminder("#makeCallReminderModal")) {
            return;
        }
        var defineId = $("#formMakeCallReminderModal .subject>option:selected").attr('data-id');
        $("#formMakeCallReminderModal .defineId").val(defineId);
        showPropzyLoading();
        $.ajax({
            'url': '/lead/make-call-reminder',
            'type': 'POST',
            'data': $("#formMakeCallReminderModal").serialize()
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                $("#makeCallReminderModal").modal('hide');
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });


    $(".tab-content-history").hide();
    $(".tab-content-schedule").hide();
    var eventTables = generateEventTable(-1);
    var scheduleTable = null;
    var historyTable = generateHistoryTable();
    $("a.tab_events").on('show.bs.tab', function (e) {
        $(".tab-content-events").hide();
        $(".tab-content-history").hide();
        $(".tab-content-schedule").hide();
        var type = $(e.target).attr("data-type");
        if (type == 5) {
            generateScheduleTable(type);
            $(".tab-content-schedule").show();
            $(".tab-content-events").hide();
        } else {
            generateEventTable(type);
            $(".tab-content-events").show();
        }
    });
    $("a.tab_history").on('show.bs.tab', function (e) {
        $(".tab-content-events").hide();
        $(".tab-content-schedule").hide();
        $(".tab-content-history").show();
    });
    getEmailListings();
    $("#btnContinueScheduleForm").hide();
    $("#btnOpenScheduleForm").on("click", function (event) {
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#listing-to-send .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = '<a href="/listing/' + $(this).val() + '" target="_blank" >' + $(this).val() + '</a>';
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('tr').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn listing để đặt lịch');
            return;
        }
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
        event.preventDefault();
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#btnOpenBriefFormScheduleForm").on("click", function (event) {
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#listing-to-send .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = '<a href="/listing/' + $(this).val() + '" target="_blank" >' + $(this).val() + '</a>';
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('tr').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn listing để đặt lịch');
            return;
        }
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
        event.preventDefault();
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#btnContinueScheduleForm").on('click', function (event) {
        event.preventDefault();
        $(this).hide();
        $('#btnOpenScheduleForm').show();
        var strListingIds = $("#makeScheduleModal .listingIds").val();
        var arrListingIds = [];
        if (strListingIds) {
            arrListingIds = strListingIds.split(';');
        }
        $("#listing-to-send .select-listing:checked").each(function () {
            var value = $(this).val();
            if (!$(this).prop('disabled') && -1 == $.inArray(value, arrListingIds)) {
                arrListingIds.push($(this).val());
            }
        });
        generateScheduleListingLinks(arrListingIds);
        $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
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
        showPropzyLoading();
        $.ajax({
            'url': '/lead/make-schedule',
            'type': 'POST',
            'data': $("#formMakeSchedule").serialize()
        }).done(function (response) {
            if (response.result) {
                console.log(response);
                $("#makeScheduleModal").modal('hide');
                generateScheduleTable(5);
                getEmailListings();
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $('#agentId').change(function (event) {
        var agentId = $(this).val();
        var oldAm = $(this).attr('data-old-am');
        showPropzyLoading();
        $.ajax({
            'url': '/agent/get-ams/' + agentId,
            'type': 'get'
        }).done(function (response) {
            var html = '<option value="">Chọn AM</option>';
            if (response.result && response.data) {
                var itemLength = response.data.length;
                var selected = '';
                for (var i = 0; i < itemLength; i++) {
                    if (oldAm == response.data[i].socialUid) {
                        selected = 'selected="selected"';
                    }
                    html += "<option value='" + response.data[i].socialUid + "' " + selected + ">" + response.data[i].amName + "</option>";
                }
            }
            console.log(response);
            $('#amOfAgentPresenter').html(html).select2();
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $('#agentId').trigger('change');

    $('#agentServe').change(function (event) {
        var agentId = $(this).val();
        var oldAm = $(this).attr('data-old-am');
        showPropzyLoading();
        $.ajax({
            'url': '/agent/get-ams/' + agentId,
            'type': 'get'
        }).done(function (response) {
            var html = '<option value="">Chọn AM</option>';
            if (response.result && response.data) {
                var itemLength = response.data.length;
                var selected = '';
                for (var i = 0; i < itemLength; i++) {
                    if (oldAm == response.data[i].socialUid) {
                        selected = 'selected="selected"';
                    }
                    html += "<option value='" + response.data[i].socialUid + "' " + selected + ">" + response.data[i].amName + "</option>";
                }
            }
            $('#amOfAgentServe').html(html).select2();
        }).always(function () {
            hidePropzyLoading();
        });
    });
    var isFirstLoad = true;
    $('#agentServe').trigger('change');


    setTimeout(findListing, 1000);

});

function defineNoteFunction() {
    $('.noteListing').on('click', function (event) {
        event.preventDefault();
        $("#noteListingId").val($(this).attr('data-listing-id'));
        $("#noteContent").val($(this).attr('data-value'));
        $("#noteForListing").modal('show');
        // console.log($(this).attr('data-value') + ' --- ' + $(this).attr('data-listing-id'));
    });

    $('#btnUpdateNote').on('click', function (event) {
        $.ajax({
            'url': '/listing/note-for-listing',
            'type': 'post',
            'data': $('#formNoteForListing').serialize()
        }).done(function (response) {
            // console.log(response);
            location.reload();
        }).always(function () {
            $("#noteForListing").modal('hide');
        });
    });
}

function generatePhotosPreview(src, bookType, rlistingId) {
    var returnValue = "<div style='position:relative;display:inline-block'>"
            + "<img style='width:113px;height:64px;margin-right:16px;' src='" + src + "' />"
            + "<a style='position:absolute;top:0px;right:20px;color:#f00;font-weight:bold' class='btnRemovePhoto' href='#'>xóa</a>"
            + "<div>" + bookType + " - " + rlistingId + "</div>"
            + "</div>";

    return returnValue;
}



function generateEventTable(type) {
    try {
        eventTables.destroy();
    } catch (ex) {
    }
    eventDataUrl = "/lead/get-activities/" + type + "/" + leadId + "/1000";
    eventTables = $('#tab_events_content table').DataTable({
        "processing": true,
        //"serverSide": true,
        "ajax": eventDataUrl,
        "columns": [
            {"data": "subject"},
            {"data": "content", render: renderEventContent},
            {"data": "createdDate", render: dateTimeRender},
            {"data": "customerName"},
            {"data": "responsiblePersonName"}
        ]
    });
    $('#tab_events_content table').on('draw.dt', function () {

        var maxheight = 134;
        var showText = "Xem tất cả";
        var hideText = "Thu gọn lại";

        $('.textContainer_Truncate').each(function () {
            var text = $(this);
            if (text.height() > maxheight) {
                text.css({'overflow': 'hidden', 'height': maxheight + 'px'});

                var link = $('<hr /><a href="#">' + showText + '</a>');
                var linkDiv = $('<div></div>');
                linkDiv.append(link);
                $(this).after(linkDiv);

                link.click(function (event) {
                    event.preventDefault();
                    if (text.height() > maxheight) {
                        $(this).html(showText);
                        text.css('height', maxheight + 'px');
                    } else {
                        $(this).html(hideText);
                        text.css('height', 'auto');
                    }
                });
            }
        });
    });
    return eventTables;
}
var renderEventContent = function (data, type, object) {
    return "<div class='textContainer_Truncate'>" + data + "</div>";
};


function generateScheduleTable(type) {
    try {
        scheduleTable.destroy();
    } catch (ex) {
    }
    eventDataUrl = "/lead/get-activities/" + type + "/" + leadId + "/1000";
    scheduleTable = $('#tab_schedule_content table').DataTable({
        "processing": true,
        //"serverSide": true,
        "ajax": eventDataUrl,
        "columns": [
            {"data": "customerId"},
            {"data": "customerName"},
            {"data": "customerPhone"},
            {"data": "createdDate", render: dateTimeRender},
            {"data": "scheduleTime", render: dateTimeRender},
            {"data": "scheduleId", render: renderScheduleAction}
        ]
    });
    return scheduleTable;
}
var renderScheduleAction = function (data, type, object) {
    data = "<a href='#' data-id='" + data + "' onclick=\"return editSchedule('" + data + "')\">Sửa</a>";
    return data;
};


function generateHistoryTable() {
    try {
        historyTable.destroy();
    } catch (ex) {
    }
    dataUrl = "/lead/get-history/" + leadId;
    historyTable = $('#tab_history_content table').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": dataUrl,
        "searching": false,
        "lengthChange": false,
        "ordering": false,
        "columns": [
            {"data": "historyId", render: renderHistoryId},
            {"data": "updatedByName"},
            {"data": "districtsList"},
            {"data": "directionsList"},
            {"data": "formatInitialBudget"},
            {"data": "formatFinalBudget"},
            {"data": "formatMinSize"},
            {"data": "formatMaxSize"},
            {"data": "bedRooms"},
            {"data": "bathRooms"},
            {"data": "note"},
            {"data": "createdDate", "render": dateRender}
        ]
    });
    return historyTable;
}
function renderHistoryId(data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='/lead/update/" + leadId + "/?historyId=" + data + "' onclick='return populateFromHistory(" + data + ")'>" + data + "</a>";
    return data;
}
function populateFromHistory(id) {
    showPropzyLoading();
    return true;
}



function validateCallReminder(formSelector) {
    var whenDate = $(formSelector + " #whenDate").val();
    var whenTime = $(formSelector + " #whenTime").val();
    var reminderTime = $(formSelector + " .reminderTime").val();
    var subject = $(formSelector + " .subject").val();
    var content = $(formSelector + " .content").val();
    var result = true;
    if (whenDate === "") {
        $(formSelector + " #whenDate").parents(".input-group").parent().find(".errors").html("Nhập ngày!");
        result = false;
    }
    if (whenTime === "") {
        $(formSelector + " #whenTime").parents(".input-group").parent().find(".errors").html("Nhập giờ!");
        result = false;
    }
    if (reminderTime === "") {
        $(formSelector + " .reminderTime").parents(".input-group").find(".errors").html("Nhập thời gian cảnh báo!");
        result = false;
    }
    if (subject === "") {
        $(formSelector + " .subject").parent().find(".errors").html("Nhập tiêu đề!");
        result = false;
    }
    if (content === "") {
        $(formSelector + " .content").parent().find(".errors").html("Nhập nội dung!");
        result = false;
    }
    return result;
}


function doBroadcast() {
    isBroadcast = false;
    var leadId = $("#leadId").val();
    showPropzyLoading();
    $.ajax({
        url: "/order/broadcast",
        type: "post",
        data: JSON.stringify({
            "leadId": leadId
        })
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function getPropertyTypes(listingTypeId) {
    $("#ajax-loading").show();
    $.ajax({
        url: '/common/get-property-type/' + listingTypeId,
        type: 'get'
    }).done(function (response) {
        var html = "";
        for (i = 0; i < response.length; i++) {
            var item = response[i];
            html += "<option value='" + item.propertyTypeID + "'>" + item.typeName + "</option>";
        }
        $("#propertyTypeId").html(html).select2();
        if (firstRun) {
            propertyTypeId = $('#propertyTypeId').val();
            getAmedities(listingTypeId, propertyTypeId);
            firstRun = false;
        }
    }).always(function () {

        $("#ajax-loading").hide();
    });
}


function getAmedities(listingTypeId, propertyTypeId) {
    url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;
    console.log(url);
    $("#ajax-loading").show();
    get_sync(url, true, function (data) {
        var child = [];
        var tmpArr = [];
        $.each(data, function (index, value) {
            if (value.amenityChild.length == 0) {
                tmpArr.push(value);
            } else {
                child.push(value);
            }
        });
        // $.each(var i=0; i< data.length; i++){
        //     if( data[i].amenityChild.length > 0 ){
        //         child.push(data[i]);
        //         data.splice(i,1)
        //     }
        // }
        child.sort(function (a, b) {
            return a.amenityChild.length - b.amenityChild.length
        })
        data = {};
        data.notChild = tmpArr;
        data.hasChild = child;

        var template = $('#tien-ich-tmpl').html();
        var compiledTemplate = Template7.compile(template);
        $('#amenities').html(compiledTemplate(data));
        $('#amenities input').attr('name', 'amenityId[]');
        $("#ajax-loading").hide();
    });
}
function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
    $("#statusName").val($("#statusId").find('option:selected').text());
    $("#agentName").val($("#agentId").find('option:selected').text());
}
function validateForm() {

    var isValidated = true;
    $(".errors").text("");
    var customerName = $("#customerName").val().trim();
    if (customerName === "") {
        isValidated = false;
        $("#customerName").parent().find(".errors").html("Nhập tên khách hàng!");
    }
    /*
     var assignTo = $("#assignedTo").val();
     console.log(currentAssignTo + " !== " + assignTo);
     if (currentAssignTo !== assignTo) {
     var leadReassignNote = $("#leadReassignReason").val().trim();
     if (leadReassignNote === "") {
     isValidated = false;
     $("#leadReassignReason").parent().find(".errors").html("Nhập lý do chuyển cho người khác!");
     }
     }
     var moveInDate = $("#moveInDate").val().trim();
     if (moveInDate === "") {
     isValidated = false;
     $("#moveInDate").parent().parent().find(".errors").html("Chọn ngày dọn vào!");
     }
     */
    if ($("#finalBudget").val().trim() === "" || $("#finalBudget").val().trim() === "0") {
        isValidated = false;
        $("#finalBudget").parent().find(".errors").html("Nhập ngân sách dự trù lớn nhất!");
    }

    if ($("#initialBudgetFixed").val().trim() === "" || $("#initialBudgetFixed").val().trim() === "0") {
        isValidated = false;
        $("#initialBudgetFixed").parent().find(".errors").html("Nhập Ngân sách ban đầu (Fixed) !");
    }


    if ($(".districts:checked").length <= 0) {
        isValidated = false;
        $(".district-errors").html("Chọn quận");
    }

    if ($(".isPrefered:checked").length <= 0) {
        isValidated = false;
        $(".district-errors").html("Chọn quận Ưa thích!");
    }



    if (!isValidated) {
        $("#alertModal .message").html("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
        $("#alertModal").modal();
    }
    return isValidated;
}

function getEmailListings() {
    showPropzyLoading();
    $.ajax({
        url: "/lead/get-email-listings/" + leadId,
        type: "post"
    }).done(function (response) {
        $("#listing-to-send tbody").html(response);
    }).always(function () {
        hidePropzyLoading();
    });
}
var isEditingSchedule = false;
function editSchedule(scheduleId) {
    showPropzyLoading();
    $.ajax({
        "url": '/lead/schedule-detail/' + scheduleId,
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            isEditingSchedule = true;
            var addressList = [];
            var listingIdLinks = [];
            var listingIds = [];
            $(response.data.listingsList).each(function (index, item) {
                if ($(this).prop("disabled")) {
                    return;
                }
                var listingId = '<span class="listing-group">'
                        + '<a href="/listing/' + item.id.rlistingId + '" target="_blank" >' + item.id.rlistingId + '</a>'
                        + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item.id.rlistingId + '\')"></i></a>'
                        + '; </span>';
                listingIdLinks.push(listingId);
                listingIds.push(item.id.rlistingId);
                //var address = $(this).parents('tr').find('span.address').text();
                //addressList.push(address);
            });

            $("#makeScheduleModal #scheduleId").val(response.data.scheduleId);
            $("#makeScheduleModal .address").val(response.data.address);
            $("#makeScheduleModal #whenDate").val(moment(response.data.scheduleTime).format('MM/DD/YYYY'));
            $("#makeScheduleModal #whenTime").val(moment(response.data.scheduleTime).format('HH:mm'));
            $("#makeScheduleModal .note").val(response.data.note);
            $("#makeScheduleModal .listings").html(listingIdLinks.join(''));
            $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
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
function generateScheduleListingLinks(arrListing) {
    var listingIdLinks = [];
    $(arrListing).each(function (index, item) {
        var listingId = '<span class="listing-group">'
                + '<a href="/listing/' + item + '" target="_blank" >' + item + '</a>'
                + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item + '\')"></i></a>'
                + '; </span>';
        listingIdLinks.push(listingId);
    });
    $("#makeScheduleModal .listings").html(listingIdLinks.join(''));

}

function deleteScheduleListing(selector, id) {
    var strListingIds = $("#makeScheduleModal .listingIds").val();
    var arrListingIds = strListingIds.split(';');
    var index = arrListingIds.indexOf(id);
    arrListingIds.splice(index, 1);
    $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
    $(selector).parents('span.listing-group').remove();
    $("#listing-to-send .select-listing").each(function () {
        var listingId = $(this).val();
        if (listingId == id) {
            $(this).prop('checked', false);
            $(this).prop('disabled', false);
        }
    });
}

$("#makeScheduleModal .btnAddlisting").on("click", function () {
    $("#makeScheduleModal").modal('hide');
    $("#btnContinueScheduleForm").show();
    $("#btnOpenScheduleForm").hide();
});

$(".btnCancelSchedule").on('click', function (event) {
    event.preventDefault();
    $("#makeScheduleModal").modal('hide');
    isEditingSchedule = false;
    getEmailListings();
});
var modalCreateMeeting = $("#modalCreateMeeting");
$("#isSpecialDeal").on("click", function () {
    showPropzyLoading();
    //check data
    $.ajax({
        url: "/lead/get-detail-json/" + lead.leadId,
        type: "get"
    }).done(function (response) {

        //check isPrefered
        var check_districtsPrefered = false;
        var districtsLength = response.data.request.districtsList.length;
        console.log(districtsLength);

        for (var i = 0; i < districtsLength; i++) {
            if (response.data.request.districtsList[i].isPrefered == true) {
                console.log('districtsPrefered ' + i + ' = ' + response.data.request.districtsList[i].isPrefered);
                check_districtsPrefered = true;
                break;
            }
        }

        //check initialBudgetFixed
        console.log('initialBudgetFixed = ' + response.data.request.initialBudgetFixed);
        var check_initialBudgetFixed = false;
        if (response.data.request.initialBudgetFixed > 0) {
            //error initialBudgetFixed
            check_initialBudgetFixed = true;
        }

        //check customerReview
        console.log('customerReview = ' + response.data.customerReview);
        // var check_customerReview = false;
        // if (response.data.customerReview != null) {
        //     check_customerReview = true;
        // }

        if (check_districtsPrefered && check_initialBudgetFixed) {
            var isChecked = ($(this).prop("checked") || lead.meetingId);
            showUpdateOrCreateMeetingForm(lead.meetingId);
        } else {
            hidePropzyLoading();
            var alert_text = '';
            if (check_districtsPrefered == false) {
                $(".district-errors").html("Chưa chọn Quận ưa thích !");
                alert_text += "Chưa chọn Quận ưa thích\r\n";
                alert(alert_text);
            }
            if (check_initialBudgetFixed == false) {
                $(".initialbudgetfixed-errors").html("Chưa chọn Ngân sách !");
                alert_text += "Chưa chọn Ngân sách ban đầu (Fixed) \r\n";
                alert(alert_text);
            }
            // if (check_customerReview == false) {
            //     alert_text += "Chưa có đánh giá khách hàng";
            // }

        }

    }).always(function () {
        hidePropzyLoading();
    });

});

findCrms();
$(".btnSaveMeeting").on("click", function (event) {
    event.preventDefault();
    var meetingData = {
        "leadId": parseInt(leadId),
        "dealId": null,
        "assignTo": parseInt(modalCreateMeeting.find(".assignTo").val()),
        "reminderDate": null,
        //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
        "noteTm": modalCreateMeeting.find(".noteTm").val()
    };
    var whenDate = modalCreateMeeting.find(".whenDate").val();
    var whenTime = modalCreateMeeting.find(".whenTime").val();
    var date = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm");
    if (date.isValid()) {
        meetingData.reminderDate = date.unix() * 1000;
    }
    saveMeeting(meetingData);
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
});


function generateDeal(successCallback) {
    prepareForm();
    if (validateForm()) {
        showPropzyLoading();
        $.ajax({
            url: "/lead/generate-deal",
            data: $("#formCustomerInfo").serialize(),
            type: "post"
        }).done(function (response) {
            if (response.result === true) {
                successCallback(response);
            } else {
                if (response.data) {
                    var message = response.message;
                    if (Array.isArray(response.data) && response.data.length > 0) {
                        message += ' (Mã KH :' + response.data[0].customerId + ')';
                    }
                    $("#alertModal .message").html(message);
                } else {
                    $("#alertModal .message").html(response.message);
                }
                $("#alertModal").modal();
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
}

var modalReportMeetingToTm = $("#modalReportMeetingToTm");
$("#btnReportMeetingToTm").on("click", function (event) {
    event.preventDefault();
    modalReportMeetingToTm.modal();
});
modalReportMeetingToTm.find(".btnReportMeetingToTm").on("click", function (event) {
    event.preventDefault();
    var postData = {
        typeId: modalReportMeetingToTm.find(".reportMeetingType:checked").val(),
        meetingId: lead.meeting.id
    };
    if (!postData.typeId) {
        modalReportMeetingToTm.find(".errors-reportMeetingType").html("Chọn loại");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: "/lead/report-meeting-to-tm",
        data: JSON.stringify(postData),
        type: "post"
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            modalReportMeetingToTm.modal("hide");
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
$("#btnRepostCustomerNotArrive").on("click", function (event) {
    event.preventDefault();
    var postData = {
        typeId: 2,
        meetingId: lead.meeting.id
    };
    if (!postData.typeId) {
        modalReportMeetingToTm.find(".errors-reportMeetingType").html("Chọn loại");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: "/lead/report-meeting-to-tm",
        data: JSON.stringify(postData),
        type: "post"
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            modalReportMeetingToTm.modal("hide");
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

$("#btnSendToCrm").on("click", function (event) {
    var postData = {leadId: $('#leadId').val()}
    $.ajax({
        url: "/question/check-complete-question-form",
        data: JSON.stringify(postData),
        type: "post"
    }).done(function (response) {
        console.log(response)
        if (response.result == true) {
            $("#isSpecialDeal").click();
        } else {
            alert(response.message)
        }
        // event.preventDefault();
        // return false;
    })
    // console.log()

    // $("#isSpecialDeal").click();
});
/*
 $(".btnFilterListing").on("click", function(event){
 event.preventDefault();
 prepareForm();
 showPropzyLoading();
 var privateListing = $(this).data("private-listing");
 $.ajax({
 url: "/lead/find-listing",
 type: 'post',
 data: $("#formCustomerInfo").serialize()+'&privateListing='+privateListing,
 }).done(function (response) {
 numItems = $(response).filter('div.listing').length;
 if (numItems > 4)
 {
 $("#listings").css('height', '600px');
 $("#listings").css('overflow-y', 'auto');
 }
 $("#listings").html(response);
 }).always(function () {
 hidePropzyLoading();
 });
 
 });
 */

$("#btnAddCart").on("click", function (event) {
    event.preventDefault();
    var photos = [];
    var photosPreview = "";
    var rListingIds = [];
    $("#listings table tr .selected-email-listing:checked").each(function () {
        var rListingId = $(this).val();
        if (rListingId) {
            rListingIds.push(rListingId);
        }
    });
    if (rListingIds.length <= 0) {
        showPropzyAlert('Không có listing để gửi');
        return false;
    }
    showPropzyLoading();

    $.ajax({
        url: "/lead/add-listing-cart",
        data: 'rlistingIds=' + rListingIds + '&leadId=' + leadId,
        type: "post"
    }).done(function (response) {
        //console.log(response);
        showPropzyAlert(response.message);
        findListing();
    }).always(function () {
        hidePropzyLoading();
    });
});
