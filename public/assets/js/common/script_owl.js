
var itemOwl = function (owl, responsive, paramowl) {
    var autospeed = 5000,
        margin = 0,
        dataout, datain, dotsContainer, navContainer;

    var owlArray = paramowl.split('||');
    $.each(owlArray, function (index, value) {
        var value = value.split('=');
        if (value[0] == 'autospeed')
            autospeed = parseInt(value[1]);
        else if (value[0] == 'out')
            dataout = value[1];
        else if (value[0] == 'in')
            datain = value[1];
        else if (value[0] == 'nav')
            navContainer = value[1];
        else if (value[0] == 'dot')
            dotsContainer = value[1];
        else if (value[0] == 'margin')
            margin = parseInt(value[1]);
    });

    owl.owlCarousel({
        navText: ["<i class='icon-arrow-1 ix'></i>", "<i class='icon-arrow-1'></i>"],
        nav: (owl.hasClass('s-nav') ? true : false),
        dots: (owl.hasClass('s-dots') ? true : false),
        loop: owl.hasClass('s-loop') ? true : false,
        autoplay: owl.hasClass('s-auto') ? true : false,
        autoplayHoverPause: true,
        center: owl.hasClass('s-center') ? true : false,
        autoWidth: (owl.hasClass('s-width') ? true : false),
        autoHeight: (owl.hasClass('s-height') ? true : false),
        lazyLoad: true,
        video: (owl.hasClass('s-video') ? true : false),
        mouseDrag: (owl.hasClass('s-drag') ? false : true),

        autoplayTimeout: autospeed,
        animateOut: (dataout ? dataout : ''),
        animateIn: (datain ? datain : ''),
        navContainer: (navContainer ? navContainer : false),
        dotsContainer: (dotsContainer ? dotsContainer : false),
        margin: margin,

        responsive: {
            0: {
                items: parseInt(responsive[3])
            },
            576: {
                items: parseInt(responsive[2])
            },
            768: {
                items: parseInt(responsive[1])
            },
            992: {
                items: parseInt(responsive[0])
            }
        }
    });
};
// Responsive OWL    
var ResOwlSlider = function () {
    $(".owl-carousel").each(function () {
        var owl = $(this),
            responsive = owl.attr('data-res'),
            paramowl = owl.attr('paramowl');
        if (!paramowl)
            paramowl = '';

        if (!responsive) {
            responsive = '1,1,1,1';
        }
        responsive = responsive.split(',');

        owl.imagesLoaded(function () {
            itemOwl(owl, responsive, paramowl);
        });
    });
};

// Responsive OWL    
var SynOwlSlider = function () {
    $(".wrap-syn-owl").each(function () {
        var $this = $(this);
        var sync1 = $this.find(".syn-slider-1");
        var sync2 = $this.find(".syn-slider-2");
        //var syncedSecondary = false;
        sync1.on('changed.owl.carousel', syncPosition);
        // sync2.on('initialized.owl.carousel', function () {
        //     sync2.find(".owl-item").eq(0).addClass("current");
        //   }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }
            //end block
            sync2
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = sync2.find('.owl-item.active').length - 1;
            var start = sync2.find('.owl-item.active').first().index();
            var end = sync2.find('.owl-item.active').last().index();

            if (current > end) { // current.length>0 && 
                sync2.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) { // current.length>0 && 
                sync2.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }
        // function syncPosition2(el) {
        //     var number = el.item.index;
        //     sync1.data('owl.carousel').to(number, 100, true);
        // }

        sync2.find('.owl-item:first-child').addClass('current');

        sync2.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).index();
            sync1.data('owl.carousel').to(number, 300, true);
        });
    });
};

$(document).ready(function () {
    //ResOwlSlider();
    //
    $(window).bind("load", function () {
        ResOwlSlider();
        SynOwlSlider();
        $(".nav-middle-img").each(function () {
            var h = $(this).find('.owl-item:first-child .img').outerHeight();
            $(this).find('.owl-nav').css('top', h / 2);
        });
    });
});
