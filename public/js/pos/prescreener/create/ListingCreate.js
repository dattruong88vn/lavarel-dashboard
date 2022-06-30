function ListingCreate() {
    var _this = this;
    var com = new common();
    Window.jsDetailData = new Object();
    const sourceParentIdHasChild = new Set();

    _this.init = function () {
        initVAR();
        loadApi();
        bindEvents();
        com.showReuire(function (labels) {
            $.merge(labels, ['name', 'phone', 'sourceId', 'name-agent']);
        });
    };

    function initVAR() {
        _this.link = '#link';
        _this.phone = '#phone';
        _this.nameOwner = '#name';
        _this.emailOwner = '#email';
        _this.sourceId = '#sourceId';
        _this.statusId = '#statusId';
        _this.listingTypeId = '#listingTypeId';
        _this.realEstateGroupId = '#realEstateGroupId';
        _this.propertyTypeId = '#propertyTypeId';
        _this.buildingId = '#buildingId';
        _this.blockId = '#blockId';
        _this.latitude = '#latitude';
        _this.longitude = '#longitude';
        _this.address = '#address';
        _this.oldAddress = '#oldAddress';
        _this.houseNumber = '#houseNumber';
        _this.cityId = '#cityId';
        _this.districts = '#districtId';
        _this.wards = '#wardId';
        _this.streets = '#streetId';
        _this.noteForLs = '#noteForLs';
        _this.noteData = '#noteData';
        _this.buyNewHouse = '#buyNewHouse';
        _this.sellFolding = '#sellFolding';
        _this.numberFloor = '#numberFloor';
        _this.bedRooms = '#bedRooms';
        _this.bathRooms = '#bathRooms';
        _this.isMezzanine = '#isMezzanine';
        _this.lotSize = '#lotSize';
        _this.floorSize = '#floorSize';
        _this.sizeLength = '#sizeLength';
        _this.sizeWidth = '#sizeWidth';
        _this.isRooftop = '#isRooftop';
        _this.isAttic = '#isAttic';
        _this.isPenhouse = '#isPenhouse';
        _this.minContractDeadline = '#minContractDeadline';
        _this.deposit = '#deposit';
        _this.floor = '#floor';
        _this.position = '#position';
        _this.alleyId = '#alleyId';
        _this.alleyWidth = '#alleyWidth';
        _this.yearBuilt = '#yearBuilt';
        _this.yearFixed = '#yearFixed';
        _this.price = '#price';
        _this.minPrice = '#minPrice';
        _this.useRightTypeId = '#useRightTypeId';
        _this.houseCastings = '#houseCastings';
        _this.statusQuoId = '#statusQuoId';
        _this.priceForStatusQuo = '#priceForStatusQuo';
        _this.roadFrontageWidth = '#roadFrontageWidth';
        _this.uploadNewImages = [];
        _this.uploadNewImagesGCN = [];
        _this.hiddenLoggedInUserId = '#hiddenLoggedInUserId';
        _this.directionId = '#directionId';
        _this.data = resetDataPost();
        loadStyle();
        _this.check_require = 0;

    }

    function loadStyle() {
        $(_this.link).focus();
        $(_this.price).autoNumeric("init", {
            'mDec': 0
        });
        $(_this.minPrice).autoNumeric("init", {
            'mDec': 0
        });
        $(_this.deposit).autoNumeric("init", {
            'mDec': 0
        });
        $(_this.priceForStatusQuo).autoNumeric("init", {
            'mDec': 0
        });
        //$('#moveInDatePicker').datepicker({});
        var yearNow = String((new Date).getFullYear());
        $('.phone-multi').autoNumeric('init', {
            vMin: '0',
            aSep: null,
            mDec: '0',
            lZero: "keep"
        });
        $(_this.yearFixed).autoNumeric('init', {
            vMin: '0',
            vMax: yearNow,
            aSep: null,
            mDec: '0',
            lZero: "keep"
        });
        $(_this.yearBuilt).autoNumeric('init', {
            vMin: '0',
            vMax: yearNow,
            aSep: null,
            mDec: '0',
            lZero: "keep"
        });
        $(_this.address).geocomplete({
            details: ".geo-details",
            detailsAttribute: "data-geo"
        });
        var editor = CKEDITOR.replace('description', {height: 300});
        editor.on('change', function (e) {
            $('#' + 'description').val(e.editor.getData());
            $('#' + 'description').trigger('change');
        });

        $('#phone').phoneBasic();
        $('.phone-multi').phoneBasic();

    }

    function resetDataPost() {
        return com.initData();
    }

    _this.resetDefault = function (type = 1) {
        if (type = 1) {
            window.location.href = '/pos/prescreener/create';
        } else {
            window.location.href = '/pos/prescreener#need-to-call-listing';
        }
    }

    _this.loadDataPost = function (callback) {

        Window.jsDetailData = $.extend(true, {}, _this.data);
        Window.globalVar.photo.getPhotoList();
        var owner = $.extend(true, {}, _this.data.owner);
        _this.data = com.updateData(Window.jsDetailData, function (items) {
            // owner
            var idUser = parseInt($(_this.hiddenLoggedInUserId).val());


            var crawlerStatus = parseInt($('#statusId').val());
            if (crawlerStatus != 3) {
                var owner = [
                    {
                        key: 'sourceId',
                        type: 'int',
                        val: $(_this.sourceId).val(),
                        objectDefault: null,
                    },
                ]
                $.merge(items.owners, owner);
            }

            var standard = [
                {
                    key: 'crawlerLink',
                    type: 'string',
                    val: $(_this.link).val(),
                    objectDefault: null,
                },
                {
                    key: 'updatedBy',
                    type: 'int',
                    val: idUser,
                    objectDefault: null,
                },
                {
                    key: 'createdBy',
                    type: 'int',
                    val: idUser,
                    objectDefault: null,
                },
                {
                    key: 'assignedTo',
                    type: 'int',
                    val: idUser,
                    objectDefault: null,
                },
                {
                    key: 'photo',
                    type: 'string',
                    val: Window.jsDetailData.photo,
                    objectDefault: null,
                },
                {
                    key: 'photoGcn',
                    type: 'string',
                    val: Window.jsDetailData.photoGcn,
                    objectDefault: null,
                },
                {
                    key: 'sourceId',
                    type: 'int',
                    val: $(_this.sourceId).val(),
                    objectDefault: null,
                },
            ]
            $.merge(items.fields, standard);

        });
        _this.data.virtualTouring = {id: null, url: $('#virtualTouring').val().trim()};
        
        if (!isVal(_this.data.owner.phones)) {
            _this.data.owner.phones = new Array();
        }
        if (isVal(owner)) {
            _this.data.owner.phones = owner.phones;
            _this.data.owner.noteForPhone = owner.noteForPhone;
        }
        if (_this.data.crawlerStatus != 3) {
            _this.data.agent = null;
        } else {
            if (!isVal(_this.data.owner.name) && !isVal(_this.data.owner.email) && !isVal(_this.data.owner.phone)) {
                _this.data.owner = null;
            }
        }
        if (callback) callback(_this.data);
    }

    _this.validateAgentPhone = function () {
        var hasErr = false;
        var crawlerStatus = Window.jsDetailData.crawlerStatus;
        if (crawlerStatus == 3 && !isVal(Window.jsDetailData.agent.info.phone)) {
            hasErr = true;
        }

        return hasErr;
    }

    function validate(data, types = []) {
        var hasErr = false;
        if (hasValue(data.email)) {
            if (!isEmail(data.email)) {
                hasErr = true;
                return hasErr;
            }
        }
        hasErr = com.validate(data, types, function (options) {


        });
        if (isVal(data.owner) && isVal(data.owner.phone)) {
            if (data.owner.phone.slice(0, 1) != "0") {
                hasErr.isErr = true;
                $.merge(hasErr.ids, ['phone']);
                $('#phone').validateInputData({nameFull: 'Số điện thoại không hợp lệ'});
            }
        }

        return hasErr;
    }

    _this.validateOutLine = function (type = []) {
        return validate(_this.data, type);
    }

    function checkExistedOwner(isPhone) {
        var data = {
            isPhone: isPhone,
            val: null
        }
        var message = '';
        _this.loadDataPost();
        var hasErr = false;

        if (data.isPhone) {
            data.val = com.getFullPhones(_this.data);
            // validate for phones
            if (data.val.length == 0) {
                hasErr = true;
                showPropzyAlert('Số điện thoại không hợp lệ');
            }
        } else {
            data.val = _this.data.owner.email;
            if (!data.val || !isEmail(data.val)) {
                hasErr = true;
                showPropzyAlert('Email không hợp lệ');
            }
        }

        if (hasErr) {
            return hasErr;
        }

        requestLoading.initCallback(1);
        com.checkExistedOwner(data).done(function (response) {
            requestLoading.addCallbackToQueue();

            if (response.result) {
                if (typeof response.data[0] != "undefined") {
                    var table = renderHtmlCheckExistOwner(response.data);
                    message = table;
                } else {
                    // open google if check phone number
                    if (data.isPhone) {
                        var phonesArray = com.getPhonesStringArray(data.val);
                        var queryStr = 'https://www.google.com.vn/search?q=' + phonesArray.join('+%7C+');
                        message = 'Không có dữ liệu.' +
                            '<a id="google-find-phone" href="' + queryStr + '" target="_blank">Tìm Số Điện Thoại Bằng Google</a>';
                        $("#google-find-phone").click();
                    } else {
                        message = "Không có dữ liệu";
                    }
                }
            } else {
                message = response.message;
            }
            showPropzyAlert(message, 'Thông Tin', function (e) {
                $('#make-call-list').trigger('click');
            });
            $("#table-check-exist-owner").hpaging({"limit": 5});

        })
    }

    function checkExistedAddress() {
        showPropzyLoading();
        // input data address
        _this.loadDataPost();
        const types = ['propertyTypeId', 'cityId', 'districtId', 'wardId', 'streetId', 'houseNumber', 'landCode', 'mapCode', 'modelCode'];
        var errs = validate(_this.data, types);
        if (!errs.isErr) {
            const postData = Object.fromEntries(types.map(key => {return [key, _this.data[key]]}));
            const checkExistedAddress = Listing.checkExistedAddressForPrescreen(postData);
            checkExistedAddress.done(function (response) {
                hidePropzyLoading();
                var result = "";
                if (response.result) {
                    var duplicatedMsg = "";
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
                        })
                    }

                    if (type2.length > 0) {
                        duplicatedMsg += '<br><strong>Tin đăng prescreener: </strong> <br>';
                        $.each(type2, function (idx, item) {
                            duplicatedMsg += "<a target='_blank' href='/pos/prescreener/view/" + item + "'> #" + item + "</a>,";
                        })
                    }

                    if (type3.length > 0) {
                        duplicatedMsg += '<br><strong>Tin hệ thống đã GỠ: </strong> <br>';
                        $.each(type3, function (idx, item) {
                            duplicatedMsg += "<a target='_blank' href='/pos/sa/detail/" + item + "'> #" + item + "</a>,";
                        });
                    }

                    if (type4.length > 0) {
                        duplicatedMsg += '<br><strong>Tin prescreener đã HỦY: </strong> <br>';
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
                    showPropzyAlert(response.message);
                }
                hidePropzyLoading();
            });
        } else {
            hidePropzyLoading();
            showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
        }

    }

    function bindEvents() {
        // Check phone
        $('body').off('click', '#check-duplicated-btn').on('click', '#check-duplicated-btn', function (e) {
            e.preventDefault();
            checkExistedAddress();
        });
        // Check phone
        $('body').off('click', '#btn-check-duplicated-phone').on('click', '#btn-check-duplicated-phone', function (e) {
            e.preventDefault();
            checkExistedOwner(true);
        });

        // Check email
        $('body').off('click', '#check-duplicated-email-btn').on('click', '#check-duplicated-email-btn', function (e) {
            e.preventDefault();
            checkExistedOwner(false);
        });

        $(document).on('blur', '#email', function (e) {
            var blcEmail = $(this).parent();
            var inputEmail = $(this);
            var isValid = true;

            // reset to default
            blcEmail.find(".email-error").remove();
            inputEmail.css("border-color", "");
            // validate
            var isValid = true;

            if (!isEmail(inputEmail.val())) {
                isValid = false;
            }
            if (!inputEmail.val()) {
                isValid = true;
            }

            if (!isValid) {
                var errorMsg = "<span class='email-error'><code>Vui lòng nhập email hợp lệ</code></span>";
                $(errorMsg).insertAfter(inputEmail);
                inputEmail.css("border-color", "red");
            }
        });

        $('body').off('click', '#cancel-pre-btn').on('click', '#cancel-pre-btn', function (e) {
            e.preventDefault();
        });

        $('body').off('click', '#moveInDateCheck').on('click', '#moveInDateCheck', function (e) {
            if ($(this).is(':checked')) {
                $('#moveInDatePicker').attr('disabled', 'disabled');
                $('#display-moveInDate').attr('readonly', true).datepicker("destroy");
            } else {
                $('#moveInDatePicker').removeAttr("disabled");
                $('#display-moveInDate').attr('readonly', false).datepicker();

            }
        });
        $('body').off('click', '#seeonmap').on('click', '#seeonmap', function (e) {
            var lat = $.trim($(_this.latitude).val());
            var lng = $.trim($(_this.longitude).val());
            var link = 'https://www.google.com/maps/?q=' + lat + ',' + lng;
            window.open(link);
            return false;
        });
        $('body').on('change', 'select', function (e) {
            com.showReuire();
        });
        $('body').on('change', 'select, input, textarea', function (e) {
            if (_this.check_require == 1) {
                _this.loadDataPost(function (postData) {
                    var err = validate(postData);
                    var hasClass = $('.form-input-danger').hasClass('pos-feild-err-is-negative');
                    removeValidateNull(err.options);
                    var errs = validate(postData, ['statusId', 'listingTypeId', 'realEstateGroupId', 'propertyTypeId', 'sourceId', 'name', 'name-agent', 'email']);
                })
            } else if (_this.check_require == 2) {
                _this.loadDataPost(function (postData) {
                    var errs = validate(postData);
                })
            }
            return; //END ACTION
        });
        $('body').on('change', '#infoChannel', function (e) {
            loadInfoChannelChild();
        });

        $('body').on('click', '.convert', function (e) {
            var dataSend = {
                x: $("#x-latitude").val(),
                y: $("#y-longitude").val()
            };
            if (dataSend.y.length == 0 || dataSend.x.length == 0) {
                alert("Dữ liệu không được để trống");
                return false;
            }
            return $.ajax({
                url: POS_APIS_COMMON.get('GET_CONVERT_COORDINATE'),
                type: 'POST',
                data: JSON.stringify(dataSend),
                success: function (response) {
                    console.log(response);
                    if (response.result && response.data.length != 0) {
                        $("#latitude").val(response.data[1]);
                        $("#longitude").val(response.data[0]);
                    } else {
                        alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu");
                    }
                },
                error: function (error) {
                    alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu");
                }
            });
        });

        $('body').off('change', '#mortgaged').on('change', '#mortgaged', function (e) {
            if ($(this).is(':checked')) {
                $('#bankId').attr('disabled', false);
            } else {
                $('#bankId').attr('disabled', true);

            }
        });

        $(document).on("change", '#campaignChecked', function () {
            const checked = $(this).is(':checked');
            if (checked) {
                $('#campaignId').prop('disabled', true);
            } else {
                $('#campaignId').prop('disabled', false);
            }
        });

        $(document).on('change', '#projectId', function () {
            const data = $(this).select2('data')[0];
            if (data.address) {
                $('#address').val(data.address);
            }
            if (data.latitude) {
                $('#latitude').val(data.latitude);
            }
            if (data.address) {
                $('#longitude').val(data.longitude);
            }
        });
        $(document).on('change', '#districtId', function () {
            // const checkByFormId = getCheckForm();
            // loadProjectLand(checkByFormId);
        });
    }

    function fillData(field) {
        if (hasValue(field.optionsList.type) && field.optionsList.type == 'ajax') {
            function getAjax() {
                field.optionsList.data().done(function (response) {
                    var _optionList = field.optionsList.callBack(response);
                    $(field.id).html('');
                    $.each(_optionList, function (i, item) {
                        var attr = '';
                        if (hasValue(item.data)) {
                            $.each(item.data, function (key, val) {
                                attr += 'data-' + key + '="' + val + '"';
                            })
                        }
                        const disabled = item.disabled ? 'disabled' : ''
                        $(field.id).append('<option value="' + item.value + '" ' + attr + disabled + '>' + item.text + '</option>');
                    });
                    if (hasValue(field.value)) {
                        $(field.id).val(field.value);
                    }
                    $(field.id).select2().trigger('change');
                });
            }

            getAjax();
            if (hasValue(field.optionsList.changedBy)) {
                $('body').on('change', field.optionsList.changedBy, function (e) {
                    e.preventDefault();
                    $(field.id).html('');
                    getAjax();
                });
            }
        }
        if (hasValue(field.optionsList.type) && field.optionsList.type == 'static') {
            $(field.id).html('');
            $.each(field.optionsList.data(), function (i, item) {
                var attr = '';
                if (hasValue(item.data)) {
                    $.each(item.data, function (key, val) {
                        attr += 'data-' + key + '="' + val + '"';
                    })
                }
                $(field.id).append('<option value="' + item.value + '" ' + attr + '>' + item.text + '</option>');
            });
            if (hasValue(field.value)) {
                $(field.id).val(field.value);
            }
            $(field.id).select2();
        }
        if (hasValue(field.afterRender)) {
            $(document).ready(function () {
                field.afterRender(field);
            });
        }

        if (hasValue(field.onChange)) {
            $('body').off('change', field.id).on('change', field.id, function (e) {
                e.preventDefault();
                field.onChange(field);
            });
        }

    }

    function loadApi() {
        var list = [
            {
                id: _this.statusId,
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
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                // HIDE PROPZY OPTION
                                item.statusId !== 12 && optionList.push({
                                    value: item.statusId,
                                    text: item.statusName
                                });
                            });
                        }
                        return optionList;
                    }
                },
                onChange: function () {
                    customeLoadAfter.loadOwner();
                }
            },
            {
                id: _this.listingTypeId,
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getListingType();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        $.each(response, function (i, item) {
                            optionList.push({
                                value: i,
                                text: item
                            });
                        });
                        return optionList;
                    }
                },
                afterRender: function () {
                    customeLoadAfter.loadDepositAndUserRight();
                    customeLoadAfter.checkSelectListingType();
                },
                onChange: function () {
                    customeLoadAfter.loadDepositAndUserRight();
                    customeLoadAfter.checkSelectListingType();
                },
            },
            {
                id: _this.realEstateGroupId,
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getRealEstateGroup();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        $.each(response, function (i, item) {
                            optionList.push({
                                value: item.id,
                                text: item.name
                            });
                        });
                        return optionList;
                    }
                },
                afterRender: function () {
                    customeLoadAfter.checkSelectRealEstateGroup();
                    customeLoadAfter.loadPropertyType();
                    FormLoader.reload();
                },
                onChange: function () {
                    customeLoadAfter.checkSelectRealEstateGroup();
                    customeLoadAfter.loadPropertyType();
                    FormLoader.reload();
                },
            },
            {
                id: _this.sourceId,
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getChannelTypes();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        if (response.result) {
                            const sources = response.data.filter(type => type.type === 1)[0];
                            const soucesFilter = sources.list.filter(src => [2, 3, 5, 7, 9, 166].indexOf(src.id) == -1);

                            const soucesLast = soucesFilter.map(src => {

                                if (src.childs.length > 0) {
                                    sourceParentIdHasChild.add(src.id);
                                }
                                return {
                                    value: src.id,
                                    text: src.name
                                };
                            });
                            sourceParentIdHasChild.add(177);
                            optionList = optionList.concat(soucesLast);
                        }
                        return optionList;
                    }
                },
                onChange: function () {
                    loadTc();
                }
            },
            {
                id: _this.cityId,
                optionsList: {
                    type: 'static',
                    data: function () {
                        var optionList = [
                            {
                                value: 1,
                                text: 'TP Hồ Chí Minh'
                            }
                        ];
                        return optionList;

                    }
                },
            },
            {
                id: _this.districts,
                optionsList: {
                    type: 'ajax',
                    changedBy: _this.cityId,
                    data: function () {
                        _this.loadDataPost();
                        var dataPost = _this.data;
                        return Listing.getDistrictList(dataPost.cityId);
                    },
                    callBack: function (response) {
                        var optionList = [{
                            value: '',
                            text: '----Chọn Quận----'
                        }];
                        if (response.result) {
                            $.each(response.data, function (idx, item) {
                                optionList.push({
                                    value: item.districtId,
                                    text: item.districtName,
                                });
                            })
                        };

                        return optionList;
                    }
                },
                afterRender: function(){
                    const checkByFormId = getCheckForm();
                    customeLoadAfter.loadBuilding(checkByFormId);
                    loadProjectLand(checkByFormId);
                },
                onChange: function(){
                    const checkByFormId = getCheckForm();
                    customeLoadAfter.loadBuilding(checkByFormId);
                    loadProjectLand(checkByFormId);
                }
            },
            {
                id: _this.wards,
                optionsList: {
                    type: 'ajax',
                    changedBy: _this.districts,
                    data: function () {
                        _this.loadDataPost();
                        var dataPost = _this.data;
                        return Listing.getWardList(dataPost.districtId);
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Chọn Phường--'
                            }
                        ];
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.wardId,
                                    text: item.wardName
                                });
                            });
                        }

                        return optionList;
                    }
                }
            },
            {
                id: _this.streets,
                optionsList: {
                    type: 'ajax',
                    changedBy: _this.wards,
                    data: function () {
                        _this.loadDataPost();
                        var dataPost = _this.data;
                        return Listing.getStreetList(dataPost.wardId);
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Chọn Đường --'
                            }
                        ];
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.streetId,
                                    text: item.streetName,
                                    data: {
                                        'width-value': item.widthValue
                                    }
                                });
                            });
                        }

                        return optionList;
                    },
                    onChange: function () {

                    }
                }
            },
            {
                id: _this.useRightTypeId,
                optionsList: {
                    type: 'ajax',
                    data: function () {
                        return Listing.getUserRightTypes();
                    },
                    callBack: function (response) {
                        var optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --'
                            }
                        ];
                        if (response.result) {
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.useRightTypeId,
                                    text: item.typeName
                                });
                            });
                        }
                        return optionList;
                    }
                },
                afterRender: function () {
                    customeLoadAfter.loadPrivacy();
                },
                onChange: function () {
                    customeLoadAfter.loadPrivacy();
                }
            },
            {
                id: _this.directionId,
                optionsList: {
                    type: 'static',
                    data: function () {
                        const optionList = [
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
                        ];
                        return optionList;
                    }
                }
            },
        ];

        var customeLoadAfter = {
            loadPropertyType: function(){
                _this.loadDataPost();
                const dataPost = _this.data;
                const { realEstateGroupId, listingTypeId } = dataPost;
                const optionsList = {
                    type: 'static',
                    data: function () {
                        const optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --',
                                data: null
                            }
                        ];
                        return optionList;
                    }
                };
                const propertyType = {
                    id: _this.propertyTypeId,
                    optionsList: !(hasValue(realEstateGroupId) && hasValue(listingTypeId)) ? optionsList  : {
                        type: 'ajax',
                        data: function () {
                            _this.loadDataPost();
                            const dataPost = _this.data;
                            return Listing.getPropertyTypeV2(dataPost.realEstateGroupId, dataPost.listingTypeId);
                        },
                        callBack: function (response) {
                            var optionList = [
                                {
                                    value: '',
                                    text: '-- Vui Lòng Chọn --',
                                    data: null
                                }
                            ];
                            if (response.result == false) {
                                return optionList;
                            }
                            $.each(response.data, function (i, item) {
                                optionList.push({
                                    value: item.propertyTypeId,
                                    text: item.typeName,
                                    data: {
                                        formId: item.formId
                                    },
                                    disabled: !item.active
                                });
                            });
                            return optionList;
                        },
                    },
                    afterRender: function () {
                        _this.loadDataPost();
                        const checkByFormId = getCheckForm();
                        customeLoadAfter.loadBuilding(checkByFormId);
                        customeLoadAfter.loadPosition(checkByFormId);
                        customeLoadAfter.loadStruct(checkByFormId);
                        customeLoadAfter.loadNumberFloor(checkByFormId);
                        loadProjectLand(checkByFormId);
                        FormLoader.reload();
                        //Check items loaded
                        customeLoadAfter.checkPropertyType();
                        //Reload when property type change
                        com.showReuire();
                    },
                    onChange: function () {
                        _this.loadDataPost();
                        const checkByFormId = getCheckForm();
                        customeLoadAfter.loadBuilding(checkByFormId);
                        customeLoadAfter.loadPosition(checkByFormId);
                        customeLoadAfter.loadStruct(checkByFormId);
                        customeLoadAfter.loadNumberFloor(checkByFormId);
                        loadProjectLand(checkByFormId);
                        FormLoader.reload();
                        //Check items loaded
                        customeLoadAfter.checkPropertyType();
                        //Reload when property type change
                        com.showReuire();
                    }
                };
                fillData(propertyType);
            },
            loadBuilding: function (checkByFormId) {
                _this.loadDataPost();
                const dataPost = _this.data;
                const { districtId } = dataPost;
                const { display, buildingBlock, modelCode } = checkByFormId.building;
                if(display){
                    $('#blc-building').show();
                }else {
                    $('#blc-building').hide();
                }
                // For Building & Block
                if (buildingBlock) {
                    const optionsListBuilding = {
                        type: 'static',
                        data: function () {
                            let optionList = [
                                {
                                    value: '',
                                    text: '-- Vui Lòng Chọn --',
                                }
                            ];
                            return optionList;
                        },
                    }
                    const building = {
                        id: _this.buildingId,
                        optionsList: !hasValue(districtId) ? optionsListBuilding : {
                            type: 'ajax',
                            data: function () {
                                _this.loadDataPost();
                                const dataPost = _this.data;
                                return Listing.getBuildingListByDistrictId(dataPost.districtId);
                            },
                            callBack: function (response) {
                                let optionList = [
                                    {
                                        value: '',
                                        text: '-- Vui Lòng Chọn --'
                                    }
                                ];
                                if (response.result) {
                                    $.each(response.data, function (id, item) {
                                        optionList.push({
                                            value: item.buildId,
                                            text: item.buildingName,
                                            address: item.address,
                                            long: item.longitude,
                                            lat: item.latitude,
                                            numberFloor: item.numberFloor,
                                            projectId: item.projectId,
                                            data: {
                                                address: item.address,
                                                long: item.longitude,
                                                lat: item.latitude,
                                                numberFloor: item.numberFloor,
                                                projectId: item.projectId
                                            }
                                        });
                                    });
                                }
                                return optionList;
                            }
                        },
                        afterRender: function() {
                            customeLoadAfter.loadBlock(checkByFormId);
                        },
                        onChange: function () {
                            var data = $(_this.buildingId).select2('data')[0];
                            $(_this.address).val(data.element.dataset.address);
                            $(_this.longitude).val(data.element.dataset.long);
                            $(_this.latitude).val(data.element.dataset.lat);
                            loadProjectLand(checkByFormId);
                            customeLoadAfter.loadBlock(checkByFormId);
                        }
                    };
                    fillData(building);

                    $('#display-buildingBlock').show();
                } else {
                    $('#display-buildingBlock').hide();
                }
                //For modeCode (Ma can ho)
                if(modelCode) 
                    $("#display-modelCode").show(); 
                else 
                    $("#display-modelCode").hide();

                return; //END ACTION;

            },
            loadBlock: function (checkByFormId) {
                _this.loadDataPost();
                const dataPost = _this.data;
                const { buildingId } = dataPost;
                const optionsListBlock = {
                    type: 'static',
                    data: function () {
                        const optionList = [
                            {
                                value: '',
                                text: '-- Vui Lòng Chọn --',
                            }
                        ];
                        return optionList;
                    },
                }
                const block = {
                    id: _this.blockId,
                    optionsList: !hasValue(buildingId) ? optionsListBlock : {
                        type: 'ajax',
                        data: function () {
                            _this.loadDataPost();
                            const data = _this.data.buildingId;
                            return Listing.getBlocksByBuilding(data);
                        },
                        callBack: function (response) {
                            const optionList = [
                                {
                                    value: '',
                                    text: '-- Vui Lòng Chọn --'
                                }
                            ];
                            if (response.result) {
                                $.each(response.data, function (id, item) {
                                    optionList.push({
                                        value: item.blockId,
                                        text: item.blockName,
                                        numberFloor: item.numberFloor,
                                        data: {
                                            numberFloor: item.numberFloor,
                                        }
                                    });
                                });
                            }
                            return optionList;
                        }
                    },
                    afterRender: function () {
                        customeLoadAfter.loadNumberFloor(checkByFormId);
                    },
                    onChange: function () {
                        customeLoadAfter.loadNumberFloor(checkByFormId);
                    }
                };
                fillData(block);
                return; //END ACTION
            },
            loadPosition: function (checkByFormId) {
                const displayPosition = checkByFormId ? checkByFormId.position : false;
                const displayFloor = checkByFormId ? checkByFormId.floor: false;
                if(!displayPosition && !displayFloor) { // Hide the blank place if position and floor not visisble 
                    $("#display-position").hide();
                    return;
                }
                $("#display-position").show();
                if (displayPosition) {
                    $('#display-basic-position').show();
                    var position = {
                        id: _this.position,
                        optionsList: {
                            type: 'static',
                            data: function () {
                                var optionList = [
                                    {
                                        value: 1,
                                        text: 'Mặt tiền'
                                    },
                                    {
                                        value: 2,
                                        text: 'Hẻm'
                                    },
                                ];
                                return optionList;
                            }
                        },
                        afterRender: function () {
                            customeLoadAfter.loadAlley();
                        },
                        onChange: function () {
                            customeLoadAfter.loadAlley();
                        }
                    };
                    fillData(position);
                } else {
                    $('#display-basic-position').hide();
                    $('#display-front').hide();
                    $('#display-alley').hide();
                }
                return; //END ACTION;
            },
            loadAlley: function () {
                _this.loadDataPost();
                var data = _this.data;

                var position = data.position.position;

                if ($.inArray(position, [1]) > -1) {
                    $('#display-front').show();
                    $('#display-alley').hide();
                } else {
                    var alley = {
                        id: _this.alleyId,
                        optionsList: {
                            type: 'ajax',
                            data: function () {
                                return Listing.getAlleyTypes();
                            },
                            callBack: function (response) {
                                var optionList = [
                                    {
                                        value: '',
                                        text: '-- Vui Lòng Chọn --'
                                    }
                                ];
                                if (response.result) {
                                    response.data.filter(item => {
                                        optionList.push({value: item.alleyId, text: item.alleyName})
                                    })
                                }
                                return optionList;
                            }
                        }
                    };
                    var roadFrontageDistance = {
                        id: '#roadFrontageDistance',
                        optionsList: {
                            type: 'static',
                            data: function () {
                                var optionList = [
                                    {
                                        value: 0,
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
                                    },
                                ];
                                return optionList;
                            }
                        }
                    };
                    fillData(alley);
                    fillData(roadFrontageDistance);
                    $('#display-front').hide();
                    $('#display-alley').show();
                }
                return; //END ACTION;
            },
            loadDepositAndUserRight: function () {

                _this.loadDataPost();
                var data = _this.data.listingTypeId;

                if (data == 1) {
                    $(_this.useRightTypeId).removeAttr('disabled');
                    $("#mortgaged").prop('disabled', false);
                    $('#display-deposit').hide();
                    $("#display-legalPapers").show();
                } else {
                    $(_this.useRightTypeId).attr('disabled', true);
                    $(_this.useRightTypeId).val();
                    $("#mortgaged").prop('disabled', true);
                    $("#mortgaged").prop('checked', false);
                    $('#display-privacy').hide();
                    $('#display-deposit').show();
                    $('#display-legalPapers').hide(); //Hide legal papers
                }
                $("#mortgaged").trigger("change");
                return; //END ACTION;
            },
            loadPrivacy: function () {
                _this.loadDataPost();
                var data = _this.data.useRightTypeId;

                if ($.inArray(data, [1, 2]) > -1) {
                    $('#display-privacy').show();
                } else {
                    $('#display-privacy').hide();
                }
                return; //END ACTION;
            },
            loadStatusQuoPrice: function () {
                _this.loadDataPost();
                var data = _this.data.statusQuoId;

                if ($.inArray(data, [163]) > -1) {
                    $('#display-statusQuo').show();
                } else {
                    $('#display-statusQuo').hide();
                }
                return; //END ACTION;
            },
            loadStruct: function (checkByFormId) {
                const displayStruct = checkByFormId ? checkByFormId.struct : false;
                if (displayStruct) {
                    $('.display-struct').show();
                } else {

                    $('.display-struct').hide();
                }

                var statusQuoId = {
                    id: _this.statusQuoId,
                    optionsList: {
                        type: 'ajax',
                        data: function () {
                            return Listing.getChannelTypes();
                        },
                        callBack: function (response) {
                            var optionList = [
                                {
                                    value: '',
                                    text: '-- Vui Lòng Chọn --'
                                }
                            ];
                            if (response.result) {
                                $.each(response.data, function (id, type) {
                                    if (type.type == 13) {
                                        $.each(type.list, function (key, item) {

                                            optionList.push({
                                                value: item.id,
                                                text: item.name
                                            });
                                        });
                                        return false;
                                    }
                                });
                            }
                            return optionList;
                        }
                    },
                    onChange: function () {
                        customeLoadAfter.loadStatusQuoPrice();
                    }
                };
                fillData(statusQuoId);
                $('.display-statusQuoId').show();
                return; //END ACTION;
            },
            loadOwner: function () {
                _this.loadDataPost();
                var data = _this.data.crawlerStatus;
                if ($.inArray(data, [3]) > -1) {
                    $('.display-agent').show();
                    $('#name-agent').select2({
                        language: {
                            searching: function () {
                                return null;
                            },
                            noResults: function () {
                                return "Không có dữ liệu";
                            },
                        },
                        matcher: function (term, text) {
                            if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                                return true;
                            }
                        },
                        ajax: {
                            delay: 500,
                            data: function (params) {
                                var queryParameters = {
                                    q: hasValue(params.term) ? params.term : null
                                };
                                return queryParameters;
                            },
                            processResults: function (response) {
                                var optionList = [];
                                if (response.result) {
                                    $.each(response.data, function (id, item) {
                                        optionList.push({
                                            id: item.agentId,
                                            text: item.name + '    - ' + item.phone + ' - ' + ((item.contractStatus == 17) ? 'Đã ký HĐ' : 'Chưa ký HĐ'),
                                            phone: item.phone,
                                            email: item.email,
                                            socialuid: item.socialUid
                                        });
                                    });
                                }
                                return {
                                    results: optionList
                                };
                            },
                            transport: function (params, success, failure) {
                                var name = params.data.q;
                                if (hasValue(name)) {
                                    if (name.substr(-1) == ' ' || name.split(' ').length > 1) {
                                        name = name.trim();
                                    }
                                } else {
                                    name = null;
                                }
                                var $request = com.getAgent({keywords: name});
                                $request.then(success);
                                $request.fail(failure);
                                return $request;
                            }
                        },
                    });

                    $('#name-agent').on('change', function (e) {
                        $('#email-agent').val('');
                        $('#phone-agent').val('');
                        $('#socialUid-agent').val('');
                        var email = $('#name-agent').select2('data')[0].email;
                        var phone = $('#name-agent').select2('data')[0].phone;
                        var socialuid = $('#name-agent').select2('data')[0].socialuid;
                        $('#email-agent').val(email);
                        $('#phone-agent').val(phone);
                        $('#socialUid-agent').val(socialuid);
                        _this.loadDataPost();
                    })
                } else {
                    $('.display-agent').hide();
                }
                return; //END ACTION;
            },
            loadNumberFloor: function (checkByFormId) {
                const numberFloorSetting = checkByFormId.numberFloor;
                const { display, isBuildingFloor } = numberFloorSetting;
                if(!display){
                    $('#display-numberfloor').hide();
                    return; // END ACTION
                }
                var buildingId = $('#buildingId').find('option:selected').val();
                $('#display-numberfloor').show();
                
                if (!isBuildingFloor) {
                    $('.label-numberFloor').text('Số lầu');
                    $('#numberFloor').prop('disabled', false);
                } else {
                    $('#numberFloor').prop('disabled', true);
                    $('.label-numberFloor').text('Số tầng của tòa nhà');
                    if (isVal(buildingId)) {
                        var block = $('#blockId').find('option:selected').data('numberfloor');
                        if (isVal(block)) {
                            $('#numberFloor').val(block);
                        } else {
                            var building = $('#buildingId').find('option:selected').data('numberfloor');
                            $('#numberFloor').val(building);
                        }
                    }else{
                        $('#numberFloor').val('');
                    }
                }
                return; //END ACTION;
            },
            checkSelectListingType: function () {
                let listingTypeId = $('#listingTypeId').val();
                if (listingTypeId) {
                    $('#realEstateGroupId').attr('disabled', false);
                } else {
                    $('#realEstateGroupId').attr('disabled', true);
                }
                $('#realEstateGroupId').val('').trigger("change");
                return; //END ACTION;
            },
            checkSelectRealEstateGroup: function () {
                let realEstateGroupId = $('#realEstateGroupId').val();
                if (realEstateGroupId) {
                    $('#propertyTypeId').attr('disabled', false);
                } else {
                    $('#propertyTypeId').attr('disabled', true);
                }
                return; //END ACTION;
            },
            checkPropertyType: function (){
                let propertyOptions = $('#propertyTypeId option');
                if(propertyOptions.length > 1){
                    $('#propertyTypeId').attr('disabled', false);
                } else {
                    $('#propertyTypeId').attr('disabled', true);
                }
                return; //END ACTION;
            }

        }

        $.each(list, function (index, field) {
            fillData(field);
        })

        //
        loadmockSurnameId();
        loadInfoChannel();
        loadInfoChannelChild();
        bankInfo();

    }

    async function loadmockSurnameId() {
        let dataMap = [];
        await POS_PROMISISE_API("COMMON_GET_CHANNEL_TYPE", {type: 10});
        if (POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST) {
            dataMap = POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST[0].list.map(it => {
                return {
                    id: it.id,
                    text: it.name
                }
            });
        }
        $("#mockSurnameId").html('').select2();
        let data = [{id: "", text: "--Chọn định danh--"}];
        data = data.concat(dataMap);
        $("#mockSurnameId").select2({
            data: data,
        });
        if (isVal(Window.jsDetailData.mockSurnameId)) {
            $("#mockSurnameId").val(Window.jsDetailData.mockSurnameId).select2();
        }
    }


    async function loadTc() {
        $('.tc-wrapper').hide();
        const sourceId = parseInt($('#sourceId').val());
        if (sourceId == 177) {
            await POS_PROMISISE_API("GET_TC");
            if (POS_STORED_LOCAL_API.TC_LIST) {
                $("#tcId").html('').select2();
                let data = [{id: "", text: "--Chọn trung tâm--"}];
                data = data.concat(POS_STORED_LOCAL_API.TC_LIST);
                $("#tcId").select2({
                    data: data,
                });
            }
            if (isVal(Window.jsDetailData.tcid)) {
                $("#tcId").val(Window.jsDetailData.tcid).trigger("change");
            }
            $('.tc-wrapper').show();
        }
    }
    async function loadInfoChannel() {
        await POS_PROMISISE_API("GET_INFO_CHANNEL");
        if (POS_STORED_LOCAL_API.INFO_CHANNEL_LIST) {
            $("#infoChannel").html('').select2();
            let data = [{id: "", text: "--Chọn kênh thông tin--"}];
            data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_LIST);
            $("#infoChannel").select2({
                data: data,
            });
            if (isVal(Window.jsDetailData.channelTypeId)) {
                $("#infoChannel").val(Window.jsDetailData.channelTypeId).select2();
            }
        }
    }
    async function loadInfoChannelChild() {
        const parentId = parseInt($('#infoChannel').val());
        await POS_PROMISISE_API("GET_INFO_CHANNEL_CHILD", {parentId: parentId});
        let dataMap = [];
        if (POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST) {
            dataMap = POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST;
        }
        $("#infoChannelChild").html('').select2();
        let data = [{id: "", text: "--Chọn nguồn thông tin--"}];
        data = data.concat(dataMap);
        $("#infoChannelChild").select2({
            data: data,
        });
        if (isVal(Window.jsDetailData.channelTypeChildId)) {
            $("#infoChannelChild").val(Window.jsDetailData.channelTypeChildId).select2();
        }
    }
    async function bankInfo() {
        axios.get(POS_APIS_COMMON.get("GET_BANK_LIST"), {})
            .then(xhr => {
                const response = xhr.data;
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                if (response.result) {
                    const dataMap = response.data.map(bank => {
                        return {
                            id: bank.id,
                            text: bank.name
                        };
                    });
                    optionList = optionList.concat(dataMap);
                }

                $("#bankId").html("").select2({
                    data: optionList
                });
            })
            .catch(err => {
                var optionList = [{
                    id: '',
                    text: 'Chọn ngân hàng'
                }];
                $("#bankId").html(optionList).select2();
                showErrLog(err);
            });
    }
    async function loadProjectLand(checkByFormId) {
        _this.loadDataPost();
        let blockProjectLand = $('#blc-project-land');
        let selectProject = $("#projectId");
        const { project, building } = checkByFormId;
        const canDisplay = project.display;
        const canEdit = project.edit;
        if(!canDisplay){
            blockProjectLand.hide();
            return; //END ACTION
        }
        blockProjectLand.show();
        selectProject.attr('disabled', true); //VIEW ONLY
        if(canEdit){
            selectProject.attr('disabled', false);
        }
        let districtId = $('#districtId').val();
        let data = [
            {
                id: "",
                text: "Chọn dự án",
                address: '',
                longitude: '',
                latitude: ''
            }
        ];
        if(hasValue(districtId)){
            let response = await axios.post(PROJECT_API.get('GET_LIST_BY_DISTRICT'), {
                districtId: $('#districtId').val(),
                cityId: $('#cityId').val()
            }).catch((err) => {
                showErrLog(err);
            });
            let resultsContent = response.data;
            
            if (resultsContent) {
                const dataMap = resultsContent.data.map(it => {
                    return {
                        id: it.pId,
                        text: it.projectName ? it.projectName : "N/A",
                        address: it.address,
                        latitude: it.latitude,
                        longitude: it.longitude
                    };
                });
                data = data.concat(dataMap);
            }
        }

        selectProject.html("").select2();
        selectProject.select2({
            data: data
        });

        const { display, buildingBlock } = building;
        if(display && buildingBlock ){
            const buildingData = $(_this.buildingId).select2('data')[0];
            const projectId = buildingData.element.dataset.projectid;
            selectProject.val(!isNaN(projectId) ? projectId : '').trigger('change');
        }
        return; //END ACTION
    }

    function removeValidateNull(options) {
        $('.form-input-danger').each(function (i, formInput) {
            var id = $(formInput).attr('id');
            var negative = $(formInput).hasClass('pos-feild-err-is-negative');
            $.each(options, function (i2, item) {
                if (!negative && id == item.id) {
                    item.val = "0";
                    $('#' + item.id).validateInputData(item);
                }
            })
        })
    }

    function removeValidate(id) {
        var item = {
            id: id,
            val: '0',
            noShowMess: true,
            optionsErr: []
        }
        $('#' + item.id).validateInputData(item);
    }

    function getCheckForm(){
        let id = parseInt($("#propertyTypeId").find(":selected").data("formid"));
        let findId = !isNaN(id) ? id : 0; // Form default
        return ListForm.filter(f => f.id == findId).slice()[0];
    }


    const FormLoader = {
        currentForm: null,
        displayList: [
            "houseNumber",
            "floor",
            "landCode",
            "mapCode",
            "lotSize",
            "floorSize",
            "sizeLength",
            "sizeWidth",
            "bedRooms",
            "bathRooms",
            "yearBuilt",
            "yearFixed",
        ],

        reload: function() {
            this.currentForm = getCheckForm();
            this.load();
        },
        
        load: function(){
            Object.keys(this.currentForm)
            .filter(key => this.displayList.includes(key))
            .forEach(item => {
                const check = this.currentForm[item];
                let itemDisplay = $(`#display-${item}`);
                if(check){
                    return itemDisplay.show();
                }
                return itemDisplay.hide();
            });
        }
    }

    _this.insertListing = function (callback) {
        clearAllValidate();
        requestLoading.initCallback(1);
        _this.loadDataPost(async function (postData) {

            var err = validate(postData);
            var hasClass = $('.form-input-danger').hasClass('pos-feild-err-is-negative');
            removeValidateNull(err.options);
            var errs = validate(postData, ['statusId', 'listingTypeId', 'realEstateGroupId', 'propertyTypeId', 'sourceId', 'districtId', 'name', 'name-agent', 'email', 'phone', 'phone-agent']);

            if (!errs.isErr && !hasClass) {
                let dataCheckLatlong = {
                    latitude: postData.latitude,
                    longitude: postData.longitude,
                    wardId: postData.wardId,
                };

                function insertListing() {
                    if (isVal(postData.id)) {
                        // update
                        com.updateListing(postData).done(function (response) {
                            requestLoading.addCallbackToQueue();
                            if (callback) callback(response);
                        });
                    } else {
                        //insert
                        com.insertListing(postData).done(function (response) {
                            requestLoading.addCallbackToQueue();
                            if (callback) callback(response);
                        });
                    }
                }

                await checkLatLong(
                    dataCheckLatlong,
                    insertListing,
                    hidePropzyLoading
                );
            } else {
                requestLoading.addCallbackToQueue();
                showPropzyAlert('Xin vui lòng kiểm tra lại dữ liệu');
            }
        });

        return; //END ACTION
    };

    _this.sendSA = function (callback) {
        clearAllValidate();
        requestLoading.initCallback(1);
        _this.loadDataPost(async function (postData) {
            var errs = validate(postData);
            if (!errs.isErr) {
                let dataCheckLatlong = {
                    latitude: postData.latitude,
                    longitude: postData.longitude,
                    wardId: postData.wardId,
                };

                function createListing() {
                    if (isVal(postData.id)) {
                        // update
                        com.sendSa(postData).done(function (response) {
                            requestLoading.addCallbackToQueue();
                            if (callback) callback(response);
                        });
                    } else {
                        //insert
                        com.insertListing(postData).done(function (responseInsert) {
                            if (responseInsert.result) {
                                $.extend(postData, responseInsert.data);
                                if (postData.crawlerStatus != 3) {
                                    postData.owner.ownerId = responseInsert.data.ownerId;
                                }
                                com.sendSa(postData).done(function (response) {
                                    requestLoading.addCallbackToQueue();
                                    if (callback) callback(response);
                                });
                            } else {
                                requestLoading.addCallbackToQueue();
                                showPropzyAlert('Tạo mới listing không thành công <br> ' + responseInsert.message, 'Thông Báo');
                            }
                        });
                    }
                }

                await checkLatLong(
                    dataCheckLatlong,
                    createListing,
                    hidePropzyLoading
                );
            } else {
                requestLoading.addCallbackToQueue();
                showPropzyAlert('Xin vui lòng kiểm tra lại dữ liệu');
            }
        })
    }

}
