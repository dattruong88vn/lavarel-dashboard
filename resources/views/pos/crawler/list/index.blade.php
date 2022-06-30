@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<h3 class="box-title" style="margin-top: 0;">Lọc dữ liệu</h3>
		<!-- Search and filter -->
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-info">
					<div class="box-body">
						<div class="row">
							<div class="col-md-12">
								<div class="row form-group">
									<div class="col-md-3">
										<div class="input-group date-range date">
											<input id="date-from" class="form-control" placeholder="Từ ngày">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-th"></span>
											</div>
										</div>
									</div>
									<div class="col-md-3">
										<div class="input-group date-range date">
											<input id="date-to" class="form-control" placeholder="Đến ngày">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-th"></span>
											</div>
										</div>
									</div>
									<div class="col-md-3">
										<div class="input-group price-range price">
											<input id="price-from" class="form-control text-right" placeholder="Giá từ">
											<div class="input-group-addon">
												<span>Tỷ</span>
											</div>
										</div>
									</div>
									<div class="col-md-3">
										<div class="input-group price-range price">
											<input id="price-to" class="form-control text-right" placeholder="Đến">
											<div class="input-group-addon">
												<span>Tỷ</span>
											</div>
										</div>
									</div>
								</div>
								<div class="row form-group">
									<div class="col-md-3">
										<select id="siteId" name="siteId" class="form-control">
											<option value="">Chọn trang crawler</option>
											@foreach ($list_site as $item)
												<option value="{{$item->id}}">{{$item->name}}</option>
											@endforeach
										</select>
									</div>
									<div class="col-md-3">
										<select id="listingTypeId" class="form-control"></select>
									</div>
									<div class="col-md-3">
										<select id="propertyTypeId" class="form-control"></select>
									</div>
									<div class="col-md-3">
										<select id="status" class="form-control">
											<option value="">Chọn trạng thái</option>
											@foreach($list_status as $item)

												@if($item->_id == 1)
													<option selected value="{{$item->_id}}">{{$item->name}}</option>
												@else
													<option value="{{$item->_id}}">{{$item->name}}</option>
												@endif
											@endforeach
										</select>
									</div>
								</div>
								<div class="row form-group">
									@if ($currentUser->departments[0]->isGroupAdmin == true)
										<div class="col-md-3">
											<select id="assigned" class="form-control">
											</select>
										</div>
									@else
									@endif
									<div class="col-md-3">
										<select id="districtId" class="form-control"></select>
									</div>
									<div class="col-md-3">
										<select id="wardId" class="form-control"></select>
									</div>
									<div class="col-md-3">
										<select id="streetId" class="form-control"></select>
									</div>
									@if ($currentUser->departments[0]->isGroupAdmin == true)

									@else
										<div class="col-md-3">
											<input name="address" class="form-control" placeholder="Nhập địa chỉ">
										</div>

									@endif
								</div>

								<div class="row form-group">
									@if ($currentUser->departments[0]->isGroupAdmin == true)
									<div class="col-md-3">
										<input name="address" class="form-control" placeholder="Nhập địa chỉ">
									</div>
									@endif
									<div class="col-md-3">
										<input name="phone" class="form-control" placeholder="Số điện thoại">
									</div>
									<div class="col-md-3">
										<input name="email" class="form-control" placeholder="Email">
									</div>
									<div class="col-md-3">
										<select id="duplicate" class="form-control"></select>
									</div>

								</div>

								<div class="row form-group">
									<div class="col-md-12 text-right" >
										<button id="search" type="button" class="btn btn-primary">Lọc dữ liệu</button>
										<button id="clearSearching" type="button" class="btn btn-default">Xóa</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- list -->
		<div id="tool-export">
			<div class="row">
				<div class="col-md-12 text-right">
					@if ($isGroupAdmin)
						<!-- <a href="http://crawfish.vn/crawler" target="_blank" class="btn btn-warning"><i class="fa fa-cog"></i> Cấu hình</a> -->
						<a href="#" target="_blank" class="excel-export btn btn-primary hide" download="true" target="_blank"><i class="glyphicon glyphicon-save"></i> Xuất excel</a>
					@endif
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="nav-tabs-custom crawler-tool-tab">
					<ul class="nav nav-tabs">
						<li class="active" data-type="1">
							<a id="tab-mapper" href="#tab-mapper-content" data-toggle="tab" aria-expanded="true">Mapping</a>
						</li>
						<li class="" data-type="2">
							<a id="tab-owner" href="#tab-owner-content" data-toggle="tab" aria-expanded="false">Chủ nhà</a>
						</li>
						<li class="" data-type="3">
							<a id="tab-agent" href="#tab-agent-content" data-toggle="tab" aria-expanded="false">Môi giới</a>
						</li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="tab-mapper-content">
							@include('pos.crawler.list.blc-table-mapper')
						</div>
						<!-- /.tab-pane -->
						<div class="tab-pane" id="tab-owner-content">
							@include('pos.crawler.list.blc-table-owner')
						</div>
						<div class="tab-pane" id="tab-agent-content">
							@include('pos.crawler.list.blc-table-agent')
						</div>
						<!-- /.tab-pane -->
					</div>
					<!-- /.tab-content -->
				</div>
			</div>
		</div>
	</div>
	@include('pos.share-modal.modal-show-check-duplicate')
	@include('pos.share-modal.modal-cancel-crawler')
	@include('pos.share-modal.modal-input-more-info')
	<style type="text/css">
		.list-dupicate .list{
			max-height:300px;
			overflow-y: scroll;
			overflow-x: hidden;
			margin: 0 -15px;
		}
		.list-dupicate .list::-webkit-scrollbar {
			width: 0.7em;
		}
		.list-dupicate .list::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		}
		.list-dupicate .list::-webkit-scrollbar-thumb {
			background-color: darkgrey;
		}
		.item-info{
			background-color: #dcf8ff;
			border-radius: 3px;
			padding: 5px;
			border: 1px solid #62b2c5;
			font-size: 13px;
		}
		.list-profile{
			font-size: 13px;
		}
		.five-days {
			background-color: #ef8081b3;
		 }

		.two-days {
			background-color:  #f7dc51 !important;
		}
		.one-day {
			background-color: #7ecbf9;
		}
		.five-days a,  .one-day a {
			color: #333;
		}
		.image-crawler {
			cursor: pointer;
		}
		.image-crawler:hover {
			font-weight: bold;
		}
	</style>
@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
	<script src="{{ loadAsset("/js/pos/crawler/list/index.js")}}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
@stop
