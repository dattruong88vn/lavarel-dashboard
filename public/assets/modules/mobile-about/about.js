var heightMore = 500;

var startApp = function () {
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    $('.readmore-block').readmore({
        speed: 1000,
        collapsedHeight: heightMore,
        moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
        lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
        blockCSS: 'display: block;position: relative;'
    });
}