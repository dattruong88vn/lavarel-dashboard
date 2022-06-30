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
    <div class="lead-order">
        <?php if (count($order)): ?>
            <section class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">ORDER</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <p><span class="span-width">Số người phản hồi - contact mới (chưa đọc):</span> <a href="#" class="show-response label bg-yellow" data-load="0" data-type="1">{{$order->countRespondedContactNotRead}}</a></p>
                            <p><span class="span-width">Số người phản hồi - listing mới (chưa đọc):</span> <a href="#" class="show-response label bg-yellow" data-load="0" data-type="0">{{$order->countRespondedListingNotRead}}</a></p>
                            <p>Đã gửi cho {{$order->countSend}} người</p>
                            <p>Ngày tạo: {{date('d/m/Y H:i:s', $order->createdDate/1000)}}</p>
                            <p></p>
                        </div>
                        <div class="col-sm-6">
                            <p><span class="span-width">Tổng số người phản hồi - contact:</span> <a href="#" class="show-response label bg-green" data-load="1" data-type="1">{{$order->countRespondedContact}}</a></p>
                            <p><span class="span-width">Tổng số người phản hồi - listing:</span> <a href="#" class="show-response label bg-green" data-load="1" data-type="0">{{$order->countRespondedListing}}</a></p>
                            <p>Số người mở: {{$order->countOpen}}</p>
                            <p>Tương tác lần cuối lúc: <b>{{date('d/m/Y H:i:s', $order->lastActivityDate/1000)}}</b> bởi <b>{{$order->lastActivityName}}</b></p>
                        </div>
                        <div class="col-sm-12">Nội dung order:</div>
                        <div class="col-sm-12">{{!empty($order->note)?$order->note:""}}</div>
                    </div>
                </div>
            </section>
            <section class="box box-primary">
                <div class="box-body">
                    <div class="col-sm-6">
                        <table id="dataTableRespondedListing" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Ngày tạo</th>
                                    <th>Tạo bởi</th>
                                    <th>Trạng thái listing</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div class="col-sm-6">
                        <table id="dataTableRespondedContact" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Ngày tạo</th>
                                    <th>Tạo bởi</th>
                                    <th>Trạng thái contact</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </section>
        <?php else: ?> 
            <section class="box box-primary">
                <div class="box-body">
                    <h2>Chưa có order</h2>
                </div>
            </section>

        <?php endif; ?>
    </div>
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
var isBroadcast = false;
var level = 2;
var firstRun = true;
</script>
<script src="{{loadAsset("/js/lead/order-detail.js")}}"></script>



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
