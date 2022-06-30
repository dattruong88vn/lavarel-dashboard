/*
* 0 : Số tầng
* 1 : Hướng
* 2 : Phòng ngủ
* 3 : Phòng tắm
* 4 : Mặt tiền
* 5 : Hẻm
* 6 : Đã thuê, Đã bán, Đã thẩm định, Đặc biệt
* 7 : ListingType
* 8 : Ward
* 9 : Yearbuild
* 10 : TypePrice,
* 11: Advantage
* 12 : Diện tích
* 13: Lọc nâng cao
*/
var logicDisplayAdvancedFilter_sb = {
    //Id bất động sản: [Số tầng, Hướng, Phòng ngủ, Phòng tắm, Mặt Tiền, Hẻm, Đã Thuê, ListingType, Ward, YearBuild, TypePrice, Advantage, Diện tích, Lọc nâng cao]
    "0": [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true],
    "1": [false, true, true, true, false, false, true, true, true, false, false, false, true, true, true], // 1 : thuê chung cư căn hộ
    "2": [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true], // 2: thuê nhà riêng
    "8": [false, true, true, true, false, false, true, true, true, false, false, false, true, true, true], // 8: mua chung cư căn hộ
    "11": [true, true, true, true, true, true, true, true, true, false, false, false, true, true, true], // 11: mua nhà riêng
    "13": [false, true, false, false, true, true, true, true, true, false, false, false, true, false, true], // 13: mua đất nền
    "14": [false, true, false, false, true, true, true, true, true, false, false, false, true, false, true], // 14: mua đất nền dự án
    "99": [false, false, false, false, false, false, false, false, false, true, true, false, false, false, false]// 99 : tự đặt cho Dự án
};
var logic_sb = selectValuables[listingTypeId][0].propertyTypeId;
if (logic_sb !== null) {
    var currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[logic_sb];
} else {
    var currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[0];
}

if ((typeof options != "undefined" && typeof options.propertyList != "undefined")) {
    if(options.propertyList == '1,2,11,13,8,14' || options.propertyList == '1,2' || options.propertyList == '11,13,8,14'){
        currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[99];
    } else {
        if (options.propertyList !== null) {
            currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[options.propertyList];
        } else {
            currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[0];
        }
    }
}

function renderPriceValue_sb(value) {
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

// render param theo url query
function renderParams_sb() {
    var dataForm = App.UI.objectifyForm($('#form-search-buy-sidebar'));
    
    // price slug
    var priceSlug = false;
    if($('#select-price_sb option:selected').data('max-price') != 0){
        var priceFrom = renderPriceValue_sb($('#select-price_sb option:selected').data('min-price'));
        var priceTo = renderPriceValue_sb($('#select-price_sb option:selected').data('max-price'));

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
    if (currentLogicFilter_sb[12] && $('#select-size_sb option:selected').data('max-size') != 0) {
        var sizeSlug = false;
        var sizeFrom = ($('#select-size_sb option:selected').data('min-size'));
        var sizeTo = ($('#select-size_sb option:selected').data('max-size'));

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
    if (currentLogicFilter_sb[0]) {
        $.query = (parseInt(dataForm.floor_value_sb) > -1 && dataForm.floor_value_sb != 0) ? $.query.set("tang", dataForm.floor_value_sb) : $.query.remove("tang");
    }

    /* Tạo slug cho Hướng */
    if (currentLogicFilter_sb[1]) {
        $.query = (typeof dataForm.direction_sb != "undefined" && dataForm.direction_sb.length != 0 && dataForm.direction_sb[0] != '') ? $.query.set("huong", dataForm.direction_sb.join(',')) : $.query.remove("huong");
    }

    /* Tạo slug cho Phòng ngủ */
    if (currentLogicFilter_sb[2]) {
        $.query = (parseInt(dataForm.bed_value_sb) > -1 && dataForm.bed_value_sb != 0) ? $.query.set("phongngu", dataForm.bed_value_sb) : $.query.remove("phongngu");
    }

    /* Tạo slug cho Phòng tắm */
    if (currentLogicFilter_sb[3]) {
        $.query = (parseInt(dataForm.bath_value_sb) > -1 && dataForm.bath_value_sb != 0) ? $.query.set("phongtam", dataForm.bath_value_sb) : $.query.remove("phongtam");
    }

    /* Tạo slug đã bán, đã thuê, đã thẩm định */
    if (currentLogicFilter_sb[6]) {
        if (typeof dataForm.status_listing_sb != "undefined") {
            $.query = (typeof dataForm.status_listing_sb != "undefined" && dataForm.status_listing_sb.length != 0) ? $.query.set("statusListing", dataForm.status_listing_sb.join(',')) : $.query.remove("statusListing");
        } else {
            $.query = $.query.remove("statusListing");
        }
    }
    
    /* Là độc quyền */
    if (typeof dataForm.monopoly_listing_sb != "undefined") {
        $.query = $.query.set("isGuaranteed", 1);
    } else {
        $.query = $.query.remove("isGuaranteed");
    }

    /* Tạo slug cho Mặt tiền - Hẻm  : 0 - mặt tiền; 1 - hẻm*/
    if (currentLogicFilter_sb[4]) {
        if (typeof dataForm.is_front_alley_sb != "undefined" && dataForm.is_front_alley_sb === "0") {
            $.query = $.query.set("isRoadFront", 1);
        } else {
            $.query = $.query.remove("isRoadFront");
        }
    }
    
    // hẻm
    if (currentLogicFilter_sb[5]) {
        if (typeof dataForm.is_front_alley_sb != "undefined" && dataForm.is_front_alley_sb === "1") {
            $.query = $.query.set("isAlley", 1);
        } else {
            $.query = $.query.remove("isAlley");
        }
    }
    
    // độ rộng hẻm
    if (currentLogicFilter_sb[5]) {
        if (dataForm.is_front_alley_sb == 1 && typeof dataForm.alley_sb != "undefined" && dataForm.alley_sb != '') {
            $.query = $.query.set("alley", dataForm.alley_sb);
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
    if (currentLogicFilter_sb[9]) {
        if (typeof dataForm.select_year_sb != "undefined") {
            $.query = $.query.set("year", dataForm.select_year_sb);
        } else {
            $.query = $.query.remove("year");
        }
    }
    // Tạo slug cho loại giá - dự án
    if (currentLogicFilter_sb[10]) {
        if (typeof dataForm.selectprice_sb != "undefined" && priceSlug) {
            $.query = $.query.set("loai", dataForm.selectprice_sb);
        } else {
            $.query = $.query.remove("loai");
        }
        // tạo slug cho quận với dự án (pageInfo chưa có districtId)
        if (typeof dataForm.select_district_sb != "undefined") {
            $.query = $.query.set("quan", dataForm.select_district_sb);
        } else {
            $.query = $.query.remove("quan");
        }
    }
    // Tạo slug cho street
    if ($('#select-street_sb').val() != null && $('#select-street_sb').val() != "" && $('#select-street_sb').val().length < 6) {
        $.query = $.query.set("street", $('#select-street_sb').val());
    } else {
        $.query = $.query.remove("street");
    }
};

//
var search_bar_sb = function () {
    var self = this;
    function intit_sb() {
        initVAR_sb();
        eventInit_sb();
        showHideItem_sb();
    };

    function initVAR_sb() {
        self.dataSend = App.UI.objectifyForm($('#form-search-buy-sidebar'));
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

    function eventInit_sb() {
        $(document).ready(function () {
            // change loại hình bđs
            $(".property_type_sb").change(function (e) {
                setPropertype_sb($(this));
                currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[self.currentPropertyData.propertyTypeId];
                propertyTypeIdSearchKeyword = self.currentPropertyData.propertyTypeId;
                showHideItem_sb();
            });
            // change quận
            $("#select-district_sb").change(function () {
                var districtId = $(this).val();
                setWard_sb(districtId);
                $("#select-street_sb").html("<option value=''>Đường</option>");
                $("#select-street_sb").attr("disabled", "disabled");
            });
            // change phường
            $("#select-ward_sb").change(function () {
                var wardId = $(this).val();
                setStreet_sb(wardId);
            });
            $("#apply-search_sb").click(function (e) {
                App.UI.showLoadding();
                appSearch_sb(1);
            });
            // change listing type : Mua bán/Cho thuê/Dự án
            $('.search-type_sb').click(function () {
                if ($(this).data('value') == 1) {
                    listingTypeId = 1;
                    propertyTypeIdSearchKeyword = 11;
                    slugListingType = '/mua/';
                    $('.status-rented-saled').text('Đã bán');
                    currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[11];
                    $('#select-property_sb').html($('#select-property-buy').html());
                    // giá bán
                    $('#select-price_sb').html($('#select-price-buy').html());
                    
                    initVAR_sb();
                    showHideItem_sb();
                } else if ($(this).data('value') == 2) {
                    listingTypeId = 2;
                    propertyTypeIdSearchKeyword = 1;
                    slugListingType = '/thue/';
                    $('.status-rented-saled').text('Đã thuê');
                    currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[1];
                    $('#select-property_sb').html($('#select-property-rent').html());
                    // giá thuê
                    $('#select-price_sb').html($('#select-price-rent').html());
                    
                    initVAR_sb();
                    showHideItem_sb();
                } else if ($(this).data('value') == 99) {
                    listingTypeId = 99;
                    propertyTypeIdSearchKeyword = 99;
                    slugListingType = '/du-an/';
                    currentLogicFilter_sb = logicDisplayAdvancedFilter_sb[99];
                    // giá bán
                    //$('#project-price-buy_sb').prop('checked',true);
                    $('#select-price_sb').html($('#select-price-buy').html());
                    $('#project-price-buy_sb').trigger('click');
                    initVAR_sb();
                    showHideItem_sb();
                }
            });
            // change selectprice_sb : only du-an
            $('.selectprice_sb').change(function(){
                if($(this).val() == 1){
                    // giá bán
                    $('#select-price_sb').html($('#select-price-buy').html());
                } else {
                    // giá thuê
                    $('#select-price_sb').html($('#select-price-rent').html());
                }
            });
            
        });
    };

    function setWard_sb(districtId) {
        $("#select-ward_sb").html("");
        if ((districtId === "") || (districtId === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24")) {
            $("#select-ward_sb").attr("disabled", "disabled");
            return;
        } else {
            $("#select-ward_sb").prop("disabled", false);
        }

        App.Feature.Get("/api/get-wards-by-district/" + districtId, function (wards) {
            $("#select-ward_sb").html('<option value="-1">Chọn phường</option>').prop('disabled', true);
            if (wards.length != 0) {
                var ids = [];
                $("#select-ward_sb").html("").prop('disabled', false);
                var html = "";
                $.each(wards, function (key, item) {
                    ids.push(item.wardId);
                    html += '<option value="' + item.wardId + '">' + item.wardName + '</option>';
                });
                html = '<option value="' + ids.join(',') + '">Tất cả</option>' + html;
                $("#select-ward_sb").html(html);
            }
        });
    };
    
    function setStreet_sb(wardId) {
        $("#select-street_sb").html("");
        if ((wardId === "")) {
            $("#select-street_sb").attr("disabled", "disabled");
            return;
        } else {
            $("#select-street_sb").prop("disabled", false);
        }

        App.Feature.Get("/api/get-streets-by-ward/" + wardId, function (streets) {
            $("#select-street_sb").html('<option value="-1">Chọn đường</option>').prop('disabled', true);
            if (streets.length != 0) {
                var ids = [];
                $("#select-street_sb").html("").prop('disabled', false);
                var html = "";
                $.each(streets, function (key, item) {
                    ids.push(item.streetId);
                    html += '<option value="' + item.streetId + '">' + item.streetName + '</option>';
                });
                html = '<option value="' + ids.join(',') + '">Tất cả</option>' + html;
                $("#select-street_sb").html(html);
            }
        });
    };
    
    function setPropertype_sb(currentPropertypeId) {
        var dataCurrentPropertype = selectValuables[listingTypeId];
        $(dataCurrentPropertype).each(function (index, item) {
            if (item.propertyTypeId == currentPropertypeId.val()) {
                self.currentPropertyData = item;
                return false;
            }
        });
        return currentPropertyData;
    };

    function showHideItem_sb() {
        // Toggle Số tầng
        if (currentLogicFilter_sb[0]) {
            $(".select-floor-container_sb").show();
        } else {
            $(".select-floor-container_sb").hide();
            $(".select-floor-container_sb #floor-value_sb").val("0").trigger('change');
        }

        // Toggle Hướng
        if (currentLogicFilter_sb[1]) {
            $(".select-direction-container_sb").show();
        } else {
            $(".select-direction-container_sb").hide();
        }

        // Toggle Phòng ngủ
        if (currentLogicFilter_sb[2]) {
            $(".select-bed-container_sb").show();
        } else {
            $(".select-bed-container_sb").hide();
            $(".select-bed-container_sb #bed-value_sb").val("0").trigger('change');
        }

        // Toggle Phòng tắm
        if (currentLogicFilter_sb[3]) {
            $(".select-bath-container_sb").show();
        } else {
            $(".select-bath-container_sb").hide();
            $(".select-bath-container_sb #bath-value_sb").val("0").trigger('change');
        }
        // Toggle Mặt tiền
        if (currentLogicFilter_sb && currentLogicFilter_sb[4]) {
            $(".col-position-search_sb").show();
        } else {
            $(".col-position-search_sb").hide();
            $(".col-position-search_sb .is_front_alley_sb").prop('checked', false).trigger("change");
        }
        // Toggle Hẻm
        if (currentLogicFilter_sb && currentLogicFilter_sb[5]) {
            $(".col-position-search_sb").show();
        } else {
            $(".col-position-search_sb").hide();
            $(".col-position-search_sb .is_front_alley_sb").prop('checked', false).trigger("change");
        }
        // Toggle Đã mua/Đã thuê/Đã thẩm định
        if (currentLogicFilter_sb && currentLogicFilter_sb[6]) {
            $(".col-rented-ccch_sb").show();
        } else {
            $(".col-rented-ccch_sb").hide();
        }
        // Toggle ListingType
        if (currentLogicFilter_sb && currentLogicFilter_sb[7]) {
            $(".col-listing-type_sb").show();
        } else {
            $(".col-listing-type_sb").hide();
        }
        // Toggle Ward
        if (currentLogicFilter_sb && currentLogicFilter_sb[8]) {
            $(".col-ward_sb").show();
        } else {
            $(".col-ward_sb").hide();
        }
        // Toggle YearBuild
        if (currentLogicFilter_sb && currentLogicFilter_sb[9]) {
            $(".col-year-build_sb").show();
        } else {
            $(".col-year-build_sb").hide();
        }
        // Toggle TypePrice
        if (currentLogicFilter_sb && currentLogicFilter_sb[10]) {
            $(".col-type-price_sb").show();
        } else {
            $(".col-type-price_sb").hide();
        }
        // Toggle Advantage
        if (currentLogicFilter_sb && currentLogicFilter_sb[11]) {
            $(".advantage-container_sb").show();
        } else {
            $(".advantage-container_sb").hide();
        }
        // Toggle Diện tích
        if (currentLogicFilter_sb && currentLogicFilter_sb[12]) {
            $(".col-size_sb").show();
        } else {
            $(".col-size_sb").hide();
        }
        // Toggle đường
        if (currentLogicFilter_sb && currentLogicFilter_sb[14]) {
            $(".col-street_sb").show();
        } else {
            $(".col-street_sb").hide();
        }
    };

    function appSearch_sb(type) {
        var districtId = $("#select-district_sb").val();
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
            var wardId = $('#select-ward_sb').val();
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
                renderParams_sb();
                var link = slugListingType + slug + $.query.toString();
                if(type == 1){
                    location.href = link;
                }
                return link;
            }
        });
    };

    /* Khởi tạo */
    intit_sb();
};

//
$(document).ready(function () {
    search_bar_sb();
});
