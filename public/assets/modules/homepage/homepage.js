var startApp = function () {
    App.UI.inputAllowNumber(['#phone-app',"#budget","#year","#total_money"], false);
    $('#budget').mask("#.##0", {reverse: true});
    $('#total_money').mask("#.##0", {reverse: true});

    var select_search=function(placeholder) {
        $('.select-search').select2({
            allowClear: true,
            placeholder: placeholder,
            minimumResultsForSearch: Infinity
        });
    };
    /*
    select_search(function(){
        $('.select-search').data('placeholder');
    });
    */

    getUserLocation(function(position){    
        let dataPost = {
            lat: position.lat,
            long: position.lng
        }
        ListingByLocationLoader.loadBdsdb.loadContent('#bdsdb-by-location', dataPost);
        ListingByLocationLoader.loadBdshot.loadContent('#bdshot-by-location', dataPost);

        let url_bds_db = $('.url-bds-db').attr('href');
        $('.url-bds-db').attr(`href`,`${url_bds_db}&latitude=${position.lat}&longitude=${position.lng}`);

        let url_bds_hot = $('.url-bds-hot').attr('href');
        $('.url-bds-hot').attr(`href`,`${url_bds_hot}&latitude=${position.lat}&longitude=${position.lng}`);
    }, function(err){
    });

    $('#submit-phone-app').click(function(event){
        event.preventDefault();
        grecaptcha.reset();
        var phone = $('#phone-app').val();
        if(phone.length <10 || phone.length>11){
            App.UI.Error(messages.home_taiapp_phone_wrongformat);
            return false;
        }
        SendPhoneApp.send(false);
    });
    
    $('#myTabDrop1-contents').click(function(){
        event.stopPropagation();
    });

    $('#tab-1').click(function(){
        if($(this).hasClass('active')){
            return;
        }
        App.UI.showLoadding();
        var options = {};
        options.min_payment = 10000000;
        options.max_payment = 15000000;
        //
        $.ajax({
            url: "/get-buy-in-request?type=mntnc1015",
            type: "post",
            data: JSON.stringify(options)
        }).done(function (response) {
            $("#tab-listing-1").html(response);
            $('#tab-listing-1 .owl-carousel').owlCarousel({
                items: 4,
                lazyLoad: true,
                lazyLoadEager : true,
                loop:true,
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

            $("#tab-listing-1 .save-listing").click(function () {
                addcart(this);
                return false;
            });
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-2').click(function(){
        App.UI.showLoadding();
        var options = {};
        options.min_payment = 15000000;
        options.max_payment = 20000000;
        //
        $.ajax({
            url: "/get-buy-in-request?type=mntnc1520",
            type: "post",
            data: JSON.stringify(options)
        }).done(function (response) {
            $("#tab-listing-2").html(response);
            $('#tab-listing-2 .owl-carousel').owlCarousel({
                items: 4,
                lazyLoad: true,
                lazyLoadEager : true,
                loop:true,
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
                        items: 4
                    }
                }
            });

            $("#tab-listing-2 .save-listing").click(function () {
                addcart(this);
                return false;
            });
            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    $('#tab-3').click(function(){
        App.UI.showLoadding();
        var options = {};
        options.min_payment = 20000000;
        options.max_payment = 1000000000000000;
        //
        $.ajax({
            url: "/get-buy-in-request?type=mntnc20",
            type: "post",
            data: JSON.stringify(options)
        }).done(function (response) {
            $("#tab-listing-3").html(response);

            $('#tab-listing-3 .owl-carousel').owlCarousel({
                items: 4,
                lazyLoad: true,
                lazyLoadEager : true,
                loop:true,
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
                        items: 4
                    }
                }
            });

            $("#tab-listing-3 .save-listing").click(function () {
                addcart(this);
                return false;
            });

            App.UI.hideLoadding();
        }).always(function () {

        });
    });
    //
    var checkValidFormBudget = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            },
            fields: {
                budget: {
                    validators: {
                        notEmpty: {
                            message: messages.home_muanhatheonhucau_ngansach_empty
                        }
                    }
                },
                year: {
                    validators: {
                        notEmpty: {
                            message: messages.home_muanhatheonhucau_thoigianvay_empty
                        }
                    }
                },
                total_money: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: messages.home_muanhatheonhucau_giatricannha_empty
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };

    $('#request-budget').click(function(){
        var curForm = $(this).closest("#find-by-budget");
        if(!checkValidFormBudget(curForm)) {
            return false;
        }

        App.UI.showLoadding();
        $('#dropdown1').html('');
        $('#bl-choice').children().removeClass('active');
        $('#content-tab').children().removeClass('active');
        $('#content-tab').find('#dropdown1').addClass('active');
        //
        var options = {};
        options.budget = $('#budget').val().replace(/\./g, '');
        options.year = $('#year').val();
        options.total_money = $('#total_money').val().replace(/\./g, '');
        //
        $.ajax({
            url: "/get-buy-in-request",
            type: "post",
            data: JSON.stringify(options)
        }).done(function (response) {
            $("#dropdown1").html(response);
            $('#dropdown1 .owl-carousel').owlCarousel({
                items: 4,
                lazyLoad: true,
                lazyLoadEager : 4,
                loop:true,
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
                        items: 4
                    }
                }
            });
            //
            $("#dropdown1 .save-listing").click(function () {
                addcart(this);
                return false;
            });
            App.UI.hideLoadding();
            $('#popup-real-needs').modal('hide');
        }).always(function () {

        });
    });
    //
    $('.banner-marketting.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        lazyLoadEager : true,
        loop:true,
        dots: true,
        autoplay: true,
        slideBy: 1,
        padding: 0,
        stagePadding: 0,
        autoHeight: false,
        responsiveClass:true,
        autoHeightClass: 'owl-height',
        autoplayHoverPause: true
    });
    //
    var ow_home = $('.owl-carousel');
    ow_home.on("initialized.owl.carousel",function(e){
        $(this).find(".owl-item > div").removeClass("col-md-3");
        $(this).css({'maxHeight':'inherit','overflow':'inherit'});
    });
    ow_home.owlCarousel({
        items: 4,
        lazyLoad: true,
        lazyLoadEager : true,
        loop:true,
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

    $(document).scroll(function () {
        if ($(this).scrollTop() == 0) {
            if($('#btn-advance-filter').hasClass('active') && !$('.search-in-detailt').hasClass('margin-top-64')) {
                $('#btn-advance-filter').trigger('click');
            }
            if($('#wrapper').hasClass('toggled')){
                $('#bl-menu').hide();
                $('#logo-propzy-main').removeClass('bl-logo');
                $('#logo-propzy-main').addClass('bl-logo-scroll');
                $('#button-bl-post').addClass('bl-post-scroll');
                $('#menu-toggle').addClass('ic-menu-scroll');
                $('#hotline').removeClass('a-hotline-scroll');
            } else if($(document).scrollTop() == 0){
                if(window.innerWidth <= 1024){
                    $('#bl-menu').hide();
                    $('#logo-propzy-main').removeClass('bl-logo');
                    $('#logo-propzy-main').addClass('bl-logo-scroll');
                    $('#button-bl-post').addClass('bl-post-scroll');
                    $('#menu-toggle').addClass('ic-menu-scroll');
                    $('#hotline').removeClass('a-hotline-scroll');
                } else {
                    $('#bl-menu').show();
                    $('#logo-propzy-main').removeClass('bl-logo-scroll');
                    $('#logo-propzy-main').addClass('bl-logo');
                    $('#button-bl-post').removeClass('bl-post-scroll');
                    $('#menu-toggle').removeClass('ic-menu-scroll');
                    $('#sidebar-wrapper').addClass('slider-no-scroll');
                    $('#sidebar-wrapper').removeClass('slider-scroll');
                    $('#hotline').addClass('a-hotline-scroll');
                }
            }
        } else {
            $('#bl-menu').hide();
            $('#logo-propzy-main').removeClass('bl-logo');
            $('#logo-propzy-main').addClass('bl-logo-scroll');
            $('#button-bl-post').addClass('bl-post-scroll');
            $('#menu-toggle').addClass('ic-menu-scroll');
            $('#sidebar-wrapper').removeClass('slider-no-scroll');
            $('#sidebar-wrapper').addClass('slider-scroll');
            $('#hotline').removeClass('a-hotline-scroll');
        }
    });
    //
    $(document).scroll(function () {
        if ($(this).scrollTop() < 382) {
            $(".bl-menu-stand>div.active").removeClass("active");
        }
        if ($(this).scrollTop() > 383  && $(this).scrollTop() <= 759) {
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#bdsdq').addClass('active');
            $('#bdsct').addClass('active');
        }
        if($(this).scrollTop() > 760  && $(this).scrollTop() <= 1188){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#bdshot').addClass('active');
            $('#dact').addClass('active');
        }
        if($(this).scrollTop() > 1189  && $(this).scrollTop() <= 1549){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#hot-locations').addClass('active');
        } 
        if($(this).scrollTop() > 1550  && $(this).scrollTop() <= 1993){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#why-propzy').addClass('active');
        } 
        if($(this).scrollTop() > 1994  && $(this).scrollTop() <= 2592){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#buy-by-request').addClass('active');
        } 
        if($(this).scrollTop() > 2593  && $(this).scrollTop() <= 2777){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#news-bds').addClass('active');
        } 
        if($(this).scrollTop() > 2778  && $(this).scrollTop() <= 3003){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#download-app').addClass('active');
        }
        if($(this).scrollTop() > 3004){
            $(".bl-menu-stand>div.active").removeClass("active");
        }
        // scroll Top bar
        if($(this).scrollTop() == 0 || $(this).scrollTop() <= 378){
            $('#top-bar').removeClass('bl-menu-stand-scroll');
            var height = $(this).scrollTop();
            $('.bl-menu-stand').css({'margin-top': 92-height});
        }
        if($(this).scrollTop() >= 379){
            $('#top-bar').addClass('bl-menu-stand-scroll');
            $('#top-bar').removeAttr('style');
        }
        //
        if($('#top-bar').hasClass('hidden') && $(this).scrollTop() > 1189  && $(this).scrollTop() <= 2100){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#bdscttq').addClass('active');
        }
        if($('#top-bar').hasClass('hidden') && $(this).scrollTop() > 2101  && $(this).scrollTop() <= 2322){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#ttbds').addClass('active');
        }
        if($('#top-bar').hasClass('hidden') && $(this).scrollTop() > 2324  && $(this).scrollTop() <= 2766){
            $(".bl-menu-stand>div.active").removeClass("active");
            $('#tudp').addClass('active');
        }
    });
    
    $('#bdsdq').click(function(){
        $('html, body').animate({
            scrollTop: 389
        }, 700);
    });
    //
    $('#bdshot').click(function(){
        $('html, body').animate({
            scrollTop: 763
        }, 700);
    });
    //
    $('#hot-locations').click(function(){
        $('html, body').animate({
            scrollTop: 1201
        }, 700);
    });
    //
    $('#why-propzy').click(function(){
        $('html, body').animate({
            scrollTop: 1552
        }, 700);
    });
    //
    $('#buy-by-request').click(function(){
        $('html, body').animate({
            scrollTop: 2033
        }, 700);
    });
    //
    $('#news-bds').click(function(){
        $('html, body').animate({
            scrollTop: 2594
        }, 700);
    });
    //
    $('#download-app').click(function(){
        $('html, body').animate({
            scrollTop: 2801
        }, 700);
    });
    //
    $('#bdsct').click(function(){
        $('html, body').animate({
            scrollTop: 386
        }, 700);
    });
    //
    $('#dact').click(function(){
        $('html, body').animate({
            scrollTop: 763
        }, 700);
    });
    //
    $('#bdscttq').click(function(){
        $('html, body').animate({
            scrollTop: 1192
        }, 700);
    });
    //
    $('#ttbds').click(function(){
        $('html, body').animate({
            scrollTop: 2153
        }, 700);
    });
    //
    $('#tudp').click(function(){
        $('html, body').animate({
            scrollTop: 2413
        }, 700);
    });
    //
    $('#menu-toggle').click(function(){
        if($(document).scrollTop() == 0){
            if($('#wrapper').hasClass('toggled')){
                $('#logo-propzy-main').removeClass('bl-logo');
                $('#logo-propzy-main').addClass('bl-logo-scroll');
                $('#button-bl-post').addClass('bl-post-scroll');
                $('#menu-toggle').addClass('ic-menu-scroll');
                $('#sidebar-wrapper').removeClass('slider-no-scroll');
                $('#sidebar-wrapper').addClass('slider-scroll');
                $('#hotline').removeClass('a-hotline-scroll');
                $('#bl-menu').hide();
            } else{
                $('#logo-propzy-main').removeClass('bl-logo-scroll');
                $('#logo-propzy-main').addClass('bl-logo');
                $('#button-bl-post').removeClass('bl-post-scroll');
                $('#menu-toggle').removeClass('ic-menu-scroll');
                $('#sidebar-wrapper').addClass('slider-no-scroll');
                $('#sidebar-wrapper').removeClass('slider-scroll');
                $('#hotline').addClass('a-hotline-scroll');
                $('#bl-menu').show();
            }
        }
    });
    //
    $('#search-buy').click(function(){
        window.location.hash = "mua";
        BuyRentContentLoader.loadBuyContent();
        getUserLocation(function(position){        
            let dataPost = {
                lat: position.lat,
                long: position.lng
            }
            ListingByLocationLoader.loadBdsdb.loadContent('#bdsdb-by-location', dataPost);
            ListingByLocationLoader.loadBdshot.loadContent('#bdshot-by-location', dataPost);

            let url_bds_db = $('.url-bds-db').attr('href');
            $('.url-bds-db').attr(`href`,`${url_bds_db}&latitude=${position.lat}&longitude=${position.lng}`);

            let url_bds_hot = $('.url-bds-hot').attr('href');
            $('.url-bds-hot').attr(`href`,`${url_bds_hot}&latitude=${position.lat}&longitude=${position.lng}`);
        }, function(err){
        });
        $('.bl-species.option-home>div>a.active').removeClass("active");
        $(this).addClass('active');
        $('.search-keyword-container .dropdown-seach').html('');
        $('.search-keyword-container .dropdown-seach').html($('#district-select-default').html());
    });
    $('#search-rent').click(function(){
        window.location.hash = "thue";
        BuyRentContentLoader.loadRentContent('#bl-for-rent-content');
        getUserLocation(function(position){        
            let dataPost = {
                lat: position.lat,
                long: position.lng
            }
            ListingByLocationLoader.loadBdsChoThue.loadContent('#bdsforrent-by-location', dataPost);
        }, function(err){
        });
        $('.bl-species.option-home>div>a.active').removeClass("active");
        $(this).addClass('active');
        $('.search-keyword-container .dropdown-seach').html('');
        $('.search-keyword-container .dropdown-seach').html($('#district-select-for-rent').html());

    });
    
    $("#show-district").click(function (e) {
        $(".dropdown-seach").html($("#district-select-default").html()).show();
    });

    $('input[name="search_text"]').searchKeyword({
        limit_item:10,
        height:50,
        data_default:function (dropdown_container) {
            dropdown_container.html($("#district-select-default").html());
        },
        click_dropdown:function (dropdown,dropdown_container) {
            dropdown_container.html($("#district-select-default").html());
        }
    });

    $('.div-search .p-search a').each(function (key,item) {
        var href =  $(item).attr('href').replace("https://propzy.vn", location.protocol+"//" + location.host);
        $(item).attr('href',href);
    }).click(function (e) {
        var dataTracking = {
            keywords_input: $(this).text(),
            id_keywords: $(this).data('uuid'),
            agent_browser: navigator.userAgent
        };
        App.Feature.Post('/api/tracking-keyword-search', dataTracking, function (response) {
            
        }, false);
    });
    //
    if(window.innerWidth <= 1024){
        $('#bl-menu').hide();
        $('#logo-propzy-main').removeClass('bl-logo');
        $('#logo-propzy-main').addClass('bl-logo-scroll');
        $('#button-bl-post').addClass('bl-post-scroll');
        $('#menu-toggle').addClass('ic-menu-scroll');
        $('#hotline').removeClass('a-hotline-scroll');
    }
    var hash = window.location.hash;
    if(hash == '#thue'){
        $('#search-rent').trigger('click');
    }
};
var onChangeInput = function(event) {
    let name = event.target.name;
    NumberInputUtil.numberToLabel("#" + name);
};