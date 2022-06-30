var startApp = function(){
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    var container = $(".owl-carousel.owl-theme");
    
    container.owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3000,
        
        responsive: {
            0: {
                items: 1
            }
        }
    });
    
    $(".col-textbox").bootstrapValidator({
        message: "Giá trị chưa đúng",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        }
    });
    
    var checkValidForm = function (form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    
    $(".btn-request").click(function () {
        var postData = {};
        postData.data = {};
        var curForm = $(this).closest(".col-textbox");
        if (!checkValidForm(curForm)) {
            App.UI.Error("Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        $(".btextbox").find("input, textarea").each(function (idx, element) {
            postData.data[$(element).attr("name")] = $(element).val().trim();
        });
        postData.typeId = parseInt(postData.data.type_id);
        delete postData.data.type_id;
        App.Feature.Post('/api/landing-mkt', postData, function (data) {
            if (data.result) {
                $("#modal-email-campaign-uudai").modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $(".btextbox input[type=text]").val('');
                $(".btextbox .textarea-contact").val('');
                curForm.data('bootstrapValidator').resetForm();
                $(".form-control-feedback").removeClass('glyphicon glyphicon-ok');
            } else {
                App.UI.Error("Đã có lỗi xảy ra, bạn vui lòng thử lại");
            }
        });
    });
    //
    $('.nav-tabs').find('li:first').addClass('active');
    $('.tab-content').find('div:first').addClass('active');
};