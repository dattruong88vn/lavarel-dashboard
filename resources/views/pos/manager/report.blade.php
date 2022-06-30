@extends('layout.default')
@section('content')
<div id="bingo" class="bingo">
    <div class="box box-info">
        <div class="box-body">
            <div class="form-horizontal">
                @if ($currentUser->departments[0]->isGroupAdmin == true)
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="report-manager-type" class="control-label label-lg">Bộ phận</label>
                                <select id="report-manager-type" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="date-range-fast" class="control-label label-lg">Chọn ngày nhanh</label>
                                <select id="date-range-fast" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label class="control-label label-lg">Từ thời gian</label>
                                <div class="input-group date-range date">
                                    <input type="text" class="form-control date-range-from">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label class="control-label label-lg">Đến thời gian</label>
                                <div class="input-group date-range date">
                                    <input type="text" class="form-control date-range-to">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="ownerType" class="control-label label-lg">Chủ tin đăng</label>
                                <select id="ownerType" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="listingTypeId" class="control-label label-lg">Loại giao dịch</label>
                                <select id="listingTypeId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="propertyTypeId" class="control-label label-lg">Loại BĐS</label>
                                <select id="propertyTypeId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="position" class="control-label label-lg">Vị trí</label>
                                <select id="position" class="form-control">
                                    <option value="-1">--Chọn vị trí--</option>
                                    <option value="1">Mặt tiền</option>
                                    <option value="2">Hẻm</option>
                                </select>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-3">
                                <label class="control-label label-lg">Khung giá</label>
                                <span id="price-span" class="price-box">-- Vui lòng chọn giá --</span>
                                <input id="price" type="hidden" value="-"></input>
                            </div>
                            <div class="col-md-3">
                                <label for="sourceIds" class="control-label label-lg">Nguồn tin đăng</label>
                                <select id="sourceIds" class="form-control" multiple="multiple"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="tcId" class="control-label label-lg">Trung tâm giao dịch</label>
                                <select id="tcId" class="form-control" multiple="multiple"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="infoChannel" class="control-label label-lg">Kênh thông tin</label>
                                <select id="infoChannel" class="form-control" multiple="multiple"></select>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="infoChannelChild" class="control-label label-lg">Nguồn phụ thông tin</label>
                                <select id="infoChannelChild" class="form-control" multiple="multiple"></select>
                            </div>
                            <div class="col-md-3 sa-block-wrapper">
                                <label for="liveType" class="control-label label-lg">Loại tin đăng</label>
                                <select id="liveType" class="form-control"></select>
                            </div>
                            <div class="col-md-3 sa-block-wrapper">
                                <label for="userId" class="control-label label-lg">SA phụ trách</label>
                                <select id="userId" class="form-control"></select>
                            </div>
                            <div class="col-md-3 sa-block-wrapper">
                                <label for="statusId" class="control-label label-lg">Trạng thái SA</label>
                                <select id="statusId" class="form-control"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 pre-block-wrapper">
                                <label for="userPreId" class="control-label label-lg">Pre phụ trách</label>
                                <select id="userPreId" class="form-control"></select>
                            </div>
                            <div class="col-md-3 pre-block-wrapper">
                                <label for="statusPreId" class="control-label label-lg">Trạng thái Pre</label>
                                <select id="statusPreId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="districtIds" class="control-label label-lg">Quận</label>
                                <select id="districtIds" class="form-control" multiple="multiple"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="updateStatus" class="control-label label-lg"></label>
                                <label class="checkbox control-label" style="padding-left: 0">
                                    <input id="updateStatus" type="checkbox" value="0">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Ngày chỉnh sửa
                                </label>
                            </div>
                            <div class="col-md-3 sa-block-wrapper all-block-wrapper">
                                <label for="diyBonus" class="control-label label-lg"></label>
                                <label class="checkbox control-label" style="padding-left: 0">
                                    <input id="diyBonus" type="checkbox" value="0">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có tương tác DIY
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                @else
                <div class="form-group">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="date-range-fast" class="control-label label-lg">Chọn ngày nhanh</label>
                                <select id="date-range-fast" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label class="control-label label-lg">Từ thời gian</label>
                                <div class="input-group date-range date">
                                    <input type="text" class="form-control date-range-from">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label class="control-label label-lg">Đến thời gian</label>
                                <div class="input-group date-range date">
                                    <input type="text" class="form-control date-range-to">
                                    <div class="input-group-addon">
                                        <span class="glyphicon glyphicon-th"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label for="ownerType" class="control-label label-lg">Chủ tin đăng</label>
                                <select id="ownerType" class="form-control"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="listingTypeId" class="control-label label-lg">Loại giao dịch</label>
                                <select id="listingTypeId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="propertyTypeId" class="control-label label-lg">Loại BĐS</label>
                                <select id="propertyTypeId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="position" class="control-label label-lg">Vị trí</label>
                                <select id="position" class="form-control">
                                    <option value="-1">--Chọn vị trí--</option>
                                    <option value="1">Mặt tiền</option>
                                    <option value="2">Hẻm</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label class="control-label label-lg">Khung giá</label>
                                <span id="price-span"  class="price-box">---vui lòng chọn giá---</span>
                                <input id="price" type="hidden" value="-"></input>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3 sa-block-wrapper">
                                <label for="liveType" class="control-label label-lg">Loại tin đăng</label>
                                <select id="liveType" class="form-control"></select>
                            </div>
                            <div class="col-md-3 sa-block-wrapper">
                                <label for="statusId" class="control-label label-lg">Trạng thái SA</label>
                                <select id="statusId" class="form-control"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="districtIds" class="control-label label-lg">Quận</label>
                                <select id="districtIds" class="form-control" multiple="multiple"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="sourceIds" class="control-label label-lg">Nguồn tin đăng</label>
                                <select id="sourceIds" class="form-control" multiple="multiple"></select>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="tcId" class="control-label label-lg">Trung tâm giao dịch</label>
                                <select id="tcId" class="form-control" multiple="multiple"></select>
                            </div>
                            <div class="col-md-3">
                                <label for="infoChannel" class="control-label label-lg">Kênh thông tin</label>
                                <select id="infoChannel" class="form-control" multiple="multiple"></select>
                            </div>

                            <div class="col-md-3">
                                <label for="infoChannelChild" class="control-label label-lg">Nguồn phụ thông tin</label>
                                <select id="infoChannelChild" class="form-control" multiple="multiple"></select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="updateStatus" class="control-label label-lg"></label>
                                <label class="checkbox control-label" style="padding-left: 0">
                                    <input id="updateStatus" type="checkbox" value="0">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Ngày chỉnh sửa
                                </label>
                            </div>
                            <div class="col-md-3 sa-block-wrapper all-block-wrapper">
                                <label for="diyBonus" class="control-label label-lg"></label>
                                <label class="checkbox control-label" style="padding-left: 0">
                                    <input id="diyBonus" type="checkbox" value="0">
                                    <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Có tương tác DIY
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                @endif
                <div class="form-group" id="filter-report-wrapper">
                    <div class="col-md-12">
                        <div class="row">

                            <div class="row">
                                <div class="col-md3 text-right">
                                    <a href="javascript:void(0)" class="btn btn-primary btn-action-filter" id="btn-filter">Lọc dữ liệu</a>
                                    <a href="javascript:void(0)" class="btn btn-default btn-action-filter" id="btn-clear-filter">Xóa</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="box box-info">
        <div class="box-body">
            <div class="form-horizontal form-group">
                <div id="zone-filter-option-list" class="row">
                    <div class="col-md-12 text-right">
                        <button id="get-special-export" type="button" class="btn btn-success btn-sm btn-flat">Report độc quyền</button>
                        <button id="get-export" type="button" class="btn bg-orange btn-sm btn-flat">Xuất file</button>
                        <button id="tb-show-detail" type="button" class="btn btn-primary btn-sm btn-flat"><i class="fa fa-plus-circle"></i> hiển thị</button>
                        <button id="tb-hide-detail" type="button" class="btn btn-danger btn-sm btn-flat"><i class="fa fa-minus-circle"></i> ẩn</button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class=" col-md-12">
                    <table class="table table-hover table-bordered" id="tb-manager-report" style="width: 100%">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Id</th>
                                <th>Chủ tin đăng</th>
                                <th>Ngày cập nhật Listing</th>
                                <th>Sđt</th>
                                <th>Giá</th>
                                <th>SA</th>
                                <th>Quận</th>
                                <th>Nguồn</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var isAdmin = {{$currentUser->departments[0]->isGroupAdmin ? 1 : 0}}
    var userId = {{$currentUser->userId}}
</script>
@endsection
@section('page-js')
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/plugins/moment/moment.min.js")}} "></script>
<script src="{{ loadAsset("/js/pos/common/plugins/bootstrap-daterangepicker-master/daterangepicker.js")}} "></script>
<script src="{{ loadAsset("/js/pos/common/common-pos.js")}}"></script>
<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
<script src="{{ loadAsset("/js/pos/manager/report.js")}}"></script>
@stop
@section('page-css')
<link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    .price-box{
        border: 1px solid #ccc;
        padding: 7px;
        display: block;
        cursor: pointer;
    }
    ul.price-box-ul{
        margin: 0px;
        padding: 0px;
    }
    li.pop-price-select:hover{
        background: #efefef;
    }
    li.pop-price-select{
        list-style: none;
        display: block;
        padding: 7px;
        border-top: 1px solid #ccc;
        cursor: pointer;
        margin: 0px;
    }
    .btn-action-filter {
        margin-top: 25px;
        min-width: 100px;
    }

    td.get-row-detail {
        padding: 0 !important;
    }

    td.control-detail {
        text-align: center;
        font-size: 17px;
    }
</style>
@stop
