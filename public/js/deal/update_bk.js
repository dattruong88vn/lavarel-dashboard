var isBroadcast = false;
var scheduleType = 'listing';
var scheduleTable = null;
$(document).ready(function () {
    $('.whenTime').timepicker({
        showMeridian: false
    });

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

    $("#btnContinueListingScheduleForm").hide();
    $("#btnContinueBriefFormScheduleForm").hide();
    $(".tab-content-schedule").hide();
    $(".btnCancelSchedule").on("click", function (event) {
        event.preventDefault();
        $("#makeScheduleModal").modal('hide');
    });
    $("#makeScheduleModal .btnAddlisting").on("click", function () {
        $("#makeScheduleModal").modal('hide');
        if (scheduleType === 'listing') {
            $("#btnContinueListingScheduleForm").show();
            $("#btnOpenListingScheduleForm").hide();
        } else {
            $("#btnContinueBriefFormScheduleForm").show();
            $("#btnOpenBriefFormScheduleForm").hide();
        }
    });

    $("#btnContinueListingScheduleForm").on('click', function (event) {
        event.preventDefault();
        $(this).hide();
        $('#btnOpenListingScheduleForm').show();
        var strListingIds = $("#makeScheduleModal .listingIds").val();
        var arrListingIds = [];
        if (strListingIds) {
            arrListingIds = strListingIds.split(';');
        }
        $("#customer-listings .select-listing:checked").each(function () {
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
    $("#btnContinueBriefFormScheduleForm").on('click', function (event) {
        event.preventDefault();
        $(this).hide();
        $('#btnOpenBriefFormScheduleForm').show();
        var strListingIds = $("#makeScheduleModal .briefFormIds").val();
        var arrListingIds = [];
        if (strListingIds) {
            arrListingIds = strListingIds.split(';');
        }
        $("#brief-form-list .select-brief-form:checked").each(function () {
            var value = $(this).val();
            if (!$(this).prop('disabled') && -1 == $.inArray(value, arrListingIds)) {
                arrListingIds.push($(this).val());
            }
        });
        generateScheduleBriefFormLinks(arrListingIds);
        $("#makeScheduleModal .briefFormIds").val(arrListingIds.join(';'));
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#btnOpenListingScheduleForm").on("click", function (event) {
        event.preventDefault();
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#customer-listings .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = '<a href="/listing/' + $(this).val() + '" target="_blank" >' + $(this).val() + '</a>';
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('.listing').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn listing để đặt lịch');
            return;
        }
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#btnOpenBriefFormScheduleForm").on("click", function (event) {
        event.preventDefault();
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#brief-form-list .select-brief-form:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = $(this).val();
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('tr').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn brief form để đặt lịch');
            return;
        }
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .briefFormIds").val(listingIds.join(';'));
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
            'url': '/deal/make-schedule',
            'type': 'POST',
            'data': $("#formMakeSchedule").serialize()
        }).done(function (response) {
            console.log(response);
            if (response.result) {
                $("#makeScheduleModal").modal('hide');
                //generateScheduleTable(5);
                getEmailListings();
                getCustomerListings();
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    getCustomerListings();
    $("#makeCallReminderModal #whenDate").datepicker();
    listNotes(dealId);
    loadRequestPaymentForm(dealId);
    setInterval(function () {
        listNotes(dealId);
    }, 10000);
    CKEDITOR.replace("emailContent");
    CKEDITOR.replace("contractEmailContent");
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });

    $('#whenTime').timepicker({
        showMeridian: false
    });

    initEmailListing();
    initCustomerListings();

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
        //console.log("start");
        //$("#makeCallReminderModal #whenDate").datepicker();
        //$("#makeCallReminderModal #whenTime").timepicker();
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
            'url': '/deal/make-call-reminder',
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

    $("#btnSaveComment").on("click", function (event) {
        event.preventDefault();
        var note = $(".txtComment").val();
        showPropzyLoading();
        $.ajax({
            url: "/deal/add-note",
            type: "POST",
            data: JSON.stringify({
                dealId: dealId,
                note: note
            })
        }).done(function (response) {
            if (response.result) {
                $(".txtComment").val("");
                listNotes(dealId);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".btnSaveMeetingReminder").on("click", function (event) {
        event.preventDefault();
        var saleId = $("#newMeetingReminderModal #saleId").select2().val();
        //console.log(saleId);
        if (saleId === "") {
            showPropzyAlert("Chọn responsible person");
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/deal/make-meeting-reminder',
            'type': 'POST',
            'data': $("#formMakeMeetingReminderModal").serialize()
        }).done(function (response) {
            if (response.result) {
                $("#newMeetingReminderModal").modal('hide');
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });


    $("#btnShowEventForm").on("click", function () {
        $("#newEventReminderModal").modal();
        $("#newEventReminderModal #whenDate").datepicker();
        $("#newEventReminderModal #whenTime").timepicker({
            showMeridian: false
        });
    });

    $("#btnShowPaymentRequestForm").on("click", function (event) {
        event.preventDefault();
        loadRequestPaymentForm(dealId);
        var formWrapper = "#paymentRequestModal";
        $(formWrapper + " .saleName").val($("#saleName").val());
        $(formWrapper + " .dealId").val(dealId);
        $("#paymentRequestModal").modal();
    });
    if ($("#statusId").val() === "13") {
        $("#btnShowPaymentRequestForm").click();
    }
    $("#sentDate").datepicker();
    $(".btnSendPaymentRequest").on("click", function (event) {
        event.preventDefault();
        savePaymentRequest(this, false);
    });
    $(".btnSavePaymentRequest").on("click", function (event) {
        event.preventDefault();
        savePaymentRequest(this, true);
    });

    var savePaymentRequest = function (button, isDraft) {
        var postData = {
            "dealId": dealId,
            "customerId": $("#customerId").val(),
            "customerName": $("#customerName").val(),
            "saleId": $("#saleId").val() !== "" ? $("#saleId").val() : null,
            "saleName": $("#saleName").val() !== "" ? $("#saleName").val() : null,
            "sentDate": $("#sentDate").val() !== "" ? moment($("#sentDate").val()).unix() * 1000 : null,
            "method": $(".paymentMethod:checked").val(),
            "isDraft": isDraft
        };
        showPropzyLoading();
        $.ajax({
            url: "/deal/save-payment-request",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                if (!isDraft) {
                    $(button).remove();
                }
                showPropzyAlert(response.message);
                $("#paymentRequestModal").modal("hide");
            } else {
                alert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }

    $(".btnSaveEventReminder").on("click", function (event) {
        event.preventDefault();
        var saleId = $("#newEventReminderModal #saleId").select2().val();
        if (saleId === "") {
            showPropzyAlert("Chọn responsible person");
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/deal/make-event-reminder',
            'type': 'POST',
            'data': $("#formMakeEventReminderModal").serialize()
        }).done(function (response) {
            if (response.result) {
                $("#newEventReminderModal").modal('hide');
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });



    $(".seeonmap").on("click", function () {
        var parent = $(this).parents('form');
        var lat = $.trim($(parent).find('#latitude').val());
        var lng = $.trim($(parent).find('#longitude').val());
        if (lat !== "" && lng !== "") {
            var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
            window.open(link);
        }
        return false;
    });

    /*
     Address with google
     */
    $(".address").geocomplete().bind("geocode:result", function (event, result) {
        var parent = $(this).parents('form');
        $(parent).find('#latitude').val(result.geometry.location.lat());
        $(parent).find('#longitude').val(result.geometry.location.lng());
    });


    $(".btn-select-toggle").on("click", function () {
        $(".select-toggle").slideToggle();
    });
    $(".btn-select-toggle-stream").on("click", function () {
        $(".select-toggle-stream").slideToggle();
    });
    $("#reassignSale").change(function () {
        var saleId = $(this).val().trim();
        var saleName = $(this).find('option:selected').text().trim();
        $("#saleId").val(saleId);
        $("#saleName").val(saleName);
        $("#lbSaleName").html(saleName);
    });
    updateTypeName();
    $("#typeId").change(function () {
        updateTypeName();
        var id = $(this).val();
        $.ajax({
            "url": "/deal/getSales",
            "type": "get",
            "data": "type=" + id
        }).done(function (response) {
            var html = "<option value=''>--- Chọn sale ---</option>";
            if (response.result) {
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<option value='" + item.agentId + "'>" + item.name + "</option>";
                }
            }
            $("#reassignSale").html(html).select2();
        }).always(function () {

        });
    });
    function updateTypeName() {
        var name = $("#typeId").find("option:checked").text();
        $("#typeName").val(name);
    }
    $("#btnSaveDeal").on("click", function () {
        updateTypeName();
        $("#ajax-loading").show();
        $.ajax({
            url: '/deal/do-update',
            type: 'post',
            data: $("#dealInformation").serialize() + "&initialBudgetFixed=" + $("#initialBudgetFixed").val() + "&typeId=" + $("#typeId").val() + "&typeName=" + $("#typeName").val()
        }).done(function (response) {
            if (response.result) {
                if (isBroadcast) {
                    doBroadCast();
                }
            }
            if (response.message) {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            $("#ajax-loading").hide();
        });
    });

    $("#btnFindListing").on("click", function (event) {
        event.preventDefault();
        var dealId = $("#dealId").val();
        $("#ajax-loading").show();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('#csrf-token').val()
            }
        });
        $.ajax({
            url: "/deal/find-listing/" + dealId,
            type: "get"
        }).done(function (response) {
            numItems = $(response).filter('div.listing').length;
            if (numItems > 4)
            {
                $("#listings").css('height', '600px');
                $("#listings").css('overflow-y', 'auto');
            }

            $("#listings").html(response);
            $('html, body').animate({
                scrollTop: $("#listings").offset().top - 60
            }, 500);
        }).always(function () {
            $("#ajax-loading").hide();
        });
    });



    $("#selectAllListing").on("click", function () {
        var current = $(this);
        $(".selected-listing").prop("checked", $(this).prop('checked'));
        var rlistingIds = [];
        $(".selected-listing").each(function () {
            rlistingIds.push(parseInt($(this).val()));
        });
        var dealId = parseInt($("#dealId").val());
        if ($(this).prop('checked')) {
            $("#ajax-loading").show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: "/deal/add-email-listings",
                type: "post",
                data: JSON.stringify({
                    'dealId': dealId,
                    'rlistingIds': rlistingIds
                })
            }).done(function (response) {
                $(".selected-listing").parent().hide();
                $("#listing-to-send tbody").html(response);
                current.prop('checked', false);
                $("#listings").html("");
            }).always(function () {
                $("#ajax-loading").hide();
            });
        }

    });


    /*
     $("#btnEmailToCustomer").on("click", function (event) {
     event.preventDefault();
     showPropzyLoading();
     $("#emailToCustomer #isGoodsAvailable").val('0');
     $.ajax({
     url: "/deal/get-customer-email-template/" + dealId,
     type: "get"
     }).done(function (response) {
     //$("#emailContent").val(response);
     CKEDITOR.instances['emailContent'].setData(response);
     var photos = [];
     var photosPreview = "";
     $("#listing-to-send tr").each(function () {
     var rListingId = $(this).attr('data-item-id');
     var redBookPhotos = $(this).find(".redBookPhotos").val();
     if (redBookPhotos) {
     redBookPhotos = JSON.parse(redBookPhotos);
     $(redBookPhotos).each(function (index, item) {
     photos.push(item);
     photosPreview += generatePhotosPreview(item, "Sổ đỏ", rListingId);
     });
     }
     var pinkBookPhotos = $(this).find(".pinkBookPhotos").val();
     if (pinkBookPhotos) {
     pinkBookPhotos = JSON.parse(pinkBookPhotos);
     $(pinkBookPhotos).each(function (index, item) {
     photos.push(item);
     photosPreview += generatePhotosPreview(item, "Sổ hồng", rListingId);
     });
     }
     
     });
     $("#emailToCustomer .photos-preview").html(photosPreview);
     $("#emailToCustomer .btnRemovePhoto").on("click", function (event) {
     event.preventDefault();
     $(this).parent().remove();
     });
     console.log(photos);
     $("#emailToCustomer #photos").val(photos);
     //$("#emailsTo").val($("#customerEmail").val());
     $("#emailToCustomer").modal();
     }).always(function () {
     hidePropzyLoading();
     });
     });
     */
    $("#btnEmailToCustomer").on("click", function (event) {
        event.preventDefault();
        $("#emailToCustomer #isGoodsAvailable").val('1');
        $("#emailToCustomer #emailSubject").val('');
        $("#emailToCustomer #emailsTo").val($("#customerEmail").text().trim());
        var photos = [];
        var photosPreview = "";
        var rListingIds = [];
        $("#listing-to-send tbody tr").each(function () {
            var rListingId = $(this).attr('data-item-id');
            rListingIds.push(rListingId);
            var redBookPhotos = $(this).find(".redBookPhotos").val();
            if (redBookPhotos) {
                redBookPhotos = JSON.parse(redBookPhotos);
                $(redBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ đỏ", rListingId);
                });
            }
            var pinkBookPhotos = $(this).find(".pinkBookPhotos").val();
            if (pinkBookPhotos) {
                pinkBookPhotos = JSON.parse(pinkBookPhotos);
                $(pinkBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ hồng", rListingId);
                });
            }

        });
        console.log(rListingIds);
        if (rListingIds.length <= 0) {
            showPropzyAlert('Không có listing để gửi');
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: "/deal/get-customer-email-template/" + dealId,
            type: "get"
        }).done(function (response) {
            //$("#emailContent").val(response);
            CKEDITOR.instances['emailContent'].setData(response);

            $("#emailToCustomer .photos-preview").html(photosPreview);
            $("#emailToCustomer .btnRemovePhoto").on("click", function (event) {
                event.preventDefault();
                $(this).parent().remove();
            });
            $("#emailToCustomer #photos").val(photos);
            //$("#emailsTo").val($("#customerEmail").val());
            $("#emailToCustomer").modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });



    $("#btnSendMail").on("click", function (event) {
        event.preventDefault();
        for (var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
        var photos = [];
        $(".photos-preview img").each(function () {
            photos.push($(this).attr('src'));
        });
        $("#photos").val(photos);
        $.ajax({
            url: "/deal/send-email-listing/" + dealId,
            type: 'post',
            data: $("#formEmail").serialize()
        }).done(function (response) {
                        // console.log(JSON.stringify(response));return false;

            if (response.result) {
                window.location = window.location;
            } else {
                showPropzyAlert(resonse.message);
            }
        }).always(function () {

        });
    });



    $("#btnBroadcast").on("click", function (event) {
        event.preventDefault();
        isBroadcast = true;
        $("#btnSaveDeal").click();
    });

    $(".btnAddNumberOfListingView").on("click", function (event) {
        event.preventDefault();
        var numberOfListingView = $("#numberOfListingView").val();
        if (numberOfListingView !== "") {
            showPropzyLoading();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: "/deal/add-number-of-listing-view",
                type: "post",
                data: JSON.stringify({
                    "dealId": $("#dealId").val(),
                    "numberOfListings": numberOfListingView
                })
            }).done(function (response) {
                if (response.result) {
                    $("ul.numberOfListingsView").append("<li>" + numberOfListingView + "</li>");
                }
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });
    var eventTables = generateEventTable(-1);
    $("a.tab_events").on('show.bs.tab', function (e) {
        $("#tab_events_content").hide();
        $(".tab-content-history").hide();
        $(".tab-content-schedule").hide();
        var type = $(e.target).attr("data-type");
        if (type == 5) {
            generateScheduleTable(type);
            $(".tab-content-schedule").show();
            $("#tab_events_content").hide();
        } else {
            generateEventTable(type);
            $("#tab_events_content").show();
        }
    });

    getEmailListings();
    listBriefForms("#brief-form-list", dealId);

    $("#btnShowUploadContract").on("click", function () {
        $("#upLoadContract").modal();
    });
    $("#btnShowSendContract").on("click", function (event) {
        event.preventDefault();
        var listingHtml = "";
        $("#customer-listings .listing").each(function () {
            var itemId = $(this).attr('data-item-id');
            var haveRequestContract = $(this).attr('data-have-request-contract') === 'true' ? "checked" : "";
            listingHtml += "<label style='margin-right:16px;' ><input name='rlistingIds[]' type='checkbox' " + haveRequestContract + " value='" + itemId + "' /> " + itemId + "</label>";
        });
        $(".select-listing").html(listingHtml);
        showPropzyLoading();
        $.ajax({
            url: "/deal/get-contract-email-template/" + dealId,
            type: "get"
        }).done(function (response) {
            CKEDITOR.instances['contractEmailContent'].setData(response);
            $("#emailContractToCustomer").modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });


    $(".btn-upload-contract").on("click", function (event) {
        var input = $(this).parents("form").find(".file");
        if (input.val().trim() === "") {
            showPropzyAlert("Chọn file");
            event.preventDefault();
            return false;
        }
        var fileNameSegments = input.val().split('.');
        if (fileNameSegments[fileNameSegments.length - 1] !== "pdf") {
            showPropzyAlert("Chỉ được upload file pdf");
            event.preventDefault();
            return false;
        }
    });


    $("#btnSendMailContract").on("click", function (event) {
        event.preventDefault();
        for (var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
        showPropzyLoading();
        $.ajax({
            url: "/deal/send-email-contract/" + dealId,
            type: 'post',
            data: $("#emailContractToCustomer #formEmail").serialize()
        }).done(function (response) {
            if (response.result) {
                window.location = window.location;
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
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
});


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
    eventDataUrl = "/deal/get-activities/" + type + "/" + dealId + "/1000";
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

var historyTable = generateHistoryTable();
function generateHistoryTable() {
    try {
        historyTable.destroy();
    } catch (ex) {
    }
    dataUrl = "/deal/get-history/" + dealId;
    historyTable = $('#tab_history table').DataTable({
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
    data = "<a href='/deal/update/" + dealId + "/?historyId=" + data + "' onclick='return populateFromHistory(" + data + ")'>" + data + "</a>";
    return data;
}
function populateFromHistory(id) {
    showPropzyLoading();
    //window.location.href = "/deal/update/" + leadId + "?historyId=" + id;
    return true;
}

function listNotes(id) {
    $.ajax({
        url: "/deal/list-notes/" + id,
        type: "get"
    }).done(function (response) {
        var notesListHtml = "";
        for (i = 0; i < response.data.list.length; i++) {
            var item = response.data.list[i];
            var isMine = item.isMine ? "isMine" : "";
            var photo = item.photo ? item.photo : "/images/icon-tm.png";
            notesListHtml += "<li class='" + isMine + " row' >";
            notesListHtml += "<img src='" + photo + "' /><div><b>" + item.name + "</b> - <i>" + moment(item.createdDate).format("DD/MM/YYYY HH:mm:ss") + "</i></div>";
            notesListHtml += "<div>" + item.note + "</div>";
            notesListHtml += "</li>";
        }
        $(".notesList").html(notesListHtml);
    }).always(function () {

    });
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

function doBroadCast() {
    isBroadcast = false;
    var leadId = $("#leadId").val();
    var dealId = $("#dealId").val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    showPropzyLoading();
    $.ajax({
        url: "/order/broadcast",
        type: "post",
        data: JSON.stringify({
            "leadId": leadId,
            "dealId": dealId
        })
    }).done(function (response) {
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
}

function prepareForm() {
    if ($("#saleId").val() !== "") {
        $("#saleName").val($("#saleId").find('option:selected').text().trim());
    }
    if ($("#accountManagerId").val() !== "") {
        $("#accountManagerName").val($("#accountManagerId").find('option:selected').text().trim());
    }
}

function initCustomerListings() {
    $(".deactivate-listing").unbind("click");
    $(".deactivate-listing").on("click", function (event) {
        var current = $(this);
        if ($(this).prop("checked")) {
            var rlistingId = parseInt($(this).val());
            var dealId = parseInt($("#dealId").val());
            $('#ajax-loading').show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: '/deal/deactivate-listing',
                type: 'post',
                data: JSON.stringify({
                    'rlistingId': rlistingId,
                    'dealId': dealId
                })
            }).done(function (response) {
                console.log(response);
                if (response.result) {
                    current.prop('disabled', true);
                }
            }).always(function () {
                $('#ajax-loading').hide();
            });
        }
    });

    $(".change-listing-status").unbind("click");
    $(".change-listing-status").on("click", function () {
        var isChecked = $(this).prop("checked");
        if (isChecked) {
            showPropzyLoading();
            $.ajax({
                url: "/deal/listing-status-checked",
                type: 'post',
                data: JSON.stringify({
                    dealId: dealId,
                    rlistingId: $(this).attr("data-rlisting-id"),
                    statusId: $(this).val()
                })
            }).done(function (response) {
                //console.log(response);
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });
}
function initEmailListing() {
    $(".btnRemoveEmailListing").unbind("click");
    $(".deactivate-listing").unbind("click");
    $(".btnRemoveEmailListing").on("click", function (event) {
        event.preventDefault();
        var dealId = $("#dealId").val();
        var rlistingId = $(this).attr('data-id');
        $("#ajax-loading").show();
        var current = $(this);
        $.ajax({
            url: "/deal/remove-email-listing/" + dealId + "/" + rlistingId,
            type: "get"
        }).done(function (response) {
            current.parents('tbody').html(response);
            console.log($(".selected-listing-" + rlistingId).parents(".listing"));
            initEmailListing();

            if (current.parents("tr").find(".deactivate-listing").prop("checked")) {
                return;
            } else {
                $(".selected-listing-" + rlistingId).parents(".listing").show();
                $(".selected-listing-" + rlistingId).prop('checked', false);
            }
        }).always(function () {
            $("#ajax-loading").hide();
        });
    });

    $(".deactivate-listing").on("click", function (event) {
        var current = $(this);
        if ($(this).prop("checked")) {
            var rlistingId = parseInt($(this).val());
            var dealId = parseInt($("#dealId").val());
            $('#ajax-loading').show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: '/deal/deactivate-listing',
                type: 'post',
                data: JSON.stringify({
                    'rlistingId': rlistingId,
                    'dealId': dealId
                })
            }).done(function (response) {
                console.log(response);
                if (response.result) {
                    current.prop('disabled', true);
                }
            }).always(function () {
                $('#ajax-loading').hide();
            });
        }
    });


    $(".select-customer-listing").on("click", function (event) {
        var current = $(this);
        if ($(this).prop("checked")) {
            var rlistingId = parseInt($(this).val());
            var dealId = parseInt($("#dealId").val());
            $('#ajax-loading').show();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('#csrf-token').val()
                }
            });
            $.ajax({
                url: '/deal/select-customer-listing',
                type: 'post',
                data: JSON.stringify({
                    'rlistingId': rlistingId,
                    'dealId': dealId
                })
            }).done(function (response) {
                current.parents("tr").remove();
                $("#customer-listings").html(response);
                initCustomerListings();
            }).always(function () {
                $('#ajax-loading').hide();
            });
        }
    });

    $(".pinkBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find("input.pinkBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
    $(".redBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find("input.redBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
    function initSlideModal(html) {
        try {
            $("#owl-carousel").data('owlCarousel').destroy();
        } catch (ex) {
        }
        $("#owl-carousel").html(html);
        $("#owl-carousel").owlCarousel({
            singleItem: true,
            navigation: true,
            navigationText: ['trước', 'sau']
        });
        $("#image-slider").modal();
    }
}

function getCustomerListings() {
    $.ajax({
        url: '/deal/selected-customer-listings/' + dealId,
        type: 'get'
    }).done(function (response) {
        $("#customer-listings").html(response);
        initCustomerListings();
    }).always(function () {
        $('#ajax-loading').hide();
    });
}

function getEmailListings() {
    showPropzyLoading();
    $.ajax({
        url: "/deal/get-email-listings/" + dealId,
        type: "post"
    }).done(function (response) {
        $("#listing-to-send tbody").html(response);
    }).always(function () {
        hidePropzyLoading();
    });
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

function generateScheduleBriefFormLinks(arrListing) {
    var listingIdLinks = [];
    $(arrListing).each(function (index, item) {
        var listingId = '<span class="listing-group">' + item
                + ' <a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item + '\')"></i></a>'
                + '; </span>';
        listingIdLinks.push(listingId);
    });
    $("#makeScheduleModal .listings").html(listingIdLinks.join(''));

}




function generateScheduleTable(type) {
    try {
        scheduleTable.destroy();
    } catch (ex) {
    }
    eventDataUrl = "/deal/get-activities/" + type + "/" + dealId + "/1000";
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



var isEditingSchedule = false;
function editSchedule(scheduleId) {
    showPropzyLoading();
    $.ajax({
        "url": '/deal/schedule-detail/' + scheduleId,
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
                        + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item.id.rlistingId + '\')"></i></a>'
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
                        + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleBriefForm(this, \'' + item.id.briefFormId + '\')"></i></a>'
                        + '; </span>';
                briefFormLinks.push(itemId);
                briefFormIds.push(item.id.briefFormId);
                //var address = $(this).parents('tr').find('span.address').text();
                //addressList.push(address);
            });

            $("#makeScheduleModal #scheduleId").val(response.data.scheduleId);
            $("#makeScheduleModal .address").val(response.data.address);
            $("#makeScheduleModal #whenDate").val(moment(response.data.scheduleTime).format('MM/DD/YYYY'));
            $("#makeScheduleModal #whenTime").val(moment(response.data.scheduleTime).format('HH:mm'));
            $("#makeScheduleModal .note").val(response.data.note);
            if (listingIds.length > 0) {
                $("#makeScheduleModal .listings").html(listingIdLinks.join(''));
                $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
                $(".btnAddlisting").attr('href', '#customer-listings');
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


function deleteScheduleListing(selector, id) {
    var strListingIds = $("#makeScheduleModal .listingIds").val();
    var arrListingIds = strListingIds.split(';');
    var index = arrListingIds.indexOf(id);
    arrListingIds.splice(index, 1);
    $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
    $(selector).parents('span.listing-group').remove();
    $("#customer-listings .select-listing").each(function () {
        var listingId = $(this).val();
        if (listingId == id) {
            $(this).prop('checked', false);
            $(this).prop('disabled', false);
        }
    });
}


function deleteScheduleBriefForm(selector, id) {
    var strListingIds = $("#makeScheduleModal .briefFormIds").val();
    var arrListingIds = strListingIds.split(';');
    var index = arrListingIds.indexOf(id);
    arrListingIds.splice(index, 1);
    $("#makeScheduleModal .briefFormIds").val(arrListingIds.join(';'));
    $(selector).parents('span.listing-group').remove();
    $("#brief-form-list .select-brief-form").each(function () {
        var listingId = $(this).val();
        if (listingId == id) {
            $(this).prop('checked', false);
            $(this).prop('disabled', false);
        }
    });
}