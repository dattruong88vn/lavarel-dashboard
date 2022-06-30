var object = {
  "bfId":null,
  "name": null,
  "nameEn": null,
  "logo":null,
  "description":null,
  "descriptionEn":null
}

function prepareObject(){

	bfId = parseInt($('#bfId').val()) || null
	object.bfId = bfId;

	name = $('#name').val() || null
	object.name = name;

	nameEn = $('#name-en').val() || null
	object.nameEn = nameEn;

	var logo = $('.imageBrokerageFirm .file-preview-frame img');
	if(logo.length >= 1 ){
		logo = logo[0].getAttribute('src');
	}else{
		logo = null;
	}
	object.logo = logo;

	description = CKEDITOR.instances["description"].getData() || null
	object.description = description;

	descriptionEn = CKEDITOR.instances["description-en"].getData() || null
	object.descriptionEn = descriptionEn;
}

$('#post-brokerage-firm').click(function(){
	$('#create-form').submit();
});

$('#create-form').bootstrapValidator({
        	message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            }
        }).on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            // var $form = $(e.target);

            // // Get the BootstrapValidator instance
            // var bv = $form.data('bootstrapValidator');

            // // Use Ajax to submit form data
            // $.post($form.attr('action'), $form.serialize(), function(result) {
            //     console.log(result);
            // }, 'json');
        	prepareObject();
        	console.log(object);
        	if(object.bfId == null){
        		waitingDialog.show('Creating...');
        	}else{
        		waitingDialog.show('Updating...');
        	}
        	post_sync("/brokerage-firm-manager/post-brokerage-firm", object, true, function(data){
        		waitingDialog.hide();
		          if(data.result){
		          	if(object.bfId == null){
		             	alert("Thêm thành công bfId:"+data.data.bfId);
		            }else{
		            	alert("Sửa thành công bfId:"+data.data.bfId);
		            }
		            location.reload();
		          }
		          console.log(data);
	        });
        });