
var MakeSchedule = (function(){
	var ckChooseListing = $(".ck_choose_listing");
	var btnShowMakeSchedule = $(".showMakeSchedule");
	var blockListingMenuClass = ".block_listing_menu";
    var btnMakeSchedule = $("#btnSchedule");

	var setButtonCheckVisible = function(isVisible){
		if(isVisible==false){
			ckChooseListing.hide();
			$(".checkboxListing").prop("checked", false);
			ckChooseListing.removeClass("active");		
		}else{
			ckChooseListing.show();		
		}
	};

	btnShowMakeSchedule.on("click", function(event){
		event.preventDefault();
		setButtonCheckVisible(true);
		$(this).parents(".col-dropdown-listing").find(blockListingMenuClass).click();
	});

	ckChooseListing.on("click", function(event){
		// event.preventDefault();
		$(this).toggleClass("active");
	});
    
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };

	btnMakeSchedule.on("click", function(event){
		event.preventDefault();
        if ($(".checkboxListing:checked").size() == 0) {
            App.UI.Error("Bạn vui lòng chọn ít nhất một BĐS để đặt lịch xem");
            return false;
        }
        //
        var curForm = $(this).closest(".form-love");
        if (!checkValidForm(curForm)) {
            return false;
        }
        App.UI.showLoadding();
        //
        var postData = {
            message: "Đặt lịch xem từ trang yêu thích",
            links: [],
            rlistingIds: [],
            requestTypeIds: [3],
			date : null
        };

        if ($(".form-datlich").size() > 0) {
            postData.name = $("#name").val();
            postData.phone = $("#phone").val();
            postData.email = $("#email").val();
            App.Feature.setCookie("cinfo", '{"name":"' + postData.name + '","phone":"' + postData.phone + '","email":"' + postData.email + '"}');
        }
        else {
            var cinfo = App.Feature.getCookie("cinfo");
            if (!cinfo || !App.Feature.checkValidJson(cinfo)) {
                cinfo = '{}';
            }
            cinfo = JSON.parse(cinfo);
            postData.name = cinfo.name;
            postData.phone = cinfo.phone;
            postData.email = cinfo.email;
        }
        
        var date = $("#request-date").val();
        var time = $("#request-time").val();
        postData.date = null;
        if(date !== '' && time !== ''){
            postData.date = moment(date + " " + time, "DD/MM/YYYY HH:mm").unix() * 1000;
        } else if(date !== '' && time == ''){
            postData.date = moment(date, "DD/MM/YYYY HH:mm").unix() * 1000;
        } else {
            postData.date = null;
        }

        $(".checkboxListing:checked").each(function (idx, element) {
            postData.rlistingIds.push(parseInt($(element).attr("listingid")));
            postData.links.push(location.protocol + "//" + location.host + $(element).attr("link"));
        });

        if (App.UI.isMobile()) {
            postData.form_type = 6;
        }
        else {
            postData.form_type = 2;
        }
        
        let visitedList = TrackUserRoute.getVisitedList();
        if(visitedList){
            postData.visitList = visitedList;
        }
        console.log(postData);
        App.Feature.Post("/api/dat-lich-xem", postData, function (data) {
            App.UI.hideLoadding();
            if (data.result) {
                TrackUserRoute.clearVisitedList();
                App.Feature.AddIframe("/dat-lich-thanh-cong");
                var cart = Cart.getCart();
                for (var i = 0; i < cart.fav.length; i++) {
                    var element = cart.fav[i];
                    var elementToSchedule = Object.assign({}, element); 

                    // not found fav[i] in postData listingIds
                    if (postData.rlistingIds.indexOf(parseInt(cart.fav[i]["id"])) != -1) {
                        // check is user select time 
                        if (postData.date == null) {
                            elementToSchedule.scheduleTime = new Date().getTime();
                        } else {
                            elementToSchedule.scheduleTime = postData.date;
                        }
                     
                        if (cart.scheduled.length >= 1) {
                            var isItemScheduled = cart.scheduled.find(item => {
                                if (item.id === elementToSchedule.id) {
                                    item.scheduleTime = elementToSchedule.scheduleTime;
                                    return true;
                                }
                            });
                            // 
                            if (!isItemScheduled) {
                                cart.scheduled.unshift(elementToSchedule);
                            }
                        } else {
                            cart.scheduled.unshift(elementToSchedule);
                        }
                    }
                }

                Cart.updateCart(cart);
                window.location.href = '/thank-you';
            }
            else {
                App.UI.Error(data.message);
            }
        });
	});

	setButtonCheckVisible(true);

})();


var startApp = function() {
    $('.ipbug').click(function() {
        if ($(this).attr('id') !== 'request-date') {
            setTimeout(() => {
                $('.datepicker').hide();
            });
        }
	});
	
	$('.navigator-share').click(function () {
		if (navigator.share === undefined) {
			console.log('Error: Unsupported feature: navigator.share()');
			return;
		}

		if (navigator.share) {
			navigator.share({
				title: 'propzy.vn',
				text: 'PROPZY',
				url: $('#link-share').val()
			});
		}
    });

    $.fn.bootstrapValidator.validators.timeLate = {
        validate: function (validator, $field, options) {
            if(!$.trim($field.val())) {
                var dateTime = moment($field.val(), "DD/MM/YYYY HH:mm").unix();
                var timeNow = moment().unix();
                if (timeNow > dateTime) {
                    return false;
                }
            }
            return true;
        }
    };
	$(".form-love").bootstrapValidator({
        message: "Giá trị chưa đúng", excluded: [":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập Họ và tên"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập số điện thoại"
                    }
                    , stringLength: {
                        message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: "Vui lòng nhập địa chỉ email hợp lệ"
                    }
                }
            }
        }
    });

    App.UI.inputAllowNumber("#phone");
    App.UI.removeCheckSuccess(".form-love", ['email']);
    
    var MobileYeuThich = (function(){
		var removeListing = function(selector, listingid){
	        Cart.removeFavListing(listingid);
	        $(selector).parents(".bl-listing-"+listingid).fadeOut(300, function () {
	            $(document).trigger('scroll');
	            $(this).remove();
	            var cart = Cart.getCart();
	            $(".favCount").text(cart['fav'].length);
	            if (cart['fav'].length == 0) {
	                location.reload();
	            }
	        });
	        var data_remove = $(selector).parents('.blocks').first().data('remarketing');
	        if(data_remove) {
	            dataLayer.push({
	                'event': 'removeFromCart',
	                'ecommerce': {
	                    'remove': {
	                        'products': [{
	                            'name': data_remove.name,
	                            'id': data_remove.id,
	                            'price': data_remove.price,
	                            'category': data_remove.category
	                        }]
	                    }
	                }
	            });
	        }        
	    };

	    $(".block-fav .removeListing").click(function () {
	        event.preventDefault();
	        var listingid = parseInt($(this).attr("listingid"));
	        removeListing(this, listingid);
	        return false;
	    });
	    
	    $(".remove_wishlist").click(function (event) {
	        event.preventDefault();
	        var listingid = parseInt($(this).attr("listingid"));
	        removeListing(this, listingid);
	        return false;
	    });
    })();
    
    $('.btn-share-social').click(function(){
        var arrayIds = [];
        $.each($('.btnlike'), function(key, val){
            arrayIds.push($(val).attr('listingid'));
        });
        var dataPost = {
            "networkType" : 1079,
            "basketId" : null,
            "behaviourType" : 1083,
            "shareIds" : arrayIds.toString(),
            "shareType": 1653
        };
        //console.log(dataPost);
        App.Feature.Post("/api/share-social", dataPost, function (response) {
            if(response.result){
                $('#link-share').val(location.origin + response.data.url);
            }
        });
    });
    //
    $('#share-fb').click(function(){
        var link = $('#link-share').val();
        window.open('http://www.facebook.com/sharer.php?u=' + link, '', 'width=450,height=450');
    });
    //
    $('.copy-link').click(function(){
        var copyText = document.getElementById("link-share");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand('copy');
    });

    $(function () {
        // init date time
        $("#request-date").datepicker({
            locale: 'vi',
            format: 'dd/mm/yyyy',
            todayHighlight: true,
            autoclose: true,
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + (13*86460*1000))
        }).on('hide', function(e) {
            e.stopPropagation();
        }).on('focus',function(){
            $(this).trigger('blur');
        });
        //
        if($("#request-time").attr('type') == 'text'){
            $("#request-time").timepicker({
                minuteStep: 1,
                showSeconds: false,
                showMeridian: false,
                showInputs : false,
                defaultTime : 'current'
            }).on('focus',function(){
                $(this).trigger('blur');
            });
        }
        //
        $('#request-date').on('dp.change', function(e){
            $(".form-love").bootstrapValidator('revalidateField', 'date');
        });
    });
    //
};
