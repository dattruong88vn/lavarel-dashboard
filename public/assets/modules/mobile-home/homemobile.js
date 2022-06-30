var startApp = function () {
    
    App.UI.inputAllowNumber(['#phone-app',"#budget","#year","#total_money"], false);
    $('#budget').mask("#.##0", {reverse: true});
    $('#total_money').mask("#.##0", {reverse: true});
    
    getUserLocation(function(position){
        let dataPost = {
            lat: position.lat,
            long: position.lng
        };
        ListingByLocationLoader.loadBdsdb.setPlatform("mobile").loadContent('#bdsdb-by-location', dataPost);
        ListingByLocationLoader.loadBdshot.setPlatform("mobile").loadContent('#bdshot-by-location', dataPost);
    }, function(err){});

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
                stagePadding: 20,
                loop: true,
                margin: 10,
                nav: false,
                navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
                dots: false,
                autoplay: false,
                item:1,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
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
                stagePadding: 20,
                loop: true,
                margin: 10,
                nav: false,
                navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
                dots: false,
                autoplay: false,
                item:1,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
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
    
    $(document).on('click', '#request-budget', function(){
        var curForm = $(this).closest("#find-by-budget");
        if(!checkValidFormBudget(curForm)) {
            return false;
        }
        
        App.UI.showLoadding();
        $('.dropdown-backdrop').remove();
        $('#tab-listing-budget').html('');
        $('#bl-choice').children().removeClass('active');
        $('#bl-choice').find('.open').addClass('active');
        $('#content-tab').children().removeClass('active');
        $('#content-tab').find('#tab-listing-budget').addClass('active');
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
            $("#tab-listing-budget").html(response);
            $('#tab-listing-budget .owl-carousel').owlCarousel({
                stagePadding: 20,
                loop: true,
                margin: 10,
                nav: false,
                navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
                dots: false,
                autoplay: false,
                item:1,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    }
                }
            });
            $("#tab-listing-budget .save-listing").click(function () {
                addcart(this);
                return false;
            });
            App.UI.hideLoadding();
            $('#popup-real-needs').modal('hide');
        }).always(function () {

        });        
    });
    
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    /*
    var select_search=function(placeholder) {
        $('.select-search').select2({
            allowClear: true,
            placeholder: placeholder,
            minimumResultsForSearch: Infinity,
            dropdownParent: $('#show-district')
        });
    };
    select_search(function(){
        $('.select-search').data('placeholder');
    });
    */  
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
      
    $(".bl-search .bl-radio :input").change(function () {
        var listingType = $(this).val();
        if (listingType == 1) {
            $('.bl-search h1').text('Tìm Thuê Nhà Cùng Propzy');
            $('.select-search').data('placeholder', 'Chọn khu vực cần thuê');
        } else {
            $('.bl-search h1').text('Tìm Mua Nhà Cùng Propzy');
            $('.select-search').data('placeholder', 'Chọn khu vực cần mua');
        }
        select_search(function () {
            $('.select-search').data('placeholder');
        });
    });

    $("#btnSearch").mousedown(function (e) {
        e.preventDefault();
    }).click(function (e) {
        e.preventDefault();
        var itemCurrent = $(".dropdown-seach").find(".item.active");
        if(itemCurrent){
            itemCurrent.trigger("click");
        }
    });

    $('.bl-content input[name="search_text_home"]').searchKeyword({
        limit_item:5,
        height:50,
        data_default:function (dropdown_container) {
            dropdown_container.html($("#district-select-default").html());
        },
        click_dropdown:function (dropdown,dropdown_container) {
            dropdown_container.html($("#district-select-default").html());
        }
    });
    
    $('#search-buy').click(function(){
        window.location.hash = "mua";
        BuyRentContentLoader.setPlatform("mobile").loadBuyContent();
        getUserLocation(function(position){        
            let dataPost = {
                lat: position.lat,
                long: position.lng
            };
            ListingByLocationLoader.loadBdsdb.setPlatform("mobile").loadContent('#bdsdb-by-location', dataPost);
            ListingByLocationLoader.loadBdshot.setPlatform("mobile").loadContent('#bdshot-by-location', dataPost);
        }, function(err){
        });
        $('.bl-species.option-home>div>a.active').removeClass("active");
        $(this).addClass('active');
        $('.search-keyword-container .dropdown-seach').html('');
        $('.search-keyword-container .dropdown-seach').html($('#district-select-default').html());
        $('.bl-center .search-keyword-container .dropdown-seach').html('');
        $('.bl-center .search-keyword-container .dropdown-seach').html($('#district-select-default').html());
        //
    });
    $('#search-rent').click(function(){
        window.location.hash = "thue";
        BuyRentContentLoader.setPlatform("mobile").loadRentContent('#bl-for-rent-content');
        getUserLocation(function(position){        
            let dataPost = {
                lat: position.lat,
                long: position.lng
            };
            ListingByLocationLoader.loadBdsChoThue.setPlatform("mobile").loadContent('#bdsforrent-by-location', dataPost);
        }, function(err){
        });
        $('.bl-species.option-home>div>a.active').removeClass("active");
        $(this).addClass('active');
        $('.search-keyword-container .dropdown-seach').html('');
        $('.search-keyword-container .dropdown-seach').html($('#district-select-for-rent').html());
        $('.bl-center .search-keyword-container .dropdown-seach').html('');
        var html = $('#district-select-for-rent').html();
        $('.bl-center .search-keyword-container .dropdown-seach').html(html);
    });
    var hash = window.location.hash;
    if(hash == '#thue'){
        $('#search-rent').trigger('click');
    }
};
var onChangeInput = function(event) {
    let name = event.target.name;
    NumberInputUtil.numberToLabel("#" + name);
};