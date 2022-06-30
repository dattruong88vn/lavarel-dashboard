var startApp = function() {
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    if(!App.UI.isMobile()) {
        $('.slider').bxSlider({
            responsive: false,
            useCSS: false,
            auto: true,
            autoStart: true,
            autoReload: true,
            infiniteLoop: true,
            controls: true,
        });

        $('.slider-tab').bxSlider({
            responsive: false,
            useCSS: false,
            auto: true,
            autoStart: true,
            autoReload: true,
            infiniteLoop: true,
            controls: true,
        });
    }else{
        $('.slider').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: false
                }
            }
        });

        $('.slider-tab').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: false
                }
            }
        });
    }

    setTimeout(function(){
        $('#tab-listing  .tabcontent').css({'display':'none'});
        $('#tab-listing  #binh-tan').css({'display':'block'});
    },100);



    $(document).on('click','#tab-listing .content-slider .image-show',function () {
        var list_img = $(this).parents('.content-slider').find('img');
        if(list_img.length > 0){
            var propertyImages =[];
            $.each(list_img,function (index,item) {
                propertyImages.push({ src:$(item).attr('src'), type : "image", opts : {} });
            });
        $.fancybox.open( propertyImages, {}, parseInt($(this).data('index')) - 1 );
        }
    });

    $(".form-register").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                    , stringLength: {
                        message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10
                    }
                }
            },
            local: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập quận"
                    }
                }
            }
        }
    });

    $("#send-register").click(function () {
        var curForm=$(this).parents("#register").find("#name").closest(".form-register");
        if (!App.UI.checkValidForm(curForm)) {
            App.UI.Error("Bạn cần cung cấp đầy đủ thông tin để Propzy có thể tư vấn tốt nhất cho bạn");
            return false;
        }
        var postData = {};
        postData.email = $("#email").val().trim();
        postData.name = $("#name").val().trim();
        postData.phone = $("#phone").val().trim();
        postData.demand = $("#content").val().trim();
        postData.district = $("#local").val().trim();
        postData.type = 3;
        postData.tracking = $("#type_mak").val().trim().toLowerCase();
        App.Feature.Post("/api/email-campaign", postData, function (response) {
            if (response.result) {
                postData.email = $("#email").val("");
                postData.name = $("#name").val("");
                postData.phone = $("#phone").val("");
                postData.demand = $("#content").val("");
                postData.district = $("#local").val("");
                curForm.data('bootstrapValidator').resetForm();
                App.UI.ImageModal("/assets/images/landing-page/toplisting/NHA-5-TY-popup.png");
            }
            else {
                App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
            }
        });
    });
}