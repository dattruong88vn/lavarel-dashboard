<div id="confirmBSAModal" class="modal fade" tabindex="-1" role="dialog">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
				<h4 class="modal-title text-center">Danh sách BA/BSA</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-lg-12">
						<table id="list-bsa" class="dataTable">
							<thead>
								<tr>
									<th>Họ và tên</th>
									<th>Email</th>
									<th>Zone</th>
									<th>Quận</th>
									<th>Phường</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Nguyễn Văn A</td>
									<td>van.nguyen@propzy.com</td>
									<td>1,2</td>
									<td>Quận 1 - Zone 1</td>
									<td>Phường 1 - Quận 1</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-12">
						<h5>Lý do <span class="required">(*)</span></h5>
					</div>
					<div class="col-lg-12">
						<textarea class="form-control" rows="3"></textarea>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Đóng</button>
				<button type="button" class="btn btn-orange" onclick="reassignAndNext();"><i class="fa fa-check" aria-hidden="true">&nbsp;</i> Reassign</button>
			</div>
		</div>
	</div>
</div>

<script>
	$(document).ready(function() {
		$('#list-bsa').dataTable({
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
	});
</script>