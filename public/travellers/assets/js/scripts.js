
jQuery(document).ready(function() {
    $('.formatPrice').mask("#,##0", {reverse: true});
    $('.directions_option').hide();
    $('.incense').change(function(){
        if( $(this).val() == 0){
            $('.directions_option').show();
        }else{
            $('.directions_option').hide();
        }
    })
	
    /*
        Fullscreen background
    */
    $.backstretch("travellers/assets/img/light-blue-background-2.jpg");
    
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');
    
    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('#question_step_3 input[type="radio"]').on('click',function(){
        if ( $(this).val() == 0){
            $(this).siblings('input[type="text"]').attr({'require':''})
        }else{
            $(this).parent().siblings().children('input[type="text"]').attr({'require':'no'})
        }
    });

    // next step
    $('.registration-form .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
        // valid form step 2
        if ( $('.type-of-real-estate').is(":visible") ){
            if( $('.type-of-real-estate:checked').val() === undefined ){
                $('.type-of-real-estate').addClass('radio-err');
                next_step = false
            }else{
                $('.type-of-real-estate').removeClass('radio-err');
                next_step =true
            }

            console.log($('#select_location').val().length);
            // valid khu vực
            if($('#select_location').val().length == 0){
                $('#select_location').siblings('button').addClass('input-error');
            }else{
                $('#select_location').siblings('button').removeClass('input-error')
            }
        }
         // valid form step 3
         if ( $('#title_step_3').is(":visible") ){
            if($('.budget_status:checked').val() === undefined || $('.reason_new_house:checked').val() === undefined || $('.reason_buy_house:checked').val() === undefined ){
                if( $('.reason_new_house:checked').val() === undefined ){ $('.reason_new_house').addClass('radio-err'); }
                if( $('.reason_buy_house:checked').val() === undefined ){ $('.reason_buy_house').addClass('radio-err'); }
                if( $('.budget_status:checked').val() === undefined ){ $('.budget_status').addClass('radio-err'); }                
                next_step = false;
            }else{
                $('.reason_buy_house').removeClass('radio-err');
                $('.reason_new_house').removeClass('radio-err');
                $('.budget_status').removeClass('radio-err');
                next_step = true;
            }
         }

    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
            if( $( this ).attr('require') != "no"){
                if( $(this).val() == "") {
                    $(this).addClass('input-error');
                    next_step = false;
                }
                else {
                    $(this).removeClass('input-error');
                    next_step = true;
                }
            }
    	});
    	
        if($(this).hasClass('submit_form')){
            console.log(next_step)
            if(next_step){
                $('#myModal').modal('show');
                // submit();
            }
        }else if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                $(this).next().fadeIn();
            });
        }

    });
    
    // previous step
    $('.registration-form .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });
    
    // submit
    // $('.registration-form').on('submit', function(e) {
    	
    // 	$(this).find('input[type="text"], input[type="password"], textarea').each(function() {
    // 		if( $(this).val() == "" ) {
    // 			e.preventDefault();
    // 			$(this).addClass('input-error');
    // 		}
    // 		else {
    // 			$(this).removeClass('input-error');
    // 		}
    // 	});
    // });  
});


// SUBMIT CUSTOM
function submit(){
    var data = {};
    $('.registration-form').find('input[type="text"], input[type="radio"]:checked , select, textarea').each(function(){
        var key = $(this).attr('name');
        
        var value = $(this).val();
        if(value != "" && key != ""){
            if(value == 0){
                value = $(this).siblings('input:text').val()
            }
            data[key] = value;
        }
    })
    console.log(JSON.stringify(data));
}