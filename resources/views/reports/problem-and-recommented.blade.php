@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='problem-recomment'>
	<section></section>
	<section>
		<div class="db-tm-item table-problem-recomment">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
						  	<h3 class="box-title">Lý do và hướng giải quyết.</h3>
						  	<span class="pull-right">
						  		<button class="btn-export btn btn-warning">Export to xlsx/csv</button>
						  	</span>
						</div>
						<div class="box-body">
							<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
							<table id="problem-list" class="table table-bordered table-striped">
								<thead>
									<tr>
										<th>RID</th>
										<th>Ngày giao</th>
										<th>Lý do pending</th>
										<th>Hướng giải quyết</th>
										<th>Tên chủ listing</th>
										<th>Email của chủ listing</th>
										<th>SĐT chủ listing</th>
										<th>Thời gian pending</th>
										<th>Thiết bị</th>
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
<script type="text/javascript">
	var customRender = function ( data, type, object ) {
	    return $.format.date(new Date(data), "dd/MM/yyyy HH:mm:ss");
	} 
	var pendingRender = function ( data, type, object ) {
	    return $.format.prettyDate(new Date(data));
	} 
	$(document).ready(function () {
	  $("#problem-list").DataTable({
	  	"scrollX": true,
	  	"processing": true,
        "serverSide": true,
        "ajax": "/report/get-pending-count/<?=$queryString?>",
        "columns": [
	        	{ data: 'rlistingId' },
		        { data: 'pendingTime', render: customRender},
		        { data: 'reasonName'},
		        { data: 'solutionName'},
		        { data: 'ownerName' },
		        { data: 'ownerEmail'},
		        { data: 'ownerPhone' },
		        { data: 'pendingTime', render: pendingRender},
		        { data: 'deviceName' }
		    ]
	  });

	  $(".btn-export").click(function(){
	  		showPropzyLoading();
	    	$.post("/report/export-report/listing-count-pending", <?=$postData?>, function(response){
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