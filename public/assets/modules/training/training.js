var dataCourse = {};
var startApp = function () {
    var register = null;
    function registerCourse (dataSend){
        App.Feature.Post('/api/register-course',dataSend,function (response) {
            console.log(response.result);
            if(response.result){
                App.UI.Done("Đăng ký khóa học thành công", function () {
                    location.href='/';
                });
            }else{
                App.UI.Error("Đã có lỗi xảy ra");
            }
        },true);
    };
    function verifyPhone(data) {
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
                    if(response.code == 200 && response.result) {
                        /* set token to register course */
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
    $(document).ready(function () {
        $('#benefit-agent').click(function(){
            $('#popup-benefit-agent').modal();
        });
        $("select[name='district_id']").change(function (e) {
            var data = {
                "districtIds": $(this).val()!=-1 ? [parseInt($(this).val())]:null
            };
            $("select[name='tc']").html("<option value=\"-1\">Chọn trung tâm</option>");
            if(data.districtIds) {
                App.Feature.Post('/api/get-tc', data, function (response) {
                    if (response.result) {
                        if (response.data.totalItems != 0) {
                            $.each(response.data.list, function (key, item) {
                                $("select[name='tc']").append("<option value='" + item.tcId + "'>" + item.address + "</option>");
                            });
                        }
                    }
                }, true);
            }
            $('.group-select .form-control').select2({});
        });
        $('.nav-tabs a').click(function(){
            if($(this).attr('href')!="#step-1"){
                console.log($(this).attr('href'));
                $(this).tab('show');
            }else{
                $(this).css({"pointerEvents": "none"});
            }
        });
        $('#next-3').click(function(){
            $('.nav-tabs a[href="#step-3"]').tab('show');
            $(document).scrollTop(0);
        });
        $('.back-2').click(function(){
            $('.nav-tabs a[href="#step-2"]').tab('show');
        });
        $('.btn-register').click(function(){
            $('.btn-register').removeClass('btn-registered').addClass("btn-register").text("Ghi danh");
            $(this).addClass("btn-registered").text("Đã ghi danh");
            register = $(this).parents("tr").first().data('item');
        });
        $('.nav-tabs a').on('shown.bs.tab', function(event){
            var active = $(event.target);
            if(active.attr("href")=="#step-3"){
                console.log(register);
                if(register){
                    $(".time-register-course").text(moment(register.startedDate).format("DD-MM-YYYY HH:mm:ss"));
                    $(".name-register-course").text(register.courseName);
                    $(".address-register-course").text(register.address);
                }else{
                    App.UI.Error("Bạn phải chọn khóa huấn luyện trước khi chuyển qua bước tiếp theo");
                    $('.nav-tabs a[href="#step-2"]').tab('show');
                }
            }
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
            if($(this).val().trim().length>=1){
                $(this).next(".otp-item").focus();
            }
        });
        
        $('.btn-finish').click(function(){
            var dataSend = {
                'courseId':register.courseId
            };
            if(userInfo == null){
                // Is not login
                // Show poup
                // Send phone to verify
                $("#check-phone").modal('show');
                $("#check-phone .send-check-phone").unbind("click").click(function () {
                    var checkResult = App.UI.checkValidRules($("#form-check-phone"), {
                        name: {
                            validators: {
                                notEmpty: {
                                    message: messages.dangky_name_empty
                                }
                            }
                        },
                        phone: {
                            validators: {
                                notEmpty: {
                                    message: messages.dangky_phone_empty
                                },
                                stringLength: {
                                    message: messages.dangky_phone_wrongformat, min: 10, max: 10
                                }
                            }
                        }
                    });
                    if(checkResult){
                        var dataCheckPhone = {
                            phone:checkResult.phone
                        };
                        App.Feature.Post('/api/check-phone',dataCheckPhone,function (response) {
                            if(response.code==200 &&  response.result) {
                                // Send otp code to create acount
                                verifyPhone({
                                    phone:checkResult.phone,
                                    name:checkResult.name
                                });
                            } else if(response.code==409) {
                                $('#check-phone').modal('hide');
                                App.UI.Confirm("Tài khoản đã tồn tại, Vui lòng đăng nhập để tiếp tục",function () {
                                    dataCourse = {
                                        phone:checkResult.phone,
                                        name:checkResult.name,
                                        courseId:register.courseId
                                    };
                                    $("#check-phone").modal('hide');
                                    $("#popup-login").modal("show").find("#form-login").data("redirect","callBack").data("callBack",function () {
                                        if(this.code==200){
                                            $("#popup-login").modal("hide");
                                            registerCourse({courseId:dataCourse.courseId});
                                        }
                                        if(this.code==402){
                                            /* Save course id */
                                            localStorage.setItem("infor_course",JSON.stringify(dataCourse));
                                        }
                                    });
                                });
                            } else{
                                App.UI.Error(response.messages);
                            }
                        },true);
                    }
                });

            }else{
                /* is login */
                registerCourse(dataSend);
            }
        });
    });
};