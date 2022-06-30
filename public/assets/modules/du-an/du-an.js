var startApp = function () {
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
    //
    $(document).on("DOMContentLoaded load resize click scroll mousemove touchstart touchend touchmove mouseup", function(){
        $(".bl-project-detail .lazy").Lazy({
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
    //
    $('.read-more').click(function(){
        $('#popup-read-more .text-center').html($('.bl-project-detail .bl-name-project').html());
        $('#popup-read-more .content').html($('.bl-project-detail .bl-info-describe').html());
        $('#popup-read-more').modal();
    });
    $('.btn-rent').click(function(){
        $('#rlisting-ids').val($(this).data('rlisting-ids'));
        $('#district-id').val($(this).data('district-id'));
        $('#building-id').val($(this).data('building-id'));
        $('#bed-room').val($(this).data('bed-room'));
        $('#min-price').val($(this).data('min-price'));
        $('#max-price').val($(this).data('max-price'));
        $('#price-text').val($(this).data('price-text'));
        $('#popup-schedule-project').modal();
    });
    //
    App.UI.inputAllowNumber("#phone-project");
    App.UI.removeCheckSuccess("#schedule-project", ['email']);
    //
    $("#schedule-project, #schedule-project-rent").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập Họ và tên"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập số điện thoại"
                    }
                    , stringLength: {
                        message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: "Vui lòng nhập địa chỉ email hợp lệ"
                    }
                }
            },
            building: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng chọn tòa nhà"
                    }
                }
            },
            bedroom: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng chọn số phòng ngủ"
                    }
                }
            }
        }
    });
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    //
    $('#form-infos-customer-project').click(function(event){
        event.stopPropagation();
    });
    $('.close-form-infos').click(function(){
        $(this).parent().parent().removeClass('open');
    });
    $('.btn-form-infos').click(function(){
        $(this).parent().parent().parent().removeClass('open');
    });
    //
    $("#btn-schedule-project").click(function () {
        var curForm = $(this).closest("#schedule-project");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        //
        var postData = {
            message: "Đặt lịch xem từ trang chi tiết dự án",
            links: [],
            rlistingIds: [],
            requestTypeIds: [],
            date : null,
            minPrice : $('#min-price').val(),
            maxPrice : $('#max-price').val(),
            priceText: $('#price-text').val(),
            requestText: $('#request-text').val(),
            bedRooms: $('#bed-room').val(),
            projectId: $('#project-id').val(),
            buildingId: $('#building-id').val()
        };
        
        if($('#customer-name').length > 0 && $('#customer-name').val() !== ''){
            postData.customerName = $('#customer-name').val().trim();
        }
        if($('#customer-phone').length > 0 && $('#customer-phone').val() !== ''){
            postData.customerPhone = $('#customer-phone').val().trim();
        }
        if($('#customer-email').length > 0 && $('#customer-email').val() !== ''){
            postData.email = $('#customer-email').val().trim();
        }

        //3(Đặt lịch xem)
        postData.requestTypeIds = [3];
        postData.form_type = 3;
        postData.sourceId = 2;
        
        postData.rlistingIds = [parseInt($('#rlisting-ids').val())];
        postData.content_ids = parseInt($('#rlisting-ids').val());
        postData.content_category = parseInt($('#district-id').val());
        postData.links = [location.href];
        
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
                    window.location.href = '/thank-you';
                } else {
                    App.UI.ShowFormMessage('#popup-schedule-project', response.message, App.UI.notiTypeError);
                }
            }
        });
    });
    //
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
    //
    $("#select-building").change(function () {
        var buildingId = $(this).val();
        setBedRoom(buildingId);
    });
    $("#select-bedroom").change(function () {
        $('#rlisting-ids-rent').val($(this).val());
        var selected = $(this).find('option:selected');
        $('#bed-room-rent').val(selected.data('bed-room'));
        $('#min-price-rent').val(selected.data('min-price'));
        $('#max-price-rent').val(selected.data('max-price'));
        $('#price-text-rent').val(selected.data('price-text'));
    });
    //
    $("#btn-schedule-rent").click(function () {
        var curForm = $(this).closest("#schedule-project-rent");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        var postData = {
            message: "Đặt lịch xem từ trang chi tiết dự án",
            links: [],
            rlistingIds: [],
            requestTypeIds: [],
            date : null,
            minPrice : $('#min-price-rent').val(),
            maxPrice : $('#max-price-rent').val(),
            priceText: $('#price-text-rent').val(),
            requestText: $('#request-text-rent').val(),
            bedRooms: $('#bed-room-rent').val(),
            projectId: $('#project-id-rent').val(),
            buildingId: $('#building-id-rent').val()
        };

        if($('#customer-name-rent').length > 0 && $('#customer-name-rent').val() !== ''){
            postData.customerName = $('#customer-name-rent').val().trim();
        }
        if($('#customer-phone-rent').length > 0 && $('#customer-phone-rent').val() !== ''){
            postData.customerPhone = $('#customer-phone-rent').val().trim();
        }
        if($('#customer-email-rent').length > 0 && $('#customer-email-rent').val() !== ''){
            postData.email = $('#customer-email-rent').val().trim();
        }

        //3(Đặt lịch xem)
        postData.requestTypeIds = [3];
        postData.form_type = 7;
        postData.sourceId = 2;
        
        postData.rlistingIds = [parseInt($('#rlisting-ids-rent').val())];
        postData.content_ids = parseInt($('#rlisting-ids-rent').val());
        postData.content_category = parseInt($('#district-id-rent').val());
        postData.links = [location.href];
        
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
                    window.location.href = '/thank-you';
                } else {
                    App.UI.ShowFormMessage('#popup-schedule-rent', response.message, App.UI.notiTypeError);
                }
            }
        });
    });
};

// slide
$('.bl-img-slider').click(function(){
    var propertyImages =  [];
    $(".div-img img").each(function(){
        propertyImages.push({ src:$(this).data("image-large"), type : "image", opts : {} });
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

$(document).off('click', '.bl-img-slider .bx-prev').on('click','.bl-img-slider .bx-prev' ,function () {
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
$(document).off('click', '.bl-img-slider .bx-next').on('click','.bl-img-slider .bx-next' ,function () {
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

function setBedRoom(buildingId) {
    $('#bed-room-rent').val('');
    $('#min-price-rent').val('');
    $('#max-price-rent').val('');
    $('#price-text-rent').val('');
    if (buildingId == "") {
        $('#building-id-rent').val('');
        $("#select-bedroom").attr("disabled", "disabled");
        $("#select-bedroom").html('<option value="">Chọn số phòng ngủ</option>');
        return;
    } else {
        $('#building-id-rent').val(buildingId);
        $("#select-bedroom").prop("disabled", false);
    }
    App.Feature.Get("/api/get-bedroom-by-buiding/" + buildingId, function (response) {
        if(response.result){
            $('#district-id-rent').val(response.data.list[0].districtId);
            var html = '<option value="">Chọn số phòng ngủ</option>';
            $.each(response.data.list[0].rentCostList, function(key, val){
                html+= '<option value="'+ val.rlistingIds[0] +'" data-building-id="'+ response.data.list[0].buildingId +'" data-bed-room="'+ val.bedRoomNumber +'" data-min-price="'+ val.minPrice +'" data-max-price="'+ val.maxPrice +'" data-price-text="'+ val.formatPrice +'">';
                    html+= val.bedRoomFormat;
                html+= '</option>';
            });
            $("#select-bedroom").html(html);
        }
    });
};