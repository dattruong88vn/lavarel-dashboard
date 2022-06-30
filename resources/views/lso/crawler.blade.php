@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
   <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
   <input type="hidden" id="hiddenEditPerm" value="{{ isset($editPerm) ? $editPerm : '' }}" />
   <h3 class="box-title"><a href='/lso/crawlers'><i class="glyphicon glyphicon-arrow-left"></i></a> Thông tin chủ tin đăng</h3>
   <div class="row">
      <div class="col-md-12">
         <form class="form-horizontal" id="myForm" role="form" novalidate="true">
         <!-- Hidden -->
         <input type="hidden" id="hiddenCrawlerId" name="" value="{{ isset($id) ? $id : "" }}">
         <input type="hidden" id="hiddenLoggedInUserId" value="{{$loggedInUser->userId}}" />
         <div class="box box-info">
            <div class="box-header">
               <h3 class="box-title">Thông tin chủ tin đăng</h3>
            </div>
            <div class="box-body">
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Tên chủ tin đăng</label>
                     <div class="col-sm-3">
                        <input id="name" class="form-control" type="text" name="">
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">SĐT <code>(*)</code></label>
                     <div class="col-sm-3">
                        <input id="phone" class="form-control" type="text" name="">
                     </div>
                     <div class="col-sm-1">
                        <button id="check-duplicated-phone-btn" class="btn btn-warning">
                          <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Check
                        </button>
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Email</label>
                     <div class="col-sm-3">
                        <input id="email" class="form-control" type="email" name="">
                     </div>
                     <div class="col-sm-1">
                        <button id="check-duplicated-email-btn" class="btn btn-warning">
                          <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Check
                        </button>
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Địa chỉ tin đăng <code>(*)</code></label>
                        <div class="col-sm-3">
                           <select id="cityId" class="form-control">
                              <option value="1">TP Hồ Chí Minh</option>
                           </select>
                        </div>
                        <label class="control-label col-sm-1">Quận</label>
                        <div class="select-2 col-sm-2">
                           <select id="districtId" class="form-control">
                              <option value="">--Chọn Quận--</option>
                           </select>
                        </div>
                        <label class="control-label col-sm-1">Phường</label>
                        <div class="select-2 col-sm-2">
                           <select id="wardId" class="form-control">
                              <option value="">--Chọn Phường--</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đường</label>
                        <div class="select-2 col-sm-3">
                           <select id="streetId" class="form-control">
                              <option value="">--Chọn Đường--</option>
                           </select>
                        </div>
                        <label class="control-label col-sm-1">Số nhà</label>
                        <div class="select-2 col-sm-2">
                           <input id="houseNumber" type="" name="" class="form-control" value="">
                           <span class="houseNumber-error"></span>
                        </div>
                        <div class="col-sm-1"></div>
                        <div class="col-sm-2">
                           <button id="check-duplicated-btn" class="btn btn-warning">
                             <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Check địa chỉ
                           </button>
                        </div>
                     </div>
                  </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Giá</label>
                     <div class="col-sm-3">
                        <input id="price" type="text" name="" class="form-control">
                     </div>
                  </div>
               </div>
               @if (isset($editPerm) && ($editPerm == 1))
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Tình trạng</label>
                     <div class="select-2 col-sm-3">
                        <select id="statusId" name="statusId" class="form-control">
                         </select>
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Tên LSO</label>
                     <div class="select-2 col-sm-3">
                        <select id="assignedTo" name="createdBy" class="form-control">
                         </select>
                     </div>
                  </div>
               </div>
               @endif
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Link</label>
                     <div class="col-sm-3">
                        <input id="link" class="form-control" type="text" name="">
                     </div>
                  </div>
               </div>
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Note cho nhân viên call</label>
                     <div class="col-sm-10">
                        <textarea id="noteForLs" class="form-control">

                        </textarea>
                     </div>
                  </div>
               </div>
               @if (isset($editPerm) && ($editPerm == 1))
               <div class="row form-group">
                  <div class="col-sm-12">
                     <label class="control-label col-sm-2">Note của LSO</label>
                     <div class="col-sm-10">
                        <textarea id="noteForLso" class="form-control">

                        </textarea>
                     </div>
                  </div>
               </div>
               @endif
               <div class="row form-group">
                  <div class="col-sm-12">
                     <div class="col-sm-2"></div>
                     <div class="col-sm-10 no-print">
                        <button id="create-crawler-btn" class="btn btn-primary" style="margin-left: 5px;"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Lưu</button>
                        <button id="cancel-crawler-btn" class="btn btn-danger"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Hủy</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         </form>
      </div>
   </div>
</div>
<!-- <section id="customerForm"></section>
<div style="position:fixed;bottom:0px;z-index:1000000">
   <button type="button" id="btnShowPaymentRequestForm" class="btn btn-primary">Lưu</button>
   <button type="button" id="btnShowLoanAdviceForm" class="btn btn-primary">Tạo Call Reminder</button>
   <button type="button" id="btnShowCustomerReviewForm" class="btn btn-primary">Tạo Meeting</button>
   <button type="button" id="btnShowCustomerReviewForm" class="btn btn-primary">Tạo Note</button>
   <button type="button" id="btnShowCustomerReviewForm" class="btn btn-primary">Gửi DIY</button>
   <button type="button" id="btnShowCustomerReviewForm" class="btn btn-primary">Sử dụng PS</button>
</div>
<div style="height: 600px;"></div> -->

<!-- Sử dụng PS -->

@endsection
@section('page-js')
<script src="{{loadAsset("/js/common/error_messages.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("bootstrap/js/validator.js")}}"></script>
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
<script src="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script src="{{loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
@if ($tmpDepartmentId == 11)
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
@endif
<script src="{{loadAsset("js/lso/crawler.js") }}"></script>
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
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
