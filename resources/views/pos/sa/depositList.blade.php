@extends('layout.default')
@section('content')
    <div class='dashboard'>
        <div class="row">
            <div class="col-md-12">
                <!-- Hidden -->
                <div class="box box-info">
                    <div class="box-body">
                        <div class="row form-group">
                            <div class="col-md-3">
                                <label>Từ ngày</label>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group date" id="deposit-filter-date-from">
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
                                        <div class="input-group date" id="deposit-filter-date-to">
                                            <input type="text" class="form-control date-range-to">
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
                                        <input type="text" class="form-control" name="rlisting" id="deposit-filter-rlistingId"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label>Trạng thái</label>
                                <div class="row">
                                    <div class="col-md-12">
                                        <select class="form-control" id="deposit-filter-status">
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
                                            <select class="form-control" id="deposit-filter-has-task">
                                                <option value="0">Tất cả</option>
                                                <option value="1" selected>Chưa phản hồi</option>
                                                <option value="2">Đã phản hồi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 text-right" style="padding-top: 25px">
                                    <button type="button" class="btn btn-primary" id="deposit-filter-btn-find">Tìm kiếm</button>
                                    <button type="button" class="btn btn-default" id="deposit-filter-btn-clear">Xóa</button>
                                </div>
                            @else
                                <div class="col-md-6 text-right">
                                    <button type="button" class="btn btn-primary" id="deposit-filter-btn-find">Tìm kiếm</button>
                                    <button type="button" class="btn btn-default" id="deposit-filter-btn-clear">Xóa</button>
                                </div>
                            @endif

                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <table id="tb-deposit-manager" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Listing Id</th>
                                        <th>Giá</th>
                                        <th>Chủ tin đăng</th>
                                        <th>Ngày nhận vào</th>
                                        <th>Deal Id</th>
                                        <th>Tên CRM</th>
                                        <th>Tiền đặt cọc</th>
                                        <th>Ngày đặt cọc</th>
                                        <th>Địa điểm đặt cọc</th>
                                        <th>Loại hình</th>
                                        <th>Nhóm BĐS</th>
                                        <th>Loại BĐS</th>
                                        <th>Ghi chú</th>
                                        <th>Trạng thái</th>

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
    @include('pos.sa.blocks.deposit-call-modal')
@endsection
@section('page-js')
    <script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}" ></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/moment/moment.min.js")}} "></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/bootstrap-daterangepicker-master/daterangepicker.js")}} "></script>
    <script src="{{ loadAsset("/js/pos/sa/SADepositManager.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
@stop