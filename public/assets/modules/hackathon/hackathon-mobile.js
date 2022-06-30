var startApp = function(){
    $('#java-developer').click(function(){
        $('#popup-java-developer').modal();
    });
    $('#android-developer').click(function(){
        $('#popup-android-developer').modal();
    });
    $('#php-developer').click(function(){
        $('#popup-php-developer').modal();
    });
    $('#java-lead').click(function(){
        $('#popup-java-lead').modal();
    });
    $('#tester').click(function(){
        $('#popup-tester').modal();
    });
    $('#ba').click(function(){
        $('#popup-ba').modal();
    });
    
    $(".form-register").bootstrapValidator( {
        message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
            phone: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                    , stringLength: {
                        message: "Vui lòng nhập Số điện thoại hợp lệ", min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: "Vui lòng nhập địa chỉ email hợp lệ"
                    },
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            },
            subject: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng chọn giá trị"
                    }
                }
            },
            other: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            },
            members: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            },
            idea: {
                validators: {
                    notEmpty: {
                        message: "Vui lòng nhập giá trị"
                    }
                }
            }
        }
    });
    //
    var checkValidForm = function(form) {
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };
    //
    
    App.UI.inputAllowNumber("#phone",false);
    App.UI.inputAllowNumber("#members",false);

    $("body").on("change", "#subject", function() {
        var value = $("#subject option:selected").val();
        if (value == "0") {
            if($("#other").hasClass("hidden"))
                $("#other").removeClass("hidden");
        } else {
            $("#other").addClass("hidden");
        }
    });

    $("body").off("click", "button.navbar-toggle").on("click", "button.navbar-toggle", function (e) {
        if($("button.navbar-toggle").parents().parents().find(".bl-header").hasClass("menu-mobile")) {
            $("button.navbar-toggle").parents().parents().find(".bl-header").removeClass("menu-mobile");
        }else {
            $("button.navbar-toggle").parents().parents().find(".bl-header").addClass("menu-mobile");
        }
    });

    $("body").off("click", ".register").on("click", ".register", function (e) {
        $("#register-modal").modal("show");
    });

    $("body").off("click", ".btn-register").on("click", ".btn-register", function(e) {
            
        var curForm = $(this).closest(".form-register");
        
        if (!checkValidForm(curForm)) {
//            $("#register-modal").modal("hide");
            App.UI.Error("Vui lòng cung cấp đầy đủ thông tin để hoàn tất đăng ký.");
            $("#name").val('');
            $("#phone").val('');
            $("#email").val('');
            $("#subject").val('');
            $("#members").val('');
            $("#list-members").val('');
            $("#idea").val('');
            $("#btnSend").removeAttr("disabled");
            curForm.data('bootstrapValidator').resetForm();
            return false;
        }

        var postData = {};
        var listMembers;

        if ($("#list-members").val().trim().includes(",")) {
            listMembers = $("#list-members").val().trim().split(",");
        }else if ($("#list-members").val().trim().includes("\n")) {
            listMembers = $("#list-members").val().trim().split("\n");
        }else {
            listMembers = $("#list-members").val().trim().split(",");
        }
        var members = $("#members").val().trim();
        if(members == ''){
            $('#members').parent().find('.help-block').removeAttr('style');
            $('#members').parent().parent().removeClass('has-success');
            $('#members').parent().parent().addClass('has-error');
            $('#members').parent().find('.form-control-feedback').removeClass('glyphicon-ok');
            $('#members').parent().find('.form-control-feedback').addClass('glyphicon-remove');
            App.UI.Error("Vui lòng cung cấp đầy đủ thông tin để hoàn tất đăng ký.");
            return false;
        }
        postData.name =  $("#name").val().trim();
        postData.phone_number = $("#phone").val().trim();
        postData.email = $("#email").val().trim();
        postData.idea_context = $("#idea").val();
        postData.topic = $("#subject").val().trim();
        postData.member_list = listMembers;
        postData.amount = $("#members").val().trim();
        postData.language = "vi";
        postData.campaign_id = 3 ;

        App.Feature.Post('/api/send-data-register-hackathon', postData, function (response) {
            if (response.code == "200") {
                $("#register-modal").modal("hide");
                App.UI.Done("Bạn đã đăng ký thành công.");
                $("#name").val('');
                $("#phone").val('');
                $("#email").val('');
                $("#subject").val('');
                $("#members").val('');
                $("#list-members").val('');
                $("#idea").val('');
                $("#btnSend").removeAttr("disabled");
                curForm.data('bootstrapValidator').resetForm();
//                setTimeout(function() {
//                    window.location.href = "/hackathon-2018";
//                }, 2000);
            } else if(response.code == "409") {
                App.UI.Done("Email đã tồn tại trong hệ thống, vui lòng nhập email khác");
                $("#btnSend").removeAttr("disabled");
            } else {
                $("#register-modal").modal("hide");
                App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
//                setTimeout(function() {
//                    window.location.href = "/hackathon-2018";
//                }, 2000);
            }
        });
    });
}