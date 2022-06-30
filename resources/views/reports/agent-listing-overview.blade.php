@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-listing-overview'>
	<section></section>
	<section>
		<div class="db-tm-item table-listing-overview">
     		<div class="row">
		        <div class="col-md-12">                
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">Tổng quan tin đăng của agent</h3>
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
                                    <div class="col-sm-4">
                                        <label>Khu vực</label>
                                        <select id="districts" name="districts[]" class="form-control select2" multiple="multiple">
                                            <?php foreach ($all_districts as $district): ?>
                                                <option value="{{$district->districtId}}" <?php echo in_array($district->districtId, $currentDistricts) ? "selected='selected'" : ""; ?> >{{$district->districtName}}</option>
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
                                    <div class="col-sm-4">
										<button id="7days-ago" class="btn btn-primary">7 ngày</button>
										<button id="1month-ago" class="btn btn-success margin">1 tháng</button>
										<button id="2months-ago" class="btn btn-warning">2 tháng</button>
								</div>
                                </div>
                                <div class="form-group">
									<div class="col-sm-12">
										<button id="btnSearch" class="btn btn-success">Tìm</button>
										<button class="btn btn-export btn-warning">Export to xlsx/csv</button>
									</div>
								</div>
							</form>
							<br/>
							<table id="overview-list" class="table table-bordered table-striped">
								<thead>
									<tr>
										<th>Account Manager</th>
										<th>Tên môi giới</th>
										<th>Quận</th>
										<th>Số listing</th>
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

	       data = {
	        	url : '/report/get-agents-districts',
		        type : "post",
		        data :  JSON.stringify({
		        	agentIdsList : $("#agents").val(),
		        	userIdsList : $("#accountManagers").val()
		        })
		    }
	        $.ajax(data).done(function (response) {
	            loadDistricts(response);
	        }).always(function () {
	            hidePropzyLoading();
	        });
	    }).always(function () {
	        hidePropzyLoading();
	    });
	}
	function loadAgentActivitesDataTable(userIdsList, agentIdsList, districtsList, fromDate, toDate) {
	    $("#overview-list").DataTable()
       .ajax.url("/report/get-agent-listing-overview/" + userIdsList + "/" +agentIdsList + "/" + districtsList + "/" +  fromDate + "/" +  toDate)
       .load();
	}
	var  districtNameRender = function ( data, type, object,meta ) {
		nameArray = [];
		$(data).each(function(idx,element){
			nameArray.push(element.districtName);
		});
		return nameArray.join(", ");
	}

	var  linkRender = function ( data, type, object,meta ) {
		if(data > 0)
		return "<a target='_blank' href='/report/listing-created-by-agent/"+ object.agentId +"/"+ fromDate +"/"+ toDate +"'>"+data+"</a>";
		return data;
	}
	var loadDistricts = function(response) {
		var html = '';
        if (response.result) {
            for (var x in response.data) {
                var item = response.data[x];
                html += "<option value='" + item.districtID + "'>" + item.districtName + "</option>";
            }

        }
        $("#districts").html(html);
	}
	$(document).ready(function () {
		$.ajaxSetup({
	        headers: {
	            'X-CSRF-TOKEN': $('#_token').val()
	        }
	    });
		$("#overview-list").DataTable({
	        "processing": true,
	        "serverSide": true,
	        "ajax": "/report/get-agent-listing-overview/-1/-1/-1/-1/-1",
	        "scrollX": false, 
			"searching": false,
        	"lengthChange": false,
        	"pageLength": 50,
	        "columns": [
	        	{ data: 'amName' , width: '20%'},
		        { data: 'agentName' , width: '20%' },
		        { data: 'districtsList', render: districtNameRender , width: '50%'},
		        { data: 'numberOfListings' , width: '10%', render: linkRender}
		    ]
	    });

	    $("#accountManagers").change(function () {
	        getAgents();
	    });
	    $("#agents").change(function () {
	        var agentIds = $(this).val();
	        $.ajaxSetup({
	            headers: {
	                'X-CSRF-TOKEN': $('#_token').val()
	            }
	        });
	        showPropzyLoading();
	        data = {
	        	url : '/report/get-agents-districts',
		        type : "post",
		        data :  JSON.stringify({
		        	agentIdsList : agentIds,
		        	userIdsList : $("#accountManagers").val()
		        })
		    }
	        $.ajax(data).done(function (response) {
	            loadDistricts(response);
	        }).always(function () {
	            hidePropzyLoading();
	        });
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
	        
	        var districts = $("#districts").val();
	        if(districts)
	        	districts = districts.join("-");
	        else districts = "";

	        if (accountManagers === null && agents === null && districts === null && fromDate==="" && toDate==="") {
	            showPropzyAlert("Chọn điều kiện tìm kiếm");
	            event.preventDefault();
	            return;
	        }
	        loadAgentActivitesDataTable(accountManagers, agents, districts, fromDate, toDate);
	        return false;
	    });

		$('#7days-ago').click(function(){
	    	fromDate = dayAgo(7);
	    	$('#fromDate').datepicker("update", new Date(fromDate));

	    	toDate = currentTime;
	    	$('#toDate').datepicker("update", new Date(toDate));
	    	return false;
	    });
	    $('#1month-ago').click(function(){
	    	fromDate = dayAgo(30);
	    	$('#fromDate').datepicker("update", new Date(fromDate));

	    	toDate = currentTime;
	    	$('#toDate').datepicker("update", new Date(toDate));
	    	return false;
	    });
	    $('#2months-ago').click(function(){
	    	fromDate = dayAgo(60);
	    	$('#fromDate').datepicker("update", new Date(fromDate));

	    	toDate = currentTime;
	    	$('#toDate').datepicker("update", new Date(toDate));
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
	        
	        var districtsList = $("#districts").val();
	        if(districtsList) {
	        	postData.districtsList = districtsList;
	        }
	        else {
	        	postData.districtsList = [];
	        }

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
	});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop