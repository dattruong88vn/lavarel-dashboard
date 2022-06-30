<div id="modalSolveCanceledTour" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formSolveCanceledTour" method="post" class="form">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
				<div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Phản hồi của KH cho từng listing</h4>
                </div>
                <div class="modal-body">				
					<div class="form-group">
						<label>Hướng giải quyết *</label>
						<textarea class="form-control" rows="3" name="solutions" id="solutions"></textarea>
						<span class="errors"></span>
					</div>
                </div>
                <div class="modal-footer">
					<button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>
		
    </div>
</div>
<script type="text/javascript">
function showModalSolveCanceledTour(){
	$("#modalSolveCanceledTour").modal();
}

//save 
$("#modalSolveCanceledTour .btnSave").on("click", function (event) {
	$("#formSolveCanceledTour").find('.errors').html('');
	event.preventDefault();
	var isValidated = true;
	var solutions = $("#solutions").val();
	
	if(solutions.trim() == ''){
		isValidated = false;
		$("#solutions").parent().find('.errors').html('Chưa nhập hướng giải quyết');
	}
	
	if(solutions.trim()!=''){
		solutions = solutions.trim();
	}else{
		solutions = null;
	}
	
	if (isValidated == false) {
		return false;
	}
	
	var postData = {
		"taskId":taskId,
		"defineId":defineId,
		"solutions":solutions,
		};
	//console.log(postData);
	
	showPropzyLoading();
	$.ajax({
        url: '/crm-dashboard/save-task-form-hash-map/'+taskId,
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
		if(response.result){
			$("#modalSolveCanceledTour").modal('hide');
			$("#solutions").val('');
			showModalCreateTasks(taskId);
		}else{
			showPropzyAlert(response.message);
		}      
    }).always(function () {
        hidePropzyLoading();
    });
	
	$("#modalCreateTask").modal('hide');
	hidePropzyLoading();
	
});
</script>