<div id="create-reminder-modal" class="modal fade" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">Tạo Lịch Nhắc Nhở:</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<label for="" class="control-label">Loại công việc</label>
						<select id="reminder-reason" class="form-control"></select>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<label for="" class="control-label">Lý do tạo tin nhắc nhở</label>
						<select id="reminder-channel-status" class="form-control"></select>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<label for="" class="control-label">Chọn ngày</label>
						<div class="input-group date" data-provide="datepicker" id="reminder-date">
							<input type="text" class="form-control">
							<div class="input-group-addon">
								<span class="glyphicon glyphicon-th"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<label for="" class="control-label">Chọn giờ</label>
						<div class="input-group bootstrap-timepicker timepicker">
							<input id="reminder-time" type="text" class="form-control input-small">
							<span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-sm-12">
						<label for="" class="control-label">Ghi chú</label>
						<textarea name="" id="reminder-note" cols="30" rows="10" class="form-control"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button id="create-reminder" type="button" class="btn btn-success">Lưu</button>
			</div>
		</div>

	</div>
</div>