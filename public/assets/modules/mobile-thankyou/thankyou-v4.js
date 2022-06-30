var startApp = function() {
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

	// đăng ký nhận tin BĐS wa mail
	$(document).on('click', '#subscribe-mail', function() {
		App.UI.showLoadding();
		$(this).prop('disabled', true);
		var curForm = $(this).closest('.form-subscribe-mail');
		if (!checkValidFormEmail(curForm)) {
			App.UI.hideLoadding();
			$('#subscribe-mail').prop('disabled', false);
			return false;
		}

		var dataSend = {
			name: $('#name-subscribe-form').val(),
			email: $('#email-subcribe-form').val(),
			cityId: $('.city-subscribe').val(),
			districtId: $('.district-subscribe').val()
		};

		console.log(dataSend);
		App.Feature.Post('/api/subcribe-email-news', dataSend, function(
			response
		) {
			if (response.code == 200) {
				$('.form-subscribe-mail')
					.find('input')
					.val(null);
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
};
