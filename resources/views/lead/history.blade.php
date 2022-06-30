@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section>
        <div>
            @include('lead.header-nav')
        </div>
    </section>
    <section class="box box-primary">
        <?php
        $buttons = array(
            0 => 'Tất cả',
            1 => 'Lead',
            2 => 'Order',
            3 => 'Sự kiện',
            4 => 'Chat',
            5 => 'Sản phẩm',
            6 => 'Deal'
        );
        ?>
        <div class="box-header with-border">
            <h3 class="box-title">LỊCH SỬ</h3>
        </div>
        <div class="box-body">
            <div class="filters text-center margin">
                <?php foreach ($buttons as $key => $value): ?>
                    <button class="btn btn-success btn-filter filter-{{$key}}" data-value="{{$key}}">{{$value}}</button>
                <?php endforeach; ?>
            </div>
            <br>
            <table id="dataTableHistory" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Thể loại</th>
                        <th>Thời gian</th>
                        <th>Tiêu đề / Ghi chú</th>
                        <th>Content</th>
                        <th>Người phụ trách</th>
                        <th>Người tham gia</th>
                    </tr>                    
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </section>
</div>

@endsection


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
<script type="text/javascript">
var leadId = "{{$lead->leadId}}";
var orderId = "{{$lead->orderId}}";
var isBroadcast = false;
var level = 2;
var firstRun = true;
</script>
<script src="{{loadAsset("/js/lead/history.js")}}"></script>



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
</style>
@stop
