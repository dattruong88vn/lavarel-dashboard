<div class="row">
	<div class="col-md-6">
		<div id="called-listing-overview">&nbsp;</div>
	</div>
	@if ($isGroupAdmin == true)
		<div class="col-md-12">
			<button class="show-reassign-listing-modal-btn btn btn-warning" data-tab="called-listing">
				<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
			</button>
		</div>
	@endif
</div>
<div class="row">
	<div class="col-md-12">
		<table id="called-listing-table" class="table table-bordered table-striped table-listing" width="100%" style="width: 100%;">
			<thead>
			<tr>
				@if ($isGroupAdmin)
					<th class="selectAll-wrapper">
						<input type="checkbox" class="selectAll" data-tab="called-listing">
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
                <th>Người phụ trách</th>
				<th>Thời gian bắt đầu gọi</th>
				<th>Thời gian kết thúc gọi</th>
				<th>Ngày chuyển SA</th>
				<th>Ngày cập nhật</th>
				<th>Kết quả</th>
				{{--@if ($isGroupAdmin == true)--}}
					{{--<th>Reassign</th>--}}
				{{--@endif--}}
			</tr>
			</thead>
		</table>
	</div>
</div>