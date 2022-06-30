/* 
    code js xử lý riêng cho page search desktop
    Created on : Feb 14, 2020, 11:06:37 AM
    Author     : Minh Nguyen
 */
var startApp = function () {
    $('.type-view').click(function(){
        $('.type-view').removeClass('active');
        $(this).addClass('active');
        if($(this).data('show') == 1){
            // show grid view (as default)
            $('#view-as-grid').show();
            $('#view-as-list').hide();
            App.Feature.setCookie('control_search', 'grid');
        } else{
            // show list view
            $('#view-as-list').show();
            $('#view-as-grid').hide();
            App.Feature.setCookie('control_search', 'list');
        }
    });
    // đăng ký nhận tin BĐS wa mail
    var checkValidFormEmail = function(form) {
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
				email: {
					validators: {
						emailAddress: {
							message: messages.home_nhucau_email_wrongformat
						},
                        notEmpty: {
                            message: 'Vui lòng nhập email'
                        }
					}
				}
			}
		});
		var bootstrapValidator = form.data('bootstrapValidator');
		bootstrapValidator.validate();
		return bootstrapValidator.isValid();
	};
    
	$(document).on('click', '#subscribe-mail', function() {
		App.UI.showLoadding();
		$(this).prop('disabled', true);
		var curForm = $(this).closest('#thongbaoModal');
		if (!checkValidFormEmail(curForm)) {
			App.UI.hideLoadding();
			$('#subscribe-mail').prop('disabled', false);
			return false;
		}

		var dataSend = {
			name: $('#subscribeName').val(),
			email: $('#subscribeEmail').val(),
			cityId: $('.subscribeCity').val(),
			districtId: $('.subscribeDistrict').val()
		};

		App.Feature.Post('/api/subcribe-email-news', dataSend, function(response){
			if (response.code == 200) {
				$('.form-subscribe-mail').find('input').val(null);
				App.UI.hideLoadding();
				$('body').toggleClass('showModal');
				$('#thongbaoModal').removeClass('active');
				App.UI.Done('Bạn đã đăng ký thành công');
				$('#subscribe-mail').prop('disabled', false);
			} else {
				App.UI.hideLoadding();
				App.UI.Error('Có lỗi xảy ra, vui lòng thử lại');
				$('#subscribe-mail').prop('disabled', false);
			}
		});
	});
    // sort
    $(".sort").change(function () {
        var value = parseInt($(this).val());
        if (value > 0) {
            window.location.search = $.query.set("sapxep", value);
        } else {
            $.query = $.query.remove("sapxep");
            if ($.query.toString().length == 0) {
                window.location = window.location.href.split("?")[0];
            }
            else {
                window.location.search = $.query.remove("sapxep");
            }
        }
    });
};
