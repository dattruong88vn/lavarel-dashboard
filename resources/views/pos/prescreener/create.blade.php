@extends('layout.default')
@section('content')

<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <div class="row">
        <div class="col-md-12">
            <form class="form-horizontal" id="myForm" role="form" novalidate="true">
                <!-- Hidden -->
                <input type="hidden" id="hiddenLoggedInUserId" value="{{$loggedInUser->userId}}" />
                <div class="box box-info crawler-info">
                    <div class="box-body">
                        <!-- BEGIN LINK -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Link</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <input id="link" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN LINK -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-sourceId">Nguồn đăng tin</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="sourceId" class="form-control"></select>
                                </div>
                                <label class="control-label col-xs-12 col-sm-2 col-md-1 label-tcId tc-wrapper" style="display: none">TC</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3 tc-wrapper" style="display: none">
                                    <select id="tcId" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group info-channel-wrapper">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-infoChannel">Kênh thông tin</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="infoChannel" class="form-control"></select>
                                </div>
                                <label class="control-label col-xs-12 col-sm-2 col-md-1 label-infoChannelChild ">Kênh phụ</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="infoChannelChild" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-statusId">Phân Loại</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="statusId" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN LISTING TYPE -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-listingTypeId">Loại Giao Dịch</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="listingTypeId" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN BEGIN REAL ESTATE GROUP -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-realEstateGroupId">Nhóm BĐS</label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3">
                                    <select id="realEstateGroupId" class="form-control"></select>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN PROPERTY TYPE -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-propertyTypeId">Loại BĐS </label>
                                <div class="select-2 col-xs-12 col-sm-10 col-md-3" id="blc-property-type">
                                    <select id="propertyTypeId" class="form-control"></select>
                                </div>
                                <div id="blc-project-land" style="display: none;">
                                    <label class="control-label col-sm-2 col-sm-2 col-md-1 label-projectId">Dự án</label>
                                    <div class="col-sm-3"><select id="projectId" class="form-control"></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-sm-2 col-xs-2">Chủ tin đăng</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class=" row form-group display-agent" style="display: none;">
                                                <div class="col-sm-8">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-name-agent">Tên môi giới</label>
                                                        <div class="col-sm-12">
                                                            <select id="name-agent" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-email-agent">Email</label>
                                                        <div class="col-sm-12">
                                                            <input id="email-agent" type="email" class="form-control" disabled="true">
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class=" row form-group display-agent" style="display: none;">

                                                <div class="col-sm-12 col-md-4" style="display: none">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-phone-agent">Số điện thoại</label>
                                                        <div class="col-sm-12">
                                                            <input id="phone-agent" type="text" class="form-control" disabled="true">
                                                            <input id="socialUid-agent" type="hidden" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-12 text-right" style="padding-top: 25px;">
                                                    <button id="btn-agent-create" class="btn btn-primary">
                                                        <span class="fa fa-user-plus" aria-hidden="true"> Tạo môi giới</span>
                                                    </button>
                                                    {{--<button id="btn-agent-send-app" class="btn btn-warning">
                                                            <span class="fa fa-send" aria-hidden="true">  Gửi app</span>
                                                        </button>--}}
                                                    <button id="phone-call-agent" class="btn btn-success make-call show-pos-call" data-type="2">
                                                        <span class="fa fa-phone" aria-hidden="true"> Gọi môi giới</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr class="display-agent" style="display: none;" />

                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-mockSurnameId">Định danh</label>
                                                        <div class="col-sm-12">
                                                            <select id="mockSurnameId" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-sm-12 col-md-8">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-name">Tên chủ nhà</label>
                                                        <div class="col-sm-12">
                                                            <input id="name" type="text" class="form-control" placeholder="Nhập tên chủ tin đăng">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-email">Email</label>
                                                        <div class="col-sm-12">
                                                            <input id="email" type="email" class="form-control" placeholder="Nhập địa chỉ email">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-phone">Số điện thoại</label>
                                                        <div class="col-sm-12">
                                                            <input id="phone" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 text-right">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12" style="height: 25px;"></label>
                                                        <div class="col-sm-12">
                                                            <button id="check-duplicated-email-btn" class="btn btn-warning">
                                                                <span class="fa fa-search" aria-hidden="true"> Kiểm tra email</span>
                                                            </button>
                                                            <button id="phone-call" class="btn btn-success make-call show-pos-call" data-type="1">
                                                                <span class="fa fa-phone" aria-hidden="true"> Gọi chủ nhà</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- BEGIN OWNER TYPE -->
                        <!-- BDS -->
                        <div class="row form-group" id="blc-building" style="display: none;">
                            <div class="col-sm-12">
                                <label class="control-label col-sm-2 col-xs-2">Thông tin chung cư</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class=" row form-group">
                                                <div id="display-buildingBlock">
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="row">
                                                            <label class="control-label col-xs-12 col-sm-12 label-buildingId">Building</label>
                                                            <div class="col-sm-12">
                                                                <select id="buildingId" class="form-control"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="row">
                                                            <label class="control-label col-xs-12 col-sm-12 label-blockId">Block</label>
                                                            <div class="col-sm-12">
                                                                <select id="blockId" class="form-control"></select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                <div class="col-sm-12 col-md-4" id="display-modelCode">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-modelCode">Mã căn hộ</label>
                                                        <div class="col-sm-12">
                                                            <input id="modelCode" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END BDS -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-sm-2 col-xs-2">Địa chỉ</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">

                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-cityId">Thành Phố </label>
                                                        <div class="col-sm-12">
                                                            <select id="cityId" class="form-control">
                                                                <option value="1">TP Hồ Chí Minh</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-districtId">Quận</label>
                                                        <div class="col-sm-12">
                                                            <select id="districtId" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-wardId">Phường</label>
                                                        <div class="col-sm-12">
                                                            <select id="wardId" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-streetId">Đường</label>
                                                        <div class="col-sm-12">
                                                            <!-- hide button add new address -->
                                                            <!-- <div class="input-group add-new-street">
                                                                <select id="streetId" class="form-control"></select>
                                                                <span id="add-new-street-btn" class="input-group-addon input-group-addon-success-btn add-new-street-btn">
                                                                    <i class="glyphicon glyphicon-plus" aria-hidden="true"></i>
                                                                </span>
                                                            </div> -->
                                                            <select id="streetId" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4" id="display-houseNumber">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-houseNumber">Số nhà</label>
                                                        <div class="col-sm-12">
                                                            <input id="houseNumber" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-4" id="display-landCode">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-landCode">Số thửa</label>
                                                        <div class="col-sm-12">
                                                            <input id="landCode" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4" id="display-mapCode">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-mapCode">Tờ bản đồ</label>
                                                        <div class="col-sm-12">
                                                            <input id="mapCode" type="text" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12" style="height: 25px"></label>
                                                        <div class="col-sm-12">
                                                            <button id="check-duplicated-btn" class="btn btn-warning">
                                                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class=" row form-group">
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <label class="control-label col-xs-8 col-sm-8 label-address">Địa chỉ </label>
                                                        <div class="col-xs-4 col-sm-4 text-right">
                                                            <a id="seeonmap" href=""><span id="helpBlock" class="help-block" style="color: inherit; margin: 0">Xem trên bản đồ ...</span></a>
                                                        </div>
                                                        <div class="col-sm-12">
                                                            <input id="address" type="text" name="" class="form-control" placeholder="Địa chỉ" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class=" row form-group geo-convert">
                                                <div class="col-sm-4 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-latitude">Tọa độ x </label>
                                                        <div class="col-sm-12">
                                                            <input id="x-latitude" type="number" name="" class="form-control" placeholder="Nhập tọa độ x" value="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 col-md-4">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-longitude">Tọa độ y </label>
                                                        <div class="col-sm-12">
                                                            <input id="y-longitude" type="number" name="" class="form-control" placeholder="Nhập tọa độ y" value="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-2 col-md-2">
                                                    <button type="button" class="convert btn btn-success" style="margin-top: 27px;"> Chuyển <i class="glyphicon glyphicon-chevron-right"></i></button>
                                                </div>
                                            </div>

                                            <div class=" row form-group geo-details">
                                                <div class="col-sm-6 col-md-6">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-latitude required">Google latitude </label>
                                                        <div class="col-sm-12">
                                                            <input id="latitude" type="number" name="" class="form-control" placeholder="google lat" value="" data-geo="lat">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6 col-md-6">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-longitude required">Google longitude </label>
                                                        <div class="col-sm-12">
                                                            <input id="longitude" type="number" name="" class="form-control" placeholder="google long" value="" data-geo="lng">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class=" row form-group">
                                                <div class="col-sm-12">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-oldAddress">Địa chỉ cũ</label>
                                                        <div class="col-sm-12">
                                                            <input id="oldAddress" type="text" name="" class="form-control" placeholder="Địa chỉ cũ" value="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Kết cấu nhà</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-3" id="display-lotSize">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-lotSize">Diện tích đất</label>
                                                        <div class="col-sm-12">
                                                            <input id="lotSize" type="text" name="" class="form-control auto-format-size" placeholder="(m2)">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-floorSize">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-floorSize">Diện tích sử dụng</label>
                                                        <div class="col-sm-12">
                                                            <input id="floorSize" type="text" name="" class="form-control auto-format-size" placeholder="(m2)">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-sizeLength">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-sizeLength">Chiều dài</label>
                                                        <div class="col-sm-12">
                                                            <input id="sizeLength" type="text" name="" class="form-control auto-format-size" placeholder="(m)">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-sizeWidth">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-sizeWidth">Chiều rộng</label>
                                                        <div class="col-sm-12">
                                                            <input id="sizeWidth" type="text" name="" class="form-control auto-format-size" placeholder="(m)">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class=" row form-group">
                                                <div class="col-sm-12 col-md-3">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12">Hướng Nhà</label>
                                                        <div class="col-sm-12">
                                                            <select id="directionId" class="form-control">
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-numberfloor">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-numberFloor">Số lầu</label>
                                                        <div class="col-sm-12">
                                                            <input id="numberFloor" type="number" name="" class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-bedRooms">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-bedRooms">Phòng ngủ</label>
                                                        <div class="col-sm-12">
                                                            <input id="bedRooms" type="number" name="" class="form-control" value="">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3" id="display-bathRooms">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-bathRooms">Phòng wc</label>
                                                        <div class="col-sm-12">
                                                            <input id="bathRooms" type="number" name="" class="form-control" value="">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row form-group display-struct">
                                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input id="isMezzanine" type="checkbox" value="">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có tầng lửng
                                                </label>
                                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input id="isRooftop" type="checkbox" value="">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có sân thượng
                                                </label>
                                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input id="isAttic" type="checkbox" value="">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có gác xếp
                                                </label>
                                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input id="isPenhouse" type="checkbox" value="">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có Áp Mái
                                                </label>
                                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input id="isBasement" type="checkbox" value="">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có Tầng hầm
                                                </label>
                                            </div>

                                            <div class="row form-group display-struct">
                                                <label class="radio control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input type="radio" name="houseCastings" id="houseCastings1" value="1">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Đúc thật
                                                </label>
                                                <label class="radio control-label col-xs-12 col-sm-4 col-md-3">
                                                    <input type="radio" name="houseCastings" id="houseCastings2" value="2">
                                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Đúc giả
                                                </label></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12" id="display-position">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Vị trí</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="row form-group" id="display-floor" style="display: none;">
                                                <label class="control-label col-xs-12 col-sm-12 col-md-3 label-floor">Ở vị trí (Tầng)</label>
                                                <div class="col-xs-12 col-sm-12 col-md-4">
                                                    <input id="floor" type="number" name="" class="form-control" placeholder="Số tầng">
                                                </div>
                                            </div>
                                            <div class="row form-group" id="display-basic-position" style="display: none;">
                                                <label class="control-label col-xs-12 col-sm-12 col-md-3 label-position">Ở vị trí </label>
                                                <div class="col-xs-12 col-sm-12 col-md-4">
                                                    <select id="position" class="form-control"></select></div>
                                            </div>
                                            <div class="row form-group" id="display-front" style="display: none;">
                                                <label class="control-label col-xs-12 col-sm-12 col-md-3 label-roadFrontageWidth">Độ rộng mặt tiền </label>
                                                <div class="col-xs-12 col-sm-12 col-md-4">
                                                    <input id="roadFrontageWidth" type="number" class="form-control">
                                                </div>
                                            </div>
                                            <div class="display-alley" id="display-alley" style="display: none;">
                                                <div class="row form-group">
                                                    <label class="control-label col-xs-12 col-sm-12 col-md-3 label-alleyId">Loại hẻm </label>
                                                    <div class="col-xs-12 col-sm-12 col-md-4">
                                                        <select id="alleyId" class="form-control"></select></div>
                                                    <label class="radio control-label col-xs-12 col-sm-4 col-md-2">
                                                        <input type="radio" name="alleyType" id="alleyType1" value="1" class="alleyType" checked="true">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Hẻm thông
                                                    </label>
                                                    <label class="radio control-label col-xs-12 col-sm-4 col-md-2">
                                                        <input type="radio" name="alleyType" id="alleyType2" value="0" class="alleyType">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Hẻm cụt
                                                    </label>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="control-label col-xs-12 col-sm-12 col-md-3 label-alleyWidth">Độ rộng hẻm</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-4">
                                                        <input id="alleyWidth" type="number" name="" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="control-label col-xs-12 col-sm-12 col-md-3 label-roadFrontageDistance">Khoảng cách đến mặt tiền đường</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-4">
                                                        <select id="roadFrontageDistance" class="form-control"></select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group " id="display-yearBuilt">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Năm xây dựng</label>
                                <div class="control-label col-xs-12 col-sm-10 col-md-3">
                                    <input id="yearBuilt" type="text" name="" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group" id="display-yearFixed">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Năm sửa nhà</label>
                                <div class="control-label col-xs-12 col-sm-10 col-md-3">
                                    <input id="yearFixed" type="text" name="" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 required">Campaign id</label>
                                <div class="col-xs-12 col-sm-10 col-md-3">
                                    <input id="campaignId" type="text" name="" class="form-control">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-7">
                                    <label class="checkbox control-label"><input id="campaignChecked" type="checkbox" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Không thuộc Campaign nào</label>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN PRICE -->
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-price">Giá</label>
                                <div class="col-xs-12 col-sm-10 col-md-3">
                                    <input id="price" type="text" name="" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group" id="display-currency">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-currency">Loại tiền</label>
                                <div class="col-xs-12 col-sm-10 col-md-3">
                                    <select id="currency" type="text" name="" class="form-control">
                                        <option value="VND">VND</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-minPrice">Giá thương lượng tối thiểu</label>
                                <div class="col-xs-12 col-sm-10 col-md-3">
                                    <input id="minPrice" type="text" name="" class="form-control">
                                </div>
                            </div>
                        </div>
                        <!-- END PRICE -->
                        <div class="row form-group" id="display-statusQuoId">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-statusQuoId">Hiện trạng nhà</label>
                                <div class="col-xs-12 col-sm-4 col-md-3">
                                    <select id="statusQuoId" class="form-control"></select>
                                </div>
                                <div id="display-statusQuo" style="display: none;">
                                    <label class="control-label col-xs-12 col-sm-2 col-md-2">Giá cho thuê</label>
                                    <div class="col-xs-12 col-sm-4 col-md-3">
                                        <input id="priceForStatusQuo" type="text" name="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12" id="display-legalPapers">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Giấy tờ pháp lý</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="row form-group">
                                                <div class="col-sm-12 col-md-3">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12 label-useRightTypeId required">Loại giấy tờ</label>
                                                        <div class="col-sm-12">
                                                            <select id="useRightTypeId" class="form-control"></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12" style="height: 25px;"></label>
                                                        <div class="col-sm-12">
                                                            <label class="checkbox">
                                                                <input id="mortgaged" type="checkbox" value="">
                                                                <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                                                Thế chấp ngân hàng
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3">
                                                    <div class="row">
                                                        <label class="control-label col-xs-12 col-sm-12">Ngân hàng</label>
                                                        <div class="col-sm-12">
                                                            <div class="input-group add-new-bank">
                                                                <select id="bankId" class="form-control" data-label="Ngân hàng"></select>
                                                                <span id="add-new-bank-btn" class="input-group-addon input-group-addon-success-btn add-new-bank-btn">
                                                                    <i class="glyphicon glyphicon-plus" aria-hidden="true"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row form-group" id="display-privacy">
                                                <div class="col-sm-12 col-md-3">
                                                    <label class="radio">
                                                        <input type="radio" name="privacy" id="privacy1" value="1" class="privacy">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Sở hữu chung
                                                    </label>
                                                </div>
                                                <div class="col-sm-12 col-md-3">
                                                    <label class="radio">
                                                        <input type="radio" name="privacy" id="privacy2" value="2" class="privacy" checked="checked">
                                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Sở hữu riêng
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Thời gian giao nhà / dọn vào </label>
                                <div class="date col-xs-12 col-sm-4 col-md-3" data-provide="datepicker" id="display-moveInDate" data-date-format="dd/mm/yyyy" disabled>
                                    <input id="moveInDatePicker" type="text" class="form-control">
                                    <div class="input-group-addon" style="display: none">
                                        <span class="glyphicon glyphicon-th"></span></div>
                                </div>
                                <label class="checkbox control-label col-xs-12 col-sm-4 col-md-3">
                                    <input id="moveInDateCheck" type="checkbox" value="">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Ngay sau khi ký hợp đồng
                                </label>
                            </div>
                        </div>
                        <div id="display-deposit" style="display: none;">
                            <div class="row form-group">
                                <div class="col-sm-12">
                                    <label class="control-label col-xs-12 col-sm-2 col-md-2 label-minContractDeadline">Thời gian thuê tối thiểu </label>
                                    <div class="col-xs-12 col-sm-10 col-md-3">
                                        <input id="minContractDeadline" type="text" name="" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-sm-12">
                                    <label class="control-label col-xs-12 col-sm-2 col-md-2 label-deposit">Số tiền đặt cọc thuê </label>
                                    <div class="col-xs-12 col-sm-10 col-md-3">
                                        <input id="deposit" type="text" name="" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-sellFolding">Cần bán gấp </label>
                                <label class="radio control-label col-xs-4 col-sm-3 col-md-1">
                                    <input type="radio" name="sellFolding" id="sellFolding1" value="true" class="sellFolding">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> có
                                </label>
                                <label class="radio control-label col-xs-4 col-sm-3 col-md-2">
                                    <input type="radio" name="sellFolding" id="sellFolding2" value="false" class="sellFolding" checked="true">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> không
                                </label>
                            </div>
                        </div>

                        <div class=" row form-group">
                            <div class="col-sm-12 col-md-12">
                                <label class="checkbox control-label"><input id="useDefaultPhoto" type="checkbox" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Dùng hình mặc định – theo ý chủ nhà</label>
                            </div>
                        </div>

                        <div class="row form-group" style="display: none">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-buyNewHouse">Có nhu cầu mua nhà mới không</label>
                                <label class="radio control-label col-xs-4 col-sm-3 col-md-1">
                                    <input type="radio" name="buyNewHouse" id="buyNewHouse1" value="true" class="buyNewHouse">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> có
                                </label>
                                <label class="radio control-label col-xs-4 col-sm-3 col-md-2">
                                    <input type="radio" name="buyNewHouse" id="buyNewHouse2" value="false" class="buyNewHouse" checked="true">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> không
                                </label>
                            </div>
                        </div>

                        <div class="row form-group diyInfo-group">
                            <div class="col-md-12">
                                <label class="control-label col-sm-2">Hình ảnh cập nhật từ chủ nhà</label>
                                </label>
                                <div class="diyPhotos-group col-md-10">
                                    <div id="diyPhotos-wrapper"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Link virtual tour</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <div style="border: 1px solid #ccc">
                                        <input id="virtualTouring" type="text" style="width: 80%; float:left; border:none" class="form-control" />
                                        <div style="float:right; text-align:right; width: 19%;">
                                            <button type="button" style="margin:2px 2px 0px 0px;" class="btn btn-sm btn-disabled" disabled id="virtual-touring-preview">Xem thử</button>
                                        </div>
                                        <div style="clear:both"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- BEGIN UPLOAD IMAGE -->
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="control-label col-sm-2 label-photo">Hình ảnh nhà</label>
                                <div class="photos-group col-md-10">
                                    <div id="photos-wrapper"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="control-label col-sm-2">Hình ảnh 360 <a href="/360.pdf" target="_blank"><small>(Hướng dẫn sử dụng)</small></a></label>
                                <div class="photos-group col-md-10">
                                    <div id="photos-360"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="control-label col-sm-2 label-photoGcn">Hình ảnh GCN</label>
                                <div class="photoGcns-group col-md-10">
                                    <div id="photoGcns-wrapper"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-title">Tiêu đề</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <input id="title" type="text" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2 label-description">Mô tả</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <textarea id="description" type="text" rows="5" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Ghi Chú Data</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <textarea id="noteData" class="form-control" rows="5" disabled="disabled"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group" style="margin-bottom: 40px;">
                            <div class="col-sm-12">
                                <label class="control-label col-xs-12 col-sm-2 col-md-2">Ghi Chú</label>
                                <div class="col-xs-12 col-sm-10 col-md-10">
                                    <textarea id="noteForLs" class="form-control" rows="5">
                              </textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row form-group btn-group-fixed btn-group-fixed-pre">
                            <div class="col-sm-12 no-print btn-group-action">
                                <button id="send-pre-btn" class="btn btn-success">
                                    <span class="glyphicon glyphicon-send" aria-hidden="true"></span> Chuyển
                                </button>
                                <button id="save-pre-btn" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span> Lưu
                                </button>
                                <button id="save-remind-pre-btn" class="btn btn-warning">
                                    <span class="glyphicon glyphicon-time" aria-hidden="true"></span> Lưu & Nhắc nhở
                                </button>
                                <button id="cancel-pre-btn" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

@include('pos.prescreener.blocks.blc-create-reminder-model')
@include('pos.blocks.blc-show-note-reminder-model')
{{--@include('pos.blocks.blc-phone-list-add-model')--}}
@include('pos.blocks.blc-new-phone-list-model')
@include('shared.modal-create-agent')
@include('pos.blocks.imageEditor')
@include('pos.blocks.blc-new-bank-model')
@include('pos.sa.modals.virtual-touring-modal-preview')
<script>
    $('#virtual-touring-preview').click(function() {
        if ($('input#virtualTouring').val().trim().length === 0) {
            return;
        }

        if ($('input#virtualTouring').val().trim().length > 0 && !$('input#virtualTouring').val().startsWith('https://my.matterport.com/show/?m=')) {
            showPropzyAlert('<strong>Đường link của virtual tour không đúng.</strong> <br/><br/> Link virtual tour phải được tạo từ các plugin được hệ thống hỗ trợ (ví dụ: Matterport). <br/> Vui lòng nhập lại link đúng');
            return;
        }

        var iframe = $('<iframe id="preview-frame" src="' + $('input#virtualTouring').val() + '" style="border:none; min-width: 800px; min-height: 480px"></iframe>')
        $('#virtual-touring-modal-preview #preview-frame').html('').append(iframe);
        $('#virtual-touring-modal-preview').modal('show');
    });
    $('input#virtualTouring').change(function(e) {
        var viewMore = $('button#virtual-touring-preview');
        Window.jsDetailData.virtualTouringChecked = false;
        Window.JS_VIRTUAL_VALIDATE.isChecked = false;
        if ($(this).val().trim().length === 0) {
            viewMore.attr('disabled', true);
            viewMore.removeClass('btn-primary').addClass('disabled');
            return;
        }
        viewMore.attr('disabled', false);
        viewMore.removeClass('disabled').addClass('btn-primary');
    });
</script>
@endsection
@section('page-js')
{{-- <script type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>  --}}

<script src="{{ loadAsset("/js/pos/common/plugins/paging/table.hpaging.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/FileHelper.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
<script src="{{ loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{ loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("js/helper.js")}}"></script>
<script src="{{ loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/moment/moment.min.js")}}"></script>
<script src="{{ loadAsset("js/pos/common/common-pos.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/common-prescreener.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-360.js") }}"></script>
<script src="{{ loadAsset("/js/pos/common/images-pos-lib.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/PSPhoto.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/Reminder.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/create/CallForCreate.js") }}"></script>
<script src="{{ loadAsset("js/pos/common/AddNewStreet.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/Fields.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/create/ListingCreate.js") }}"></script>
<script src="{{ loadAsset("js/pos/prescreener/create/ListingCreateInit.js") }}"></script>

@stop
@section('page-css')
<link href="{{ loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/editor.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/dialog.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css" />
@stop