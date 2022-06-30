var level = 2;
var firstRun = true;
var flagTypeCreate = 'customer';
var checkAgentExistByPhone = function (phone) {
    showPropzyLoading();
    $.ajax({
        url: '/agent/get-existing-agent',
        data: JSON.stringify({
            phoneOrEmail: phone
        }),
        type: 'post'
    }).done(function (response) {
        if (response.data.length == 1) {
            propzyNotifyAlert({message: "Số điện thoại này là môi giới !!"})
            $('a[data-type-create="agent"]').trigger('click');
            select2_search($('#agentId'), phone);
            // $('#agentId').val(response.data[0].agentId).trigger('change');
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

var checkPhone = function (config) {

    var modalCheckCustomerResult = $("#modalCheckCustomerResult");
    var customerPhone = $("#customerPhone").val().trim();
    if (customerPhone === "") {
        showPropzyAlert("Chưa nhập số điện thoại!");
        return false;
    }
    showPropzyLoading();
    if (config.nextNeed) //bỏ qua check nhu cầu trước đó
    {
        if (config && config.notFound) {
            config.notFound(modalCheckCustomerResult, customerPhone);
        }
    } else {
        $.ajax({
            'url': '/request/check-phone/' + customerPhone,
            'type': 'get'
        }).done(function (response) {
            modalCheckCustomerResult.find(".main-content").html(response);
            var totalResult = parseInt(modalCheckCustomerResult.find(".hidden-total-result").val());
            modalCheckCustomerResult.find(".total-check-result").html(totalResult);
            try {
                if (totalResult <= 0) {
                    if (config && config.notFound) {
                        config.notFound(modalCheckCustomerResult, customerPhone);
                    }
                } else {

                    if (config && config.found) {
                        config.found(modalCheckCustomerResult);
                    } else {
                        modalCheckCustomerResult.modal();
                    }
                }
            } catch (ex) {}
        }).always(function () {
            hidePropzyLoading();
        });
    }

};

var btnMatchLeadDealFunc = function (element) {
    showPropzyLoading();
    $('#modal-deal-of-agent').modal('hide');
    var validateFormCreate = $("#formCreate").validate(DealFunctions.validateOptions);
    prepareForm();
    if (!validateFormCreate.form()) {
        showPropzyAlert("Phải nhập đầy đủ thông tin nhu cầu mới được match.");
        hidePropzyLoading();
        return false;
    }
    $("#ajax-loading").show();
    for (var i in CKEDITOR.instances) {
        CKEDITOR.instances[i].updateElement();
    };

    let slugPlus = '';
    let leadId = $('#modal-deal-of-agent').find('.radio_match_request:checked').val();
    if ($(element).data('isagent')) {
        slugPlus += `&isAgent=1&leadId=${leadId}`;
    }
    $.ajax({
        url: "/request/match-request",
        data: $("#formCreate").serialize() + slugPlus,
        type: "post"
    }).done(function (response) {
        hidePropzyLoading();
        showPropzyAlert(response.message);
        if (response.result === true) {
            if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
                window.location = '/pos/sa';
            } else {
                window.location = '/request';
            }
        }
    }).always(function () {
        // $("#ajax-loading").hide();
    });
}

var createLeadFunc = function (element) {
    var validateFormCreate = $("#formCreate").validate(DealFunctions.validateOptions);
    let slugPlus = '';
    let flagAgentSeftBuy = false;
    if ($(element).data('createtype')) { // click create "cho chinh minh"
        let typeBuy = $('#modal-deal-of-agent').find('.selftBuyRadio:checked').val();
        if (typeBuy == 2) {
            $("#formCreate").removeData('validator')
            validateFormCreate = $("#formCreate").validate(CreateLogicAgent.validateOptions); //bỏ validate khách hàng
            slugPlus += '&isAgent=1&isBuyForCustomer=0';
            flagAgentSeftBuy = true;
        } else {
            $("#formCreate").removeData('validator')
            validateFormCreate = $("#formCreate").validate(DealFunctions.validateOptions);
            slugPlus += '&isAgent=1&isBuyForCustomer=1';
            flagAgentSeftBuy = false;
        }
        $('#modal-deal-of-agent').modal('hide');
    } else { // case tab agent
        if (flagTypeCreate == 'agent') {
            let agentId = $('#agentId').val();
            let customerPhone = $('#customerPhone').val();
            let propertyTypeId = $('#propertyTypeId').val();
            let listingTypeId = $('#listingTypeId').val();
            if (agentId != '') {
                let dataPost = {
                    propertyTypeId: propertyTypeId == '' ? null : parseInt(propertyTypeId),
                    customerPhone: customerPhone == '' ? null : customerPhone,
                    listingTypeId: listingTypeId == '' ? null : parseInt(listingTypeId),
                }
                $('#modal-deal-of-agent').modal('show');
                $.ajax({
                    url: `/agent/render-deals-of-agent-modal/${agentId}`,
                    data: JSON.stringify(dataPost),
                    type: "post"
                }).done(function (response) {
                    $('#modal-deal-of-agent .modal-body-content').html(response.html);
                    $('#modal-deal-of-agent').find('.btnMatchLeadDeal').prop('disabled', true);
                }).always(function () {
                    $("#ajax-loading").hide();
                });

            } else {
                showPropzyAlert("Vui lòng nhập thông tin môi giới");
                $("#ajax-loading").hide();
            }
            return false;
        }
    }
    if (!DealFunctions.validCampaign()) {
        return DealFunctions.validCampaign();
    }
    prepareForm();
    if (!validateFormCreate.form()) {
        showPropzyAlert("Vui lòng kiểm tra lại thông tin.");
        return false;
    }
    if ($('#sourceTCId').is(':visible')) {
        if ($('#sourceTCId').val() == '') {
            $('#sourceTCId').css('border', '1px solid red');
            $('html, body').animate({
                scrollTop: $('#sourceTCId').offset().top
            }, 2000);
            return false;
        }
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
                if ((propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA) {
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
                                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                            }
                        })
                    }, 500)
                } else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
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
                                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                            }
                        })
                    }, 500)
                } else {
                    commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                }
            }
        })
    } else if (finalBudget && finalBudget > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2) {
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
                if ((propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA) {
                    // case đất nền/ đất nền dự án
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
                                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                            }
                        })
                    }, 500)
                } else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
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
                                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                            }
                        })
                    }, 500)
                } else {
                    commonPostCreate(flagAgentSeftBuy, slugPlus, element);
                }
            }
        })
    } else if ((propertyTypeId == 13 || propertyTypeId == 14) && minSize < NumberInputUtilArea.TEN_METER_AREA) {
        // case đất nền/ đất nền dự án
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
                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
            }
        })
    } else if (minSize && minSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
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
                commonPostCreate(flagAgentSeftBuy, slugPlus, element);
            }
        })
    } else {
        commonPostCreate(flagAgentSeftBuy, slugPlus, element);
    }
}

function commonPostCreate(flagAgentSeftBuy, slugPlus, element) {
    if (!flagAgentSeftBuy) {
        $("#createLead").addClass("disabled");
        var nextNeed = false;
        if ($(element).data('createtype')) {
            nextNeed = true;
        }
        checkPhone({
            nextNeed: nextNeed,
            notFound: function (modalCheckCustomerResult, customerPhone) {
                showPropzyLoading();
                for (var i in CKEDITOR.instances) {
                    CKEDITOR.instances[i].updateElement();
                };
                $.ajax({
                    url: "/request/create-lead",
                    data: $("#formCreate").serialize() + slugPlus,
                    // .find("input[type='hidden'], :input:not(:hidden)")
                    type: "post"
                }).done(function (response) {
                    if (response.result === true) {
                        $("#createLead").hide();
                        if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
                            window.location = '/pos/sa';
                        } else {
                            window.location = '/request';
                        }
                    } else {
                        var message = response.message;
                        if (response.data !== null && response.data.length > 0) {
                            message = response.message + ' (Mã KH :' + response.data[0].customerId + ')';
                        }
                        showPropzyAlert(message);
                    }
                }).always(function () {
                    hidePropzyLoading();
                });
            }

        });
    } else { // case create khi agent mua cho chính mình không cần validate khách hàng
        $("#ajax-loading").show();
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].updateElement();
        };
        $.ajax({
            url: "/request/create-lead",
            data: $("#formCreate").serialize() + slugPlus,
            // .find("input[type='hidden'], :input:not(:hidden)")
            type: "post"
        }).done(function (response) {
            if (response.result === true) {
                if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
                    window.location = '/pos/sa';
                } else {
                    window.location = '/request';
                }
            } else {
                var message = response.message;
                if (response.data !== null && response.data.length > 0) {
                    message = response.message + ' (Mã KH :' + response.data[0].customerId + ')';
                }
                showPropzyAlert(message);
            }
        }).always(function () {
            $("#ajax-loading").hide();
        });
    }
}

$(document).ready(function () {
    // init format size area
    NumberInputUtil.initAutoFormatSize();

    // init
    Window.agentCreate = new AgentCreate({
        btnShowModal: '#btn-agent-create',
        sourceId: 1102,
        created: function (resp) {
            select2_search($('#agentId'), resp.phone);
        }
    })
    $('#agent-form-more').hide();
    // set active tab
    $("#formCreate .nav a").on("click", function () {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
        if ($(this).data('typeCreate') == 'agent') {
            $('#agent-form-more').show();
            flagTypeCreate = 'agent';
            // select2 dropdown agentid
            $("#agentId").select2({
                ajax: {
                    delay: 1000,
                    url: '/agent/list-short-info',
                    data: function (params) {
                        var query = {
                            searchKeywords: params.term,
                            getType: 'all'
                        }
                        // Query parameters will be ?search=[term]&type=public
                        return query;
                    },
                    processResults: function (data, params) {
                        let agents = data.data.list;
                        let results = [];
                        if (data.data.totalItems == 0) {
                            results.push({
                                id: -99,
                                text: 'Tạo mới agent với thông tin này'
                            });
                        } else {
                            $.each(agents, function (index, agent) {
                                results.push({
                                    id: agent.agentId,
                                    text: `${agent.name}-${agent.phone}-${agent.email}`
                                })
                            })
                        }
                        return {
                            results: results,
                        };
                    },
                    cache: true
                },
                placeholder: 'Số điện thoại hoặc email môi giới',
                minimumInputLength: 10,
            });
        } else {
            $('#agent-form-more').hide();
            flagTypeCreate = 'customer';
            let phone = $('#customerPhone').val();
            if (phone.length >= 10) {
                checkAgentExistByPhone(phone);
            }
        }
    });

    $('#customerPhone').on('change', function () {
        var phone = $(this).val();
        if (phone.length >= 10 && flagTypeCreate == 'customer') {
            checkAgentExistByPhone(phone);
        }
    })
    // $('#agentId').on('change', function () {
    //     if ($(this).val() == -99) {
    //         $('#btn-agent-create').trigger('click');
    //         $("#agentId").val("");
    //         $("#agentId").trigger('change');
    //     }
    // })
    // // autocomplete phone check agent $("#agentId")
    // // var options = {
    // // 	data: ["blue", "green", "pink", "red", "yellow"]
    // // };// url: '/agent/get-existing-agent', data: JSON.stringify({phoneOrEmail:phone}),
    // var options = {
    //     url: function (phoneOrEmail) {
    //         return "/agent/get-existing-agent?autocomplete=1";
    //     },
    //     getValue: function (element) {
    //         return element.phone;
    //     },
    //     ajaxSettings: {
    //         dataType: "json",
    //         method: "POST",
    //         data: {}
    //     },
    //     preparePostData: function (data) {
    //         data.phoneOrEmail = $("#customerPhone").val();
    //         return data;
    //     },

    //     requestDelay: 400
    // };

    // $("#customerPhone").easyAutocomplete(options);

    // // Fixing markup
    // $('.easy-autocomplete').closest('.input-group').each(function (i, inputGroup) {
    //     $(inputGroup).removeClass('input-group');
    //     $autocomplete = $(inputGroup).find('.easy-autocomplete');
    //     $(inputGroup).find('.input-group-addon').prependTo($autocomplete);
    //     $autocomplete.addClass('input-group');
    // });

    // $.ajaxSetup({
    //     headers: {
    //         'X-CSRF-TOKEN': $('#csrf-token').val()
    //     }
    // });
    // CKEDITOR.replace('note');

    // DealFunctions.initCoreForm();

    // $("#btnCancel").on("click", function (event) {
    //     event.preventDefault();
    //     if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
    //         window.location = '/pos/sa';
    //     } else {
    //         window.location = '/request';
    //     }
    // });

    // $(".createLead").on("click", function (event) {
    //     event.preventDefault();
    //     createLeadFunc(this);
    // });

    // $("#checkphone").on("click", function () {
    //     if (flagTypeCreate == 'customer') {
    //         // checkAgentExistByPhone(customerPhone);
    //         // return false;
    //         checkPhone({
    //             notFound: function (modalCheckCustomerResult, customerPhone) {
    //                 window.open("https://www.google.com.vn/?gws_rd=ssl#q=" + customerPhone);
    //                 modalCheckCustomerResult.modal('hide');
    //             }

    //         });
    //     } else {
    //         return false;
    //     }
    // });

    // $(".btnMatchLeadDeal").on("click", function (event) {
    //     event.preventDefault();
    //     btnMatchLeadDealFunc(this);
    // });

    // $("#checkEmail").on("click", function () {
    //     var customerEmail = $("#customerEmail").val().trim();
    //     if (customerEmail === "") {
    //         showPropzyAlert("Chưa nhập email!");
    //         return false;
    //     }
    //     showPropzyLoading();
    //     $.ajax({
    //         'url': '/request/check-email/' + customerEmail,
    //         'type': 'get'
    //     }).done(function (response) {
    //         showPropzyAlert(response);
    //         try {
    //             if (closeModel) {
    //                 closePropzyAlert();
    //                 closeModel = false;
    //             }
    //         } catch (err) {}
    //     }).always(function () {
    //         hidePropzyLoading();
    //     });
    // });
    // $(".chon_tu_trach").on("click", function () {
    //     var tuTrachType = $(this).val();
    //     getTuTrachCheckBoxs(tuTrachType, $(this).prop('checked'));
    // });


    // $("#saveAndUpdate").on("click", function (event) {
    //     event.preventDefault();
    //     if ($("#statusId").val() === '1') {
    //         showPropzyAlert("Không thể lưu request với status: " + $("#statusId option:selected").text() + "! ");
    //         return;
    //     }
    //     prepareForm();
    //     if (validateForm()) {
    //         $("#modalMissingInfo").modal();
    //     }
    // });
    // $("#saveAndUpdate_step_2").on("click", function (event) {
    //     event.preventDefault();
    //     if (isBlank($('#areaMissingInfo').val())) {
    //         $("#alertModal .message").html('Nhập giá trị "Thông tin bị thiếu"');
    //         $("#alertModal").modal();
    //         return;
    //     }

    //     showPropzyLoading();
    //     $('<input />').attr('type', 'hidden')
    //         .attr('name', "missingInfo")
    //         .attr('value', $('#areaMissingInfo').val())
    //         .appendTo('#formCreate');
    //     $.ajax({
    //         url: "/request/insert",
    //         data: $("#formCreate").serialize(),
    //         type: "post"
    //     }).done(function (response) {
    //         var message = response.message;
    //         if (response.result === true) {
    //             if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
    //                 window.location = '/pos/sa';
    //             } else {
    //                 window.location = '/request';
    //             }
    //         } else {
    //             if (response.data !== null && response.data.length > 0) {
    //                 message = response.message + ' (Mã KH :' + response.data[0].customerId + ')';
    //             }
    //         }
    //         $("#modalMissingInfo").modal('hide');
    //         showPropzyAlert(message);
    //     }).always(function () {
    //         hidePropzyLoading();
    //     });
    // });

    // // price text vnd
    // $('#initialBudget').on('keyup', function (event) {
    //     let name = $(this).attr('id')
    //     NumberInputUtil.numberToLabel("#" + name);
    // })
    $('#agentId').on('change', function () {
        if ($(this).val() == -99) {
            $('#btn-agent-create').trigger('click');
            $("#agentId").val("");
            $("#agentId").trigger('change');
        }
    })
    // autocomplete phone check agent $("#agentId")
    // var options = {
    // 	data: ["blue", "green", "pink", "red", "yellow"]
    // };// url: '/agent/get-existing-agent', data: JSON.stringify({phoneOrEmail:phone}),
    var options = {
        url: function (phoneOrEmail) {
            return "/agent/get-existing-agent?autocomplete=1";
        },
        getValue: function (element) {
            return element.phone;
        },
        ajaxSettings: {
            dataType: "json",
            method: "POST",
            data: {}
        },
        preparePostData: function (data) {
            data.phoneOrEmail = $("#customerPhone").val();
            return data;
        },

        requestDelay: 400
    };

    $("#customerPhone").easyAutocomplete(options);

    // Fixing markup
    $('.easy-autocomplete').closest('.input-group').each(function (i, inputGroup) {
        $(inputGroup).removeClass('input-group');
        $autocomplete = $(inputGroup).find('.easy-autocomplete');
        $(inputGroup).find('.input-group-addon').prependTo($autocomplete);
        $autocomplete.addClass('input-group');
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    CKEDITOR.replace('note');

    DealFunctions.initCoreForm();

    $("#btnCancel").on("click", function (event) {
        event.preventDefault();
        if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
            window.location = '/pos/sa';
        } else {
            window.location = '/request';
        }
    });

    $(".createLead").on("click", function (event) {
        event.preventDefault();
        createLeadFunc(this);
    });

    $("#checkphone").on("click", function () {
        if (flagTypeCreate == 'customer') {
            // checkAgentExistByPhone(customerPhone);
            // return false;
            checkPhone({
                notFound: function (modalCheckCustomerResult, customerPhone) {
                    window.open("https://www.google.com.vn/?gws_rd=ssl#q=" + customerPhone);
                    modalCheckCustomerResult.modal('hide');
                }

            });
        } else {
            return false;
        }
    });

    $(".btnMatchLeadDeal").on("click", function (event) {
        event.preventDefault();
        btnMatchLeadDealFunc(this);
    });

    $("#checkEmail").on("click", function () {
        var customerEmail = $("#customerEmail").val().trim();
        if (customerEmail === "") {
            showPropzyAlert("Chưa nhập email!");
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/request/check-email/' + customerEmail,
            'type': 'get'
        }).done(function (response) {
            showPropzyAlert(response);
            try {
                if (closeModel) {
                    closePropzyAlert();
                    closeModel = false;
                }
            } catch (err) {}
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $(".chon_tu_trach").on("click", function () {
        var tuTrachType = $(this).val();
        getTuTrachCheckBoxs(tuTrachType, $(this).prop('checked'));
    });


    $("#saveAndUpdate").on("click", function (event) {
        event.preventDefault();
        if ($("#statusId").val() === '1') {
            showPropzyAlert("Không thể lưu request với status: " + $("#statusId option:selected").text() + "! ");
            return;
        }
        prepareForm();
        if (validateForm()) {
            $("#modalMissingInfo").modal();
        }
    });
    $("#saveAndUpdate_step_2").on("click", function (event) {
        event.preventDefault();
        if (isBlank($('#areaMissingInfo').val())) {
            $("#alertModal .message").html('Nhập giá trị "Thông tin bị thiếu"');
            $("#alertModal").modal();
            return;
        }

        showPropzyLoading();
        $('<input />').attr('type', 'hidden')
            .attr('name', "missingInfo")
            .attr('value', $('#areaMissingInfo').val())
            .appendTo('#formCreate');
        $.ajax({
            url: "/request/insert",
            data: $("#formCreate").serialize(),
            type: "post"
        }).done(function (response) {
            var message = response.message;
            if (response.result === true) {
                if (currentUser.departments[0].departmentId == 14 || currentUser.departments[0].departmentId == 17) {
                    window.location = '/pos/sa';
                } else {
                    window.location = '/request';
                }
            } else {
                if (response.data !== null && response.data.length > 0) {
                    message = response.message + ' (Mã KH :' + response.data[0].customerId + ')';
                }
            }
            $("#modalMissingInfo").modal('hide');
            showPropzyAlert(message);
        }).always(function () {
            hidePropzyLoading();
        });
    });

    // price text vnd
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

function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
}
