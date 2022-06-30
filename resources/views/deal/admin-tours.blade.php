@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Quản lý Tours</h3>
        </div>
        <div class="box-body">
            <table id="dataTableTours" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Deal ID</th>
                        <th>Tên TM</th>
                        <th>Tên/SĐT KH</th>
                        <th>Tour cần trợ giúp</th>
                        <th>Tour-Listing bị bỏ qua</th>
                        <th>Tour về trễ</th>
                        <th>Tour just ended</th>
                        <th>Tour đã solve</th>
                        <th>Tour bị cancel</th>
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


@include('deal.modal-solve-ping')


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
<script src="{{loadAsset("/js/deal/admin-tours.js")}}"></script>



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
