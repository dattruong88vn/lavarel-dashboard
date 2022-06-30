@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='deal-closed'>
	<section></section>
	<section>
		<div class="db-tm-item table-deal-closed">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">GIAO DỊCH THÀNH CÔNG</h3>
						</div>
						<div class="box-body">
							<form class="form-horizontal">
								<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
							  	<div class="form-group">
							    	<label for="" class="col-sm-2 control-label">From</label>
							    	<div class="col-sm-3">
							        	<div id="from-date" class="input-group date date-overview-status">
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
							<div class="col-sm-6">
								<table id="info-sales" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Agent</th>
											<th>Số deal chốt</th>
											<th>Giá trị deal</th>
										</tr>
									</thead>
									<tbody>
										
									</tbody>
								</table>
							</div>

							<div class="col-sm-12">
								<hr>
								<table id="deal-closed-list" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Chủ listing</th>
											<th>Account manager</th>
											<th>Sales staff</th>
											<th>Listing chốt deal</th>
											<th>Ngày chốt deal</th>
											<th>Loại BĐS</th>
											<th>Giá trị deal</th>
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
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<style type="text/css">
	.explore-agent {
		cursor: pointer;
	}
</style>
<script type="text/javascript">
var currentTime = (new Date()).getTime();
var fromDate = currentTime - (currentTime % 86400000);
var toDate = fromDate + 86400000;

function refreshData() {
	$("#info-sales").DataTable().ajax.url("/report/get-agent-deal/" + fromDate + "/" + toDate).load();
}
function agentBlock( data, type, object, meta) {
	return "<a targetid='"+ object.agentId +"' class='explore-agent'>" + data + "</a>";
}
var dateRender = function ( data, type, object ) {
	    return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
} 
$(document).ready(function () {
    $("#info-sales").on("click", ".explore-agent", function(){
    	agentId = $(this).attr("targetid");
    	$("#deal-closed-list").DataTable().ajax.url("/report/get-closed-deal/" + agentId + "/" + fromDate + "/" + toDate).load();
    	return false;
    });
    $("#info-sales").DataTable({
	  	"scrollX": false,
	  	"processing": true,
        "serverSide": true,
        "paging": false,
        "searching": false,
		"ordering":  false,
        "ajax": "/report/get-agent-deal/" + fromDate + "/" + toDate,	
        "columns": [
	        	{ data: 'agentName', render: agentBlock},
		        { data: 'numberOfDeals'},
		        { data: 'valueOfDeals', render: thousandDelimiterRender}
		]
	});

    $("#deal-closed-list").DataTable({
	  	"scrollX": false,
	  	"processing": true,
        "serverSide": true,
        "paging": false,
        "searching": false,
		"ordering":  false,
        "ajax": "/report/get-closed-deal/-1/" + fromDate + "/" + toDate,	
        "columns": [
	        	{ data: 'ownerListingName'},
		        { data: 'amName'},
		        { data: 'agentName'},
		         { data: 'rlistingId'},
		        { data: 'closedDate', render: dateRender},
		         { data: 'propertyTypeName'},
		        { data: 'formatPrice'}
		]
	});

    $('.date-overview-status').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
    }).datepicker("update", new Date());

    $('#from-date').on("changeDate", function(e) {
    	fromDate = e.date.getTime();
    	refreshData();
    });

    $('#to-date').on("changeDate", function(e) {
    	toDate = e.date.getTime() + 86400000;
    	refreshData();
    });
    $(".btn-export").click(function(){
    	showPropzyLoading();
    	$.post("/report/export-report/closed-overview", { fromDate:fromDate, toDate:toDate }, function(response){
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