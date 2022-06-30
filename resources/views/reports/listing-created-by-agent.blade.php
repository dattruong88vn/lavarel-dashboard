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
						  	<h3 class="box-title">Tin đăng được tạo bởi agent</h3>
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
										<th>Ngày giờ tạo</th>
										<th>Agent</th>
										<th>Link</th>
										<th>Quận</th>
										<th>Loại hình</th>
										<th>Loại BĐS</th>
										<th>Giá</th>
										<th>Diện tích</th>
										<th>Hướng</th>
										<th>Phòng ngủ</th>
										<th>Phòng tắm</th>
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

	var customLinkRender = function ( data, type, object ) {
	    return "<a target='_blank' href='"+ ("{{ PRODUCT_URL }}chi-tiet/dashboard/preview/"+ data) +"'>Chi tiết</a>";
	} 

	$(document).ready(function () {
	  $("#problem-list").DataTable({
	  	"scrollX": true,
	  	"processing": true,
        "serverSide": true,
        "ajax": "/report/get-listing-created-by-agent/<?=$queryString?>",
        "columns": [
        		{ data: 'rlistingId'},
	        	{ data: 'createdDate', render: customRender},
		        { data: 'agentName'},
		        { data: 'rlistingId', render: customLinkRender},
		        { data: 'districtName'},
		        { data: 'listingTypeName'},
		        { data: 'propertyTypeName'},
		        { data: 'formatPrice' },
		        { data: 'formatSize'},
		        { data: 'directionName'},
		        { data: 'bedRooms'},
		        { data: 'bathRooms' }
		    ]
	  });
	  	$(".btn-export").click(function(){
	    	showPropzyLoading();
	    	$.post("/report/export-report/listing-<?=$agentId?>", {
	    		fromDate: <?=$fromDate?>,
	    		toDate: <?=$toDate?>
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