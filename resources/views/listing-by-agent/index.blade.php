@extends('layout.default')
@section('content')
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Agent</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="txtBrokerName" placeholder="Tên môi giới">
                </div>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="txtPhone" placeholder="Số điện thoại">
                </div>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="txtEmail" placeholder="Email">
                </div>
                <div class="col-sm-3">
                    <select id="selectStatus" name="status-id" class="form-control"></select>
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
            <table id="tableListingByAgent" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Tên môi giới</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Số lượng tin đăng</th>
                        <th>Ngày tham gia</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</section>
<div id="modalListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Danh sách Listing</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="current-agent-id" value="" />
                <table class="table table-bordered dataTableListings">
                    <thead>
                        <tr>                        
                            <th>ID</th>
                            <th>Địa chỉ</th>
                            <th>Giá</th>
                            <th>Quận</th>
                            <th>Hoa hồng</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">Đóng</button>
            </div>
        </div>
    </div>
</div>
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
<script type="text/javascript" src="{{loadAsset('/js/listing-by-agent/index.js')}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop