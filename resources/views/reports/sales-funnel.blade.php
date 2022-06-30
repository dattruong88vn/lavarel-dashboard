@extends('layout.default')

@section('content')
<div class='sales-funnel'>
    <section></section>
    <section>
        <div class="db-tm-item table-sales-funnel">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Sales Funnel</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal" method="get">
                                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
						        @include('reports.graph-date')
                                
                                @include('reports.graph-area')
                                <div class="form-group">
                                	<div class="col-sm-3">
                                		<label for="">Type of transaction</label>
	                            		<select id="transactionType" name="" class="form-control">
	                            			<option value="1">Residential leasing</option>
	                            			<option value="2">Commercial leasing</option>
	                                    	<option value="3">For sale</option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-3">
                                		<label for="">Filter by</label>
	                            		<select id="userType" name="" class="form-control">
	                            			<option value="-1">Choose user type</option>
	                                    	<option value="am">Account Manager</option>
	                                    	<option value="agent">Agent</option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-3">
	                                	<label for="">Chọn user</label>
	                            		<select multiple id="userList" name="" class="form-control">
	                                    </select>
	                                </div>
	                                <div class="col-sm-3 text-center">
	                                	<button id="btnSearch" class="btn btn-primary">Search</button>
	                                </div>
                                </div>
                            </form>

                            <br>
                            <div class="bl-sales-funnel">
	                            <div class="bl-group-chart">
		                            <div class="form-group row-chart">
		                            	<div class="col-sm-2">
		                            		<p><button id="noOfDealChart" class="btn btn-info">No of deals</button></p>
	                                        <p><button id="transactionValueChart" class="btn btn-success">Transaction value</button></p>
	                                        <p><button id="commissionChart" class="btn btn-warning">Commission</button></p>
		                            	</div>
		                            	<div class="col-sm-7">
		                            		<div id="funnel-container"></div>
		                            	</div>
		                            	<div class="col-sm-3">
		                            		<div>
		                            			<table>
		                            				<tbody id="legend">
		                            					
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
<script src="{{loadAsset("/js/d3.min.js")}}"></script>
<script src="{{loadAsset("/js/d3-funnel.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script>
<script type="text/javascript">
	var current_data;
	var colors = ["#3cb878", "#605ca8", "#a186be", "#a864a8", "#630460","#9e005d", "#f26d7d", "#ed145b", "#9e0039", "#ed1c24", "#f26c4f", "#fff568"];
	var currentTime = (new Date()).getTime();
	var postData = {
	    fromDate: currentTime - (currentTime % 86400000),
	    toDate: currentTime + 86400000 - (currentTime % 86400000),
	    regionIdsList:null,
	    cityIdsList:null,
	    districtIdsList:null,
	    agentIdsList: null,
	    amIdsList:null,
		listingTypeId:2,
		purposeId:1
	}
	var refreshUserList = function(type) {
		data = {
			regionIdsList:postData.regionIdsList,
			cityIdsList:postData.cityIdsList,
			districtIdsList:postData.districtIdsList
		}
		showPropzyLoading();
		post_sync("/report/get-list-user-by-type/" + type, postData, true, function(response){
    		str = "<option value='-1' selected >Tất cả</option>";
    		$(response.data).each(function(idx, user){
    			str += "<option value='"+ user.id +"'>"+ user.name +"</option>";
    		});
    		$("#userList").html(str);
    		hidePropzyLoading();
    	});
    	return false;
	}
	var refreshChartData = function(funnelData, originalData){
		if(funnelData.length == 0) {
			$('#funnel-container').html("<span>No data</span>");
		}
		else {
			$('#funnel-container').html("");
			var options = {
		    	chart: {
		    		animate: 1,
		    		width: 400,
		    		height: 500
		    	},
		    	block: {
		    		dynamicHeight: true,
		    		fill: {
		    			type: "gradient"
		    		},
		    		highlight: true
		    	}
		    };

		    var chart = new D3Funnel('#funnel-container');
		    chart.draw(funnelData, options);
		}

		legendStr = "";
		$(originalData).each(function(idx, fData){
			legendStr += "<tr><td width='50'><div class='legendColor"+ (fData[1] == 0? " hidden":"") +"' style='background-color:"+ fData[2] +" ;'></div></td><td>" + fData[0] + ": " + fData[1] + "</td></tr>";
		});
		$('#legend').html(legendStr);
		
		
	}
	

	$(function () {

		$("#noOfDealChart").click(function(){
			funnelData = [];
			originalData = [];
    		$(current_data).each(function(idx, element){
    			arr = new Array(element.statusName, element.numberOfDeals, colors[idx % (colors.length - 1)]);
    			originalData.push(arr);
    			if(element.numberOfDeals > 0) {
	    			funnelData.push(arr);
	    		}
    		});

    		refreshChartData(funnelData, originalData);
		});

		$("#transactionValueChart").click(function(){
			funnelData = [];
			originalData = [];
    		$(current_data).each(function(idx, element){
    			arr = new Array(element.statusName, element.transactionValue, colors[idx % (colors.length - 1)]);
    			originalData.push(arr);
    			if(element.transactionValue > 0) {
	    			funnelData.push(arr);
	    		}
    		});

    		refreshChartData(funnelData, originalData);
		});

		$("#commissionChart").click(function(){
			funnelData = [];
			originalData = [];
    		$(current_data).each(function(idx, element){
    			arr = new Array(element.statusName, element.commission, colors[idx % (colors.length - 1)]);
    			originalData.push(arr);
    			if(element.commission > 0) {
	    			funnelData.push(arr);
	    		}
    		});

    		refreshChartData(funnelData, originalData);    		
		});

		$("#userType").change(function(){
			if(postData.regionIdsList == null) {
	    		alert("Vui lòng chọn ít nhất một khu vực");
	    		$(this).val("-1");
	    		return false;
	    	}
			type = $(this).val();
			if(type === "-1") {
				$("#userList").html("");
			}
			else {
				refreshUserList(type);
			}
		});

		$("#transactionType").change(function(){
			type = $(this).val();
			if(type === "1") {
				postData.listingTypeId = 2;
				postData.purposeId = 1;
			} else if(type === "2"){
				postData.listingTypeId = 2;
				postData.purposeId = 2;
			} else if(type === "3"){
				postData.listingTypeId = 1;
				postData.purposeId = 3;
			}
		});
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
	    	
	    	// remove unused variables
	    	var filteredPostData = jQuery.extend(true, {}, postData);
			delete filteredPostData.regionIdsList;
			delete filteredPostData.cityIdsList;
			delete filteredPostData.districtIdsList;

			filteredPostData.agentIdsList = null; 
			filteredPostData.amIdsList = null;

			userType = $("#userType").val();
			userList = $("#userList").val();
			
			if(userList.length > 0 && userList[0] == "-1") {
				userList = [];
				$("#userList option").each(function(idx, option){
					value = $(option).attr("value");
					if(value != "-1") {
						userList.push(parseInt(value));
					}
				});
			}

			if(!userList) {
				alert("Vui lòng chọn ít nhất một user");
	    		return false;
			}
			if(userType == "agent") {
				filteredPostData.agentIdsList = parseIntArray(userList);
			}
			else if(userType == "am") {
				filteredPostData.amIdsList = parseIntArray(userList);
			}
			else {
				alert("Vui lòng chọn loại user");
	    		return false;
			}

			if(filteredPostData.agentIdsList == null && filteredPostData.amIdsList == null ) {
	    		alert("Vui lòng chọn ít nhất một am/agent");
	    		return false;
	    	}

	    	showPropzyLoading();
			post_sync("/report/report-sales-funnel", filteredPostData, true, function(response){
	    		current_data = response.data;
	    		funnelData = [];
				originalData = [];
	    		$(current_data).each(function(idx, element){
	    			arr = new Array(element.statusName, element.numberOfDeals, colors[idx % (colors.length - 1)]);
	    			originalData.push(arr);
	    			if(element.numberOfDeals > 0) {
		    			funnelData.push(arr);
		    		}
	    		});

	    		refreshChartData(funnelData, originalData);

	    		hidePropzyLoading();
	    	});
	    	return false;
	    });	    
	});
	
</script>
<style type="text/css">
	.legendColor{
		width: 20px;
    	height: 20px;
	}
	#legend td {
		height: 30px;
	}
</style>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
@stop