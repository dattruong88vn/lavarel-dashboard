/**
*	Những start up function làm chung cho tất cả các page desktop
*/
//window.onload = function () {
//	var appLayer = new AppLayer();
//};
$('#header .menu-top-header li a').each(function(){
	if($(this).attr('href')=='/'+url_active)
		$(this).parents('li').addClass('active');
});

$(document).ready(function(){
    Mycollection.init();
    initSpanEyes();
    $("#menu-toggle").click(function(e) {
		e.preventDefault();
        $('body').addClass('scroll-page');
		$("#wrapper").toggleClass("toggled");
	});
    
    $(window).on("DOMContentLoaded load resize scroll mousemove touchstart touchend touchmove", function(){
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
        
        if($('.DMCABadgeHelper').length <= 0){
            $("body").append('<script class="DMCABadgeHelper" src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>');
        }
        
    });

	$('#sidebar-wrapper ul li a').each(function(){
		if($(this).attr('href')=='/'+url_active+'?src=menu_side' || $(this).attr('href')=='/'+url_active+'?src=menu_top' || $(this).attr('href')=='/'+url_active)
			$(this).parents('li').addClass('active');
        if($('.sub-menu').children().hasClass('active')){
            $('.sub-menu').parent().removeClass('active');
        }
	});

	$(".change-image-acount").click(function(){
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
							App.UI.Error("Đã có lỗi xảy ra !");
						}
					},true);
					
				}
			},'/api/upload?type=avatar');
		});
	});

	//  Begin footer modal dream house
	// Prefix: ftc - Footer Contact
	$(document).on('click', '#ftc-buy-request', function() {
		$('#ftc-info-request').html('');
		$('#ftc-info-request').html($('#ftc-info-request-buy').html());
	});

	$(document).on('click', '#ftc-rent-request', function() {
		$('#ftc-info-request').html('');
		$('#ftc-info-request').html($('#ftc-info-request-rent').html());
	});
	
	var checkValidFormNhuCau = function(form) {
		form.removeData('bootstrapValidator');
		form.bootstrapValidator({
			message: 'Giá trị chưa đúng',
			excluded: [':hidden'],
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				name: {
					validators: {
						notEmpty: {
							message: messages.home_nhucau_ten_empty
						}
					}
				},
				district: {
					validators: {
						notEmpty: {
							message: messages.home_nhucau_quan_empty
						}
					}
				},
				phone: {
					message: '',
					validators: {
						notEmpty: {
							message: messages.home_nhucau_phone_empty
						},
						digits: {
							message: messages.home_nhucau_phone_wrongformat
						},
						stringLength: {
							message: messages.home_nhucau_phone_wrongformat,
							min: 10,
							max: 10
						}
					}
				},
				price: {
					message: '',
					validators: {
						notEmpty: {
							message: messages.home_nhucau_gia_empty
						}
					}
				},
				request: {
					message: '',
					validators: {
						notEmpty: {
							message: messages.home_nhucau_nhucau_empty
						}
					}
				},
				email: {
					validators: {
						emailAddress: {
							message: messages.home_nhucau_email_wrongformat
						}
					}
				}
			}
		});
		var bootstrapValidator = form.data('bootstrapValidator');
		bootstrapValidator.validate();
		return bootstrapValidator.isValid();
	};

	let checkValidFormSubscribeEmail = function(form) {
		form.removeData('bootstrapValidator');
		form.bootstrapValidator({
			message: 'Giá trị chưa đúng',
			excluded: [':hidden'],
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				email: {
					validators: {
						notEmpty: {
							message: messages.home_nhucau_email_empty
						},
						emailAddress: {
							message: messages.home_nhucau_email_wrongformat
						}
					}
				}
			}
		});
		var bootstrapValidator = form.data('bootstrapValidator');
		bootstrapValidator.validate();
		return bootstrapValidator.isValid();
	};

	$(document).on('click', '#ftc-send-infos-popup', function() {
		App.UI.showLoadding();
		// $(this).prop('disabled', true);
		var curForm = $(this).closest('#contactModal');
		if (!checkValidFormNhuCau(curForm)) {
			App.UI.hideLoadding();
			$('#ftc-send-infos-popup').prop('disabled', false);
			return false;
		}
		var districtIds = [];
		districtIds.push($('#ftc-info-district').val());

		var dataSend = {
			customerName: $('#ftc-info-name').val(),
			customerPhone: $('#ftc-info-phone').val(),
			email: $('#ftc-info-email').val(),
			listingTypeId: parseInt($('.ftc_type_listing:checked').val()),
			propertyTypeId: parseInt($('#ftc-info-request').val()),
			districtIds: districtIds,
			sourceId: 2,
			requestText: $('#ftc-info-request option:selected').text()
		};
		let visitedList = TrackUserRoute.getVisitedList();
		if (visitedList) {
			dataSend.visitList = visitedList;
		}
        
        App.Feature.Post('/api/request-find-home', dataSend, function(response) {
            $('#contactModal').children('.overlay').click();
            if (response.code == 200) {
                TrackUserRoute.clearVisitedList();
                $('#contactModal').find('input').val(null);
                $('#contactModal').find('#ftc-info-district').val(null);
                App.UI.hideLoadding();
                App.UI.Done(messages.home_nhucau_success);
                $('#ftc-send-infos-popup').prop('disabled', false);
            } else {
                App.UI.hideLoadding();
                if (response.code == 410) {
                    // là moi gioi can login
                    App.UI.ShowFormMessage('#popup-login','Số điện thoại đã tồn tại trong hệ thống, bạn vui lòng đăng nhập',App.UI.notiTypeError);
                    $('#popup-login').modal('show');
                } else {
                    App.UI.Error(messages.home_nhucau_error);
                    $('#ftc-send-infos-popup').prop('disabled', false);
                }
            }
        });
	});

	$('.btnSubscribeEmail').click(function() {
		let currentForm = $(this).closest('#email-subcribe');
		if (checkValidFormSubscribeEmail(currentForm)) {
			$('#email-subcribe').click();
		}
	});
    
    if (typeof startApp === "function") {
        startApp();
    }
});