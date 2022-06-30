/*
* 0 : Số tầng
* 1 : Hướng
* 2 : Phòng ngủ
* 3 : Phòng tắm
* 4 : Mặt tiền
* 5 : Hẻm
* 6 : Đã thuê, Đã bán, Đã thẩm định, Đặc biệt
* 7 : ListingType
* 8 : Yearbuild
* 9 : TypePrice
* 10 : Diện tích
* 11: ward
*/
var logicDisplayAdvancedFilter = {
    //Id bất động sản: [Số tầng, Hướng, Phòng ngủ, Phòng tắm, Mặt Tiền, Hẻm, Đã Thuê, ListingType, YearBuild, TypePrice, Diện tích, ward]
    "0": [true, true, true, true, true, true, true, true, false, false, true, true],
    "1": [false, true, true, true, false, false, true, true, false, false, true, true], // 1 : thuê chung cư căn hộ
    "2": [true, true, true, true, true, true, true, true, false, false, true, true], // 2: thuê nhà riêng
    "8": [false, true, true, true, false, false, true, true, false, false, true, true], // 8: mua chung cư căn hộ
    "11": [true, true, true, true, true, true, true, true, false, false, true, true], // 11: mua nhà riêng
    "13": [false, true, false, false, true, true, true, true, false, false, true, true], // 13: mua đất nền
    "14": [false, true, false, false, true, true, true, true, false, false, true, true], // 14: mua đất nền dự án
    "99": [false, false, false, false, false, false, false, false, true, true, false, false]// 99 : tự đặt cho Dự án
};
var logic = selectValuables[listingTypeId][0].propertyTypeId;
if (logic !== null) {
    var currentLogicFilter = logicDisplayAdvancedFilter[logic];
} else {
    var currentLogicFilter = logicDisplayAdvancedFilter[0];
}

if ((typeof options != "undefined" && typeof options.propertyList != "undefined")) {
    if(options.propertyList == '1,2,11,13,8,14' || options.propertyList == '1,2' || options.propertyList == '11,13,8,14'){
        currentLogicFilter = logicDisplayAdvancedFilter[99];
    } else {
        if (options.propertyList !== null) {
            currentLogicFilter = logicDisplayAdvancedFilter[options.propertyList];
        } else {
            currentLogicFilter = logicDisplayAdvancedFilter[0];
        }
    }
}

function renderPriceValue(value) {
    var unit;
    if (value > 999999999) {
        unit = "ty";
        value = value / 1000000000;
    } else if (value > 999999) {
        unit = "trieu";
        value = value / 1000000;
    }
    return value + unit;
};

var renderPriceNotUnit = function(value){
    if(value > 999999999) {
        value = value / 1000000000;
    }
    else if(value > 999999) {
        value = value / 1000000;
    }
    else {
        value = value / 1000;
    }

    if(value)
        return value;
    return false;
};

// render param theo url query
function renderParams() {
    var dataForm = App.UI.objectifyForm($('#form-search-buy'));
    
    // price slug
    var priceSlug = false;
    if($('#select-price option:selected').data('max-price') != 0){
        var priceFrom = renderPriceValue($('#select-price option:selected').data('min-price'));
        var priceTo = renderPriceValue($('#select-price option:selected').data('max-price'));

        if(priceFrom.length!=0 && priceTo.length!=0){
            priceSlug = priceFrom + "-" + priceTo;
        } else if(priceFrom.length==0 && priceTo.length!=0){
            priceSlug = 0 + "-" + priceTo;
        } else if(priceFrom.length!=0 && priceTo.length==0){
            priceSlug = priceFrom;
        }
        if(priceSlug){
            priceSlug = priceSlug.replace("ty-", "-").replace("trieu-", "-").replace("ngan-", "-").trim();
        }
        $.query = priceSlug ? $.query.set("gia", priceSlug) : $.query.remove("gia");
    } else {
        $.query = $.query.remove("gia");
    }
    
    // Tạo size slug
    if (currentLogicFilter[10] && $('#select-size option:selected').data('max-size') != 0) {
        var sizeSlug = false;
        var sizeFrom = ($('#select-size option:selected').data('min-size'));
        var sizeTo = ($('#select-size option:selected').data('max-size'));

        if(sizeFrom.length!=0 && sizeTo.length!=0){
            sizeSlug = sizeFrom + "-" + sizeTo;
        } else if(sizeFrom.length==0 && sizeTo.length!=0){
            sizeSlug = 0 + "-" + sizeTo;
        } else if(sizeFrom.length!=0 && sizeTo.length==0){
            sizeSlug = sizeFrom;
        }
        $.query = sizeSlug ? $.query.set("dientich", sizeSlug) : $.query.remove("dientich");
    } else {
        $.query = $.query.remove("dientich");
    }
    
    /* Tạo slug cho Tầng */
    if (currentLogicFilter[0]) {
        $.query = (parseInt(dataForm.floor_value) > -1 && dataForm.floor_value != 0) ? $.query.set("tang", dataForm.floor_value) : $.query.remove("tang");
    }

    /* Tạo slug cho Hướng */
    if (currentLogicFilter[1]) {
        $.query = (typeof dataForm.direction != "undefined" && dataForm.direction.length != 0 && dataForm.direction[0] != '') ? $.query.set("huong", dataForm.direction.join(',')) : $.query.remove("huong");
    }

    /* Tạo slug cho Phòng ngủ */
    if (currentLogicFilter[2]) {
        $.query = (parseInt(dataForm.bed_value) > -1 && dataForm.bed_value != 0) ? $.query.set("phongngu", dataForm.bed_value) : $.query.remove("phongngu");
    }

    /* Tạo slug cho Phòng tắm */
    if (currentLogicFilter[3]) {
        $.query = (parseInt(dataForm.bath_value) > -1 && dataForm.bath_value != 0) ? $.query.set("phongtam", dataForm.bath_value) : $.query.remove("phongtam");
    }

    /* Tạo slug đã bán, đã thuê, đã thẩm định */
    if (currentLogicFilter[6]) {
        if (typeof dataForm.status_listing != "undefined") {
            $.query = (typeof dataForm.status_listing != "undefined" && dataForm.status_listing.length != 0) ? $.query.set("statusListing", dataForm.status_listing.join(',')) : $.query.remove("statusListing");
        } else {
            $.query = $.query.remove("statusListing");
        }
    }
    
    /* Là độc quyền */
    if (typeof dataForm.monopoly_listing != "undefined") {
        $.query = $.query.set("isGuaranteed", 1);
    } else {
        $.query = $.query.remove("isGuaranteed");
    }

    /* Tạo slug cho Mặt tiền - Hẻm  : 0 - mặt tiền; 1 - hẻm*/
    if (currentLogicFilter[4]) {
        if (typeof dataForm.is_front_alley != "undefined" && dataForm.is_front_alley === "0") {
            $.query = $.query.set("isRoadFront", 1);
        } else {
            $.query = $.query.remove("isRoadFront");
        }
    }
    
    // hẻm
    if (currentLogicFilter[5]) {
        if (typeof dataForm.is_front_alley != "undefined" && dataForm.is_front_alley === "1") {
            $.query = $.query.set("isAlley", 1);
        } else {
            $.query = $.query.remove("isAlley");
        }
    }
    
    // độ rộng hẻm
    if (currentLogicFilter[5]) {
        if (dataForm.is_front_alley == 1 && typeof dataForm.alley != "undefined" && dataForm.alley != '') {
            $.query = $.query.set("alley", dataForm.alley);
        } else {
            $.query = $.query.remove("alley");
        }
    }
    // Tạo slug cho keyword
    if ($('#search_text').val() != "") {
        $.query = $.query.set("keyword", $('#search_text').val());
    } else {
        $.query = $.query.remove("keyword");
    }
    // Tạo slug cho Năm xây dựng
    if (currentLogicFilter[8]) {
        if (typeof dataForm.select_year != "undefined") {
            $.query = $.query.set("year", dataForm.select_year);
        } else {
            $.query = $.query.remove("year");
        }
    }
    // Tạo slug cho loại giá - dự án
    if (currentLogicFilter[9]) {
        if (typeof dataForm.selectprice != "undefined" && priceSlug) {
            $.query = $.query.set("loai", dataForm.selectprice);
        } else {
            $.query = $.query.remove("loai");
        }
        // tạo slug cho quận với dự án (pageInfo chưa có districtId)
        if (typeof dataForm.select_district != "undefined") {
            $.query = $.query.set("quan", dataForm.select_district);
        } else {
            $.query = $.query.remove("quan");
        }
    }
};
//
var search_bar = function () {
    var self = this;
    function intit() {
        initVAR();
        eventInit();
        showHideItem();
    };

    function initVAR() {
        self.dataSend = App.UI.objectifyForm($('#form-search-buy'));
        self.isSearchPage = $('body').hasClass('search');
        self.dataDefault = {
            select_district: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24',
            select_ward: '1,2,3,4,5,6,7,8,9,10',
            property_type: 11,
            price_from: "",
            price_to: "",
            size_from: "",
            size_to: "",
            bed_value: "0",
            bath_value: "0",
            floor_value: "0"
        };
        self.currentPropertyData = selectValuables[listingTypeId][0];
        // page search có option, các page khác không có
        if ((typeof options != "undefined" && typeof options.propertyList != "undefined")) {
            $.each(selectValuables[listingTypeId], function (key, item) {
                if (item.propertyTypeId == options.propertyList) {
                    self.currentPropertyData = item;
                    return false;
                }
            });
        } else {
            // search từ các page khác - ko fai từ page search
            if(listingTypeId == 1){
                self.currentPropertyData = selectValuables[1][1];
            } else if(listingTypeId == 2){
                self.currentPropertyData = selectValuables[2][1];
            }
        }
    };
    
    function eventInit() {
        $(document).ready(function () {
            // change loại hình bđs
            $(".property_type").change(function (e) {
                setPropertype($(this));
                currentLogicFilter = logicDisplayAdvancedFilter[self.currentPropertyData.propertyTypeId];
                propertyTypeIdSearchKeyword = self.currentPropertyData.propertyTypeId;
                showHideItem();
            });
            // change quận
            $("#select-district").change(function () {
                var districtId = $(this).val();
                setWard(districtId);
                $("#select-street_sb").html("<option value=''>Đường</option>");
                $("#select-street_sb").attr("disabled", "disabled");
            });
            $("#apply-search").click(function (e) {
                App.UI.showLoadding();
                appSearch(1);
            });
            // change listing type : Mua bán/Cho thuê/Dự án
            $('.search-type').on('click', function () {
                $('.search-type').removeClass('active');
                $(this).addClass('active');
                if ($(this).data('value') == 1) {
                    listingTypeId = 1;
                    propertyTypeIdSearchKeyword = 11;
                    slugListingType = '/mua/';
                    $('.status-rented-saled').text('Đã bán');
                    currentLogicFilter = logicDisplayAdvancedFilter[11];
                    $('#select-property').html($('#select-property-buy').html());
                    
                    $('#select-price').html($('#select-price-buy').html());
                    $('#select-property').show();
                    $('#select-type-price').hide();
                    
                    initVAR();
                    showHideItem();
                } else if ($(this).data('value') == 2) {
                    listingTypeId = 2;
                    propertyTypeIdSearchKeyword = 1;
                    slugListingType = '/thue/';
                    $('.status-rented-saled').text('Đã thuê');
                    currentLogicFilter = logicDisplayAdvancedFilter[1];
                    $('#select-property').html($('#select-property-rent').html());
                    
                    $('#select-price').html($('#select-price-rent').html());
                    $('#select-property').show();
                    $('#select-type-price').hide();
                    
                    initVAR();
                    showHideItem();
                } else if ($(this).data('value') == 99) {
                    listingTypeId = 99;
                    propertyTypeIdSearchKeyword = 99;
                    slugListingType = '/du-an/';
                    currentLogicFilter = logicDisplayAdvancedFilter[99];
                    
                    $('#select-type-price option:first').prop('selected',true);
                    $('#select-price').html($('#select-price-buy').html());
                    $('#select-property').hide();
                    $('#select-type-price').show();
                    
                    initVAR();
                    showHideItem();
                }
            });
            // change giá bán/ giá thuê của dự án
            $('#select-type-price').change(function(e){
                if($(this).val() == 1){
                    // giá bán
                    $('#select-price').html($('#select-price-buy').html());
                } else {
                    // giá thuê
                    $('#select-price').html($('#select-price-rent').html());
                }
            });
            // lưu bộ search
            $('#save-apply-search').click(function(){
                if(isLogin){
                    App.UI.showLoadding();
                    // đã đăng nhập
                    var title = $('#name-search').val().trim();
                    if(title == ''){
                        alert('Vui lòng nhập tên bộ tìm kiếm');
                        App.UI.hideLoadding();
                        return false;
                    }
                    appSearch(2);
                } else {
                    // chưa đăng nhập
                    $("#popup-login").modal("show");
                }
            });
        });
    };

    function setWard(districtId) {
        $("#select-ward").html("");
        if ((districtId === "") || (districtId === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24")) {
            $("#select-ward").attr("disabled", "disabled");
            return;
        } else {
            $("#select-ward").prop("disabled", false);
        }

        App.Feature.Get("/api/get-wards-by-district/" + districtId, function (wards) {
            $("#select-ward").html('<option value="-1">Chọn phường</option>').prop('disabled', true);
            if (wards.length != 0) {
                var ids = [];
                $("#select-ward").html("").prop('disabled', false);
                var html = "";
                $.each(wards, function (key, item) {
                    ids.push(item.wardId);
                    html += '<option value="' + item.wardId + '">' + item.wardName + '</option>';
                });
                html = '<option value="' + ids.join(',') + '">Tất cả</option>' + html;
                $("#select-ward").html(html);
            }
        });
    };

    function setPropertype(currentPropertypeId) {
        var dataCurrentPropertype = selectValuables[listingTypeId];
        $(dataCurrentPropertype).each(function (index, item) {
            if (item.propertyTypeId == currentPropertypeId.val()) {
                self.currentPropertyData = item;
                return false;
            }
        });
        return currentPropertyData;
    };

    function showHideItem() {
        // Toggle Số tầng
        if (currentLogicFilter[0]) {
            $(".select-floor-container").show();
        } else {
            $(".select-floor-container").hide();
            $(".select-floor-container #floor-value").val("0").trigger('change');
        }

        // Toggle Hướng
        if (currentLogicFilter[1]) {
            $(".select-direction-container").show();
        } else {
            $(".select-direction-container").hide();
        }

        // Toggle Phòng ngủ
        if (currentLogicFilter[2]) {
            $(".select-bed-container").show();
        } else {
            $(".select-bed-container").hide();
            $(".select-bed-container #bed-value").val("0").trigger('change');
        }

        // Toggle Phòng tắm
        if (currentLogicFilter[3]) {
            $(".select-bath-container").show();
        } else {
            $(".select-bath-container").hide();
            $(".select-bath-container #bath-value").val("0").trigger('change');
        }
        // Toggle Mặt tiền
        if (currentLogicFilter && currentLogicFilter[4]) {
            $(".col-position-search").show();
        } else {
            $(".col-position-search").hide();
            $(".col-position-search .is_front_alley").prop('checked', false).trigger("change");
        }
        // Toggle Hẻm
        if (currentLogicFilter && currentLogicFilter[5]) {
            $(".col-position-search").show();
        } else {
            $(".col-position-search").hide();
            $(".col-position-search .is_front_alley").prop('checked', false).trigger("change");
        }
        // Toggle Đã mua/Đã thuê/Đã thẩm định
        if (currentLogicFilter && currentLogicFilter[6]) {
            $(".col-rented-ccch").show();
        } else {
            $(".col-rented-ccch").hide();
        }
        // Toggle ListingType
        if (currentLogicFilter && currentLogicFilter[7]) {
            $(".col-listing-type").show();
        } else {
            $(".col-listing-type").hide();
        }
        // Toggle YearBuild
        if (currentLogicFilter && currentLogicFilter[8]) {
            $(".col-year-build").show();
        } else {
            $(".col-year-build").hide();
        }
        // Toggle TypePrice
        if (currentLogicFilter && currentLogicFilter[9]) {
            $(".col-type-price").show();
        } else {
            $(".col-type-price").hide();
        }
        // Toggle Diện tích
        if (currentLogicFilter && currentLogicFilter[10]) {
            $(".col-size").show();
        } else {
            $(".col-size").hide();
        }
        // Toggle Ward
        if (currentLogicFilter && currentLogicFilter[11]) {
            $(".col-ward").show();
        } else {
            $(".col-ward").hide();
        }
    };

    function appSearch(type) {
        var districtId = $("#select-district").val();
        if(listingTypeId == 99){
            districtId = $("#select-district-project").val();
        }
        if (!districtId) {
            districtId = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24";
        }
        if (self.currentPropertyData.propertyTypeId == 0) {
            if(listingTypeId == 1){
                self.currentPropertyData.propertyTypeId = 11;
            } else if(listingTypeId == 2){
                self.currentPropertyData.propertyTypeId = 1;
            } else {
                self.currentPropertyData.propertyTypeId = null;
            }
        }
        var PropertyTypeIDs = self.currentPropertyData.propertyTypeId;
        if (PropertyTypeIDs == null) {
            var searchObject = {
                CityID: 1,
                ListingTypeID : listingTypeId,
                PropertyTypeIDs: null
            };
        } else {
            var searchObject = {
                CityID: 1,
                ListingTypeID: listingTypeId,
                PropertyTypeIDs: self.currentPropertyData.propertyTypeId.toString()
            };
        }
        // dự án ko có search theo Phường
        if(listingTypeId != 99){
            var wardId = $('#select-ward').val();
            wardId && wardId.split(',').length == 1 ? searchObject.WardIDs = wardId : searchObject.WardIDs = null;
        }
        
        districtId && districtId.split(',').length == 1 ? searchObject.DistrictIDs = districtId : searchObject.DistrictIDs = null;
        var slug = null;
        App.Feature.Post('/api/get-search-slug', searchObject, function(response){
            if(response.result){
                slug = response.data.slug;
                if (slug == null){
                    if(listingTypeId == 1){
                        slug = 'ban-nha-rieng-tphcm';
                    } else if(listingTypeId == 2){
                        slug = 'can-ho-chung-cu-tphcm';
                    } else {
                        slug = 'hcm';
                    }
                }

                renderParams();
                var link = slugListingType + slug + $.query.toString();
                if(type == 1){
                    location.href = link;
                } else {
                    var title = $('#name-search').val().trim();
                    var formData = App.UI.objectifyForm($('#form-search-buy'));
                    var listingTypeList = $('.search-type.active').data('value');
                    var propertyList = 99;
                    if(listingTypeList == 1 || listingTypeList == 2){
                        propertyList = $('#select-property').val();
                    }
                    var filterCommon = {
                        filter: {
                           listingTypeList : listingTypeList,
                           propertyList : propertyList,
                           directionList : formData.direction ? formData.direction.toString() : '',
                           minSize : $('#select-size option:selected').data('min-size'),
                           maxSize: $('#select-size option:selected').data('max-size'),
                           maxBedroom: formData.bed_value,
                           maxBathroom: formData.bath_value,
                           maxNumberFloor: formData.floor_value,
                           minPrice: $('#select-price option:selected').data('min-price'),
                           maxPrice: $('#select-price option:selected').data('max-price'),
                           position: formData.is_front_alley,
                           maxYearBuilt: formData.year_build ? formData.year_build : null,
                           statusListing : formData.status_listing ? formData.status_listing.toString() : '',
                           cityIds: formData.select_city,
                           districtIds: formData.select_district,
                           wardIds: formData.select_ward
                        }
                    };
                    var dataPost = {
                        criteriaName : title,
                        linkSearch: link,
                        filterCommon: filterCommon
                    };
                    App.Feature.Post("/api/save-search", dataPost, function (response) {
                        if (response.result) {
                            location.href = link;
                        } else {
                            alert(response.message);
                            App.UI.hideLoadding();
                        }
                    });
                }
            }
        });
    };

    /* Khởi tạo */
    intit();
};

//
$(document).ready(function () {
    search_bar();
    
    $('input[name="search_text"]').searchKeyword({
        limit_item:10,
        height:50,
        data_default:function (dropdown_container) {
        },
        click_dropdown:function (dropdown,dropdown_container) {
        }
    });
});
