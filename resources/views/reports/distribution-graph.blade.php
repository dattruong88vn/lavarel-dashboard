@extends('layout.default')

@section('content')
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCk7WmvVHbAB0eRskXYzizEd-tEbxuyZxg"></script>
<script type="text/javascript">
	var selectionChange = true;
</script>
<div class='distribution-graph'>
    <section></section>
    <section>
        <div class="db-tm-item table-distribution-graph">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Distribution Graph</h3>
                        </div>

                        <div class="box-body">
                        	 <form class="form-horizontal" method="get">
						        <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
						        @include('reports.graph-date')
                                
                                @include('reports.graph-area')
                            </form>
                        	<div class="bl-distribution-chart">
                        		<div class="col-sm-12 margin text-center">
									<button id="btn-broker-activity" class="btn btn-primary">BROKER ACTIVITY</button>
									<button id="btn-listing-activity" class="btn btn-primary">LISTING ACTIVITY</button>
									<button id="btn-request-activity" class="btn btn-primary">LEAD ACTIVITY</button>
									<button id="btn-agents-activity" class="btn btn-primary">NEWLY ADDED AGENTS</button>
									<button id="btnExport" class="btn btn-warning">EXPORT</button>		
								</div><br/>
								<div class="col-sm-12">
									<div id="map">
										
									</div>
								</div>
		                        <br><br>
		                        <table id="tb-distribution-graph" class="table table-bordered table-striped">
	                                <thead>
	                                    <tr>
	                                        <th>Quận</th>
	                                        <th>Số lượng agent</th>
	                                        <th>Số lượng listing</th>
	                                        <th>Số lượng lead</th>
	                                        <th>Số lượng agent mới</th>
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
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/gmap3.min.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
<script type="text/javascript">
	var currentTime = (new Date()).getTime();
	var color = ["92357C","592B67","6A3E78","7C5388","8E6999","A17DAC","BE9BC9","D6B1E2","34123F","25082E"];
	var levelArray = ['2F','3F','4F','5F', '6F','7F','9F', 'AF','BF', 'DF','EF'];
	var postData = {
	    fromDate: currentTime - (currentTime % 86400000),
	    toDate: currentTime + 86400000 - (currentTime % 86400000),
	    regionIdsList:null,
	    cityIdsList:null,
	    districtIdsList:null
	}
	
	var map, heatmap, tableData, currentData;
	var arrayKml = [];
	function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
	}
	function removeAllKmlLayer() {
		$(arrayKml).each(function(idx, kmlLayer){
			kmlLayer.setMap(null);
		});
		arrayKml = [];
	}
	function UrlExists(url) {
	    var http = new XMLHttpRequest();
	    http.open('HEAD', url, false);
	    http.send();
	    return http.status!=404;
	}
	function addKmlLayer(drawData) {
		
		layerData = [];

		$(drawData).each(function(idx, element){
			if(element.value > 0) {
				step = Math.floor(parseFloat(element.value) / maxValue * 10);
				if(!layerData[step]) {
					layerData[step] = element.name;
				}
				else {
					layerData[step] += "," + element.name;
				}
				
			}
		});
		for(step = 0; step <= 10 ; step++) {
			if(layerData[step]) {
				kmzLayer = new google.maps.KmlLayer('{{ SITE_URL }}districts/MultipleDistrict.php?districts='+ layerData[step] +'&color=' + levelArray[step] + color[0] + '&v='+date.getTime());
	    		kmzLayer.setMap(map);
	    		arrayKml.push(kmzLayer);
	    		console.log('{{ SITE_URL }}districts/MultipleDistrict.php?districts='+ layerData[step] +'&color=' + levelArray[step] + color[0] + '&v='+date.getTime());
			}
		}
		/*$(layerData).each(function(){
			
		});*/
	}
		

	function drawMap(drawData, maxValue) {
		date = new Date();
		removeAllKmlLayer();
		addKmlLayer(drawData);
	}

	function refreshData(completed) {
		showPropzyLoading();
		post_sync('/report/report-distribution-graph', postData, true, function(response){
			hidePropzyLoading();
			selectionChange = false;
			currentData = response.data;

	        tableData.clear();
	        tableData.rows.add(currentData);
	        tableData.columns.adjust().draw();

	        completed();
		});
	}
	var refreshBrokerActivity = function(){
		drawData = [];
		removeAllKmlLayer();
		maxValue = 0;
		$(currentData).each(function(idx, element){
			drawData.push({ name : element.newDistrictName , value: element.numberOfAgents});
			if(maxValue < element.numberOfAgents) {
				maxValue = element.numberOfAgents;
			}
		});
		drawMap(drawData, maxValue);
	}
	var refreshListingActivity = function(){
		drawData = [];
		removeAllKmlLayer();
		maxValue = 0;
		$(currentData).each(function(idx, element){
			drawData.push({ name : element.newDistrictName , value: element.numberOfListings});
			if(maxValue < element.numberOfListings) {
				maxValue = element.numberOfListings;
			}
		});
		drawMap(drawData, maxValue);
	}
	var refreshRequestActivity = function(){
		drawData = [];
		removeAllKmlLayer();
		maxValue = 0;
		$(currentData).each(function(idx, element){
			drawData.push({ name : element.newDistrictName , value: element.numberOfDeals});
			if(maxValue < element.numberOfDeals) {
				maxValue = element.numberOfDeals;
			}
		});
		drawMap(drawData, maxValue);
	}
	var refreshAgentsActivity = function(){
		drawData = [];
		removeAllKmlLayer();
		maxValue = 0;
		$(currentData).each(function(idx, element){
			drawData.push({ name : element.newDistrictName , value: element.numberOfNewAgents});
			if(maxValue < element.numberOfNewAgents) {
				maxValue = element.numberOfNewAgents;
			}
		});
		drawMap(drawData, maxValue);
	}
	$(function () {
		map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 10.7755005, lng: 106.6798501},
          zoom:10,
		  scrollwheel: false
        });
		tableData = $("#tb-distribution-graph").DataTable({
			"scrollX": true,
			"data" : [],
	        "columns": [
		        	{ data: 'districtName'},
	        		{ data: 'numberOfAgents'},
	        		{ data: 'numberOfListings'},
	        		{ data: 'numberOfDeals'},
	        		{ data: 'numberOfNewAgents'}
			    ]
		});
		$("#btn-broker-activity").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
			if(selectionChange) {
				refreshData(function(){
					refreshBrokerActivity();
				});
			}
			else refreshBrokerActivity();
			return false;
		});

		$("#btn-listing-activity").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
			if(selectionChange) {
				refreshData(function(){
					refreshListingActivity();
				});
			}
			else refreshListingActivity();
			return false;
		});

		$("#btn-request-activity").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
			if(selectionChange) {
				refreshData(function(){
					refreshRequestActivity();
				});
			}
			else refreshRequestActivity();
			return false;
		});

		$("#btn-agents-activity").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
			if(!selectionChange) {
				refreshData(function(){
					refreshAgentsActivity();
				});
			}
			else refreshAgentsActivity();
			return false;
		});
		$("#btnExport").click(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		return false;
	    	}
	    	showPropzyLoading();
	    	post_sync("/report/export-report/district-chart", postData, true, function(response){
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
	});

	
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
@stop