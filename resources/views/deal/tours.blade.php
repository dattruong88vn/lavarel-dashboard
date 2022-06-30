@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour có thể trễ</h3>
            <button id="exportTours" class="btn-export btn btn-sm btn-warning">Export to xlsx/csv</button>
        </div>
        <div class="box-body">
            <table id="dataTableTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                        <th>Giờ xem tour</th>
                        <th>Tên & SĐT Chủ Nhà</th>
                        <th>Giải quyết xong</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour đang đi có thể trễ</h3>
            <button id="exportLateTours" class="btn-export btn btn-sm btn-warning">Export to xlsx/csv</button>
        </div>
        <div class="box-body">
            <table id="dataTableLateTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                        <th>Đang đi từ - đến</th>
                        <th>Tên & SĐT Chủ Nhà</th>
                        <th>Thời gian có mặt (dự đoán)</th>
                        <th>Giải quyết xong</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour bị hủy</h3>
            <button id="exportCancelTours" class="btn-export btn btn-sm btn-warning">Export to xlsx/csv</button>
        </div>
        <div class="box-body">
            <table id="dataTableCancelTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                        <th>Hủy tại</th>
                        <th>Giải quyết xong</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour sai location</h3>
            <button id="exportWrongLocationTours" class="btn-export btn btn-sm btn-warning">Export to xlsx/csv</button>
        </div>
        <div class="box-body">
            <table id="dataTableWrongLocationTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                        <th>Địa chỉ tin đăng</th>
                        <th>Địa chỉ thực</th>
                        <th>Giải quyết xong</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour đang đi trong ngày</h3>
        </div>
        <div class="box-body">
            <table id="dataTableGoingTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                        <th>Lộ trình</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                        <td></td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Tour đã kết thúc trong ngày</h3>
        </div>
        <div class="box-body">
            <table id="dataTableEndTours" class="table table-bordered">
                <thead>
                    <tr>                        
                        <th>Giờ kết thúc</th>
                        <th>Tên & SĐT KH</th>
                        <th>Tên & SĐT CS</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input type="text" class="csName">
                        </td>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div style="padding: 16px;visibility: hidden">
                <button type="button" class="btn btn-warning">Ping your manager</button>
            </div>
        </div>
    </section>

</div>
@endsection

@include('deal.modal-end-tour')

@include('deal.modal-ping-manager')
@include('deal.modal-feedback')


@extends('templates.amenities-item')
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/deal/tours.js")}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style>
    .errors{
        color:#f00;
    }
    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
    }
    #image-slider{
        z-index:999999999;
    }
    #makeScheduleModal{
        padding-right: 0px !important;
    }
    #makeScheduleModal .modal-dialog{
        width: 100% !important;
        margin:0 auto;
    }

    .ui-autocomplete{
        z-index: 1000000;
        background: #fff;
    }
    .tableAgents_wrapper{
        position: absolute;
        z-index: 100000;
        background: #fff;
        width: 100%;
        box-shadow: 2px 2px 2px 2px #aaa;
        padding:6px;
    }
</style>
@stop
