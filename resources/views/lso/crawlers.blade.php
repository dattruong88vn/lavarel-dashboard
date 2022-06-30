@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
   <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
   <!-- Permisson -->
   <input type="hidden" id="hiddenEditPerm" value="{{ isset($editPerm) ? $editPerm : '' }}" />
   <!-- Crawlers -->
   <h3 class="box-title">Danh sách chủ tin đăng 
    @if (isset($addPerm) && ($addPerm == 1))
      <button id="create-crawler" class="btn btn-primary">Tạo mới</button>
    @endif
   </h3>
   <div class="row">
      <div class="col-xs-12">
         <div class="box">
            @if (isset($editPerm) && ($editPerm == 1))
            <div class="box-header with-border">
               <div class="row form-group">
                   <div class="col-sm-6">
                     <label class="control-label col-sm-3">Tình trạng</label>
                     <div class="col-sm-4 padding-side-0">
                         <select id="statusId" name="statusId" class="form-control">
                             <option value="">Tất cả</option>
                         </select>
                     </div>
                     <!-- <div class="col-sm-1">
                       <button id="search-crawlers-btn" class="btn btn-primary">Tìm kiếm</button>
                     </div> -->
                   </div>
               </div>
            </div>   
            @endif         
            <div class="box-body">
               <table id="crawlerListings" class="table table-bordered" cellspacing="0">
                  <thead>
                     <tr>
                        <th>Ngày cào</th>
                        <th>Nhân viên cào</th>
                        <th>Tên chủ tin đăng</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Giá</th>
                        <th>Status</th>
                        <!-- <th>Tên LS</th> -->
                        <th>Link</th>
                        <th>LID</th>
                        <th>Note cho nhân viên cào</th>
                        @if (isset($editPerm) && ($editPerm == 1))
                        <th>
                          Note cho LSO
                        </th>
                        <th></th>
                        @endif
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

<!-- Hiển thị crawler duplicated -->
@include('lso.modal-duplicated-crawler')

<!-- Hiển thị chỉnh sửa Note LSO -->
@include('lso.modal-edit-note-lso-crawler')

<!-- Hiển thị Note -->
@include('lso.modal-note-crawler')

<!-- Hiển thị chỉnh sửa số nhà -->
@include('lso.modal-edit-house-number-lso-crawler')

@endsection
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
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
<script src="{{loadAsset("/js/lso/crawlers.js")}}"></script>
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
