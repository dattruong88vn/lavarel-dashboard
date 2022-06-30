function IndexPage() {
    var _this = this;
    var data_send = {
        "courseId": null,
        "tcId": null,
        "startedDate": null,
        "name": null,
        "address": null,
        "description": null,
        "totalTime": null,
        "isRequired": null,
        "file": null
    };
    var eleSend = {
        "courseId": $("#data-send input[name='id-training']"),
        "tcId": $("#data-send input[name='center-training']"),
        "startedDate": $("#data-send input[name='starte-date-training']"),
        "name": $("#data-send input[name='name-training']"),
        "address": $("#data-send input[name='address-training']"),
        "description": $("#data-send textarea[name='des-training']"),
        "totalTime": $("#data-send input[name='time-training']"),
        "isRequired": $("#data-send input[name='require-training']"),
        "file": $("#data-send input[name='path-file-training']")
    };

    _this.init = function () {
        initVAR();
        initDOM();
        loadData();
        bindEvents();
    };
    function loadData() {
        initDataList();
        resetDataList();
    }
    function initVAR() {
        _this.dataListTable = null;
        _this.dateFrom = '#date-from';
        _this.dateTo = '#date-to';
        _this.status = '#status';
        _this.center = '#center';
        _this.modalEditTraining = '#modal-edit-training';
    }

    function initDOM() {
        initListingStatusDOM();
    }

    function initListingStatusDOM() {
        $(_this.center).select2();
        $("select[name='center-training']").select2();
        $("select[name='name-training']").select2({
            placeholder: 'Chọn khóa học',
            ajax: {
                url: '/pos/training/get-training-short-list',
                dataType: 'json',
                delay: 250,
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                cache: true
            }
        });
        $(_this.dateFrom).datepicker({format: "dd/mm/yyyy", autoclose: true});
        $(_this.dateTo).datepicker({format: "dd/mm/yyyy", autoclose: true});
    }

    function setDataSelect(params) {
        var setting = {
            ele: 'select',
            val: -1,
            text: '--Chọn--',
            url: POS_APIS_COMMON.get('GET_LISTING_TYPES'),
        };
        $.extend(true,setting,params);
        var dataSelectDefault = {
            id: setting.val,
            text: setting.text
        };

        $(setting.ele).html('').select2();
        promise = axios.get(setting.url, {

        }).then(response => {
            const resultsContent = response.data.data;

            let data = [dataSelectDefault];

            const dataContent = $.map(resultsContent, function (item, index) {
                return {
                    id: index,
                    text: setting.ele =="#listingTypeId" ? item : item.typeName
                };
            });

            data = data.concat(dataContent);
            $(setting.ele).select2({
                data: data,
            });

        }).catch(err => {
            let data = [dataSelectDefault];
            $(ele).select2({
                data: data,
            });
            console.error(err)
        });
    }

    function convertDateToTimetamp(date) {
        if (moment(date, 'DD/MM/YYYY').isValid()) {
            return moment(date, 'DD/MM/YYYY').unix() * 1000;
        }
        return null;
    }

    function objectToInput(eles,data){
        Object.keys(data).map(key =>{
            if(eles.hasOwnProperty(key)){
                /* console.log(key+': '+data[key]); */
                var element = eles[key],
                    tag = eles[key].prop("tagName").toLowerCase(),
                    type = eles[key].attr("type"),
                    formatter = eles[key].attr("formatter"),
                    value = data[key];
                switch(tag) {
                    case 'input':
                        if(type=='checkbox'){
                            value ? element.prop('checked', true) : element.prop('checked', false);
                        }else if(type=='radio'){
                            // @TODO: check case this
                            element.val(value);
                        }else{
                            if(formatter=='date'){
                                var formatDate = {year: 'numeric', month:'2-digit',day: 'numeric'};
                                value = new Date(value).toLocaleDateString('vi-VN',formatDate);
                                element.val(value);
                            }
                            else{
                                element.val(value);
                            }
                        }
                        break;
                    case 'select':
                        console.log(value);
                        element.val(value).trigger('change');
                        break;
                    default:
                        element.val(value);
                }
            }
        });
    }

    function inutToObject(eles,data){
        let notError = true;
        Object.keys(data).map(key =>{
            if(eles.hasOwnProperty(key)){
                /* console.log(key+': '+data[key]); */
                var element = eles[key],
                    tag = eles[key].prop("tagName").toLowerCase(),
                    type = eles[key].attr("type"),
                    formatter = eles[key].attr("formatter"),
                    validate = eles[key].attr('validate'),
                    value = data[key];
                /* Validate for input */
                if(typeof validate!='undefined'){
                    validate = validate.split("|");
                    validate.forEach(function(item,k){
                        if(item=='require' || item=='required'){
                            if(element.val().trim().length==0){
                                element.unbind("keyup");
                                element.keyup(function (e) {
                                    if($(this).val().length!=0){
                                        element.css({border:''});
                                        element.next('.error-'+key).remove();
                                    }else{
                                        element.next('.error-'+key).remove();
                                        element.css({border:'1px solid red'});
                                        element.after('<p style="font-size:12px; color:red;" class="error-'+key+'">Dữ liệu không được trống</p>');
                                    }
                                });
                                element.trigger('keyup');
                                notError = false;
                            }else{
                                element.css({border:''});
                                element.next('.error-'+key).remove();
                            }
                        }
                    });
                }
                /* Set value form input to object */
                switch(tag) {
                    case 'input':
                        if(type=='checkbox'){
                            data[key] = element.is(":checked") ? element.is(":checked"): false;
                        }else if(type=='radio'){
                            // @TODO: check case this
                            data[key] = element.is(":checked");
                        }else{
                            if(formatter=='date'){
                                var formatDate = {year: 'numeric', month:'2-digit',day: 'numeric'};
                                var date = element.val().replace(/(\d\d)\/(\d\d)\/(\d{4})/g, "$3/$2/$1");
                                data[key] = new Date(date).getTime();
                            }else{
                                data[key] = element.val();
                            }
                        }
                        break;
                    case 'select':
                        data[key] = element.val();
                        break;
                    default:
                        data[key] = element.val();
                }
            }
        });
        if(notError)
            return data;
        return false;
    }

    function bindEvents() {
        $('body').off('change', _this.listingStatus).on('change', _this.listingStatus, function (e) {
            //loadDataList();
        });
        $('body').off('change', _this.listingDateView).on('change', _this.listingDateView, function (e) {
            //loadDataList();
        });

        $("#create-training").click(function (e) {
            $(_this.modalEditTraining).find("#title-traing-action").text("Tạo khóa học");
            $(_this.modalEditTraining).find("#submit-form-training").text("Tạo khóa học");
            var dataSave = {
                name: $("input[name='training-name']").val().trim(),
                require: $("input[name='require-training']").val(),
            };
            editTraining(dataSave);
        });

        $(document).on('click','.edit-training',function () {
            $(_this.modalEditTraining).find("#title-traing-action").text("Cập nhật khóa học");
            $(_this.modalEditTraining).find("#submit-form-training").text("Cập nhật");
            var dataRow = $(this).data('item');
            $.ajax({
                type: "GET",
                url: API_LIST.getDetailTraining+'/'+dataRow.courseId,
                success: function (response) {
                    console.log(response);
                    objectToInput(eleSend,response);
                    $("#data-send #name_file").text(response.file);
                    $("#modal-detail-training").modal("show");
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

        $("#submit-form-training").click(function () {
            var checked = inutToObject(eleSend,data_send);
            if(checked){
                $("#data-send").submit();
                console.log('form submit');
            }else{
                createNotification({
                    message: "Đã có lỗi xảy ra. Vui lòng check lại",
                    element: _this.modalEditTraining,
                    from: 'bottom',
                    align: 'right',
                });
            }
        });

        $("#btn-file").click(function (e) {
            $("input[name='file-training']").trigger('click');
        });

        $("input[name='file-training']").change(function (e) {
            $.each($(this).get(0).files, function(inde,file){
                var check = checkFileUpload(file);
                if(check){
                    var formData = new FormData();
                    formData.append("file", file, file.name);
                    $.ajax({
                        type: "POST",
                        url: "/pos/training/save-file",
                        success: function (data) {
                            console.log(data);
                            if(data.result){
                                $("#name_file").text(file.name);
                                $("#path-file-training").val(data.data.link);
                            }else{
                                createNotification({
                                    message: data,
                                    element: _this.modalEditTraining,
                                    from: 'bottom',
                                    align: 'right',
                                });
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        },
                        async: true,
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        timeout: 60000
                    });
                }else{
                    createNotification({
                        message: "Quá trình tải tập tin có lỗi, Vui lòng kiểm tra kết nối mạng",
                        element: _this.modalEditTraining,
                        from: 'bottom',
                        align: 'right',
                    });
                }
            });
        });

        $("#search").click(function () {
            var listTraining = $('select[name="name-training"]').val()!=null ? $('select[name="name-training"]').val().join():"";
            data_send  = {
                courseIdList: listTraining,
                statusId: $('select[name="status-id"]').val(),
                contractStatus: $('select[name="type"]').val(),
            };
            console.log(data_send);
            resetDataList();
        });

        $("#submit-transfer-training").click(function () {
            var tranferData = JSON.parse($(this).data("transfer"));
            var DataPost = {
                    "courseId": $("select[name='transfer-training']").val(),
                    "agentId": tranferData.agentId,
                    "oldCourseId":tranferData.courseId
            };
            return $.ajax({
                url: '/pos/members/tranfer-course',
                method: 'POST',
                data: DataPost
            }).done(function (response) {
                console.log(JSON.stringify(response));
                if (response.result) {
                    $("#modal-register-to-training").modal("hide");
                    createNotification({
                        message: "CHuyển khóa học thành công",
                        type:'success',
                    });
                    changeStatus(tranferData);
                } else {
                    createNotification({
                        message: "Đã có lỗi sảy ra",
                    });
                }
            });
        });
    }

    function changeStatus(data) {
        return $.ajax({
            url: '/pos/members/change-status',
            method: 'POST',
            data: data
        }).done(function (response) {
            console.log(JSON.stringify(response));
            if (response.result) {
                createNotification({
                    message: "Chuyển đổi trạng thái thành công",
                    type:'success',
                });
            } else {
                createNotification({
                    message: "Đã có lỗi sảy ra",
                });
            }
        });
    }

    function editSelect (cell, onRendered, success, cancel, editorParams) {
        var dataCell= cell.getData();
        if(dataCell.isReEnroll){
            createNotification({
                message: "Không có quyền chỉnh sửa",
            });
            return false;
        }
        console.log(cell.getField());

        if(dataCell.statusId != 14 && cell.getField()=='contractStatusName'){
            createNotification({
                message: "Phải hoàn thành khóa học, mới chuyển trạng thái hợp đồng",
            });
            return false;
        }
        var editor = $("<select class='form-control'><select/>");
        var selectedLabel = cell.getValue();
        var dataOption = editorParams(cell);

        function optionAppend(element, label, value, disabled) {
            var option = $("<option></option>").attr("value", value).text(label);
            element.append(option);
        }
        for ( var key in dataOption) {
            var editorParam= dataOption[key];
            if ( typeof editorParam != "undefined" ) {
                optionAppend(editor,editorParam, key);
            }
        }

        editor.css({
            "padding": "4px",
            "width": "100%",
            "box-sizing": "border-box",
            "height": "100%",
        }).val(cell.getValue());
        var selectedValue=0;
        for (var key in dataOption) {
            var editorParam= dataOption[key];
            if (editorParam==selectedLabel) {
                selectedValue=key;
            }
        }

        onRendered(function () {
            editor.focus();
            editor.val(selectedValue);
        });


        editor.on("change blur", function (e) {
            var value = editor.find("option:selected").text();
            success(value);
        });
        editor.on("keydown", function (e) {
            if (e.keyCode === 13) {
                success(editor.find("option:selected").text());
            }
        });
        //return the editor element
        return editor;
    };

    function editScoreCheck(cell) {
        //get row data
        var data = cell.getRow().getData();
        if(data.statusId == 14 || data.statusId == 15){
            return true;
        }else{
            // createNotification({
            //     message: "Chỉ khi nào hoàn thành hay học lại mới được chỉnh sửa điển",
            //     type: 'danger',
            // });
            return false;
        }

    }

    function convertTimetamsToDate(cell, formatterParams){
        return new Date(cell.getValue()).toLocaleDateString('vi-VN', {year: 'numeric',month:'2-digit',day:'2-digit'});
    }

    function initDataList() {
        _this.dataListTable = $("#data-table").tabulator({
            locale:true,
            pagination:"remote",
            paginationSize:10, // this option can take any positive integer value (default = 10)
            layout:"fitColumns", //fit columns to width of table (optional)
            placeholder: "Không có dữ liệu hiển thị",
            resizableColumns: false,
            columnVertAlign: 'middle',
            columnMinWidth:80,
            tooltips:true,
            tooltipsHeader:true,
            rowFormatter:function(row){
                //row - row component
                var data = row.getData();
                if(data.col == "blue"){
                    row.getElement().css({"background-color":"#A6A6DF"});
                }
            },
            cellClick:function(e, cell){
                /*console.log(e);
                console.log(cell);*/
            },
            rowClick:function(e, row){
                /*console.log(e);
                console.log(row);*/
            },
            columns:[{
                title:"Tên khóa học",
                field:"courseName",
                frozen:true,
                headerSort:false,
                width: 200,
                formatter:function(cell, formatterParams){
                    var dataCell= cell.getData();
                    var row = cell.getRow().getData();
                    return "<a href='javascript:;' data-item=\'"+JSON.stringify(row)+"\' class='edit-training'>"+dataCell.courseName+"</a>";
                }
            },{
                title:"Môi giới",
                field:"agentName",
                align:"left",
                headerSort:false,
                width: 100,
            },{
                title:"Tài khoản",
                field:"agentEmail",
                headerSort:false,
                width: 150,
            },{
                title:"Địa chỉ",
                field:"address",
                headerSort:false,
                width: 300,
            },{
                title:"Ngày đăng ký",
                field:"createdDate",
                headerSort:false,
                width: 100,
                formatter: convertTimetamsToDate
            },{
                title:"Ngày tham gia khóa học",
                field:"startedDate",
                headerSort:false,
                width: 100,
                formatter: convertTimetamsToDate
            },{
                title:"Điểm thi",
                field:"score",
                width: 40,
                headerSort:false,
                editor: 'input',
                formatter:function(cell, formatterParams){
                    var dataCell= cell.getData();
                    return "<i class='fa fa-edit'></i> "+dataCell.score;
                },
                validator:["min:0", "max:100",'numeric'],
                editable:editScoreCheck
            },{
                title:"Hành động",
                field:"statusName",
                width: 100,
                headerSort:false,
                columnMinWidth:80,
                editor: editSelect,
                editorParams:function(cell){
                    var rows = listStatus;
                    var options = {};
                    rows.forEach(function(row){
                        options[row.id] = row.name;
                    });
                    return options;
                },
                formatter:function(cell, formatterParams){
                    var dataCell= cell.getData();
                    return "<i class='fa fa-edit'></i> "+dataCell.statusName;
                }
            },{
                title:"Lý do",
                field:"reason",
                headerSort:false,
                width: 200,
            },{
                title:"Hợp đồng",
                field:"contractStatusName",
                headerSort:false,
                width: 100,
                editor: editSelect,
                editorParams:function(cell){
                    var rows = listType;
                    var options = {};
                    rows.forEach(function(row){
                        options[row.id] = row.name;
                    });
                    return options;
                },
                formatter:function(cell, formatterParams){
                    var dataCell= cell.getData();
                    return "<i class='fa fa-edit'></i> "+dataCell.contractStatusName;
                }
            }],
            validationFailed:function(cell, value, validators){
                //cell - cell component for the edited cell
                //value - the value that failed validation
                //validatiors - an array of validator objects that failed
                if(validators.type='max'){
                    createNotification({
                        message: 'Giá trị nhập lớn hơn '+validators.parameters,
                        type: 'danger',
                    });
                }
                if(validators.type='min'){
                    createNotification({
                        message: 'Giá trị nhở hơn '+validators.parameters,
                        type: 'danger',
                    });
                }
                if(validators.type='min'){
                    createNotification({
                        message: 'Phải là số'+validators.parameters,
                        type: 'danger',
                    });
                }
            },
            cellEdited:function(cell){
                var dataRow = cell.getData();
                var field = cell.getField();
                if(field=='statusName'){
                    var data_send = {
                        courseId: 0,
                        agentId: 0,
                        statusId: 0,
                        reasonId:0,
                        reasonContent: null,
                    };
                    listStatus.forEach(function (item) {
                        if(item.name==dataRow.statusName){
                                data_send.courseId= dataRow.courseId;
                                data_send.agentId=dataRow.agentId;
                                data_send.statusId= item.id;
                                data_send.reasonId= dataRow.reasonId;
                                data_send.reasonContent= null;
                        };
                        return false;
                    });
                    if(dataRow.statusName=="Học lại") {
                        if(data_send.courseId!=0){
                            $("#submit-transfer-training").data("transfer",JSON.stringify(data_send));
                        }
                        $("#modal-register-to-training").modal("show");
                        return false;
                    }else{
                        changeStatus(data_send);
                    }
                } else if(field=='contractStatusName'){
                    listType.forEach(function (item) {
                        if(item.name==dataRow.contractStatusName){
                            var data_send = {
                                courseId: dataRow.courseId,
                                agentId: dataRow.agentId,
                                contractStatus:item.id,
                                contractReasonId:dataRow.contractReasonId,
                                contractReasonContent:dataRow.contractReason

                            };
                            changeStatus(data_send);
                            return false;
                        }
                    });
                }else if(field=='score'){
                    var data_send = {
                        courseId: dataRow.courseId,
                        agentId: dataRow.agentId,
                        score:dataRow.score,
                    };
                    changeStatus(data_send);
                    return false;
                }
            },
            langs:{
                "vi":{
                    "pagination":{
                        "first":"Trang đầu", //text for the first page button
                        "first_title":"Trang đầu tiên", //tooltip text for the first page button
                        "last":"Trang cuối",
                        "last_title":"Trang cuối",
                        "prev":"Trước",
                        "prev_title":"Lùi về 1 trang",
                        "next":"Tiếp",
                        "next_title":"Trang kế tiếp",
                    },
                    "ajax": {
                        "loading": "Đang tải dữ liệu...",
                        "error": "Đã có lỗi xảy ra",
                    }
                }
            },
        });
        _this.dataListTable.tabulator("setLocale", "vi");
    }

    function resetDataList(){
        _this.dataListTable.tabulator("clearData");
        var ajaxConfig = {
            type:"POST",
            url:"/pos/members/get-remenber-list",
            dataType: "json",
            beforeSend:function () {
                $(".tablulator-loader").hide();
                showPropzyLoading();
            },
            success:function (response) {
                hidePropzyLoading();
                console.log(response);
            },
            error:function (error) {
                hidePropzyLoading();
                console.log(error);
            }
        };

        _this.dataListTable.tabulator(
            "setData",
            "/pos/members/get-remenber-list",
            data_send,
            ajaxConfig
        );
    }
}

$(document).ready(function () {
    var indexPage = new IndexPage();
    indexPage.init();
});