$(document).ready(function() {
    $('.readmore-block').readmore({
        speed: 1000,
        collapsedHeight: 392,
        moreLink: '<a class="readmore-detail show-readmore" href="#"><div class="show-content">Xem thêm</div></a>',
        lessLink: '<a class="readmore-detail hide-readmore" href="#"><div class="hide-content">Thu gọn</div></a>',
        blockCSS: 'display: block;position: relative;'
    });
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#container-incentives').removeClass('container-incentives');
        $('#container-incentives').addClass('container-incentives-remove');
    });
    $('#send-info').click(function (){
        $('#popup-request-infos').modal();
    });
    var checkValidForm = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            }
            , fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'Tên không được trống'
                        }
                    }
                },
                district: {
                    validators: {
                        notEmpty: {
                            message: 'Quận không được trống'
                        }
                    }
                },
                phone: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Số điện thoại không được trống'
                        },
                        digits: {
                            message: 'Phải là số'
                        }
                    }
                },
                price: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Giá không được trống'
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
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    
    $('.bl-resgiter-info .btn-send').click(function (e) {
        var curForm = $(this).closest(".form-apply");
        if(!checkValidForm(curForm)) {
            return false;
        }
        var dataSend = {
            name : $('.form-apply .form-control[name="name"]').val(),
            email : $('.form-apply .form-control[name="email"]').val(),
            phone_number : $('.form-apply .form-control[name="phone"]').val(),
            price : $('.form-apply .form-control[name="price"]').val(),
            district : $('.form-apply .form-control[name="district"]').val(),
            other_request : $('.form-apply .form-control[name="require-more"]').val(),
            language : 'vi',
            campaign_id : 2
        };

        $('.bl-resgiter-info .btn-send').unbind("click");
        $('.bl-resgiter-info .btn-send').addClass('disable');

        $.ajax({
            type: "POST",
            url: "/api/bat-dong-san-doc-quyen",
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(dataSend),
            async: false,
            success: function (response) {
                if(response.code == 200) {
                    window.location.href = '/thank-you';
//                    alert("Đã gửi thông tin thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất");
//                    $('#popup-request-infos').modal('hide');
                }else{
                    alert("Đã có lỗi xảy ra");
                    $('.bl-resgiter-info .btn-send').bind("click");
                    $('.bl-resgiter-info .btn-send').addClass('enable');
                }
            },
            error: function () {
                alert("Đã có lỗi xảy ra");
                $('.bl-resgiter-info .btn-send').bind("click");
                $('.bl-resgiter-info .btn-send').addClass('enable');
            }
        });
        return false;
    });
});