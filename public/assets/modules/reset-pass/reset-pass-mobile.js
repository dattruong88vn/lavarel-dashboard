var startApp = function(){
    $('#popup-re-password-mobile').modal('show');
    var checkValidFormResetEmail = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            }, 
            fields: {
                pass_email: {
                    validators: {
                        notEmpty: {
                            message: 'Bạn chưa nhập password'
                        },
                        stringLength: {
                            message: "Mật khẩu từ 6 đến 20 ký tự", min: 6, max: 20
                        }
                    }
                },
                repass_email: {
                    validators: {
                        notEmpty: {
                            message: 'Bạn chưa nhập xác nhận mật khẩu'
                        },
                        stringLength: {
                            message: "Mật khẩu từ 6 đến 20 ký tự", min: 6, max: 20
                        },
                        identical: {
                            field: 'pass_email',
                            message: 'Mật khẩu không trùng khớp'
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    $('#reset-pass-email').click(function(){
        var curForm = $(this).closest("#resetPasswordEmail");
        if(!checkValidFormResetEmail(curForm)) {
            return false;
        }
        var phone = null;
        var email = null;
        var code = $('#code_token').val();
        var newPassword = $('#password-email').val();
        var dataSend = {};
        dataSend.phone = phone;
        dataSend.email = email;
        dataSend.code = code;
        dataSend.newPassword = newPassword;
        console.log(dataSend);
        //
        App.Feature.Post("/api/reset-password", dataSend, function (response) {
            if (response.result) {
                $('#popup-re-password').modal('hide');
                App.UI.Info('Cập nhật mật khẩu mới thành công');
                $('#modal-info').on('hide.bs.modal',function () {
                    location.href = '/#login';
                });
            } else {
                App.UI.Info(response.message);
            }
        });
    });
};