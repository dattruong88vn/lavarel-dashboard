@extends('layout.default')
@section('content')
	<div class='dashboard'>
		<div class="row">
			<div class="col-md-12">
				<!-- Hidden -->
				<div class="box box-info">
					<div class="box-body">
						<div class="form-group">
							<div class="col-md-6">
								<div class="row form-group">
									<div class="col-md-6">
										<div class="row">
											<label for="price" class="control-label label-lg">Từ ngày</label>
											<div class="input-group date-range date">
												<input type="text" class="form-control date-range-from">
												<div class="input-group-addon">
													<span class="glyphicon glyphicon-th"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-6">

										<label for="price" class="control-label label-lg">Đến ngày</label>
										<div class="input-group date-range date">
											<input type="text" class="form-control date-range-to">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-th"></span>
											</div>
										</div>

									</div>
								</div>
								<div class="row form-group">
									<div class="col-md-12 text-right">
										<button type="button" class="btn btn-primary" id="maket-report-filter">Lọc dữ liệu</button>
									</div>
								</div>
								<!-- -->
								<div class="row">
									<div class="col-md-12">
										<div class="row">
											<h4 for="" class="control-label">Tổng quan Listing trong khu vực</h4>
										</div>

									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="row">
											<div class="form-control-static"> <strong>Tổng số listing: </strong> <span id="totalListing"></span></div>
										</div>
										<div class="row">
											<div class="form-control-static"><strong>Giá cao nhất: </strong><span id="maxPriceFormat"></span></div>
										</div>
										<div class="row">
											<div class="form-control-static"><strong>Giá thấp nhất: </strong><span id="minPriceFormat"></span></div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="row">
											<div class="form-control-static"><strong>Giá trị BDS hiện tại: </strong><span id="indexOfListing"></span>: <span id="priceFormat"></span></div>
										</div>
										<div class="row">
											<div class="form-control-static"><strong>Đơn giá đất trung bình: </strong><span id="avgSizeM2Format"></span></div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<div id="map-market" style="height: 300px"></div>
							</div>
						</div>
						<div class="form-horizontal">
							<table id="market-report-list-table" class="table table-bordered table-striped table-listing" width="100%" style="width: 100%;">
								<thead>
								<tr>
									<th width='30px'>ID</th>
									<th width='50px'>Giá</th>
									<th width='85px'>Diện tích đất (m<sup>2</sup>)</th>
									<th width='85px'>Đơn giá đất / m<sup>2</sup></th>
									<th width='87px'>Diện tích sử dụng (m<sup>2</sup>)</th>
									<th >Địa chỉ</th>
									<th width='100px'>Phòng ngủ Phòng tắm</th>
									<th width='50px'>Số lầu</th>
									<th width='140px'>Độ rộng  mặt tiền / hẻm (m)</th>
									<th width='87px'>Trạng thái</th>
								</tr>
								</thead>
							</table>
						</div>
						<div class="form-horizontal" style="display: none">
							<div class="form-group">
								<div class="col-md-12">
									<button id="show-send-pricing-request-email-modal" class="btn btn-success">Gửi yêu
										cầu định giá
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
        Window.jsData = {!! $data !!}
	</script>
	<style type="text/css">
		.table>caption+thead>tr:first-child>td,
		.table>caption+thead>tr:first-child>th,
		.table>colgroup+thead>tr:first-child>td,
		.table>colgroup+thead>tr:first-child>th,
		.table>thead:first-child>tr:first-child>td,
		.table>thead:first-child>tr:first-child>th {
			border-top: 0;
			text-align: center;
			vertical-align: middle;
		}
	</style>
@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/pos/common/plugins/plotly.js/dist/plotly.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/common-pos.js")}}" ></script>
	<script src="{{ loadAsset("/js/pos/sa/SAApi.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/sa/SAMarketReport.js")}}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
@stop