@extends('layout.default')
@section('content')
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Lead/Deal By Agent</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <div class="row">
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="txtBrokerName" placeholder="Tên môi giới">
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="txtPhone" placeholder="Số điện thoại">
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="txtEmail" placeholder="Email">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col-sm-4">
                        <select id="selectStatusLead" name="lead-id" class="form-control" multiple="multiple"></select>
                    </div>
                    <div class="col-sm-4">
                        <select id="selectStatusDeal" name="deal-id" class="form-control" multiple="multiple"></select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="box box-primary">
        <div class="box-header with-border">
            <span class="pull-right">
                <button class="btnFilterData btn btn-success">Lọc dữ liệu</button>
                <button class="btnDelete btn btn-primary">Xóa</button>
                <button class="btnExport btn btn-danger">Xuất file excel</button>
            </span>
        </div>
        <div class="box-body">            
            <table id="tableLeadDealByAgent" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Deal ID</th>
                        <th>Lead ID</th>
                        <th>Tên môi giới</th>
                        <th>Tên TM</th>
                        <th>Tên BA</th>
                        <th>Trạng thái Lead</th>
                        <th>Trạng thái Deal</th>
                        <th>Ngày tạo</th>
                        <th>Hình thức GD</th>
                        <th>Loại BĐS</th>
                        <th>Giá</th>
                        <th>Nguồn</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</section>
@endsection
@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/lead-deal-by-agent/index.js')}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop