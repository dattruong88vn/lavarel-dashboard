var startApp = function () {
    function removeVietnamese(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        return str;
    }
    $(".form-control.input-search").keyup(function(e) {
        var textValue = $(this).val().toLowerCase();
        $.each($(".tab-content").find('.panel.panel-default .panel-title'), function( index, value ) {
            var textFind=removeVietnamese($(this).text())+$(this).text();
            var check = textFind.toLowerCase().indexOf(textValue);
            if(check == -1){
                $(this).parents(".panel.panel-default").hide();
            }else{
                $(this).parents(".panel.panel-default").show();
            }
        });
    });
    //
    $('.owl-carousel').owlCarousel({
        items: 6,
        lazyLoad: true,
        loop:false,
        margin: 30,
        dots: false,
        autoplay: false,
        slideBy: 6,
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
                items: 4
            },
            1024: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    });
};