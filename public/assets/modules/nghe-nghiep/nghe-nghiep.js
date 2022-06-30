var startApp = function(){
    $('.open-position').click(function(e){
        var url = $(this).data('url');
        var pathName = window.location.pathname;
        var link = pathName + '?vitri=' + url;
        window.history.pushState('object', document.title, link);
        //
        var pos = $(this).data('name');
        $("#popup-"+pos).modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    //
    var pos = $('#pos').val();
    if(pos !== ''){
        $('.id-'+pos).modal();
    }
    //
    $('.submit-nop').click(function(){
        var popup = $(this).data('popup');
        $("#"+popup).modal('hide');
        var title = $(this).data('title');
        var id = $(this).data('id');
        $('input[name="position"]').val(title);
        $('input[name="id"]').val(id);
        $('#popup-infos-ungtuyen').modal();
    });
    //
    var checkValidForm = function(form) {
        form.removeData('bootstrapValidator');
        form.bootstrapValidator( {
            message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
                valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
            }, 
            fields: {
                lastname: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập họ'
                        }
                    }
                },
                firstname: {
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập tên'
                        }
                    }
                },
                phone: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập số điện thoại'
                        },
                        digits: {
                            message: 'Vui lòng nhập Số điện thoại hợp lệ'
                        }
                    }
                },
                email: {
                    message: '',
                    validators: {
                        emailAddress: {
                            message: 'Vui lòng nhập địa chỉ email hợp lệ'
                        },
                        notEmpty: {
                            message: 'Vui lòng nhập email'
                        }
                    }
                },
                position: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng nhập vị trí tuyển dụng'
                        }
                    }
                },
                file: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Vui lòng đính kèm hồ sơ'
                        }
                    }
                }
            }
        });
        var bootstrapValidator = form.data('bootstrapValidator');
        bootstrapValidator.validate();
        return bootstrapValidator.isValid();
    };

    var ValidateExtension = function(fileUpload) {
        var allowedFiles = ["doc", "docx", "pdf"];
        var myarr = fileUpload.name.split(".");
        var ext = myarr[myarr.length-1];
        if (allowedFiles.indexOf(ext) <= -1) {
            App.UI.ShowFormMessage('#popup-infos-ungtuyen', "Chỉ được tải với các định dạng sau: .doc, .docx, .pdf", App.UI.notiTypeError);
            return false;
        }
        return true;
    };
    $("#select-file").click(function (e) {
       $("#file-upload").trigger('click');
    });

    $('#file-upload').on('change',function (e) {
        if($('#file-upload')[0].files[0])
            $("#file-name").html($('#file-upload')[0].files[0].name);
    });

    $('.btn-apply').click(function (e) {
        var curForm = $(this).closest(".form-apply");
        if(!checkValidForm(curForm)) {
            return false;
        }
        var lastname = $('.form-apply .form-control[name="lastname"]').val();
        var firstname = $('.form-apply .form-control[name="firstname"]').val();
        var email = $('.form-apply .form-control[name="email"]').val();
        var phone = $('.form-apply .form-control[name="phone"]').val();
        var position = $('.form-apply .form-control[name="position"]').val();
        var id = $('.form-apply .form-control[name="id"]').val();
        var file = $('#file-upload')[0].files[0];
        var formData = new FormData();
        formData.append('firstName', lastname);
        formData.append('lastName', firstname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('file', file);
        formData.append('position', position);
        formData.append('id', id);
        formData.append('fileName', file.name);
        if(file && !ValidateExtension(file)) {
            return false;
        }
        if(file && file.size > 3145728) { // 3 MB (this size is in bytes)
            App.UI.ShowFormMessage('#popup-infos-ungtuyen', "Tập tin tải lên phải nhỏ hơn 3Mb", App.UI.notiTypeError);
            return false;
        }
        $('.btn-apply').unbind("click");
        $('.btn-apply').addClass('disable');
        $.ajax({
            type: "POST",
            url: "/api/send-data-jobfair",
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                console.log(response);
                if(response.result) {
                    $('#popup-infos-ungtuyen').modal('hide');
                    alert("Bạn đã ứng tuyển thành công, Propzy sẽ liên hệ với bạn trong thời gian sớm nhất.");
                }else{
                    App.UI.ShowFormMessage('#popup-infos-ungtuyen', "Đã có lỗi xảy ra, bạn vui lòng thao tác lại", App.UI.notiTypeError);
                    $('.btn-apply').bind("click");
                    $('.btn-apply').addClass('enable');
                }
            },
            error: function () {
                App.UI.ShowFormMessage('#popup-infos-ungtuyen', "Đã có lỗi xảy ra, bạn vui lòng thao tác lại", App.UI.notiTypeError);
                $('.btn-apply').bind("click");
                $('.btn-apply').addClass('enable');
            }
        });
        return false;
    });
    
    $('.close-pos').click(function(){
        var pathName = window.location.pathname;
        window.history.pushState('object', document.title, pathName);
    });
};
