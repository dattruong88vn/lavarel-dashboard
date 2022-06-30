<div class="row form-group">
	<div class="col-md-6">
		@if ($isGroupAdmin)
			<button class="show-reassign-listing-modal-btn btn btn-warning" data-tab="need-to-call-listing">
				<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
			</button>
		@endif
	</div>
	<div class="col-md-3">
		<select id="need-to-call-listing-statusId" class="form-control"></select>
	</div>
	<div class="col-md-3">
		<select id="need-to-call-listing-workTypeName" class="form-control"></select>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<table id="need-to-call-listing-table" class="table table-bordered table-striped table-listing" width="100%" style="width: 100%;">
			<thead>
			<tr>
				@if ($isGroupAdmin)
					<th class="selectAll-wrapper">
						<input type="checkbox" class="selectAll" data-tab="need-to-call-listing">
					</th>
				@endif
				<th>ID</th>
				<th>Chủ tin đăng</th>
				<th>Thời gian xử lý</th>
				<th>Số điện thoại</th>
				<th>Quận</th>
				<th>Giá</th>
				<th>Loại tiền</th>
				<th>Nguồn tin đăng</th>
				<th>Loại hình</th>
				<th>Nhóm BĐS</th>
				<th>Loại BĐS</th>
				<th>Ngày nhận</th>
				<th>Ngày cập nhật</th>
                <th>Người phụ trách</th>
				<th>Tình trạng</th>
			</tr>
			</thead>
		</table>
	</div>
</div>