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
        message: "Gi?? tr??? ch??a ????ng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui l??ng nh???p gi?? tr???"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui l??ng nh???p gi?? tr???"
                    }
                    , stringLength: {
                        message: "Vui l??ng nh???p s??? ??i???n tho???i h???p l???", min: 10, max: 10
                    }
                }
            },
            local: {
                validators: {
                    notEmpty: {
                        message: "Vui l??ng nh???p qu???n"
                    }
                }
            }
        }
    });

    $("#send-register").click(function () {
        var curForm=$(this).parents("#register").find("#name").closest(".form-register");
        if (!App.UI.checkValidForm(curForm)) {
            App.UI.Error("B???n c???n cung c???p ?????y ????? th??ng tin ????? Propzy c?? th??? t?? v???n t???t nh???t cho b???n");
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
                App.UI.Error("C?? l???i x???y ra trong qu?? tr??nh ghi nh???n. B???n vui l??ng li??n h??? v???i ch??ng t??i ????? ???????c t?? v???n th??m");
            }
        });
    });
}