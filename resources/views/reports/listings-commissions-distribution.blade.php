@extends('layout.default')

@section('content')
<div class='listings-commmissions'>
    <section></section>
    <section>
        <div class="db-tm-item table-listings-commmissions">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Listings Commissions Distribution</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal" method="get">
                            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                                @include('reports.graph-date')
                                @include('reports.graph-area')
                                 <div class="form-group">
                                    <div class="col-sm-5">
                                		<label for="">Type of transaction</label>
	                            		<select id="transactionType" name="" class="form-control">
	                                    	<option value="1">For sale</option>
	                                        <option value="2">For rent</option>
	                                        <option value="1,2">Tất cả</option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-5">
                                		<label for="">Filter by</label>
	                            		<select id="filterBy" name="" class="form-control">
	                                    	<option value="1">Number of listings</option>
	                                    	<option value="2">Commission</option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-2">
	                                	<button id="btnSearch" class="btn btn-primary">Search</button>	
	                                </div>
                                </div>
                            </form>

                            <br>
                            <div class="bl-listings-commissions">
	                            <div class="bl-group-chart text-center">
		                            <div class="form-group row-chart">
		                            	<div class="col-sm-6">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="chart-region" style="height: 300px; position: relative;"></div>
					                        </div>
		                            	</div>
			                            <div class="col-sm-6">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="chart-product" style="height: 300px; position: relative;"></div>
					                        </div>
		                            	</div>
		                       		</div>
		                       		<div class="form-group row-chart">
		                            	<div class="col-sm-6">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="chart-am" style="height: 300px; position: relative;"></div>
					                        </div>
		                            	</div>
			                            <div class="col-sm-6">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="chart-type" style="height: 300px; position: relative;"></div>
					                        </div>
		                            	</div>
		                       		</div>
		                       	</div>
	                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/raphael/raphael-min.js")}}"></script>
<script src="{{loadAsset("/plugins/morris/morris.min.js")}}"></script>
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
<script type="text/javascript">
	var regionChart;
	var productChart;
	var AMChart;
	var typeChart;

	var currentTime = (new Date()).getTime();
	var postData = {
	    fromDate: currentTime - (currentTime % 86400000),
	    toDate: currentTime + 86400000 - (currentTime % 86400000),
	    type:1,
		listingTypeIdsList:[1],
	    regionIdsList:null,
	    cityIdsList:null,
	    districtIdsList:null
	}

	function drawRegionChart(jsonData) {
		var data = google.visualization.arrayToDataTable(jsonData);
		var options = {
			legend:'right',
			pieHole: 0.4,
			title: 'By Region'
		};

		regionChart = new google.visualization.PieChart(document.getElementById('chart-region'));
		regionChart.draw(data, options);
	}

	function drawProductChart(jsonData) {
		var data = google.visualization.arrayToDataTable(jsonData);

		var options = {
		  legend:'right',
		  pieHole: 0.4,
		  title: 'By Product'
		};

		regionChart = new google.visualization.PieChart(document.getElementById('chart-product'));
		regionChart.draw(data, options);
	}

	function drawAMChart(jsonData) {
		var data = google.visualization.arrayToDataTable(jsonData);

		var options = {
		  legend:'right',
		  pieHole: 0.4,
		  title: 'By AM'
		};

		regionChart = new google.visualization.PieChart(document.getElementById('chart-am'));
		regionChart.draw(data, options);
	}

	function drawTypeChart(jsonData) {
		var data = google.visualization.arrayToDataTable(jsonData);

		var options = {
			legend:'right',
			pieHole: 0.4,
			title: 'By Trx Type'
		};

		regionChart = new google.visualization.PieChart(document.getElementById('chart-type'));
		regionChart.draw(data, options);
	}



	google.charts.load('current', {'packages':['corechart']});

	$(function () {
		$("#btnExport").click(function(){
	    	showPropzyLoading();
	    	$.post("/report/export-report/agent-overview", postData, function(response){
	    		if(response.result) {
	    			window.location.href = response.data.linkFile;
	    		}
	    		else {
	    			alert(response.message);
	    		}
	    		hidePropzyLoading();
	    	});
	    	return false;
	    });
		$("#btnSearch").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	postData.type = parseInt($("#filterBy").val());
	    	postData.listingTypeIdsList = parseIntArray($("#transactionType").val().split(","));

	    	$("[class^='bl-topagent-']").show();
			showPropzyLoading();
			post_sync('/report/report-by-type', postData, true, function(response){
				hidePropzyLoading();
				if(response.data.regions)
				drawRegionChart(processValueForGoogle(response.data.regions));
				if(response.data.products)
				drawProductChart(processValueForGoogle(response.data.products));
				if(response.data.transactions)
				drawTypeChart(processValueForGoogle(response.data.transactions));
				if(response.data.accountManagers)
				drawAMChart(processValueForGoogle(response.data.accountManagers));
			});
			return false;
		});
	});
	
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
@stop