@extends('layout.default')

@section('content')
<div class="management-overview form-horizontal">
	<div class="box box-primary">
		<div class="box-header with-border">
            <h3 class="box-title">TỔNG QUAN</h3>
        </div>
        <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
        <div class="box-body">
        	<div class="bl-verify">
        		<div class="row">
                    <div class="col-sm-12">
                        <div class="form-group text-center">
                            <button target="#filter-month" class="btn btn-warning filter-by">Lọc theo Tháng</button>
                            <button target="#filter-quarter" class="btn btn-success filter-by">Lọc theo Quý</button>
                        </div>
                    </div>
        		</div>
                <div class="row">
                    <div id="filter-month" class="col-sm-2 col-centered filter-by-target">
                        @include('graph-reports._month_select')
                    </div>

                    <div id="filter-quarter" class="col-sm-2 col-centered filter-by-target" style="display:none;">
                        @include('graph-reports._quarter_select') 
                    </div>
                </div>
        	</div>
            <div class="bl-traffic m-t-20 overview-container">
                 @include('graph-reports._overview_element')
            </div>
        </div>
    </div>
</div>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>

<script src="{{loadAsset("/plugins/raphael/raphael-min.js")}}"></script>
<script src="{{loadAsset("/plugins/morris/morris.min.js")}}"></script>
<script type="text/javascript">
    $(function(){
        $(".filter-by").click(function(){
            $(".filter-by-target").hide();
            $($(this).attr("target")).show();
            $(".filter-by-target select:visible").trigger("change");
        });

        $(".filter-by-target select").change(function(){
            fromDate = $(this).find("option:selected").attr("fromdate");
            toDate = $(this).find("option:selected").attr("todate");

            showPropzyLoading();
            $.post("/report/get-management-report-overview", { fromDate: fromDate, toDate: toDate },  function(response){
                $(".overview-container").html(response);
                hidePropzyLoading();
            });
            return false;
        });
    });
</script>
@stop