function ListingDetailJS() {
    var _this = this;

    _this.init = function () {
        initVAR();
        initGLOBALVAR();
        initDOM();
        bindEvents();
    };

    function initVAR() {
        let config = {
            timeDoAction: (Window.jsDetailData.timeInactive) * 60,
            key: `ass-${Window.jsDetailData.id}`
        };
        _this.timer = new TimerCountDown(config);
        _this.listingDetail = new ListingDetail();
        _this.cancelListing = new CancelListing();
        // _this.call = new Call();
        _this.saveButtonID = '#save-pre-btn';
        _this.sendSAButtonID = '#send-pre-btn';
        _this.cancelListingButtonID = '#cancel-pre-btn';
        _this.createReminderModalId = '#create-reminder-modal';
        _this.cancelListingModalId = '#cancel-listing-modal';
        _this.makeCallId = '#make-call-list';
        _this.phoneListModalId = '#phone-list-modal';
        _this.sendDiyId = '#send-diy-btn';
        _this.addNewStreetModalId = '#addNewStreetModal';
        _this.addNewStreetBtnId = '#add-new-street-btn';
        _this.addNewStreet = new AddNewStreet();
        _this.agentCreate = new AgentCreate({btnShowModal: '#btn-agent-create', sourceId: 1112});
    }

    function initGLOBALVAR() {
        Window.globalVar = {};
        Window.globalVar.listingDetail = _this.listingDetail;
        // Window.globalVar.reminder = Window.pre.reminder;
        Window.globalVar.cancelListing = _this.cancelListing;
        // Window.globalVar.call = _this.call;
        Window.globalVar.photo = new PSPhoto();
    }

    function initDOM() {
        _this.listingDetail.init();
        _this.timer.init();

        function initDatePicker() {
            $('.date-picker').datepicker({
                autoClose: true,
                format: 'dd/mm/yyyy',
                language: 'vn'
            });
        }

        //load class browser
        var _BrowserCloseAction = new BrowserCloseAction(
            `ass-${Window.jsDetailData.id}`,
            function () {
                console.log("reload");
                // ki???m tra listing n??y h???y hay ko h???y, n???u kh??c h???y th?? count, c??n h???y th?? ko count
                if (Window.jsDetailData.statusCode != 'cancel') {
                    bindCounter();
                }
            },
            function () {
                console.log("close");
                // ki???m tra listing n??y h???y hay ko h???y, n???u kh??c h???y th?? count, c??n h???y th?? ko count
                if (Window.jsDetailData.statusCode != 'cancel') {
                    bindCounter();
                }
            }
        );
        _BrowserCloseAction.init();
        //_this.cancelListing.init();
        // _this.call.init();
        _this.addNewStreet.init();

        Window.globalVar.photo.init();

        initDatePicker();
    }

    function bindEvents() {
        // init format-area unit 
        NumberInputUtil.initAutoFormatSize();

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
        $('#lotSize').on('keyup click', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
        })
        $('#floorSize').on('keyup click', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true);
        })
        $('#sizeLength').on('keyup click', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true);
        })
        $('#sizeWidth').on('keyup click', function (event) {
            let name = $(this).attr('id')
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true);
        })
        $('#floorSize').on('change', function (e) {
            let areaUsed = parseFloat($(this).val().replace(/\,/g, ''));
            let areaLand = parseFloat($('#lotSize').val().replace(/\,/g, ''));
            if (areaUsed && areaLand && areaUsed < areaLand) {
                showPropzyConfirm({
                    message: 'B???n c?? ch???c di???n t??ch s??? d???ng nh??? h??n di???n t??ch ?????t',
                    btn: {
                        yes: {
                            text: "X??c nh???n"
                        },
                        no: {
                            text: "????ng",
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
                    message: 'B???n c?? ch???c di???n t??ch s??? d???ng nh??? h??n di???n t??ch ?????t',
                    btn: {
                        yes: {
                            text: "X??c nh???n"
                        },
                        no: {
                            text: "????ng",
                            show: false
                        }
                    }
                })
            }
        })

        // action "h???y ????ng tin" trong popup H???y
        $('body').off('click', _this.cancelListing.doms.btnCancelListing).on('click', _this.cancelListing.doms.btnCancelListing, function (e) {
            e.preventDefault();
            _this.cancelListing.cancelListingFunction((data) => {
                _this.listingDetail.data.statusId = data.statusId;
                _this.listingDetail.data.reasonContent = data.note;
                _this.listingDetail.data.contractFrom = data.contractFrom;
                _this.listingDetail.data.contractTo = data.contractTo;
                _this.listingDetail.updateDetail(function (response) {
                    if (response.result) {
                        bindCounter();
                        $(_this.cancelListing.doms.modal).modal('hide');
                        showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                            Window.pre.reminder.clearLocalStored();
                            location.reload();
                        });
                    } else {
                        showPropzyAlert(response.message, 'Th??ng B??o');
                    }

                });
            });
        });
        // L??u
        $('body').off('click', '#save-pre-btn').on('click', '#save-pre-btn', async function (e) {
            e.preventDefault();
            _this.listingDetail.check_require = 1;
            // Window.globalVar.listingDetail.data.statusId = 23;

            // check rule can not create listing if floorSize != width*length 
            let sizeLength = parseFloat($('#sizeLength').val().replace(/\,/g, ''));
            let sizeWidth = parseFloat($('#sizeWidth').val().replace(/\,/g, ''));
            let floorSize = parseFloat($('#floorSize').val().replace(/\,/g, ''));
            let lotSize = parseFloat($('#lotSize').val().replace(/\,/g, ''));

            let minPrice = $('#price').val().replace(/\,/g, '');
            let listingTypeId = $('#listingTypeId').val();
            let propertyTypeId = $('#propertyTypeId').val();
            let messageContent = '';
            let messageContentArea = '';
            if (listingTypeId == 1) {
                messageContent = `${NumberInputUtil.LISTING_BUY_PRICE} ${NumberInputUtil.numberToText(minPrice)}`;
            } else if (listingTypeId == 2) {
                messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE} ${NumberInputUtil.numberToText(minPrice)}`
            }
            let formId = parseInt($("#propertyTypeId").find(":selected").data("formid"));
            const checkByFormId = ListForm.filter(f => f.id == formId)[0];
            const usePosition = checkByFormId ? checkByFormId.position : false;
            const useLotSize = checkByFormId ? checkByFormId.lotSize : false;
            if ($('#position').val() != '' && $('#position').val() == 2
                && ((usePosition && listingTypeId == 1) || (usePosition && listingTypeId == 2))) {
                let isEnoughData = false;
                if (!($('#roadFrontageDistance').val() != "")) {
                    isEnoughData = true;
                } else if (!($('#alleyId').val() != "") || !($('#alleyWidth').val() != "")) {
                    isEnoughData = true;
                }
                if (isEnoughData) {
                    showPropzyAlert("Vui l??ng nh???p ?????y ????? th??ng tin h???m.");
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
                    showPropzyAlert("Vui l??ng nh???p ?????y ????? th??ng tin m???t ti???n.");
                    return false;
                }
            }
            if ($('input#virtualTouring').val().trim().length > 0 && !Window.jsDetailData.virtualTouringChecked) {
                if (Window.jsDetailData.oldVirtualTouring?.url != $('input#virtualTouring').val().trim()) {
                    showPropzyAlert('B???n c???n Xem th??? Link virtual tour tr?????c khi th???c hi???n thao t??c n??y !');
                    return false;
                }
            }

            function submitSavePre() {
                if (minPrice && minPrice < NumberInputUtil.ONE_BILLION && listingTypeId == 1) {
                    // mua < 1 t??? 
                    showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            if ( useLotSize && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                                    if (response.result) {
                                                        bindCounter();
                                                        Window.pre.reminder.closeReminderLocal();
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nh?? ri??ng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                                    if (response.result) {
                                                        bindCounter();
                                                        Window.pre.reminder.closeReminderLocal();
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                Window.globalVar.listingDetail.updateDetail(function (response) {
                                    showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                        if (response.result) {
                                            bindCounter();
                                            Window.pre.reminder.closeReminderLocal();
                                            location.reload();
                                        }
                                    });
                                });
                            }
                        }
                    })
                } else if (minPrice && minPrice > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2) {
                    // thu?? > 100 tri???u
                    showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            if (useLotSize && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                                    if (response.result) {
                                                        bindCounter();
                                                        Window.pre.reminder.closeReminderLocal();
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nh?? ri??ng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                                    if (response.result) {
                                                        bindCounter();
                                                        Window.pre.reminder.closeReminderLocal();
                                                        location.reload();
                                                    }
                                                });
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                Window.globalVar.listingDetail.updateDetail(function (response) {
                                    showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                        if (response.result) {
                                            bindCounter();
                                            Window.pre.reminder.closeReminderLocal();
                                            location.reload();
                                        }
                                    });
                                });
                            }
                        }
                    })
                } else if (useLotSize && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                    // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                    showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                    if (response.result) {
                                        bindCounter();
                                        Window.pre.reminder.closeReminderLocal();
                                        location.reload();
                                    }
                                });
                            });
                        }
                    })
                } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                    // case nh?? ri??ng ..
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                    showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                                    if (response.result) {
                                        bindCounter();
                                        Window.pre.reminder.closeReminderLocal();
                                        location.reload();
                                    }
                                });
                            });
                        }
                    })
                } else {
                    Window.globalVar.listingDetail.updateDetail(function (response) {
                        showPropzyAlert(response.message, 'Th??ng B??o', function (e) {
                            if (response.result) {
                                bindCounter();
                                Window.pre.reminder.closeReminderLocal();
                                location.reload();
                            }
                        });
                    });
                }
            }

            let dataCheckLatlong = {
                latitude: parseFloat($('#latitude').val()),
                longitude: parseFloat($('#longitude').val()),
                wardId: parseInt($('#wardId').val()), 
            };
            await checkLatLong(
              dataCheckLatlong,
              submitSavePre,
              hidePropzyLoading
            );
        });

        // L??u v?? nh???c nh???
        $('body').off('click', '#save-remind-pre-btn').on('click', '#save-remind-pre-btn', async function (e) {
            e.preventDefault();
            Window.globalVar.listingDetail.data.statusId = 23;

            // check rule can not create listing if floorSize != width*length 
            let sizeLength = parseFloat($('#sizeLength').val().replace(/\,/g, ''));
            let sizeWidth = parseFloat($('#sizeWidth').val().replace(/\,/g, ''));
            let floorSize = parseFloat($('#floorSize').val().replace(/\,/g, ''));
            let lotSize = parseFloat($('#lotSize').val().replace(/\,/g, ''));

            // if ( ($('#propertyTypeId').val() == 1 || $('#propertyTypeId').val() == 8) 
            // && (sizeLength * sizeWidth).toFixed(2) != floorSize.toFixed(2) && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
            //     // case chung cu/ can ho 
            //     showPropzyAlert('Chi???u d??i * chi???u r???ng kh??c di???n t??ch s??? d???ng')
            // } else if ( $('#propertyTypeId').val() != 1 && $('#propertyTypeId').val() != 8 
            // && (sizeLength * sizeWidth).toFixed(2) != lotSize.toFixed(2) && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
            //     // case nh?? ri??ng ..
            //     showPropzyAlert('Chi???u d??i * chi???u r???ng kh??c di???n t??ch ?????t')
            // } else {
            let minPrice = $('#price').val().replace(/\,/g, '');
            let listingTypeId = $('#listingTypeId').val();
            let propertyTypeId = $('#propertyTypeId').val();
            let messageContent = '';
            let messageContentArea = '';
            if (listingTypeId == 1) {
                messageContent = `${NumberInputUtil.LISTING_BUY_PRICE} ${NumberInputUtil.numberToText(minPrice)}`;
            } else if (listingTypeId == 2) {
                messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE} ${NumberInputUtil.numberToText(minPrice)}`
            }
            if ($('input#virtualTouring').val().trim().length > 0 && !Window.jsDetailData.virtualTouringChecked) {
                if (Window.jsDetailData.oldVirtualTouring?.url !== $('input#virtualTouring').val().trim()) {
                    showPropzyAlert('B???n c???n Xem th??? Link virtual tour tr?????c khi th???c hi???n thao t??c n??y !');
                    return false;
                }
            }

            function submitSaveRemindPre() {
                if (minPrice && minPrice < NumberInputUtil.ONE_BILLION && listingTypeId == 1) {
                    // mua < 1 t??? 
                    showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            if ((propertyTypeId == 13 || propertyTypeId == 14) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                if (response.result) {
                                                    bindCounter();
                                                    Window.pre.reminder.closeReminderLocal();
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nh?? ri??ng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                if (response.result) {
                                                    bindCounter();
                                                    Window.pre.reminder.closeReminderLocal();
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                Window.globalVar.listingDetail.updateDetail(function (response) {
                                    if (response.result) {
                                        bindCounter();
                                        Window.pre.reminder.closeReminderLocal();
                                        $(_this.createReminderModalId).modal();
                                    } else {
                                        showPropzyAlert(response.message);
                                    }
                                });
                            }
                        }
                    })
                } else if (minPrice && minPrice > NumberInputUtil.ONE_HUNDRED_MILLION && listingTypeId == 2) {
                    // thu?? > 100 tri???u
                    showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            if ((propertyTypeId == 13 || propertyTypeId == 14) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                                // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                if (response.result) {
                                                    bindCounter();
                                                    Window.pre.reminder.closeReminderLocal();
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                                // case nh?? ri??ng ..
                                messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA} 
                                ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                                setTimeout(function () {
                                    showPropzyConfirm({
                                        message: messageContentArea,
                                        btn: {
                                            yes: {
                                                text: "X??c nh???n"
                                            },
                                            no: {
                                                text: "H???y"
                                            }
                                        },
                                        okCallback: function () {
                                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                                if (response.result) {
                                                    bindCounter();
                                                    Window.pre.reminder.closeReminderLocal();
                                                    $(_this.createReminderModalId).modal();
                                                } else {
                                                    showPropzyAlert(response.message);
                                                }
                                            });
                                        }
                                    })
                                }, 500)
                            } else {
                                Window.globalVar.listingDetail.updateDetail(function (response) {
                                    if (response.result) {
                                        bindCounter();
                                        Window.pre.reminder.closeReminderLocal();
                                        $(_this.createReminderModalId).modal();
                                    } else {
                                        showPropzyAlert(response.message);
                                    }
                                });
                            }
                        }
                    })
                } else if ((propertyTypeId == 13 || propertyTypeId == 14) && lotSize < NumberInputUtilArea.TEN_METER_AREA) {
                    // case ?????t n???n/ ?????t n???n d??? ??n, s??? d???ng dt ?????t
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#lotSize', true, true)}`;
                    showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                if (response.result) {
                                    bindCounter();
                                    Window.pre.reminder.closeReminderLocal();
                                    $(_this.createReminderModalId).modal();
                                } else {
                                    showPropzyAlert(response.message);
                                }
                            });
                        }
                    })
                } else if (floorSize && floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA) {
                    // case nh?? ri??ng ..
                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA} 
                    ${NumberInputUtilArea.numberToStringArea('#floorSize', true, true)}`;
                    showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                                text: "X??c nh???n"
                            },
                            no: {
                                text: "H???y"
                            }
                        },
                        okCallback: function () {
                            Window.globalVar.listingDetail.updateDetail(function (response) {
                                if (response.result) {
                                    bindCounter();
                                    Window.pre.reminder.closeReminderLocal();
                                    $(_this.createReminderModalId).modal();
                                } else {
                                    showPropzyAlert(response.message);
                                }
                            });
                        }
                    })
                } else {
                    Window.globalVar.listingDetail.updateDetail(function (response) {
                        if (response.result) {
                            bindCounter();
                            Window.pre.reminder.closeReminderLocal();
                            $(_this.createReminderModalId).modal();
                        } else {
                            showPropzyAlert(response.message);
                        }
                    });
                }
            }

            let dataCheckLatlong = {
                latitude: parseFloat($('#latitude').val()),
                longitude: parseFloat($('#longitude').val()),
                wardId: parseInt($('#wardId').val()), 
            };
            await checkLatLong(
              dataCheckLatlong,
              submitSaveRemindPre,
              hidePropzyLoading
            );
        });

        // chuy???n SA
        $('body').off('click', _this.sendSAButtonID).on('click', _this.sendSAButtonID, function (e) {
            e.preventDefault();
            var isCalling = Window.preCall.isCalling;
            // if (!isCalling) {
                _this.listingDetail.check_require = 2;
                _this.listingDetail.sendSA(function (response) {
                    if (response.result) {
                        bindCounter();
                        Window.pre.reminder.closeReminderLocal();
                        showPropzyAlert('???? chuy???n sang SA th??nh c??ng', 'Th??ng B??o', function (e) {
                            window.location.href = '/pos/prescreener#need-to-call-listing';
                        });
                    } else {
                        showPropzyAlert(response.message, 'Th??ng B??o');
                    }
                });
            // } else {
            //     showPropzyAlert('Xin vui l??ng t???t cu???c g???i tr?????c khi chuy???n SA');
            // }

        });
        // H???y
        $('body').off('click', _this.cancelListingButtonID).on('click', _this.cancelListingButtonID, function (e) {
            e.preventDefault();
            $(_this.cancelListingModalId).modal();
        });

        $('body').off('click', _this.sendDiyId).on('click', _this.sendDiyId, function (e) {
            e.preventDefault();
            var isCalling = Window.preCall.isCalling;
            // if (!isCalling) {
                ModalConfirm.showModal({
                    message: "B???n mu???n g???i t??i kho???n ????ng nh???p v??o Propzy App v?? portal cho ch??? tin ????ng n??y!?",
                    removeDisableActionBtn: true,
                    onYes: function (modal) {
                        modal.modal("hide");
                        _this.listingDetail.getSendDiy();
                    },
                });

            // } else {
            //     showPropzyAlert('Xin vui l??ng t???t cu???c g???i tr?????c khi g???i Diy');
            // }
        });


        $('body').off('click', '#wardId').on('click', '#wardId', function (e) {
            e.preventDefault();
            _this.addNewStreet.wardId = parseInt($('#wardId').val());
        });

        $('body').off('click', _this.addNewStreetBtnId).on('click', _this.addNewStreetBtnId, function (e) {
            e.preventDefault();
            _this.addNewStreet.wardId = parseInt($('#wardId').val());
            _this.addNewStreet.addNewStreetModalId = _this.addNewStreetModalId;
            _this.addNewStreet.callback = function (response) {
                $(_this.addNewStreetModalId).modal('hide');
                showPropzyAlert(response.message);
                if (response.result) {
                    _this.listingDetail.loadStreet(_this.addNewStreet.wardId, true);
                }
            };
            _this.addNewStreet.showModal();
        });
        $(document).on('click', "#btn-agent-send-app", function (e) {
            e.preventDefault();
            _this.listingDetail.agentSendApp();
        });
    }

    async function bindCounter() {
        await _this.timer.done(function (callback) {
            let dataSend = {};
            dataSend.openedDate = callback.initTimeStamp;
            dataSend.duration = callback.timer;
            dataSend.lsoId = Window.jsDetailData.id;
            dataSend.url = location.href;
            $.ajax({
                url: "/time-counter/save-time-counter-assistant",
                data: JSON.stringify(dataSend),
                type: "post"
            }).done(function (response) {
                console.log(response);
            }).fail(function (err) {
                console.error(err);
            });
        });
    }
}

$(document).ready(function () {
    showPropzyLoading();
    (new ListingDetailJS()).init();
    if (PAGE_CODE === 'VIEW') {
        $('button:not(.class-view)').remove();
        $('.btn:not(.class-view)').remove();
        $('.virtual-touring-check').parent().remove();
        $('select').prop('disabled', true);
        $('input').prop('disabled', true);
        $('textarea').prop('disabled', true);
        $('#add-new-bank-btn').prop('disabled', true);
        $('#add-new-street-btn').prop('disabled', true);
    }

});
$(window).load(function () {
    // page is fully loaded, including all frames, objects and images
    hidePropzyLoading();
    if (PAGE_CODE === 'VIEW') {
        $('button:not(.class-view)').remove();
        $('.btn:not(.class-view)').remove();
        $('.virtual-touring-check').parent().remove();
        $('select').prop('disabled', true);
        $('input').prop('disabled', true);
        $('textarea').prop('disabled', true);
        $('#add-new-bank-btn').prop('disabled', true);
        $('#add-new-street-btn').prop('disabled', true);
    }
});