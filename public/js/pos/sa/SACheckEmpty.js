function SaCheckEmpty() {
    const API_SA = new SAApi();
    const _this = this;

    var saPageList = {
        idList : {
            'tableId' : '#check-empty-list-table-sale',
            'tableIdRent' : '#check-empty-list-table-rent',
            'tabSale' : '#tab-check-empty-sale',
            'tabRent' : '#tab-check-empty-rent'
        },
        loadTable : function () {
            if ($(saPageList.idList.tableId).length > 0) {
                getTable({type : 0});
            }
        },
        stored : {
            tbCheckEmptySale : null,
            tbCheckEmptyRent  : null,
            tabActive : 1,
        },
        reloadTable : () => {
            if(saPageList.stored.tabActive == 1 && saPageList.stored.tbCheckEmptySale != null) {
                saPageList.stored.tbCheckEmptySale.ajax.reload();
            }
            if(saPageList.stored.tabActive == 2 && saPageList.stored.tbCheckEmptyRent != null) {
                saPageList.stored.tbCheckEmptyRent.ajax.reload();
            }
        }
    };

    var saPopup = {
        idList : {
            'modalPopup' : '#check-empty-popup-modal',
            'tableId' : '#check-empty-popup-table'
        },
        loadTable : function () {
            getTable({type : 1});
        },
        loadNotify : function () {
            saPopup.registerNotify();
            // API_SA.loadNotificationCurrentUser().done(function (response) {
            //     if (response.result) {
            //         if (hasValue(response.data)) {
            //             console.log(response.data);
            //             if (response.data.length > 0) {
            //                 var isShow = false;
            //                 $.each(response.data, function (index, val) {
            //                     if (val.control === 'popup' && !val.isClose) {
            //                         isShow = true;
            //                         return true;
            //                     }
            //                 });

            //                 if (isShow) {
            //                     saPopup.loadTable();
            //                 }

            //                 saPopup.excuteNotify(response.data);
            //             }
            //         }
            //     }
            // });
        },
        registerNotify() {
            var params = {
                key: 'empty_check',
                callback: function (response) {
                    var body = JSON.parse(response.body);
                    console.log(body);
                    if (body.result) {
                        if (body.data.control === 'popup') {
                            saPopup.loadTable();
                            //saPageList.loadTable();
                            saPageList.reloadTable();
                        } else {
                            if (body.data.control === 'notify') {
                                saPopup.excuteNotify([body.data]);
                                //saPageList.loadTable();
                                saPageList.reloadTable();
                            }
                        }
                        if (typeof(saMenuLeft) != undefined) {
                            saMenuLeft.loadInfo();
                        }

                    }
                }
            };

            var paramsClose = {
                key: 'close_notification',
                callback: function (response) {
                    var body = JSON.parse(response.body);
                    if (body.length > 0 && body[0].code === 'empty_check') {
                        saPopup.loadTable();
                        //saPageList.loadTable();
                        saPageList.reloadTable();
                        saPopup.excuteNotify();
                        if (typeof(saMenuLeft) != undefined) {
                            saMenuLeft.loadInfo();
                        }
                    }
                }
            };

            var paramsUnread = {
                key: "NOTI_UNREAD_MONGO",
                callback: function (response) {
                    const listNoti = JSON.parse(response.body);
                    let itemsPopup = [];
                    let itemsNotify = [];
                    let hasEmptyCheckNoti = false;

                    if (listNoti.data.length > 0) {
                        listNoti.data.forEach(i => {
                            if (i.code !== "empty_check") return;

                            hasEmptyCheckNoti = true;
                            if (i.control === "popup") {
                                itemsPopup.push(i);
                            } else if (i.control === "notify") {
                                itemsNotify.push(i);
                            }
                            //  and setNoti Unread -> Read
                            setNotificationRead(i.id, () => {});
                        })
                    }

                    if (itemsPopup.length > 0) {
                        // show only one popup
                        saPopup.loadTable();
                        saPageList.reloadTable();
                    }

                    if (itemsNotify.length > 0) {
                        // show only one notify
                        saPopup.excuteNotify([itemsNotify[0]]);
                        saPageList.reloadTable();
                    }

                    if (hasEmptyCheckNoti && typeof saMenuLeft != "undefined") {
                        saMenuLeft.loadInfo();
                    }
                },
            };

            // remove flow noti check empty directly, keep only flow unread
            // notification.register(params);
            notification.register(paramsClose);
            notification.register(paramsUnread);
        },
        excuteNotify : function (data) {
            var notificationList = {};
            var message = null;
            var totalListing = 0;
            var i, j, k;
            var html = null;
            for (i in data) {
                if (data[i].receiverDepartmentId == 17) { // only show for sa
                    if (!hasValue(notificationList[data[i].code])) {
                        notificationList[data[i].code] = {
                            totalRequest: 0,
                            totalListing: 0
                        };
                    }
                    notificationList[data[i].code].totalRequest++;
                    if (data[i].code == 'empty_check') {
                        for (k in data[i].checkListings) {
                            if (data[i].checkListings[k].isChecked == false) {
                                notificationList[data[i].code].totalListing++;
                            }
                        }
                    } else {
                        if (data[i].isRead == false) {
                            notificationList[data[i].code].totalListing++;
                        }
                    }
                }
            }

            if (hasValue(notificationList.empty_check)) {
                if (notificationList.empty_check.totalRequest > 0 && notificationList.empty_check.totalListing > 0) {
                    createBootstrapNotification({
                       // message: '<a href="/pos/sa/check-empty-list" target="_blank">SA: Bạn có <code> ' + notificationList.empty_check.totalRequest + '</code> yêu cầu check trống cho <code> ' + notificationList.empty_check.totalListing + ' </code>listing</a>'
                        message: '<a href="/pos/sa/check-empty-list" target="_blank">SA: Bạn có check trống mới. Xem ngay...</a>'
                    });
                }
                delete notificationList.empty_check;
            } else if (hasValue(notificationList.empty_check_confirm)) {
                if (notificationList.empty_check_confirm.totalRequest > 0 && notificationList.empty_check_confirm.totalListing > 0) {
                    createBootstrapNotification({
                        //message: '<a href="/pos/sa/check-empty-list" target="_blank">SA: Bạn có <code> ' + notificationList.empty_check_confirm.totalRequest + '</code> yêu cầu xác nhận thời gian cho <code> ' + notificationList.empty_check_confirm.totalListing + ' </code>listing</a>'
                        message: '<a href="/pos/sa/check-empty-list" target="_blank">SA: Bạn có yêu cầu xác nhận thời gian mới. Xem ngay ...</a>'
                    });
                }
                delete notificationList.empty_check_confirm;
            } else {
                for (i in notificationList) {
                    totalListing += notificationList[i].totalListing;
                }
                if (totalListing > 0) {
                    createBootstrapNotification({
                        //message: '<a href="/pos/sa" target="_blank">SA: Bạn có <code> ' + totalListing + '</code> listing mới</a>'
                        message: '<a href="/pos/sa" target="_blank">SA: Bạn có listing mới. Xem ngay...</a>'
                    });
                }
            }

        }
    }

    var saCall = {
        dataPost : {
            statusIds: null,
            checkIds: null,
            receiverId: null,
            note: null,
            timeViewFrom: null,
            timeViewTo : null,
            unknown : false,
            type : 1
        },
        dataPostNoteCrm : {
            content : null,
            rlistingId : null
        },
        idList : {
            'modalEmptyResult'  : '#check-empty-result-modal',
            'btnSendCheck'      : '#send-check-empty-result',
            'fieldResult'       : '#check-empty-result',
            'fieldNote'         : '#check-empty-result-note',
            'fieldDate'         : '#check-empty-result-date',
            'fieldTimeFrom'     : '#check-empty-result-time-from',
            'fieldTimeTo'       : '#check-empty-result-time-to',
            'fieldGroupTime'    : '#check-empty-result-date-time-view-group',
            'fieldUnknown'       : '#check-empty-result-unknown'
        },
        callEvent: {
            onSubmitHistoryCall: function (callInfo) {
                $(saCall.idList.modalEmptyResult).modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }   
        },
        makeCall : function (reciverData) {
            saCall.clearData();
            saCall.storedTime(reciverData);
            saCall.updateData(reciverData);
            var _params = {
                callId: 'checkEmpty',
                rlistingId: parseInt(reciverData.rlistingId),
                phoneNumber: reciverData.phoneNumber.toString(),
                id:parseInt(reciverData.rlistingId),
                department:2,
                feature:"saCheckEmpty",
                showLoading: false

            };
            CCall.makeCall(_params);
        },
        sendCheckEmpty : function() {
            saCall.updateData();
            var err = saCall.validateTime();
            if (!err.isErr) {
                if (saCall.dataPostNoteCrm.content != null && saCall.dataPostNoteCrm.content) {
                    API_SA.addNoteCRM(saCall.dataPostNoteCrm).done(function () {});
                }

                var apiSend = null;
                if (saCall.dataPost.type === 1) {
                    apiSend = API_SA.sendCheckEmptyResult(saCall.dataPost);
                }
                if (saCall.dataPost.type === 2) {
                    apiSend = API_SA.sendCheckEmptyResultAgain(saCall.dataPost);
                }
                apiSend.done(function (response) {
                    if (response.result) {
                        //saPageList.loadTable();
                        saPageList.reloadTable();
                        saPopup.loadTable();
                    } else {
                        showPropzyAlert(response.message);
                    }

                });
            } else {
                showPropzyAlert(err.message, "Thông Báo", function () {
                    $(saCall.idList.modalEmptyResult).modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            }

        },
        updateData : function (reciveData) {
            var result      = parseInt($(saCall.idList.fieldResult).val());
            var date        = $(saCall.idList.fieldDate).val();
            var timeFrom    = $(saCall.idList.fieldTimeFrom).val();
            var timeTo      = $(saCall.idList.fieldTimeTo).val();
            var unKnown      = false;



            if (!hasValue(date) || !hasValue(timeFrom) || !hasValue(timeTo)) {
                saCall.dataPost.timeViewFrom = null;
                saCall.dataPost.timeViewTo = null;
            } else {
                saCall.dataPost.timeViewFrom = moment(date + " " + timeFrom, "DD/MM/YYYY HH:mm").unix() * 1000;
                saCall.dataPost.timeViewTo = moment(date + " " + timeTo, "DD/MM/YYYY HH:mm").unix() * 1000;
            }

            if (hasValue(result) && result !== 1) {
                saCall.dataPost.timeViewFrom = null;
                saCall.dataPost.timeViewTo = null;
            } else {
                unKnown = $(saCall.idList.fieldUnknown).is(':checked');
                if (unKnown) {
                    saCall.dataPost.timeViewFrom = null;
                    saCall.dataPost.timeViewTo = null;
                }
            }
            
            saCall.dataPost.note = $.trim($(saCall.idList.fieldNote).val());
            saCall.dataPost.statusIds = [result];
            saCall.dataPost.unknown = unKnown;

            if (saCall.dataPost.note) {
                saCall.dataPostNoteCrm.content = saCall.dataPost.note;
            }
            if (reciveData) {
                saCall.dataPost.checkIds =  [parseInt(reciveData.checkId)];
                saCall.dataPost.listingIds = [parseInt(reciveData.rlistingId)];
                saCall.dataPost.receiverId = parseInt(reciveData.createBy);
                saCall.dataPost.type = parseInt(reciveData.type);
                saCall.dataPostNoteCrm.rlistingId = reciveData.rlistingId;
            }

        },
        clearData : function () {
            saCall.dataPost = {
                statusIds: null,
                    checkIds: null,
                    receiverId: null,
                    note: null,
                    timeViewFrom: null,
                    timeViewTo : null,
                    unknown : false,
                    type : 1
            };
            saCall.dataPostNoteCrm = {
                content : null,
                rlistingId : null
            };
            // set feild
            $(saCall.idList.fieldResult).val(1);
            $(saCall.idList.fieldNote).val('');
            $(saCall.idList.fieldDate).val('');
            $(saCall.idList.fieldTimeFrom).val('');
            $(saCall.idList.fieldTimeTo).val('');
            $(saCall.idList.fieldUnknown).prop('checked', true).trigger('click');
            saCall.shoHideTime();
        },
        shoHideTime: function () {
            var result = parseInt($(saCall.idList.fieldResult).val());
            if (result === 1) {
                $(saCall.idList.fieldGroupTime).show();
            } else {
                $(saCall.idList.fieldGroupTime).hide();
            }
        },
        storedTime : function (reciveData) {
            if (hasValue(reciveData.scheduleTimeFrom) && hasValue(reciveData.scheduleTimeTo)) {
                var localDate = moment(reciveData.scheduleTimeFrom).format('DD/MM/YYYY');
                var timeFrom = moment(reciveData.scheduleTimeFrom).format('HH:mm:ss');
                var timeTo = moment(reciveData.scheduleTimeTo).format('HH:mm:ss');
                $(saCall.idList.fieldDate).datepicker('setDate', localDate);
                $(saCall.idList.fieldTimeFrom).timepicker('setTime', timeFrom);
                $(saCall.idList.fieldTimeTo).timepicker('setTime', timeTo);
            }
        },
        validateTime : function () {
            var err = {
                isErr : false,
                message : ""
            };
            var currentTime = moment().unix() * 1000;

            if (hasValue(saCall.dataPost.statusIds)) {
                if (saCall.dataPost.statusIds[0] === 1 && !saCall.dataPost.unknown) {
                    if (saCall.dataPost.timeViewFrom == null || saCall.dataPost.timeViewTo == null) {
                        err.isErr  = true;
                        err.message = "Thời gian xác nhận không được để trống";
                    } else if (saCall.dataPost.timeViewFrom > saCall.dataPost.timeViewTo) {
                        err.isErr  = true;
                        err.message = "Thời gian bắt đầu không được lớn hơn thời gian kết thúc";
                    } else if (saCall.dataPost.timeViewFrom < currentTime) {
                        err.isErr  = true;
                        err.message = "Thời gian chọn không được nhỏ hơn thời gian hiện tại";
                    }
                }
            } else {
                err.isErr  = true;
                err.message = "Xin vui lòng chọn trạng thái của check trống";
            }
            return err;
        }

    }

    _this.init = function () {
        CCall.bindCallEvent('checkEmpty', saCall.callEvent);
        saPageList.loadTable();
        saPopup.loadNotify();
        eventCheckEmpty();

    }
    function eventCheckEmpty() {
        $(saCall.idList.fieldDate).datepicker({
            format: 'dd/mm/yyyy',
            showOtherMonths: true,
            selectOtherMonths: true,
            autoclose: true,
            changeMonth: true,
            changeYear: true,
            todayHighlight : true,
        });
        $('.check-empty-result-time').timepicker({showMeridian: false});
        $('body').off('click', saCall.idList.btnSendCheck).on('click', saCall.idList.btnSendCheck, function (e) {
            e.preventDefault();
            $(saCall.idList.modalEmptyResult).modal('hide');
            saCall.sendCheckEmpty();
            Window.endCallProcess();
        });

        $('body').off('change', saCall.idList.fieldResult).on('change', saCall.idList.fieldResult, function (e) {
            e.preventDefault();
            saCall.shoHideTime();
        });

        $('body').off('change', saCall.idList.fieldUnknown).on('change', saCall.idList.fieldUnknown, function (e) {
            e.preventDefault();
            if ($(this).is(':checked')) {
                $(saCall.idList.fieldDate).prop('disabled', true);
                $('.check-empty-result-time').prop('disabled', true);
            } else {
                $(saCall.idList.fieldDate).prop('disabled', false);
                $('.check-empty-result-time').prop('disabled', false);
            }
        });


        if ($(saPageList.idList.tableId).length > 0) {
            $('body').on('click', saPageList.idList.tableId + ' .check-empty-call, ' + saPageList.idList.tableIdRent + ' .check-empty-call' , function (e) {
                e.preventDefault();
                saCall.makeCall({
                    callId: 'checkEmpty',
                    phoneNumber: $(this).data('phone'),
                    rlistingId: $(this).data('rlistingid'),
                    createBy: $(this).data('createby'),
                    checkId: $(this).data('checkid'),
                    type : $(this).data('type'),
                    scheduleTimeFrom : $(this).data('scheduleTimeFrom'),
                    scheduleTimeTo : $(this).data('scheduleTimeTo')
                });
            });
            $('body').on('click', saPageList.idList.tabSale + ', ' + saPageList.idList.tabRent  , function (e) {
                e.preventDefault();
               const tabId = Number.parseInt($(this).data('tab'));
               saPageList.stored.tabActive = tabId;
               saPageList.reloadTable();
            });
        }
        $('body').off('click', saPopup.idList.modalPopup + ' .check-empty-call').on('click', saPopup.idList.modalPopup + ' .check-empty-call', function (e) {
            e.preventDefault();
            var phone = $(this).data('phone');
            if (hasValue(phone)) {
                $(saPopup.idList.modalPopup).modal('hide');
                saCall.makeCall({
                    callId: 'checkEmpty',
                    phoneNumber: $(this).data('phone'),
                    rlistingId: $(this).data('rlistingid'),
                    createBy: $(this).data('createby'),
                    checkId: $(this).data('checkid'),
                    type : $(this).data('type'),
                    scheduleTimeFrom : $(this).data('schedule-time-from'),
                    scheduleTimeTo : $(this).data('schedule-time-to')
                });
            } else {
                $(saPopup.idList.modalPopup).modal('hide');
                showPropzyAlert('Chưa có số điện thoại. Vui lòng liên hệ quản lý.');
            }
        });

        $('body').on( "mouseenter" , '.tracking-date-check-empty', function(e) {
            var tooltip = '<div class="tooltip-event-props">' +$(this).data('view') + '</div>';
            var $tooltip = $(tooltip).appendTo('body');
            $(this).css('z-index', 10000);
            $tooltip.fadeIn('500');
            $tooltip.fadeTo('10', 1.9);
            $tooltip.css('top', e.pageY + 10);
            $tooltip.css('left', e.pageX + 20);

        });
        $('body').on('mouseleave', '.tracking-date-check-empty', function (e) {
            $('.tooltip-event-props').remove();
        });
    }



    /**
     * some functions for empty list
     *
     *
     * */
    function getTable(params) {
        var localParams = {
            type : 0
        };
        $.extend(localParams, params, true);

        if (localParams.type === 0) {
            try {
                $(saPageList.idList.tableId).DataTable().destroy();
            } catch (Ex) {
                // nothing
            }
            try {
                $(saPageList.idList.tableIdRent).DataTable().destroy();
            } catch (Ex) {
                // nothing
            }
            saPageList.stored.tbCheckEmptySale = $(saPageList.idList.tableId).DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: API_SA.apiList.checkEmptyList,
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {
                            listingTypeId : 1
                        });
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: false,
                searching: false,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: [
                    {
                        data: 'crmInfo',
                        render: function (data, type, object) {
                            return storedTable(object, false);
                        }
                    }
                ]})
                .off('processing.dt')
                .on('processing.dt', function (e, settings, processing) {
                    if (processing) {
                        showPropzyLoading();
                    } else {
                        hidePropzyLoading();
                    }
                });
            saPageList.stored.tbCheckEmptyRent = $(saPageList.idList.tableIdRent).DataTable({
                processing: false,
                serverSide: true,
                deferLoading : false,
                ajax: {
                    url: API_SA.apiList.checkEmptyList,
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, {
                            listingTypeId : 2
                        });
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: false,
                searching: false,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: [
                    {
                        data: 'crmInfo',
                        render: function (data, type, object) {
                            return storedTable(object, false);
                        }
                    }
                ]})
                .off('processing.dt')
                .on('processing.dt', function (e, settings, processing) {
                    if (processing) {
                        showPropzyLoading();
                    } else {
                        hidePropzyLoading();
                    }
                });
        } else {
            API_SA.checkEmptyPopup().done(function (response) {
                if (response.data.length > 0) {
                    var html = storedTable(response.data[0], true);
                    var checkAgain = (!hasValue(response.data[0].type) || response.data[0].type === 2 )? 'Xác nhận thời gian' : 'Check trống';
                    $(saPopup.idList.modalPopup).find('.modal-title').html(checkAgain);
                    $(saPopup.idList.modalPopup).find('.message').html(html);
                    $(saPopup.idList.modalPopup + ' #details-list-listing')
                        .DataTable({
                            pageLength: 5,
                            autoWidth: true,
                            deferRender: false,
                            lengthChange: false,
                            searching: false,
                            ordering: false,
                            language: DatatableHelper.languages.vn
                        });
                    $(saPopup.idList.modalPopup).modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                } else {
                    $(saPopup.idList.modalPopup).modal('hide');
                }

            });
        }
    }

    function storedTable(object, isPopup) {
        var checkAgain = (!hasValue(object.type) || object.type === 2 )? 'Xác nhận thời gian' : 'Check trống';
        var type = !isPopup ? '<p style="font-size: 20px; font-weight: bold">' + checkAgain + '</p>' : '';
        var deadLine = hasValue(object.scheduleTimeFrom) ? '<p><b>Deadline: </b>' + object.deadLine + '</p>' : '';
        var html = '<div class="toggle-detail-list">' +
            type +
            '<p><b>Tên CRM: </b>' + object.name + '</p>' +
            '<p><b>Thời gian nhận:</b> ' + moment(object.createdDate).format('DD/MM/YYYY HH:mm:ss') + '</p>' +
            deadLine +
            '</div>' +
            '<div class="details-list">' +
                detailList (object, isPopup) +
            '</div>';
        return html;
    }
    function detailList(data, isPopup) {
        var popup = !isPopup ? '<th class="text-center">Chờ xác nhận</th>' : '';
        var html = '<table id="details-list-listing" cellpadding="5" cellspacing="0" border="0" style="width: 100%;" class="table table-bordered">' +
            '<thead>' +
            '<tr>' +
            '<th class="text-center">ID</th>' +
            '<th class="text-center">Tên chủ tin đăng</th>' +
            '<th class="text-center">Địa Chỉ</th>' +
            '<th class="text-center">Loại hình</th>' +
            '<th class="text-center">Giá</th>' +
            '<th class="text-center">Thời gian yêu cầu</th>' +
            popup +
            '<th class="text-center">Ghi chú</th>' +
            '</tr>' +
            '</thead><tbody>';
        for (var i in data.inforListings) {
            var listing = data.inforListings[i];

            if (listing.isChecked == 0) {
                var note = hasValue(listing.noteSendCheck) ? listing.noteSendCheck : "";
                var scheduleTimeTo = hasValue(listing.scheduleTimeTo) ? listing.scheduleTimeTo : 'N/A';
                var scheduleTimeFrom = hasValue(listing.scheduleTimeFrom) ? listing.scheduleTimeFrom : 'N/A';
                var diy = hasValue(listing.useDiy) && listing.useDiy === 1 ? 'Diy' : '';
                var columnDiy = !isPopup ? '<td width="90px">' + diy + '</td>' : '';
                var listingTypeName = typeof (getNameListingType) !== "undefined" && getNameListingType(listing.listingTypeId) ? getNameListingType(listing.listingTypeId).sale.name : 'N/A';
                var lastView = hasValue(listing.trackingDate) ? '<i class="fa fa-eye tracking-date-check-empty" style="cursor: pointer;" data-view="Chủ nhà xem tin đăng lúc '+ moment(listing.trackingDate).format('DD/MM/YYYY HH:mm')+'"></i>' : '';
                html += '<tr data-rlistingid="' + listing.rlistingId + '" data-checkid="' + listing.checkId + '">' +
                    '<td width="50px"><a href="/pos/sa/detail/' + listing.rlistingId + '" target="_blank">' + listing.rlistingId  +'</a> <a>'+ lastView +'</a></td>' +
                    '<td width="140px">' +
                    '<a style="color: #00a65a;" href="#" data-phone="' + listing.phone + '" ' +
                    'data-type="' + data.type + '" ' +
                    'data-rlistingid="' + listing.rlistingId + '" ' +
                    'data-createby="' + data.createBy + '" ' +
                    'data-checkid="' + listing.checkId + '" ' +
                    'data-schedule-time-from="' + scheduleTimeFrom + '" ' +
                    'data-schedule-time-to="' + scheduleTimeTo + '" ' +
                    'class="check-empty-call">' + listing.ownerName + '</a></td>' +
                    '<td width="300px">' + listing.address + '</td>' +
                    '<td width="80px">' + listingTypeName + '</td>' +
                    '<td width="100px" >' + listing.priceFormat + '</td>' +
                    '<td width="200px" class="text-center">' + scheduleTimeFrom.concat(" <i class='fa fa-arrow-right'></i> ", scheduleTimeTo) + '</td>' +
                    columnDiy +
                    '<td>' + note + '</td>' +
                    '</tr>';
            }

        }
        html += '</tbody></table>';
        return html;
    }

    
}

$(document).ready(function () {
    Window.SaCheckEmpty = new SaCheckEmpty();
    Window.SaCheckEmpty.init();
});