var chart, options, heightMore = 250;
var calculatorLoan = function () {
    var calculatorPostData = {
        "bankId": $("#select-bank").val(),
        "loanAmount": App.Feature.ExtractNumber($("#money").val()),
        "maturity": $("#loan-year").val()
    };
    App.Feature.Post("/api/calculate-loan", calculatorPostData, function (response) {
        if (response.result) {
            var loan = response.data;
            $(".payPerMonth").text(loan.payPerMonthFormat);
        }
    }, true);
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
        // console.log(link_open);
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
                    $(".bl-info-customer input[type=text]").val('');

                    curForm.data('bootstrapValidator').resetForm();

                    window.location.href = '/thank-you';
                } else {
                    App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                }
            }
        }, true);
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
                $("#vayvonModal").modal('hide');
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

    $(".navigator-share").click(function () {
        // FB.ui(
        //     {
        //         method: 'send',
        //         link: url
		//     }, function (response) {});

		if (navigator.share === undefined) {
			return;
		}

		if (navigator.share) {
			navigator.share({
				title: 'propzy.vn',
				text: 'PROPZY',
				url: url
			});
		}
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
    });

    var dataPostSamePriceListing = {
        listingId : dataListingInfo.listingId,
        listingTypeList : dataListingInfo.listingTypeId,
        propertyList : dataListingInfo.propertyTypeId,
        statusListing : dataListingInfo.stampType,
        cityIds : dataListingInfo.cityId,
        districtIds : dataListingInfo.districtId
    };
    if (isProject) {
        var dataPostSameProject = {
            listingId : dataListingInfo.listingId,
            listingTypeList : dataListingInfo.listingTypeId,
            propertyList : dataListingInfo.propertyTypeId,
            projectId : dataListingInfo.projectId
        };
    }
    // request get listing similar
    setTimeout( function() {
        ListingByLocationLoader.loadBlockSamePrice.setPlatform("mobile")
        .loadContent('#bl-same-price', dataPostSamePriceListing, function(){
            if (isProject) {
                ListingByLocationLoader.loadBlockSameProject.setPlatform("mobile").loadContent('#bl-same-project', dataPostSameProject);
            }
        });
    }, 2000);

    // add cart and redirect
    $('#main #btn-schedule').on('click', function(){

        if (!isLogin) {
            
            var cart = Cart.getCart();
           
            var listingId = $(this).attr('listingid');
            var isDuplicate = false;
            for (var i = 0 ; i < cart.fav.length ; i++) {
                if (cart.fav[i].id == listingId) {
                    isDuplicate = true;
                }
            }

            if (cart.fav.length >= 3 && isDuplicate) {
                window.location.href = window.location.origin + '/yeu-thich';
                return false;
            } else if (cart.fav.length >= 3 ) {
                $('#btnRequireLogin').click();
                return false;
            }

            if (!isDuplicate) {
                cart.fav.push(JSON.parse($(this).attr("object")));
                Cart.updateCart(cart);
            }
           
            window.location.href = window.location.origin + '/yeu-thich';
        } else {
            $('#popup-schedule').modal();
        }
    });
    // show maps
    $("#show-map-listing").click(function(){
        $('#popup-map-detail').modal();
        myMap(listingGeo[1], listingGeo[0]);
    });
    
    function myMap(long, lat) {
        var mapCanvas = document.getElementById('map');
        var myCenter = new google.maps.LatLng(lat, long);

        var mapOptions = {
            center: myCenter,
            zoom: 16
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var wellCircle = new google.maps.Circle({
            strokeColor: '#008BB2',
            fillColor: '#008BB2',
            map: map,
            center: new google.maps.LatLng(listingGeo[0], listingGeo[1]),
            radius: 200
        });
    };

};

// slide
$('.bl-zoom').click(function () {
    $.fancybox.open(propertyImages, {}, $('.project-detail-feature .owl-dot').index($('.project-detail-feature .owl-dot.active')));
});

$('.project-detail-feature .owl-carousel .item').click(function () {
    $.fancybox.open(propertyImages, {}, $('.project-detail-feature .owl-dot').index($('.project-detail-feature .owl-dot.active')));
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