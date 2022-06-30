@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<h3 class="box-title">Danh sách khóa học</h3>
		<!-- Serch and filter -->
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-info">
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<div class="row form-group">
									<div class="col-md-4">
										<select id="name-training" multiple="multiple" name="name-training" validate="require|max:3|min:5" class="form-control"></select>
									</div>
									<div class="col-md-4">
										<select id="center" name="center" class="form-control"></select>
									</div>
									<div class="col-md-4">
										<select id="status" name="status" class="form-control"></select>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-md-4">
										<div class="input-group date-range date">
											<input id="date-from" class="form-control" placeholder="Từ ngày">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-th"></span>
											</div>
										</div>
									</div>
									<div class="col-md-4">
										<div class="input-group date-range date">
											<input id="date-to" class="form-control" placeholder="Đến ngày">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-th"></span>
											</div>
										</div>
									</div>
									<div class="col-md-4 text-right" >
										<button id="btn-training-course-create" style="color: #fff;background-color: #f39c12;border-color: #f39c12;" type="button" class="btn btn-default">Tạo khóa học</button>
										<button id="search" type="button" class="btn btn-primary">Lọc dữ liệu</button>
										<button id="clear-search" type="button" class="btn btn-default">Xóa</button>

									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="data-table">

		</div>
		<div class="row">
			<div class="col-xs-12">
				<table id="tb-traing-course" class="table table-bordered table-striped table-listing" width="100%" style="width: 100%;">
					<thead>
					<tr>
						<th>Khóa học</th>
						<th>Địa điểm</th>
						<th>Ngày khai giảng</th>
						<th>Thời gian</th>
						<th width="105px">Trạng thái</th>
						<th>Số lượng đăng ký</th>
						<th>Số lượng tham gia</th>
					</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<div id="modal-change-status" class="modal fade">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title" id="title-traing-action">Đổi trạng thái khóa học</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label class="control-label">Trạng thái</label>
								<select class="form-control" id="select-change-status"></select>
							</div>
							<div class="col-md-12 reason-wrapper" style="display: none">
								<label class="control-label">Lý do</label>
								<select class="form-control" id="select-change-reason"></select>
							</div>
							<div class="col-md-12 reason-note-wrapper" style="display: none">
								<label class="control-label">Ghi chú</label>
								<textarea id="text-change-note"  placeholder="Mô tả khóa học" class="form-control"></textarea>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" data-dismiss="modal" class="btn btn-danger">Đóng</button>
						<button type="button" class="btn btn-primary" id="btn-update-status-course">Lưu</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	@include('pos.share-modal.modal-edit-training')
@endsection
@section('page-js')
	<script type="text/javascript">
		var listStatus = {!! json_encode($list_status) !!};
	</script>
	<script src="{{ loadAsset("/js/common/error_messages.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tabulator/3.5.3/js/tabulator.min.js"></script>
	<script src="{{ loadAsset("/js/pos/training/index.js")}}"></script>
	@if (session('result'))
		@if (session('result')==1)
			<script type="text/javascript">
				$(document).ready(function () {
					createNotification({
						message: "Thao tác thành công",
						from: 'top',
						align: 'center',
						type: 'success'
					});
				});

			</script>
		@else
			<script type="text/javascript">
				$(document).ready(function () {
					createNotification({
						message: "Thao tác đã xảy ra lỗi.",
						from: 'top',
						align: 'center',
					});
				});
			</script>
		@endif
	@endif
@stop
@section('page-css')
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/plugins/tabulator/css/bootstrap/tabulator_bootstrap.min.css")}}" rel="stylesheet">
	<style type="text/css">
		.tabulator .tabulator-header, .tabulator .tabulator-header .tabulator-col {
			position: relative;
			box-sizing: border-box;
			background-color: #3c8dbc;
			overflow: hidden;
			color: #fff;
		}

		.tabulator .tabulator-header {
			width: 100%;
			border-bottom: 1px solid #ddd;
			font-weight: 700;
			white-space: nowrap;
			-moz-user-select: none;
			-khtml-user-select: none;
			-webkit-user-select: none;
			-o-user-select: none;
		}
		.tabulator .tabulator-footer{
			border-top: 1px solid #ddd!important;
			padding: 15px;
		}
		.tabulator .tabulator-footer .tabulator-page {
			display: inline-block;
			margin: 0px;
			border: 1px solid #ddd;
			border-radius: 0px;
			padding: 2px 5px;
			background: hsla(0,0%,100%,.2);
			font-family: inherit;
			font-weight: inherit;
			font-size: inherit;
		}
		.tabulator .tabulator-footer .tabulator-page {
			display: inline-block;
			position: relative;
			padding: 6px 12px;
			margin-left: -1px;
			line-height: 1.42857143;
			text-decoration: none;
			background-color: #fff;
			border: 1px solid #ddd;
		}
		.tabulator .tabulator-footer .tabulator-page.active, .tabulator .tabulator-footer .tabulator-page:not(.disabled):hover {
			cursor: pointer;
			background: rgba(0,0,0,.2);
			color: #fff;
			z-index: 2;
			color: #fff;
			cursor: default;
			background-color: #337ab7;
			border-color: #337ab7;
		}
		.tabulator .tabulator-footer span.tabulator-paginator button.tabulator-page[data-page=first],
		.tabulator .tabulator-footer span.tabulator-paginator button.tabulator-page[data-page=last] {
			display: none!important;
		}
		.tabulator .tabulator-header .tabulator-col.tabulator-sortable[aria-sort=none] .tabulator-col-content .tabulator-arrow {
			border-top: none;
			border-bottom: 6px solid #fff;
		}
		.tablulator-loader{
			display: none;
		}
		/* width */
		.tabulator .tabulator-tableHolder::-webkit-scrollbar {
			width: 10px;
		}
		/* Track */
		.tabulator .tabulator-tableHolder::-webkit-scrollbar-track {
			background: #f1f1f1;
		}
		/* Handle */
		.tabulator .tabulator-tableHolder::-webkit-scrollbar-thumb {
			background: #888;
		}
		/* Handle on hover */
		.tabulator .tabulator-tableHolder::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
		.tabulator .tabulator-header .tabulator-frozen.tabulator-frozen-left {
			border-right: 1px solid #ddd;
		}
		.tabulator-row .tabulator-frozen.tabulator-frozen-left {
			border-right: 1px solid #ddd;
		}
		.tabulator-row .tabulator-cell {
			white-space: initial;

		}
		.tabulator .tabulator-header .tabulator-col .tabulator-col-content .tabulator-col-title{
			white-space: initial;
		}
		.tabulator .tabulator-tableHolder .tabulator-placeholder span {
			display: inline-block;
			margin: 0 auto;
			padding: 10px;
			color: #000;
			font-weight: 400;
			font-size: 14px;
			margin-bottom: 10px;
		}
	</style>
@stop
