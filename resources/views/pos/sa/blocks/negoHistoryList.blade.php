<div id="negoHistoryListPopup" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Lịch sử thưong lượng</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<table id="negoHistoryListTable" class="table table-bordered table-striped table-listing check-empty-table" width="100%" style="width: 100%;">
							<thead>
							<tr>
								<th>Người tạo</th>
								<th>Bộ phận</th>
								<th>Ghi chú</th>
								<th>Ngày tạo</th>
								<th class="center">Thao tác</th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button type="button" class="btn btn-success" data-phone="">Gọi</button>
				<button type="button" data-action="showNegoCancelPopup" class="negoAction btn btn-success">Từ chối</button>
				<button type="button" data-action="showNegoNewPopup" class="negoAction btn btn-success">Thưong lượng</button>
				<button type="button" data-action="showNegoAcceptPopup" class="negoAction btn btn-success">Đồng ý</button>
			</div>
		</div>
	</div>
</div>

<div id="negoCancelPopup" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Lịch sử thưong lượng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
					<div class="form-group">
						<div id="#negoCancelReason-wrapper" class="col-md-12"></div>
					</div>
					<div class="form-group">
						<div id="#negoCancelNote-wrapper" class="col-md-12"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button type="button" data-action="negoCancelSave" class="negoAction btn btn-success" data-phone="">Gọi</button>
			</div>
		</div>
	</div>
</div>

<div id="negoNewPopup" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Lịch sử thưong lượng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
					<div class="form-group">
						<div id="#negoNewPrice-wrapper" class="col-md-12"></div>
					</div>
					<div class="form-group">
						<div id="#negoNewNote-wrapper" class="col-md-12"></div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button type="button" data-action="negoNewSave" class="negoAction btn btn-success" data-phone="">Gọi</button>
			</div>
		</div>
	</div>
</div>