function SADetail() {
    var _this = this
    var isValuation = false

    var stored = {
        guaranteedSignedDate: null,
        guaranteedExpiredDate: null,
        toDay: moment().format("DD/MM/YYYY"),
        updateList: new Map(),
    }

    _this.init = function () {
        let config = {
            timeDoAction: Window.jsDetailData.timeInactive * 60,
            key: `bsa-${Window.jsDetailData.rlistingId}`,
        }
        _this.timer = new TimerCountDown(config)
        errorsStart()
        initVAR()
        initDOM()
        bindEvent()
        checkLive()
        errorsEnd(true)
    }

    function initVAR() {
        var api = Window.sa.api

        _this.updateStatusListingXLButton = "#btn-update-status-listing-xl"
        _this.updateStatusListingXLModal = "#modalUpdateStatusListingXL"
        _this.statusListingXLListId = "#status-listing-xl"
        _this.addNewStreetModalId = "#addNewStreetModal"
        _this.addNewStreetBtnId = "#add-new-street-btn"
        _this.addNewStreet = new AddNewStreet()
        _this.liveButton = "#live-btn"
        _this.liveListingButton = "#make-live-listing-btn"
        _this.liveListingModal = "#make-live-listing-modal"
        _this.saveButton = "#save-btn"
        _this.createReminderModal = "#create-reminder-modal"
        _this.cancelButton = "#cancel-btn"
        _this.valuationButton = "#valuation-btn"
        _this.showMarketReportBtn = "#showMarketReport"
        if (Window.jsRole == "edit") {
            _this.cancelListingModal = "#cancel-listing-modal"
        }
        _this.sendDIYButton = "#send-diy-btn"
        _this.resendId = "#resend-btn"
        _this.pushToOwner = "#push-owner-btn"
        _this.unlockId = "#unlock-btn"
        _this.update = function (status, callback) {
            if (status.statusId == 5 && status.reasonId == 169) {
                status.reasonContent = $("#reasonContent").val()
            } else {
                status.reasonContent = null
            }
            // bổ sung thông tin
            /*status.noteForOwner = null;
            if (status.statusId == 11) {
                status.noteForOwner  = $("#note-update-info-owner").val();
            }*/

            var collectedData = {}

            function triggerChange() {
                $("#latitude").trigger("change")
                $("#longitude").trigger("change")
            }
            function updateStatus() {
                Window.jsDetailData.status = $.extend(
                    true,
                    Window.jsDetailData.status,
                    status
                )
            }

            function collectData() {
                collectedData = $.extend(
                    true,
                    collectedData,
                    Window.jsDetailData
                )
                if (collectedData.virtualTouring && collectedData.virtualTouring.trim().length > 0) {
                    var url = collectedData.virtualTouring;
                    collectedData.virtualTouring = {
                        url: url,
                        id: null
                    }
                    if (collectedData.oldVirtualTouring) {
                        collectedData.virtualTouring = collectedData.oldVirtualTouring;
                        collectedData.virtualTouring.url = url;
                    }
                } else {
                    collectedData.virtualTouring = null;
                    if (collectedData.oldVirtualTouring) {
                        collectedData.virtualTouring = collectedData.oldVirtualTouring;
                        collectedData.virtualTouring.url = '';
                    }
                }
                delete collectedData.oldVirtualTouring
                delete collectedData.isReviewed
                delete collectedData.isAvailable
                delete collectedData.reviewedDate
                delete collectedData.mainPhotos
                delete collectedData.mainVideos
                delete collectedData.video
                delete collectedData.videos
                delete collectedData.redBookPhotos
                delete collectedData.pinkBookPhotos
                delete collectedData.status.rlistingId
                //delete collectedData.status.reasonContent;
                delete collectedData.status.createdDate
                delete collectedData.status.status
                delete collectedData.loginUserId
                delete collectedData.isMine
                delete collectedData.photos
                delete collectedData.photoGcns
                delete collectedData.noteCRM
                delete collectedData.ownerPhones
                if (collectedData.formId) {
                    delete collectedData.formId
                }
                if (Window.sa.data.crawlerStatus() == 3) {
                    // delete collectedData.socialCommunications;
                    /* delete collectedData.agent.info.email
                    delete collectedData.agent.info.name
                    delete collectedData.agent.info.note
                    delete collectedData.agent.info.phone */
                } else {
                    collectedData.agent = null
                }

                // collectedData.price = $("#price").val().replaceAll(",", "").trim();
                // collectedData.alley = $("#alleyWidth").val();
                collectedData.directionId = $("#directionId").val();
                // collectedData.numberFloor = $("#numberFloor").val();
                // collectedData.bedRooms = $("#bedRooms").val();
                // collectedData.bathRooms = $("#bathRooms").val();

                // fix switch case propertyType save position data
                // if (!hasValueV2(collectedData.position.position)) {
                // collectedData.position = null;
                // }

                if (hasValue(collectedData.construction)) {
                    if (!hasValueV2(collectedData.construction.id)) {
                        collectedData.construction = null
                    } else {
                        if (
                            !hasValueV2(
                                collectedData.construction.id.houseTypeId
                            )
                        ) {
                            collectedData.construction = null
                        }
                    }
                }
                if (hasValue(collectedData.socialCommunications[0])) {
                    const _tmp = collectedData.socialCommunications[0]                    
                    if (
                        !hasValue(_tmp.email) &&
                        !hasValue(_tmp.phone) &&
                        !hasValue(_tmp.name)
                    ) {
                        collectedData.socialCommunications.shift()
                    }
                }
                collectedData.metaTag.description = $('<div>' + (collectedData.metaTag.description || '') + '</div>').text();
                collectedData.metaTag.title= $('<div>' + (collectedData.metaTag.title || '') + '</div>').text();
                collectedData.metaTag.keywords= $('<div>' + (collectedData.metaTag.keywords || '') + '</div>').text();

            }

            function processUpdate(callback) {
                Window.sa.photo.getPhotoList()
                triggerChange()
                updateStatus()
                collectData()
                if (!Window.jsDetailData.virtualTouringChecked && collectedData.virtualTouring && collectedData.virtualTouring.url.trim().length > 0) {
                    if (Window.jsDetailData.oldVirtualTouring?.url !== collectedData.virtualTouring.url.trim()) {
                        showPropzyAlert('Bạn cần Xem thử Link virtual tour trước khi thực hiện thao tác này !');
                        hidePropzyLoading();
                        return false;
                    }
                }

                // apply validate email before submit data
                if (collectedData.socialCommunications.length > 0 && collectedData.socialCommunications[0].email) {
                    if (!isEmail(collectedData.socialCommunications[0].email)) {
                        hidePropzyLoading();
                        message = 'Chưa nhập email hoặc email không đúng định dạng! Xin vui lòng kiểm tra lại dữ liệu';
                        showPropzyAlert(message, 'Thông Tin');

                        return false
                    }
                }

                if (Window.jsRole == "edit") {
                    api.updateListing(collectedData).done(function (response) {
                        callback(response)
                    })
                } else {
                    api.createListing(collectedData).done(function (response) {

                        callback(response)
                    })
                }
            }

            processUpdate(function (response) {
                if (callback) {
                    callback(response)
                }
            })
        }

        _this.save = function (callback) {
            return _this.update({statusId: 2}, callback)
        }

        _this.saveForValuation = function (callback) {
            return _this.update(
                {statusId: Window.sa.data.statusId()},
                callback
            )
        }
        _this.live = function (callback) {
            return _this.update({statusId: 3}, callback)
        }

        _this.cancel = function (data, callback) {
            var _data = {
                statusId: 5,
                reasonId: 169,
                reasonContent: "Lý do khác",
                price: null,
                soldDate: null,
                contractFrom: null,
                contractTo: null,
            }

            _data = $.extend(true, _data, data)

            _this.update(_data, callback)
        }

        _this.sendDIY = function () {
            var postData = {
                rlistingId: Window.jsDetailData.rlistingId,
            }

            return api.sendDIY(postData)
        }

        _this.unlock = function () {
            var postData = {
                rlistingId: Window.jsDetailData.rlistingId,
            }

            return api.unlock(postData)
        }

        _this.resend = function () {
            var postData = {
                rId: Window.jsDetailData.rlistingId,
            }

            return api.resend(postData)
        }
        _this.pushToSAOwnerList = function () {
            var postData = {
                rId: Window.jsDetailData.rlistingId,
            }

            return api.pushToSAOwnerList(postData)
        }
        // load popup update status listing xl
        _this.loadUpdateStatusListingXLList = function () {
            api.getStatusListingXLList().done(function (response) {
                if (response.result && response.data[0]) {
                    let statusList = response.data[0].list
                    let data = [
                        {
                            id: "",
                            statusId: "",
                            text: "--- Vui lòng chọn ---",
                        },
                    ]
                    statusList.forEach((it) => {
                        stored.updateList.set(it.id, it)
                        data.push({
                            id: it.id,
                            statusId: it.value,
                            text: it.name,
                        })
                    })
                    $(_this.statusListingXLListId).select2({
                        data: data,
                    })
                    $(_this.statusListingXLListId).trigger("change")
                }
            })
        }
        // call api update status listing xl
        _this.updateStatusListingXL = function (data) {
            api.doUpdateStatusListingXL(data).done(function (response) {
                hidePropzyLoading()
                if (response.result) {
                    $(_this.updateStatusListingXLModal).modal("hide")
                    showPropzyAlert(response.message, "Thông Báo", function () {
                        location.reload()
                    })
                } else {
                    showPropzyAlert(response.message, "Thông Báo")
                }
            })
        }
        stored.guaranteedExpiredDate = Window.sa.data.guaranteedExpiredDate()
        stored.guaranteedSignedDate = Window.sa.data.guaranteedSignedDate()
    }

    function initAutoFormatPrice() {
        $(".auto-format-price").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 0})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initAutoFormatUSD() {
        $(".auto-format-usd").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 2})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function setLabelByPrice(element) {
        if (element.val()) {
            const getValue = parseFloat(element.val().replace(/,/g, ""))
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            element.val(getValue)

            // get number to string 
            NumberInputUtil.numberToLabel(element)
        } else {
            // reset value while input char
            element.val('')
            element.find('.lblTextNumber').text('')
        }
    }

    function initAutoFormatVND() {
        window.addEventListener("DOMContentLoaded", () => {
            // init DOME to set number to label
            $(".auto-format-vnd").each(function (i, v) {
                setLabelByPrice($(this))
            })

            $(".auto-format-vnd").keyup(function (e) {
                // set maxlength
                const ele = '#' + e.target.id
                if ($(ele).val()) {
                    const inputValue = $(ele).val()
                    // limit 13 character
                    if (inputValue.length > 17) {
                        $(ele).val(inputValue.substring(0, 17))
                    }
    
                    // set number to label
                    setLabelByPrice($(ele))
                } else {
                    // reset value if press backspace
                    $(ele).val('')
                    $(ele + ' + .lblTextNumber').text('')
                }
    
                return
            })
        })
    }

    function initAutoFormatNumber() {
        $(".auto-format-number").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 0})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initAutoFormatSize() {
        $(".auto-format-size").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 2})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initAutoFormatFloat() {
        $(".auto-format-float").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 2})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initAutoFormatYear() {
        $(".auto-format-year").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {
                    mDec: 0,
                    dGroup: 4,
                    vMin: 0,
                    vMax: 9999,
                })
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initAutoFormatPercent() {
        $(".auto-format-percent").each(function (i, v) {
            try {
                $(this).autoNumeric("init", {mDec: 2, vMin: 0, vMax: 100})
            } catch (e) {
                errorsAdd({
                    message: $(this).data("label") + " : " + e.message,
                })
            }
        })
    }

    function initDOM() {
        _this.loadUpdateStatusListingXLList()
        _this.timer.init()
        //load class browser
        const arrayCancel = [5, 6, 7, 8, 9, 10, 11, 12]
        var _BrowserCloseAction = new BrowserCloseAction(
            `bsa-${Window.jsDetailData.rlistingId}`,
            function () {
                // kiểm tra listing này hủy hay ko hủy, nếu khác hủy thì count, còn hủy thì ko count
                if (
                    !arrayCancel.includes(Window.jsDetailData.status.status.id)
                ) {
                    bindCounter()
                }
            },
            function () {
                // kiểm tra listing này hủy hay ko hủy, nếu khác hủy thì count, còn hủy thì ko count
                if (
                    !arrayCancel.includes(Window.jsDetailData.status.status.id)
                ) {
                    bindCounter()
                }
            }
        )
        _BrowserCloseAction.init()
        function initDatePicker() {
            $(".date-picker").datepicker({
                autoClose: true,
                format: "dd/mm/yyyy",
                language: "vn",
            })
        }

        function initDatePickerForGuaranteedExpiredDate() {
            $("#guaranteedExpiredDate").datepicker({
                autoClose: true,
                format: "dd/mm/yyyy",
                language: "vn",
                startDate: "0d",
            })
            $("#guaranteedSignedDate").datepicker({
                autoClose: true,
                format: "dd/mm/yyyy",
                language: "vn",
                endDate: "0d",
            })
        }

        function showAfter() {
            if (Window.sa.field.listAfter) {
                Window.sa.field.listAfter.showlegalStatusList()
                Window.sa.field.listAfter.showCountAggreate()
                Window.sa.field.listAfter.showPhonesNew()
                Window.sa.field.listAfter.showHideAlleyInfo()
                Window.sa.field.listAfter.showHidePositionOrBuildingInfo()
                Window.sa.field.listAfter.showHideUseDiy()
                Window.sa.field.listAfter.showCheckAddress()
                Window.sa.field.listAfter.showCheckEmail()
            }
            getInfoValuation({rlistingId: Window.sa.data.rlistingId()})
        }

        function showHideIsDoneForDiy() {
            if (!hasValue(Window.sa.data.diyContent())) {
                $(".isDoneForDiy-group").hide()
            }
        }

        function showHideDiyInfo() {
            if (hasValue(Window.jsDetailData.diyInfo)) {
                if (
                    !hasValue(Window.jsDetailData.diyInfo.content) &&
                    !hasValue(Window.jsDetailData.diyInfo.price) &&
                    Window.jsDetailData.diyInfo.photos.length == 0 &&
                    !hasValue(Window.sa.data.diyStopInfo())
                ) {
                    $(".diyInfo-group").hide()
                }
            } else {
                $(".diyInfo-group").hide()
            }
        }

        function renderDiyStopReasonList() {
            var diyStopReasonList = Window.sa.data.diyStopReasonList()
            var diyStopInfo = Window.sa.data.diyStopInfo()
            var html = ""

            if (hasValue(diyStopInfo)) {
                html +=
                    '<label for="diyStopReasonList" class="control-label" style="margin-bottom: 10px">Lý do dừng DIY</label>'
                var reason = ""
                switch (diyStopInfo.statusId) {
                    case 7:
                        if (diyStopReasonList.length > 0) {
                            var reasonList = diyStopReasonList
                                .map((it) => it.reasonName)
                                .join(",")
                            reason = "Đã cho thuê (Lý do: ".concat(
                                reasonList,
                                ")"
                            )
                        } else {
                            reason = "Đã cho thuê"
                        }
                        break
                    case 8:
                        if (diyStopReasonList.length > 0) {
                            var reasonList = diyStopReasonList
                                .map((it) => it.reasonName)
                                .join(",")
                            reason = "Đã bán (Lý do: ".concat(reasonList, ")")
                        } else {
                            reason = "Đã bán"
                        }
                        break
                    default:
                        if (hasValue(diyStopInfo.reason)) {
                            reason = "Chủ nhà yêu cầu ngưng (Lý do: ".concat(
                                diyStopInfo.reason,
                                ")"
                            )
                        } else {
                            reason = "Chủ nhà yêu cầu ngưng"
                        }
                        break
                }

                html += "<ul><li>".concat(reason, "</li></ul>")
            }

            $("#diyStopReasonList-wrapper").html(html)
        }

        function initAddNewStreetModal() {
            _this.addNewStreet.init()
        }

        function initAutoFormatPhoneNumber() {
            $(".phone-number").phoneBasic()
        }

        function showHideOwnerAgentInfo() {
            var crawlerStatus = Window.sa.data.crawlerStatus()
            var ownerPhone = Window.sa.data.phone()
            if (crawlerStatus == 2 || crawlerStatus == 7) {
                if (Window.jsRole == "edit") {
                    $("#owner-info input").prop("disabled", false)
                    $(".new-subPhone input").prop("disable", false)
                    $(".new-subPhone button").prop("disable", false)
                }
                $("#agent-info").hide()
            } else {
                if (crawlerStatus == 3) {
                    if (Window.jsRole == "edit") {
                        if (hasValue(ownerPhone)) {
                            $("#owner-info input").prop("disabled", true)
                            $(".new-subPhone input").prop("disable", true)
                            $(".new-subPhone button").prop("disable", true)
                        } else {
                            $("#owner-info input").prop("disabled", false)
                            $(".new-subPhone input").prop("disable", false)
                            $(".new-subPhone button").prop("disable", false)
                        }
                    }
                    $("#agent-info").show()
                } else {
                    $("#agent-info").hide()
                }
            }
        }

        if (Window.jsRole == "view") {
            function initRoleView() {
                $("#photos-wrapper").find(".file-preview-del").remove()
                $("#photos-wrapper").find(".images-file-actions").remove()
                $("#photoGcns-wrapper").find(".file-preview-del").remove()
                $("#photoGcns-wrapper").find(".images-file-actions").remove()
                if (currentUser.userId == Window.jsDetailData.assignedTo) {
                    $("#switch-wrapper").html(
                        '<a href="/pos/sa/detail/' +
                        Window.jsDetailData.rlistingId +
                        '" class="btn btn-warning"><i class="glyphicon glyphicon-pencil"></i> Chỉnh sửa tin đăng</a>'
                    )
                } else {
                    $("#sa-btn-group-footer").hide()
                }
                $("select").attr("disabled", "disabled")
                $("input").attr("disabled", "disabled")
                $("textarea").attr("disabled", "disabled")
                $("button:not(.close)").remove()
            }

            $(document).ready(function () {
                $(document).ajaxStop(function () {
                    initRoleView()
                })
            })
        }

        function initAgentList() {
            let keywords = null
            if (Window.sa.data.agent().info.name) {
                keywords = Window.sa.data.agent().info.name
            }
            Window.sa.api
                .getAgentListV2({ keywords })
                .done(function (response) {
                    buildAgentList(response)
                })
        }

        function buildAgentList(response) {
            function buildOption(option) {
                var html = ""
                for (var i = 0; i < option.length; i++) {
                    html += '<option value="' + option[i].value + '"'
                    for (var attr in option[i].attrs) {
                        if (hasValue(option[i].attrs[attr])) {
                            html +=
                                " data-" +
                                attr +
                                '="' +
                                option[i].attrs[attr] +
                                '"'
                        }
                    }
                    html += ">" + option[i].text + "</option>"
                }
                return html
            }

            var optionList = [
                {
                    value: "",
                    text: "-- Vui Lòng Chọn --",
                },
            ]

            if (response.result) {
                $.each(response.data, function (i, item) {
                    var attrs = {}
                    for (var _item in item) {
                        attrs[_item] = item[_item]
                    }
                    optionList.push({
                        value: item.agentId,
                        text:
                            item.name +
                            " - " +
                            item.phone +
                            (hasValueV2(item.contractStatus) &&
                                item.contractStatus == 17
                                ? " - Đã ký HĐ"
                                : " - Chưa ký HĐ"),
                        attrs: attrs,
                    })
                })
            }

            $("#agentId").html(buildOption(optionList))
            $("#agentId").val(Window.sa.data.agentId())
        }

        function searchAgentList() {
            $("#agentId").select2({
                matcher: function (term, text) {
                    if (text.toUpperCase().indexOf(term.toUpperCase()) == 0) {
                        return true
                    }
                },
                language: {
                    searching: function () {
                        return null
                    },
                    noResults: function () {
                        return "Không có dữ liệu"
                    },
                },
                ajax: {
                    delay: 500,
                    data: function (params) {
                        var queryParameters = {
                            q: hasValue(params.term) ? params.term : null,
                        }
                        return queryParameters
                    },
                    processResults: function (response) {
                        var data = null
                        buildAgentList(response)
                        if (response.result) {
                            data = response.data
                            var tmp = []
                            for (var i = 0; i < data.length; i++) {
                                tmp.push({
                                    id: data[i].agentId,
                                    text:
                                        data[i].name +
                                        " - " +
                                        data[i].phone +
                                        (hasValueV2(data[i].contractStatus) &&
                                            data[i].contractStatus == 17
                                            ? " - Đã ký HĐ"
                                            : " - Chưa ký HĐ"),
                                })
                            }
                            data = tmp
                        }
                        return {
                            results: data,
                        }
                    },
                    transport: function (params, success, failure) {
                        var name = params.data.q
                        if (hasValue(name)) {
                            if (
                                name.substr(-1) == " " ||
                                name.split(" ").length > 1
                            ) {
                                name = name.trim()
                            }
                        } else {
                            name = null
                        }
                        var $request = Window.sa.api.getAgentListV2({
                            keywords: name,
                        })
                        $request.then(success)
                        $request.fail(failure)
                        return $request
                    },
                },
            })
        }

        function initSelect2() {
            $("select").select2()
        }

        function changeBuildingFloorsTitle() {
            var title = ""
            var _propertyTypeId = Window.sa.data.propertyTypeId()
            var _buildingId = Window.sa.data.buildingId()
            if ($.inArray(_propertyTypeId, [8, 1, 4, 7]) != -1) {
                if (hasValue(_buildingId)) {
                    title = "Vị trí (tầng)"
                } else {
                    title = "Số lầu"
                }
            } else {
                title = "Số lầu"
            }
            $('label[for="buildingFloors"]').text(title)
        }

        // function initRoadFrontageWidth() {
        // 	// $('#roadFrontageWidth').prop('disabled', hasValue(Window.sa.data.roadFrontageWidth()));
        // }
        //
        // function initWidthFrontWay() {
        // 	// $('#widthFrontWay-alley').prop('disabled', hasValue(Window.sa.data.widthFrontWay()));
        // }
        // loi ho anh cai
        initSelect2()
        initAutoFormatPrice()
        initAutoFormatNumber()
        initAutoFormatYear()
        initAutoFormatPercent()
        initAutoFormatSize()
        initAutoFormatFloat()
        initDatePicker()
        initDatePickerForGuaranteedExpiredDate()
        initAutoFormatPhoneNumber()
        showAfter()
        showHideIsDoneForDiy()
        showHideDiyInfo()
        renderDiyStopReasonList()
        initAddNewStreetModal()
        initAutoFormatUSD()
        initAutoFormatVND()
        showHideOwnerAgentInfo()
        initAgentList();
        searchAgentList()
        changeBuildingFloorsTitle()
        initValuationInfo({
            valuationType: Window.sa.data.valuationType(),
            valuationPriceFormat: Window.sa.data.valuationPriceFormat(),
        })
        initRoadPrice()
        if (Window.sa.field.listAfter) {
            Window.sa.field.listAfter.showHideHaveBesideInfo()
            Window.sa.field.listAfter.showHideValuationButton()
            Window.sa.field.listAfter.showHideValuationInfo()
        }
        // initRoadFrontageWidth();
        // initWidthFrontWay();
    }

    function initRoadPrice() {
        if (hasValue(Window.sa.data.roadPrice())) {
            // $('#roadPrice').prop('disabled', true);
        } else {
            Window.sa.field.fieldChangedByList.roadPrice = true
            if (Window.sa.field.listAfter) {
                Window.sa.field.listAfter.loadRoadPrice()
            }
        }
    }

    function initValuationInfo(data) {
        $("#valuation-wrapper").html("")
        if (
            hasValue(data.valuationType) &&
            hasValue(data.valuationPriceFormat)
        ) {
            $("#valuation-type span").text(data.valuationType)
            $("#valuation-price-format span").text(data.valuationPriceFormat)
            isValuation = true
        } else {
            $("#valuation-type span").text("Chưa có")
            $("#valuation-price-format span").text("Chưa có")
        }
    }

    function checkLive() {
        var status = Window.jsDetailData.status
        if (Window.jsRole == "edit") {
            if (hasValue(status) && status.statusId == 3) {
                $(_this.saveButton).attr("disabled", "disabled")
                $("#save-remind-btn").attr("disabled", "disabled")
                // $(_this.sendDIYButton).attr('disabled', 'disabled');
                $("body").off("click", _this.saveButton)
                $("body").off("click", "#save-remind-btn")
                $("body").off("click", _this.sendDIYButton)
            }
        }
    }

    async function updateAddress(fieldId) {
        ajaxStart()

        let address = ''
        let street = ''

        if (fieldId === 'address') {
            address = $('#' + fieldId).val()
        } else if (
            hasValue($("#houseNumber").val()) &&
            hasValue($("#streetId").val()) &&
            hasValue($("#wardId").val()) &&
            hasValue($("#districtId").val())
        ) {
            address = $("#houseNumber").val() + " "
            street = $("#streetId option:selected").text().trim()
            // if (street.toLowerCase().indexOf('đường số') == -1) {
            // 	street = street.replace('Đường', '');
            // }
            address += street + ", "
            address += $("#wardId option:selected").text() + ", "
            address += $("#districtId option:selected").text() + ", Hồ Chí Minh"

            Window.sa.field.fieldChangedByList.address = true
            Window.sa.field.fieldChangedByList.latitude = true
            Window.sa.field.fieldChangedByList.longitude = true
            // $("#longitude").val("")
            // $("#latitude").val("")
            Window.sa.field.listAfter.loadRoadPrice()
            Window.sa.field.fieldChangedByList.address = false
            Window.sa.field.fieldChangedByList.latitude = false
            Window.sa.field.fieldChangedByList.longitude = false
            // $("#address").trigger('geocode');
        // }
            Window.sa.field.listAfter.loadRoadPrice()
        }

        let resp = null
        if (address) {
            const geocoder = new google.maps.Geocoder();

            try {
                resp = await geocoder.geocode({ 'address': address }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        return results
                    }
                })

                const lat = resp.results[0].geometry.location.lat()
                const lng = resp.results[0].geometry.location.lng()

                Window.jsDetailData.address = resp.results[0].formatted_address
                Window.jsDetailData.latitude = lat
                Window.jsDetailData.longitude = lng
                $('#address').val(resp.results[0].formatted_address).trigger('change')
                $('#latitude').val(lat).trigger('change')
                $('#longitude').val(lng).trigger('change')
            } catch {
                $('#address').val(address + ', Việt Nam').trigger('change')
                $('#latitude').val('').trigger('change')
                $('#longitude').val('').trigger('change')
            }
        }

        ajaxEnd()
            
        return
    }

    function getInfoValuation(data) {
        Window.sa.api.getValuation(data).done(function (response) {
            if (response.result) {
                initValuationInfo({
                    valuationType: response.data.classify,
                    valuationPriceFormat: response.data.priceValuationFormat,
                })
                updateValuationInfo({
                    valuationType: response.data.classify,
                    valuationPrice: response.data.priceValuation,
                })
            }
        })
    }

    function getValuation(data) {
        ajaxStart()
        Window.sa.api.getValuation(data).done(function (response) {
            if (response.result) {
                if (response.data.message == null) {
                    initValuationInfo({
                        valuationType: response.data.classify,
                        valuationPriceFormat:
                            response.data.priceValuationFormat,
                    })
                    updateValuationInfo({
                        valuationType: response.data.classify,
                        valuationPrice: response.data.priceValuation,
                    })
                    var _message = ""
                    _message =
                        "Loại định giá: " +
                        response.data.classify +
                        "<br>" +
                        "Trị giá: " +
                        response.data.priceValuationFormat
                    showPropzyAlert(
                        _message,
                        "Thông tin định giá",
                        function () {
                            location.reload()
                        }
                    )
                } else {
                    var html =
                        "<form>" +
                        "<div class='row form-group'>" +
                        "<div class='col-lg-12'>" +
                        "<p>" +
                        response.data.message +
                        "</p>" +
                        "</div" +
                        "<div class='col-lg-12'>" +
                        "<label>Ghi chú</label>" +
                        "<textarea class='form-control editor' id='send-valuation-note'></textarea>" +
                        "</div" +
                        "</div" +
                        "</form>"
                    showPropzyConfirm({
                        message: html,
                        btn: {
                            yes: {
                                text: "Gửi email",
                            },
                            no: {
                                text: "Đóng",
                            },
                        },
                        okCallback: function () {
                            sendValuationNote()
                        },
                        cancelCallback: function () {
                            location.reload()
                        },
                    })
                }
            } else {
                showPropzyAlert(response.message, "Thông Báo")
            }
        })
        ajaxEnd()
    }

    function updateValuationInfo(data) {
        Window.sa.data.valuationType(data.valuationType)
        Window.sa.data.valuationPrice(data.valuationPrice)
    }

    function sendValuationNote() {
        var dataPost = {
            note: $("#send-valuation-note").val(),
            rlistingId: Window.sa.data.rlistingId(),
        }

        Window.sa.api.sendEvaluationEmail(dataPost).done(function (response) {
            if (!response.result) {
                showPropzyAlert(response.message, "Thông Báo", function () {
                    location.reload()
                })
            } else {
                location.reload()
            }
        })
    }

    function createRequestInfo() {
        var _result = {
            customerName: null,
            customerPhone: null,
            customerEmail: null,
            crawlerStatus: null,
        }
        var isAgent = Window.sa.data.crawlerStatus() == 3
        if (isAgent) {
            _result.customerName = Window.sa.data.agentName()
            _result.customerEmail = Window.sa.data.agentEmail()
            _result.customerPhone = Window.sa.data.agentPhone()
        } else {
            _result.customerName = Window.sa.data.name()
            _result.customerEmail = Window.sa.data.email()
            _result.customerPhone = Window.sa.data.phone()
        }

        _result.crawlerStatus = Window.sa.data.crawlerStatus()
        return _result
    }

    _this.showConfirmBuyNewHouse = function () {
        var html =
            "Chủ nhà có nhu cầu không ?" +
            '<div class="row"><label class="radio control-label">' +
            '<input type="radio" name="requestForOwner" value="1" class="requestForOwner" checked>' +
            '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> mua/thuê' +
            "</label></div> " +
            '<div class="row"><label class="radio control-label">' +
            '<input type="radio" name="requestForOwner" value="0" class="requestForOwner">' +
            '<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Bán' +
            "</label></div> "
        showPropzyConfirm({
            message: html,
            okCallback: function () {
                var request = parseInt($("input.requestForOwner:checked").val())
                if (request === 1) {
                    var customerInfo = createRequestInfo()
                    window.location =
                        "/request/create?customerName=" +
                        customerInfo.customerName +
                        "&customerPhone=" +
                        customerInfo.customerPhone +
                        "&customerEmail=" +
                        customerInfo.customerEmail
                } else {
                    if (localStorage.getItem("newSaForBuyNewHouse") !== null) {
                        localStorage.removeItem("newSaForBuyNewHouse")
                    }
                    localStorage.setItem(
                        "newSaForBuyNewHouse",
                        JSON.stringify(Window.sa.data.data())
                    )
                    window.location = "/pos/sa/create"
                }
                // window.location = '/request/create?customer=' + JSON.stringify(customerInfo);
            },
            cancelCallback: function () {
                window.location = "/pos/sa"
            },
        })
    }

    async function getLiveType() {
        $("#live-listing-type").html("").select2()
        let data = []
        if (!POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST) {
            await POS_PROMISISE_API("SA_GET_CHANNEL_TYPE", {})
        }
        const liveType = POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST.filter(
            (it) => it.type == 9
        )
        if (liveType) {
            let dataMap = liveType[0].list.map((it) => {
                return {
                    id: it.id,
                    text: it.name,
                }
            })

            const isPrivate = Window.sa.photo.isPrivateContent()
            if (isPrivate) {
                // only show live private
                dataMap = dataMap.filter((it) => it.id == 196)
            }
            data = data.concat(dataMap)
        }

        $("#live-listing-type").select2({
            data: data,
        })
    }

    function processGuaranteedExpiredDate() {
        var liveListingType = parseInt($("#live-listing-type").val())
        Window.jsDetailData.liveType = liveListingType
        switch (liveListingType) {
            case 195: // thuong
            case 196: // rieng tu
            case 198: // dich vu
                $("#guaranteedExpiredDate-group").hide()
                $("#guaranteedSignedDate-group").hide()
                break
            case 197: // doc quyen
                if (hasValue(Window.sa.data.guaranteedExpiredDate())) {
                    $("#guaranteedExpiredDate").val(
                        Window.sa.data.guaranteedExpiredDate()
                    )
                } else if (hasValue(stored.guaranteedExpiredDate)) {
                    $("#guaranteedExpiredDate").val(
                        stored.guaranteedExpiredDate
                    )
                } else {
                    $("#guaranteedExpiredDate").val(stored.toDay)
                }

                if (hasValue(Window.sa.data.guaranteedSignedDate())) {
                    $("#guaranteedSignedDate").val(
                        Window.sa.data.guaranteedSignedDate()
                    )
                }
                $("#guaranteedExpiredDate-group").show()
                $("#guaranteedSignedDate-group").show()
                break
        }
        $("#guaranteedExpiredDate").trigger("change")
    }

    function updateGuaranteedExpiredDate() {
        var timeNow = stored.toDay
        var months = parseInt($("#guaranteedExpiredDateTo").val())

        if (months != 0) {
            timeNow = moment().add(months, "M").format("DD/MM/YYYY")
        }
        $("#guaranteedExpiredDate").val(timeNow)
        $("#guaranteedExpiredDate").trigger("change")
    }

    function bindEvent() {
        // show price text vnd
        $("#price").val() ? NumberInputUtil.numberToLabel("#price") : ""
        $("#minPrice").val() ? NumberInputUtil.numberToLabel("#minPrice") : ""
        /* $("#price").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtil.numberToLabel("#" + name)
        })
        $("#minPrice").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtil.numberToLabel("#" + name)
        }) */

        // show area text
        $("#lotSize").val()
            ? NumberInputUtilArea.numberToLabelArea("#lotSize", true, true)
            : ""
        $("#floorSize").val()
            ? NumberInputUtilArea.numberToLabelArea("#floorSize", true, true)
            : ""
        $("#sizeLength").val()
            ? NumberInputUtilArea.numberToLabelArea("#sizeLength", false, true)
            : ""
        $("#sizeWidth").val()
            ? NumberInputUtilArea.numberToLabelArea("#sizeWidth", false, true)
            : ""
        $("#lotSize").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true)
        })
        $("#floorSize").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtilArea.numberToLabelArea("#" + name, true, true)
        })
        $("#sizeLength").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true)
        })
        $("#sizeWidth").on("keyup", function (event) {
            let name = $(this).attr("id")
            NumberInputUtilArea.numberToLabelArea("#" + name, false, true)
        })
        $("#floorSize").on("change", function (e) {
            let areaUsed = parseFloat($(this).val().replace(/\,/g, ""))
            let areaLand = parseFloat($("#lotSize").val().replace(/\,/g, ""))
            if (areaUsed && areaLand && areaUsed < areaLand) {
                showPropzyConfirm({
                    message:
                        "Bạn có chắc diện tích sử dụng nhỏ hơn diện tích đất",
                    btn: {
                        yes: {
                            text: "Xác nhận",
                        },
                        no: {
                            text: "Đóng",
                            show: false,
                        },
                    },
                })
            }
        })
        $("#lotSize").on("change", function (e) {
            let areaUsed = parseFloat($("#floorSize").val().replace(/\,/g, ""))
            let areaLand = parseFloat($(this).val().replace(/\,/g, ""))
            if (areaUsed && areaLand && areaUsed < areaLand) {
                showPropzyConfirm({
                    message:
                        "Bạn có chắc diện tích sử dụng nhỏ hơn diện tích đất",
                    btn: {
                        yes: {
                            text: "Xác nhận",
                        },
                        no: {
                            text: "Đóng",
                            show: false,
                        },
                    },
                })
            }
        })

        // khi kết thúc cuộc gọi, nếu là XL thì kiểm tra
        $("body").on("hidden.bs.modal", "#modalMakeCall", function () {
            // kiểm tra : if listing là độc quyền + gần hết hạn độc quyền -> popup chọn trạng thái
            if (Window.jsDetailData.isGuaranteedExpired) {
                // nếu nó đã call roy, nhưng trạng thái vẫn đang là "Đang thương lượng" hoặc "Khác"
                // lúc này, isGuaranteedExpired vẫn là true -> hiển thị lại trạng thái cũ trc đó (nếu có)
                if (
                    Window.jsDetailData.relatedListingGuaranteedExpiredTracking
                ) {
                    const typeGuaranteedExpired = parseInt(
                        Window.jsDetailData
                            .relatedListingGuaranteedExpiredTracking.typeID
                    )
                    if (typeGuaranteedExpired == 224) {
                        // đang thương lượng độc quyền
                        $(_this.statusListingXLListId)
                            .val(224)
                            .trigger("change")
                    } else if (typeGuaranteedExpired == 227) {
                        // khác
                        $(_this.statusListingXLListId)
                            .val(227)
                            .trigger("change")
                        $("#differentContent").text(
                            Window.jsDetailData
                                .relatedListingGuaranteedExpiredTracking.note
                        )
                        $(_this.updateStatusListingXLModal)
                            .find(".differentContent-wrapper")
                            .show()
                    }
                }
                $(_this.updateStatusListingXLModal).modal()
            }
        })
        // action change status listing xl
        $("body")
            .off("change", _this.statusListingXLListId)
            .on("change", _this.statusListingXLListId, function (e) {
                e.preventDefault()
                const $modal = $(_this.updateStatusListingXLModal)

                const status = parseInt($(this).val())
                if (status == 227) {
                    // đang chọn loại khác, show textarea để note
                    // in dữ liệu trong textarea ra (nếu có)
                    $modal.find(".differentContent-wrapper").show()
                    $modal.find(".xl-contract-group").hide()
                } else if (status == 225) {
                    // đang chọn Đã gia hạn, hiển thị 2 fields ngày để chọn
                    $modal.find(".xl-contract-group").show()
                    $modal.find(".differentContent-wrapper").hide()
                } else {
                    $modal.find(".differentContent-wrapper").hide()
                    $modal.find(".xl-contract-group").hide()
                }
            })
        // action khi click Cập nhật status listing xl gần hết hạn
        $("body")
            .off("click", _this.updateStatusListingXLButton)
            .on("click", _this.updateStatusListingXLButton, function (e) {
                e.preventDefault()
                let status = $(_this.statusListingXLListId).val()
                    ? Number.parseInt($(_this.statusListingXLListId).val())
                    : null
                let statusId = null
                if (!hasValue(status)) {
                    posNotifyAlert({
                        type: "pos-notify-danger",
                        message: "Bạn chưa chọn trạng thái",
                    })
                    return false
                }
                statusId = $(_this.statusListingXLListId).select2("data")[0]
                    .statusId

                const data = {
                    rlistingId: Window.jsDetailData.rlistingId,
                    typeID: status,
                    note: null,
                    guaranteedSignedDate: null,
                    guaranteedExpiredDate: null,
                }

                if (status == 225) {
                    // đã gia hạn
                    if (
                        !hasValue(
                            $(_this.updateStatusListingXLModal)
                                .find("#xlContractFrom")
                                .val()
                        )
                    ) {
                        posNotifyAlert({
                            type: "pos-notify-danger",
                            message: "Bạn chưa chọn ngày ký hợp đồng",
                        })
                        return false
                    }
                    if (
                        !hasValue(
                            $(_this.updateStatusListingXLModal)
                                .find("#xlContractTo")
                                .val()
                        )
                    ) {
                        posNotifyAlert({
                            type: "pos-notify-danger",
                            message: "Bạn chưa chọn ngày hết hạn hợp đồng",
                        })
                        return false
                    }
                }

                switch (status) {
                    case 225: {
                        data.guaranteedSignedDate = $(
                            _this.updateStatusListingXLModal
                        )
                            .find("#xlContractFrom")
                            .val()
                            ? moment(
                                $(_this.updateStatusListingXLModal)
                                    .find("#xlContractFrom")
                                    .val(),
                                "DD/MM/YYYY"
                            ).unix() * 1000
                            : null
                        data.guaranteedExpiredDate = $(
                            _this.updateStatusListingXLModal
                        )
                            .find("#xlContractTo")
                            .val()
                            ? moment(
                                $(_this.updateStatusListingXLModal)
                                    .find("#xlContractTo")
                                    .val(),
                                "DD/MM/YYYY"
                            ).unix() * 1000
                            : null
                        break
                    }
                    case 227: {
                        data.note = $(_this.updateStatusListingXLModal)
                            .find("#differentContent")
                            .val()
                            ? $(_this.updateStatusListingXLModal)
                                .find("#differentContent")
                                .val()
                            : null
                        break
                    }
                }
                showPropzyLoading()
                _this.updateStatusListingXL(data)
            })
        //
        $("body").on("change", "#houseNumber", function (e) {
            e.preventDefault()
            updateAddress()

            return
        })

        $("body").on("change", "#guaranteedExpiredDateTo", function (e) {
            e.preventDefault()
            updateGuaranteedExpiredDate()
        })

        $("body").on("change", "#live-listing-type", function (e) {
            e.preventDefault()
            processGuaranteedExpiredDate()
        })

        $("body").on("change", "#guaranteedExpiredDate", function (e) {
            e.preventDefault()
            Window.sa.data.guaranteedExpiredDate($(this).val())
        })
        $("body").on("change", "#guaranteedSignedDate", function (e) {
            e.preventDefault()
            Window.sa.data.guaranteedSignedDate($(this).val())
        })

        $("body").on("change", "#streetId", function (e) {
            e.preventDefault()
            updateAddress()

            return
        })

        $("body").on("change", "#wardId", function (e) {
            e.preventDefault()
            updateAddress()

            return
        })

        $("body").on("change", "#districtId", function (e) {
            e.preventDefault()
            updateAddress()

            return
        })

        $("body")
            .off("click", _this.liveButton)
            .on("click", _this.liveButton, async function (e) {
                e.preventDefault()

                let error = false;
                $(".is-new-wrap").each(function() {
                    if ($(this).css("background-color") == "rgb(128, 128, 128)") {
                        error = true;
                        return false;
                    }
                });
                $(".file-preview-item").each(function() {
                    if ($(this).css("border-color") == "rgb(255, 0, 0)") {
                        error = true;
                        return false;
                    }
                });
                if (error) {
                    showPropzyAlert('Những nội dung chủ nhà yêu cầu cập nhật chưa được xử lý. Hãy xử lý trước khi lưu');
                    return false;
                }
                if (Window.sa.data.seller_drafts) {
                    //require action 7 infos
                    if ($("#bathRoomsDraft").css("visibility") == "visible" && $("#bathRoomsDraft").children().length
                    || $("#bedRoomsDraft").css("visibility") == "visible" && $("#bedRoomsDraft").children().length
                    || $("#numberFloorDraft").css("visibility") == "visible" && $("#numberFloorDraft").children().length
                    || $("#priceDraft").css("visibility") == "visible" && $("#priceDraft").children().length
                    || $("#alleyWidthDraft").css("visibility") == "visible" && $("#alleyWidthDraft").children().length
                    || $("#directionIdDraft").css("visibility") == "visible" && $("#directionIdDraft").children().length
                    || error
                    ) {
                        showPropzyAlert('Những nội dung chủ nhà yêu cầu cập nhật chưa được xử lý. Hãy xử lý trước khi lưu');
                        return false;
                    }
                }

                //propzy other services
                let propzy_services = [
                    {
                        "id": 1,
                        "name": "Dịch vụ Tư vấn pháp lý chuyên sâu",
                        "checked": $("#propzy_service_1").prop("checked")
                    },
                    {
                        "id": 2,
                        "name": "Dịch vụ Thẩm định giá",
                        "checked": $("#propzy_service_2").prop("checked")
                    },
                    {
                        "id": 3,
                        "name": "Dịch vụ Đăng tin Đặc biệt",
                        "checked": $("#propzy_service_3").prop("checked")
                    },
                    {
                        "id": 4,
                        "name": "Dịch vụ khác",
                        "checked": $("#propzy_service_4").prop("checked"),
                        "note": $("#propzy_service_4_input").val()
                    }
                ];
                
                $.ajax({
                    method: "PUT",
                    url: "/pos/sa/updatePropzyServices/"+  Window.sa.data.rlistingId(),
                    contentType: 'application/json',
                    dataType: "text",
                    data: JSON.stringify(propzy_services)
                })
                .done(function( code ) {
                });

                Window.validatorForSa.showValidator(
                    Window.validatorForSa.getTypeValudation().live
                )
                const validate = Window.validatorForSa.checkValidate()

                if (validate.isError) {
                    showPropzyAlert(
                        "Bạn chưa nhập đầy đủ thông tin hoặc thông tin chưa chính xác."
                    )
                    return false
                }

                function submitCreateListing() {
                    // check rule can not create listing if floorSize != width*length
                    let sizeLength = parseFloat(
                        $("#sizeLength").val().replace(/\,/g, "")
                    );
                    let sizeWidth = parseFloat($("#sizeWidth").val().replace(/\,/g, ""));
                    let floorSize = parseFloat($("#floorSize").val().replace(/\,/g, ""));
                    let lotSize = parseFloat($("#lotSize").val().replace(/\,/g, ""));

                    let minPrice = $("#price").val().replace(/\,/g, "");
                    let listingTypeId = $("#listingTypeId").val();
                    let propertyTypeId = $("#propertyTypeId").val();
                    let messageContent = "";
                    let messageContentArea = "";
                    if (listingTypeId == 1) {
                        messageContent = `${
                        NumberInputUtil.LISTING_BUY_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`;
                    } else if (listingTypeId == 2) {
                        messageContent = `${
                        NumberInputUtil.LISTING_HIRE_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`;
                    }

                    if (
                        minPrice &&
                        minPrice < NumberInputUtil.ONE_BILLION &&
                        listingTypeId == 1
                    ) {
                        // mua < 1 tỷ
                        showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                            text: "Xác nhận",
                            },
                            no: {
                            text: "Hủy",
                            },
                        },
                        okCallback: function () {
                            if (
                            (propertyTypeId == 13 || propertyTypeId == 14) &&
                            lotSize < NumberInputUtilArea.TEN_METER_AREA
                            ) {
                            // case đất nền/ đất nền dự án, sử dụng dt đất
                            messageContentArea = `${
                                NumberInputUtilArea.LISTING_SELL_LAND_AREA
                            }
                                        ${NumberInputUtilArea.numberToStringArea(
                                        "#lotSize",
                                        true,
                                        true
                                        )}`;
                            setTimeout(function () {
                                showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                    text: "Xác nhận",
                                    },
                                    no: {
                                    text: "Hủy",
                                    },
                                },
                                okCallback: function () {
                                    $(_this.liveListingModal).modal();
                                    getLiveType();
                                },
                                });
                            }, 500);
                            } else if (
                            floorSize &&
                            floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                            ) {
                            // case nhà riêng ..
                            messageContentArea = `${
                                NumberInputUtilArea.LISTING_SELL_USED_AREA
                            }
                                        ${NumberInputUtilArea.numberToStringArea(
                                        "#floorSize",
                                        true,
                                        true
                                        )}`;
                            setTimeout(function () {
                                showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                    text: "Xác nhận",
                                    },
                                    no: {
                                    text: "Hủy",
                                    },
                                },
                                okCallback: function () {
                                    $(_this.liveListingModal).modal();
                                    getLiveType();
                                },
                                });
                            }, 500);
                            } else {
                            $(_this.liveListingModal).modal();
                            getLiveType();
                            }
                        },
                        });
                    } else if (
                        minPrice &&
                        minPrice > NumberInputUtil.ONE_HUNDRED_MILLION &&
                        listingTypeId == 2
                    ) {
                        // thuê > 100 triệu
                        showPropzyConfirm({
                        message: messageContent,
                        btn: {
                            yes: {
                            text: "Xác nhận",
                            },
                            no: {
                            text: "Hủy",
                            },
                        },
                        okCallback: function () {
                            if (
                            (propertyTypeId == 13 || propertyTypeId == 14) &&
                            lotSize < NumberInputUtilArea.TEN_METER_AREA
                            ) {
                            // case đất nền/ đất nền dự án, sử dụng dt đất
                            messageContentArea = `${
                                NumberInputUtilArea.LISTING_HIRE_LAND_AREA
                            }
                                        ${NumberInputUtilArea.numberToStringArea(
                                        "#lotSize",
                                        true,
                                        true
                                        )}`;
                            setTimeout(function () {
                                showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                    text: "Xác nhận",
                                    },
                                    no: {
                                    text: "Hủy",
                                    },
                                },
                                okCallback: function () {
                                    $(_this.liveListingModal).modal();
                                    getLiveType();
                                },
                                });
                            }, 500);
                            } else if (
                            floorSize &&
                            floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                            ) {
                            // case nhà riêng ..
                            messageContentArea = `${
                                NumberInputUtilArea.LISTING_HIRE_USED_AREA
                            }
                                        ${NumberInputUtilArea.numberToStringArea(
                                        "#floorSize",
                                        true,
                                        true
                                        )}`;
                            setTimeout(function () {
                                showPropzyConfirm({
                                message: messageContentArea,
                                btn: {
                                    yes: {
                                    text: "Xác nhận",
                                    },
                                    no: {
                                    text: "Hủy",
                                    },
                                },
                                okCallback: function () {
                                    $(_this.liveListingModal).modal();
                                    getLiveType();
                                },
                                });
                            }, 500);
                            } else {
                            $(_this.liveListingModal).modal();
                            getLiveType();
                            }
                        },
                        });
                    } else if (
                        (propertyTypeId == 13 || propertyTypeId == 14) &&
                        lotSize < NumberInputUtilArea.TEN_METER_AREA
                    ) {
                        // case đất nền/ đất nền dự án, sử dụng dt đất
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA}
                            ${NumberInputUtilArea.numberToStringArea(
                            "#lotSize",
                            true,
                            true
                            )}`;
                        showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                            text: "Xác nhận",
                            },
                            no: {
                            text: "Hủy",
                            },
                        },
                        okCallback: function () {
                            $(_this.liveListingModal).modal();
                            getLiveType();
                        },
                        });
                    } else if (
                        floorSize &&
                        floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                    ) {
                        // case nhà riêng ..
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA}
                            ${NumberInputUtilArea.numberToStringArea(
                            "#floorSize",
                            true,
                            true
                            )}`;
                        showPropzyConfirm({
                        message: messageContentArea,
                        btn: {
                            yes: {
                            text: "Xác nhận",
                            },
                            no: {
                            text: "Hủy",
                            },
                        },
                        okCallback: function () {
                            $(_this.liveListingModal).modal();
                            getLiveType();
                        },
                        });
                    } else {
                        $(_this.liveListingModal).modal();
                        getLiveType();
                    }
                }

                // start check lat - long
                let dataCheckLatlong = {
                    latitude: parseFloat($('#latitude').val()),
                    longitude: parseFloat($('#longitude').val()),
                    wardId: parseInt($('#wardId').val()), 
                };
                await checkLatLong(dataCheckLatlong, submitCreateListing, hidePropzyLoading);
            })

        $("body")
            .off("click", _this.showMarketReportBtn)
            .on("click", _this.showMarketReportBtn, function (e) {
                e.preventDefault()
                /*if (!Window.sa.validation.marketReportValidate() || !Window.sa.validation.validate()) {
                showPropzyAlert('Bạn chưa nhập đầy đủ thông tin hoặc thông tin chưa chính xác.');
                return false;
            }*/
                ajaxStart()
                _this.update(Window.sa.data.statusId(), function (response) {
                    if (response.result) {
                        Window.sa.reminder.closeReminderLocal()
                        window.open(
                            "/pos/sa/market-report/" +
                            Window.sa.data.rlistingId()
                        )
                    } else {
                        showPropzyAlert(response.message, "Thông báo")
                    }
                    ajaxEnd()
                })
            })

        if (Window.jsRole == "edit") {
            $("body")
                .off("click", _this.valuationButton)
                .on("click", _this.valuationButton, function (e) {
                    e.preventDefault()
                    try {
                        Window.sa.field.fieldChangedByList.latitude = true
                        Window.sa.field.fieldChangedByList.longitude = true
                    } catch (e) {
                        //
                    }
                    Window.validatorForSa.showValidator(
                        Window.validatorForSa.getTypeValudation().valuation
                    )
                    const validate = Window.validatorForSa.checkValidate()

                    if (validate.isError) {
                        showPropzyAlert(
                            "Bạn chưa nhập đầy đủ thông tin hoặc thông tin chưa chính xác."
                        )
                        return false
                    }
                    ajaxStart()
                    _this.saveForValuation(function (response) {
                        if (response.result) {
                            bindCounter()
                            getValuation({
                                rlistingId: Window.sa.data.rlistingId(),
                            })
                        } else {
                            showPropzyAlert(response.message)
                        }
                        ajaxEnd()
                    })
                })
        } 
        // đăng tin
        $("body")
            .off("click", _this.liveListingButton)
            .on("click", _this.liveListingButton, function (e) {
                e.preventDefault()
                processGuaranteedExpiredDate()
                // validate
                if (Window.jsDetailData.liveType == 197) {
                    if (
                        !Window.sa.data.guaranteedSignedDate() ||
                        !Window.sa.data.guaranteedExpiredDate()
                    ) {
                        showPropzyAlert(
                            "Xin vui lòng nhập đầy đủ thời gian độc quyền và ngày ký độc quyền!"
                        )
                        return false
                    }
                    if (
                        moment().diff(
                            moment(
                                Window.sa.data.guaranteedSignedDate(),
                                "DD/MM/YYY"
                            ),
                            "days"
                        ) < 0
                    ) {
                        showPropzyAlert(
                            "Ngày ký độc quyền không được lớn hơn ngày hiện tại"
                        )
                        return false
                    }
                }
                ajaxStart()
                _this.live(function (response) {
                    if (response.result) {
                        bindCounter()
                        Window.sa.reminder.closeReminderLocal()
                        $(_this.liveListingModal).modal("hide")
                        _this.showConfirmBuyNewHouse()
                    } else {
                        showPropzyAlert(response.message, "Thông Báo")
                    }
                    ajaxEnd()
                })
            })

        // lưu và nhắc nhở
        $("body")
            .off("click", "#save-remind-btn")
            .on("click", "#save-remind-btn", async function (e) {
                e.preventDefault()
                /*if (!Window.sa.validation.validate()) {
                showPropzyAlert('Bạn chưa nhập đầy đủ thông tin hoặc thông tin chưa chính xác.');
                return false;
            }*/

                // check rule can not create listing if floorSize != width*length
                let sizeLength = parseFloat(
                    $("#sizeLength").val().replace(/\,/g, "")
                )
                let sizeWidth = parseFloat(
                    $("#sizeWidth").val().replace(/\,/g, "")
                )
                let floorSize = parseFloat(
                    $("#floorSize").val().replace(/\,/g, "")
                )
                let lotSize = parseFloat($("#lotSize").val().replace(/\,/g, ""))

                // if ( ($('#propertyTypeId').val() == 1 || $('#propertyTypeId').val() == 8)
                // && (sizeLength * sizeWidth).toFixed(2) != floorSize.toFixed(2)
                // && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
                //     // case chung cu/ can ho
                //     showPropzyAlert('Chiều dài * chiều rộng khác diện tích sử dụng')
                // } else if ( $('#propertyTypeId').val() != 1 && $('#propertyTypeId').val() != 8
                // && (sizeLength * sizeWidth).toFixed(2) != lotSize.toFixed(2)
                // && $('#sizeLength').val() != '' && $('#sizeWidth').val() != '' ) {
                //     // case nhà riêng ..
                //     showPropzyAlert('Chiều dài * chiều rộng khác diện tích đất')
                // } else {
                let minPrice = $("#price").val().replace(/\,/g, "")
                let listingTypeId = $("#listingTypeId").val()
                let propertyTypeId = $("#propertyTypeId").val()
                let messageContent = ""
                let messageContentArea = ""
                if (listingTypeId == 1) {
                    messageContent = `${NumberInputUtil.LISTING_BUY_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`
                } else if (listingTypeId == 2) {
                    messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`
                }

                function submitSaveRemindListing() {
                    if (
                        minPrice &&
                        minPrice < NumberInputUtil.ONE_BILLION &&
                        listingTypeId == 1
                    ) {
                        // mua < 1 tỷ
                        showPropzyConfirm({
                            message: messageContent,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                if (
                                    (propertyTypeId == 13 ||
                                        propertyTypeId == 14) &&
                                    lotSize < NumberInputUtilArea.TEN_METER_AREA
                                ) {
                                    // case đất nền/ đất nền dự án, sử dụng dt đất
                                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#lotSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                requestLoading.initCallback(1)
                                                _this.save(function (response) {
                                                    requestLoading.addCallbackToQueue()
                                                    if (response.result) {
                                                        bindCounter()
                                                        if (Window.jsRole == "create") {
                                                            Window.sa.reminder.reminderData.rlistingId =
                                                                response.data.rlistingId
                                                        }
                                                        Window.sa.reminder.closeReminderLocal()
                                                        $(
                                                            _this.createReminderModal
                                                        ).modal()
                                                    } else {
                                                        showPropzyAlert(
                                                            response.message
                                                        )
                                                    }
                                                })
                                            },
                                        })
                                    }, 500)
                                } else if (
                                    floorSize &&
                                    floorSize >
                                    NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                                ) {
                                    // case nhà riêng ..
                                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#floorSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                requestLoading.initCallback(1)
                                                _this.save(function (response) {
                                                    requestLoading.addCallbackToQueue()
                                                    if (response.result) {
                                                        bindCounter()
                                                        if (Window.jsRole == "create") {
                                                            Window.sa.reminder.reminderData.rlistingId = response.data.rlistingId
                                                        }
                                                        Window.sa.reminder.closeReminderLocal()
                                                        $(_this.createReminderModal).modal()
                                                    } else {
                                                        showPropzyAlert(
                                                            response.message
                                                        )
                                                    }
                                                })
                                            },
                                        })
                                    }, 500)
                                } else {
                                    requestLoading.initCallback(1)
                                    _this.save(function (response) {
                                        requestLoading.addCallbackToQueue()
                                        if (response.result) {
                                            bindCounter()
                                            if (Window.jsRole == "create") {
                                                Window.sa.reminder.reminderData.rlistingId = response.data.rlistingId
                                            }
                                            Window.sa.reminder.closeReminderLocal()
                                            $(_this.createReminderModal).modal()
                                        } else {
                                            showPropzyAlert(response.message)
                                        }
                                    })
                                }
                            },
                        })
                    } else if (
                        minPrice &&
                        minPrice > NumberInputUtil.ONE_HUNDRED_MILLION &&
                        listingTypeId == 2
                    ) {
                        // thuê > 100 triệu
                        showPropzyConfirm({
                            message: messageContent,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                if (
                                    (propertyTypeId == 13 ||
                                        propertyTypeId == 14) &&
                                    lotSize < NumberInputUtilArea.TEN_METER_AREA
                                ) {
                                    // case đất nền/ đất nền dự án, sử dụng dt đất
                                    messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#lotSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                requestLoading.initCallback(1)
                                                _this.save(function (response) {
                                                    requestLoading.addCallbackToQueue()
                                                    if (response.result) {
                                                        bindCounter()
                                                        if (Window.jsRole == "create") {
                                                            Window.sa.reminder.reminderData.rlistingId = response.data.rlistingId
                                                        }
                                                        Window.sa.reminder.closeReminderLocal()
                                                        $( _this.createReminderModal).modal()
                                                    } else {
                                                        showPropzyAlert(
                                                            response.message
                                                        )
                                                    }
                                                })
                                            },
                                        })
                                    }, 500)
                                } else if (
                                    floorSize &&
                                    floorSize >
                                    NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                                ) {
                                    // case nhà riêng ..
                                    messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#floorSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                requestLoading.initCallback(1)
                                                _this.save(function (response) {
                                                    requestLoading.addCallbackToQueue()
                                                    if (response.result) {
                                                        bindCounter()
                                                        if (
                                                            Window.jsRole ==
                                                            "create"
                                                        ) {
                                                            Window.sa.reminder.reminderData.rlistingId =
                                                                response.data.rlistingId
                                                        }
                                                        Window.sa.reminder.closeReminderLocal()
                                                        $(
                                                            _this.createReminderModal
                                                        ).modal()
                                                    } else {
                                                        showPropzyAlert(
                                                            response.message
                                                        )
                                                    }
                                                })
                                            },
                                        })
                                    }, 500)
                                } else {
                                    requestLoading.initCallback(1)
                                    _this.save(function (response) {
                                        requestLoading.addCallbackToQueue()
                                        if (response.result) {
                                            bindCounter()
                                            if (Window.jsRole == "create") {
                                                Window.sa.reminder.reminderData.rlistingId =
                                                    response.data.rlistingId
                                            }
                                            Window.sa.reminder.closeReminderLocal()
                                            $(_this.createReminderModal).modal()
                                        } else {
                                            showPropzyAlert(response.message)
                                        }
                                    })
                                }
                            },
                        })
                    } else if (
                        (propertyTypeId == 13 || propertyTypeId == 14) &&
                        lotSize < NumberInputUtilArea.TEN_METER_AREA
                    ) {
                        // case đất nền/ đất nền dự án, sử dụng dt đất
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA
                            }
                    ${NumberInputUtilArea.numberToStringArea(
                                "#lotSize",
                                true,
                                true
                            )}`
                        showPropzyConfirm({
                            message: messageContentArea,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                requestLoading.initCallback(1)
                                _this.save(function (response) {
                                    requestLoading.addCallbackToQueue()
                                    if (response.result) {
                                        bindCounter()
                                        if (Window.jsRole == "create") {
                                            Window.sa.reminder.reminderData.rlistingId =
                                                response.data.rlistingId
                                        }
                                        Window.sa.reminder.closeReminderLocal()
                                        $(_this.createReminderModal).modal()
                                    } else {
                                        showPropzyAlert(response.message)
                                    }
                                })
                            },
                        })
                    } else if (
                        floorSize &&
                        floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                    ) {
                        // case nhà riêng ..
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA
                            }
                    ${NumberInputUtilArea.numberToStringArea(
                                "#floorSize",
                                true,
                                true
                            )}`
                        showPropzyConfirm({
                            message: messageContentArea,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                requestLoading.initCallback(1)
                                _this.save(function (response) {
                                    requestLoading.addCallbackToQueue()
                                    if (response.result) {
                                        bindCounter()
                                        if (Window.jsRole == "create") {
                                            Window.sa.reminder.reminderData.rlistingId =
                                                response.data.rlistingId
                                        }
                                        Window.sa.reminder.closeReminderLocal()
                                        $(_this.createReminderModal).modal()
                                    } else {
                                        showPropzyAlert(response.message)
                                    }
                                })
                            },
                        })
                    } else {
                        requestLoading.initCallback(1)
                        _this.save(function (response) {
                            requestLoading.addCallbackToQueue()
                            if (response.result) {
                                bindCounter()
                                if (Window.jsRole == "create") {
                                    Window.sa.reminder.reminderData.rlistingId =
                                        response.data.rlistingId
                                }
                                Window.sa.reminder.closeReminderLocal()
                                $(_this.createReminderModal).modal()
                            } else {
                                showPropzyAlert(response.message)
                            }
                        })
                    }
                }

                let dataCheckLatlong = {
                    latitude: parseFloat($('#latitude').val()),
                    longitude: parseFloat($('#longitude').val()),
                    wardId: parseInt($('#wardId').val()), 
                };
                await checkLatLong(dataCheckLatlong, submitSaveRemindListing, hidePropzyLoading);
            })

        // lưu
        $("body")
            .off("click", "#save-btn")
            .on("click", "#save-btn", async function (e) {
                e.preventDefault()


                // check rule can not create listing if floorSize != width*length
                let sizeLength = parseFloat(
                    $("#sizeLength").val().replace(/\,/g, "")
                )
                let sizeWidth = parseFloat(
                    $("#sizeWidth").val().replace(/\,/g, "")
                )
                let floorSize = parseFloat(
                    $("#floorSize").val().replace(/\,/g, "")
                )
                let lotSize = parseFloat($("#lotSize").val().replace(/\,/g, ""))

                let minPrice = $("#price").val().replace(/\,/g, "")
                let listingTypeId = $("#listingTypeId").val()
                let propertyTypeId = $("#propertyTypeId").val()
                let messageContent = ""
                let messageContentArea = ""
                if (listingTypeId == 1) {
                    messageContent = `${NumberInputUtil.LISTING_BUY_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`
                } else if (listingTypeId == 2) {
                    messageContent = `${NumberInputUtil.LISTING_HIRE_PRICE
                        } ${NumberInputUtil.numberToText(minPrice)}`
                }

                if (
                    $("#position").val() != "" &&
                    $("#position").val() == 2 &&
                    ((parseInt(propertyTypeId) != 8 && listingTypeId == 1) ||
                        (parseInt(propertyTypeId) != 1 && listingTypeId == 2))
                ) {
                    let hasError = false
                    if ($("#roadFrontageDistance").val() === '') {
                        hasError = true
                    } else if (!$("#alleyType").val()) {
                        hasError = true
                    } else if (!$("#alleyId").val() || !$("#alleyWidth").val()) {
                        hasError = true
                    } else if (!$("#widthFrontWay-alley").val()) {
                        hasError = true
                    }
                    if (hasError) {
                        showPropzyAlert("Vui lòng nhập đầy đủ thông tin hẻm.")
                        return false
                    }
                }
                if (
                    $("#position").val() != "" &&
                    $("#position").val() == 1 &&
                    parseInt(propertyTypeId) != 8 &&
                    ((parseInt(propertyTypeId) != 8 && listingTypeId == 1) ||
                        (parseInt(propertyTypeId) != 1 && listingTypeId == 2))
                ) {
                    let isEnoughData = false
                    if (!($("#roadFrontageWidth").val() != "")) {
                        isEnoughData = true
                    }
                    if (isEnoughData) {
                        showPropzyAlert(
                            "Vui lòng nhập đầy đủ thông tin mặt tiền."
                        )
                        return false
                    }
                }

                function submitSaveListing() {
                    if (
                        minPrice &&
                        minPrice < NumberInputUtil.ONE_BILLION &&
                        listingTypeId == 1
                    ) {
                        // mua < 1 tỷ
                        showPropzyConfirm({
                            message: messageContent,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                if (
                                    (propertyTypeId == 13 ||
                                        propertyTypeId == 14) &&
                                    lotSize < NumberInputUtilArea.TEN_METER_AREA
                                ) {
                                    // case đất nền/ đất nền dự án, sử dụng dt đất
                                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#lotSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                ajaxStart()
                                                _this.save(function (response) {
                                                    showPropzyAlert(
                                                        response.message,
                                                        "Thông Báo",
                                                        function (e) {
                                                            if (response.result) {
                                                                bindCounter()
                                                                Window.sa.reminder.closeReminderLocal()
                                                                location.reload()
                                                            }
                                                        }
                                                    )
                                                    ajaxEnd()
                                                })
                                            },
                                        })
                                    }, 500)
                                } else if (
                                    floorSize &&
                                    floorSize >
                                    NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                                ) {
                                    // case nhà riêng ..
                                    messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#floorSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                ajaxStart()
                                                _this.save(function (response) {
                                                    showPropzyAlert(
                                                        response.message,
                                                        "Thông Báo",
                                                        function (e) {
                                                            if (response.result) {
                                                                bindCounter()
                                                                Window.sa.reminder.closeReminderLocal()
                                                                location.reload()
                                                            }
                                                        }
                                                    )
                                                    ajaxEnd()
                                                })
                                            },
                                        })
                                    }, 500)
                                } else {
                                    ajaxStart()
                                    _this.save(function (response) {
                                        showPropzyAlert(
                                            response.message,
                                            "Thông Báo",
                                            function (e) {
                                                if (response.result) {
                                                    bindCounter()
                                                    Window.sa.reminder.closeReminderLocal()
                                                    location.reload()
                                                }
                                            }
                                        )
                                        ajaxEnd()
                                    })
                                }
                            },
                        })
                    } else if (
                        minPrice &&
                        minPrice > NumberInputUtil.ONE_HUNDRED_MILLION &&
                        listingTypeId == 2
                    ) {
                        // thuê > 100 triệu
                        showPropzyConfirm({
                            message: messageContent,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                if (
                                    (propertyTypeId == 13 ||
                                        propertyTypeId == 14) &&
                                    lotSize < NumberInputUtilArea.TEN_METER_AREA
                                ) {
                                    // case đất nền/ đất nền dự án, sử dụng dt đất
                                    messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_LAND_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#lotSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                ajaxStart()
                                                _this.save(function (response) {
                                                    showPropzyAlert(
                                                        response.message,
                                                        "Thông Báo",
                                                        function (e) {
                                                            if (response.result) {
                                                                bindCounter()
                                                                Window.sa.reminder.closeReminderLocal()
                                                                location.reload()
                                                            }
                                                        }
                                                    )
                                                    ajaxEnd()
                                                })
                                            },
                                        })
                                    }, 500)
                                } else if (
                                    floorSize &&
                                    floorSize >
                                    NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                                ) {
                                    // case nhà riêng ..
                                    messageContentArea = `${NumberInputUtilArea.LISTING_HIRE_USED_AREA
                                        }
                                ${NumberInputUtilArea.numberToStringArea(
                                            "#floorSize",
                                            true,
                                            true
                                        )}`
                                    setTimeout(function () {
                                        showPropzyConfirm({
                                            message: messageContentArea,
                                            btn: {
                                                yes: {
                                                    text: "Xác nhận",
                                                },
                                                no: {
                                                    text: "Hủy",
                                                },
                                            },
                                            okCallback: function () {
                                                ajaxStart()
                                                _this.save(function (response) {
                                                    showPropzyAlert(
                                                        response.message,
                                                        "Thông Báo",
                                                        function (e) {
                                                            if (response.result) {
                                                                bindCounter()
                                                                Window.sa.reminder.closeReminderLocal()
                                                                location.reload()
                                                            }
                                                        }
                                                    )
                                                    ajaxEnd()
                                                })
                                            },
                                        })
                                    }, 500)
                                } else {
                                    ajaxStart()
                                    _this.save(function (response) {
                                        showPropzyAlert(
                                            response.message,
                                            "Thông Báo",
                                            function (e) {
                                                if (response.result) {
                                                    bindCounter()
                                                    Window.sa.reminder.closeReminderLocal()
                                                    location.reload()
                                                }
                                            }
                                        )
                                        ajaxEnd()
                                    })
                                }
                            },
                        })
                    } else if (
                        (propertyTypeId == 13 || propertyTypeId == 14) &&
                        lotSize < NumberInputUtilArea.TEN_METER_AREA
                    ) {
                        // case đất nền/ đất nền dự án, sử dụng dt đất
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_LAND_AREA
                            }
                    ${NumberInputUtilArea.numberToStringArea(
                                "#lotSize",
                                true,
                                true
                            )}`
                        showPropzyConfirm({
                            message: messageContentArea,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                ajaxStart()
                                _this.save(function (response) {
                                    showPropzyAlert(
                                        response.message,
                                        "Thông Báo",
                                        function (e) {
                                            if (response.result) {
                                                bindCounter()
                                                Window.sa.reminder.closeReminderLocal()
                                                location.reload()
                                            }
                                        }
                                    )
                                    ajaxEnd()
                                })
                            },
                        })
                    } else if (
                        floorSize &&
                        floorSize > NumberInputUtilArea.FIVE_HUNDRED_METER_AREA
                    ) {
                        // case nhà riêng ..
                        messageContentArea = `${NumberInputUtilArea.LISTING_SELL_USED_AREA
                            }
                    ${NumberInputUtilArea.numberToStringArea(
                                "#floorSize",
                                true,
                                true
                            )}`
                        showPropzyConfirm({
                            message: messageContentArea,
                            btn: {
                                yes: {
                                    text: "Xác nhận",
                                },
                                no: {
                                    text: "Hủy",
                                },
                            },
                            okCallback: function () {
                                ajaxStart()
                                _this.save(function (response) {
                                    showPropzyAlert(
                                        response.message,
                                        "Thông Báo",
                                        function (e) {
                                            if (response.result) {
                                                bindCounter()
                                                Window.sa.reminder.closeReminderLocal()
                                                location.reload()
                                            }
                                        }
                                    )
                                    ajaxEnd()
                                })
                            },
                        })
                    } else {
                        ajaxStart()
                        _this.save(function (response) {
                            showPropzyAlert(
                                response.message,
                                "Thông Báo",
                                function (e) {
                                    if (response.result) {
                                        bindCounter()
                                        Window.sa.reminder.closeReminderLocal()
                                        location.reload()
                                    }
                                }
                            )
                            ajaxEnd()
                        })
                    }
                }

                let dataCheckLatlong = {
                    latitude: parseFloat($('#latitude').val()),
                    longitude: parseFloat($('#longitude').val()),
                    wardId: parseInt($('#wardId').val()), 
                };
                await checkLatLong(dataCheckLatlong, submitSaveListing, hidePropzyLoading);

            })

        $("body")
            .off("click", _this.cancelButton)
            .on("click", _this.cancelButton, function (e) {
                e.preventDefault()
                if (Window.jsRole == "edit") {
                    $(_this.cancelListingModal).modal()
                } else {
                    if (Window.jsRole == "create") {
                        showPropzyConfirm({
                            message:
                                "Bạn có muốn xóa hết thông tin hay không ?",
                            okCallback: function () {
                                location.reload()
                            },
                        })
                    }
                }
            })
        if (Window.jsRole == "edit") {
            $(document)
                .off("click", _this.sendDIYButton)
                .on("click", _this.sendDIYButton, function (e) {
                    e.preventDefault()
                    ModalConfirm.showModal({
                        message: "Bạn muốn gửi tài khoản đăng nhập vào Propzy App và portal cho chủ tin đăng này!?",
                        onYes: function (modal) {
                            modal.modal("hide")
                            requestLoading.initCallback(1)
                            _this.sendDIY().done(function (response) {
                                requestLoading.addCallbackToQueue()
                                if (response.result) {
                                    showPropzyAlert(response.message, "Thông Báo", function (e) {
                                        Window.jsDetailData.ownerAppStatus.isSentApp = true
                                        const ownerAppStatus = Window.jsDetailData.ownerAppStatus
                                        const statusFormat = "Chủ nhà chỉ mới được tư vấn sử dụng Propzy app (Thời gian gởi TK gần nhất: %s)"
                                        ownerAppStatus.statusFormat = statusFormat.replace("%s", moment().format('D/MM/Y'))
                                        
                                        const sa = new SAField()
                                        sa.templateIsSentApp()
                                    })
                                }
                            })
                        },
                    })
                })
            $(document)
                .off("click", "#update-info-owner-btn")
                .on("click", "#update-info-owner-btn", async function (e) {
                    $("#update-info-owner-modal").modal()
                    if (!POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST) {
                        await POS_PROMISISE_API("COMMON_GET_CHANNEL_TYPE", {
                            type: 9,
                        })
                    }
                    let data = POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST.filter(
                        (it) => it.type == 9
                    )
                    if (data && data.length > 0) {
                        data = data[0].list
                    } else {
                        data = []
                    }

                    const html = []
                    data.map((img) => {
                        let item = ""
                        let optionsRange = [...Array(10).keys()]
                            .map((it) => {
                                return (
                                    '<option value="' +
                                    (it + 1) +
                                    '">' +
                                    (it + 1) +
                                    "</option>"
                                )
                            })
                            .join(" ")

                        item =
                            '<div class="row form-group">' +
                            '<div class="col-md-1">' +
                            '<label class="checkbox"><input type="checkbox" value="' +
                            img.id +
                            '" class="update-info-image-check"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label> ' +
                            "</div>" +
                            '<div class="col-md-3">' +
                            "<span>" +
                            img.name +
                            "</span>" +
                            "</div>" +
                            '<div class="col-md-6">' +
                            '<input type="text" class="form-control update-info-image-note" placeholder="Nhập ghi chú...">' +
                            "</div>" +
                            '<div class="col-md-2">' +
                            '<select class="form-control update-info-image-number">' +
                            optionsRange +
                            "</select>" +
                            "</div>" +
                            "</div>"
                        html.push(item)
                    })
                    $("#update-info-owner-modal")
                        .find("#update-info-owner-content")
                        .html(html.join(" "))
                })
            $(document)
                .off("click", "#send-update-info-owner-btn")
                .on("click", "#send-update-info-owner-btn", function (e) {
                    // choose option
                    const data = []
                    $(".update-info-image-check:checked").each(function (e) {
                        const object = {
                            categoryId: Number.parseInt($(this).val()),
                            note: $.trim(
                                $(this)
                                    .parents(".row")
                                    .find(".update-info-image-note")
                                    .val()
                            ),
                            requiredNumber: Number.parseInt(
                                $(this)
                                    .parents(".row")
                                    .find(".update-info-image-number")
                                    .val()
                            ),
                        }
                        data.push(object)
                    })
                    if (data.length > 0) {
                        if (Window.sa.data.rlistingId) {
                            const dataPost = {
                                rlistingId: Window.sa.data.rlistingId(),
                                socialUid: Window.sa.data.socialUid(),
                                imagesRequestDetails: data,
                            }
                            showPropzyLoading()
                            axios
                                .post(
                                    POS_APIS_SA.get(
                                        "UPDATE_REQUEST_INFO_IMAGE"
                                    ),
                                    dataPost
                                )
                                .then((xhr) => {
                                    const response = xhr.data
                                    hidePropzyLoading()
                                    if (response.result) {
                                        posNotifyAlert({
                                            type: "pos-notify-success",
                                            message: POS_MESSAGE.get(
                                                "UPDATE_REQUEST_INFO_IMAGE_SUCCESS"
                                            ),
                                        })
                                        setTimeout(function () {
                                            location.reload()
                                        }, 3000)
                                    } else {
                                        posNotifyAlert({
                                            type: "pos-notify-danger",
                                            message:
                                                POS_MESSAGE.get("PROCESS_ERR") +
                                                "<br> Do : " +
                                                response.message,
                                        })
                                    }
                                })
                                .catch((err) => {
                                    hidePropzyLoading()
                                    showErrLog(err)
                                })
                        } else {
                            posNotifyAlert({
                                type: "pos-notify-danger",
                                message: POS_MESSAGE.get(
                                    "UPDATE_REQUEST_INFO_IMAGE_VALID"
                                ),
                            })
                        }
                    } else {
                        posNotifyAlert({
                            type: "pos-notify-danger",
                            message: POS_MESSAGE.get(
                                "UPDATE_REQUEST_INFO_IMAGE_SUCCESS"
                            ),
                        })
                    }
                })
        }
        $(document)
            .off("click", _this.pushToOwner)
            .on("click", _this.pushToOwner, function (e) {
                e.preventDefault()
                requestLoading.initCallback(1)
                _this.pushToSAOwnerList().done(function (response) {
                    requestLoading.addCallbackToQueue()
                    showPropzyAlert(
                        response.message,
                        "Thông Báo",
                        function (e) {
                            Window.jsDetailData.pushedToOwnerList = true

                            const sa = new SAField()
                            sa.templateIsSentApp()
                        }
                    );
                })
            })
        $(document)
            .off("click", _this.resendId)
            .on("click", _this.resendId, function (e) {
                e.preventDefault()
                requestLoading.initCallback(1)
                _this.resend().done(function (response) {
                    requestLoading.addCallbackToQueue()
                    showPropzyAlert(response.message)
                })
            })
        $(document)
            .off("click", _this.unlockId)
            .on("click", _this.unlockId, function (e) {
                e.preventDefault()
                requestLoading.initCallback(1)
                _this.unlock().done(function (response) {
                    requestLoading.addCallbackToQueue()
                    showPropzyAlert(response.message)
                })
            })
        $("body")
            .off("click", "#wardId")
            .on("click", "#wardId", function (e) {
                e.preventDefault()
                _this.addNewStreet.wardId = parseInt($("#wardId").val())
            })
        $("body")
            .off("click", _this.addNewStreetBtnId)
            .on("click", _this.addNewStreetBtnId, function (e) {
                e.preventDefault()
                _this.addNewStreet.wardId = parseInt($("#wardId").val())
                _this.addNewStreet.addNewStreetModalId =
                    _this.addNewStreetModalId
                _this.addNewStreet.callback = function (response) {
                    $(_this.addNewStreetModalId).modal("hide")
                    showPropzyAlert(response.message)
                    if (response.result) {
                        $("#wardId").trigger("change")
                    }
                }
                _this.addNewStreet.showModal()
            })
        $(document).on("click", "#btn-agent-send-app", function (e) {
            e.preventDefault()
            const agentId = Window.sa.data.agentId()
            if (agentId) {
                showPropzyLoading()
                $("#btn-agent-send-app").prop("disabled", true)
                axios
                    .get(POS_APIS_AGENTS.get("AGENT_SEND_APP"), {
                        params: {
                            agentId: agentId,
                        },
                    })
                    .then((response) => {
                        hidePropzyLoading()
                        const resultsContent = response.data
                        if (resultsContent.result) {
                            posNotifyAlert({
                                type: "pos-notify-success",
                                message: "Đã gửi sms tới agent thành công",
                            })
                        } else {
                            posNotifyAlert({
                                type: "pos-notify-danger",
                                message: response.message,
                            })
                        }
                        $("#btn-agent-send-app").prop("disabled", false)
                    })
                    .catch((err) => {
                        hidePropzyLoading()
                        $("#btn-agent-send-app").prop("disabled", false)
                        showErrLog(err)
                    })
            } else {
                posNotifyAlert({
                    type: "pos-notify-danger",
                    message:
                        "Bạn không thể gửi sms tới agent do không tìm thấy agent id",
                })
            }
        })

        if (saPageRole != "create") {
            $("#tcid").prop("disabled", true)
        }

        $("body").on("click", ".convert", function (e) {
            var dataSend = {
                x: $("#x-longitude").val(),
                y: $("#y-latitude").val(),
            }
            if (dataSend.y.length == 0 || dataSend.x.length == 0) {
                alert("Dữ liệu không được để trống")
                return false
            }
            return $.ajax({
                url: POS_APIS_COMMON.get("GET_CONVERT_COORDINATE"),
                type: "POST",
                data: JSON.stringify(dataSend),
                success: function (response) {
                    if (response.result && response.data.length != 0) {
                        $("#latitude").val(response.data[1])
                        $("#longitude").val(response.data[0])
                        $("#latitude").trigger("change")
                        $("#longitude").trigger("change")
                    } else {
                        alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu")
                    }
                },
                error: function (error) {
                    alert("Đã có lỗi xảy ra. Không thể chuyển đổi dữ liệu")
                },
            })
        })
        $("body").on("keyup", "#planing-area", function (e) {
            Window.sa.data.planingArea($(this).val());
            $("#planing-area-other").html(Window.sa.data.planingAreaOther())
            $('label[for="planing-area"]').html(
                "Diện tích quy hoạch (" +
                Window.sa.data.planingAreaPercent() +
                ")"
            )
            $('label[for="planing-area-other"]').html(
                "Diện tích còn lại (" +
                Window.sa.data.planingAreaOtherPercent() +
                ")"
            )
        })
        $("body").on("keyup", "#lotSize", function (e) {
            Window.sa.data.lotSize($(this).val())
            $("#planing-area-other").html(Window.sa.data.planingAreaOther())
            $('label[for="planing-area"]').html(
                "Diện tích quy hoạch (" +
                Window.sa.data.planingAreaPercent() +
                ")"
            )
            $('label[for="planing-area-other"]').html(
                "Diện tích còn lại (" +
                Window.sa.data.planingAreaOtherPercent() +
                ")"
            )
        })
        $("body").on("change", "select", function (e) {
            const type = Window.validatorForSa.getTypeActive()
            Window.validatorForSa.showValidator(type)
        })

        $(document).on("change", "#campaignChecked", function (e) {
            e.preventDefault()
            const checked = $(this).is(":checked")
            if (checked) {
                $("#campaignId").prop("disabled", true)
                $("#campaignId").val("").trigger("change")
            } else {
                $("#campaignId").prop("disabled", false)
            }
            const type = Window.validatorForSa.getTypeActive()
            Window.validatorForSa.showValidator(type)
        })
    }

    async function bindCounter() {
        await _this.timer.done(function (callback) {
            let dataSend = {}
            dataSend.openedDate = callback.initTimeStamp
            dataSend.duration = callback.timer
            dataSend.rListingId = Window.jsDetailData.rlistingId
            $.ajax({
                url: "/time-counter/save-time-counter-sa",
                data: JSON.stringify(dataSend),
                type: "post",
            })
                .done(function (response) {
                })
                .fail(function (err) {
                })
        })
    }
}
