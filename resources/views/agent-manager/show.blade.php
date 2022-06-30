@extends('layout.default')

@section('content')
    <?php $csrf_token = csrf_token(); ?>
    <div class="row" id="agent-show">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header">
                    <h2> Quản Lý Agents <span id="number-of-agents">0</span></h2>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <button class="btn btn-sm btn-primary select-status" data-status="0">Tất cả</button>
                                <button class="btn btn-sm btn-success select-status" data-status="7">Chính Thức (<span>0</span>)</button>
                                <button class="btn btn-sm btn-warning select-status" data-status="1">Chưa chính thức (<span>0</span>)</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                               <input type="text" placeholder="Tên, SĐT, Email" class="form-control" id="search-key">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <table id="tb-agent-list" class="table table-hover table-bordered" width="100%">
                                    <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Số ĐT</th>
                                        <th>Email</th>
                                        <th>Số listing (Live)</th>
                                        <th>Số deal</th>
                                        <th>Trạng  thái</th>
                                        <th>Ngày duyệt</th>
                                        <th>Ngày tạo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="display: none">
                        <div class="col-md-12">
                            <div class="form-group text-right">
                                <button class="btn-export btn btn-success" data-status-id="7">Export Approved</button>
                                <button class="btn-export btn btn-danger" data-status-id="8">Export Rejected</button>
                                <button class="btn-export btn btn-warning" data-status-id="9">Export Deactivated</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection


@section('page-js')
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{loadAsset("/js/agent-manager/show.js")}}"></script>

@stop
@section('page-css')
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop