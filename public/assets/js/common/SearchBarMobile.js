var logicDisplayAdvancedFilter = {
    //Id bất động sản: [Số tầng, Hướng, Phòng ngủ, Phòng tắm, Mặt Tiền, Hẻm, Đã Thuê]
    "0": [true, true, true, true, true, true, true],
    "1": [false, true, true, true, false, false, false],// 1 : thuê chung cư căn hộ
    "2": [true, true, true, true, true, true, true],// 2: thuê nhà riêng
    "8": [false, true, true, true, false, false, true],// 8: mua chung cư căn hộ
    "11": [true, true, true, true, true, true, true],// 11: mua nhà riêng
    "13": [false, true, false, false, true, true, true],// 13: mua đất nền
    "14": [false, true, false, false, true, true, true]// 14: mua đất nền dự án
};

var logic = selectValuables[listingTypeId][0].propertyTypeId;
if(logic !== null){
    var currentLogicFilter = logicDisplayAdvancedFilter[logic];
} else {
    var currentLogicFilter = logicDisplayAdvancedFilter[0];
}

if((typeof options !="undefined" &&  typeof options.propertyList!="undefined")){
    if(options.propertyList !== null){
        currentLogicFilter = logicDisplayAdvancedFilter[options.propertyList];
    } else {
        currentLogicFilter = logicDisplayAdvancedFilter[0];
    }
}

function renderPriceValue(value) {
    var unit;
    if (value > 999999999) {
        unit = "ty";
        value = value / 1000000000;
    }
    else if (value > 999999) {
        unit = "trieu";
        value = value / 1000000;
    }
    else {
            unit = "ngan";
            value = value / 1000;
    }
    return value + unit;
};
// render param theo url query
function renderParams() {
    var dataForm = App.UI.objectifyForm($('#form-search-buy'));
    // price slug
    var priceSlug = false;
    if($('.slide-input-price:checked').val() == 0){
        // kéo chọn
        var priceFrom = $("#price-from").val().trim();
        var priceTo = $("#price-to").val().trim();
    } else {
        // nhập
        var priceFrom = renderPriceValue($('#select-price option:selected').data('min-price'));
        var priceTo = renderPriceValue($('#select-price option:selected').data('max-price'));
    }
    
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

    var sizeSlug = false;
    if($('.slide-input-size:checked').val() == 0){
        var sizeFrom = $("#size-from").val().trim();
        var sizeTo = $("#size-to").val().trim();
    } else {
        var sizeFrom = ($('#select-size option:selected').data('min-size'));
        var sizeTo = ($('#select-size option:selected').data('max-size'));
    }
    if(sizeFrom.length!=0 && sizeTo.length!=0){
        sizeSlug = sizeFrom + "-" + sizeTo;
    } else if(sizeFrom.length==0 && sizeTo.length!=0){
        sizeSlug = 0 + "-" + sizeTo;
    } else if(sizeFrom.length!=0 && sizeTo.length==0){
        sizeSlug = sizeFrom;
    }
    $.query = sizeSlug ? $.query.set("dientich", sizeSlug) : $.query.remove("dientich");

    /* Tạo slug cho Tầng */
    if (currentLogicFilter[0]) {
        $.query = (parseInt(dataForm.floor_value) > -1 && dataForm.floor_value!=0) ? $.query.set("tang", dataForm.floor_value):$.query.remove("tang");
    }

    /* Tạo slug cho Hướng */
    if (currentLogicFilter[1]) {
        $.query = (typeof dataForm.direction!="undefined" && dataForm.direction.length!=0 && dataForm.direction[0]!='') ? $.query.set("huong", dataForm.direction.join(',')) : $.query.remove("huong");
    }

    /* Tạo slug cho Phòng ngủ */
    if (currentLogicFilter[2]) {
        $.query = (typeof dataForm.bed_value!="undefined" && parseInt(dataForm.bed_value)!=0) ? $.query.set("phongngu", dataForm.bed_value):$.query.remove("phongngu");
    }

    /* Tạo slug cho Phòng tắm */
    if (currentLogicFilter[2]) {
        $.query = (typeof dataForm.bath_value!="undefined" && parseInt(dataForm.bath_value)!=0) ? $.query.set("phongtam", dataForm.bath_value):$.query.remove("phongtam");
    }

    /* Tạo slug đã bán, đã thuê, đã thẩm định */
    if (typeof dataForm.status_listing!="undefined") {
        $.query = (typeof dataForm.status_listing!="undefined" && dataForm.status_listing.length!=0) ? $.query.set("statusListing", dataForm.status_listing.join(',')) : $.query.remove("statusListing");
    }
    
    /* Là độc quyền */
    if (typeof dataForm.monopoly_listing!="undefined") {
        $.query = $.query.set("isGuaranteed",1);
    }else {
        $.query = $.query.remove("isGuaranteed");
    }
    
    /* Tạo slug cho Mặt tiền - Hẻm */
    if (typeof dataForm.is_front_alley!="undefined" && dataForm.is_front_alley == 0) {
        $.query = $.query.set("isRoadFront",1);
    }else {
        $.query = $.query.remove("isRoadFront");
    }
    //
    if (typeof dataForm.is_front_alley!="undefined" && dataForm.is_front_alley == 1) {
        $.query = $.query.set("isAlley",1);
    }else {
        $.query = $.query.remove("isAlley");
    }
    // kéo / chọn giá
    if (typeof dataForm.slide_input_price !="undefined" && dataForm.slide_input_price == 0) {
        $.query = $.query.set("priceKey",0);
    }else {
        $.query = $.query.set("priceKey",1);
    }
    // kéo / chọn diện tích
    if (typeof dataForm.slide_input_size !="undefined" && dataForm.slide_input_size == 0) {
        $.query = $.query.set("sizeKey",0);
    }else {
        $.query = $.query.set("sizeKey",1);
    }
    //
    if (currentLogicFilter[2]) {
        if(dataForm.is_front_alley == 1 && typeof dataForm.alley!="undefined" && dataForm.alley!=''){
            $.query = $.query.set("alley", dataForm.alley);
        } else {
            $.query =  $.query.remove("alley");
        }
    }
};

var search_bar = function () {
    var self = this;
    function intit() {
        setTimeout(setSlugs(),1000);
        initVAR();
        eventInit();
        loadForm();
        showHideItem();
    };
    function initVAR() {
        self.dataSend = App.UI.objectifyForm($('#form-search-buy'));
        self.isSearchPage = $('body').hasClass('search');
        self.dataDefault = {
            select_district:'1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24',
            select_ward:'1,2,3,4,5,6,7,8,9,10',
            property_type:11,
            price_from:"",
            price_to:"",
            size_from:"",
            size_to:"",
            bed_value:"0",
            bath_value:"0",
            floor_value:"0"
        };
        //var listingTypeId =1; /* Mua */
        self.currentPropertyData = selectValuables[listingTypeId][0];
        if((typeof options !="undefined" &&  typeof options.propertyList!="undefined")){
            $.each(selectValuables[listingTypeId],function (key,item) {
                if(item.propertyTypeId == options.propertyList){
                    self.currentPropertyData = item;
                    return false;
                }
            });
        }
    };
    function setSlugs(callBack) {
        /* Get slug */
        $.ajax({
            dataType: "json",
            url: "/assets/search_slugs.json?ver="+version,
            async: true,
            success: function (data) {
                self.slugs = data;
                if (callBack) {
                    callBack(data);
                }
            }
        });

    };
    function findSlug(finds) {
        var slug = '';
        var sizeFind = Object.keys(finds).length;
        if (self.slugs == null) {
            setSlugs(function () {
                slug = findSlug();
            });
        } else {
            slug = jQuery.grep(self.slugs, function (item) {
                var count = 0;
                for (var key in finds) {
                    if (item.hasOwnProperty(key)) {
                        if (finds[key] == item[key]) {
                            count++;
                        }
                    } else {
                        continue;
                    }
                }
                if (sizeFind == count)
                    return true;
            });
        }
        return slug.length > 0 ? slug[0].Slug : null;
    };
    function eventInit() {
        $(document).ready(function () {
            $(".property_type").change(function (e) {
                setPropertype($(this));
                currentLogicFilter = logicDisplayAdvancedFilter[self.currentPropertyData.propertyTypeId];
                showHideItem();
            });
            $("#select-district").change(function () {
                var districtId = $(this).val();
                setWard(districtId);
            });
            $("#apply-search").click(function (e) {
                App.UI.showLoadding();
                appSearch();
            });
        });
    };
    function setWard(districtId) {
        $("#select-ward").html("");
        if ((districtId === "") || (districtId === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24")) {
            $("#select-ward").attr("disabled", "disabled");
            return;
        }
        else{
            $("#select-ward").prop("disabled", false);
        }

        App.Feature.Get("/api/get-wards-by-district/" + districtId, function (wards) {
            $("#select-ward").html('<option value="-1">Chọn phường</option>').prop('disabled', true);
            if(wards.length!=0){
                var ids =[];
                $("#select-ward").html("").prop('disabled', false);
                var html = "";
                $.each(wards,function (key,item) {
                    ids.push(item.wardId);
                    html += '<option value="'+item.wardId+'">'+item.wardName+'</option>';
                });
                html = '<option value="'+ids.join(',')+'">Tất cả</option>' + html;
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
        // Toggle Mặt tiền, hẻm
        if (currentLogicFilter && currentLogicFilter[4]) {
            $(".col-position-search").show();
        } else {
            $(".col-position-search").hide();
            $(".col-position-search .is_front_alley").prop('checked',false).trigger("change");
            $(".col-position-search #alley").val("").trigger('change');
        }
        if (currentLogicFilter && currentLogicFilter[5]) {
            $(".col-position-search").show();
        } else {
            $(".col-position-search").hide();
            $(".col-position-search .is_front_alley").prop('checked',false).trigger("change");
            $(".col-position-search #alley").val("").trigger('change');
        }
        if (currentLogicFilter && currentLogicFilter[6]) {
            $(".col-rented-ccch").show();
        } else {
            $(".col-rented-ccch").hide();
        }
    };
    
    function appSearch () {
        var districtId = $("#select-district").val();
        if (!districtId) {
            districtId = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24";
        }
        if(self.currentPropertyData.propertyTypeId == 0){
            self.currentPropertyData.propertyTypeId = null;
        }
        var PropertyTypeIDs = self.currentPropertyData.propertyTypeId;
        if(PropertyTypeIDs == null){
            var searchObject = {
                CityId: 1,
                PropertyTypeIDs: null
            };
        } else{
            var searchObject = {
                CityId: 1,
                PropertyTypeIDs: self.currentPropertyData.propertyTypeId.toString()
            };
        }
        var wardId = $('#select-ward').val();
        wardId && wardId.split(',').length == 1 ? searchObject.WardIDs = wardId : searchObject.WardIDs = null;
        districtId && districtId.split(',').length == 1 ? searchObject.DistrictIDs = districtId : searchObject.DistrictIDs = null;
        var slug = findSlug(searchObject); 
        if (slug == null)
            slug = 'ban-nha-rieng-tphcm';
        renderParams();
        window.location.href = slugListingType + slug + $.query.toString();
    };
    /* Khởi tạo */
    intit();
};