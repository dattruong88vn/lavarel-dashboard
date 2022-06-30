@extends('layout.default')

@section('content')
<div class='listing-status-overview'>
	<section></section>
	<section>
		<div class="db-tm-item table-status-overview">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
						  	<h3 class="box-title">Tổng quan số lượng listing và trạng thái</h3>
						</div>
						<div class="box-body">
							<form class="form-horizontal">
								<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
						      	<div class="form-group">
						        	<label for="" class="col-sm-2 control-label">From</label>
						        	<div class="col-sm-3">
						            	<div id="from-date" class="input-group date date-overview-status" >
										    <input type="text" class="form-control">
										    <div class="input-group-addon">
										        <i class="fa fa-calendar"></i>
										    </div>
										</div>
									</div>
									<label for="" class="col-sm-2 control-label">To</label>
						        	<div class="col-sm-3">
						            	<div id="to-date" class="input-group date date-overview-status">
										    <input type="text" class="form-control">
										    <div class="input-group-addon">
										        <i class="fa fa-calendar"></i>
										    </div>
										</div>
									</div>
									<div class="col-sm-2">
										<button class="btn btn-export btn-warning">Export to xlsx/csv</button>
									</div>
								</div>
							</form>
							<div class="col-sm-12">
								<table id="listing-count-overview-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th></th>
											<th colspan="2" class="text-center">AGENTS</th>
											<th colspan="2" class="text-center">OWNERS</th>
											<th colspan="2" class="text-center">KHÁC</th>
										</tr>
										<tr>
											<th>Status</th>
											<th>Commercial</th>
											<th>Residential</th>
											<th>Commercial</th>
											<th>Residential</th>
											<th>Commercial</th>
											<th>Residential</th>
										</tr>
									</thead>
									<tbody>
										
									</tbody>
								</table>
							</div>
							<div class="col-sm-6">
								<h4 class="text-center">Acquired building</h4>
								<table id="acquired-building-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th></th>
											<th>RESIDENTIAL</th>
											<th>COMMERCIAL</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>NEW</td>
											<td id="acquired_residential_new"></td>
											<td id="acquired_commercial_new"></td>
										</tr>
										<tr>
											<td>TOTAL</td>
											<td id="acquired_residential_total"></td>
											<td id="acquired_commercial_total"></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="col-sm-6">
								<h4 class="text-center">Projects</h4>
								<table id="project-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th></th>
											<th>No of projects</th>
											<th>No of listing</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>NEW</td>
											<td id="project_no_of_project"></td>
											<td id="project_no_of_listing"></td>
										</tr>
										<tr>
											<td>TOTAL</td>
											<td id="project_no_of_project_total"></td>
											<td id="project_no_of_listing_total"></td>
										</tr>
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
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>

<script type="text/javascript">
var currentTime = (new Date()).getTime();
var postData = {
	fromDate: currentTime  - (currentTime % 86400000),
	toDate: currentTime + 86400000 - (currentTime % 86400000)
}
if(localStorage.getItem("fromDate")) {
	postData.fromDate = parseInt(localStorage.getItem("fromDate"));
	postData.toDate = parseInt(localStorage.getItem("toDate"));
}
var numberUpdate;
function updateLoading() {
	if(++numberUpdate === 3) {
		hidePropzyLoading();
		numberUpdate = 0;
	}
}
var customRender = function ( data, type, object,meta ) {
	type = ((meta.col % 2) == 0 ? 2 : 1);
	source = -1;
	if(meta.col <= 2) source = 4; 
	else if(meta.col <= 4) source = 3; 

	if(object.statusId == 2 && data > 0) {
		return "<a href='/report/problem-and-recommented/"+ type +"/"+ source +"/"+ postData.fromDate +"/"+ postData.toDate +"'>"+data+"</a>";
	} else if(object.statusId === 5 && data > 0) {
		return "<a href='/report/rejected-listing/"+ type +"/"+ source +"/"+ postData.fromDate +"/"+ postData.toDate +"'>"+data+"</a>";
	}
    return data;
} 
function refreshDataTable() {
	numberUpdate = 0;
	showPropzyLoading();
	localStorage.setItem("fromDate", postData.fromDate)
	localStorage.setItem("toDate", postData.toDate)
	post_sync("/report/get-list-overviews", postData, true, function(all_status){
		$("#listing-count-overview-table").DataTable().destroy();
		$("#listing-count-overview-table").DataTable({
	        "scrollX": true,
	        paging: false,
	        searching: false,
    		ordering:  false,
	        data: all_status,
	        columns: [
	        	{ data: 'statusName' },
		        { data: 'numberListingCommercialForAgents', render: customRender },
		        { data: 'numberListingResidentialForAgents', render: customRender },
		        { data: 'numberListingCommercialForOwners' , render: customRender},
		        { data: 'numberListingResidentialForOwners', render: customRender },
		        { data: 'numberListingCommercialForOthers' , render: customRender},
		        { data: 'numberListingResidentialForOthers', render: customRender }
		    ]
	    });
	    updateLoading();
	});

	post_sync("/report/get-list-overviews-acquired", postData, true, function(acquired_building){
		$("#acquired_residential_new").text(acquired_building.numberOfListingsResidentialNew);

		$("#acquired_commercial_new").text(acquired_building.numberOfListingsCommercialNew);

		$("#acquired_residential_total").text(acquired_building.totalOfListingsResidential);

		$("#acquired_commercial_total").text(acquired_building.totalOfListingsCommercial);
		updateLoading();
	});

	post_sync("/report/get-list-overviews-project", postData, true, function(project){
		$("#project_no_of_project").text(project.numberOfProjects);

		$("#project_no_of_listing").text(project.numberOfListings);

		$("#project_no_of_project_total").text(project.totalOfProjects);

		$("#project_no_of_listing_total").text(project.totalOfListings);
		updateLoading();
	});
}


$(document).ready(function () {
   	$("#listing-count-overview-table").DataTable({
        "scrollX": true,
        paging: false,
        searching: false,
    	ordering:  false
    });

    $('.date-overview-status').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
    });

    $('#from-date').on("changeDate", function(e) {
    	postData.fromDate = e.date.getTime();
    	refreshDataTable();
    }).datepicker("update", new Date(postData.fromDate));;

    $('#to-date').on("changeDate", function(e) {
    	postData.toDate = e.date.getTime() + 86400000;
    	refreshDataTable();
    }).datepicker("update", new Date(postData.toDate));
    refreshDataTable();

    $(".btn-export").click(function(){
    	showPropzyLoading();
    	$.post("/report/export-report/listing-count-over--view--for--status", postData, function(response){
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

@stop