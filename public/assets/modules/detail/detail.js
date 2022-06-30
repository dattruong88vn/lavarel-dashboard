var chart, options, heightMore = 240;

var calculatorLoan = function () {
    var bank = $("#select-bank").val();
    var money = App.Feature.ExtractNumber($("#money").val());
    var years = $("#loan-year").val();
    App.Feature.Get("/api/calculate-loan/" + bank + "/" + money + "/" + years, function (response) {
        var loan = response.loan;
        $("#payPerMonth").text(loan.payPerMonthFormat);
        $("#originalPay").text(loan.originalPayFormat);
        $("#interestPay").text(loan.interestPayFormat);
        data = google.visualization.arrayToDataTable([
            ['PayType', 'MonthlyPay'],
            ['Original', loan.originalPay],
            ['Interest', loan.interestPay]
        ]);
        chart.draw(data, options);
    });
};

App.UI.checkAlpha(["#request-name", "#loan-name"]);
App.UI.inputAllowNumber(["#loan-phone", "#request-phone"], false);
App.UI.removeCheckSuccess("#form-my-loans, .form-info", ['email']);

function checkExpanded(element) {
    return $(element).attr("aria-expanded");
}
var scrollEventSchedule = function () {
    var content = $('.bl-info-customer').parent();
    var contentContactSchedule = $('.bl-info-customer');
    var endScroll = $('.bl-detail-listing').offset().top + $('.bl-detail-listing').height() - contentContactSchedule.height() - 80;
    var contactInnerWidth = $('.col-sm-3.bl-right').width();
    var formContactHeight = content.offset().top - ($("#search-in-detailt").height() + $("header").height());
    var newEndExpanded = endScroll;
    var heightReadmore = $('.bl-info.readmore-block').height();
    $(document).scroll(function () {
        var heightAdd = 0;
        // Check Expanded of myloans.
        if ($("#my-loans").size() > 0) {
            var isExpanded = checkExpanded('#my-loans');
            if (isExpanded) {
                heightAdd = heightAdd + $('#my-loans').height();
            }
            if (isExpanded != undefined && !isExpanded) {
                heightAdd = heightAdd - $('#my-loans').height();
            }
        }
        if ($(".bl-info.readmore-block").size() > 0) {
            var isExpanded = checkExpanded('.bl-info.readmore-block');
            if (isExpanded == 'true') {
                heightAdd = (heightAdd + heightReadmore) - heightMore * 4;
            }
            if (isExpanded == 'false') {
                heightAdd = heightAdd - (heightReadmore - heightMore * 2);
            }
        }
        // Check chiều cao sau khi khách hàng dùng Expanded
        newEndExpanded = endScroll + heightAdd;
        if ($(this).scrollTop() > formContactHeight) {
            contentContactSchedule.addClass('fixed');
            // Check trường hợp khi tới vị trí k cho fix
            if($(this).scrollTop() == 0) {
                contentContactSchedule.css({"width": contactInnerWidth, "top": 105});
                contentContactSchedule.removeClass('fixed-end');
            } else if ($(this).scrollTop() < newEndExpanded - 103) {
                contentContactSchedule.css({"width": contactInnerWidth, "top": 103});
                contentContactSchedule.removeClass('fixed-end');
            } else {
                contentContactSchedule.addClass('fixed-end');
                contentContactSchedule.removeClass('fixed');
                contentContactSchedule.css({"width": contactInnerWidth, "top": newEndExpanded - content.offset().top});
            }
            if ($(".btn-search-advanced.active").size() > 0)
                $("#search-advand").addClass('has-margin-top');
        } else {
            contentContactSchedule.css({"width": contactInnerWidth, "top": 0});
            contentContactSchedule.removeClass('fixed');
            $("#search-advand").removeClass('has-margin-top');
        }
        if ($(this).scrollTop() > $("#search-in-detailt").height()) {
            $("#search-in-detailt").addClass('fixed');
        } else {
            $("#search-in-detailt").removeClass('fixed');
        }
        if ($(this).scrollTop()) {
            $(".is-rented").hide();
        } else {
            $(".is-rented").show();
        }
    });
};
scrollEventSchedule();

var renderLoanYear = function (years) {
    var str = "";
    $(years).each(function (idx, data) {
        str+= '<option value="' + data.value + '" '+ (data.isDefault ? "selected" : "") +'>';
            str+= data.name;
        str+= '</option>';
    });
    $("#loan-year").html(str);
};

var startApp = function () {
    // trang detail ko hiển thị search bar: confirmed from The
    //search_bar();
    $.fn.bootstrapValidator.validators.checkPhone = {
        validate: function (validator, $field, options) {
            var phone = $field.val();
            if (phone.length < 10 || phone.length > 11) {
                return false;
            }
            return true;
        }
    };
    $.fn.bootstrapValidator.validators.timeLate = {
        validate: function (validator, $field, options) {
            if(!$.trim($field.val())) {
                var dateTime = moment($field.val(), "DD/MM/YYYY HH:mm").unix();
                var timeNow = moment().unix();
                if (timeNow > dateTime) {
                    return false;
                }
            }
            return true;
        }
    };

    $(".bl-listing a").each(function () {
        var link = $(this).attr('href');
        link = link.replace("nha-dat", "nha-rieng");
        $(this).attr("href", link);
    });

    $(".form-my-loans, .form-info").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: messages.listingdetail_datlichxem_name_empty
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: messages.listingdetail_datlichxem_phone_empty
                    }
                    , stringLength: {
                        message: messages.listingdetail_datlichxem_phone_wrongformat, min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: messages.listingdetail_datlichxem_email_wrongformat
                    }
                }
            },
            date: {
                validators: {
                    timeLate : {
                        message: "Vui lòng nhập ngày giờ trong tương lai"
                    }
                }
            }
        }
    });
    //

    $('.group-select .form-control').select2({
        minimumResultsForSearch: Infinity
    });

    var numberItem = $('.number-total-item-same').val();
    var loop = false;
    if(numberItem > 4){
       loop = true; 
    }
    $('.owl-carousel').owlCarousel({
        items: 4,
        lazyLoad: true,
        loop:loop,
        margin: 30,
        dots: false,
        autoplay: false,
        slideBy: 4,
        padding: 0,
        stagePadding: 0,
        autoHeight: false,
        responsiveClass:true,
        autoHeightClass: 'owl-height',
        autoplayHoverPause: true,
        nav: true,
        navText:'',
        responsive:{
            0: {
                items: 1
            },
            360:{
                items: 2
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    $('.readmore-block').readmore({
        speed: 1000,
        collapsedHeight: heightMore,
        moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
        lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
        blockCSS: 'display: block;position: relative;'
    });


    $("#money").on("input", function () {
        var value = parseInt(App.Feature.ExtractNumber($(this).val()));
        if (value > maxLoan) {
            value = $('#money').masked(maxLoan);
            $(this).val(value);
        }
    });
    /*$(".payment-method").change(function () {
        $(".method-expander").hide();
        $("#" + $(this).attr("id") + "-expander").fadeIn();
        $("#payment-bank").trigger("change");
    });

    $("#payment-bank").change(function () {
        /!*if($(this).val() == -1){
         $("#payment-bank-other-container").fadeIn();
         }
         else {
         $("#payment-bank-other-container").fadeOut();
         }*!/
    });*/

    $('#money').mask('#.##0', {reverse: true});

    $("#map-canvas").gmap3({
        map: {
            options: {
                panControl: false,
                zoomControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false,
                center: listingGeo,
                zoom: 14,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                scrollwheel: false
            },
            events: {}
        },
        circle: {
            options: {
                center: listingGeo,
                radius: 550,
                fillColor: "#008BB2",
                strokeColor: "#008BB2"
            },
            events: {
                click: function (circle) {
                }
            },
            callback: function () {
            }
        }

    });

    /*** CHART ***/
    if ($('#chart').size() > 0) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(payData);
            options = {
                slices: [{color: '#fb7533'}, {color: '#173e69'}],
                legend: 'none',
                pieHole: 0.8,
                width: 200,
                height: 200,
                pieSliceText: "none",
                animation: {
                    duration: 1000,
                    easing: 'out'
                },
                chartArea: {left: 0, top: 0, width: '100%', height: '100%'}
            };

            chart = new google.visualization.PieChart(document.getElementById('chart'));
            chart.draw(data, options);
        }
        $(document).on("change", "#loan-year", function () {
            calculatorLoan();
        });

        $("#money").change(function () {
            var value = parseInt($(this).cleanVal() || 0);
            if ((!!value && value > maxLoan) || !value) {
                $(this).val($(this).masked(maxLoan));
            }
            calculatorLoan();
        });
        $("#select-bank").change(function () {
            var rate = parseFloat($(this).find("option:selected").attr("rate"));
            $("#loanRate").val(rate + "%");
            var yearData = JSON.parse($(this).find("option:selected").attr("years"));
            renderLoanYear(yearData);
            calculatorLoan();
            return false;
        });
    }

    /**
     * event đặt lịch xem
     */
    $("#btnSendInfo").click(function () {
        var curForm = $(this).closest(".form-info");
        if (!App.UI.checkValidForm(curForm)) {
            App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
            return false;
        }
        App.UI.showLoadding();
        
        if ($("#request-date").val().trim()) {
            postData.date = moment($("#request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        } else {
            postData.date = null;
        }
        //3(Đặt lịch xem)
        postData.requestTypeIds = [3];
        postData.form_type = 3;
        if($('#employee-id').length > 0 && $('#employee-id').val() !== ''){
            postData.promoCode = $('#employee-id').val().trim();
        }
        if($('#customer-name').length > 0 && $('#customer-name').val() !== ''){
            postData.customerName = $('#customer-name').val().trim();
        }
        if($('#customer-phone').length > 0 && $('#customer-phone').val() !== ''){
            postData.customerPhone = $('#customer-phone').val().trim();
        }
        if($('#customer-email').length > 0 && $('#customer-email').val() !== ''){
            postData.email = $('#customer-email').val().trim();
        }
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }
        App.Feature.Post("/api/dat-lich-xem", postData, function (response) {
            App.UI.hideLoadding();
            if(response.code == 410 ) {
                // là moi gioi can login
                App.UI.ShowFormMessage('#popup-login', 'Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập', App.UI.notiTypeError);
                $("#popup-login").modal("show");
            } else {
                if (response.result) {
                    TrackUserRoute.clearVisitedList();
                    $("#popup-schedule").modal("hide");
                    App.Feature.AddIframe("/gui-yeu-cau-thanh-cong");
                    //App.UI.Done("Propzy nhận được yêu cầu của Anh/Chị và sẽ liên hệ trong thời gian nhanh nhất!");
                    $(".bl-info-customer input[type=text]").val('');
                    curForm.data('bootstrapValidator').resetForm();
                    //remarketing fb
                    dataLayer.push({
                        content_ids: postData.content_ids,
                        content_category: postData.content_category,
                        content_type: url_active,
                        value: postData.value,
                        currency: postData.currency
                    });
                    //Tracking Enhanced Ecommerce
                    dataLayer.push({
                        "ecommerce": {
                            "purchase": {
                                "actionField": {
                                    "id": response.data.idCustomer,
                                    "affiliation": "Online Store",
                                    "revenue": response.data.total,
                                    "tax": "0",
                                    "shipping": "0"
                                },
                                "products": [{
                                    "name": title,
                                    "id": postData.content_ids,
                                    "price": postData.value,
                                    "category": category
                                }]
                            }
                        }
                    });

                    window.location.href = '/thank-you';
                } else {
                    App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                }
            }

        }, {
            text: 'Đang gửi dữ liệu...'
        });
    });

    // khả năng vay vốn
    $("#btnRequestInfo").click(function () {
        var curForm = $(".form-my-loans");

        if (!App.UI.checkValidForm(curForm)) {
            //App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
            return false;
        }
        var loanPostData = $.extend(requestPostData, {
            "loan": $("#money").cleanVal(),
            "maturityYearId": parseInt($("#loan-year").val()),
            "paymentMethodId": parseInt($(".payment-method:checked").val()),
            "ageRangeId": parseInt($(".ages:checked").val()),
            "currentPositionId": parseInt($(".positions:checked").val()),
            "monthlyIncomeId": parseInt($(".income:checked").val()),
            "loanFromBankId": parseInt($("#select-bank").val()),
            "interestedRate": parseFloat($("#loanRate").val()),
            "name": $("#loan-name").val().trim(),
            "email": $("#loan-email").val().trim(),
            "phoneNumber": $("#loan-phone").val().trim()
        });

        $('.ajax-loading').show();
        App.Feature.Post("/api/tu-van-vay", loanPostData, function (response) {
            $('.ajax-loading').hide();
            if (response.result) {

                $("#popup-my-loans").modal('hide');
                App.Feature.AddIframe("/gui-yeu-cau-thanh-cong");
                $("#form-my-loans input[type=text]").val('');
                curForm.data('bootstrapValidator').resetForm();

                App.UI.Done(messages.listingdetail_khanangvayvon_thanhcong);
            } else {
                App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
            }
            $('.modal-backdrop.fade').hide();
        });
    });
    var url = window.location.href;
    $("#fb-like").click(function () {
        FB.ui({
            method: 'like',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: url
            })
        }, function (response) {
           
        });
    });

    $("#fb-message").click(function () {
        FB.ui(
            {
                method: 'send',
                link: url
            }, function (response) {});
    });

    var pswpElement = document.querySelectorAll('.pswp')[0];


    /*$('.bl-img-slider .bxslider').bxSlider({
        mode: 'fade',
        captions: true
    });*/
    $(function () {
        $('#request-date').datetimepicker({
            format: 'DD/MM/YYYY HH:mm',
            minDate: moment(),
            maxDate: moment()+ (13*86460*1000)
        });
        $('#request-date').on('dp.change', function(e){
            $(".form-info").bootstrapValidator('revalidateField', 'date');
        });
        /*$('.div-img').fancybox(
            {
                loop : true,
                transitionEffect : 'circular',
                protect : true,
                buttons : [
                    'fullScreen',
                    'thumbs',
                    'zoom',
                    'close'
                ],
                clickOutside : false,
                clickContent : 'zoom',
                clickSlide : false,
            });*/

    });
    //
    $('#form-infos-customer').click(function(event){
        event.stopPropagation();
    });
    $('.close-form-infos').click(function(){
        $(this).parent().parent().removeClass('open');
    });
    $('.btn-form-infos').click(function(){
        $(this).parent().parent().parent().removeClass('open');
    });

    $(document).on("DOMContentLoaded load resize click scroll mousemove touchstart touchend touchmove mouseup", function(){
        $(".bl-detail-listing .lazy").Lazy({
            effect: "fadeIn",
            chainable: false,
            delay: 0,
            afterLoad: function(element) {
                element.removeClass("lazy");
            },
            onFinishedAll: function() {
                if( !this.config("autoDestroy") )
                    this.destroy();
            },
            // called whenever an element could not be handled
            onError: function(element) {
                var imageSrc = element.data('src');
                element.attr('src', '/assets/images/listing-no-image.png');
            }
        });
    });
    
    $('.bl-360-thumpnail').on('click', function (e) {
        e.stopPropagation();
        $('#modal-show-360').modal('show');
    });
};

$('.bl-img-slider .bx-prev').click(function(){
    var index = Number.parseInt($('.bl-img-slider .div-img.active').data('index'));
    var length = $('.bl-img-slider .div-img').length;
    if ((index - 1) >= 0) {
        index = index - 1;
    } else {
        index = length - 1;
    }
    // remove active
    $('.bl-img-slider .div-img').removeClass('active');
    // add active
    $('.bl-img-slider .div-img[data-index="'+index+'"]').addClass('active');
    $('.bl-img-slider .bl-number-img').html((index + 1) + "/" + length);
    return false;
});

$('.bl-img-slider .bx-next').click(function(){
    var index = Number.parseInt($('.bl-img-slider .div-img.active').data('index'));
    var length = $('.bl-img-slider .div-img').length;
    if ((index + 1) < length) {
        index = index + 1;
    } else {
        index = 0;
    }
    // remove active
    $('.bl-img-slider .div-img').removeClass('active');
    // add active
    $('.bl-img-slider .div-img[data-index="'+index+'"]').addClass('active');
    $('.bl-img-slider .bl-number-img').html((index + 1) + "/" + length);
    return false;
});

// slide
$('.bl-img-slider').click(function(){
    var propertyImages =  [];
    $(".div-img img").each(function(){
        propertyImages.push({ src:$(this).data("imageLarge"), type : "image", opts : {} });
    });

    //var self = $(this);
    var index = $(this).find(".div-img.active").data("index");
    $.fancybox.open(propertyImages, {
        loop : true,
        transitionEffect : 'circular',
        buttons : [
            'fullScreen',
            'thumbs',
            'zoom',
            'close'
        ],
        clickContent : 'zoom',
        clickSlide : false
    }, parseInt(index));
    return false;
});

/**
 * event click show map
 * */
$(document).off('click', '.bl-img-slider #show-map-listing').on('click','.bl-img-slider #show-map-listing' ,function (e) {
    e.preventDefault();
    $('.bl-img-slider').css({"display": "none"});
    $('.bl-map-listing').css({"display": "block"});
    return false;
});
$(document).off('click', '.bl-map-listing #show-slider-listing').on('click','.bl-map-listing #show-slider-listing' ,function (e) {
    e.preventDefault();
    $('.bl-img-slider').css({"display": "block"});
    $('.bl-map-listing').css({"display": "none"});
    return false;
});
$(document).ready(function(){
    NumberInputUtil.numberToLabel("#money");
});
var onChangeInput = function(event) {
    let name = event.target.name;
    NumberInputUtil.numberToLabel("#" + name);
};
