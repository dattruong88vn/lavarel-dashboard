@extends('layout.default')

@section('content')
<div class='top-agents'>
    <section></section>
    <section>
        <div class="db-tm-item table-top-agents">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Top n Agents</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal" method="get">
						        <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
						        @include('reports.graph-date')
                                
                                @include('reports.graph-area')
                                <div class="form-group text-center">
                                	<label for="" class="col-sm-2 control-label">Chọn số lượng agent</label>
                                    <div class="col-sm-4">
	                                    <select id="numberAgent" name="" class="form-control">
	                                    	<option value="5">5</option>
	                                    	<option value="10">10</option>
	                                    	<option value="20">20</option>
	                                    	<option value="+">More</option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-3">
	                                	<button id="btnSearch" class="btn btn-primary">Search</button>	
	                                </div>
                                </div>
                            </form>

                            <br>
                            <div class="bl-topagent-1" style="/*display:none;*/">
	                            <div class="bl-group-chart text-center">
		                            <div class="form-group row-chart">
		                            	<div class="col-sm-4">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="listings-chart" style="height: 300px;"></div>
					                        </div>
					                        <h4>LISTING</h4>
		                            	</div>
		                            	<div class="col-sm-4">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="detail-chart" style="height: 300px; display:none;"></div>
					                        </div>
		                            	</div>
			                            <div class="col-sm-4">
		                            		<div class="chart-responsive">
					                            <div class="chart" id="commissions-chart" style="height: 300px;"></div>
					                        </div>
					                        <h4>COMMISSIONS</h4>
		                            	</div>
		                            	
		                       		</div>
		                       	</div>
		                       	<br>
		                       	<button id="btnExportMain" class="btn btn-warning">Export</button>	
	                            <table id="tb-account-manager" class="table table-bordered table-striped">
	                                <thead>
	                                    <tr>
	                                    	<th>#</th>
	                                        <th>Account Manager</th>
	                                        <th>Agent</th>
	                                        <th>Khu vực</th>
	                                        <th>Tỉnh</th>
	                                        <th>Quận</th>
	                                        <th>Tổng số	 listing</th>
	                                        <th>For rent</th>
	                                        <th>For sale</th>
	                                        <th>COMMISSIONS</th>
	                                    </tr>
	                                </thead>
	                                <tbody>                                    
	                                </tbody>
	                            </table>
	                        </div>

	                        <div class="bl-topagent-2" style="display:none;">
	                       		<div class="form-group">
	                       			<div class="col-sm-12">
	                       				<h4 class="text-center">INACTIVE AGENTS</h4>
	                       				<button id="btnExportInactive" class="btn btn-warning">Export</button>	
	                       				<table id="tb-inactive-agents" class="table table-bordered table-striped">
			                                <thead>
			                                    <tr>
			                                    	<th>#</th>
			                                        <th>Agent</th>
			                                        <th>Account Manager</th>
			                                        <th>Last login date</th>
			                                    </tr>
			                                </thead>
			                                <tbody>                                    
			                                </tbody>
			                            </table>
	                       			</div>
	                       		</div>
	                        </div>

	                        <div class="bl-topagent-3" style="display:none;">
	                       		<div class="form-group">
	                       			<div class="col-sm-12">
	                       				<h4 class="text-center">TOP N AM</h4>
	                       				<button id="btnExportTopAM" class="btn btn-warning">Export</button>	
	                       				<table id="tb-top-am" class="table table-bordered table-striped">
			                                <thead>
			                                    <tr>
			                                    	<th>#</th>
			                                        <th>AM</th>
			                                        <th>Khu vực</th>
			                                        <th>Tỉnh/TP</th>
			                                        <th>Target growth</th>
			                                        <th>Target AAR</th>
			                                        <th>Target LPA</th>
			                                        <th>Executed growth</th>
			                                        <th>Executed AAR</th>
			                                        <th>Executed LPA</th>
			                                        <th>Executed Score(%)</th>
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
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	google.charts.load('current', {'packages':['corechart']});
	var listingChart;
	var commissionChart;
	var currentData;
	var currentTime = (new Date()).getTime();
	var postData = {
	    fromDate: currentTime - (currentTime % 86400000),
	    toDate: currentTime + 86400000 - (currentTime % 86400000),
	    limit:1,
	    regionIdsList:null,
	    cityIdsList:null,
	    districtIdsList:null
	}


	function drawListingChart(topListing, remaining) {
		var data = google.visualization.arrayToDataTable([
		  ['Top agent', 'Other'],
		  ['Top agent\'s listings', topListing], ['Other', remaining]
		]);

		var options = {
		  title: '',
		  legend: 'none',
		  pieSliceText: 'value-and-percentage',
		};

		// Instantiate and draw our chart, passing in some options.
		listingChart = new google.visualization.PieChart(document.getElementById('listings-chart'));
		listingChart.draw(data, options);
		google.visualization.events.addListener(listingChart, 'select', pieChartListingHandler);
	}


	function drawCommissionChart(topCommission, other) {
		var data = google.visualization.arrayToDataTable([
		  ['Top agent', 'Other'],
		  ['Top agent\'s commission', topCommission], ['Other', other]
		]);

		var options = {
		  title: '',
		  legend: 'none',
		  pieSliceText: 'value-and-percentage',
		};

		// Instantiate and draw our chart, passing in some options.
		commissionChart = new google.visualization.PieChart(document.getElementById('commissions-chart'));
		commissionChart.draw(data, options);

		google.visualization.events.addListener(commissionChart, 'select', pieChartCommissionHandler);
	}

	function drawDetailChart(sale, rl, cl) {
		var data = google.visualization.arrayToDataTable([
		  ['Top agents', 'Other'],
		  ['Sale', sale], ['Residentail leasing', rl],['Commercial leasing', cl]
		]);

		var options = {
		  legend: 'none',
		  animation:{
	        duration: 1000,
	        easing: 'out',
	      },
		  pieSliceText: 'value-and-percentage',
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.PieChart(document.getElementById('detail-chart'));
		chart.draw(data, options);
	}

	function pieChartListingHandler(hoverPosition) {
		console.log(hoverPosition);
		row = listingChart.getSelection();
		if(row[0] != null) {
			$("#detail-chart").fadeIn();
			row = row[0].row;
			if(row === 0) {
				drawDetailChart(currentData.numberOfListingForSaleInTopAgents ,currentData.numberOfListingForResidentialInTopAgents ,currentData.numberOfListingForCommercialInTopAgents );
			}
			else if (row === 1) {
				drawDetailChart(currentData.numberOfListingForSaleNotInTopAgents ,currentData.numberOfListingForResidentialNotInTopAgents ,currentData.numberOfListingForCommercialNotInTopAgents );
			}
			
		} else {
			$("#detail-chart").fadeOut();
		}
	}
	function pieChartCommissionHandler(hoverPosition) {
		console.log(hoverPosition);
		row = commissionChart.getSelection();
		if(row[0] != null) {
			$("#detail-chart").fadeIn();
			row = row[0].row;
			if(row === 0) {
				drawDetailChart(currentData.totalOfCommissionForSaleInTopAgents ,currentData.totalOfCommissionForResidentialInTopAgents ,currentData.totalOfCommissionForCommercialInTopAgents );
			}
			else if (row === 1) {
				drawDetailChart(currentData.totalOfCommissionForSaleNotInTopAgents ,currentData.totalOfCommissionForResidentialNotInTopAgents ,currentData.totalOfCommissionForCommercialNotInTopAgents );
			}
			
		} else {
			$("#detail-chart").fadeOut();
		}
	}

	function pieChartOutHandler(hoverPosition) {
		
	}
	$(function () {
		var tableAM = $("#tb-account-manager").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: null, render: renderIndex},
	        		{ data: 'amName'},
		        	{ data: 'agentName'},
	        		{ data: 'regionName'},
		        	{ data: 'cityName'},
		        	{ data: 'districtName'},
		        	{ data: 'numberOfListings'},
	        		{ data: 'numberOfListingsForRent'},
		        	{ data: 'numberOfListingsForSale'},
		        	{ data: 'totalOfCommissions'}
			    ]
		});
		var tableTopAM  = $("#tb-top-am").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: null, render: renderIndex},
		        	{ data: 'amName'},
	        		{ data: 'regionName'},
	        		{ data: 'cityName'},
	        		{ data: 'targetGrowth'},
	        		{ data: 'targetAAR'},
		        	{ data: 'targetLPA'},
	        		{ data: 'executedGrowth'},
	        		{ data: 'executedAAR'},
		        	{ data: 'executedLPA'},
	        		{ data: 'score'}
			    ]
		});
			                                     
		var tableInactiveAgents = $("#tb-inactive-agents").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: null, render: renderIndex},
	        		{ data: 'agentName'},
		        	{ data: 'amName'},
	        		{ data: 'lastLoginDate', render: dateConvertRender}
			    ]
		});
		$("#btnExportInactive").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	delete postData.limit;
	    	showPropzyLoading();
	    	post_sync("/report/export-report/agent-inactive", postData, true, function(response){
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
		$("#btnExportTopAM").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	postData.limit = parseInt($("#numberAgent").val());
	    	showPropzyLoading();
	    	post_sync("/report/export-report/top-am-region", postData, true, function(response){
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
	    $("#btnExportMain").click(function(){
	    	if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	postData.limit = parseInt($("#numberAgent").val());
	    	showPropzyLoading();
	    	post_sync("/report/export-report/top-agent-region", postData, true, function(response){
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
	    	postData.limit = parseInt($("#numberAgent").val());
	    	$("[class^='bl-topagent-']").show();
			showPropzyLoading();
			post_sync('/report/report-top-agent', postData, true, function(response){
				hidePropzyLoading();

				currentData = response.data;

		        tableAM.clear();
		        tableAM.rows.add(currentData.list);
		        tableAM.columns.adjust().draw();

		        tableInactiveAgents.clear();
		        tableInactiveAgents.rows.add(currentData.inactiveList);
		        tableInactiveAgents.columns.adjust().draw();

		        tableTopAM.clear();
		        tableTopAM.rows.add(currentData.targetList);
		        tableTopAM.columns.adjust().draw();

		        drawListingChart(currentData.numberOfListingInTopAgents, currentData.numberOfListingNotInTopAgents);
		        drawCommissionChart(currentData.totalOfCommissionInTopAgents, currentData.totalOfCommissionNotInTopAgents);


			});
			return false;
		});
	});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />

@stop