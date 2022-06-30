@extends('layout.default')

@section('content')
<div class='ls-listing-overview'>
	<section></section>
	<section>
		<div class="db-tm-item table-ls-overview">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">TỔNG QUAN SỐ LƯỢNG LISTING</h3>
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
						            	<div id="to-date"  class="input-group date date-overview-status">
										    <input type="text" class="form-control">
										    <div class="input-group-addon">
										        <i class="fa fa-calendar"></i>
										    </div>
										</div>
									</div>
									<div class="col-sm-2">
										<button class="btn-export btn btn-warning">Export to xlsx/csv</button>
									</div>
								</div>
								<div class="form-group">
									<label for="" class="col-sm-2 control-label"></label>
									<div class="col-sm-10">
										<button id="7days-ago" class="btn btn-primary">7 ngày</button>
										<button id="1month-ago" class="btn btn-success margin">1 tháng</button>
										<button id="2months-ago" class="btn btn-warning">2 tháng</button>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-10">
										<button class="btn btn-primary active" onclick="return displayTab('#tab1', this);">MUA</button>
										<button class="btn btn-primary margin" onclick="return displayTab('#tab2', this);">THUÊ - ĐỂ Ở</button>
										<button class="btn btn-primary" onclick="return displayTab('#tab3', this);">THUÊ - THƯƠNG MẠI</button>
									</div>
								</div>
							</form>
							<div id="tab1" class="table-tab col-sm-12">
								<table id="buy-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Quận</th>
											<th>Loại BĐS</th>
											<th> < 1 TỶ</th>
											<th>1-2.5 TỶ</th>
											<th>2.5-5 TỶ</th>
											<th> > 5 TỶ</th>
										</tr>
									</thead>
									<tbody>
									
									</tbody>
								</table>
								<hr>
							</div>
							<div id="tab2" class="table-tab col-sm-12" style="display:none;">
								<table id="rent-residential-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Quận</th>
											<th>Loại BĐS</th>
											<th> < 10 triệu</th>
											<th>10-50 triệu</th>
											<th> > 50 triệu</th>
										</tr>
									</thead>
									<tbody>
										
									</tbody>
								</table>
								<hr>
							</div>
							<div id="tab3" class="table-tab col-sm-12" style="display:none;">
								<table id="rent-commercial-table" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Quận</th>
											<th>Loại BĐS</th>
											<th> < 100k</th>
											<th>100-300k</th>
											<th>300-500k</th>
											<th> > 500k</th>
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
<style type="text/css">
	.child-table-detail {
		width: 100%;
	}
	tr.shown + tr > td{
		padding: 0px;
	}
	.child-table-6cols td {
		width: 16.5%;
		padding: 8px;
	}
	.child-table-6cols > tbody > tr > td:first-child {
		width: 17.5%;
	}

	.child-table-5cols td {
		width: 20%;
		padding: 8px;
	}
	tr button.expand {
		background: url("/images/expand-row.png");
		width: 30px;
	    height: 25px;
	    background-size: 100%;
	    border: none;
	}
	tr.shown button.expand {
		background: url("/images/collapse-row.png");
		background-size: 100%;
	}

	.dataTables_processing
	{
		top: 0px !important;
    	left: 0px !important;
	    width: 100% !important;
	    height: 100% !important;
	    margin-left: 0px !important;
	    margin-top: 0px !important;
	    font-size: 35px !important;
	}
	.btn.btn-primary.active{
		background-color: black;
		border: black;
	}
</style>
<script type="text/javascript">
var currentTime = (new Date()).getTime();
var fromDate = currentTime - (currentTime % 86400000);
var toDate = fromDate + 86400000;

var buyRender = function ( data, type, object,meta ) {
	console.log(object);
    return data;
} 

var nameBuyRender = function ( data, type, object,meta ) {
	total = 0;
	for(i = 0; i < object.list.length; i++)
	total += object.list[i].numberOfListingsUnder1b +
	object.list[i].numberOfListingsUnder25b +
	object.list[i].numberOfListingsUnder5b+
	object.list[i].numberOfListingsOver5b;
    return data + " (" + total + ")";
}

var nameRentResRender = function ( data, type, object,meta ) {
	total = 0;
	for(i = 0; i < object.list.length; i++)
	total += object.list[i].numberOfListingsUnder10m +
	object.list[i].numberOfListingsUnder50m +
	object.list[i].numberOfListingsOver50m;
    return data + " (" + total + ")";
}

var nameRentComRender = function ( data, type, object,meta ) {
	total = 0;
	for(i = 0; i < object.list.length; i++)
	total += object.list[i].numberOfListingsUnder100k +
	object.list[i].numberOfListingsUnder300k +
	object.list[i].numberOfListingsUnder500k+
	object.list[i].numberOfListingsOver500k;
    return data + " (" + total + ")";
}

function formatBuy ( d ) {
    str = '<table class="child-table-detail child-table-6cols" cellspacing="0">';
    for(i = 0; i < d.list.length; i++) {
         str += '<tr>'+
            '<td></td>'+
            '<td>'+d.list[i].properTypeName+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder1b+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder25b+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder5b+'</td>'+
            '<td>'+d.list[i].numberOfListingsOver5b+'</td>'+
        '</tr>';
    }

    str += '</table>';
    return str;
}

function formatRentResidential ( d ) {
    str = '<table class="child-table-detail child-table-5cols" cellspacing="0">';
    for(i = 0; i < d.list.length; i++) {
         str += '<tr>'+
            '<td></td>'+
            '<td>'+d.list[i].properTypeName+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder10m+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder50m+'</td>'+
            '<td>'+d.list[i].numberOfListingsOver50m+'</td>'+
        '</tr>';
    }

    str += '</table>';
    return str;
}
function formatRentCommercial ( d ) {
    str = '<table class="child-table-detail child-table-6cols" cellspacing="0">';
    for(i = 0; i < d.list.length; i++) {
         str += '<tr>'+
            '<td></td>'+
            '<td>'+d.list[i].properTypeName+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder100k+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder300k+'</td>'+
            '<td>'+d.list[i].numberOfListingsUnder500k+'</td>'+
            '<td>'+d.list[i].numberOfListingsOver500k+'</td>'+
        '</tr>';
    }

    str += '</table>';
    return str;
}

function displayTab(tab, element) {
	$(".table-tab").hide();
	$(tab).show().resize();
	$(".btn.btn-primary").removeClass("active");
	$(element).addClass("active");
	refreshData();
	return false;
}
function refreshData() {
	//	showPropzyLoading();
	currentTable = $(".table-tab:visible table:last");
	if(currentTable.is("#buy-table")) {
    	currentTable.DataTable().ajax.url("/report/get-count-sale-overview/" + fromDate + "/" + toDate).load();
	}
    else if(currentTable.is("#rent-residential-table")) {
    	currentTable.DataTable().ajax.url("/report/get-count-rent-residential/" + fromDate + "/" + toDate).load();
    }
    else if(currentTable.is("#rent-commercial-table")) {
    	currentTable.DataTable().ajax.url("/report/get-count-rent-commercial/" + fromDate + "/" + toDate).load();
    }
}
$(document).ready(function () {
	$('.table tbody').on('click', 'button.expand', function () {
        var tr = $(this).closest('tr');
        var row;
        if($(this).closest("table").is("#buy-table"))
        	row = buyTable.row( tr );
        else if($(this).closest("table").is("#rent-residential-table"))
        	row = rentResidentialTable.row( tr );
        else if($(this).closest("table").is("#rent-commercial-table"))
        	row = rentCommercialTable.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            if($(this).closest("table").is("#buy-table"))
	        	row.child( formatBuy(row.data()) ).show();
	        else if($(this).closest("table").is("#rent-residential-table"))
	        	row.child( formatRentResidential(row.data()) ).show();
	        else if($(this).closest("table").is("#rent-commercial-table"))
	        	row.child( formatRentCommercial(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

    var buyTable = $("#buy-table").DataTable({
       	"scrollX": false,
	  	"processing": true,
        "serverSide": true,
        "paging": true,
        "searching": false,
		"ordering":  false,
        "lengthChange": false,
        "ajax": "/report/get-count-sale-overview/" + fromDate + "/" + toDate,	
        "columns": [
	        	{ data: 'districtName', "width": "17.5%", render: nameBuyRender},
		        { data: null, defaultContent: "<button class='expand'></button>", "width": "16.5%"},
		        { data: 'totalsList.totalOfListingsUnder1b', "width": "16.5%"},
		        { data: 'totalsList.totalOfListingsUnder25b', "width": "16.5%"},
		        { data: 'totalsList.totalOfListingsUnder5b', "width": "16.5%"},
		        { data: 'totalsList.totalOfListingsOver5b', "width": "16.5%"}
		],
		fnDrawCallback: function(){
			hidePropzyLoading();
		}
    });

    var rentResidentialTable = $("#rent-residential-table").DataTable({
        "scrollX": true,
	  	"processing": true,
        "serverSide": true,
        "paging": true,
        "searching": false,
		"ordering":  false,
		"lengthChange": false,
        "ajax": "/report/get-count-rent-residential/" + fromDate + "/" + toDate,	
        "columns": [
        	{ data: 'districtName', "width": "20%", render: nameRentResRender},
	        { data: null, defaultContent: "<button class='expand'></button>", "width": "20%"},
	        { data: 'totalsList.totalOfListingUnder10m', "width": "20%"},
	        { data: 'totalsList.totalOfListingsUnder50m', "width": "20%"},
	        { data: 'totalsList.totalOfListingsOver50m', "width": "20%"}
		],
		fnDrawCallback: function(){
			hidePropzyLoading();
		}
    });

    var rentCommercialTable = $("#rent-commercial-table").DataTable({
        "scrollX": true,
	  	"processing": true,
        "serverSide": true,
        "paging": true,
        "searching": false,
		"ordering":  false,
		"lengthChange": false,
        "ajax": "/report/get-count-rent-commercial/" + fromDate + "/" + toDate,	
        "columns": [
        	{ data: 'districtName', "width": "17.5%", render: nameRentComRender},
	        { data: null, defaultContent: "<button class='expand'></button>", "width": "16.5%"},
	        { data: 'totalsList.totalOfListingsUnder100k', "width": "16.5%"},
	        { data: 'totalsList.totalOfListingsUnder300k', "width": "16.5%"},
	        { data: 'totalsList.totalOfListingsUnder500k', "width": "16.5%"},
	        { data: 'totalsList.totalOfListingsOver500k', "width": "16.5%"}
		],
		fnDrawCallback: function(){
			hidePropzyLoading();
		}
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

    $('#7days-ago').click(function(){
    	fromDate = dayAgo(7);
    	$('#from-date').datepicker("update", new Date(fromDate));

    	toDate = currentTime;
    	$('#to-date').datepicker("update", new Date(toDate));
    	refreshData();
    	return false;
    });
    $('#1month-ago').click(function(){
    	fromDate = dayAgo(30);
    	$('#from-date').datepicker("update", new Date(fromDate));

    	toDate = currentTime;
    	$('#to-date').datepicker("update", new Date(toDate));
    	refreshData();
    	return false;
    });
    $('#2months-ago').click(function(){
    	fromDate = dayAgo(60);
    	$('#from-date').datepicker("update", new Date(fromDate));

    	toDate = currentTime;
    	$('#to-date').datepicker("update", new Date(toDate));
    	refreshData();
    	return false;
    });

    $(".btn-export").click(function(){
    	currentTable = $(".table-tab:visible table:last");
    	currentAPI = "agent-count-over--view--for--rent--commercial";
		if(currentTable.is("#buy-table")) {
	    	currentAPI = "agent-count-over--view--for--sale";
		}
	    else if(currentTable.is("#rent-residential-table")) {
	    	currentAPI = "agent-count-over--view--for--rent--residential";
	    }
	    showPropzyLoading();
    	$.post("/report/export-report/" + currentAPI, {
    		fromDate : fromDate,
    		toDate : toDate
    	}, function(response){
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