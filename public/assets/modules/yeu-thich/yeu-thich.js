if ($('#form-love').length > 0)
{
    var fixedOject = $('#form-love');
    var fixedOject_Width = fixedOject.width();
    var fixedOject_Top = fixedOject.offset().top;
    var heightHeader = $(".bl-search-filter").outerHeight() + $("header").outerHeight() + 20;
    var endScroll = ($('.col-listing').offset().top + $('.col-listing').outerHeight()) - ($('.col-info-customer').outerHeight() + heightHeader);
    var scrollEventSchedule = function () {
        $(document).scroll(function () {
            if (($(this).scrollTop() + heightHeader >= fixedOject_Top && $(this).scrollTop() > 0) && $('.col-listing').outerHeight() > $('.col-info-customer').outerHeight()) {
                fixedOject.addClass('fixed');
                // Check trường hợp khi tới vị trí ko cho fix
                var topCheck = $(this).scrollTop() + ($('.col-info-customer').outerHeight() + heightHeader);
                if ($('#btn-advance-filter').hasClass('active'))
                    topCheck = topCheck + $('.div-search-advanced').outerHeight();
                if (topCheck < $('.bl-content-love').offset().top + $('.bl-content-love').outerHeight()) {
                    fixedOject.css({"width": fixedOject_Width, "top": heightHeader});
                    fixedOject.removeClass('fixed-end');
                } else {
                    fixedOject.addClass('fixed-end');
                    fixedOject.removeClass('fixed');
                    var topEnd = endScroll;
                    if ($('#btn-advance-filter').hasClass('active'))
                        topEnd = topEnd - $('.div-search-advanced').outerHeight();
                    fixedOject.css({"width": fixedOject_Width, "top": topEnd - 100});
                }
                if ($(".btn-search-advanced.active").size() > 0)
                    $("#form-love").addClass('has-margin-top');
            } else {
                fixedOject.removeClass('fixed');
                fixedOject.removeClass('fixed-end');
                $("#form-love").removeClass('has-margin-top');
            }
            if ($(this).scrollTop() > 0) {
                $(".search-in-detailt").addClass('fixed');
                $(".search-in-detailt").attr('id', 'search-in-detailt');
            } else {
                $(".search-in-detailt").removeClass('fixed');
                $(".search-in-detailt").attr('id', '');
            }
        });
    };
    var data_layer_remaketing = [];
    var products_ecommerce = [];
    scrollEventSchedule();
}

var startApp = function () {
    $('.close-app-diy').click(function () {
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });

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
    new Taggle('shared_email');
    var numberItem = $('.number-total-item-seen').val();
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

    $('.group-select select.form-control').each(function (key,item) {
        $(item).select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $(item).parent(),
            language: {
                noResults: function(){
                    return "Không có dữ liệu";
                }
            }
        });
    });

    //search_bar();

    //
    $(".form-love").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
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

    App.UI.inputAllowNumber("#phone");
    App.UI.removeCheckSuccess(".form-love", ['email']);

    $('.checkSelectAll').click(function () {
        $('.select').prop('checked', $(this).is(':checked'));
    });

    $(".block-schedule .removeScheduleListing").click(function () {
        Cart.removeScheduleListing(parseInt($(this).attr("listingid")));

        $(this).closest(".bl-listings").fadeOut(300, function () {
            endScroll = endScroll - ($(this).height() + 15);
            $(document).trigger('scroll');
            $(this).remove();
            var cart = Cart.getCart();
            $("#scheduledCount").text(cart['scheduled'].length);
            if (cart['scheduled'].length == 0) {
                location.reload();
            }
        });
        return false;
    });

    var removeListing = function (selector, listingid) {
        Cart.removeFavListing(listingid);
        $(selector).parents(".bl-listing-" + listingid).fadeOut(300, function () {
            endScroll = endScroll - ($(this).height() + 15);
            $(document).trigger('scroll');
            $(this).remove();
            var cart = Cart.getCart();
            $("#favCount").text(cart['fav'].length);
            if (cart['fav'].length == 0) {
                location.reload();
            }
        });
        var data_remove = $(selector).parents('.blocks').first().data('remarketing');
        if (data_remove) {
            dataLayer.push({
                'event': 'removeFromCart',
                'ecommerce': {
                    'remove': {
                        'products': [{
                                'name': data_remove.name,
                                'id': data_remove.id,
                                'price': data_remove.price,
                                'category': data_remove.category,
                            }]
                    }
                }
            });
        }
    }

    $(".block-fav .removeListing").click(function () {
        event.preventDefault();
        var listingid = parseInt($(this).attr("listingid"));
        removeListing(this, listingid);
        return false;
    });

    $(".bl-content-love .removeListing").click(function (event) {
        event.preventDefault();
        var listingid = parseInt($(this).attr("listingid"));
        console.log(listingid);
        removeListing(this, listingid);
        return false;
    });


    //
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    //
    $("#btnSchedule").click(function () {
        if ($(".checkboxListing:checked").size() == 0) {
            App.UI.Error("Vui lòng chọn ít nhất một BĐS để đặt lịch xem");
            return false;
        }
        //
        var curForm = $(this).closest(".form-love");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        //
        var postData = {
            message: "Đặt lịch xem từ trang ưa thích",
            links: [],
            rlistingIds: [],
            requestTypeIds: [],
            date : null
        };

        if ($(".bl-info-customer").size() > 0) {
            postData.name = $("#name").val();
            postData.phone = $("#phone").val();
            postData.email = $("#email").val();
            App.Feature.setCookie("cinfo", '{"name":"' + postData.name + '","phone":"' + postData.phone + '","email":"' + postData.email + '"}');

        } else {
            cinfo = JSON.parse(App.Feature.getCookie("cinfo"));
            postData.name = cinfo.name;
            postData.phone = cinfo.phone;
            postData.email = cinfo.email;
        }
        //postData.date = moment($("#request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        if ($("#request-date").val().trim()) {
            postData.date = moment($("#request-date").val().trim(), "DD/MM/YYYY HH:mm").unix() * 1000;
        }
        $(".checkboxListing:checked").each(function (idx, element) {
            postData.rlistingIds.push(parseInt($(element).attr("listingid")));
            postData.links.push(location.protocol + "//" + location.host + $(element).attr("link"));
            data_layer_remaketing.push(window[$(element).attr("datalayerid")]);
            products_ecommerce.push(window[$(element).attr("datalayerEco")]);
        });

        if (App.UI.isMobile()) {
            postData.form_type = 6;
        } else {
            postData.form_type = 2;
        }
        if($('#employee-id').length > 0 && $('#employee-id').val() !== ''){
            postData.promoCode = $('#employee-id').val().trim();
        }
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }
        console.log(postData);
        App.Feature.Post("/api/dat-lich-xem", postData, function (data) {
            App.UI.hideLoadding();
            if (data.code == 410) {
                // là moi gioi can login
                $("#popup-login").modal("show");
            } else {
                if (data.result) {
                    TrackUserRoute.clearVisitedList();
                    App.Feature.AddIframe("/dat-lich-thanh-cong");
                    var cart = Cart.getCart();
                    for (var i = 0; i < cart.fav.length; i++) {
                        var element = cart.fav[i];
                        if (postData.rlistingIds.indexOf(parseInt(cart.fav[i]["id"])) != -1) {
                            element.scheduleTime = postData.date;
                            cart.fav.splice(i, 1);
                            cart.scheduled.unshift(element);
                            i--;
                        }
                    }

                    Cart.updateCart(cart);
                    data_layer_ecommerce = {
                        "ecommerce": {
                            "purchase": {
                                "actionField": {
                                    "id": data.data.idCustomer,
                                    "affiliation": "Online Store",
                                    "revenue": data.data.total,
                                    "tax": "0",
                                    "shipping": "0",
                                },
                                "products": []
                            }
                        }
                    }
                    dataLayer = data_layer_remaketing;
                    data_layer_ecommerce.ecommerce.purchase.products.push(products_ecommerce);
                    dataLayer.push(data_layer_ecommerce);

                    window.location.href = '/thank-you';
                } else {
                    App.UI.Error(data.message);
                }
            }
        });
    });

    if (App.UI.isMobile()) {
        $('.taggle_placeholder').text('');
    }
    var shareEmail = {
        emails: [],
        rIds: [],
        links: []
    };

    $("#share-list-fav").click(function () {
        $("#popup-share-list-fav").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $(".btn-cancel").click(function () {
        $('#popup-share-list-fav').modal('hide');
        shareEmail = {
            emails: [],
            rIds: [],
            links: []
        };
    });

    if (typeof (Storage) != "undifined") {
        if ($('a.btn-continue-search').size() > 0) {
            if (localStorage.getItem('urlSearch'))
                $('a.btn-continue-search').prop('href', localStorage.getItem('urlSearch'));
        } else {
            console.log('Không tìm thấy Button');
        }
    }
    $(function () {
        $('#request-date').datetimepicker({
            format: 'DD/MM/YYYY HH:mm',
            minDate: moment(),
            maxDate: moment()+ (13*86460*1000)
        });
        $('#request-date').on('dp.change', function(e){
            $(".form-love").bootstrapValidator('revalidateField', 'date');
        });
    });
};

jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0)
        return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof (input.selectionStart) != "undefined")
        pos = input.selectionStart;

    return pos;
};

$("#name").keypress(function (e) {
    var arr = ["!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "-", "[", "]", "'", ";", ",", ".", "/", "{", "}", "|", ":", "<", ">", "?", "~", "_"
    ];
    var co = true;

    jQuery.each(arr, function (i, val) {
        if (String.fromCharCode(event.keyCode) == val || event.keyCode == 92 || event.keyCode == 34 || event.keyCode >= 48 && event.keyCode <= 57 && $("#name").getSelectionStart() == 0) {
            co = false;
        }
    });

    return co;
});