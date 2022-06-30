$(document).ready(function() {
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
                            message: 'Không được trống'
                        }
                    }
                },
                firstname: {
                    validators: {
                        notEmpty: {
                            message: 'Không được trống'
                        }
                    }
                },
                phone: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Không được trống'
                        },
                        digits: {
                            message: 'Phải là số'
                        }
                    }
                },
                position: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Không được trống'
                        }
                    }
                },
                file: {
                    message: '',
                    validators: {
                        notEmpty: {
                            message: 'Không được trống'
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
            alert("Chỉ được tải với các định dạng sau: "+allowedFiles.join(', '));
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
        var file = $('#file-upload')[0].files[0];
        var formData = new FormData();
        formData.append('firstName', lastname);
        formData.append('lastName', firstname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('position', position);
        formData.append('fileName', file.name);
        if(file && !ValidateExtension(file)) {
            return false;
        }
        if(file && file.size > 3145728) { // 3 MB (this size is in bytes)
            alert("Tập tin tải lên phải nhỏ hơn 3Mb");
            return false;
        }
        $('.btn-apply').unbind("click");
        $('.btn-apply').addClass('disable');
        $.ajax({
            type: "POST",
            /*url: "http://45.117.162.46:9090/v3/api/recruitment/vi",*/
            url: "/api/send-data-jobfair",
            processData: false,
            contentType: false,
            data: formData,
            success: function (response) {
                if(response.result) {
                    alert("Bạn đã ứng tuyển thành công, Propzy sẽ liên hệ với bạn trong thời gian sớm nhất.");
                }else{
                    alert("Đã có lỗi xảy ra");
                    $('.btn-apply').bind("click");
                    $('.btn-apply').addClass('enable');
                }
            },
            error: function () {
                alert("Đã có lỗi xảy ra");
                $('.btn-apply').bind("click");
                $('.btn-apply').addClass('enable');
            }
        });
        return false;
    });
});

