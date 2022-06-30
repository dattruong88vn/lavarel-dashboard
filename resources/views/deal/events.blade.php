@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section>
        <div>
            @include('deal.header-nav')
        </div>
    </section>
    <section class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">SỰ KIỆN</h3>
        </div>
        <div class="box-body">
            <table id="dataTableEvents" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Loại sự kiện</th>
                        <th>Thời gian</th>
                        <th>Ngày tạo</th>
                        <th>Người tạo</th>
                        <th>Người tham gia khác</th>
                        <th>Nội dung</th>
                        <th>Ghi chú khác</th>
                        <th>Địa điểm</th>
                    </tr>
                    <tr class="row-filter">
                        <td>
                            <select class="form-control type TypeName" style="width:80px">
                                <option value="">All</option>
                                <?php foreach ($types as $type): ?>
                                    <option value="{{$type->key}}">{{$type->value}}</option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                        <th></th>
                        <th></th>
                        <td>
                            <select class="form-control Creater" multiple="multiple" style="width:106px">
                                <option value="">All</option>
                                <?php foreach ($authors as $author): ?>
                                    <option value="{{$author->key}}">{{$author->value}}</option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                        <td>
                            <select class="form-control Participant" multiple="multiple" style="width:106px">
                                <option value="">All</option>
                                <?php
                                foreach ($participants as $participant):
                                    if (empty($participant->key)) {
                                        continue;
                                    }
                                    ?>
                                    <option value="{{$participant->key}}">{{$participant->value}}</option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                        <th></th>
                        <th></th>
                        <th></th>
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
var dealId = "{{$deal->dealId}}";
var leadId = "{{$deal->leadId}}";
var orderId = "{{$deal->orderId}}";
var isBroadcast = false;
var level = 2;
var firstRun = true;
</script>
<script src="{{loadAsset("/js/deal/events.js")}}"></script>



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
