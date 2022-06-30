@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<?php
   // Photos
   $imageList = "";

   // Gcns Photos
   $imageGcnsList = "";
   ?>
<div>
   <nav class="nav-lead img-function">
      <ul class="nav text-center">
         <li class="col-sm-1-8 link-detail">
            <a href="/lso">
               <img src="/images/icon-deal-lead.png" />
               <p>Tin đăng</p>
            </a>
         </li>
         <li class="col-sm-1-8 link-product">
            <a href="#">
               <img src="/images/icon-history.png" />
               <p>Lịch sử hoạt động</p>
            </a>
         </li>
         <li class="col-sm-1-8 link-feedbacks">
            <a href="#" onclick="event.preventDefault(); showPropzyAlert('Tính năng đang được phát triển');">
               <img src="/images/icon-chat-page.png" />
               <p>Phản hồi</p>
            </a>
         </li>
         <li class="col-sm-1-8 link-tour">
            <a href="#" onclick="event.preventDefault(); showPropzyAlert('Tính năng đang được phát triển');">
               <img src="/images/icon-history.png" />
               <p>Lịch sử giao dịch</p>
            </a>
         </li>
      </ul>
   </nav>
   <style>
      .col-sm-1-7{
      float:left;
      width:14%;
      }
      .col-sm-1-8{
      float:left;
      width:12%;
      }
   </style>
</div>
<div class='dashboard'>
   <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
   <h3 class="box-title"><a href='/lso'><i class="glyphicon glyphicon-arrow-left"></i></a> Thông tin chủ tin đăng</h3>
   <div class="row">
      <div class="col-md-12">
         <form class="form-horizontal" id="myForm" role="form" novalidate="true">
            <input type="hidden" id="hiddenLoggedInUserId" value="{{$loggedInUser->userId}}" />
            <input type="hidden" id="hiddenUserToken" value="{{$loggedInUser->token}}" />
            <input type="hidden" id="hiddenBaseApi" value="{{$baseApiLink}}" />
            <div class="box box-info">
               <div class="box-body">
                  <div class="row form-group">
                     <div class="col-sm-4">
                        <label for="inputName" class="col-sm-12 control-label">Tên chủ tin đăng</label>
                        <div class="col-sm-12">
                           <input id="name" type="text" class="form-control" value="" required>
                           <div class="help-block with-errors"></div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <div for="inputPhone" class="col-sm-12">
                           <label class="col-sm-8  control-label padding-side-0">SĐT chủ tin đăng <code>(*)</code></label>
                        </div>
                        <div class="col-sm-12">
                           <div class="col-sm-8 padding-side-0">
                              <input id="phone" type="text" class="form-control" value="" required>
                              <span class="phone-error"></span>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownerphone-btn" value="phone" class="btn btn-warning">Check</button>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <div for="inputPhone" class="col-sm-12">
                           <label class="col-sm-8 control-label padding-side-0">Email chủ tin đăng</label>
                        </div>
                        <div class="col-sm-12">
                           <div class="col-sm-10 padding-side-0">
                              <input id="email" type="text" class="form-control" value="" required>
                              <div class="help-block with-errors"></div>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownermail-btn" value="email" class="btn btn-warning">Check</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-4">
                        <label class="col-sm-12 control-label">Nguồn</label>
                        <div class="select-2 col-sm-12">
                           <select id="sourceTypes" class="form-control" required>
                              <option value="">--Chọn nguồn--</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <!--<div class="row form-group">
                     <div class="col-sm-12 padding-right-0">
                        <button disabled="disabled" class="btn"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> Tạo Call Reminder</button>
                        <button disabled="disabled" id="meeting-popup" class="btn"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Tạo Meeting</button>
                        <button disabled="disabled" class="btn"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Tạo Note</button>
                        <button disabled="disabled" id="unlock-btn" class="btn"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Unlock</button>
                        <button disabled="disabled" id="diy-btn" class="btn"><span class="glyphicon glyphicon-send" aria-hidden="true"></span> Gửi DIY</button>
                        <button disabled="disabled" class="btn"><span class="glyphicon glyphicon-cloud" aria-hidden="true"></span> Sử dụng PS</button>
                        <button disabled="disabled" class="btn"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Profile của chủ nhà</button>
                     </div>
                  </div>-->
               </div>
            </div>
            <div class="box box-info">
               <div class="box-header">
                  <h3 class="box-title">Thông tin Listing</h3>
               </div>
               <div class="box-body">
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại hình giao dịch</label>
                        <div class="select-2 col-sm-3">
                           <select id="propertyTrans" class="form-control">
                              <option value="">--Chọn loại hình--</option>
                           </select>
                           <span class="propertyTrans-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại BĐS</label>
                        <div class="select-2 col-sm-3">
                           <select id="propertyTypes" class="form-control">
                              <option value="">--Chọn BĐS--</option>
                           </select>
                           <span class="propertyTypes-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Địa chỉ tin đăng</label>
                        <div class="col-sm-3">
                           <select id="cityId" class="form-control">
                              <option value="1">TP Hồ Chí Minh</option>
                           </select>
                           <span class="cityId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Quận</label>
                        <div class="select-2 col-sm-2">
                           <select id="districtId" class="form-control">
                              <option value="">--Chọn Quận--</option>
                           </select>
                           <span class="districtId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Phường</label>
                        <div class="select-2 col-sm-2">
                           <select id="wardId" class="form-control">
                              <option value="">--Chọn Phường--</option>
                           </select>
                           <span class="wardId-error"></span>
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
                           <span class="streetId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Số nhà</label>
                        <div class="select-2 col-sm-2">
                           <input id="houseNumber" type="" name="" class="form-control" value="">
                           <span class="houseNumber-error"></span>
                        </div>
                        <div class="col-sm-1"></div>
                        <div class="col-sm-2">
                           <button id="check-duplicated-address" class="btn btn-warning">Check địa chỉ</button>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích đất</label>
                        <div class="col-sm-3">
                           <input id="lotSize" type="text" name="" placeholder="m" class="form-control" value="">
                        </div>
                        <label class="control-label col-sm-1">Dài</label>
                        <div class="col-sm-2">
                           <input id="sizeLength" type="text" name="" placeholder="m" class="form-control" value="">
                        </div>
                        <label class="control-label col-sm-1">Rộng</label>
                        <div class="col-sm-2">
                           <input id="sizeWidth" type="text" name="" placeholder="m" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích sử dụng</label>
                        <div class="col-sm-3">
                           <input id="floorSize" type="text" name="" placeholder="m" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giấy chủ quyền</label>
                        <div class="select-2 col-sm-3">
                           <select id="rightTypes" class="form-control">
                              <option value="">--Chọn giấy chủ quyền--</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giá</label>
                        <div class="col-sm-3">
                           <input id="price" type="text" name="" placeholder="VND" class="form-control" value="">
                           <span class="price-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giá thương lượng tối thiếu</label>
                        <div class="col-sm-3">
                           <input id="minPrice" type="text" name="" placeholder="VND" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hoa hồng</label>
                        <div class="col-sm-3">
                           <input id="commissionText" type="text" name="" class="form-control" value="">
                           <span class="commissionText-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Phòng ngủ</label>
                        <div class="col-sm-3">
                           <input id="bedRooms" type="number" name="" class="form-control" value="">
                           <span class="bedRooms-error"></span>
                        </div>
                        <label class="control-label col-sm-1">WC</label>
                        <div class="col-sm-2">
                           <input id="bathRooms" type="number" name="" class="form-control" value="">
                           <span class="bathRooms-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Số tầng</label>
                        <div class="col-sm-3">
                           <input id="numberFloor" type="number" name="" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Chính diện</label>
                        <div class="col-sm-1 padding-right-0">
                           <input class="position" type="radio" name="position" value="1"> Mặt tiền
                        </div>
                        <div class="mat-tien" style="display: none;">
                           <div class="col-sm-2">Độ rộng mặt tiền</div>
                           <div class="col-sm-1 padding-side-0">
                              <input id="alleyWidth" type="" name="" class="form-control">
                           </div>
                           <div class="col-sm-2 padding-right-0">
                              <input id="haveBeSide-facade" type="checkbox" value="mat-tien"> Bên hông
                           </div>
                           <div id="chi-tiet-mat-tien" class="col-sm-4 padding-side-0" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng mặt tiền</div>
                                 <div class="col-sm-5">
                                    <input id="roadFrontageWidth" type="text" class="form-control" name="">
                                 </div>
                              </div>
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng hẻm</div>
                                 <div class="col-sm-5">
                                    <input id="widthValue" type="text" class="form-control" name="">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-2 padding-right-0">
                           <input class="position" type="radio" name="position" value="2"> Trong hẻm
                        </div>
                        <div class="trong-hem" style="display: none;">
                           <div class="col-sm-1 padding-side-0">Độ rộng hẻm</div>
                           <div class="col-sm-1">
                              <input id="alleyWidth" type="text" name="" class="form-control">
                           </div>
                           <div class="col-sm-2 padding-right-0">
                              <input id="haveBeSide-alley" type="checkbox" value="trong-hem"> Bên hông
                           </div>
                           <div id="chi-tiet-hem" class="col-sm-4 padding-side-0" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng hẻm</div>
                                 <div class="col-sm-5 padding-side-0">
                                    <input id="widthValue" type="text" class="form-control" name="">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đơn giá mặt tiền đường</label>
                        <div class="col-sm-3">
                           <input id="priceStreetFrontage" type="text" name="" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Khoảng cách đến mặt tiền đường</label>
                        <div class="select-2 col-sm-3">
                           <select id="roadFrontage" class="form-control">
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Thời gian tối thiểu thuê HĐ</label>
                        <div class="col-sm-3">
                           <input id="minContractDeadline" type="" name="" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặt cọc</label>
                        <div class="col-sm-3">
                           <input id="depositText" type="text" name="" class="form-control" value="">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Note cho LS</label>
                        <div class="col-sm-10">
                           <textarea id="noteForLs" class="form-control" rows="5"></textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hình ảnh</label>
                        <div class="col-sm-10">
                           <div class="bl-upload-image-list">
                              <ul id="image-list" data-images="{{ $imageList }}">
                                 <li id="add-image-item" class="add-image-item">
                                    <a href="#" class="add-image-button">
                                    <img src="{{loadAsset('/images/diy-slider/t01.png') }}">
                                    </a>
                                 </li>
                                 <li class="add-image-placeholder hidden">
                                    <a type="button" class="remove-image-button">
                                    <i class="fa fa-times"></i>
                                    </a>
                                    <img src="" width="80" height="80" />
                                    <input type="file" name="files[]" accept=".jpg,.jpeg,.gif,.png" class="input-image-placeholder hidden" multiple>
                                 </li>
                              </ul>
                           </div>
                           <span class="image-list-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hình GCN</label>
                        <div class="col-sm-10">
                           <div class="bl-upload-image-list">
                              <ul id="gcn-image-list" data-images="{{ $imageGcnsList }}">
                                 <li id="add-gcn-image-item" class="add-image-item">
                                    <a href="#" class="add-image-button">
                                    <img src="{{loadAsset('/images/diy-slider/t01.png') }}">
                                    </a>
                                 </li>
                                 <li class="add-gcn-image-placeholder hidden">
                                    <a type="button" class="remove-gcn-image-button">
                                    <i class="fa fa-times"></i>
                                    </a>
                                    <img src="" width="80" height="80" />
                                    <input type="file" name="files[]" accept=".jpg,.jpeg,.gif,.png" class="input-gcn-image-placeholder hidden" multiple>
                                 </li>
                              </ul>
                              <span class="gcn-image-list-error"></span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại nhà</label>
                        <div class="select-2 col-sm-3">
                           <select id="houseTypes" name="" class="form-control">
                              <option value="">--Chọn Loại Nhà--</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại công trình</label>
                        <div class="col-sm-10">
                           <span id="constructionTypes"></span>
                        </div>
                     </div>
                  </div>                  
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm tốt</label>
                        <div class="col-sm-7">
                           <span id="advantages"></span>
                           <span class="advantages-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm xấu</label>
                        <div class="col-sm-7">
                           <span id="disadvantages"></span>
                           <span class="disadvantages-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Độc quyền</label>
                        <div class="col-sm-3">
                           <input id="isGuaranteed" type="checkbox" name="" value="1">
                           <span class="isGuaranteed-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Tình trạng</label>
                        <div class="select-2 col-sm-3">
                           <select id="statusId" name="statusId" class="form-control">
                           </select>
                        </div>
                        <label class="control-label col-sm-1"></label>
                        <div class="subStatus select-2 col-sm-2">
                           <select id="subStatusId" class="form-control"  style="display:none;">
                              <option value="">--Tất cả--</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Tên LSO</label>
                        <div class="select-2 col-sm-3">
                           <select id="assignedTo" class="form-control">
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-10 no-print">
                           <button id="create-listing-btn" class="btn btn-primary" style="margin-left: 5px;"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Lưu</button>
                           <!--<button class="btn" disabled="disabled"><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Tạo tin đăng đầy đủ</button>-->
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

@include('lso.modal-popup-image')

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
<script src="{{loadAsset("js/lso/main.js") }}"></script>
<script src="{{loadAsset("js/lso/create.js") }}"></script>
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
