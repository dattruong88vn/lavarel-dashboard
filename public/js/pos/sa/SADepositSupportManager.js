let __depositSupportManagerVariables = {
    ids : {
        tableId : 'tb-deposit-support-manager',
        tableCancelId : 'tb-deposit-cancel-manager',
        modalId : 'deposit-support-modal',
        modalCancelId : 'deposit-cancel-modal',
        filterTaskId : 'taskId',
        filterDateFrom: 'date-range-from',
        filterDateTo : 'date-range-to',
        filterListingTypeFilter : '#listingTypeId',
        filterPropertyType : '#propertyTypeIds',
        filterBtnFilter : 'btn-filter',
        filterBtnClear : 'btn-clear'
    },
    stored: {

    },
    filter : {
        taskId : null,
        scheduleTimeFrom : null,
        scheduleTimeTo : null,
        listingTypeId: null,
        propertyTypeIds: null,
    },
    dateTimeFormat : 'DD/MM/YYYY HH:mm'
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

class SaDepositSupportManager {
    constructor() {
        this._table = null;
        this._tableCancel = null;
        this._api = POS_APIS_SA;
        this.API_SA = new SAApi();
        this.loadApi();
        this.loadTable();
        this.bindEvent();

    }

    loadApi() {
        axios.get(POS_APIS_SA.get('GET_DEPOSIT_REJECT_REASON'), {})
            .then(response => {
                const responseBody = response.data;
                const options = $.map(responseBody.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.reasonId +'" selected>' + val.reasonName + '</option>';
                    }
                    return '<option value="'+ val.reasonId +'">' + val.reasonName + '</option>';
                });
                $('#deposit-modal-reject-reason').html(options.join("")).trigger('change');
            }).
        catch(err => {
            console.error('can not load api transaction center');
        });
        
        __indexPromiseApi('GET_LISTING_TYPES');
        __indexPromiseApi('GET_PROPERTY_LIST_PREFIX');
    }

    setFilter() {
        const taskId = $('.' + __depositSupportManagerVariables.ids.filterTaskId).val();
        const scheduleTimeFrom = $('.' + __depositSupportManagerVariables.ids.filterDateFrom).val();
        const scheduleTimeTo = $('.' + __depositSupportManagerVariables.ids.filterDateTo).val();
        __depositSupportManagerVariables.filter = {
            taskId : taskId ? taskId : null,
            scheduleTimeFrom : scheduleTimeFrom ? moment(scheduleTimeFrom,  'DD/MM/YYYY').unix() * 1000 : null,
            scheduleTimeTo : scheduleTimeTo ? moment(scheduleTimeTo,  'DD/MM/YYYY').unix() * 1000 : null,
            listingTypeId : isVal($(__depositSupportManagerVariables.ids.filterListingTypeFilter).val()) ? Number.parseInt($(__depositSupportManagerVariables.ids.filterListingTypeFilter).val()) : null,
            propertyTypeIds : $(__depositSupportManagerVariables.ids.filterPropertyType).val() ? $(__depositSupportManagerVariables.ids.filterPropertyType).val().join(",") : null
        };
    }
    clearFilter() {
        $('.' + __depositSupportManagerVariables.ids.filterTaskId).val('');
        $('.' + __depositSupportManagerVariables.ids.filterDateFrom).datepicker("setDate", '');
        $('.' + __depositSupportManagerVariables.ids.filterDateTo).datepicker("setDate", '');
        $(__depositSupportManagerVariables.ids.filterListingTypeFilter).val('').select2().trigger('change');
        this.setFilter();
    }
    bindEvent() {
        const that = this;
        $(document).on('click', '.btn-item-done-deposit-support', function (e) {
            const row = $(this).data('row-index');
            const data = that._table.rows(row).data()[0];
            /*const data = $(this).data('object');
            ModalConfirm.showModal({
                message: "Bạn có chắc muốn hoàn tất hỗ trợ khách hàng này ?",
                onYes: function (modal) {
                    modal.modal("hide");
                    that.setDepositTaskDone(data);
                }
            });*/
            $('#' +__depositSupportManagerVariables.ids.modalId).modal({
                backdrop: 'static',
                keyboard: false
            });
            __depositSupportManagerVariables.stored.rowActive = data;
            that.setInfoModal(data);
        });
        $(document).on('click', '.btn-item-done-deposit-cancel', function (e) {
            const row = $(this).data('row-index');
            const data = that._tableCancel.rows(row).data()[0];
            $('#' +__depositSupportManagerVariables.ids.modalCancelId).modal({
                backdrop: 'static',
                keyboard: false
            });
            __depositSupportManagerVariables.stored.rowActive = data;
            that.setInfoModalCancel(data);
        });

        $(document).on('click', '#btn-filter', function (e) {
            that.setFilter();
            that._table.ajax.reload();
            that._tableCancel.ajax.reload();
        });
        $(document).on('click', '#btn-clear', function (e) {
            that.clearFilter();
            that._table.ajax.reload();
            that._tableCancel.ajax.reload();
        });

        $(document).on('click', '#btn-save-deposit', function (e) {
            that.setDepositSupport();
        });

        $(document).on('click', '#btn-update-task-deposit-cancel', function (e) {
            that.setDepositTaskDone({
                tab : 2,
                taskId : __depositSupportManagerVariables.stored.rowActive.taskId,
            });
        });

        $(document).on('change', '#deposit-modal-status', function (e) {
            const data = $(this).val();
            $(".deposit-modal-reject-wrapper").hide();
            $(".deposit-modal-note").hide();
            if (data == 2) {
                $(".deposit-modal-reject-wrapper").show();
            }
        });
        $(document).on('change', '#deposit-modal-reject-reason', function (e) {
            const data = $(this).val();
            $(".deposit-modal-note").hide();
            if (data == 20) {
                $(".deposit-modal-note").show();
            }
        });
        $(document).on('click', '#nav-deposit-support', function (e) {
            $('.' + __depositSupportManagerVariables.ids.filterDateFrom).prop('disabled', false);
            $('.' + __depositSupportManagerVariables.ids.filterDateTo).prop('disabled', false);
            that.setFilter();
            that._table.ajax.reload();
        });
        $(document).on('click', '#nav-deposit-cancel', function (e) {
            $('.' + __depositSupportManagerVariables.ids.filterDateFrom).prop('disabled', true);
            $('.' + __depositSupportManagerVariables.ids.filterDateTo).prop('disabled', true);
            that.setFilter();
            that._tableCancel.ajax.reload();
        });


        $('body').on('click', "#btn-deposit-call", function (e) {
            that.makeCall();
        });
        $('body').on('click', ".deposit-modal-call", function (e) {
            //depositModal.makeCall();
            $('#deposit-modal-show-phone').modal({
                backdrop: 'static',
                keyboard: false
            });
        });
        $('.' + __depositSupportManagerVariables.ids.filterDateFrom).datepicker({ format: 'dd/mm/yyyy'});
        $('.' + __depositSupportManagerVariables.ids.filterDateTo).datepicker({ format: 'dd/mm/yyyy'});
        $(document).off('change', '#listingTypeId').on('change', '#listingTypeId', function (e) {
            const data = Number.parseInt($(this).val());
            __indexPromiseApi('GET_PROPERTY_LIST_PREFIX', {listingTypeId : data});
        });
    }

    setInfoModalCancel(data) {
        const owner = isVal(data.ownerName) ? data.ownerName : '';
        const phone = isVal(data.phone) ? data.phone : '';
        const price = isVal(data.formatedDepositPrice) ? data.formatedDepositPrice : '';
        const reasonName = isVal(data.reasonName) ? data.reasonName : '';
        const taskNote = isVal(data.taskNote) ? data.taskNote : '';
        $('#deposit-cancel-info-owner-name').html(owner);
        $('#deposit-cancel-info-owner-phone').html(phone);
        $('#deposit-cancel-info-price').html(price);
        $('#deposit-cancel-info-reason').html(reasonName);
        $('#deposit-cancel-modal-note').val(taskNote);

        // modal call;

        var html = '<div class="row form-group">' +
            '<div class="col-md-12">' +
            '<label>Số chính: </label>' +
            '<label class="radio control-label col-xs-12">' +
            '<input type="radio" value="'+ phone+'" checked="checked" name="deposit-phone">' +
            '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ phone +
            '               </label>'+
            '</div>' +
            '</div>';
        if(typeof data.subPhones === 'string'){
            data.subPhones = [data.subPhones];
        }
        if (isVal(data.subPhones)) {
            var subPhones = $.map(data.subPhones, function (i) {
                return '<label class="radio control-label col-xs-12">' +
                    '<input type="radio" value="'+i+'" name="deposit-phone">' +
                    '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ i +
                    '</label>';
            })
            html += '<div class="row form-group deposit-owner-sub-phone">' +
                '<div class="col-md-12">' +
                '<label>Số phụ:  </label>' + subPhones.join("") +
                '</div>' +
                '</div>';
        }


        $("#deposit-modal-show-phone #deposit-modal-call-content").html(html);
    }

    setInfoModal(data) {
        const owner = isVal(data.ownerName) ? data.ownerName : '';
        const phone = isVal(data.phone) ? data.phone : '';
        const price = isVal(data.formatedDepositPrice) ? data.formatedDepositPrice : '';
        const scheduleTime = isVal(data.scheduleTime) ? moment(data.scheduleTime).format(__depositSupportManagerVariables.dateTimeFormat) : '';
        const address = isVal(data.address) ? data.address : '';
        $('#deposit-info-owner-name').html(owner);
        $('#deposit-info-owner-phone').html(phone);
        $('#deposit-info-price').html(price);
        $('#deposit-info-time').html(scheduleTime);
        $('#deposit-info-place').html(address);
        $(".deposit-modal-reject-wrapper").val("");


        $("#deposit-modal-reject-reason").val(1).trigger('change');

        // modal call;

        var html = '<div class="row form-group">' +
            '<div class="col-md-12">' +
            '<label>Số chính: </label>' +
            '<label class="radio control-label col-xs-12">' +
            '<input type="radio" value="'+ phone+'" checked="checked" name="deposit-phone">' +
            '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ phone +
            '               </label>'+
            '</div>' +
            '</div>';
        if(typeof data.subPhones === 'string'){
            data.subPhones = [data.subPhones];
        }
        if (isVal(data.subPhones)) {
            var subPhones = $.map(data.subPhones, function (i) {
                return '<label class="radio control-label col-xs-12">' +
                    '<input type="radio" value="'+i+'" name="deposit-phone">' +
                    '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ i +
                    '</label>';
            })
            html += '<div class="row form-group deposit-owner-sub-phone">' +
                '<div class="col-md-12">' +
                '<label>Số phụ:  </label>' + subPhones.join("") +
                '</div>' +
                '</div>';
        }


        $("#deposit-modal-show-phone #deposit-modal-call-content").html(html);
    }
    makeCall(reciverData) {
        const that = this;
        that.showHideMakeCall(false);
        $("#deposit-modal-show-phone").modal('hide');
        var phone = ($("#deposit-modal-call-content" + " input[type='radio']:checked").val());
        var rlistingId = __depositSupportManagerVariables.stored.rowActive.rlistingID;
        var _params = {
            rlistingId: rlistingId,
            phoneNumber: phone,
            department:2,
            id:rlistingId,
            onCallEnded: function (callInfo) {
                that.showHideMakeCall(true);
                var _callInfo = {
                    duration: callInfo.duration,
                    phone: callInfo.number,
                    startedDate: callInfo.startTime,
                    endedDate: (hasValue(callInfo.endTime) ? callInfo.endTime : callInfo.startTime),
                    rlistingId: rlistingId,
                    propzyCallId: $("#propzyCallId").val() ? $("#propzyCallId").val() : null
                };

                that.API_SA.trackCall(_callInfo).done(function (response) {});
            },
            showLoading: false

        };
        CCall.makeCall(_params);
    }

    showHideMakeCall (show) {
        if(show === true) {
            $(".deposit-modal-call").prop('disabled', false);
        } else {
            $(".deposit-modal-call").prop('disabled', true);
        }
    }

    setDepositSupport() {

        const type = Number.parseInt($('#deposit-modal-status').val());
        let dataPost = {};
        if (type == 1) {
            dataPost = {
                type: 1,
                tab : 1,
                taskId : __depositSupportManagerVariables.stored.rowActive.taskId,
            };

            this.setDepositTaskDone(dataPost);
        } else if (type == 2) {
            dataPost = {
                reasonId : parseInt($("#deposit-modal-reject-reason").val()),
                type : 2,
                depositId :__depositSupportManagerVariables.stored.rowActive.depositID,
                note : $("#deposit-modal-note").val(),
            };
            this.setDepositTaskReject(dataPost);
        }

    }

    setDepositTaskReject(data) {
        const that = this;
        showPropzyLoading();
        this.API_SA.sendDepositForm(data)
            .done(function (response) {
                hidePropzyLoading();
                if(response.result) {
                    CommonPosAllPage.saMenuLeft();
                    $('#' +__depositSupportManagerVariables.ids.modalId).modal('hide');
                    that._table.ajax.reload();
                } else {
                    showPropzyAlert("Có lỗi xảy ra. Xin vui lòng liên hệ với ban quản trị");
                }
            })
            .fail(function( jqXHR, textStatus ) {
                hidePropzyLoading();
                showPropzyAlert("Có lỗi xảy ra. Xin vui lòng liên hệ với ban quản trị");
                console.error('Reload Page get deposit support : ' + err);
            });
    }

    setDepositTaskDone(data) {
        const that = this;
        showPropzyLoading();
        axios.post(that._api.get('SET_DEPOSIT_TASK_SUPPORT'), data)
            .then(response => {
                const dataBody = response.data;
                hidePropzyLoading();
                if(dataBody.result) {
                    CommonPosAllPage.saMenuLeft();
                    if (data.tab == 1) {
                        $('#' +__depositSupportManagerVariables.ids.modalId).modal('hide');
                        that._table.ajax.reload();
                    } else {
                        $('#' +__depositSupportManagerVariables.ids.modalCancelId).modal('hide');
                        that._tableCancel.ajax.reload();
                    }

                } else {
                    showPropzyAlert("Có lỗi xảy ra. Xin vui lòng liên hệ với ban quản trị");
                }
            })
            .catch(err=> {
                hidePropzyLoading();
                showPropzyAlert("Có lỗi xảy ra. Xin vui lòng liên hệ với ban quản trị");
                console.error('Reload Page get deposit support : ' + err);
            });
    }

    loadTable() {
        if (!document.getElementById(__depositSupportManagerVariables.ids.tableId)) {
            return false;
        }
        const that = this;
        const columns = [
            {
                data: "rlistingID",
                render: function (data, type, object) {
                    return "<a target='_blank' href='/pos/sa/detail/"+ object.rlistingID +"'>"+ object.rlistingID +"</a>";
                },
                //ordering : true
            },
            {
                data: "taskId",
                render: function (data, type, object) {
                    return object.taskId  ? object.taskId : 'N/A';
                },
                //ordering : true
            },
            {
                data: "depositID",
                render: function (data, type, object) {
                    return object.depositID  ? object.depositID : 'N/A';
                },
                //ordering : true
            },
            {
                data: "ownerName",
                render: function (data, type, object) {
                    return object.ownerName  ? object.ownerName : 'N/A';
                },
                //ordering : true
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof (getNameListingType) !== "undefined" && getNameListingType(data) ? getNameListingType(data).sale.name : 'N/A';
                }
            },
            {
                data: 'propertyTypeGroupName',
                class: 'propertyTypeGroupName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeGroupName) ? object.propertyTypeGroupName : 'N/A';
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
                data: "depositPrice",
                render: function (data, type, object) {
                    return object.formatedDepositPrice  ? object.formatedDepositPrice : 'N/A';
                },
                //ordering : true
            },
            {
                data: "scheduleTime",
                render: function (data, type, object) {
                    return object.scheduleTime  ? moment(object.scheduleTime).format('DD/MM/YYYY HH:mm') : 'N/A';
                },
                //ordering : true
            },
            {
                data: "address",
                render: function (data, type, object) {
                    return object.address  ? object.address : 'N/A';
                },
                //ordering : true
            },
            {
                data: "taskNote",
                render: function (data, type, object) {
                    return object.taskNote  ? object.taskNote : '';
                },
                //ordering : true
            },
            {
                data: "done",
                class: "text-center",
                render: function (data, type, object, meta) {
                    //return object.taskNote  ? object.taskNote : '';
                    return "<i class='fa fa-check btn-fa-circle btn-fa-circle-green btn-item-done-deposit-support' data-object="+ object.taskId +" data-row-index=" + meta.row +"></i>";
                },
                //ordering : true
            },

        ];

        const columnsCancel = [
            {
                data: "rlistingID",
                render: function (data, type, object) {
                    return "<a target='_blank' href='/pos/sa/detail/"+ object.rlistingID +"'>"+ object.rlistingID +"</a>";
                },
                //ordering : true
            },
            {
                data: "taskId",
                render: function (data, type, object) {
                    return object.taskId  ? object.taskId : 'N/A';
                },
                //ordering : true
            },
            {
                data: "depositID",
                render: function (data, type, object) {
                    return object.depositID  ? object.depositID : 'N/A';
                },
                //ordering : true
            },
            {
                data: "ownerName",
                render: function (data, type, object) {
                    return object.ownerName  ? object.ownerName : 'N/A';
                },
                //ordering : true
            },
            {
                data: 'listingTypeId',
                class: 'listingTypeId',
                render: function (data, type, object) {
                    return typeof (getNameListingType) !== "undefined" && getNameListingType(data) ? getNameListingType(data).sale.name : 'N/A';
                }
            },
            {
                data: 'propertyTypeGroupName',
                class: 'propertyTypeGroupName',
                render: function (data, type, object) {
                    return hasValue(object.propertyTypeGroupName) ? object.propertyTypeGroupName : 'N/A';
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
                data: "depositPrice",
                render: function (data, type, object) {
                    return object.formatedDepositPrice  ? object.formatedDepositPrice : 'N/A';
                },
                //ordering : true
            },
            {
                data: "taskNote",
                render: function (data, type, object) {
                    return object.taskNote  ? object.taskNote : '';
                },
                //ordering : true
            },
            {
                data: "done",
                class: "text-center",
                render: function (data, type, object, meta) {
                    //return object.taskNote  ? object.taskNote : '';
                    return "<i class='fa fa-check btn-fa-circle btn-fa-circle-green btn-item-done-deposit-cancel' data-object="+ object.taskId +" data-row-index=" + meta.row +"></i>";
                },
                //ordering : true
            },

        ];


        this._table = $('#' + __depositSupportManagerVariables.ids.tableId).on('preInit.dt', function ( e, settings) {
            //depositTable.clearFilter();
            })
            .DataTable({
                processing: false,
                serverSide: true,
                bSort: false,
                ajax: {
                    url: that._api.get('GET_DEPOSIT_TASK_SUPPORT'),
                    type: "POST",
                    data: function (d) {
                        Object.assign(d, __depositSupportManagerVariables.filter);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
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
            .on("xhr.dt", function (e, settings, json, xhr) {
                hidePropzyLoading();
            })
            .on( 'error.dt', function ( e, settings, techNote, message ) {
                hidePropzyLoading();
            });

        this._tableCancel = $('#' + __depositSupportManagerVariables.ids.tableCancelId).on('preInit.dt', function ( e, settings) {
            //depositTable.clearFilter();
        })
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading : false,
                bSort: false,
                ajax: {
                    url: that._api.get('GET_DEPOSIT_TASK_CANCEL'),
                    type: "POST",
                    data: function (d) {
                        Object.assign(d, __depositSupportManagerVariables.filter);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                language: DatatableHelper.languages.vn,
                columns: columnsCancel
            })
            .off("processing.dt")
            .on("processing.dt", function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on("xhr.dt", function (e, settings, json, xhr) {
                hidePropzyLoading();
            })
            .on( 'error.dt', function ( e, settings, techNote, message ) {
                hidePropzyLoading();
            });
    }
}



$(document).ready(function () {
   Window.depositSupport = new SaDepositSupportManager();
});