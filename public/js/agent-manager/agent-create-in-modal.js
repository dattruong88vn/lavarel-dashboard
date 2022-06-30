
class AgentCreate {
    constructor(props) {
        this._API = {
            'get-districts' : '/zone/get-district-list-by-city',
            'get-agent-status' : '/agent/get-status-list',
            'get-property-type' : '/lso/get-property-type-list',
            'get-property-type-prefix': '/lso/get-property-type-list-prefix',
            'post-change-status-agent' : '/agent-manager/change-agent-status',
            'create-agent' : '/agent-manager/agent-create-json',
            'update-agent' : '/agent-manager/agent-update-json',
            'get-source-list' : '/agent/get-source-list',
            'get-reason-cancel' : '/agent/get-reason-cancel',
            'send-request-tpa' : '/agent/send-request-tpa'
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
            id : {
                btnShowModal : '#btn-agent-create',
                modalAgent : '#modal-create-agent',
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
            districtPrimary : null,
            districtCheckAll : 0,
            currentStatus : null,
            tableDuplicateCustomer : null,
        };
        if (typeof (props) !== "undefined" &&  typeof (props.btnShowModal) != "undefined") {
            this._STORED.id.btnShowModal = props.btnShowModal;
        }
        if (typeof (props) !== "undefined" &&  typeof (props.created) != "undefined") {
            this._CREATED = props.created;
        }
        if (typeof (props) !== "undefined" &&  typeof (props.dataFake) != "undefined") {
                this._DATAFAKE = props.dataFake;
        }
        if (typeof (props) !== "undefined" &&  typeof (props.sourceId) != "undefined") {
            this._STORED.currentStatus = props.sourceId;
        } else {
            throw 'Missing source id';
        }
        this._VALIDATE = new PropzyValidator();
        this.showValidate();
        this.loadApi();
        this.initTable();
        this.events();
    }
    resetForm() {
        this._STORED.list.districtsActive = new Set();
        this._STORED.list.propertyTypesActive = new Set();
        this._STORED.list.dataDuplicateCustomer = [];
        this._STORED.districtPrimary = null;
        this._STORED.districtCheckAll = 0;

        $(this._STORED.id.modalAgent).find('input[type="text"]').val('');
        $(this._STORED.id.modalAgent).find('input[type="email"]').val('');
        $(this._STORED.id.modalAgent).find('input[type="checkbox"]').prop('checked', false);
        if ([1102, 1104, 1105, ].indexOf(this._STORED.currentStatus) > -1) {
            //cs, Ba, Tm
            $('.agent-info-agentTypeId[value="37"]').prop({
                'checked': true,
                'disabled' : true
            });
        }
        if ([1103, 1112].indexOf(this._STORED.currentStatus) > -1) {
            //SA, Pre
            $('.agent-info-agentTypeId[value="36"]').prop({
                'checked': true,
                'disabled' : true
            });
        }
        $(`.agent-info-listingType`).trigger('change');
        $(this._STORED.id.modalAgent).find('select').select2();
    }
    loadApi() {
        Promise.all([this.promiseApi('GET_DISTRICT', {cityId : 1}),
            this.promiseApi('GET_PROPERTY_TYPE', {listingTypeId : 1}),
            this.promiseApi('GET_PROPERTY_TYPE', {listingTypeId : 2}),
            this.promiseApi('GET_SOURCE_LIST')])
            .then(() => {
                this.renderSource();
                this.renderDistrictActive();
            });
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
                        if (object.agentId && object.statusId === 7) {
                            return '';
                        } else {
                            return `<button class="btn btn-sm btn-warning agent-send-request-to-tpa">Gửi yêu cầu</button>`;
                        }

                    }
                }
            ]
        } );
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
    renderSource() {
        $('.agent-info-source-create-wrapper').hide();
        if (!this._STORED.list.sources.has(this._STORED.currentStatus)) {
            throw "Source Id not Exits";
        }
        $(`.agent-info-listingType`).trigger('change');

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
        if(this._DATAFAKE && typeof this._DATAFAKE.name != 'undefined' && this._DATAFAKE.name != ''){
            dataPost.name = this._DATAFAKE.name;
        }else{
            dataPost.name = $.trim($('#agent-info-name').val()) ? $.trim($('#agent-info-name').val()) : null;
        }

        if(this._DATAFAKE && typeof this._DATAFAKE.email != 'undefined' && this._DATAFAKE.email != ''){
            dataPost.email = this._DATAFAKE.email;
        }else{
            dataPost.email = $.trim($('#agent-info-email').val()) ?  $.trim($('#agent-info-email').val()) : null;
        }

        if(this._DATAFAKE && typeof this._DATAFAKE.phone != 'undefined' && this._DATAFAKE.phone != ''){
            dataPost.phone = this._DATAFAKE.phone;
        }else{
            dataPost.phone = $.trim($('#agent-info-phone').val());
        }

        dataPost.sourceId = this._STORED.currentStatus;
        const agentTypes = [];
        $('.agent-info-agentTypeId:checked').each(function (index, element) {
            agentTypes.push({
                id: {
                    typeId: Number.parseInt($(element).val())
                },
                "createdBy": currentUser.userId
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
        showPropzyLoading();
        $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(this._STORED.data),
                dataType: "json",
                success: function (xhr) {
                    hidePropzyLoading();
                    if (xhr.result) {
                        //propzyNotifyAlert({type: "propzy-notify-success", message : 'Tạo môi giới thành công'});
                        $(that._STORED.id.modalAgent).modal('hide');
                        if(that._CREATED){
                            that._CREATED(that._STORED.data);
                        }
                        // send request
                        const data = {
                            name : that._STORED.data.name,
                            email : that._STORED.data.email,
                            phone : that._STORED.data.phone,
                            rlistingId : that._STORED.data.rlistingId ? that._STORED.data.rlistingId : null,
                            customerId : that._STORED.data.customerId ? that._STORED.data.customerId : null,
                            ownerId : that._STORED.data.ownerId ? that._STORED.data.ownerId : null,
                            socialUid : that._STORED.data.socialUid ? that._STORED.data.socialUid : null,
                        };
                        that.sendRequestTPA(data);

                        if(that._STORED.data.sourceId == 1104 || that._STORED.data.sourceId == 1105 ){
                            setTimeout(function(){
                                location.reload();
                            },1000)
                        }

                    } else {
                        create(xhr);
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
                    propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.message});
                    break;
                }
                default : {
                    // lỗi hệ thống
                    propzyNotifyAlert({type: "propzy-notify-danger", message : xhr.message});
                }
            }
        }

    }
    setDataSendRequest(data = {}) {
        this._STORED.dataSendRequset = Object.assign(this._STORED.dataSendRequset, data);
        this._STORED.data = Object.assign(this._STORED.data, data);
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
                        $(that._STORED.id.modalAgent).modal('hide');
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
        $(document).off('change', '.agent-info-districts').on('change', '.agent-info-districts', function (e) {
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
        $(document).off('click', '#agent-info-save-agent').on('click', '#agent-info-save-agent', function (e) {
            e.preventDefault();
            that.saveFinish();
        });
        $(document).off('change', '.agent-info-listingType').on('change', '.agent-info-listingType', function (e) {
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
        $(document).off('change', '#agent-info-propertyTypeId').on('change', '#agent-info-propertyTypeId', function (e) {
            let val = $(this).val();
            val = val.map(it => {
                return Number.parseInt(it);
            });
            that._STORED.list.propertyTypesActive = new Set(val);
        });
        $(document).off('change', '#agent-info-district-primary').on('change', '#agent-info-district-primary', function (e) {
            let val = $(this).val() ? Number.parseInt($(this).val()) : null;
            that._STORED.districtPrimary = val;
        });
        $(document).off('change', '#agent-info-districts-check-all').on('change', '#agent-info-districts-check-all', function (e) {
            const dataActive = [];
            if ($(this).is(':checked')) {
                that._STORED.list.districts.forEach(it => {
                    dataActive.push(it.districtId);
                });
            }
            that._STORED.list.districtsActive = new Set(dataActive);
            that.renderDistrictActive();
        });
        $(document).off('click', that._STORED.id.btnShowModal).on('click', that._STORED.id.btnShowModal, function (e) {
            e.preventDefault();
            that.resetForm();
           $(that._STORED.id.modalAgent).modal('show');
        });

        $(document).off('shown.bs.modal',that._STORED.id.modalAgent).on('shown.bs.modal',that._STORED.id.modalAgent,function(){
            if(that._DATAFAKE){
                if(typeof that._DATAFAKE.name != 'undefined' && that._DATAFAKE.name != ''){
                    $('#agent-info-name').val(that._DATAFAKE.name);
                    $('#agent-info-name').attr('disabled','disabled');
                }
                
                if(typeof that._DATAFAKE.phone != 'undefined' && that._DATAFAKE.phone != ''){
                    $('#agent-info-phone').val(strMask(that._DATAFAKE.phone));
                    $('#agent-info-phone').attr('disabled','disabled');
                }

                if(typeof that._DATAFAKE.email != 'undefined' && that._DATAFAKE.email != ''){
                    $('#agent-info-email').val(strMask(that._DATAFAKE.email));
                    $('#agent-info-email').attr('disabled','disabled');
                }
            }
            
        });
        
        $(document).off('click', '.agent-send-request-to-tpa').on('click', '.agent-send-request-to-tpa', function (e) {
            const tr = $(this).closest('tr');
            const row = that._STORED.tableDuplicateCustomer.row( tr );
            const rowData = row.data();
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
        });
    }

}

