@extends('layout.default')
@section('content')
	<div class='dashboard'>
		<h3 class="box-title">Quản lý</h3>
		<!-- Serch and filter -->
		<div class="box box-info">
			<div class="box-body">
				<div class="form-horizontal form-group">
					{{--<div id="zone-filter-option-list" class="row">
						<div class="col-md-12 text-right">
							<button id="get-export" type="button" class="btn bg-orange btn-sm btn-flat">Xuất file</button>
							<button id="tb-show-detail" type="button" class="btn btn-primary btn-sm btn-flat"><i class="fa fa-plus-circle"></i> hiển thị</button>
							<button id="tb-hide-detail" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-minus-circle"></i> ẩn</button>
						</div>
					</div>--}}
				</div>
				<div class="">
					<div class=" col-md-12">
						<table class="table table-hover table-bordered" id="tb-edit-owner" style="width: 100%">
							<thead>
							<tr>
								<th width="75px">Id</th>
								<th>Môi giới</th>
								<th>Chủ nhà</th>
								<th>SĐT</th>
								<th>SĐT thay đổi</th>
								<th>Ngày yêu cầu</th>
								<th width="60px">Thao tác</th>
							</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	@include('pos.blocks.blc-new-phone-list-model')

@endsection
@section('page-js')

	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/agent/index.js")}}"></script>


@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop
