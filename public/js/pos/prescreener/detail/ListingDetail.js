function ListingDetail() {
    var _this = this;
    var com = new common();
    const sourceParentIdHasChild = new Set();

    _this.init = function () {
        initVAR();
        loadLink();
        loadApi();
        loadDistrict(1, false);
        loadAddress();
        loadVirtualTouring();
        loadWard(Window.jsDetailData.districtId, false);
        loadStreet(Window.jsDetailData.wardId, false);
        loadHouseNumber();
        loadNoteCrawler();
        loadNoteForLs();
        loadBuyNewHouse();
        loadSellFolding();
        loadFloors();
        loadBedRooms();
        loadBathRooms();
        loadUseDefaultPhoto();
        loadLotSize();
        loadFloorSize();
        loadSizeLength();
        loadSizeWidth();
        loadIsMezzanine();
        loadIsRooftop();
        loadFacility();
        loadIsAttic();
        loadIsPenhouse();
        loadPosition();
        loadAlleyId();
        loadAlleyType();
        loadAlleyWidth();
        loadYearBuilt();
        loadYearFixed();
        loadPrice();
        loadCurrency();
        loadMinPrice();
        loadMinContractDeadline();
        loadMoveInDate();
        loadDepositText();
        loadHouseCastings();
        loadRoadFrontageDistance();
        loadPrivacy();
        loadUseRightTypeId();
        loadStatusQuoId();
        loadPriceForStatusQuo();
        loadTitle();
        loadDescription();
        loadMortgaged();
        loadCampaign();
        loadLandCode();
        loadMapCode();
        loadDirection();
        bindEvents();
        loadBtns();
        com.showReuire();
    };

    function initVAR() {
        _this.link = "#link";
        _this.nameOwner = "#name";
        _this.emailOwner = "#email";
        _this.sourceId = "#sourceId";
        _this.statusId = "#statusId";
        _this.listingTypeId = "#listingTypeId";
        _this.realEstateGroupId = "#realEstateGroupId";
        _this.propertyTypeId = "#propertyTypeId";
        _this.buildingId = "#buildingId";
        _this.blockId = "#blockId";
        _this.latitude = "#latitude";
        _this.longitude = "#longitude";
        _this.address = "#address";
        _this.oldAddress = "#oldAddress";
        _this.virtualTouring = "#virtualTouring";
        _this.houseNumber = "#houseNumber";
        _this.cityId = "#cityId";
        _this.districts = "#districtId";
        _this.wards = "#wardId";
        _this.streets = "#streetId";
        _this.noteForLs = "#noteForLs";
        _this.noteData = "#noteData";
        _this.buyNewHouse = "#buyNewHouse";
        _this.sellFolding = "#sellFolding";
        _this.useDiy = "#useDiy";
        _this.reasonNotUseDiy = "#reasonNotUseDiy";
        _this.numberFloor = "#numberFloor";
        _this.bedRooms = "#bedRooms";
        _this.bathRooms = "#bathRooms";
        _this.isMezzanine = "#isMezzanine";
        _this.lotSize = "#lotSize";
        _this.floorSize = "#floorSize";
        _this.sizeLength = "#sizeLength";
        _this.sizeWidth = "#sizeWidth";
        _this.isRooftop = "#isRooftop";
        _this.isBasement = "#isBasement";
        _this.isAttic = "#isAttic";
        _this.isPenhouse = "#isPenhouse";
        _this.minContractDeadline = "#minContractDeadline";
        _this.deposit = "#deposit";
        _this.floor = "#floor";
        _this.position = "#position";
        _this.alleyId = "#alleyId";
        _this.alleyWidth = "#alleyWidth";
        _this.yearBuilt = "#yearBuilt";
        _this.yearFixed = "#yearFixed";
        _this.price = "#price";
        _this.currency = "#currency";
        _this.minPrice = "#minPrice";
        _this.useRightTypeId = "#useRightTypeId";
        _this.data = resetDataPost();
        _this.title = "#title";
        _this.description = "#description";
        _this.id = Window.jsDetailData.id;
        _this.ownerId = Window.jsDetailData.ownerId;
        _this.houseCastings = "#houseCastings";
        _this.statusQuoId = "#statusQuoId";
        _this.priceForStatusQuo = "#priceForStatusQuo";
        _this.roadFrontageWidth = "#roadFrontageWidth";
        _this.pushOwnerBtn = "#push-owner-btn";

        $(_this.price).autoNumeric("init", {
            mDec: 0,
        });
        $(_this.minPrice).autoNumeric("init", {
            mDec: 0,
        });
        $(_this.deposit).autoNumeric("init", {
            mDec: 0,
        });
        $(_this.priceForStatusQuo).autoNumeric("init", {
            mDec: 0,
        });
        $("#phone").phoneBasic();
        _this.loadStreet = function (wardId, isSelect) {
            loadStreet(wardId, isSelect);
        };
        $("#moveInDatePicker").datepicker({});

        var editor = CKEDITOR.replace("description", { height: 300 });
        editor.on("change", function (e) {
            $("#" + "description").val(e.editor.getData());
            $("#" + "description").trigger("change");
        });

        _this.check_require = 0;
    }

    _this.templateIsSentApp = () => {
        // hide / show some buttons after Gửi tk
        $(".display-use-diy-btn").empty()
        $(".display-use-diy-checkbox").empty()
        $(".display-use-diy-message").empty()

        $('.display-unlock-btn').show()
        $('.display-unlock-message').show()

        const jsDetailData = Window.jsDetailData
        const pushedToOwnerList = jsDetailData.pushedToOwnerList && 'disabled' || '';
        let textPushToOwner = 'Push To Owner List'
        if (pushedToOwnerList) {
            textPushToOwner = 'Đã chuyển'
        }
        
        let htmlBtn = '<div class="form-group">'
        htmlBtn = '<div class="col-md-6"><button id="push-owner-btn" class="btn btn-success" ' + pushedToOwnerList + '>'
        htmlBtn += '<span class="text-btn">' + textPushToOwner + '</span>'
        htmlBtn += '</button></div>'

        let clsMrTop = ''
        if (pushedToOwnerList) {
            let btnUnlock =  '<div class="col-md-6"><button id="unlock-btn" class="btn btn-warning">'
            btnUnlock += '<span class="text-btn">Yêu cầu gửi hình ảnh</span>'
            btnUnlock += '</button></div>'

            htmlBtn += btnUnlock
            clsMrTop = 'mr-top'
        }
       
        
        htmlBtn += '<div class="col-md-6"><button id="resend-btn" class="btn btn-success ' + clsMrTop + '">'
        htmlBtn += '<span class="text-btn">Cập nhật mật khẩu</span>'
        htmlBtn += '</button></div>'
        htmlBtn += '</div>'
        $('.display-unlock-btn').html(htmlBtn)

        let htmlMsg = '<label class="control-label">* Ghi chú: ' + jsDetailData.ownerAppStatus.statusFormat + '</label>'
        $('.display-unlock-message').html(htmlMsg)
    }

    function resetDataPost() {
        return com.initData(Window.jsDetailData);
    }

    function loadDataPost(callback) {
        Window.globalVar.photo.getPhotoList();
        /*		_this.data.ownerId = Window.jsDetailData.ownerId;
        _this.data.owner = $.extend(true, {}, Window.jsDetailData.owner);*/
        var owner = $.extend(true, {}, _this.data.owner);
        var dataSkip = $.extend(true, {}, _this.data);
        const jsDetailData = Window.jsDetailData
        
        _this.data = com.updateData(jsDetailData, function (items) {
            //send diy
            let diyVal = jsDetailData.useDiy
            // if not sent app and input not checked, reset diy value
            if (!jsDetailData.ownerAppStatus.isSentApp && diyVal !== 2) {
                diyVal = $(_this.useDiy).val()
            }

            var useDiy = {
                key: "useDiy",
                type: "int",
                val: diyVal,
                objectDefault: null,
            };
            var reasonNotUseDiy = {
                key: "reasonNotUseDiy",
                type: "string",
                val: null,
                objectDefault: null,
            };
            var photo = {
                key: "photo",
                type: "string",
                val: jsDetailData.photo,
                objectDefault: null,
            };
            var photoGcn = {
                key: "photoGcn",
                type: "string",
                val: jsDetailData.photoGcn,
                objectDefault: null,
            };
            if (useDiy.val == "2") {
                reasonNotUseDiy.val = $(_this.reasonNotUseDiy).val();
            }
            $.merge(items.fields, [
                sourceId,
                useDiy,
                photo,
                photoGcn,
                reasonNotUseDiy,
            ]);
        });

        _this.data.statusId = dataSkip.statusId;
        _this.data.reasonContent = dataSkip.reasonContent;
        _this.data.contractFrom = dataSkip.contractFrom;
        _this.data.contractTo = dataSkip.contractTo;

        if (!isVal(_this.data.owner.phones)) {
            _this.data.owner.phones = [];
        }
        if (isVal(owner)) {
            _this.data.owner.phones = owner.phones;
            _this.data.owner.noteForPhone = owner.noteForPhone;
            _this.data.owner.phone = owner.phone;
        }
        if (_this.data.crawlerStatus != 3) {
            _this.data.agent = null;
        } else {
            if (
                !isVal(_this.data.owner.name) &&
                !isVal(_this.data.owner.email) &&
                !isVal(_this.data.owner.phone)
            ) {
                _this.data.owner = null;
            }
        }
        _this.data.virtualTouring = {
            id: null,
            url: $("#virtualTouring").val().trim(),
        };
        if (parseInt(jsDetailData.oldVirtualTouring?.id, 10) > 0) {
            _this.data.virtualTouring = {
                ...jsDetailData.oldVirtualTouring,
                url: $("#virtualTouring").val().trim(),
            };
        }
        if (callback) callback(_this.data);
    }

    _this.loadDataPost = function () {
        loadDataPost();
    };

    function validate(data, types = []) {
        var errs = com.validate(data, types, function (options) {
            var crawlerStatus = parseInt($("#statusId").val());
            var sourceId = parseInt($("#sourceId").val());
            if (crawlerStatus != 3 && isVal(data.ownerId) && sourceId != 171) {
                $.merge(options, [
                    {
                        id: "useDiy",
                        val: data.useDiy,
                        name: "Diy",
                        noShowMess: true,
                    },
                ]);
            }
        });

        if (isVal(data.owner) && isVal(data.owner.email)) {
            if (!isEmail(data.owner.email)) {
                errs.isErr = true;
                $.merge(errs.ids, ["email"]);
                $("#email").validateInputData({
                    nameFull: "Email không hợp lệ, chứa ký tự đặc biệt",
                });
            }
        }
        if (isVal(data.owner) && isVal(data.owner.phone)) {
            if (data.owner.phone.slice(0, 1) != "0") {
                errs.isErr = true;
                $.merge(errs.ids, ["phone"]);
                $("#phone").validateInputData({
                    nameFull: "Số điện thoại không hợp lệ",
                });
            }
        }
        return errs;
    }

    function bindEvents() {
        $("body")
            .off("change", _this.districts)
            .on("change", _this.districts, function (e) {
                var districtId = $(this).val();
                loadWard(districtId, true);
                Window.jsDetailData.districtId = districtId;
                const checkByFormId = getCheckForm();
                const { buildingBlock } = checkByFormId.building;
                if (buildingBlock) {
                    loadBuildingId();
                }
            });
        $("body")
            .off("change", _this.wards)
            .on("change", _this.wards, function (e) {
                var wardId = $(this).val();
                loadStreet(wardId, true);
            });
        $("body")
            .off("change", _this.streets)
            .on("change", _this.streets, function (e) {
                updateRoadFrontageWidth();
            });
        $("body")
            .off("click", "#check-duplicated-btn")
            .on("click", "#check-duplicated-btn", function (e) {
                e.preventDefault();
                checkExistedAddress();
            });
        $("body")
            .off("click", "#btn-check-duplicated-phone")
            .on("click", "#btn-check-duplicated-phone", function (e) {
                e.preventDefault();
                checkExistedOwner(true);
            });
        $("body")
            .off("click", "#check-duplicated-email-btn")
            .on("click", "#check-duplicated-email-btn", function (e) {
                e.preventDefault();
                checkExistedOwner(false);
            });

        $("body")
            .off("change", _this.position)
            .on("change", _this.position, function (e) {
                $("#display-front").hide();
                $("#display-alley").hide();
                if ($(_this.position).val() == "1") {
                    $("#display-front").show();
                } else {
                    $("#display-alley").show();
                }
            });

        $("body")
            .off("click", _this.pushOwnerBtn)
            .on("click", _this.pushOwnerBtn, async function (e) {
                e.preventDefault();
                const response = await pushToOwnerList(_this.id)

                showPropzyAlert(
                    response.message,
                    "Thông Báo",
                    function (e) {
                        Window.jsDetailData.pushedToOwnerList = true

                        _this.templateIsSentApp()
                    }
                );
            });
        $("body")
            .off("click", "#unlock-btn")
            .on("click", "#unlock-btn", function (e) {
                e.preventDefault();
                getLockUnlock(_this.id);
            });

        $("body")
            .off("click", "#resend-btn")
            .on("click", "#resend-btn", function (e) {
                e.preventDefault();
                getResendAccount(_this.id);
            });

        $("body")
            .off("click", "#moveInDateCheck")
            .on("click", "#moveInDateCheck", function (e) {
                if ($(this).is(":checked")) {
                    $("#moveInDatePicker").attr("disabled", "disabled");
                    $("#display-moveInDate")
                        .attr("readonly", true)
                        .datepicker("destroy");
                } else {
                    $("#moveInDatePicker").removeAttr("disabled");
                    $("#display-moveInDate")
                        .attr("readonly", false)
                        .datepicker();
                }
            });

        $("body")
            .off("change", _this.useRightTypeId)
            .on("change", _this.useRightTypeId, function (e) {
                if ($.inArray($(this).val(), ["1", "2"]) > -1) {
                    $("#display-privacy").show();
                } else {
                    $("#display-privacy").hide();
                }
            });

        $("body")
            .off("change", _this.statusQuoId)
            .on("change", _this.statusQuoId, function (e) {
                if ($.inArray($(this).val(), ["163"]) > -1) {
                    $("#display-statusQuo").show();
                } else {
                    $("#display-statusQuo").hide();
                }
            });

        $("body")
            .off("change", "#notUseDiyCheck")
            .on("change", "#notUseDiyCheck", function (e) {
                var data = $.trim($(this).val());
                if ($(this).is(":checked")) {
                    $(".display-not-use-diy").show();

                    // set data diy checkbox if checked
                    Window.jsDetailData.useDiy = 2
                } else {
                    $(".display-not-use-diy").hide();

                    // set data diy checkbox if uncheck
                    Window.jsDetailData.useDiy = ""
                }
            });
        $(_this.address).geocomplete({
            details: ".geo-details",
            detailsAttribute: "data-geo",
        });
        $("#seeonmap").on("click", function () {
            var lat = $.trim($("#latitude").val());
            var lng = $.trim($("#longitude").val());
            var link = "https://www.google.com/maps/?q=" + lat + "," + lng;
            window.open(link);
            return false;
        });
        $("body").on("change", "select", function (e) {
            com.showReuire();
        });
        $("body").on("change", "select, input, textarea", function (e) {
            /*removeValidate($(this).attr('id'))
            if (_this.check_require == 1) {

            } else
*/
            if (_this.check_require == 1) {
                loadDataPost(function (postData) {
                    var err = validate(postData);
                    var hasClass = $(".form-input-danger").hasClass(
                        "pos-feild-err-is-negative"
                    );
                    removeValidateNull(err.options);
                    var errs = validate(postData, [
                        "statusId",
                        "listingTypeId",
                        "realEstateGroupId",
                        "propertyTypeId",
                        "sourceId",
                        "name",
                        "name-agent",
                        "email",
                    ]);
                });
            } else if (_this.check_require == 2) {
                loadDataPost(function (postData) {
                    var errs = validate(postData);
                });
            }
        });
        $("body").on("change", "#infoChannel", function (e) {
            loadInfoChannelChild();
        });

        $("body").on("click", ".convert", function (e) {
            var dataSend = {
                x: $("#x-latitude").val(),
                y: $("#y-longitude").val(),
            };
            if (dataSend.y.length == 0 || dataSend.x.length == 0) {
                alert("Dữ liệu không được để trống");
                return false;
            }
            return $.ajax({
                url: POS_APIS_COMMON.get("GET_CONVERT_COORDINATE"),
                type: "POST",
                data: JSON.stringify(dataSend),
                success: function (response) {
                    if (response.result && response.data.length != 0) {
                        $("#latitude").val(response.data[1]);
                        $("#longitude").val(response.data[0]);
                    } else {
                        alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu");
                    }
                },
                error: function (error) {
                    alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu");
                },
            });
        });
        $("body")
            .off("change", "#mortgaged")
            .on("change", "#mortgaged", function (e) {
                if ($(this).is(":checked")) {
                    $("#bankId").attr("disabled", false);
                } else {
                    $("#bankId").attr("disabled", true);
                }
            });
        $(document).on("change", "#campaignChecked", function () {
            const checked = $(this).is(":checked");
            if (checked) {
                $("#campaignId").prop("disabled", true);
            } else {
                $("#campaignId").prop("disabled", false);
            }
        });
        $(document).on("change", "#projectId", function () {
            const data = $(this).select2("data")[0];
            if (data.address) {
                $("#address").val(data.address);
            }
            if (data.latitude) {
                $("#latitude").val(data.latitude);
            }
            if (data.address) {
                $("#longitude").val(data.longitude);
            }
        });
        $(document).on("change", "#districtId", function () {
            loadProjectLand();
        });
    }

    _this.validateAgentPhone = function () {
        var hasErr = false;
        var crawlerStatus = _this.data;
        if (crawlerStatus == 3 && !isVal(_this.data.agent.info.phone)) {
            hasErr = true;
        }
        return hasErr;
    };

    function updateRoadFrontageWidth() {
        var roadFrontageWidth = null;
        if (parseInt($(_this.position).val()) == 1) {
            roadFrontageWidth = $(_this.streets)
                .find("option:selected")
                .data("width-value");
        }
        $(_this.roadFrontageWidth).val(roadFrontageWidth);
        if (hasValue(_this.data.position)) {
            _this.data.position.roadFrontageWidth = roadFrontageWidth;
        }
    }
    function loadApi() {
        com.loadSourceApi({
            callback: function (response) {
                var optionList = [
                    {
                        value: "",
                        text: "-- Vui Lòng Chọn --",
                    },
                ];
                if (response.result) {
                    const sources = response.data.filter(
                        (type) => type.type === 1
                    )[0];
                    const soucesFilter = sources.list.filter(
                        (src) => [2, 5, 7, 9].indexOf(src.id) == -1
                    );

                    const soucesLast = soucesFilter.map((src) => {
                        if (src.childs.length > 0) {
                            sourceParentIdHasChild.add(src.id);
                        }
                        return {
                            value: src.id,
                            text: src.name,
                        };
                    });
                    sourceParentIdHasChild.add(177);
                    optionList = optionList.concat(soucesLast);
                }
                return optionList;
            },
            callBackFinish: function () {
                $("#sourceId")
                    .val(Window.jsDetailData.sourceId)
                    .select2()
                    .trigger("change");
            },
            onChange: function () {
                loadUseDiy();
                loadTc();
            },
        });
        com.loadCrawlerStatus({
            callBackFinish: function (response) {
                $("#statusId")
                    .val(Window.jsDetailData.crawlerStatus)
                    .select2()
                    .trigger("change");
            },
            onChange: function () {
                var crawlerStatus = parseInt($("#statusId").val());
                loadOwnerOption(crawlerStatus);
                loadUseDiy();
            },
        });
        com.loadListingType({
            callBackFinish: function (response) {
                return $("#listingTypeId")
                    .val(Window.jsDetailData.listingTypeId)
                    .select2()
                    .trigger("change");
            },
            onChange: function () {
                let listingTypeId = $("#listingTypeId").val();
                $("#realEstateGroupId").attr('disabled', false);
                if(listingTypeId){
                    $("#realEstateGroupId").select2().trigger("change");
                }else {
                    $("#realEstateGroupId").val('').select2().trigger("change");
                    $("#realEstateGroupId").attr('disabled', true);
                }
                return; //END ACTION
            },
        });
        com.loadRealEstateGroup({
            callBackFinish: function (response) {
                $("#realEstateGroupId").val(Window.jsDetailData.realEstateGroupId ? Window.jsDetailData.realEstateGroupId : 1)
                                       .select2()
                                       .trigger("change");
            },
            onChange: function() {
                let realEstateGroupId = parseInt($("#realEstateGroupId").val());
                let listingTypeId = parseInt($("#listingTypeId").val());
                $("#propertyTypeId").attr('disabled', false);
                if(realEstateGroupId && listingTypeId) {
                    listingTypeOption(realEstateGroupId, listingTypeId);
                }else {
                    $("#propertyTypeId").val('').select2().trigger("change");
                    $("#propertyTypeId").attr('disabled', true);
                }
                return; //END ACTION
            }
        })
        //
        loadmockSurnameId();
        loadInfoChannel();
        loadInfoChannelChild();
        bankInfo();
    }

    function listingTypeOption(realEstateGroupId, listingTypeId) {
        com.loadPropertyType({
            callBackFinish: function (response) {
                if (!isVal(Window.jsDetailData.propertyTypeId)) {
                    propertyTypeOption(Window.jsDetailData.propertyTypeId);
                }
                var listingTypeId = parseInt($("#listingTypeId").val());
                var realEstateGroupId = parseInt($("#realEstateGroupId").val());
                if (listingTypeId == Window.jsDetailData.listingTypeId && realEstateGroupId == Window.jsDetailData.realEstateGroupId) {
                    $("#propertyTypeId")
                        .val(String(Window.jsDetailData.propertyTypeId))
                        .select2()
                        .trigger("change");
                } else {
                    $("#propertyTypeId").select2();
                }
            },
            onChange: function () {
                const checkByFormId = getCheckForm();
                propertyTypeOption(checkByFormId);
            },
        });
        if (hasValue(listingTypeId)) {
            if (listingTypeId == 1) {
                $("#display-deposit").hide();
                $(_this.useRightTypeId).removeAttr("disabled");
                $("#mortgaged").prop("disabled", false);
                $(".privacy").removeAttr("disabled");
                $("#display-legalPapers").show();
            } else if (listingTypeId == 2) {
                $("#display-deposit").show();
                $(_this.useRightTypeId).attr("disabled", "disabled");
                $("#mortgaged").prop("disabled", true);
                $("#mortgaged").prop("checked", false);
                $(".privacy").attr("disabled", "disabled");
                $("#display-legalPapers").hide();
            } else {
                $("#display-deposit").hide();
            }
            $("#mortgaged").trigger("change");
        }
    }
    function propertyTypeOption(checkByFormId) {
        $("#display-floor").hide();
        $("#display-basic-position").hide();
        $("#display-front").hide();
        $("#display-alley").hide();
        $("#blc-building").hide();
        let { display, buildingBlock, modelCode} = checkByFormId.building;
        if (display) {
            $("#blc-building").show();
            loadBuildingId();
        }

        if(buildingBlock){
            $("#display-buildingBlock").show();
        }else {
            $("#display-buildingBlock").hide();
        }
        
        if(modelCode){
            $("#display-modelCode").show();
            $("#modelCode").val(
                Window.jsDetailData.modelCode ? Window.jsDetailData.modelCode : ""
            );
        }else {
            $("#display-modelCode").hide();
        }

        const displayFloor = checkByFormId ? checkByFormId.floor : false;
        if (displayFloor) {
            $("#display-floor").show();
            // clear data position for case update listingType from nhà riêng to chung cư
            clearDataPosition();
        }

        const displayHouseNumber = checkByFormId ? checkByFormId.houseNumber : false;
        if (displayHouseNumber) {
            $("#display-houseNumber").show();
        } else {
            $("#display-houseNumber").hide();
        }

        const displayPosition = checkByFormId ? checkByFormId.position : false;
        if(displayPosition){
            $("#display-basic-position").show();
            loadPosition();
        } 

        const displayStruct = checkByFormId ? checkByFormId.struct : false;
        if (displayStruct) {
            $(".display-struct").show();
        } else {
            $(".display-struct").hide();
        }

        $("#display-statusQuoId").show();

        loadProjectLand();
        loadNumberFloors();

        //LandCode
        const displayLandCode = checkByFormId ? checkByFormId.landCode : false;
        if (displayLandCode) {
            $('#display-landCode').show();
        } else {
            $('#display-landCode').hide();
        }

        //MapCode
        const displayMapCode = checkByFormId ? checkByFormId.mapCode : false;
        if (displayMapCode) {
            $('#display-mapCode').show();
        } else {
            $('#display-mapCode').hide();
        }

        //LotSize
        const displayLotSize = checkByFormId ? checkByFormId.lotSize : false;
        if (displayLotSize) {
            $('#display-lotSize').show();
        } else {
            $('#display-lotSize').hide();
        }

        //FloorSize
        const displayFloorSize = checkByFormId ? checkByFormId.floorSize : false;
        if (displayFloorSize) {
            $('#display-floorSize').show();
        } else {
            $('#display-floorSize').hide();
        }

        //SizeLength
        const displaySizeLength = checkByFormId ? checkByFormId.sizeLength : false;
        if (displaySizeLength) {
            $('#display-sizeLength').show();
        } else {
            $('#display-sizeLength').hide();
        }

        //SizeWidth
        const displaySizeWidth = checkByFormId ? checkByFormId.sizeWidth : false;
        if (displaySizeWidth) {
            $('#display-sizeWidth').show();
        } else {
            $('#display-sizeWidth').hide();
        }

        //BedRooms
        const displaybedRooms = checkByFormId ? checkByFormId.bedRooms : false;
        if (displaybedRooms) {
            $('#display-bedRooms').show();
        } else {
            $('#display-bedRooms').hide();
        }

        //BathRooms
        const displayBathRooms = checkByFormId ? checkByFormId.bathRooms : false;
        if (displayBathRooms) {
            $('#display-bathRooms').show();
        } else {
            $('#display-bathRooms').hide();
        }
        //Year Built
        const displayYearBuilt = checkByFormId ? checkByFormId.yearBuilt : false;
        if (displayYearBuilt) {
            $('#display-yearBuilt').show();
        } else {
            $('#display-yearBuilt').hide();
        }
        //Year Fixed
        const displayYearFixed = checkByFormId ? checkByFormId.yearFixed : false;
        if (displayYearFixed) {
            $('#display-yearFixed').show();
        } else {
            $('#display-yearFixed').hide();
        }
        //Postion blocks - Handling when basic-position or floor not visible
        if(!displayPosition && !displayFloor) {
            $("#display-position").hide();
        }else {
            $("#display-position").show();
        }
        //Reload require field
        com.showReuire();
        return; //END ACTION;
    }

    function getCheckForm(){
       let id = parseInt($("#propertyTypeId").find(":selected").data("formid"));
       let findId = !isNaN(id) ? id : 0; // Form default
       return ListForm.filter(f => f.id == findId).slice()[0];
    }

    function clearDataPosition() {
        if (Window.jsDetailData.position) {
            // hẻm
            Window.jsDetailData.position.alleyId = null;
            Window.jsDetailData.position.alleyType = null;
            Window.jsDetailData.position.alleyWidth = null;
            Window.jsDetailData.position.position = null;

            // mặt tiền
            Window.jsDetailData.position.roadFrontageWidth = null;
            Window.jsDetailData.position.widthFrontWay = null;
        }
    }

    function loadLink() {
        var link = Window.jsDetailData.crawlerLink;
        $(_this.link).text(link).attr({ href: link, target: "_blank" });
    }

    function loadNumberFloors() {
        var data = Window.jsDetailData.numberFloor;
        $("#numberFloor").val(data);
        const checkByFormId = getCheckForm();
        const numberFloorSetting = checkByFormId.numberFloor;
        const { display, isBuildingFloor } = numberFloorSetting;
        if(!display){
            $('#display-numberfloor').hide();
            return; // END ACTION
        }
        var buildingId = $('#buildingId').find('option:selected').val();
        if (!isBuildingFloor) {
            $(".label-numberFloor").text("Số lầu");
            $("#numberFloor").prop("disabled", false);
        } else {
            var buildingId = $("#buildingId").find("option:selected").val();
            $("#numberFloor").prop("disabled", true);
            $(".label-numberFloor").text("Số tầng của tòa nhà");
            if (isVal(buildingId)) {
                var block = $("#blockId")
                    .find("option:selected")
                    .data("numberfloor");
                if (isVal(block)) {
                    $("#numberFloor").val(block);
                } else {
                    var building = $("#buildingId")
                        .find("option:selected")
                        .data("numberfloor");
                    $("#numberFloor").val(building);
                }
            }else {
                $("#numberFloor").val('');
            }
        }
    }

    function loadFloors() {
        var data = Window.jsDetailData.floor;
        $(_this.floor).val(data);
    }

    function loadBathRooms() {
        var data = Window.jsDetailData.bathRooms;
        $(_this.bathRooms).val(data);
    }

    function loadBedRooms() {
        var data = Window.jsDetailData.bedRooms;
        $(_this.bedRooms).val(data);
    }

    function loadLotSize() {
        var data = Window.jsDetailData.lotSize;
        $(_this.lotSize).val(data);
    }

    function loadFloorSize() {
        var data = Window.jsDetailData.floorSize;
        $(_this.floorSize).val(data);
    }

    function loadSizeLength() {
        var data = Window.jsDetailData.sizeLength;
        $(_this.sizeLength).val(data);
    }

    function loadSizeWidth() {
        var data = Window.jsDetailData.sizeWidth;
        $(_this.sizeWidth).val(data);
    }

    function loadIsMezzanine() {
        var data = Window.jsDetailData.isMezzanine;
        $(_this.isMezzanine).attr("checked", data).val(data);
    }

    function loadIsRooftop() {
        var data = Window.jsDetailData.isRooftop;
        $(_this.isRooftop).attr("checked", data).val(data);
    }

    function loadFacility() {
        var data = Window.jsDetailData.facility.numberBasement;
        data ? (data = true) : (data = false);
        $(_this.isBasement).attr("checked", data).val(data);
    }

    function loadIsAttic() {
        var data = Window.jsDetailData.isAttic;
        $(_this.isAttic).attr("checked", data).val(data);
    }

    function loadIsPenhouse() {
        var data = Window.jsDetailData.isPenhouse;
        $(_this.isPenhouse).attr("checked", data).val(data);
    }

    function loadHouseNumber() {
        var houseNumber = Window.jsDetailData.houseNumber;
        $(_this.houseNumber).val(houseNumber);
    }

    function loadDistrict(cityId, isSelect) {
        Listing.getDistrictList(cityId).done(function (response) {
            var data = Window.jsDetailData.districtId;
            var html = '<option value="">--Chọn Quận--</option>';
            $.each(response.data, function (i, data) {
                html +=
                    '<option value="' +
                    data.districtId +
                    '">' +
                    data.districtName +
                    "</option>";
            });

            $(_this.districts).html("").append(html);

            if (!isSelect) {
                $(_this.districts).val(data);
            } else {
                $(_this.districts).val("");
                $(_this.districts).trigger("change");
            }
            $(_this.districts).select2();
        });
    }

    function loadWard(districtId, isSelect) {
        if (!hasValue(districtId)) {
            var html = '<option value="">--Chọn Phường--</option>';
            $(_this.wards).html("").append(html);
            $(_this.wards).val("");
            $(_this.wards).select2();
            return false;
        }

        Listing.getWardList(districtId).done(function (response) {
            var data = Window.jsDetailData.wardId;
            var html = '<option value="">--Chọn Phường--</option>';
            $.each(response.data, function (i, data) {
                html +=
                    '<option value="' +
                    data.wardId +
                    '">' +
                    data.wardName +
                    "</option>";
            });

            $(_this.wards).html("").append(html);

            if (!isSelect) {
                $(_this.wards).val(data);
            } else {
                $(_this.wards).val("");
                $(_this.wards).trigger("change");
            }
            $(_this.wards).select2();
        });
    }

    function loadStreet(wardId, isSelect) {
        if (!hasValue(wardId)) {
            var html = '<option value="">--Chọn Đường--</option>';
            $(_this.streets).html("").append(html);
            $(_this.streets).val("");
            $(_this.streets).select2();
            return false;
        }
        Listing.getStreetList(wardId).done(function (response) {
            var streetId = Window.jsDetailData.streetId;
            var widthValue = null;
            var html = '<option value="">--Chọn Đường--</option>';
            $.each(response.data, function (i, data) {
                html +=
                    '<option value="' +
                    data.streetId +
                    '" data-width-value="' +
                    data.widthValue +
                    '">' +
                    data.streetName +
                    "</option>";
            });

            $(_this.streets).html("").append(html);

            if (!isSelect) {
                $(_this.streets).val(streetId);
            } else {
                $(_this.streets).val("");
            }
            $(_this.streets).select2();
            //updateRoadFrontageWidth();

            if (!isSelect) {
                loadRoadFrontageWidth();
            }
        });
    }

    function loadAddress() {
        var data = Window.jsDetailData.address;
        var oldAddress = Window.jsDetailData.oldAddress;
        var latitude = Window.jsDetailData.latitude;
        var longitude = Window.jsDetailData.longitude;

        $(_this.address).val(data);
        $(_this.oldAddress).val(oldAddress);
        $(_this.latitude).val(latitude);
        $(_this.longitude).val(longitude);
        $("#x-latitude").val(Window.jsDetailData.xCoordinate);
        $("#y-longitude").val(Window.jsDetailData.yCoordinate);
    }

    function loadVirtualTouring() {
        var viewMore = $("button#virtual-touring-preview");
        Window.jsDetailData.virtualTouringChecked = false;
        Window.JS_VIRTUAL_VALIDATE.isChecked = false;
        if (Window.jsDetailData.virtualTouring) {
            Window.jsDetailData.oldVirtualTouring =
                Window.jsDetailData.virtualTouring;
            if (Window.jsDetailData.virtualTouring.url.length > 0) {
                Window.jsDetailData.virtualTouring =
                    Window.jsDetailData.oldVirtualTouring.url;
                $("#virtualTouring").val(
                    Window.jsDetailData.virtualTouring || ""
                );
                if ($("#virtualTouring").val().trim().length === 0) {
                    viewMore.attr("disabled", true);
                    viewMore.removeClass("btn-primary").addClass("disabled");
                    return;
                }
                viewMore.attr("disabled", false);
                viewMore.removeClass("disabled").addClass("btn-primary");
                Window.jsDetailData.virtualTouringChecked = true;
                Window.JS_VIRTUAL_VALIDATE.isChecked = true;
                return;
            }
        }
        Window.jsDetailData.virtualTouring = null;
        $("#virtualTouring").val(Window.jsDetailData.virtualTouring || "");
        if ($("#virtualTouring").val().trim().length === 0) {
            viewMore.attr("disabled", true);
            viewMore.removeClass("btn-primary").addClass("disabled");
            Window.jsDetailData.virtualTouringChecked = true;
            Window.JS_VIRTUAL_VALIDATE.isChecked = true;
            return;
        }
        viewMore.attr("disabled", false);
        viewMore.removeClass("disabled").addClass("btn-primary");
        return;
    }

    function loadBuildingId() {
        com.loadBuilding({
            callBackFinish: function (response) {
                $("#buildingId")
                    .val(String(Window.jsDetailData.buildingId))
                    .select2();
                //var propertyTypeId = parseInt($('#propertyTypeId').val());
                var data = $("#buildingId").find("option:selected");
                if (!isVal(data.val())) {
                    $("#buildingId").val("").select2();
                }
                $("#buildingId").trigger("change");
            },
            onChange: function () {
                var data = $("#buildingId").find("option:selected");

                const val = hasValue(data.val()) ? parseInt(data.val()) : null;
                if (val == Window.jsDetailData.buildingId) {
                    loadAddress();
                } else {
                    $(_this.address).val(data.data("address"));
                    $(_this.longitude).val(data.data("long"));
                    $(_this.latitude).val(data.data("lat"));
                }
                loadProjectLand();
                loadBlockId();
            },
        });
    }

    function loadBlockId(buildingId) {
        com.loadBlockBuilding({
            callBackFinish: function (response) {
                $("#blockId")
                    .val(String(Window.jsDetailData.blockId))
                    .select2()
                    .trigger("change");
                var data = $("#blockId").find("option:selected");
                if (!isVal(data.val())) {
                    $("#blockId").val("").select2();
                }
            },
            onChange: function () {
                loadNumberFloors();
            },
        });
    }
    async function loadProjectLand() {
        _this.loadDataPost();
        const checkByFormId = getCheckForm();
        let blockProjectLand = $('#blc-project-land');
        let selectProject = $("#projectId");
        let { project } = checkByFormId;
        let canDisplay = project.display;
        let canEdit = project.edit;
        if (!canDisplay) {
            blockProjectLand.hide();
            return; //END ACTION
        }
        blockProjectLand.show();
        let response = await axios.post(PROJECT_API.get('GET_LIST_BY_DISTRICT'), {
            districtId: $('#districtId').val(),
            cityId: $('#cityId').val()
        }).catch((err) => {
            showErrLog(err);
        });
        let resultsContent = response.data;
        let data = [
            {
                id: "",
                text: "Chọn dự án",
                address: '',
                longitude: '',
                latitude: ''
            }
        ];
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
        selectProject.html("").select2();
        selectProject.select2({
            data: data,
        });

        selectProject.attr('disabled', true); //VIEW ONLY
        if (canEdit) {
            selectProject.attr('disabled', false);
        }
        const buildingSettings = checkByFormId.building;
        const displayBuildingBlock = buildingSettings.buildingBlock
        if(displayBuildingBlock){
            let buildingData = $("#buildingId").find("option:selected");
            let projectId = buildingData.data("projectid");
            if(hasValue(projectId)){
                selectProject.val(projectId).trigger('change');
            }
        } else if(Window.jsDetailData.projectId) {
            if($(`#projectId option[value=${Window.jsDetailData.projectId}]`).length == 0){
                selectProject.val('').trigger('change');
            }else {
                selectProject.val(Window.jsDetailData.projectId).trigger('change');
            }
        }
    }

    function loadPosition(isSelect) {
        var options = "";
        var divSelect = { 1: "Mặt Tiền", 2: "Hẻm" };
        var data = Window.jsDetailData.position;
        for (var key in divSelect) {
            var addOption =
                '<option value="' + key + '">' + divSelect[key] + "</option>";

            if (data != null && data.position == key) {
                addOption =
                    '<option value="' +
                    key +
                    '" selected>' +
                    divSelect[key] +
                    "</option>";
            }
            options += addOption;
        }

        if (!isSelect & (data != null)) {
            $(_this.position).val(data.position);
        } else {
            $(_this.position).val("");
        }
        $(_this.position).select2();
        $(_this.position).html(options).trigger("change");
    }

    function loadAlleyId(isSelect) {
        var options = '<option value="">---Chọn---</option>';

        // var divSelect = {8: 'Xe ba gác', 9: 'Xe ô tô', 10: 'Xe tải'};
        var divSelect = {};
        axios.get("/common/get-alley-type", {}).then((xhr) => {
            const response = xhr.data;
            if (response.result) {
                response.data.forEach((item) => {
                    divSelect[item.alleyId.toString()] = item.alleyName;
                });
            }
            var data = Window.jsDetailData.position;
            for (var key in divSelect) {
                var addOption =
                    '<option value="' +
                    key +
                    '">' +
                    divSelect[key] +
                    "</option>";

                if (data != null && data.alleyId == key) {
                    addOption =
                        '<option value="' +
                        key +
                        '" selected>' +
                        divSelect[key] +
                        "</option>";
                }
                options += addOption;
            }

            if (!isSelect && data != null) {
                $(_this.alleyId).val(data.alleyId);
            } else {
                $(_this.alleyId).val("");
            }
            $(_this.alleyId).html(options);
            $(_this.alleyId).select2();
        });
    }

    function loadRoadFrontageDistance() {
        var options = "";
        var divSelect = {
            0: "<= 100m",
            100: "100m-200m",
            200: "200m-500m",
            500: "> 500m",
        };
        var dataFrom = Window.jsDetailData.roadFrontageDistanceFrom;
        var dataTo = Window.jsDetailData.roadFrontageDistanceTo;
        for (var key in divSelect) {
            var addOption =
                '<option value="' + key + '">' + divSelect[key] + "</option>";

            if (dataFrom == key) {
                addOption =
                    '<option value="' +
                    key +
                    '" selected>' +
                    divSelect[key] +
                    "</option>";
            }
            options += addOption;
        }
        $("#roadFrontageDistance").html(options);
        $("#roadFrontageDistance").select2();
    }

    function loadAlleyType() {
        var data = Window.jsDetailData.position;
        if (data != null && data.alleyType != null) {
            if (data.alleyType == 1) {
                $("#alleyType1").attr("checked", true);
            } else if (data.alleyType == 2) {
                $("#alleyType2").attr("checked", true);
            }
        }
    }

    function loadAlleyWidth() {
        var data = Window.jsDetailData.position;
        if (data != null && data.alleyWidth != null) {
            $(_this.alleyWidth).val(data.alleyWidth);
        }
    }

    function loadOwnerOption(crawlerStatus) {
        loadOwner();
        // agent
        if (crawlerStatus == 3) {
            $(".display-agent").show();

            if (isVal(Window.jsDetailData.agent)) {
                $("#name-agent").select2({
                    data: [
                        {
                            id: Window.jsDetailData.agent.info.agentId,
                            text:
                                Window.jsDetailData.agent.info.name +
                                " - " +
                                (Window.jsDetailData.agent.info
                                    .contractStatus == 17
                                    ? "Đã ký HĐ"
                                    : "Chưa ký HĐ"),
                            phone: Window.jsDetailData.agent.info.phone,
                            email: Window.jsDetailData.agent.info.email,
                            socialuid: Window.jsDetailData.agent.info.socialUid,
                        },
                    ],
                });
                loadAgent();
                $("#email-agent").val(Window.jsDetailData.agent.info.email);
                $("#phone-agent").val(Window.jsDetailData.agent.info.phone);
                $("#socialUid-agent").val(
                    Window.jsDetailData.agent.info.socialUid
                );
            }
            $("#name-agent").select2({
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
                            q: hasValue(params.term) ? params.term : null,
                        };
                        return queryParameters;
                    },
                    processResults: function (response) {
                        var optionList = [];
                        if (response.result) {
                            $.each(response.data, function (id, item) {
                                optionList.push({
                                    id: item.agentId,
                                    text:
                                        item.name +
                                        "    - " +
                                        item.phone +
                                        " - " +
                                        (item.contractStatus == 17
                                            ? "Đã ký HĐ"
                                            : "Chưa ký HĐ"),
                                    phone: item.phone,
                                    email: item.email,
                                    nameAgent: item.name,
                                    socialuid: item.socialUid,
                                });
                            });
                        }
                        return {
                            results: optionList,
                        };
                    },
                    transport: function (params, success, failure) {
                        var name = params.data.q;
                        if (hasValue(name)) {
                            if (
                                name.substr(-1) == " " ||
                                name.split(" ").length > 1
                            ) {
                                name = name.trim();
                            }
                        } else {
                            name = null;
                        }
                        var $request = com.getAgent({ keywords: name });
                        $request.then(success);
                        $request.fail(failure);
                        return $request;
                    },
                },
            });
            $("#name-agent").on("change", function (e) {
                loadAgent();
            });
            if (isVal(Window.jsDetailData.owner)) {
                $("#phone").attr("disabled", true);
                $("#name").attr("disabled", true);
                $("#email").attr("disabled", true);
            } else {
                $("#phone").attr("disabled", false);
                $("#name").attr("disabled", false);
                $("#email").attr("disabled", false);
            }
        } else {
            $("#name").attr("disabled", false);
            $("#email").attr("disabled", false);
            $(".display-agent").hide();
        }
    }

    function loadOwner() {
        var nameOwner = isVal(Window.jsDetailData.owner)
            ? Window.jsDetailData.owner.name
            : "";
        var emailOwner = isVal(Window.jsDetailData.owner)
            ? Window.jsDetailData.owner.email
            : "";
        var phoneOwner = isVal(Window.jsDetailData.owner)
            ? Window.jsDetailData.owner.phone
            : "";
        $("#name").val(nameOwner);
        $("#email").val(emailOwner);
        $("#phone").val(phoneOwner);
    }

    function loadAgent() {
        $("#email-agent").val("");
        $("#phone-agent").val("");
        $("#socialUid-agent").val("");
        var email = $("#name-agent").select2("data")[0].email;
        var phone = $("#name-agent").select2("data")[0].phone;
        var socialuid = $("#name-agent").select2("data")[0].socialuid;
        $("#email-agent").val(email);
        $("#phone-agent").val(phone);
        $("#socialUid-agent").val(socialuid);
        loadDataPost();
    }

    function loadStatusQuoId() {
        $("#display-statusQuo").hide();
        var data = Window.jsDetailData.statusQuoId;
        Listing.getChannelTypes().done(function (response) {
            if (response.result) {
                $.each(response.data, function (id, type) {
                    if (type.type == 13) {
                        var option = '<option value="">---Chọn---</option>';
                        $.each(type.list, function (key, item) {
                            var addOption =
                                '<option value="' +
                                item.id +
                                '">' +
                                item.name +
                                "</option>";
                            if (item.id == data) {
                                addOption =
                                    '<option value="' +
                                    item.id +
                                    '" selected>' +
                                    item.name +
                                    "</option>";
                            }
                            if (data == 163) {
                                $("#display-statusQuo").show();
                            }
                            option += addOption;
                        });
                        $(_this.statusQuoId).html(option);
                        $(_this.statusQuoId).select2();
                        return false;
                    }
                });
            }
        });
    }

    function loadPriceForStatusQuo() {
        var data = Window.jsDetailData.priceForStatusQuo;
        $(_this.priceForStatusQuo).autoNumeric("set", data);
    }

    function loadYearFixed() {
        var data = Window.jsDetailData.yearFixed;
        $(_this.yearFixed).val(data);
    }

    function loadYearBuilt() {
        var data = Window.jsDetailData.yearBuilt;
        $(_this.yearBuilt).val(data);
    }

    function loadPrice() {
        var data = Window.jsDetailData.price;
        $(_this.price).autoNumeric("set", data);
    }

    function loadCurrency() {
        var data = Window.jsDetailData.currency;
        $(_this.currency).val(data);
    }

    function loadMinPrice() {
        var data = Window.jsDetailData.minPrice;
        $(_this.minPrice).autoNumeric("set", data);
    }

    function loadRoadFrontageWidth() {
        var data = Window.jsDetailData.position;
        if (hasValue(data) && hasValue(data.roadFrontageWidth)) {
            $(_this.roadFrontageWidth).val(data.roadFrontageWidth);
        } else {
            updateRoadFrontageWidth();
        }
    }

    function loadTitle() {
        var data = Window.jsDetailData.title;
        if (hasValue(data)) {
            $(_this.title).val(data);
        }
    }

    function loadDescription() {
        var data = Window.jsDetailData.description;
        if (hasValue(data)) {
            $(_this.description).val(data);
        }
    }

    function loadNoteCrawler() {
        var note = Window.jsDetailData.crawlerNote;
        $(_this.noteData).val(note);
    }

    function loadNoteForLs() {
        var data = Window.jsDetailData.noteForLs;
        $(_this.noteForLs).val(data);
    }

    function loadBuyNewHouse() {
        var buyNewHouse = Window.jsDetailData.buyNewHouse;
        if (buyNewHouse) {
            $("#buyNewHouse1").attr("checked", true);
        } else {
            $("#buyNewHouse2").attr("checked", true);
        }
    }

    function loadSellFolding() {
        var sellFolding = Window.jsDetailData.sellFolding;
        if (sellFolding) {
            $("#sellFolding1").attr("checked", true);
        } else {
            $("#sellFolding2").attr("checked", true);
        }
    }

    function loadUseDiy() {
        const jsDetailData = Window.jsDetailData

        const data = jsDetailData.ownerAppStatus
        const ownerId = jsDetailData.ownerId
        const pushedToOwnerList = jsDetailData.pushedToOwnerList && 'disabled' || '';
        const crawlerStatus = parseInt($("#statusId").val()); 
        const sourceId = parseInt($("#sourceId").val());
        /**
         * hide diy group 
         * if crawlerStatus 3 (Môi giới)
         * if not owner
         * if sourceId 171 (PAM)
         **/
        if (crawlerStatus == 3 || !isVal(ownerId) || sourceId == 171) {
            $(".display-use-diy-group").hide();
        } else {
            $(".display-use-diy-group").show();
        }

        $('.display-unlock-btn').hide()
        $('.display-unlock-message').hide()
        $(".display-not-use-diy").hide()

        // if app sent 
        if (data.isSentApp) {
            _this.templateIsSentApp()

            return
        }

        // if app not sent 
        $(".display-use-diy-btn").show()
        $(".display-use-diy-checkbox").show()
        $(".display-use-diy-message").show()

        let useDIYBtn = '<input type="hidden" id="useDiy" value="">'
        useDIYBtn += '<button id="send-diy-btn" class="btn btn-success">'
        useDIYBtn += '<span class="glyphicon glyphicon-send" aria-hidden="true"></span> Gửi tài khoản'
        useDIYBtn += '</button>'
        $(".display-use-diy-btn").html(useDIYBtn);

        let useDIYCheckbox = '<label class="checkbox control-label">'
        useDIYCheckbox += '<input id="notUseDiyCheck" type="checkbox" value="">'
        useDIYCheckbox += '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Không dùng Propzy App/Web'
        useDIYCheckbox += '</label>'
        $(".display-use-diy-checkbox").html(useDIYCheckbox)

        let notUseDIY = '<div class="col-sm-12">'
        notUseDIY += '<label class="control-label col-xs-12 col-sm-2 col-md-2">Lý do không dùng Propzy App/Web</label>'
        notUseDIY += '<div class="col-xs-12 col-sm-10 col-md-3">'
        notUseDIY += '<input id="reasonNotUseDiy" class="form-control" type="text" value="" placeholder="Lý do không dùng Propzy App/Web">'
        notUseDIY += '</div>'
        notUseDIY += '</div>'
        $(".display-not-use-diy").html(notUseDIY);

        // toggle checkbox if has any value
        $(_this.reasonNotUseDiy).val(Window.jsDetailData.reasonNotUseDiy);
        if (Window.jsDetailData.useDiy === 2) {
            $("#notUseDiyCheck").attr("checked", true);
            $(".display-not-use-diy").show()
        }

        let useDIYMsg = '<label class="control-label">* Ghi chú: ' + data.statusFormat + '</label>'
        $(".display-use-diy-message").html(useDIYMsg);

        return
    }
    async function loadmockSurnameId() {
        let dataMap = [];
        await POS_PROMISISE_API("COMMON_GET_CHANNEL_TYPE", { type: 10 });
        if (POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST) {
            dataMap = POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST[0].list.map(
                (it) => {
                    return {
                        id: it.id,
                        text: it.name,
                    };
                }
            );
        }
        $("#mockSurnameId").html("").select2();
        let data = [{ id: "", text: "--Chọn định danh--" }];
        data = data.concat(dataMap);
        $("#mockSurnameId").select2({
            data: data,
        });
        if (isVal(Window.jsDetailData.mockSurnameId)) {
            $("#mockSurnameId")
                .val(Window.jsDetailData.mockSurnameId)
                .select2();
        }
    }

    async function loadTc() {
        $(".tc-wrapper").hide();
        const sourceId = parseInt($("#sourceId").val());
        if (sourceId == 177) {
            await POS_PROMISISE_API("GET_TC");
            if (POS_STORED_LOCAL_API.TC_LIST) {
                $("#tcId").html("").select2();
                let data = [{ id: "", text: "--Chọn trung tâm--" }];
                data = data.concat(POS_STORED_LOCAL_API.TC_LIST);
                $("#tcId").select2({
                    data: data,
                });
            }
            if (isVal(Window.jsDetailData.tcid)) {
                $("#tcId").val(Window.jsDetailData.tcid).trigger("change");
            }
            $(".tc-wrapper").show();
        }
    }
    async function loadInfoChannel() {
        await POS_PROMISISE_API("GET_INFO_CHANNEL");
        if (POS_STORED_LOCAL_API.INFO_CHANNEL_LIST) {
            $("#infoChannel").html("").select2();
            let data = [{ id: "", text: "--Chọn kênh thông tin--" }];
            data = data.concat(POS_STORED_LOCAL_API.INFO_CHANNEL_LIST);
            $("#infoChannel").select2({
                data: data,
            });
            if (isVal(Window.jsDetailData.channelTypeId)) {
                $("#infoChannel")
                    .val(Window.jsDetailData.channelTypeId)
                    .trigger("change");
            }
        }
    }
    async function loadInfoChannelChild() {
        const parentId = $.trim($("#infoChannel").val());
        let dataMap = [];
        if (parentId) {
            await POS_PROMISISE_API("GET_INFO_CHANNEL_CHILD", {
                parentId: parentId,
            });

            if (POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST) {
                dataMap = POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST;
            }
        }
        $("#infoChannelChild").html("").select2();
        let data = [{ id: "", text: "--Chọn nguồn thông tin--" }];
        data = data.concat(dataMap);
        $("#infoChannelChild").select2({
            data: data,
        });
        if (isVal(Window.jsDetailData.channelTypeChildId)) {
            $("#infoChannelChild")
                .val(Window.jsDetailData.channelTypeChildId)
                .select2();
        }
    }
    async function bankInfo() {
        axios
            .get(POS_APIS_COMMON.get("GET_BANK_LIST"), {})
            .then((xhr) => {
                const response = xhr.data;
                var optionList = [
                    {
                        id: "",
                        text: "Chọn ngân hàng",
                    },
                ];
                if (response.result) {
                    const dataMap = response.data.map((bank) => {
                        return {
                            id: bank.id,
                            text: bank.name,
                        };
                    });
                    optionList = optionList.concat(dataMap);
                }
                $("#bankId").html("");
                $("#bankId").select2({
                    data: optionList,
                });
                if (Window.jsDetailData.bankId) {
                    $("#bankId").val(Window.jsDetailData.bankId).select2();
                }
            })
            .catch((err) => {
                var optionList = [
                    {
                        id: "",
                        text: "Chọn ngân hàng",
                    },
                ];
                $("#bankId").html("");
                $("#bankId").select2({
                    data: optionList,
                });
                showErrLog(err);
            });
    }

    function loadMinContractDeadline() {
        var data = Window.jsDetailData.minContractDeadline;
        $(_this.minContractDeadline).val(data);
    }

    function loadDepositText() {
        var data = Window.jsDetailData.deposit;
        $(_this.deposit).autoNumeric("set", data);
    }

    function loadUseRightTypeId() {
        Listing.getUserRightTypes().done(function (response) {
            var data = Window.jsDetailData.useRightTypeId;
            var html = '<option value="">--Chọn--</option>';
            $.each(response.data, function (i, data) {
                html +=
                    '<option value="' +
                    data.useRightTypeId +
                    '">' +
                    data.typeName +
                    "</option>";
            });

            $(_this.useRightTypeId).html("").append(html);

            $(_this.useRightTypeId).val(data);
            $(_this.useRightTypeId).select2();

            $("#display-privacy").hide();
            if ($.inArray(data, [1, 2]) > -1) {
                $("#display-privacy").show();
            }
        });
    }

    async function pushToOwnerList($id) {
        requestLoading.initCallback(1);
        const resp = await Listing.pushToOwnerList($id)
        requestLoading.addCallbackToQueue();

        return resp
    }
    function getLockUnlock($id) {
        requestLoading.initCallback(1);
        Listing.getLockUnlock($id).done(function (response) {
            showPropzyAlert(response.message);
            requestLoading.addCallbackToQueue();
        });
    }

    function getResendAccount($id) {
        requestLoading.initCallback(1);
        Listing.resendInfo($id).done(function (response) {
            showPropzyAlert(response.message);
            requestLoading.addCallbackToQueue();
        });
    }

    function loadMoveInDate() {
        var data = Window.jsDetailData.moveInDate;

        if (data == null) {
            $("#moveInDateCheck").attr("checked", true);
            $("#moveInDatePicker").attr("disabled", "disabled");
            $("#display-moveInDate")
                .attr("readonly", true)
                .datepicker("destroy");
        } else {
            $("#moveInDateCheck").removeAttr("checked");
            $("#moveInDatePicker").removeAttr("disabled");
            $("#moveInDatePicker").val(moment(data).format("DD/MM/YYYY"));
            $("#display-moveInDate").attr("readonly", false).datepicker();
        }
    }

    function loadHouseCastings() {
        var data = Window.jsDetailData.houseCastings;
        if (data != null) {
            if (data == 1) {
                $("#houseCastings1").attr("checked", true);
                $("#houseCastings2").removeAttr("checked");
            } else if (data == 2) {
                $("#houseCastings2").attr("checked", true);
                $("#houseCastings1").removeAttr("checked");
            }
        }
    }

    function loadPrivacy() {
        var data = Window.jsDetailData.privacy;
        if (data != null) {
            if (data == 1) {
                $("#privacy1").attr("checked", true);
                $("#privacy2").removeAttr("disabled");
            } else if (data == 2) {
                $("#privacy2").attr("checked", true);
                $("#privacy1").removeAttr("disabled");
            }
        }
    }
    function loadMortgaged() {
        var data = Window.jsDetailData.mortgaged;
        if (data != null && data) {
            $("#mortgaged").attr("checked", true);
            $("#bankId").prop("disabled", false);
        } else {
            $("#mortgaged").attr("checked", false);
            $("#bankId").prop("disabled", true);
        }
    }
    function loadCampaign() {
        const data = Window.jsDetailData.campaignId;
        if (typeof data !== "undefined" && data != null) {
            $("#campaignId").val(data);
            $("#campaignId").prop("disabled", false);
            $("#campaignChecked").prop("checked", false);
        } else {
            $("#campaignId").prop("disabled", true);
            $("#campaignChecked").prop("checked", true);
        }
    }

    function loadUseDefaultPhoto() {
        const data = Window.jsDetailData.useDefaultPhoto;
        if (typeof data !== "undefined" && data == false) {
            // $('#campaignId').val(data);
            // $('#campaignId').prop('disabled', false);
            $("#useDefaultPhoto").prop("checked", false);
        } else {
            // $('#campaignId').prop('disabled', true);
            $("#useDefaultPhoto").prop("checked", true);
        }
    }

    function loadLandCode() {
        const data = Window.jsDetailData.landCode;
        if (typeof data !== "undefined" && data != null) {
            $("#landCode").val(data);
        }
    }
    function loadMapCode() {
        const data = Window.jsDetailData.mapCode;
        if (typeof data !== "undefined" && data != null) {
            $("#mapCode").val(data);
        }
    }

    function loadDirection(){
        const optionList = [
            {
                id: '',
                text: '-- Vui Lòng Chọn --'
            },
            {
                id: 1,
                text: 'Đông'
            },
            {
                id: 2,
                text: 'Tây'
            },
            {
                id: 3,
                text: 'Nam'
            },
            {
                id: 4,
                text: 'Bắc'
            },
            {
                id: 5,
                text: 'Đ.Bắc'
            },
            {
                id: 6,
                text: 'T.Bắc'
            },
            {
                id: 7,
                text: 'Đ.Nam'
            },
            {
                id: 8,
                text: 'T.Nam'
            },
            {
                id: -1,
                text: 'Không xác định'
            }
        ];
        $("#directionId").select2({
            data: optionList,
        });
        const data = Window.jsDetailData.directionId;
        if (typeof data !== "undefined" && data !== null) {
            $("#directionId").val(data).trigger('change');
        }
    }

    function checkExistedAddress() {
        showPropzyLoading();
        // input data address
        loadDataPost();
        // validate value
        const types = ['propertyTypeId', 'cityId', 'districtId', 'wardId', 'streetId', 'houseNumber', 'landCode', 'mapCode', 'modelCode'];
        var errs = validate(_this.data, types);
        if (!errs.isErr) {
            const checkAddressData = Object.fromEntries(types.map(key => {return [key, _this.data[key]]}));
            const postData = {...checkAddressData, id: _this.id}
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
                        duplicatedMsg +=
                            "<strong>Tin đăng hệ thống : </strong> <br>";
                        $.each(type1, function (idx, item) {
                            duplicatedMsg +=
                                "<a target='_blank' href='/pos/sa/detail/" +
                                item +
                                "'> #" +
                                item +
                                "</a>,";
                        });
                    }

                    if (type2.length > 0) {
                        duplicatedMsg +=
                            "<br><strong>Tin đăng prescreener: </strong> <br>";
                        $.each(type2, function (idx, item) {
                            duplicatedMsg +=
                                "<a target='_blank' href='/pos/prescreener/view/" +
                                item +
                                "'> #" +
                                item +
                                "</a>,";
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

                    var newDuplicatedMsg = duplicatedMsg.substring(
                        0,
                        duplicatedMsg.length - 1
                    );
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

    function checkExistedOwner(isPhone = true) {
        var data = {
            isPhone: isPhone,
            val: null,
        };
        var message = "";

        loadDataPost();
        if (data.isPhone) {
            data.val = getPhoneSub(_this.data.owner.phones);
            if (_this.data.crawlerStatus == 3) {
                if (!isVal(Window.jsDetailData.owner)) {
                    $.merge(data.val, [{ phoneSub: _this.data.owner.phone }]);
                }
            }
            if (
                !isVal(Window.jsDetailData.ownerId) &&
                isVal(_this.data.owner.phone)
            ) {
                $.merge(data.val, [{ phoneSub: _this.data.owner.phone }]);
            }
        } else {
            if (isVal(_this.data.owner) && isVal(_this.data.owner.email)) {
                data.val = _this.data.owner.email;
            }
        }

        if (hasValue(data.val)) {
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
                            var phonesArray = com.getPhonesStringArray(
                                data.val
                            );
                            var queryStr =
                                "https://www.google.com.vn/search?q=" +
                                phonesArray.join("+%7C+");
                            message =
                                "Không có dữ liệu." +
                                '<a id="google-find-phone" href="' +
                                queryStr +
                                '" target="_blank">Tìm Số Điện Thoại Bằng Google</a>';
                            $("#google-find-phone").click();
                        } else {
                            message = "Không có dữ liệu";
                        }
                    }
                } else {
                    message = response.message;
                }

                if (data.isPhone) {
                    showPropzyAlert(message, "Thông Tin", function (e) {
                        $(".make-call").trigger("click");
                    });
                } else {
                    showPropzyAlert(message, "Thông Tin");
                }

                $("#table-check-exist-owner").hpaging({ limit: 5 });
            });
        } else {
            if (data.isPhone) {
                message =
                    "Không có số điện thoại nào! Xin vui lòng kiểm tra lại dữ liệu";
                showPropzyAlert(message, "Thông Tin", function (e) {
                    $(".make-call").trigger("click");
                });
            } else {
                message =
                    "Không có địa chỉ email của chủ nhà! Xin vui lòng kiểm tra lại dữ liệu";
                showPropzyAlert(message, "Thông Tin");
            }
        }
    }

    function loadBtns() {
        $(".btn").prop("disabled", false);
        $("button").prop("disabled", false);
        var data = Window.jsDetailData.statusId;

        if ($.inArray(data, [24]) > -1) {
            $(
                ".btn:not(#virtual-touring-ok, .close, [data-dismiss=modal])"
            ).prop("disabled", true);
            $(
                "button:not(#virtual-touring-ok, .close, [data-dismiss=modal])"
            ).prop("disabled", true);
            // remove event
            $("body").off("click", ".btn");
            $("body").off("click", "button");

            // enable button re-assign
            $(".show-reassign-listing-modal-btn").prop('disabled', false);
            $("#reassign-listing-btn").prop("disabled", false);
        }
    }

    function removeValidateNull(options) {
        $(".form-input-danger").each(function (i, formInput) {
            var id = $(formInput).attr("id");
            var negative = $(formInput).hasClass("pos-feild-err-is-negative");
            $.each(options, function (i2, item) {
                if (!negative && id == item.id) {
                    item.val = "0";
                    $("#" + item.id).validateInputData(item);
                }
            });
        });
    }

    function removeValidate(id) {
        var item = {
            id: id,
            val: "0",
            noShowMess: true,
            optionsErr: [],
        };
        $("#" + item.id).validateInputData(item);
    }

    function updateListing(postData, callback) {
        // change sourceId
        //if
        const data = JSON.stringify(postData);
        return axios
            .post(POS_APIS_PRESCREEN.get("UPDATE_LISTING"), data)
            .then((response) => {
                requestLoading.addCallbackToQueue();
                const resultsContent = response.data;
                if (callback) callback(resultsContent);
            })
            .catch((err) => {
                requestLoading.addCallbackToQueue();
            });
    }
    function sendSaListing(postData, callback) {
        const data = JSON.stringify(postData);
        axios
            .post(POS_APIS_PRESCREEN.get("SEND_TO_SA"), data)
            .then((response) => {
                requestLoading.addCallbackToQueue();
                const resultsContent = response.data;
                if (callback) callback(resultsContent);
            })
            .catch((err) => {
                requestLoading.addCallbackToQueue();
            });
    }

    async function asyncUpdateListing(postData, callback) {
        await updateListing(postData, callback);
    }

    async function asyncSendSa(postData, callback) {
        var isUpdateSuccess = false;
        await updateListing(postData, (response) => {
            if (response.result) {
                isUpdateSuccess = true;
                if (isVal(postData.owner)) {
                    postData.owner.ownerId = response.data[0].ownerId;
                    postData.ownerId = response.data[0].ownerId;
                }
            } else {
                showPropzyAlert(response.message);
            }
        });
        if (isUpdateSuccess) {
            await sendSaListing(postData, callback);
        }
    }

    _this.updateDetail = function (callback) {
        clearAllValidate();
        requestLoading.initCallback(1);
        loadDataPost(function (postData) {
            var err = validate(postData);
            var hasClass = $(".form-input-danger").hasClass(
                "pos-feild-err-is-negative"
            );
            removeValidateNull(err.options);
            var errs = validate(postData, [
                "statusId",
                "listingTypeId",
                "realEstateGroupId",
                "propertyTypeId",
                "sourceId",
                "name",
                "name-agent",
                "email",
            ]);

            if (!errs.isErr && !hasClass) {
                asyncUpdateListing(postData, callback);
            } else {
                requestLoading.addCallbackToQueue();
                showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
            }
            return; //END ACTION;
        });
        // return; //END ACTION
    };

    _this.sendSA = function (callback) {
        clearAllValidate();
        requestLoading.initCallback(1);
        loadDataPost(async function (postData) {
            var errs = validate(postData);
            if (!errs.isErr) {
                let dataCheckLatlong = {
                  latitude: postData.latitude,
                  longitude: postData.longitude,
                  wardId: postData.wardId,
                };
                await checkLatLong(
                  dataCheckLatlong,
                  () => asyncSendSa(postData, callback),
                  hidePropzyLoading
                );
            } else {
                requestLoading.addCallbackToQueue();
                showPropzyAlert("Xin vui lòng kiểm tra lại dữ liệu");
            }
        });
    };

    _this.getSendDiy = function () {
        requestLoading.initCallback(1);
        axios
            .get(POS_APIS_PRESCREEN.get("SEND_DIY") + "/" + _this.id, {
                params: {},
            })
            .then((response) => {
                requestLoading.addCallbackToQueue();
                const resultsContent = response.data;
                if (resultsContent.result) {
                    showPropzyAlert(
                        resultsContent.message,
                        "Thông Báo",
                        function (e) {
                            Window.jsDetailData.ownerAppStatus.isSentApp = true
                            const ownerAppStatus = Window.jsDetailData.ownerAppStatus
                            const statusFormat = "Chủ nhà chỉ mới được tư vấn sử dụng Propzy app (Thời gian gởi TK gần nhất: %s)"
                            ownerAppStatus.statusFormat = statusFormat.replace("%s", moment().format('D/MM/Y'))
                            
                            _this.templateIsSentApp()
                        }
                    );
                } else {
                    showPropzyAlert(resultsContent.message, "Thông Báo");
                }
            })
            .catch((err) => {
                requestLoading.addCallbackToQueue();
            });
    };
}
