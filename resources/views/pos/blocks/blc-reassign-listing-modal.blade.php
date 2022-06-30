<div id="reassign-listing-modal" class="modal" role="dialog" aria-hidden="false">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Chuyển giao tin đăng</h4>
			</div>
			<div class="modal-body message">
				<div class="row">
					<div class="col-sm-12">
						<table id="department-user-list-table" class="table table-bordered table-striped table-listing check-empty-table" width="100%" style="width: 100%;">
							<thead>
							<tr>
								<th>Tên</th>
								<th>Email</th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="reassign-listing-btn" type="button" class="btn btn-warning">
					<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
				</button>
			</div>
		</div>

	</div>
</div>
<style>
	#department-user-list-table tbody tr {
		cursor: pointer;
	}

	#department-user-list-table.dataTable tbody > tr.selected, #department-user-list-table.dataTable tbody > tr > .selected {
		background-color: #398439;
	}
</style>
<!--<script src="{{ loadAsset("js/commons/browser-close-action.js") }}"></script>-->
<script src="{{ loadAsset("js/pos/common/ReassignListing.js") }}"></script>