<div id="transferListingsModal" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
				<h4 class="modal-title text-center">Danh sách listings cần chuyển</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<div class="row vertical-margin">
							<label for="tl-sel-zones" class="col-lg-2 control-label">Zone</label>
							<div class="col-lg-4">
								<select id='tl-sel-zones' class="sel-zones form-control" multiple></select>
							</div>
							<label for="tl-sel-teams" class="col-lg-2 control-label">Team</label>
							<div class="col-lg-4">
								<select id='tl-sel-teams' class="sel-teams form-control" multiple></select>
							</div>
						</div>
						<div class="row vertical-margin">
							<label for="tl-sel-districts" class="col-lg-2 control-label">Quận</label>
							<div class="col-lg-4">
								<select id='tl-sel-districts' class="sel-districts form-control" multiple></select>
							</div>
							<label for="tl-sel-wards" class="col-lg-2 control-label">Phường</label>
							<div class="col-lg-4">
								<select id='tl-sel-wards' class="sel-wards form-control" multiple></select>
							</div>
						</div>
						<div class="row vertical-margin">
							<label for="tl-sel-statuses" class="col-lg-2 control-label">Trạng thái</label>
							<div class="col-lg-4">
								<select id='tl-sel-statuses' class="form-control" multiple>
									<option selected>Cần live</option>
									<option selected>Đang live</option>
								</select>
							</div>
							<div class="col-lg-4">
								<div class="row">
									<div class="col-lg-6">
										<div class="checkbox">
											<label>
												<input type="checkbox" name="chkBuy" checked /> Mua-bán
											</label>
										</div>
									</div>
									<div class="col-lg-6">
										<div class="checkbox">
											<label>
												<input type="checkbox" name="chkRent" checked /> Thuê
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-2">
								<button class="btn btn-orange w-100">Tìm kiếm</button>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<table id="list-listings" class="dataTable">
									<thead>
										<tr>
											<th><input type="checkbox" /></th>
											<th>ID</th>
											<th>Chủ tin đăng</th>
											<th>Thời gian xử lý</th>
											<th>SĐT</th>
											<th>Địa chỉ</th>
											<th>Quận</th>
											<th>Giá</th>
											<th>Nguồn</th>
											<th>Loại hình</th>
											<th>Loại BĐS</th>
											<th>Ngày assign</th>
											<th>Người chuyển</th>
											<th>Người phụ trách</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="checkbox" /></td>
											<td>127973</td>
											<td>Anh Tươi</td>
											<td></td>
											<td>0323465497</td>
											<td>40/9 Lê Văn Thọ, Phường 11, Quận Gò Vấp, TP.HCM</td>
											<td>Quận Gò Vấp</td>
											<td>3.15 tỷ (VNĐ)</td>
											<td>Portal</td>
											<td>Bán</td>
											<td>Nhà riêng</td>
											<td>09:40:17<br />20/02/2020</td>
											<td>Trần Văn An</td>
											<td>BSA - Nguyễn Bảo Trâm Anh</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-lg-8"></div>
					<div class="col-lg-2">
						<button type="button" class="btn btn-orange w-100" onclick="confirmBSA(1);">Chuyển</button>
					</div>
					<div class="col-lg-2">
						<button type="button" class="btn btn-default w-100" onclick="showTransferDealsModal();">Bỏ qua</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	$(document).ready(function() {
		$('#list-listings').dataTable({
			scrollX: true,
			language: {
				search: 'Tìm kiếm',
				paginate: {
					previous: '<',
					next: '>',
					first: '|<',
					last: '>|'
				},
				lengthMenu: 'Hiển thị _MENU_ trên 1 trang',
				searchPlaceholder: 'Từ khóa',
				info: 'Hiển thị _START_ đến _END_ của _TOTAL_',
				emptyTable: 'Chưa có dữ liệu',
				infoEmpty: ''
			}
		});

		$('#tl-sel-zones').select2({
			width: '100%'
		});
		$('#tl-sel-teams').select2({
			width: '100%'
		});
		$('#tl-sel-districts').select2({
			width: '100%'
		});
		$('#tl-sel-wards').select2({
			width: '100%'
		});
		$('#tl-sel-statuses').select2({
			width: '100%'
		});
	});

	const showTransferDealsModal = () => {
		$('#transferListingsModal').modal('hide');
		$('#transferDealsModal').modal();
	}
</script>