@extends('layout.default')
@section('content')
    <div class='dashboard'>
        <div class="row">
            <div class="col-md-12">
                <!-- Hidden -->
                <div class="box box-info">
                    <div class="box-body">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="row form-group">
                                    <div class="col-md-3">
                                        <label for="price" class="control-label label-lg">Từ Ngày</label>
                                        <div class="input-group date-range date">
                                            <input type="text" class="form-control date-range-from">
                                            <div class="input-group-addon">
                                                <span class="glyphicon glyphicon-th"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="price" class="control-label label-lg">Đến Ngày</label>
                                        <div class="input-group date-range date">
                                            <input type="text" class="form-control date-range-to">
                                            <div class="input-group-addon">
                                                <span class="glyphicon glyphicon-th"></span>
                                            </div>
                                        </div>
                                    </div>
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

                                </div>
                                <div class="row form-group">
                                    <div class="col-md-3">

                                        <label for="price" class="control-label label-lg">Task Id</label>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <input type="text" class="form-control taskId">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-9" style="text-align: right; padding-top: 25px">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <button type="button" class="btn btn-primary" id="btn-filter"> Tìm Kiếm</button>
                                                <button type="button" class="btn btn-default" id="btn-clear"> Xóa</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div id="deposit-support-count-task-overview"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box box-info">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-xs-12">

                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs">
                                        <li class="active">
                                            <a id="nav-deposit-support" href="#content-deposit-support"
                                               data-toggle="tab" aria-expanded="true">Danh sách hỗ trợ đặc cọc</a>
                                        </li>
                                        <li class="">
                                            <a id="nav-deposit-cancel" href="#content-deposit-cancel"
                                               data-toggle="tab" aria-expanded="false">Danh sách hủy đặc cọc</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="content-deposit-support">
                                            <table id="tb-deposit-support-manager"
                                                   class="table table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Listing Id</th>
                                                    <th>Task Id</th>
                                                    <th>Deposit Id</th>
                                                    <th>Chủ tin đăng</th>
                                                    <th>Loại hình</th>
                                                    <th>Nhóm BĐS</th>
                                                    <th>Loại BĐS</th>
                                                    <th>Giá đặt cọc</th>
                                                    <th>Thời gian</th>
                                                    <th>Địa điểm</th>
                                                    <th>Ghi chú</th>
                                                    <th class="text-center"></th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <!-- /.tab-pane -->
                                        <div class="tab-pane" id="content-deposit-cancel">
                                            <table id="tb-deposit-cancel-manager"
                                                   class="table table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Listing Id</th>
                                                    <th>Task Id</th>
                                                    <th>Deposit Id</th>
                                                    <th>Chủ tin đăng</th>
                                                    <th>Loại hình</th>
                                                    <th>Nhóm BĐS</th>
                                                    <th>Loại BĐS</th>
                                                    <th>Giá đặt cọc</th>
                                                    <th>Ghi chú</th>
                                                    <th class="text-center"></th>
                                                </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <!-- /.tab-pane -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('pos.sa.blocks.deposit-support-modal')
@endsection
@section('page-js')
    @include('pos.blocks.common-script-page')
    <script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/sa/SADepositSupportManager.js")}}"></script>

@stop
@section('page-css')
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop