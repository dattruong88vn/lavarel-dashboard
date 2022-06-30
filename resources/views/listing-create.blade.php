@extends('layout.default')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="box box-info">
            <div class="box-header">
                <h3 class="box-title">Tạo Listing</h3>
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
                                <select id="type-business" name="type-business" class="form-control select2" style="width: 100%;">
                                    <option value="2" >Thuê</option>
                                    <option value="1">Bán</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Mục đích kinh doanh</label>
                                <select id="purpose-business"  name="purpose-business" class="form-control select2" style="width: 100%;">
                                    <option value="2" >Thương mại</option>
                                    <option value="1">Để ở</option>
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
                                    <?php foreach ($requestListLittle as $request): ?>
                                        <option  value="{{$request->id}}">{{$request->value}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Transaction</label>
                                <select id="transaction"  name="transaction" class="form-control select2" style="width: 100%;">
                                    <option>--- Vui Lòng Chọn ---</option>
                                    <?php foreach ($transactionListLittle as $transaction): ?>
                                        <option value="{{$transaction->id}}">{{$transaction->value}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Loại BDS</label>
                                <select id="kind-bds" name="kind-bds" class="form-control select2" style="width: 100%;">
                                    <?php
                                    foreach ($propertyTypeList as $propertyType):
                                        if ($propertyType->listingType->listingTypeID == 2):
                                            ?>
                                            <option value="{{ $propertyType->propertyTypeID }}" >{{ $propertyType->typeName }}</option>
                                            <?php
                                        endif;
                                    endforeach;
                                    ?>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Building</label>
                                        <select id="building" name="building" class="form-control select2" style="width: 100%;">
                                            <option value="">--- Chọn Building ---</option>
                                            <?php
                                            foreach ($buildingList as $building):
                                                if ($building->isVerified):
                                                    ?>
                                                    <option isVerified="{{$building->isVerified}}" listingId="{{ $building->listingId }}" value="{{ $building->buildingId }}">{{ $building->buildingName }}</option>
                                                    <?php
                                                endif;
                                            endforeach;
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Tên project</label>
                                        <select id="developer"  name="developer" class="form-control select2" style="width: 100%;">
                                            <option value>--- Vui Lòng Chọn ---</option>
                                            <?php foreach ($projectList as $project): ?>
                                                <option value="{{$project->pId}}">{{$project->projectName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div><!-- /.col -->
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Block</label>
                                <select id="block" name="block" class="form-control select2" style="width: 100%;">

                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Nguồn Listing</label>
                                        <select id="source" class="form-control select2" style="width: 100%;">
                                            <?php foreach ($userTypeList as $user): ?>
                                                <option value="{{ $user->id}}">{{$user->name}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Tên</label>
                                        <select id="listuser" class="form-control select2" class="form-control select2" style="width: 100%;">
                                            <option value=''>---Vui lòng chọn---</option>
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
                                <input id="address" name="address" type="text" class="form-control" placeholder="Enter ...">
                            </div>
                        </div><!-- /.col -->
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Lat</label>
                                        <input id="lat" name="lat" type="text" class="form-control" placeholder="Enter ...">
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Long</label>
                                        <input id="long" name="long" type="text" class="form-control" placeholder="Enter ...">
                                    </div>
                                </div>
                            </div>
                        </div><!-- /.col -->
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Thành phố</label>
                                <select name="city" class="form-control select2" id="city" style="width: 100%;">
                                    @foreach($cityList as $city)
                                    <option value="{{ $city->cityId }}">{{ $city->cityName }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Quận</label>
                                        <select name="district" id="district" class="form-control select2 district"style="width: 100%;">
                                            @foreach($districtList as $district)
                                            <option value="{{ $district->districtId }}">{{ $district->districtName }}</option>
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
                                <input id="houseNumber" name="houseNumber" type="text" class="form-control" placeholder="Enter ..." value="">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Đường</label>
                                <select id="streetId" name="streetId" class="form-control select2" style="width: 100%;">
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
                                <input id="short-address" name="short-address" type="text" class="form-control" placeholder="Enter ..."
                                       value="">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Tiêu đề</label>
                                <input id="title-listing" name="title-listing" type="text" class="form-control" placeholder="Enter ..." value="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Diện Tích Đất</label>
                                <input id="acreage-land" name="acreage-land" type="text" class="form-control" placeholder="Enter ..."
                                       value="">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Tiêu đề tiếng anh</label>
                                <input id="title-listing-en" name="title-listing-en" type="text" class="form-control" placeholder="Enter ..." value="">
                            </div>
                        </div>
                    </div><!-- /.row -->

                    <div class="row">

                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Diện Tích</label>
                                <input name="acreage-lease" id="acreage-lease" type="text" class="form-control" placeholder="Enter ..."
                                       value="">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Chiều Dài</label>
                                <input id="length" name="length" type="text" class="form-control" placeholder="Enter ..."
                                       >
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Chiều Rộng</label>
                                <input id="width" name="width" type="text" class="form-control" placeholder="Enter ...">
                            </div>
                        </div>

                    </div><!-- /.row -->

                    <div class="row">

                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Diện Tích Cho Thuê Nhỏ Nhất</label>
                                <input id="acreage-small" name="acreage-small" type="text" class="form-control" placeholder="Enter ..."
                                       value="">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Tầng Listing/Building</label>
                                <input id="floor-listing" name="floor-listing"  type="text" class="form-control" placeholder="Enter ...">
                            </div>
                        </div>

                    </div><!-- /.row -->

                    <div class="row">

                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Căn Hộ Số</label>
                                <input id="apartment-number" name="apartment-number" type="text" class="form-control" placeholder="Enter ..." value="">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Phòng Ngủ</label>
                                <select id="bedroom-number" name="bedroom-number" class="form-control select2" style="width: 100%;">
                                    <option value="" >---Vui Lòng Chọn---</option>
                                    @for ($i = 1; $i <= 10; $i++)
                                    <option value="{{$i}}" >{{$i}}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Phòng Tắm/WC</label>
                                <select id="bathroom-number" name="bathroom-number" class="form-control select2" style="width: 100%;">
                                    @for ($i = 1; $i <= 10; $i++)
                                    <option value="{{$i}}" >{{$i}}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>

                    </div><!-- /.row -->

                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Listing Nằm Ở Tầng</label>
                                        <select name="place-number" id="place-number" class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui Lòng Chọn---</option>
                                            <option value="-1">Trệt</option>
                                            <option value="-2">Lửng</option>
                                            <option value="-3">Sân thượng</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label>(Tới) Listing Nằm Ở Tầng</label>
                                        <select id="place-number-to" name="place-number-to"  class="form-control select2" style="width: 100%;">
                                            <option value="">---Vui Lòng Chọn---</option>
                                            <option value="-1"> Tầng trệt </option>
                                            <option value="-2"> Tầng lửng </option>
                                            <option value="-3"> Tầng thượng </option>

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
                                        ?>
                                        <option value="{{$key}}" >{{$value}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>
                    </div><!-- /.row -->

                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Giá</label><span class="pull-right type-of-price">Bán(Triệu) - Thuê(m2/tháng)</span>
                                <input id="price" type="text" class="form-control" placeholder="Enter ..."
                                       value="">
                            </div>
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="isVat">
                                        Giá bao gồm VAT
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-xs-12">
                            <label>Loại Tiền</label>
                            <select id="currency" class="form-control select2" style="width: 100%;">
                                <option value="vnd">VND</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                        <div class="col-md-2 col-xs-12">
                            <label>Thông tin còn trống</label>
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input id="isAvailable" type="checkbox">
                                        Chọn còn trống
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Giá thấp nhất </label>
                                <input id="minPrice" type="text" class="form-control" placeholder="Enter ..." value="">
                            </div>
                        </div>
                        <div class="col-md-8 col-xs-12">
                            <div class="form-group">
                                <label>Note cho giá thấp nhất</label>
                                <form>
                                    <textarea class="form-control" rows="3" name="noteForMinPrice" id="noteForMinPrice" placeholder="Enter ..." value=""></textarea>
                                </form>
                            </div>
                        </div>
                    </div><!-- /.row -->
                    <div class="box-line">
                        <h4 class="box-title">Phí (
                            <select id="currency_fee" class="form-control select2" style="width: 10%;">

                                <option value="vnd">VND</option>
                                <option value="usd">USD</option>

                            </select> )
                            <strong id="fee-title"></strong>
                        </h4>
                        <div class="row">
                            @foreach($fee_listing as $fee)
                            <div class="col-md-3 col-xs-12 fee-listing">
                                <div class="form-group">
                                    <label>{{ $fee->feesName }} </label>
                                    <input id="fee" type="text" class="form-control" placeholder="Enter ...">
                                </div>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input id="fee-checkbox" ftId="{{ $fee->ftId }}" dataname="{{ $fee->feesName }}" name="" type="checkbox"   value="">
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
                                <label>Đặt Cọc  <span class="pull-right type-of-price">Bán(triệu) - Thuê(tháng)</span></label>
                                <input id="deposit" value='' class="form-control" type="text"></input>
                            </div>
                            <div class="form-group">
                                <div id="allowchange" class="checkbox">
                                    <label>
                                        <input  type="checkbox">
                                        Được Phép Thay Đổi Kết Cấu
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div><!-- /.row -->
                    <div class="box-line wrapper-move-in-date">
                        <h4 class="box-title">Ngày có thể dọn vào</h3>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <div class="date">
                                            <div class="input-group input-append date" id="datePicker">
                                                <input id="eventDate" type="text" class="form-control" name="eventDate" value="">
                                                <span class="input-group-addon add-on"><span class="glyphicon glyphicon-calendar"></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" id="moveInNow">
                                                Có thể dọn vào ngay
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div>
                    <div class="row">
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Tầng Hầm</label>
                                <select  id="baseme" class="form-control select2" style="width: 100%;">
                                    <option value=""> --- Vui Lòng Chọn --- </option>
                                    @for ($i = 1; $i <= 10; $i++)
                                    <option value="{{$i}}"> {{$i}} </option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Số Thang Máy</label>
                                <select id="numberElevator" name="numberElevator" class="form-control select2" style="width: 100%;">
                                    <option value=""> --- Vui Lòng Chọn --- </option>
                                    @for ($i = 1; $i <= 50; $i++)
                                    <option value="{{$i}}" >{{$i}}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Năm Xây Nhà</label>
                                <input type="text" id="yearbuilt" name="yearbuilt" id="input" class="form-control" value=""  pattern="" title="">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Năm Sửa Nhà</label>
                                <input type="text" id="yearfixed" name="yearfixed" id="input" class="form-control" value="" required="required" pattern="" title="">
                            </div>
                        </div>
                        <div class="col-md-4 col-xs-12">
                            <div class="form-group">
                                <label>Hướng Nhà</label>
                                <select name="direction" id="direction" class="form-control select2" style="width: 100%;">
                                    <option value=""> --- Vui Lòng Chọn --- </option>
                                    <option value="1" >Đông</option>
                                    <option value="2" >Tây</option>
                                    <option value="3" >Nam</option>
                                    <option value="4" >Bắc</option>
                                    <option value="5" >Đông Bắc</option>
                                    <option value="6" >Tây Bắc</option>
                                    <option value="7" >Đông Nam</option>
                                    <option value="8" >Tây Nam</option>
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
            <div id="amenities" class="row">

                <div id="" class="col-md-3 col-xs-3">
                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox">
                                Tiện ích 1
                            </label>
                        </div>
                    </div>
                </div>

            </div><!-- /.row -->

        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="form-group">
                    <label>Mô tả</label>
                    <div class="form-group">
                        <form>
                            <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing">

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
                        <textarea class="form-control" name="amenityText" id="amenityText" rows="3" placeholder="Mô tả tiện ích"></textarea>
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
                        <input id="title-content-meta" name="title-content-meta" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Keyword</label>
                        <input id="keyword" name="keyword" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
            </div><!-- /.row -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="meta-description" name="description" class="form-control" rows="3" placeholder="Enter ..."></textarea>
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
                        <input id="title-content-meta-en" name="title-content-meta-en" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Keyword</label>
                        <input id="keyword-en" name="keyword-en" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
            </div><!-- /.row -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Description English</label>
                        <textarea id="meta-description-en" name="meta-description-en" class="form-control" rows="3" placeholder="Enter ..."></textarea>
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
                        <input id="ownerSocialUid" type="hidden" class="form-control" placeholder="Enter ..." value="-1">
                        <input id="namesocialcommunications" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>

            </div><!-- /.row -->

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Số ĐT Di Động</label>
                        <input id="ownerPhone" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Số ĐT Bàn</label>
                        <input id="ownerTel" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Email</label>
                        <input id="ownerEmail" type="text" class="form-control" placeholder="Enter ...">
                    </div>
                </div>
            </div><!-- /.row -->

            <div class="row">
                <div class="col-md-6 col-xs-12">
                    <div class="form-group">
                        <label>Địa Chỉ (nếu có)</label>
                        <input id="ownerAddress" type="text"  class="form-control" placeholder="Enter ...">
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
                            <option value="1">Nguyễn Văn A </option>
                        </select>
                    </div>

                </div><!-- /.row -->

                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Số ĐT Di Động</label>
                            <input id="agentPhone" type="text" class="form-control" placeholder="Enter ...">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Số ĐT Bàn</label>
                            <input id="agentTel" type="text" class="form-control" placeholder="Enter ...">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Email</label>
                            <input id="agentEmail" type="text" class="form-control" placeholder="Enter ...">
                        </div>
                    </div>
                </div><!-- /.row -->

                <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Địa Chỉ (nếu có)</label>
                            <input id="agentAddress" type="text" class="form-control" placeholder="Enter ...">
                        </div>
                    </div>
                </div><!-- /.row -->
            </div><!-- /.agent-content -->

        </div><!-- /.box -->

        <div class="box">
            <h3 class="box-title">Thông Tin Hoa Hồng</h3>
            <div class="row">

            </div>

            <div class="row">
                <div class="col-xs-3">
                    <label>Thời Hạn Hợp Đồng</label>
                </div>
                <div class="col-xs-3">
                    <label>Hoa Hồng</label>
                </div>
            </div>
            <div class="wrapper-hoahong">
                <div class="row row-hh row-add">
                    <div class="col-xs-3">
                        <div class="form-group">
                            <select id="commission-time" class="commision-time form-control select2" style="width: 70%;">
                                <option value="">--- Vui Lòng Chọn ---</option>
                                @for($i=1; $i<= 60; $i++)
                                <option value="{{ $i }}">{{ $i }}</option>
                                @endfor
                            </select>
                            /Tháng
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="form-group">
                            <select id="commission-select" class="commision form-control select2" style="width: 70%;">
                                <option value="">--- Vui Lòng Chọn ---</option>
                                @for($i=0.1; $i <= 6; $i+=0.1)
                                <option value="{{ $i }}">{{ $i }}</option>
                                @endfor
                            </select>
                            /Tháng
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <span class="add-row"> <i class="fa fa-plus txt-add"> Thêm </i> </span>
                    </div>
                </div>


            </div>

            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Note Cho Người Môi Giới</label>
                        <textarea class="form-control" id="noteForAgent" rows="3" placeholder="Enter ..."></textarea>
                    </div>
                </div>
            </div><!-- /.row -->
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <label>Note Cho Người Môi Giới Tiếng Anh</label>
                        <textarea class="form-control" id="noteForAgent-en" rows="3" placeholder="Enter ..."></textarea>
                    </div>
                </div>
            </div>
        </div><!-- /.box -->
        <div class="box-line">
            <h3 class="box-title">Riêng Tư</h3>
            <div class="row">
                <div class="col-xs-12">
                    <div class="form-group">
                        <div class="checkbox">
                            <label>
                                <input id="isPrivate" type="checkbox">
                                Chọn riêng tư
                            </label>
                        </div>
                        <div class="checkbox">
                            <label>
                                <input id="isGuaranteed" type="checkbox">
                                Độc Quyền
                            </label>
                        </div>
                    </div>
                </div>
            </div>  <!-- /.row -->
        </div><!-- /.box-line -->
    </div><!-- /.box-body -->
    <div class="box-footer">
        <button type="button" id="finish-reviewing" class="btn btn-primary">Reviewing</button>
        <button type="button" id="finish-live" class="btn btn-primary">Live</button>
    </div>
</form>
</div><!-- /.box -->
</div>
</div>

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
                <button type="button" class="btn btn-primary continue create">Tiếp tục</button>
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
                                @foreach($reasonPendingList as $reasonPending)
                                <option value="{{$reasonPending->reasonId}}">{{$reasonPending->reasonName}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-12">
                        <div class="form-group">
                            <label>Hướng giải quyết</label>
                            <select id="pending-solution" name="pending-reason" class="form-control select2" style="width: 100%;">
                                <option >---Vui Lòng Chọn---</option>
                                <option value="1">Call 1 lần</option>
                                <option value="2">Call 2 lần</option>
                                <option value="3">Call 3 lần</option>
                                <option value="4">Call 4 lần</option>
                                <option value="5">Call > 4 lần</option>

                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <textarea name="reasonNote" id="reasonNote" class="form-control" rows="8"></textarea>
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

<div class="modal fade" id="noreason">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Thông Báo</h4>
            </div>
            <div class="modal-body">
                <p> Bạn chưa chọn lý do để reviewing </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection

@section('page-js')

   <!-- <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>-->

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>

<!-- select2 -->
@extends('templates.amenities-item')
@extends('templates.commission-for-rent')
@extends('templates.commission-for-sale')
@extends('templates.move-in-date-for-sale')
@extends('templates.move-in-date-for-rent')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<!-- iCheck 1.0.1 -->
<script src="{{loadAsset("/plugins/iCheck/icheck.min.js")}}"></script>
<script src="{{loadAsset("/js/bootstrap-datepicker.min.js")}}"></script>

<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/wysihtml/wysihtml5.js")}}"></script>

<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/define.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
<script src="{{loadAsset("/js/listing.js")}}"></script>

<script src="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>

<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>

<script src="{{loadAsset("/js/listing-untils.js")}}"></script>



<script>
$('#minPrice').mask('000.000.000.000.000', {reverse: true});
$('#price').mask('000.000.000.000.000', {reverse: true});
$('#deposit').mask('000.000.000.000.000', {reverse: true});
// $(function () {
//     $("#table-staff").DataTable();
//     $("#calenda").daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A'});
//   });
var dataSource = "{{$dataSource}}";
var itemData = <?php echo json_encode($itemData); ?>;
var briefFormId = null;
$(document).ready(function () {
    $("#ward").change(function () {
        var wardId = $(this).val();
        getStreets(wardId);
    });
// populate form from datasource
    if (dataSource === 'BRIEF_FORM') {
        populateFromBriefForm();
        //console.log(itemData);
        briefFormId = itemData.dealBriefForm.id;
        $("#type-business").select2("val", itemData.listingTypeId);
        $("#address").val(itemData.dealBriefForm.address);
        $("#lat").val(itemData.dealBriefForm.latitude);
        $("#long").val(itemData.dealBriefForm.longitude);
        $("#namesocialcommunications").val(itemData.dealBriefForm.name);
        $("#townerTel").val(itemData.dealBriefForm.phone);
        $("#description").val(itemData.dealBriefForm.note);

        var path = [];
        var pathConfig = [];
        if (itemData.dealBriefForm.photos) {
            $(itemData.dealBriefForm.photos).each(function (index, item) {
                linkArr = item.split("/");
                fileid = linkArr[linkArr.length - 1].split(".");
                path.push("<img src='" + item + "' class='file-preview-image' fileid='" + fileid[fileid.length - 2] + "' name='" + fileid[fileid.length - 2] + "' alt='" + linkArr[linkArr.length - 1] + "' title='" + linkArr[linkArr.length - 1] + "' /> <div class='checkbox'><label><input class='isPrivatePhoto' name='isPrivatePhoto' id='isPrivatePhoto' " + (item.isPrivate ? "checked" : "") + " type='checkbox'>  Riêng Tư</label></div>");

                pathConfig.push({
                    caption: item.caption,
                    width: '120px',
                    url: "/imageListingRemover",
                    key: linkArr[linkArr.length - 1]
                })

            });
        }

        $('.imageListing .file-image').fileinput('destroy');


        $(".imageListing .file-image").fileinput({
            deleteUrl: "/imageListingRemover",
            initialPreview: path,
            initialPreviewConfig: pathConfig,
            allowedFileExtensions: ['jpg', 'png', 'gif'],
            overwriteInitial: false,
            allowedFileTypes: ['image'],
            slugCallback: function (filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        }).on('fileenabled', function () {
            $('.file-preview-thumbnails').css('position', 'relative');
            $('.file-preview-thumbnails').sortable({
                scroll: true,
                tolerance: 'pointer',
                update: function (event, ui) {
                    $('.file-preview-frame').css('background', 'none');
                    $(ui.item).find('img').parents('.file-preview-frame').css('background', '#eee');
                },
                helper: function (event, ui) {
                    var $clone = $(ui).clone();
                    $clone.css('position', 'absolute');
                    return $clone.get(0);
                },
            });

            $('.imageListing .file-image').on('fileimageresizeerror', function (event, data, msg) {
                console.log(data.id);
                console.log(data.index);
                // get message
                alert(msg);
            });

            $('.imageListing .file-image').on('fileerror', function (event, data, msg) {
                console.log(data.id);
                console.log(data.index);
                console.log(data.file);
                console.log(data.reader);
                console.log(data.files);
                // get message
                alert(msg);
            });
            //$('.file-preview-frame').draggable();
        });
        $(".imageListing .file-image").fileinput('enable');

    }

    get_property_type(function (selector) {
        //console.log(itemData.propertyTypeId);
        if (itemData) {
            selector.select2("val", itemData.propertyTypeId);
        }
    });
    get_agent_list();
    get_amenities();

//Initialize Select2 Elements
    $('#finish-reviewing').click(function () {

        var prepare = prepareListingData();
        listingObjectBuilding.status = {"statusId": 2};
        listingObjectNotBuilding.status = listingObjectBuilding.status;
        listingObjectBuilding.rlMoveInDate = rlMoveInDate;
        listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
        listingObjectBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
        listingObjectNotBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
        if (prepare)
            $('#reviewing-modal').modal('show');
        return false;
    });
    $('#accept-reviewing').click(function () {

        if ($("#pending-reason").val() == "---Vui Lòng Chọn---" || parseInt($("#pending-reason").val() == "---Vui Lòng Chọn---")) {
            $('#reviewing-modal').modal('hide');
            $('#noreason').modal('show');
            return false;
        }
        listingObjectBuilding.reasonId = $("#pending-reason").val() != "" ? parseInt($("#pending-reason").val()) : null;
        listingObjectNotBuilding.reasonId = listingObjectBuilding.reasonId;
        listingObjectBuilding.solutionId = $("#pending-solution").val() != "" ? parseInt($("#pending-solution").val()) : null;
        listingObjectNotBuilding.solutionId = listingObjectBuilding.solutionId;
        listingObjectBuilding.reasonNote = $("#reasonNote").val() != "" ? $("#reasonNote").val() : null;
        listingObjectNotBuilding.reasonNote = listingObjectBuilding.reasonNote;
        $('#reviewing-modal').modal('hide');
        createListing(listingObjectBuilding);
        return false;
    });
    $('#finish-live').click(function () {
        if (!validateFileUpload('.imageListing', true)) {
            return false;
        }
        if (!validateFileUpload('.redBookPhoto')) {
            return false;
        }
        if (!validateFileUpload('.pinkBookPhoto')) {
            return false;
        }

        if ($('#city').val() == "")
        {
            showPropzyAlert('Vui lòng chọn thành phố');
            $('#city').focus();
            return false;
        }
        if ($('#district').val() == "")
        {
            showPropzyAlert('Vui lòng chọn quận');
            $('#district').focus();
            return false;
        }
        if (isBuilding) {
            if ($('#building').val() == "") {
                showPropzyAlert('Vui lòng chọn Building');
                $('#building').focus();
                return false;
                if ($('#building option:selected').attr('isverified') != 1) {
                    showPropzyAlert('Vui lòng chọn Building Có verify');
                    $('#building').focus();
                    return false;
                }
            }
        }
        var prepare = prepareListingData();
        listingObjectBuilding.status = {"statusId": 3};
        listingObjectNotBuilding.status = listingObjectBuilding.status;
        listingObjectBuilding.rlMoveInDate = rlMoveInDate;
        listingObjectNotBuilding.rlMoveInDate = rlMoveInDate;
        listingObjectBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
        listingObjectNotBuilding.isGuaranteed = $("#isGuaranteed").prop("checked");
        if ($('#price').val() == "")
        {
            showPropzyAlert('Nhập giá');
            $('#price').focus();
            return false;
        }
        if (prepare)
            createListing(listingObjectBuilding);
        return false;
    });
    initWardForListingDescription("#ward", "description");
    $('.btn-check-existed-address').on('click', function (event) {
        event.preventDefault();
        prepareListingData();
        checkExistedAddress(listingObjectBuilding);
    });
});
function createListing(object) {
    if (!checkDuplicates(object)) {
        postCreateListing(object);
    }
}

function postCreateListing(object) {
    urlCreateListing = "/createListing";
    post_sync(urlCreateListing, object, true, function (data) {
        var mssage = data['message'] + " listingId: " + data['data'].listingId + " rlistingId: " + data['data'].rlistingId;
//alert('Bạn đã cập nhật thành công listing ' + data['data'].rlistingId);
        showPropzyAlert(mssage);
        window.location = "/listing/assigned";
    });
}

function populateFromBriefForm() {
    //console.log("I am here");
}

</script>
<script id="hoa-hong-tmpl" type="text/template7">
    <div class="row row-hh">
    <div class="col-xs-3">
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
    <span class="add-row"><i class="fa fa-plus txt-add"> Thêm</i></spam>
    </div>
    </div>
</script>

@stop
@section('page-css')
<!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />


@stop
