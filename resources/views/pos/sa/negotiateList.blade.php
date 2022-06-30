@extends('layout.default')
@section('content')
    <div class='dashboard'>
        <div class="row">
            <div class="col-md-12">
                <!-- Hidden -->
                <div class="box box-info">
                    <div class="box-body">
                        <div class="col-md-12">
                            <div class="row form-group">
                                <div class="col-md-3">
                                    <label>Từ ngày</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="input-group date" id="negotiation-filter-date-from">
                                                <input type="text" class="form-control date-range-from">
                                                <div class="input-group-addon">
                                                    <span class="glyphicon glyphicon-th"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label>Đến ngày</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="input-group date" id="negotiation-filter-date-to">
                                                <input type="text" class="form-control date-range-from">
                                                <div class="input-group-addon">
                                                    <span class="glyphicon glyphicon-th"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label>Id Listing</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="text" class="form-control" name="rlisting" id="negotiation-filter-rlistingId"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label>Trạng thái</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="negotiation-filter-status">
                                                <option value="1">Hoàn tât</option>
                                                <option value="2" selected>Đang thương lượng</option>
                                                <option value="3">Tạm dừng</option>
                                                <option value="4">Hủy</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="row form-group">
                                @if(!$currentUser->departments[0]->isGroupAdmin)
                                <div class="col-md-3">
                                    <label>Loại hình</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select id="listingTypeId" class="form-control"></select>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-3">
                                    <label>Loại BĐS</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select id="propertyTypeIds" class="form-control" multiple="multiple"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label>Việc cần làm</label>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <select class="form-control" id="negotiation-filter-has-task">
                                                <option value="0">Tất cả</option>
                                                <option value="1" selected>Chưa phản hồi</option>
                                                <option value="2">Đã phản hồi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 text-right" style="padding-top: 25px">
                                    <button type="button" class="btn btn-primary" id="negotiation-filter-btn-find">Tìm kiếm</button>
                                    <button type="button" class="btn btn-default" id="negotiation-filter-btn-clear">Xóa</button>
                                </div>
                                @else
                                    <div class="col-md-6 text-right">
                                        <button type="button" class="btn btn-primary" id="negotiation-filter-btn-find">Tìm kiếm</button>
                                        <button type="button" class="btn btn-default" id="negotiation-filter-btn-clear">Xóa</button>
                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row form-group">
                                <table id="tb-negotiation-manager" class="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Listing Id</th>
                                            <th>Chủ tin đăng</th>
                                            <th>Giá</th>
                                            <th>Giá thương lượng</th>
                                            <th>Ngày nhận</th>
                                            <th>Tên CRM</th>
                                            <th>Loại hình</th>
                                            <th>Nhóm BĐS</th>
                                            <th>Loại BĐS</th>
                                            <th>Trạng thái</th>
                                            <th>Lịch sử</th>

                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('pos.sa.blocks.negotiation-call-modal')
@endsection
@section('page-js')
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}" ></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/moment/moment.min.js")}} "></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/bootstrap-daterangepicker-master/daterangepicker.js")}} "></script>
    <script src="{{ loadAsset("/js/pos/sa/SANegotiateManager.js")}}"></script>
    <script src="{{ loadAsset("/plugins/priceFormat/autoNumeric.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>

@stop