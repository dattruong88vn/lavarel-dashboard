@extends('layout.default')

@section('content')
<div class='agent-management-platform'>
    <section></section>
    <section>
        <div class="db-tm-item table-management-platform">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Agent Management Platform</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal">
                            	<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                            	@include('reports.graph-date')
                                
                                <div class="form-group">
                                	<label for="" class="col-sm-2 control-label">Type of transaction</label>
                                    <div class="col-sm-4">
	                                    <select id="transactionType" name="" class="form-control">
	                                    	<option value="1">For sale</option>
	                                        <option value="2">For rent</option>
	                                    </select>
	                                </div>
	                                <label for="" class="col-sm-2 control-label">Filter by</label>
                                    <div class="col-sm-4">
	                                    <select id="filterBy" name="" class="form-control">
	                                    	<option type="1" value=".bl-management-platform-region,  #management-platform-region_wrapper">Region/District</option>
	                                        <option type="2" value=".bl-management-platform-am, #management-platform-am_wrapper">Account Manager</option>
	                                        <option type="3" value=".bl-management-platform-agent, #management-platform-agent_wrapper">Agent</option>
	                                    </select>
	                                </div>
                                </div>
                                @include('reports.graph-area')
                                
                                <div class="form-group">
	                                <div class="col-sm-12 text-center">
	                                	<button id="btnSearch" class="btn btn-primary">Search</button>	
	                                	<button id="btnExport" class="btn btn-warning">Export</button>	
	                                </div>
                                </div>
                            </form>

                            <div class="bl-management-platform-region"  style="display:none; width:100%;">
                            	<h4>Region/District</h4>
	                            <div class="form-group row-chart region-chart">
	                            	<div class="col-sm-12">
	                            		<h3 class="text-center"><b>PHÂN CHIA THEO KHU VỰC</b></h3>
				                        <div class="chart-responsive">
				                            <div class="chart" id="bar-chart-region-area" style="height: 300px;"></div>
				                        </div>
				                       <img class="btn-next nextRegionChart" width="30" src="/images/btn-next.png">
				                        <h3></h3>
				                    </div>
				                    <div class="col-sm-12">
				                    	<h3 class="text-center"><b>PHÂN CHIA THEO TỈNH</b></h3>
				                        <div class="chart-responsive">
				                            <div class="chart" id="bar-chart-region-city" style="height: 300px;"></div>
				                        </div>
				                        <img class="btn-next nextRegionChart" width="30" src="/images/btn-next.png">
				                        <h4 class="text-center backRegionChart">&laquo; Phân chia theo khu vực</h4>
				                    </div>
				                    <div class="col-sm-12">
				                    	<h3 class="text-center"><b>PHÂN CHIA THEO QUẬN</b></h3>
				                        <div class="chart-responsive">
				                            <div class="chart" id="bar-chart-region-district"></div>
				                        </div>
				                        <h4 class="text-center backRegionChart">&laquo; Phân chia theo tỉnh</h4>
				                    </div>
			                    </div>
			                    <br>
	                            
	                        </div>
	                        <table id="management-platform-region" style="width:100%;" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Khu vực</th>
                                        <th>Thành phố</th>
                                        <th>Quận</th>
                                        <th>For sale</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>

	                        <div class="bl-management-platform-am" style="display:none; width: 100%;">
                            	<h4>Account Manager</h4>
	                            <div class="form-group row-chart">
		                            <!-- BAR CHART -->
			                        <div class="chart-responsive">
			                            <div class="chart" id="bar-chart-am" style="height: 300px;">
			                            	 <svg></svg>
			                            </div>
			                        </div>
			                    </div>
			                    <br>
	                            
	                        </div>
	                        <table id="management-platform-am" style="width: 100%;" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Khu vực</th>
                                        <th>Tỉnh / TP</th>
                                        <th>AM</th>
                                        <th>Total agent</th>
                                        <th>Active agent</th>
                                        <th>Inactive agent</th>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                            
	                        <div class="bl-management-platform-agent" style="display:none;width: 100%;">
                            	<h4>Agent</h4>
	                            <table id="management-platform-agent" class="table table-bordered table-striped">
	                                <thead>
	                                    <tr>
	                                    	<th>Region</th>
	                                        <th>City</th>
											<th>District</th>
	                                        <th>Agent</th>
	                                        <th>Số listings</th>
	                                        <th>For rent</th>
	                                        <th>For sale</th>
	                                        <th>No listings per agent</th>
	                                        <th>Pending listing for Trang</th>
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
	var barRegion;
	var barCity;
	var barDistrict;

	var currentTime = (new Date()).getTime();
	var postData = {
	    fromDate: currentTime - (currentTime % 86400000),
	    toDate: currentTime + 86400000 - (currentTime % 86400000),
	    listingTypeId:1,
	    regionIdsList:null,
	    cityIdsList:null,
	    districtIdsList:null
	}
	

	function drawAMChart() {
		var data = new google.visualization.DataTable();
		    data.addColumn('string', 'Topping');
		    data.addColumn('number', 'Active');
		    data.addColumn('number', 'Inactive');
		    data.addColumn('number', 'Số listing trung bình');
		    data.addRows(dataRender);

		    // Set chart options
		    var options = {
		        isStacked: true,
		        colors: ['#337ABC', '#8db000'],
		        vAxes: {0: {logScale: false},
			            1: {logScale: false, viewWindowMode:'explicit', viewWindow:{
			                min:0
			              }}
			    },
			    series:{
			       0:{targetAxisIndex:0},
			       1:{targetAxisIndex:0},
			       2:{targetAxisIndex:1}}
		    };

		    // Instantiate and draw our chart, passing in some options.
		    var chart = new google.charts.Bar(document.getElementById('bar-chart-am'));
		    chart.draw(data, google.charts.Bar.convertOptions(options));
      }

	var searchByAm = function(){
		showPropzyLoading();
		post_sync('/report/report-listing-by-am', postData, true, function(response){
			dataRender = [];
			$(response.data).each(function(idx, data){dataRender
				dataRender.push([data.amName, data.numberOfActiveAgents, data.numberOfInactiveAgents, data.percentListingOfActiveAgents]);
			});

			drawAMChart(dataRender);
			hidePropzyLoading();

	        datatableAm.clear();
	        datatableAm.rows.add(response.data);
	        datatableAm.columns.adjust().draw();
		});
	}
	var searchByAgent = function(){
		showPropzyLoading();
		var filteredPostData = jQuery.extend(true, {}, postData);
		delete filteredPostData.listingTypeId;

		post_sync('/report/report-listing-by-agent', filteredPostData, true, function(response){
			hidePropzyLoading();
	        datatableAgent.clear();
	        datatableAgent.rows.add(response.data);
	        datatableAgent.columns.adjust().draw();
		});
	}
	var searchByRegion = function(){
		showPropzyLoading();
		post_sync('/report/report-listing-by-region', postData, true, function(response){
			hidePropzyLoading();
	        barRegion.setData(response.data.regions);
	        barCity.setData(response.data.cities);
	        barDistrict.setData(response.data.districts);

	        $(datatableRegion.column(3).header()).text( postData.listingTypeId === 1 ? "For sales" : "For rent" )

	        datatableRegion.clear();
	        datatableRegion.rows.add(response.data.districts);
	        datatableRegion.columns.adjust().draw();
		});
	}

	var refreshChart = function(target) {
    	$("[class^=bl-management-platform]").hide();
    	$("#management-platform-region_wrapper,#management-platform-am_wrapper,#management-platform-agent_wrapper").hide();
    	$(target).show();
	}
	var refreshData = function() {

	}

	google.charts.load('current', {'packages':['bar']});

	var datatableRegion;
	var datatableAm;
	var datatableAgent;
	
	
	$(function () {
     
		datatableRegion = $("#management-platform-region").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: 'regionName'},
		        	{ data: 'cityName'},
	        		{ data: 'name'},
		        	{ data: 'value'}
			    ]
		});

		datatableAm = $("#management-platform-am").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: 'regionName'},
		        	{ data: 'cityName'},
		        	{ data: 'amName'},
		        	{ data: 'totalOfAgents'},
		        	{ data: 'numberOfActiveAgents'},
	        		{ data: 'numberOfInactiveAgents'},
			    ]
		});
		datatableAgent = $("#management-platform-agent").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
	        		{ data: 'regionName'},
		        	{ data: 'cityName'},
	        		{ data: 'districtName'},
		        	{ data: 'agentName'},
		        	{ data: 'numberOfListings'},
		        	{ data: 'numberOfListingsForRent'},
	        		{ data: 'numberOfListingsForSale'},
		        	{ data: 'percentListingOfAgents'},
		        	{ data: 'numberOfPendingListings'}
			    ]
		});
	    //BAR CHART
	    barRegion = new Morris.Bar({
	        element: 'bar-chart-region-area',
	        resize: false,
	        barColors: ['#1fbba6', '#f8aa33', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
	        data: [
	       	],
	        xkey: 'name',
			ykeys: ['value'],
			labels: ['Số listing'],
	        hideHover: 'auto',
	        barSizeRatio:0.07
	    });
	    barCity = new Morris.Bar({
	        element: 'bar-chart-region-city',
	        resize: true,
	        data: [
	        ],
	        barColors: ['#1fbba6', '#f8aa33', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
	        xkey: 'name',
			ykeys: ['value'],
			labels: ['Số listing'],
	        hideHover: 'auto',
	        barSizeRatio:0.1
	    });
	    barDistrict = new Morris.Bar({
	        element: 'bar-chart-region-district',
	        resize: true,
	        data: [
	        ],
	        barColors: ['#1fbba6', '#f8aa33', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'],
	        xkey: 'name',
			ykeys: ['value'],
			labels: ['Số listing'],
	        hideHover: 'auto',
	        xLabelAngle: 60,
	        padding: 90,
	        barSizeRatio:0.1
	    });

	    $("#btnSearch").click(function(){
	    	if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	currentFilterByOption = $("#filterBy option:selected");
	    	refreshChart(currentFilterByOption.val());
	    	if( parseInt(currentFilterByOption.attr("type")) === 1 ){
	    		searchByRegion();
	    	}
	    	else if( parseInt(currentFilterByOption.attr("type")) === 2 ){
	    		searchByAm();
	    	}
	    	else if( parseInt(currentFilterByOption.attr("type")) === 3 ){
	    		searchByAgent();
	    	}
	    	return false;
	    });

	    $("#btnExport").click(function(){
	    	if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}

	    	var filteredPostData = jQuery.extend(true, {}, postData);

	    	currentFilterByOption = $("#filterBy option:selected");
	    	linkPlus = "listing-region";
	    	if( parseInt(currentFilterByOption.attr("type")) === 2 ){
	    		linkPlus = "agent-am-region";
	    		delete filteredPostData.listingTypeId;
	    	}
	    	else if( parseInt(currentFilterByOption.attr("type")) === 3 ){
				linkPlus = "listing-agent-region";
	    	}
	    	showPropzyLoading();
	    	post_sync("/report/export-report/" + linkPlus, filteredPostData, true, function(response){
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
		$("#transactionType").change(function(){
	    	postData.listingTypeId = parseInt($(this).val());
	    });
	   
	    chartWidth = $(".bl-management-platform-region").width();
	    $(".nextRegionChart").click(function(){
	    	scrollLeft = chartWidth + $(".bl-management-platform-region").scrollLeft();
	    	$(".bl-management-platform-region").animate({scrollLeft: scrollLeft });
	    });
	    $(".backRegionChart").click(function(){
	    	scrollLeft = $(".bl-management-platform-region").scrollLeft() - chartWidth;
	    	$(".bl-management-platform-region").animate({scrollLeft: scrollLeft });
	    });
	});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />

<style type="text/css">
	.bl-management-platform-region {
		width: 100%;
		overflow: hidden;
	}
	.form-group.row-chart.region-chart{
		width: 300%;
	}
	.form-group.row-chart.region-chart > div{
		width: 33%;
	}
	img.btn-next {
		position: absolute;
	    right: 15px;
	    top: 20px;
	    cursor: pointer;
	}
	.backRegionChart {
		cursor: pointer;
	}
	.table-management-platform [id$="_wrapper"] {
		display: none;
	} 
</style>
@stop