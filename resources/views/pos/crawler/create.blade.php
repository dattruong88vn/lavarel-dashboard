@extends('layout.default')
@section('content')
	<?php $csrf_token = csrf_token(); ?>
	<div class='dashboard'>
		<input type="hidden" id="csrf-token" value="{{$csrf_token}}"/>
		<h3 class="box-title">
			<a href='/pos/crawler'><i class="glyphicon glyphicon-arrow-left"></i></a> Thông tin chủ tin đăng</h3>
		<div class="row">
			<div class="col-md-12">
				<form class="form-horizontal" id="myForm" role="form" novalidate="true">
					<!-- Hidden -->
					<input type="hidden" id="hiddenLoggedInUserId" value="{{$loggedInUser->userId}}"/>
					<div class="box box-info crawler-info">
						<div class="box-body">
							<!-- BEGIN LINK -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Link </label>
									<div class="col-sm-3">
										<input id="link" class="form-control" type="text" name="">
									</div>
								</div>
							</div>
							<!-- BEGIN LINK -->
							<!-- BEGIN NAME -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Tên chủ tin đăng</label>
									<div class="col-sm-3">
										<input id="name" class="form-control" type="text" name="">
									</div>
								</div>
							</div>
							<!-- END NAME -->
							<!-- BEGIN CELL PHONE -->
							<div class="row form-group">
								<div class="col-sm-12 blc-phone-items blc-phone-primary">
									<label class="control-label col-sm-2 required">SĐT</label>
									<div class="col-sm-3 ">
										<input id="phone" class="form-control phone-multi" type="text" name="phones[]">
									</div>
									<div class="col-sm-3">
										<button id="check-duplicated-phone-btn" class="btn btn-warning">
											<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
										</button>
										<button class="btn btn-primary btn-phone-add">
											<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
										</button>
									</div>
								</div>
							</div>
							<!-- END CELL PHONE -->
							<!-- BEGIN EMAIL -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Email</label>
									<div class="col-sm-3">
										<input id="email" class="form-control" type="email" name="">
									</div>
									<div class="col-sm-1">
										<button id="check-duplicated-email-btn" class="btn btn-warning">
											<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
										</button>
									</div>
								</div>
							</div>
							<!-- END EMAIL -->
							<!-- BEGIN ADDRESS -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Địa chỉ tin đăng </label>
									<div class="col-sm-3">
										<select id="cityId" class="form-control">
											<option value="1">TP Hồ Chí Minh</option>
										</select>
									</div>
									<label class="control-label col-sm-1">Quận</label>
									<div class="select-2 col-sm-2">
										<select id="districtId" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1">Phường</label>
									<div class="select-2 col-sm-3">
										<select id="wardId" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Đường</label>
									<div class="select-2 col-sm-3">
										<select id="streetId" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1">Số nhà</label>
									<div class="select-2 col-sm-2">
										<input id="houseNumber" type="" name="" class="form-control" value="">
										<span class="houseNumber-error"></span>
									</div>
									<div class="col-sm-1">
									<button id="check-duplicated-btn" class="btn btn-warning">
									<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>
								</div>
								</div>
							</div>
							<div class="form-group row">
							<div class="col-sm-12">
								<div id="display-landCode">
									<label class="control-label col-sm-2 label-landCode">Số thửa</label>
									<div class="select-2 col-sm-3">
										<input id="landCode" type="" name="" class="form-control" value="">
										<span class="landCode-error"></span>
									</div>
								</div>
								<div id="display-mapCode">
									<label class="control-label col-sm-1 label-mapCode">Tờ bản đồ</label>
									<div class="select-2 col-sm-2">
										<input id="mapCode" type="" name="" class="form-control" value="">
										<span class="mapCode-error"></span>
									</div>
								</div>
							</div>
							</div>
							<!-- END ADDRESS -->

							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Nguồn </label>
									<div class="select-2 col-sm-3">
										<select id="sourceId" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1 tc-wrapper required" style="display: none">TC </label>
									<div class="select-2 col-sm-2 tc-wrapper" style="display: none">
										<select id="tcId" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Kênh thông tin</label>
									<div class="select-2 col-sm-3">
										<select id="infoChannel" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1">Nguồn thông tin</label>
									<div class="select-2 col-sm-2">
										<select id="infoChannelChild" class="form-control"></select>
									</div>
								</div>
							</div>
							<!-- BEGIN OWNER TYPE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Phân Loại</label>
									<div class="select-2 col-sm-3">
										<select id="statusId" class="form-control"></select>
									</div>
								</div>
							</div>
							<!-- END OWNER TYPE -->
							<!-- BEGIN LISTING TYPE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Loại Giao Dịch </label>
									<div class="select-2 col-sm-3">
										<select id="listingTypeId" class="form-control"></select>
									</div>
								</div>
							</div>
							<!-- END LISTING TYPE -->
							<!-- BEGIN REAL ESTATE GROUP -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Nhóm BĐS </label>
									<div class="select-2 col-sm-3">
										<select id="realEstateGroupId" class="form-control"></select>
									</div>
								</div>
							</div>
							<!-- END LISTING TYPE -->
							<!-- BEGIN PROPERTY TYPE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Loại BĐS</label>
									<div class="select-2 col-sm-3" id="blc-property-type">
										<select id="propertyTypeId" class="form-control"></select>
									</div>
									<div id="blc-project">
                                    	<label class="control-label col-sm-2 col-sm-2 col-md-1 label-projectId">Dự án</label>
                                    	<div class="col-sm-2"><select id="projectId" class="form-control"></select>
                                    </div>
                                </div>
								</div>
							</div>
							<!-- END PROPERTY TYPE -->
							<!-- BEGIN BUILDING-->
							<div class="row form-group" id="blc-building">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Building</label>
									<div class="col-sm-3">
										<select id="buildingId" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1">Block</label>
									<div class="col-sm-2">
										<select id="blockId" class="form-control"></select>
									</div>
									<label class="control-label col-sm-1 label-modelCode">Mã căn hộ</label>
									<div class="col-sm-3">
										<input id="modelCode" type="text" class="form-control">
									</div>
								</div>
							</div>
							<!-- END BUILDING -->
							<!-- BEGIN PRICE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Giá</label>
									<div class="col-sm-3">
										<input id="price" type="text" name="" class="form-control">
									</div>
								</div>
							</div>
							<div class="row form-group" id="display-currency">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Loại tiền</label>
									<div class="col-sm-3">
										<select id="currency" type="text" name="" class="form-control">
											<option value="VND">VND</option>
											<option value="USD">USD</option>
										</select>
									</div>
								</div>
							</div>
							<!-- END PRICE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2 required">Campaign id</label>
									<div class="col-sm-3">
										<input id="campaignId" type="text" name="" class="form-control">
									</div>
									<div class="col-sm-7">
										<label class="checkbox control-label"><input id="campaignChecked" type="checkbox" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Không thuộc Campaign nào</label>
									</div>
								</div>
							</div>
							<!-- BEGIN UPLOAD IMAGE -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Hình ảnh</label>
									<div class="col-sm-10">
										<div id="photos-wrapper"></div>
									</div>
								</div>
							</div>
							<!-- END UPLOAD IMAGE -->
							<!-- BEGIN UPLOAD IMAGE GCN -->
							<div class="row form-group">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Hình ảnh GCN</label>
									<div class="col-sm-10">
										<div id="photoGcns-wrapper"></div>
									</div>
								</div>
							</div>
							<!-- END UPLOAD IMAGE GCN-->
							<!-- BEGIN NOTE -->
							<div class="row form-group" style="margin-bottom: 40px;">
								<div class="col-sm-12">
									<label class="control-label col-sm-2">Ghi Chú</label>
									<div class="col-sm-10">
										<textarea id="note" class="form-control" rows="5"></textarea>
									</div>
								</div>
							</div>
							<!-- END NOTE -->
							<div class="row form-group btn-group-fixed btn-group-fixed-pre">
								<div class="col-sm-12 no-print btn-group-action">
									<button id="create-crawler-btn" class="btn btn-primary">
										<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu
									</button>
									<button id="cancel-crawler-btn" class="btn btn-danger">
										<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Hủy
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
@include('pos.blocks.imageEditor')
@endsection
@section('page-js')
	@include('pos.blocks.common-script-page')

	<script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/common-pos-api.js")}}"></script>
	<script src="{{ loadAsset("js/pos/common/common-pos.js") }}"></script>
	<script src="{{ loadAsset("/js/pos/common/common-pos-notification.js")}}"></script>

	<script src="{{ loadAsset("/js/pos/common/plugins/paging/table.hpaging.min.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/FileHelper.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script src="{{ loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>
	<script src="{{ loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
	<script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
	<script src="{{ loadAsset("/js/pos/common/images-pos-lib.js") }}"></script>
	<!-- Bootstrap Notify -->
	<script src="{{ loadAsset("js/pos/crawler/Fields.js") }}"></script>
	<script src="{{ loadAsset("js/pos/crawler/create.js") }}"></script>
@stop
@section('page-css')
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css"/>
@stop
