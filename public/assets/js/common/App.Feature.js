if (typeof App !== "object") { 
    App = {};
}

var openServiceTab = function(params){
    var params=params||{};
    var hash = window.location.hash;
    if(params.defaultHash){
            hash = params.defaultHash;
    }
    $(".bl-services-info a[href='"+hash+"']").click();
    if(params.scrollBody==undefined || params.scrollBody==true){
        $('html, body').animate({scrollTop: 460 }, 1000);                 
    }
};

App.Feature = {
	checkValidJson : function(text){
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        } else {
            return false;
        }
    },
	slugify : function(str) {
		return str.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
	},
	gotoService: function(pageHash){
		if(location.href.indexOf("/dich-vu") > -1){
			location.hash = "#"+pageHash;
            openServiceTab();
		}
		else {
			location.href = "/dich-vu#" + pageHash;
		}
		// return false;
	},
	loadScripts: function(scripts, callback, version){
		var count = 0;
		for (var i = 0; i < scripts.length; i++) {
			var name = scripts[i];
			if(version) {
				name += "?v="+version;
			}
			var s,r,t;
		  s = document.createElement('script');
		  s.type = 'text/javascript';
		  s.src = name;
		  s.onload = s.onreadystatechange = function() {
		    if ( (!this.readyState || this.readyState == 'complete') )
		    {
		      count++;
		      if(count == scripts.length) {
		      	callback();
		      }
		    }
		  };
		  t = document.getElementsByTagName('script')[0];
		  t.parentNode.insertBefore(s, t);
		}
	},
	jQueryInit : function(version){ 
        var scripts = [
			"/assets/js/common/dataLayer.js",
        	"/assets/plugins/modal/rmodal.min.js",
            "/assets/bootstrap/js/bootstrap.min.js",
            "/assets/plugins/bootstrapValidator/bootstrapValidator.js",
            "/assets/js/select2.min.js",
            "/assets/plugins/bxslider/jquery.bxslider.min.js",
            "/assets/plugins/owlcarousel2/owl.carousel.js",
            "/assets/plugins/jquery.query/jquery.query.js",
            "/assets/plugins/slider/bootstrap-slider.min.js",
            "/assets/js/taggle.min.js",
            "/assets/bootstrap/js/bootstrap-datepicker.min.js",
            "/assets/js/common/message.js",
            "/assets/plugins/selectize.js/dist/js/standalone/selectize.min.js"
        ];
        if(typeof definedScripts !== "undefined") {
            scripts = scripts.concat(definedScripts);
        }
        var self = this;
        self.loadScripts(scripts, function() {
            var commonJs = [
                "/assets/js/common/Cart.js",
                "/assets/js/common/compare.js",
                "/assets/js/common/mycollection.js",
                "/assets/js/common/authen.js"
            ];
            if(App.UI.isMobile())
                self.loadScripts(commonJs, function () {
                    if (App.UI.isMobile() && !$("body").hasClass('topListing') && !$("body").hasClass('nhagansanbay')){
                        var owl = $('.owl-carousel');
                        owl.owlCarousel({
                            stagePadding: 20,
                            loop: true,
                            margin: 10,
                            nav: true,
                            navText: ['&#x27;next&#x27;', '&#x27;prev&#x27;'],
                            dots: false,
                            autoplay: false,
                            responsive: {
                                0: {
                                    items: 1,
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
                    if (typeof startApp === "function") {
                        setTimeout(function(){
                            $("#preloading-screen").fadeOut(300, function(){ 
                                $("#preloading-screen").remove();
                                $("#menu-mobile").show(); 
                            });
                        }, 200);
                        startApp(); 
                    }
                }, version);
            
        }, version);
    },
    setCookie : function(cname, cvalue, exdays) {
	    var d = new Date();
        exdays = typeof exdays == 'undefined' ? 10000 : exdays;
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires+ "; path = /";
	},
	getCookie : function(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	},
    Get: function(url, callback, showLoad) {
		$.ajax({
	        type: "GET",
	        url: url,
	        contentType: "application/json;charset=utf-8",
            beforeSend: function () {
	        	if(showLoad) {
                    App.UI.showLoadding(showLoad);
                }
            },
	        success: function(response) {
	            callback(response);
                if(showLoad)
                    App.UI.hideLoadding();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	        	if(showLoad)
                    App.UI.hideLoadding();
                App.UI.Error("???? c?? l???i x???y ra");
	        }
	    });
	},
    Post: function(url, data, callback, showLoad, dataType) {
		$.ajax({
	        type: "POST",
	        url: url,
	        dataType: dataType ? dataType: 'json',
	        contentType: "application/json;charset=utf-8",
	        data: JSON.stringify(data),
            async: true,
            beforeSend: function () {
	        	if(showLoad) {
                    App.UI.showLoadding(showLoad);
                }
            },
	        success: function(response) {
	            callback(response);
	            if(showLoad)
                    App.UI.hideLoadding();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
                if(showLoad)
                    App.UI.hideLoadding();
	            App.UI.Error("???? c?? l???i x???y ra");
	        }
	    });
	},
    Delete: function(url, callback, showLoad) {
		$.ajax({
	        type: "DELETE",
	        url: url,
	        contentType: "application/json;charset=utf-8",
            beforeSend: function () {
	        	if(showLoad) {
                    App.UI.showLoadding(showLoad);
                }
            },
	        success: function(response) {
	            callback(response);
                if(showLoad)
                    App.UI.hideLoadding();
	        },
	        error: function(xhr, ajaxOptions, thrownError) {
	        	if(showLoad)
                    App.UI.hideLoadding();
                App.UI.Error("???? c?? l???i x???y ra");
	        }
	    });
	},
	CountNumberChar: function(str) {
		return (str.match(/\d/g) || []).length;
	},
	GetValueFromString: function(str) {
		return (str.match(/[\d\.,]/g) || []).join("");
	},
	ExtractNumber: function(str) {
		return (str.match(/\d/g) || []).join("");
	},
	AddIframe: function(successUrl) {
    /* Ti???n h??nh add iframe ????ng k?? th??nh c??ng */
	    $("<div id='showIframeSEONgon' style='display:none;'></div>").prependTo($('body'));
	    var iframe = document.createElement('iframe');
	    iframe.width = "100%";
	    iframe.height = "1px";
	    iframe.frameborder = "0";
	    iframe.style.border = '0';
	    iframe.src = successUrl;
	    $("#showIframeSEONgon").html(iframe);
	},
	renderLinkListing: function(listing){
        var type = parseInt(listing.listingTypeId) != 1 ? "thue" : "mua";
        var propertyTypeName = this.strToUrl(listing.propertyTypeName);
        var districtName = this.strToUrl(listing.districtName);
        var slug = this.strToUrl(listing.title);
		return "/"+type+"/"+slug+"-id"+listing.rlistingId;
	},
    renderLinkListingApartment: function(listing){
        var slug = this.strToUrl(listing.title);
        return "/du-an/"+slug+"-id"+listing.listingId;
	},
	strToUrl: function(title){
        var slug;
        slug = title.toLowerCase();
        /* ?????i k?? t??? c?? d???u th??nh kh??ng d???u */
        slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
        slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
        slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
        slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
        slug = slug.replace(/??|???|???|???|???/gi, 'y');
        slug = slug.replace(/??/gi, 'd');
        /* //X??a c??c k?? t??? ?????t bi???t */
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        /* ?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang */
        slug = slug.replace(/ /gi, "-");
        /* ?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang */
		/* Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng */
		slug = slug.replace(/\-\-\-\-\-/gi, '-');
		slug = slug.replace(/\-\-\-\-/gi, '-');
		slug = slug.replace(/\-\-\-/gi, '-');
		slug = slug.replace(/\-\-/gi, '-');
        /* //X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i */
		slug = '@' + slug + '@';
		slug = slug.replace(/\@\-|\-\@|\@/gi, '');
		return slug;
	},
    /* Upload image */
    uploadImage: function (input, e, callback="",url) {
        files = e.target.files[0];
        var data = new FormData();
        var obj;
        data.append('file', files);
        if(typeof files !== "undefined") {
            $.ajax({
                url: url ? url : '/api/upload',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, 
                contentType: false,
                // Image loading
                beforeSend: function () {
                    var img_load = new Image();
                    img_load.src = '/assets/images/loading.svg?v=03.06.2019';
                    $($(input).data('target')).parent().append($(img_load).addClass("image-loadding"));
                    $($(input).data('target')).parent().css({'position': 'relativie'});
                },
                success: function (result, textStatus, jqXHR) {
                    if (typeof result === 'object') {
                        obj = result;
                    } else {
                        obj = JSON.parse(result);
                    }
                    if (obj.result) {
                        src_img = obj.data.link;
                        $($(input).data('target')).attr('src', src_img);
                        $($(input).data('target')).parent().first().find('.image-loadding').first().remove();
                        if ($.isFunction(callback)) {
                            callback(obj.data);
                        }
                    } else {
                        alert(obj.message);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // STOP LOADING SPINNER
                    alert(textStatus);
                }
            });
        }
	},
	setCookie2: function(key, value, expireDays = 0) {
		if (typeof document !== 'undefined') {
			if (expireDays) {
				const currentDate = new Date();
				currentDate.setTime(
					currentDate.getTime() + expireDays * 24 * 60 * 60 * 1000
				);
				const expires = 'expires=' + currentDate.toUTCString();
				document.cookie = key + '=' + value + ';' + expires + ';path=/';
			} else {
				document.cookie = key + '=' + value + ';path=/';
			}
		}
	},
	getCookie2: function(key) {
		if (typeof document !== 'undefined') {
			const name = key + '=';
			const decodedCookie = decodeURIComponent(document.cookie);
			const ca = decodedCookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
		}
		return '';
	},
	containCookie2: function(key) {
		return this.getCookie2(key) ? true : false;
	},
	clearCookie2: function(key) {
		this.setCookie2(key, '', -1);
	},
	clearAllCookie2: function() {
		if (typeof document !== 'undefined') {
			document.cookie = '';
		}
	}
};
