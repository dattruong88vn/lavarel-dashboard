
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

var PropzySlickSlider = (function(){
    var initDefaultMobileSlider = function(){
        $(".slick-slider").slick({
          dots: false,
          infinite: true,
          speed: 500,
          arrows: false,
          centerMode: true,
          centerPadding: '30px'
        });   
    };
    return {
        'initDefaultMobileSlider': initDefaultMobileSlider
    };
})();



var verifyCaptchaSendPhoneApp = function(token){
    App.Feature.Get('/api/verify-recaptcha/'+token, function(response){
        grecaptcha.reset();
        if(response.success){
            SendPhoneApp.send(true);                               
        }
    });
};

var SendPhoneApp = (function(){
    var theForm = $(".form-send-phone-app");
    var send = function(force){
        theForm.find(".bl-input-captcha").hide();
        var phone = theForm.find('#phone-app').val();
        var isOwner = theForm.find('#is-owner').val()==1;
        var postData = {
                "phone": phone,
                "is_owner": isOwner
        };
        if(force){
            postData.force = force;
        }
        App.Feature.Post("/api/send-sms-app", postData, function (response) {            
            if(response.result){
                theForm.find('#phone-app').val("");
                App.UI.Done(messages.home_taiapp_thanhcong);
            } else {
                if(response.code==409){
                    App.UI.Error("Bạn đã nhập số điện thoại quá số lần cho phép. Vui lòng xác nhận captcha để tiếp tục.");
                    theForm.find(".bl-input-captcha").show();
                }else{
                    App.UI.Error(messages.home_taiapp_error);
                }
            }
        });
    };
    return {
        'send': send
    };
})();


var initSpanEyes = function(){
    $(".span-eyes").unbind("click");
    $(".span-eyes").on('click', function(){
        $(this).parent().find('input').each(function(){
            if ($(this).attr('type') == 'password') {
                $(this).attr('type', 'text');
            } else {
                $(this).attr('type', 'password');
            }
        });
    });
};

// Listing is Seen
jQuery( document ).ready(function() {
    $(document).on('click', '.btn-share', function(){
        if ($(this).data('href'))
            window.open('http://www.facebook.com/sharer.php?u=' + location.protocol + "//" + location.host + $(this).data('href'), '', 'width=450,height=450');
    });
    $("#guideline").css({'width': '100%'});
    $(document).on('click', '.box', function(){
        if ($('.actives').length) {
            $('.actives').not($(this)).removeClass('actives').addClass('box');
        }
        $(this).removeClass('box').addClass('actives');
    });

    var replaceLiveChat = setInterval(function () {
        if ($('body').find('.bx-imopenlines-config-sidebar-info-inner').length > 0) {
            $(".bx-imopenlines-config-sidebar-info-block-container .bx-imopenlines-config-sidebar-info-title").text("");
            $(".bx-imopenlines-config-sidebar-social-title-item").text("");
            clearInterval(replaceLiveChat);
        }
    }, 1000);

    // close sidebar menu mobile
    $('#close-nav-mobile').click(function () {
        $('#menufull').removeClass('toggle');
        $('body').removeClass('showMenu');
    });

    // close sidebar menu desktop
    $('#close-nav').click(function() {
        $('#menu-toggle').trigger('click');
        $('body').removeClass('showMenu');
        $('body').removeClass('scroll-page');
    });
    
    $(document).on("click", '#forgot-password', function(){
        $('#popup-login').modal('hide');
        $('#popup-forgot-password').modal();
    });
    //
    var checkValidForm = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            }
            , fields: {
                forgot_input: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập giá trị'
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    var checkValidFormReset = function (form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator({
            message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                password: {
                    validators: {
                        notEmpty: {
                            message: 'Bạn chưa nhập password'
                        },
                        stringLength: {
                            message: "Mật khẩu từ 6 đến 20 ký tự", min: 6, max: 20
                        }
                    }
                },
                code: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập mã xác nhận'
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    $("#forgotPassword input[name='forgot_input']").keypress(function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $('#continue-forgot-password').trigger('click');
        }
    });
    $(document).on('click', '#continue-forgot-password', function(){
        $('#popup-forgot-password').find(".flash-message").remove();
        $('.errors_input').html('');
        var curForm = $(this).closest("#forgotPassword");
        if (!checkValidForm(curForm)) {
            return false;
        }
        var forgot_input = $('#forgot_input').val();
        var postData = {};
        if (App.UI.isValidEmail(forgot_input)) {
            postData.email = forgot_input;
            postData.phone = null;
            App.Feature.Post("/api/forgot-password", postData, function (response) {
                if (response.result) {
                    $('#popup-forgot-password').modal('hide');
                    App.UI.Info('Vui lòng kiểm tra email để đổi mật khẩu');
                    $('#modal-info').on('hide.bs.modal', function () {
                        $('.modal-backdrop.fade').hide();
                    });
                } else {
                    if (response.code == 401) {
                        App.UI.ShowFormMessage('#popup-forgot-password', 'Email này chưa được đăng ký', App.UI.notiTypeError);
                    } else if (response.code == 402) {
                        App.UI.ShowFormMessage('#popup-forgot-password', 'Email này chưa được kích hoạt', App.UI.notiTypeError);
                    } else {
                        App.UI.ShowFormMessage('#popup-forgot-password', response.message, App.UI.notiTypeError);
                    }
                    //
                    $('#modal-error').on('hide.bs.modal', function () {
                        $('.modal-backdrop.fade').hide();
                    });
                }
            });
        } else if (App.UI.validatePhone(forgot_input)) {
            postData.email = null;
            postData.phone = forgot_input;

            App.Feature.Post("/api/forgot-password", postData, function (response) {
                if (response.result) {
                    $('#popup-forgot-password').modal('hide');
                    $('#popup-re-password-phone').modal();
                    //
                    $(document).on('click', '#reset-pass-phone', function(){
                        var curForm = $(this).closest("#resetPassword");
                        if (!checkValidFormReset(curForm)) {
                            return false;
                        }
                        var phone = forgot_input;
                        var email = null;
                        var code = $('#code').val();
                        var newPassword = $('#password').val();
                        var dataSend = {};
                        dataSend.phone = phone;
                        dataSend.email = email;
                        dataSend.code = code;
                        dataSend.newPassword = newPassword;
                        //
                        App.Feature.Post("/api/reset-password", dataSend, function (response) {
                            if (response.result) {
                                App.UI.Info('Cập nhật mật khẩu mới thành công');
                                $('#popup-re-password-phone').modal('hide');
                            } else {
                                App.UI.ShowFormMessage('#popup-re-password-phone', response.message, App.UI.notiTypeError);
                            }
                            $("#reset-pass-phone").unbind("click");
                        });
                    });
                } else {
                    if (response.code == 401) {
                        App.UI.ShowFormMessage('#popup-forgot-password', 'Số điện thoại này chưa được đăng ký', App.UI.notiTypeError);
                    } else if (response.code == 402) {
                        App.UI.ShowFormMessage('#popup-forgot-password', 'Số điện thoại này chưa được kích hoạt', App.UI.notiTypeError);
                    } else {
                        App.UI.ShowFormMessage('#popup-forgot-password', response.message, App.UI.notiTypeError);
                    }
                }
            });
        } else {
            $('.errors_input').html('Email/Số điện thoại không hợp lệ');
            $('#form-input').removeClass('has-success');
            $('#form-input').addClass('has-error');
            $('#forgot_input').next().removeClass('glyphicon-ok');
            $('#forgot_input').next().addClass('glyphicon-remove');
            return false;
        }
    });

    if(App.UI.isMobile()){
        $(".modal").on('shown.bs.modal', function (e) {
            setTimeout(function () {
               if(!$("body").hasClass("modal-open"))
                    $("body").addClass("modal-open");
            },500);
        });
        $('.modal').on('shown.bs.modal', function () {
            //$(".modal-backdrop").remove();
            $(this).delay(100).before($('.modal-backdrop'));
        });
        $(".modal").on('hide.bs.modal', function (e) {
            $(".modal-backdrop").remove();
            $("body").removeClass("modal-open");
        });
    }

});

var getUserLocation = function(successCallback, errorCallback) {
    let obj = {
        lat: null,
        lng: null,
        result: null,
        message: null
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position){
            obj.lat = position.coords.latitude;
            obj.lng = position.coords.longitude;
            obj.result = true;
            obj.message = "Get location success";
            successCallback(obj);
          },
          function () {
            obj.result = false;
            obj.message = "Geolocation is not supported by this browser.";
            errorCallback(obj);
          }
        );
    } else {
        obj.result = false;
        obj.message = "Geolocation is not supported by this browser.";
        errorCallback(obj);
    }
};

const NumberInputUtil = {
    arrNumber: ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'],
    readDozens: function (num, bol)
    {
        let str = "";
        let dozen = Math.floor(num / 10);
        let unit = num % 10;
        if (dozen > 1) {
            str = " " + this.arrNumber[dozen] + " mươi";
            if (unit == 1) {
                str += " mốt";
            }
        } else if (dozen == 1) {
            str = " mười";
            if (unit == 1) {
                str += " một";
            }
        } else if (bol && unit > 0) {
            str = " lẻ";
        }
        if (unit == 5 && dozen >= 1) {
            str += " lăm";
        } else if (unit > 1 || (unit == 1 && dozen == 0)) {
            str += " " + this.arrNumber[unit];
        }
        return str;
    },
    readBlock: function (num, bol)
    {
        let str = "";
        let hundred = Math.floor(num / 100);
        num = num % 100;
        if (bol || hundred > 0) {
            str = " " + this.arrNumber[hundred] + " trăm";
            str += this.readDozens(num, true);
        } else {
            str = this.readDozens(num, false);
        }
        return str;
    },
    readMillions: function (num, bol)
    {
        let str = "";
        let million = Math.floor(num / 1000000);
        num = num % 1000000;
        if (million > 0) {
            str = this.readBlock(million, bol) + " triệu";
            bol = true;
        }
        thousand = Math.floor(num / 1000);
        num = num % 1000;
        if (thousand > 0) {
            str += this.readBlock(thousand, bol) + " ngàn";
            bol = true;
        }
        if (num > 0) {
            str += this.readBlock(num, bol);
        }
        return str;
    },
    numberToText: function(number){
        if (number == 0) return this.arrNumber[0];
        let str = "", strBillion = "";
        do {
            billion = number % 1000000000;
            number = Math.floor(number / 1000000000);
            if (number > 0) {
                str = this.readMillions(billion, true) + strBillion + str;
            } else {
                str = this.readMillions(billion, false) + strBillion + str;
            }
            strBillion = " tỷ";
        } while (number > 0);
        return str + " đồng";
    },
    numberToLabel: function(selector){
        if ($(selector).length > 0) {
            let data = $(selector).val().replace(/\./g, '');
            let content = $(selector).val().length > 0 ? this.numberToText(data) : "";
            let element = $(selector).parent().find(".lblTextNumber");
            if (element.length > 0) {
                element.html(this.capitalize(content.trim()));
            } else {
                $("<label class='lblTextNumber' style='font-weight:300;font-style:italic;font-size: 14px;color: #676767;'>" + this.capitalize(content.trim()) + "</label>").insertAfter(selector); 
            }
        }
    },
    capitalize: function (s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
};

var loadCommonsModal = function(successCallback){
    $(".lazy-html").each(function(){
        let html = $(this).html();
        $(html).insertAfter($(this));
        $(this).remove();
    });
    initSpanEyes();    
    Mycollection.init();
    if(document.getElementById("common-modals")!=null){
        if(typeof successCallback != 'undefined' && successCallback){
            successCallback();
        }
        return false;
    }
};

var reloadAssets = function(version){
    var oldVersion = App.Feature.getCookie("version");
    if(version==oldVersion){
        return false;
    }
    var assets = [
        "/assets/images/svg-icons.svg?v=03.06.2019"
    ];
    for(var i=0;i<assets.length; i++){
        $.ajax({
            cache: false,
            url: assets[i]
        });
    }
    App.Feature.setCookie("version", version);
};

var shareShowHide = function(element) {
    if($(element).length > 0) {
        $(element).toggleClass("active");
    }   
};








