<div id="modalCrmUpdateDealStatus" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCrmUpdateDealStatus" method="post" class="form-horizontal">
                <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
				<div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Cập nhật trạng thái Deal</h4>
                </div>
                <div class="modal-body">				
					<div class="form-group">
                        <label class="col-sm-4">Nhu cầu</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="requirement" id="requirement">
								<option value=""></option>
								<option value="1">Còn</option>
								<option value="0">Không</option>
							</select>
                            <span class="errors"></span>
                        </div>
                    </div>
					<div id="requirement1" class="hidden">
						<div class="form-group">
							<label class="col-sm-4">Listing giới thiệu</label>
							<div class="col-sm-8">
								<input id="suggestListing" name="suggestListing" class="form-control" value="" />
								<span class="errors"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4">Book tour</label>
							<div class="col-sm-8">
								<select class="form-control" name="bookTour" id="bookTour">
									<option value=""></option>
									<option value="1">Có</option>
									<option value="0">Không</option>
								</select>
							</div>
						</div>
						<div class="form-group hidden" id="suggestListings">
							<label class="col-sm-4">ListingIds</label>
							<div class="col-sm-8">
								<input id="suggestListingIds" name="suggestListingIds" class="form-control" value="" />
								<span class="errors"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4">Lưu ý</label>
							<div class="col-sm-8">
								<textarea class="form-control" rows="3" name="note" id="note"></textarea>
							</div>
						</div>
					</div>
					<div id="requirement0" class="hidden">
						<div class="form-group">
							<label class="col-sm-4">Lý do</label>
							<div class="col-sm-8">
								<textarea class="form-control" rows="3" name="reason" id="reason"></textarea>
								<span class="errors"></span>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4">Mua ở đâu</label>
							<div class="col-sm-8">
								<input id="whereBuy" name="whereBuy" class="form-control" value="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4">Mua bao nhiêu</label>
							<div class="col-sm-8">
								<input id="priceBuy" name="priceBuy" class="form-control" value="" />
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-4">Nguồn mua</label>
							<div class="col-sm-8">
								<select class="form-control" name="referSource" id="referSource">
									<option value=""></option>
									<option value="1">Tự tìm</option>
									<option value="2">Người quen giới thiệu</option>
									<option value="3">Môi giới ngoài</option>
								</select>
							</div>
						</div>
					</div>
					
					<div class="form-group">
                        <label class="col-sm-4">Sử dụng dịch vụ chốt DEAL của Propzy</label>
                        <div class="col-sm-8">
                            <select class="form-control" name="propzyService" id="propzyService">
								<option value=""></option>
								<option value="1">Có</option>
								<option value="0">Không</option>
							</select>
                            <span class="errors"></span>
                        </div>
                    </div>
					
					<div class="form-group">
                        <label class="col-sm-4">Tại sao</label>
                        <div class="col-sm-8">
							<input id="whyPropzy" name="whyPropzy" class="form-control" value="" />
                            <span class="errors"></span>
                        </div>
                    </div>

					<div class="form-group">
                        <label class="col-sm-4">Ghi chú chung</label>
                        <div class="col-sm-8">
                            <textarea class="form-control" rows="3" name="commonNote" id="commonNote"></textarea>
                            <span class="errors"></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
					<button class="btn btn-success btnSave">Save</button>
                </div>
            </form>
        </div>

    </div>
</div>

<script>
$( "#requirement" ).change(function() {
	var requirement = $("#requirement option:selected").val();
	if(requirement==1){
		$("#requirement1").removeClass('hidden');
		$("#requirement0").addClass('hidden');
			
		$("#bookTour").change(function() {
			var bookTour = $("#bookTour option:selected").val();
			if(bookTour==1){
				$("#suggestListings").removeClass('hidden');	
			}else{
				$("#suggestListings").addClass('hidden');	
			}
		});
		
	}else if(requirement==0){
		$("#requirement0").removeClass('hidden');
		$("#requirement1").addClass('hidden');	
	}
});



//save 
$(".btnSave").on("click", function (event) {
    $("#formCrmUpdateDealStatus").find('.errors').html('');
    event.preventDefault();
    var isValidated = true;
	
	var requirement = $("#requirement option:selected").val();
	
	if(requirement==1){
		if($("#suggestListing").val().trim()==''){
			isValidated = false;
			$("#suggestListing").parent().find(".errors").html("Chưa chọn");
		}
		
		var bookTour = $("#bookTour option:selected").val();
		if(bookTour==1){
			if($("#suggestListingIds").val().trim()==''){
				isValidated = false;
				$("#suggestListingIds").parent().find(".errors").html("Chưa chọn");
			}
		}
		
	}else if(requirement==0){
		if($("#reason").val().trim()==''){
			isValidated = false;
			$("#reason").parent().find(".errors").html("Chưa chọn");
		}
	}
	
		
	if(requirement==''){
		isValidated = false;
		$("#requirement").parent().find(".errors").html("Chưa chọn");
	}
	
	
	var propzyService = $("#propzyService option:selected").val();
	if(propzyService==''){
		isValidated = false;
		$("#propzyService").parent().find(".errors").html("Chưa chọn");
	}
	if(propzyService==0){
		if($("#whyPropzy").val().trim()==''){
			isValidated = false;
			$("#whyPropzy").parent().find(".errors").html("Chưa có lý do");
		}
	}
	
	if (!isValidated) {
		return false;
	}
	
	//...
});	
</script>