<div id="show-note-reminder-modal" class="modal fade" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Ghi Chú Reminder</h4>
			</div>
			<div class="modal-body">
				<input type="hidden" name="lsoid" id="remider-model-input-lsoid">
				<input type="hidden" name="id" id="remider-model-input-id">
				<div class="row">
					<div class="form-group">
					    <label class="col-md-4">Tên chủ nhà :</label>
					    <div id="remider-model-ownerId" class="col-md-8"></div>
					</div>
				</div>
				<div class="row">
					<div class="form-group">
						<label class="col-md-4">Listing Id :</label>
						<div id="remider-model-lsoId" class="col-md-8"></div>
					</div>
				</div>
				<div class="row">
					<div class="form-group">
						<label class="col-md-4">Thời gian :</label>
						<div id="remider-model-time" class="col-md-8"></div>
					</div>
				</div>
				<div class="row">
					<div class="form-group">
						<label class="col-md-4">Loại công việc :</label>
						<div id="remider-model-workType" class="col-md-8"></div>
					</div>
				</div>
				<div class="row">
					<div class="form-group">
						<label class="col-md-12">Ghi chú :</label>
						<div class="col-md-12">
							<div class="highlight">
								<div id='remider-model-note'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="remider-model-redirect" type="button" class="btn btn-success">Chuyển</button>
			</div>
		</div>

	</div>
</div>