<?php use App\Libraries\PropzyCommons ?>

@extends('layout.default')

@section('content')
<section style="padding-bottom:790px">
    <div class="box box-primary">
	 	 <!-- <div class="box-header with-border">
            <a style="margin-left: 20px;" class="pull-right" target="_blank" href="/crm-dashboard/default-screen?date=thisMonth"><i class="fa fa-pie-chart"></i> Sale Funnel</a>
            <a style="margin-left: 20px;" class="pull-right" target="_blank" href="/crm-dashboard/sale-pipeline"><i class="fa fa-bar-chart"></i> Sale Pipeline</a>
            <span class="pull-right">
                <?php if ($myUserId == 12 || $isCurrentAdmin): ?>
                     <input type="text" class="fromDate form-control" style="display: inline-block;width: 150px;" placeholder="Từ ngày" />
                    <input type="text" class="toDate form-control" style="display: inline-block;width: 150px;" placeholder="Đến ngày" />
                    <select name="assignes" class="assignedTos form-control" style="display: inline-block;width: 150px;" id="assignes"></select>
                    <button id="btn_filter_button_deal" class="btn btn-primary"><i class="fa fa-filter" aria-hidden="true"></i></button>
                    <button class="btn-export btn btn-warning">Export to xlsx/csv</button> 
                <?php endif; ?>
            </span>
        </div>  -->
        <div class="box-body">
            <div id="spa-main"></div>
            <div style="text-align: center;margin-bottom: 10px;" class="form-inline"></div>
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
        </div>
    </div>
    <div id="overlay"></div>
</section>
@endsection

@section('page-js')
<script src="{{loadAsset('/plugins/chartjs/Chart.min.js')}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset('/plugins/daterangepicker/daterangepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/dataTables.bootstrap.min.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/fnSetFilteringDelay.js')}}"></script>
<script src="{{loadAsset('/js/dashboard.js')}}"></script>
<script src="{{loadAsset('/plugins/select2/select2.full.min.js')}}"></script>
<script src="{{loadAsset('/dist/js/jquery.magnific-popup.min.js')}}"></script>
<script src="{{loadAsset('/plugins/jquery-dateformat/jquery-dateFormat.js')}}"></script>
<script type="text/javascript">
	var isGroupAdmin = "{{$isGroupAdmin}}";
</script>
<script src="{{loadAsset('/js/crm-manager/reassign-deals.js')}}"></script>
<script src="{{loadAsset('/js/ba-dashboard/common-split-matrix.js')}}"></script>
<script src="{{loadAsset('/js/ba-dashboard/deal-function-split-matrix.js')}}"></script>
<script src="{{loadAsset('/js/ba-dashboard/index.js')}}"></script>
<script src="{{ loadAsset('/js/commons/common.js')}}"></script>
<script src="{{loadAsset('/js/deal/list.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        DealFunctions.initSelectListingTypes();
        DealFunctions.initSelectCardTypes();
    })
</script>

<noscript>You need to enable JavaScript to run this app.</noscript>
<script src="{{loadAsset('/app/spa/static/js/spa_index.js')}}"></script>
<script src="{{loadAsset('/app/spa/static/js/main.chunk.js')}}"></script>
<script src="{{loadAsset('/js/deal/util-for-deal.js')}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset('/app/spa/static/css/main.chunk.css')}}" rel="stylesheet">
<link href="{{loadAsset('/plugins/datepicker/datepicker3.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/daterangepicker/daterangepicker-bs3.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/datatables/dataTables.bootstrap.css')}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/css/deal/list.css')}}" rel="stylesheet">

@stop