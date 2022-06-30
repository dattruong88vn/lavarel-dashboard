function SAField() {
    var _this = this;
    const selectDef = [
        {
            value: '',
            text: '-- Vui Lòng Chọn --'
        }
    ];

    _this.templateIsSentApp = () => {
        const jsDetailData = Window.jsDetailData
        const pushedToOwnerList = jsDetailData.pushedToOwnerList && 'disabled' || '';
        let textPushToOwner = 'Push To Owner List'
        if (pushedToOwnerList) {
            textPushToOwner = 'Đã chuyển'
        }

        let elm;
        let noteLabel = '';

        let btnPushOwner = $('<button id="push-owner-btn" ' + pushedToOwnerList + '>').addClass('btn btn-success col-md-12');
        btnPushOwner = btnPushOwner.html('<span class="text-btn">' + textPushToOwner + '</span>');
        btnPushOwner = $('<div class="col-md-6">').html(btnPushOwner);

        let btn2 = $('<button id="resend-btn">').addClass('btn btn-success col-md-12');
        btn2 = btn2.html('<span class="text-btn">Cập nhật mật khẩu</span>');
        btn2 = $('<div class="col-md-6">').html(btn2);

        elm = $('<div class="form-group">')
            .append('<div class="col-md-12"><label class="control-label">Sử dụng Propzy App/Web</label></div>')
            .append(btnPushOwner)
        if (pushedToOwnerList) {
            let btnUnlock = $('<button id="unlock-btn">').addClass('btn btn-warning col-md-12');
            btnUnlock = btnUnlock.html('<span class="text-btn">Yêu cầu gửi hình ảnh</span>');
            btnUnlock = $('<div class="col-md-6">').html(btnUnlock);

            elm.append(btnUnlock)
            btn2.find("#resend-btn").addClass('mr-top')
        }

        elm.append(btn2)
        elm = $('<div id="useDiy-wrapper" class="col-md-4">').html(elm);
        $('.use-diy-group').html(elm);

        const useDIYMsg = jsDetailData.ownerAppStatus.statusFormat
        noteLabel = $('<div class="col-md-4">').append('<div class="col-md-12"><label>&nbsp;</label></div><p style="line-height: 34px;">* Ghi chú: ' + useDIYMsg + '</p>');
        $('.use-diy-group').append(noteLabel)
    }

    _this.isGenerated = false
    _this.fieldChangedByList = {};
    _this.phoneIsChanged = false;
    _this.sourceIdHasChild = new Set();
    _this.getDefaultListFields = {}
    _this.isChangedForm = false

    _this.init = function () {
        initFieldList();
        initDOM();

        return
    };

    function initDOM() {
        const listLength = _this.list.length;
        for (var i = 0; i < listLength; i++) {
            appendDOM(_this.list[i])
        }
    }

    _this.generateFieldAttributes = (field) => {
        if (!field) {
            return ''
        }

        let isDisabled = null
        if (field.isDisabled) {
            isDisabled = 'disabled'
        }
        field.disabled = isDisabled

        if (field.isAjax) {
            if (field.optionsList) {
                field.optionsList.type = 'ajax'
            }
        }

        const classDef = $('#' + field.id).attr('class')
        if (classDef && classDef.indexOf('form-control') === -1) {
            field.class += ' form-control'
        }
    
        // update label for updated field
        let wrapperField = ''
        // toggle group fields
        if (field.groupBelongTo) {
            // for group
            let isDisplay = 'block'
            if (field.toggleGroup === false) {
                isDisplay = 'none'
            }
            $(field.groupBelongTo).css('display', isDisplay)
    
            // for specific field in group
            // set important to make sure field in group is not affected by outside
            wrapperField = field.groupBelongTo + ' #' + field.id + '-wrapper'
            $.each($(field.groupBelongTo + ' > div'), (i, item) => {
                if ($(item).attr('style') && $(item).attr('style').indexOf('display: block') > -1) {
                    $(field.groupBelongTo).css('display', 'block')
                }

                return
            })
        } else {
            wrapperField = '#' + field.id + '-wrapper'
        }

        if (field.labelUpdated) {
            const labelField = wrapperField + ' label'
            $(labelField).text(field.labelUpdated)
        }

        $(wrapperField).show()
        if (field.isHide) {
            $(wrapperField).hide()
        }

        let typeCheckbox = null
        if (field.type === 'boolean') {
            typeCheckbox = { type: 'checkbox' }
            if (field.value == 1) {
                field.checked = 'checked'
            } else {
                field.checked = undefined
            }
        }

        $(wrapperField + ' #' + field.id).prop({ ...field, ...typeCheckbox})
        return field
    }

    const regenerateFieldsByFormId = (field, updatedFields, isChanged) => {
        if (field) { // if specific field exists in FormFields
            if (field.isAjax) {
                field = _this.generateFieldAttributes(field)
                field = appendDOM(field)
            } else {
                field = appendDOM(field)
                field = _this.generateFieldAttributes(field)
            }

            // update it to list form fields
            if (field.index || field.index === 0) {
                Window.sa.data[field.name](field.value)
                updatedFields[field.index] = field

                // revalidate
                Window.validatorForSa.showValidator(Window.validatorForSa.getTypeValudation().live)
            }
        } else { // update all fields while changing Property Type
            $.each(updatedFields, (k, uf) => {
                // recheck latest form fields (_this.list) and already updated form fields (updatedFields) by changing Property Type
                let updatedField = getAttrItemInFields(uf.id, _this.list, updatedFields)

                // reset field value while changing Property Type
                if (isChanged) {
                    // reset legalStatusList / legalStatusList
                    $('input[name=legalStatusList]').map((k, item) => item.checked = false)
                    $('input#afterSigningContract')[0].checked = false

                    // reset field value
                    updatedField.value = ''

                    if (Window.sa.data[updatedField.name]) {
                        Window.sa.data[updatedField.name]('')
                    }
                }
                
                updatedField = _this.generateFieldAttributes(updatedField)
                appendDOM(updatedField)
                
                return updatedField
            })
        }

        return field
    }

    const mappingFormFields = (propertyTypeId, field, isChanged) => {
        let formId = ''
        switch (propertyTypeId) {
            case 8:
                formId = 1
                break
            case 9:
                formId = 2
                break
            case 11:
                formId = 3
                break
            case 12:
                formId = 4
                break
            case 13:
                formId = 5
                break
            case 14:
                formId = 6
                break
            case 1:
                formId = 7
                break
            case 2:
                formId = 8
                break
            case 3:
                formId = 9
                break
            case 4:
                formId = 10
                break
            case 7:
                formId = 11
                break
            case 10:
                formId = 12
                break
            case 15:
            case 20:
                formId = 13
                break
            case 16:
            case 17:
            case 40:
                formId = 14
                break
            case 18:
                formId = 15
                break
            case 21:
                formId = 16
                break
            case 22:
                formId = 17
                break
            case 23:
                formId = 18
                break
            case 24:
                formId = 19
                break
            case 35:
            case 36:
                formId = 20
                break
            case 38:
                formId = 21
                break
            case 25:
            case 34:
                formId = 22
                break
            case 27:
                formId = 23
                break
            case 28:
            case 29:
            case 30:
            case 41:
                formId = 24
                break
            case 32:
                formId = 25
                break
            case 33:
                formId = 26
                break
            case 37:
            case 39:
                formId = 27
                break
            default:
                formId = 'Def'

                break
        }
        const formIdStr = 'form' + formId

        if (isChanged) {
            _this.isChangedForm = true

            // set new value for propertyType
            field.value = propertyTypeId
        }

        if (!_this.isChangedForm) {
            if (Window.jsDetailData.formId && Window.jsDetailData.formId !== formIdStr) {
                _this.isChangedForm = true
            }
        }

        if (Window.jsDetailData.formId !== formIdStr) {
            _this.isGenerated = false
        }

        if (field && !_this.isGenerated) {
            Window.jsDetailData.formId = formIdStr
            Window.sa.formFields._list = Window.sa.formFields[formIdStr]()
            
            const listUpdatedFields = regenerateFieldsByFormId(null, Window.sa.formFields._list, _this.isChangedForm)

            _this.isGenerated = true

            // show validation
            if (!Window.sa.data.statusId()) {
                Window.validatorForSa.showValidator(Window.validatorForSa.getTypeValudation().live)
            }

            return listUpdatedFields
        }

        return field
    }

    function renderInputElement(field, fn, fieldChangedByList) {
        if (!hasValue(field.render)) {
            if (!hasValue(field.value)) {
                if (field.noRenderNull != true) {
                    fn(field, fieldChangedByList);
                }
            } else {
                fn(field, fieldChangedByList);
            }
        } else {
            $(document).ready(function () {
                field.render();
            });
        }
    }
    function renderRemainingElement(field, fn, fieldChangedByList) {
        if (!hasValue(field.render)) {
            fn(field, fieldChangedByList);
        } else {
            $(document).ready(function () {
                field.render();
            });
        }
    }

    function appendDOM(field) {
        var dom = {
            input: function() {
                return renderInputElement(field, renderInputField, _this.fieldChangedByList)
            },
            input_file: function() {
                return renderInputElement(field, renderInputFieldFile, _this.fieldChangedByList)
            },

            editor: function () {
                return renderInputElement(field, renderEditorField, _this.fieldChangedByList)
            },
            inputWithContainer: function () {
                return renderInputElement(field, renderInputWithContainerField, _this.fieldChangedByList)
            },

            CKEditor: function () {
                return renderRemainingElement(field, renderCKEditorField, _this.fieldChangedByList)
            },

            boolean: function () {
                return renderRemainingElement(field, renderBooleanFieldCustom, _this.fieldChangedByList)
            },

            link: function () {
                return renderRemainingElement(field, renderLinkField, _this.fieldChangedByList)
            },

            text: function () {
                return renderRemainingElement(field, renderTextField, _this.fieldChangedByList)
            },

            select: function () {
                return renderRemainingElement(field, renderSelectField, _this.fieldChangedByList)
            },
            inlineSingleCheckList: function () {
                renderInlineSingleCheckList(field, _this.fieldChangedByList);
            },
            multiColumnCheckList: function () {
                renderMultiColumnCheckList(field, _this.fieldChangedByList);
            },
            inlineMultiCheckList: function () {
                renderInlineMultiCheckList(field, _this.fieldChangedByList);
            }
        };

        if (field) {
            if (!field.type) {
                field.type = 'input'
            }
            dom[field.type]()
        }
        return field
    }

    function initFieldList() {
        _this.list = [
            {
                name: 'link',
                id: 'link',
                label: 'URL',
                type: 'link',
                target: '#link-wrapper',
                text: Window.sa.data.crawlerInfoLink(),
                attrList: {
                    href: Window.sa.data.crawlerInfoLink()
                },
                isRendered: function () {
                    var _isRendered = true;
                    if (Window.jsRole == 'create') {
                        _isRendered = false;
                    }
                    return _isRendered;
                }
            },
            {
                name: 'crawlerInfoLink',
                id: 'link',
                label: 'URL',
                type: 'input',
                target: '#link-wrapper',
                text: Window.sa.data.crawlerInfoLink(),
                isRendered: function () {
                    var _isRendered = true;
                    if (Window.jsRole != 'create') {
                        _isRendered = false;
                    }
                    return _isRendered;
                }
            },
            {
                name: 'roadFrontageWidth',
                id: 'roadFrontageWidth',
                class: 'form-control auto-format-size',
                label: 'Độ rộng MT đường',
                type: 'input',
                target: '#roadFrontageWidth-wrapper',
                value: Window.sa.data.roadFrontageWidth()
            },
            {//listingTypeId
                name: 'listingTypeId',
                id: 'listingTypeId',
                label: 'Loại giao dịch',
                type: 'select',
                target: '#listingTypeId-wrapper',
                value: Window.sa.data.listingTypeId(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Bán'
                    },
                    {
                        value: 2,
                        text: 'Thuê'
                    }
                ],
                optionsList: {
                    type: null,
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.toggleFormFieldsByListingType(field, true);                        
                        _this.listAfter.checkShowZoneBtn();
                    }
                },
                afterRender: function (field) {
                    if (field && field.value) {
                        _this.listAfter.toggleFormFieldsByListingType(field);                        
                        _this.listAfter.checkShowZoneBtn();
                    }
                }
            },
            {//realEstateGroup
                name: 'realEstateGroupId',
                id: 'realEstateGroupId',
                label: 'Nhóm bất động sản',
                type: 'select',
                target: '#realEstateGroup-wrapper',
                value: Window.sa.data.realEstateGroupId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.listingTypeId() && !Window.jsDetailData.realEstateGroupFields) {
                            const sa = new SAApi()
                            return sa.getRealEstateGroup()
                        }

                        return Window.jsDetailData.realEstateGroupFields
                    },
                    callBack: function (response) {
                        let optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];

                        $.each(response.data, function (i, item) {
                            optionList.push({
                                value: item.id,
                                text: item.text,
                            });
                        });

                        // save select list realEstateGroup
                        return Window.jsDetailData.realEstateGroupFields = optionList
                    },
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.toggleFormFieldsByRealEstateId(field, true)
                        _this.listAfter.checkShowZoneBtn();
                    }
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.toggleFormFieldsByRealEstateId(field)
                        _this.listAfter.checkShowZoneBtn();
                    }
                }
            },
            {//propertyTypeId
                name: 'propertyTypeId',
                id: 'propertyTypeId',
                label: 'Loại hình bất động sản',
                type: 'select',
                target: '#propertyTypeId-wrapper',
                value: Window.sa.data.propertyTypeId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        const saData = Window.sa.data
                        if (saData.listingTypeId() && saData.realEstateGroupId()) {
                            return Listing.getPropertyTypeV2(saData.realEstateGroupId(), saData.listingTypeId());
                        }
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];

                        $.each(response.data, function (i, item) {
                            let disabled = ''
                            if (!item.active) {
                                disabled = 'disabled'
                                
                                // display error for disabled property type
                                if (item.propertyTypeId === Window.sa.data.propertyTypeId()) {
                                    $('#error-propertyTypeId-wrapper').html(`<p class='error'>Ghi chú: Loại hình BĐS "${item.typeName}" đã NGƯNG ÁP DỤNG. Vui lòng cập nhật loại hình BĐS cho Listing</p>`)
                                }
                            }
                            
                            optionList.push({
                                disabled,
                                text: item.typeName,
                                value: item.propertyTypeId,
                            })
                        })

                        return optionList;
                    },
                },
                onChange: function (field) {
                    if (field) {
                        // display error for disabled property type
                        $('#error-propertyTypeId-wrapper').html('')

                        _this.listAfter.amenitiesList()
                        mappingFormFields(Window.sa.data.propertyTypeId(), field, true)
                        _this.listAfter.checkShowZoneBtn();
                    }

                    return
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.amenitiesList()

                        let propertyTypeValue = null
                        if (field.value) {
                            propertyTypeValue = field.value
                        }
                        mappingFormFields(propertyTypeValue, field)
                        _this.listAfter.checkShowZoneBtn();
                    }

                    return
                }
            },
            {
                name: 'projectId',
                id: 'projectId',
                label: 'Dự án',
                type: 'select',
                target: '#projectId-wrapper',
                value: Window.sa.data.projectId(),
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.districtId()) {
                            return $.ajax({
                                url: PROJECT_API.get('GET_LIST_BY_DISTRICT'),
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    districtId: Window.sa.data.districtId(),
                                    cityId: Window.sa.data.cityId(),
                                }
                            });
                        }

                        return selectDef.slice()
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: "Chọn dự án",
                                attrs: {
                                    address: '',
                                    longitude: '',
                                    latitude: '',
                                }

                            }
                        ];
                        let dataMap = response.data.map((it) => {
                            return {
                                value: it.pId,
                                text: hasValue(it.projectName) ? it.projectName : "N/A",
                                attrs: {
                                    address: it.address,
                                    latitude: it.latitude,
                                    longitude: it.longitude
                                }
                            };
                        });
                        optionList = optionList.concat(dataMap);

                        return optionList;
                    },
                },
                onChange: function () {
                    if ($('#projectId').select2('data')[0]) {
                        const data = $('#projectId').select2('data')[0].element.dataset;
                        if (data.address) {
                            $('#address').val(data.address);
                        }
                        if (data.latitude) {
                            $('#latitude').val(data.latitude);
                        }
                        if (data.longitude) {
                            $('#longitude').val(data.longitude);
                        }
                    }
                }
            },
            {//buildingId
                name: 'buildingId',
                id: 'buildingId',
                label: 'Tòa nhà',
                type: 'select',
                target: '#buildingId-wrapper',
                value: Window.sa.data.buildingId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.propertyTypeId() && Window.sa.data.districtId()) {
                            return Listing.getBuildingListByDistrictId(Window.sa.data.districtId());
                        }

                        return selectDef.slice()
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()

                        $.each(response.data, function (i, item) {
                            var attrs = {};
                            for (var attr in item) {
                                attrs[attr] = item[attr];
                            }
                            optionList.push({
                                value: item.buildId,
                                text: item.buildingName,
                                attrs: attrs
                            });
                        });

                        return optionList;
                    },
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.toggleFieldsByBuildingId(field, true)
                    }
                }
            },
            {//blockId
                name: 'blockId',
                id: 'blockId',
                label: 'Block',
                type: 'select',
                target: '#blockId-wrapper',
                value: Window.sa.data.blockId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.buildingId()) {
                            return Listing.getBlocksByBuilding(Window.sa.data.buildingId())
                        }

                        return selectDef.slice()
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()

                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                var attrs = {};
                                for (var attr in item) {
                                    attrs[attr] = item[attr];
                                }
                                optionList.push({
                                    value: item.blockId,
                                    text: item.blockName,
                                    attrs: attrs
                                });
                            });
                        }

                        return optionList;
                    },
                },
                onChange: function (field) {
                    if (field) {
                        updateBuildingFloors()
                    }

                    return
                },
            },
            {
                groupBelongTo: ".building-group",
                name: 'numberFloor',
                id: 'numberFloor_building',
                class: 'form-control auto-format-number',
                label: '',
                type: 'input',
                target: '#numberFloor_building-wrapper',
                value: Window.sa.data.numberFloor(),
                afterRender: function (field) {
                    if (field) {
                        if (field.value == 0) {
                            field.value = ''
                        }
                    }

                    return
                }
            },
            {//modelCode
                name: 'modelCode',
                id: 'modelCode',
                label: 'Mã căn hộ',
                type: 'input',
                target: '#modelCode-wrapper',
                value: Window.sa.data.modelCode()
            },
            {//agentId
                name: 'agentId',
                id: 'agentId',
                type: 'select',
                target: '#agentId-wrapper',
                value: Window.sa.data.agentId(),
                optionsList: {
                    type: null,
                    data: function () {
                        var agentInfo = Window.sa.data.agent().info;
                        var optionList = [
                            {
                                value: Window.sa.data.agentId(),
                                text: Window.sa.data.agentName() + ' - ' + Window.sa.data.agentContractStatusText(),
                                attrs: {
                                    agentId: agentInfo.agentId,
                                    socialUid: agentInfo.socialUid,
                                    name: agentInfo.name,
                                    email: agentInfo.email,
                                    phone: agentInfo.phone,
                                    note: agentInfo.note
                                }
                            }
                        ];

                        return optionList;
                    },
                    callBack: function (response) {
                        showHideAgentEmail();
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];

                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                var attrs = {};
                                for (var _item in item) {
                                    attrs[_item] = item[_item];
                                }
                                optionList.push({
                                    value: item.agentId,
                                    text: item.name,
                                    attrs: attrs
                                });
                            });
                        }

                        return optionList;
                    }
                },
                html: function () {

                    if (Window.jsRole != 'view') {
                        var _html = null;
                        _html = '<div class="row">' +
                            '   <div class="col-md-12"><label for="agentId" class="control-label">Tên môi giới</label></div>' +
                            '   <div class="col-md-12">' +
                            '       <div class="input-group">' +
                            '           <select id="agentId" class="form-control" tabindex="-1" aria-hidden="true"></select>' +
                            '           <span id="btn-agent-create" class="btn input-group-addon input-group-addon-primary-btn">' +
                            '               <i class="fa fa-user-plus" aria-hidden="true"></i>' +
                            '           </span>' +
                            /*                            '           <span id="btn-agent-send-app" class="btn input-group-addon input-group-addon-warning-btn">' +
                            '               <i class="fa fa-send" aria-hidden="true"></i>' +
                            '           </span>' +*/
                            '           <span id="sa-call-btn9" class="show-pos-call input-group-addon input-group-addon-success-btn make-call" data-type="2">' +
                            '               <i class="fa fa-volume-control-phone" aria-hidden="true"></i>' +
                            '           </span>' +
                            '       </div>' +
                            '   </div>' +
                            '</div>';
                        return _html;
                    }
                },
                onChange: function (field) {
                    if (field) {
                        updateAgentInfo()
                        showHideAgentEmail()
                    }

                    return
                },
                /* afterRender: function () {
                    updateAgentInfo()
                    showHideAgentEmail()
                } */
            },
            {//agentEmail
                name: 'agentEmail',
                id: 'agentEmail',
                label: 'Email môi giới',
                type: 'text',
                target: '#agentEmail-wrapper',
                value: Window.sa.data.agentEmail(),
                afterRender: function () {
                    showHideAgentEmail();
                }
            },
            {
                name: 'isOwner',
                id: 'isOwner',
                label: 'Tin đăng chính chủ',
                type: 'boolean',
                target: '#isOwner-wrapper',
                value: Window.sa.data.isOwner(),
                onChange: function (field) {
                    _this.listAfter.showHideAgentIsOwner();
                },
                afterRender: function (field) {
                    _this.listAfter.showHideAgentIsOwner();
                }
            },
            {
                name: 'useDefaultPhoto',
                id: 'useDefaultPhoto',
                label: 'Dùng hình mặc định - theo ý chủ nhà',
                type: 'boolean',
                target: '#useDefaultPhoto-wrapper',
                value: Window.sa.data.useDefaultPhoto(),
            },
            {
                name: 'crawlerStatus',
                id: 'crawlerStatus',
                label: 'Phân loại',
                type: 'select',
                target: '#crawlerStatus-wrapper',
                value: Window.sa.data.crawlerStatus(),
                disabled: Window.sa.data.crawlerStatus() === 12, // HIDE PROPZY OPTION
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getStatusList();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];

                        for (var i in response.data) {
                            optionList.push({
                                value: parseInt(response.data[i].statusId),
                                text: response.data[i].statusName
                            })
                        }

                        

                        return optionList;
                    }
                },
                afterRender: function () {
                    _this.listAfter.handleOnChangeCrawlerStatus(true);
                },
                onChange: function () {
                    _this.listAfter.showHideUseDiy();
                    _this.listAfter.showHideAgentIsOwner();
                    showHideOwnerAgentInfo();
                    _this.listAfter.handleOnChangeCrawlerStatus();
                    // Window.sa.validation.init();
                },
            },
            {
                name: 'customerServiceRequest',
                id: 'customerServiceRequest',
                label: 'Dịch vụ khách hàng',
                type: 'text',
                target: '#customerServiceRequest-wrapper',
                text: Window.sa.data.customerServiceRequest()
            },
            {
                name: 'email',
                id: 'email',
                label: 'Email',
                type: 'input',
                target: '#email-wrapper',
                value: Window.sa.data.email(),
                customRenderHTML: function (item) {
                    const _html = '<div class="row">' +
                            '   <div class="col-md-12">' +
                            '       <div class="input-group">' +
                                        item +
                            '           <span id="btn-check-duplicated-email" class="input-group-addon input-group-addon-success-btn">' +
                            '               <i class="fa fa-search" aria-hidden="true"></i>' +
                            '           </span>' +
                            '       </div>' +
                            '   </div>' +
                            '</div>';
                    return _html;
                }
            }, {
                name: 'xCoordinate',
                id: 'x-longitude',
                label: 'Tọa độ X',
                type: 'input',
                target: '#x-wrapper',
                value: Window.sa.data.xCoordinate(),
                afterRender: function (field) {
                    $('#x-longitude').inputNumber({
                        negative: true,
                        isFloat: true
                    })
                }
            }, {
                name: 'yCoordinate',
                id: 'y-latitude',
                label: 'Tọa độ Y',
                type: 'input',
                target: '#y-wrapper',
                value: Window.sa.data.yCoordinate(),
                afterRender: function (field) {
                    $('#y-latitude').inputNumber({
                        negative: true,
                        isFloat: true
                    })
                }
            }, {
                name: 'longitude',
                id: 'longitude',
                label: 'Longitude',
                type: 'input',
                target: '#longitude-wrapper',
                value: Window.sa.data.longitude(),
                afterRender: function (field) {
                    if (field && field.value) {
                        $('#' + field.id).val(Window.sa.data.longitude())
                    }

                    return
                }
            },
            {
                name: 'latitude',
                id: 'latitude',
                label: 'Latitude',
                type: 'input',
                target: '#latitude-wrapper',
                value: Window.sa.data.latitude(),
                afterRender: function (field) {
                    if (field && field.value) {
                        $('#' + field.id).val(Window.sa.data.latitude())
                    }

                    return
                }
            },
            {
                name: 'noteSA',
                id: 'noteSA',
                label: 'Ghi chú cho SA',
                type: 'editor',
                target: '#note-wrapper',
                value: Window.sa.data.noteSA()
            },
            {
                name: 'isCashBack',
                id: 'isCashBack',
                label: 'Áp dụng chương trình cashback',
                type: 'boolean',
                target: '#isCashBack-wrapper',
                value: Window.sa.data.isCashBack(),
            },
            {
                name: 'campaignId',
                id: 'campaignId',
                label: 'Campaign id',
                type: 'input',
                target: '#campaignId-wrapper',
                value: Window.sa.data.campaignId(),
            },
            {
                name: 'campaignChecked',
                id: 'campaignChecked',
                label: 'Không thuộc Campaign nào',
                type: 'boolean',
                target: '#campaignChecked-wrapper',
                value: Window.sa.data.campaignChecked(),
                afterRender: function (field) {
                    if (Window.sa.data.campaignChecked()) {
                        $('#campaignId').prop('disabled', true);
                    } else {
                        $('#campaignId').prop('disabled', false);
                    }
                }
            },
            {
                name: 'noteCRM',
                id: 'noteCRM',
                label: 'Ghi chú cho TM/CRM',
                type: 'editor',
                target: '#noteCRM-wrapper',
                value: Window.sa.data.noteCRM(),
            },
            {
                name: 'address',
                id: 'address',
                label: 'Địa chỉ',
                type: 'input',
                target: '#address-wrapper',
                value: Window.sa.data.address(),
                afterRender: function (field) {
                    if ($('#seeomap').length === 0) {
                        $('<a id="seeomap" href="#" style="margin-left: 10px;">Xem bản đồ lớn</a>').insertAfter('label[for=' + field.id + ']');
                    }
                    if (field && field.value) {
                        $('#' + field.id).val(field.value)
                    }

                    ajaxStart()
                    $('#' + field.id)
                        .geocomplete()
                        .bind("geocode:result", function (event, result) {
                            const address = result.formatted_address
                            const lat = result.geometry.location.lat()
                            const lng = result.geometry.location.lng()

                            Window.jsDetailData.address = address
                            Window.jsDetailData.latitude = lat
                            Window.jsDetailData.longitude = lng
                            $('#address').val(address)
                            $('#latitude').val(lat)
                            $('#longitude').val(lng)

                            ajaxEnd()
                            return false
                        });

                    ajaxEnd()
                    return
                }
            },
            {
                name: 'virtualTouring',
                id: 'virtualTouring',
                class: 'form-control virtual-touring',
                label: 'Link virtual tour',
                type: 'inputWithContainer',
                target: '#virtualTouring-wrapper',
                value: Window.sa.data.virtualTouring(),
                afterRender: function (field) {
                    if (field) {
                        var div = $('<div style="width: 20%; float:right; text-align: right"></div>');
                        var viewMore = $('<button type="button" style="margin: 2px 2px 0px 0px" class="btn btn-primary btn-sm" id="virtual-touring-preview">Xem thử</button>');
                        $('input#virtualTouring').parent().append(div.append(viewMore)).append('<div style="clear:both"></div>');
                        $('input#virtualTouring').attr('style', 'width:80%; float:left;border: none');
                        $('input#virtualTouring').change(function (e) {
                            Window.jsDetailData.virtualTouringChecked = false;
                            var viewMore = $('button#virtual-touring-preview');
                            if ($(this).val().trim().length === 0) {
                                viewMore.attr('disabled', true);
                                viewMore.removeClass('btn-primary').addClass('disabled');
                                return;
                            }
                            viewMore.attr('disabled', false);
                            viewMore.removeClass('disabled').addClass('btn-primary');
                        });
                        viewMore.unbind('click').click(function () {
                            if ($('input#virtualTouring').val().trim().length === 0) {
                                return;
                            }
                            if ($('input#virtualTouring').val().trim().length > 0 && !$('input#virtualTouring').val().startsWith('https://my.matterport.com/show/?m=')) {
                                showPropzyAlert('<strong>Đường link của virtual tour không đúng.</strong> <br/><br/> Link virtual tour phải được tạo từ các plugin được hệ thống hỗ trợ (ví dụ: Matterport). <br/> Vui lòng nhập lại link đúng');
                                return;
                            }
                            var iframe = $('<iframe id="preview-frame" src="' + $('input#virtualTouring').val() + '" style="border:none; min-width: 800px; min-height: 480px"></iframe>')
                            $('#virtual-touring-modal-preview #preview-frame').html('').append(iframe);
                            $('#virtual-touring-modal-preview').modal('show');
                        });
                        if (!Window.sa.data.virtualTouring() || Window.sa.data.virtualTouring() == '') {
                            viewMore.attr('disabled', true);
                            viewMore.removeClass('btn-primary').addClass('disabled');
                            Window.jsDetailData.virtualTouringChecked = false;
                            return;
                        }
                        Window.jsDetailData.virtualTouringChecked = true;
                    }
                }
            },
            {
                name: 'oldAddress',
                id: 'oldAddress',
                label: 'Địa chỉ cũ',
                type: 'input',
                target: '#oldAddress-wrapper',
                value: Window.sa.data.oldAddress(),
                afterRender: function (field) {
                    $('#' + field.id)
                        .geocomplete()
                        .bind("geocode:result", function (event, result) {
                            $('#' + field.id).trigger('change');
                        });
                }
            },
            {
                name: 'shortAddress',
                id: 'shortAddress',
                label: 'Địa chỉ rút gọn',
                type: 'input',
                target: '#shortAddress-wrapper',
                value: Window.sa.data.shortAddress()
            },
            {
                name: 'addressNote',
                id: 'addressNote',
                label: 'Ghi chú địa chỉ',
                type: 'editor',
                target: '#addressNote-wrapper',
                value: Window.sa.data.addressNote()
            },
            {
                name: 'price',
                id: 'price',
                class: 'form-control auto-format-vnd',
                label: 'Giá',
                type: 'input',
                target: '#price-wrapper',
                value: Window.sa.data.price()
            },
            {
                name: 'minPrice',
                id: 'minPrice',
                class: 'form-control auto-format-vnd',
                label: 'Giá thương lượng tối thiểu',
                type: 'input',
                target: '#minPrice-wrapper',
                value: Window.sa.data.minPrice()
            },
            {
                name: 'crawlerInfoNote',
                id: 'crawlerInfoNote',
                label: 'Ghi chú data',
                type: 'editor',
                target: '#crawlerInfoNote-wrapper',
                value: Window.sa.data.crawlerInfoNote(),
            },
            {
                name: 'prescreenerNote',
                id: 'prescreenerNote',
                label: 'Ghi chú Prescreener',
                type: 'editor',
                target: '#prescreenerNote-wrapper',
                value: Window.sa.data.prescreenerNote(),
            },
            {
                name: 'diyContent',
                id: 'diyContent',
                label: 'Ghi chú DIY',
                type: 'text',
                target: '#diyContent-wrapper',
                text: Window.sa.data.diyContent(),
                noRenderNull: true
            },
            {
                name: 'commissionText',
                id: 'commissionText',
                label: 'Ghi chú hoa hồng',
                type: 'text',
                target: '#commissionText-wrapper',
                text: Window.sa.data.commissionText(),
                noRenderNull: true
            },
            {
                name: 'diyPrice',
                id: 'diyPrice',
                class: 'auto-format-price',
                label: 'Ghi chú giá DIY',
                type: 'text',
                target: '#diyPrice-wrapper',
                text: Window.sa.data.diyPrice(),
                noRenderNull: true
            },
            {
                name: 'sourceId',
                id: 'sourceId',
                label: 'Nguồn tin đăng',
                type: 'select',
                target: '#sourceId-wrapper',
                text: Window.sa.data.sourceId(),
                isRendered: function () {
                    var _isRendered = true;
                    if (Window.jsRole != 'create') {
                        _isRendered = false;
                    }
                    return _isRendered;
                },
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        let optionList = selectDef.slice()
                        const sources = response.data.filter(type => type.type === 1)[0];
                        const soucesFilter = sources.list.filter(src => [2, 5, 7, 9, 166].indexOf(src.id) == -1);

                        const soucesLast = soucesFilter.map(src => {

                            if (src.childs.length > 0) {
                                _this.sourceIdHasChild.add(src.id);
                            }
                            return {
                                value: src.id,
                                text: src.name
                            }
                        });
                        // exception child for TC
                        _this.sourceIdHasChild.add(177);
                        optionList = optionList.concat(soucesLast);
                        return optionList;
                    }
                },
                onChange: function (field) {
                    _this.listAfter.showTc();
                },
                afterRender: function (field) {
                    _this.listAfter.showTc();
                }
            },
            {
                name: 'sourceName',
                id: 'sourceName',
                label: 'Nguồn tin đăng',
                type: 'text',
                target: '#sourceName-wrapper',
                text: Window.sa.data.sourceId() == 177 ? Window.sa.data.sourceName() + ' - ' + Window.sa.data.tcName() : Window.sa.data.sourceName(),
                isRendered: function () {
                    var _isRendered = true;
                    if (Window.jsRole == 'create') {
                        _isRendered = false;
                    }
                    return _isRendered;
                }
            },
            {
                name: 'channelTypeId',
                id: 'channelTypeId',
                label: 'Kênh thông tin',
                type: 'select',
                target: '#infoChannel-wrapper',
                value: Window.sa.data.channelTypeId(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return $.ajax({
                            url: POS_APIS_COMMON.get('GET_INFORMATION_CHANNEL'),
                            type: 'GET',
                            data: {}
                        });
                    },
                    callBack: function (response) {
                        let optionList = selectDef.slice()
                        if (response.result) {
                            const optionMap = response.data.list.map(it => {
                                return {
                                    value: it.id,
                                    text: it.name
                                }
                            });
                            optionList = optionList.concat(optionMap);
                        }
                        return optionList;
                    }
                },
                onChange: function (field) {
                    _this.listAfter.showInfoChannelChild();
                },
                afterRender: function (field) {
                    _this.listAfter.showInfoChannelChild();
                }
            },
            {//Năm xây dựng
                name: 'yearBuilt',
                id: 'yearBuilt',
                class: 'form-control auto-format-year',
                label: 'Năm xây dựng',
                type: 'input',
                target: '#yearBuilt-wrapper',
                value: Window.sa.data.yearBuilt()
            },
            {//Năm sửa nhà
                name: 'yearFixed',
                id: 'yearFixed',
                class: 'form-control auto-format-year',
                label: 'Năm sửa nhà',
                type: 'input',
                target: '#yearFixed-wrapper',
                value: Window.sa.data.yearFixed()
            },

            {//Đơn giá MT đường
                name: 'roadPrice',
                id: 'roadPrice',
                class: 'form-control auto-format-number',
                label: 'Đơn giá MT đường',
                type: 'input',
                target: '#roadPrice-wrapper',
                value: Window.sa.data.roadPrice()
            },
            {//Lửng
                name: 'isMezzanine',
                id: 'isMezzanine',
                label: 'Lửng',
                type: 'boolean',
                target: '#isMezzanine-wrapper',
                value: Window.sa.data.isMezzanine()
            },
            {//Sân thượng
                name: 'isRooftop',
                id: 'isRooftop',
                label: 'Sân thượng',
                type: 'boolean',
                target: '#isRooftop-wrapper',
                value: Window.sa.data.isRooftop()
            },
            {//Tầng hầm
                name: 'isBasement',
                id: 'isBasement',
                label: 'Tầng hầm',
                type: 'boolean',
                target: '#isBasement-wrapper',
                value: Window.sa.data.isBasement()
            },
            {//Gác suốt
                name: 'isAttic',
                id: 'isAttic',
                label: 'Gác suốt',
                type: 'boolean',
                target: '#isAttic-wrapper',
                value: Window.sa.data.isAttic()
            },
            {//Số phòng ngủ
                name: 'bedRooms',
                id: 'bedRooms',
                class: 'form-control auto-format-number',
                label: 'Số phòng ngủ',
                type: 'input',
                target: '#bedRooms-wrapper',
                value: Window.sa.data.bedRooms()
            },
            {//Số phòng wc
                name: 'bathRooms',
                id: 'bathRooms',
                class: 'form-control auto-format-number',
                label: 'Số phòng wc',
                type: 'input',
                target: '#bathRooms-wrapper',
                value: Window.sa.data.bathRooms()
            },
            {//Đúc thật/ Đúc giả
                name: 'houseCastings',
                id: 'houseCastings',
                label: 'Đúc thật / Đúc giả',
                type: 'select',
                target: '#houseCastings-wrapper',
                value: Window.sa.data.houseCastings(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Đúc thật'
                    },
                    {
                        value: 2,
                        text: 'Đúc giả'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                name: 'currency',
                id: 'currency',
                label: 'Loại',
                type: 'select',
                target: '#currency-wrapper',
                value: Window.sa.data.currency(),
                optionsListDef: [
                    {
                        value: 'VND',
                        text: 'VND'
                    },
                    {
                        value: 'USD',
                        text: 'USD'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {//Vị trí
                name: 'position',
                id: 'position',
                label: 'Vị trí',
                type: 'select',
                target: '#position-wrapper',
                value: Window.sa.data.position(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Mặt Tiền'
                    },
                    {
                        value: 2,
                        text: 'Hẻm'
                    }
                ],
                optionsList: {
                    type: null,
                },
                onChange: function (field) {
                    if (field) {
                        return _this.listAfter.toggleFieldsByPosition(field, true)
                    }
                },
                afterRender: function (field) {
                    if (field) {
                        return _this.listAfter.toggleFieldsByPosition(field)
                    }
                }
            },
            {
                name: 'alleyId',
                id: 'alleyId',
                label: 'Loại hẻm',
                type: 'select',
                target: '#alleyId-wrapper',
                value: Window.sa.data.alleyId(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getAlleyTypes();
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()
                        if (response.result) {
                            response.data.filter(item => {
                                optionList.push({value: item.alleyId, text: item.alleyName})
                            })
                        }
                        return optionList;
                    }
                }
            },
            {
                name: 'alleyType',
                id: 'alleyType',
                label: 'Hẻm (thông/cụt)',
                type: 'select',
                target: '#alleyType-wrapper',
                value: Window.sa.data.alleyType(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Hẻm thông'
                    },
                    {
                        value: 2,
                        text: 'Hẻm cụt'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                name: 'alleyWidth',
                id: 'alleyWidth',
                class: 'form-control auto-format-size',
                label: 'Độ rộng hẻm',
                type: 'input',
                target: '#alleyWidth-wrapper',
                value: Window.sa.data.alleyWidth()
            },
            {
                name: 'widthFrontWay', 
                id: 'widthFrontWay-alley',
                class: 'form-control auto-format-size',
                label: 'Độ rộng MT đường',
                type: 'input',
                target: '#widthFrontWay-alley-wrapper',
                value: Window.sa.data.widthFrontWay()
            },
            {
                name: 'widthValue',
                id: 'widthValue-alley',
                class: 'form-control auto-format-size',
                label: 'Độ rộng hẻm (Bên hông)',
                type: 'input',
                target: '#widthValue-alley-wrapper',
                value: Window.sa.data.widthValue()
            },
            {
                name: 'haveBeSide',
                id: 'haveBeSide-alley',
                label: 'Bên hông',
                type: 'boolean',
                target: '#haveBeSide-alley-wrapper',
                value: Window.sa.data.haveBeSide(),
                onChange: function (field) {
                    // reset value
                    $('#widthValue-alley-wrapper input#widthValue-alley').val('')

                    if ($(`#${field.id}`).prop('checked') === true) {
                        $('#widthValue-alley-wrapper').show()
                    } else {
                        $('#widthValue-alley-wrapper').hide()
                    }

                    return
                },
                afterRender: function (field) {
                    if ($(`#${field.id}`).prop('checked') === true) {
                        $('#widthValue-alley-wrapper').show()
                    } else {
                        $('#widthValue-alley-wrapper').hide()
                    }

                    return
                }
            },
            {
                name: 'widthFrontWay',
                id: 'widthFrontWay',
                class: 'form-control auto-format-size',
                label: 'Độ rộng MT đường (Bên hông)',
                type: 'input',
                target: '#widthFrontWay-wrapper',
                value: Window.sa.data.widthFrontWay(),
                onChange: function () {
                    if (hasValue(Window.sa.data.widthFrontWay())) {
                        $('#widthValue').val('');
                        Window.sa.data.widthValue('')
                    }
                }
            },
            {
                name: 'widthValue',
                id: 'widthValue',
                class: 'form-control auto-format-size',
                label: 'Độ rộng hẻm (Bên hông)',
                type: 'input',
                target: '#widthValue-wrapper',
                value: Window.sa.data.widthValue(),
                onChange: function () {
                    if (hasValue(Window.sa.data.widthValue())) {
                        $('#widthFrontWay').val('');
                        Window.sa.data.widthFrontWay('')
                    }
                }
            },
            {
                name: 'haveBeSide',
                id: 'haveBeSide',
                label: 'Bên hông',
                type: 'boolean',
                target: '#haveBeSide-wrapper',
                value: Window.sa.data.haveBeSide(),
                onChange: function (field) {
                    // reset value
                    $('#widthFrontWay-widthValue-wrapper input#widthFrontWay').val('')
                    Window.sa.data['widthFrontWay']('')

                    $('#widthFrontWay-widthValue-wrapper input#widthValue').val('')
                    Window.sa.data['widthValue']('')

                    if ($(`#${field.id}`).prop('checked') === true) {
                        $('#widthFrontWay-widthValue-wrapper').show()
                        $('#widthFrontWay-widthValue-wrapper #widthFrontWay-wrapper').show()
                        $('#widthFrontWay-widthValue-wrapper #widthValue-wrapper').show()
                    } else {
                        $('#widthFrontWay-widthValue-wrapper').hide()
                        $('#widthFrontWay-widthValue-wrapper #widthFrontWay-wrapper').hide()
                        $('#widthFrontWay-widthValue-wrapper #widthValue-wrapper').hide()
                    }

                    return
                },
                afterRender: function (field) {
                    if ($(`#${field.id}`).prop('checked') === true) {
                        $('#widthFrontWay-widthValue-wrapper').show()
                    } else {
                        $('#widthFrontWay-widthValue-wrapper').hide()
                    }

                    return
                }
            },
            {
                name: 'roadFrontageDistance',
                id: 'roadFrontageDistance',
                label: 'Khoảng Cách đến MT đường',
                type: 'select',
                target: '#roadFrontageDistance-wrapper',
                value: Window.sa.data.roadFrontageDistance(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: '<= 100m'
                    },
                    {
                        value: 100,
                        text: '100m-200m'
                    },
                    {
                        value: 200,
                        text: '200m-500m'
                    },
                    {
                        value: 500,
                        text: '> 500m'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                name: 'statusQuoId',
                id: 'statusQuoId',
                label: 'Hiện trạng nhà',
                type: 'select',
                target: '#statusQuoId-wrapper',
                value: Window.sa.data.statusQuoId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()

                        var tmp = response.data.find(function (data) {
                            if (data.type == 13) {
                                return data.list;
                            } else {
                                // nothing
                            }
                        });

                        if (hasValue(tmp)) {
                            tmp = tmp.list;
                        }

                        for (var i in tmp) {
                            optionList.push({
                                value: tmp[i].id,
                                text: tmp[i].name
                            })
                        }

                        return optionList;
                    }
                },
                onChange: function (field) {
                    _this.listAfter.priceForStatusQuo();
                },
                afterRender: function (field) {
                    _this.listAfter.priceForStatusQuo();
                }
            },
            {//Loại giấy tờ pháp lý
                name: 'useRightTypeId',
                id: 'useRightTypeId',
                label: 'Loại giấy tờ pháp lý',
                type: 'select',
                target: '#useRightTypeId-wrapper',
                value: Window.sa.data.useRightTypeId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getUserRightTypes();
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()

                        for (var i in response.data) {
                            optionList.push({
                                value: response.data[i].useRightTypeId,
                                text: response.data[i].typeName
                            });
                        }

                        return optionList;
                    }
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.showHideHouseShape(field, true)
                    }

                    return
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.showHideHouseShape(field)
                    }

                    return
                }
            },
            {
                name: 'privacy',
                id: 'privacy',
                label: 'Sở hữu chung / Sở hữu riêng',
                type: 'select',
                target: '#privacy-wrapper',
                value: Window.sa.data.privacy(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Sở hữu chung'
                    },
                    {
                        value: 2,
                        text: 'Sở hữu riêng'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                name: 'afterSigningContract',
                id: 'afterSigningContract',
                label: 'Ngay sau khi ký hợp đồng',
                type: 'boolean',
                target: '#afterSigningContract-wrapper',
                value: Window.sa.data.afterSigningContract(),
                onChange: function (field) {
                    _this.listAfter.movInDate(field, true);
                },
                afterRender: function (field) {
                    _this.listAfter.movInDate(field);
                }
            },
            {
                name: 'moveInDate',
                id: 'moveInDate',
                class: 'form-control date-picker',
                label: 'Ngày có thể dọn vào',
                type: 'input',
                target: '#moveInDate-wrapper',
                value: Window.sa.data.moveInDate(),
                onChange: function () {
                    if (hasValue(Window.sa.data.moveInDate())) {
                        $('.contract-group.has-error').removeClass('has-error');
                    }
                },
                afterRender: function (field) {
                    $('#' + field.id).datepicker({
                        autoClose: true,
                        format: 'dd/mm/yyyy',
                        language: 'vn'
                    })
                }
            },
            {//Hình dạng căn nhà
                name: 'houseShape',
                id: 'houseShape',
                label: 'Hình dạng căn nhà',
                type: 'select',
                target: '#houseShape-wrapper',
                value: Window.sa.data.houseShape(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        return Window.sa.api.getChannelTypeList();
                    },
                    callBack: function (response) {
                        let optionList = selectDef.slice()

                        let tmp = response.data.find(data => data.type === 8);
                        const options = tmp.list.map(it => {
                            return {
                                value: it.id,
                                text: it.name
                            };
                        });

                        optionList = optionList.concat(options);
                        return optionList;
                    }
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.showHideHouseShapeOther(field, true)
                    }

                    return
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.showHideHouseShapeOther(field)
                    }

                    return
                }
            },
            {
                name: 'otherHouseShape',
                id: 'otherHouseShape',
                label: 'Hình dạng căn nhà (Khác)',
                type: 'input',
                target: '#otherHouseShape-wrapper',
                value: Window.sa.data.otherHouseShape()
            },
            {//Số thửa
                name: 'landCode',
                id: 'landCode',
                label: 'Số thửa',
                type: 'input',
                target: '#landCode-wrapper',
                value: Window.sa.data.landCode(),
                afterRender: function (field) {
                    $('#landCode').inputNumber({
                        start: 0
                    })
                }
            },
            {//Tờ bản đồ
                name: 'mapCode',
                id: 'mapCode',
                label: 'Tờ bản đồ',
                type: 'input',
                target: '#mapCode-wrapper',
                value: Window.sa.data.mapCode(),
                afterRender: function (field) {
                    $('#mapCode').inputNumber({
                        start: 0
                    })
                }
            },
            {//Năm cấp sổ
                name: 'mapYear',
                id: 'mapYear',
                class: 'form-control auto-format-year',
                label: 'Năm cấp sổ',
                type: 'input',
                target: '#mapYear-wrapper',
                value: Window.sa.data.mapYear()
            },
            {
                name: 'isDoneForDiy',
                id: 'isDoneForDiy',
                label: 'Đã chỉnh sửa theo yêu cầu từ DIY',
                type: 'boolean',
                target: '#isDoneForDiy-wrapper',
                value: Window.sa.data.isDoneForDiy()
            },
            {//Thời gian thuê tối thiểu
                name: 'minContractDeadline',
                id: 'minContractDeadline',
                label: 'Thời gian thuê tối thiểu',
                type: 'input',
                target: '#minContractDeadline-wrapper',
                value: Window.sa.data.minContractDeadline()
            },
            {
                name: 'deposit',
                id: 'deposit',
                class: 'auto-format-price',
                label: 'Số tiền đặt cọc cho thuê',
                type: 'input',
                target: '#deposit-wrapper',
                value: Window.sa.data.deposit()
            },
            {//Diện tích đất
                name: 'lotSize',
                id: 'lotSize',
                class: 'form-control auto-format-size',
                label: 'Diện tích đất',
                type: 'input',
                target: '#lotSize-wrapper',
                value: Window.sa.data.lotSize()
            },
            {//Diện tích sử dụng
                name: 'floorSize',
                id: 'floorSize',
                class: 'form-control auto-format-size',
                label: 'Diện tích sử dụng',
                type: 'input',
                target: '#floorSize-wrapper',
                value: Window.sa.data.floorSize()
            },
            {//Chiều dài
                name: 'sizeLength',
                id: 'sizeLength',
                class: 'form-control auto-format-size',
                label: 'Chiều dài',
                type: 'input',
                target: '#sizeLength-wrapper',
                value: Window.sa.data.sizeLength()
            },
            {//Chiều rộng
                name: 'sizeWidth',
                id: 'sizeWidth',
                class: 'form-control auto-format-size',
                label: 'Chiều rộng',
                type: 'input',
                target: '#sizeWidth-wrapper',
                value: Window.sa.data.sizeWidth()
            },
            {//Hướng nhà
                name: 'directionId',
                id: 'directionId',
                label: 'Hướng nhà',
                type: 'select',
                target: '#directionId-wrapper',
                value: Window.sa.data.directionId(),
                optionsListDef: [
                    {
                        value: '',
                        text: '-- Vui Lòng Chọn --'
                    },
                    {
                        value: 1,
                        text: 'Đông'
                    },
                    {
                        value: 2,
                        text: 'Tây'
                    },
                    {
                        value: 3,
                        text: 'Nam'
                    },
                    {
                        value: 4,
                        text: 'Bắc'
                    },
                    {
                        value: 5,
                        text: 'Đ.Bắc'
                    },
                    {
                        value: 6,
                        text: 'T.Bắc'
                    },
                    {
                        value: 7,
                        text: 'Đ.Nam'
                    },
                    {
                        value: 8,
                        text: 'T.Nam'
                    },
                    {
                        value: -1,
                        text: 'Không xác định'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                groupBelongTo: ".house-info-group",
                name: 'numberFloor',
                id: 'numberFloor_not_building',
                class: 'form-control auto-format-number',
                label: 'Số lầu',
                type: 'input',
                target: '#numberFloor_not_building-wrapper',
                value: Window.sa.data.numberFloor(),
                isDisabled: false
            },
            {
                groupBelongTo: ".house-info-group",
                name: 'buildingFloors',
                id: 'buildingFloors',
                label: 'Vị trí tầng',
                type: 'input',
                target: '#buildingFloors-wrapper',
                value: Window.sa.data.buildingFloors(),
                onChange: function (field) {
                    $('#' + field.id).inputNumber({start: -5, end: parseInt(Window.sa.data.numberFloor()), negative: true})

                    return
                },
                afterRender: function (field) {
                    $('#' + field.id).inputNumber({start: -5, end: parseInt(Window.sa.data.numberFloor()), negative: true})

                    return
                },
            },
            {
                name: 'cityId',
                id: 'cityId',
                label: 'Thành Phố',
                type: 'select',
                target: '#cityId-wrapper',
                value: Window.sa.data.cityId(),
                optionsListDef: [
                    {
                        value: 1,
                        text: 'TP Hồ Chí Minh'
                    }
                ],
                optionsList: {
                    type: null,
                }
            },
            {
                name: 'districtId',
                id: 'districtId',
                label: 'Quận',
                type: 'select',
                target: '#districtId-wrapper',
                value: Window.sa.data.districtId(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getDistrictList(Window.sa.data.cityId());
                    },
                    callBack: function (response) {
                        let optionList = [{
                            value: '',
                            text: '----Chọn Quận----'
                        }];
                        if (response.result) {
                            $.each(response.data, function (idx, item) {
                                optionList.push({
                                    value: item.districtId,
                                    text: item.districtName,
                                })
                            })
                        }

                        return optionList;
                    },
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.toggleFieldsByDistrictId(field, true)
                    }
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.toggleFieldsByDistrictId(field)
                    }
                }
            },
            {
                name: 'wardId',
                id: 'wardId',
                label: 'Phường',
                type: 'select',
                target: '#wardId-wrapper',
                value: Window.sa.data.wardId(),
                optionsListDef: [{
                    value: '',
                    text: '----Chọn Phường----'
                }],
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.districtId()) {
                            return Listing.getWardList(Window.sa.data.districtId());
                        }
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: '',
                            text: '----Chọn Phường----'
                        }];
                        if (response.result) {
                            $.each(response.data, function (idx, item) {
                                optionList.push({
                                    value: item.wardId,
                                    text: item.wardName,
                                })
                            })
                        }

                        return optionList;
                    },
                },
                onChange: function (field) {
                    if (field) {
                        const streetField = _this.list.filter((item, i) => item.id === 'streetId')
                        streetField[0].optionsList.type = 'ajax'

                        return appendDOM(streetField[0])
                    }

                    return
                },
                afterRender: function (field) {
                    if (field && field.value) {
                        const streetField = _this.list.filter((item, i) => item.id === 'streetId')
                        streetField[0].optionsList.type = 'ajax'
                        
                        return appendDOM(streetField[0])
                    }

                    return
                }
            },
            {
                name: 'streetId',
                id: 'streetId',
                label: 'Đường',
                type: 'select',
                target: '#streetId-wrapper',
                value: Window.sa.data.streetId(),
                optionsListDef: [{
                    value: '',
                    text: '----Chọn Đường----'
                }],
                optionsList: {
                    type: '',
                    data: function () {
                        if (Window.sa.data.wardId()) {
                            return Listing.getStreetList(Window.sa.data.wardId());
                        }

                        return [{
                            value: '',
                            text: '----Chọn Đường----'
                        }]
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: '',
                            text: '----Chọn Đường----'
                        }];
                        if (response.result) {
                            $.each(response.data, function (idx, item) {
                                var attrs = {};
                                for (var _item in item) {
                                    attrs[_item] = item[_item];
                                }
                                optionList.push({
                                    value: item.streetId,
                                    text: item.streetName,
                                    attrs: attrs
                                })
                            })
                        }

                        return optionList;
                    },
                },
                html: function () {
                    var _html = null;
                    if (Window.jsRole != 'view') {
                        // _html = '<div class="row"><div class="col-md-12"><label for="streetId" class="control-label required">Đường</label></div><div class="col-md-12"><div class="input-group add-new-street"><select id="streetId" class="form-control" data-label="Đường"></select><span id="add-new-street-btn"class="input-group-addon input-group-addon-success-btn add-new-street-btn"><i class="glyphicon glyphicon-plus" aria-hidden="true"></i></span></div></div></div>';
                        // hide button add new address
                        _html = '<div class="row"><div class="col-md-12"><label for="streetId" class="control-label required">Đường</label></div><div class="col-md-12"><select id="streetId" class="form-control" data-label="Đường"></select></div></div></div>';
                    }
                    return _html;
                },
                onChange: function () {
                    _this.listAfter.updateRoadFrontageWidth();
                },
                ajaxDone: function () {
                    _this.listAfter.loadRoadPrice();
                    _this.listAfter.updateRoadFrontageWidth();
                }
            },
            {//houseNumber
                name: 'houseNumber',
                id: 'houseNumber',
                label: 'Số nhà',
                type: 'input',
                target: '#houseNumber-wrapper',
                value: Window.sa.data.houseNumber(),
            },
            {
                name: 'haveSupportLegal',
                id: 'haveSupportLegal',
                label: 'Có',
                type: 'boolean',
                target: '#haveSupportLegal-wrapper',
                value: Window.sa.data.haveSupportLegal()
            },
            {
                name: 'advantages',
                id: 'advantages',
                label: 'Đặc điểm tốt',
                type: 'multiColumnCheckList',
                target: '#advantages-wrapper',
                value: Window.sa.data.advantages(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Window.sa.api.getChannelTypeList();
                    },
                    callBack: function (response) {
                        var optionList = [];
                        var advantages = Window.jsDetailData.advantages;
                        var tmp = response.data.find(function (data) {
                            if (data.type == 5) {
                                return data.list;
                            } else {
                                // nothing
                            }
                        });

                        if (hasValue(tmp)) {
                            tmp = tmp.list;
                        }

                        for (var i in tmp) {
                            var isChecked = false;
                            advantages.find(function (data) {
                                if (data.id.advantageId == tmp[i].id) {
                                    isChecked = true;
                                    return 1;
                                } else {
                                    isChecked = false;
                                    return 0;
                                }
                            });

                            optionList.push({
                                value: tmp[i].id,
                                text: tmp[i].name,
                                isChecked: isChecked
                            })
                        }

                        return optionList;
                    }
                },
                onChange: function (field) {
                    var advantages = [];

                    $('[name=' + field.id + ']:checked').each(function (i, item) {
                        advantages.push(
                            {
                                id: {
                                    advantageId: $(item).val()
                                }
                            }
                        );

                    });

                    Window.sa.data.advantages(advantages);
                }
            },
            {
                name: 'disadvantages',
                id: 'disadvantages',
                label: 'Đặc điểm xấu',
                type: 'multiColumnCheckList',
                target: '#disadvantages-wrapper',
                value: Window.sa.data.disadvantages(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Window.sa.api.getChannelTypeList();
                    },
                    callBack: function (response) {
                        var optionList = [];
                        var disadvantages = Window.jsDetailData.disadvantages;
                        var tmp = response.data.find(function (data) {
                            if (data.type == 6) {
                                return data.list;
                            } else {
                                // nothing
                            }
                        });

                        if (hasValue(tmp)) {
                            tmp = tmp.list;
                        }

                        for (var i in tmp) {
                            var isChecked = false;
                            disadvantages.find(function (data) {
                                if (data.id.disAdvantageId == tmp[i].id) {
                                    isChecked = true;
                                    return 1;
                                } else {
                                    isChecked = false;
                                    return 0;
                                }
                            });

                            optionList.push({
                                value: tmp[i].id,
                                text: tmp[i].name,
                                isChecked: isChecked
                            })
                        }

                        return optionList;
                    }
                },
                onChange: function (field) {
                    var disadvantages = [];

                    $('[name=' + field.id + ']:checked').each(function (i, item) {
                        disadvantages.push(
                            {
                                id: {
                                    disAdvantageId: $(item).val()
                                }
                            }
                        );

                    });

                    Window.sa.data.disadvantages(disadvantages);
                }
            },
            {
                name: 'title',
                id: 'title',
                label: 'Tiêu đề',
                type: 'input',
                target: '#title-wrapper',
                value: Window.sa.data.title()
            },
            {
                name: 'description',
                id: 'description',
                label: 'Mô tả nhà',
                type: 'CKEditor',
                target: '#description-wrapper',
                value: Window.sa.data.description()
            },
            {
                name: 'metaTitle',
                id: 'metaTitle',
                label: 'Meta title',
                type: 'input',
                target: '#metaTitle-wrapper',
                value: Window.sa.data.metaTitle()
            },
            {
                name: 'metaDescription',
                id: 'metaDescription',
                label: 'Meta description',
                type: 'editor',
                target: '#metaDescription-wrapper',
                value: Window.sa.data.metaDescription()
            },
            {
                name: 'metaKeywords',
                id: 'metaKeywords',
                label: 'Meta keywords',
                type: 'input',
                target: '#metaKeywords-wrapper',
                value: Window.sa.data.metaKeywords()
            },
            {
                name: 'mockSurnameId',
                id: 'mockSurnameId',
                label: 'Định danh',
                type: 'select',
                target: '#mockSurnameId-wrapper',
                value: Window.sa.data.mockSurnameId(),
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return $.ajax({
                            url: POS_APIS_COMMON.get('GET_CHANNEL_TYPES') + '?type=10',
                            type: "GET",
                        });
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: '',
                            text: '----Chọn định danh----'
                        }];
                        if (response.result) {
                            let dataMap = response.data[0].list.map(it => {
                                return {
                                    value: it.id,
                                    text: it.name
                                }
                            });
                            optionList = optionList.concat(dataMap);
                        }

                        return optionList;
                    }
                }
            },
            {
                name: 'name',
                id: 'name',
                label: 'Tên chủ nhà / nhà đầu tư',
                type: 'input',
                target: '#name-wrapper',
                value: Window.sa.data.name(),
                customRenderHTML: function (item) {
                    if (hasValue(Window.sa.data.phone())) {
                        const html = '<div class="row">' +
                        '   <div class="col-md-12">' +
                        '       <div class="input-group">' +
                        '           ' + item +
                        '           <span id="sa-call-btn9" class="show-pos-call input-group-addon input-group-addon-success-btn make-call" data-type="1">' +
                        '               <i class="fa fa-volume-control-phone" aria-hidden="true"></i>' +
                        '           </span>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>'

                        return html
                    }

                    return item
                },
            },
            {
                name: 'phone',
                id: 'phone',
                label: 'Số điện thoại',
                type: 'input',
                target: '#phone-wrapper',
                value: Window.sa.data.phone(),
                isHide: true,
                customRenderHTML: function (item) {
                    var _html = null;
                    if (!hasValue(Window.sa.data.phone())) {
                        _html = '<div class="row">' +
                            '   <div class="col-md-12">' +
                            '       <div class="input-group">' +
                            '           <input id="phone" class="form-control phone-number">' +
                            '           <span id="sa-call-btn9" class="show-pos-call input-group-addon input-group-addon-success-btn make-call" data-type="1">' +
                            '               <i class="fa fa-volume-control-phone" aria-hidden="true"></i>' +
                            '           </span>' +
                            '       </div>' +
                            '   </div>' +
                            '</div>';
                    }
                    return _html;
                },
                afterRender: function () {
                    _this.listAfter.showHidePhone();
                },
                onChange: function () {
                    if (hasValue(Window.sa.data.phone())) {
                        _this.phoneIsChanged = true;
                    } else {
                        _this.phoneIsChanged = null;
                    }
                }
            },
            {//Áp mái
                name: 'isPenhouse',
                id: 'isPenhouse',
                label: 'Áp mái',
                type: 'boolean',
                target: '#isPenhouse-wrapper',
                value: Window.sa.data.isPenhouse()
            },
            {//Thông tin quy hoạch
                name: 'havePlanning',
                id: 'havePlanning',
                label: 'Thông tin quy hoạch',
                type: 'select',
                target: '#havePlanning-wrapper',
                value: Window.sa.data.havePlanning(),
                optionsListDef: [
                    {
                        value: 0,
                        text: 'Chưa có thông tin'
                    },
                    {
                        value: 1,
                        text: 'Có thông tin'
                    },
                    {
                        value: 2,
                        text: 'Không có thông tin'
                    }
                ],
                optionsList: {
                    type: null,
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.showPlanningAndRightOfWay(field, true)
                    }

                    return
                },
                afterRender: function (field) {
                    _this.listAfter.showPlanningAndRightOfWay(field)

                    return
                }
            },
            {//Loại quy hoạch
                name: 'planingType',
                id: 'planing-type',
                label: 'Loại quy hoạch',
                type: 'select',
                target: '#planing-type-wrapper',
                value: Window.sa.data.planingType(),
                optionsList: {
                    type: '',
                    data: function () {
                        return Window.sa.api.getChannelTypeList();
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: '',
                            text: 'Chọn loại quy hoạch'

                        }];
                        if (response.result) {
                            let optionFilter = response.data.filter(it => it.type == 10);
                            if (optionFilter && optionFilter.length > 0) {
                                optionFilter = optionFilter[0].list;
                                const optionMap = optionFilter.map(it => {
                                    return {
                                        value: it.id,
                                        text: it.name
                                    };
                                })
                                optionList = optionList.concat(optionMap);
                            }
                        }

                        return optionList;
                    }
                },
            },
            {
                name: 'planingNote',
                id: 'planing-note',
                label: 'Ghi chú',
                type: 'input',
                target: '#planing-note-wrapper',
                value: Window.sa.data.planingNote()
            },
            {
                name: 'planingRightOfWay',
                id: 'planing-right-of-way',
                label: 'Lộ giới',
                type: 'input',
                target: '#planing-right-of-way-wrapper',
                value: Window.sa.data.planingRightOfWay(),
                afterRender: function () {
                    $('#planing-right-of-way').inputNumber({start: 0, isFloat: true});
                }
            },
            {
                name: 'planingArea',
                id: 'planing-area',
                label: 'Diện tích quy hoạch (20%)',
                type: 'input',
                target: '#planing-area-wrapper',
                value: Window.sa.data.planingArea(),
                afterRender: function () {
                    $('label[for="planing-area"]').html('Diện tích quy hoạch (' + Window.sa.data.planingAreaPercent() + ')');
                    $('#planing-area').inputNumber({start: 0, isFloat: true, end: 100});
                }
            },
            {
                name: 'planingAreaOther',
                id: 'planing-area-other',
                label: 'Diện tích còn lại (80%)',
                type: 'text',
                target: '#planing-area-other-wrapper',
                text: Window.sa.data.planingAreaOther(),
                afterRender: function () {
                    $('label[for="planing-area-other"]').html('Diện tích còn lại (' + Window.sa.data.planingAreaOtherPercent() + ')');
                }
            },
            {
                name: 'planingPhotos',
                id: 'planing-photos',
                label: 'Hình ảnh quy hoạch',
                type: 'input_file',
                target: '#planing-photos-wrapper',
                text: Window.sa.data.planingPhotos(),
                afterRender: function (field) {
                    if (field) {
                        $('#planing-photos-wrapper').imagesPosLib({
                            urlUpload : Window.sa.api.apiList.uploadPhoto,
                            source : 'props',
                            gallery : 'photoGcn',
                            list: Window.sa.data.planingPhotos(),
                            useImageDefault : false,
                        });
                    }

                    return
                }
            },
            {//Loại nhà
                name: 'houseTypeId',
                id: 'houseTypeId',
                label: 'Loại nhà',
                type: 'select',
                target: '#houseTypeId-wrapper',
                value: Window.sa.data.houseTypeId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        var optionList = selectDef.slice()

                        var tmp = response.data.find(function (data) {
                            if (data.type == 2) {
                                return data.list;
                            } else {
                                // nothing
                            }
                        });

                        if (hasValue(tmp)) {
                            tmp = tmp.list;
                        }

                        $.each(tmp, function (i, house) {
                            optionList.push({
                                value: house.id,
                                text: house.name
                            })
                        })

                        return optionList;
                    }
                },
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.toggleFieldsByHouseTypeId(field, true)
                    }

                    return
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.toggleFieldsByHouseTypeId(field)
                    }

                    return
                }
            },
            {
                name: 'constructionTypeId',
                id: 'constructionTypeId',
                label: 'Loại công trình',
                type: 'select',
                target: '#constructionTypeId-wrapper',
                value: Window.sa.data.constructionTypeId(),
                optionsListDef: selectDef.slice(),
                optionsList: {
                    type: '',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        let optionList = selectDef.slice()

                        var tmp = response.data.find(function (data) {
                            if (data.type == 2) {
                                return data.list;
                            } else {
                                // nothing
                            }
                        });

                        if (hasValue(tmp)) {
                            tmp = tmp.list;
                        }
                        var houseTypeId = Window.sa.data.houseTypeId();
                        $.each(tmp, function (i, house) {
                            if (house.id == houseTypeId) {
                                $.each(house.childs, function (idx, construct) {
                                    optionList.push({
                                        value: construct.id,
                                        text: construct.name
                                    })
                                })
                            }
                        })

                        return optionList;
                    },
                }
            },
            {
                name: 'depreciation',
                id: 'depreciation',
                class: 'form-control auto-format-percent',
                label: 'Khấu hao công trình (%)',
                type: 'input',
                target: '#depreciation-wrapper',
                value: Window.sa.data.depreciation()
            },
            {//Thế chấp ngân hàng
                name: 'mortgaged',
                id: 'mortgaged',
                label: 'Thế chấp ngân hàng',
                type: 'boolean',
                target: '#mortgaged-wrapper',
                value: Window.sa.data.mortgaged(),
                onChange: function (field) {
                    if (field) {
                        _this.listAfter.showHideBank(field, true)
                    }
                },
                afterRender: function (field) {
                    if (field) {
                        _this.listAfter.showHideBank(field)
                    }
                },
            },
            {//Ngân hàng
                name: 'bankId',
                id: 'bankId',
                label: 'Ngân hàng thế chấp',
                type: 'select',
                target: '#bankId-wrapper',
                value: Window.sa.data.bankId(),
                customRenderHTML: function (item) {
                    const html = '<div class="input-group add-new-bank">' + item +
                    '<span id="add-new-bank-btn"class="input-group-addon input-group-addon-success-btn add-new-bank-btn">' +
                    '<i class="glyphicon glyphicon-plus" aria-hidden="true"></i>' +
                    '</span>' +
                    '</div>'

                    return html
                },
                optionsListDef: [{
                    value: '',
                    text: 'Chọn ngân hàng'
                }],
                optionsList: {
                    type: '',
                    data: function () {
                        if (!Window.jsDetailData.banks) {
                            return $.ajax({
                                url: POS_APIS_COMMON.get('GET_BANK_LIST'),
                                type: "GET",
                            });
                        }

                        return Window.jsDetailData.banks
                    },
                    callBack: function (response) {
                        let optionList = [{
                            value: '',
                            text: 'Chọn ngân hàng'
                        }];
                        if (response.result) {
                            const dataMap = response.data.map(bank => {
                                return {
                                    value: bank.id,
                                    text: bank.name
                                };
                            });
                            optionList = optionList.concat(dataMap)

                            // save select list realEstateGroup
                            Window.jsDetailData.banks = optionList
                        }

                        return optionList;
                    },
                },
            },
        ];

        _this.listAfter = {
            toggleFieldsByPosition: function (field, isChanged) {
                const position = Window.sa.data.position()

                if (isChanged) {
                    // reset checked
                    $('input#haveBeSide').prop('checked', false)
                    $('input#haveBeSide-alley').prop('checked', false);

                    // hide wrapper
                    $('#widthValue-alley-wrapper').hide()
                    $('#widthFrontWay-widthValue-wrapper').hide()

                    // reset input value 
                    $('input#widthFrontWay').val('')
                    $('input#widthValue').val('')
                }

                let toggleGroupRoadFrontage = false
                let toggleGroupAlley = false

                let isHideRoadFrontageWidth = true
                let isHideAlleyId = true
                let isHideRoadFrontageDistance = true
                let isHideAlleyType = true
                let isHideAlleyWidth = true
                let isHideWidthFrontWay = true

                let requiredRoadFrontageWidth = false
                let requiredAlleyId = false
                let requiredRoadFrontageDistance = false
                let requiredAlleyType = false
                let requiredAlleyWidth = false
                let requiredWidthFrontWay = false

                if (position == 1) { // Mặt Tiền
                    toggleGroupRoadFrontage = true

                    isHideRoadFrontageWidth = false
                    
                    requiredRoadFrontageWidth = true
                }
                if (position == 2) { // Hẻm
                    toggleGroupAlley = true

                    isHideAlleyId = false
                    requiredAlleyId = true

                    isHideRoadFrontageDistance = false
                    requiredRoadFrontageDistance = true

                    isHideAlleyType = false
                    requiredAlleyType = true

                    isHideAlleyWidth = false
                    requiredAlleyWidth = true

                    isHideWidthFrontWay = false
                    requiredWidthFrontWay = true
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        { // Độ rộng MT đường
                            id: 'roadFrontageWidth',
                            updatedAttrs: [{
                                dataId: 'roadFrontageWidth',
                                isHide: isHideRoadFrontageWidth,
                                required: requiredRoadFrontageWidth,
                                toggleGroup: toggleGroupRoadFrontage,
                                value: Window.sa.data['roadFrontageWidth'](),
                            }],
                        },
                        { // Độ rộng MT đường (bên hông)
                            id: 'widthFrontWay',
                            updatedAttrs: [{
                                dataId: 'widthFrontWay',
                                value: Window.sa.data['widthFrontWay'](),
                            }],
                        }, { // Độ rộng hẻm (Bên hông)
                            id: 'widthValue',
                            updatedAttrs: [{
                                dataId: 'widthValue',
                                value: Window.sa.data['widthValue'](),
                            }]
                        },

                        { // Loại hẻm
                            id: 'alleyId',
                            updatedAttrs: [{
                                dataId: 'alleyId',
                                isHide: isHideAlleyId,
                                required: requiredAlleyId,
                                toggleGroup: toggleGroupAlley,
                                value: Window.sa.data['alleyId'](),
                            }],
                        }, { // Khoảng Cách đến MT đường
                            id: 'roadFrontageDistance',
                            updatedAttrs: [{
                                dataId: 'roadFrontageDistance',
                                isHide: isHideRoadFrontageDistance,
                                required: requiredRoadFrontageDistance,
                                toggleGroup: toggleGroupAlley,
                                value: Window.sa.data['roadFrontageDistance'](),
                            }],
                        }, { // Hẻm (thông/cụt)
                            id: 'alleyType',
                            updatedAttrs: [{
                                dataId: 'alleyType',
                                isHide: isHideAlleyType,
                                required: requiredAlleyType,
                                toggleGroup: toggleGroupAlley,
                                value: Window.sa.data['alleyType'](),
                            }],
                        }, { // Độ rộng hẻm
                            id: 'alleyWidth',
                            updatedAttrs: [{
                                dataId: 'alleyWidth',
                                isHide: isHideAlleyWidth,
                                required: requiredAlleyWidth,
                                toggleGroup: toggleGroupAlley,
                                value: Window.sa.data['alleyWidth'](),
                            }],
                        }, { // Độ rộng MT đường (Hẻm)
                            id: 'widthFrontWay-alley',
                            updatedAttrs: [{
                                dataId: 'widthFrontWay-alley',
                                isHide: isHideWidthFrontWay,
                                required: requiredWidthFrontWay,
                                toggleGroup: toggleGroupAlley,
                                value: Window.sa.data['widthFrontWay'](),
                            }],
                        }, { // Độ rộng hẻm (Bên hông)
                            id: 'widthValue-alley',
                            updatedAttrs: [{
                                dataId: 'widthValue-alley',
                                value: Window.sa.data['widthValue'](),
                            }]
                        }
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)

                return
            },
            toggleFormFieldsByListingType: function (field, isChanged) {
                _this.listAfter.commissionListFn();
                _this.listAfter.showHideCurrencyOnLoad();

                const listingTypeId = Window.sa.data.listingTypeId();
                let isAjaxRealEstate = false
                let isDisabledRealEstate = true

                if (listingTypeId) {
                    isAjaxRealEstate = true
                    isDisabledRealEstate = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'realEstateGroupId',
                            updatedAttrs: [{
                                dataId: 'realEstateGroupId',
                                isAjax: isAjaxRealEstate,
                                isDisabled: isDisabledRealEstate,
                                value: Window.sa.data['realEstateGroupId'](),
                            }]
                        },
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
                
                return
            },
            toggleFormFieldsByRealEstateId: function (field, isChanged) {
                const realEstateGroupId = Window.sa.data.realEstateGroupId()
                let isAjax = false
                let isDisabled = true

                if (realEstateGroupId) {
                    isAjax = true
                    isDisabled = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'propertyTypeId',
                            updatedAttrs: [{
                                dataId: 'propertyTypeId',
                                isAjax,
                                isDisabled,
                                value: Window.sa.data['propertyTypeId'](),
                            }]
                        },
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
                
                return
            },
            toggleFieldsByBuildingId: function (field, isChanged) {
                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'blockId',
                            updatedAttrs: [{
                                dataId: 'blockId',
                                isAjax: true,
                                value: Window.sa.data['blockId']()
                            }]
                        },
                        {
                            id: 'projectId',
                            updatedAttrs: [{
                                dataId: 'projectid',
                                isAjax: true,
                                value: Window.sa.data['projectId']()
                            }]
                        },
                        {
                            id: 'numberFloor_building',
                            updatedAttrs: [{
                                dataId: 'numberfloor',
                                value: Window.sa.data['numberFloor']()
                            }]
                        },
                        {
                            id: 'address',
                            updatedAttrs: [{
                                dataId: 'address',
                                isAjax: true,
                                value: Window.sa.data['address']()
                            }]
                        },
                        {
                            id: 'latitude',
                            updatedAttrs: [{
                                dataId: 'latitude',
                                value: Window.sa.data['latitude']()
                            }]
                        },
                        {
                            id: 'longitude',
                            updatedAttrs: [{
                                dataId: 'longitude',
                                value: Window.sa.data['longitude']()
                            }]
                        },
                    ]
                }

                return generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            toggleFieldsByDistrictId: function (field, isChanged) {
                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'buildingId',
                            updatedAttrs: [{
                                dataId: 'buildingId',
                                isAjax: true,
                                value: Window.sa.data['buildingId'](),
                            }]
                        },
                        {
                            id: 'blockId',
                            updatedAttrs: [{
                                dataId: 'blockId',
                                isAjax: true,
                                value: Window.sa.data['blockId'](),
                            }]
                        },
                        {
                            id: 'projectId',
                            updatedAttrs: [{
                                dataId: 'projectId',
                                isAjax: true,
                                value: Window.sa.data['projectId'](),
                            }]
                        },
                        {
                            id: 'numberFloor_building',
                            updatedAttrs: [{
                                dataId: 'numberFloor_building',
                                value: Window.sa.data['numberFloor'](),
                            }]
                        },
                        {
                            id: 'wardId',
                            updatedAttrs: [{
                                dataId: 'wardId',
                                isAjax: true,
                                value: Window.sa.data['wardId'](),
                            }]
                        },
                        {
                            id: 'streetId',
                            updatedAttrs: [{
                                dataId: 'streetId',
                                isAjax: true,
                                value: Window.sa.data['streetId'](),
                            }]
                        },
                    ]
                } 
                return generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            toggleFieldsByHouseTypeId: function (field, isChanged) {
                const houseTypeId = Window.sa.data.houseTypeId();
                let isHide = false
                let required = true
                let isAjax = true

                if ($.inArray(houseTypeId, [null, 89]) > -1) { // 89: Nhà nát
                    isHide = true
                    required = false
                    isAjax = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'constructionTypeId',
                            updatedAttrs: [{
                                dataId: 'constructionTypeId',
                                isAjax,
                                isHide,
                                required,
                                value: Window.sa.data['constructionTypeId'](),
                            }]
                        },
                        {
                            id: 'depreciation',
                            updatedAttrs: [{
                                dataId: 'depreciation',
                                isHide,
                                required,
                                value: Window.sa.data['depreciation'](),
                            }]
                        },
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            showHideAgentIsOwner: function () {
                if (Window.sa.data.isOwner() && Window.sa.data.crawlerStatus() == 3) {
                    $("#name").prop("disabled", true);
                    $("#phone").prop("disabled", true);
                    $("#show-pos-call[data-type='1']").prop("disabled", true);
                    $("#email").prop("disabled", true);
                    $("#btn-check-duplicated-email").prop("disabled", true);
                    $("#mockSurnameId").prop("disabled", true);
                } else {
                    $("#name").prop("disabled", false);
                    $("#phone").prop("disabled", false);
                    $("#show-pos-call[data-type='1']").prop("disabled", false);
                    $("#email").prop("disabled", false);
                    $("#btn-check-duplicated-email").prop("disabled", false);
                    $("#mockSurnameId").prop("disabled", false);
                }
            },

            showTc: function () {
                const sourceId = Window.sa.data.sourceId() ? Number.parseInt(Window.sa.data.sourceId()) : null;
                if (Window.jsRole == 'create') {
                    $('#tc-wrapper').html('');
                    if (sourceId === 177) {
                        const tc = {
                            name: 'tcid',
                            id: 'tcid',
                            label: 'Trung tâm giao dịch',
                            type: 'select',
                            target: '#tc-wrapper',
                            value: Window.sa.data.tcid(),
                            optionsListDef: selectDef.slice(),
                            optionsList: {
                                type: 'ajax',
                                data: function () {
                                    return $.ajax({
                                        url: POS_APIS_SA.get('GET_TRANSACTION_CENTER'),
                                        type: 'GET',
                                        data: {}
                                    });
                                },
                                callBack: function (response) {
                                    var optionList = selectDef.slice()

                                    $.each(response.data, function (i, item) {
                                        optionList.push({
                                            value: item.id,
                                            text: item.name
                                        });
                                    });

                                    return optionList;
                                }
                            }
                        };
                        appendDOM(tc);
                    } else {
                        Window.sa.data.tcid(null);
                    }
                }
            },
            showInfoChannelChild: function () {
                $("#infoChannelChild-wrapper").html("");
                const parentId = Window.sa.data.channelTypeId() ? Number.parseInt(Window.sa.data.channelTypeId()) : null;
                const infoChannel = {
                    name: 'channelTypeChildId',
                    id: 'channelTypeChildId',
                    label: 'Nguồn thông tin phụ',
                    type: 'select',
                    target: '#infoChannelChild-wrapper',
                    value: Window.sa.data.channelTypeChildId(),
                    optionsListDef: selectDef.slice(),
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return $.ajax({
                                url: POS_APIS_COMMON.get('GET_INFORMATION_CHANNEL_CHILD'),
                                type: 'GET',
                                data: {
                                    parentId: parentId ? parentId : 9999999
                                }
                            });
                        },
                        callBack: function (response) {
                            var optionList = selectDef.slice()

                            $.each(response.data.list, function (i, item) {
                                optionList.push({
                                    value: item.id,
                                    text: item.name
                                });
                            });

                            return optionList;
                        }
                    }
                };
                appendDOM(infoChannel);
            },
            showHideValuationInfo: function () {
                if (Window.sa.data.listingTypeId() == 1 && Window.sa.data.propertyTypeId() == 11) {
                    $('#valuation-wrapper').show();
                } else {
                    $('#valuation-wrapper').hide();
                }
            },
            loadRoadPrice: function () {
                var roadPrice = '';
                if (!hasValueV2(_this.listAfter.loadRoadPrice.loaded)) {
                    _this.listAfter.loadRoadPrice.loaded = 1;
                } else {
                    _this.listAfter.loadRoadPrice.loaded++;
                }
                Window.sa.field.fieldChangedByList.roadPrice = true;
                if (_this.listAfter.loadRoadPrice.loaded > 1) {
                    roadPrice = $('#streetId option:selected').data('price');
                }
                if (_this.listAfter.loadRoadPrice.loaded == 1 && hasValue(Window.sa.data.roadPrice())) {
                    roadPrice = Window.sa.data.roadPrice();
                }
                if (hasValue(roadPrice)) {
                    roadPrice = parseInt(roadPrice);
                } else {
                    roadPrice = '';
                }
                $('#roadPrice').val(roadPrice);
                // $('#roadPrice').prop('disabled', false);
                $('#roadPrice').trigger('change');
                if (hasValue(Window.sa.data.roadPrice())) {
                    $('#roadPrice').blur();
                    // $('#roadPrice').prop('disabled', true);
                }
            },
            toggleFieldsByBeside: function (field, isChanged) {
                const position = Window.sa.data.position();
                const haveBeside = Window.sa.data.haveBeSide();

                let isHideWidthFrontWay = true
                let isHideWidthValue = true
                if (position === 1 && haveBeside) { // Mặt tiền
                    isHideWidthFrontWay = false
                    isHideWidthValue = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        { // Độ rộng MT đường (bên hông)
                            id: 'widthFrontWay',
                            updatedAttrs: [{
                                dataId: 'widthFrontWay',
                                isHide: isHideWidthFrontWay,
                                value: Window.sa.data['widthFrontWay'](),
                            }],
                        }, { // Độ rộng hẻm (Bên hông)
                            id: 'widthValue',
                            updatedAttrs: [{
                                dataId: 'widthValue',
                                isHide: isHideWidthValue,
                                value: Window.sa.data['widthValue'](),
                            }]
                        }
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)

                return
            },
            toggleFieldsByBesideAlley: function (field, isChanged) {
                const position = Window.sa.data.position();
                const haveBesideAlley = Window.sa.data.haveBeSide();

                let isHideWidthValue = true
                if (position === 2 && haveBesideAlley) { // Hẻm
                    isHideWidthValue = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        { // Độ rộng hẻm (Bên hông)
                            id: 'widthValue-alley',
                            updatedAttrs: [{
                                dataId: 'widthValue-alley',
                                isHide: isHideWidthValue,
                                value: Window.sa.data['widthValue'](),
                            }]
                        }
                    ]
                }

                generateDependantFields(listDependantFields, regenerateFieldsByFormId)

                return
            },
            showHideHaveBesideInfo: function () {
                var _position = Window.sa.data.position();
                var _haveBeside = Window.sa.data.haveBeSide();

                function showHide(position) {
                    if (position == 1) {
                        if (_haveBeside) {
                            $('#widthFrontWay-wrapper').show();
                            $('#widthValue-wrapper').show();
                            $('#widthFrontWay-widthValue-wrapper').removeClass('has-error');
                        } else {
                            $('#widthFrontWay-wrapper').hide();
                            $('#widthFrontWay').val('');
                            $('#widthFrontWay').trigger('change');
                            $('#widthValue-wrapper').hide();
                            $('#widthValue').val('');
                            $('#widthValue').trigger('change');
                        }
                        $('#haveBeSide-alley').prop('checked', Window.sa.data.haveBeSide());
                    } else {
                        if (position == 2) {
                            if (_haveBeside) {
                                $('#widthValue-alley-wrapper').show();
                            } else {
                                $('#widthValue-alley-wrapper').hide();
                                $('#widthValue-alley').val('');
                                $('#widthValue-alley').trigger('change');
                            }
                            $('#haveBeSide').prop('checked', Window.sa.data.haveBeSide());
                        }
                    }
                }

                if (_position == 1 || _position == 2) {
                    showHide(_position);
                } else {
                    showHide(1);
                    showHide(2);
                }
            },
            showlegalStatusList: function () {//Tình trạng pháp lý 
                var legalStatusList = {
                    name: 'legalStatusList',
                    id: 'legalStatusList',
                    label: 'Tình trạng pháp lý',
                    type: 'multiColumnCheckList',
                    target: '#legalStatusList-wrapper',
                    value: Window.sa.data.legalStatusList(),
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return Window.sa.api.getChannelTypeList();
                        },
                        callBack: function (response) {
                            var optionList = [];
                            var legalStatusList = Window.jsDetailData.legalStatusList;
                            var tmp = response.data.find(function (data) {
                                if (data.type == 2) {
                                    return data.list;
                                } else {
                                    // nothing
                                }
                            });

                            if (hasValue(tmp)) {
                                tmp = tmp.list;
                            }

                            var optionList2 = [];
                            for (var i in tmp) {
                                var isChecked = false;
                                var content = '';
                                legalStatusList.find(function (data) {
                                    if (data.id.typeId == tmp[i].id) {
                                        isChecked = true;
                                        content = data.content;
                                        return 1;
                                    } else {
                                        isChecked = false;
                                        return 0;
                                    }
                                });


                                if (tmp[i].control == 'input_if_checked') {
                                    var placeholder = '';
                                    if (tmp[i].id == 172) {
                                        placeholder = 'Bao lâu lấy sổ';
                                    }
                                    optionList2.push({
                                        value: tmp[i].id,
                                        text: tmp[i].name,
                                        isChecked: isChecked,
                                        control: tmp[i].control,
                                        content: content,
                                        placeholder: placeholder,
                                        data: {
                                            control: tmp[i].control
                                        }
                                    })
                                } else {
                                    optionList.push({
                                        value: tmp[i].id,
                                        text: tmp[i].name,
                                        isChecked: isChecked,
                                        control: tmp[i].control,
                                        content: content,
                                        data: {
                                            control: tmp[i].control
                                        }
                                    })
                                }
                            }
                            optionList.push({
                                value: 'special-hide',
                                text: '',
                                isChecked: false,
                                data: {
                                    type: 'hide'
                                }
                            })
                            $.merge(optionList, optionList2);

                            return optionList;
                        }
                    },
                    onChange: function (field) {
                        var legalStatusList = [];

                        $('[name=' + field.id + ']:checked').each(function (i, item) {
                            var i = {
                                id: {
                                    typeId: $(item).val()
                                },
                                content: null
                            }
                            if ($(item).data('control') == 'input_if_checked') {
                                i.content = $('#legalStatusList-input-' + $(item).val()).val();
                            }
                            legalStatusList.push(i);

                        });

                        Window.sa.data.legalStatusList(legalStatusList);
                    }
                }
                appendDOM(legalStatusList);
                $('body').on('change', 'input[name=legalStatusList]', function (e) {
                    e.preventDefault();
                    var control = $(this).data('control');
                    var isChecked = $(this).is(':checked');
                    if (control == 'input_if_checked') {
                        if (isChecked) {
                            $(this).parents('.col-md-4').find('textarea').show();
                        } else {
                            $(this).parents('.col-md-4').find('textarea').hide();
                        }
                    }

                });
                $('body').on('change', '.legalStatusList-input.editor', function (e) {
                    e.preventDefault();
                    var legalStatusList = [];

                    $('[name=legalStatusList]:checked').each(function (i, item) {
                        var i = {
                            id: {
                                typeId: $(item).val()
                            },
                            content: null
                        }
                        if ($(item).data('control') == 'input_if_checked') {
                            i.content = $('#legalStatusList-input-' + $(item).val()).val();
                        }
                        legalStatusList.push(i);

                    });

                    Window.sa.data.legalStatusList(legalStatusList);

                });


            },
            movInDate: function (field, isChanged) {
                let isDisabled = false
                let required = true
                let value = Window.sa.data['moveInDate']()
                const afterSigningContract = Window.sa.data.afterSigningContract()
                if (afterSigningContract) {
                    isDisabled = true
                    required = false
                    value = ''
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'moveInDate',
                            updatedAttrs: [{
                                isDisabled,
                                required,
                                dataId: 'moveInDate',
                                value,
                            }]
                        },
                    ]
                }
                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            commissionListFn: function () {
                $('#commission-wrapper').html('');
                const commission = {
                    "commision": null,
                    "contractTime": null,
                    "isPercentage": true
                }

                let html = `<div class="col-md-3"><div class="form-group"><div class="col-md-12"><label for="commissionSelect" class="control-label">Loại Hoa Hồng</label></div> <div class="col-md-12"><select class="form-control" id="commissionSelect"><option value="1">Theo phần trăm (%)</option> <option value="2">Bằng tiền</option></select></div></div></div>`;

                const listingTypeId = Window.sa.data.listingTypeId();

                let clsAutoFormat = ''
                switch (listingTypeId) {
                    case 1: {
                        if (Window.sa.data.commissionPrice()) {
                            commission.commision = Window.sa.data.commissionPrice();
                            commission.isPercentage = false
                            clsAutoFormat = 'auto-format-vnd'
                        } else {
                            if (Window.sa.data.commissionFrom()) {
                                commission.commision = Window.sa.data.commissionFrom();
                            } else {
                                commission.commision = Window.sa.data.commissionTo();
                            }
                            commission.isPercentage = true;
                        }
                        //
                        html += `
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label for="commissionInput" class="control-label">Hoa hồng</label>
                                         </div>
                                         <div class="col-md-12">
                                            <input id="commissionInput" type="text" class="form-control ${clsAutoFormat}" value="${commission.commision}">
                                         </div>
                                    </div>
                                </div>`;
                        break;
                    }
                    case 2: {
                        const commissionList = Window.sa.data.commissionList()
                        if (commissionList && commissionList.length > 0) {
                            commission.commision = commissionList[0].commision;
                            commission.contractTime = commissionList[0].contractTime;
                        }
                        let htmlCommission = ``;
                        if (commission.contractTime != null) {
                            commission.isPercentage = true;
                        } else {
                            commission.isPercentage = false;
                        }
                        htmlCommission = renderCommissionBuy(commission.isPercentage, commission);
                        //
                        html += `<div class="commission-for-rent">${htmlCommission} </div>`;
                        break;
                    }
                }
                $('#commission-wrapper').html(html);
                if (commission.isPercentage) {
                    $('#commissionSelect').val(1).select2();
                } else {
                    $('#commissionSelect').val(2).select2();
                }
                setInputCommision(commission.isPercentage, commission.commision);

                // events
                $(document).off('change', '#commissionSelect').on('change', '#commissionSelect', function (e) {
                    e.preventDefault();
                    const commission = {
                        "commision": null,
                        "contractTime": null,
                        "isPercentage": true
                    };
                    const listingTypeId = Window.sa.data.listingTypeId();
                    const isPercent = $(this).val() == 1 ? true : false;
                    if (listingTypeId == 1) {
                    } else {
                        // render
                        /*const commissionList = Window.sa.data.commissionList();
                        if (commissionList && commissionList.length > 0) {
                            commission.commision = commissionList[0].commision;
                            commission.contractTime = commissionList[0].contractTime;
                        }*/
                        let htmlCommission = ``;
                        if (isPercent) {
                            htmlCommission = renderCommissionBuy(true, commission);
                        } else {
                            htmlCommission = renderCommissionBuy(false, commission);
                        }
                        $('.commission-for-rent').html(htmlCommission);
                    }
                    $('#commissionInput').val('').trigger('change');
                    setInputCommision(isPercent, commission.commision);
                    $('#commissionTime').trigger('change');

                });

                $(document).off('change', '#commissionInput').on('change', '#commissionInput', function (e) {
                    const listingTypeId = Window.sa.data.listingTypeId();
                    const isPercent = $('#commissionSelect').val() == 1 ? true : false;
                    const commissionValue = $(this).val();
                    if (listingTypeId == 1) {
                        if (isPercent) {
                            Window.sa.data.commissionFrom(commissionValue);
                            Window.sa.data.commissionTo(commissionValue);
                            Window.sa.data.commissionPrice(null);
                        } else {
                            Window.sa.data.commissionFrom(null);
                            Window.sa.data.commissionTo(null);
                            Window.sa.data.commissionPrice(commissionValue);
                        }
                        Window.sa.data.commissionList = [];
                    } else {
                        if (isPercent) {
                            Window.sa.data.commissionList([
                                {
                                    commision: commissionValue,
                                    contractTime: $('#commissionTime').val(),
                                    isPercentage: true
                                }
                            ])
                        } else {
                            Window.sa.data.commissionList([
                                {
                                    commision: commissionValue,
                                    contractTime: null,
                                    isPercentage: false
                                }
                            ])
                        }
                        //
                        Window.sa.data.commissionFrom(null);
                        Window.sa.data.commissionTo(null);
                        Window.sa.data.commissionPrice(null);
                    }
                });
                $(document).off('change', '#commissionTime').on('change', '#commissionTime', function (e) {
                    const time = Number.parseInt($(this).val());
                    Window.sa.data.commissionList([
                        {
                            commision: $('#commissionInput').val(),
                            contractTime: time,
                            isPercentage: true
                        }
                    ]);
                    Window.sa.data.commissionFrom(null);
                    Window.sa.data.commissionTo(null);
                    Window.sa.data.commissionPrice(null);
                });

                function renderCommissionBuy(isPercentage, commission) {
                    let html = ``
                    if (isPercentage) {
                        const options = [...Array(120).keys()].map(it => {
                            const index = it + 1;
                            return `<option value="${index}" ${commission.contractTime && commission.contractTime == index ? 'selected' : ''}>${index}</option>`;
                        }).join((""));
                        html += `
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label for="commissionTime" class="control-label">Thời hạn hợp đồng (tháng)</label>
                                         </div>
                                         <div class="col-md-12">
                                               <select id="commissionTime" class="form-control">${options}</select>
                                         </div>
                                    </div>
                                </div>\`
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label for="commissionInput" class="control-label">Hoa hồng</label>
                                         </div>
                                         <div class="col-md-12">
                                            <input id="commissionInput" type="text" class="form-control" value="">
                                         </div>
                                    </div>
                                </div>`;
                    } else {
                        html += `
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label for="commissionInput" class="control-label">Hoa hồng</label>
                                         </div>
                                         <div class="col-md-12">
                                            <input id="commissionInput" type="text" class="form-control auto-format-vnd" value="">
                                         </div>
                                    </div>
                                </div>`;
                    }

                    return html;
                }

                // show text message
                $('#commissionInput').on('keyup', function (event) {

                    const isPercent = $('#commissionSelect').val() == 1 ? true : false;
                    setInputCommision(isPercent, event.target.value)
                })

                function setInputCommision(isPercent, commisionInput) {
                    // set
                    if (isPercent) {
                        //$('#commissionInput').inputNumber({start : 0 , end : 100, isFloat : true})
                        $('#commissionInput').inputNumber({start: 0, isFloat: true})
                        $('#commissionInput').siblings('.lblTextNumber').text('').hide()
                    } else {
                        $('#commissionInput').inputNumber({start: 0, type: 'price'})
                        $('#commissionInput').siblings('.lblTextNumber').show()
                        $('#commissionInput').val() ? NumberInputUtil.numberToLabel('#commissionInput') : ''
                    }
                    $('#commissionInput').val(commisionInput).trigger('input')
                }
            },
            showHideCurrencyOnChange: function () {
                this.showHideCurrencyOnLoad();
            },
            showHideCurrencyOnLoad: function () {
                var listingTypeId = Window.sa.data.listingTypeId();
                if (listingTypeId == 1) {
                    $('#currency-wrapper').hide();
                    $('#currency').val('VND');
                } else {
                    $('#currency-wrapper').show();
                    $('#currency').val(Window.sa.data.currency());
                }
            },
            amenitiesList: async function () {//Tiện ích khi thuê nhà, Ưu đãi khác khi bán nhà
                const listingTypeId = Window.sa.data.listingTypeId()
                const response = await Window.sa.api.getChannelTypeList()
                
                let data = null
                let amenities = ''
                if (listingTypeId == 1) {
                    data = response.data.find(function (data) {
                        if (data.type == 1) {
                            return data.list;
                        }
                    });

                    amenities = renderHtml(data, 'Ưu đãi khác khi bán nhà');

                } else {
                    data = response.data.find(function (data) {
                        if (data.type == 3) {
                            return data.list;
                        }
                    });

                    amenities = renderHtml(data, 'Tiện ích khi thuê nhà');
                }

                $('#amenitiesList-wrapper').html(amenities)
                // Window.sa.validation.init();

                $('body').off('change', '#amenitiesList-wrapper input[type="checkbox"]').on('change', '#amenitiesList-wrapper input[type="checkbox"]', function (e) {
                    var id = parseInt($(this).data('id'));
                    var parentId = hasValue($(this).data('parent')) ? parseInt($(this).data('parent')) : null;
                    if ($('input[type="checkbox"]').hasClass('amenities-parent-' + id)) {

                        if ($(this).is(':checked')) {
                            $('.amenities-childs input.amenities-parent-' + id).removeAttr('checked');
                        }
                        $('.amenities-childs input.amenities-parent-' + id).trigger("click");

                    } else if ($.isNumeric(parentId)) {
                        if (!$(this).is(':checked')) {
                            $('#amenities-checkbox-' + parentId).removeAttr('checked');
                        }
                    }

                    getAmenitiesList();
                });
                $('body').off('change', '#amenitiesList-wrapper textarea').on('change', '#amenitiesList-wrapper textarea', function (e) {
                    getAmenitiesList();
                });

                function getAmenitiesList() {
                    var amenitiesList = [];

                    $('#amenitiesList-wrapper input[type="checkbox"]:checked').each(function (i, item) {
                        var content = null;
                        var type = $(this).data('type');
                        var id = $(this).data('id');
                        if (hasValue(type) && type == 'input_if_checked') {
                            var idArea = '#amenities-input-' + id;
                            content = $(idArea).val();
                        }
                        amenitiesList.push(
                            {
                                id: {
                                    typeId: parseInt($(item).val())
                                },
                                listingTypeId: Window.jsDetailData.listingTypeId,
                                content: content
                            }
                        );

                    });

                    Window.sa.data.amenitiesList(amenitiesList);
                }

                function isChecked(id) {
                    var isChecked = false;
                    var amenitiesList = Window.sa.data.amenitiesList();
                    if (amenitiesList) {
                        amenitiesList.find(function (data) {
                            if (data.id.typeId == id) {
                                isChecked = true;
                                return 1;
                            } else {
                                isChecked = false;
                                return 0;
                            }
                        });
                    }
                    return isChecked;
                }

                function getContent(id) {
                    var content = null;
                    var amenitiesList = Window.sa.data.amenitiesList();
                    amenitiesList.find(function (data) {
                        if (data.id.typeId == id) {
                            content = data.content;
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return content;
                }

                function renderHtml(data, label) {
                    let row = '<div class="row">';
                    if (data && hasValue(data.list)) {
                        $.each(data.list, function (k, item) {

                            var input = '';
                            var hasCheck = isChecked(item.id);
                            var checked = '';
                            var content = '';

                            if (hasCheck) {
                                content = getContent(item.id);
                                content = hasValue(content) ? content : '';
                                checked = 'checked';
                            }
                            if (item.control == 'input_if_checked') {
                                input = '<div class="row">' +
                                    '<div class="col-md-12">' +
                                    '<textarea class="form-control editor" id="amenities-input-' + item.id + '" style="' + ((!hasCheck) ? 'display: none' : '') + '">' + content + '</textarea>' +
                                    '</div>' +
                                    '</div>';
                            }
                            row += '<div class="col-md-4 key-' + (k + 1) + '">' +
                                '<label class="checkbox">' +
                                '<input type="checkbox" value="' + item.id + '" id="amenities-checkbox-' + item.id + '" data-type="' + item.control + '" data-id="' + item.id + '" ' + checked + ' />' +
                                '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' + item.name + '</label>';

                            if (item.control == 'checkbox' && hasValue(item.childs)) {
                                $.each(item.childs, function (index, child) {

                                    hasCheck = isChecked(child.id);
                                    checked = '';
                                    content = '';
                                    if (hasCheck) {
                                        content = getContent(child.id);
                                        content = hasValue(content) ? content : '';
                                        checked = 'checked';
                                    }

                                    var input = '';
                                    if (child.control == 'input_if_checked') {
                                        input = '<textarea class="form-control editor" id="amenities-input-' + child.id + '" style="' + ((!hasCheck) ? 'display: none' : '') + '">' + content + '</textarea>'

                                    }
                                    row += '<div class="row amenities-childs child-key-' + (index + 1) + '">' +
                                        '<div class="col-md-12">' +
                                        '<label class="checkbox">' +
                                        '<input type="checkbox" value="' + child.id + '" id="amenities-checkbox-' + child.id + '" data-type="' + child.control + '" data-id="' + child.id + '" data-parent="' + item.id + '" class="amenities-parent-' + item.id + '"' + checked + ' />' +
                                        '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' + child.name + '</label>' +
                                        input +
                                        '</div>' +
                                        '</div>';
                                });
                            }
                            row += input + '</div>';
                        });
                    }
                    row += '</div>';
                    $('body').on('change', '#amenities-checkbox-7', function (e) {
                        e.preventDefault();
                        if ($(this).is(':checked')) {
                            $('#amenities-input-7').show();
                        } else {
                            $('#amenities-input-7').hide();
                        }
                    });
                    $('body').on('change', '#amenities-checkbox-9', function (e) {
                        e.preventDefault();
                        if ($(this).is(':checked')) {
                            $('#amenities-input-9').show();
                        } else {
                            $('#amenities-input-9').hide();
                        }
                    });
                    $('body').on('change', '#amenities-checkbox-20', function (e) {
                        e.preventDefault();
                        if ($(this).is(':checked')) {
                            $('#amenities-input-20').show();
                        } else {
                            $('#amenities-input-20').hide();
                        }
                    });
                    return '<div class="form-group">' +
                        '<div class="col-md-12">' +
                        '<label for="amenitiesList" class="control-label">' + label + '</label>' +
                        '</div>' +
                        '<div class="col-md-12">' + row + '</div>' +
                        '</div>';
                }
            },
            priceForStatusQuo: function () {
                $('#priceForStatusQuo-wrapper').html('');
                var data = {
                    name: 'priceForStatusQuo',
                    id: 'priceForStatusQuo',
                    class: 'auto-format-price',
                    label: 'Giá cho thuê',
                    type: 'input',
                    target: '#priceForStatusQuo-wrapper',
                    value: Window.sa.data.priceForStatusQuo()
                }
                if (Window.sa.data.statusQuoId() == 163) {
                    appendDOM(data);
                }
                $('.auto-format-price').autoNumeric('init', {mDec: 0});
            },
            showHidePositionOrBuildingInfo: function () {
                var _propertyTypeId = Window.sa.data.propertyTypeId();

                if ($.inArray(_propertyTypeId, [8, 1, 4]) > -1) {
                    // clear data position
                    if (Window.jsDetailData.position) {
                        Window.jsDetailData.position.position = null;
                        Window.jsDetailData.position.alleyId = null;
                        Window.jsDetailData.position.alleyType = null;
                        Window.jsDetailData.position.alleyWidth = null;
                        Window.jsDetailData.position.position = null;
                        Window.jsDetailData.position.roadFrontageWidth = null;
                        Window.jsDetailData.position.widthFrontWay = null;
                        Window.jsDetailData.position.widthValue = null;
                    }
                    $('.building-group').show();
                    $('.position-group').hide();
                } else if (_propertyTypeId == 7) {
                    $('.building-group').show();
                    $('.position-group').show();
                } else {
                    $('.building-group').hide();
                    $('.position-group').show();
                }
            },
            showHideAlleyInfo: function () {
                var position = Window.sa.data.position();
                if (position == 2) {
                    $('.alley-group').show();
                    $('.frontWay-group').hide();
                    // $('#widthFrontWay-alley').val(Window.sa.data.widthFrontWay());
                    // $('#widthFrontWay-alley').trigger('change');
                } else {
                    if (position == 1) {
                        $('.alley-group').hide();
                        $('.frontWay-group').show();
                        // $('#roadFrontageWidth').val(Window.sa.data.roadFrontageWidth());
                        // $('#roadFrontageWidth').trigger('change');
                    } else {
                        $('.alley-group').hide();
                        $('.frontWay-group').hide();
                    }
                }
            },
            formatCurrency: function () {
                $('#price').autoNumeric('init', {mDec: 2});
            },
            showHideHouseShape: function (field, isChanged) {
                const useRightTypeId = Window.sa.data.useRightTypeId();
                let isHide = true
                let required = false
                let isAjax = false
                
                if ($.inArray(useRightTypeId, [1, 2]) > -1) { // 1: Sổ đỏ, 2: Sổ hồng
                    isHide = false
                    required = true
                    isAjax = true
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'privacy',
                            updatedAttrs: [{
                                isAjax,
                                isHide,
                                dataId: 'privacy',
                                value: Window.sa.data['privacy'](),
                            }]
                        },
                        {
                            id: 'houseShape',
                            updatedAttrs: [{
                                isAjax,
                                isHide,
                                dataId: 'houseShape',
                                required,
                                value: Window.sa.data['houseShape'](),
                            }]
                        },
                    ]
                }
                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            showHideHouseShapeOther: function (field, isChanged) {
                let houseShape = Window.sa.data.houseShape();
                let isHide = true
                
                if (houseShape && typeof houseShape === "string") {
                    houseShape = Number(houseShape)
                }
                if ($.inArray(houseShape, [194]) > -1) { // 194: Khác
                    isHide = false
                }

                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'otherHouseShape',
                            updatedAttrs: [{
                                isHide,
                                dataId: 'otherHouseShape',
                                value: Window.sa.data['otherHouseShape'](),
                            }]
                        },
                    ]
                }
                generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            showHideUseDiy: function () {
                const jsDetailData = Window.jsDetailData
                if (Window.sa.data.crawlerStatus() != 3 && jsDetailData.sourceId != 171) {
                    if (Window.jsRole == 'edit') {
                        var elm;
                        let noteLabel = '';
                        const useDIYMsg = jsDetailData.ownerAppStatus.statusFormat
                        if (jsDetailData.ownerAppStatus.isSentApp) {
                            _this.templateIsSentApp()
                        } else {
                            elm = $('<button id="send-diy-btn">').addClass('btn btn-success');
                            elm = elm.html('<span class="glyphicon glyphicon-send" aria-hidden="true"></span> Gửi tài khoản');

                            elm = $('<div class="col-md-6">').html(elm);

                            var check = $('<label class="checkbox">');
                            check = check.html('<input type="checkbox" id="notUseDiyCheck">');
                            check = check.append('<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Không dùng Propzy App/Web');
                            check = $('<div class="col-md-6">').html(check);

                            elm = $('<div class="form-group">').append('<div class="col-md-12"><label class="control-label">Sử dụng Propzy App/Web</label></div>').append(elm).append(check);
                            elm = $('<div id="useDiy-wrapper" class="col-md-4">').html(elm);
                            $('.use-diy-group').html(elm);

                            elm = $('<input>').attr({
                                id: 'reasonNotUseDiy',
                                class: 'form-control',
                                type: 'text',
                                placeholder: 'Lý do không dùng Propzy App/Web'
                            });
                            elm = $('<div class="col-md-12">').html(elm);
                            elm = $('<div class="form-group">').append('<div class="col-md-12"><label for="privacy" class="control-label">Lý do không dùng Propzy App/Web</label></div>').append(elm);
                            elm = $('<div id="reasonNotUseDiy-wrapper" class="col-md-4">').html(elm);
                            $('.use-diy-group').append(elm);

                            noteLabel = $('<div class="col-md-4">').append(
                                '<div class="col-md-12"><label>&nbsp;</label></div><p style="line-height: 34px;">* Ghi chú: ' + useDIYMsg + '</p>'
                            );
                            $('.use-diy-group').append(noteLabel)

                            if (jsDetailData.useDiy == 2) {
                                $('.use-diy-group').find('#notUseDiyCheck').attr('checked', true);
                                $('.use-diy-group').find('#reasonNotUseDiy').val(Window.sa.data.reasonNotUseDiy());
                            } else {
                                $('.use-diy-group').find('#notUseDiyCheck').attr('checked', false);
                                $('.use-diy-group').find('#reasonNotUseDiy-wrapper').hide();
                            }

                            $('body').off('change', '#notUseDiyCheck').on('change', '#notUseDiyCheck', function (e) {
                                if ($(this).is(':checked')) {
                                    $('.use-diy-group').find('#reasonNotUseDiy-wrapper').show();
                                    $('.use-diy-group').find('#reasonNotUseDiy').val(Window.sa.data.reasonNotUseDiy());
                                    Window.sa.data.useDiy(2);
                                } else {
                                    $('.use-diy-group').find('#reasonNotUseDiy-wrapper').hide();
                                    Window.sa.data.useDiy(null);
                                    Window.sa.data.reasonNotUseDiy(null);
                                }
                            });

                            $('body').off('change', '#reasonNotUseDiy').on('change', '#reasonNotUseDiy', function (e) {
                                Window.sa.data.reasonNotUseDiy($(this).val());
                            });
                        }
                        
                        $('.use-diy-group').show();
                    }
                } else {
                    $('.use-diy-group').empty()
                }
            },
            showPhonesNew: function () {
                // var crawlerStatus = Window.sa.data.crawlerStatus();
                Window.sa.data.ownerPhones(Window.sa.data.phones());
                $('body').off('click', '#btn-check-duplicated-phone').on('click', '#btn-check-duplicated-phone', function (e) {
                    e.preventDefault();
                    var subPhones = /*getPhoneSub(Window.sa.data.phones());*/
                        Window.sa.data.phones().map(it => {
                            return {phoneSub: it.phoneSub}
                        });
                    var message = '';
                    /*if (Window.jsRole == 'create' || _this.phoneIsChanged == true) {
                        subPhones.push({
                            phoneSub: Window.sa.data.phone()
                        });
                    }*/
                    subPhones.push({
                        phoneSub: Window.sa.data.phone()
                    });
                    if (hasValue(subPhones)) {
                        requestLoading.initCallback(1);
                        Listing.checkExistedPhone(subPhones, 2).done(function (response) {
                            requestLoading.addCallbackToQueue();
                            if (response.result) {
                                if (typeof response.data[0] != "undefined") {
                                    var table = renderHtmlCheckExistOwner(response.data);
                                    message = table;

                                } else {
                                    var phonesArray = $.map(subPhones, function (value, inx) {
                                        return value.phoneSub;
                                    });
                                    var queryStr = 'https://www.google.com.vn/search?q=' + phonesArray.join('+%7C+');
                                    message = 'Không có dữ liệu.' +
                                        '<a id="google-find-phone" href="' + queryStr + '" target="_blank">Tìm Số Điện Thoại Bằng Google</a>';
                                    $("#google-find-phone").click();
                                }
                            } else {
                                message = response.message;
                            }
                            showPropzyAlert(message, 'Thông Tin', function (e) {
                                $('.show-pos-call').trigger('click');
                            });
                            $("#table-check-exist-owner").hpaging({"limit": 5});
                        });
                    } else {
                        message = 'Chưa nhập số điện thoại! Xin vui lòng kiểm tra lại dữ liệu';
                        showPropzyAlert(message, 'Thông Tin', function (e) {
                            $('.show-pos-call').trigger('click');
                        });
                    }
                });
            },
            showCheckEmail: function () {
                $('body').off('click', '#btn-check-duplicated-email').on('click', '#btn-check-duplicated-email', function (e) {
                    e.preventDefault();
                    var email = Window.sa.data.email();
                    var message = '';
                    if (isEmail(email)) {
                        requestLoading.initCallback(1);
                        Listing.checkExistedEmail(email, 2).done(function (response) {
                            requestLoading.addCallbackToQueue();
                            if (response.result) {
                                if (typeof response.data[0] != "undefined") {
                                    var table = renderHtmlCheckExistOwner(response.data);
                                    message = table;

                                } else {
                                    message = 'Không có dữ liệu.';
                                }
                            } else {
                                message = response.message;
                            }
                            showPropzyAlert(message, 'Thông Tin');
                            $("#table-check-exist-owner").hpaging({"limit": 5});
                        });
                    } else {
                        message = 'Chưa nhập email hoặc email không đúng định dạng! Xin vui lòng kiểm tra lại dữ liệu';
                        showPropzyAlert(message, 'Thông Tin');
                    }
                });
            },
            showCheckAddress: function () {
                var qhElm = $('<button id="btn-check-map">').addClass('btn btn-warning').text('Xem quy hoạch');
                var elm = $('<button id="btn-check-address">').addClass('btn btn-success').css('margin-left', '8px');
                elm = elm.html('<span class="glyphicon glyphicon-search" aria-hidden="true"></span> Kiểm tra ');
                elm = $('<div class="col-md-12">').append(qhElm).append(elm);
                elm = $('<div class="form-group">').append(elm);
                $('#check-address-wrapper').html('<div class="col-md-12"><label class="control-label empty"></label></div>').append(elm);

                $('body').off('click', '#btn-check-map').on('click', '#btn-check-map', function (e) {
                    e.preventDefault();
                    var latLng = Window.sa.data.latitude() + ',' + Window.sa.data.longitude();
                    if(Window.sa.data.latitude() === '' || Window.sa.data.longitude() === '') {
                        showPropzyAlert('Vui lòng nhập tọa độ lat-long để kiểm tra thông tin quy hoạch.');                        
                    } else {
                        showPropzyLoading();
                        $.ajax({
                            url: '/pos/sa/check-exist-zone-from-lat-lng',
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                location: latLng
                            }
                        }).then((res) => {
                            if(res) {
                                window.open('/maps/lat-lng/' + latLng + '/quy-hoach-dat', '_blank');
                            } else {
                                showPropzyAlert('Thông tin quy hoạch của listing này đang cập nhật. Vui lòng thử lại sau');
                            }                            
                        }).fail(() => {
                            showPropzyAlert();                            
                        }).always(() => {
                            hidePropzyLoading();
                        });  
                    }
                });
 
                // event
                $('body').off('click', '#btn-check-address').on('click', '#btn-check-address', function (e) {
                    e.preventDefault();
                    var address = {
                        cityId: Window.sa.data.cityId(),
                        districtId: Window.sa.data.districtId(),
                        wardId: Window.sa.data.wardId(),
                        streetId: Window.sa.data.streetId(),
                        houseNumber: Window.sa.data.houseNumber(),
                        id: Window.sa.data.data().rlistingId,
                        rlistingId: Window.sa.data.data().rlistingId,
                        propertyTypeId: Window.sa.data.propertyTypeId()
                    };
                    // check trùng số thửa, đất nền dự án
                    address.landCode = Window.sa.data.landCode();
                    address.mapCode = Window.sa.data.mapCode();

                    // check modelCode
                    address.modelCode = Window.sa.data.modelCode();

                    // validate
                    let valid = true;
                    let mess = "";
                    if (!hasValue(address.cityId)) {
                        valid = false;
                        mess = "Thành phố không hợp lệ. Xin vui lòng kiểm tra lại dữ liệu"
                    } else if (!hasValue(address.districtId)) {
                        valid = false;
                        mess = "Quận không hợp lệ. Xin vui lòng kiểm tra lại dữ liệu"
                    } else if (!hasValue(address.wardId)) {
                        valid = false;
                        mess = "Phường không hợp lệ. Xin vui lòng kiểm tra lại dữ liệu"
                    } else if (!hasValue(address.streetId)) {
                        valid = false;
                        mess = "Đường không hợp lệ. Xin vui lòng kiểm tra lại dữ liệu"
                    }
                    if ([13, 14].indexOf(Window.sa.data.propertyTypeId()) > -1) {
                        if (!hasValue(address.landCode) || !hasValue(address.mapCode)) {
                            valid = false;
                            mess = "số tờ bản đồ hoặc số thửa không hợp lệ. Xin vui lòng kiểm tra lại dữ liệu"
                        }
                    }
                    if (!valid) {
                        showPropzyAlert(mess);
                        return false;
                    }
                    //
                    showPropzyLoading();
                    Listing.checkExistedAddress(address).done(function (response) {
                        hidePropzyLoading();
                        var duplicatedMsg = "";
                        if (response.result) {
                            var type1 = [];
                            var type2 = [];
                            var type3 = [];
                            var type4 = [];
                            $.map(response.data, function (item) {
                                if (item.type == 1) {
                                    $.merge(type1, [item.id]);
                                } else if (item.type == 2) {
                                    $.merge(type2, [item.id]);
                                } else if (item.type == 3) {
                                    $.merge(type3, [item.id]);
                                } else {
                                    $.merge(type4, [item.id]);
                                }

                            });
                            if (type1.length > 0) {
                                duplicatedMsg += '<strong>Tin đăng hệ thống : </strong> <br>';
                                $.each(type1, function (idx, item) {
                                    duplicatedMsg += "<a target='_blank' href='/pos/sa/detail/" + item + "'> #" + item + "</a>,";
                                });
                            }

                            if (type2.length > 0) {
                                duplicatedMsg += '<br><strong>Tin đăng từ prescreen: </strong> <br>';
                                $.each(type2, function (idx, item) {
                                    duplicatedMsg += "<a target='_blank' href='/pos/prescreener/view/" + item + "'> #" + item + "</a>,";
                                });
                            }

                            if (type3.length > 0) {
                                duplicatedMsg +=
                                    "<br><strong>Tin hệ thống đã GỠ: </strong> <br>";
                                $.each(type3, function (idx, item) {
                                    duplicatedMsg +=
                                    "<a target='_blank' href='/pos/sa/detail/" +
                                    item +
                                    "'> #" +
                                    item +
                                    "</a>,";
                                });
                            }

                            if (type4.length > 0) {
                                duplicatedMsg +=
                                    "<br><strong>Tin prescreener đã HỦY: </strong> <br>";
                                $.each(type4, function (idx, item) {
                                    duplicatedMsg +=
                                    "<a target='_blank' href='/pos/prescreener/view/" +
                                    item +
                                    "'> #" +
                                    item +
                                    "</a>,";
                                });
                            }

                            var newDuplicatedMsg = duplicatedMsg.substring(0, duplicatedMsg.length - 1);
                            if (newDuplicatedMsg.trim().length <= 0) {
                                newDuplicatedMsg = response.message;
                            }
                            showPropzyAlert(newDuplicatedMsg);
                        } else {
                            duplicatedMsg = response.message;
                        }
                    });
                });
            },
            showCountAggreate: function () {
                if (Window.jsRole == 'edit') {
                    var dataPost = {
                        rlistingId: Window.sa.data.rlistingId()
                    };
                    Window.sa.api.countAggreate(dataPost).done(function (response) {
                        var colection = $("#countAggreate-deal");
                        var tour = $("#countAggreate-tour");
                        if (response.result) {
                            $.each(response.data, function (i, li) {
                                if (i == 'deal') {
                                    colection.find('span').html(li);
                                }
                                if (i == 'tour') {
                                    tour.find('span').html(li);
                                }
                            })
                        }
                    });
                }
            },
            showHidePhone: function () {
                if (isPhoneNumber(Window.sa.data.phone())) {
                    $('#phone-wrapper').hide();
                } else {
                    $('#phone-wrapper').show();
                }
            },
            showHavePlanning: function () {
                var propertyTypeIdVal = Window.sa.data.propertyTypeId();
                if ($.inArray(propertyTypeIdVal, [11, 13]) > -1) { // nha rieng, dat nen
                    $('.havePlanning-group').show();
                } else {
                    $('.havePlanning-group').hide();
                }
            },
            showPlanningAndRightOfWay: function (field, isChanged) {
                const havePlanning = Window.sa.data.havePlanning();
                let isAjax = false
                let isDisabled = true
                let isHide = true
                let required = false
                let toggleGroup = false

                if (havePlanning === 0 || havePlanning === 2) {
                    isDisabled = true
                    isHide = false
                }
                if (havePlanning == 1) {
                    isAjax = true
                    isDisabled = false
                    isHide = false
                    required = true
                    toggleGroup = true
                }
                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'planing-type',
                            updatedAttrs: [{
                                dataId: 'planing-type',
                                isAjax,
                                isDisabled,
                                isHide,
                                required,
                                value: Window.sa.data['planingType'](),
                            }]
                        },
                        {
                            id: 'planing-area',
                            updatedAttrs: [{
                                dataId: 'planing-area',
                                isDisabled,
                                isHide,
                                required,
                                value: Window.sa.data['planingArea'](),
                            }]
                        },
                        {
                            id: 'planing-area-other',
                            updatedAttrs: [{
                                dataId: 'planing-area-other',
                                isDisabled,
                                isHide,
                                value: Window.sa.data['planingAreaOther'](),
                            }]
                        },
                        {
                            id: 'planing-right-of-way',
                            updatedAttrs: [{
                                dataId: 'planing-right-of-way',
                                isDisabled,
                                isHide,
                                value: Window.sa.data['planingRightOfWay'](),
                            }]
                        },
                        {
                            id: 'planing-note',
                            updatedAttrs: [{
                                dataId: 'planing-note',
                                isDisabled,
                                isHide,
                                value: Window.sa.data['planingNote'](),
                            }]
                        },
                        {
                            id: 'planing-photos',
                            updatedAttrs: [{
                                dataId: 'planing-photos',
                                isDisabled,
                                isHide,
                                required,
                                toggleGroup,
                                value: Window.sa.data['planingPhotos'](),
                            }]
                        },
                    ]
                }
                return generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            showHideValuationButton: function () {
                if (Window.jsRole == 'edit') {
                    if (Window.sa.data.propertyTypeId() == 11) {
                        $('#valuation-btn').show();
                    } else {
                        $('#valuation-btn').hide();
                    }
                }
            },
            showHideHouseType: function () {
                $('#houseTypeId-wrapper').hide();
                $('#constructionTypeId-wrapper').hide();
                $('#depreciation-wrapper').hide();


                var propertyTypeIdVal = Window.sa.data.propertyTypeId();
                if (propertyTypeIdVal == 11) {
                    $('#houseTypeId-wrapper').show();
                    $('#constructionTypeId-wrapper').show();
                    $('#depreciation-wrapper').show();
                } else {
                    Window.sa.data.houseTypeId(null)
                    Window.sa.data.constructionTypeId(null)
                    Window.sa.data.depreciation(null)
                }
            },
            updateRoadFrontageWidth: function () {
                const _position = Window.sa.data.position();
                let widthValue = $('#streetId option:selected').data('widthvalue');
                if (!hasValue(widthValue)) {
                    widthValue = '';
                }

                if (_position == 1) {
                    Window.sa.field.fieldChangedByList.roadFrontageWidth = true;
                    Window.sa.field.fieldChangedByList.widthFrontWay = true;

                    if (Window.sa.data.roadFrontageWidth()) {
                        widthValue = Window.sa.data.roadFrontageWidth()
                    }

                    $('#roadFrontageWidth').val(widthValue);
                    // if (_roadFrontageWidthChanged) {
                    // 	$('#roadFrontageWidth').val(widthValue);
                    // } else {
                    // 	_roadFrontageWidthChanged = true;
                    // 	$('#roadFrontageWidth').val(Window.sa.data.roadFrontageWidth());
                    // }
                    $('#roadFrontageWidth').trigger('change');
                    // $('#roadFrontageWidth').prop('disabled', hasValue(Window.sa.data.roadFrontageWidth()));
                } else {
                    if (_position == 2) {
                        Window.sa.field.fieldChangedByList.roadFrontageWidth = true;
                        Window.sa.field.fieldChangedByList.widthFrontWay = true;

                        if (Window.sa.data.widthFrontWay()) {
                            widthValue = Window.sa.data.widthFrontWay()
                        }
                        $('#widthFrontWay-alley').val(widthValue);
                        // if (_roadFrontageWidthChanged) {
                        // 	$('#widthFrontWay-alley').val(widthValue);
                        // } else {
                        // 	_roadFrontageWidthChanged = true;
                        // 	$('#widthFrontWay-alley').val(Window.sa.data.roadFrontageWidth());
                        // }
                        $('#widthFrontWay-alley').trigger('change');
                        // $('#widthFrontWay-alley').prop('disabled', hasValue(Window.sa.data.widthFrontWay()));
                    }
                }
            },
            showHideBank: function (field, isChanged) {
                const mortgaged = Window.sa.data.mortgaged();
                let isAjax = false
                let isDisabled = true
                if (mortgaged) {
                    isAjax = true
                    isDisabled = false
                }
                const listDependantFields = {
                    _formFields: Window.sa.formFields._list,
                    _list: _this.list,
                    isChanged,
                    parentField: field,
                    fields: [
                        {
                            id: 'bankId',
                            updatedAttrs: [{
                                dataId: 'bankId',
                                isAjax,
                                isDisabled,
                                value: Window.sa.data['bankId'](),
                            }]
                        },
                    ]
                } 
                return generateDependantFields(listDependantFields, regenerateFieldsByFormId)
            },
            handleOnChangeCrawlerStatus: function (isFirstTime = false) {
                const crawlerStatus = Window.sa.data.crawlerStatus();
                // HANDLE WHEN USER SELECT PROPZY OPTION
                if(crawlerStatus === 12) {
                    const propzyPhone = '02873066099';
                    $('#name').attr('readonly', true).val('Propzy').trigger('change');
                    $('#name, #phone').siblings('#sa-call-btn9').attr('style', 'pointer-events: none; background-color: gray; border-color: gray');
                    $('#phone').attr('readonly', true).val(propzyPhone).trigger('change');
                    Window.jsDetailData.socialCommunications[0].phone = propzyPhone;
                    Window.jsDetailData.socialCommunications[0].email = '';
                    $('#email').attr('readonly', true);
                } else {
                    if(!isFirstTime) {
                        switch (crawlerStatus) {
                            case 3: { // case new crawler status is môi giới
                                $('#name').attr('readonly', false).val('').trigger('change');
                                $('#name, #phone').siblings('#sa-call-btn9').removeAttr('style');
                                $('#phone').attr('readonly', false).val('').trigger('change');
                                Window.jsDetailData.socialCommunications[0].phone = '';
                                $('#email').attr('readonly', false);
                                break;
                            } 
                            default: { // case new crawler status is not propzy and môi giới 
                                // Keep owner name and primary phone when change CrawlerStatus
                                $('#name').attr('readonly', false).trigger('change');
                                $('#name, #phone').siblings('#sa-call-btn9').removeAttr('style');
                                $('#phone').attr('readonly', false).val('').trigger('change');
                                $('#email').attr('readonly', false);
                            }
                        }
                    }
                }
            },
            checkShowZoneBtn: function(val) {       
                if(Window.sa.data.listingTypeId() === 1) {
                    const listRealId = [2, 3];
                    const listPropertyType = [14, 18, 21, 22];
                    if(!listRealId.includes(Window.sa.data.realEstateGroupId())) {                        
                        if(Window.sa.data.realEstateGroupId() === 1 && listPropertyType.includes(Window.sa.data.propertyTypeId())) {
                            $('#btn-check-map').show();    
                        } else {
                            $('#btn-check-map').hide();
                        }
                    } else {
                        $('#btn-check-map').show();
                    }                    
                } else {
                    $('#btn-check-map').hide();
                }
            }
        };
    }
}

function showHideAgentEmail() {
    var agentEmail = Window.sa.data.agentEmail();
    if (hasValue(agentEmail)) {
        $('#agentEmail').text(agentEmail);
        //$('#agentEmail-wrapper').show();
    } else {
        $('#agentEmail').text("N/A");
        //$('#agentEmail-wrapper').hide();
    }
}

function updateAgentInfo() {
    var info = {
        agentId: $('#agentId option:selected').data('agentid'),
        socialUid: $('#agentId option:selected').data('socialuid'),
        email: $('#agentId option:selected').data('email'),
        name: $('#agentId option:selected').data('name'),
        note: $('#agentId option:selected').data('note'),
        phone: $('#agentId option:selected').data('phone'),
        contractSigned: $('#agentId option:selected').data('contractsigned')
    };
    Window.sa.data.agent({
        info: info
    });
}

function showHideOwnerAgentInfo() {
    var crawlerStatus = Window.sa.data.crawlerStatus();
    var ownerPhone = Window.sa.data.phone();
    if (crawlerStatus == 2 || crawlerStatus == 7) {
        if (Window.jsRole == 'edit') {
            $('#owner-info input').prop('disabled', false);
            $('.new-subPhone input').prop('disable', false);
            $('.new-subPhone button').prop('disable', false);
            $('#owner-info select').prop('disabled', false);
        }
        $('#agent-info').hide();
    } else {
        if (crawlerStatus == 3) {
            if (Window.jsRole == 'edit') {
                if (hasValue(ownerPhone)) {
                    $('#owner-info input').prop('disabled', true);
                    $('.new-subPhone input').prop('disable', true);
                    $('.new-subPhone button').prop('disable', true);
                    $('#owner-info select').prop('disabled', true);
                } else {
                    $('#owner-info input').prop('disabled', false);
                    $('.new-subPhone input').prop('disable', false);
                    $('.new-subPhone button').prop('disable', false);
                    $('#owner-info select').prop('disabled', false);
                }
            }
            $('#agent-info').show();
        } else {
            $('#agent-info').hide();
        }
    }
    /*if (Window.jsRole != 'create') {
        $('#isOwner').prop('disabled', true);
    } else {
        $('#isOwner').prop('disabled', false);
    }*/
}

function updateBuildingFloors() {
    // chung cư căn hộ update lại buiding floor
    let numberFloor = null;
    if (hasValue(Window.sa.data.blockId())) {
        // for onchange
        if ($('#blockId option:selected').data('numberfloor')) {
            numberFloor = $('#blockId option:selected').data('numberfloor')
        }
    } else {
        numberFloor = $('#buildingId option:selected').data('numberfloor');
    }
    
    // trigger init range value  for buildingFloors
    $('#buildingFloors').inputNumber({start: -5, end: parseInt(numberFloor), negative: true})

    // trigger change while switching building / block
    $('#numberFloor_building').val(numberFloor).trigger('change')
}

function showHideValuationButton() {
    if (Window.jsRole == 'edit') {
        if (Window.sa.data.propertyTypeId() == 11) {
            $('#valuation-btn').show();
        } else {
            $('#valuation-btn').hide();
        }
    }
}

const getAttrItemInFields = (fieldId, defaultListFields, formFields) => {
    const existedItem = formFields && formFields.filter((item, k) => {
        if (item.id === fieldId) {
            // get index of specific item in formFields
            item.index = k

            return item
        }
    })
    let updatedField = null
    if (existedItem && existedItem.length > 0) {
        // recall api to get list project by buildingId
        updatedField = {
            ...defaultListFields.filter((df, d) => df.id === fieldId)[0],
           ...existedItem[0],
        }
    }

    return updatedField
}

const generateDependantFields = (item, fnGenerateFieldsByFormId) => {
    return item.fields.map((f, i) => {
        let formField = null
        if (f.id === 'wardId' || f.id === 'streetId' || f.id === 'realEstateGroupId' || f.id === 'propertyTypeId') {
            formField = item._list.filter((l, i) => l.id === f.id)[0]
        } else {
            formField = getAttrItemInFields(f.id, item._list, item._formFields)
        }

        f.updatedAttrs.map((ff, fi) => {
            formField = {
                ...formField,
                ...ff
            }

            if (item.isChanged) {
                // reset value
                formField.value = ''
                
                // get data option value if any
                if ($(`#${item.parentField.id}`).find('option:selected').data(ff.dataId)) {
                    formField.value = $(`#${item.parentField.id}`).find('option:selected').data(ff.dataId)
                }
            }

            return fnGenerateFieldsByFormId(formField, item._formFields)
        })

        return formField
    })
}

$('body').off('click', '#seeomap').on('click', '#seeomap', function (e) {
    e.preventDefault();
    var lat = $.trim($('#latitude').val());
    var lng = $.trim($('#longitude').val());
    var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
    window.open(link);
    return false;
});
