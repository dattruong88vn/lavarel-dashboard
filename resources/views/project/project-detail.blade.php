@extends('layout.default')

@section('content')
    <div class='dashboard'>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-body">
                        <form role="form">
                            <div class="row">
                                <h2 class="title-with-line"><span>1. Tổng quan dự án</span></h2>
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="projectName" class="control-label required">Tên dự án</label>
                                        <input type="text" id="projectName" name="projectName" class="form-control" value="{{isset($projectDetail) ? $projectDetail->projectName : ''}}" required="required" pattern="" title="">
                                    </div>
                                </div>
                                <div style="padding-top:2%" class="col-md-6">
                                    <label class="checkbox"><input {{isset($projectDetail->topShow) && $projectDetail->topShow ? 'checked' : ''}} type="checkbox" class="amenities" name="topShow" > 
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Dự án được ưu tiên hiển thị</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label required" for="cityId">Thành phố</label>
                                        <select readonly id="cityId" name="cityId" class="form-control select2">
                                            <option value="1">Hồ Chí Minh</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label required" for="districtId">Quận</label>
                                        <select id="districtId" name="districtId" class="form-control select2">
                                            <option value="0">--- Vui lòng chọn ---</option>
                                            @foreach($districts->data as $district)
                                                <option @if(isset($projectDetail->districtId) && $district->districtId ==  $projectDetail->districtId) selected @endif value="{{$district->districtId}}">{{$district->districtName}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label required" for="wardId">Phường</label>
                                        <select readonly id="wardId" name="wardId" class="form-control select2">
                                            <option value="-1">--- Vui lòng chọn ---</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="control-label" for="streetId">Đường</label>
                                        <select id="streetId" name="streetId" class="form-control select2">
                                            <option value="-1">--- Vui lòng chọn ---</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="address" class="control-label required">Địa chỉ</label>
                                        <input type="text" id="address" name="address" class="form-control"  required="required" pattern="" title="" value="{{isset($projectDetail) ? $projectDetail->address : ''}}">
                                    </div>
                                </div>
                                <div class="col-md-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="lat" class="control-label required">Lat</label>
                                        <input type="text" id="lat" name="latitude" class="form-control" required="required" pattern="" title="" value="{{isset($projectDetail) ? $projectDetail->latitude : ''}}">
                                    </div>
                                </div>
                                <div class="col-md-3 col-xs-12">
                                    <div class="form-group">
                                        <label for="long" class="control-label required">Long</label>
                                        <input type="text" id="long" name="longitude" class="form-control" required="required" pattern="" title="" value="{{isset($projectDetail) ? $projectDetail->longitude : ''}}">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="developer" class="control-label">Nhà phát triển</label>
                                        <input type="text" value="{{isset($projectDetail->developer) ? $projectDetail->developer : ''}}" name="developer" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="contractors" class="control-label required">Nhà thầu</label>
                                        <input type="text" id="contractors" name="contractors" class="form-control" required="required" pattern="" title="" value="{{isset($projectDetail->contractors) ? $projectDetail->contractors : ''}}">
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="statusId" class="control-label required">Tiến độ dự án</label>
                                        <select id="statusId" name="statusId" class="form-control select2">
                                            <option {{isset($projectDetail->statusId) && $projectDetail->statusId == 43 ? 'selected' : ''}} value="43">Sắp mở bán</option>
                                            <option {{isset($projectDetail->statusId) && $projectDetail->statusId == 44 ? 'selected' : ''}} value="44">Đã hoàn thành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="numberOfBlocks" class="control-label required">Số block</label>
                                        <input type="text" id="numberOfBlocks" name="numberOfBlocks" value="{{isset($projectDetail->numberOfBlocks) ? $projectDetail->numberOfBlocks : ''}}" class="form-control numvad"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="numberOfUnits" class="control-label required">Số căn hộ</label>
                                        <input type="text" id="numberOfUnits" name="numberOfUnits" value="{{isset($projectDetail->numberOfUnits) ? $projectDetail->numberOfUnits : ''}}" class="form-control numvad"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="numberOfFloors" class="control-label required">Số tầng</label>
                                        <input type="text" id="numberOfFloors" name="numberOfFloors" value="{{isset($projectDetail->numberOfFloors) ? $projectDetail->numberOfFloors : ''}}" class="form-control numvad"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="price" class="control-label">Giá</label>
                                        <input type="text" value="{{isset($projectDetail->price) ? $projectDetail->price : ''}}" name="price" id="price" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="yearBuilt" class="control-label required">Năm xây dựng</label>
                                        <input type="text" id="yearBuilt" name="yearBuilt" value="{{isset($projectDetail->yearBuilt) ? $projectDetail->yearBuilt : ''}}" class="form-control numvad"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="lotSize" class="control-label required">Tổng diện tích</label>
                                        <input type="text" id="lotSize" name="lotSize" value="{{isset($projectDetail->lotSize) ? $projectDetail->lotSize : ''}}" class="form-control numvad"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-xs-12">
                                    <div class="form-group">
                                        <label for="buildingDensity" class="control-label required">Mật độ xây dựng</label>
                                        <input type="text" id="buildingDensity" name="buildingDensity" value="{{isset($projectDetail->buildingDensity) ? $projectDetail->buildingDensity : ''}}" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="minSizeUnit" class="control-label required">Diện tích căn hộ</label>
                                        <input type="text" id="minSizeUnit" placeholder="từ (m)" name="minSizeUnit" value="{{isset($projectDetail->minSizeUnit) ? $projectDetail->minSizeUnit : ''}}" class="form-control numvad">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="maxSizeUnit" class="control-label" style="height: 20px;"></label>
                                        <input type="text" id="maxSizeUnit" placeholder="đến (m)" name="maxSizeUnit" value="{{isset($projectDetail->maxSizeUnit) ? $projectDetail->maxSizeUnit : ''}}" class="form-control numvad">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="developer" class="control-label">Số tầng nổi</label>
                                        <input type="text" value="{{isset($projectDetail->numberOfFloatingFloors) ? $projectDetail->numberOfFloatingFloors : ''}}" name="numberOfFloatingFloors" class="form-control numvad"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="developer" class="control-label">Số tầng hầm</label>
                                        <input type="text" value="{{isset($projectDetail->numberOfBasements) ? $projectDetail->numberOfBasements : ''}}" name="numberOfBasements" class="form-control numvad"/>
                                    </div>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <div class="form-group">
                                        <label for="developer" class="control-label">Số tháng máy</label>
                                        <input type="text" value="{{isset($projectDetail->numberOfElevators) ? $projectDetail->numberOfElevators : ''}}" name="numberOfElevators" class="form-control numvad"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="description" class="control-label">Thông tin thêm</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing">{!! isset($projectDetail) ? $projectDetail->projectDescription : '' !!}</textarea>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <h2 class="title-with-line"><span>2. Vị trí hạ tầng</span></h2>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="description" class="control-label">Vị trí hạ tầng</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="infrastructure" id="infrastructure" rows="3" placeholder="Mô tả Listing">{!! isset($projectDetail) ? $projectDetail->infrastructure : '' !!}</textarea>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <h2 class="title-with-line"><span>3. Tiện ích xung quanh</span></h2>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="amenities-wrapper" class="control-label required">Tiện ích</label>
                                        <div class="row">
                                            <div class="col-md-12" id="amenities-wrapper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Hide field "Tiện ích xung quanh" in section "3. Tiện ích xung quanh" -->
                            <!-- <div class="row form-group">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="amenities-around-wrapper" class="control-label">Tiện ích xung quanh</label>
                                        <div class="col-md-12 form-group" id="amenities-around-wrapper"></div>
                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <input type="text" class="form-control" id="txt-add-around-amenities" placeholder="Tên tiện ích">
                                                </div>
                                                <div class="col-md-3">
                                                    <button id="btn-add-around-amenities" class="btn btn-sm btn-primary">Thêm tiện ích</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="row form-group">
                                <!--Images/Video-->
                                <h2 class="title-with-line"><span>4. Thiết kế mặt bằng</span></h2>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label for="description" class="control-label">Thiết kế mặt bằng</label>
                                        <div class="form-group">
                                            <form>
                                                <textarea class="form-control" name="groundDesign" id="groundDesign" rows="3" placeholder="Mô tả Listing">{!! isset($projectDetail) ? $projectDetail->groundDesign : '' !!}</textarea>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="col-md-12 col-xs-12">
                                    <div class="form-group imageListing">
                                        <label for="file-image-create" class="control-label required">Sơ đồ thiết kế</label>
                                        <div id="photos-wrapper"></div>
                                    </div>
                                </div> -->
                                <!-- #Images/Video-->
                            </div>
                            <div class="row form-group">
                                <!--Images/Video-->
                                <h2 class="title-with-line"><span>5. Chủ đầu tư</span></h2>
                                <div class="col-md-3 col-xs-3">
                                    <div class="form-group">
                                        <label class="control-label">Chủ đầu tư</label>
                                        <select id="investorId"  name="investorId" class="form-control select2" style="width: 100%;">
                                            <option value="">--- Vui lòng chọn ---</option>
                                            @foreach($developerList as $developer)
                                                <?php
                                                    $isSelect = isset($projectDetail) && ($projectDetail->investorId ==  $developer->investorId) ? 'selected' : '';
                                                ?>
                                                <option value="{{$developer->investorId}}" {{ $isSelect }}>{{$developer->investorName}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- #Images/Video-->
                            </div>
                            <div class="row form-group">
                                <!--Images/Video-->
                                <h2 class="title-with-line"><span>6. Tài liệu</span></h2>
                                <div class="col-md-12 col-xs-12">
                                    <div class="form-group imageListing">
                                        <label for="file-image-create" class="control-label">Tài liệu</label>
                                        <div id="appraisal-photo"></div>
                                    </div>
                                </div>
                                <!-- #Images/Video-->
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                    <h2 class="title-with-line"><span>7. Hình ảnh</span></h2>
                                    <!--Images/Video-->
                                    <!-- <h2 class="title-with-line"><span>Hình ảnh</span></h2>
                                    <div class="col-md-12 col-xs-12">
                                        <div class="form-group imageListing">
                                            <div id="photos-wrapper"></div>
                                        </div>
                                    </div> -->
                                    <!-- #Images/Video-->
                                    <ul class="nav nav-tabs">
                                        <li class="active"><a data-toggle="tab" href="#home">Tòa nhà</a></li>
                                        <li><a data-toggle="tab" href="#menu1">Trong nhà</a></li>
                                        <li><a data-toggle="tab" href="#menu2">Phòng mẫu</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="home" class="tab-pane fade in active">
                                            <div id="building-photos-wrapper"></div>
                                        </div>
                                        <div id="menu1" class="tab-pane fade">
                                            <div id="inside-home-photos-wrapper"></div>
                                        </div>
                                        <div id="menu2" class="tab-pane fade">
                                            <div id="template-room-photos-wrapper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12 text-right" >
                                    <button type="button" id="finish-reviewing" class="btn btn-primary">
                                        @if($page_type == 'CREATE')
                                            <i class="fa fa-plus"></i> Tạo
                                            @else
                                            <i class="fa fa-repeat"></i> Cập nhật
                                            @endif

                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        {{--<div class="row">
            <div class="col-md-12">
                <div class="box box-info">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="form-group">
                                    <label for="process" class="control-label required">Giai đoạn</label>
                                    <div class="nav-tabs-custom">
                                        <ul id="tab-list" class="nav nav-tabs">
                                            <li id="btn-add-tab"><a><b>+</b></a></li>
                                        </ul>
                                        <div id="tab-content" class="tab-content tab-content-block">

                                        </div><!-- /.tab-content -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-footer">
                        <div class="col-md-12 text-right" >
                            <button type="button" id="finish-reviewing" class="btn btn-primary">
                                @if($page_type == 'CREATE')
                                    <i class="fa fa-plus"></i> Tạo
                                    @else
                                    <i class="fa fa-repeat"></i> Cập nhật
                                    @endif

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>--}}
        <div class="row">
            <input type="hidden" id="pId" value="{{isset($projectDetail) ? $projectDetail->pId : ''}}">
        </div>
    </div>

@endsection

@section('page-js')   
    @extends('templates.progressing-item')
    <script type="text/javascript">
        const photosProject = {!! (isset($projectDetail) && count($projectDetail->photos) > 0) ?  (json_encode($projectDetail->photos)) : '[]'!!};
        const photosProject2 = {!! (isset($projectDetail) && count($projectDetail->photoInHouses) > 0) ?  (json_encode($projectDetail->photoInHouses)) : '[]'!!};
        const photosProject3 = {!! (isset($projectDetail) && count($projectDetail->photoModels) > 0) ?  (json_encode($projectDetail->photoModels)) : '[]'!!};
        const documents = {!! (isset($projectDetail) && count($projectDetail->documents) > 0) ?  (json_encode($projectDetail->documents)) : '[]'!!};
        const wardId = '{{isset($projectDetail) ? $projectDetail->wardId : null}}';
        const streetId = '{{ isset($projectDetail) ? $projectDetail->streetId : null}}';
        const rogressList = {!! (isset($projectDetail) && count($projectDetail->inProgressList) > 0) ?  (json_encode($projectDetail->inProgressList)) : '[]' !!}
        const page_type = '{{$page_type}}';
        const amenities = {!! (isset($projectDetail) && count($projectDetail->amenities) > 0) ?  (json_encode($projectDetail->amenities)) : '[]' !!}
        const aroundAmenities = {!! (isset($projectDetail) && count($projectDetail->aroundAmenities) > 0) ?  (json_encode($projectDetail->aroundAmenities)) : '[]' !!}

    </script>
    <script src="{{ loadAsset("/js/pos/common/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/ckeditor_full/ckeditor.js")}}"></script>
    <script src="{{loadAsset("/plugins/ckeditor/ckfinder/ckfinder.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/files-upload_lib_custom_project.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-lib.js") }}"></script>
    <script src="{{ loadAsset("/js/project/detail.js")}}"></script>
@stop
@section('page-css')

    <link href="{{loadAsset("/css/profilebuilding.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/listing-create.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    

@stop
