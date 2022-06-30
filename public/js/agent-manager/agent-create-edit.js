
class AgentDetail {
    constructor(props) {
        this._API = {
            'get-districts' : '/zone/get-district-list-by-city',
            'get-agent-status' : '/agent/get-status-list',
            'get-property-type' : '/lso/get-property-type-list',
            'get-property-type-prefix': '/lso/get-property-type-list-prefix',
            'post-change-status-agent' : '/agent/verify',
            'create-agent' : '/agent-manager/agent-create-json',
            'update-agent' : '/agent-manager/agent-update-json',
            'get-source-list' : '/agent/get-source-list',
            'get-reason-cancel' : '/agent/get-reason-cancel',
            'send-request-tpa' : '/agent/send-request-tpa',
            'load-info-owner-or-customer' : '/agent/load-info-owner-or-customer'
        };
        this._STORED = {
            data: {},
            dataSendRequset : {
                "name": null,
                "phone": null,
                "email": null,
                "ownerId": null,
                "rlistingId": null,
                "customerId" : null,
                "requestType": 40,
                "leadId": null,
                "dealId": null,
                "sourceId": null,
                "socialUid": null, //co the null
                "cooperationTypes": null
            },
            list: {
                districts : new Map(),
                districtsActive : new Set(),
                propertyTypes : new Map(),
                propertyTypesActive : new Set(),
                statusList : new Map(),
                sources : new Map(),
                tpaReasonCancelList : new Map(),
                dataDuplicateCustomer : []
            },
            codeStatus : {
                APPROVED : 'APPROVED',
                REJECTED : 'REJECTED'
            },
            districtPrimary : null,
            districtCheckAll : 0,
            pageType : 'CREATE',
            currentStatus : null,
            isTpa : false,
            tableDuplicateCustomer : null,
        };
        if (typeof (props) !== "undefined" &&  typeof (props.data) == "object") {
            this._STORED.data = Object.assign(this._STORED.data, props.data);
        }
        if (typeof (props) !== "undefined" &&  typeof (props.pageType) != "undefined") {
            this._STORED.pageType = props.pageType;
        }
        if (typeof (currentUser) != 'undefined' && currentUser.departments.length > 0) {
            currentUser.departments.forEach(it => {
                if (it.departmentId == 18) {
                    this._STORED.isTpa = true;
                }
            });
        }
        this.initTable();
        this._VALIDATE = new PropzyValidator();
        this.showValidate();
        this.loadApi();
        this.events();
    }
    initTable() {
        const that = this;
        that._STORED.tableDuplicateCustomer = $('#tb-agent-create-duplicate-customer').DataTable( {
            data: function() {
                return  that._STORED.list.dataDuplicateCustomer;
            },
            paging: false,
            searching: false,
            ordering: false,
            autoWidth: true,
            columns: [
                {
                    title: "Tên" ,
                    data : 'name',
                    render: function (data, type, object) {
                        let html = '';
                        if (object.agentId) {
                            // môi giới
                            html += object.agentName ? object.agentName : 'N/a';
                            if (object.statusId === 7) {
                                // môi giới chính thức
                                html += `<br><label class="label-primary label">MG chính thức</label>`;
                            } else {
                                // môi giới không chính thức
                                html += `<br><label class="label-danger label">MG không chính thức</label>`;
                            }
                        } else {
                            // customer or owner
                            html += object.name ? object.name : 'N/a';
                            if (object.customerId) {
                                html += `<br><label class="label-danger label">khách</label>`;
                            } else {
                                html += `<br><label class="label-primary label">chủ nhà</label>`;
                            }
                        }
                        return html;
                    }},
                {
                    title: "Số ĐT",
                    data : 'phone',
                    render: function (data, type, object) {
                        return data ? data : `N/a`;
                    }},
                {
                    title: "Email",
                    data : 'email',
                    render: function (data, type, object) {
                        return data ? data : `N/a`;
                    }},
                {
                    title: "Thao tác",
                    data : 'action',
                    render: function (data, type, object) {
                        if (that._STORED.isTpa) {
                            if (object.agentId) {
                                return `<button class="btn btn-sm btn-warning agent-send-request-to-tpa">Xem thông tin</button>`;
                            } else {
                                return `<button class="btn btn-sm btn-warning agent-send-request-to-tpa">Lấy dữ liệu</button>`;
                            }

                        } else {
                            if (object.agentId && object.statusId === 7) {
                                return '';
                            } else {
                                return `<button class="btn btn-sm btn-warning agent-send-request-to-tpa">Gửi yêu cầu</button>`;
                            }
                        }
                    }
                }
            ]
        } );
    }
    loadApi() {
        Promise.all([this.promiseApi('GET_DISTRICT', {cityId : 1}),
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
            });

    }
    async promiseApi(name, params = {}) {
        const that = this;
        let promise = null;
        switch (name) {
            case 'GET_DISTRICT' : {
                let response = [];
                await $.ajax({
                    type: 'POST',
                    url: that._API["get-districts"] + '/' + params.cityId,
                    data: {},
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        if (xhr.data && xhr.result) {
                            response = xhr.data;
                        }
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                if (response.length > 0) {
                    response.forEach(it => {
                       that._STORED.list.districts.set(it.districtId, it);
                    });
                }
                break;
            }
            case 'GET_AGENT_STATUS' : {
                let response = [];
                await $.ajax({
                    type: 'POST',
                    url: that._API["get-agent-status"],
                    data: {},
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        if (xhr.data && xhr.result) {
                            response = xhr.data;
                        }
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                if (response.length > 0) {
                    response.forEach(it => {
                        that._STORED.list.statusList.set(it.id, it);
                    });
                }
                break;
            }
            case 'GET_PROPERTY_TYPE' : {
                let response = [];
                await $.ajax({
                    type: 'POST',
                    url: that._API["get-property-type-prefix"] + '/' + params.listingTypeId,
                    data: {},
                    contentType: "application/json",
                    dataType: "json",
                    success: function (xhr) {
                        response = xhr;
                    },
                    error: function (data) {
                        console.error(data);
                    },
                });
                const { data } = response;
                if (data.length > 0) {
                    that._STORED.list.propertyTypes.set(params.listingTypeId, data);
                }
                break;
            }
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
            case 'GET_TPA_REASON_CANCEL' : {
                let response = [];
                await $.ajax({
                    type: 'GET',
                    url: that._API["get-reason-cancel"],
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
                    const filter = response.filter(it=> it.type == 8);
                    if (filter.length > 0) {
                        filter[0].list.forEach(it => {
                            that._STORED.list.tpaReasonCancelList.set(it.id, it);
                        });
                    }

                }
                break;
            }
        }
    }
    loadDataDetail() {
        const data = this._STORED.data;
        if (typeof (data.name) != "undefined" && data.name) {
            $('#agent-info-name').val(data.name);
        }
        if (typeof (data.email) != "undefined" && data.email) {
            $('#agent-info-email').val(data.email);
            $('#agent-info-mail').prop('disabled', true);
        }
        if (typeof (data.phone) != "undefined" && data.phone) {
            $('#agent-info-phone').val(data.phone);
            $('#agent-info-phone').prop('disabled', true);
        }

        // agentTypes
        if(typeof (data.agentTypes) != "undefined" && Array.isArray(data.agentTypes)) {
            data.agentTypes.forEach(it => {
                const val = it.id.typeId;
                $(`.agent-info-agentTypeId[value="${val}"]`).prop('checked', true);
            });
        }
        // property type
        $('#propertyTypeId').select2();
        if(typeof (data.agentPropertyType) != "undefined" && Array.isArray(data.agentPropertyType)) {
            data.agentPropertyType.forEach(it => {
                const val = it.id.propertyTypeId;
                this._STORED.list.propertyTypesActive.add(val);
            });
        }
        // listing type
        if(typeof (data.agentSettings) != "undefined" && Array.isArray(data.agentSettings)) {
            data.agentSettings.forEach(it => {
                const val = it.id.listingTypeId;
                $(`.agent-info-listingType[value="${val}"]`).prop('checked', true);
            });
        }
        $(`.agent-info-listingType`).trigger('change');
        if(typeof (data.agentDistricts) != "undefined" && Array.isArray(data.agentDistricts)) {
            data.agentDistricts.forEach(it => {
                if (it.isPrimary) {
                    this._STORED.districtPrimary = it.id.districtId;
                }
                this._STORED.list.districtsActive.add(it.id.districtId);
            });
        }
    }
    renderStatus() {
        let label = '';
        if (typeof (this._STORED.data.statusId) != 'undefined' && this._STORED.data.statusId == 7) {
            label = 'Môi giới chính thức';
            $('#agent-info-statusName').addClass('label-primary');

        } else {
            label = 'Môi giới không chính thức';
            $('#agent-info-statusName').addClass('label-danger');
        }
        this._STORED.currentStatus =  this._STORED.data.statusId;
        $('#agent-info-statusName').html(label);

    }
    renderSource() {
        const data = [];
        this._STORED.list.sources.forEach(it => {
           data.push({
               id : it.id,
               text : it.name
           });
        });
        $('#agent-info-source-create').html();
        $('#agent-info-source-create').select2({
            data : data
        });
        let code = 1111; //defalut is tpa
        if (typeof (this._STORED.data.sourceId) != 'undefined' && this._STORED.data.sourceId) {
            code = this._STORED.data.sourceId;
            $('#agent-info-source-create').prop('disabled', true);
        }

        $('#agent-info-source-create').val(code).select2();
    }
    renderDistrictActive() {
        const districts = [];
        this._STORED.list.districts.forEach(it => {
            const checked = this._STORED.list.districtsActive.has(it.districtId) ? 'checked' : '';
            const html = `<div class="col-md-3">
                            <label class="checkbox ">
                            <input name="agent-info-districts" type="checkbox" class="agent-info-districts" value="${it.districtId}" ${checked}>
                            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> ${it.districtName}
                            </label>
                            </div>`;
            districts.push(html);
        });
        $('.agent-info-districts-active-wrapper').html(districts.join(''));
        this.renderDistrictCheckAll();
        this.renderDistrictPrimary();
    }
    renderDistrictPrimary() {
        let data = [{
            id : '',
            text : '--- Vui lòng chọn --'
        }];
         this._STORED.list.districtsActive.forEach(it => {
            const district = this._STORED.list.districts.get(it);
            data.push({
                id : district.districtId,
                text : district.districtName
            });
        });
        data = data.sort((a, b) =>{
            return a.id - b.id;
        });
        $('#agent-info-district-primary').html('');
        $('#agent-info-district-primary').select2({
            data : data
        });
        if (!this._STORED.list.districtsActive.has(this._STORED.districtPrimary)) {
            this._STORED.districtPrimary = null;
        }
        if (this._STORED.districtPrimary) {
            $('#agent-info-district-primary').val(this._STORED.districtPrimary).select2();
        }
    }
    renderDistrictCheckAll() {
        if (this._STORED.list.districts.size == this._STORED.list.districtsActive.size) {
            $('#agent-info-districts-check-all').prop('checked', true);
        } else {
            $('#agent-info-districts-check-all').prop('checked', false);
        }
    }
    showValidate() {
        this._VALIDATE.setValidateFeild({
            id : 'agent-info-name',
            value : () => {return this._STORED.data.name;},
            hideMessage : true,
        });
        /*this._VALIDATE.setValidateFeild({
            id : 'agent-info-email',
            value : () => {
                    if (isEmail(this._STORED.data.email)) {
                        return this._STORED.data.email;
                    }
                    return null;
                },
            hideMessage : true,
        });*/
        this._VALIDATE.setValidateFeild({
            id : 'agent-info-phone',
            value : () => {return this._STORED.data.phone;},
            hideMessage : true,
        });
        this._VALIDATE.setValidateFeild({
            id : 'agent-info-source-create',
            value : () => {return this._STORED.data.sourceId;},
            hideMessage : true,
        });
        this._VALIDATE.setValidateFeild({
            id : 'agent-info-agentTypeId',
            value : () => {return this._STORED.data.agentTypes.length > 0 ? 1 : null;},
            hideMessage : true,
        });
        this._VALIDATE.showValidation();
    }
    changeStatus(code) {
        const that = this;
        const data = {
            action : code,
            agentId : this._STORED.data.agentId ? this._STORED.data.agentId : null,
            sourceId : null,
            reasonId : null,
            reasonContent : null
        };
        if (code == that._STORED.codeStatus.REJECTED) {
            data.sourceId = Number.parseInt($("#agent-info-source-cancel").val());
            data.reasonId = Number.parseInt($("#agent-info-reason-cancel").val());
            data.reasonContent = $("#agent-info-note-cancel").val();
        }
        // validate
        if (!data.agentId) {
            propzyNotifyAlert({type: "propzy-notify-danger", message : 'Thiếu thông tin môi giới'});
            return false;
        }
        if (code == that._STORED.codeStatus.REJECTED) {
            if (!data.sourceId) {
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Thiếu thông tin nguồn hủy'});
                return false;
            }
            if (!data.reasonId) {
                propzyNotifyAlert({type: "propzy-notify-danger", message : 'Thiếu thông tin lý do hủy'});
                return false;
            }
        }
        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: that._API['post-change-status-agent'],
                data: data,
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        propzyNotifyAlert({type: "propzy-notify-success", message : 'Đổi trạng thái môi giói thành công. Trang tự động reload sau 1s'});
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
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
    updateDataPost () {
        let dataPost = {
            "birthDay": null,
            "email": null,
            "name": null,
            "phone": null,
            "photo": null,
            "aboutMe": null,
            "latitude": 0,
            "longitude": 0,
            "address": null,
            "numberOfViews": 0,
            "gender": null,
            "agentTypes": [],
            "agentDistricts": [],
            "agentSettings": [],
            "agentPropertyType" : [],
            "contractSigned" : false,
            "company": null,
            "sourceId" : null,
        };
        dataPost = Object.assign(dataPost, this._STORED.data);
        // update
        dataPost.name = $.trim($('#agent-info-name').val()) ? $.trim($('#agent-info-name').val()) : null;
        dataPost.email = $.trim($('#agent-info-email').val()) ? $.trim($('#agent-info-email').val()) : null;
        dataPost.phone = $.trim($('#agent-info-phone').val());
        dataPost.sourceId = $.trim($('#agent-info-source-create').val());
        const agentTypes = [];
        $('.agent-info-agentTypeId:checked').each(function (index, element) {
            agentTypes.push({
                id: {
                    typeId: Number.parseInt($(element).val())
                },
            });
        });
        dataPost.agentTypes = agentTypes;
        // listing Type
        const agentSettings = [];
        $('.agent-info-listingType:checked').each(function (index, element) {
            agentSettings.push({
                id: {
                    listingTypeId: Number.parseInt($(element).val())
                },
            });
        });
        dataPost.agentSettings = agentSettings;
        // property
        const agentPropertyType = [];
        this._STORED.list.propertyTypesActive.forEach(it => {
            agentPropertyType.push({
                id : {
                    propertyTypeId : it
                }
            });
        });
        dataPost.agentPropertyType = agentPropertyType;
        // district
        const agentDistricts = [];
        this._STORED.list.districtsActive.forEach(it => {
            const object = {
                id : {
                    agentId : null,
                    districtId : it
                },
                isPrimary : false
            };
            if (dataPost.agentId) {
                object.id.agentId = dataPost.agentId;
            }
            if (it == this._STORED.districtPrimary) {
                object.isPrimary = true;
            }
            agentDistricts.push(object);
        });
        dataPost.agentDistricts = agentDistricts;

        this._STORED.data = Object.assign( this._STORED.data, dataPost);
    }
    saveFinish() {
        const that = this;
        this.updateDataPost();
        const validate = this._VALIDATE.checkValidate();
        if (validate.isError) {
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Xin vui lòng nhập đủ dữ liệu'});
            return false;
        }
        let url = this._API['create-agent'];
        if (this._STORED.pageType == 'EDIT') {
            url =  this._API['update-agent'];
        }
        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(this._STORED.data),
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        propzyNotifyAlert({type: "propzy-notify-success", message : 'Thành công. Trang tự động reload sau 1s'});
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    } else {
                        //
                        if (that._STORED.pageType == 'EDIT') {
                            edit(xhr);
                        } else {
                            create(xhr);
                        }
                    }

                },
                error: function (data) {
                    hidePropzyLoading();
                    propzyNotifyAlert({type: "propzy-notify-danger", message : 'Đã có lỗi xảy ra. xin vui lòng thử lại'});
                    console.error(data);
                }
            }
        );
        
        function create(xhr = {}) {
            switch (xhr.code) {
                case "4102": {
                    propzyNotifyAlert({type: "propzy-notify-warning", message : xhr.message});
                    $('#list-duplicate-agents-modal').modal('show');
                    that._STORED.list.dataDuplicateCustomer = xhr.data;
                    that._STORED.tableDuplicateCustomer.clear().draw();
                    that._STORED.tableDuplicateCustomer.rows.add(that._STORED.list.dataDuplicateCustomer);
                    that._STORED.tableDuplicateCustomer.columns.adjust().draw();
                    break;
                }
                case "4103": {
                    propzyNotifyAlert({type: "propzy-notify-warning", message : xhr.message});
                    $('#list-duplicate-agents-modal').modal('show');
                    that._STORED.list.dataDuplicateCustomer = xhr.data;
                    that._STORED.tableDuplicateCustomer.clear().draw();
                    that._STORED.tableDuplicateCustomer.rows.add(that._STORED.list.dataDuplicateCustomer);
                    that._STORED.tableDuplicateCustomer.columns.adjust().draw();
                    break;
                }
                case "4104": {
                    break;
                }
                default : {
                    // lỗi hệ thống
                    propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.message});
                }
            }
        }
        function edit() {
            propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.message});
        }
    }
    sendRequestTPA (data) {
        const that = this;
        this._STORED.dataSendRequset = Object.assign(this._STORED.dataSendRequset, data);
        this._STORED.dataSendRequset = Object.assign(this._STORED.dataSendRequset, {
            //name : this._STORED.data.name,
            // phone : this._STORED.data.phone,
            // email : this._STORED.data.email,
            sourceId : this._STORED.data.sourceId,
            cooperationTypes : this._STORED.data.agentTypes
        });

        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: this._API['send-request-tpa'],
                data: JSON.stringify(this._STORED.dataSendRequset),
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        propzyNotifyAlert({type: "propzy-notify-success", message : 'Gửi request thành công!'});
                        $('#list-duplicate-agents-modal').modal('hide');
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
    getInfoOwnerOrCustomer(data) {
        const that = this;
        let dataPost = {
            phone : null,
            customerId : null,
            socialUid : null,
            agentDistricts : [],
            agentSettings : []
        };
        dataPost = Object.assign(dataPost, data);
        dataPost = Object.assign(dataPost, {
            agentDistricts : this._STORED.data.agentDistricts,
            agentSettings : this._STORED.data.agentSettings
        });
        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: this._API['load-info-owner-or-customer'],
                data: JSON.stringify(dataPost),
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        propzyNotifyAlert({type: "propzy-notify-success", message : 'Lấy thông tin khách hàng thành công!'});
                        $('#list-duplicate-agents-modal').modal('hide');
                        //
                        that._STORED.data = Object.assign(that._STORED.data, {
                            name : xhr.data.name,
                            phone : xhr.data.phone,
                            email : xhr.data.email,
                            socialUid : xhr.data.socialUid ? xhr.data.socialUid : -1,
                            customerId : xhr.data.customerId,
                            agentSettings : xhr.data.agentSettings,
                            agentDistricts : xhr.data.agentDistricts
                        });
                        that.loadDataDetail();
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
        $('#agent-info-phone').phoneBasic();
        $(document).on('change', '.agent-info-districts', function (e) {
            e.preventDefault();
            const id = Number.parseInt($(this).val());
            if ($(this).is(':checked')) {
                that._STORED.list.districtsActive.add(id);
            } else {
                that._STORED.list.districtsActive.delete(id);
                // reset district primary
                if (id == that._STORED.districtPrimary) {
                    that._STORED.districtPrimary = null;
                }
            }
            // render
            that.renderDistrictActive();
        });
        $(document).on('click', '#agent-info-save-agent', function (e) {
            e.preventDefault();
            that.saveFinish();
        });
        $(document).on('click', '#agent-info-change-status', function (e) {
            e.preventDefault();
            if (that._STORED.currentStatus == 7) {
                // hủy
                $("#modal-change-status").modal('show');
            } else {
                // approve
                ModalConfirm.showModal({
                    message: 'Bạn có chắc chuyển môi giới này thành môi giới chính thức',
                    onYes: function (modal) {
                        that.changeStatus(that._STORED.codeStatus.APPROVED);
                    }
                });
            }

        });
        $("#modal-change-status").on('show.bs.modal', function(){
            const data = [];
            const dataReason = [];
            that._STORED.list.sources.forEach(it => {
                data.push({
                    id : it.id,
                    text : it.name
                });
            });
            that._STORED.list.tpaReasonCancelList.forEach(it => {
                dataReason.push({
                    id : it.id,
                    text : it.name,
                    control : it.control
                });
            });
            $(this).find('#agent-info-source-cancel').select2({
                data : data
            });
            $(this).find('#agent-info-reason-cancel').select2({
                data : dataReason
            });
            $(this).find('#agent-info-reason-cancel').trigger('change');
        });
        $(document).on('change', '#modal-change-status #agent-info-reason-cancel', function (e) {
            e.preventDefault();
            let control = $(this).select2('data')[0].control;
            if (control == 'input_text_if_checked') {
                // approve
                $('.agent-info-note-cancel-wrapper').show();
            } else {
                $('.agent-info-note-cancel-wrapper').hide();
            }
        });
        $(document).on('click', '#modal-change-status #agent-info-change-status-save', function (e) {
            e.preventDefault();
            that.changeStatus(that._STORED.codeStatus.REJECTED);
        });
        $(document).on('change', '.agent-info-listingType', function (e) {
            e.preventDefault();
            let data = [];
            $('.agent-info-listingType:checked').each(function (index, element) {
                const listingType = Number.parseInt($(element).val());
                const propertyTypes = that._STORED.list.propertyTypes.get(listingType);
                propertyTypes.forEach(it => {
                    data.push({
                        id : it.propertyTypeId,
                        text : it.prefixName + ' ( ' +  getNameListingType(listingType).sale.name +')'
                    });
                });
            });

            $('#agent-info-propertyTypeId').html('');
            $('#agent-info-propertyTypeId').select2({
                data : data
            });
            const dataActive = [];
            data.forEach(it => {
                if (that._STORED.list.propertyTypesActive.has(it.id)) {
                    dataActive.push(it.id);
                }
            });
            that._STORED.list.propertyTypesActive = new Set(dataActive);
            $('#agent-info-propertyTypeId').val(dataActive).select2();

        });
        $(document).on('change', '#agent-info-propertyTypeId', function (e) {
            let val = $(this).val();
            val = val.map(it => {
                return Number.parseInt(it);
            });
            that._STORED.list.propertyTypesActive = new Set(val);
        });
        $(document).on('change', '#agent-info-district-primary', function (e) {
            let val = $(this).val() ? Number.parseInt($(this).val()) : null;
            that._STORED.districtPrimary = val;
        });
        $(document).on('change', '#agent-info-districts-check-all', function (e) {
            const dataActive = [];
            if ($(this).is(':checked')) {
                that._STORED.list.districts.forEach(it => {
                   dataActive.push(it.districtId);
                });
            }
            that._STORED.list.districtsActive = new Set(dataActive);
            that.renderDistrictActive();
        });
        $(document).on('click', '.agent-send-request-to-tpa', function (e) {
            const tr = $(this).closest('tr');
            const row = that._STORED.tableDuplicateCustomer.row( tr );
            const rowData = row.data();
            if (that._STORED.isTpa) {
                if (rowData.agentId) {
                    ModalConfirm.showModal({
                        message: "Bạn muốn xem chi tiết môi giới không ?",
                        onYes: function (modal) {
                            location.replace(`/agent-manager/detail/${rowData.agentId}`);
                        }
                    });
                } else {
                    ModalConfirm.showModal({
                        message: "Bạn muốn load dữ liệu này để tạo môi giới ?",
                        onYes: function (modal) {
                            const name  = rowData.agentName ? rowData.agentName : rowData.name;
                            const data = {
                                name : name,
                                email : rowData.email,
                                phone : rowData.phone,
                                rlistingId : rowData.rlistingId ? rowData.rlistingId : null,
                                customerId : rowData.customerId ? rowData.customerId : null,
                                ownerId : rowData.ownerId ? rowData.ownerId : null,
                                socialUid : rowData.socialUid ? rowData.socialUid : null,
                            };
                            that.getInfoOwnerOrCustomer(data);
                        }
                    });
                }

            } else {
                ModalConfirm.showModal({
                    message: "Bạn muốn gửi yêu cầu tới TPA ?",
                    onYes: function (modal) {
                        const name  = rowData.agentName ? rowData.agentName : rowData.name;
                        const data = {
                            name : name,
                            email : rowData.email,
                            phone : rowData.phone,
                            rlistingId : rowData.rlistingId ? rowData.rlistingId : null,
                            customerId : rowData.customerId ? rowData.customerId : null,
                            ownerId : rowData.ownerId ? rowData.ownerId : null,
                            socialUid : rowData.socialUid ? rowData.socialUid : null,
                        };
                        that.sendRequestTPA(data);
                    }
                });
            }

        });

    }

}

$(document).ready(function () {
    showPropzyLoading();
    Window.agentDetaul = new AgentDetail({data : _DETAIL, pageType: _PAGE_TYPE});
    $(window).load(function () {
        hidePropzyLoading();
    });
});