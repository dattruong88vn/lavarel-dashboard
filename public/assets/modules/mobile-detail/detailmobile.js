var chart, options, heightMore = 250;
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
    // init date time
    $("#request-date").datepicker({
        locale: 'vi',
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + (13*86460*1000))
    }).on('hide', function(e) {
        e.stopPropagation();
    }).on('focus',function(){
        $(this).trigger('blur');
    });

    $('.bxslider').slick({
        "arrows": false
    });

    $('.bxslider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      // console.log(currentSlide);
      $(".current_photo_index").html(currentSlide+1);
    });

    if($("#request-time").attr('type') == 'text'){
        $("#request-time").timepicker({
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            showInputs : false,
            defaultTime : 'current'
        }).on('focus',function(){
            $(this).trigger('blur');
        });
    }

    if($("#popup-schedule #request-time").attr('type') == 'text'){
        //console.log($("#popup-schedule #request-time"));
        $("#popup-schedule #request-time").timepicker({
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            showInputs : false,
            defaultTime : 'current'
        }).on('focus',function(){
            $(this).trigger('blur');
        });
    }
    //
    $(document).on('click', '.text-open-app-detail', function(){
        if(device_os == 'ios'){
            var link_open = link_open_diy + 'listing_detail?listingId='+ rlistingId + '&listingTypeId=' + listingTypeId + '&propertyTypeId=' + propertyTypeId;
        } else {
            var link_open = link_open_diy + '?listingId='+ rlistingId + '&listingTypeId=' + listingTypeId + '&propertyTypeId=' + propertyTypeId;
        }
        setTimeout(function () {
            window.location.replace(link_sam_redirect);
        }, 25);
        window.location = link_open;
    });
    //
    $.fn.bootstrapValidator.validators.checkPhone = {
        validate: function (validator, $field, options) {
            var phone = $field.val();
            if (phone.length > 0) {
                if (phone.length < 10 || phone.length > 11) {
                    return false;
                }
                return true;
            }
        }
    };
    $("#sort").change(function () {
        var value = parseInt($(this).val());
        if (value > 0) {
            window.location.search = $.query.set("sapxep", value);
        } else {
            $.query.remove("sapxep");
        }
    });
    //search_bar();
    $("#money").on("input", function () {
        var value = parseInt(App.Feature.ExtractNumber($(this).val()));
        if (value > maxLoan) {
            value = $('#money').masked(maxLoan);
            $(this).val(value);
        }
    });

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
                zoom: 13,
                disableDefaultUI: true,
                disableDoubleClickZoom: true,
                draggable: false,
                scrollwheel: false
            }
        },
        circle: {
            options: {
                center: listingGeo,
                radius: 1000,
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

    App.UI.checkAlpha(["#request-name", "#loan-name"]);
    App.UI.inputAllowNumber(["#loan-phone", "#request-phone"], false);
    App.UI.removeCheckSuccess("#my-loans, .form-info", ['email']);

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
            }
        }
    });
    //
    $("#popup-schedule").on('shown.bs.modal', function (e) {
        $('#request-date').parents().find('.errors').text('');
    });
    $("#btnSendInfo").click(function () {
        $('#request-date').parents().find('.errors').text('');
        var curForm = $(this).closest(".form-info");
        if (!App.UI.checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        var date = $("#request-date").val();
        var time = $("#request-time").val();
        if(date !== '' && time !== ''){
            var dateTime = moment(date + " " + time, "DD/MM/YYYY HH:mm").unix();
            if (!$.isNumeric(dateTime) || moment().unix() > dateTime) {
                App.UI.Error("Ngày giờ đặt lịch xem đã quá hạn. Xin vui lòng chọn ngày khác ");
                return false;
            }
        }
        postData.requestTypeIds = [3];
        //3(Đặt lịch xem)
        postData.form_type = 7;
        postData.date = null;
        if(date !== '' && time !== ''){
            postData.date = moment(date + " " + time, "DD/MM/YYYY HH:mm").unix() * 1000;
        } else {
            postData.date = null;
        }
        if($('#employee-id').length > 0 && $('#employee-id').val().trim() !== ''){
            postData.promoCode = $('#employee-id').val().trim();
        }
        if($('#customer-name').length > 0 && $('#customer-name').val().trim() !== ''){
            postData.customerName = $('#customer-name').val().trim();
        }
        if($('#customer-phone').length > 0 && $('#customer-phone').val().trim() !== ''){
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
                                    "shipping": "0",
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
        });
    });

    $("#btnRequestInfo").click(function () {
        var curForm = $(".form-my-loans");
        if (!App.UI.checkValidForm(curForm)) {
            //App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
            return false;
        }
        var loanPostData = $.extend(requestPostData, {
            "loan": $("#money").cleanVal(),
            "maturityYearId": parseInt($("#loan-year").val()),
            "paymentMethodId": parseInt($("#payment-method").val()),
            "ageRangeId": parseInt($("#ages").val()),
            "currentPositionId": parseInt($("#positions").val()),
            "monthlyIncomeId": parseInt($("#income").val()),
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
                App.UI.Done(messages.listingdetail_khanangvayvon_thanhcong);
                $(".form-my-loans input[type=text]").val('');
                curForm.data('bootstrapValidator').resetForm();
            } else {
                App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
            }
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
    
    $('.img-detail .owl-carousel .owl-dots').remove();

    $('.img-detail .owl-carousel').on('changed.owl.carousel', function (e) {
        if (!e.namespace || e.property.name !== 'position')
            return;
        $('#info-slide').text(e.relatedTarget.relative(e.item.index) + 1 + '/' + e.item.count);
    });

    var path = document.referrer;
    var lastUrl = path.split('/');
    if (lastUrl.length > 4) {
        var parts = lastUrl[4].split('-');
        var lastSegment = parts.pop();
        var stringId = lastSegment.substr(0, 2);
        if (stringId !== 'id' && App.UI.isMobile()) {
            App.Feature.setCookie("from_detail", 1);
            App.Feature.setCookie("path_search", path);
        }
    }
    //
    $('.btn-call').click(function(){
        location.href = 'tel:02873066099';
    });

    $('.bl-360-thumpnail').on('click', function (e) {
        e.stopPropagation();
        $('#modal-show-360').modal('show');
    })
};

// slide
$('.bl-zoom').click(function () {
    var self = $(this);
    $.fancybox.open(propertyImages, {}, parseInt(self.attr("index")));
    return false;
});

$(document).off('click', '.bl-img-slider .bx-prev').on('click','.bl-img-slider .bx-prev' ,function () {
    $('.bxslider').slick("slickPrev");
    //
    return false;
});
$(document).off('click', '.bl-img-slider .bx-next').on('click','.bl-img-slider .bx-next' ,function () {
    $('.bxslider').slick("slickNext");
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
    setTimeout(function(){
        $('.readmore-block').readmore({
            speed: 1000,
            collapsedHeight: heightMore,
            moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
            lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
            blockCSS: 'display: block;position: relative;'
        });
    }, 2000);
});
$(document).ready(function(){
    NumberInputUtil.numberToLabel("#money");
});
var onChangeInput = function(event) {
    let name = event.target.name;
    NumberInputUtil.numberToLabel("#" + name);
};