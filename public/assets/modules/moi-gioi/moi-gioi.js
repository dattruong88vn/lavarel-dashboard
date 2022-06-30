var startApp = function(){
    $('.btn-register').click(function(){
        $('#popup-signup').modal();
        $('.procedureTypeId').val('1').attr('checked','checked');
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
