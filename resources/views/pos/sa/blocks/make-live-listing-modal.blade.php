<div id="make-live-listing-modal" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content" style="width: 600px">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Chọn loại tin đăng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
					<div class="form-group">
						<div class="col-md-12">
							<label for="live-listing-type" class="control-label">Loại tin đăng</label>
						</div>
						<div class="col-md-12">
							<select id="live-listing-type" class="form-control"></select>
						</div>
					</div>
					<div id="guaranteedExpiredDate-group" class="form-group" style="display:none">
						<div class="col-md-12">
							<label for="guaranteedExpiredDate" class="control-label required">Ngày hết hạn độc quyền</label>
						</div>
						<div class="col-md-12">
							<div class="row">
								<div class="col-md-6">
									<input id="guaranteedExpiredDate" type="text" class="form-control" value="">
								</div>
								<div class="col-md-6">
									<select id="guaranteedExpiredDateTo" class="form-control">
										<option value="0">--Số tháng hết hạn--</option>
										<option value="3">3 tháng</option>
										<option value="6">6 tháng</option>
										<option value="12">12 tháng</option>
									</select>
								</div>
							</div>
							<span id="guaranteedExpiredDate-error" class="help-block sa-error" style="display:none">Vui lòng nhập giá trị</span>
						</div>
					</div>
					<div id="guaranteedSignedDate-group" class="form-group" style="display:none">
						<div class="col-md-12">
							<label for="guaranteedSignedDate" class="control-label required">Ngày ký độc quyền</label>
						</div>
						<div class="col-md-6">
							<input id="guaranteedSignedDate" type="text" class="form-control" value="">
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="make-live-listing-btn" type="button" class="btn btn-success">Đăng tin</button>
			</div>
		</div>

	</div>
</div>