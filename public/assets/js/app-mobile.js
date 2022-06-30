/**
*	Những start up function làm chung cho tất cả các page mobile
*	@author: Phan Minh Hoang <hoang.phan@propzy.com>
*/
$(document).ready(function() {
    //var appLayer = new AppLayer();
    Mycollection.init();
    if (typeof link_diy_redirect != "undefined"){
        location.href = link_diy_redirect;
    }
    if (typeof link_open_diy != "undefined"){
        $(".text-open-app").click(function () {
            location.href = link_open_diy;
        });
    }
    
    $(".extend a").click(function(){
        $(".menufull").toggleClass("toggle");
    });
    $('#sidebar-wrapper ul li a').each(function(){
        if($(this).attr('href')=='/'+url_active+'?src=menu_side' || $(this).attr('href')=='/'+url_active+'?src=menu_top' || $(this).attr('href')=='/'+url_active)
            $(this).parents('li').addClass('active');
    });
    $('.bl-menu-bottom ul li a').each(function(){
        if($(this).attr('href')=='/'+url_active)
            $(this).parents('li').addClass('active');
    });
    
    if (typeof startApp === "function") {
        startApp();
    }
    
    $(document).on('click', '.change-image-acount', function(){
        $("input[name='file-image-acount']").trigger('click');
        $("input[name='file-image-acount']").unbind("change").change(function (e) {
            App.Feature.uploadImage($("input[name='file-image-acount']"),e,function (response) {
                $(".text-img").addClass("hidden");
                if(response){
                    $(".change-image-acount").find(".bl-img").css({"background":'url(' + response.link + ')'});
                    $('#form-my-acount').find('input[name="image"]').val(response.link);
                    var dataSend = {
                        photo:response.link
                    };
                    App.Feature.Post('/api/update-avatar',dataSend,function (response) {
                        if(response.result){
                            $("#button-bl-post img").attr("src",dataSend.photo);
                            App.UI.Done("Cập nhật hình ảnh thành công",function(){
                            });
                        }else{
                            App.UI.Confirm("Đã có lỗi xảy ra !");
                        }
                    },true);

                }
            },'/api/upload?type=avatar'); 
        });
    });
    
    $(document).on('click', '.text-open-app', function(){
        setTimeout(function () {
            window.location.replace(link_sam_redirect);
        }, 25);
        window.location = link_open_diy;
    });
    
    setTimeout(function(){
        WebFontConfig = {
            google: { families: ['Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&font-display=swap' ] }
        };
        (function() {
            var wf = document.createElement('script');
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(wf, s);
        })(); 
    }, 5000);
});

$(document).on("DOMContentLoaded resize", function(){
    $(".lazy").each(function(){
        if(isElementInViewport(this)){
            $(this).Lazy({
                effect: "fadeIn",
                chainable: false,
                delay: 0,
                afterLoad: function(element) {
                    element.removeClass("lazy");
                },
                onFinishedAll: function() {
                    if( !this.config("autoDestroy") )
                        this.destroy();
                },
                    
                // called whenever an element could not be handled
                onError: function(element) {
                    var imageSrc = element.data('src');
                    element.attr('src', '/assets/images/listing-no-image.png');
                }
            });
        }
    });

    setTimeout(function(){
        $("body").append('<script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>');
    }, 10000);
});

$(document).on("mouseup mousedown mousemove touchstart", function(){
    
    loadCommonsModal();

    $(".lazy").each(function(){
            $(this).Lazy({
                effect: "fadeIn",
                chainable: false,
                delay: 0,
                afterLoad: function(element) {
                    element.removeClass("lazy");
                },
                onFinishedAll: function() {
                    if( !this.config("autoDestroy") )
                        this.destroy();
                },
                    
                // called whenever an element could not be handled
                onError: function(element) {
                    var imageSrc = element.data('src');
                    element.attr('src', '/assets/images/listing-no-image.png');
                }
            });
    });

});

var prevPageIndex = null;
var prevBlockId = null;
$(document).ready(function() {
	if (typeof blockId === 'undefined') {
		prevPageIndex = Number(App.Feature.getCookie2('pageIndex'));
		prevBlockId = App.Feature.getCookie2('blockId');
		
		if (typeof scrollIntoBlock === 'undefined') {
			App.Feature.clearCookie2('pageIndex');
			App.Feature.clearCookie2('blockId');
		}

		if (prevBlockId) {
			scrollIntoBlock(prevBlockId);
		}
	} else {
		App.Feature.setCookie2('blockId', blockId);
	}
});