<div id="transferDealsModal" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
				<h4 class="modal-title text-center">Thông tin deals cần chuyển</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<div class="row vertical-margin">
							<label for="td-sel-zones" class="col-lg-2 control-label">Zone</label>
							<div class="col-lg-4">
								<select id='td-sel-zones' class="sel-zones form-control" multiple></select>
							</div>
							<label for="td-sel-teams" class="col-lg-2 control-label">Team</label>
							<div class="col-lg-4">
								<select id='td-sel-teams' class="sel-teams form-control" multiple></select>
							</div>
						</div>
						<div class="row vertical-margin">
							<label for="td-sel-districts" class="col-lg-2 control-label">Quận</label>
							<div class="col-lg-4">
								<select id='td-sel-districts' class="sel-districts form-control" multiple></select>
							</div>
							<label for="td-sel-wards" class="col-lg-2 control-label">Phường</label>
							<div class="col-lg-4">
								<select id='td-sel-wards' class="sel-wards form-control" multiple></select>
							</div>
						</div>
						<div class="row vertical-margin">
							<label for="td-sel-statuses" class="col-lg-2 control-label">Trạng thái</label>
							<div class="col-lg-4">
								<select id='td-sel-statuses' class="form-control" multiple>
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
								<table id="list-deals" class="dataTable">
									<thead>
										<tr>
											<th><input type="checkbox" /></th>
											<th>Deal</th>
											<th>Người phụ trách</th>
											<th>Tên KH</th>
											<th>Mã KH</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><input type="checkbox" /></td>
											<td>2091</td>
											<td>Hồ Quế Hương</td>
											<td>Vương Quang Thế</td>
											<td>KM10135</td>
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
						<button type="button" class="btn btn-orange w-100" onclick="confirmBSA(2);">Chuyển</button>
					</div>
					<div class="col-lg-2">
						<button type="button" class="btn btn-default w-100" onclick="showReceiveListingsModal();">Bỏ qua</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	$(document).ready(function() {
		$('#list-deals').dataTable({
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

		$('#td-sel-zones').select2({
			width: '100%'
		});
		$('#td-sel-teams').select2({
			width: '100%'
		});
		$('#td-sel-districts').select2({
			width: '100%'
		});
		$('#td-sel-wards').select2({
			width: '100%'
		});
		$('#td-sel-statuses').select2({
			width: '100%'
		});
	});
	// const showReceiveListingsModal = () => {
	// 	$('#transferDealsModal').modal('hide');
	// 	$('#receiveListingsModal').modal();
    // }
</script>