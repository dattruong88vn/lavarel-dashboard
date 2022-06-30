function ListingCreateInit() {
    var _this = this;

    _this.init = function () {
        $(document).ready(function () {
            initVAR();
            initGLOBALVAR();
            initDOM();
            bindEvents();
        });
    };

    function initVAR() {
        _this.listingCreate = new ListingCreate();
        /*_this.call = new Call();*/
        _this.saveButtonID = '#save-pre-btn';
        _this.sendSAButtonID = '#send-pre-btn';
        _this.cancelListingButtonID = '#cancel-pre-btn';
        _this.createReminderModalId = '#create-reminder-modal';
        _this.makeCallId = '#btn-phone-call';
        _this.phoneListModalId = '#phone-list-modal';
        _this.addNewStreetModalId = '#addNewStreetModal';
        _this.addNewStreetBtnId = '#add-new-street-btn';
        _this.addNewStreet = new AddNewStreet();
        _this.agentCreate = new AgentCreate({btnShowModal: '#btn-agent-create', sourceId: 1112});
    }

    function initGLOBALVAR() {
        Window.globalVar = {};
        Window.globalVar.photo = new PSPhoto();
        Window.globalVar.listingDetail = _this.listingCreate;

    }

    function initDOM() {
        Window.globalVar.photo.init();
        _this.listingCreate.init();
        _this.addNewStreet.init();

    }

    function bindEvents() {
        // init format area unit 
        NumberInputUtil.initAutoFormatSize();

        $('input, textarea, selecte').attr('autocomplete', 'off');

        Window.pre.reminder.saveModelBtn(function (e) {
            e.preventDefault();
            Window.pre.reminder.createReminder().done(function (response) {
                showPropzyAlert(response.message, 'Thông Báo', function () {
                    if (response.result) {
                        _this.listingCreate.data.statusId = $('#reminder-channel-status').val();
                        _this.listingCreate.resetDefault(1);
                    }
                });
            });
        });

        // price text vnd
        $('#price').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtil.numberToLabel("#" + name);
        })
        $('#minPrice').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtil.numberToLabel("#" + name);
        })

        // area text 
        // show price text vnd
        $('#price').val() ? NumberInputUtil.numberToLabel("#price") : '';
        $('#minPrice').val() ? NumberInputUtil.numberToLabel("#minPrice") : '';
        $('#price').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtil.numberToLabel("#" + name);
        })
        $('#minPrice').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtil.numberToLabel("#" + name);
        })

        // show area text 
        $('#lotSize').val() ? NumberInputUtilArea.numberToLabelArea("#lotSize", true, true) : '';
        $('#floorSize').val() ? NumberInputUtilArea.numberToLabelArea("#floorSize", true, true) : '';
        $('#sizeLength').val() ? NumberInputUtilArea.numberToLabelArea("#sizeLength", false, true) : '';
        $('#sizeWidth').val() ? NumberInputUtilArea.numberToLabelArea("#sizeWidth", false, true) : '';
        $('#lotSize').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
        })
        $('#floorSize').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
        })
        $('#sizeLength').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true);
        })
        $('#sizeWidth').on('keyup', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true);
        })
        $('#floorSize').on('change', function (e) {
            let areaUsed = parseFloat($(this).val().replace(/\,/g, ''));
            let areaLand = parseFloat($('#lotSize').val().replace(/\,/g, ''));
            if (areaUsed && areaLand && areaUsed < areaLand) {
                showPropzyConfirm({
                    message: 'Bạn có chắc diện tích sử dụng nhỏ hơn diện tích đất',
                    btn: {
                        yes: {
                            text: "Xác nhận"
                        },
                        no: {
                            text: "Đóng",
                            show: false
                        }
                    }
                })
            }
        })
        $('#lotSize').on('change', function (e) {
            let areaUsed = parseFloat($('#floorSize').val().replace(/\,/g, ''));
            let areaLand = parseFloat($(this).val().replace(/\,/g, ''));
            if (areaUsed && areaLand && areaUsed < areaLand) {
                showPropzyConfirm({
                    message: 'Bạn có chắc diện tích sử dụng nhỏ hơn diện tích đất',
                    btn: {
                        yes: {
                            text: "Xác nhận"
                        },
                        no: {
                            text: "Đóng",
                            show: false
                        }
                    }
                })
            }
        })

        $('body').off('click', '#save-pre-btn').on('click', '#save-pre-btn', function (e) {
            e.preventDefault();
            _this.listingCreate.check_require = 1;
            var isCalling = Window.preCall.isCalling;

            // if (!isCalling) {

                // check rule can not create listing if floorSize != width*length 
                let sizeLength = parseFloat($('#sizeLength').val().replace(/\,/g, ''));
                let sizeWidth = parseFloat($('#sizeWidth').val().replace(/\,/g, ''));
                let floorSize = parseFloat($('#floorSize').val().replace(/\,/g, ''));
                let lotSize = parseFloat($('#lotSize').val().replace(/\,/g, ''));

                let minPrice = $('#price').val().replace(/\,/g, '');
                let listingTypeId = $('#listingTypeId').val();
                let propertyTypeId = $('#propertyTypeId').val();
                //
                let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
                const checkByFormId = ListForm.filter(f => f.id == formId)[0];
                const useLotSize = checkByFormId ? checkByFormId.lotSize : false;
                const usePosition = checkByFormId ? checkByFormId.position : false;
                //
                let messageContent = '';
                let messageContentArea = '';
                if (listingTypeId == 1) {
                    messageContent = `${NumberInputUtil.LISTING_BUY_PRICE} ${NumberInputUtil.numberToText(minPrice)}`;
                } else if (listingTypeId == 2) {
                    messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE} ${NumberInputUtil.numberToText(minPrice)}`
                }

                if ($('#position').val() != '' && $('#position').val() == 2
                    && ((usePosition && listingTypeId == 1) || (usePosition && listingTypeId == 2))) {
                    let isEnoughData = false;
                    if (!($('#roadFrontageDistance').val() != "")) {
                        isEnoughData = true;
                    } else if (!($('#alleyId').val() != "") || !($('#alleyWidth').val() != "")) {
                        isEnoughData = true;
                    }
                    if (isEnoughData) {
                        showPropzyAlert("Vui lòng nhập đầy đủ thông tin hẻm.");
                        return false;
                    }
                }
                if ($('#position').val() != '' && $('#position').val() == 1
                    && ((usePosition && listingTypeId == 1) || (usePosition && listingTypeId == 2))) {
                    let isEnoughData = false;
                    if (!($('#roadFrontageWidth').val() != "")) {
                        isEnoughData = true;
                    }
                    if (isEnoughData) {
                        showPropzyAlert("Vui lòng nhập đầy đủ thông tin mặt tiền.");
                        return false;
                    }
                }
                if ($('input#virtualTouring').val().trim().length > 0 && !Window.JS_VIRTUAL_VALIDATE.isChecked) {
                    showPropzyAlert('Bạn cần Xem thử Link virtual tour trước khi thực hiện thao tác này !');
                    return false;
                }
                if (minPrice && minPrice < NumberInputUtil.ONE_BILLION && listingTypeId == 1) {
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
                            if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case đất nền/ đất nền dự án, sử dụng dt đất
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                                    if (response.result) {
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nhà riêng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                                    if (response.result) {
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                _this.listingCreate.insertListing(function (response) {
                                    showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                        if (response.result) {
                                            location.reload();
                                        }
                                    });
                                });
                            }
                        }
                    })
                } else if (minPrice && minPrice > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2) {
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
                            if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case đất nền/ đất nền dự án, sử dụng dt đất
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                                    if (response.result) {
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nhà riêng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                                    if (response.result) {
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                _this.listingCreate.insertListing(function (response) {
                                    showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                        if (response.result) {
                                            location.reload();
                                        }
                                    });
                                });
                            }
                        }
                    })
                } else if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                    // case đất nền/ đất nền dự án, sử dụng dt đất
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                            _this.listingCreate.insertListing(function (response) {
                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                    if (response.result) {
                                        location.reload();
                                    }
                                });
                            });
                        }
                    })
                } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                    // case nhà riêng ..
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                            _this.listingCreate.insertListing(function (response) {
                                showPropzyAlert(response.message, 'Thông Báo', function (e) {
                                    if (response.result) {
                                        location.reload();
                                    }
                                });
                            });
                        }
                    })
                } else {
                    _this.listingCreate.insertListing(function (response) {
                        showPropzyAlert(response.message, 'Thông Báo', function (e) {
                            if (response.result) {
                                location.reload();
                            }
                        });
                    });
                }
                // }

            // } else {
            //     showPropzyAlert(POS_MESSAGE.get('IS_CALLING'));
            // }
        });

        $(_this.createReminderModalId).off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
            e.preventDefault();
            location.reload();
        });

        $('body').off('click', '#save-remind-pre-btn').on('click', '#save-remind-pre-btn', function (e) {
            e.preventDefault();
            _this.listingCreate.check_require = 1;
            var isCalling = Window.preCall.isCalling;

            // if (!isCalling) {

                // check rule can not create listing if floorSize != width*length 
                let sizeLength = parseFloat($('#sizeLength').val().replace(/\,/g, ''));
                let sizeWidth = parseFloat($('#sizeWidth').val().replace(/\,/g, ''));
                let floorSize = parseFloat($('#floorSize').val().replace(/\,/g, ''));
                let lotSize = parseFloat($('#lotSize').val().replace(/\,/g, ''));

                // if ( ($('#propertyTypeId').val() == 1 || $('#propertyTypeId').val() == 8) 
                // && (sizeLength * sizeWidth).toFixed(2) != floorSize.toFixed(2) && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
                //     // case chung cu/ can ho 
                //     showPropzyAlert('Chiều dài * chiều rộng khác diện tích sử dụng')
                // } else if ( $('#propertyTypeId').val() != 1 && $('#propertyTypeId').val() != 8 
                // && (sizeLength * sizeWidth).toFixed(2) != lotSize.toFixed(2) && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
                //     // case nhà riêng ..
                //     showPropzyAlert('Chiều dài * chiều rộng khác diện tích đất')
                // } else {
                let minPrice = $('#price').val().replace(/\,/g, '');
                let listingTypeId = $('#listingTypeId').val();
                let propertyTypeId = $('#propertyTypeId').val();
                //TODO: Check Logic
                const formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
                const checkByFormId = ListForm.filter(f => f.id == formId)[0];
                const useLotSize = checkByFormId ? checkByFormId.lotSize : false;
                //
                let messageContent = '';
                let messageContentArea = '';
                if (listingTypeId == 1) {
                    messageContent = `${NumberInputUtil.LISTING_BUY_PRICE} ${NumberInputUtil.numberToText(minPrice)}`;
                } else if (listingTypeId == 2) {
                    messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE} ${NumberInputUtil.numberToText(minPrice)}`
                }

                if ($('input#virtualTouring').val().trim().length > 0 && !Window.JS_VIRTUAL_VALIDATE.isChecked) {
                    showPropzyAlert('Bạn cần Xem thử Link virtual tour trước khi thực hiện thao tác này !');
                    return false;
                }
                if (minPrice && minPrice < NumberInputUtil.ONE_BILLION && listingTypeId == 1) {
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
                            if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case đất nền/ đất nền dự án, sử dụng dt đất
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                if (response.result) {
                                                    Window.jsDetailData.id = response.data.id;
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nhà riêng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                if (response.result) {
                                                    Window.jsDetailData.id = response.data.id;
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                _this.listingCreate.insertListing(function (response) {
                                    if (response.result) {
                                        Window.jsDetailData.id = response.data.id;
                                        $(_this.createReminderModalId).modal();
                                    } else {
                                        showPropzyAlert(response.message);
                                    }
                                });
                            }
                        }
                    })
                } else if (minPrice && minPrice > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2) {
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
                            if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case đất nền/ đất nền dự án, sử dụng dt đất
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                if (response.result) {
                                                    Window.jsDetailData.id = response.data.id;
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nhà riêng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                                            _this.listingCreate.insertListing(function (response) {
                                                if (response.result) {
                                                    Window.jsDetailData.id = response.data.id;
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                _this.listingCreate.insertListing(function (response) {
                                    if (response.result) {
                                        Window.jsDetailData.id = response.data.id;
                                        $(_this.createReminderModalId).modal();
                                    } else {
                                        showPropzyAlert(response.message);
                                    }
                                });
                            }
                        }
                    })
                } else if ((useLotSize) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                    // case đất nền/ đất nền dự án, sử dụng dt đất
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
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
                            _this.listingCreate.insertListing(function (response) {
                                if (response.result) {
                                    Window.jsDetailData.id = response.data.id;
                                    $(_this.createReminderModalId).modal();
                                } else {
                                    showPropzyAlert(response.message);
                                }
                            });
                        }
                    })
                } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                    // case nhà riêng ..
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
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
                            _this.listingCreate.insertListing(function (response) {
                                if (response.result) {
                                    Window.jsDetailData.id = response.data.id;
                                    $(_this.createReminderModalId).modal();
                                } else {
                                    showPropzyAlert(response.message);
                                }
                            });
                        }
                    })
                } else {
                    _this.listingCreate.insertListing(function (response) {
                        if (response.result) {
                            Window.jsDetailData.id = response.data.id;
                            $(_this.createReminderModalId).modal();
                        } else {
                            showPropzyAlert(response.message);
                        }
                    });
                }
                // }

            // } else {
            //     showPropzyAlert(POS_MESSAGE.get('IS_CALLING'));
            // }
        });

        $('body').off('click', _this.sendSAButtonID).on('click', _this.sendSAButtonID, function (e) {
            e.preventDefault();
            var isCalling = /*_this.call.isCalling;*/ Window.preCall.isCalling;
            // if (!isCalling) {
                _this.listingCreate.check_require = 2;
                _this.listingCreate.sendSA(function (response) {
                    if (response.result) {
                        showPropzyAlert('Đã chuyển sang SA thành công', 'Thông Báo', function (e) {
                            _this.listingCreate.resetDefault(1);
                        });
                    } else {
                        showPropzyAlert(response.message, 'Thông Báo');
                    }
                })
            // } else {
            //     showPropzyAlert(POS_MESSAGE.get('IS_CALLING'));
            // }

        });

        $('body').off('click', _this.cancelListingButtonID).on('click', _this.cancelListingButtonID, function (e) {
            e.preventDefault();
            //
            ModalConfirm.showModal({
                message: "Bạn có muốn xóa hết thông tin hay không ?",
                onYes: function (modal) {
                    _this.listingCreate.resetDefault(1);
                },
            });
        });



        $('body').off('click', '#wardId').on('click', '#wardId', function (e) {
            e.preventDefault();
            _this.addNewStreet.wardId = parseInt($('#wardId').val());
            loadStreet();
        });

        $('body').off('change', '#streetId').on('change', '#streetId', function (e) {
            e.preventDefault();
            _this.addNewStreet.wardId = parseInt($('#wardId').val());
            updateRoadFrontageWidth();
        });


        $('body').off('change', '#position').on('change', '#position', function (e) {
            updateRoadFrontageWidth();
        });

        $('body').off('change', _this.addNewStreetBtnId).on('click', _this.addNewStreetBtnId, function (e) {
            e.preventDefault();
            _this.addNewStreet.wardId = parseInt($('#wardId').val());
            _this.addNewStreet.addNewStreetModalId = _this.addNewStreetModalId;
            _this.addNewStreet.callback = function (response) {
                $(_this.addNewStreetModalId).modal('hide');
                showPropzyAlert(response.message);
                if (response.result) {
                    loadStreet();
                }
            };
            _this.addNewStreet.showModal();
        });
        $(document).on('click', "#btn-agent-send-app", function (e) {
            e.preventDefault();
            _this.listingCreate.agentSendApp();
        });
    }

    function loadStreet() {
        Listing.getStreetList(_this.addNewStreet.wardId).done(function (response) {
            if (response.result) {
                var html = '<option value="">-- Chọn Đường --</option>';
                for (var i in response.data) {
                    html += '<option value="' + response.data[i].streetId + '" data-width-value="' + response.data[i].widthValue + '">' + response.data[i].streetName + '</option>';
                }
                $('#streetId').html('');
                $('#streetId').html(html);
            }
        });
    }

    function updateRoadFrontageWidth() {
        var roadFrontageWidth = null;
        if (parseInt($('#position').val()) == 1) {
            roadFrontageWidth = $('#streetId').find('option:selected').data('width-value');
        }
        $('#roadFrontageWidth').val(roadFrontageWidth);
        if (hasValue(Window.jsDetailData.position)) {
            Window.jsDetailData.position.roadFrontageWidth = roadFrontageWidth;
        }
    }
}

$(document).ready(function () {
    (new ListingCreateInit()).init();
});