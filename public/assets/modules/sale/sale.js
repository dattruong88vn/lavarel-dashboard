var startApp = function(){
    $('.owl-carousel').owlCarousel({
        items: 4,
        lazyLoad: true,
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
            1024:{
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });
};
