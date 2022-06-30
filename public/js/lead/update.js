$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });

    CKEDITOR.replace('note');

    DealFunctions.initCoreForm();
    DealFunctions.validateOptions.rules.customerPhone.phoneValidate = false;
    var validateFormCreate = $("#formCreate").validate(DealFunctions.validateOptions);

    var timer = new SendTimerCounter({key:`lead-${lead.leadId}`, timeDoAction: lead.timeInactive});
    timer.init();

    // check close, reload browser
    var _BrowserCloseAction = new BrowserCloseAction(
        `lead-${lead.leadId}`,
        function(){
            console.log("reload");
            if(lead.progressQuoId != 3 && lead.progressQuoId != 4){
                if(lead.dealId == ""){
                    timer.submit({leadId: lead.leadId});
                }  
            }
        },
        function(){
            console.log("close");
            if(lead.progressQuoId != 3 && lead.progressQuoId != 4){
                if(lead.dealId == ""){
                    timer.submit({leadId: lead.leadId});
                } 
            }
        }
    );
    _BrowserCloseAction.init();
    console.log("getInitTimeStamp",_BrowserCloseAction.getInitTimeStamp());


    $("#btnSaveLead").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (!validateFormCreate.form()) {
            showPropzyAlert("Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.");
            return false;
        }
        if($('#sourceTCId').is(':visible')){
            if($('#sourceTCId').val() == ''){
                $('#sourceTCId').css('border','1px solid red');
                $('html, body').animate({
                    scrollTop: $('#sourceTCId').offset().top
                }, 2000);
                return false;
            }
        }
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].updateElement();
        };

        // rule area and price popup message
        let finalBudget = $('#finalBudget').val().replace(/\,/g, '');
        let listingTypeId = $('#listingTypeId').val();
        let messageContent = '';

        let minSize = parseFloat($('#minSize').val().replace(/\,/g, ''));
      
        let propertyTypeId = $('#propertyTypeId').val();
        let messageContentArea = '';

        if (listingTypeId == 1) {
            messageContent = `${NumberInputUtil.REQUEST_BUY_PRICE} ${NumberInputUtil.numberToText(finalBudget)}`;
        } else if (listingTypeId == 2) {
            messageContent = `${NumberInputUtil.REQUEST_HIRE_PRICE} ${NumberInputUtil.numberToText(finalBudget)}`
        }

        if ($('.formReset #hem-checkbox').prop('checked')) {
            let isEnoughData = false;
            if (!($('#roadFrontageDistance').val() != "")) {
                isEnoughData = true;
            } else if (!($('#alleyType1').val() != "")) {
                isEnoughData = true;
            } else if (!($('#alleyId').val() != "") || !($('#alleyWidth').val() != "") ) {
                isEnoughData = true;
            }
            if (isEnoughData) {
                showPropzyAlert("Vui lòng nhập đầy đủ thông tin hẻm.");
                return false;
            }
        }
        if ($('.formReset #mat-tien-checkbox').prop('checked')) {
            let isEnoughData = false;
            if (!($('#roadFrontageWidth').val() != "")) {
                isEnoughData = true;
            } 
            if (isEnoughData) {
                showPropzyAlert("Vui lòng nhập đầy đủ thông tin mặt tiền.");
                return false;
            }
        }

        if (finalBudget < NumberInputUtil.ONE_BILLION && listingTypeId == 1) {
            // mua < 1 tỷ 
            showPropzyConfirm({
                message: messageContent,
                btn: {
                    yes: {
                        text: "Xác nhận"
                    },
                    no: {
                        text: "Hủy"
                    }
                },
                okCallback: function () {
                    if ( (propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA ) {
                        // case đất nền/ đất nền dự án, sử dụng dt đất
                        messageContentArea = `${NumberInputUtilArea.REQUEST_BUY_MIN_AREA}
                        ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
                        setTimeout(function () {
                            showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                        text: "Xác nhận"
                                    },
                                    no: {
                                        text: "Hủy"
                                    }
                                },
                                okCallback: function () { 
                                    commonPostCreate();
                                }
                            })
                        }, 500)
                    }  else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA ) {
                        // case nhà riêng ..
                        messageContentArea = `${NumberInputUtilArea.REQUEST_BUY_MIN_AREA}
                        ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
                        setTimeout(function () { 
                            showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                        text: "Xác nhận"
                                    },
                                    no: {
                                        text: "Hủy"
                                    }
                                },
                                okCallback: function () { 
                                    commonPostCreate();
                                }
                            })
                        }, 500)
                    } else {
                        commonPostCreate();
                    }
                }
            })
        } else if ( finalBudget && finalBudget > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2 ) {
            // thuê > 100 triệu
            showPropzyConfirm({
                message: messageContent,
                btn: {
                    yes: {
                        text: "Xác nhận"
                    },
                    no: {
                        text: "Hủy"
                    }
                },
                okCallback: function () {
                    if ( (propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA ) {
                        // case đất nền/ đất nền dự án, sử dụng dt đất
                        messageContentArea = `${NumberInputUtilArea.REQUEST_HIRE_MIN_AREA}
                        ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
                        setTimeout(function () {
                            showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                        text: "Xác nhận"
                                    },
                                    no: {
                                        text: "Hủy"
                                    }
                                },
                                okCallback: function () { 
                                    commonPostCreate();
                                }
                            })
                        }, 500)
                    }  else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                        // case nhà riêng ..
                        messageContentArea = `${NumberInputUtilArea.REQUEST_HIRE_MIN_AREA}
                        ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
                        setTimeout(function () { 
                            showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                        text: "Xác nhận"
                                    },
                                    no: {
                                        text: "Hủy"
                                    }
                                },
                                okCallback: function () { 
                                    commonPostCreate();
                                }
                            })
                        }, 500)
                    } else {
                        commonPostCreate();
                    }
                }
            })
        } else if ( (propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA ) {
            // case đất nền/ đất nền dự án, sử dụng dt đất
            messageContentArea = `${NumberInputUtilArea.REQUEST_BUY_MIN_AREA}
            ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
            showPropzyConfirm({
                message: messageContentArea,
                btn: {
                    yes: {
                        text: "Xác nhận"
                    },
                    no: {
                        text: "Hủy"
                    }
                },
                okCallback: function () { 
                    commonPostCreate();
                }
            })
        }  else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA ) {
            // case nhà riêng ..
            messageContentArea = `${NumberInputUtilArea.REQUEST_BUY_MIN_AREA}
            ${NumberInputUtilArea.numberToStringArea('#minSize', true, true)}`;
            showPropzyConfirm({
                message: messageContentArea,
                btn: {
                    yes: {
                        text: "Xác nhận"
                    },
                    no: {
                        text: "Hủy"
                    }
                },
                okCallback: function () { 
                    commonPostCreate();
                }
            })
        } else {
            commonPostCreate();
        }
    });

    $("#btnCancel").on("click", function () {
        window.location = "/lead/detail/" + lead.leadId;
    });

    $("#addCustomerPhone").on("click", function () {
        ModalAddCustomerPhone.showModal({
            leadId: lead.leadId,
            dealId: null,
            customerId: $("#customerId").val(),
            type: "phone"
        });
    });
    $("#addCustomerEmail").on("click", function () {
        ModalAddCustomerPhone.showModal({
            leadId: lead.leadId,
            dealId: null,
            customerId: $("#customerId").val(),
            type: "email"
        });
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

    // init format size for area
    NumberInputUtil.initAutoFormatSize();

    // show price text vnd
    // $('#initialBudget').val() ? NumberInputUtil.numberToLabel("#initialBudget") : '';
    // $('#finalBudget').val() ? NumberInputUtil.numberToLabel("#finalBudget") : '';
    $('#initialBudgetFixed').val() ? NumberInputUtil.numberToLabel("#initialBudgetFixed") : '';
    // $('#initialBudget').on('keyup', function (event) {
    //     let name = $(this).attr('id')
    //     NumberInputUtil.numberToLabel("#" + name);
    // })
    // $('#finalBudget').on('keyup', function (event) {
    //     let name = $(this).attr('id')
    //     NumberInputUtil.numberToLabel("#" + name);
    // })
    $('#initialBudgetFixed').on('keyup', function (event) {
        let name = $(this).attr('id')
        NumberInputUtil.numberToLabel("#" + name);
    })

    // show area text 
    $('#minSize').val() ? NumberInputUtilArea.numberToLabelArea("#minSize", true, true) : '';
    $('#maxSize').val() ? NumberInputUtilArea.numberToLabelArea("#maxSize", true, true) : '';
  
    $('#minSize').on('keyup', function (event) {
        let name = $(this).attr('id')
        NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
    })
    $('#maxSize').on('keyup', function (event) {
        let name = $(this).attr('id')
        NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
    })

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

function commonPostCreate() {
    showPropzyLoading();
        $.ajax({
            url: "/lead/do-update",
            data: $("#formCreate").serialize(),
            type: "post"
        }).done(function (response) {
            if (response.result === false) {
                if (response.data && response.data.length > 0) {
                    $("#alertModal .message").html(response.message + ' (Mã KH :' + response.data[0].customerId + ')');
                } else {
                    $("#alertModal .message").html(response.message);
                }
                $("#alertModal").modal();
            } else {
                timer.submit({leadId: lead.leadId});
                if (isBroadcast) {
                    doBroadcast();
                } else {
                    showPropzyAlert(response.message);
                    window.location = "/lead/detail/"+lead.leadId;
                    //findListing();
                    //window.location.reload();
                }
            }
        }).always(function () {
            hidePropzyLoading();
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
        $("#btnFindListing").click();
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

function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
    $("#statusName").val($("#statusId").find('option:selected').text());
    $("#agentName").val($("#agentId").find('option:selected').text());
}
function validateForm() {

    var isValidated = true;
    $(".errors").text("");
    message = "Có lỗi xảy ra. Vui lòng kiểm tra dữ liệu của bạn.";
    var customerName = $("#customerName").val().trim();
    if (customerName === "") {
        isValidated = false;
        $("#customerName").parent().find(".errors").html("Nhập tên khách hàng!");
    }
    var districts = $("#districtIds").val();
    if (districts == null || districts.length <= 0) {
        isValidated = false;
        $(".district-errors").html("Chọn quận");
    }
    console.log(districts);

    if ($("#listingTypeId").val() === "") {
        isValidated = false;
        $("#listingTypeId").parent().find(".errors").html("Chọn hình thức giao dịch");
    }

    if ($("#propertyTypeId").val() === "") {
        isValidated = false;
        $("#propertyTypeId").parent().find(".errors").html("Chọn loại bất động sản");
    }

    var customerPhone = $("#customerPhone").val().trim();
    var customerEmail = $("#customerEmail").val().trim();
    if (customerPhone === "" && customerEmail === "")
    {
        isValidated = false;
        $("#customerPhone").parent().parent().find(".errors").html('Bạn phải nhập sđt hoặc email.');
    } else
    {
        if (customerPhone !== "" && !isPhoneNumber(customerPhone))
        {
            isValidated = false;
            $("#customerPhone").parent().parent().find(".errors").html('Bạn phải nhập chính xác sđt.');
        } else if (customerEmail !== "" && !isEmail(customerEmail))
        {
            isValidated = false;
            $("#customerEmail").parent().parent().find(".errors").html('Bạn phải nhập chính xác Email.');
        }
    }

    if ($("#sourceId").val() === "") {
        isValidated = false;
        $("#sourceId").parent().find(".errors").html('Chọn nguồn.');
    }

    if ($("#subjectId").val() === "") {
        isValidated = false;
        $("#subjectId").parent().find(".errors").html('Chọn đối tượng.');
    }
    if (!isValidated) {
        showPropzyAlert(message);
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


findCrms();



function generateDeal(successCallback) {
    prepareForm();
    if (validateForm()) {
        showPropzyLoading();
        $.ajax({
            url: "/lead/generate-deal",
            data: $("#formCreate").serialize(),
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
$(".btnReportMeetingToTm").on("click", function (event) {
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
