@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal">
					<div class="row">
						<div class="col-md-10">
							<input type="text" id="filter-rlisting-id" class="form-control" placeholder="rlisting id"/>
						</div>
						<div class="col-md-2 text-right">
							<button class="btn btn-primary btn-sm" id="filter">Lọc dữ liệu</button>
							<button class="btn btn-default btn-sm" id="cancel-filter">bỏ lọc</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal">
						<div class="row">
							<div class="col-xs-12">
								<h3 style="margin-top: 0;">Danh sách tin đăng cần cập nhật latitude và longitude</h3>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12 overflow-auto">
								<table id="needToUpdateLatLongtable" class="table table-bordered table-striped table-listing" width="100%" style="width: 100%;">
									<thead>
									<tr>
										<th>ID</th>
										<th style="text-align: center!important">Địa chỉ</th>
										<th>Vị trí hiện tại</th>
										<th>Vị trí từ CC</th>
										<th>Xem trên bản đồ</th>
										<th>Hình trước nhà</th>
										<th>Cập nhật</th>
									</tr>
									</thead>
								</table>
							</div>
						</div>
				</div>
			</div>
		</div>
	</div>
	<div id="dvMapModal" class="modal" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content" style="width: 1000px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title">Vị trí tin đăng</h4>
				</div>
				<div class="modal-body message">
					<div id="dvMap" style="width: 970px; height: 600px"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="photoModal" class="modal" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content" style="width: 1000px">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title">Đang xem hình phóng to</h4>
				</div>
				<div class="modal-body message" style="text-align: center">
					<img src="" style="max-width: 100%; max-height: 600px;">
				</div>
			</div>
		</div>
	</div>
	
@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/common/error_messages.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/sa/SAUpdateLatLong.js")}}"></script>
	{{-- <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script> --}}
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<style>
		.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
			vertical-align: middle;
			text-align: center;
		}
		.table>tbody>tr>td img{
			height: 100px;
		}
		.text-left{
			text-align: left !important;
		}
		.map-position-info{
			font-size: 18px;
			font-weight: 700;
		}
	</style>

@stop