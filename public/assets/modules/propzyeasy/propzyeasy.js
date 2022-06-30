var startApp = function () {
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    $(".form-request").bootstrapValidator({
        message: "Giá trị chưa đúng",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            name: {validators: {notEmpty: {message: "Vui lòng nhập giá trị"}}},
            email: {
                validators:{
                    emailAddress: {message: "Vui lòng nhập địa chỉ email hợp lệ"}
                }
            },
            phone: {
                validators: {
                    stringLength: {message: "Vui lòng nhập số điện thoại hợp lệ", min: 10, max: 10},
                    notEmpty: {message: "Vui lòng nhập giá trị"}
                }
            }
        }
    });
    App.UI.inputAllowNumber(["#phone"],false);
    App.UI.removeCheckSuccess(".form-request",['email']);
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    $(".btn-request").click(function () {
        var postData = {};
        var curForm = $(this).closest(".form-request");
        if (!checkValidForm(curForm)) {
            App.UI.Error("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        $(".form-request").find("input, textarea").each(function (idx, element) {
            postData[$(element).attr("name")] = $(element).val().trim();
        });
        postData.type = 1;
        App.Feature.Post('/api/email-campaign', postData, function (data) {
            if (data.result) {
                $("#modal-email-campaign").modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $(".form-request input[type=text]").val('');
                $(".form-request input[type=email]").val('');
                $(".form-request .demand").val('');
                curForm.data('bootstrapValidator').resetForm();
                $(".form-control-feedback").removeClass('glyphicon glyphicon-ok');
            } else {
                App.UI.Error("Đã có lỗi xảy ra, bạn vui lòng thử lại");
            }
        });
        
    });
};