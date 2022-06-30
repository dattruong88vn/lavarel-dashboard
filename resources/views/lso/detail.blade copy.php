@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<?php
   // Photos
   $images = [];
   if (count($listing->photos) > 0) {
      foreach ($listing->photos as $photo) {
         array_push($images, $photo->link);
      }
   }
   $imageList = implode(",", $images);
   
   // Gcns Photos
   $imageGcns = [];
   if (count($listing->photoGcns) > 0) {
      foreach ($listing->photoGcns as $photo) {
         array_push($imageGcns, $photo);
      }
   }
   $imageGcnsList = implode(",", $imageGcns);
   
   // Advantages
   $advantages = [];
   if (count($listing->advantages) > 0) {
      foreach ($listing->advantages as $adv) {
         array_push($advantages, $adv->id->advantageId);
      }
   }
   $advantagesLs = implode(",", $advantages);
   
   // Disadvantages
   $disadvantages = [];
   if (count($listing->disadvantages) > 0) {
      foreach ($listing->disadvantages as $adv) {
         array_push($disadvantages, $adv->id->disAdvantageId);
      }
   }
   $disadvantagesLs = implode(",", $disadvantages);
   
   // Constructions
   // Khung
   $constructFame = "";
   // Mái
   $constructRoof = "";
   // Tường
   $constructWall = "";
   // Sàn
   $constructFloor = "";
   // Trần
   $constructCeil = "";
   
   if (count($listing->constructions) > 0) {
      foreach($listing->constructions as $constructItem) {
         if ($constructItem->id->constructionTypeId == LSO_CONSTRUCT_FAME) {
            $constructFame = $constructItem->id->materialId;
         } else if ($constructItem->id->constructionTypeId == LSO_CONSTRUCT_ROOF) {
            $constructRoof = $constructItem->id->materialId;
         } else if ($constructItem->id->constructionTypeId == LSO_CONSTRUCT_WALL) {
            $constructWall = $constructItem->id->materialId;
         } else if ($constructItem->id->constructionTypeId == LSO_CONSTRUCT_FLOOR) {
            $constructFloor = $constructItem->id->materialId;
         } else if ($constructItem->id->constructionTypeId == LSO_CONSTRUCT_CEIL) {
            $constructCeil = $constructItem->id->materialId;
         }
      }
   }
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
            <a href="/lso/history">
               <img src="/images/icon-product.png" />
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
               <img src="/images/icon-tour.png" />
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
   <!-- LoggedIn User -->
   <input type="hidden" id="hiddenLoggedInUserId" value="{{$loggedInUser->userId}}" />
   <!-- LSO Listing Detail  -->
   <input type="hidden" id="hiddenId" value="{{$listing->id}}" />
   <input type="hidden" id="hiddenOwnerId" value="{{$listing->ownerId}}" />
   <input type="hidden" id="hiddenCityId" value="{{$listing->cityId}}" />
   <input type="hidden" id="hiddenCityId" value="{{$listing->cityId}}" />
   <input type="hidden" id="hiddenDistrictId" value="{{$listing->districtId}}" />
   <input type="hidden" id="hiddenWardId" value="{{$listing->wardId}}" />
   <input type="hidden" id="hiddenStreetId" value="{{$listing->streetId}}" />
   <input type="hidden" id="hiddenListingTypeId" value="{{$listing->listingTypeId}}" />
   <input type="hidden" id="hiddenPropertyTypeId" value="{{$listing->propertyTypeId}}" />
   <!-- Nguồn -->
   <input type="hidden" id="hiddenSourceId" value="{{isset($listing->owner->sourceId) ? $listing->owner->sourceId : ''}}" />
   <!-- Chính diện -->
   <input type="hidden" id="hiddenPosition" value="{{isset($listing->position->position) ? $listing->position->position : ''}}">
   <input type="hidden" id="hiddenWidthValue" value="{{isset($listing->position->widthValue) ? $listing->position->widthValue : ''}}">
   <input type="hidden" id="hiddenHaveBeSide" value="{{isset($listing->position->haveBeSide) ? $listing->position->haveBeSide : ''}}">
   <input type="hidden" id="hiddenRoadFrontageWidth" value="{{isset($listing->position->roadFrontageWidth) ? $listing->position->roadFrontageWidth : ''}}">
   <input type="hidden" id="hiddenAlleyWidth" value="{{isset($listing->position->alleyWidth) ? $listing->position->alleyWidth : ''}}">
   <!-- Khoảng cách mặt tiền đường -->
   <input type="hidden" id="hiddenRoadFrontageDistanceFrom" value="{{isset($listing->roadFrontageDistanceFrom) ? $listing->roadFrontageDistanceFrom : ''}}">
   <input type="hidden" id="hiddenRoadFrontageDistanceTo" value="{{isset($listing->roadFrontageDistanceTo) ? $listing->roadFrontageDistanceTo : ''}}">
   <!-- Đặc điểm tốt -->
   <input type="hidden" id="advantagesLs" name="advantagesLs" value="{{$advantagesLs}}">
   <!-- Đặc điểm xấu -->
   <input type="hidden" id="disadvantagesLs" name="advantagesLs" value="{{$disadvantagesLs}}">
   <!-- Construction -->
   <input type="hidden" id="hiddenConstructFame" name="" value="{{$constructFame}}">
   <input type="hidden" id="hiddenConstructRoof" name="" value="{{$constructRoof}}">
   <input type="hidden" id="hiddenConstructWall" name="" value="{{$constructWall}}">
   <input type="hidden" id="hiddenConstructFloor" name="" value="{{$constructFloor}}">
   <input type="hidden" id="hiddenConstructCeil" name="" value="{{$constructCeil}}">
   <!-- RlistingId -->
   <input type="hidden" id="hiddenRlistingId" name="" value="{{$listing->rlistingId}}">
   <!-- Hiển thị DIY -->
   <input type="hidden" id="hiddenIsSent" name="" value="{{ ($listing->owner->isSent) ? 1 : 0 }}">
   <input type="hidden" id="hiddenIsLocked " name="" value="{{ ($listing->isLocked) ? 1 : 0 }}">
   <!-- Status -->
   <input type="hidden" id="hiddenStatusId" name="" value="{{$listing->statusId}}">
   <input type="hidden" id="hiddenRlistingId" name="" value="{{$listing->rlistingId}}">
   <!--Nha-->
   <input type="hidden" id="hiddenHouseId" value="{{isset($listing->constructions[0]->id->houseTypeId) ? $listing->constructions[0]->id->houseTypeId : ''}}" name="">
   <h3 class="box-title"><a href='/lso'><i class="glyphicon glyphicon-arrow-left"></i></a> Thông tin chủ tin đăng</h3>
   <div class="row">
      <div class="col-md-12">
         <form id="myForm" role="form" novalidate="true">
            <div class="box box-info">
               <div class="box-body">
                  <div class="row form-group">
                     <div class="col-sm-4">
                        <label for="inputName" class="col-sm-12 control-label">Tên chủ tin đăng</label>
                        <div class="col-sm-12">
                           <input id="name" type="text" class="form-control" value="{{$listing->owner->name}}" required>
                           <div class="help-block with-errors"></div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <label for="inputPhone" class="col-sm-12 control-label">SĐT chủ tin đăng</label>
                        <div class="col-sm-12">
                           <div class="col-sm-8 padding-side-0">
                              <input id="phone" type="text" class="form-control" value="{{$listing->owner->phone}}" required>
                              <div class="help-block with-errors"></div>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownerphone-btn" value="phone" class="btn btn-default">Check</button>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <label for="inputPhone" class="col-sm-12 control-label">Email chủ tin đăng</label>
                        <div class="col-sm-12">
                           <div class="col-sm-10 padding-side-0">
                              <input id="email" type="text" class="form-control" value="{{$listing->owner->email}}" required>
                              <div class="help-block with-errors"></div>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownermail-btn" value="email" class="btn btn-default">Check</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-4">
                        <label class="col-sm-12 control-label">Nguồn</label>
                        <div class="select-2 col-sm-12">
                           <select id="sourceTypes" class="form-control" required>
                              <option value="">Chọn nguồn</option>
                           </select>
                        </div>
                     </div>
                     <!-- <div class="col-sm-4">
                        <label class="col-sm-12 control-label">Ghi chú</label>
                        <div class="col-sm-12">
                           <input type="" name="" class="form-control">
                        </div>
                        </div> -->
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12 padding-right-0">
                        <button id="update-owner-btn" class="btn btn-primary">Cập nhật</button>
                        <button class="btn btn-primary" id="reminder-call-btn">Tạo Call Reminder</button>
                        <button id="meeting-popup" class="btn btn-primary">Tạo Meeting</button>
                        <button id="history-popup" class="btn btn-primary">Tạo Note</button>
                        <button id="unlock-btn" class="btn btn-primary">Unlock</button>
                        <button id="diy-btn" class="btn btn-primary">Gửi DIY</button>
                        <button class="btn btn-primary" onclick="event.preventDefault(); showPropzyAlert('Tính năng đang được phát triển');">Sử dụng PS</button>
                        <button class="btn btn-primary" onclick="event.preventDefault(); showPropzyAlert('Tính năng đang được phát triển');">Profile của chủ nhà</button>
                     </div>
                  </div>
               </div>
            </div>
            <div class="box box-info">
               <div class="box-header">
                  <h3 class="box-title">Thông tin Listing</h3>
               </div>
               <div class="box-body">
                  <div class="row form-group">
                     <div class="select-2 col-sm-12">
                        <label class="control-label col-sm-2">Loại hình giao dịch <code>(*)</code></label>
                        <div class="col-sm-3">
                           <select id="propertyTrans" class="form-control">
                              <option value="">Chọn loại hình</option>
                           </select>
                           <span class="propertyTrans-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại BĐS <code>(*)</code></label>
                        <div class="select-2 col-sm-3">
                           <select id="propertyTypes" class="form-control">
                              <option value="">Chọn BĐS</option>
                           </select>
                           <span class="propertyTypes-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Địa chỉ tin đăng <code>(*)</code></label>
                        <div class="col-sm-2">
                           <select id="cityId" class="form-control">
                              <option value="1">TP Hồ Chí Minh</option>
                           </select>
                           <span class="cityId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Quận</label>
                        <div class="col-sm-1 padding-side-0">
                           <select id="districtId" class="form-control">
                           </select>
                           <span class="districtId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Phường</label>
                        <div class="col-sm-1 padding-side-0">
                           <select id="wardId" class="form-control">
                           </select>
                           <span class="wardId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Đường</label>
                        <div class="col-sm-1 padding-side-0">
                           <select id="streetId" class="form-control">
                           </select>
                           <span class="streetId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Số nhà</label>
                        <div class="col-sm-1 padding-side-0">
                           <input id="houseNumber" type="" name="" class="form-control" value="{{$listing->houseNumber}}">
                           <span class="houseNumber-error"></span>
                        </div>
                        <div class="col-sm-1">
                           <button id="check-duplicated-address" class="btn btn-default">Check địa chỉ</button>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Tình trạng</label>
                        <div class="select-2 col-sm-3">
                           <select id="statusId" name="statusId" class="form-control">
                              <option value="">Tất cả</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích đất</label>
                        <div class="col-sm-3">
                           <input id="lotSize" type="text" name="" placeholder="m" class="form-control" value="{{$listing->lotSize}}">
                        </div>
                        <label class="control-label col-sm-1">Dài</label>
                        <div class="col-sm-2 padding-side-0">
                           <input id="sizeLength" type="text" name="" placeholder="m" class="form-control" value="{{$listing->sizeLength}}">
                        </div>
                        <label class="control-label col-sm-1">Rộng</label>
                        <div class="col-sm-2 padding-side-0">
                           <input id="sizeWidth" type="text" name="text" placeholder="m" class="form-control" value="{{$listing->sizeWidth}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích sử dụng</label>
                        <div class="select-2 col-sm-3">
                           <input id="floorSize" type="text" name="" placeholder="m" class="form-control" value="{{$listing->floorSize}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giấy chủ quyền</label>
                        <div class="select-2 col-sm-3">
                           <select id="rightTypes" class="form-control">
                              <option value="">Chọn giấy chủ quyền</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giá <code>(*)</code></label>
                        <div class="col-sm-3">
                           <input id="price" type="text" name="" placeholder="VND" class="form-control" value="{{$listing->price}}">
                           <span class="price-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giá thương lượng tối thiếu</label>
                        <div class="col-sm-3">
                           <input id="minPrice" type="text" name="" placeholder="VND" class="form-control" value="{{$listing->minPrice}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hoa hồng <code>(*)</code></label>
                        <div class="col-sm-3">
                           <input id="commissionText" type="text" name="" class="form-control" value="{{$listing->commissionText}}">
                           <span class="commissionText-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Phòng ngủ <code>(*)</code></label>
                        <div class="col-sm-3">
                           <input id="bedRooms" type="" name="" class="form-control" value="{{$listing->bedRooms}}">
                           <span class="bedRooms-error"></span>
                        </div>
                        <label class="control-label col-sm-1">WC <code>(*)</code></label>
                        <div class="col-sm-2 padding-side-0">
                           <input id="bathRooms" type="" name="" class="form-control" value="{{$listing->bathRooms}}">
                           <span class="bathRooms-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Số tầng</label>
                        <div class="col-sm-3">
                           <input id="numberFloor" type="" name="" class="form-control" value="{{$listing->numberFloor}}">
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
                           <div class="col-sm-1">Độ rộng mặt tiền</div>
                           <div class="col-sm-1 padding-side-0">
                              <input id="alleyWidth" type="" name="" class="form-control">
                           </div>
                           <div class="col-sm-1 padding-right-0">
                              <input id="haveBeSide-facade" type="checkbox" value="mat-tien"> Bên hông
                           </div>
                           <div id="chi-tiet-mat-tien" class="col-sm-5" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-4 padding-rigt-0">Độ rộng mặt tiền</div>
                                 <div class="col-sm-5">
                                    <input id="roadFrontageWidth" type="text" class="form-control" name="">
                                 </div>
                              </div>
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-4 padding-right-0">Độ rộng hẻm</div>
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
                        <div class="col-sm-1 padding-right-0">
                           <input class="position" type="radio" name="position" value="2"> Trong hẻm
                        </div>
                        <div class="trong-hem" style="display: none;">
                           <div class="col-sm-1">Độ rộng hẻm</div>
                           <div class="col-sm-1 padding-side-0">
                              <input id="alleyWidth" type="text" name="" class="form-control">
                           </div>
                           <div class="col-sm-1 padding-right-0">
                              <input id="haveBeSide-alley" type="checkbox" value="trong-hem"> Bên hông
                           </div>
                           <div id="chi-tiet-hem" class="col-sm-5" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-4 padding-right-0">Độ rộng hẻm</div>
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
                        <label class="control-label col-sm-2">Khoảng cách đến mặt tiền đường</label>
                        <div class="select-2 col-sm-3 padding-right-0">
                           <select id="roadFrontage" class="form-control">
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Thời gian tối thiểu thuê HĐ</label>
                        <div class="col-sm-3">
                           <input id="minContractDeadline" type="" name="" class="form-control" value="{{$listing->minContractDeadline}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặt cọc</label>
                        <div class="col-sm-3">
                           <input id="depositText" type="" name="" class="form-control" value="{{$listing->depositText}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Note cho LS</label>
                        <div class="col-sm-10">
                           <textarea id="noteForLs">
                           {{$listing->noteForLs}}
                           </textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hình ảnh <code>(*)</code></label>
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
                        <label class="control-label col-sm-2">Hình GCN <code>(*)</code></label>
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
                        <div class="select-2 col-sm-2">
                           <select id="houseTypes" name="" class="form-control">
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại công trình</label>
                        <div class="col-sm-2">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-1"></div>
                        <label class="control-label col-sm-1">Khung</label>
                        <div class="col-sm-2">
                           <span id="construct-frame"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-1"></div>
                        <label class="control-label col-sm-1">Mái</label>
                        <div class="select-2 col-sm-2">
                           <select id="construct-roof" class="form-control">
                              <option value="">Chọn mái</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-1"></div>
                        <label class="control-label col-sm-1">Tường</label>
                        <div class="select-2 col-sm-2">
                           <select id="construct-wall" name="" class="form-control">
                              <option value="">Chọn tường</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-1"></div>
                        <label class="control-label col-sm-1">Sàn</label>
                        <div class="select-2 col-sm-2">
                           <select id="construct-floor" name="" class="form-control">
                              <option value="">Chọn sàn</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-1"></div>
                        <label class="control-label col-sm-1">Trần</label>
                        <div class="select-2 col-sm-2">
                           <select id="construct-ceil" name="" class="form-control">
                              <option value="">Chọn trần</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm tốt <code>(*)</code></label>
                        <div class="col-sm-7">
                           <span id="advantages"></span>
                           <span class="advantages-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm xấu <code>(*)</code></label>
                        <div class="col-sm-7">
                           <span id="disadvantages"></span>
                           <span class="disadvantages-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Độc quyền <code>(*)</code></label>
                        <div class="col-sm-2">
                           <input id="isGuaranteed" type="checkbox" {{ ($listing->isGuaranteed) ? "checked" : "" }} name="" value="1">
                           <span class="isGuaranteed-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-10 no-print">
                           <button type="submit" id="update-listing-btn" class="btn btn-primary" style="margin-left: 5px;">Cập nhật</button>
                           <button id="create-listing-btn" class="btn btn-primary" style="margin-left: 5px;">Tạo tin đăng đầy đủ</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   </div>
</div>
@include('lso.modal-meeting')
@include('lso.modal-history')
@include('lso.modal-reminder')
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
<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
<script src="{{loadAsset("js/lso/main.js") }}"></script>
<script src="{{loadAsset("js/lso/detail.js") }}"></script>
<script src="{{loadAsset("js/lso/meeting.js") }}"></script>
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
