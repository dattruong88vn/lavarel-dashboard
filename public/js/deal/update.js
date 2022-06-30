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


    $("#addCustomerPhone").on("click", function () {
        ModalAddCustomerPhone.showModal({
            leadId: null,
            dealId: deal.dealId,
            customerId: $("#customerId").val(),
            type: "phone"
        });
    });
    $("#addCustomerEmail").on("click", function () {
        ModalAddCustomerPhone.showModal({
            leadId: null,
            dealId: deal.dealId,
            customerId: $("#customerId").val(),
            type: "email"
        });
    });

    findCrms();
    var timer = new SendTimerCounter({key:`deal-${deal.dealId}`, timeDoAction: deal.timeInactive});
    timer.init();
    // check close, reload browser
    var _BrowserCloseAction = new BrowserCloseAction(
        `deal-${deal.dealId}`,
        function(){
            if(deal.statusId != 27 && deal.progressQuoId != 3 && deal.progressQuoId != 4 ){
                timer.submit({dealId: deal.dealId});
            }
        },
        function(){
            if(deal.statusId != 27 && deal.progressQuoId != 3 && deal.progressQuoId != 4 ){
                timer.submit({dealId: deal.dealId});
            }
        }
    );
    _BrowserCloseAction.init();
    
    $("#btnSaveDeal").on("click", function (event) {
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

        if ( finalBudget < NumberInputUtil.ONE_BILLION && listingTypeId == 1 ) {
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
                    }  else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA ) {
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

function commonPostCreate () {
    showPropzyLoading();
    $.ajax({
        url: "/deal/do-update",
        data: $("#formCreate").serializeIncludeDisabled(),
        type: "post"
    }).done(function (response) {
        if (response.result) {
            showPropzyAlert(response.message);
            timer.submit({dealId: deal.dealId});
            window.location = "/deal/detail/"+deal.dealId;
        } else {
            if (response.data && response.data.length > 0) {
                showPropzyAlert(response.message + ' (Mã KH :' + response.data[0].customerId + ')');
            } else {
                showPropzyAlert(response.message);
            }
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
    $("#statusName").val($("#statusId").find('option:selected').text());
    $("#agentName").val($("#agentId").find('option:selected').text());
}