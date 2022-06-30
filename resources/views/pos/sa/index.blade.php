<?php

use App\Libraries\UserAuth; ?>
<?php
$isGroupAdmin = false;
if (UserAuth::checkIsGroupAdminonType($currentUser->departments, ["ZONE", "GROUP", "DEPARTMENT"])) {
    $isGroupAdmin = true;
}
?>
@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard' style="padding-bottom:525px;">
    <div id="spa-main"></div>
    <div style="position:relative">
        <!-- filter -->
        <div id="form-filter">
                <div class="row">
                    <div id="rlistingId-wrapper" class="col-md-12">
                        <input type="text" class="form-control" id="rlistingId" placeholder="Id: 1001, 1002">
                    </div>
                </div>
                <div class="row">
                    <div id="ownerName-wrapper" class="col-md-12">
                        <input type="text" class="form-control" id="owner-name" placeholder="Chủ tin đăng">
                    </div>
                </div>
                <div class="row">
                    <div id="phone-wrapper" class="col-md-12">
                        <input type="text" class="form-control" id="phone" placeholder="Số điện thoại">
                    </div>
                </div>
                <div class="row">
                    <div id="address-wrapper" class="col-md-12">
                        <input type="text" class="form-control" id="address" placeholder="Địa chỉ">
                    </div>
                </div>
                <div class="row">
                    <div id="fromReviewedDate-wrapper" class="col-md-6">
                        <div class="input-group date-range date">
                            <input id="date-from" autocomplete="off" class="form-control" placeholder="Từ ngày">
                            <div class="input-group-addon">
                                <span class="glyphicon glyphicon-th"></span>
                            </div>
                        </div>
                    </div>
                    <div id="toReviewedDate-wrapper" class="col-md-6">
                        <div class="input-group date-range date">
                            <input id="date-to" autocomplete="off" class="form-control" placeholder="Đến ngày">
                            <div class="input-group-addon">
                                <span class="glyphicon glyphicon-th"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 zoneBlock">
                        <select id="zoneField" class="form-control"></select>
                    </div>
                    <div class="col-md-6 teamBlock">
                        <select id="teamField" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 departmentBlock">
                        <select id="departmentField" class="form-control"></select>
                    </div>
                    <div class="col-md-6 memberBlock">
                        <select id="memberField" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 listingTypeBlock">
                        <select id="listingTypeId" class="form-control"></select>
                    </div>
                    <div class="col-md-6 propertyTypeBlock">
                        <select id="propertyTypeIds" class="form-control" multiple="multiple"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 districtBlock">
                        <select id="districtId" class="form-control"></select>
                    </div>
                    <div class="col-md-6 wardBlock">
                        <select id="wardId" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div id="sourceId-wrapper" class="col-md-6 sourceBlock">
                        <select id="sourceId" class="form-control" multiple="multiple"></select>
                    </div>
                    <div class="col-md-6 tcBlock">
                        <select id="tcId" class="form-control" multiple="multiple"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 infoChannelBlock">
                        <select id="infoChannel" class="form-control" multiple="multiple"></select>
                    </div>
                    <div class="col-md-6 infoChannelChildBlock">
                        <select id="infoChannelChild" class="form-control" multiple="multiple"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 classifiedBlock">
                        <select id="classified" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 liveTypeBlock" id="liveType-wrapper">
                        <select id="liveType" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 bpoBlock">
                        <select id="bpo" class="form-control"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button id="clearSearching" type="button" class="btn btn-default btn-block">Xóa bộ lọc</button>
                    </div>
                    <div class="col-md-6">
                        <button id="search" type="button" class="btn btn-success btn-block">Áp dụng</button>
                    </div>
                </div>
            </div>
            <!-- \\filter -->
    </div>
    <div class="row" style="margin-top:20px">
        <div class="col-xs-12">
            <!-- <h3 style="margin-top: 0;">Quản lý</h3> -->
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a id="live-listing-id" href="#need-to-live-listing" data-toggle="tab" aria-expanded="true">Tin đăng cần live</a>
                    </li>
                    <li class="">
                        <a id="living-listing-id" href="#living-listing" data-toggle="tab" aria-expanded="false">Tin đăng đang live</a>
                    </li>
                    <li class="">
                        <a id="canceled-listing-id" href="#lived-listing" data-toggle="tab" aria-expanded="false">Tin đăng đã gỡ</a>
                    </li>
                    <li class="">
                        <a id="not-standard-listing-id" href="#substandard-listing" data-toggle="tab" aria-expanded="false">Tin đăng không đạt chuẩn</a>
                    </li>
                    <li class="">
                        <a id="archive-listing-id" href="#tab-archive-listing" data-toggle="tab" aria-expanded="false">Tin đăng Archived</a>
                    </li>
                    <li class="pull-right" id="wrap-btn-showhide-filter">
                        <button class="btn btn-default" id="btn-showhide-filter" style="display:flex;" onClick="showHideFilter()"><i class="fa fa-filter" aria-hidden="true"></i> <span>Lọc</span> <i class="fa fa-sort-desc" aria-hidden="true"></i></button>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="need-to-live-listing">
                        @if ($isGroupAdmin === true)
                        <div class="row">
                            <div class="col-xs-1">
                                <button class="show-reassign-listing-modal-btn btn btn-warning" data-btn="reassign" data-tab="need-to-live-listing">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
                                </button>
                            </div>
                            <div class="col-xs-2" style="margin-left:30px;">
                                <button class="show-reassign-all-listing-modal-btn btn btn-warning" data-btn="reassign-all" data-tab="need-to-live-listing">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign all(0)
                                </button>
                            </div>
                        </div>
                        @endif
                        <div class="row">
                            <div class="col-xs-12 overflow-auto">
                                <table id="tb-live-listing-index" class="table table-bordered table-striped table-listing prevent-copy" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="display: none"></th>
                                            @if ($isGroupAdmin === true)
                                            <th class="selectAll-wrapper">
                                                <input type="checkbox" class="selectAll" data-tab="need-to-live-listing">
                                            </th>
                                            @endif
                                            <th>ID</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Ngày chốt</th>
                                            <th>Thời gian xử lý</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Quận</th>
                                            <th>Giá</th>
                                            <th>Nguồn</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Hợp đồng</th>
                                            <th>Ngày assign</th>
                                            <th>Người chuyển</th>
                                            <th>Người phụ trách</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="living-listing">
                        <div class="row">
                            <div class="col-xs-10">
                                <div id="overview-listing-for-living" class="overview-group"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <table class="table" id="tb-overview-collection-tour-for-living">
                                    <tbody>
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        @if ($isGroupAdmin === true)
                        <div class="row">
                            <div class="col-xs-1">
                                <button class="show-reassign-listing-modal-btn btn btn-warning" data-btn="reassign" data-tab="living-listing">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
                                </button>
                            </div>
                            <div class="col-xs-2" style="margin-left:30px;">
                                <button class="show-reassign-all-listing-modal-btn btn btn-warning" data-btn="reassign-all" data-tab="living-listing">
                                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign all
                                </button>
                            </div>
                        </div>
                        @endif
                        <div class="row">
                            <div class="col-xs-12 overflow-auto">
                                <table id="tb-living-listing-index" class="table table-bordered table-striped table-listing prevent-copy" style="width: 100%; padding-top: 65px">
                                    <thead>
                                        <tr>
                                            <th style="display: none"></th>
                                            @if ($isGroupAdmin === true)
                                            <th class="selectAll-wrapper">
                                                <input type="checkbox" class="selectAll" data-tab="living-listing">
                                            </th>
                                            @endif
                                            <th>ID</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Địa chỉ</th>
                                            <th>Giá</th>
                                            <th>Giá / m2</th>
                                            <th>SĐT</th>
                                            <th>Ngày dự kiến bán</th>
                                            <th>Thời gian còn lại để bán</th>
                                            <th>Quận</th>
                                            <th>Trong BST</th>
                                            <th>Deals Tốt Nhất</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Loại tin đăng</th>
                                            <th>Ngày cập nhật Listing</th>
                                            <th>Ngày hết hạn<br />độc quyền</th>
                                            <th>Hợp đồng</th>
                                            <th>Deal - Tour</th>
                                            <th>Ngày đăng</th>
                                            <th>Nguồn</th>
                                            <th>Thời gian xử lý</th>
                                            <th>Ngày assign</th>
                                            <th>Người chuyển</th>
                                            <th>Người phụ trách</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="lived-listing">
                        <div class="row">
                            <div class="col-xs-12">
                                <div id="overview-listing-for-canceled" class="overview-group"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 overflow-auto">
                                <table id="tb-canceled-listing-index" class="table table-bordered table-striped table-listing prevent-copy" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="display: none"></th>
                                            <th>ID</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Ngày chốt</th>
                                            <th>Thời gian xử lý</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Quận</th>
                                            <th>Giá</th>
                                            <th>Nguồn</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Hợp đồng</th>
                                            <th>Ngày gỡ</th>
                                            <th>Người chuyển</th>
                                            <th>Người phụ trách</th>
                                            <th>Lý do</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="substandard-listing">
                        <div class="row">
                            <div class="col-xs-12">
                                <div id="overview-listing-for-not-standard" class="overview-group"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 overflow-auto">
                                <table id="tb-not-standard-listing-index" class="table table-bordered table-striped table-listing prevent-copy" width="100%" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="display: none"></th>
                                            <th>ID</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Ngày chốt</th>
                                            <th>Thời gian xử lý</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Quận</th>
                                            <th>Giá</th>
                                            <th>Nguồn</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Hợp đồng</th>
                                            <th>Ngày assign</th>
                                            <th>Người chuyển</th>
                                            <th>Người phụ trách</th>
                                            <th>Lý do</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="tab-archive-listing">
                        <div class="row">
                            <div class="col-xs-12 overflow-auto">
                                <table id="tb-archive-listing-index" class="table table-bordered table-striped table-listing prevent-copy" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th style="display: none"></th>
                                            <th>ID</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Ngày chốt</th>
                                            <th>Thời gian xử lý</th>
                                            <th>SĐT</th>
                                            <th>Địa chỉ</th>
                                            <th>Quận</th>
                                            <th>Giá</th>
                                            <th>Loại tin đăng</th>
                                            <th>Ngày cập nhật Listing</th>
                                            <th>Ngày hết hạn<br />độc quyền</th>
                                            <th>Hợp đồng</th>
                                            <th>Deal - Tour</th>
                                            <th>Ngày đăng</th>
                                            <th>Nguồn</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Ngày assign</th>
                                            <th>Người chuyển</th>
                                            <th>Người phụ trách</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="paging-container">
                    <div class="paging-info"></div>
                    <div class="paging-section">
                        <div class="pagination-custom pd-10">
                        </div>
                    </div>
                </div>
                <!-- /.tab-content -->
            </div>
        </div>
    </div>
</div>
@include('pos.sa.blocks.deal-tour-list-modal')
@include('pos.sa.blocks.listingFeedback')

@include('pos.sa.modals.edit-guaranteed-expired-date')
@include('pos.sa.modals.log-score-card')
<!-- @include('pos.sa.modals.bpo-modal') -->
<!-- @include('pos.sa.modals.bpo-modal-resolve') -->

@if ($isGroupAdmin == true)
@include('pos.blocks.blc-reassign-listing-modal-v2')
@endif

</div>
@endsection
@section('page-js')
<script>
    var isGroupAdmin = <?php echo $isGroupAdmin ? 'true' : 'false'; ?>
</script>
<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>

<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAListingFeedback.js")}}"></script>
<script src="{{ loadAsset("/js/commons/v2-common.js")}}"></script>
<script src="{{ loadAsset("/js/pos/sa/SAIndex.js")}}"></script>
<script type="text/javascript" src="/app/log_score_card.js"></script>
<script type="text/javascript">
    localStorage.setItem('tokenUser', '{{$user->token}}');
    localStorage.setItem('currentUserId', '{{$user->userId}}');
</script>
<noscript>You need to enable JavaScript to run this app.</noscript>
<script src="{{loadAsset('/app/spa/static/js/spa_index.js')}}"></script>
<script src="{{loadAsset('/app/spa/static/js/main.chunk.js')}}"></script>
<script src="{{loadAsset('/js/deal/util-for-deal.js')}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset('/app/spa/static/css/main.chunk.css')}}" rel="stylesheet">
<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/sa/SAIndex.css")}}" rel="stylesheet" type="text/css" />
@stop