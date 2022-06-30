var startApp = function(){
    $('.close-app-diy').click(function (){
        $('#app-diy').hide();
        $('#bl-header-mobile').removeClass('bl-header');
        $('#bl-header-mobile').addClass('bl-header-remove');
    });
//    $('.select-search').select2({
//        placeholder: 'Gõ câu hỏi để tìm kiếm',
//        allowClear: true,
//        minimumResultsForSearch: Infinity
//    });

    //
    $(".form-contact").bootstrapValidator( {
        message:"Giá trị chưa đúng", excluded:[":hidden"], feedbackIcons: {
            valid: "glyphicon glyphicon-ok", invalid: "glyphicon glyphicon-remove", validating: "glyphicon glyphicon-refresh"
        }
        , fields: {
            phone: {
                validators: {
                    notEmpty: {
                        message: messages.lienhe_phone_empty
                    }
                    , stringLength: {
                        message: messages.lienhe_phone_wrongformat, min: 10, max: 10
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: messages.lienhe_email_wrongformat
                    },
                    notEmpty: {
                        message: messages.lienhe_email_empty
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: messages.lienhe_name_empty
                    }
                }
            },
            subject: {
                validators: {
                    notEmpty: {
                        message: messages.lienhe_title_empty
                    }
                }
            },
            comment: {
                validators: {
                    notEmpty: {
                        message: messages.lienhe_cauhoiykien_empty
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
    
    $("#btnSend").click(function() {
        var curForm = $(this).closest(".form-contact");
        if(!checkValidForm(curForm)) {
            App.UI.Error(messages.lienhe_thatbai_thieuthongtin);
            $("#btnSend").removeAttr("disabled");
            return false;
        }
        var postData = {};
        postData.name = $("#name").val().trim();
        postData.phone = $("#phone").val().trim();
        postData.email = $("#email").val().trim();
        postData.title = $("#subject").val().trim();
        postData.message = $("#comment").val().trim();

        App.Feature.Post('/api/lien-he', postData, function (response) {
            if (response.result) {
                App.UI.Done(messages.lienhe_thanhcong);
                $("#name").val('');
                $("#phone").val('');
                $("#email").val('');
                $("#subject").val('');
                $("#comment").val('');
                $("#btnSend").removeAttr("disabled");
                curForm.data('bootstrapValidator').resetForm();
            }
            else {
                App.UI.Error("Có lỗi xảy ra trong quá trình ghi nhận. Bạn vui lòng liên hệ với chúng tôi để được tư vấn thêm");
            }
        });
        
    });
};

jQuery.fn.getSelectionStart = function () {
    if (this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
            pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if (typeof (input.selectionStart) != "undefined")
        pos = input.selectionStart;

    return pos;
}

$("#name").keypress(function(e){
    var arr = [ "!" , "`" , "@" , "#" , "$" , "%" , "^" , "&" , "*" , "(" , ")" , "+" , "=" , "-" , "[" , "]" , "'" , ";" , "," , "." , "/" , "{" , "}" , "|" , ":" , "<" , ">" , "?" , "~" , "_" 
  ];
  var co = true;
  
    jQuery.each( arr, function( i, val ) {
        if(String.fromCharCode(event.keyCode) == val || event.keyCode == 92 || event.keyCode == 34 || event.keyCode >= 48 && event.keyCode <= 57 && $("#name").getSelectionStart() == 0){
            co = false;
    }
});
  
  return co;
})

//$("#name").keydown(function(e){
//    if((e.keyCode==8||e.keyCode==46)&& $("#name").getSelectionStart() == 0){
//  	return false;
//  }
//  return true;
//})