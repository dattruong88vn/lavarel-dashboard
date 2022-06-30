
var hasContentClass = "has-content";
var logicDisplayAdvancedFilter = {
    //Id bất động sản: [Số tầng, Hướng, Phòng ngủ, Phòng tắm, Mặt Tiền, Hẻm, Đã Thuê]
    "0": [true, true, true, true, true, true, true],
    "1": [false, true, true, true, false, false, false],
    "2": [true, true, true, true, true, true, true],
    "3": [true, true, true, true, true, true, true],
    "4": [false, true, false, false, true, true, true],
    "7": [false, true, true, true, true, true, true],
    "8": [false, true, true, true, false, false, true],
    "10": [false, false, false, false, true, true, true],
    "11": [true, true, true, true, true, true, true],
    "13": [false, true, false, false, true, true, true],
    "14": [false, true, false, false, true, true, true]
};
var optionPriceBuy = [
    {"maxPrice":0,"minPrice":0,"title":"Chọn giá"},
    {"maxPrice":2000000000,"minPrice":0,"title":"Dưới 2 tỷ"},
    {"maxPrice":3000000000,"minPrice":2000000000,"title":"2 tỷ - 3 tỷ"},
    {"maxPrice":4000000000,"minPrice":3000000000,"title":"3 tỷ - 4 tỷ"},
    {"maxPrice":5000000000,"minPrice":4000000000,"title":"4 tỷ - 5 tỷ"},
    {"maxPrice":6000000000,"minPrice":5000000000,"title":"5 tỷ - 6tỷ"},
    {"maxPrice":7000000000,"minPrice":6000000000,"title":"6 tỷ - 7 tỷ"},
    {"maxPrice":8000000000,"minPrice":7000000000,"title":"7 tỷ - 8 tỷ"},
    {"maxPrice":9000000000,"minPrice":8000000000,"title":"8 tỷ - 9 tỷ"},
    {"maxPrice":10000000000,"minPrice":9000000000,"title":"9 tỷ - 10 tỷ"},
    {"maxPrice":1000000000000000,"minPrice":10000000000,"title":"Trên 10 tỷ"}
];
var optionPriceRent = [
    {"maxPrice":0,"minPrice":0,"title":"Chọn giá"},
    {"maxPrice":3000000,"minPrice":0,"title":"Dưới 3 triệu"},
    {"maxPrice":5000000,"minPrice":3000000,"title":"3 triệu - 5 triệu"},
    {"maxPrice":6000000,"minPrice":5000000,"title":"5 triệu - 6 triệu"},
    {"maxPrice":8000000,"minPrice":6000000,"title":"6 triệu - 8 triệu"},
    {"maxPrice":10000000,"minPrice":8000000,"title":"8 triệu - 10 triệu"},
    {"maxPrice":15000000,"minPrice":10000000,"title":"10 triệu - 15triệu"},
    {"maxPrice":20000000,"minPrice":15000000,"title":"15 triệu - 20 triệu"},
    {"maxPrice":30000000,"minPrice":20000000,"title":"20 triệu - 30 triệu"},
    {"maxPrice":10000000000,"minPrice":30000000,"title":"Trên 30 triệu"}
];
var optionSize = [
    {"title":"Chọn diện tích","maxSize":0,"minSize":0},
    {"title":"Dưới 30 m2","maxSize":30,"minSize":0},
    {"title":"31 m2 - 40 m2","maxSize":40,"minSize":31},
    {"title":"41 m2 - 50 m2","maxSize":50,"minSize":41},
    {"title":"51 m2 - 60 m2","maxSize":60,"minSize":51},
    {"title":"61 m2 - 70 m2","maxSize":70,"minSize":61},
    {"title":"71 m2 - 80 m2","maxSize":80,"minSize":71},
    {"title":"81 m2 - 90 m2","maxSize":90,"minSize":81},
    {"title":"91 m2 - 100 m2","maxSize":100,"minSize":91},
    {"title":"Trên 100 m2","maxSize":100000,"minSize":100}
];

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



function getSearchKeyWordWidth(){
    var documentWidth = $(document).width();
    // if(documentWidth<=1024){
    //     return 180;
    // }
    return 300;
}



var searchKeywordWidth = getSearchKeyWordWidth();
$(".search_text").width(searchKeywordWidth);

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
    // size slug
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
    if (currentLogicFilter && currentLogicFilter[0]) {
        $.query = (parseInt(dataForm.floor_value) > -1 && dataForm.floor_value!=0) ? $.query.set("tang", dataForm.floor_value):$.query.remove("tang");
    }

    /* Tạo slug cho Hướng */
    if (currentLogicFilter && currentLogicFilter[1]) {
        $.query = (typeof dataForm.direction!="undefined" && dataForm.direction.length!=0) ? $.query.set("huong", dataForm.direction.join(',')) : $.query.remove("huong");
    }

    /* Tạo slug cho Phòng ngủ */
    if (currentLogicFilter && currentLogicFilter[2]) {
        $.query = (typeof dataForm.bed_value!="undefined" && parseInt(dataForm.bed_value)!=0) ? $.query.set("phongngu", dataForm.bed_value):$.query.remove("phongngu");
    }

    /* Tạo slug cho Phòng tắm */
    if (currentLogicFilter && currentLogicFilter[2]) {
        $.query = (typeof dataForm.bath_value!="undefined" && parseInt(dataForm.bath_value)!=0) ? $.query.set("phongtam", dataForm.bath_value):$.query.remove("phongtam");
    }

    /* Tạo slug đã bán, đã thuê */
    if (typeof dataForm.status_listing!="undefined") {
        $.query = (typeof dataForm.status_listing!="undefined" && dataForm.status_listing.length!=0) ? $.query.set("statusListing", dataForm.status_listing.join(',')) : $.query.remove("statusListing");
    }else{
        $.query = $.query.remove("statusListing");
    }
    // if (typeof dataForm.status_listing!="undefined") {
    //     $.query = $.query.set("statusListing",7);
    // }else {
    //     $.query = $.query.remove("statusListing");
    // }

    /* Là độc quyền */
    if (typeof dataForm.monopoly_listing!="undefined") {
        $.query = $.query.set("isGuaranteed",1);
    }else {
        $.query = $.query.remove("isGuaranteed");
    }

    if (typeof dataForm.input_keyword!="undefined" && dataForm.input_keyword!="" && false) {
        $.query = $.query.set("keyword",dataForm.input_keyword);
    }else {
        $.query = $.query.remove("keyword");
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

    /*  Remove params; */
    var define_remove = [
        'src',
        'utm_source',
        'utm_medium',
        'utm_content',
        'utm_campaign'
    ];
    define_remove.forEach(function(item, key){
        $.query = $.query.remove(item);
    });
};

var search_bar = function () {
    App.UI.inputAllowNumber(["#alley"], false);
    $('.is_front_alley').change(function(){
        if($(this).data('value') == 0){
            $('#alley').hide();
        } else {
            $('#alley').show();
        }
    });
    if($('.is_front_alley:checked').length > 0){
        if($('.is_front_alley:checked').data('value') == 0){
            $('#alley').hide();
        } else {
            $('#alley').show();
        }
    } else {
        $('#alley').hide();
    }
    var self = this;
    self.slugs = null;
    function intit() {
        setTimeout(setSlugs(),1000);
        initVAR();
        eventInit();
        loadForm();
        showHideItem();
        if($('body').hasClass('search')){
            sysData();
        }
    };
    function initVAR() {
        self.dataSend = App.UI.objectifyForm($('#form-search-buy'));
        self.dataDefault = {
            property_type:11,
            price_from:"",
            price_to:"",
            size_from:"",
            size_to:"",
            bed_value:"0",
            bath_value:"0",
            floor_value:"0"
        };
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
    function activeInputSearch() {
        if(!$(".input-search").hasClass("active")){
            //$(".input-search").addClass("active");
            $(".inner-show-search").css({"marginRight":"0px"});
        }
        if(!$(".input-search").hasClass("active-search")){
            $(".input-search").addClass("active-search");
        }
        // $(".search_text").trigger('focus');
        if($(".search_text").val().length >= 2)
            $(".dropdown-seach").show();
    };
    function UnActiveInputSearch() {
        if($(".input-search").hasClass("active")){
            //$(".input-search").removeClass("active");
            $(".inner-show-search").css({"marginRight":0});
        }
        if($(".input-search").hasClass("active-search")){
            $(".input-search").removeClass("active-search");
        }
        // $("input[name='search_text']").trigger('blur');
        // $(".search_text").trigger('blur');
        showMore();
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
        $(document).click(function (e) {
            if(!$(e.target).parents('.div-search').length || $(e.target).hasClass("btn-search") || $(e.target).hasClass("a-close")){
                UnActiveInputSearch();
            }else{
                // activeInputSearch();
            }
        });

        $('.search_text').searchKeyword({
            limit_item:5,
            height:25,
            parent_dropdown:'#form-search-buy .input-search',
            button_search:false,
            button_dropdown: false,
            width_focus: searchKeywordWidth,
            width_blur: searchKeywordWidth
        });

        $("#show-more-search").click(function (e) {
            if($(".input-search").hasClass("active") || $(".input-search").hasClass("active-search")){
                UnActiveInputSearch();
            }else{
                activeInputSearch();
            }
        });
        $(".property_type").change(function (e) {
            setPropertype($(this));
            currentLogicFilter = logicDisplayAdvancedFilter[self.currentPropertyData.propertyTypeId];
            showHideItem();
            dataChange();
        });
        
        //
        $(".slide-input-price").change(function (e) {
            if($(this).val() == 0){
                // kéo chọn
                $('.slider-container-price').show();
                $('.select-price-option').hide();
            } else {
                // nhập
                $('.select-price-option').show();
                $('.slider-container-price').hide();
                if($('#select-price').html().trim() == ''){
                    $('#select-price').html('');
                    if(listingTypeId == 1){
                        var html = '';
                        $.each(optionPriceBuy, function(key, val){
                            var selected = '';
                            if(options.minPrice == val.minPrice && options.maxPrice == val.maxPrice){
                                selected = 'selected';
                                //$('.slide-input-price').removeAttr('checked');
                                //$('.slide-input-price[value="1"]').addAttr('checked');
                            }
                            html+= '<option '+ selected +' value="'+ val.minPrice +'" data-min-price="'+ val.minPrice +'" data-max-price="'+ val.maxPrice +'">';
                                html+= val.title;
                            html+= '</option>';
                        });
                        $('#select-price').html(html);
                    } else {
                        var html = '';
                        $.each(optionPriceRent, function(key, val){
                            var selected = '';
                            if(options.minPrice == val.minPrice && options.maxPrice == val.maxPrice){
                                selected = 'selected';
                            }
                            html+= '<option '+ selected +' value="'+ val.minPrice +'" data-min-price="'+ val.minPrice +'" data-max-price="'+ val.maxPrice +'">';
                                html+= val.title;
                            html+= '</option>';
                        });
                        $('#select-price').html(html);
                    }
                }
            }
        });
        
        $(".slide-input-size").change(function (e) {
            if($(this).val() == 0){
                // kéo chọn
                $('.slider-container-size').show();
                $('.select-size-option').hide();
            } else {
                // nhập
                $('.select-size-option').show();
                $('.slider-container-size').hide();
                if($('#select-size').html().trim() == ''){
                    var html = '';
                    $.each(optionSize, function(key, val){
                        var selected = '';
                        if(options.minSize == val.minSize && options.maxSize == val.maxSize){
                            selected = 'selected';
                        }
                        html+= '<option '+ selected +' value="'+ val.minSize +'" data-min-size="'+ val.minSize +'" data-max-size="'+ val.maxSize +'">';
                            html+= val.title;
                        html+= '</option>';
                    });
                    $('#select-size').html(html);
                }
            }
        });
        //
        $(".btn-down").click(function (e) {
            let currentVal = parseInt($(this).next().val());
            currentVal > 0 ? $(this).next().val(currentVal - 1) : false;
            dataChange();
        });

        $(".btn-up").click(function (e) {
            let currentVal = parseInt($(this).prev().val());
            currentVal < 100 ? $(this).prev().val(currentVal + 1) : false;
            dataChange();
        });

        $('#form-search-buy').change(function (e) {
            dataChange();
        });


        $("#select-district").change(function () {
            var districtId = $(this).val();
            setWard(districtId);
        });

        $("#apply-search, .btn-search").click(function (e) {
            App.UI.showLoadding();
            dataChange();
            appSearch();
        });

        $(".p-element .a-close").click(function (e) {
            $(".first-invisible").removeClass("first-invisible");
            var targetInput = $(this).parent().data("target-form");
            var nameProperty = targetInput.replace("-","_").replace("[]",'');
            setForm(targetInput,nameProperty);
            dataChange();
        });

        $("#reset-search").click(function (e) {
            App.UI.showLoadding();
            e.preventDefault();
            var pathName = location.pathname;
            window.location.href = pathName;
            return;
            // $('#form-search-buy').get(0).reset();
            // $.each($(".p-element"),function (key,item) {
            //     if($(item).length!=0){
            //         var nameEle = $(item).data("target-form");
            //         var nameProperty = nameEle.replace("-","_").replace("[]",'');
            //         setForm(nameEle,nameProperty);
            //     }
            // });
            // dataChange();
        });

        $('#form-search-buy .dropdown-menu').on('click', function (e) {
            if (!$(e.target).hasClass("dismiss-dopdown"))
                e.stopPropagation();
        });
        //
        $('#search-buy-rent').change(function(e){
            App.UI.showLoadding();
            if($(this).val() == 1){
                location.href = '/mua/ban-nha-rieng-tphcm';
            } else {
                location.href = '/thue/can-ho-chung-cu-tphcm';
            }
        });
        //
        $('.btn-close-choose').click(function(){
            $('.bl-choose .bl-utilities').removeClass('open');
            $('#btn-filter').attr('aria-expanded',false);
        });
    };
    function countHide(){
        var itemHidden = count = 0;
        var itemsWidth  =0;
        $(".search-elements .p-element."+hasContentClass).each(function (key,item) {
            itemWidth = $(item).outerWidth(true);
            itemsWidth += itemWidth;
            if(itemsWidth > ($(".search-elements").width())){
                itemHidden++;
            }
        });
        return itemHidden;
    }

    function autoResizeSearchElements(){
        var itemHidden = count = 0;
        var itemsWidth  = 0;
        let firstInvisibleElement = null;
        $(".search-elements .p-element."+hasContentClass).each(function (key,item) {
            itemWidth = $(item).outerWidth(true);
            itemsWidth += itemWidth;
            if(itemsWidth > ($(".search-elements").width())){
                if(itemHidden<=0){
                    firstInvisibleElement = item;
                }
                itemHidden++;
            }
        });
        $(".first-invisible").removeClass("first-invisible");
        if(firstInvisibleElement!=null){
            $(firstInvisibleElement).addClass("first-invisible");
        }

    }

    function caculateElementsWidth(){
        var totalWidth = 0;
        $(".search-elements .p-element."+hasContentClass).each(function (key,item) {
            itemWidth = $(item).outerWidth(true);
            totalWidth += itemWidth;
        });
        return totalWidth;
    }


    function showMore() {
        /* Call when data change By Sys Data() function */
        if(caculateElementsWidth() > $(".search-elements").width()){
            if(!$(".input-search").hasClass("active") || !$(".input-search").hasClass("active-search")) {
                $("#show-more-search").show().css({'opacity': 1});
                if(countHide()>0){
                    $("#show-more-search").text(countHide()+" +");
                }
            }else {
                $("#show-more-search").hide().css({'opacity':0});
            }
            /* activeInputSearch(); */
        }
        else {
            $("#show-more-search").hide().css({'opacity':0});
            if($(".input-search").hasClass("active")){
                //$(".input-search").removeClass('active');
                $(".inner-show-search").css({"marginRight":0});
            }
            if($(".input-search").hasClass("active-search")){
                $(".input-search").removeClass('active-search');
            }
        }
        autoResizeSearchElements();
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
            var wardIds = [];
            var data = $(wards).map(function (idx, ele) {
                wardIds.push(ele.wardId);
                return {
                    id: ele.wardId,
                    text: ele.wardName
                };
            }).toArray();
            data.unshift({
                id: wardIds.join(','),
                text: "Tất cả"
            });
            $("#select-ward").select2().empty();
            $("#select-ward").prepend('<option></option>').select2({
                dropdownParent: $(".select-ward"),
                language: {
                    noResults: function(){
                        return "Không có dữ liệu";
                    }
                },
                data: data,
                placeholder: 'Tất cả',
                minimumResultsForSearch: Infinity
            });
            $("#select-ward").prop("disabled", false);
        });
    };
    function setForm(targetInput,nameProperty){
        if(targetInput == "price_slider"){
            $("#price-from").val("");
            $("#price-to").val("");
            var dataDefualt = $("#price-slider").data("slider-default-value");
            self.priceSlider ? self.priceSlider.setValue([dataDefualt[0],dataDefualt[1]],true,true) : false;
        }else if(targetInput == "size_slider"){
            $("#size-from").val("");
            $("#size-to").val("");
            var dataDefualt = $("#size-slider").data("slider-default-value");
            self.sizeSlider ? self.sizeSlider.setValue([dataDefualt[0],dataDefualt[1]],true,true) : false;
        } else if (targetInput=="input_locations"){
            $.query = $.query.remove("locations");
            $(".btn-search").trigger("click");
        }else if (targetInput=="input_keyword"){
            $.query = $.query.remove("keyword");
            $(".search_text").val("").trigger("change");
            $("#input_keyword").val("").trigger("change");
        }else if (targetInput=="is_road_front"){
            $.query = $.query.remove("isRoadFront");
            $("#is_road_front").prop('checked',false).trigger("change");
        }else if (targetInput=="is_alley"){
            $.query = $.query.remove("isAlley");
            $("#is_alley").prop('checked',false).trigger("change");
            $("#alley").val("");
            $("#alley").hide();
        }else if(targetInput == "status_listing"){
            $('.status_listing').prop('checked',false).trigger("change");
        }else{
            var ele  = $("input[name='"+targetInput+"']");
            if(ele.length==0)
                ele  = $("select[name='"+targetInput+"']");
            if(ele.length==0)
                ele  = $("textarea[name='"+targetInput+"']");

            if(ele){
                if(ele.attr("type")=='text'){
                    ele.val(self.dataDefault[nameProperty]).trigger("change");
                }else if(ele.attr("type")=='select'){
                    $(ele.find("option").get(0)).prop('selected','selected').trigger("change");
                } else if(ele.attr("type")=='checkbox'){
                    ele.prop('checked',false).trigger("change");
                } else if(ele.attr("type")=='radio'){
                    /* check radio first */
                    $(ele.get(0)).prop('checked',true).trigger("change");
                }
            }
        }
    };
    function dataChange() {
        self.dataSend = App.UI.objectifyForm($('#form-search-buy'));
        sysData();
    };
    function loadForm() {
        var minprice = self.currentPropertyData.prices[1]['value'];
        var maxPrice = currentPropertyData.prices[self.currentPropertyData.prices.length - 2]['value'];
        var minSize = self.currentPropertyData.sizes[1]['value'];
        var maxSize = currentPropertyData.sizes[self.currentPropertyData.sizes.length - 2]['value'];
        $(".bl-inline.bl-utilities").on("shown.bs.dropdown", function(event){
            /* @TODO: Tối ưu code */
            if(!self.priceSlider){
                self.priceSlider = new Slider("#price-slider", {
                    step: stepPrice(minprice),
                    min: 0,
                    max: maxPrice,
                    ticks: [0, parseInt((0 + maxPrice) / 2), maxPrice],
                    ticks_labels: [0, priceValueSlide(parseInt((0 + maxPrice) / 2), false), priceValueSlide(maxPrice, '+')],
                    ticks_snap_bounds: 30,
                    formatter: function (val) {
                        return priceValueSlide(parseInt(val), false);
                    }
                });
                self.priceSlider.on("slide", function (result) {
                    $('#price-from').val(priceValue(result[0]));
                    $('#price-to').val(priceValue(result[1]));
                    $('.slider-container-price .slider-handle.min-slider-handle').text(priceValueSlide(result[0], false));
                    $('.slider-container-price .slider-handle.max-slider-handle').text(priceValueSlide(result[1], false));
                    if (result[1] === maxPrice) {
                        $('#price-to').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.max-slider-handle').text('10+ tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.max-slider-handle').text('30+ triệu');
                        }
                    }
                    if (result[1] === 0) {
                        $('#price-from').val('');
                        $('#price-to').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0 tỷ');
                            $('.slider-container-price .slider-handle.max-slider-handle').text('10+ tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0');
                            $('.slider-container-price .slider-handle.max-slider-handle').text('30+ triệu');
                        }
                    }
                    if (result[0] === 0) {
                        $('#price-from').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0 tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0');
                        }
                    }
                });
                self.priceSlider.on("change", function (result) {
                    result = result.newValue;
                    $('#price-from').val(priceValue(result[0]));
                    $('#price-to').val(priceValue(result[1]));
                    $('.slider-container-price .slider-handle.min-slider-handle').text(priceValueSlide(result[0], false));
                    $('.slider-container-price .slider-handle.max-slider-handle').text(priceValueSlide(result[1], false));
                    if (result[1] === maxPrice) {
                        $('#price-to').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.max-slider-handle').text('10+ tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.max-slider-handle').text('30+ triệu');
                        }
                    }
                    if (result[1] === 0) {
                        $('#price-from').val('');
                        $('#price-to').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0 tỷ');
                            $('.slider-container-price .slider-handle.max-slider-handle').text('10+ tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0');
                            $('.slider-container-price .slider-handle.max-slider-handle').text('30+ triệu');
                        }
                    }
                    if (result[0] === 0) {
                        $('#price-from').val('');
                        if(listingTypeId == 1){
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0 tỷ');
                        } else {
                            $('.slider-container-price .slider-handle.min-slider-handle').text('0');
                        }
                    }
                });
                var priceFrom = $('#price-from').data('price');
                var priceTo = $('#price-to').data('price');
                $('.slider-container-price .slider-handle.min-slider-handle').text(priceFrom);
                $('.slider-container-price .slider-handle.max-slider-handle').text(priceTo);
            }
            /* @TODO: Tối ưu code */
            if(!self.sizeSlider) {
                self.sizeSlider = new Slider("#size-slider", {
                    step: 10,
                    min: 0,
                    max: maxSize,
                    ticks: [0, parseInt((0 + maxSize) / 2), maxSize],
                    ticks_labels: [0, parseInt((0 + maxSize) / 2) + "m2", maxSize + "+ m2"],
                    ticks_snap_bounds: 30,
                    formatter: function (val) {
                        return sizeValueSlide(val);
                    }
                });
                self.sizeSlider.on("slide", function (result) {
                    self.sizeFrom = result[0];
                    self.sizeTo = result[1];
                    $('#size-from').val(result[0]);
                    $('#size-to').val(result[1]);
                    $('.slider-container-size .slider-handle.min-slider-handle').text(sizeValueSlide(result[0], false));
                    $('.slider-container-size .slider-handle.max-slider-handle').text(sizeValueSlide(result[1], false));
                    if (result[1] === maxSize) {
                        $('#size-to').val('');
                        self.sizeTo = valueDefault.maxSize;
                        $('.slider-container-size .slider-handle.max-slider-handle').text('150+ m2');
                    }
                    if (result[1] === 0) {
                        $('#size-from').val('');
                        $('#size-to').val('');
                        self.sizeFrom = 0;
                        self.sizeTo = valueDefault.maxSize;
                        $('.slider-container-size .slider-handle.min-slider-handle').text('0');
                        $('.slider-container-size .slider-handle.max-slider-handle').text('150+ m2');
                    }
                    if (result[0] === 0 || result[0] === maxSize) {
                        $('#size-from').val('');
                        self.sizeFrom = 0;
                        $('.slider-container-size .slider-handle.min-slider-handle').text('0');
                    }
                });
                self.sizeSlider.on("change", function (result) {
                    var result = result.newValue;
                    self.sizeFrom = result[0];
                    self.sizeTo = result[1];
                    $('#size-from').val(result[0]);
                    $('#size-to').val(result[1]);
                    $('.slider-container-size .slider-handle.min-slider-handle').text(sizeValueSlide(result[0], false));
                    $('.slider-container-size .slider-handle.max-slider-handle').text(sizeValueSlide(result[1], false));
                    if (result[1] === maxSize) {
                        $('#size-to').val('');
                        self.sizeTo = valueDefault.maxSize;
                        $('.slider-container-size .slider-handle.max-slider-handle').text('150+ m2');
                    }
                    if (result[1] === 0) {
                        $('#size-from').val('');
                        $('#size-to').val('');
                        self.sizeFrom = 0;
                        self.sizeTo = valueDefault.maxSize;
                        $('.slider-container-size .slider-handle.min-slider-handle').text('0');
                        $('.slider-container-size .slider-handle.max-slider-handle').text('150+ m2');
                    }
                    if (result[0] === 0 || result[0] === maxSize) {
                        $('#size-from').val('');
                        self.sizeFrom = 0;
                        $('.slider-container-size .slider-handle.min-slider-handle').text('0');
                    }
                });
                var sizeFrom = $('#size-from').data('size');
                var sizeTo = $('#size-to').data('size');
                $('.slider-container-size .slider-handle.min-slider-handle').text(sizeFrom);
                $('.slider-container-size .slider-handle.max-slider-handle').text(sizeTo);
            }
        });
    };
    function sysData() {
        var dataSys = self.dataSend;
        if(dataSys){
            $(".p-element").removeClass(hasContentClass);
            var elementDisplay = "flex";

            if(typeof dataSys.input_locations !="undefined" && dataSys.input_locations.length!=0 && dataSys.input_locations!="null"){
                $("#locations_name_show").addClass(hasContentClass);
            }

            if((typeof dataSys.input_keyword !="undefined" && dataSys.input_keyword.trim().length!=0) ||
                typeof dataSys.search_text !="undefined" && dataSys.search_text.trim().length!=0 && false
            ){
                var showText = dataSys.search_text ? dataSys.search_text: dataSys.input_keyword;
                $("#keyword_name_show span").text("\""+showText+"\"");
                $("#input_keyword").val(showText);
                $("#keyword_name_show").addClass(hasContentClass);
            }

            /* set Dictrict */
            if(typeof dataSys.select_district !="undefined" && dataSys.select_district.length!=0){
                if($("#select-district option:selected").text()!="Tất cả" && $("#select-district option:selected").text()!='') {
                    $("#district_name_show span").text($("#select-district option:selected").text());
                    $("#district_name_show .a-close").show();
                }else{
                    $("#district_name_show span").text("TP.Hồ Chí Minh");
                    $("#district_name_show .a-close").hide();
                }
                $("#district_name_show").addClass(hasContentClass);
            }else{
                $("#district_name_show span").text("TP.Hồ Chí Minh");
                $("#district_name_show").addClass(hasContentClass);
                $("#district_name_show .a-close").hide();
            }

            if(typeof dataSys.select_ward !="undefined" && dataSys.select_ward.length!=0){
                if($("#select-ward option:selected").text()!="Tất cả" && $("#select-ward option:selected").text()!='') {
                    $("#ward_name_show span").text($("#select-ward option:selected").text());
                    $("#ward_name_show").addClass(hasContentClass);
                }
            }

            /* set propertyType */
           if(typeof dataSys.property_type !="undefined" && dataSys.property_type.length!=0){
               $("#property_name_show span").text(self.currentPropertyData.propertyTypeName);
               $("#property_name_show").addClass(hasContentClass).css({'paddingRight':'7px'});
               $("#property_name_show .a-close").hide();
           }
           /* set monoply */
           if(typeof dataSys.monopoly_listing !="undefined"){
                $("#monopoly_listing_show span").text("Đã thẩm định");
                $("#monopoly_listing_show").addClass(hasContentClass);
           }
           /* set status listing */
           if(typeof dataSys.status_listing !="undefined"){
                let textStatus = [];
                if(dataSys.status_listing.length > 0){
                    $.each(dataSys.status_listing,function(index,status){
                        switch(status) {
                            case "5":
                                textStatus.push("Đặc biệt");
                                break;
                            case "6":
                                textStatus.push("Đã thẩm định");
                                break;
                            default:
                                if(listingTypeId == 1){
                                    textStatus.push("Đã bán");
                                } else {
                                    textStatus.push("Đã thuê");
                                }
                        }
                    })
                    $("#status_listing_show span").text("Loại: "+textStatus.join(", "));
                    $("#status_listing_show").addClass(hasContentClass);
                }
           }

           /* set price */
            var priceText = '';
            if($('.slide-input-price:checked').val() == 0){
                if (parseInt(dataSys.price_from.trim()) > 0 && parseInt(dataSys.price_to.trim()) > 0) {
                    priceText = dataSys.price_from.trim() + "-"+ dataSys.price_to.trim();
                }
                if (dataSys.price_to.trim().length == 0 && dataSys.price_from.trim().length!=0) {
                    priceText ="> " + dataSys.price_from.trim();
                }
                if (dataSys.price_from.trim().length == 0 && dataSys.price_to.trim().length!=0) {
                    priceText ="< " + dataSys.price_to.trim();
                }
                if(priceText.trim().length > 1){
                    priceText = priceText.replace("ty-", "-").replace("trieu-", "-").replace("ngan-", "-").trim();
                    $("#price_show span").text(replaceUnit(priceText));
                    $("#price_show").addClass(hasContentClass);
                }
            } else {
                if($('#select-price option:selected').data('max-price') > 0){
                    var min_price = $('#select-price option:selected').data('min-price');
                    var max_price = $('#select-price option:selected').data('max-price');
                    if (parseInt(min_price) > 0 && parseInt(max_price) > 0) {
                        priceText = priceValueSlide(min_price, false) + "-" + priceValueSlide(max_price, false);
                    }
                    if ((max_price.length == 0 || max_price == 1000000000000000) && min_price != 0 && listingTypeId == 1) {
                        priceText ="> " + priceValueSlide(min_price, false);
                    }
                    if ((max_price.length == 0 || max_price == 10000000000) && min_price != 0 && listingTypeId == 2) {
                        priceText ="> " + priceValueSlide(min_price, false);
                    }
                    if (min_price == 0 && max_price != 0) {
                        priceText ="< " + priceValueSlide(max_price, false);
                    }
                    if(priceText.trim().length > 1){
                        $("#price_show span").text(priceText);
                        $("#price_show").addClass(hasContentClass);
                    }
                }
            }
           /* set size*/
            var sizeText = '';
            if($('.slide-input-size:checked').val() == 0){
                if (parseInt(dataSys.size_from.trim()) > 0 && parseInt(dataSys.size_to.trim()) > 0) {
                    sizeText = dataSys.size_from.trim() + " - "+ dataSys.size_to.trim();
                }
                if (dataSys.size_to.trim().length == 0 && dataSys.size_from.trim().length!=0) {
                    sizeText ="> " + dataSys.size_from.trim();
                }
                if (dataSys.size_from.trim().length == 0 && dataSys.size_to.trim().length!=0) {
                    sizeText ="< " + dataSys.size_to.trim();
                }
                if(sizeText.trim().length > 1) {
                    $("#size_show span").text(sizeText.replace(/m²/g,'')+" m²");
                    $("#size_show").addClass(hasContentClass);
                }
            } else {
                if($('#select-size option:selected').data('max-size') > 0){
                    var min_size = $('#select-size option:selected').data('min-size');
                    var max_size = $('#select-size option:selected').data('max-size');
                    if (parseInt(min_size) > 0 && parseInt(max_size) > 0) {
                        sizeText = sizeValueSlide(min_size, false) + " - " + sizeValueSlide(max_size, false);
                    }
                    if ((max_size.length == 0 || max_size == 100000) && min_size != 0) {
                        sizeText ="> " + sizeValueSlide(min_size, false);
                    }
                    if (min_size == 0 && max_size != 0) {
                        sizeText ="< " + sizeValueSlide(max_size, false);
                    }
                    if(sizeText.trim().length > 1){
                        $("#size_show span").text(sizeText);
                        $("#size_show").addClass(hasContentClass);
                    }
                }
            }
            /* set bed*/
            if(typeof dataSys.bed_value !="undefined" && parseInt(dataSys.bed_value)!=0){
                $("#bed_show span").text(dataSys.bed_value+" phòng ngủ");
                $("#bed_show").addClass(hasContentClass);
            }

            /* set bath*/
            if(typeof dataSys.bath_value !="undefined" && parseInt(dataSys.bath_value)!=0){
                $("#bath_show span").text(dataSys.bath_value+" phòng tắm");
                $("#bath_show").addClass(hasContentClass);
            }

            /* set floor*/
            if(typeof dataSys.floor_value !="undefined" && parseInt(dataSys.floor_value)!=0){
                $("#floor_show span").text(dataSys.floor_value+" tầng");
                $("#floor_show").addClass(hasContentClass);
            }

            /* set direction*/
            if(typeof dataSys.direction !="undefined" && dataSys.direction.length!=0){
                var textDirection = [];
                $.each(dataSys.direction,function (key,item) {
                    textDirection.push($("#label_direction_"+item).text());
                });

                $("#direction_show span").text("Hướng: "+textDirection.join(", "));
                $("#direction_show").addClass(hasContentClass);
            }
            /* set mặt tiền */
            if(typeof dataSys.is_front_alley !="undefined" && dataSys.is_front_alley == 0){
                $("#is_road_front_show span").text("Mặt tiền");
                $("#is_road_front_show").addClass(hasContentClass);
            }
            /* set hẻm */
            if(typeof dataSys.is_front_alley !="undefined" && dataSys.is_front_alley == 1){
                if(typeof dataSys.alley !="undefined" && dataSys.alley !== ''){
                    $("#is_alley_show span").text("Hẻm: "+dataSys.alley+"m");
                    $("#is_alley_show").addClass(hasContentClass);
                } else {
                    $("#is_alley_show span").text("Hẻm");
                    $("#is_alley_show").addClass(hasContentClass);
                }
            }
        }
        showMore();
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
    function stepPrice(value) {
        var step;
        if (value > 999999999) {
            step = 1000000000;
        }
        else if (value > 999999) {
            step = 1000000;
        }
        else {
            step = 1000;
        }
        return step;
    };
    function priceValue(value) {
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
    function priceValueSlide(value, icon) {
        var unit;
        if (value > 999999999) {
            unit = " tỷ";
            value = value / 1000000000;
        }
        else if (value > 999999) {
            unit = " triệu";
            value = value / 1000000;
        }
        else {
            if(value === 0){
                unit = '';
            }else{
                unit = " ngàn";
            }
            value = value / 1000;
        }
        if(icon !== false)
            return value + icon + unit;
        return value + unit;
    };
    function sizeValueSlide(value){
        var unit = "m2";
        if(value == 0){
            return '0';
        } else if(value >= 999999){
            return '150+ m2';
        } else {
            return value + unit;
        }
    };
    function replaceUnit(data) {
        return data.replace(/ty/g, " tỷ").replace(/trieu/g, " triệu").replace(/ngan/g, " ngàn").trim();
    };
    function showHideItem() {
        // Toggle Số tầng
        if (currentLogicFilter && currentLogicFilter[0]) {
            $(".select-floor-container").show();
        } else {
            $(".select-floor-container").hide();
            $(".select-floor-container #floor-value").val("0").trigger('change');
        }

        // Toggle Hướng
        if (currentLogicFilter && currentLogicFilter[1]) {
            $(".select-direction-container").show();
        } else {
            $(".select-direction-container").hide();
        }

        // Toggle Phòng ngủ
        if (currentLogicFilter && currentLogicFilter[2]) {
            $(".select-bed-container").show();
        } else {
            $(".select-bed-container").hide();
            $(".select-bed-container #bed-value").val("0").trigger('change');
        }

        // Toggle Phòng tắm
        if (currentLogicFilter && currentLogicFilter[3]) {
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
    
    function appSearch() {
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
        wardId && wardId.split(',').length == 1 ? searchObject.WardIDs = wardId : searchObject.WardIDs=null;
        districtId && districtId.split(',').length == 1 ? searchObject.DistrictIDs = districtId : searchObject.DistrictIDs=null;
        var slug = findSlug(searchObject);
        if (slug == null)
            slug = 'ban-nha-rieng-tphcm';
        renderParams();
        // window.location.href = slugListingType + slug + $.query.toString();
    };
    /* Start Searchbar */
    intit();
    //
    var priceKey = parseInt($('.slide-input-price:checked').val());
    if(priceKey == 0){
        $("#slide-price").trigger('change');
    } else {
        $("#input-price").trigger('change');
    }
    //
    var sizeKey = parseInt($('.slide-input-size:checked').val());
    if(sizeKey == 0){
        $("#slide-size").trigger('change');
    } else {
        $("#input-size").trigger('change');
    }
};