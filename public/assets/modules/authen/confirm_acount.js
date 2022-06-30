var startApp = function(){
    $(document).ready(function () {
        App.UI.addRules();
        App.UI.inputAllowNumber("input[name='phone']", false);
        let data_user = JSON.parse(localStorage.getItem("info_user_facebook"));
        var default_send = {
            "deviceToken": null,
            "osName": "Potal site",
            "name": null,
            "wantToBeAgent": true,
            "type": "facebook",
            "phone": null,
            "email": null,
            "versionName": "11.4.1",
            "password": null,
            "deviceName": null,
            "facebookUid": data_user.id,
            "appId": '535618670209689'
        };

        function loadForm() {
            $("input[name='name']").val(data_user.name);
            $("input[name='email']").val(data_user.email);
            if (parseInt(data_user.type_user) == 0)
                $("#procedureTypeId1").prop("checked", true);
            else
                $("#procedureTypeId2").prop("checked", true);
        }

        function bindEvent() {
            $("#confirm-phone").click(function () {
                default_send.name = $("input[name='name']").val().trim();
                default_send.phone = $("input[name='phone']").val().trim();
                default_send.email = $("input[name='email']").val().trim();
                default_send.password = $("input[name='password']").val().trim();
                default_send.confirm_password = $("input[name='confirm_password']").val().trim();
                default_send.wantToBeAgent = Boolean(Number($("input[name='procedureTypeId']:checked").val()));
                var checkResult = App.UI.checkValidRules($("#confirm-acount-facebook"), {
                    name: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập Họ và tên'
                            }
                        }
                    }, phone: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập số điện thoại'
                            },
                            stringLength: {
                                message: "Vui lòng nhập Số điện thoại hợp lệ", min: 10, max: 10
                            }
                        }
                    }, email: {
                        validators: {
                            emailAddress: {
                                message: 'Vui lòng nhập địa chỉ email hợp lệ'
                            }
                        }
                    }, password: {
                        validators: {
                            notEmpty: {
                                message: 'Vui lòng nhập mật khẩu'
                            },
                            stringLength: {
                                message: "Vui lòng nhập mật khẩu từ 6 đến 20 ký tự", min: 6, max: 20
                            }
                        }
                    }
                });
                if (checkResult) {
                    App.Feature.Post('/api/register', default_send, function (response) {
                        if (response.code == 402) {
                            App.UI.Confirm("Tài khoản đã tồn tại nhưng chưa được kích hoạt, Vui lòng kích hoạt tài khoản của bạn", function () {
                                location.href = '/xac-nhan-tai-khoan';
                            });
                        } else if (response.code == 409) {
                            App.UI.Confirm("Tài khoản đã có trong hệ thống, Đăng nhập để tiếp tục", function () {
                                $("#popup-login").modal("show");
                            });
                        }  else if (response.code == 5309) {
                            App.UI.Confirm("Tài khoản đã có trong hệ thống, Link tài khoản Facebook", function () {
                                default_send.isLinkedFB = true;
                                App.Feature.Post('/api/register', default_send, function (response) {
                                    App.UI.Done("Liên kết tài khoản Facebook thành công");
                                }, true);
                            });
                        } else if (response.code == 200) {
                            App.UI.Confirm("Đăng ký tài khoản thành công, Một mã xác nhận đã được gửi tới tài khoản của bạn", function () {
                                location.href = '/xac-nhan-tai-khoan';
                            });
                        }
                    }, true);
                }
            });
        }

        bindEvent();
        loadForm(data_user);
    });
};
