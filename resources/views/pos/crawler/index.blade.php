@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<h3 class="box-title">Quản Lý
		</h3>
		<!-- Serch and filter -->
		<div class="row hidden">
			<div class="col-xs-12">
				<div class="box box-info">
					<div class="box-body">
					
					</div>
				</div>
			</div>
		</div>
		<!-- Chart -->
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-info">
					<div class="box-body">
						<!-- BEGIN CHARTS -->
					@include('pos.crawler.blocks.blc-charts')
					<!-- END CHARTS -->
						<!-- BEGIN LISTING NEED TO REVIEW-->
					@include('pos.crawler.blocks.blc-listing-need-to-review')
					<!-- END LISTING NEED TO REVIEW-->
						<!-- BEGIN LISTING CRAWLED-->
					@include('pos.crawler.blocks.blc-crawled-listing')
					<!-- END LISTING CRAWLED-->
					</div>
				</div>
			</div>
		</div>
	</div>
@endsection
@section('page-js')
	<script src="{{ loadAsset("/js/common/error_messages.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
	<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
	
	<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/crawler/index.js")}}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
@stop
