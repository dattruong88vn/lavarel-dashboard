@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='listing-qualify'>
	<section></section>
	<section>
		<div class="db-tm-item table-listing-qualify">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">Báo cáo chất lượng tin đăng</h3>
						</div>
						<div class="box-body">
							<form class="form-horizontal">
								<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
								<div class="form-group">
                                    <div class="col-sm-4">
                                        <label>Account manager</label>
                                        <select id="accountManagers" name="accountManagers[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($accountManagers as $am): ?>
                                                <option value={{$am->userId}} <?php echo in_array($am->userId, $currentAms) ? "selected='selected'" : ""; ?> >
                                                    {{$am->name}}
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>Agents</label>
                                        <select id="agents" name="agents[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($agents as $agent): ?>
                                                <option value="{{$agent->agentId}}" <?php echo in_array($agent->agentId, $currentAgents) ? "selected='selected'" : ""; ?> >{{$agent->agentName}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
                                </div>
							  	<div class="form-group">
                                    <div class="col-sm-4">
                                        <label for="">From</label>
                                        <div id="fromDate" class=" date-overview-status input-group date">
                                            <input type="text" class="form-control "  name="fromDate">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <label>To</label>
                                        <div id="toDate" class=" date-overview-status input-group date" >
                                            <input type="text" class="form-control"  name="toDate">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="form-group">
									<div class="col-sm-12">
										<button id="btnSearch" class="btn btn-success">Tìm</button>
										<button class="btn btn-export btn-warning">Export to xlsx/csv</button>
									</div>
								</div>
							</form>
							<hr> 

							<div class="col-sm-12">
								<table id="deal-listing-qualify" class="table table-bordered table-striped">
									<thead>
										<tr>
											<th>Agent</th>
											<th>Email</th>
											<th>Account Manager</th>
											<th>Tổng số tin đăng</th>
											<th>Số Listing ảo</th>
											<th>Số Listing Pending</th>
											<th>Số Listing Reject</th>
											<th>Tỷ lệ</th>
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

<script type="text/javascript">
	var currentTime = (new Date()).getTime();
	var fromDate 	= currentTime - (currentTime % 86400000);
	var toDate = fromDate + 86400000 - 1;
	function dayAgo (numberDay) {
		return currentTime - (numberDay * 86400000) - (currentTime % 86400000)
	}
	function getAgents() {
	    var amIds = $("#accountManagers").val();
	    showPropzyLoading();
	    $.ajax({
	        url: '/report/get-agents',
	        type: 'post',
	        data: JSON.stringify(amIds)
	    }).done(function (response) {
	        var html = '';
	        if (response.result) {
	            for (var x in response.data) {
	                var item = response.data[x];
	                html += "<option value='" + item.agentId + "' >" + item.agentName + "</option>"
	            }
	        }
	        $("#agents").html(html).select2();
	        $("#districts").html("").select2();
	    }).always(function () {
	        hidePropzyLoading();
	    });

	}
	function loadAgentActivitesDataTable(userIdsList, agentIdsList, fromDate, toDate) {
	    $("#deal-listing-qualify").DataTable()
       .ajax.url("/report/get-listing-qualify/" + userIdsList + "/" +agentIdsList  + "/" +  fromDate + "/" +  toDate)
       .load();
	}
	var  proportionRender = function ( data, type, object,meta ) {
		if(data != "N/A") {
			return (data * 100) + "%";
		}
		else {
			return "--";
		}
		
	}
	$(document).ready(function () {
		$("#deal-listing-qualify").DataTable({
	        "processing": true,
	        "serverSide": true,
	        "ajax": "/report/get-listing-qualify///" + fromDate+ "/" + toDate,
	        "scrollX": true, 
	        "columns": [
	        	{ data: 'agentName' },
		        { data: 'email' },
		        { data: 'amName'},
		        { data: 'totalOfListings'},
		        { data: 'numberOfListingsUnreal'},
		        { data: 'numberOfListingsPending'},
		        { data: 'numberOfListingsReject'},
		        { data: 'proportion', render: proportionRender }
		    ]
	    });

	    $("#accountManagers").change(function () {
	        getAgents();
	    });

	    $('.date-overview-status').datepicker({
	        format: 'dd-mm-yyyy',
	        autoclose: true
	    }).datepicker("update", new Date());

	    $('#fromDate').on("changeDate", function(e) {
	    	fromDate = e.date.getTime();
	    }).change(function(){
	    	if($(this).find("input").val().length == 0) {
	    		fromDate = 0;
	    	}
	    });

	    $('#toDate').on("changeDate", function(e) {
	    	toDate = e.date.getTime() + 86400000 - 1;
	    }).change(function(){
	    	if($(this).find("input").val().length == 0) {
	    		toDate = currentTime;
	    	}
	    });

	    $("#btnSearch").on("click", function (event) {
	        var accountManagers = $("#accountManagers").val();
	        if(accountManagers)
	        	accountManagers = accountManagers.join("-");
	        else accountManagers = "";
	        var agents = $("#agents").val();
	        if(agents)
	        	agents = agents.join("-");
	        else agents = "";

	        if (accountManagers === null && agents === null && fromDate==="" && toDate==="") {
	            showPropzyAlert("Chọn điều kiện tìm kiếm");
	            event.preventDefault();
	            return;
	        }
	        loadAgentActivitesDataTable(accountManagers, agents, fromDate, toDate);
	        return false;
	    });

	    $(".btn-export").click(function(){
	    	postData = {
	    		fromDate :fromDate,
	    		toDate : toDate
	    	};

	    	var userIdsList = $("#accountManagers").val();
	        if(userIdsList) {
	        	postData.userIdsList = userIdsList;
	        }
	        else {
	        	postData.userIdsList = [];
	        }
	        
	        var agentIdsList = $("#agents").val();
	        if(agentIdsList) {
	        	postData.agentIdsList = agentIdsList;
	        }
	        else {
	        	postData.agentIdsList = [];
	        }

	    	showPropzyLoading();
	    	$.post("/report/export-report/listing-quality", postData, function(response){
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