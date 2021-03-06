var $window = $(window),
    hd = $('#header'),
    hh = hd.outerHeight(),
    wh = $(window).outerHeight(),
    wst = $(window).scrollTop();
var ah = $('<div class="afterHeader"> ');
    hd.after(ah.height(hh));
function headerScrollUpDown() {   
    var panel = 0;
    if ($('#panel').length >0){
        panel += $('#panel').height(); 
    }
    
    var lastScrollTop = panel;

    //bds detail
    var stv = panel + $('.sec-breadcrumbs').outerHeight() + $('.project-detail-feature').outerHeight() + $('.t-detail').outerHeight()  + $('.t-detail-s').outerHeight(); 
    $(window).scroll(function(event){
        if($('.filter-house-subpage').length >0){
           var st = $(this).scrollTop();
            if (st >= panel) {
                $('body').addClass('stickyBody');
               if (st >= lastScrollTop){
                   $('body').removeClass('stickyUp').addClass('stickyDown');
               } else  {
                  $('body').removeClass('stickyDown').addClass('stickyUp');
               }
               lastScrollTop = st;
            } else {
                $('body').removeClass('stickyUp').removeClass('stickyDown').removeClass('stickyBody');
            } 
       }else{
            if ($(window).scrollTop() > panel) $('#header').addClass('sticky');
            else $('#header').removeClass('sticky');                        
       }

        if ($('.popupTuvan').length >0 & $(this).scrollTop() >= stv) {
            $('body').addClass('showBtnTuvan');
         } else {
            $('body').removeClass('showBtnTuvan');
        }                     
    });
}

function toggleSlideSub(li,sub) {    
    if(li.hasClass('parent-showsub')){
        sub.slideUp(300,function(){
            li.removeClass('parent-showsub');
        });                           
    }else{
        sub.slideDown(300,function(){
            li.addClass('parent-showsub');
        });                           
    }  
}

function ClickToggleSlide(span,a,li,sub) {    
    span.click(function(){
        toggleSlideSub(li,sub);
    }); li.prepend(span);
    a.click(function(e){
        e.preventDefault();
        toggleSlideSub(li,sub); 
    });
}

function equal() {
    $(".equalHeight").each(function () {
        var $this = $(this),
            $equal = $this.find(".equal");
        var padding = $this.attr('data-padding');                    
        if(!padding)   padding = 0 ;
        if ($this.length > 0) {
          $equal.imagesLoaded(function () {
            equalHeight($equal, parseInt(padding));
          });
        }
    });    
}        
/* Equal Height good*/
function equalHeight(className, padding) {
  var tempHeight = 0;
  $(className).each(function () {
    current = $(this).height();
    if (parseInt(tempHeight) < parseInt(current)) {
      tempHeight = current;
    }
  });
  $(className).css("height", tempHeight + padding + "px");
}

function cttab() {
    $("[class*='cttab'] .tab-menu > div").click(function () {
        var index = $(this).data('index'),
            menu = $(this).parent(),
            content = menu.parent().children('.tab-content');
        if(index>=0){
        }else{index = $(this).index();}
        menu.children().removeClass('active');
        content.children().removeClass('active');
        $(this).addClass('active');
        content.children(':eq('+index+')').addClass('active');
    });   
}
function cttab2() {
    $("[class*='cttab'] .tab-menu-owl .i-m-tab").click(function () {
        var index = parseInt($(this).data('index')),
            menu = $(this).closest('.tab-menu-owl'),
            content = $(this).closest('[class*="cttab"]').children('.tab-content');
        if(!index){ 
            index = $(this).index();
        }
        menu.find('.i-m-tab').removeClass('active');
        content.children().removeClass('active');
        $(this).addClass('active');
        content.children(':eq('+index+')').addClass('active');
    });   
}

$(document).ready(function(){
    if($('.filter-house-subpage').length >0){
        var btnFilter = '<div class="btnShowFilter"> <span class="more">T??m ki???m</span><span class="less">Thu g???n</span><i class="icon-search-2"></i></div>';
        $('#header .container').append(btnFilter);
        $('#header').addClass('hasFilter');
    }

    $(".toggleClass > .toggle").each(function () {
        $(this).click(function(){
            $(this).parent().toggleClass('active');
        }); 
    });             

        //myModal
    $(".btnModal").click(function (e) {
        e.preventDefault();
        var id = $(this).data('modal');
        var pr = $(this).parents('.myModal');
        $('body').toggleClass('showModal');
        if(pr.length>0) {
            pr.removeClass('active');
        }else {
            $('div#'+id).toggleClass('active');
        }
    });
        
    $(".myModal").each(function () {
        var c = $(this).children('.container '),
            hc = c.children('.contentModal').outerHeight() + 80;
        if(wh>hc){
            c.addClass('middle');
        }
    });
    
    $('.menu-btn-2').click(function(){
        $('body').toggleClass('showMenu'); 
    }); 
    $('.menu-btn').click(function(){
        $('body').toggleClass('showMenu'); 
    }); 
    
    $('ul.menu-top-header ul').each(function(){
        var li = $(this).parent(),
            a = li.children('a[href="#"]'),
            btn = $('<span>',{'class':'showsubmenu icon-arrow-2 ib', text : '' });
            $(this).wrap('<div class="wrapul"></div>');
            var wrapul = li.children('.wrapul');

        ClickToggleSlide(btn,a,li,wrapul);           
    });

    $('ul.menu-taxonomy ul').each(function(){
        $(this).parent().addClass('children');
    });


    var wrapmb = $('.wrap-menu-mb'),
        smb = wrapmb.data('style');
    wrapmb.find('li[class*="children"]').each(function(){
        var 
        p = $(this),
        idli = p.attr('id'),
        ul = p.children('ul'),
        a = p.children('a[href="#"]'),
        btn = $('<span>',{'class':'showsubmenu icon-arrow-3', text : '' });
        p.children('ul').children('li').children('ul').attr("data-parent",idli);
        //a.addClass('outactive').attr("data-parent",id);
        ClickToggleSlide(btn,a,p,ul);

    });

    // Click scroll a
    $("a.scrollspy").click(function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('html, body').animate({
        scrollTop: $(id).offset().top - hh
        }, 1000);
    });

    // Back-top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#back-top').addClass('show');
        } else {
            $('#back-top').removeClass('show');
        }
    });
    $('#back-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // THEME
    $('.searchform .textinput').each(function(){
        $(this).bind('DOMAttrModified textInput input change  paste ', function() { //keypress focus
            var val = $(this).val();
            if (val) {
                if(val.length>=3){
                    $(this).parent('.searchform').addClass('focus');
                }else{
                    $(this).parent('.searchform').removeClass('focus');
                }
            }
        });
    });

    $('.box-collapse > .tab > .tab-title').each(function() {
        var btnInfo = $(this).click(function() {
            btnInfo.parent().children('.tab-content').slideToggle(300);

            btnInfo.parent().toggleClass('show');
        });
    });
    $('button.reset').on("click", function(){
        $('#form-search-buy').get(0).reset();
    });
    
    $('.btn-advance-search').on('click',function() {
        $(this).parent().children('.advance-search').slideToggle(200);
        $(this).toggleClass('active');
    });
    //
    $('.btnShowFilter').on('click',function() {
        $('body').toggleClass('showFilter');
        $('.filter-house-subpage').slideToggle(200);
    }); 


    $('.qualitys').each(function () {
        var input = $(this).children('.qualitys input'),
            plus = $(this).children('.qualitys .plus'),
            minus = $(this).children('.qualitys .minus'),
            maxNum = parseFloat(input.attr("maxvalue"));
        function changeInput(index) {
            input.val(index);
        }
        input.on("change", function () {
            var change = input.val();
            if (change > maxNum) {
                change = maxNum;
            }
            if (change < 1) change = '';
            changeInput(change);

        });

        $(plus).on('click',function () {
            var val = input.val();
            if(val=='')
                val = 1;
            else{
               val++; 
            }
            if (val > maxNum) {
                val = maxNum;
            }
            changeInput(val);
        });
        $(minus).on('click',function () {
            var val = input.val();
            if(val>1){
                val--;
            }else{
                val='';
            }
            changeInput(val);
        });
    });

    cttab();
    cttab2();
    
    // LAZYLOAD
    /*-----------------------------------------------------------------*/

    var BJLL_options = BJLL_options || {},
        BJLL = {
            _ticking: !1,
            check: function() {
                if (!BJLL._ticking) {
                    BJLL._ticking = !0, void 0 === BJLL.threshold && (void 0 !== BJLL_options.threshold ? BJLL.threshold = parseInt(BJLL_options.threshold) : BJLL.threshold = 200);
                    var e = document.documentElement.clientHeight || body.clientHeight,
                        t = !1,
                        n = document.getElementsByClassName("lazy-hidden");
                    [].forEach.call(n, function(n, a, i) {
                        var s = n.getBoundingClientRect(),
                            offset = parseFloat(n.getAttribute('offset'));
                        if(offset) o = 0 - offset;
                        else o = 50;
                        e - s.top + o > 0 && (BJLL.show(n), t = !0)
                    }), BJLL._ticking = !1, t && BJLL.check()
                }
            },
            show: function(e) {
                e.className = e.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g, ""), e.addEventListener("load", function() {
                    e.className += " loaded", BJLL.customEvent(e, "lazyloaded");
                }, !1);
                var t = e.getAttribute("data-lazy-type");
                e.className += ' loaded';

                if(e.classList.contains('onepage')){

                  if(e.classList.contains('active')){
                  }else{
                    $('.onepage').removeClass('active');
                    e.classList.add("active");
                    // i = $(this).attr('id');
                    // $('.nav-tabs li').removeClass('active');                
                    // $('.nav-tabs a[href="#'+i+'"]').parent().addClass('active');
                  }

                }         

                if ("image" == t) null != e.getAttribute("data-lazy-srcset") && e.setAttribute("srcset", e.getAttribute("data-lazy-srcset")), null != e.getAttribute("data-lazy-sizes") && e.setAttribute("sizes", e.getAttribute("data-lazy-sizes")), e.setAttribute("src", e.getAttribute("data-lazy-src"));

                else if ("bg" == t) {
                    var n = e.getAttribute("data-lazy-src");
                    e.style.backgroundImage = 'url(' + n + ')';

                }
                else if ("iframe" == t) {
                    var n = e.getAttribute("data-lazy-src"),
                        a = document.createElement("div");
                    a.innerHTML = n;
                    var i = a.firstChild;
                    e.parentNode.replaceChild(i, e);
                }
                else if ("mp4" == t) {
                    var n = e.getAttribute("data-lazy-src"),
                        a = '<source src="'+n+'" type="video/mp4">';
                    e.innerHTML += a;
                }



            },
            customEvent: function(e, t) {
                var n;
                document.createEvent ? (n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0) : (n = document.createEventObject()).eventType = t, n.eventName = t, document.createEvent ? e.dispatchEvent(n) : e.fireEvent("on" + n.eventType, n)
            }
        };
    window.addEventListener("load", BJLL.check, !1), window.addEventListener("scroll", BJLL.check, !1), window.addEventListener("resize", BJLL.check, !1), document.getElementsByTagName("body").item(0).addEventListener("post-load", BJLL.check, !1);


    // RESPONSIVE
    /*-----------------------------------------------------------------*/

    $window.bind("load", function() {
        headerScrollUpDown(); 
        equal();
    });        

    isRes = function(){return $window.width() > 767;};
    $window.resize(function(){
        //if(isRes()){ followequal();}
        equal(); 
    });
    //PWA
    var loadJS = function(url, implementationCode, location){
        var scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;
        location.appendChild(scriptTag);
    };
    function loadPWA(){}
    // loadJS('/assets/js/pwa.js', loadPWA, document.body);
}); 
