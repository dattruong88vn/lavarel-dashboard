@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<h3 class="box-title">Danh sách đăng ký</h3>
		<!-- Serch and filter -->
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-info">
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<div class="row form-group">
									<div class="col-md-6">
										<input type="text" id="phone" class="form-control" placeholder="Nhập số điện thoại">
									</div>
									<div class="col-md-3 member-tab">
										<select id="user-type" name="user-type" class="form-control"></select>
									</div>
									<div class="col-md-3 request-tab" style="display: none">
										<select id="request-type" name="request-type" class="form-control" style="display: none"></select>
									</div>
									<div class="col-md-3">
										<select id="type" name="type" class="form-control"></select>
									</div>
								</div>
								<div class="row form-group" >
									<div class="col-md-6 member-tab">
										<select id="name-training" name="name-training" multiple="multiple" class="form-control">
											<option value="-1">Chọn Khóa học</option>
										</select>
									</div>
									<div class="col-md-3 member-tab">
										<select id="status" name="status-id" class="form-control"></select>
									</div>
									<div class="col-md-12 text-right" >
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
		<div class="row">
			<div class="col-xs-12 text-right">
				<button class="btn-warning btn" id="btn-tpa-send-sms"> <i class="fa fa-send"></i> Gửi thông báo</button>
				<button class="btn-primary btn" id="btn-tpa-export-excel"> <i class="fa fa-download"></i> Xuất excel</button>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="nav-tabs-custom">
					<ul class="nav nav-tabs">
						<li class="active">
							<a id="tpa-member-nav-list" class="tpa-member-nav" data-type="1" href="#tpa-member-list-id" data-toggle="tab" aria-expanded="true">Danh sách thành viên</a>
						</li>
						{{--<li class="">
							<a id="tpa-member-nav-request-list"class="tpa-member-nav" data-type="2"href="#tpa-request-list-id" data-toggle="tab" aria-expanded="false">Danh sách yêu cầu</a>
						</li>--}}
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="tpa-member-list-id">
							<div class="row">
								<div class="col-xs-12 overflow-auto">
									<table id="tb-traing-member" class="table table-bordered table-striped"  style="width: 100%; min-width: 1300px">
										<thead>
										<tr>
											<th style="width: 50px"></th>
											<th style="min-width: 200px">Khóa học</th>
											<th style="width: 150px">Tên thành viên</th>
											<th style="width: 150px">Email / Số ĐT</th>
											<th style="width: 110px">Phân loại</th>
											<th style="min-width: 300px;">Địa chỉ</th>
											<th style="width: 110px">Ngày tham gia</th>
											<th style="width: 110px">Ngày đăng ký</th>
											<th style="width: 110px">Trạng thái</th>
											<th style="width: 110px">Điểm thi</th>
											<th style="width: 110px">Hợp đồng</th>
											<th>Lý do</th>
										</tr>
										</thead>
									</table>
								</div>
							</div>

						</div>
						<!-- /.tab-pane -->
						{{--<div class="tab-pane" id="tpa-request-list-id">
							<table id="tb-member-request" class="table table-bordered table-striped" width="100%" style="width: 100%;">
								<thead>
								<tr>
									<th>Tên MG</th>
									<th>Email / Số ĐT</th>
									<th>Yêu cầu</th>
									<th>Ngày yêu cầu</th>
									<th width="130px">Trạng thái</th>
									<th width="100px">Thao tác</th>
								</tr>
								</thead>
							</table>
						</div>--}}
						<!-- /.tab-pane -->
					</div>
					<!-- /.tab-content -->
				</div>

			</div>
		</div>
	</div>
	<div id="modal-change-status" class="modal fade">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content modal-lg">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title" id="title-traing-action">Đổi trạng thái học viên</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<div class="row">
							<div class="col-md-12">
								<label class="control-label">Trạng thái</label>
								<select class="form-control" id="select-change-status"></select>
							</div>
							<div class="col-md-12 score-wrapper">
								<label class="control-label">Điểm số</label>
								<input type="text" class="form-control" value="" id="input-change-score">
							</div>
							<div class="col-md-12 course-wrapper" style="display: none">
								<label class="control-label">Khóa học mới</label>
								<select id="input-change-course" class="form-control"></select>
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
						<button type="button" class="btn btn-primary" id="btn-update-status-member">Lưu</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="modal-detail-training" class="modal fade">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title" id="title-traing-action">Chi tiết khóa học</h4>
				</div>
				<div class="modal-body">
					<div id="content-cancel-crawler" data-select2-id="content-cancel-crawler">
						<form id="data-send" action="/pos/training/store" method="post" data-select2-id="data-send">
							<div class="hidden">
								<input type="text" name="id-training">
							</div>
							<div class="form-group">
								<input readonly name="name-training" validate="require|max:32|min:3" placeholder="Nhập tên khóa học" type="text" class="form-control">
							</div>
							<div class="form-group">
								<label><input disabled="disabled" name="require-training" type="checkbox" value="1">Bắt buộc</label>
							</div>
							<div class="form-group">
								<input name="center-training" type="hidden" class="form-control" style="display: none"/>
								<input class="form-control" readonly="readonly" type="text" name="address-training" value="">
							</div>

							<div class="form-group">
								<div class="input-group" style="width: 100%;">
									<div class="input-group-addon">
										<span class="glyphicon glyphicon-th"></span>
									</div>
									<input readonly name="starte-date-training" formatter="date" placeholder="Ngày khai giảng" type="text" class="form-control">
								</div>
							</div>

							<div class="form-group">
								<input readonly name="time-training" placeholder="Thời lượng khóa học" type="text" class="form-control">
							</div>

							<div class="form-group">
								<textarea readonly name="des-training" placeholder="Mô tả khóa học" class="form-control"></textarea>
							</div>

							<div class="row form-group">
								<div class="col-md-12 text-center">
									<div style="padding: 10px; background-color: #eee; border: dashed 2px #ccc;">
										<input name="file-training" type="file" class="form-control hidden">
										<div id="name_file" style="font-size: 12px; margin-top: 5px;"></div>
										<input id="path-file-training" name="path-file-training" type="hidden" value="http://45.117.162.49:7777/course/Danh sach Dang ky Teambuilding.xlsx">
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" data-dismiss="modal" class="btn btn-danger">Đóng</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="modal-training-send-sms" class="modal fade">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h4 class="modal-title" id="title-traing-action">Gửi Thông Báo</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<div class="row">
							<div class="col-md-4">
								<label class="radio control-label row type-send-sms">
									<input type="radio" name="type-send-sms" value="1" checked>
									<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Gửi SMS
								</label>
							</div>
							<div class="col-md-4">
								<label class="radio control-label row type-send-sms">
									<input type="radio" name="type-send-sms" value="2">
									<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Gửi thông báo
								</label>
							</div>
							<div class="col-md-4">
								<label class="radio control-label row type-send-sms">
									<input type="radio" name="type-send-sms" value="3">
									<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Gửi cả 2
								</label>
							</div>
						</div>
					</div>
					<div class="box box-info group-send-sms">
						<div class="box-body">
							<div class="form-group group-send-sms">
								<div class="row">
									<div class="col-md-12">
										<label for="template-send-sms" class="control-label">Chọn mẫu gửi SMS</label>
										<select id="template-send-sms" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="form-group group-send-sms">
								<div class="row">
									<div class="col-md-12">
										<label for="template-send-sms" class="control-label required">Nội dung gửi</label>
										<span class="max-character-content" style="float: right; font-style: italic"></span>
										<textarea id="content-send-sms" class="form-control" rows="5"></textarea>

									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="box box-info group-send-notify">
						<div class="box-body">
							<div class="form-group group-send-notify">
								<div class="row">
									<div class="col-md-12">
										<label for="template-send-notify" class="control-label">Chọn mẫu gửi thông báo</label>
										<select id="template-send-notify" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="form-group group-send-notify">
								<div class="row">
									<div class="col-md-12">
										<label for="template-send-notify" class="control-label required">Nội dung gửi</label>
										<textarea id="content-send-notify" class="form-control" rows="5"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="form-group text-right">
						<button type="button" data-dismiss="modal" class="btn btn-default">Đóng</button>
						<button type="button" class="btn btn-success" id="btn-traning-send-sms">Gửi</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	@include('pos.share-modal.modal-register-to-training')
	@include('pos.blocks.blc-tpa-member-list-model')


@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/training/members.js")}}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<style type="text/css">
		.seen-detail-info,.seen-detail-commission, .btn-phone-call-agent, .btn-phone-call-agent-request{
			padding: 2px 5px;
			margin: 0;
			color: #3c8dbc;
			width: 90px;
		}
		.seen-detail-info,.seen-detail-commission {
			display: inline-block;
		}
		.seen-detail-info:hover,.seen-detail-commission:hover, .btn-phone-call-agent:hover,.btn-phone-call-agent-request:hover{
			background: #afb8bd;
			cursor: pointer;
			border-radius: 10px;
			color: #ffff;
			font-weight: bold;
		}
		.edit-member-commission{
			width: 85px !important;
		}
		.seen-detail-commission > i,  .btn-phone-call-agent > i, .btn-phone-call-agent-request > i{
			float: right;
			padding-top: 4px;
		}
		.seen-detail-commission.seen-detail-commission-buy {
			color: #FF851B;
		}
		.seen-detail-commission.seen-detail-commission-buy:hover {
			background: #FF851B;
			color: #ffff;
		}
		.seen-detail-commission.seen-detail-commission-sale {
			color: #366501;
		}
		.seen-detail-commission.seen-detail-commission-sale:hover {
			background: #366501;
			color: #ffff;
		}
		.btn-phone-call-agent, .btn-phone-call-agent-request {
			color: #366501;
			width: 100%;
		}
		.btn-phone-call-agent:hover, .btn-phone-call-agent-request:hover {
			background: #366501;
			color: #ffff;
		}
		td.member-agent-name {
			min-width: 150px;
			position: relative;
		}
		td.member-agent-name .require-stop {
			color: red;
			font-size: 13px;
			font-style: italic;
		}
		td .member-tpa-tooltip {

			background: #333;
			border-radius: 5px;
			color: #fff;
			content: attr(title);
			right: 0;
			bottom: 0;
			padding: 5px 15px;
			position: absolute;
			z-index: 98;
			display: none;
			width: auto;
			text-align: center;
		}
		.overflow-auto .dataTables_wrapper .row:nth-child(2) {
			overflow: auto;
			margin: 0;
		}

		.overflow-auto .dataTables_wrapper .row:nth-child(2) .col-sm-12 {
			padding: 0;
		}
	</style>
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
@stop
