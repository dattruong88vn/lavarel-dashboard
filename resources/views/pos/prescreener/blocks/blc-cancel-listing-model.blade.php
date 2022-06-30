<div id="cancel-listing-modal" class="modal fade" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Hủy tin đăng</h4>
			</div>
			<div class="modal-body message">
				<div class="row form-group">
					<div class="col-sm-12">
						<label for="" class="control-label">Lý do hủy</label>
						<select id="cancel-channel-status" class="form-control"></select>
					</div>
				</div>
				<div class="row display-cancel-uncooperative form-group">
					<div class="col-sm-12">
						<label for="" class="control-label">Lý do không hợp tác</label>
						<select id="cancel-channel-status-uncooperative" class="form-control"></select>
					</div>
				</div>
				<div class="row display-cancel-note form-group">
					<div class="col-sm-12">
						<label for="" class="control-label">Ghi Chú</label>
						<textarea id="cancel-channel-note" class="form-control"></textarea>
					</div>
				</div>
                <div class="row contract-group">
                    <div class="form-group contractFrom-wrapper">
                        <div class="col-md-12">
                            <label for="contractFrom" class="control-label">Ngày bắt đầu cho thuê</label>
                            <input id="contractFrom" class="form-control date-picker">
                        </div>
                    </div>
                    <div class="form-group contractTo-wrapper">
                        <div class="col-md-12">
                            <label for="contractTo" class="control-label">Ngày hết hạn hợp đồng</label>
                            <input id="contractTo" class="form-control date-picker">
                        </div>
                    </div>
                    <div class="form-group defaultContractTo-wrapper">
                        <div class="col-md-12">
                            <input type="checkbox" id="defaultLeasingExpiredDate" name="defaultContractTo">
                            <label for="defaultLeasingExpiredDate" class="control-label">Mặc định</label>
                        </div>
                    </div>
                </div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="cancel-listing" type="button" class="btn btn-success">Hủy đăng tin</button>
			</div>
		</div>

	</div>
</div>