<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <div class="row">
                <div class="col-sm-3">
                    <button class="btn btn-success btn-from-begining active btn-filter">From begining</button>
                    <button class="btn btn-success btn-from-to btn-filter">From to</button>
                </div>
                <div class="datepickers col-sm-9">
                    <input type="text" class="fromDate datepicker" placeholder="Từ ngày" />
                    <input type="text" class="toDate datepicker" placeholder="Đến ngày" />
                </div>
            </div>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
        </div>
    </div>
</section>
<div id="main-content">

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
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script type="text/javascript">
var specialViewIds = <?php echo json_encode($specialViewIds); ?>;
var isCrm = <?php echo $isCrm ? "true" : "false"; ?>;
</script>
<script src="{{loadAsset("/js/tour/report.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop