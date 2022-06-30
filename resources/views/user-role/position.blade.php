<div class="col-md-6">
	<!-- <h3 class="box-title list-departments-header">Chức vụ thuộc <span id="departmentName">{}</span></h3>
	<div>
		<button class="btn btn-link" data-toggle="modal" data-type="add" data-target="#myModal">Thêm mới chức vụ</button>
	</div> -->
	<div id="wrapTreeviewPosition">
		<div id="treeviewPosition"></div>
	</div>
	<!-- Modal -->
	<div class="modal fade modal-position" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog modal-lg" role="document">
			<form  id="create-position" class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Tạo chức vụ mới</h4>
				</div>
				<div class="modal-body">
					Đang tải form ...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
					<button id="btn-submit" type="submit" class="btn btn-primary btn-submit"><i class="fa fa-check" aria-hidden="true"></i> Thêm</button>
				</div>
			</form>
		</div>
	</div>
</div>
<style>
	#treeviewPosition ul li{
		_background: #428bca;
		color: blue;
		border:2px solid blue;
	}
	#treeviewPosition,#treeview{
		overflow: auto;
		height: 400px;
	}

	.modal-position .modal-lg{
		width: 100%;
		height: 100%;
	}
</style>
