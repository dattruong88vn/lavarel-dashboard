@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
   <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
   <h3 class="box-title">LSO Dashboard</h3>
   <div class="row">
      <div class="col-xs-12">
         <div class="box">
            <div class="box-header with-border">
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-4">Tình trạng</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select id="statusId" name="statusId" class="form-control">
                             <option value="">Tất cả</option>
                         </select>
                     </div>
                     @if (isset($addPerm) && ($addPerm == 1))
                     <div class="col-sm-1">
                       <button id="create-listing-btn" class="btn btn-primary">Tạo mới</button>
                     </div>
                     @endif
                   </div>
                   <div class="col-sm-1 padding-right-0">
                       <label class="control-label">Tên chủ nhà</label>
                   </div>
                   <div class="col-sm-3">
                       <input id="name" type="text" class="form-control" name="" placeholder="tên chủ nhà">
                   </div>
               </div>
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-4">Nguồn chủ nhà</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select id="sourceId" name="sourceId" class="form-control">
                             <option value="">Tất cả</option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-1 padding-right-0">
                       <label class="control-label">SDT</label>
                   </div>
                   <div class="col-sm-3">
                       <input id="phone" type="text" class="form-control" name="" placeholder="Số điện thoại">
                   </div>
                   <div class="col-sm-1">
                       <button id="search-listing-action" class="btn btn-warning"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Tìm kiếm</button>
                   </div>
               </div>
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-4">Nguồn tin đăng</label>
                     <div class="col-sm-4 padding-side-0 select-2">
                         <select id="lsoSourceId" name="lsoSourceId" class="form-control">
                             <option value="">Tất cả</option>
                         </select>
                     </div>
                   </div>
                   <div class="col-sm-1 padding-right-0">
                       <label class="control-label">Địa chỉ</label>
                   </div>
                   <div class="col-sm-3">
                       <input id="address" type="text" class="form-control" name="" placeholder="Địa chỉ">
                   </div>
               </div>
            </div>
            <div class="box-body">
               <table id="lsoListing" class="table table-bordered" cellspacing="0">
                  <thead>
                     <tr>
                        <th><i class="fa fa-home" aria-hidden="true"></i> Mã CN</th>
                        <th><i class="fa fa-user" aria-hidden="true"></i> Tên chủ nhà - <i class="fa fa-phone-square" aria-hidden="true"></i> SDT</th>
                        <th><i class="fa fa-address-card" aria-hidden="true"></i> Địa chỉ</th>
                        <th><i class="fa fa-rss" aria-hidden="true"></i> Nguồn CN</th>
                        <th><i class="fa fa-rss" aria-hidden="true"></i> Nguồn TD</th>
                        <th><i class="fa fa-info-circle" aria-hidden="true"></i> Status</th>
                        <th><i class="fa fa-user" aria-hidden="true"></i> Tên LSO</th>
                        <th><i class="fa fa-location-arrow" aria-hidden="true"></i> Status (DIY)</th>
                        <th><i class="fa fa-calendar" aria-hidden="true"></i> Ngày tạo</th>
                        <th><i class="fa fa-calendar" aria-hidden="true"></i> Ngày cập nhật</th>
                        <th><i class="fa fa-map-marker" aria-hidden="true"></i> Quận</th>
                        <th><i class="fa fa-money" aria-hidden="true"></i> Giá</th>
                        <th><i class="fa fa-map-pin" aria-hidden="true"></i> LID</th>
                        <th><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Thao tác</th>
                     </tr>
                  </thead>
                  <tbody>
                  </tbody>
               </table>
            </div>
            <!-- /.box-body -->
         </div>
         <!-- /.box -->
      </div>
      <!-- /.col -->
   </div>
   <!-- /.row -->
</div>
@include('lso.modal-duplicated-crawler')
@include('lso.modal-reassign')
@endsection
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="{{loadAsset("/plugins/momentjs/moment.min.js") }}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<!--<script src="{{loadAsset("/js/dashboard.js")}}"></script>-->
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/jssor.slider-22.1.9.min.js")}}"></script>
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
@if ($tmpDepartmentId == 11)
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
@endif
<script src="{{loadAsset("/js/lso/main.js")}}"></script>
<script src="{{loadAsset("/js/lso/list.js")}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<style>
   .isGuaranteed td{
   background: #d2eaac
   }
</style>
@stop
