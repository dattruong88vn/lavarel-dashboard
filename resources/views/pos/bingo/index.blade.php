@extends('layout.default')
@section('content')
	<svg height="8" width="8" xmlns="http://www.w3.org/2000/svg" version="1.1">
		<defs>
			<pattern id="compare-pattern-fill" patternUnits="userSpaceOnUse" width="8" height="8">
				<image xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyNhYWEnLz4KPC9zdmc+Cg==" x="0" y="0" width="8" height="8"></image>
			</pattern>
		</defs>
		<defs>
			<pattern id="pattern-stripe" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
				<rect width="2" height="4" transform="translate(0,0)" fill="white"></rect>
			</pattern>
			<mask id="mask-stripe">
				<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)"/>
			</mask>
		</defs>
	</svg>
	<div id="bingo" class="bingo">
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal">
					<div id="zone-filter-option-list" class="row">
						<div class="col-md-12">
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat active" data-area="-1">Tất cả</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="0">Trung tâm 1</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="1">Trung tâm 2</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="2">Đông</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="3">Tây</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="4">Nam</button>
							<button type="button" class="btn area-filter-item bg-default btn-sm btn-flat" data-area="5">Bắc</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal">
					<div class="form-group">
						<div class="col-md-6">
							<div class="row">
								<div class="col-md-4">
									<label for="date-from-1" class="control-label label-lg">Từ ngày</label>
									<input id="date-from-1" type="text" class="form-control">
								</div>
								<div class="col-md-4">
									<label for="date-to-1" class="control-label label-lg">Đến ngày</label>
									<input id="date-to-1" type="text" class="form-control">
								</div>
								<div id="date-range-1-item-list" class="col-md-4">
									<label for="">&nbsp;</label>
									<select id="date-range-1-item" class="form-control date-range-1-item">
										{{--<option value="custom">Tùy chọn</option>--}}
										<option value="default" selected>Mặc định</option>
										<option value="daily">Trong ngày</option>
										<option value="weekly">Trong tuần</option>
										<option value="monthly">Trong tháng</option>
										<option value="yearly">Trong năm</option>
									</select>
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<label for="listingTypeId" class="control-label label-lg">Loại GD</label>
							<select name="" id="listingTypeId" class="form-control">
								<option value="">Tất cả</option>
								<option value="1">Bán</option>
								<option value="2">Thuê</option>
							</select>
						</div>
						<div class="col-md-3">
							<label for="propertyTypeId" class="control-label">Loại BDS</label>
							<select name="" id="propertyTypeId" class="form-control"></select>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-6">
							<div id="compare-group" class="row" style="display: none;">
								<div class="col-md-12">
									<div class="row">
										<div class="col-md-4">
											<label for="date-from-2" class="control-label">So sánh từ ngày</label>
											<input id="date-from-2" type="text" class="form-control">
										</div>
										<div class="col-md-4">
											<label for="date-to-2" class="control-label">So sánh đến ngày</label>
											<input id="date-to-2" type="text" class="form-control">
										</div>
										<div id="date-range-2-item-list" class="col-md-4">
											<label for="">&nbsp;</label>
											<select id="date-range-2-item" class="form-control">
												{{--<option value="custom">Tùy chọn</option>--}}
												<option value="today" selected>Trong ngày</option>
												<option value="yesterday">Hôm qua</option>
												<option value="last-week">Tuần trước</option>
												<option value="last-month">Tháng trước</option>
												<option value="last-7-days">7 ngày trước</option>
												<option value="last-30-days">30 ngày trước</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									&nbsp;
								</div>
								<div class="col-md-12">
									<div class="checkbox">
										<label>
											<input id="compare" type="checkbox" value="true">
											<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>So sánh
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<label for="source" class="control-label label-lg">Nguồn</label>
							<select name="" id="source" class="form-control" multiple="multiple"></select>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-12 text-right">
							<button id="show-report" type="button" class="btn btn-primary">Xem báo cáo</button>
							<button id="get-export" type="button" class="btn btn-default">Xuất báo cáo</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		{{--<div class="box box-info">--}}
		{{--<div class="box-body">--}}
		{{--<div class="form-horizontal">--}}
		{{--<div id="zone-filter-option-list9" class="row">--}}
		{{----}}
		{{--</div>--}}
		{{--</div>--}}
		{{--</div>--}}
		{{--</div>--}}
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal">
					<div class="row">
						<div class="col-md-12">
							<h1 class="overview-title"></h1>
							<h3 class="overview-subtitle"></h3>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="report-group"></div>
	</div>
@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/pos/common/plugins/d3/d3.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/plugins/bootstrap-daterangepicker-master/daterangepicker.js")}}"></script>
	{{--<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>--}}
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/bingo/loader.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/bingo/BingoData.js")}}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<style>
		.btn.bg-default {
			background: #fff;
			border: 1px solid #dddddd;
			outline: none;
		}

		.btn.bg-default:hover {
			background: #00B3EF;
			border: 1px solid #00B3EF;
			color: #fff;
			outline: none;
		}

		.btn.bg-default.active, .btn.bg-default.active:focus, .btn.bg-default.active:active {
			background: #00B3EF;
			color: #fff;
			border: 1px solid #00B3EF;
			box-shadow: none;
			outline: none;
		}

		.form-horizontal .form-group {
			width: auto;
		}

		.lengend-data-table td:not(:nth-child(1)) {
			text-align: right;
		}

		rect.bar-compare {
			/*mask: url('#mask-stripe');*/
			fill-opacity: 0.5;
		}

		li.google-visualization-tooltip-item {
			white-space: nowrap;
			margin: 0;
		}
	</style>
@stop