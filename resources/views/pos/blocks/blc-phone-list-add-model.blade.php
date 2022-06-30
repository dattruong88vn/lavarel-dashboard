<div id="phone-list-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				@if(isset($role) == false)
					<?php $role = ''; ?>
				@endif()
				@if($role == 'view')
					<h4 class="modal-title">Danh sách các số điện thoại</h4>
				@else
					<h4 class="modal-title">Chọn số điện thoại muốn gọi</h4>
				@endif
			</div>
			<div class="modal-body message">
				<div id="choose-phone-number" class="choose-phone-number" style="width:600px">
					<div class="line-phone-number">

					</div>
					<div class="form-inline new-subPhone">
						<div class="form-group">
							<input type="text" id="input-new-subphone" class="form-control" placeholder="số điện thoại" style="width: 200px">
						</div>
						<div class="form-group">
							<input type="text" id="input-new-subphone-note" class="form-control" placeholder="ghi chú" style="width: 338px">
						</div>
						<button type="button" id="btn-phone-add" class="btn btn-primary btn-sm btn-sub-phone">Thêm</button>
					</div>
					<div id="area-err"></div>

				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="btn-check-duplicated-phone" type="button" class="btn btn-warning" data-dismiss="modal">Kiểm tra</button>
				<button id="make-call-action" type="button" class="btn btn-success">Gọi
				</button>
			</div>
		</div>

	</div>
</div>

<script>
	$(document).ready(function () {
		$('#input-new-subphone').phoneBasic();
	})
</script>