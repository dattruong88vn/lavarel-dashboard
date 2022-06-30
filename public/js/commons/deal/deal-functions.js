/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
try {
    jQuery.validator.addMethod("phoneValidate", function (value, element) {
        if (value == "") {
            return true;
        }
        return isPhoneNumber(value);
    }, "Số điện thoại không hợp lệ");
} catch (ex) { }

try {
    jQuery.validator.addMethod("validateNumber", function (value, element) {

        let strValue1 = value.toString().replace(/\,/g, '');
        let strValue2 = strValue1.toString().replace(/\./g, ',')

        let arrValue = strValue2.split(',')

        if (value == "" || arrValue[1] == 0) {
            return true;
        }
        return !isNaN(strValue2);
    }, "Số không hợp lệ");
} catch (ex) { }

try {
    jQuery.validator.addMethod("validateFixedPrice", function (value, element) {
        let finalBudget = $('#finalBudget').val().replace(/\,/g, '');
        let initialBudget = $('#initialBudget').val().replace(/\,/g, '');
        let currentValue = value.replace(/\,/g, '');

        if (value == "" || (parseInt(currentValue) <= parseInt(finalBudget) && parseInt(currentValue) >= parseInt(initialBudget))) {
            return true;
        }
        return false
    }, "Ngân sách đang có nằm ngoài khoảng giá khách tìm kiếm");
} catch (ex) { }

try {
    jQuery.validator.addMethod("validateMinMaxArea", function (value, element) {
        let minSize = $('#minSize').val().replace(/\,/g, '');
        let maxSize = $('#maxSize').val().replace(/\,/g, '');
        if (parseFloat(maxSize) < parseFloat(minSize)) {
            return false;
        }

        return true
    }, "Diện tích max không được nhỏ hơn diện tích min");
} catch (ex) { }

var DealFunctions = (function () {

    var validateOptions = {
        ignore: null,
        rules: {
            "customerName": {
                required: true,
                normalizer: function(value) {return $.trim(value);}
            },
            "customerPhone": {required: true, phoneValidate: true},
            "customerEmail": {email: true},
            "sourceId": {required: true},
            "subjectId": {required: true},
            "listingTypeId": {required: true},
            "propertyTypeGroup": {required: true},
            "districtIds[]": {required: true},
            "preferDistrict": {required: true},
            "propertyTypeId": {required: true},
            "propertyTypeGroup": {required: true},
            "initialBudget": {required: true},
            "finalBudget": {required: true},
            "initialBudgetFixed": {required: true, validateFixedPrice: true},
            "minSize": {required: true, validateNumber: true},
            "maxSize": {validateNumber: true, validateMinMaxArea: true},
            "position[positionId]": {required: true}
        },
        messages: {
            "customerName": {required: 'Nhập tên khách hàng'},
            "customerPhone": {required: 'Nhập số điện thoại'},
            "customerEmail": {email: 'Email không hợp lệ'},
            "sourceId": {required: "Chọn nguồn"},
            "subjectId": {required: "Chọn đối tượng"},
            "listingTypeId": {required: "Chọn hinh thức giao dịch"},
            "propertyTypeGroup": {required: "Chọn nhóm BĐS"},
            "districtIds[]": {required: "Chọn quận"},
            "preferDistrict": {required: "Chọn quận yêu thích"},
            "propertyTypeId": {required: "Chọn loại bất động sản"},
            "propertyTypeGroup": {required: "Chọn loại nhóm động sản"},
            "initialBudget": {required: 'Vui lòng chọn khoảng giá khách tìm kiếm'},
            "finalBudget": {required: 'Vui lòng chọn khoảng giá khách tìm kiếm'},
            "initialBudgetFixed": {required: 'Nhập ngân sách khách đang có'},
            "minSize": {required: 'Nhập diện tích min'},
            //            "maxSize": {required: 'Nhập diện tích max'},
            "position[positionId]": {required: 'Chọn vị trí'}
        },
        errorPlacement: function(label, element) {
            if ($('#' + $(element).attr('id') + ' + span').length > 0) {
                label.insertAfter('#' + $(element).attr('id') + ' + span').last()
            } else {
                label.insertAfter('#' + $(element).attr('id')).last()
            }
        },
    };

    function getPropertyTypes(listingTypeId) {
        var html = "<option value=''>N/A</option>";
        if (!listingTypeId) {
            $("#propertyTypeId").html(html).select2()
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: '/lso/get-property-type-list-prefix/' + listingTypeId,
            type: 'get'
        }).done(function (response) {
            for (i = 0; i < response.data.length; i++) {
                const item = response.data[i]
                let clsHighlight = ''
                if (!item.active) {
                    clsHighlight = 'data-highlight="highlight-disabled"'
                }
                html += `<option value="${item.propertyTypeId}" ${clsHighlight}>${item.prefixName}</option>`
            }

            $("#propertyTypeId").html(html).select2({
                templateResult: highlightDisabledItem,
                templateSelection: highlightDisabledItem
            })

        }).always(function () {
            hidePropzyLoading();
        });
    }

    function getPropertyTypeGroup(listingTypeId) {
        let html = "<option value=''>N/A</option>";
        if (!listingTypeId) {
            $("#propertyTypeGroup").html(html).select2();
            return false
        }

        showPropzyLoading();
        $.ajax({
            url: API_LIST.getRealEstateGroup,
            type: 'get'
        }).done(function (response) {
            for (i = 0; i < response.length; i++) {
                let selected = null
                const item = response[i]
                if (dataForRLDFuncs.propertyTypeGroup.id === item.id) {
                    selected = 'selected="selected"'
                }
                html += `<option value="${item.id}" ${selected}>${item.name}</option>`
            }
            $("#propertyTypeGroup").html(html).select2()
            return

        }).always(function () {
            hidePropzyLoading();
        });
    }

    function getListPropertyTypes(listingTypeId, groupId) {
        let html = "<option value=''>N/A</option>";
        if (!listingTypeId || !groupId) {
            $("#propertyTypeId").html(html).select2();
            return false
        }

        showPropzyLoading();
        $.ajax({
            url: API_LIST.getPropertyTypeV2 + "/" + groupId + "/" + listingTypeId,
            type: 'get'
        }).done(function (response) {
            for (i = 0; i < response.data.length; i++) {
                let selected = null
                const item = response.data[i]

                let disabled = ''
                if (!item.active) {
                    disabled = 'disabled'
                    // display error for disabled property type
                    if (item.propertyTypeId === dataForRLDFuncs.propertyType.propertyTypeID) {
                        let getNamePage = 'Deal'
                        if (window.location.pathname.indexOf('lead') > -1) {
                            getNamePage = 'Lead'
                        }
                        $('#error-propertyTypeId-wrapper').removeClass('hide')
                        $('#error-propertyTypeId-wrapper').html(`<p class='error'>Ghi chú: Loại hình BĐS "${item.typeName}" đã NGƯNG ÁP DỤNG. Vui lòng cập nhật loại hình BĐS cho ${getNamePage}</p>`)
                    }
                }
                
                if (dataForRLDFuncs.propertyType.propertyTypeID === item.propertyTypeId) {
                    selected = 'selected="selected"'
                }
                html += `<option value="${item.propertyTypeId}" ${selected} ${disabled} data-formId='${item.formId}'>${item.typeName}</option>`
            }
            $("#propertyTypeId").html(html).select2();
            // Load basic posistion & Amentities
            toggleBasicPosition();
            toggleAmenities();
            return

        }).always(function () {
            hidePropzyLoading();
        });
    }

    function getCardTypes() {
        var html = "<option value=''>--Tất cả nhãn--</option>";
        $("#scoreCardType").html(html).select2();
        showPropzyLoading();
        $.ajax({
            url: '/crm-dashboard/get-card-type',
            type: 'get'
        }).done(function (response) {
            if (response.result) {
                for (i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<option value='" + item.code + "'>" + item.name + "</option>";
                }
                $("#scoreCardType").html(html);
                $('#scoreCardType').val($("#btnChangeCardType").attr("data-card-type"));
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }

    function getAmedities(listingTypeId, propertyTypeId) {
        if (listingTypeId === "" || propertyTypeId === "") {
            $('#amenities').html("");
            return;
        }
        url = "/get-amenities/" + listingTypeId + "/" + propertyTypeId + '/' + level;
        get_sync(url, true, function (data) {
            var child = [];
            var tmpArr = [];
            $.each(data, function (index, value) {
                if (value.amenityChild.length == 0) {
                    tmpArr.push(value);
                } else {
                    child.push(value);
                }
            });
            child.sort(function (a, b) {
                return a.amenityChild.length - b.amenityChild.length
            });
            data = {};
            data.notChild = tmpArr;
            data.hasChild = child;

            if ($('#propertyTypeGroup').length > 0) {
                var template = $('#tien-ich-tmpl').html()
                var compiledTemplate = Template7.compile(template)

                $('#amenities').html(compiledTemplate(data))
                $('#amenities input').attr('name', 'amenityId[]')
            }
            return
        }, true);
    }

    function getAmeditiesByListingType(listingTypeId) {
        if (listingTypeId === "") {
            $('#amenities').html("");
            return;
        }
        url = "/common/get-amenities-by-listing-type?listingTypeId=" + listingTypeId;
        get_sync(url, true, function (response) {
            var child = [];
            var tmpArr = [];
            if(response.data !== null){
                $.each(response.data[0].list, function (index, value) {
                    if (value.childs.length == 0) {
                        tmpArr.push(value);
                    } else {
                        child.push(value);
                    }
                });
                child.sort(function (a, b) {
                    return a.childs.length - b.childs.length
                });
                data = {};
                data.notChild = tmpArr;
                data.hasChild = child;
    
    
                if ($('#propertyTypeGroup').length > 0) {
                    var template = $('#tien-ich-by-listing-type-tmpl').html();
                    var compiledTemplate = Template7.compile(template);
                    $('#amenities').html(compiledTemplate(data));
                    $('#amenities input').attr('name', 'amenityId[]');
                }

                hidePropzyLoading()
                return
            }
        }, true);
    }

    function initSelectBanks() {
        $("#customerBankIds").selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {

                    var currentPrefered = $("#preferBank").val().trim();
                    var isPrefered = "";
                    if (currentPrefered && data.value == currentPrefered) {
                        isPrefered = "prefered-item";
                    }
                    var returnVal = '<div> <span class="bank-prefer ' + isPrefered + '" ></span> ' + escape(data.text) + ' </div>';
                    return returnVal;
                }
            },
            create: false,
        });
        return false;
    }

    function initSelectDirections() {
        $("#directionIds").selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {

                    var currentPrefered = $("#preferDirection").val().trim();
                    var isPrefered = "";
                    if (currentPrefered && data.value == currentPrefered) {
                        isPrefered = "prefered-item";
                    }
                    var returnVal = '<div> <span class="direction-prefer ' + isPrefered + '" onclick="return setPreferDirection(this, ' + data.value + ')"><i class="fa fa-star" /></i></span> ' + escape(data.text) + ' </div>';
                    return returnVal;
                }
            },
            create: false,
            onItemRemove: function (data) {
                var id = $("#preferDirection").val();
                if (id == data) {
                    $("#preferDirection").val('');
                }
            },
            onItemAdd: function (value, item) {
                var currentPrefered = $("#preferDirection").val().trim();
                if (!currentPrefered) {
                    $(".direction-prefer").removeClass("prefered-item");
                }
            }
        });
        return false;
    }

    function initSelectDistricts() {
        $("#districtIds").selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {
                    var currentPrefered = $("#preferDistrict").val().trim();
                    var isPrefered = "";
                    if (currentPrefered && data.value.split('-')[0] == currentPrefered) {
                        isPrefered = "prefered-item";
                    }
                    var returnVal = '<div> <span class="district-prefer ' + isPrefered + '" onclick="return setPreferDistrict(this, ' + data.value.split('-')[0] + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                    return returnVal;
                }
            },
            create: false,
            onItemRemove: function (data) {
                var arr = data.split('-');
                var id = arr[0];
                var name = arr[1];
                $('#wardGenerate div[districtName="' + name + '"]').remove();
                $('.ward-prefer').removeClass('prefered-item');
                $('#preferWard').val('');
                var idInput = $("#preferDistrict").val();
                if (idInput == id) {
                    $("#preferDistrict").val('');
                }
            },
            onItemAdd: function (value, item) {
                var currentPrefered = $("#preferDistrict").val().trim();
                if (!currentPrefered) {
                    $(".district-prefer").removeClass("prefered-item");
                }
            }
        });
        return false;
    }

    function initSelectWards() {
        $(".wardIds").selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {
                    var currentPrefered = $("#preferWard").val().trim();
                    var isPrefered = "";
                    alert(data.value);
                    if (currentPrefered && data.value == currentPrefered) {
                        isPrefered = "prefered-item";
                    }
                    var returnVal = '<div> <span class="district-prefer ' + isPrefered + '" onclick="return setPreferDistrict(this, ' + data.value + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                    return returnVal;
                }
            },
            create: false,
            onItemRemove: function (data) {
                var id = $("#preferDistrict").val();
                if (id == data) {
                    $("#preferDistrict").val('');
                }
            },
            onItemAdd: function (value, item) {
                var currentPrefered = $("#preferDistrict").val().trim();
                if (!currentPrefered) {
                    $(".district-prefer").removeClass("prefered-item");
                }
            }
        });
        return false;
    }

    function WardIdDom(id) {
        $(id).selectize({
            plugins: ['remove_button'],
            render: {
                item: function (data, escape) {
                    var currentPrefered = $("#preferWard").val().trim();
                    var isPrefered = "";
                    if (currentPrefered && data.value == currentPrefered) {
                        isPrefered = "prefered-item";
                    }
                    var returnVal = '<div> <span class="ward-prefer ' + isPrefered + '" onclick="return setPreferWards(this, ' + data.value + ')"><i class="fa fa-star" /></i></span> ' + data.text + '</div>';
                    return returnVal;
                }
            },
            create: false,
            onItemRemove: function (data) {
                var id = $("#preferDistrict").val();
                if (id == data) {
                    $("#preferDistrict").val('');
                }
            },
            onItemAdd: function (value, item) {
                var currentPrefered = $("#preferDistrict").val().trim();
                if (!currentPrefered) {
                    $(".district-prefer").removeClass("prefered-item");
                }
            }
        });
        return false;
    }

    function togglePropertyType() {
        const listingTypeValue = $("#listingTypeId").val()
        const propertyTypeGroupValue = $('#propertyTypeGroup').val()

        let disabled = false
        let html = "<option value=''>N/A</option>";
        if (listingTypeValue) {
            // check whether existing propertyTypeGroup 
            if ($('#propertyTypeGroup').length > 0) {
                // get default disabled if has propertyTypeGroup
                disabled = true
                if (propertyTypeGroupValue) {
                    disabled = false
                }
                getListPropertyTypes(listingTypeValue, propertyTypeGroupValue)
            } else {
                getPropertyTypes(listingTypeValue)
            }
        }

        $("#propertyTypeId").prop('disabled', disabled)
        $('#propertyTypeId').html(html).select2()
    }
    const toggleFieldsByListingType = (listingTypeValue) => {
        let isShow = 'none'
        if ($('div.customerEvaluatedGroup')) {
            if (listingTypeValue == 1) {
                isShow = 'block'
            }
            $('div.customerEvaluatedGroup').css('display', isShow)
        }
    }
    function initSelectListingTypes() {
        // init fields
        toggleFieldsByListingType($("#listingTypeId").val())

        $(document.body).on('change',"#listingTypeId",function (e) {
            e.preventDefault()
            
            const listingTypeId = $(this).val()
            togglePropertyType()

            getAmeditiesByListingType(listingTypeId)
            //getAmedities(listingTypeId, propertyTypeId);

            toggleFieldsByListingType(listingTypeId)

            return
        })
    }

    function initSelectPropertyTypeGroup() {
        $("#propertyTypeGroup").change(function () {
            togglePropertyType()
            
            return
        });
    }

    function initSelectPropertyTypes() {
        let disabled = false
        if (!dataForRLDFuncs.listingTypeId || !dataForRLDFuncs.propertyTypeGroup.id) {
            disabled = true
        }
        $("#propertyTypeId").prop('disabled', disabled)
        
        $("#propertyTypeId").change(function () {
            toggleBasicPosition();
            toggleAmenities();

            if (!$("#error-propertyTypeId-wrapper").hasClass('hide')) {
                $("#error-propertyTypeId-wrapper").html('')
            }
        });
    }

    var toggleBasicPosition = function () {
        //getAmedities(listingTypeId, propertyTypeId);
        const form = getCurrentForm();
        const { position } = form;
        if (position) {
            $("#display-basic-position").show();
        } else {
            clearForm($(".formReset"));
            $("#display-basic-position").hide();
        }
    }

    function toggleAmenities() {
        const form = getCurrentForm();
        const { amenities } = form;
        if (amenities) {
            const listingTypeId = $("#listingTypeId").val();
            getAmeditiesByListingType(listingTypeId);
            $("#display-amenities").show();
        } else {
            $('#amenities').html("");
            $("#display-amenities").hide();
        }
    }

    function initSelectPosition() {
        $(".alley-detail-group").hide();
        $("#positionId").change(function () {
            var id = $(this).val();
            if (id == 1) {
                $("#display-front").show();
                $("#display-alley").hide();
            } else {
                $("#display-front").hide();
                $("#display-alley").show();
            }
        });
    }

    function initSelectSource() {
        var sourceId = parseInt($("#sourceId").val());
        switch (sourceId) {
            case 7:
                $("#sourceOther").show();
                break;
            case 17:
                $('#sourceTCId').show();
                $('#sourceTCId option[value=' + dataForRLDFuncs.sourceTCId + ']').attr('selected', 'selected');
            default:
                break;
        }
        $("#sourceId").change(function () {
            // alert('goallll')
            var sourceId = $(this).val();
            $("#sourceOther").val("");
            if (parseInt(sourceId) == 7) {
                $("#sourceOther").show();
            } else {
                $("#sourceOther").hide();
            }

            if (parseInt(sourceId) == 17) {
                $('#sourceTCId').show();
            } else {
                $('#sourceTCId').hide();
            }
        });

    }

    function initSelectCardTypes() {
        getCardTypes();
        $('#scoreCardType').val("");
    }

    function initCoreForm() {
        initSelectDistricts();
        initSelectBanks();
        initSelectDirections();
        initSelectListingTypes();
        initSelectPropertyTypeGroup();
        initSelectPropertyTypes();
        initSelectCardTypes();
        initSelectPosition();
        initSelectSource();
        $("#minSize").attr("placeholder", "###.##");
        $("#maxSize").attr("placeholder", "###.##");
        $("#moveInDate").datepicker({
            'startDate': '0 days'
        });
        $("#customerIdCardIssueDate").datepicker({
            'endDate': '0 days'
        });
        $("#customerPartnerIdCardIssueDate").datepicker({
            'endDate': '0 days'
        });
        $('#customerIdCard').mask("#", {reverse: true});
        $('#customerPartnerIdCard').mask("#", {reverse: true});
        $('#initialBudget').mask("#,##0", {reverse: true});
        $('#finalBudget').mask("#,##0", {reverse: true});
        $('#initialBudgetFixed').mask("#,##0", {reverse: true});
        $("#positionId").trigger("change");

        getPropertyTypeGroup(dataForRLDFuncs.listingTypeId)
        getListPropertyTypes(dataForRLDFuncs.listingTypeId, dataForRLDFuncs.propertyTypeGroup.id)
    }


    function makeCall(config) {
        CCall.makeCall({
            "phoneNumber": config.phoneNumber,
            "dealId": config.dealId,
            "leadId": config.leadId,
            "onCallEnded": function (callInfo) {
                $('body').css('pointer-events', 'auto');
                ModalUpdateCall.showModal({
                    type: config.type,
                    dealId: config.dealId,
                    leadId: config.leadId,
                    duration: callInfo.duration,
                    resultCallId: callInfo.duration <= 0 ? 1 : 9999,
                    receiverPhone: config.phoneNumber,
                    config: {
                        onSaved: function (response) {
                            updateViewDetailRealTime();
                            if (response.data.numberOfFailedCall >= 3) {
                                closePropzyAlert();
                                var leadOrDeal = "lead";
                                if (config.dealId) {
                                    leadOrDeal = "deal";
                                }
                                ModalConfirm.showModal({
                                    message: "Bạn có muốn hủy " + leadOrDeal + " này?",
                                    onYes: function (modal) {

                                        ModalUpdateStatusPendingReason.showModal({
                                            "postData": {
                                                "typeNeedName": leadOrDeal,
                                                "needId": config.dealId ? config.dealId : config.leadId,
                                                "progressQuoId": 3,
                                                "isSet": true
                                            }
                                        });
                                    },
                                    onNo: function (modal) {
                                    }
                                });
                            }
                        }
                    }
                });
            },
            showLoading: false
        });

    }

    var setDefaultCrms = function (items, currentId) {
        var html = "";
        if (items.length > 1) {
            html = "<option value='' >Chọn người phụ trách meeting</option>";
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            html += "<option value='" + item.userId + "' " + (item.userId == currentId ? "selected" : "") + " >" + item.name + " " + (item.availableTime ? " - " + item.availableTime : "") + "</option>";
        }
        modalCreateMeeting.find(".assignTo").html(html).select2();
    }

    var updateViewDetailRealTime = function () {
        try {
            generateTableListingAtDetail(); // request lại datatable
            JMDetail.countTabFollowing(); // đếm lại tab
            JMDetail.renderProgressList(); // render lại cây tiến độ
        } catch (ex) {
        }
    }

    var validCampaign = function () {
        if (!$('#check_campaignId').is(':checked')) { // không check là bắt buộc nhập campaignId
            if ($('#campaignId').val().trim() == '') {
                showPropzyAlert('Vui lòng nhập CampaignID hoặc check vào không có CampaignID');
                $('html, body').animate({
                    scrollTop: $("#campaignId").offset().top
                }, 2000);
                $("#campaignId").css('border', '1px solid red');
                setTimeout(function () {
                    $("#campaignId").css('border', '1px solid #d2d6de');
                }, 5000);
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }


    return {
        "validCampaign": validCampaign,
        "WardIdDom": WardIdDom,
        "initSelectWards": initSelectWards,
        "initSelectDirections": initSelectDirections,
        "initSelectDistricts": initSelectDistricts,
        "initSelectListingTypes": initSelectListingTypes,
        "initSelectPropertyTypes": initSelectPropertyTypes,
        "initSelectCardTypes": initSelectCardTypes,
        "initSelectBanks": initSelectBanks,
        "getAmedities": getAmedities,
        "getPropertyTypes": getPropertyTypes,
        "getPropertyTypeGroup": getPropertyTypeGroup,
        "getListPropertyTypes": getListPropertyTypes,
        "getCardTypes": getCardTypes,
        "initSelectPosition": initSelectPosition,
        "initCoreForm": initCoreForm,
        "validateOptions": validateOptions,
        "makeCall": makeCall,
        "setDefaultCrms": setDefaultCrms,
        "updateViewDetailRealTime": updateViewDetailRealTime
    };
})();

function setPreferDistrict(selector, id) {
    // reset wards
    $('.ward-prefer').removeClass('prefered-item');
    $('#preferWard').val('');
    // \ reset wards
    $(".district-prefer").removeClass('prefered-item');
    $("#preferDistrict").val(id);
    $(selector).addClass('prefered-item');
    return false;
}

function setPreferWards(selector, id) {
    var preferDistrict = $('#preferDistrict').val();
    if (preferDistrict == '') {
        alert('Cần chọn 1 quận yêu thích');
        return false;
    }

    var idDistrictWardPrefer = $(selector).parents().eq(3).prev().val();
    if (preferDistrict == idDistrictWardPrefer) {
        $(".ward-prefer").removeClass('prefered-item');
        $("#preferWard").val(id);
        $(selector).addClass('prefered-item');
    } else {
        alert('Phường yêu thích phải thuộc quận yêu thích');
        // $.confirm({
        //     title: 'Lưu ý!',
        //     content: 'Bạn có muốn thay đổi quận yêu thích?',
        //     buttons: {
        //         confirm: function () {
        //             $.alert('Confirmed!');
        //         },
        //         cancel: function () {
        //             $.alert('Canceled!');
        //         },
        //         somethingElse: {
        //             text: 'Something else',
        //             btnClass: 'btn-blue',
        //             keys: ['enter', 'shift'],
        //             action: function(){
        //                 $.alert('Something else?');
        //             }
        //         }
        //     }
        // });
    }
    return false;
}

function setPreferDirection(selector, id) {
    $(".direction-prefer").removeClass('prefered-item');
    $("#preferDirection").val(id);
    $(selector).addClass('prefered-item');
    return false;
}


function formatTime(value) {
    value = parseInt(value + "");
    var returnValue = "";
    var hour = 0;
    var minute = 0;
    if (value > 60) {
        hour = Math.floor(value / 60);
    }
    minute = value - hour * 60;
    if (hour > 0) {
        returnValue = hour + " tiếng ";
    }
    returnValue += minute + " phút";
    return returnValue;
}


var renderDistance = function (data, type, object) {
    if (data == null) {
        return "";
    }
    var returnValue = "<input class='estimatedDistance-" + object.rlistingId + "' type='hidden' value='" + data + "' />" + data;
    return returnValue;
};
var renderDuration = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "<input class='estimatedTime-" + object.rlistingId + "' type='hidden' value='" + data + "' />" + Math.ceil(data / 60);
    return returnValue;
};


var renderListingNote = function (data, type, object) {

    for (var i = 0; i < oldListings.length; i++) {
        var item = oldListings[i];
        if (item.rlistingId == object.rlistingId) {
            object.note = item.note;
            break;
        }
    }
    if (!object.note) {
        object.note = "";
    }
    return "<input type='text' class='listingNote listingNote-" + object.rlistingId + "' data-rlistingId='" + object.rlistingId + "' value='" + object.note + "' />";
};

if ($('#districtIds').val() != null) {
    renderWardsSelect($('#districtIds').val())
}

$('#districtIds').on('change', function () {
    renderWardsSelect($(this).val());
})

function renderWardsSelect(valueDistrict) {
    if (valueDistrict != null) {
        $.each(valueDistrict, function (k, v) {
            var arr = v.split('-');
            var id = arr[0];
            var name = arr[1];
            if ($('#wardGenerate div[districtName="' + name + '"]').length == 0) {
                var wardGenerateHtml = '<input class="idDistrict" type="hidden" value="' + id + '"/><div districtName="' + name + '" class="col-md-6"><h5 style="text-align: center;background-color: darkgray;color: white;font-weight: bold;margin-bottom: 0px;">' + name + '</h5><select class="wardIds" id="wardId' + id + '" name="wardIds[]" multiple="multiple">';
                $.ajax({
                    url: '/common/getWards/' + id,
                    type: 'get'
                }).done(function (response) {
                    var wardList = response.data;
                    $.each(wardList, function (key, value) {
                        wardGenerateHtml += '<option value="' + value.wardId + '">' + value.wardName + '</option>';
                    })
                    wardGenerateHtml += '</select></div>'
                    $('#wardGenerate').append(wardGenerateHtml);
                    DealFunctions.WardIdDom("#wardId" + id);
                })

            }
        })
    }
}

const getCurrentForm = () => {
    const formId = $('#propertyTypeId').find(':selected').attr('data-formId');
    return getFormById(formId); 
}

const getFormById = (id) => {
    const list = [
        {id: 0, position: false, amenities: false},
        {id: 1, position: false, amenities: true},
        {id: 2, position: true, amenities: true},
        {id: 3, position: true, amenities: true},
        {id: 4, position: false, amenities: true},
        {id: 5, position: true, amenities: false},
        {id: 6, position: false, amenities: false},
        {id: 7, position: false, amenities: true},
        {id: 8, position: true, amenities: true},
        {id: 9, position: true, amenities: true},
        {id: 10, position: false, amenities: true},
        {id: 11, position: true, amenities: true},
        {id: 12, position: true, amenities: true},
        {id: 13, position: false, amenities: true},
        {id: 14, position: false, amenities: true},
        {id: 15, position: false, amenities: true},
        {id: 16, position: false, amenities: true},
        {id: 17, position: false, amenities: true},
        {id: 18, position: true, amenities: true},
        {id: 19, position: true, amenities: false},
        {id: 20, position: false, amenities: true},
        {id: 21, position: true, amenities: true},
        {id: 22, position: false, amenities: true},
        {id: 23, position: false, amenities: true},
        {id: 24, position: false, amenities: true},
        {id: 25, position: false, amenities: true},
        {id: 26, position: false, amenities: true},
        {id: 27, position: true, amenities: false}
    ];
    const result = list.find((item) => item.id == id);
    return result ? result : list[0];
}

const highlightDisabledItem = (item) => {
    // Found a note in the Select2 formums on how to get the item to be selected

    if (!item.id) { return item.text }

    let $item = item.text
    if ($(item.element).data('highlight')) {
        $item = $('<span style="color: #ccc">' + item.text + '</span>')
    }

    return $item
}