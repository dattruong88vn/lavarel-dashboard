var chart, options, heightMore = 240;
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
    }, false);
};

App.UI.checkAlpha(["#request-name", "#loan-name"]);
App.UI.inputAllowNumber(["#loan-phone", "#request-phone"], false);
App.UI.removeCheckSuccess("#form-my-loans, .form-info", ['email']);

function checkExpanded(element) {
    return $(element).attr("aria-expanded");
}
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
    $(".form-my-loans, .form-info, .form-tuvan-modal").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        },
        fields: {
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
    /**
     * event đặt lịch xem
     */
    $("#btnSendInfo").click(function () {
        var cart = Cart.getCart();
        var listingId = $('#btnSendInfo').attr('listingid');
        var isDuplicate = false;

        for (var i = 0 ; i < cart.fav.length ; i++) {
            if (cart.fav[i].id == listingId) {
                isDuplicate = true;
            } 
        }
                    
        if (!isLogin) {
            if (cart.fav.length >= 3 && !isDuplicate) {
               
                $('#btnRequireLogin').click();
                return false;
            } 
        }

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
                    // check user login & add listing to yeu-thich page
                    if (!isLogin) {
                        // var isDuplicate = false;
                        // for (var i = 0 ; i < cart.fav.length ; i++) {
                        //     if (cart.fav[i].id == listingId) {
                        //         isDuplicate = true;
                        //     } 
                        // }
                        var objFav = { id: parseInt(listingId) };
                        
                        var scheduleTime = postData.date;
                        if ( postData.date == null ) {
                            scheduleTime =  Date.now();
                        }

                        // check objSchedule in cart cookie?
                        var isDuplicateSchedule = false;
                        cart.scheduled.find(item => {
                            if (item.id == listingId) {
                                item.scheduleTime = scheduleTime;
                                if (!isDuplicate) {
                                    cart.fav.push(objFav);
                                }
                                isDuplicateSchedule = true;
                            } 
                        });

                        if (!isDuplicateSchedule && !isDuplicate) {
                            var objSchedule = { id: parseInt(listingId), scheduleTime: scheduleTime };
                            if (!isDuplicate) {
                                cart.fav.push(objFav);
                                cart.scheduled.push(objSchedule);
                            }
                        }
                        Cart.updateCart(cart);
                    }

                    TrackUserRoute.clearVisitedList();
                    $(".bl-info-customer input[type=text]").val('');
                    curForm.data('bootstrapValidator').resetForm();
                    window.location.href = '/thank-you';
                } else {
                    App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
                }
            }
        }, {
            text: 'Đang gửi dữ liệu...'
        });
    });
    $("#btnSendInfoModal").click(function () {
        var curForm = $(this).closest(".form-tuvan-modal");
        if (!App.UI.checkValidForm(curForm)) {
            App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
            return false;
        }
        App.UI.showLoadding();
        
        if ($("#modal-request-date").val().trim()) {
            postData.date = moment($("#modal-request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        } else {
            postData.date = null;
        }
        //3(Đặt lịch xem)
        postData.requestTypeIds = [3];
        postData.form_type = 3;
        if($('#modal-customer-name').length > 0 && $('#modal-customer-name').val() !== ''){
            postData.customerName = $('#modal-customer-name').val().trim();
        }
        if($('#modal-customer-phone').length > 0 && $('#modal-customer-phone').val() !== ''){
            postData.customerPhone = $('#modal-customer-phone').val().trim();
        }
        if($('#modal-customer-email').length > 0 && $('#modal-customer-email').val() !== ''){
            postData.email = $('#modal-customer-email').val().trim();
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
            "paymentMethodId": parseInt($("#loan-payment-menthod").val()),
            "ageRangeId": parseInt($("#loan-age-range").val()),
            "currentPositionId": parseInt($("#loan-current-job").val()),
            "monthlyIncomeId": parseInt($("#loan-monthly-money").val()),
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
                $(".form-my-loans input[type=text]").val('');
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
    $(function () {
        $('#request-date, #modal-request-date').datetimepicker({
            format: 'DD/MM/YYYY HH:mm',
            minDate: moment(),
			maxDate: moment() + (13 * 86460 * 1000),
            date: new Date(moment() + (30 * 60 * 1000)),
        });
        $('#request-date').on('dp.change', function(e){
            $(".form-info").bootstrapValidator('revalidateField', 'date');
        });
        $('#modal-request-date').on('dp.change', function(e){
            $(".form-tuvan-modal").bootstrapValidator('revalidateField', 'date');
        });
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
   
    // show maps
    $("#show-map-listing").click(function(){
        $('#popup-map-detail').modal();
        myMap(listingGeo[1], listingGeo[0]);
    });

    // show 360
    $('.bl-360-thumpnail').on('click', function (e) {
        e.stopPropagation();
        $('#modal-show-360').modal('show');
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
            radius: 300
        });
    };
    //
};

// slide
$('.bl-zoom').click(function (e) {
	$.fancybox.open(propertyImages, {}, $('.syn-slider-2 .owl-item').index($('.syn-slider-2 .owl-item.current')));
});

$('.syn-slider-1 .item').click(function (e) {
	$.fancybox.open(propertyImages, {}, $('.syn-slider-2 .owl-item').index($('.syn-slider-2 .owl-item.current')));
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
    ListingByLocationLoader.loadBlockSamePrice.setPlatform('desktop')
    .loadContent('#bl-same-price', dataPostSamePriceListing, function(){
        if (isProject) {
            ListingByLocationLoader.loadBlockSameProject.setPlatform('desktop').loadContent('#bl-same-project', dataPostSameProject);
        }
    });
}, 2000);
$(document).ready(function(){
    NumberInputUtil.numberToLabel("#money");
});
var onChangeInput = function(event) {
    let name = event.target.name;
    NumberInputUtil.numberToLabel("#" + name);
}; 