<?php
/**
 * Created by PhpStorm.
 * User: hooaluu
 * Date: 5/27/2019
 * Time: 1:23 PM
 */
?>
@extends('layout.default')
@section('content')
    <div class="profile-seo">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="slug">Đường dẫn</label>
                                            <span style="color: crimson;
                                                        background-color: #f1f1f1;
                                                        padding-left: 4px;
                                                        padding-right: 4px;">Cấu trúc <b>ĐÚNG</b>: /{loại-hình-giao-dịch}/{loại-hình-BĐS}/{thành-phố}</span>
                                        </div>
                                        <div class="col-md-12">
                                            <input class="form-control" type="text" id="slug" placeholder="Nhập đường dẫn" value="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="cityId">Thành Phố</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="cityId"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="districtIds">Quận/Huyện</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="districtIds"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="wardIds">Phường</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="wardIds"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="listingTypeId">Loại giao dịch</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="listingTypeId"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="realEstateGroupIds">Nhóm BĐS</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="realEstateGroupIds" ></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="propertyTypeIds">Loại hình BĐS</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select class="form-control" id="propertyTypeIds" ></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="onlyCity">&nbsp;</label>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="checkbox ">
                                                <input name="onlyCity" type="checkbox" id="onlyCity">
                                                <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Dành cho TP
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="onlyDistrict">&nbsp;</label>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="checkbox ">
                                                <input name="onlyDistrict" type="checkbox" id="onlyDistrict">
                                                <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>  Dành cho quận
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="minPrice">Giá</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="minPrice" id="minPrice" class="form-control"  placeholder="Giá thấp nhất..">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="maxPrice">&nbsp;</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="maxPrice" id="maxPrice" class="form-control"  placeholder="Giá cao nhất..">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="minSize">Diện tích</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="minSize" id="minSize" class="form-control"  placeholder="Diện tích nhỏ nhất..">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="maxSize">&nbsp;</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="maxSize" id="maxSize" class="form-control"  placeholder="Diện tích lớn nhất..">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="bedRooms">Phòng ngủ</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="bedRooms" id="bedRooms" class="form-control"  placeholder="Phòng ngủ">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="bathRooms">Phòng tắm</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="bathRooms" id="bathRooms" class="form-control"  placeholder="Phòng tắm">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="numberFloors">Số tầng</label>
                                        </div>
                                        <div class="col-md-12">
                                            <input type="text" name="numberFloors" id="numberFloors" class="form-control" placeholder="Số tầng">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="directionId">Hướng</label>
                                        </div>
                                        <div class="col-md-12">
                                            <select id="directionId" name="directionId" class="form-control"></select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="title">Tiêu đề</label>
                                        </div>
                                        <div class="col-md-12">
                                            <textarea class="form-control" id="title" name="title" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="description">Mô tả</label>
                                        </div>
                                        <div class="col-md-12">
                                            <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="content">Nội dung</label>
                                        </div>
                                        <div class="col-md-12">
                                            <textarea class="form-control" id="content" name="content" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="h1">H1</label>
                                        </div>
                                        <div class="col-md-12">
                                            <textarea class="form-control" name="h1" id="h1"  rows="3" placeholder="H1 ..." ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="control-label" for="h2">H2</label>
                                        </div>
                                        <div class="col-md-12">
                                            <textarea class="form-control" name="h2" id="h2"  rows="3" placeholder="H2 ..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-12 text-right">
                                    <button id="finish" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-save" aria-hidden="true"></span> {{ $pageType == 'EDIT' ? "Cập nhật" : "Tạo" }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('page-js')
    <script src="{{ loadAsset("/js/pos/common/plugins/ckeditor/ckeditor.js")}}"></script>
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script type="text/javascript">
        const _PAGE_TYPE = '{{$pageType}}';
        const _SEO_DETAIL = {!! $seoDetail !!};
    </script>
    <script src="{{loadAsset("/js/seo/create-edit.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/editor.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/ckeditor/skins/office2013/dialog.css")}}" rel="stylesheet" type="text/css"/>
@stop
