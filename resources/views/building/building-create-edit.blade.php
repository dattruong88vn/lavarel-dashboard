@extends('layout.default')
@section('content')
    <div class="profile-building">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><b><?php
                                $propertyType = array_filter($propertyTypeList, function($val) use ($propertyTypeId) {
                                    return $val->propertyTypeID == $propertyTypeId;
                                });
                                $propertyTypeName = null;
                                $purposeId = 'null';
                                if (count($propertyType) > 0) {
                                    $propertyType = reset($propertyType);
                                    $purposeId = $propertyType->purpose->purPoseID;
                                    $propertyTypeName =  $propertyType->typeName;
                                }
                                ?>
                                {{
                                    $propertyTypeName
                                }}
                            </b></h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label required" for="cityId">Thành phố</label>
                                    <select readonly id="cityId" name="city-building" class="form-control select2">
                                        <option value="1">Hồ Chí Minh</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label required" for="district">Quận</label>
                                    <select id="district" name="district-building" class="form-control select2">
                                        @foreach($districts->data as $district)
                                            <option @if(isset($building->building->districtId) && $district->districtId ==  $building->building->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label required" for="address">Địa Chỉ <a id="seeonmap" href="">Xem trên bản đồ</a></label>
                                    <input id="address" value="{{ $building->building->address or "" }}" type="text"
                                           name="address" class="form-control" placeholder="Địa chỉ toà nhà"/>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label required" for="lat">Lat</label>
                                    <input id="lat" name="lat" type="text" class="form-control"
                                           placeholder="Toạ độ lat"
                                           value="{{ $building->building->latitude or "" }}"/>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label required" for="lng">Long</label>
                                    <input id="lng" name="long" type="text" class="form-control"
                                           placeholder="Tọa độ long"
                                           value="{{ $building->building->longitude or "" }}"/>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group ">
                                    <label class="control-label required" for="name-building">Tên tòa nhà</label>
                                    <div class="block-name">
                                        <input value="{{ $building->building->buildingName or "" }}" type="text"
                                               name="name-building" class="form-control" id="name-building"
                                               placeholder="Tên tòa nhà"/>
                                        <span class="input-icon"></span>
                                        <div class="dropdown-menu" id="building-name-search-block"></div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Xếp loại building</label>
                                    <input maxlength="4" value="{{ $building->building->buildingRate or "" }}"
                                           type="text" name="rate-building" class="form-control" id="rate-building"
                                           placeholder="Xếp loại building"/>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="control-label">Dự án</label>
                                    <select id="project" name="project" class="form-control select2"></select>
                                </div>
                            </div>
                        </div>
                        <!-- Phí và Tiện ích-->
                       {{-- <div class="row">
                            <div class="col-md-4">
                                <label>Phí</label>
                            </div>
                            <div class="col-md-2">
                                <label>Loại tiền</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 wrapper-charges">
                                @if(isset($building->feesList))
                                    @foreach($building->feesList as $key => $listingFee)
                                    <div class="row row-hh">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <select id="feeItem" class="form-control select2"
                                                        style="width: 100%;">
                                                    <option value="0">--- Chọn phí ---</option>
                                                    @foreach($buildingFeesTypeList as $FeesType)
                                                        <option value="{{$FeesType->ftId}}"
                                                                @if($listingFee->id->feesTypeId == $FeesType->ftId) selected @endif >{{$FeesType->feesName}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <select id="feeLoc" class="form-control select2">
                                                <option value="vnd"
                                                        @if($listingFee->currency == null) selected @endif >--- Vui
                                                    Lòng Chọn ---
                                                </option>
                                                <option value="vnd"
                                                        @if($listingFee->currency == "vnd") selected @endif >VND
                                                </option>
                                                <option value="usd"
                                                        @if($listingFee->currency == "usd") selected @endif>USD
                                                </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <input type="text" name="charges" class="form-control" id="charges"
                                                       placeholder="Mức phí" value="{{ $listingFee->price }}"/>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="checkbox">
                                                    <input name="feeItemInclude" type="checkbox" id="feeItemInclude" @if($listingFee->includingPrice == true) checked @endif/>
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> &nbsp;Trong giá
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="add-row add-charges"><i class="btn-fa-circle btn-fa-circle-pink fa fa-minus minus-row"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                                @endif
                                <div class="row row-hh">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <select id="feeItem" class="form-control select2" style="width: 100%;">
                                                    <option value="0">--- Chọn phí ---</option>
                                                    @foreach($buildingFeesTypeList as $FeesType)
                                                        <option value="{{$FeesType->ftId}}">{{$FeesType->feesName}}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <select id="feeLoc" class="form-control select2" style="width: 100%;"/>
                                                <option value="vnd">VND</option>
                                                <option value="usd">USD</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <input type="text" name="charges" class="form-control" id="charges"
                                                       placeholder="Mức phí"/>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <label class="checkbox">
                                                    <input name="feeItemInclude" type="checkbox" id="feeItemInclude">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> &nbsp;Trong giá
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-2">
                                            <div class="form-group">
                                                <div class="add-row add-charges">
                                                    <i class="btn-fa-circle btn-fa-circle-green fa fa-plus txt-add"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>--}}
                        <!-- Tiện ích -->
                        <div class="row form-group">
                            <div class="col-md-12 utilities-building">
                                <div class="form-group">
                                    <label>Tiện ích của tòa nhà</label>
                                    <div class="form-group" id="utilitie-group"></div>
                                </div>
                            </div>
                        </div>
                        <!-- Mô tả -->
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="control-label required" for="description-block">Mô tả tòa nhà (Tiếng Việt)</label>
                                    <div class="form-group">
                                       <textarea class="form-control" name="description-block"  id="description-block" rows="3" placeholder="Mô tả tòa nhà">
                                                     @if(isset($building->building)){{$building->building->buildingDescription or ""}} @endif
                                       </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{--<div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Mô tả tòa nhà (Tiếng Anh)</label>
                                    <div class="form-group">
                                       <textarea class="form-control" name="description-block-en" id="description-block-en" rows="3" placeholder="Miêu tả tòa nhà">
                                                   @if(isset($building->listingLanguages)){{$building->listingLanguages[0]->description or ""}} @endif
                                       </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>--}}
                        <!-- Hình ảnhh-->
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group imageBuilding">
                                    <label for="file-image-create" class="control-label required">Hình ảnh</label>
                                    <div id="photos-wrapper" class=""></div>
                                    {{--<input id="file-image-create" class="file-image-create" multiple type="file" class="file" data-upload-url="/imageProjectUploader">--}}
                                </div>
                            </div>
                            {{--<div class="col-md-12">
                                <div class="form-group imageBuilding">
                                    <label>Hình ảnh</label>
                                    <div class="form-group">
                                        <input class="file-4 file" multiple type="file"  data-upload-url="/imageBuildingUploader" accept="image/*">
                                    </div>
                                </div>
                            </div>--}}
                        </div>
                        <!-- Hình video-->
                        {{--<div class="row">
                            <div class="col-md-12">
                                <div class="form-group videoBuilding">
                                    <label>Video</label>
                                    <div class="form-group">
                                        <input class="file-5 file" type="file"  data-upload-url="/videoBuildingUploader" accept="video/mp4">
                                    </div>
                                </div>
                            </div>
                        </div>--}}
                    </div>
                </div>
            </div>
        </div>

        <!-- thông tin người quản lý -->
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><b>Thông tin người quản lý</b></h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Tên</label>
                                    <input type="text" name="name-manager" class="form-control" id="name-manager" placeholder="Tên"
                                           value="{{ $building->building->buildingManagementName or "" }}">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email-manager" class="form-control" id="email-manager" placeholder="Email"
                                           value="{{ $building->building->buildingManagementEmail or "" }}">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Số điện thoại bàn</label>
                                    <input maxlength="11" type="number" name="name-manager" class="form-control"
                                           id="phone" placeholder="Số điện thoại bàn"
                                           value="{{ $building->building->phoneNumber or "" }}">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Số điện thoại di động</label>
                                    <input maxlength="11" type="number" name="telephone" class="form-control"
                                           id="telephone" placeholder="Số điện thoại di động"
                                           value="{{ $building->building->mobilePhone or "" }}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Thông tin Blocks -->
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><b>Thông tin blocks</b></h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div class="row">
                            @if(isset($building->building->blocks) && count($building->building->blocks) > 0)
                                <div class="col-md-12 nav-tabs-custom">
                                <!-- Nav tabs -->
                                <ul id="tab-list" class="nav nav-tabs" role="tablist" role="tablist">
                                    @for($i = 1; $i <= count($building->building->blocks); $i++)
                                        <li class="@if($i == 1) active @endif">
                                            <a href="#tab{{$i}}" role="tab" data-toggle="tab">Block {{$i}}
                                                @if($i != 1)
                                                    <button class="close" type="button" title="Remove this page">×</button>
                                                @endif
                                            </a>
                                        </li>
                                    @endfor
                                    <li id="btn-add-tab"><a><b>+</b></a></li>
                                </ul>

                                <!-- Tab panes -->
                                <div id="tab-content" class="tab-content tab-content-block">
                                    @foreach($building->building->blocks as $key => $buildingBlock)
                                        <div class="tab-pane fade in @if($key+1  == 1) active @endif" id="tab{{$key+1}}">
                                            <input type="hidden" value="{{$buildingBlock->blockId}}" id="blockId">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Tên block</label>
                                                    <input type="text" name="name-block" class="form-control"
                                                           id="name-block" placeholder="Tên block"
                                                           value="{{ $buildingBlock->name or "" }}">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Số tầng của block</label>
                                                    <input type="text" name="floor-block" class="form-control"
                                                           id="floor-block" placeholder="Số tầng của block"
                                                           value="{{$buildingBlock->numberFloor or ''}}"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Số tầng hầm</label>
                                                    <input type="number" name="basement-block"
                                                           class="form-control" id="basement-block"
                                                           placeholder="Số tầng hầm"
                                                           value="{{$buildingBlock->numberBasement or ''}}"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Năm xây dựng</label>
                                                    <input type="number" name="year-built-block"
                                                           class="form-control" id="year-built-block"
                                                           placeholder="Năm xây dựng"
                                                           value="{{$buildingBlock->yearBuilt or ''}}"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Số thang máy</label>
                                                    <input type="number" name="elevator-block"
                                                           class="form-control" id="elevator-block"
                                                           placeholder="Số thang máy"
                                                           value="{{$buildingBlock->numberElevator or ''}}"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Năm sửa chữa</label>
                                                    <input type="number" name="year-fix-block"
                                                           class="form-control" id="year-fix-block"
                                                           placeholder="Năm sửa chữa" value="{{$buildingBlock->yearFixed or ''}}"/>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="checkbox ">
                                                        <input name="isMezzanine" type="checkbox" id="isMezzanine" class="isMezzanine"
                                                               @if($buildingBlock->isMezzanine == true) checked @endif
                                                        >
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Mezzanine
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="checkbox ">
                                                        <input name="isRooftop" type="checkbox" id="isRooftop" class="isRooftop"
                                                               @if($buildingBlock->isRooftop == true) checked @endif
                                                        >
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Rooftop
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="checkbox ">
                                                        <input name="isPenhouse" type="checkbox" id="isPenhouse" class="isPenhouse"
                                                               @if($buildingBlock->isPenhouse == true) checked @endif
                                                        >
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Penhouse
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
                            </div>
                            @else
                                <div class="col-md-12 nav-tabs-custom">
                                    <!-- Nav tabs -->
                                    <ul id="tab-list" class="nav nav-tabs" role="tablist" role="tablist">
                                        <li class="active"><a href="#tab" role="tab" data-toggle="tab">Block</a>
                                        </li>
                                        <li id="btn-add-tab"><a><b>+</b></a></li>
                                    </ul>

                                    <!-- Tab panes -->
                                    <div id="tab-content" class="tab-content tab-content-block">
                                        <div class="tab-pane fade in active" id="tab">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Tên block</label>
                                                        <input type="text" name="name-block" class="form-control"
                                                               id="name-block" placeholder="Tên block">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Số tầng của block</label>
                                                        <input type="text" name="floor-block" class="form-control"
                                                               id="floor-block" placeholder="Số tầng của block"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Số tầng hầm</label>
                                                        <input type="number" name="basement-block"
                                                               class="form-control" id="basement-block"
                                                               placeholder="Số tầng hầm"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Năm xây dựng</label>
                                                        <input type="number" name="year-built-block"
                                                               class="form-control" id="year-built-block"
                                                               placeholder="Năm xây dựng"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Số thang máy</label>
                                                        <input type="number" name="elevator-block"
                                                               class="form-control" id="elevator-block"
                                                               placeholder="Số thang máy"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Năm sửa chữa</label>
                                                        <input type="number" name="year-fix-block"
                                                               class="form-control" id="year-fix-block"
                                                               placeholder="Năm sửa chữa"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="checkbox ">
                                                            <input name="isMezzanine" type="checkbox" id="isMezzanine" class="isMezzanine" >
                                                            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Mezzanine
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="checkbox ">
                                                            <input name="isRooftop" type="checkbox" id="isRooftop" class="isRooftop" >
                                                            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Rooftop
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="checkbox ">
                                                            <input name="isPenhouse" type="checkbox" id="isPenhouse" class="isPenhouse" >
                                                            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Penhouse
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Kiểm duyệt -->
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title"><b>Kiểm duyệt</b></h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12">
                                <label class="checkbox ">
                                    @if($page_type == 'CREATE')
                                        <input name="isVerified" type="checkbox" id="isVerified" class="isVerified" checked>
                                    @else
                                        <input name="isVerified" type="checkbox" id="isVerified" class="isVerified"
                                               @if(isset($building->building->isVerified) && $building->building->isVerified == true) checked @endif
                                        >
                                    @endif

                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Xác nhận
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 text-right">
                                <button id="finish" type="submit" class="btn btn-primary">Hoàn tất</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection
@section('page-js')
    @extends('building.templates.building-tab-block')
    @extends('building.templates.add-cost-block')
    <script src="{{loadAsset("/js/define.js")}}"></script>
    <script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/ckeditor/ckeditor.js")}}"></script>
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/js/template7.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-lib.js") }}"></script>
    <script type="text/javascript">
        const pageType = "{{$page_type}}"
        const upload_url = "<?=UPLOAD_URL?>";
        const propertyTypeId = {{$propertyTypeId ? $propertyTypeId : 'null'}};
        const listingTypeId = {{$listingTypeId ? $listingTypeId : 'null'}};
        const purposeId = {{$purposeId ? $purposeId : null}};
        const propertyTypeName = "{{ $propertyTypeName}}";
        const listingId = <?php
            if (isset($building->listingId))
                echo $building->listingId;
            else
                echo 'null';
            ?>;
        const buildingId = <?php
            if (isset($building->building->buildingId))
                echo $building->building->buildingId;
            else
                echo 'null';
            ?>;
        const projectId = <?php
            if (isset($building->building->projectId))
                echo $building->building->projectId;
            else
                echo 0;
        ?>;
        const numberOfBlock = <?php
            if (isset($building->building->blocks) && count($building->building->blocks) > 0)
                echo count($building->building->blocks);
            else
                echo 1;
        ?>;
        const amenities = <?php if (isset($buildingAmenities)) echo json_encode($buildingAmenities); else echo json_encode([]); ?>;
        const includeAmenities = <?php if (isset($includedAmenityIds)) echo json_encode($includedAmenityIds); else echo json_encode([]); ?>;
        const photos = <?php if (isset($building->photos)) echo json_encode($building->photos); else echo json_encode([]); ?>;
        const listings = <?php
            if (isset($building->building->rIdsLive) && count($building->building->rIdsLive) > 0)
                echo json_encode($building->building->rIdsLive);
            else
                echo json_encode([]);
            ?>;

    </script>

    <script src="{{loadAsset("/js/building/create-edit.js")}}"></script>


@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/editor.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/dialog.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
    <style type="text/css">
        .block-name {
            position: relative;
        }
        .block-name #building-name-search-block.dropdown-menu {
            width: 100%;
        }
        #building-name-search-block.dropdown-menu > .dropdown-item {
            display: block;
            padding: 5px;
        }
        .block-name .input-icon {
            position: absolute;
            top: 0;
            right: 0;
            display: table-cell;
        }
        .input-icon > i {
            width: 25px;
            height: 25px;
            padding: 5px;
            border-radius: 20px;
            text-align: center;
            vertical-align: middle;
        }
        .input-icon i.fa-check {
            background: #366501;
            color: #ffffff;
        }
        .input-icon i.fa-times {
            background: #eaa3b3;
            color: #ffffff;
        }
    </style>
@stop

