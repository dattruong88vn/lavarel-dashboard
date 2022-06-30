<div id="cancel-listing-modal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Ngưng tin đăng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
					<div class="form-group">
						<div class="col-md-12">
							<label for="" class="control-label">Lý do hủy</label>
							<select id="cancel-channel-status" class="form-control"></select>
						</div>
					</div>
					<div class="form-group cancel-channel-status-child-wrapper">
						<div class="col-md-12">
							<label for="" class="control-label"></label>
							<select id="cancel-channel-status-child" class="form-control"></select>
						</div>
					</div>
					<div class="row sold-group">
						<div class="col-md-12">
							<div class="form-group price-wrapper">
								<div class="col-md-12">
									<label for="" class="control-label">Giá bán</label>
									<input id="soldPrice" type="text" class="form-control auto-format-price">
								</div>
							</div>
							<div class="form-group soldDate-wrapper">
								<div class="col-md-12">
									<label for="" class="control-label">Ngày bán</label>
									<input id="soldDate" type="text" class="form-control date-picker">
								</div>
							</div>
						</div>
					</div>
					<div class="row contract-group">
						<div class="col-md-12">
							<div class="form-group price-wrapper">
								<div class="col-md-12">
									<label for="" class="control-label">Giá cho thuê</label>
									<input id="rentPrice" type="text" class="form-control auto-format-price">
								</div>
							</div>
							<div class="form-group contractFrom-wrapper">
								<div class="col-md-12">
									<label for="" class="control-label required">Ngày bắt đầu cho thuê</label>
									<input id="contractFrom" class="form-control date-picker">
								</div>
							</div>
							<div class="form-group contractTo-wrapper">
								<div class="col-md-12">
									<label for="" class="control-label required">Ngày kết thúc cho thuê</label>
									<input id="contractTo" class="form-control date-picker">
								</div>
							</div>
                            <div class="form-group defaultContractTo-wrapper">
								<div class="col-md-12">
                                    <input type="checkbox" id="defaultContractTo" name="defaultContractTo">
                                    <label for="defaultContractTo" class="control-label">Mặc định</label>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group reasonContent-wrapper">
						<div class="col-md-12">
							<label for="" class="control-label">Nhập lý do khác</label>
							<textarea id="reasonContent" type="text" class="form-control"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="cancel-listing" type="button" class="btn btn-success">Ngưng đăng tin</button>
			</div>
		</div>

	</div>
</div>