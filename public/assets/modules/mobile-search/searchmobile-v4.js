/* 
    code js xử lý riêng cho page search mobile
    Created on : Dec 26, 2019, 1:09:35 PM
    Author     : Minh Nguyen
 */
var startApp = function () {
    $('.form-listing-filter select').on('change', function () {
        if (this.value != 0) {
            $(this).addClass('changed');
        } else {
            $(this).removeClass('changed');
        }
    });

    $('#filterModal input:radio').change(function () {
        $('#filterModal .btnModal').trigger('click');
    });
    
    //
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
	// Xem thêm listing
	var pageIndex = 1;
	$(document).ready(function() {
		if (prevPageIndex > 1) {
			pageIndex = 0;
		}
	});

    $('.view-more-listing').click(function(){
        var dataSend = dataPost;
        if (pageIndex < totalPages) {
            pageIndex++;
			if (pageIndex === prevPageIndex) {
				pageIndex++;
			}
			App.Feature.setCookie2('pageIndex', pageIndex);
            dataSend.additional.paging.page = pageIndex;
            App.UI.showLoadding();
            
            $.ajax({
                type: "POST",
                url: '/api/render-more-listing',
                data: JSON.stringify(dataSend)
            }).success(function (response) {
                if (hasValue(response)) {
                    $(".add-more-listing").append(response);
                }
                App.UI.hideLoadding();
            }).fail(function (jqXHR, ajaxOptions, thrownError) {
                pageIndex--;
                App.UI.hideLoadding();
            });
            if(pageIndex == totalPages){
                $('.view-mores').hide();
            }
        }
    });
    // Xem thêm dự án
    var page_index = 1;
    $('.view-more-project').click(function(){
        var dataSend = dataPost;
        if (page_index < totalPages) {
			page_index++;
			if (pageIndex === prevPageIndex) {
				pageIndex++;
			}
			App.Feature.setCookie2('pageIndex', pageIndex);
            dataSend.additional.paging.page = page_index;
            App.UI.showLoadding();
            
            $.ajax({
                type: "POST",
                url: '/api/render-more-listing',
                data: JSON.stringify(dataSend)
            }).success(function (response) {
                if (hasValue(response)) {
					$(".add-more-project").append(response);
					ResOwlSlider();
                }
                App.UI.hideLoadding();
            }).fail(function (jqXHR, ajaxOptions, thrownError) {
                page_index--;
                App.UI.hideLoadding();
            });
            if(pageIndex == totalPages){
                $('.view-mores').hide();
            }
        }
    });
    //
    // $('.view-more-no-result').click(function(){
    //     location.href = location.pathname;
    // });
    // đăng ký form email
    //
    var checkValidFormEmail = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
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
    $(document).on("click", '#subscribe-mail', function (){
        App.UI.showLoadding();
        $(this).prop('disabled', true);
        var curForm = $(this).closest(".form-subscribe-mail");
        if(!checkValidFormEmail(curForm)) {
            App.UI.hideLoadding();
            $('#subscribe-mail').prop('disabled', false);
            return false;
        }
        
        var dataSend = {
            name : $('#name-subscribe-form').val(),
            email : $('#email-subcribe-form').val(),
            cityId: $('.city-subscribe').val(),
            districtId: $('.district-subscribe').val()
        };
        
        App.Feature.Post('/api/subcribe-email-news', dataSend, function(response){
            if(response.code == 200) {
                $(".form-subscribe-mail").find("input").val(null);
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

function hasValue(value) {
    if (typeof value == "undefined") {
        return false;
    }
    if (typeof value == "number") {
        return true;
    }
    if (value == undefined || value == null || value == "") {
        return false;
    }
    if (typeof value == "string" && value.trim() == "") {
        return false;
    }
    if (typeof value == "object" && value.length == 0) {
        return false;
    }
    if (typeof value == "function") {
        return false;
    }
    return true;
}

function scrollIntoBlock(prevBlockId) {
	// Tìm thẻ a class title nếu là mua bán
	aTags = $('.add-more-listing').find('h4.title a.title');
	// if (!aTags.length) {
	// 	// Nếu mua, cho thuê ko ra thì tìm thẻ a của project
	// 	aTags = $('.add-more-project').find('h3.title a');
	// }

	// split href lấy id và gắn id cho thẻ a để scroll tới
	aTags.each(function() {
		$(this).attr('id', 'b' + $(this).attr('href').split('id')[1]);
	});

	if ($('#b' + prevBlockId)[0]) {
		$('#b' + prevBlockId)[0].scrollIntoView();
		window.scrollBy(0, -250);
	}
}