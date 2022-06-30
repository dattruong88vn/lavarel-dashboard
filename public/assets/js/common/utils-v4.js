$(document).ready(function(){

    // show live chat
    $('.item-chat').click(function(){
        $('.lz_overlay_wm_button').trigger('click');
    });

    $('#popup-login .closes').click(function(){
        $('body').removeClass('showModal');
    });

    // close popup remove overflow css
    $('.myModal .btn-close').click(function(){
        $('body').removeClass('showModal');
    })

    // subcribe email
    $('#email-subcribe').on('submit', function(e) {
        e.preventDefault();

        var emailContent = $('#email-subcribe .textinput').val();
        var formEmailElm = $('.propzy-newsletter');
        var postData = {
            email: emailContent
        };

        formEmailElm.addClass('show-text');
        formEmailElm.text('Vui lòng chờ...');

        App.Feature.Post('/api/subcribe-email-news', postData, function(response){
            
            if(response.result){
                // success
                formEmailElm.addClass('show-text');
                formEmailElm.text('Đăng ký email thành công.');
                setTimeout(function(){
                    formEmailElm.removeClass('show-text');
                    $('#email-subcribe .textinput').val('');
                }, 5000);
            } else{
                // fail
                formEmailElm.addClass('show-text');
                formEmailElm.text('Đã có lỗi xảy ra, bạn vui lòng thử lại');
                setTimeout(function(){
                    formEmailElm.removeClass('show-text');
                }, 5000);
            }
        });
    });

    // bind btn require popup login & register
    $('#btnTriggerLogin').click(function(){
        $('#btnRequireLogin').click();
        $('#popup-login').modal();
    });
    $('#btnTriggerRegister').click(function(){
        $('#btnRequireLogin').click();
        $('#popup-signup').modal();
    });

});


