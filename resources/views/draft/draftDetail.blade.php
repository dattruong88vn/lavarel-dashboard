@extends('layout.default')

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-header">
                   <h3 class="box-title">{{$listing->listingTypeName or ""}} {{$listing->propertyTypeName or ""}}</h3>
                    <!-- <small>Advanced and full of features</small> -->
                </div>
                <form role="form">
                    <div class="box-body">
                        <div class="row">
                          <!--Images/Video-->
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group imageListing">
                                    <label>Hình ảnh</label>
                                    <input class="file-image" multiple type="file" class="file" data-upload-url="/imageListingUploader">
                                </div>
                                <div class="form-group videoListing">
                                    <label>Video</label>
                                    <input class="file-video" type="file" class="file" data-upload-url="/videoListingUploader">
                                </div>
                            </div>
                            <!-- #Images/Video-->
                        </div>
                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Loại hình giao dịch</label>
                                <select readonly id="type-business" name="type-business" class="form-control select2" style="width: 100%;">
                                  <option {{$listing->listingType == 1 ? "selected" : ""}} value="1">Bán</option>
                                  <option {{$listing->listingType == 2 ? "selected" : ""}} value="2">Thuê</option>
                                </select>
                              </div>
                          </div>
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Mục đích kinh doanh</label>
                                <select id="purpose-business"  name="purpose-business" class="form-control select2" style="width: 100%;">
                                  @if($listing->listingType == 2)
                                    <option {{$listing->purposeType === "1" ? "selected" : ""}} value="1">Để ở</option>
                                    <option {{$listing->purposeType === "2" ? "selected" : ""}} value="2">Thương mại</option>
                                  @endif
                                  @if($listing->listingType == 1)
                                    <option {{$listing->purposeType === "3" ? "selected" : ""}} value="3">Bán</option>
                                  @endif
                                </select>
                              </div>
                            </div>
                        </div><!-- /.row -->
                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Loại BDS</label>
                                <select id="kind-bds" name="kind-bds" class="form-control select2" style="width: 100%;">
                                  @foreach($propertyTypeList as $propertyType)
                                      @if($propertyType->listingType->listingTypeID == $listing->listingType)
                                        <option value="{{ $propertyType->propertyTypeID }}"
                                      @if($propertyType->propertyTypeID == $listing->propertyType) selected="selected"  @endif 
                                      >{{ $propertyType->typeName }}</option>
                                      @endif
                                  @endforeach
                                </select>
                              </div>
                          </div>
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Building</label>
                                <select id="building" name="building" class="form-control select2" style="width: 100%;">
                                  <option value="">--- Chọn Building ---</option>
                                  @foreach($buildingList as $building)
                                      @if($building->isVerified)
                                      <option isVerified="{{$building->isVerified}}" listingId="{{ $building->listingId }}" value="{{ $building->buildingId }}" 
                                      @if(isset($listing->buildingObject) && $building->buildingId == $listing->buildingObject->buildingId) selected="selected" @endif 
                                      >{{ $building->buildingName }}</option> 
                                      @endif

                                  @endforeach
                                </select>
                              </div>
                            </div>
                        </div><!-- /.row -->
                        <div class="row">   
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <label>Block</label>
                                <select id="block" name="block" class="form-control select2" style="width: 100%;">
                                    @if(intval($listing->buildingBlock) != 0)
                                      @foreach($listing->buildingObject->blocks as $block)
                                          <option value="{{intval($block->blockId)}}"
                                          @if(intval($block->blockId) == intval($listing->buildingBlock)) selected="selected"  @endif 
                                          >{{ $block->name }}</option>
                                      @endforeach
                                    @endif 
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="row">
                                    <div class="col-md-6 col-xs-12">
                                      <div class="form-group">
                                        <label>Nguồn Listing</label>
                                        <select id="source" class="form-control select2" style="width: 100%;">    
                                          <option value="">---Vui lòng chọn---</option>                            
                                        @foreach($userTypeList as $user)    
                                          <option value="{{ $user->id}}" @if($userTypeId == $user->id) selected @endif>{{$user->name}}</option>
                                        @endforeach
                                          </select>
                                      </div>
                                    </div>
                                    <div class="col-md-6 col-xs-12">
                                        <div class="form-group">
                                        <label>Tên</label>
                                        <select id="listuser" class="form-control select2" class="form-control select2" style="width: 100%;">                                                                   
                                        <option value="">---Vui Lòng chọn---</option>
                                        @if(isset($listUser))
                                          @foreach($listUser as $user)  
                                            <option phone="{{$user->phone}}" accountid="{{$user->accountId}}" value="{{$user->socialUid}}" @if($socialUser->socialUid == $user->socialUid) selected @endif>{{$user->name}}</option>  
                                          @endforeach
                                        @endif
                                        </select>
                                      </div>
                                    </div>                                      
                              </div>
                           </div>
                        </div><!-- /.row -->

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Địa Chỉ <a id="seeonmap" href="">Xem trên bản đồ</a></label>
                                    <input id="address" name="address" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->buildingObject)) {{$listing->buildingObject->buildingAddress}} @else {{$listing->address}} @endif">
                                </div>
                            </div><!-- /.col -->
                            <div class="col-md-6 col-xs-12">
                              <div class="row">
                                  <div class="col-md-6 col-xs-12">
                                      <div class="form-group">
                                        <label>Lat</label>
                                        <input id="lat" name="lat" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->buildingObject)){{$listing->buildingObject->latitude}}@else {{$listing->latitude}}@endif">
                                    </div>
                                  </div>
                                  <div class="col-md-6 col-xs-12">
                                      <div class="form-group">
                                        <label>Long</label>
                                        <input id="long" name="long" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->buildingObject)){{$listing->buildingObject->longitude}} @else{{$listing->longitude}}@endif">           
                                    </div>
                                  </div>
                              </div>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                        <div class="row">            
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                  <label>Thành phố (*)</label>
                                  <select id="city" name="city" class="form-control select2" style="width: 100%;">
                                      <option value="">---Vui lòng chọn--- </option>
                                   @foreach($cityList as $city)
                                      <option value="{{ $city->cityId }}" @if(isset($listing->buildingObject) && $listing->buildingObject->cityId == $city->cityId) selected="selected" @endif
                                      @if(!isset($listing->buildingObject) && $city->cityId == $listing->cityId) selected="selected"  @endif 
                                      >{{ $city->cityName }}</option>
                                   @endforeach
                                  </select>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                  <label>Quận (*)</label>
                                  <select id="district" name="district" class="form-control select2" style="width: 100%;">
                                     <option value="">---Vui lòng chọn--- </option>
                                    @foreach($districtList as $district)
                                      <option value="{{ $district->districtId }}"
                                      @if(isset($listing->buildingObject) && $listing->buildingObject->districtId == $district->districtId) selected="selected" @endif
                                      @if(!isset($listing->buildingObject) && $district->districtId == $listing->districtId) selected="selected"  @endif 
                                      >{{ $district->districtName }}</option>
                                    @endforeach
                                  </select>
                              </div>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Short Address (*)</label>
                                    <input id="short-address" name="short-address" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->shortAddress or ""}}">
                                </div>
                          </div>
                          <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Tiêu đề</label>
                                    <input id="title-listing" name="title-listing" type="text" class="form-control" placeholder="Enter ..." value="{{ "" }}">
                                </div>
                          </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                  <label>Diện Tích Đất</label>
                                  <input id="acreage-land" name="acreage-land" type="text" class="form-control" placeholder="Enter ..."
                                   value="{{ $listing->lotSize or "" }}">
                                </div>
                            </div>
                             <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Tiêu đề tiếng anh</label>
                                    <input id="title-listing-en" name="title-listing-en" type="text" class="form-control" placeholder="Enter ..." value="{{ "" }}">
                                </div>
                            </div>
                        </div><!-- /.row -->

                        <div class="row">
                            
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Diện Tích</label>
                                  <input id="acreage-lease" name="acreage-lease" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $listing->floorSize or "" }}">
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Chiều Dài</label>
                                  <input id="length" name="length" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $listing->sizeLength or "" }}" 
                                  >
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Chiều Rộng</label>
                                  <input id="width" name="width" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $listing->sizeWidth or ""}}">
                                </div>
                            </div>


                        </div><!-- /.row -->

                        <div class="row">
                            
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Diện Tích Cho Thuê Nhỏ Nhất</label>
                                  <input id="acreage-small" name="acreage-small" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $listing->smallSize or ""}}">
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Số Tầng Listing</label>
                                  <input id="floor-listing" name="floor-listing" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $numberFloor or ""}}">                            

                                </div>
                            </div>

                        </div><!-- /.row -->

                        <div class="row">
                            
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Căn Hộ Số</label>
                                  <input id="apartment-number" name="apartment-number" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $listing->unit or ""}}">
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Số Phòng Ngủ</label>
                                  <select id="bedroom-number" name="bedroom-number" class="form-control select2" style="width: 100%;">
                                      <option value="" >---Vui Lòng Chọn---</option>
                                      <option value="1" @if(isset($listing->bedRooms) && $listing->bedRooms == 1) selected="selected" @endif>1</option>
                                      <option value="2" @if(isset($listing->bedRooms) && $listing->bedRooms == 2) selected="selected" @endif>2</option>
                                      <option value="3" @if(isset($listing->bedRooms) && $listing->bedRooms == 3) selected="selected" @endif>3</option>
                                      <option value="4" @if(isset($listing->bedRooms) && $listing->bedRooms == 4) selected="selected" @endif>4</option>
                                      <option value="5" @if(isset($listing->bedRooms) && $listing->bedRooms == 5) selected="selected" @endif>5</option>
                                      <option value="6" @if(isset($listing->bedRooms) && $listing->bedRooms == 6) selected="selected" @endif>6</option>
                                      <option value="7" @if(isset($listing->bedRooms) && $listing->bedRooms == 7) selected="selected" @endif>7</option>
                                      <option value="8" @if(isset($listing->bedRooms) && $listing->bedRooms == 8) selected="selected" @endif>8</option>
                                      <option value="9" @if(isset($listing->bedRooms) && $listing->bedRooms == 9) selected="selected" @endif>9</option>
                                      <option value="10" @if(isset($listing->bedRooms) && $listing->bedRooms == 10) selected="selected" @endif>10</option>
                                  </select>
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                  <label>Số Phòng Tắm/WC</label>
                                  <select id="bathroom-number" name="bathroom-number" class="form-control select2" style="width: 100%;">
                                      <option value="" >---Vui Lòng Chọn---</option>
                                      <option value="1" @if(isset($listing->bathRooms) && $listing->bathRooms == 1) selected="selected" @endif>1</option>
                                      <option value="2" @if(isset($listing->bathRooms) && $listing->bathRooms == 2) selected="selected" @endif>2</option>
                                      <option value="3" @if(isset($listing->bathRooms) && $listing->bathRooms == 3) selected="selected" @endif>3</option>
                                      <option value="4" @if(isset($listing->bathRooms) && $listing->bathRooms == 4) selected="selected" @endif>4</option>
                                      <option value="5" @if(isset($listing->bathRooms) && $listing->bathRooms == 5) selected="selected" @endif>5</option>
                                      <option value="6" @if(isset($listing->bathRooms) && $listing->bathRooms == 6) selected="selected" @endif>6</option>
                                      <option value="7" @if(isset($listing->bathRooms) && $listing->bathRooms == 7) selected="selected" @endif>7</option>
                                      <option value="8" @if(isset($listing->bathRooms) && $listing->bathRooms == 8) selected="selected" @endif>8</option>
                                      <option value="9" @if(isset($listing->bathRooms) && $listing->bathRooms == 9) selected="selected" @endif>9</option>
                                      <option value="10" @if(isset($listing->bathRooms) && $listing->bathRooms == 10) selected="selected" @endif>10</option>
                                    </select>
                                </div>
                            </div>
                            
                        </div><!-- /.row -->

                        <div class="row">                           
                            <div class="col-md-6 col-xs-12">
                              <div class="row"> 
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                      <label>Listing Nằm Ở Tầng (Từ)</label>
                                      <select name="place-number" id="place-number" class="form-control select2" style="width: 100%;">
                                        <option value="">---Vui Lòng Chọn---</option>
                                        <option value="-1" @if(isset($listing->floors) && $listing->floors == -1) selected="selected" @endif> Tầng trệt </option>
                                        <option value="-2" @if(isset($listing->floors) && $listing->floors == -2) selected="selected" @endif > Tầng lửng </option>
                                        <option value="-3" @if(isset($listing->floors) && $listing->floors == -3) selected="selected" @endif > Tầng thượng </option>
                                        <option value="">---Vui Lòng Chọn---</option>
                                        @for($i=1; $i <= 30; $i++)
                                          <option value="$i" @if(isset($listing->floors) && $listing->floors == $i) selected="selected" @endif >Tầng {{ $i }}</option>    
                                        @endfor  
                                      </select>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                      <label>(Tới) Listing Nằm Ở Tầng</label>
                                      <select name="place-number-to" id="place-number-to" class="form-control select2" style="width: 100%;">
                                        <option value="">---Vui Lòng Chọn---</option>
                                        <option value="-1" @if(isset($listing->floors) && $listing->floors == -1) selected="selected" @endif> Tầng trệt </option>
                                        <option value="-2" @if(isset($listing->floors) && $listing->floors == -2) selected="selected" @endif > Tầng lửng </option>
                                        <option value="-3" @if(isset($listing->floors) && $listing->floors == -3) selected="selected" @endif > Tầng thượng </option>
                                        <option value="">---Vui Lòng Chọn---</option>
                                        @for($i=1; $i <= 30; $i++)
                                          <option value="$i" @if(isset($listing->floors) && $listing->floors == $i) selected="selected" @endif >Tầng {{ $i }}</option>    
                                        @endfor  
                                      </select>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                      <label>Dành cho nhà riêng hoặc biệt thự</label>
                                      <div class="checkbox">
                                        <label>
                                          <input class="utilitie" name="isMezzanine" id="isMezzanine" type="checkbox">
                                          Mezzanine
                                        </label>
                                      </div>
                                      <div class="checkbox">
                                          <label>
                                            <input class="isRooftop" name="isRooftop" id="isRooftop" type="checkbox">
                                            Rooftop
                                          </label>
                                      </div>
                                      <div class="checkbox">
                                          <label>
                                            <input class="isPenhouse" name="isPenhouse" id="isPenhouse" type="checkbox">
                                            Penhouse
                                          </label>
                                      </div>
                                  </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Model Code</label>
                                    <input id="modelCode" type="text" class="form-control" placeholder="Enter ..." value='{{$listing->modelCode or ""}}'>
                                    </div>
                                    <div class="form-group">
                                        <label>Tổng số listing của nhà mẫu</label>
                                    <input id="totalHomeForm" type="text" class="form-control" placeholder="Enter ..." value='{{$listing->totalHomeForm or ""}}'>
                                    </div>
                                    <div class="form-group">
                                        <label>Số listing còn trống</label>
                                    <input id="numberAvailable" type="text" class="form-control" placeholder="Enter ..." value='{{$listing->numberAvailable or ""}}'>
                                    </div>
                                </div>
                              </div>
                            </div>
                        </div><!-- /.row -->
                          <div class="row">
                              <div class="col-md-6 col-xs-12">
                                  <div class="form-group">
                                    <label>Giá</label><span class="pull-right type-of-price">{{isset($listing->listingType) && $listing->listingType === "1" ? "triệu" : "tháng"}}</span>
                                    <input id="price" type="text" class="form-control" placeholder="Enter ..."
                                     value="{{ $listing->price or "" }}">
                                  </div>
                                  <div class="form-group">
                                    <div class="checkbox">
                                      <label>
                                        <input id="isVat" type="checkbox" @if(isset($listing->isVAT) && $listing->isVAT == true) checked  @endif >
                                        Giá bao gồm VAT
                                      </label>
                                    </div>
                                  </div>
                              </div>
                              <div class="col-md-2 col-xs-12">
                                  <label>Loại Tiền</label>
                                  <select id="currency" class="form-control select2" style="width: 100%;">
                                        <option value="vnd" @if(isset($listing->currency) && strtolower($listing->currency) == "VND") selected="selected" @endif>VND</option>
                                        <option value="usd" @if(isset($listing->currency) && strtolower($listing->currency) == "usd") selected="selected" @endif>USD</option>
                                  </select>
                              </div>
                          </div><!-- /.row -->
                        <div class="box-line">
                          <h4 class="box-title">Phí (
                            <select id="currency_fee" class="form-control select2" style="width: 10%;">
                                    (
                                      <option value="vnd">VND</option>
                                      <option value="usd">USD</option>
                            </select>)
                            </h4>   
                            <div class="row">
                            @foreach($fee_listing as $value)  
                                <div class="col-md-3 col-xs-12 fee-listing ">
                                    <div class="form-group">
                                      <label> {{$value->feesName}} </label>                                                                
                                      <?php
                                      $array = array();
                                      if(isset($listing->managementFee) && $listing->managementFee->id == $value->ftId) {
                                        $array = $listing->managementFee;
                                      }
                                      else if(isset($listing->cleaningFee) && $listing->cleaningFee->id == $value->ftId) {
                                        $array = $listing->cleaningFee;
                                      }
                                      else if(isset($listing->motorFee) && $listing->motorFee->id == $value->ftId) {
                                        $array = $listing->motorFee;
                                      }
                                      else if(isset($listing->otoFee) && $listing->otoFee->id == $value->ftId) {
                                        $array = $listing->otoFee;
                                      }
                                      ?>
                                      <input id="fee" type="text" class="form-control" placeholder="Enter ..." value="@if($array != null && !isset($array->include)) {{$array->value }} @endif">                                                             
                                    </div>
                                    <div class="form-group">
                                      <div class="checkbox">
                                        <label>
                                          <input id="fee-checkbox" type="checkbox" ftId="{{ $value->ftId }}" dataname="{{ $value->feesName }}" @if($array != null && isset($array->include) &&  $array->include == true) checked @endif >
                                          Phí bao gồm trong giá
                                        </label>
                                      </div>
                                    </div>
                                </div>
                              @endforeach                               
                        </div><!-- /.row -->
                        </div>
                        <div class="row">
                            
                            <div class="col-md-3 col-xs-12">
                                <div class="form-group">
                                  <label>Đặt Cọc</label>
                                  <span class="pull-right type-of-price">{{isset($listing->listingType) && $listing->listingType === "1" ? "triệu" : "tháng"}}</span>
                                  <input id="deposit" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->deposit or ""}}" autocomplete="off">
                                  
                                  
                                </div>
                                
                                <div class="form-group">
                                  <div id="allowchange" class="checkbox">
                                    <label>
                                      <input type="checkbox" @if(isset($listing->allowChange) && $listing->allowChange == true) checked @endif>
                                      Được Phép Thay Đổi Kết Cấu
                                    </label>
                                  </div>
                                </div>
                            </div>    
                        </div><!-- /.row -->
                        <div class="box-line wrapper-move-in-date"> 
                        <h4 class="box-title">Ngày có thể dọn vào</h3>     
                        <?php if($listing->listingType == 1 ) { ?>
                        <div class="row">
                          <div class="col-md-6 col-xs-12">
                              <div class="form-group">
                                <div class="radio">
                                  <label><input id="afterSigningContract" type="radio" name="optradio" value="" {{isset($listing->sellMoveInDate) && $listing->sellMoveInDate === "1" ? "checked" : ""}} >Dọn vào sau khi ký hợp đồng</label>
                                </div>   
                              </div>                                                      
                          </div>   
                          <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                              <div class="radio">
                                <label><input id="moveInNowSale" type="radio" name="optradio"  {{isset($listing->sellMoveInDate) && $listing->sellMoveInDate === "2" ? "checked" : ""}} >Dọn Vào Ngay</label>
                              </div>
                            </div>
                          </div> 
                          <div class="col-md-4 col-xs-12">
                              <div class="form-group">
                                <div class="radio">
                                  <label>
                                  <input id="afterNumberDays" type="radio" name="optradio" {{isset($listing->sellMoveInDate) && $listing->sellMoveInDate === "3" ? "checked" : ""}} >Sau khi ký hợp đồng [x] ngày</label>
                                   <select  id="afterNumberDaysSelect" class="form-control select2 bs-select-hidden"  style=
                                      "width: 100%;">                                      
                                        @for($i = 1;$i <= 24;$i++)
                                              <option value="{{$i}}" <?php if(isset($listing->sellMoveInDate) && intval($listing->afterNumberDays) == $i){ echo 'selected' ;} ?>> {{$i}} tháng</option>
                                        @endfor                                        
                                   </select>     
                                </div>
                              </div>
        
                          </div> 
                        </div> <!-- End row -->
                        <?php } else { ?>
                        <div class="row">                  
                          <div class="col-md-6 col-xs-12">
                                <div class="form-group">                                
                                    <div class="date">
                                        <div class="input-group input-append date" id="datePicker">
                                            <input id="eventDate" type="text" class="form-control" name="eventDate" 
                                            value="{{$listing->moveInDate or ''}}"/>
                                            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                  <div class="checkbox">
                                    <label>
                                      <input type="checkbox" id="moveInNow" {{isset($listing->chkMoveInDate) ? "checked" : ""}} >
                                      Có thể dọn vào ngay
                                    </label>
                                  </div>
                                </div>                         
                            </div>  
                          </div>
                        <?php } ?>
                           
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-xs-12 clear-left">
                                <div class="form-group">
                                  <label>Số Tầng Hầm</label>
                                    <input id="baseme" name="baseme" type="text" class="form-control" placeholder="Enter ..." value="{{$numberBasement or ""}}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                  <label>Số Thang Máy</label>
                                    <input id="numberElevator" name="numberElevator" type="text" class="form-control" placeholder="Enter ..." value="{{$numberElevator or ""}}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                  <label>Năm Xây Nhà</label>
                                  <input  id="yearbuilt" name="yearbuilt" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $yearBuilt or "" }}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                  <label>Năm Sửa Nhà</label>
                                  <input id="yearfixed" name="yearfixed" type="text" class="form-control" placeholder="Enter ..."
                                  value="{{ $yearFixed or "" }}" />
                                </div>
                            </div>
                            <div class="col-md-4 col-xs-12">
                                <div class="form-group">
                                  <label>Hướng Nhà</label>
                                  <select name="direction" id="direction" class="form-control select2" style="width: 100%;">
                                      <option value="0">--- Vui Lòng Chọn ---</option>
                                      <option value="1" {{isset($listing->direction) && $listing->direction === "1" ? "selected" : "" }}>Đông</option>
                                      <option value="2" {{isset($listing->direction) && $listing->direction === "2" ? "selected" : "" }}>Tây</option>
                                      <option value="3" {{isset($listing->direction) && $listing->direction === "3" ? "selected" : "" }}>Nam</option>
                                      <option value="4" {{isset($listing->direction) && $listing->direction === "4" ? "selected" : "" }}>Bắc</option>
                                      <option value="5" {{isset($listing->direction) && $listing->direction === "5" ? "selected" : "" }}>Đông Bắc</option>
                                      <option value="6" {{isset($listing->direction) && $listing->direction === "6" ? "selected" : "" }}>Tây Bắc</option>
                                      <option value="7" {{isset($listing->direction) && $listing->direction === "7" ? "selected" : "" }}>Đông Nam</option>
                                      <option value="8" {{isset($listing->direction) && $listing->direction === "8" ? "selected" : "" }}>Tây Nam</option>                                     
                                    </select>
                                </div>
                            </div>
                          </div><!-- /.row -->
                          <div class="box-line">
                            <h3 class="box-title">Tiện ích</h3>
                            <div id="amenities"  class="amenity-content row">

                              @foreach($amenityList as $amenityChild)
                                <?php
                                 $isChecked = false;
                                 if(isset($listing->amenities[0])) {
                                  foreach ($listing->amenities[0] as $obj) {
                                      $arr = array_keys((array)$obj);

                                      if(in_array($amenityChild->id, $arr)) {
                                        $isChecked = true;
                                        break;  
                                      }
                                   }
                                 }                                
                                ?>
                                <div class="col-md-3 col-xs-3 utilitie-item-content">
                                  <div class="form-group">
                                    <div class="checkbox">
                                    <label><input data="@if(count($amenityChild->amenityChild)>1){{1}}@else{{0}}@endif" id="amenities-child" type="checkbox" class="utilitie" name="" dataText="{{ $amenityChild->amenityName }}" {{$isChecked ? "checked" : "" }} value="{{$amenityChild->id}}">{{$amenityChild->amenityName}}</label>
                                    </div>
                                  </div>
                                  <div class="amenityc-child-content" data="{{ count($amenityChild->amenityChild) }}"  >
                                    @foreach ($amenityChild->amenityChild as $amenity2Child)  
                                      <?php
                                       $isChecked = false;
                                       if(isset($listing->amenities[0])) {
                                         foreach ($listing->amenities as $amenity) {
                                          foreach ($amenity as $obj) {
                                            $arr = array_keys((array)$obj);
                                            if(in_array($amenity2Child->id, $arr)) {
                                              $isChecked = true;
                                              break;  
                                            }
                                          }
                                         }
                                       }
                                      ?>      
                                      <div class="form-group">
                                        <div class="checkbox">
                                        <label><input data="0" name="" dataText="{{$amenity2Child->amenityName}}" type="checkbox" class="" name="" dataText="" {{$isChecked ? "checked" : "" }} value="{{$amenity2Child->id}}">{{$amenity2Child->amenityName}}</label>
                                        </div>
                                      </div>                                       
                                    @endforeach
                                  </div>
                                </div>
                              @endforeach

                            </div><!-- /.row -->
                           <!-- <div id="amenities" class="row">
                              @foreach($buildingAmenities as $amenityChild)
                                <?php
                                 $isChecked = false;
                                 foreach ($listing->amenities_building as $amenity) {
                                    foreach ($amenity as $obj) {
                                      $arr = array_keys((array)$obj);
                                      if(in_array($amenityChild->id, $arr)) {
                                        $isChecked = true;
                                        break;  
                                      }
                                    }
                                 }
                                ?>
                                <div class="col-md-3 col-xs-3 utilitie-item-content">
                                  <div class="form-group">
                                    <div class="checkbox">
                                    <label><input data="@if(count($amenityChild->amenityChild)>1){{1}}@else{{0}}@endif" id="amenities-child" type="checkbox" class="utilitie" name="" dataText="{{ $amenityChild->amenityName }}" {{$isChecked ? "checked" : "" }} value="{{$amenityChild->id}}">{{$amenityChild->amenityName}}</label>
                                    </div>
                                  </div>
                                  <div class="amenityc-child-content" data="{{ count($amenityChild->amenityChild) }}"  >
                                    @foreach ($amenityChild->amenityChild as $amenity2Child)  
                                      <?php
                                       $isChecked = false;
                                       foreach ($listing->amenities_building as $amenity) {
                                        foreach ($amenity as $obj) {
                                          $arr = array_keys((array)$obj);
                                          if(in_array($amenity2Child->id, $arr)) {
                                            $isChecked = true;
                                            break;  
                                          }
                                        }
                                       }
                                      ?>      
                                      <div class="form-group">
                                        <div class="checkbox">
                                        <label><input data="0" name="" dataText="{{$amenity2Child->amenityName}}" type="checkbox" class="" name="" dataText="" {{$isChecked ? "checked" : "" }} value="{{$amenity2Child->id}}">{{$amenity2Child->amenityName}}</label>
                                        </div>
                                      </div>                                       
                                    @endforeach
                                  </div>
                                </div>
                              @endforeach

                            </div><!-- /.row -->
                          </div>

                          <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group">
                                  <label>Loại tiện ích khác</label>
                                  <input id="amenities-other" name="amenities-other" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->amenitiesText->vi or ""}}">
                                </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group">
                                  <label>Loại tiện ích khác tiếng anh</label>
                                  <input id="amenities-other-en" name="amenities-other-en" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->amenitiesText->en or ""}}">
                                </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Mô tả tòa nhà tiếng việt</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing">
                                                   {{$listing->description->vi or ""}}
                                                </textarea>
                                            </form>
                                        </div> 
                                    </div>
                            </div>  
                          </div><!-- /.row -->
                          <div class="row">
                            <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Mô tả tòa nhà tiếng anh</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="description-en" id="description-en" rows="3" placeholder="Description Listing">
                                                   {{$listing->description->en or ""}}
                                                </textarea>
                                            </form>
                                        </div> 
                                    </div>
                            </div>  
                          </div><!-- /.row -->
                        <br/>

                       <div class="box">
                            <h3 class="box-title">Content Meta tag</h3>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Title</label>
                                      <input id="title-content-meta" name="title-content-meta" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->relatedListingMetaTags[0]->metaContent or ""}}">
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Keyword</label>
                                      <input id="keyword" name="keyword" type="text" class="form-control" placeholder="Enter ..."value="{{$listing->relatedListingMetaTags[2]->metaContent or ""}}" >
                                    </div>
                                </div> 
                            </div><!-- /.row -->
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                      <label>Description</label>
                                      <textarea id="meta-description" name="meta-description" class="form-control" rows="3" placeholder="Enter ..." value="">{{$listing->relatedListingMetaTags[1]->metaContent or ""}}
                                      </textarea>
                                    </div>
                                </div>  
                            </div><!-- /.row -->
                        </div>
                        <div class="box">
                            <h3 class="box-title">Content Meta tag English</h3>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Title</label>
                                      <input id="title-content-meta-en" name="title-content-meta" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->relatedListingMetaTags[0]->metaContentEn or ""}}">
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Keyword</label>
                                      <input id="keyword-en" name="keyword" type="text" class="form-control" placeholder="Enter ..."value="{{$listing->relatedListingMetaTags[2]->metaContentEn or ""}}" >
                                    </div>
                                </div> 
                            </div><!-- /.row -->
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                      <label>Description English</label>
                                      <textarea id="meta-description-en" name="meta-description-en" class="form-control" rows="3" placeholder="Enter ..." value="">{{$listing->relatedListingMetaTags[1]->metaContentEn or ""}}
                                      </textarea>
                                    </div>
                                </div>  
                            </div><!-- /.row -->
                        </div>
                        
                        <div class="box">
                            <h3 class="box-title">Thông Tin Chủ Nhà</h3>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Tên Chủ Nhà</label>
                                      <input id="namesocialcommunications" type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->owner->name or "" }}">
                                    </div>
                                </div>
                                
                            </div><!-- /.row -->

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Số ĐT Di Động</label>
                                      <input id="townerTel" type="text" class="form-control" placeholder="Enter ..." value="{{  $listing->owner->phone or ""}}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Số ĐT Bàn</label>
                                      <input id="ownerPhone" type="text" class="form-control" placeholder="Enter ..." value="{{  $listing->owner->telephone or "" }}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Email</label>
                                      <input id="ownerEmail" type="text" class="form-control" placeholder="Enter ..." value="{{  $listing->owner->email or ""}}">
                                    </div>
                                </div>
                            </div><!-- /.row -->

                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Địa Chỉ (nếu có)</label>
                                      <input id="ownerAddress" type="text" class="form-control" placeholder="Enter ..." value="{{  $listing->owner->address or "" }}">
                                    </div>
                                </div>
                            </div><!-- /.row -->
                            
                        </div><!-- /.box -->

                        <div class="box">
                            <div class="agent-content">
                              <h3 class="box-title">Thông Tin Người Môi Giới</h3>

                              <div class="row">
                              
                                  <div class="col-md-6 col-xs-12">
                                      <select id="agentList" name="agentList" class="form-control select2" style="width: 100%;">
                                        @if(isset($listing->socialCommunications[1]))      
                                          @foreach($agentList as $agentLista)
                                            <option email="{{ $agentLista->email or "" }}" value="{{ $agentLista->name or ""  }}" phone="{{ $agentLista->phone or ""  }}"  name="{{ $agentLista->name or ""  }}" socialuid="{{ $agentLista->socialUid or ""  }}" @if(isset($listing->socialCommunications) && isset($listing->socialCommunications[1]) && $agentLista->socialUid === $listing->socialCommunications[1]->id->socialUid) selected="selected" @endif> {{$agentLista->name or ""  }} </option>
                                          @endforeach
                                        @endif  
                                      </select>
                                  </div>
                                  
                              </div><!-- /.row -->

                              <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Số ĐT Di Động</label>
                                      <input id="agentTel" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->socialCommunications[1])) {{ $listing->socialCommunications[1]->mobile or "" }} @endif">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Số ĐT Bàn</label>
                                      <input id="agentPhone" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->socialCommunications[1])) {{ $listing->socialCommunications[1]->phone or "" }} @endif">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Email</label>
                                      <input id="agentEmail" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->socialCommunications[1])) {{ $listing->socialCommunications[1]->email or "" }} @endif">
                                    </div>
                                </div>
                            </div><!-- /.row -->
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                      <label>Địa Chỉ (nếu có)</label>
                                      <input id="agentAddress" type="text" class="form-control" placeholder="Enter ..." value="@if(isset($listing->socialCommunications[1])) {{ $listing->socialCommunications[1]->address or "" }} @endif

                                      ">
                                    </div>
                                </div>
                            </div><!-- /.row -->  
                        </div><!-- /.box -->
                        </div>
                        <div class="box">
                            <h3 class="box-title">Thông Tin Hoa Hồng</h3>
                            @if(!isset($listing->sellCommission) && $listing->listingType == 2 ) 
                            <div class="row">
                              <div class="col-xs-3">
                                <label>Thời Hạn Hợp Đồng</label>
                              </div>
                              <div class="col-xs-3">
                                <label>Hoa Hồng</label>
                              </div>
                            </div>
                            @endif
                            <div class="wrapper-hoahong">
                            @if(!isset($listing->sellCommission) && $listing->listingType == 1)
                            <div class="row row-hh">
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <div class="radio">
                                            <label>
                                            <input id="sellCommission" type="radio" name="sellCommission" value="1">Theo phần trăm giá bán</label>
                                            <input id="sellCommissionValue" type="number" class="form-control" name="sellCommissionValue" value="">        
                                          </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <div class="radio">
                                            <label>
                                            <input id="sellCommission" type="radio" name="sellCommission" value="2">Bằng tiền</label>
                                            <input id="sellCommissionValueMoney" type="number" class="form-control" name="sellCommissionValue" value="" >        
                                          </div>
                                        </div>
                                    </div>
                            </div>
                            @endif
                            @if(isset($listing->sellCommission)) 
                            <div class="row row-hh">
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <div class="radio">
                                            <label>
                                            <input id="sellCommission" {{$listing->sellCommission === "1" ? "checked" : "" }} type="radio" name="sellCommission" value="1">Theo phần trăm giá bán</label>
                                            <input id="sellCommissionValue" type="number" class="form-control" name="sellCommissionValue" value="{{$listing->sellCommission === "1" && isset($listing->commissionValue) ? $listing->commissionValue : "" }}">        
                                          </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <div class="radio">
                                            <label>
                                            <input id="sellCommission" {{$listing->sellCommission === "2" ? "checked" : "" }} type="radio" name="sellCommission" value="2">Bằng tiền</label>
                                            <input id="sellCommissionValueMoney" type="number" class="form-control" name="sellCommissionValue" value="{{$listing->sellCommission === "2" && isset($listing->commissionPrice) ? $listing->commissionPrice : "" }}" >        
                                          </div>
                                        </div>
                                    </div>
                            </div>
                            @else

                            @if($listing->listingType == 2)
                            @if(isset($listing->contractTime) && $listing->commission != "")
                            @foreach($listing->contractTime as $key => $commissionChild)

                            <div class="row row-hh">
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <select class="commision-time form-control select2" style="width: 70%;">
                                              <option value="">Vui lòng chọn</option>
                                              @for($i = 1; $i <= 60 ; $i++)                       
                                              <option value="{{ $i }}" @if($listing->contractTime[$key] == $i) selected="selected" @endif> {{ $i }}</option>
                                              @endfor
                                          </select>
                                           /Tháng
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <div class="form-group">
                                          <select class="commision form-control select2" style="width: 70%;">
                                              <!-- chu y -->
                                              <option value="">Vui lòng chọn</option>
                                              @for($j = 0.1; $j<=6 ; $j+=0.1)                             
                                              <option value="{{$j}}"  {{ abs($listing->commission[$key] - $j) < 0.01 ? 'selected' :'' }}  > {{ $j }}</option>
                                              @endfor
                                          </select>
                                           /Tháng
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                      <span class="add-row">
                                        <i class="fa fa-minus minus-row"> Trừ</i>
                                      </span>  
                                    </div>
                            </div>
                            @endforeach    
                             
                            @endif                       
                            <div class="row row-hh">
                              <div class="col-xs-3">
                                  <div class="form-group">
                                    <select class="commision-time form-control select2" style="width: 70%;">
                                        <option value="">Vui lòng chọn</option>
                                        @for($i = 1; $i < 61 ; $i++)                                 
                                        <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                    </select>
                                     /Tháng
                                  </div>
                              </div>
                              <div class="col-xs-3">
                                  <div class="form-group">
                                    <select class="commision form-control select2" style="width: 70%;">
                                        <option value="">Vui lòng chọn</option> 
                                        @for($i = 0.1; $i<=6 ; $i+=0.1)                             
                                        <option value="{{ $i }}">{{ $i }}</option>
                                        @endfor
                                      </select>
                                     /Tháng
                                  </div>
                              </div>
                              <div class="col-xs-3">
                                <span class="add-row"><i class="fa fa-plus txt-add"> Thêm</i></span>
                              </div>
                            </div>
                            @endif 
                            @endif 
                            </div>
                            <!-- End Wrapper Hoahong -->
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                      <label>Note cho người môi giới <strong>Tiếng Việt</strong> </label>
                                      <textarea id="noteForAgent" name="noteForAgent" class="form-control" rows="3" placeholder="Enter ..."> {{$listing->noteForAgent->vi or ""}}</textarea>
                                    </div>
                                </div>
                            </div><!-- /.row -->
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                      <label>Note cho người môi giới <strong>Tiếng Anh</strong> </label>
                                      <textarea id="noteForAgent-en" name="noteForAgent-en" class="form-control" rows="3" placeholder="Enter ..."> {{$listing->noteForAgent->en or ""}}</textarea>
                                    </div>
                                </div>
                            </div>

                        </div><!-- /.box -->
                        
                    </div><!-- /.box-body -->
                    <div class="box-footer"> 
                        <input id="draftId" type="hidden" class="form-control" value="{{ $listing->draftId or ""}}"/>  
                        <input id="rId" type="hidden" class="form-control" value="{{ $listing->rId or ""}}"/>  
                        <button type="button" id="finish-reviewing" class="btn btn-primary">Reviewing</button>
                        <button type="button" id="finish-live" class="btn btn-primary">Live</button>
                    
                    </div>
                </form>
            </div><!-- /.box -->
        </div>
    </div>
@endsection

@section('page-js')   
     @extends('templates.amenities-item')
     @extends('templates.commission-for-sale')
     @extends('templates.commission-for-rent')
     @extends('templates.move-in-date-for-sale')
     @extends('templates.move-in-date-for-rent')
   <!-- <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>-->

    <!-- select2 -->
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
     <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <!-- iCheck 1.0.1 -->
    <script src="{{loadAsset("/plugins/iCheck/icheck.min.js")}}"></script>
    <script src="{{loadAsset("/js/bootstrap-datepicker.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>

    <script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
    <script src="{{loadAsset("/plugins/wysihtml/wysihtml5.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>


    <script src="{{loadAsset("/js/template7.min.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>
    <script src="{{loadAsset("/js/draft-listing.js")}}"></script>
    <script type="text/javascript">
      String.prototype.raw = function() {
      title = this;
      title = title.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
      title = title.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
      title = title.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
      title = title.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
      title = title.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
      title = title.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
      title = title.replace(/đ/gi, 'd');

      return title;
    }
      String.prototype.slug = function()
      {
          title = this;
          slug = title.toLowerCase().raw();
          //Xóa các ký tự đặt biệt
          slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
          //Đổi khoảng trắng thành ký tự gạch ngang
          slug = slug.replace(/ /gi, " - ");
          //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
          //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
          slug = slug.replace(/\-\-\-\-\-/gi, '-');
          slug = slug.replace(/\-\-\-\-/gi, '-');
          slug = slug.replace(/\-\-\-/gi, '-');
          slug = slug.replace(/\-\-/gi, '-');
          //Xóa các ký tự gạch ngang ở đầu và cuối
          slug = '@' + slug + '@';
          slug = slug.replace(/\@\-|\-\@|\@/gi, '');
          
          slug = slug.replace(/\s/g, '');
          slug = slug.replace(/\-\-/gi, '-');

          if(slug == "van-phong") slug = "van-phong-cho-thue";
          if(slug == "can-ho") slug = "can-ho-cho-thue";
          return slug;
      }
    </script>


    
    <script>
        // $(function () {
        //     $("#table-staff").DataTable();
        //     $("#calenda").daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A'});
        //   });
        //getBuidingDetail($('#building').val());
        var socialUserId = <?=$socialUser->socialUid?>;
        var listingTypeId = <?=$listing->listingType?>;
        var accountId = <?=$accountId?>;
        var source = <?=$userTypeId?>;
        var draftId = <?=$draftId?>;
        var kind_bds = <?= $listing->purposeType ?> 
        $(function () {
            $(".select2").select2();
            //get_property_type();
            get_agent_list();
            //Initialize Select2 Elements
            $('#finish-reviewing').click(function(){
               var prepare = prepareListingData();
               listingObjectBuilding.status = { "statusId" : 2 };
               listingObjectNotBuilding.status = listingObjectBuilding.status;
               listingObjectBuilding.rlMoveInDate = rlMoveInDate ;
               listingObjectNotBuilding.rlMoveInDate = rlMoveInDate ;
               //listingObjectNotBuilding.socialUser.socialUid = socialUserId ;
               //listingObjectNotBuilding.account.accountId = accountId ;
               listingObjectNotBuilding.draftId = draftId ;

               //listingObjectBuilding.socialUser.socialUid = socialUserId ;
               //listingObjectBuilding.account.accountId = accountId ;
               listingObjectBuilding.draftId = draftId ;
               

               if(prepare)
                 createListing(listingObjectBuilding);

               return false;
            });

            $('#finish-live').click(function(){
              if($('.file-preview-frame').length == 0)
                  {
                    alert('Vui lòng chọn ít nhất một tấm ảnh');
                      $('.imageListing').focus();
                      return false;
                  } 
              if($('.imageListing').find('.kv-upload-progress .progress-bar-success').length >0){
                          if($('.imageListing .kv-upload-progress').find('.progress-bar-success').attr('aria-valuenow') < 100)
                              {
                                alert('Quá trình upload ảnh chưa xong, xin vui lòng đợi');
                                return false;
                            }
                  }     
                  if($('#city').val() == "")
                  {
                    alert('Vui lòng chọn thành phố');
                   $('#city').focus();
                    return false;
                  }
                  if($('#district').val() == "")
                  {
                    alert('Vui lòng chọn quận');
                   $('#district').focus();
                    return false;
                  }              
                  if(isBuilding)
                    if($('#building').val() == ""){
                        alert('Vui lòng chọn Building');
                        $('#building').focus();
                        return false;
                    if($('#building option:selected').attr('isverified') != 1){
                        alert('Vui lòng chọn Building Có verify');
                        $('#building').focus();
                        return false;      
                    }  
                  } 
               var prepare = prepareListingData();

               listingObjectBuilding.status = { "statusId" : 3 };
               listingObjectNotBuilding.status = listingObjectBuilding.status;
               listingObjectBuilding.rlMoveInDate = rlMoveInDate ;
               listingObjectNotBuilding.rlMoveInDate = rlMoveInDate ;
               //listingObjectNotBuilding.socialUser.socialUid = socialUserId;
               //listingObjectNotBuilding.account.accountId = accountId;
               listingObjectNotBuilding.draftId = draftId;

               //listingObjectBuilding.socialUser.socialUid = socialUserId ;
               //listingObjectBuilding.account.accountId = accountId ;
               listingObjectBuilding.draftId = draftId ;
               if($('#price').val() == "")
               {
                  alert('Thông tin nhập chưa đầy đủ');
                  $('#price').focus();
                  return false;
               }             
               if(prepare)
                createListing(listingObjectBuilding);

              return false;
            });
          });

        function createListing(object){
          urlCreateListing = "/createListing";
           console.log(object);
           post_sync(urlCreateListing, object, true, function(data){
           console.log(object);
               console.log(data);
               alert(data['message'] + " listingId: " +data['data'].listingId + " rlistingId: " +data['data'].rlistingId);
           });
        }
        var json_path = <?=isset($listing->tempPhoto) ? json_encode($listing->tempPhoto) : "\"\""?>;
        var path = [];
        if(json_path != ""){
        $(json_path).each(function(index, item) {
          path.push("<img src='"+(item.url_path + item.file_name)+"' class='file-preview-image' name='"+item.file_id+"' alt='"+item.file_name+"' title='"+item.file_name+"' />");
        });
        var pathConfig = [];
        $(json_path).each(function(idx, item){
          linkArr = item.url_path.split("/");
          pathConfig.push({
            caption: item.caption,
            width: '120px',
            url: "/imageListingRemover",
            key: item.file_name
          })
        });
        };
        var json_path_video = <?=isset($listing->tempVideo) ? json_encode($listing->tempVideo) : "\"\""?>;
        var path_video = [];
        if(json_path_video != ""){
          video = json_path_video[0];
          path_video.push("<video width='213px' height='160px' controls title='"+video.file_name+"'><source name='"+video.file_id+"' title='"+video.file_name+"' src='"+(video.url_path + video.file_name)+"' type='video/mp4'><div class='file-preview-other'><span class='file-icon-4x'><i class='glyphicon glyphicon-file'></i></span></div></video>");
          var path_video_config= [];
              path_video_config.push({
              caption: "",
              key: video.file_name
          });
        };
            // $(function () {
            //     $("#table-staff").DataTable();
            //     $("#calenda").daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A'});
            //   }); 
        $(".file-image").fileinput({
            deleteUrl:"/imageListingRemover",
            initialPreview: path,
            initialPreviewConfig: pathConfig,
            allowedFileExtensions : ['jpg', 'png','gif'],
            overwriteInitial: false,
            allowedFileTypes: ['image'],
            slugCallback: function(filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        });       
        $(".file-video").fileinput({
            deleteUrl:"/videoListingRemover",
            allowedFileExtensions : ['mp4'],
            overwriteInitial: false,
            initialPreviewConfig: path_video_config,
            initialPreview:path_video,
            maxFileSize: 20000000,
            maxFilesNum: 1,
            allowedFileTypes: ['video'],
            slugCallback: function(filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
          });
    </script>
    <script id="hoa-hong-tmpl" type="text/template7">
        <div class="row row-hh">
          <div class="col-xs-3">
              <div class="form-group">
                <select class="commision-time form-control select2" style="width: 70%;">
                    <option value="">Vui lòng chọn</option>
                    @for($i = 1; $i < 61; $i++)                                 
                    <option value="{{ $i }}">{{ $i }}</option>
                    @endfor
                  </select>
                 /Tháng
              </div>
          </div>
          <div class="col-xs-3">
              <div class="form-group">
                <select class="commision form-control select2" style="width: 70%;">
                    <option value="">Vui lòng chọn</option> 
                    @for($i = 0.1; $i<=6 ; $i+=0.1)                             
                    <option value="{{ $i }}">{{ $i }}</option>
                    @endfor
                  </select>
                 /Tháng
              </div>
          </div>
          <div class="col-xs-3">
            <span class="add-row"><i class="fa fa-plus txt-add"> Thêm</i></span>
          </div>
        </div>
    </script>
@stop
@section('page-css')
    <!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
    <link href="{{loadAsset("/css/common.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />

    <link href="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.css")}}" rel="stylesheet" type="text/css" />

    <link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
