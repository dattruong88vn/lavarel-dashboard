<div id="modalSolveLateTour" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formSolveLateTour" method="post" class="form">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
				<div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Phản hồi của KH cho từng listing</h4>
                </div>
                <div class="modal-body">				
					<div class="form-group">
						<label>Lý do *</label>
						<textarea class="form-control" rows="3" name="reason" id="reason"></textarea>
						<span class="errors"></span>
					</div>
					<div class="form-group">
						<label>Hướng giải quyết *</label>
						<textarea class="form-control" rows="3" name="solutions" id="solutions"></textarea>
						<span class="errors"></span>
					</div>
					<div class="form-group">
						<label>Kết quả</label>
						<textarea class="form-control" rows="3" name="result" id="result"></textarea>
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
function showModalSolveLateTour(){
	$("#modalSolveLateTour").modal();
}

//save 
$("#modalSolveLateTour .btnSave").on("click", function (event) {
	$("#formSolveLateTour").find('.errors').html('');
	event.preventDefault();
	var isValidated = true;
	
	var reason = $("#reason").val();
	if(reason.trim() == ''){
		isValidated = false;
		$("#reason").parent().find('.errors').html('Chưa nhập lý do');
	}
		
	if(reason.trim()!=''){
		reason = reason.trim();
	}else{
		reason = null;
	}
	
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
	
	var result = $("#result").val();
	if(result.trim()!=''){
		result = result.trim();
	}else{
		result = null;
	}
	
	if (isValidated == false) {
		return false;
	}
	
	var postData = {
		"taskId":taskId,
		"defineId":defineId,
		"reason":reason,
		"solutions":solutions,
		"result":result
		};
	console.log(postData);
	
	showPropzyLoading();
	$.ajax({
        url: '/crm-dashboard/save-task-form-hash-map/'+taskId,
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
		if(response.result){
			$("#modalSolveLateTour").modal('hide');
			$("#reason").val('');
			$("#solutions").val('');
			$("#result").val('');
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