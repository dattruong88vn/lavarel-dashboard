@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<?php
   // Photos
   $images['link'] = $images['source'] = $images['caption'] = [];
   if (count($listing->photos) > 0) {
      foreach ($listing->photos as $photo) {
         array_push($images['link'], $photo->link);
         array_push($images['source'], $photo->source);
         array_push($images['caption'], $photo->caption);
      }
   }
   $imageList = implode(",", $images['link']);
   $imageSourceList = implode(",", $images['source']);
   $imageCaptionList = implode(",", $images['caption']);

   // Gcns Photos
   $imageGcns['link'] = $imageGcns['source'] = $imageGcns['caption'] = [];
   if (count($listing->photoGcns) > 0) {
      foreach ($listing->photoGcns as $photo) {
         array_push($imageGcns['link'], $photo->link);
         array_push($imageGcns['source'], $photo->source);
         array_push($imageGcns['caption'], $photo->caption);
      }
   }
   $imageGcnsList = implode(",", $imageGcns['link']);
   $imageGcnsSourceList = implode(",", $imageGcns['source']);
   $imageGcnsCaptionList = implode(",", $imageGcns['caption']);

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

   // Lưu lý do cho trường hợp [Đã bán] [Đã thuê]
   $lsoReasons = [];
   $lsoReasonsTxt = "";
   if (isset($listing->diyStop->reasons) && count($listing->diyStop->reasons) > 0) {
     foreach($listing->diyStop->reasons as $reasonIter) {
       array_push($lsoReasons, $reasonIter->reasonId);
     }
   }
   $lsoReasonsTxt = implode(",", $lsoReasons);

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
         <li class="col-sm-1-8 link-tour">
            <a href="/lso">
               <img src="/images/icon-deal-lead.png" />
               <p>Tin đăng</p>
            </a>
         </li>
         <li class="col-sm-1-8 link-tour">
            <a href="/lso/history/{{$listing->id}}">
               <img src="/images/icon-history.png" />
               <p>Lịch sử hoạt động</p>
            </a>
         </li>
         <li class="col-sm-1-8 link-tour">
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
         <li class="col-sm-1-8 link-tour">
            <a href="#" onclick="showModalOwnerPosts();">
               <img src="/images/icon-product.png" />
               <p>Tin đăng của chủ nhà</p>
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
   <input type="hidden" id="hiddenUserToken" value="{{$loggedInUser->token}}" />
   <input type="hidden" id="hiddenBaseApi" value="{{$baseApiLink}}" />
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
   <input type="hidden" id="hiddenAssignedTo" value="{{$listing->assignedTo}}">
   <!-- Nguồn -->
   <input type="hidden" id="hiddenSourceId" value="{{isset($listing->owner->sourceId) ? $listing->owner->sourceId : ''}}" />
   <input type="hidden" id="hiddenSourceListingId" value="{{isset($listing->sourceId) ? $listing->sourceId : $listing->owner->sourceId}}" />
   <!-- Chính diện -->
   <input type="hidden" id="hiddenPosition" value="{{isset($listing->position->position) ? $listing->position->position : ''}}">
   <input type="hidden" id="hiddenWidthValue" value="{{isset($listing->position->widthValue) ? $listing->position->widthValue : ''}}">
   <input type="hidden" id="hiddenHaveBeSide" value="{{isset($listing->position->haveBeSide) ? $listing->position->haveBeSide : ''}}">
   <input type="hidden" id="hiddenRoadFrontageWidth" value="{{isset($listing->position->roadFrontageWidth) ? $listing->position->roadFrontageWidth : ''}}">
   <input type="hidden" id="hiddenAlleyWidth" value="{{isset($listing->position->alleyWidth) ? $listing->position->alleyWidth : ''}}">
   <input type="hidden" id="hiddenWidthFrontWay" value="{{ isset($listing->position->widthFrontWay) ? $listing->position->widthFrontWay : '' }}">
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
   <!-- diyStatusId -->
   <input type="hidden" id="hiddenDiyStatusId" name="" value="{{isset($listing->diyStatusId) ? $listing->diyStatusId : ''}}">   
   <!-- Tình trạng tin đăng -->
   <input type="hidden" id="hiddenRlistingStatusId" name="" value="{{$listing->rListingStatusId}}">
   <!-- Hiển thị DIY -->
   <input type="hidden" id="hiddenIsSent" name="" value="{{ ($listing->owner->isSent) ? 1 : 0 }}">
   <input type="hidden" id="hiddenIsLocked " name="" value="{{ ($listing->isLocked) ? 1 : 0 }}">
   <!-- Status -->
   <input type="hidden" id="hiddenStatusId" name="" value="{{$listing->statusId}}">
   <input type="hidden" id="hiddenUseRightTypeId" value="{{$listing->useRightTypeId}}">
   <!-- Lý do ngưng -->
   <input type="hidden" id="hiddenDiyStopReason" value="{{ isset($listing->diyStop->reason) ? $listing->diyStop->reason : "" }}" />
   <!-- DIY Result -->
   <input type="hidden" id="hiddenLsoReasons" value="{{ $lsoReasonsTxt }}" />
   <input type="hidden" id="hiddenDiyStatusId" value="{{ isset($listing->diyStop->statusId) ? $listing->diyStop->statusId : "" }}" />
   <input type="hidden" id="hiddenContractFrom" value="{{ isset($listing->diyStop->contractFrom) ? $listing->diyStop->contractFrom : "" }}" name="">
   <input type="hidden" id="hiddenContractTo" value="{{ isset($listing->diyStop->contractTo) ? $listing->diyStop->contractTo : "" }}" name="">
   <input type="hidden" id="hiddenSoldDate" value="{{ isset($listing->diyStop->soldDate) ? $listing->diyStop->soldDate : "" }}" name="">
   <input type="hidden" id="hiddenPrice" value="{{ isset($listing->diyStop->price) ? $listing->diyStop->price : "" }}" name="">
   <!--Nha-->
   <input type="hidden" id="hiddenHouseId" value="{{isset($listing->constructions[0]->id->houseTypeId) ? $listing->constructions[0]->id->houseTypeId : ''}}" name="">
   <input type="hidden" id="hiddenConstructionTypeId" value="{{isset($listing->constructions[0]->id->constructionTypeId) ? $listing->constructions[0]->id->constructionTypeId : ''}}" name="">
   <!-- Thẩm định -->
   <input type="hidden" id="hiddenPriceValuation" value="{{ (isset($listing->priceValuation) && !empty($listing->priceValuation)) ? $listing->priceValuation : '' }}">
   <input type="hidden" id="hiddenValuationType" value="{{ (isset($listing->valuationType) && !empty($listing->valuationType)) ? $listing->valuationType : '' }}">

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
                        <div for="inputPhone" class="col-sm-12">
                           <label class="col-sm-8 control-label padding-side-0">SĐT chủ tin đăng <span class="phoneError"><code>(*)</code></span></label>
                        </div>
                        <div class="col-sm-12">
                           <div class="col-sm-8 padding-side-0">
                              <input id="phone" type="text" class="form-control" value="{{$listing->owner->phone}}" required>
                              <span class="phone-error"></span>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownerphone-btn" value="phone" class="btn btn-warning">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Check
                              </button>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-4">
                        <div for="inputPhone" class="col-sm-12">
                           <label class="col-sm-8 control-label padding-side-0">Email chủ tin đăng</label>
                        </div>
                        <div class="col-sm-12">
                           <div class="col-sm-10 padding-side-0">
                              <input id="email" type="text" class="form-control" value="{{$listing->owner->email}}" required>
                              <div class="help-block with-errors"></div>
                           </div>
                           <div class="col-sm-2">
                              <button id="check-ownermail-btn" value="email" class="btn btn-warning">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Check
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-4">
                        <label class="col-sm-12 control-label">Nguồn chủ nhà</label>
                        <div class="select-2 col-sm-12">
                           <select id="sourceTypes" class="form-control" disabled>
                              <option value="">Chọn nguồn</option>
                           </select>
                        </div>
                     </div>                     
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12 padding-right-0">
                        <button id="update-owner-btn" class="btn btn-primary"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Cập nhật</button>
                        <button class="btn btn-primary" id="reminder-call-btn"><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> Tạo Reminder</button>
                        <button id="meeting-popup" class="btn btn-primary"><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> Meeting</button>
                        <button id="history-popup" class="btn btn-primary"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Note</button>
                        <button id="unlock-btn" class="btn btn-primary"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Unlock</button>
                        <button id="diy-btn" class="btn btn-primary"><span class="glyphicon glyphicon-send" aria-hidden="true"></span> Gửi DIY</button>
                        <button id="ps-btn" class="btn btn-primary"><span class="glyphicon glyphicon-cloud" aria-hidden="true"></span> Sử dụng PS</button>
                        <span class="badge ps-total-count badge-notify" style="display:none;">3</span>
                        <button id="profile-btn" class="btn btn-primary"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Profile chủ nhà</button>
                        <button id="resend-btn" class="btn btn-primary"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Gửi lại TK</button>
                        @if (isset($listing->rlistingId) && is_numeric($listing->rlistingId))
                          <button id="request-internal-btn" class="btn btn-primary"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Note nội bộ</button>
                        @endif
                     </div>
                  </div>
               </div>
            </div>
            <div class="box box-info">
               <div class="box-header">
                  <h3 class="box-title text-danger">Thông tin từ DIY</h3>
               </div>
               <div class="box-body">
                  @if (isset($listing->newPrice) && !empty($listing->newPrice))
                  <input type="hidden" id="newPrice" value="{{$listing->newPrice}}">
                  <div class="row form-group has-error">
                     <div class="select-2 col-sm-12">
                        <label class="control-label col-sm-2">Giá yêu cầu chỉnh sửa</label>
                        <div class="col-sm-10">
                           {{ isset($listing->newPrice) ? number_format($listing->newPrice) : "" }}
                        </div>
                     </div>
                  </div>
                  @endif
                  @if (isset($listing->diyStop->statusId) || isset($listing->diyStatusName))
                  <input type="hidden" id="diyStatusName" value="{{$listing->diyStatusName}}">
                  <div class="row form-group has-error">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Trạng thái</label>
                        <div class="col-sm-10">
                          @php $lsoReason = ""; @endphp
                          @if (isset($listing->diyRequestLive) && !$listing->diyRequestLive)
                            @if (isset($listing->diyStop->statusId) && $listing->diyStop->statusId == 9)
                              {{ !empty($listing->diyStatusName) ? $listing->diyStatusName : "" }}
                            @elseif (isset($listing->diyStop->statusId) && $listing->diyStop->statusId == 7)
                              @if (isset($listing->diyStop->reasons))                                
                                @foreach($listing->diyStop->reasons as $reason)
                                  @php $lsoReason .= \Config::get('constant.lsoStatuses')[$reason->reasonId] . ","; @endphp
                                @endforeach
                              @php $lsoReason = rtrim($lsoReason, ','); @endphp
                              {{ "Tin đăng đã được cho thuê từ chủ nhà (Lý do: " . $lsoReason . ")"}}
                              @endif
                            @elseif (isset($listing->diyStop->statusId) && $listing->diyStop->statusId == 8)
                              @if (isset($listing->diyStop->reasons))
                                @foreach($listing->diyStop->reasons as $reason)
                                    @php $lsoReason .= \Config::get('constant.lsoStatuses')[$reason->reasonId] . ","; @endphp
                                  @endforeach
                                @php $lsoReason = rtrim($lsoReason, ',') @endphp
                                {{ "Tin đăng đã được bán từ chủ nhà (Lý do: " .  $lsoReason  . ")"}}
                              @endif
                            @else
                              {{ !empty($listing->diyStatusName) ? $listing->diyStatusName : "" }}
                            @endif
                          @else
                            {{ !empty($listing->diyStatusName) ? $listing->diyStatusName : "" }}
                          @endif
                        </div>                        
                     </div>
                  </div>
                  @endif
                  @if ($listing->diyRequestLive !== null)
                  <input type="hidden" id="diyRequestLive" value="{{$listing->diyRequestLive}}">
                  <div class="row form-group has-error">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Yêu cầu</label>
                        <div class="col-sm-10">
                          @if (isset($listing->diyStop) && !empty($listing->diyStop))
                            @if (!$listing->diyRequestLive && $listing->diyStop->statusId == 9)
                              {{ "Chủ nhà yêu cầu ngưng tin đăng (Lý do: " . $listing->diyStop->reason . ")"}}
                            @else
                              {{ "N/A" }}
                            @endif
                          @else
                            @if ($listing->diyRequestLive)
                              {{ "Chủ nhà yêu cầu mở bán lại" }}                            
                            @else
                              {{ "N/A" }}
                            @endif
                          @endif
                        </div>
                     </div>
                  </div>
                  @endif
                  @if (isset($listing->diyRequestEdit) && !empty($listing->diyRequestEdit))
                  <input type="hidden" id="diyRequestEdit" value="{{$listing->diyRequestEdit}}">
                  <div class="row form-group has-error">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Yêu cầu chỉnh sửa DIY</label>
                        <div class="col-sm-5">
                           {{ isset($listing->diyRequestEdit) ? $listing->diyRequestEdit : "" }}
                        </div>
                        <div class="col-sm-3">
                           <input id="isDoneForDiy" type="checkbox" value="1"> Đã chỉnh sửa
                        </div>
                     </div>
                  </div>
                  @endif
               </div>
            </div>
            @if (isset($listing->services) && !empty($listing->services))
            <div class="box box-info">
               <div class="box-header">
                  <h3 class="box-title text-danger">Dịch vụ khách hàng</h3>
               </div>
               <div class="box-body">
                  <div class="col-sm-12">                
                     @foreach ($listing->services as $service)
                        <p>{{ " - " . $service->serviceName }}</p>
                     @endforeach
                  </div>
               </div>
            </div>
            @endif
            <div class="box box-info">
               <div class="box-header">
                  <div class="col-sm-3">
                     <h3 class="box-title">Thông tin Listing</h3>
                  </div>
                  <div class="col-sm-2">
                     @if (isset($listing->valuationType) && !empty($listing->valuationType))
                     <label>Loại <span id="classify">{{ (isset($listing->valuationType) && !empty($listing->valuationType)) ? $listing->valuationType : "" }}</span></label>
                     @endif
                  </div>
                  <div class="col-sm-3">
                     @if (isset($listing->valuationPriceFormat) && !empty($listing->valuationPriceFormat))
                     <label>Giá Propzy thẩm định: <span id="priceValuationFormat">{{ (isset($listing->
                        valuationPriceFormat) && !empty($listing->
                        valuationPriceFormat)) ? $listing->
                     valuationPriceFormat : "" }}</span></label>
                     @endif
                  </div>
               </div>
               <div class="box-body">
                  <div class="row form-group">
                     <div class="select-2 col-sm-12">
                        <label class="control-label col-sm-2">Nguồn tin đăng</label>
                        <div class="col-sm-3">
                           <select id="sourceTypesListing" name="sourceTypesListing" class="form-control">
                              <option value="">--Chọn loại hình--</option>
                           </select>                           
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="select-2 col-sm-12">
                        <label class="control-label col-sm-2">Loại hình giao dịch <code>(*)</code></label>
                        <div class="col-sm-3">
                           <select id="propertyTrans" name="propertyTrans" class="form-control">
                              <option value="">--Chọn loại hình--</option>
                           </select>
                           <span class="propertyTrans-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại BĐS <code>(*)</code></label>
                        <div class="select-2 col-sm-3">
                           <select id="propertyTypes" name="propertyTypes" class="form-control">
                              <option value="">--Chọn BĐS--</option>
                           </select>
                           <span class="propertyTypes-error"></span>
                        </div>
                     </div>
                  </div>
                  @if (isset($listing->address) && !empty($listing->address))
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Địa chỉ đầy đủ</label>
                        <div class="col-sm-10">
                           {{ $listing->address }}
                        </div>
                     </div>
                  </div>
                  @endif
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Địa chỉ tin đăng <span class="cityIdError" style="display: none"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <select id="cityId" class="form-control">
                              <option value="1">TP Hồ Chí Minh</option>
                           </select>
                           <span class="cityId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Quận</label>
                        <div class="select-2 col-sm-2">
                           <select id="districtId" name="districtId" class="form-control">
                              <option value="">--Chọn Quận--</option>
                           </select>
                           <span class="districtId-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Phường</label>
                        <div class="select-2 col-sm-2">
                           <select id="wardId" name="wardId" class="form-control">
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
                           <select id="streetId" name="streetId" class="form-control">
                              <option value="">--Chọn Đường--</option>
                           </select>                           
                           <span class="streetId-error"></span>
                        </div>
                        <div class="col-sm-2">
                           <button id="createStreet" type="button" class="btn btn-primary btn-circle"><i class="glyphicon glyphicon-plus"></i></button>
                        </div>                        
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Số nhà</label>
                        <div class="select-2 col-sm-3">
                           <input id="houseNumber" type="text" name="houseNumber" class="form-control" value="{{$listing->houseNumber}}">
                           <span class="houseNumber-error"></span>
                        </div>
                        <div class="col-sm-2">
                           <button id="check-duplicated-address"  class="btn btn-warning" ><span class="glyphicon glyphicon-search" aria-hidden="true"></span> Kiểm Tra Địa Chỉ</button>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích đất <span class="lotSizeError" style="display: none;"><code>(*)</code></label></span>
                        <div class="col-sm-3">
                           <input id="lotSize" type="number" name="" placeholder="m" class="form-control" value="{{$listing->lotSize}}">
                           <span class="lotSize-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Dài <span class="sizeLengthError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-2">
                           <input id="sizeLength" type="number" name="" placeholder="m" class="form-control" value="{{$listing->sizeLength}}">
                           <span class="sizeLength-error"></span>
                        </div>
                        <label class="control-label col-sm-1">Rộng <span class="sizeWidthError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-2">
                           <input id="sizeWidth" type="number" name="text" placeholder="m" class="form-control" value="{{$listing->sizeWidth}}">
                           <span class="sizeWidth-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Diện tích sử dụng <span class="floorSizeError" style="display: none;"><code>(*)</code></span></label>
                        <div class="select-2 col-sm-3">
                           <input id="floorSize" type="number" name="" placeholder="m" class="form-control" value="{{$listing->floorSize}}">
                           <span class="floorSize-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giấy chủ quyền <span class="rightTypes-required" style="display: none;"><code>(*)</code></span></label>
                        <div class="select-2 col-sm-3">
                           <select id="rightTypes" name="rightTypes" class="form-control">
                              <option value="">--Chọn giấy chủ quyền--</option>
                           </select>
                           <span class="rightTypes-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Giá <span class="priceError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <input id="price" type="text" name="price" placeholder="VND" class="form-control" value="{{$listing->price}}">
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
                        <label class="control-label col-sm-2">Hoa hồng <span class="commissionTextError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <input id="commissionText" type="text" name="commissionText" class="form-control" value="{{$listing->commissionText}}">
                           <span class="commissionText-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Phòng ngủ <span class="bedRooms-required" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <input id="bedRooms" type="number" min="0" name="bedRooms" class="form-control" value="{{$listing->bedRooms}}">
                           <span class="bedRooms-error"></span>
                        </div>
                        <label class="control-label col-sm-1">WC <span class="bathRooms-required" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-2">
                           <input id="bathRooms" type="number" min="0" name="bathRooms" class="form-control" value="{{$listing->bathRooms}}">
                           <span class="bathRooms-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Số tầng <span class="numberFloorError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <input id="numberFloor" type="number" min="0"  name="" class="form-control" value="{{ isset($listing->numberFloor) ? $listing->numberFloor : 1 }}">
                           <span class="numberFloor-error"></span>
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
                              <input id="alleyWidth" type="number" min="0" name="" class="form-control">
                              <span class="alleyWidth-error"></span>
                           </div>
                           <div class="col-sm-2 padding-right-0">
                              <input id="haveBeSide-facade" type="checkbox" value="mat-tien"> Bên hông
                           </div>
                           <div id="chi-tiet-mat-tien" class="col-sm-4 padding-side-0" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng mặt tiền</div>
                                 <div class="col-sm-5">
                                    <input id="roadFrontageWidth" type="number" min="0" class="form-control" name="">
                                 </div>
                              </div>
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng hẻm</div>
                                 <div class="col-sm-5">
                                    <input id="widthValue" type="number" min="0" class="form-control" name="">
                                 </div>
                                 <span class="widthValue-error"></span>
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
                           <div class="col-sm-2 padding-side-0">
                              <div class="row form-group">
                                 <div class="col-sm-7 padding-side-0">Độ rộng mặt tiền</div>
                                 <div class="col-sm-6 padding-right-0">
                                    <input id="widthFrontWay" type="number" min="0" name="" class="form-control">
                                    <span class="widthFrontWay-error"></span>
                                 </div>
                              </div>
                              <div class="row form-group">
                                 <div class="col-sm-7 padding-side-0">Độ rộng hẻm</div>
                                 <div class="col-sm-6 padding-right-0">
                                    <input id="alleyWidth" type="number" min="0" name="" class="form-control">
                                    <span class="alleyWidth-error"></span>
                                 </div>
                              </div>
                           </div>
                           <div class="col-sm-2 padding-right-0">
                              <input id="haveBeSide-alley" type="checkbox" value="trong-hem"> Bên hông
                           </div>
                           <div id="chi-tiet-hem" class="col-sm-4 padding-side-0" style="display: none;">
                              <div class="col-sm-12 row form-group">
                                 <div class="col-sm-5 padding-right-0">Độ rộng hẻm</div>
                                 <div class="col-sm-5 padding-side-0">
                                    <input id="widthValue" type="number" min="0" class="form-control" name="">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đơn giá mặt tiền đường <span class="priceStreetFrontageError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-3">
                           <input id="priceStreetFrontage" type="text" name="" class="form-control" value="{{ (isset($listing->roadPrice) && !empty($listing->roadPrice)) ? $listing->roadPrice : '' }}">
                           <span class="priceStreetFrontage-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Khoảng cách đến mặt tiền đường <span class="roadFrontageError" style="display: none;"><code>(*)</code></span></label>
                        <div class="select-2 col-sm-3">
                           <select id="roadFrontage" class="form-control">
                           </select>
                           <span class="roadFrontage-error"></span>
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
                           <input id="depositText" type="text" name="" class="form-control" value="{{$listing->depositText}}">
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Note từ nhân viên call</label>
                        <div class="col-sm-10">
                           <textarea id="noteFromLsCall" class="form-control" rows="5">{{ isset($listing->noteFromLsCall) ? $listing->noteFromLsCall : "" }}</textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Note cho LS</label>
                        <div class="col-sm-10">
                           <textarea id="noteForLs" class="form-control" rows="5">{{$listing->noteForLs}}</textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Hình ảnh <span class="imagesListError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-10">
                           <div class="bl-upload-image-list">
                              <ul id="image-list" name="image-list" data-images="{{ $imageList }}" data-images-source="{{ $imageSourceList }}" data-images-caption="{{ $imageCaptionList }}">
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
                        <label class="control-label col-sm-2">Hình GCN <span class="gcn-required" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-10">
                           <div class="bl-upload-image-list">
                              <ul id="gcn-image-list" name="gcn-image-list" data-images="{{ $imageGcnsList }}" data-images-source="{{ $imageGcnsSourceList }}" data-images-caption="{{ $imageGcnsCaptionList }}">
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
                        <label class="control-label col-sm-2">Loại nhà <span class="houseTypesError" style="display: none;"><code>(*)</code></span></label>
                        <div class="select-2 col-sm-3">
                           <select id="houseTypes" name="" class="form-control">
                           </select>
                           <span class="houseTypes-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Loại công trình <span class="constructionTypesError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-10">
                           <span id="constructionTypes"></span>
                           <span class="constructionTypes-error"></span>
                        </div>
                     </div>
                  </div>                  
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm tốt <span class="advantagesError" style="display: none;"><code>(*)</code></span></label>
                        <div class="col-sm-5">
                           <span id="advantages" name="advantages"></span>
                           <span class="advantages-error"></span>
                        </div>
                        <div class="col-sm-3">
                           <label>Khấu hao công trình theo tuổi đời <span class="depreciationError" style="display: none;"><code>(*)</code></span></label>
                           <input id="depreciation" class="form-control" data-a-sign="%" data-v-min="0" data-v-max="100" placeholder="%" name="" value="{{ (isset($listing->oldHouse) && !empty($listing->oldHouse)) ? $listing->oldHouse : 0 }}"/>
                           <span class="depreciation-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Đặc điểm xấu</label>
                        <div class="col-sm-7">
                           <span id="disadvantages" name="disadvantages"></span>
                           <span class="disadvantages-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Độc quyền</label>
                        <div class="col-sm-2">
                           <input id="isGuaranteed" type="checkbox" {{ ($listing->isGuaranteed) ? "checked" : "" }} name="" value="1">
                           <span class="isGuaranteed-error"></span>
                        </div>
                     </div>
                  </div>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <label class="control-label col-sm-2">Tình trạng</label>
                        <div class="select-2 col-sm-3">
                           <select id="statusId" name="statusId" class="form-control">
                              <option value="">--Tất cả--</option>
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
                        <label id="listing-status-label" class="control-label col-sm-2" title="Tình trạng tin đăng hệ thống">Tình trạng tin đăng HT</label>
                        <div class="select-2 col-sm-3">
                           <select id="rlistingStatusId" name="rlistingStatusId" class="form-control">
                              <option value="">--Chưa có dữ liệu--</option>
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
                        <label class="control-label col-sm-2">Lưu ý cho chủ nhà</label>
                        <div class="select-2 col-sm-10">
                           <textarea id="suggestToDiy" class="form-control" rows="5">{{ isset($listing->suggestToDiy) ? $listing->suggestToDiy : "" }}</textarea>
                        </div>
                     </div>
                  </div>                  
                  <button id="scrollTopBtn" type="button" class="btn btn-default" aria-label="Left Align">
                    <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                  </button>
                  <div class="row form-group">
                     <div class="col-sm-12">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-10 no-print">
                           <button type="submit" id="update-listing-btn" class="btn btn-primary"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> Cập nhật</button>
                           <!-- Thẩm định -->
                           @if (isset($listing->listingTypeId) && ($listing->listingTypeId == 1))
                           <button type="submit" id="valuation-btn" class="btn btn-success"><i class="fa fa-money" aria-hidden="true"></i> Thẩm định</button>
                           @endif
                           <!-- Tạo tin đăng đầy đủ -->
                           @if (isset($listing->listingTypeId) && ($listing->listingTypeId == 1) && isset($listing->propertyTypeId) && (in_array($listing->propertyTypeId, [11,13])))
                           @if ((isset($listing->valuationType) && !empty($listing->valuationType)) || ($listing->valuationType == 'D'))
                           <button id="create-listing-btn" class="btn btn-primary"><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Tạo tin đăng đầy đủ</button>
                           @endif
                           @else
                           <button id="create-listing-btn" class="btn btn-primary"><span class="glyphicon glyphicon-share" aria-hidden="true"></span> Tạo tin đăng đầy đủ</button>
                           @endif
                           <button id="stop-listing-btn" class="btn btn-danger"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Ngưng</button>
                           <button id="sold-listing-btn" class="btn btn-success"><span class="glyphicon glyphicon-check" aria-hidden="true"></span> Đã bán</button>
                           <button id="rent-listing-btn" class="btn btn-warning"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Đã cho thuê</button>
                           @if (isset($listing->rlistingId) && is_numeric($listing->rlistingId))
                            <button id="request-listing-btn" class="btn btn-info"><span class="glyphicon glyphicon-transfer" aria-hidden="true"></span> Yêu cầu LS</button>
                           @endif
                           <button id="reject-listing-btn" class="btn btn-warning"><span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Từ chối</button>
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
@include('lso.modal-diy')
@include('lso.modal-popup-image')
<!-- Modal 【Note nội bộ】 -->
@include('lso.modal-request-internal')
<!-- Modal 【Tạo mới note nội bộ】 -->
@includeIf('lso.modal-create-request-internal')
<!-- Modal 【Tạo mới note nội bộ】 -->
@includeIf('lso.modal-posts-owner')
<!-- Modal 【Từ chối】 -->
@includeIf('lso.modal-reject-listing')
<!-- Modal 【Sử dụng PS】 -->
@includeIf('lso.modal-ps-listing')
@includeIf('lso.modal-ps-delay-note')
<!-- Modal 【Thêm đường】 -->
@includeIf('lso.modal-add-street')
<!-- Modal 【Profile chủ nhà】 -->
@includeIf('lso.modal-profile')
<!-- Modal khi bấm [Ngưng] | [Đã bán] | [Cho thuê] | [Gửi Request] -->
@include('lso.modal-stop-listing')
@include('lso.modal-sold-listing')
@include('lso.modal-rent-listing')
@include('lso.modal-request-listing')
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
<script src="{{loadAsset("/plugins/momentjs/moment.min.js") }}"></script>
<script src="{{loadAsset("bootstrap/js/validator.js")}}"></script>
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
<script src="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<!--<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>-->
<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
<!-- Validate JS -->
<script src="{{loadAsset("js/validatejs/validate.min.js") }}"></script>
<!-- Vue JS -->
<script src="{{loadAsset("/plugins/vue/vue.min.js") }}"></script>    
<script src="{{loadAsset("/plugins/vue/vue-select.js") }}"></script>
<script src="{{loadAsset("/plugins/vue/vue-resource.js") }}"></script>    
<script src="{{loadAsset("/js/vee-validate/vee-validate.js") }}"></script> 
<script src="{{loadAsset("/js/vee-validate/locale/vi.js") }}"></script>  
<script src="{{loadAsset("/js/common/common-vue.js") }}"></script>
@if ($tmpDepartmentId == 11)
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
@endif
<script src="{{loadAsset("js/lso/main.js") }}"></script>
<script src="{{loadAsset("js/lso/detail.js") }}"></script>
<script src="{{loadAsset("js/lso/meeting.js") }}"></script>
<!-- Dành cho modal [Tạo đường] -->
<script src="{{loadAsset("js/lso/modal/street.js") }}"></script>
<!-- Dành cho modal [Profile chủ nhà] -->
<script src="{{loadAsset("js/lso/modal/profile.js") }}"></script>
@stop
@section('page-css')
<link rel="stylesheet" type="text/css" href="{{loadAsset("/css/lso/style.css") }}"/>
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="{{loadAsset("/plugins/datetimepicker/bootstrap-datepicker3.min.css")}}">
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
