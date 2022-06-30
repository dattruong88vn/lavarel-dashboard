function SaDepositManager() {
    const API_SA = new SAApi();
    const _this = this;

    const dateFormat = 'DD/MM/YYYY';
    const dateTimeFormat = 'DD/MM/YYYY HH:mm';

    const isAdmin = hasValue(currentUser.departments[0].isGroupAdmin) ? 1 : 0;

    var filter = {};
    var table = null;
    const stored = {

    };
    const __indexPromiseApi = async function (name, params = {}) {
        switch (name) {
            case 'GET_LISTING_TYPES' : {
                $("#listingTypeId").html('').select2();
                let data = [{id: 0, text: "--Chọn loại giao dịch--"}];
                if (!POS_STORED_LOCAL_API.LISTING_TYPES_LIST) {
                    await POS_PROMISISE_API("GET_LISTING_TYPES");
                }
                data = data.concat(POS_STORED_LOCAL_API.LISTING_TYPES_LIST);
                $("#listingTypeId").select2({
                    data: data,
                });
                break;
            }
            case 'GET_PROPERTY_LIST_PREFIX' : {
                $("#propertyTypeIds").html('').select2();
                let data = [];
                if (params.listingTypeId != null) {
                    await POS_PROMISISE_API("GET_PROPERTY_LIST_PREFIX", {listingTypeId : params.listingTypeId });
                } else {
                    POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX = [];
                }

                data = data.concat(POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX);
                $("#propertyTypeIds").select2({
                    data: data,
                    placeholder: " Chọn loại hình bất động sản",
                });
                if (data.length > 0) {
                    $("#propertyTypeIds").prop('disabled', false);
                } else {
                    $("#propertyTypeIds").prop('disabled', true);

                }
                break;
            }
        }
    };
    var depositModal = {
        ids : {
            txtRlistingId : "#deposit-info-rlistingId",
            txtDepositId : "#deposit-info-id",
            btnShowModalCall : '#deposit-modal-call',
            btnSendDeposit : '#btn-save-deposit',
            selectStatus : '#deposit-modal-status',
            selectRejectReason: '#deposit-modal-reject-reason',
            acceptClass : '.deposit-modal-accept-wrapper',
            rejectClass : '.deposit-modal-reject-wrapper',
            changeTimeClass : '.deposit-modal-change-time-wrapper',
            txtReason : '#deposit-modal-reason',
            txtNote : '#deposit-modal-note',
            selectTransactionMeetingPlace : "#deposit-modal-transaction-place",
            txtMeetingPlace : "#deposit-modal-meeting-place",
            txtMeetingDate : "#deposit-modal-meeting-date",
            txtMeetingTime : "#deposit-modal-meeting-time",
            modalDeposit: '#deposit-modal',
            modalDepositCall : '#deposit-modal-show-phone',
            btnDepositCall : "#btn-deposit-call",
            contentCall : "#deposit-modal-call-content"


        },
        stored : {
          dealForm : [],
        },
        makeCall : function (reciverData) {
            depositModal.showHideMakeCall(false);
            $(depositModal.ids.modalDepositCall).modal('hide');
            var phone = ($(depositModal.ids.contentCall + " input[type='radio']:checked").val());
            var rlistingId = parseInt($(depositModal.ids.modalDeposit + " " + depositModal.ids.txtRlistingId).val());
            var _params = {
                rlistingId: rlistingId,
                phoneNumber: phone,
                department:2,
                id:rlistingId,
                onCallEnded: function (callInfo) {
                    depositModal.showHideMakeCall(true);
                    var _callInfo = {
                        duration: callInfo.duration,
                        phone: callInfo.number,
                        startedDate: callInfo.startTime,
                        endedDate: (hasValue(callInfo.endTime) ? callInfo.endTime : callInfo.startTime),
                        rlistingId: rlistingId,
                        propzyCallId: $("#propzyCallId").val() ? $("#propzyCallId").val() : null
                    };

                    API_SA.trackCall(_callInfo).done(function (response) {});
                },
                showLoading: false

            };
            CCall.makeCall(_params);
        },
        showHideMakeCall : function (show) {
            if(show === true) {
                $(depositModal.ids.btnShowModalCall).prop('disabled', false);
            } else {
                $(depositModal.ids.btnShowModalCall).prop('disabled', true);
            }
        },
        updateDataPost : function() {
            const status = isVal(parseInt($(depositModal.ids.selectStatus).val())) ? parseInt($(depositModal.ids.selectStatus).val()) : 1;
            let dataPost = {};
            switch (status) {
                case 1:
                    dataPost = {
                        type : 1
                    };
                    dataPost.ownerQuestion = depositModal.getOwnerQuestion();
                    break;
                case 2:
                    dataPost = {
                        reasonId : parseInt($(depositModal.ids.selectRejectReason).val()),
                        type : 2
                    };
                    break;
                case 3:
                    const time = $(depositModal.ids.txtMeetingTime + " input").val();
                    const date = $(depositModal.ids.txtMeetingDate + " input").val();
                    const meetingTime = moment(date + " " + time, dateTimeFormat).unix() * 1000;
                    dataPost = {
                        meetingTime : meetingTime,
                        meetingPlace : $(depositModal.ids.txtMeetingPlace).val(),
                        type : 3
                    };
                    break;
            }
            dataPost.depositId = parseInt($(depositModal.ids.txtDepositId).val());
            dataPost.note = $(depositModal.ids.txtNote).val();
            return dataPost;

        },
        getOwnerQuestion () {
            const result = depositModal.stored.dealForm.map(it => {
                return {
                    "formResultId": it.formResultId,
                    "depositId": it.depositId,
                    "questionId": it.questionId,
                    "questionItemId": it.questionItemId,
                    "value": isVal(it.value) && it.control === "checkbox"? it.value : null,
                    "content": isVal(it.content) ? it.content : null,
                };
            });
            return result;
        },
        validateData: function (data){
            var hasErr = {
                isErr : false,
                message : []
            }
            switch (data.type) {
                case 1:
                    break;
                case 2:
                    if ((!isVal(data.reasonId) || data.reasonId === 13) && !isVal($.trim(data.note))) {
                        // khác
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Bạn cần phải nhập ghi chú</li>");
                    }
                    break;
                case 3:
                    var currentTime = moment().unix() * 1000;
                    if (!isVal(data.meetingTime) || data.meetingTime < currentTime) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng nhập thời gian lớn hơn thời gian hiện tại</li>");
                    }
                    if (!isVal(data.meetingPlace)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng nhập địa điểm mới</li>");
                    }
                    break;
            }
            return hasErr;
        },
        saveDeposit : function () {
            showPropzyLoading();
            const dataPost = depositModal.updateDataPost();
            const err = depositModal.validateData(dataPost);
            if (!err.isErr) {
                API_SA.sendDepositForm(dataPost)
                    .done(function (response) {
                        hidePropzyLoading();
                        if (response.result) {
                            $(depositModal.ids.modalDeposit).modal("hide");
                            depositTable.table.ajax.reload();
                        } else {
                            showPropzyAlert(response.message);
                        }
                        console.log(response);
                    })
                    .fail(function( jqXHR, textStatus ) {
                        hidePropzyLoading();
                        console.error("request fail: "  + textStatus);
                    });
            } else {
                hidePropzyLoading();
                showPropzyAlert(err.message.join(" </br>"));
            }

        },
        setInfoModal(data) {

            const rlistingId = isVal(data.listingId) ? data.listingId : ""
            const depositId = isVal(data.depositId) ? data.depositId : "";
            const history = API_SA.apiList.getDepositHistory + data.depositId;
            const ownerName = isVal(data.ownerName) && data.ownerName ? data.ownerName : 'N/A';
            const ownerTypeName = isVal(data.ownerTypeName) && data.ownerTypeName ? data.ownerTypeName : 'N/A';
            const ownerPhone = isVal(data.ownerPhone) && data.ownerPhone ? data.ownerPhone : '';
            const formattedPrice = isVal(data.formattedPrice) ? data.formattedPrice : 'N/A';
            const priceDesposit = isVal(data.formattedDepositPrice) ? data.formattedDepositPrice : 'N/A';
            const depositDate = isVal(data.depositDate) ? moment(data.depositDate).format(dateTimeFormat) : 'N/A';
            const depositAddress = isVal(data.depositAddress) ? data.depositAddress : 'N/A';

            const newDepositAddress = isVal(data.depositAddress) ? data.depositAddress : '';
            const newDepositTime = isVal(data.depositDate) ? moment(data.depositDate).format("HH:mm") : moment().format("HH:mm");
            const newDepositDate = isVal(data.depositDate) ? moment(data.depositDate).format(dateFormat) : moment().format(dateFormat);
            const dealId = isVal(data.dealId) ? data.dealId : "";


            $(depositModal.ids.modalDeposit + " " + depositModal.ids.txtRlistingId).val(rlistingId);
            $(depositModal.ids.modalDeposit + " " + depositModal.ids.txtDepositId).val(depositId);
            $(depositModal.ids.modalDeposit + " #deposit-info-link-detail").attr("href", '/pos/sa/detail/'+ rlistingId).html(rlistingId);
            $(depositModal.ids.modalDeposit + " #deposit-info-link-history").attr("href", history);
            $(depositModal.ids.modalDeposit + " #deposit-info-owner-name").html(ownerName);
            $(depositModal.ids.modalDeposit + " #deposit-info-owner-type-name").html(ownerTypeName);
            $(depositModal.ids.modalDeposit + " #deposit-info-owner-phone").html(ownerPhone);
            $(depositModal.ids.modalDeposit + " #deposit-info-price").html(formattedPrice);
            $(depositModal.ids.modalDeposit + " #deposit-info-price-desposit").html(priceDesposit);
            $(depositModal.ids.modalDeposit + " #deposit-info-time").html(depositDate);
            $(depositModal.ids.modalDeposit + " #deposit-info-place").html(depositAddress);

            // set time
            $(depositModal.ids.txtMeetingDate + " input").val(newDepositDate);
            $(depositModal.ids.txtMeetingTime + " input").val(newDepositTime);
            $(depositModal.ids.txtMeetingPlace + " input").val(newDepositAddress);


            // modal call;

            var html = '<div class="row form-group">' +
                            '<div class="col-md-12">' +
                                '<label>Số chính: </label>' +
                                '<label class="radio control-label col-xs-12">' +
                                    '<input type="radio" value="'+ownerPhone+'" checked="checked" name="deposit-phone">' +
                                    '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ ownerPhone +
                '               </label>'+
                            '</div>' +
                        '</div>';
            if (isVal(data.phoneSubs)) {
                var subphones = $.map(data.phoneSubs, function (i) {
                    return '<label class="radio control-label col-xs-12">' +
                        '<input type="radio" value="'+i+'" name="deposit-phone">' +
                        '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ i +
                        '</label>';
                })
                html += '<div class="row form-group deposit-owner-sub-phone">' +
                    '<div class="col-md-12">' +
                    '<label>Số phụ:  </label>' + subphones.join("") +
                    '</div>' +
                    '</div>';
            }


            $(depositModal.ids.modalDepositCall + " " + depositModal.ids.contentCall).html(html);

            // load Api load form

            API_SA.getDepositForm({depositId : depositId})
                .done((response)=> {
                    depositModal.stored.dealForm = [];
                    if(response.result) {
                        depositModal.stored.dealForm = response.data;
                    }
                    depositModal.renderDealForm();
                })
                .fail((err) => {
                    depositModal.stored.dealForm = [];
                    depositModal.renderDealForm();
                    console.error("Deposit Modal: get deal deposit failed!")
                });

            $(depositModal.ids.selectStatus).val(1).trigger('change');
        },
        renderDealForm() {
            $(depositModal.ids.acceptClass).html("");
            let elem = $('<div class="col-md-12" style="padding-right: 0">');
            let html = '';
            let htmltext = '';
            depositModal.stored.dealForm.forEach((it, index) => {

                const valContent = isVal(it.content) ? it.content : '';
                if(it.control === "checkbox") {
                    const checked = isVal(it.value) ? 'checked' : '';
                    const style = isVal(it.content) ? 'style="display: block"':  'style="display: none"';
                    const val = isVal(it.value) ? it.value : '';

                    html += '<label class="checkbox">' +
                        '<input type="checkbox" class="deal-form-deposit" data-index="'+ index +'" '+ checked +' value="'+ val +'" data-text="'+ it.name +'">' +
                        '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+
                        it.name +'</label>';
                    html += '<div><input class="form-control deal-form-input-deposit"  data-index="'+ index +'" type="text" '+ style +' value="'+ valContent +'"/></div>';
                } else if(it.control === "text") {

                    htmltext += '<label class="checkbox">' + it.name +
                        '<textarea rows="3" class="deal-form-deposit form-control" data-index="'+ index +'">'+ valContent +'</textarea>' +
                        '</label>';
                }

            });
            elem.html(html + htmltext);
            const body = $('<div class="col-md-12">').append('<label>Giấy tờ cần thiết</label>').append(elem);
            $(depositModal.ids.acceptClass).append(body);
            //$(depositModal.ids.acceptClass).show();
        }
    }
    var depositTable = {
        ids: {
            txtDateFromFilter : '#deposit-filter-date-from',
            txtDateToFilter : '#deposit-filter-date-to',
            txtRlistingFilter : '#deposit-filter-rlistingId',
            selectStatusFilter : '#deposit-filter-status',
            selectHasTaskFilter : "#deposit-filter-has-task",
            selectListingTypeFilter : '#listingTypeId',
            selectPropertyType : '#propertyTypeIds',
            btnFindFilter : '#deposit-filter-btn-find',
            btnClearFilter: '#deposit-filter-btn-clear',
            tableList : '#tb-deposit-manager'
        },
        table : null,
        stateSort : false,
        filter : {
            "listingId": null,
            "hasTask": 1,
            "statusId":4,
            "createdDateFrom":null,
            "createdDateTo":null,
            "listingTypeId": null,
            "propertyTypeIds": null,


        },
        stored : {
            order : null
        },
        getFilter : function () {

            depositTable.filter.createdDateFrom = $.trim($(depositTable.ids.txtDateFromFilter + " input").val()) ? moment($.trim($(depositTable.ids.txtDateFromFilter + " input").val()), dateFormat).unix() * 1000 : null;
            depositTable.filter.createdDateTo = $.trim($(depositTable.ids.txtDateToFilter + " input").val()) ? moment($.trim($(depositTable.ids.txtDateToFilter + " input").val()), dateFormat).unix() * 1000 : null;

            depositTable.filter.listingId = isVal($(depositTable.ids.txtRlistingFilter).val()) ? ($(depositTable.ids.txtRlistingFilter).val()) : null;
            depositTable.filter.statusId = isVal($(depositTable.ids.selectStatusFilter).val()) ? ($(depositTable.ids.selectStatusFilter).val()) : 4;
            depositTable.filter.hasTask = isVal($(depositTable.ids.selectHasTaskFilter).val()) ? $(depositTable.ids.selectHasTaskFilter).val() : null;
            depositTable.filter.listingTypeId = isVal($(depositTable.ids.selectListingTypeFilter).val()) ? Number.parseInt($(depositTable.ids.selectListingTypeFilter).val()) : null;
            depositTable.filter.propertyTypeIds =  $(depositTable.ids.selectPropertyType).val() ? $(depositTable.ids.selectPropertyType).val().join(",") : null;
        },
        clearFilter : function () {
            $(depositTable.ids.txtDateFromFilter + " input").val('');
            $(depositTable.ids.txtDateToFilter + " input").val('');
            $(depositTable.ids.selectListingTypeFilter).val('').select2().trigger('change');
            $(depositTable.ids.txtRlistingFilter).val('');
            $(depositTable.ids.selectStatusFilter).val(4);
            $(depositTable.ids.selectHasTaskFilter).val(1);
            depositTable.getFilter();
        },
        loadTable : function () {
            var columns = [
                {
                    data: "listingId",
                    render: function (data, type, object) {
                        return "<a target='_blank' href='/pos/sa/detail/"+ object.listingId +"'>"+ object.listingId +"</a>";
                    },
                },
                {
                    data: 'price',
                    render: function (data, type, object) {
                        return object.formattedPrice;
                    }
                },
                {
                    data: 'ownerName',
                    render: function (data, type, object, meta) {
                        if([4, 5].indexOf(object.statusId) > -1 && hasValue(object.taskId) && !isAdmin) {
                            return object.ownerName + "<button class='btn label label-warning btn-sm btn-item-close-deal' style='float: right' data-row-index=" + meta.row +"><i class='fa fa-gavel'></i> Đặt cọc ...</button>";

                        } else {
                            return object.ownerName ;

                        }
                    }
                },
                {
                    data: 'createdDate',
                    render: function (data, type, object) {
                        if (hasValue(object.createdDate)) {
                            return moment(object.createdDate * 1000).format(dateFormat);
                        }
                        return '';
                    },
                },
                {
                    data: 'dealId',
                    render: function (data, type, object) {
                        return object.dealId;
                    }
                },
                {
                    data: 'baName',
                    render: function (data, type, object) {
                        return object.baName;
                    }
                },
                {
                    data: 'depositPrice',
                    render: function (data, type, object) {
                        return object.formattedDepositPrice;
                    }
                },
                {
                    data: 'depositDate',
                    render: function (data, type, object) {
                        if (hasValue(object.depositDate)) {
                            return moment(object.depositDate).format(dateFormat);
                        }
                        return '';
                    }
                },
                {
                    data: 'depositAddress',
                    render: function (data, type, object) {
                        return object.depositAddress;
                    }
                },
                {
                    data: 'listingTypeId',
                    class: 'listingTypeId',
                    render: function (data, type, object) {
                        return typeof (getNameListingType) !== "undefined" && getNameListingType(data) ? getNameListingType(data).sale.name : 'N/A';
                    }
                },
                {
                    data: 'propertyTypeId',
                    class: 'propertyTypeName',
                    render: function (data, type, object) {
                        return hasValue(object.propertyTypeName) ? object.propertyTypeName : 'N/A';
                    }
                },
                {
                    data: 'propertyTypeGroupName',
                    class: 'propertyTypeGroupName',
                    render: function (data, type, object) {
                        return hasValue(object.propertyTypeGroupName) ? object.propertyTypeGroupName : "N/A";
                    }
                },
                {
                    data: 'note',
                    render: function (data, type, object) {
                        return object.note;
                    }
                },
                {
                    data: 'statusId',
                    render: function (data, type, object) {
                        return object.statusName;
                    }
                }
            ];
            depositTable.table = $(depositTable.ids.tableList)
                .on('preInit.dt', function ( e, settings) {
                    depositTable.clearFilter();
                })
                .DataTable({
                    processing: false,
                    serverSide: true,
                    bSort: false,
                    ajax: {
                        url: API_SA.apiList.getDepositList,
                        type: "POST",
                        data: function (d) {
                            Object.assign(d, {
                                "sort":{
                                    "columnName": 'createdDate',
                                    "value": 'desc'
                                },
                                "listingId": depositTable.filter.listingId,
                                "hasTask": depositTable.filter.hasTask,
                                "statusId": depositTable.filter.statusId,
                                "createdDateFrom":depositTable.filter.createdDateFrom,
                                "createdDateTo":depositTable.filter.createdDateTo,
                                "listingTypeId" : depositTable.filter.listingTypeId,
                                "propertyTypeIds" : depositTable.filter.propertyTypeIds,
                                stateSort : depositTable.stateSort
                            });
                            return d;
                        }
                    },
                    autoWidth: true,
                    deferRender: false,
                    lengthChange: false,
                    paging: true,
                    searching: false,
                    ordering: true,
                    order: [[ 3, "desc" ]],
                    language: DatatableHelper.languages.vn,
                    columns: columns
                })
                .off("processing.dt")
                .on("processing.dt", function (e, settings, processing) {
                    if (processing) {
                        showPropzyLoading();
                    } else {
                        hidePropzyLoading();
                    }
                })
                .on( 'order.dt', function (e, settings) {

                    if (hasValue(depositTable.stored.order)) {
                        if ((depositTable.stored.order.column != settings.oAjaxData.order[0].column) ||
                            (depositTable.stored.order.dir != settings.oAjaxData.order[0].dir)) {
                            depositTable.stateSort = true;
                        }
                        depositTable.stored.order = settings.oAjaxData.order[0];
                    }
                    depositTable.stored.order = settings.oAjaxData.order[0];
                    settings.oAjaxData.stateSort = depositTable.stateSort;
                })
                .on("xhr.dt", function (e, settings, json, xhr) {
                    hidePropzyLoading();
                })
                .on( 'error.dt', function ( e, settings, techNote, message ) {
                    hidePropzyLoading();
                });
        }
    };


    _this.init = function () {
        loadApi();
        setEvent();
        depositTable.loadTable();
    };
    function loadApi() {

        API_SA.getDepositStatusList().done(function (response) {
            if (response.result) {
                var options = $.map(response.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.id +'" selected>' + val.name + '</option>';
                    }
                    return '<option value="'+ val.id +'">' + val.name + '</option>';
                });
                $(depositTable.ids.selectStatusFilter).html(options.join("")).trigger('change');
            }
        });
        API_SA.getDepositRejectReason().done(function (response) {
            if (response.result) {
                var options = $.map(response.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.reasonId +'" selected>' + val.reasonName + '</option>';
                    }
                    return '<option value="'+ val.reasonId +'">' + val.reasonName + '</option>';
                });
                $(depositModal.ids.selectRejectReason).html(options.join("")).trigger('change');
            }
        });
        axios.get(POS_APIS_SA.get('GET_TRANSACTION_CENTER'), {})
            .then(response => {
                const responseBody = response.data;
                const options = $.map(responseBody.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.id +'" data-address="' + val.address +'" selected>' + val.name + '</option>';
                    }
                    return '<option value="'+ val.id +'" data-address="' + val.address +'">' + val.name + '</option>';
                });
                $(depositModal.ids.selectTransactionMeetingPlace).html(options.join("")).trigger('change');
            }).
            catch(err => {
                console.error('can not load api transaction center');
        });
        __indexPromiseApi('GET_LISTING_TYPES');
        __indexPromiseApi('GET_PROPERTY_LIST_PREFIX');
    }
    function setEvent() {
        $('body').on('change', depositModal.ids.selectStatus, function (e) {
            $(depositModal.ids.acceptClass).hide();
            $(depositModal.ids.rejectClass).hide();
            $(depositModal.ids.changeTimeClass).hide();
            const status = parseInt($(this).val());
            switch (status) {
                case 1 : {
                    $(depositModal.ids.acceptClass).show();
                    break;
                }
                case 2 : {
                    $(depositModal.ids.rejectClass).show();
                    break;
                }
                case 3: {
                    $(depositModal.ids.changeTimeClass).show();
                    $(depositModal.ids.selectTransactionMeetingPlace).select2('val', 1).trigger('change');
                    break;
                }
            }
        });
        $('body').on('change', depositModal.ids.selectTransactionMeetingPlace, function (e) {
            $(depositModal.ids.txtMeetingPlace).hide();
            const data = $(this).select2('data');
            if(data && isArray(data)) {
                const address = data[0].element.dataset.address;
                if(address == -1) {
                    $(depositModal.ids.txtMeetingPlace).val("");
                    $(depositModal.ids.txtMeetingPlace).show();
                } else  {
                    $(depositModal.ids.txtMeetingPlace).val(address);
                }
            }
        });

        // call
        $('body').on('click', depositModal.ids.btnDepositCall, function (e) {
            depositModal.makeCall();
        });
        $('body').on('click', depositModal.ids.btnShowModalCall, function (e) {
            //depositModal.makeCall();
            $(depositModal.ids.modalDepositCall).modal({
                backdrop: 'static',
                keyboard: false
            });
        });
        $('body').on('click', '.btn-item-close-deal', function (e) {
            const row = $(this).data('row-index');
            const data = depositTable.table.rows(row).data()[0];
            console.log(data);
            depositModal.setInfoModal(data);
            $(depositModal.ids.modalDeposit).modal({
                backdrop: 'static',
                keyboard: false
            });
        });
        $('body').on('click', depositModal.ids.btnSendDeposit, function () {
            depositModal.saveDeposit();
        });

        $('body').on('click', depositTable.ids.btnFindFilter, function () {
            depositTable.getFilter();
            depositTable.table.ajax.reload();
        });
        $('body').on('click', depositTable.ids.btnClearFilter, function () {
            depositTable.clearFilter();
            depositTable.table.ajax.reload();
        });
        $(document).on('change', '.deal-form-deposit', function (e) {
            const index = Number.parseInt($(this).data('index'));
            let val = null;

            if($(this).is("input[type=checkbox]")) {
                if ($(this).is(':checked')) {
                    val = 1;
                    $('.deal-form-input-deposit[data-index="'+ index +'"]').css("display", "block");
                } else {
                    val = 0;
                    $('.deal-form-input-deposit[data-index="'+ index +'"]').css("display", "none");
                }
                depositModal.stored.dealForm[index].value = val;
            } else {
                val = $(this).val();
                depositModal.stored.dealForm[index].content = val;
            }
        });
        $(document).on('change', '.deal-form-input-deposit', function (e) {
            const index = Number.parseInt($(this).data('index'));
            const val = $(this).val();
            depositModal.stored.dealForm[index].content = val;
        });

        CommonPosAllPage.setGooglePlace(document.getElementById('deposit-modal-meeting-place'));

        $(depositModal.ids.txtMeetingDate).datepicker({
            format : "dd/mm/yyyy",
            language: "vi",
            daysOfWeekHighlighted: "0",
            todayHighlight: true,
            startDate : moment().format(dateFormat),
            beforeShowDay: function(date){
            }
        });
        $(depositTable.ids.txtDateFromFilter + ", " + depositTable.ids.txtDateToFilter).datepicker({
            format : "dd/mm/yyyy",
            language: "vi",
            daysOfWeekHighlighted: "0",
            todayHighlight: true,
        });
        $(depositTable.ids.selectStatusFilter).select2();

        $(depositModal.ids.txtMeetingTime + " input").timepicker({showMeridian: false});
        $(depositModal.ids.selectStatus).select2();
        $(depositModal.ids.selectRejectReason).select2();
        $(depositModal.ids.selectTransactionMeetingPlace).select2();
        $(document).off('change', '#listingTypeId').on('change', '#listingTypeId', function (e) {
            const data = Number.parseInt($(this).val());
            __indexPromiseApi('GET_PROPERTY_LIST_PREFIX', {listingTypeId : data});
        });
    }

    
}

$(document).ready(function () {
   (new SaDepositManager()).init();
});