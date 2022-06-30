var startApp = function(){
    $(document).ready(function () {
        $("#show-phone").text(info_active.phone);
    });
    function bindEvent() {
      $("#confirm-otp").click(function(){
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
        if(info_active.phone.length==0 || !Number(info_active.phone)){
            App.UI.Error("Thông tin số điện thoại nhận mã không đúng");
        }else {
            var default_send = {
                phone: info_active.phone,
                verifyCode: code
            };
            App.Feature.Post('/api/confirm-otp',default_send,function (response) {
                if(response.code == 200 && response.result) {
                    if(localStorage.getItem("infor_course")) {
                        /* Case register course */
                        var infor_course = JSON.parse(localStorage.getItem("infor_course"));
                        var data_course = {
                            courseId:infor_course.courseId,
                            access_token:response.data.accessToken
                        };
                        App.Feature.Post('/api/register-course',data_course,function (response) {
                            if(response.result){
                                localStorage.removeItem("infor_course");
                                App.UI.Done("Đăng ký khóa học thành công", function () {
                                    location.href='/';
                                });
                            } else {
                                App.UI.Error(response.message);
                            }
                        },true);
                    }else{
                        App.UI.Done("Xác thực thành công, Hãy đăng nhập để tiếp tục");
                        $("#modal-done").on('hidden.bs.modal',function () {
                            $("#popup-login").data('redirect',"home");
                            $("#popup-login").modal("show");
                            $("#popup-login").on('hidden.bs.modal',function () {
                                location.href="/";
                            });
                        });
                    }
                }else if(response.code==403){
                    App.UI.Error(response.message);
                }else{
                    App.UI.Error("Xác thực không thành công, Kiểm tra lại mã OTP hoặc yêu cầu mã mới");
                }
            },true);
        }
      });

      $("#resend-otp").click(function(e){
          var default_send = {
                phone:info_active.phone
          };
          App.Feature.Post('/api/resend-otp',default_send,function (response) {
              if(response.result) {
                  App.UI.Confirm("Một mã xác thực đã gửi vào cho điện thoại của bạn. Vui lòng kiểm tra và nhập mã vào mẫu",function () {
                      return false;
                  });
              }else{
                  App.UI.Error(response.message);
              }
          },true);
      });
      $(".otp-item").focus(function (e) {
          $(this).get(0).select();
      });
      $(".otp-item").bind("change paste keyup", function (e) {
            var current = $(this).val().trim();
            if(current.length==6 && Number(current)){
                for(var i = 1; i<=6; i++){
                    $("input[name='otp_"+i+"']").val(current.charAt(i-1));
                }
                $("input[name='otp_1']").focus();
            }
      });
      $(".otp-item").keyup(function (e) {
            if($(this).val().trim().length==1){
                $(this).next(".otp-item").focus();
            }
      });
    }
    bindEvent();
};
