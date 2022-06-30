var startApp = function () {
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    $('.airport .bl-bxslider').owlCarousel({
        loop: true,
        margin: 5,
        nav: true,
        navText: false,
        dots: true,
        autoplay: false,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
}