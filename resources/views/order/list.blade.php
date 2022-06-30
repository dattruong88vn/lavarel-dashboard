<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Order</h3>
            <span class="pull-right">
                <a href="/order/get-list-data/" class="btn btn-danger status-filter">All</a>
                <a href="{{$data->countRespondedListing>0?"/order/get-list-data/3":"#"}}" data-status="3" class="btn btn-success status-filter">Response with listing ({{$data->countRespondedListing}} new)</a>
                <a href="{{$data->countRespondedContact>0?"/order/get-list-data/4":"#"}}" data-status="4" class="btn btn-warning status-filter">Respond with contact ({{$data->countRespondedContact}} new)</a>
                <button class="btn-export btn btn-warning hidden">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="order-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Connected lead/deal</th>
                        <th>Created Date</th>
                        <th>Last Activity On</th>
                        <th>Last Activity By</th>
                        <th>Received</th>
                        <th>Openned</th>
                        <th>Response with listing</th>
                        <th>Response with contact</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</section>

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript" src="{{loadAsset("/js/order/list.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop