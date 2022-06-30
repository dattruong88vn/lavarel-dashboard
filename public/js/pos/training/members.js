
const _localMember = {
    filter : {
        "sort" : {
            "columnName": "createdDate",
            "value" : "desc"
        },
        "statusId" : null,
        "contractStatus": null,
        "fromDate": null,
        "toDate": null,
        "courseIdList": null,
        "phone": null,
        "userTypeId" : null,
        "requestTypeId" : null,
    },
    stored : {
        courseIdInit : null,
        tabActive : 1,
        explain : false,
        status : 14,
        rowChange : {},
        memberCheck : new Map(),
        templateSendSMS : new Map([
            [
                1,
                {
                    "id" : 1,
                    "text" : "Mời tham dự khoá học",
                    "content" : "Mời Anh/Chị tới tham dự khóa học môi giới vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],
            [
                2,
                {
                    "id" : 2,
                    "text" : "Thay đổi khoá học",
                    "content" : "Khóa học của Anh/Chị đã được đổi lại vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],
            [
                3,
                {
                    "id" : 3,
                    "text" : "Tham gia hội thảo",
                    "content" : "Mời Anh/Chị tham gia buổi hội thảo hướng nghiệp môi giới mới vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],

        ]),
        templateSendNotify : new Map([
            [
                1,
                {
                    "id" : 1,
                    "text" : "Mời tham dự khoá học",
                    "content" : "Mời Anh/Chị tới tham dự khóa học môi giới vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],
            [
                2,
                {
                    "id" : 2,
                    "text" : "Thay đổi khoá học",
                    "content" : "Khóa học của Anh/Chị đã được đổi lại vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],
            [
                3,
                {
                    "id" : 3,
                    "text" : "Tham gia hội thảo",
                    "content" : "Mời Anh/Chị tham gia buổi hội thảo hướng nghiệp môi giới mới vào lúc 11h20 ngày 12/9/2018 tại 182 Lê Đại Hành"
                }

            ],

        ]),
    },
    columsTable : {
        member : [
            {
                data: 'check',
                render: function (data, type, object) {
                    let html = "";
                    const check = _localMember.stored.memberCheck.has(object.socialUid) ? "checked" : "";
                    html += '<label class="checkbox control-label tpa-member-check" style="clear: both; width: 100%;"><input  type="checkbox" value="" '+check+'><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label>';
                    if (object.userType == 4) {
                        // môi giới
                        html +=  '<label class="control-label checkbox" style="clear: both; width: 100%; margin-top: 5px;"><i class="fa fa-plus-circle td-control-detail" style="color : #3c8dbc; font-size: 22px "></i></label>';
                    };

                    return html;
                },
                orderable: false
            },
            {
                data: 'courseName',
                render: function (data, type, object) {
                    return data ? '<a href="javascript:void()" class="course-training">'+data+'</a>' : "";
                }
            },
            {
                data: 'name',
                class: 'member-agent-name',
                render: function (data, type, object) {
                    let html = "";
                    html += data ? data : "";
                    return html;
                }
            },
            {
                data: 'emailAndSdt',
                width : '150px',
                render: function (data, type, object) {
                    let html = "";
                    html +=  "<p class=''>"+ (hasValue(object.email) ? object.email : "N/A")+"</p>";
                    html +=  "<p class='btn-phone-call-agent'>"+ (hasValue(object.phone) ? object.phone : "N/A") +"<i class='fa fa-phone'>"+"</p>";
                    return html;
                },
                orderable: false
            },
            {
                data: 'userTypeName',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'startedDate',
                render: function (data, type, object) {
                    return data ? moment.unix(data / 1000).format("DD/MM/YYYY HH:mm") : "";
                }
            },
            {
                data: 'createdDate',
                render: function (data, type, object) {
                    return data ? moment.unix(data / 1000).format("DD/MM/YYYY HH:mm") : "";
                }
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    let html = "";
                    if (data) {
                        if (object.statusId == 13) {
                            html = data + "<i class='fa fa-edit btn-fa-circle btn-fa-circle-warning btn-change-status-member-training' style='float: right'>";
                        } else {
                            html = data;
                        }
                    }
                    return html;
                },
            },
            {
                data: 'score',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'contract',
                render: function (data, type, object) {
                    let contract = object.contractStatusName;
                    if (object.statusId == 14 && object.userType == 4) {
                        // hoàn thành && Agent
                        if (object.contractStatus == 18) {
                            // chưa ký
                            contract += '<div class="text-right" style=" float: right; display: inline-flex">';
                            contract += '<i class="fa fa-edit btn-fa-circle edit-contract-sign" style="margin-left: 5px" ></i>';
                            contract += '<i class="fa fa-trash btn-fa-circle btn-fa-circle-pink revert-to-owner" style="margin-left: 5px" ></i>';
                            contract += '</div>';
                        }
                    }
                    return contract;
                },
                orderable: false
            },
            {
                data: 'reason',
                render: function (data, type, object) {
                    return data ? data : "";
                },
                orderable: false
            },
        ],
        request : [
            {
                data: 'agentName',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'emailAndSdt',
                render: function (data, type, object) {
                    let html = "";
                    html +=  "<p class=''>"+ (hasValue(object.agentEmail) ? object.agentEmail : "N/A")+"</p>";
                    html +=  "<p class='btn-phone-call-agent-request'>"+ (hasValue(object.agentPhone) ? object.agentPhone : "N/A") +"<i class='fa fa-phone'>"+"</p>";
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
                data: 'requestDate',
                render: function (data, type, object) {
                    return data ? moment.unix(data / 1000).format("DD/MM/YYYY HH:mm") : "";
                }
            },
            {
                data: 'contractStatusName',
                render: function (data, type, object) {
                    return data ? data : "";
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
        ],
        modalListing : [
            {
                data: 'rlistingId',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    return data ? data : "";
                }
            },
            {
                data: 'price',
                render: function (data, type, object) {
                    return object.priceVnd ? object.priceVnd : "";
                }
            },
            {
                data: 'districtID',
                render: function (data, type, object) {
                    return object.districtName ? object.districtName : "";
                }
            },
            {
                data: 'commission',
                render: function (data, type, object) {
                    let html = "";
                    if (hasValue(object.commissionPrice)) {
                        html += object.commissionPriceVnd;
                    } else {
                        html += (hasValue(object.commissionFrom) ? object.commissionFrom : 0)+ " %";
                    }
                    return html;
                }
            },
            {
                data: 'statusId',
                render: function (data, type, object) {
                    return object.statusName ? object.statusName : "";
                }
            },
        ],
        modalLead : [
            {
                data: 'customerName',
                render: function (data, type, object) {
                    return object.customerName ? object.customerName : "";
                }
            },
            {
                data: 'districts',
                render: function (data, type, object) {
                    let html = "";
                    if (hasValue(data)) {
                        const district = data.filter(it => it.isPrefered);
                        if(hasValue(district)) {
                            html = district[0].districtName;
                            if (data.length > 1) {
                                html += "<a href='' class='show-agent-districts' style='float: right'>Xem thêm ...</a>";
                            }
                        } else {
                            html = "N/A";
                        }
                    } else {
                        html = "N/A";
                    }
                    return html;
                }
            },
            {
                data: 'commission',
                render: function (data, type, object) {
                    return hasValue(object.commission) ? object.commissionFormat : "N/A";
                }
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    return object.statusName ? object.statusName : "";
                }
            },
        ],
        modalDeal : [
            {
                data: 'customerName',
                render: function (data, type, object) {
                    return object.customerName ? object.customerName : "";
                }
            },
            {
                data: 'districts',
                render: function (data, type, object) {
                    let html = "";
                    if (hasValue(data)) {
                        const district = data.filter(it => it.isPrefered);
                        if(hasValue(district)) {
                            html = district[0].districtName;
                            if (data.length > 1) {
                                html += "<a href='' class='show-agent-districts' style='float: right'>Xem thêm ...</a>";
                            }
                        } else {
                            html = "N/A";
                        }
                    } else {
                        html = "N/A";
                    }
                    return html;
                }
            },
            {
                data: 'commission',
                render: function (data, type, object) {
                    return hasValue(object.commission) ? object.commissionFormat : "N/A";
                }
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    return object.statusName ? object.statusName : "";
                }
            },
        ]
    },


}
const __indexPromiseApi = function(name) {
    let promise = null;
    switch (name) {
        case 'GET_COURSE' : {
            $("#name-training").html('').select2();
            $("#input-change-course").html('').select2();
            promise = axios.get(POS_APIS_TRAINING.get('GET_COURSE'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let data = [];
                let data2 = [{id : 0, text: "Chọn khóa học"}];
                let dataMap = resultsContent.map((it) => {
                    return {
                        id: it.id,
                        text: it.text
                    };
                });
                data = data.concat(dataMap);
                data2 = data2.concat(dataMap);
                $("#name-training").select2({
                    data: data,
                    placeholder : "Chọn khóa học"
                });
                $("#input-change-course").select2({
                    data: data2,
                    placeholder : "Chọn khóa học"
                });
                if (_localMember.stored.courseIdInit) {
                    $("#name-training").val(_localMember.stored.courseIdInit).select2();
                }

            }).catch(err => {
                let data = [];
                let data2 = [{id : 0, text: "Chọn khóa học"}];
                $("#name-training").select2({
                    data: data,
                    placeholder : "Chọn khóa học"
                });
                $("#input-change-course").select2({
                    data: data2,
                    placeholder : "Chọn khóa học"
                });
                console.error(err);
            });
            break;
        }
        case 'GET_STATUS' : {
            $("#select-change-status").html('').select2();
            $("#status").html('').select2();
            $("#type").html('').select2();
            promise = axios.get(POS_APIS_TRAINING.get('GET_STATUS_MEMBER'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let dataStatus = [{id : 0, text : 'Chọn trạng thái'}];
                let dataStatusChange = [];
                let dataContractSign = [{id : 0, text : 'Chọn hợp đồng'}];
                if (resultsContent.result) {
                    const status = resultsContent.data.filter(it => it.type === 3);
                    const contractSign = resultsContent.data.filter(it => it.type === 4);
                    let contractSignMap = [], dataStatusMap = [], dataStatusChangeMap = [];
                    if (contractSign) {
                        contractSignMap = contractSign[0].list.map((it) => {
                            return {
                                id: it.id,
                                text: it.name
                            };
                        });
                    }
                    if (status) {
                        status[0].list.forEach(it => {
                            dataStatusMap.push({id: it.id, text: it.name});
                            // remove status mới đk
                            if (it.id !== 13) {
                                dataStatusChangeMap.push({id: it.id, text: it.name});
                            }
                        });
                    }

                    dataStatus = dataStatus.concat(dataStatusMap);
                    dataStatusChange = dataStatusChange.concat(dataStatusChangeMap);
                    dataContractSign = dataContractSign.concat(contractSignMap);
                }


                $("#status").select2({
                    data: dataStatus,
                });
                $("#select-change-status").select2({
                    data: dataStatusChange,
                });
                $("#type").select2({
                    data: dataContractSign,
                });

            }).catch(err => {
                let dataStatus = [{id : 0, text : 'Chọn trạng thái'}];
                let dataStatusChange = [];
                let dataContractSign = [{id : 0, text : 'Chọn hợp đồng'}];
                $("#status").select2({
                    data: dataStatus,
                });
                $("#select-change-status").select2({
                    data: dataStatusChange,
                });
                $("#type").select2({
                    data: dataContractSign,
                });
                console.error(err);
            });
            break;
        }
        case 'GET_REASON' : {
            $("#select-change-reason").html('').select2();
            promise = axios.get(POS_APIS_TRAINING.get('GET_REASON'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let data = [];
                if (resultsContent.result) {
                    let reason = [];
                    switch (_localMember.stored.status) {
                        case 15 : {
                            //học lại
                            reason = resultsContent.data.filter(it=> it.type === 2)[0].list;
                            break;
                        }
                        case 16 : {
                            //hủy
                            reason = resultsContent.data.filter(it=> it.type === 3)[0].list;
                            break;
                        }
                    }
                    let dataMap = reason.map((it) => {
                        return {
                            id: it.id,
                            text: it.name
                        };
                    });
                    data = data.concat(dataMap);
                }


                $("#select-change-reason").select2({
                    data: data,
                });

            }).catch(err => {
                let data = [];
                $("#select-change-reason").select2({
                    data: data,
                });
                console.error(err);
            });
            break;
        }
        case 'GET_USER_TYPE' : {
            const data = [
                {id : 0, text : 'Chọn loại thành viên'},
                {id : 2, text : 'Thường'},
                {id : 3, text : 'Chủ nhà'},
                {id : 4, text : 'Môi giới'}

            ];
            $("#user-type").select2({ data: data,});
            break;
        }
        case 'GET_REQUEST_TYPE' : {
            const data = [
                {id : 0, text : 'Chọn loại yêu cầu'},
                {id : 40, text : 'Yêu cầu hợp tác'},
                {id : 39, text : 'Hủy hợp tác'},

            ];
            $("#request-type").select2({ data: data,});
            break;
        }
    }

};
class TrainingMember {
    constructor() {
        //loadPluginDatable();
        this._tableMember = null;
        this._tableRequest = null;
        this._tableListingModal = null;
        this.loadApi();
        this.loadEvent();
        this.loadOverView();
        this.loadTables();
        this.loadEditTable();
    }

    async loadApi() {
       await __indexPromiseApi('GET_COURSE');
        await __indexPromiseApi('GET_STATUS');
        __indexPromiseApi('GET_USER_TYPE');
        __indexPromiseApi('GET_REQUEST_TYPE');
    }

    async reloadTable() {
        const that = this;
        await that.updateFilter();
        await that.loadOverView();
        if (_localMember.stored.tabActive == 1) {
            await that._tableMember.ajax.reload();
        } else {
            await that._tableRequest.ajax.reload();
        }

    }

    loadOverView() {

        axios.post("/pos/members/get-overview", _localMember.filter )
            .then(xhr => {
                const response = xhr.data;
                let agentCnt = 0;
                let agentRequestCnt = 0;
                if (response.result) {
                    agentCnt = (response.data && response.data.agentCnt) ? response.data.agentCnt : 0;
                    agentRequestCnt = (response.data && response.data.agentRequestCnt) ? response.data.agentRequestCnt : 0;
                }
                $('#tpa-member-nav-list').html('Danh sách thành viên <span class="label label-success">' + agentCnt + '</span>');
                $('#tpa-member-nav-request-list').html('Danh sách yêu cầu <span class="label label-success">' + agentRequestCnt + '</span>');

            })
            .catch(err => {
                $('#tpa-member-nav-list').html('>Danh sách thành viên <span class="label label-success">' + 0 + '</span>');
                $('#tpa-member-nav-request-list').html('Danh sách yêu cầu <span class="label label-success">' + 0 + '</span>');
                showErrLog(err);
            });
    }
    loadTables () {
        const that = this;
        that._tableMember = $('#tb-traing-member')
            .DataTable({
            processing: false,
            serverSide: true,
            ajax: {
                url: '/pos/members/get-member-list',
                type: 'POST',
                data: function (d) {
                    Object.assign(d, _localMember.filter);
                    return d;
                }
            },
            autoWidth: true,
            deferRender: false,
            lengthChange: false,
            paging: true,
            searching: false,
            ordering: true,
            order: [[7, 'desc']],
            language: DatatableHelper.languages.vn,
            columns: _localMember.columsTable.member,
        })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on( 'draw.dt', function () {
                that.showHideDetailAgentMember();
            });

        //
        /*that._tableRequest = $('#tb-member-request')
            .DataTable({
                processing: false,
                serverSide: true,
                deferLoading : false,
                ajax: {
                    url: '/pos/members/get-list-request',
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, _localMember.filter);
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
                columns: _localMember.columsTable.request,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {})
            .on( 'draw.dt', function () {});*/
    }

    loadEditTable() {
        const that = this;

    }
    updateFilter() {
        const data_send  = {
            courseIdList:  $('#name-training').val()!=null ? $('#name-training').val().join(): null,
            statusId: $("#status").val(),
            contractStatus: $("#type").val(),
            phone : $("#phone").val(),
            userTypeId : $('#user-type').val(),
            requestTypeId : $('#request-type').val(),
        };
        $.extend(_localMember.filter , data_send);
    }
    clearFilter() {
        //todo clear filter
        const that = this;
        //$('#name-training').val("").select2();
        $("#status").val(0).select2();
        $("#type").val(0).select2();
        $("#phone").val("");
        $('#request-type').val(0).select2();
        $('#user-type').val(0).select2();
        __indexPromiseApi('GET_COURSE');
        that.updateFilter();
    }

    /**
     * get detail course by id
     */
    
    async getDetailCourse(courseId) {
        const that = this;
        let resultsContent = null;
        await axios.get(POS_APIS_TRAINING.get('GET_COURSE_DETAIL')  + '/' + courseId, {
            params: {}
        }).then(response => {
            resultsContent = response.data;
        }).catch(err => {
            console.error(err);
        });
        //
        if (resultsContent) {
            console.log(resultsContent);
            $("#modal-detail-training").find('input[name="name-training"]').val(resultsContent.name);
            $("#modal-detail-training").find('input[name="address-training"]').val(resultsContent.address);
            $("#modal-detail-training").find('input[name="starte-date-training"]').val(resultsContent.createdDate ? moment.unix(resultsContent.createdDate / 1000).format("DD/MM/YYYY HH:mm") : null);
            $("#modal-detail-training").find('input[name="time-training"]').val(resultsContent.totalTime);
            $("#modal-detail-training").find('textarea[name="des-training"]').val(resultsContent.description);
            $("#modal-detail-training").find('div[name="path-file-training"]').html(resultsContent.file);
            $("#modal-detail-training").modal("show");
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_NOT_SEEN_DETAIL')});
        }
    }

    updateStatusMember() {
        //
        const that = this;
        let dataPost = {
            typeId : 1,
            statusId : _localMember.stored.status,
            courseId : _localMember.stored.rowChange.courseId,
            agentId : _localMember.stored.rowChange.agentId,
            socialUid : _localMember.stored.rowChange.socialUid,
            reasonId :  Number.parseInt($("#select-change-reason").val()),
            score : Number.parseInt($("#input-change-score").val()),
            newCourseId : Number.parseInt($("#input-change-course").val()),
            reasonContent : $("#text-change-note").val(),
        };
        // validate
        let isError = false;
        if (!dataPost.socialUid || !dataPost.courseId || !dataPost.statusId) {
            isError = true;
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_AGENT')});
        } else {
            switch (dataPost.statusId) {
                case 14: {
                    if(!dataPost.score || dataPost.score > 100 || dataPost.score < 0) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_SCORE')});
                    }
                    dataPost.reasonId = null;
                    dataPost.newCourseId = null;
                    dataPost.reasonContent = null;
                    break;
                }
                case 15 : {
                    if(!dataPost.score || dataPost.score > 100 || dataPost.score < 0) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_SCORE')});
                    } else if (!dataPost.newCourseId || !$.isNumeric(dataPost.newCourseId)) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_COURSE')});
                    } else if (!dataPost.reasonId || !$.isNumeric(dataPost.reasonId)) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_REASON')});
                    }
                    break;
                }
                case 16 : {
                    if (!dataPost.reasonId || !$.isNumeric(dataPost.reasonId)) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_REASON')});
                    }
                    dataPost.reasonId = null;
                    dataPost.reasonContent = null;
                    dataPost.newCourseId = null;
                    break;
                }
                default: {
                    isError = true;
                    posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_STATUS_NOT_FOUND')});
                    break;
                }
            }
        }
        if (!isError) {
            showPropzyLoading();
            axios.post(POS_APIS_TRAINING.get('UPDATE_STATUS_MEMBER'), dataPost)
                .then(response => {
                    hidePropzyLoading();
                    const result = response.data;
                    if (result.result) {
                        posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('TRAINING_SUCCESS_UPDATE_MEMBER')});
                        _localMember.stored.rowChange = {};
                        $("#modal-change-status").modal("hide");
                        that.reloadTable();
                    } else {
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE')});
                    }
                })
                .catch(err => {
                    hidePropzyLoading();
                    showErrLog(err,  POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE'));
                });

        }  else {
            return false;
        }

    }

    updateContractSign() {
        const that = this;
        console.log(_localMember.stored.rowChange);
        let dataPost = {
            typeId : 2,
            statusId : _localMember.stored.rowChange.statusId,
            courseId : _localMember.stored.rowChange.courseId,
            agentId : _localMember.stored.rowChange.agentId,
            contractStatus :  17,
            contractReasonId : null,
            contractReasonContent : null,
        };

        let isError = false;
        if (!dataPost.agentId || !dataPost.courseId || !dataPost.statusId) {
            isError = true;
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_AGENT')});
        }
        if (!isError) {
            showPropzyLoading();
            axios.post(POS_APIS_TRAINING.get('UPDATE_STATUS_MEMBER'), dataPost)
                .then(response => {
                    hidePropzyLoading();
                    const result = response.data;
                    if (result.result) {
                        posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('TRAINING_SUCCESS_UPDATE_MEMBER')});
                    } else {
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE')});
                    }
                    _localMember.stored.rowChange = {};
                    that.reloadTable();
                })
                .catch(err => {
                    hidePropzyLoading();
                    showErrLog(err,  POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE'));
                });
        } else{
            return false;
        }
    }
    revertToOwner() {

    }

    phoneCallAgent(type) {
        let  phone = _localMember.stored.rowChange.agentPhone;
        if (type == 1) {
            phone = _localMember.stored.rowChange.phone;
        } else {
            phone = _localMember.stored.rowChange.agentPhone;
        }
        $(".btn-phone-call-agent").prop("disabled", true);
        $(".btn-phone-call-agent-request").prop("disabled", true);

        if (phone) {
            const params = {
                phoneNumber : phone,
                showLoading : false,
                department: 18,
                id:that.stored.id,
                onCallEnded : (callInfo) => {
                    // get CCall info
                    $(".btn-phone-call-agent").prop("disabled", false);
                    $(".btn-phone-call-agent-request").prop("disabled", false);
                    let dataTrack = {
                        duration: callInfo.duration,
                        phone: callInfo.number,
                        startedDate: callInfo.startTime * 1000,
                        endedDate: (hasValue(callInfo.endTime) ? callInfo.endTime : moment().unix()) * 1000,
                        statusId: callInfo.statusId,
                        recordLink: null,
                        id : that.stored.id,
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
            posNotifyAlert({type: "pos-notify-danger", message : "Đã xảy ra lỗi. Không thể thực hiện cuộc gọi do số phone không tồn tại"});
        }
    }

    async sendSMS(data) {
        const that = this;
        showPropzyLoading();
        let result = null;
        if (data.content) {
            const smsExt =  smsContact();
            data.content = data.content.concat('. ' + smsExt);
        }
        await axios.post(POS_APIS_TRAINING.get('SEND_SMS_TO_MEMBER'), data)
            .then(response => {
                hidePropzyLoading();
                result = response.data;
            }).catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });

        if (result) {
            if (result.result) {
                posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get("TRAINING_SUCCESS_SEND_SMS_RESPONSE")});
                $("#modal-training-send-sms").modal('hide');
                _localMember.stored.memberCheck.clear();
                that.reloadTable();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("TRAINING_ERR_SEND_SMS_RESPONSE") + "<br> Lý do :" + result.message});
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("PROCESS_ERR")});
        }
    }
    async sendNotify(data) {
        const that = this;
        showPropzyLoading();
        let result = null;
        await axios.post(POS_APIS_TRAINING.get('SEND_NOTIFY_TO_MEMBER'), data)
            .then(response => {
                hidePropzyLoading();
                result = response.data;
            }).catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });

        if (result) {
            if (result.result) {
                posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get("TRAINING_SUCCESS_SEND_NOTIFY_RESPONSE")});
                $("#modal-training-send-sms").modal('hide');
                _localMember.stored.memberCheck.clear();
                that.reloadTable();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("TRAINING_ERR_SEND_NOTIFY_RESPONSE") + "<br> Lý do :" + result.message});
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("PROCESS_ERR")});
        }
    }

    async showInfo(data) {
        const that = this;
        showPropzyLoading();
        try {
            that._tableListingModal.destroy();
        }catch (e) {
            // show err
        }
        let table = null;
        let columms = null;
        $("#tb-tpa-member-listing").hide();
        $("#tb-tpa-member-lead").hide();
        $("#tb-tpa-member-deal").hide();
        switch (data.type) {
            case 1 : {
                table = "#tb-tpa-member-listing";
                columms = _localMember.columsTable.modalListing;
                $("#tb-tpa-member-listing").find("tbody").html("");
                $("#tb-tpa-member-listing").show();
                $("#modal-member-list-title").html("Danh sách Listing");
                break;
            }
            case 2 : {
                table = "#tb-tpa-member-lead";
                columms = _localMember.columsTable.modalLead;
                $("#tb-tpa-member-lead").find("tbody").html("");
                $("#tb-tpa-member-lead").show();
                $("#modal-member-list-title").html("Danh sách Lead");
                break;
            }
            case 3 : {
                table = "#tb-tpa-member-deal";
                columms = _localMember.columsTable.modalDeal;
                $("#tb-tpa-member-deal").find("tbody").html("");
                $("#tb-tpa-member-deal").show();
                $("#modal-member-list-title").html("Danh sách Deal");
                break;
            }
        }
        that._tableListingModal = $(table)
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: POS_APIS_TRAINING.get("GET_LIST_INFO"),
                    type: 'POST',
                    data: function (d) {
                        Object.assign(d, data);
                        return d;
                    }
                },
                autoWidth: true,
                deferRender: false,
                lengthChange: false,
                paging: true,
                searching: false,
                ordering: false,
                // order: [[11, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: columms,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {});

    }
    async updateCommission(dataPost) {
        const that = this;
        if(!dataPost.agentId) {
            posNotifyAlert({type: "pos-notify-warning", message : "Xin vui lòng kiểm tra lại dữ liệu. Không tìm thấy môi giới"});
            return false;
        }
        if(!dataPost.commissionList || dataPost.commissionList.length == 0) {
            posNotifyAlert({type: "pos-notify-warning", message : "Xin vui lòng kiểm tra lại dữ liệu. không có hoa hồng để cập nhật"});
            return false;
        }
        showPropzyLoading();
        let result = null;
        await axios.post(POS_APIS_TRAINING.get('SET_COMMISSION'), dataPost)
            .then(response => {
                hidePropzyLoading();
                result = response.data;
            }).catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });

        if (result) {
            if (result.result) {
                posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get("TRAINING_SUCCESS_UPDATE_COMMISSION_RESPONSE")});
                _localMember.stored.memberCheck.clear();
                that.reloadTable();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("TRAINING_ERR_UPDATE_COMMISSION_RESPONSE") + "<br> Lý do :" + result.message});
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("PROCESS_ERR")});
        }
    }
    async updateRequsetAgent(dataPost) {
        const that = this;
        if(!dataPost.agentId) {
            posNotifyAlert({type: "pos-notify-warning", message : "Xin vui lòng kiểm tra lại dữ liệu. Không tìm thấy môi giới"});
            return false;
        }
        if(!dataPost.requestTypeId) {
            posNotifyAlert({type: "pos-notify-warning", message : "Xin vui lòng kiểm tra lại dữ liệu. Không tìm thấy yêu cầu"});
            return false;
        }
        if(!dataPost.statusId) {
            posNotifyAlert({type: "pos-notify-warning", message : "Xin vui lòng kiểm tra lại dữ liệu. Không tìm thấy trạng thái cập nhật"});
            return false;
        }
        showPropzyLoading();
        let result = null;
        await axios.post(POS_APIS_TRAINING.get('SET_REQUEST_AGENT'), dataPost)
            .then(response => {
                hidePropzyLoading();
                result = response.data;
            }).catch(err => {
                hidePropzyLoading();
                showErrLog(err);
            });

        if (result) {
            if (result.result) {
                posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get("TRAINING_SUCCESS_UPDATE_REQUEST_AGENT_RESPONSE")});
                _localMember.stored.memberCheck.clear();
                that.reloadTable();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("TRAINING_ERR_UPDATE_REQUEST_AGENT_RESPONSE") + "<br> Lý do :" + result.message});
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("PROCESS_ERR")});
        }
    }

    exportExcel() {
        showPropzyLoading();
        axios.post("/pos/members/export-excel", _localMember.filter )
            .then(xhr => {
                hidePropzyLoading();
                const response = xhr.data;
                if (response.result) {
                    const link = document.createElement("a");
                    link.download = 'download';
                    link.target = '_blank';
                    link.href = response.data.link;
                    link.click();
                }
            })
            .catch(err => {
                hidePropzyLoading();
                posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get("PROCESS_ERR")});
                showErrLog(err);
            });
    }
    loadEvent() {
        const that = this;

        const urlParams = new URLSearchParams(window.location.search);
        _localMember.stored.courseIdInit = urlParams.get('course');
        if (_localMember.stored.courseIdInit && $.isNumeric(_localMember.stored.courseIdInit)) {
            _localMember.stored.courseIdInit = Number.parseInt(_localMember.stored.courseIdInit);
            _localMember.filter.courseIdList = _localMember.stored.courseIdInit;
        }
        $("#input-change-score").inputNumber({start : 0, end : 100});

        $(document).on("click", ".course-training", function (e) {
           e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableMember.row( tr );
            that.getDetailCourse(row.data().courseId);
        });

        $(document).on("click", ".btn-change-status-member-training", function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableMember.row( tr );
            _localMember.stored.rowChange = row.data();
            // reset
            $("#select-change-status").val(14).select2().trigger("change");
            //$("#input-change-course").val(0).select2();
            $("#input-change-score").val("");
            $("#text-change-note").val("");
            $("#modal-change-status").modal("show");
        });
        $(document).on("click", "#btn-update-status-member", function (e) {
            e.preventDefault();
            that.updateStatusMember();
        });


        $(document).on("change", "#select-change-status", function (e) {
            e.preventDefault();
            _localMember.stored.status = Number.parseInt($(this).val());

            __indexPromiseApi("GET_REASON");

            $(".score-wrapper").hide();
            $(".course-wrapper").hide();
            $(".reason-wrapper").hide();
            $(".reason-note-wrapper").hide();
            $("#input-change-course option").prop("disabled", false);

            switch (_localMember.stored.status) {
                case 14 : {
                    $(".score-wrapper").show();
                    break;
                }
                case 15 : {
                    $(".score-wrapper").show();
                    $(".course-wrapper").show();
                    $(".reason-wrapper").show();
                    $("#input-change-course option[value='"+_localMember.stored.rowChange.courseId+"']").prop("disabled", true);
                    break;
                }
                case 16 : {
                    $(".reason-wrapper").show();
                    break;
                }
            }
            //$("#input-change-course").select2();
        });
        $(document).on("change", "#select-change-reason", function (e) {
            e.preventDefault();
            _localMember.stored.reason = Number.parseInt($(this).val());

            $(".reason-note-wrapper").hide();
            if ([7, 11].indexOf(_localMember.stored.reason) > -1) {
                $(".reason-note-wrapper").show();
            }
        });

        // filter
        $(document).on('click', "#search", function (e) {
            e.preventDefault();
            //that.updateFilter();
            that.reloadTable();
        });
        $(document).on('click', "#clear-search", function (e) {
            e.preventDefault();
            that.clearFilter();
            that.reloadTable();
        });
        $(document).on('click', '.edit-contract-sign', function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            const row = that._tableMember.row( tr );
            _localMember.stored.rowChange = row.data();
            // update
            ModalConfirm.showModal({
                message: "Bạn muốn chuyển môi giới <strong>'"+_localMember.stored.rowChange.name+"'</strong> thành môi giới chính thức ?",
                onYes: function (modal) {
                    that.updateContractSign();
                }
            });
            //that.updateContractSign();
        });
        $(document).on('click', '.revert-to-owner', function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            const row = that._tableMember.row( tr );
            _localMember.stored.rowChange = row.data();
            // update
            ModalConfirm.showModal({
                message: "Bạn muốn chuyển môi giới <strong>'"+_localMember.stored.rowChange.name+"'</strong> thành lại chủ nhà?",
                onYes: function (modal) {
                    that.revertToOwner();
                }
            });
        });

        $(document).on('click', '.btn-phone-call-agent', function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableMember.row( tr );
            _localMember.stored.rowChange = row.data();
            that.phoneCallAgent(1);
        });
        $(document).on('click', '.btn-phone-call-agent-request', function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableRequest.row( tr );
            _localMember.stored.rowChange = row.data();
            that.phoneCallAgent(2);
        });
        $(document).on("change", ".tpa-member-check", function (e) {
            e.preventDefault();
            const row = $(this).closest('tr');
            const data = that._tableMember.row( row ).data();
            if ($(this).find("input").is(":checked")) {
                _localMember.stored.memberCheck.set(data.socialUid, data);
            } else {
                _localMember.stored.memberCheck.delete(data.socialUid);
            }
        });

        $(document).on("click", "#btn-tpa-send-sms", function (e) {
            e.preventDefault();
            if(_localMember.stored.memberCheck.size > 0) {
                $("#modal-training-send-sms").modal();
                $(".type-send-sms").find("input[value='1']").prop("checked", true).trigger("change");
                $("#content-send-sms").val("");
                $("#content-send-notify").val("");
                $("#content-send-sms").trigger("change");
            } else {
                posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('TRAINING_ERR_SEND_SMS_MISSING_PHONES')});
            }
        });
        $(document).on("change", ".type-send-sms", function (e) {
            const type = Number.parseInt($(this).find("input").val());
            switch (type) {
                case 1: {
                    const dataTemplate = [{
                        id : "",
                        text : "Chọn mẫu SMS"
                    }];
                    _localMember.stored.templateSendSMS.forEach(it => {
                        dataTemplate.push(it);
                    });
                    $("#template-send-sms").select2({
                        data : dataTemplate
                    });
                    $(".group-send-sms").show();
                    $(".group-send-notify").hide();
                    break;
                }
                case 2 : {
                    const dataTemplate = [{
                        id : "",
                        text : "Chọn mẫu thông báo"
                    }];
                    _localMember.stored.templateSendNotify.forEach(it => {
                        dataTemplate.push(it);
                    });
                    $("#template-send-notify").select2({
                        data : dataTemplate
                    });
                    $(".group-send-sms").hide();
                    $(".group-send-notify").show();
                    break;
                }
                case 3 : {
                    const dataTemplate = [{
                        id : "",
                        text : "Chọn mẫu SMS"
                    }];

                    $("#template-send-sms").select2({
                        data : dataTemplate
                    });
                    const dataTemplateNotify = [{
                        id : "",
                        text : "Chọn mẫu thông báo"
                    }];
                    _localMember.stored.templateSendSMS.forEach(it => {
                        dataTemplate.push(it);
                    });
                    _localMember.stored.templateSendNotify.forEach(it => {
                        dataTemplateNotify.push(it);
                    });
                    $("#template-send-notify").select2({
                        data : dataTemplateNotify
                    });
                    $(".group-send-sms").show();
                    $(".group-send-notify").show();
                    break;
                }
            }
        });

        $(document).on("click", "#btn-traning-send-sms", function (e) {
            e.preventDefault();
            const type = $(".type-send-sms").find("input:checked").val();
            if (type == 1 && $.trim($("#content-send-sms").val())) {
                const phones  = [];
                _localMember.stored.memberCheck.forEach(it => {
                    phones.push(it.phone);
                });
                const data = {
                    phones : phones,
                    content : $.trim($("#content-send-sms").val())
                };
                that.sendSMS(data);
            } else if(type == 2 && $.trim($("#content-send-notify").val())) {

                const agentIds = [];
                _localMember.stored.memberCheck.forEach(it => {
                    agentIds.push(it.socialUid);
                });
                const dataNotify = {
                    socialUids : agentIds,
                    content : $.trim($("#content-send-notify").val())
                };
                that.sendNotify(dataNotify);
            } else if(type == 3 && $.trim($("#content-send-notify").val()) && $.trim($("#content-send-sms").val())) {
                const phones  = [];
                const agentIds = [];
                _localMember.stored.memberCheck.forEach(it => {
                    phones.push(it.phone);
                    agentIds.push(it.socialUid);
                });
                const data = {
                    phones : phones,
                    content : $.trim($("#content-send-sms").val())
                };
                const dataNotify = {
                    socialUids : agentIds,
                    content : $.trim($("#content-send-notify").val())
                };
                that.sendSMS(data);
                that.sendNotify(dataNotify);
            } else {
                posNotifyAlert({type: "pos-notify-warning", message : POS_MESSAGE.get('TRAINING_ERR_SEND_SMS_MISSING_CONTENT')});
            }
        });
        $(document).on("change", "#template-send-sms", function (e) {
            const id = $(this).val() ? Number.parseInt($(this).val()) : "";
            let content = "";
            const template = _localMember.stored.templateSendSMS.get(id);
            if (template) {
                content = template.content;
            }
            $("#content-send-sms").val(content).trigger("change");
        });
        $(document).on("change", "#template-send-notify", function (e) {
            const id = $(this).val() ? Number.parseInt($(this).val()) : "";
            let content = "";
            const template = _localMember.stored.templateSendNotify.get(id);
            if (template) {
                content = template.content;
            }
            $("#content-send-notify").val(content);
        });
        $(document).on("keyup", "#content-send-sms", function (e) {
            let content = $(this).val();
            const length = content.length;
            $(".max-character-content").html("Số ký tự nhập:" + length+"/160");
            if (length > 160) {
                $(".max-character-content").css({"color": "#d00"});
            } else {
                $(".max-character-content").css({"color": "#000"});
            }
        });
        $(document).on("change", "#content-send-sms", function (e) {
            let content = $(this).val();
            const length = content.length;
            $(".max-character-content").html("Số ký tự nhập:" + length+"/160");
            if (length > 160) {
                $(".max-character-content").css({"color": "#d00"});
            } else {
                $(".max-character-content").css({"color": "#000"});
            }
        });
        $(document).on("click", ".seen-detail-info", function (e) {
            const type = $(this).data("type");
            const agentId = $(this).data("agent");

            const data = {
                type : type,
                agentId : agentId
            }
            $("#pos-tpa-member-list-modal").modal("show");
            that.showInfo(data);

        });
        $(document).on("click", ".btn-edit-commission-rate", function (e) {
            const type = $(this).data("type");
            const index = $(this).data("indez");
            //const tr = $(this).closest("tr");
            const row = that._tableMember.row( index ).data();
            const data = row.agentTypes.filter(it => it.code == type);
            const agentId = row.agentId;
            let commission = 0;
            if (data && data.length > 0) {
                commission = data[0].commission;
            }
            const html = '<div class="input-group edit-commission-group">' +
                '<input type="text" class="form-control edit-member-commission" value="'+commission+'" data-type="'+type+'" data-agent="'+agentId+'">' +
                '<span id="add-new-street-btn" class="input-group-addon input-group-addon-success-btn btn-member-commission-rate-done">' +
                '<i class="fa fa-check" aria-hidden="true"></i>' +
                '</span>' +
                '</div>'
            $(this).closest("td").html(html);
            $(".edit-member-commission").inputNumber({start : 0, end : 100});
        });
        $(document).on("click", ".btn-member-commission-rate-done", function (e) {

            const tr = $(this).closest("tr");
            const type = tr.find(".edit-member-commission").data("type");
            const agentId = tr.find(".edit-member-commission").data("agent");
            const commission = tr.find(".edit-member-commission").val();
            //const row = that._tableMember.row( tr ).data();
           // const agentId = row.agentId;
            const dataPost = {
                agentId : agentId,
                commissionList : [
                    {
                        code : type,
                        commission : commission
                    }
                ]
            };
            that.updateCommission(dataPost);

        });

        $(document).on("click",".show-agent-districts", function (e) {
            e.preventDefault();
            const tr = $(this).closest("tr");
            const row = that._tableListingModal.row( tr ).data();
            const districts = row.districts;
            $("#pos-agent-districts-modal").modal();
            let htmlTr = districts.map((it, index) => {
                const isPrefered = it.isPrefered ? "<i class='fa fa-check'></i>" : "";
               return "<tr><td>"+(index + 1) +"</td><td>"+it.districtName+"</td><td class='text-center'>"+isPrefered+"</td></tr>"
            });
            htmlTr = htmlTr.join("");
            $("#tb-agent-districts").find("tbody").html(htmlTr);
        });
        $(document).on('mousemove ', 'table td.member-agent-name', function () {
            $(this).find('.member-tpa-tooltip').css('display', 'block');
        });
        $(document).on('mouseleave ', 'table td.member-agent-name', function () {
            $(this).find('.member-tpa-tooltip').css('display', 'none');
        });

        // load list
        $(document).on('click', '.tpa-member-nav', function (e) {
            e.preventDefault();
            _localMember.stored.tabActive = $(this).data("type");
            if( _localMember.stored.tabActive == 1) {
                $(".member-tab").show();
                $(".request-tab").hide();
                $("#btn-tpa-send-sms").show();
            } else {
                $(".member-tab").hide();
                $(".request-tab").show();
                $("#btn-tpa-send-sms").hide();
            }
            that.reloadTable();
        })
        $('body').off('click', '.td-control-detail').on( 'click', '.td-control-detail', function () {
            const tr = $(this).closest('tr');
            const row = that._tableMember.row( tr );
            const index = row.index();
            if ( row.child.isShown() == true) {
                row.child.hide();
                $(this).removeClass('fa-minus-circle').addClass('fa-plus-circle').css('color', '#3c8dbc');
            }
            else {
                $(this).removeClass('fa-plus-circle').addClass('fa-minus-circle').css('color', '#dd4b39');
                row.child( that.formatChildRow(row.data(), index), 'get-row-detail odd').show();
            }
        } );
        $(document).on('click', '.btn-set-request-agent', function(e) {
            const type = $(this).data('type');
            const tr = $(this).closest('tr');
            const row = that._tableRequest.row( tr ).data();
            // confirm
            const data = {
                agentId : row.agentId,
                requestTypeId : row.requestTypeId,
                statusId : null,
            };
            let _message = "";
            if (type == 1) {
                _message = "Bạn muốn xác nhận yêu cầu từ môi giới '" + row.agentName+"'";
                data.statusId = 20;
            } else {
                _message = "Bạn muốn hủy yêu cầu từ môi giới '" + row.agentName+"'";
                data.statusId = 21;
            }
            ModalConfirm.showModal({
                message: _message,
                onYes: function (modal) {
                    that.updateRequsetAgent(data);
                }
            });
        });
        $(document).on('click', '#btn-tpa-export-excel', function (e) {
            e.preventDefault();
            that.exportExcel();
        })
    }

    //
    showHideDetailAgentMember() {
        const that = this;
        const rows = that._tableMember.rows();
        if (_localMember.stored.explain == false) {
            for(let i = 0; i < rows[0].length; i++) {
                const row = that._tableMember.row(i);
                row.child.hide();
                $('.td-control-detail').removeClass('fa-minus-circle').addClass('fa-plus-circle').css('color', '#3c8dbc');
            }
        } else {
            for(let i = 0; i < rows[0].length; i++) {
                const row = that._tableMember.row(i);
                $('.td-control-detail').removeClass('fa-plus-circle').addClass('fa-minus-circle').css('color', '#dd4b39');
                row.child( that.formatChildRow(row.data(), i), 'get-row-detail odd').show();
            }
        }
    }
    formatChildRow ( object, index ) {
        // `d` is the original data object for the row

        //phan loai
        let agentType = "N/A";
        if(hasValue(object.agentTypes) && object.agentTypes.length > 0) {
            const types = object.agentTypes.map(it => {
                return it.name;
            });
            agentType = types.join(" - ");
        }

        // hoa hồng
        let commission = "";
        const dataAgent = object.agentTypes;
        if(hasValue(dataAgent) && dataAgent.length > 0) {
            const agentSale = dataAgent.filter(it=> it.code == 'SALE_AGENT');
            const agentBuy = dataAgent.filter(it=> it.code == 'BUY_AGENT');
            commission += "<p class='seen-detail-commission seen-detail-commission-sale'>Bán : "+ (hasValue(agentSale && agentSale.length > 0) ? agentSale[0].commission : "N/A") +"</p>";
            commission += "<p class='seen-detail-commission seen-detail-commission-buy btn-edit-commission-rate'  data-type='BUY_AGENT' data-index='"+index+"'>Mua : "+ (hasValue(agentBuy && agentBuy.length > 0) ? agentBuy[0].commission : "N/A") +"<i class='fa fa-edit'>"+"</p>";
        } else {
            commission = "N/A";
        }
        // info

        let info = "";
        info += "<p class='seen-detail-info' data-type='1' data-agent='"+object.agentId+"'>Listing : "+ (hasValue(object.listingCnt) ? object.listingCnt : 0) +"</p>";
        info += "<p class='seen-detail-info' data-type='2' data-agent='"+object.agentId+"'>Lead : "+ (hasValue(object.leadCnt) ? object.leadCnt : 0) +"</p>";
        info += "<p class='seen-detail-info' data-type='3' data-agent='"+object.agentId+"'>Deal : "+ (hasValue(object.dealCnt) ? object.dealCnt : 0) +"</p>";

        // hợp đồng


        const rowChild = '<table cellpadding="5" cellspacing="0" border="0" class="table tb-manager-report-childs" style="margin:0">'+
            '<tbody>'+
            '<tr>'+
            '<td width="50%"><strong>Phân loại MG: </strong> '+ agentType +'</td>'+
            '<td width="50%"><strong>Hoa Hồng (%): </strong>'+ commission +'</td>'+
            '</tr>'+
            '<tr>'+
            '<td width="50%"><strong>Thông tin : </strong>'+ info +'</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>';
        return rowChild;
    }

}

$(document).ready(function () {
    Window._trainingMember = new TrainingMember();
});