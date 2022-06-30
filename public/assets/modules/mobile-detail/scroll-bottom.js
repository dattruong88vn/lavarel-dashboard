var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.button-group-fix').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolledBottom();
        didScroll = false;
    }
}, 250);

function hasScrolledBottom() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    $.fn.scrollStopped = function(callback) {
        var that = this, $this = $(that);
        $this.scroll(function (ev) {
            clearTimeout($this.data('scrollTimeout'));
            $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
        });
    };
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st >= lastScrollTop){
        // Scroll Down
        $('.button-group-fix').hide();
        $(window).scrollStopped(function (ev) {
            $('.button-group-fix').show();
        });
    } else {
        // Scroll Up
        $('.button-group-fix').hide();
        $(window).scrollStopped(function (ev) {
            $('.button-group-fix').show();
        });
    }
    
    lastScrollTop = st;
}