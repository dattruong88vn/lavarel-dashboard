var LandingPage = {
    initCarousel: function(){
        let ow_home = $('.for-rent-content .owl-carousel');
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

    }
};