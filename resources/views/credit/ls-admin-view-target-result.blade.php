<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="view-tieu-chuan">

    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
    <div class="row">
        <div class="col-md-12">
            <div id="sectionSelectDate" class="row" style="margin-bottom: 32px;">
                <div class="col-sm-4">
                    <input type="text" id="fromDate" class="form-control" placeholder="Chọn tháng" />
                </div>
            </div>
        </div>
    </div>   

    <section id="sectionResult">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Chỉ tiêu</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <table class="table table-bordered table-striped" id="scoreTable">
                                <thead>
                                    <tr>
                                        <th>Tên LS</th>
                                        <th>Điểm số</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<!--<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>-->


<!-- FLOT CHARTS -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.min.js")}}"></script>
<!-- FLOT RESIZE PLUGIN - allows the chart to redraw when the window is resized -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.resize.min.js")}}"></script>
<!-- FLOT PIE PLUGIN - also used to draw donut charts -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.pie.min.js")}}"></script>
<!-- FLOT CATEGORIES PLUGIN - Used to draw bar charts -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.categories.min.js")}}"></script>
<!-- Page script -->
<script>
</script>

<script src="{{loadAsset("/js/credit/ls-admin-view-target-result.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
<style>
    .ui-datepicker-month, .ui-datepicker-year{
        color:#333;
    }
    </style>

@stop