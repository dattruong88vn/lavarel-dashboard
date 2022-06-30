@extends('layout.default')
@section('content')
<input type="hidden" id="csrf-token" value="{{ csrf_token() }}" />
<div class="row">
    <?php if (!empty($listing->note)) : ?>
        <div class="col-md-12">
            <div class="box box-info">
                <div class="box-header">
                    <h3 class="box-title">Note</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <label>{!! $listing->note !!}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>

    <div class="col-md-12">
        <div class="box box-info">
            <div class="box-header">
                <h3 class="box-title">Listing-{{ $listing->rId}}</h3>
                <input type="hidden" id="rlistingId" value="{{$listing->rId}}" />
                 <!-- <small>Advanced and full of features</small> -->
                 <div class="pull-right">
                   <!--<button id="showInternalRequestFromLso" class="btn btn-primary"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Note từ LSO</button>-->
                   <button id="showRequestFromLso" class="btn btn-danger"><span class="glyphicon glyphicon-transfer" aria-hidden="true"></span> Yêu cầu từ LSO</button>
                 </div>
            </div>
            <form role="form">
                <div class="box-body">
                    <div class="row">
                        <!--Images/Video-->
                        <div class="col-md-12 col-xs-12">
                            <div class="form-group imageListing">
                                <label>Hình ảnh</label>
                                <input class="file-image-update" multiple type="file" class="file" data-upload-url="/imageListingUploader" >

                            </div>
                            <div class="form-group videoListing">
                                <label>Video</label>
                                <input class="file-video" type="file" class="file" data-upload-url="/videoListingUploader">
                            </div>
                        </div>
                        <!-- #Images/Video-->
                    </div>
                    <div class="row">
                        <!--Images/Video-->
                        <div class="col-md-12 col-xs-12">

                        </div>
                        <!-- #Images/Video-->
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Loại hình giao dịch</label>
                                <select id="type-business" name="type-business" class="form-control select2" style="width: 100%;">
                                    <option value="2" @if($listing->listingType->listingTypeID == 2 || $listing->listingType->listingTypeID == 4) selected="selected" @endif>Thuê</option>
                                    <option value="1" @if($listing->listingType->listingTypeID == 1 || $listing->listingType->listingTypeID == 3) selected="selected" @endif>Bán</option>
                                    <!--<option value="3" @if($listing->listingType->listingTypeID ==  3) selected="selected" @endif>Bán (Chưa xác định)</option>
                                    <option value="4" @if($listing->listingType->listingTypeID == 4 ) selected="selected" @endif>Thuê (Chưa xác định)</option> -->
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Mục đích kinh doanh</label>
                                <select id="purpose-business"  name="purpose-business" class="form-control select2" style="width: 100%;">
                                    @if($listing->listingType->listingTypeID == 2 || $listing->listingType->listingTypeID == 4)
                                    <option value="2" @if($listing->purpose->purPoseID == 2 ) selected="selected" @endif>Thương mại</option>
                                    <option value="1" @if($listing->purpose->purPoseID == 1 ) selected="selected" @endif>Để ở</option>
                                    @else
                                    <option value="3" @if($listing->purpose->purPoseID == 3 ) selected="selected" @endif>Bán</option>
                                    @endif
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Request</label>
                                <select id="request" name="request" class="form-control select2" style="width: 100%;">
                                    <option>--- Vui Lòng Chọn ---</option>
                                    @foreach($requestListLittle as $request)
                                    <option value="{{$request->id}}" @if(isset($listing->requestId) && $listing->requestId == $request->id) selected="selected" @endif>{{$request->value}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Transaction</label>
                                <select id="transaction"  name="transaction" class="form-control select2" style="width: 100%;">
                                    <option>--- Vui Lòng Chọn ---</option>
                                    @foreach($transactionListLittle as $transaction)
                                    <option value="{{$transaction->id}}" @if(isset($listing->transactionId) && $listing->transactionId == $transaction->id) selected="selected" @endif>{{$transaction->value}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Loại BDS</label>
                                <select id="kind-bds" name="kind-bds" class="form-control select2" style="width: 100%;">
                                    @foreach($propertyTypeListFilter as $propertyType)
                                    <option value="{{ $propertyType->propertyTypeID }}"
                                            @if($propertyType->propertyTypeID == $listing->propertyType->propertyTypeID) selected="selected"  @endif
                                            >{{ $propertyType->typeName }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Building</label>
                                        <select id="building" name="building" class="form-control select2" style="width: 100%;">

                                            <option value="">---Vui Lòng Chọn----</option>

                                            @foreach($buildingList as $building)
                                            @if($building->isVerified)

                                            <option isVerified="{{ $building->isVerified }}" listingId="{{ $building->listingId }}" value="{{ $building->buildingId }}"
                                                    @if(isset($listing->listing->building) && $building->buildingId == $listing->listing->building->bId) selected="selected"  @endif
                                                    >{{ $building->buildingName }}</option>

                                            @endif
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Tên project</label>
                                        <select id="developer"  name="developer" class="form-control select2" style="width: 100%;">
                                            <option value>--- Vui Lòng Chọn ---</option>
                                            @foreach($projectList as $project)
                                            <option value="{{$project->pId}}" @if(isset($listing->listing->project) && $listing->listing->project->pId == $project->pId)selected @endif>{{$project->projectName}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div><!-- /.col -->

                            </div>
                        </div><!-- /.row -->
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Block</label>
                                <select id="block" name="block" class="form-control select2" style="width: 100%;">
                                    @if(isset($listing->listing->building->blocks))
                                    @foreach($listing->listing->building->blocks as $key=>$block)
                                    <option data-index="{{$key}}" value="{{ $block->blockId }}"
                                            @if($block->blockId == $listing->blockId) selected="selected"  @endif
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
                                            <option value="{{ $user->id}}" @if(isset($listing->source) && $listing->source == $user->id) selected @endif> {{$user->name}}</option>
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
                                            <option phone="{{$user->phone}}" accountid="{{$user->accountId}}" value="<?php echo number_format($user->socialUid, 0, '', '') ?>" @if(isset($listing->socialUser->socialUid) && $listing->socialUser->socialUid == $user->socialUid) selected @endif>{{$user->name}}</option>
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
                                <input id="address" name="address" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->listing->address }}">
                            </div>
                        </div><!-- /.col -->
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Lat</label>
                                        <input id="lat" name="lat" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->latitude}}">
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Long</label>
                                        <input id="long" name="long" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->longitude}}">
                                    </div>
                                </div>
                            </div>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Thành phố</label>
                                <select id="city" name="city" class="form-control select2" style="width: 100%;">
                                    <option value="">---Vui lòng chọn--- </option>
                                    @foreach($cityList as $city)
                                    <option value="{{ $city->cityId }}"
                                            @if(isset($listing->cityId) && $city->cityId == $listing->cityId) selected="selected"  @endif
                                            >{{ $city->cityName }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Quận</label>
                                        <select id="district" name="district" class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui lòng chọn--- </option>
                                            @foreach($districtList as $district)
                                            <option value="{{ $district->districtId }}"
                                                    @if(isset($listing->districtId) && $district->districtId == $listing->districtId) selected="selected"  @endif
                                                    >{{ $district->districtName }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Phường</label>
                                        <select id="ward" name="ward" class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui lòng chọn--- </option>
                                            @foreach($wardList as $ward)
                                            <option value="{{ $ward->wardId }}"
                                                    @if(isset($listing->ward) && $ward->wardId == $listing->ward->wardId) selected="selected"  @endif
                                                    >{{ $ward->wardName }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div><!-- /.col -->
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Số nhà</label>
                                <input id="houseNumber" name="houseNumber" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->houseNumber}}">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Đường</label>
                                <select id="streetId" name="streetId" class="form-control" style="width: 100%;">
                                    <option value="">---Vui lòng chọn--- </option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <button class="btn btn-warning btn-check-existed-address">Check địa chỉ</button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Short Address</label>
                                <input id="short-address" name="short-address" type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->shortAddress or ""}}">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Tiêu đề</label>
                                <input id="title-listing" name="title-listing" type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->title or  ""}}">
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
                                <input id="title-listing-en" name="title-listing-en" type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->rlLanguages[0]->title or ""}}">
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
                                       value="{{ $listing->listing->numberFloor or ""}}">

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
                                <input type="number" id="bedroom-number" name="bedroom-number" value="{{ $listing->bedRooms }}" class="form-control" placeholder="Nhập số phòng ngủ.."/>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Phòng Tắm/WC</label>
                                <input type="number" id="bathroom-number" name="bathroom-number" value="{{ $listing->bathRooms }}" class="form-control" placeholder="Số Phòng Tắm/WC.."/>                                  
                            </div>
                        </div>

                    </div><!-- /.row -->

                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Listing Nằm Ở Tầng (Từ)</label>
                                        <select id="place-number" name="place-number"  class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui Lòng Chọn---</option>
                                            <option value="-1" @if($listing->floors == -1) selected="selected" @endif> Tầng trệt </option>
                                            <option value="-2" @if($listing->floors == -2) selected="selected" @endif > Tầng lửng </option>
                                            <option value="-3" @if($listing->floors == -3) selected="selected" @endif > Tầng thượng </option>
                                            @for($i=1; $i<= $listing->listing->numberFloor; $i++)
                                            <option value="{{$i}}" @if($listing->floors == $i) selected="selected" @endif >Tầng {{ $i }}</option>
                                            @endfor
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>(Tới) Listing Nằm Ở Tầng</label>
                                        <select id="place-number-to" name="place-number-to"  class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui Lòng Chọn---</option>
                                            <option value="-1" @if($listing->floorsTo == -1) selected="selected" @endif> Tầng trệt </option>
                                            <option value="-2" @if($listing->floorsTo == -2) selected="selected" @endif > Tầng lửng </option>
                                            <option value="-3" @if($listing->floorsTo == -3) selected="selected" @endif > Tầng thượng </option>
                                            @for($i=1; $i<= $listing->listing->numberFloor; $i++)
                                            <option value="{{$i}}" @if($listing->floorsTo == $i) selected="selected" @endif >Tầng {{ $i }}</option>
                                            @endfor
                                        </select>
                                    </div>
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
                                                <input class="utilitie" name="isMezzanine" id="isMezzanine" type="checkbox" @if($listing->listing->isMezzanine) checked @endif>
                                                       Mezzanine
                                            </label>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <input class="isRooftop" name="isRooftop" id="isRooftop" type="checkbox" @if($listing->listing->isRooftop) checked @endif>
                                                       Rooftop
                                            </label>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <input class="isPenhouse" name="isPenhouse" id="isPenhouse" type="checkbox" @if($listing->listing->isPenhouse) checked @endif>
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
                        </div><!-- /.row -->
                    </div>

                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <?php
                                $positions = array(
                                    1 => "Mặt tiền",
                                    2 => "Trong hẻm",
                                );
                                ?>
                                <label>Vị trí bất động sản</label>
                                <select name="propertyPosition" id="propertyPosition">
                                    <option value="">Chọn</option>
                                    <?php
                                    foreach ($positions as $key => $value):
                                        $selected = "";
                                        if ($listing->propertyPosition == $key) {
                                            $selected = "selected";
                                        }
                                        ?>
                                        <option value="{{$key}}" {{$selected}} >{{$value}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->


                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Giá thật {{isset($listing->listingType) && $listing->listingType->listingTypeID == "1" ? "" : ""}}</label>
                                <input id="price" type="text" class="form-control" placeholder="Enter ..."
                                       value='{{$listing->price}}'>
                            </div>
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input id="isVat" type="checkbox" @if($listing->isVAT == true) checked  @endif >
                                               Giá bao gồm VAT
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-12">
                            <label>Loại Tiền</label>
                            <select id="currency" class="form-control select2" style="width: 100%;">
                                <option value="vnd" @if($listing->currency == "VND") selected="selected" @endif>VND</option>
                                <option value="usd" @if($listing->currency == "USD") selected="selected" @endif>USD</option>
                            </select>
                        </div>
                        <div class="col-md-2 col-xs-12">
                            <label>Thông tin còn trống</label>
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input id="isAvailable" type="checkbox" @if($listing->isAvailable == true) checked  @endif >
                                               Chọn còn trống
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Giá thấp nhất {{isset($listing->listingType) && $listing->listingType->listingTypeID == "1" ? "(triệu)" : "(m2/tháng)"}}</label>
                                <input id="minPrice" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->minPrice}}">
                            </div>
                        </div>
                        <div class="col-md-8 col-xs-12">
                            <div class="form-group">
                                <label>Note cho giá thấp nhất</label>
                                <form>
                                    <textarea class="form-control" rows="3" name="noteForMinPrice" id="noteForMinPrice" placeholder="Enter ..." value="">{{$listing->noteForMinPrice or ""}}</textarea>
                                </form>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="box-line">
                        <h4 class="box-title">Phí (
                            <select id="currency_fee" class="form-control select2" style="width: 25%;">
                                <option value="vnd" @if(isset($currency_fee) && $currency_fee == "VND" ) selected="selected" @endif>VND</option>
                                <option value="usd" @if(isset($currency_fee) && $currency_fee == "USD") selected="selected" @endif>USD</option>
                            </select> ) <strong id="fee-title"></strong>
                        </h4>
                        <div class="row">
                            @foreach($fee_listing as $value)
                            <div class="col-md-3 col-xs-12 fee-listing ">
                                <div class="form-group">
                                    <label> {{$value->feesName}} </label>
                                    <?php
                                    $array = check_fee_listing($value->ftId, $listing->relatedListingFees);
                                    $feeValue = "";
                                    if ($array != null && $array->includingPrice == false) {
                                        if (isset($array->price)) {
                                            $feeValue = number_format($array->price, 2, '.', '');
                                        }
                                    }
                                    ?>
                                    <input id="fee" type="text" class="form-control" placeholder="Enter ..." value="{{$feeValue}}" >
                                </div>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input id="fee-checkbox" type="checkbox" ftId="{{ $value->ftId }}" dataname="{{ $value->feesName }}" @if($array != null && $array->includingPrice == true) checked @endif >
                                                   Phí bao gồm trong giá
                                        </label>
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div><!-- /.row -->
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Đặt Cọc ({{isset($listing->listingType) && $listing->listingType->listingTypeID == "1" ? "triệu" : "tháng"}})</label>
                                <input id="deposit" value='{{$listing->deposit}}' class="form-control" type="text"></input>
                            </div>
                            <div class="form-group">
                                <div id="allowchange" class="checkbox">
                                    <label>
                                        <input type="checkbox" @if($listing->allowChange == true) checked @endif>
                                               Được Phép Thay Đổi Kết Cấu
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div><!-- /.row -->
                    <div class="box-line wrapper-move-in-date">
                        <h3 class="box-title">Ngày có thể dọn vào</h3>
                        <div class="row">
                            @if($listing->listingType->listingTypeID == 2 || $listing->listingType->listingTypeID == 4)
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <div class="date">
                                        <div class="input-group input-append date" id="datePicker">
                                            <input id="eventDate" type="text" class="form-control" name="eventDate"
                                                   value="@if($listing->rlMoveInDate!=null && $listing->rlMoveInDate->moveInDate != null){{date('d-m-Y',$listing->rlMoveInDate->moveInDate/1000)}}@endif"/>
                                            <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="moveInNow"  @if($listing->rlMoveInDate!=null && $listing->rlMoveInDate->moveInNow == true && $listing->listingType->listingTypeID == 2 ) checked @endif />
                                                   Có thể dọn vào ngay
                                        </label>
                                    </div>
                                </div>
                            </div>
                            @else
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="radio">
                                        <label>

                                            <input id="afterSigningContract" type="radio" name="optradio" value="" @if($listing->rlMoveInDate!= null && $listing->rlMoveInDate->afterSigningContract == true) checked @endif> Dọn vào sau khi ký hợp đồng
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="radio">
                                        <label>
                                            <input id="afterNumberDays" type="radio" name="optradio" @if($listing->rlMoveInDate != null && $listing->rlMoveInDate->afterNumberDays != "") checked="checked" @endif>Sau khi ký hợp đồng [x] ngày</label>
                                        <select  id="afterNumberDaysSelect" class="form-control select2 bs-select-hidden"  style="width: 100%;">
                                            <option>---Vui lòng chọn---</option>
                                            @for($i = 1;$i <= 24;$i++)
                                            <option value="{{$i}}" <?php
                                            if (isset($listing->rlMoveInDate) && intval($listing->rlMoveInDate->afterNumberDays) == $i) {
                                                echo 'selected';
                                            }
                                            ?>> {{$i}} tháng</option>
                                            @endfor
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="radio">
                                        <label><input id="moveInNowSale" type="radio" name="optradio" @if($listing->rlMoveInDate!= null && $listing->rlMoveInDate->moveInNow == true && $listing->listingType->listingTypeID == 1  ) checked @endif >Dọn Vào Ngay</label>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="radio">
                                        <label><input id="eventDateSaleCheck" type="radio" name="optradio" @if($listing->rlMoveInDate!= null && $listing->rlMoveInDate->moveInDate != "" && $listing->rlMoveInDate->moveInNow == false && $listing->listingType->listingTypeID == 1) checked @endif>Ngày dọn vào</label>
                                        <div class="date">
                                            <div class="input-group input-append date" id="datePicker">
                                                <input id="eventDateSale" type="text" class="form-control" name="eventDateSale"
                                                       value="@if($listing->rlMoveInDate!= null && $listing->rlMoveInDate->moveInDate != "" && $listing->rlMoveInDate->moveInNow == false && $listing->listingType->listingTypeID == 1){{date('d-m-Y',$listing->rlMoveInDate->moveInDate/1000)}}@endif"/>
                                                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            @endif
                        </div>
                    </div> <!-- end box -->
                    <div class="row">
                        <div class="col-md-8 col-xs-12">
                            <div class="form-group">
                                <label>Số Tầng Hầm</label>
                                <select id="baseme" class="form-control select2" style="width: 100%;">
                                    <option>--- Vui Lòng Chọn ---</option>
                                    <option value="1" @if($listing->listing->numberBasement == 1) selected="selected" @endif>1</option>
                                    <option value="2" @if($listing->listing->numberBasement == 2) selected="selected" @endif>2</option>
                                    <option value="3" @if($listing->listing->numberBasement == 3) selected="selected" @endif>3</option>
                                    <option value="4" @if($listing->listing->numberBasement == 4) selected="selected" @endif>4</option>
                                    <option value="5" @if($listing->listing->numberBasement == 5) selected="selected" @endif>5</option>
                                    <option value="6" @if($listing->listing->numberBasement == 6) selected="selected" @endif>6</option>
                                    <option value="7" @if($listing->listing->numberBasement == 7) selected="selected" @endif>7</option>
                                    <option value="8" @if($listing->listing->numberBasement == 8) selected="selected" @endif>8</option>
                                    <option value="9" @if($listing->listing->numberBasement == 9) selected="selected" @endif>9</option>
                                    <option value="10" @if($listing->listing->numberBasement == 10) selected="selected" @endif>10</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Thang Máy</label>
                                <select id="numberElevator" class="form-control select2" style="width: 100%;">
                                    <option value="">--Không có--</option>
                                    @for($i=1; $i< 100; $i++)
                                    <option value="{{$i}}" @if($listing->listing->numberElevator == $i) selected="selected" @endif> {{$i}} </option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Năm Xây Nhà</label>
                                <input  id="yearbuilt" name="yearbuilt" type="text" class="form-control" placeholder="Enter ..."
                                        value="{{ $listing->listing->yearBuilt or "" }}"
                                        >
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Năm Sửa Nhà</label>
                                <input id="yearfixed" name="yearfixed" type="text" class="form-control" placeholder="Enter ..."
                                       value="{{ $listing->listing->yearFixed or "" }}"
                                       >
                            </div>
                        </div>

                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Hướng Nhà</label>
                                <select name="direction" id="direction" class="form-control select2" style="width: 100%;">
                                    <option value="0">--- Vui Lòng Chọn ---</option>
                                    <option value="1" @if(isset($listing->direction->dId) && $listing->direction->dId == 1) selected="selected"  @endif>Đông</option>
                                    <option value="2" @if(isset($listing->direction->dId) && $listing->direction->dId == 2) selected="selected"  @endif>Tây</option>
                                    <option value="3" @if(isset($listing->direction->dId) && $listing->direction->dId == 3) selected="selected"  @endif>Nam</option>
                                    <option value="4" @if(isset($listing->direction->dId) && $listing->direction->dId == 4) selected="selected"  @endif>Bắc</option>
                                    <option value="5" @if(isset($listing->direction->dId) && $listing->direction->dId == 5) selected="selected"  @endif>Đông Bắc</option>
                                    <option value="6" @if(isset($listing->direction->dId) && $listing->direction->dId == 6) selected="selected"  @endif>Tây Bắc</option>
                                    <option value="7" @if(isset($listing->direction->dId) && $listing->direction->dId == 7) selected="selected"  @endif>Đông Nam</option>
                                    <option value="8" @if(isset($listing->direction->dId) && $listing->direction->dId == 8) selected="selected"  @endif>Tây Nam</option>
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="box-line">
                        <h3 class="box-title">Thông tin cơ bản</h3>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Giấy chủ quyền</label>
                                    <!-- <input id="agentList" name="agentList"  type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->socialCommunications->name or "" }}"> -->
                                    <select id="userRightType" name="userRightType" class="form-control select2" style="width: 100%;">
                                        <option value="">--- Chọn giấy chủ quyền ---</option>
                                        <option @if(isset($listing->useRightType) && $listing->useRightType->useRightTypeId == 1) selected @endif value="1"> Sổ đỏ </option>
                                        <option @if(isset($listing->useRightType) && $listing->useRightType->useRightTypeId == 2) selected @endif  value="2"> Sổ hồng </option>
                                        <option @if(isset($listing->useRightType) && $listing->useRightType->useRightTypeId == 3) selected @endif value="3"> Khác </option>
                                        <option @if(isset($listing->useRightType) && $listing->useRightType->useRightTypeId == 4) selected @endif value="4">Giấy tay</option>
                                        <option @if(isset($listing->useRightType) && $listing->useRightType->useRightTypeId == 5) selected @endif value="4">Giấy chứng nhận phường quận</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Hẻm</label>
                                    <input id="alley" name="alley" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->alley or ""}}">
                                </div>
                            </div>
                            <!-- <div class="col-md-4">
                                <div class="form-group">
                                    <label>Thông tin hoa hồng</label>
                                    <input id="commissionText" name="commissionText" type="text" class="form-control" placeholder="Enter ..." value=""/>
                            </div> -->
                        </div><!-- /.row -->
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Thời gian tối thiểu hơp đông</label>
                                    <input id="minContractDeadline" name="minContractDeadline"  type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->minContractDeadline or "" }}">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Số tầng của building </label>
                                    <input id="numberOfFloorsBuilding" name="numberOfFloorsBuilding" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->numberOfFloorsBuilding or ""}}">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Thông tin đặt cọc</label>
                                    <input id="depositText" name="depositText" type="text" class="form-control" placeholder="Enter ..." value="{{$listing->depositText or ""}}">
                                </div>
                            </div>
                        </div><!-- /.row -->
                    </div>

                    <div class="row">
                        <!--Images/Video-->
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group redBookPhoto">
                                <label>Sổ đỏ</label>
                                <input class="file-image" multiple type="file" class="file" data-upload-url="/imageListingUploader?dir=use_right_type">
                            </div>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <div class="form-group pinkBookPhoto">
                                <label>Sổ hồng</label>
                                <input class="file-image" multiple type="file" class="file" data-upload-url="/imageListingUploader?dir=use_right_type">
                            </div>
                        </div>
                        <!-- #Images/Video-->
                    </div>

                    <div class="box-line">
                        <h3 class="box-title">Tiện Ích Của Listing</h3>
                        <div class="amenity-content" id="amenities" class="row">

                            @foreach($amenityList as $amenityChild)
                            <div class="col-md-3 utilitie-item-content">
                                <div class="checkbox">
                                    <label><input data="@if(count($amenityChild->amenityChild)>1){{1}}@else{{0}}@endif" id="amenities-child" type="checkbox" class="utilitie" name="" dataText="{{ $amenityChild->amenityName }}" @if(check_amenities_listing($amenityChild->id,$listing->amenitiesList)) checked @endif value="{{$amenityChild->id}}">{{$amenityChild->amenityName}}</label>
                                </div>

                                <div class="amenityc-child-content" data="{{ count($amenityChild->amenityChild) }}"  >
                                    @foreach ($amenityChild->amenityChild as $amenity2Child)

                                    <div class="checkbox">
                                        <label><input data="0" name="" dataText="{{$amenity2Child->amenityName}}" type="checkbox" class="amenityc-child" name="" dataText="" @if(check_amenities_listing($amenity2Child->id,$listing->amenitiesList)) checked @endif value="{{$amenity2Child->id}}">{{$amenity2Child->amenityName}}</label>
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <div class="form-group">
                                <label>Loại tiện ích khác tiếng Việt</label>
                                <input id="amenities-other" name="amenities-other" type="text" class="form-control" placeholder="Enter ..." value="@if(count($listing->amenitiesOtherList)>0){{join(', ', $arr_other_amenities)}} @endif">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xs-12">
                            <div class="form-group">
                                <label>Loại tiện ích khác tiếng Anh</label>
                                <input id="amenities-other-en" name="amenities-other-en" type="text" class="form-control" placeholder="Enter ..." value="@if(count($listing->amenitiesOtherList)>0){{join(', ', $arr_other_amenities_en)}} @endif">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Mô tả</label>
                                <div class="form-group">
                                    <form>
                                        <textarea class="form-control" name="description" id="description" rows="3" placeholder="Miêu tả Listing">
                                                   {{$listing->description or ""}}
                                        </textarea>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Mô tả(Tiếng Anh)</label>
                                <div class="form-group">
                                    <form>
                                        <textarea class="form-control" name="description-en" id="description-en" rows="3" placeholder="Mô tả Listing tiếng anh">
                                                    {{$listing->rlLanguages[0]->description or ""}}
                                        </textarea>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <br/>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Mô tả tiện ích</label>
                                <div class="form-group">
                                    <textarea class="form-control" name="amenityText" id="amenityText" rows="3" placeholder="Mô tả tiện ích">{{$listing->amenityText}}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    <input id="ownerSocialUid" type="hidden" class="form-control" placeholder="Enter ..." value="{{ $ownerObject['id']['socialUid'] or -1}}">
                                    <input id="namesocialcommunications" type="text" class="form-control" placeholder="Enter ..." value="{{ $ownerObject['name'] or ""}}">
                                </div>
                            </div>

                        </div><!-- /.row -->

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Số ĐT Di Động</label>
                                    <input id="ownerPhone" type="text" class="form-control" placeholder="Enter ..." value="{{$ownerObject['phone'] or ""}}">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Số ĐT Bàn</label>
                                    <input id="ownerTel" type="text" class="form-control" placeholder="Enter ..." value="{{$ownerObject['telephone'] or ""}}">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input id="ownerEmail" type="text" class="form-control" placeholder="Enter ..." value="{{$ownerObject['email'] or ""}}">
                                </div>
                            </div>
                        </div><!-- /.row -->

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Địa Chỉ (nếu có)</label>
                                    <input id="ownerAddress" type="text" class="form-control" placeholder="Enter ..." value="{{$ownerObject['address'] or ""}}">
                                </div>
                            </div>
                        </div><!-- /.row -->

                    </div><!-- /.box -->

                    <div class="box">
                        <h3 class="box-title">Thông Tin Người Môi Giới</h3>

                        <div class="row">

                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Tên Người Môi Giới</label>
                                    <!-- <input id="agentList" name="agentList"  type="text" class="form-control" placeholder="Enter ..." value="{{ $listing->socialCommunications->name or "" }}"> -->
                                    <select id="agentList" name="agentList" class="form-control select2" style="width: 100%;">
                                        <option value="">--- Vui lòng chọn ---</option>
                                        @foreach($agentList as $agentLista)
                                        <option email="{{ $agentLista->email }}" value="{{ $agentLista->name }}" phone="{{ $agentLista->phone }}"  name="{{ $agentLista->name }}" socialuid="{{ $agentLista->socialUid }}" @if(isset($agentObject) && $agentObject['id']['socialUid'] == $agentLista->socialUid) selected @endif >{{ $agentLista->name }}</option>

                                        @endforeach
                                    </select>
                                </div>
                            </div>

                        </div><!-- /.row -->

                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Số ĐT Di Động</label>
                                    <input id="agentPhone" type="text" class="form-control" placeholder="Enter ..." value="{{$agentObject['phone'] or ""}}">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Số ĐT Bàn</label>
                                    <input id="agentTel" type="text" class="form-control" placeholder="Enter ..." value="{{$agentObject['telephone'] or ""}}">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input id="agentEmail" type="text" class="form-control" placeholder="Enter ..." value="{{$agentObject['email'] or ""}}">
                                </div>
                            </div>
                        </div><!-- /.row -->
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Địa Chỉ (nếu có)</label>
                                    <input id="agentAddress" type="text" class="form-control" placeholder="Enter ..." value="{{$agentObject['address'] or ""}}">
                                </div>
                            </div>
                        </div><!-- /.row -->
                    </div><!-- /.box -->
                    <div class="box">
                        <h3 class="box-title">Thông Tin Hoa Hồng</h3>
                        @if($listing->listingType->listingTypeID == 2 || $listing->listingType->listingTypeID == 4)
                        <div class="row">
                            <div class="col-md-4">
                                <label>Thời Hạn Hợp Đồng</label>
                            </div>
                            <div class="col-md-4">
                                <label>Hoa Hồng</label>
                            </div>
                        </div>
                        <div class="wrapper-hoahong">
                             @if($listing->commissionList && count($listing->commissionList) < 0)
                            <div class="row row-hh">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision-time form-control select2" style="width: 70%;">
                                            <option value="">Vui lòng chọn</option>
                                            @for($i = 1; $i < 61 ; $i++)
                                            <option value=""></option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision form-control select2" style="width: 70%;">
                                            <!-- chu y -->
                                            <option value="">Vui lòng chọn</option>
                                            @for($j = 0.1; $j<=6 ; $j+=0.1)
                                            <option value=""> </option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <span class="add-row"><i class="fa fa-plus txt-add"> Thêm</i></span>
                                </div>
                            </div>
                            @endif 
                            @if(count($listing->commissionList) > 0)
                            <div class="row row-hh">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision-time form-control select2" style="width: 70%;">
                                            <option value="">Vui lòng chọn</option>
                                            @for($i = 1; $i < 61 ; $i++)
                                            <option value="{{$i}}">{{$i}}</option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision form-control select2" style="width: 70%;">
                                            <!-- chu y -->
                                            <option value="">Vui lòng chọn</option>
                                            @for($j = 0.1; $j<=6 ; $j+=0.1)
                                            <option value="{{$j}}">{{$j}}</option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <span class="add-row"><i class="fa fa-plus txt-add"> Thêm</i></span>
                                </div>
                            </div>
                            @foreach($listing->commissionList as $commissionChild)

                            <div class="row row-hh">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision-time form-control select2" style="width: 70%;">
                                            <option value="">Vui lòng chọn</option>
                                            @for($i = 1; $i < 61 ; $i++)
                                            <option value="{{ $i }}" @if($commissionChild->contractTime == $i) selected="selected" @endif> {{ $i }}</option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision form-control select2" style="width: 70%;">
                                            <!-- chu y -->
                                            <option value="">Vui lòng chọn</option>
                                            @for($j = 0.1; $j<=6 ; $j+=0.1)
                                            <option value="{{$j}}"  {{ abs($commissionChild->commision - $j) < 0.01 ? 'selected' :'' }}  > {{ $j }}</option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <span class="add-row"><i class="fa fa-minus minus-row"> Trừ </i></span>
                                </div>
                            </div>
                            @endforeach
                            @else
                            <div class="row row-hh">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision-time form-control select2" style="width: 70%;">
                                            <option value="">Vui lòng chọn</option>
                                            @for($i = 1; $i < 61 ; $i++)
                                            <option value="{{$i}}">{{$i}}</option>
                                            @endfor
                                        </select>
                                        /Tháng
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <select class="commision form-control select2" style="width: 70%;">
                                            <!-- chu y -->
                                            <option value="">Vui lòng chọn</option>
                                            @for($j = 0.1; $j<=6 ; $j+=0.1)
                                            <option value="{{$j}}">{{$j}}</option>
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
                        </div>
                        @else
                        <div class="wrapper-hoahong">
                            @if($listing->commissionTo != null && $listing->commissionFrom != null &&  $listing->commissionPrice == null)
                            <div class="row row-hh">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div class="radio">
                                            <label>
                                                <input id="sellCommission" type="radio" name="sellCommission" checked value="1">Theo phần trăm giá bán(%)</label>
                                            <input id="sellCommissionValue" type="number" class="form-control" name="sellCommissionValue" value="{{$listing->commissionTo}}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <div class="radio">
                                            <label>
                                                <input id="sellCommission" type="radio" name="sellCommission" value="2">Bằng tiền(triệu)</label>
                                            <input id="sellCommissionValueMoney" type="number" class="form-control" name="sellCommissionValue" value="" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @else
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
                                                <input id="sellCommission" type="radio" name="sellCommission" checked value="2">Bằng tiền(triệu)</label>
                                            <input id="sellCommissionValueMoney" type="number" class="form-control" name="sellCommissionValue" value="@if(isset($listing->commissionPrice)){{$listing->commissionPrice/1000000}}@endif" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            @endif
                            @endif
                        </div>
                        <!-- End Wrapper Hoahong -->
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Note Cho Người Môi Giới</label>
                                    <form>
                                        <textarea class="form-control" rows="3" name="noteForAgent" id="noteForAgent" placeholder="Enter ..." value="">{{$listing->noteForAgent or ""}}</textarea>
                                    </form>
                                </div>
                            </div>
                        </div><!-- /.row -->
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label>Note Cho Người Môi Giới Tiếng Anh</label>
                                    <textarea class="form-control" id="noteForAgent-en" rows="3" placeholder="Enter ...">
                                          {{$listing->rlLanguages[0]->noteForAgent or ""}}
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.box -->
                    <div class="box-line">
                        <h3 class="box-title">Riêng Tư</h3>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input id="isPrivate" type="checkbox" @if($listing->isPrivate) checked @endif />
                                                   Chọn riêng tư
                                        </label>
                                    </div>
                                    <div class="checkbox">
                                        <label>
                                            <input id="isGuaranteed" type="checkbox" @if($listing->isGuaranteed) checked @endif />
                                                   Độc Quyền
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>  <!-- /.row -->
                    </div><!-- /.box-line -->
                </div> <!-- /.box-body -->
                <div class="box-footer">
                    <?php if ($listing->isMine): ?>
                        <input id="listingId" type="hidden" class="form-control" value="{{ $listing->listing->listingId }}"/>
                        <input id="rId" type="hidden" class="form-control" value="{{ $listing->rId }}"/>
                        <input id="listingTypeID" type="hidden" class="form-control" value="{{ $listing->listingType->listingTypeID }}"/>
                        <button type="button" id="finish-reviewing" class="btn btn-primary">Đang xem xét</button>
                        <button type="button" id="finish-reject" class="btn btn-primary">Từ chối</button>
                        <!--<button type="button" id="finish-deactivate" class="btn btn-primary">Deactivate</button>-->
                        <!-- <button type="button" id="finish-rented" class="btn btn-primary">Rented</button> -->
                        <button id="finish-stop" class="btn btn-danger" @if ($listing->status->status->id == 6 || $listing->status->status->id == 7) disabled="disabled" @endif><span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Ngưng</button>
                        @if ($listing->listingType->listingTypeID == 1 || $listing->listingType->listingTypeID == 3)
                          <button type="button" id="finish-sold" class="btn btn-success" @if ($listing->status->status->id == 7) disabled="disabled" @endif><span class="glyphicon glyphicon-check" aria-hidden="true"></span> Đã bán</button>
                        @endif
                        @if ($listing->listingType->listingTypeID == 2 || $listing->listingType->listingTypeID == 4)
                          <button type="button" id="finish-rent" class="btn btn-warning" @if ($listing->status->status->id == 7) disabled="disabled" @endif><span class="glyphicon glyphicon-star" aria-hidden="true"></span> Đã cho thuê</button>
                        @endif
                        <button type="button" id="finish-live" class="btn btn-primary">@if ($listing->listingType->listingTypeID == 1) Rao bán @else Rao thuê @endif</button>
                        <button type="button" id="duplicateListing" class="btn btn-primary">Tạo bản sao</button>
                    <?php endif; ?>
                </div>
            </form>
        </div><!-- /.box -->
    </div>
</div>
<!-- Modal -->
<div class="modal fade" tabindex="-1" role="dialog" id="duplicateListing-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="check-duplicates">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Thông báo</h4>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
                <button type="button" class="btn btn-primary continue update">Tiếp tục</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<!-- Modal POPUP PENDING LISTING -->
<div class="modal fade" tabindex="-1" role="dialog" id="reviewing-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Lý Do Pending</label>
                            <select id="pending-reason" name="pending-reason" class="form-control select2" style="width: 100%;">
                                <option >---Vui Lòng Chọn---</option>
                                <?php foreach ($reasonPendingList as $reasonPending): ?>
                                    <option value="{{$reasonPending->reasonId}}" @if($listing->reasonId == $reasonPending->reasonId) selected="selected" @endif>{{$reasonPending->reasonName}}</option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Hướng giải quyết</label>
                            <select id="pending-solution" name="pending-reason" class="form-control select2" style="width: 100%;">
                                <option >---Vui Lòng Chọn---</option>
                                <option value="1" @if($listing->solutionId == 1) selected="selected" @endif>Call 1 lần</option>
                                <option value="2" @if($listing->solutionId == 2) selected="selected" @endif>Call 2 lần</option>
                                <option value="3" @if($listing->solutionId == 3) selected="selected" @endif>Call 3 lần</option>
                                <option value="4" @if($listing->solutionId == 4) selected="selected" @endif>Call 4 lần</option>
                                <option value="5" @if($listing->solutionId == 5) selected="selected" @endif>Call > 4 lần</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <textarea name="reasonNote" id="reasonNote" class="form-control" rows="8">{{$listing->reasonNote?$listing->reasonNote:""}}</textarea>
                        </div>
                    </div>
                </div><!-- /.row -->
            </div>
            <div class="modal-footer">
                <button id="accept-reviewing" type="button" class="btn btn-default">Ok</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<!-- Modal POPUP REJECT LISTING -->
<div class="modal fade" tabindex="-1" role="dialog" id="reject-modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Lý Do Reject</label>                            
                            <?php foreach ($reasonRejectList as $reasonReject): ?>
                                <div class="radio"><label><input class="reject-reason" name="reject-reason" type="radio" value="{{$reasonReject->reasonId}}" data-control="{{$reasonReject->control}}"> {{$reasonReject->reasonName}}</label></div>
                            <?php endforeach; ?>                            
                        </div>
                    </div>                    
                    <div id="reject-reason-display" style="display:none;" class="form-group">
                        <label class="control-label col-sm-12">Lý do</label>
                        <div class="col-sm-12">
                            <textarea id="reject-reason-note" class="form-control" rows="5"></textarea>
                        </div>
                    </div>
                </div><!-- /.row -->
            </div>
            <div class="modal-footer">
                <button id="accept-reject" type="button" class="btn btn-default">Ok</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal fade" id="noreason">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
                <p> Bạn chưa chọn lý do </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

@include('lso.modal-stop-listing')

@include('lso.modal-sold-listing')

@include('lso.modal-rent-listing')

@include('listing.modal-related-listing')

<!-- Modal 【Note nội bộ】 -->
@include('lso.modal-request-internal-for-listing')

@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
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
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<!-- iCheck 1.0.1 -->
<script src="{{loadAsset("/plugins/iCheck/icheck.min.js")}}"></script>
<script src="{{loadAsset("/js/bootstrap-datepicker.min.js")}}"></script>

<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/wysihtml/wysihtml5.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/define.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>

<script src="{{loadAsset("/js/listing.js")}}"></script>
<!-- Validate JS -->
<script src="{{loadAsset("js/validatejs/validate.min.js") }}"></script>

<script type="text/javascript">
<?php if ($listing->currency == "VND") { ?>
    $('#minPrice').mask("#,##0", {reverse: true});
    $('#price').mask("#,##0", {reverse: true});
    $('#deposit').mask("#,##0", {reverse: true});
<?php } ?>

var kind_bds = <?= $listing->propertyType->propertyTypeID ?>;
var socialUid_checked = <?= isset($listing->socialUser) ? $listing->socialUser->socialUid : '" "' ?>;

var json_path = <?= json_encode($listing->photos) ?>;
var json_path_video = <?= json_encode($listing->videos) ?>;
var redBookPhoto = <?php echo json_encode($listing->redBookPhotos); ?>;
var pinkBookPhoto = <?php echo json_encode($listing->pinkBookPhotos); ?>;
var returnUrl = "{{$returnUrl}}";
var forceAccess = "{{$forceAccess}}";
var oldStreet = <?php echo json_encode($listing->street); ?>;
</script>

<script src="{{loadAsset("/js/listing-detail.js")}}"></script>
<script src="{{loadAsset("/js/listing/info.js")}}"></script>

<script id="hoa-hong-tmpl" type="text/template7">
    <div class="row row-hh">
    <div class="col-md-4">
    <div class="form-group">
    <select class="commision-time form-control select2" style="width: 70%;">
    <option value="">Vui lòng chọn</option>
    @for($i = 1; $i<61; $i++)
    <option value="{{ $i }}">{{ $i }}</option>
    @endfor
    </select>
    /Tháng
    </div>
    </div>
    <div class="col-md-4">
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
    <span class="add-row"><i class="fa fa-minus minus-row"> Trừ</i></span>
    </div>
    </div>
</script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>

@stop
@section('page-css')
<!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    .placeholder {
        background: #f3f3f3;
        visibility: visible;
        width:50px;
        height:100px;
        display:block;
    }

</style>
@stop
