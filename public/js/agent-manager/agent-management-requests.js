
class AgentRequest {
    constructor(props) {
        this._API = {
            'get-source-list' : '/agent/get-source-list',
            'get-list-request' : '/agent-manager/get-list-request',
            'confirm-request' : '/agent/confirm-request-tpa'
        };
        this._STORED = {
            data: {},
            filter : {
                name : null,
                email : null,
                phone : null,
                sourceId : null,
                requestTypeId : null,
                fromDate : null,
                toDate : null,
                sort :{
                    columnName :"requestDate",
                    value :"desc"
                }

            },
            list: {
                sources : new Map(),
                requestTypes : new Map([
                    [40, {name : 'Yêu cầu hợp tác',  id :  40},],
                    [39, {name : 'Hủy hợp tác',  id :  39 }]
                ])
            },
            table : null,
            isTpa : false,
        };
        if (typeof (currentUser) != 'undefined' && currentUser.departments.length > 0) {
            currentUser.departments.forEach(it => {
                if (it.departmentId == 18) {
                    this._STORED.isTpa = true;
                }
            });
        }
        if (!this._STORED.isTpa) {
            throw `this page only use for tpa department`;
        }
        this.loadApi();
        this.initTable();
        this.events();
    }
    loadApi() {
        /*Promise.all([this.promiseApi('GET_DISTRICT', {cityId : 1}),
            this.promiseApi('GET_PROPERTY_TYPE', {listingTypeId : 1}),
            this.promiseApi('GET_PROPERTY_TYPE', {listingTypeId : 2}),])
            .then(() => {
                this.loadDataDetail();
                this.renderDistrictActive();
            });
        if (this._STORED.pageType == 'EDIT') {
            Promise.all([
                this.promiseApi('GET_TPA_REASON_CANCEL')])
                .then(() => {
                   //
                });
            this.renderStatus();
        }

        Promise.all([this.promiseApi('GET_SOURCE_LIST'),])
            .then(() => {
                this.renderSource();
            });*/
        Promise.all([this.promiseApi('GET_SOURCE_LIST'),])
            .then(() => {
                this.renderSource();
            });
        this.renderRequestType();

    }
    renderSource() {
        const data = [{
            id : 0,
            text : 'Tất cả'
        }];
        this._STORED.list.sources.forEach(it => {
            data.push({
                id : it.id,
                text : it.name
            });
        });
        $('#agent-request-source').html();
        $('#agent-request-source').select2({
            data : data
        });
    }
    renderRequestType() {
        const data = [{
            id : 0,
            text : 'Tất cả'
        }];
        this._STORED.list.requestTypes.forEach(it => {
            data.push({
                id : it.id,
                text : it.name
            });
        });
        $('#agent-request-type').html();
        $('#agent-request-type').select2({
            data : data
        });
    }
    async promiseApi(name, params = {}) {
        const that = this;
        let promise = null;
        switch (name) {
            case 'GET_SOURCE_LIST' : {
                let response = [];
                await $.ajax({
                    type: 'GET',
                    url: that._API["get-source-list"],
                    data: {},
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        response = xhr.data;
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                if (response.length > 0) {
                    const filter = response.filter(it=> it.type == 22);
                    if (filter.length > 0) {
                        filter[0].list.forEach(it => {
                            that._STORED.list.sources.set(it.id, it);
                        });
                    }

                }
                break;
            }
        }
    }
    initTable() {
        const that = this;
        const columns = [
            {
                data: 'name',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'emailAndSdt',
                render: function (data, type, object) {
                    let html = "";
                    html +=  "<p class=''>"+ (hasValue(object.email) ? object.email : "N/A")+"</p>";
                    html +=  "<p class='btn-phone-call-request'>"+ (hasValue(object.phone) ? object.phone : "N/A") +"<i class='fa fa-phone'>"+"</p>";
                    return html;
                }
            },
            {
                data: 'requestTypeName',
                render: function (data, type, object) {
                    let html = "";
                    if (object.requestTypeId == 39) {
                        html = data ? "<p style='color: #b22222'>"+data+"</p>" : "";
                    } else if (object.requestTypeId == 40) {
                        html = data ? "<p style='color: #138d90'>"+data+"</p>" : "";
                    } else {
                        html = data ? "<p>"+data+"</p>" : "";
                    }
                    return html;
                }
            },
            {
                data: 'sourceId',
                render: function (data, type, object) {
                    return object.sourceName ? object.sourceName : "N/a";
                }
            },
            {
                data: 'requestDate',
                render: function (data, type, object) {
                    return data ? moment.unix(data / 1000).format("DD/MM/YYYY HH:mm") : "";
                }
            },
            {
                data: 'action',
                render: function (data, type, object) {
                    let html = "";
                    html += "<label class='control-label checkbox'><i class='fa fa-check btn-fa-circle btn-fa-circle-success btn-set-request-agent' data-type='1'></i></label>"
                    html += "<label class='control-label checkbox'><i class='fa fa-trash btn-fa-circle btn-fa-circle-pink btn-set-request-agent' data-type='2'></i></label>"
                    return html;
                }
            },
            ];
        that._STORED.table = $('#tb-agent-request')
            .DataTable({
                processing: false,
                serverSide: true,
                //deferLoading : false,
                ajax: {
                    url: that._API['get-list-request'],
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, that._STORED.filter);
                        return d;
                    }
                },
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                // order: [[11, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: columns,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                settings.ajax.data = function (d) {
                    that._STORED.filter.sort.columnName =  settings.aoColumns[settings.aaSorting[0][0]].data;
                    that._STORED.filter.sort.value =  settings.aaSorting[0][1];
                    Object.assign(d, that._STORED.filter);
                    return d;
                };

                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on( 'draw.dt', function () {});
    }
    phoneCallAgent(phone) {
        $(".btn-phone-call-request").prop("disabled", true);

        if (phone) {
            const params = {
                phoneNumber : phone,
                showLoading : false,
                department:18,
                id:null,
                onCallEnded : (callInfo) => {
                    // get CCall info
                    $(".btn-phone-call-request").prop("disabled", false);
                    let dataTrack = {
                        duration: callInfo.duration,
                        phone: callInfo.number,
                        startedDate: callInfo.startTime * 1000,
                        endedDate: (hasValue(callInfo.endTime) ? callInfo.endTime : moment().unix()) * 1000,
                        statusId: callInfo.statusId,
                        recordLink: null,
                        department : 18,
                        propzyCallId: $("#propzyCallId").val() ? $("#propzyCallId").val() : null
                    };


                    // get link track call
                    CCall.getCallInfo({
                        callId: callInfo.id, callBack: function (res) {
                            if (isVal(res)) {
                                if (isVal(res.response)) {
                                    // _callInfo.recordLink = res.response["0"].Cdr.recording_file;
                                }
                            }
                            axios.post(POS_APIS_COMMON.get('WRITE_TRACK_CALL'), dataTrack).then(res => {

                            }).catch(re => {

                            });
                        }
                    });
                }
            };

            // call
            CCall.makeCall(params);
        } else {
            propzyNotifyAlert({type: "propzy-notify-danger", message : "Đã xảy ra lỗi. Không thể thực hiện cuộc gọi do số phone không tồn tại"});
        }
    }
    updateFilter() {
        let sourceId = $('#agent-request-source').val() && $('#agent-request-source').val() > 0 ? Number.parseInt($('#agent-request-source').val()) : null;
        let requestType = $('#agent-request-type').val() && $('#agent-request-type').val() > 0 ? Number.parseInt($('#agent-request-type').val()) : null;
        let startdate = $.trim($("#agent-request-date-from").val()) ? moment($("#agent-request-date-from").val(), 'DD/MM/YYYY').startOf('day').unix() * 1000: null;
        let enddate = $.trim($("#agent-request-date-to").val()) ? moment($("#agent-request-date-to").val(), 'DD/MM/YYYY').endOf('day').unix() * 1000: null;
        const data_send  = {
            name:  $.trim($('#agent-request-name').val()) ? $.trim($('#agent-request-name').val()) : null,
            email: $.trim($('#agent-request-email').val()) ? $.trim($('#agent-request-email').val()) : null,
            phone: $.trim($('#agent-request-phone').val()) ? $.trim($('#agent-request-phone').val()) : null,
            sourceId: sourceId,
            requestTypeId  : requestType,
            fromDate : startdate,
            toDate : enddate,
        };
       this._STORED.filter = Object.assign(this._STORED.filter, data_send);
    }
    clearFilter() {
        //todo clear filter
        const that = this;
        $('#agent-request-filter input').val('');
        $('#agent-request-filter select').val(0).select2();
    }
    reloadTable() {
        this.updateFilter();
        if (this._STORED.table) {
            this._STORED.table.ajax.reload();
        }
    }
    confirmRequest(data) {
        const that = this;
        let dataPost = {
            "requestId": null,
            "statusId": null
        };
        dataPost = Object.assign(dataPost, data);

        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: that._API['confirm-request'],
                data: dataPost,
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        propzyNotifyAlert({type: "propzy-notify-success", message : 'Xử lý yêu cầu thành công'});
                        that.reloadTable();
                    } else {
                        propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.message});
                    }

                },
                error: function (data) {
                    hidePropzyLoading();
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Đã có lỗi xảy ra. xin vui lòng thử lại'});
                    console.error(data);
                }
            }
        );

    }
    events () {
        const that = this;
        $("#agent-request-date-from").datepicker({format: "dd/mm/yyyy", autoclose: true});
        $("#agent-request-date-to").datepicker({format: "dd/mm/yyyy", autoclose: true});
        $('#agent-request-phone').phoneBasic();
        $(document).off('click', '#agent-request-search').on('click', '#agent-request-search', function (e) {
            e.preventDefault();
            that.reloadTable();
        });
        $(document).off('click', '#agent-request-clear-search').on('click', '#agent-request-clear-search', function (e) {
            e.preventDefault();
            that.clearFilter();
            that.reloadTable();
        });
        $(document).off('click', '.btn-phone-call-request').on('click', '.btn-phone-call-request', function (e) {
            e.preventDefault();
            const tr = $(this).closest('tr');
            const row = that._STORED.table.row( tr );
            const rowData = row.data();
            const phone = rowData.phone;
            that.phoneCallAgent(phone);
        });
        $(document).off('click', '.btn-set-request-agent').on('click', '.btn-set-request-agent', function (e) {
            e.preventDefault();
            const type = Number.parseInt($(this).data('type'));
            const tr = $(this).closest('tr');
            const row = that._STORED.table.row( tr );
            const rowData = row.data();
            if (type == 1) {
                ModalConfirm.showModal({
                    message: "Bạn muốn xác nhận yêu cầu này?",
                    onYes: function (modal) {
                        //send requset
                        that.confirmRequest({
                            requestId : rowData.requestId,
                            statusId : 20
                        });
                    }
                });
            } else {
                ModalConfirm.showModal({
                    message: "Bạn muốn hủy yêu cầu này?",
                    onYes: function (modal) {
                        //send requset
                        that.confirmRequest({
                            requestId : rowData.requestId,
                            statusId : 21
                        });
                    }
                });
            }
        });

    }

}

$(document).ready(function () {
    showPropzyLoading();
    Window.agentRequest = new AgentRequest();
    $(window).load(function () {
        hidePropzyLoading();
    });
});