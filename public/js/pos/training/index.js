
const _localMember = {
    filter : {
        /*"courseId": null,
        "tcId": null,
        "startedDate": null,
        "name": null,
        "address": null,
        "description": null,
        "totalTime": null,
        "isRequired": null,
        "file": null*/
        sort :  {
            columnName : "createdDate",
            value : "desc"
        },
        statusId : null,
        contractStatus : null,
        tcId : -1,
        fromDate : null,
        toDate : null,
        courseIdList : null
    },
    stored : {
        status : 11,
        rowChange : {},
        statusList : [
            {id : 10, text : "Mới tạo"},{id : 11, text : "Hoàn thành"},{id : 12, text : "Hủy"},
        ],
        tcList : new Map()
    },
    columsTable : {
        course : [
            {
                data: 'courseName',
                render: function (data, type, object) {
                    //const id = (hasValue(object.agentName) ? '<a href="prescreener/detail/' + object.id + '" target="_blank">' + object.id + '</a>' : 'N/A');
                    let html = "";
                    if (data) {
                        html += '<a class="course-training btn-training-course-edit">'+data+'</a>';
                        if (object.file) {
                            html += "<a style='margin-left: 5px; float: right;' href='"+ object.file+ "' target='_blank'><i class='fa fa-paperclip'></i></a>";
                        }
                    }
                    return html;
                }
            },
            {
                data: 'address',
                render: function (data, type, object) {
                    //const id = (hasValue(object.agentName) ? '<a href="prescreener/detail/' + object.id + '" target="_blank">' + object.id + '</a>' : 'N/A');
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
                data: 'totalTime',
                render: function (data, type, object) {
                    return data ? data + " phút" : "";
                }
            },
            {
                data: 'statusName',
                render: function (data, type, object) {
                    let html = "";

                    if (object.statusId == 10) {
                        // hoàn thành

                        /*let options = _localMember.stored.statusList.map(it => {
                            const select = object.statusId == it.id ? "selected" : "";
                            return '<option value="17" '+ select +'>'+ it.text +'</option>';
                        });
                        options = options.join("");

                        html = "<select class='form-control edit-course-status' >" + options + "</select>";
                        return html;*/
                        return data ? data + "<i class='fa fa-edit btn-fa-circle btn-fa-circle-warning btn-training-course-status-edit' style='float: right'>": "";
                    } else {
                        return  data ? data : "";
                    }
                }
            },
            {
                data: 'numberOfEnrollment',
                render: function (data, type, object) {
                    let html = '0';
                    if(data && data > 0) {
                        html = '<a href="/pos/members?course='+ object.courseId + '" target="-_blank">'+data+'</a>';
                    }
                    return html;
                }
            },{
                data: 'numberOfAttend',
                render: function (data, type, object) {
                    return data ? data : 0;
                }
            }
        ]
    }

}
const __indexPromiseApi = function(name) {
    let promise = null;
    switch (name) {
        case 'GET_COURSE' : {
            $("#name-training").html('').select2();
            promise = axios.get(POS_APIS_TRAINING.get('GET_COURSE'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let data = [];
                let dataMap = resultsContent.map((it) => {
                    return {
                        id: it.id,
                        text: it.text
                    };
                });
                data = data.concat(dataMap);
                $("#name-training").select2({
                    data: data,
                    placeholder : "Chọn khóa học"
                });

            }).catch(err => {
                let data = [];
                $("#name-training").select2({
                    data: data,
                    placeholder : "Chọn khóa học"
                });
                console.error(err);
            });
            break;
        }
        case 'GET_STATUS' : {
            $("#select-change-status").html('').select2();
            $("#status").html('').select2();
            promise = axios.get(POS_APIS_TRAINING.get('GET_STATUS_MEMBER'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let dataStatus = [{id : 0, text : 'Chọn trạng thái'}];
                let dataStatusChange = [];
                if (resultsContent.result) {
                    const status = resultsContent.data.filter(it => it.type === 2);
                    let dataStatusMap = [], dataStatusChangeMap = [];
                    if (status) {
                        status[0].list.forEach(it => {
                            dataStatusMap.push({id: it.id, text: it.name});
                            // remove status mới đk
                            if (it.id !== 10) {
                                dataStatusChangeMap.push({id: it.id, text: it.name});
                            }
                        });
                    }

                    dataStatus = dataStatus.concat(dataStatusMap);
                    dataStatusChange = dataStatusChange.concat(dataStatusChangeMap);
                }


                $("#status").select2({
                    data: dataStatus,
                });
                $("#select-change-status").select2({
                    data: dataStatusChange,
                });

            }).catch(err => {
                let dataStatus = [{id : 0, text : 'Chọn trạng thái'}];
                let dataStatusChange = [];
                $("#status").select2({
                    data: dataStatus,
                });
                $("#select-change-status").select2({
                    data: dataStatusChange,
                });
                console.error(err);
            });
            break;
        }
        case 'GET_TC' : {
            $("#center").html('').select2();
            $("#center-training").html('').select2();

            promise = axios.get(POS_APIS_SA.get('GET_TRANSACTION_CENTER'), {
                params: {}
            }).then(response => {
                const resultsContent = response.data;

                let data = [{id : -1, text : 'Chọn trung tâm'}];
                if (resultsContent.result) {

                    let dataMap = resultsContent.data.map((it) => {
                        _localMember.stored.tcList.set(it.id, it);
                        return {
                            id: it.id,
                            text: it.name,
                        };
                    });
                    data = data.concat(dataMap);
                }


                $("#center").select2({
                    data: data,
                });
                $("#center-training").select2({
                    data: data,
                });

            }).catch(err => {
                let data = [{id : -1, text : 'Chọn trung tâm'}];
                $("#center").select2({
                    data: data,
                });
                $("#center-training").select2({
                    data: data,
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
                    reason = resultsContent.data.filter(it=> it.type === 1)[0].list;
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
    }

}
class TrainingCourse {
    constructor() {
        //loadPluginDatable();
        this._tableCourse = null;
        this.loadApi();
        this.loadEvent();
        this.loadTables();
        this.loadEditTable();
    }

    async loadApi() {
        await __indexPromiseApi('GET_COURSE');
        await __indexPromiseApi('GET_TC');
        await __indexPromiseApi('GET_STATUS');
        await __indexPromiseApi('GET_REASON');
    }

    loadTables () {
        const that = this;
        that._tableCourse = $('#tb-traing-course')
            .DataTable({
                processing: false,
                serverSide: true,
                ajax: {
                    url: POS_APIS_TRAINING.get('GET_TRAINING_LIST'),
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
                ordering: false,
                // order: [[11, 'desc']],
                language: DatatableHelper.languages.vn,
                columns: _localMember.columsTable.course,
            })
            .off('processing.dt')
            .on('processing.dt', function (e, settings, processing) {
                /*settings.ajax.data = function (d) {
                    console.log(d);
                    _prescreenIndexVariables.filler.sort = {
                        columnName : settings.aoColumns[settings.aaSorting[0][0]].data,
                        value : settings.aaSorting[0][1]
                    };
                    Object.assign(d, _prescreenIndexVariables.filler);
                    return d;
                };*/
                if (processing) {
                    showPropzyLoading();
                } else {
                    hidePropzyLoading();
                }
            })
            .on('xhr.dt', function (e, settings, json, xhr) {});

        /*that._tableCourse.api().MakeCellsEditable({
            "onUpdate": that.updateContractSign,
            "inputCss":'my-input-class',
            "columns": [9],
            "inputTypes": [
                {
                    "column":9,
                    "type": "list",
                    "options":[
                        { "value": "17", "display": "Chưa ký" },
                        { "value": "18", "display": "Đã ký" },
                    ]
                },
            ]
        });
*/

    }

    loadEditTable() {
        const that = this;

    }
    updateFilter() {
        const dateFrom = moment($("#date-from").val(), "DD/MM/YYYY H:i:s").unix() * 1000;
        const dateTo = moment($("#date-to").val(), "DD/MM/YYYY H:i:s").unix() * 1000;
        const data_send  = {
            courseIdList:  $('#name-training').val()!=null ? $('#name-training').val().join(): null,
            statusId: $("#status").val(),
            contractStatus: $("#type").val(),
            tcId : $("#center").val(),
            fromDate : $.isNumeric(dateFrom) ? dateFrom : null,
            toDate : $.isNumeric(dateTo) ? dateTo : null,
        };
        $.extend(_localMember.filter , data_send);
    }
    clearFilter() {
        //todo clear filter
        const that = this;
        $('#name-training').val("").select2();
        $("#status").val(0).select2();
        $("#type").val(0).select2();
        $("#center").val(-1).select2();
        $("#date-from").val("");
        $("#date-to").val("");
        that.updateFilter();
    }


    updateStatusCourse() {
        const that = this;
        let dataPost = {
            typeId : 1,
            statusId : _localMember.stored.status,
            courseId : _localMember.stored.rowChange.courseId,
            reasonId :  _localMember.stored.reason,
            reasonContent : $("#text-change-note").val(),
        };
        // validate
        let isError = false;
        if (!dataPost.courseId || !dataPost.statusId) {
            isError = true;
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_STATUS_COURSE')});
        } else {
            switch (dataPost.statusId) {
                case 11: {
                    dataPost.reasonId = null;
                    dataPost.reasonContent = null;
                    break;
                }
                case 12 : {
                   if (!dataPost.reasonId || !$.isNumeric(dataPost.reasonId)) {
                        isError = true;
                        posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_REASON')});
                    }
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
            axios.post(POS_APIS_TRAINING.get('UPDATE_STATUS_COURSE'), dataPost)
                .then(response => {
                    hidePropzyLoading();
                    const result = response.data;
                    if (result.result) {
                        posNotifyAlert({type: "pos-notify-success", message : POS_MESSAGE.get('TRAINING_SUCCESS_UPDATE_MEMBER')});
                        _localMember.stored.rowChange = {};
                        $("#modal-change-status").modal("hide");
                        that._tableCourse.ajax.reload();
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

    async showModalFormTrainning(){
        const data = _localMember.stored.rowChange;
        // reset form

        if (data.courseId) {
            //update
            $("#modal-edit-training").find("#title-traing-action").html("Cập nhật khóa học");
            $("#modal-edit-training").find("#submit-form-training").html("Cập nhật");
            // fill data
            let resultsContent = null;
            await  axios.get(POS_APIS_TRAINING.get('GET_COURSE_DETAIL')  + '/' + data.courseId, {
                params: {}
            }).then(response => {
                resultsContent = response.data;
            }).catch(err => {
                console.error(err);
            });
            if (resultsContent) {
                $("#modal-edit-training").find("#course-id").val(resultsContent.courseId);
                $("#modal-edit-training").find("#name-training").val(resultsContent.name ? resultsContent.name : "");
                $("#modal-edit-training").find("#start-date-training").val(resultsContent.startedDate ? moment.unix(resultsContent.startedDate / 1000).format("DD/MM/YYYY") : "");
                $("#modal-edit-training").find("#start-time-training").val(resultsContent.startedDate ? moment.unix(resultsContent.startedDate / 1000).format("HH:mm") : "");
                $("#modal-edit-training").find("#time-training").val(resultsContent.totalTime ? resultsContent.totalTime : 0);
                $("#modal-edit-training").find("#des-training").val(resultsContent.description ? resultsContent.description : "");
                $("#modal-edit-training").find("#name_file").html(resultsContent.file ? resultsContent.file : "");
                if (resultsContent.isRequired) {

                    $("#modal-edit-training").find("#require-training").prop("checked", true).trigger("change");
                } else {
                    $("#modal-edit-training").find("#require-training").prop("checked", false).trigger("change");
                }
                $("#modal-edit-training").find("#address-training").val(resultsContent.address ? resultsContent.address : "");
                $("#modal-edit-training").find("#center-training").val(resultsContent.tcId ? resultsContent.tcId : 0).select2();

                if(resultsContent.tcId == 0) {
                    $("#modal-edit-training").find(".tc-other-address").show();
                } else {
                    $("#modal-edit-training").find(".tc-other-address").hide();
                }
            }

        } else {
            // create
            $("#modal-edit-training").find("#title-traing-action").html("Tạo khóa học");
            $("#modal-edit-training").find("#submit-form-training").html("Tạo");
            $("#modal-edit-training").find("#course-id").val("");
            $("#modal-edit-training").find("#name-training").val("");
            $("#modal-edit-training").find("#start-date-training").val(moment().format("DD/MM/YYYY"));
            $("#modal-edit-training").find("#start-time-training").val(moment().format("HH:mm"));
            $("#modal-edit-training").find("#time-training").val(0);
            $("#modal-edit-training").find("#des-training").val("");
            $("#modal-edit-training").find("#name_file").html("<i>Vui lòng chọn file word, excel và pdf</i>");
            $("#modal-edit-training").find("#file-training").val("");
            $("#modal-edit-training").find("#path-file-training").val("");
            $("#modal-edit-training").find("#address-training").val("");
            $("#modal-edit-training").find("#center-training").val(-1).select2();
            $("#modal-edit-training").find(".tc-other-address").hide();
            $("#modal-edit-training").find("#require-training").prop("checked", false).trigger("change");


        }
    }
    async submitFormTraining() {
        const that = this;
        const dataSubmit = {
            courseId : $("#modal-edit-training").find("#course-id").val(),
            name : $("#modal-edit-training").find("#name-training").val(),
            isRequired : $("#modal-edit-training").find("#require-training").is(":checked"),
            tcId : $("#modal-edit-training").find("#center-training").val(),
            startedDate : moment($("#modal-edit-training").find("#start-date-training").val() + " " + $("#modal-edit-training").find("#start-time-training").val(), "DD/MM/YYYY HH:mm").unix() * 1000,
            file : $("#modal-edit-training").find("#path-file-training").val(),
            totalTime : $("#modal-edit-training").find("#time-training").val(),
            description : $("#modal-edit-training").find("#des-training").val(),
            address : $("#modal-edit-training").find("#address-training").val()
        }
        // validate
        let isErr = false;
        let errMess = [];
        $("#name-training").requiredErrorRemove();
        $("#center-training").requiredErrorRemove();
        $("#address-training").requiredErrorRemove();
        $("#start-date-training").requiredErrorRemove();
        $("#start-time-training").requiredErrorRemove();
        if (!dataSubmit.name) {
            isErr = true;
            errMess.push("<p>Tên khóa học không được để trống</p>");
            $("#name-training").requiredError({
                val: null,
            });
        }
        if (!dataSubmit.tcId || dataSubmit.tcId == -1) {
            isErr = true;
            errMess.push("<p>Trung tâm giao dịch vẫn chưa được chọn</p>");
            $("#center-training").requiredError({
                val: null,
            });
        }
        if (dataSubmit.tcId == 0 && !dataSubmit.address) {
            isErr = true;
            errMess.push("<p>Địa chỉ không được để trống </p>");
            $("#address-training").requiredError({
                val: null,
            });
        }
        if(!dataSubmit.startedDate ||  !$.isNumeric(dataSubmit.startedDate)) {
            isErr = true;
            errMess.push("<p>Ngày bắt đầu khóa học sai định dạng</p>");
            $("#start-date-training").requiredError({
                val: null,
            });
            $("#start-time-training").requiredError({
                val: null,
            });
        } else {
            if (dataSubmit.startedDate < moment().unix() * 1000) {
                isErr = true;
                errMess.push("<p>Ngày bắt đầu khóa học không được nhỏ hơn ngày hiện tại</p>");
                $("#start-date-training").requiredError({
                    val: null,
                });
                $("#start-time-training").requiredError({
                    val: null,
                });
            }
        }
        if(!dataSubmit.totalTime ||  !$.isNumeric(dataSubmit.totalTime)) {
            isErr = true;
            errMess.push("<p>Thời gian học không đúng định dạng </p>");
            $("#time-training").requiredError({
                val: null,
            });
        }
        
        if (isErr) {
            posNotifyAlert({type: "pos-notify-danger", message : errMess.join("")});
            return false;
        }

        // fill address from tc
        if (dataSubmit.tcId > 0) {
            const tc = _localMember.stored.tcList.get(Number.parseInt(dataSubmit.tcId));
            dataSubmit.address = tc.address;
        }
        let result = null;
        showPropzyLoading();
        await axios.post(POS_APIS_TRAINING.get('UPDATE_COURSE'), dataSubmit)
            .then(response => {
                hidePropzyLoading();
                result = response.data;
            })
            .catch(err => {
                hidePropzyLoading();
                showErrLog(err,  POS_MESSAGE.get('TRAINING_ERR_UPDATE_COURSE'));
            });

        if(result ) {
            if (result.result) {
                $("#modal-edit-training").modal("hide");
                that._tableCourse.ajax.reload();
            } else {
                posNotifyAlert({type: "pos-notify-danger", message : result.message});
            }
        } else {
            posNotifyAlert({type: "pos-notify-danger", message : POS_MESSAGE.get('TRAINING_ERR_UPDATE_MEMBER_RESPONSE')});
        }
    }

    checkFileUpload (file) {
        var allowedFiles = ["doc", "docx", "pdf",'xlsx', 'xls'];
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        /!* Check file *!/
        let isErr = false;
        let messErr = [];
        if (!regex.test(file.name.toLowerCase())) {
            isErr = true;
            messErr.push("<p>File đính kèm chỉ chấp nhận các định dạng " + allowedFiles.join(', ') + "</p>");
        }
        /!* Check zise *!/
        if (file.size > 5000000) {
            isErr = true;
            messErr.push("<p>File đính kèm không vượt quá 5 Mb</p>");
        }
        return {
            isErr : isErr,
            messErr : messErr.join("")
        };
    }

    loadEvent() {
        const that = this;
        $("#date-from").datepicker({format: "dd/mm/yyyy", autoclose: true});
        $("#date-to").datepicker({format: "dd/mm/yyyy", autoclose: true});
        $("#start-date-training").datepicker({
            format: "dd/mm/yyyy",
            autoclose: true,
            startDate: '0d',
            todayHighlight : true
        });
        $("#start-time-training").timepicker({
            showMeridian : false
        });
        $("#time-training").inputNumber({start : 0, end : 500});

        $(document).on("click", "#btn-training-course-create", function (e) {
            e.preventDefault();
            // reset row;
            _localMember.stored.rowChange = {}
            $("#modal-edit-training").modal("show");
            that.showModalFormTrainning();
        });
        $(document).on("click", ".btn-training-course-edit", function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableCourse.row( tr );
            _localMember.stored.rowChange = row.data();
            $("#modal-edit-training").modal("show");
            that.showModalFormTrainning();
        });
        /**
         * submit form trainng for create and update
         */
        $(document).on("click", "#submit-form-training", function (e) {
            e.preventDefault();
            that.submitFormTraining();
        });
        /**
         * edit status of course
         */
        $(document).on("click", ".btn-training-course-status-edit", function (e) {
            e.preventDefault();
            var tr = $(this).closest('tr');
            var row = that._tableCourse.row( tr );
            _localMember.stored.rowChange = row.data();
            $("#modal-change-status").modal("show");

        });

        $(document).on("click", "#btn-update-status-course", function (e) {
            e.preventDefault();
            that.updateStatusCourse();
        });


        $(document).on("change", "#select-change-status", function (e) {
            e.preventDefault();
            _localMember.stored.status = Number.parseInt($(this).val());

            $(".reason-wrapper").hide();
            $(".reason-note-wrapper").hide();

            switch (_localMember.stored.status) {
                case 11 : {
                    break;
                }
                case 12 : {
                    $(".reason-wrapper").show();
                    break;
                }
            }
        });
        $(document).on("change", "#select-change-reason", function (e) {
            e.preventDefault();
            _localMember.stored.reason = Number.parseInt($(this).val());

            $(".reason-note-wrapper").hide();
            if ([3].indexOf(_localMember.stored.reason) > -1) {
                $(".reason-note-wrapper").show();
            }
        });

        $(document).on("change", "#center-training", function (e) {
            e.preventDefault();
            const tc= Number.parseInt($(this).val());

            $(".tc-other-address").hide();
            if ([0].indexOf(tc) > -1) {
                $(".tc-other-address").show();
            }
        });


        /**
         * filter click search and clear
         */
        $(document).on('click', "#search", function (e) {
            e.preventDefault();
            that.updateFilter();
            that._tableCourse.ajax.reload();
        });
        $(document).on('click', "#clear-search", function (e) {
            e.preventDefault();
            that.clearFilter();
            that._tableCourse.ajax.reload();
        });

        // input file
        $("#btn-file").click(function (e) {
            $("input[name='file-training']").trigger('click');
        });

        $("input[name='file-training']").change(function (e) {
            const file = e.target.files[0];
            if (file) {
                console.log(file);
                const check = that.checkFileUpload(file);
                if (!check.isErr) {
                    const formData = new FormData();
                    formData.append("file", file, file.name);

                    showPropzyLoading();
                    axios.post("/pos/training/save-file", formData)
                        .then(response => {
                            hidePropzyLoading();
                            const result = response.data;
                            if(result.result){
                                $("#name_file").text(result.data.file_name);
                                $("#path-file-training").val(result.data.link);
                            } else {
                                posNotifyAlert({type: "pos-notify-danger", message : result.message});
                            }
                        })
                        .catch(err => {
                            hidePropzyLoading();
                            showErrLog(err, "Đã xảy ra lỗi trong quá trình upfile. Xin vui lòng thử lại");
                        });
                } else {
                    posNotifyAlert({type: "pos-notify-warning", message : check.messErr});
                }

            } else {
                posNotifyAlert({type: "pos-notify-warning", message : "File không tồn tại"});
            }
            $(this).val("");
        });


    }

}

$(document).ready(function () {
    /*var indexPage = new IndexPage();
    indexPage.init();
    TrainingCourse*/
    Window._trainingCourse = new TrainingCourse();
});