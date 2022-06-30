let PROPZY_JSON = {
    existingUserName: () => {
        var dataPost = {};
        dataPost.userName = $('#username').val();
        dataPost.checkUser = true;
        dataPost.activationKey = $('#activationKey').val();
        $.ajax({
            url: "/user/do-create-password",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            $('#existingUserName').val('1');
            if (parseInt(response.code, 10) != 405) {
                $('#existingUserName').val('0');
            }
        });
    }
}
$(document).ready(function () {
    jQuery.validator.addMethod("noSpaceAsEmpty", function (value, element) {
        return value.trim() != "" && value != "";
    }, jQuery.validator.messages.noSpaceAsEmpty);
    jQuery.validator.addMethod("existing", function (value, element) {
        return value === "0";
    }, jQuery.validator.messages.existing);
    $('#username').blur(function () {
        PROPZY_JSON.existingUserName();
    });
    var validateOptions = {
        ignore: null,
        rules: {
            "fullname": {required: true, noSpaceAsEmpty: true},
            "username": {required: true, noSpaceAsEmpty: true},
            "password": {required: true},
            "confirm_password": {equalTo: "#password"},
            "activationKey": {required: true},
            "existingUserName": {existing: true}
        },
        messages: {
            "fullname": {required: 'Vui lòng nhập Họ tên', noSpaceAsEmpty: 'Vui lòng nhập Họ tên'},
            "username": {required: 'Vui lòng nhập Tên đăng nhập', noSpaceAsEmpty: 'Vui lòng nhập Tên đăng nhập'},
            "password": {required: 'Vui lòng nhập Mật khẩu'},
            "confirm_password": {equalTo: 'Xác nhận mật khẩu không trùng khớp'},
            "activationKey": {required: "Mã kích hoạt của bạn bị lỗi, vui lòng kiểm tra lại email của bạn"},
            "existingUserName": {existing: "Tên đăng nhập đã tồn tại"}
        }
    };

    var validateCreatePassword = $("#form-create-password").validate(validateOptions);


    var inputAllowNumberChar = function (input, allowSeparator) {
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        $(input).on('input', function () {
            var text = $(this).val().match(/[a-zA-Z0-9]/g);
            if (allowSeparator)
                var text = $(this).val().match(/[a-zA-Z0-9\.]/g);
            text = !!text ? text.join("") : "";
            $(this).val(text);
        });
    };

    inputAllowNumberChar("#username", false);

    $('#create-password').on('click', function (event) {
        event.preventDefault();
        if (!validateCreatePassword.form()) {
            return false;
        }

        var isValidated = true;
        var form = $('#form-create-password');
        form.find('.errors').html('');

        var name = $('#name').val();
        var username = $('#username').val();

        var password = $('#password').val();
        var partern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_])[a-zA-Z0-9!@#$%^&*()_]{8,20}$/;
        if (password.match(partern) == null) {
            $("#password").parent().find('.errors').html('Mật khẩu bao gồm 8-20 ký tự, ít nhất 1 chữ thường, 1 chữ hoa, 1 số, và 1 ký tự đặc biệt, không dấu và không khoảng trắng');
            isValidated = false;
        }

        var activationKey = $('#activationKey').val();

        var dataPost = {};
        dataPost.name = name;
        dataPost.userName = username;
        dataPost.activationKey = activationKey;
        dataPost.email = $('#email').val();
        dataPost.password = password;

        if (false === isValidated) {
            return false;
        }

        $.ajax({
            url: "/user/do-create-password",
            data: JSON.stringify(dataPost),
            type: "post"
        }).done(function (response) {
            if (response.result) {
                alert(response.message);
                window.location = "/login";
            } else if (parseInt(response.code, 10) === 409) {

            } else {
                alert(response.message);
            }
        });

    });



});