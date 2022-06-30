<?php

use App\Libraries\UserAuth; ?>
<?php
$isGroupAdmin = false;
/* if (
  UserAuth::hasPermission($currentUser, UserAuth::ENTITY_POS_PRESCREEN, UserAuth::ACTION_LIST)
  && (UserAuth::hasPermission($currentUser, UserAuth::ENTITY_POS_PRESCREEN, UserAuth::ACTION_ASSIGN,  UserAuth::PERMISSION_ALL_OPEN) || UserAuth::hasPermission($currentUser, UserAuth::ENTITY_POS_PRESCREEN, UserAuth::ACTION_ASSIGN,  UserAuth::PERMISSION_PERSONAL_AND_DEPARTMENT))
) {
  $isGroupAdmin = true;
} */

if (UserAuth::checkIsGroupAdminonType($currentUser->departments, ["ZONE", "GROUP", "DEPARTMENT"])) {
  $isGroupAdmin = true;
}
?>
@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
  <h3 class="box-title" style="margin-top: 0;">Lọc dữ liệu</h3>
  <!-- Serch and filter -->
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-info">
        <div class="box-body">
          <div class="row" id="form-filter">
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
                <!-- -->
                <div class="col-md-3">
                  <input type="text" class="form-control" id="id-listing" placeholder="Id">
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="owner-name" placeholder="Chủ tin đăng">
                </div>

              </div>
              <div class="row form-group">
                <div class="col-md-3">
                  <select id="zoneField" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="teamField" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="districtId" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="wardId" class="form-control"></select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3">
                  <select id="departmentField" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="memberField" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="address" placeholder="Địa chỉ">
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="phone" placeholder="Số điện thoại">
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3">
                  <select id="sourceId" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="tcId" class="form-control" multiple="multiple"></select>
                </div>
                <div class="col-md-3">
                  <select id="infoChannel" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="infoChannelChild" class="form-control"></select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-3">
                  <select id="listingTypeId" class="form-control"></select>
                </div>
                <div class="col-md-3">
                  <select id="propertyTypeIds" class="form-control" multiple="multiple"></select>
                </div>
                <?php if ($isGroupAdmin) { ?>
                  <!-- <div class="col-md-3">
                    <select id="assignedToList" multiple="multiple" class="form-control"></select>
                  </div>
                  <div class="col-md-3">
                    <label class="checkbox control-label" style="padding-left: 0">
                      <input id="notAssigned" type="checkbox" value="0">
                      <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Không Nhân viên phụ trách
                    </label>
                  </div> -->
                <?php } else { ?>
                  <div class="col-md-3">
                    <input type="text" class="form-control" id="land-code" placeholder="Số Thửa" style="display: none">
                  </div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" id="map-code" placeholder="Tờ bản đồ" style="display: none">
                  </div>
                <?php } ?>
              </div>
              <div class="row form-group">
                <?php if ($isGroupAdmin) { ?>
                  <div class="col-md-3">
                    <input type="text" class="form-control" id="land-code" placeholder="Số Thửa" style="display: none">
                  </div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" id="map-code" placeholder="Tờ bản đồ" style="display: none">
                  </div>
                  <div class="col-md-6 text-right">
                    <button id="search" type="button" class="btn btn-primary">Lọc dữ liệu</button>
                    <button id="clearSearching" type="button" class="btn btn-default">Xóa</button>
                  </div>
                <?php } else { ?>
                  <div class="col-md-12 text-right">
                    <button id="search" type="button" class="btn btn-primary">Lọc dữ liệu</button>
                    <button id="clearSearching" type="button" class="btn btn-default">Xóa</button>
                  </div>
                <?php } ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3 class="box-title" style="margin-top: 0;">Quản Lý</h3>
  <div class="row">
    <div class="col-xs-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a id="need-to-call-listing-id" href="#need-to-call-listing" data-toggle="tab" aria-expanded="true">Tin đăng cần gọi</a>
          </li>
          <li class="">
            <a id="called-listing-id" href="#called-listing" data-toggle="tab" aria-expanded="false">Tin đăng đã gọi</a>
          </li>
          <li class="">
            <a id="diy-listing-id" href="#diy-listing" data-toggle="tab" aria-expanded="false">Cập nhật từ Diy</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="need-to-call-listing">
            @include('pos.prescreener.blocks.blc-need-to-call-listing', ['isGroupAdmin'=>$isGroupAdmin])
          </div>
          <!-- /.tab-pane -->
          <div class="tab-pane" id="called-listing">
            @include('pos.prescreener.blocks.blc-called-listing', ['isGroupAdmin'=>$isGroupAdmin])
          </div>
          <div class="tab-pane" id="diy-listing">
            @include('pos.prescreener.blocks.blc-diy-listing')
          </div>
          <!-- /.tab-pane -->
        </div>
        <!-- /.tab-content -->
      </div>
    </div>
  </div>
</div>
@include('pos.blocks.blc-show-note-reminder-model')
@include('pos.prescreener.blocks.blc-show-reasion-cancel-model')
@if ($isGroupAdmin)
@include('pos.blocks.blc-reassign-listing-modal-v2')
@endif
@endsection
@section('page-js')
<script>
  var isGroupAdmin = <?php echo $isGroupAdmin ? 'true' : 'false'; ?>
</script>
<script src="{{ loadAsset("/js/common/error_messages.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>

<script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
<script src="{{ loadAsset("/js/commons/common.js")}}"></script>
<script src="{{ loadAsset("/js/pos/prescreener/index.js")}}"></script>
@stop
@section('page-css')
<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css" />
<style>
  .never {
    display: none !important;
  }

  #called-listing-overview ul {
    padding-left: 0;
  }

  #called-listing-overview ul li {
    display: inline-block;
  }

  #called-listing-overview ul li+li {
    padding-left: 20px;
  }

  td.reassign-wrapper,
  th.selectAll-wrapper {
    text-align: center;
    width: 30px;
    max-width: 30px;
  }

  th.selectAll-wrapper {
    /*position: relative;*/
  }

  th.selectAll-wrapper input.selectAll {
    /*margin-top: 0;*/
    /*position: absolute;*/
    /*top: 10px;*/
    /*left: 16px;*/
  }
</style>
@stop