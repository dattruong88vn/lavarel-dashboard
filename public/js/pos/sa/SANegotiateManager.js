function SaNegotiateManager() {
    var API_SA = new SAApi();
    var _this = this;
    var dateFormat = 'DD/MM/YYYY';
    var dateTimeFormat = 'DD/MM/YYYY HH:mm';

    var filter = {

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

    var negotiationModal = {
        ids : {
            modalNegotiation : "#negotiation-modal",
            modalNegotiationCall : "#negotiation-modal-show-phone",
            modalNegotiationResponse : "#negotiation-modal-show-response",
            contentCall : "#negotiation-modal-call-content",
            btnNegotiationCall : "#btn-negotiation-call",
            btnShowModalCall : "#negotiation-modal-call",
            txtRlistingId : "#negotiation-info-rlistingId",
            tableNegotiation : "#tb-modal-negotiation-child",
            selectResponseStatus : "#negotiation-response-status",
            txtResponsePrice : "#negotiation-response-price",
            txtResponseOwnerNote : "#negotiation-response-owner-note",
            txtResponseNote : "#negotiation-response-note",
            selectResponseReject : "#negotiation-response-reject",
            txtResponseRejectNote : "#negotiation-response-reject-note",
            selectResponsePending : "#negotiation-response-pending",
            txtResponsePendingNote: "#negotiation-response-pending-note",
            btnResponseSend : "#btn-negotiation-response-send"

        },
        table : null,
        dataRespone : {
            "negotiationId": null,
            "statusId": null,
            "negotiationPrice": null,
            "ownerNote": null,
            "note": null,
            "negotiationEventReason": null
            /*{ // bắt buộc khi statusId = 4 (hủy tin đăng)
                "reasonId":17,
                "reasonContent":"Thích thì hủy"
            }*/
        },
        clearForm : function() {
            $(negotiationModal.ids.selectResponseStatus).val(1).trigger('change');
            $(negotiationModal.ids.txtResponseOwnerNote).val("");
            $(negotiationModal.ids.txtResponseNote).val("");
            $(negotiationModal.ids.txtResponsePrice).val("");
            $(negotiationModal.ids.selectResponsePending).val(18).trigger("change");
            $(negotiationModal.ids.selectResponseReject).val(11).trigger("change");

            negotiationModal.dataRespone = {
                    "negotiationId": null,
                    "statusId": null,
                    "negotiationPrice": null,
                    "ownerNote": null,
                    "note": null,
                    "negotiationEventReason": null
                /*{ // bắt buộc khi statusId = 4 (hủy tin đăng)
                    "reasonId":17,
                    "reasonContent":"Thích thì hủy"
                }*/
            };
        },
        updateDataPost : function() {
            var status = isVal(parseInt($(negotiationModal.ids.selectResponseStatus).val())) ? parseInt($(negotiationModal.ids.selectResponseStatus).val()) : 1;
            switch (status) {
                case 1:

                    negotiationModal.dataRespone.ownerNote = $(negotiationModal.ids.txtResponseOwnerNote).val();
                    negotiationModal.dataRespone.note = $(negotiationModal.ids.txtResponseNote).val();
                    //dong y
                    break;
                case 2:
                    negotiationModal.dataRespone.negotiationPrice = $(negotiationModal.ids.txtResponsePrice).autoNumeric("get");
                    negotiationModal.dataRespone.ownerNote = $(negotiationModal.ids.txtResponseOwnerNote).val();
                    negotiationModal.dataRespone.note = $(negotiationModal.ids.txtResponseNote).val();
                    break;
                case 3:
                    negotiationModal.dataRespone.negotiationEventReason = {
                        reasonId : $(negotiationModal.ids.selectResponsePending).val(),
                        reasonContent : $(negotiationModal.ids.txtResponsePendingNote).val()
                    }
                    break;
                case 4:
                    negotiationModal.dataRespone.negotiationEventReason = {
                        reasonId : $(negotiationModal.ids.selectResponseReject).val(),
                        reasonContent : $(negotiationModal.ids.txtResponseRejectNote).val()
                    }
                    break;
            }


            negotiationModal.dataRespone.statusId = status;

        },
        validateData: function (data){
            var hasErr = {
                isErr : false,
                message : []
            }
            switch (data.statusId) {
                case 1:
                    break;
                case 2:
                    if (!isVal(data.negotiationPrice)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng nhập giá thương lượng</li>");
                    }
                    break;
                case 3:
                    if (!isVal(data.negotiationEventReason) || !isVal(data.negotiationEventReason.reasonId)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng lựa chọn lý do tạm ngưng</li>");
                    } else if (data.negotiationEventReason.reasonId == 19 && !isVal(data.negotiationEventReason.reasonContent)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng nhập ghi chú cho lý do tạm ngưng khác</li>");
                    }
                    break;
                case 4:
                    if (!isVal(data.negotiationEventReason) || !isVal(data.negotiationEventReason.reasonId)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng lựa chọn lý do hủyg</li>");
                    } else if (data.negotiationEventReason.reasonId == 13 && !isVal(data.negotiationEventReason.reasonContent)) {
                        hasErr.isErr = true;
                        hasErr.message.push("<li>Vui lòng nhập ghi chú cho lý do hủy khác</li>");
                    }
                    break;
            }
            return hasErr;
        },
        sendNegotiation : function () {
            negotiationModal.updateDataPost();
            var dataPost = negotiationModal.dataRespone;
            var err = negotiationModal.validateData(dataPost);
            if (!err.isErr) {
                showPropzyLoading();
                API_SA.sendNegotiationForm(dataPost)
                    .done(function (response) {
                        hidePropzyLoading();
                        if (response.result) {
                            $(negotiationModal.ids.modalNegotiationResponse).modal("hide");
                            negotiationModal.table.ajax.reload();
                        } else {
                            showPropzyAlert(response.message);
                        }
                    }).fail(function( jqXHR, textStatus ) {
                        hidePropzyLoading();
                        showPropzyAlert("Lỗi hệ thống! Xin vui lòng liên hệ system admin để hỗ trợ!");
                    });
            } else {
                showPropzyAlert(err.message.join(" </br>"));
            }

        },
        showHideMakeCall : function (show) {
            if(show === true) {
                $(negotiationModal.ids.btnShowModalCall).prop('disabled', false);
            } else {
                $(negotiationModal.ids.btnShowModalCall).prop('disabled', true);
            }
        },
        makeCall : function (reciverData) {
            negotiationModal.showHideMakeCall(false);
            $(negotiationModal.ids.modalNegotiationCall).modal('hide');
            const phone = ($(negotiationModal.ids.contentCall + " input[type='radio']:checked").val());
            const rlistingId = parseInt($(negotiationModal.ids.modalNegotiation + " " + negotiationModal.ids.txtRlistingId).val());
            const _params = {
                rlistingId: rlistingId,
                phoneNumber: phone,
                department:2,
                id:rlistingId,
                onCallEnded: function (callInfo) {
                    negotiationModal.showHideMakeCall(true);
                    const _callInfo = {
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
        setInfoModal : function (data) {
            const dataPost = $.extend(true, {}, negotiationTable.dataPost);
            dataPost.rListingId = data.rListingId;
            dataPost.hasTask = 1;


            const rlistingId = isVal(data.rListingId) ? data.rListingId : ""
            const countHistory = isVal(data.countHistory) ? data.countHistory : "N/A";
            const ownerName = isVal(data.ownerName) && data.ownerName ? data.ownerName : 'N/A';
            const classifyName = isVal(data.classifyName) && data.classifyName ? data.classifyName : 'N/A';
            const statusName = isVal(data.statusName) && data.statusName ? data.statusName : 'N/A';
            const phone = isVal(data.phone) && data.phone ? data.phone : '';
            const formatedCurrentPrice = isVal(data.formatedCurrentPrice) ? data.formatedCurrentPrice : 'N/A';


            $(negotiationModal.ids.modalNegotiation + " " + negotiationModal.ids.txtRlistingId).val(rlistingId);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-link-detail").attr("href", '/pos/sa/detail/'+ rlistingId);

            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-owner-name").html(ownerName);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-owner-type-name").html(classifyName);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-owner-status").html(statusName);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-owner-name").html(ownerName);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-owner-phone").html(phone);
            $(negotiationModal.ids.modalNegotiation + " #negotiation-info-price").html(formatedCurrentPrice);

            let html = '<div class="row form-group">' +
                '<div class="col-md-12">' +
                '<label>Số chính: </label>' +
                '<div class="row">' +
                '<div class="col-md-12">' +
                '<label class="radio control-label col-xs-12">' +
                '<input type="radio" value="'+phone+'" checked="checked" name="negotiation-phone">' +
                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ phone +
                '</label>'+
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            if (isVal(data.subPhones)) {

                let subphones = data.subPhones.split(',');
                subphones = $.map(subphones, function (i) {
                    return '<div class="row">' +
                        '<div class="col-md-12">' +
                        '<label class="radio control-label">' +
                        '<input type="radio" value="'+i+'" name="negotiation-phone">' +
                        '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>'+ i +
                        '</label>' +
                        '</div>' +
                        '</div>';
                });
                html += '<div class="row form-group negotiation-owner-sub-phone">' +
                    '<div class="col-md-12">' +
                    '<label>Số phụ:  </label>' + subphones.join("") +
                    '</div>' +
                    '</div>';
            }

            // load negotiation lastes

            axios.get(POS_APIS_SA.get("GET_NEGOTIATION_LATEST"), {
                params : {
                    rlistingId : rlistingId
                }
            }).then(response => {
                const responseBody = response.data;
                $("#negotiation-info-price-latest").html(responseBody.data.negotiationPriceFormat);
                $("#negotiation-info-time-latest").html( moment(responseBody.data.updatedDate).format(dateTimeFormat));
            }).catch(err => {
                $("#negotiation-info-price-latest").html("");
                $("#negotiation-info-time-latest").html("");
            });

            // load list negotiation
            $(negotiationModal.ids.modalNegotiationCall + " " + negotiationModal.ids.contentCall).html();
            $(negotiationModal.ids.modalNegotiationCall + " " + negotiationModal.ids.contentCall).html(html);
            try {
                negotiationModal.table.destroy();
                $(negotiationModal.ids.tableNegotiation).find("tbody").html("");
            } catch (e) {
                console.info("Sa negotiation call destroy table");
            }

            const columns = [
                {
                    data: 'dealId',
                    render: function (data, type, object) {
                        return object.dealId;
                    }
                },
                {
                    data: 'negotiationPrice',
                    render: function (data, type, object) {
                        return hasValue(object.formatedNegotiationPrice) ? object.formatedNegotiationPrice : 'N/A';
                    }
                },
                {
                    data: 'lastNegotiationPrice',
                    render: function (data, type, object) {
                        return hasValue(object.formatedLastNegotiationPrice) ? object.formatedLastNegotiationPrice : 'N/A';
                    }
                },
                {
                    data: 'createdDate',
                    render: function (data, type, object) {
                        if (hasValue(object.createdDate)) {
                            return moment(object.createdDate).format(dateTimeFormat);
                        }
                        return '';
                    }
                },
                {
                    data: 'crmName',
                    render: function (data, type, object) {
                        return hasValue(object.crmName) ? object.crmName : 'N/A';
                    }
                },
                {
                    data: 'buyerNote',
                    render: function (data, type, object) {
                        return hasValue(object.buyerNote) ? object.buyerNote : '';
                    }
                },
                {
                    data: 'note',
                    render: function (data, type, object) {
                        return hasValue(object.note) ? object.note : '';
                    }
                },
                {
                    data: 'countHistory',
                    render: function (data, type, object) {
                        if (hasValue(object.countHistory)) {
                            return "<a href='/pos/sa/negotiation-history-manager/"+ object.negotiationId + "-" + object. dealId +"' target='_blank'> " + object.countHistory + "</a>";
                        } else {
                            return 'N/A';
                        }
                    }
                },
                {
                    data: 'actionResponse',
                    render: function (data, type, object, meta) {
                        return "<i class='fa fa-paper-plane negotiation-items-response' data-row-index=" + meta.row +"></i>";
                    }
                }
            ];

            negotiationModal.table = $(negotiationModal.ids.tableNegotiation)
                .DataTable({
                    processing: false,
                    serverSide: true,
                    bSort: false,
                    ajax: {
                        url: API_SA.apiList.getNegotiationList,
                        type: "POST",
                        data: dataPost
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
                .on("processing.dt", function (e, settings, processing) {})
                .on("xhr.dt", function (e, settings, json, xhr) {});



            $(negotiationModal.ids.modalNegotiation).modal({
                backdrop: 'static',
                keyboard: false
            });
        },
        responseNegotiation : function (data) {
            negotiationModal.clearForm();
            negotiationModal.dataRespone.negotiationId = data.negotiationId;
            $(negotiationModal.ids.modalNegotiationResponse).modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    }
    var negotiationTable = {
        ids : {
            tableNegoList : "#tb-negotiation-manager",
            txtDateFromFilter : "#negotiation-filter-date-from",
            txtDateToFilter : "#negotiation-filter-date-to",
            txtRlistingFilter : '#negotiation-filter-rlistingId',
            selectStatusFilter : '#negotiation-filter-status',
            selectHasTaskFilter : "#negotiation-filter-has-task",
            selectListingTypeFilter : '#listingTypeId',
            selectPropertyType : '#propertyTypeIds',
            btnFindFilter : '#negotiation-filter-btn-find',
            btnClearFilter: '#negotiation-filter-btn-clear',
        },
        dataPost : {
            "rListingId": null,
            "statusId": 2,
            "createdDateFrom": null,
            "createdDateTo":  null,
            "hasTask" : 1,
            "listingTypeId": null,
            "propertyTypeIds": null,
            "sort":{
                "columnName":"updatedDate",
                "value":"desc"
            }
        },
        updateData : function() {
            var dateFrom = $.trim($(negotiationTable.ids.txtDateFromFilter + " input").val());
            var dateTo = $.trim($(negotiationTable.ids.txtDateToFilter + " input").val());

            var rlistingId = $(negotiationTable.ids.txtRlistingFilter).val();
            var statusId = Number.parseInt($(negotiationTable.ids.selectStatusFilter).val());

            negotiationTable.dataPost.rListingId = rlistingId;
            negotiationTable.dataPost.statusId = statusId;

            negotiationTable.dataPost.createdDateFrom = hasValue(dateFrom) ? moment(dateFrom, dateFormat).unix() * 1000 : null;
            negotiationTable.dataPost.createdDateTo = hasValue(dateFrom) ? moment(dateTo, dateFormat).unix() * 1000 : null;

            if([2, 3].indexOf(statusId) > -1 && !currentUser.departments[0].isGroupAdmin) {
                negotiationTable.dataPost.hasTask = Number.parseInt($(negotiationTable.ids.selectHasTaskFilter).val());
            } else {
                negotiationTable.dataPost.hasTask = null;
            }
            negotiationTable.dataPost.listingTypeId = isVal($(negotiationTable.ids.selectListingTypeFilter).val()) ? Number.parseInt($(negotiationTable.ids.selectListingTypeFilter).val()) : null;
            negotiationTable.dataPost.propertyTypeIds =  $(negotiationTable.ids.selectPropertyType).val() ? $(negotiationTable.ids.selectPropertyType).val().join(",") : null;

        },
        clearFilter : function () {
            $(negotiationTable.ids.txtDateFromFilter + " input").val('');
            $(negotiationTable.ids.txtDateToFilter + " input").val('');
            $(negotiationTable.ids.txtRlistingFilter).val('');
            $(negotiationTable.ids.selectStatusFilter).val(2).trigger('change');
            $(negotiationTable.ids.selectHasTaskFilter).val(1).trigger('change');
            $(negotiationTable.ids.selectListingTypeFilter).val('').select2().trigger('change');
            negotiationTable.updateData();

        },
        table : null,
        loadTable : function () {
            var columns = [
                {
                    data: 'rListingId',
                    render: function (data, type, object) {
                        return "<a href='/pos/sa/detail/"+ object.rListingId + "' target='_blank'>"+ object.rListingId +"</a>";
                    }
                },
                {
                    data: 'ownerName',
                    render: function (data, type, object, meta) {
                        let html = object.ownerName;
                        if ([2, 3].indexOf(object.statusId) > -1 && hasValue(object.taskId) && !currentUser.departments[0].isGroupAdmin) {
                            html += "<i class='fa fa-comments btn-fa-circle btn-fa-circle-pink btn-item-open-negotiation' style='float: right' data-row-index=" + meta.row +"></i>";
                        }
                        return html;
                    }
                },
                {
                    data: 'currentPrice',
                    render: function (data, type, object) {
                        return object.formatedCurrentPrice;
                    }
                },
                {
                    data: 'negotiationPrice',
                    render: function (data, type, object) {
                        return object.formatedNegotiationPrice;
                    }
                },
                {
                    data: 'createdDate',
                    render: function (data, type, object) {
                        if (hasValue(object.createdDate)) {
                            return moment(object.createdDate).format(dateTimeFormat);
                        }
                        return '';

                    }
                },
                {
                    data: 'crmName',
                    render: function (data, type, object) {
                        return hasValue(object.crmName) ? object.crmName : 'N/A';
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
                    data: 'propertyTypeGroupName',
                    class: 'propertyTypeGroupName',
                    render: function (data, type, object) {
                        return hasValue(object.propertyTypeGroupName) ? object.propertyTypeGroupName : "N/A";
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
                    data: 'statusId',
                    render: function (data, type, object) {
                        return hasValue(object.statusName) ? object.statusName : 'N/A';
                    }
                },
                {
                    data: 'countHistory',
                    render: function (data, type, object) {
                        if (hasValue(object.countHistory)) {
                            return "<a href='/pos/sa/negotiation-history-manager/"+ object.negotiationId + "-" + object. dealId +"' target='_blank'> " + object.countHistory + "</a>";
                        } else {
                            return 'N/A';
                        }
                    }
                }
            ];
            negotiationTable.table = $(negotiationTable.ids.tableNegoList)
                .DataTable({
                    processing: false,
                    serverSide: true,
                    bSort: false,
                    ajax: {
                        url: API_SA.apiList.getNegotiationList,
                        type: "POST",
                        data: function (d) {
                            Object.assign(d, negotiationTable.dataPost);
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
                });
        }
    }
    _this.init = function () {
        loadApi();
        setvent();
        negotiationTable.loadTable();
    };
    _this.table = function () {
        return this.table;
    };

    function loadApi() {
        //
        API_SA.getNegotiationRejectReason().done(function (response) {
            if (response.result) {
                var options = $.map(response.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.reasonId +'" selected>' + val.reasonName + '</option>';
                    }
                    return '<option value="'+ val.reasonId +'">' + val.reasonName + '</option>';
                });
                $(negotiationModal.ids.selectResponseReject).html(options);
            }
        });
        API_SA.getNegotiationPendingReason().done(function (response) {
            if (response.result) {

                var options = $.map(response.data, function (val, i) {
                    if(i === 0) {
                        return '<option value="'+ val.reasonId +'" selected>' + val.reasonName + '</option>';
                    }
                    return '<option value="'+ val.reasonId +'">' + val.reasonName + '</option>';
                });
                $(negotiationModal.ids.selectResponsePending).html(options);
            }
        });
        __indexPromiseApi('GET_LISTING_TYPES');
        __indexPromiseApi('GET_PROPERTY_LIST_PREFIX');
    }

    function setvent() {
        $('body').on('change', negotiationModal.ids.selectResponseStatus, function () {
            $("#negotiation-response-price-wrapper").hide();
            $("#negotiation-response-owner-note-wrapper").hide();
            $("#negotiation-response-note-wrapper").hide();
            $("#negotiation-response-reject-wrapper").hide();
            $("#negotiation-response-reject-note-wrapper").hide();
            $("#negotiation-response-pending-wrapper").hide();
            $("#negotiation-response-pending-note-wrapper").hide();
            var status = parseInt($(this).val());
            switch (status) {
                case 1:
                    $("#negotiation-response-owner-note-wrapper").show();
                    $("#negotiation-response-note-wrapper").show();
                    // dong y
                    break;
                case 2:
                    $("#negotiation-response-price-wrapper").show();
                    $("#negotiation-response-owner-note-wrapper").show();
                    $("#negotiation-response-note-wrapper").show();
                    // thuong luong
                    break;
                case 3:
                    $("#negotiation-response-pending-wrapper").show();
                    // tam hoan
                    break;
                case 4:
                    $("#negotiation-response-reject-wrapper").show();
                    // huy
                    break;
            }
        });
        $('body').on('change', negotiationModal.ids.selectResponseReject, function () {
            $("#negotiation-response-reject-note-wrapper").hide();
            var reasion = parseInt($(this).val());
            if (reasion == 17) {
                $("#negotiation-response-reject-note-wrapper").show();
            }

        });
        $('body').on('change', negotiationModal.ids.selectResponsePending, function () {
            $("#negotiation-response-pending-note-wrapper").hide();
            var reasion = parseInt($(this).val());
            if (reasion == 19) {
                $("#negotiation-response-pending-note-wrapper").show();
            }

        });

        $('body').on('click', negotiationModal.ids.btnResponseSend, function () {
            negotiationModal.sendNegotiation();
        });



        $('body').on('click', '.btn-item-open-negotiation', function () {
            const row = $(this).data('row-index');
            const data = negotiationTable.table.rows(row).data()[0];
            negotiationModal.setInfoModal(data);

        });
        $('body').on('click', negotiationModal.ids.btnNegotiationCall, function (e) {
            negotiationModal.makeCall();
        });
        $('body').on('click', negotiationModal.ids.btnShowModalCall, function (e) {
            //depositModal.makeCall();
            $(negotiationModal.ids.modalNegotiationCall).modal({
                backdrop: 'static',
                keyboard: false
            });
        });
        $('body').on('click', '.negotiation-items-response', function () {
            const row = $(this).data('row-index');
            const data = negotiationModal.table.rows(row).data()[0];
            negotiationModal.responseNegotiation(data);
        });

        $('body').on('click', negotiationTable.ids.btnFindFilter, function () {
            negotiationTable.updateData();
            negotiationTable.table.ajax.reload();
        });
        $('body').on('click', negotiationTable.ids.btnClearFilter, function () {
            negotiationTable.clearFilter();
            negotiationTable.table.ajax.reload();
        });
        $(negotiationModal.ids.modalNegotiation).on('hidden.bs.modal', function(e) {
            negotiationTable.updateData();
            negotiationTable.table.ajax.reload();
        });
        $(negotiationTable.ids.txtDateFromFilter + ", " + negotiationTable.ids.txtDateToFilter).datepicker({
            format : "dd/mm/yyyy",
            language: "vi",
            daysOfWeekHighlighted: "0",
            todayHighlight: true,
        });
        $('body').on('change', negotiationTable.ids.selectStatusFilter, function () {
            const id = Number.parseInt($(this).select2('data')[0].id);
            if ([2, 3].indexOf(id) > -1) {
                $(negotiationTable.ids.selectHasTaskFilter).select2('val', 1);
                $(negotiationTable.ids.selectHasTaskFilter).prop('disabled', false);
            } else {
                $(negotiationTable.ids.selectHasTaskFilter).select2('val', 0);
                $(negotiationTable.ids.selectHasTaskFilter).prop('disabled', true);
            }
        });

        $(negotiationModal.ids.txtResponsePrice).autoNumeric('init', {mDec: 0});
        $(negotiationTable.ids.selectStatusFilter).select2();
        $(negotiationTable.ids.selectHasTaskFilter).select2();
        $(document).off('change', '#listingTypeId').on('change', '#listingTypeId', function (e) {
            const data = Number.parseInt($(this).val());
            __indexPromiseApi('GET_PROPERTY_LIST_PREFIX', {listingTypeId : data});
        });

        //$(negotiationModal.ids.selectResponseStatus).select2();
        //$(negotiationModal.ids.selectResponseReject).select2();
        //$(negotiationModal.ids.selectResponsePending).select2();

    }


    
}

$(document).ready(function () {
    Window.dealNegotiation = new SaNegotiateManager();
    Window.dealNegotiation.init();
});