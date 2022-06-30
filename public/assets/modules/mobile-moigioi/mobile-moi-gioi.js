var startApp = function(){
    $('.btn-register').click(function(){
        $('#popup-signup').modal();
        $('.procedureTypeId').val('1').attr('checked','checked');
    });
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
    //
    $('#register-contact-now').click(function(){
        // Is not login
        $('#popup-signup').modal('show');
        $('#popup-signup .procedureTypeId[value="1"]').trigger('click');
    });
    //
    $('#register-contact-owner').click(function(){
        $('#modal-confirm-request-contact').modal();
    });
};

function verifyPhone(data) {
    $('#check-phone').modal('hide');
    $("#modal-send-otp").modal("show");
    $("#confirm-otp").unbind("click").click(function(){
        var code = [];
        code.push($("input[name='otp_1']").val().trim());
        code.push($("input[name='otp_2']").val().trim());
        code.push($("input[name='otp_3']").val().trim());
        code.push($("input[name='otp_4']").val().trim());
        code.push($("input[name='otp_5']").val().trim());
        code.push($("input[name='otp_6']").val().trim());
        code = code.join('');
        if(code.length!=6){
            App.UI.Error("Mã không đúng");
            return false;
        }
        if(data.phone.length==0 || !Number(data.phone)){
            App.UI.Error("Thông tin số điện thoại nhận mã không đúng");
        }else {
            var data_otp_send = {
                phone: data.phone,
                verifyCode: code,
                name: data.name
            };
            App.Feature.Post('/api/confirm-otp',data_otp_send,function (response) {
                $("#modal-send-otp").modal("hide");
                if(response.code == 200 && response.result) {
                    App.UI.Done("Xác thực thành công. Thông BĐS nhập đã gửi tới số điện thoại đăng ký. Vui lòng kiểm tra và đăng nhập để tiếp tục");
                    $("#modal-done").on('hidden.bs.modal',function () {
                        $("#popup-login").data('redirect',"home");
                        $("#popup-login").modal("show");
                        $("#popup-login").on('hidden.bs.modal',function () {
                            location.href="/";
                        });
                    });
                } else if(response.code==403) {
                    App.UI.Error(response.message);
                } else {
                    App.UI.Error("Xác thực không thành công, Kiểm tra lại mã OTP hoặc yêu cầu mã mới");
                }
            },true);
        }
    });
    $("#resend-otp").unbind("click").click(function(e){
        App.Feature.Post('/api/resend-otp',{phone: data.phone},function (response) {
            if(response.result) {
                App.UI.Confirm("Một mã xác thực đã gửi tới số điện thoại đăng ký. Vui lòng kiểm tra và nhập mã để xác nhận",function () {
                    return false;
                });
            }else{
                App.UI.Error(response.message);
            }
        },true);
    });
}