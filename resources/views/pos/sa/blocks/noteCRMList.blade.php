<div id="noteCRMList" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Quản lý ghi chú TM/CRM</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<table id="note-crm-list-table"
						       class="table table-bordered table-striped table-listing check-empty-table" width="100%" style="width: 100%;">
							<thead>
							<tr>
								<th>Ngày tạo</th>
								<th>Loại</th>
								<th>Người</th>
								<th>Nội dung</th>
								<th>Phản hồi của khách</th>
								<th>Ưa thích</th>
								{{--<th class="center">Thao tác</th>--}}
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="showAddNewNoteCRMModal" type="button" class="btn btn-success">Thêm ghi chú</button>
			</div>
		</div>
	</div>
</div>