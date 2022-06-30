@extends('layout.default')

@section('content')
	<div class="management-deal form-horizontal">
		<div class="deal-source">
			<div class="box box-primary">
				<div class="box-header with-border">
		            <h3 class="box-title">PHÂN BỐ DEAL THEO NGUỒN</h3>
		        </div>
		        <div class="box-body">
		        	<div class="nav-tabs-custom nav-group">
					 	<ul class="nav nav-tabs">
						    <li class="active"><a see-type="info" href="#tab_1" data-toggle="tab" aria-expanded="true">Xem thông tin</a></li>
						    <li class=""><a see-type="compare"  href="#tab_2" data-toggle="tab" aria-expanded="false">So sánh</a></li>
					  	</ul>
					  	<div class="tab-content">
					  		<input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
						    <div class="tab-pane active" id="tab_1">
						      	<div class="bl-verify">
					        		<div class="row">
					        			<div class="col-sm-12">
					        				@include('graph-reports._from_to_date')
					        			</div>
					        		</div>
					        	</div>
					        	<div class="bl-chart-1">
					        		<div class="row">
					        			<div class="col-sm-6">
					        				<div class="text-center chart">
					        					<div class="chart" id="listing-chart" style="width:500px;height:350px;position: relative;line-height: 400px;"></div>
	                          					<span id="title-listing-chart"></span>
					        				</div>
					        			</div>
					        			<div class="col-sm-6">
					        				<div class="text-center chart">
					        					<div class="chart" id="listing-chart-2" style="width:500px;height:350px;position: relative;line-height: 400px;"></div>
	                          					<span id="title-listing-chart-2"></span>
					        				</div>
					        				<br>
					        			</div>
					        		</div>
				        		</div>
				        		<div class="row">
				        			<div id="dealBySourceContainer" class="col-sm-12" style="display: none;">
				        				<table id="dealBySource" class="table table-bordered table-striped">
								            <thead>
								                <tr>
								                    <th>STT</th>
								                    <th>TÊN KH</th>
								                    <th>MÃ KH</th>
								                    <th>PHONE</th>
								                    <th>EMAIL</th>
								                    <th>TÊN TM</th>
								                    <th>TRẠNG THÁI</th>
								                    <th>NGÀY TẠO</th>
								                    <th>NGÀY CẬP NHẬT</th>
								                    <th>NGÂN SÁCH DỰ TRÙ</th>
								                    <th>LOẠI GD</th>
								                    <th>LOẠI BĐS</th>
								                </tr>
								            </thead>
								            <tbody>
								            	<tr>
								            	
								            	</tr>
								            </tbody>
								        </table>
				        			</div>
			        		</div>
						    </div>

						    <div class="tab-pane" id="tab_2">
						      	<div class="bl-verify">
					        		<div class="row">
					        			<div class="col-sm-12">
					        				@include('graph-reports._compare_month')
					        			</div>
					        		</div>
					        	</div>
					        	<div class="bl-chart-2">
				                    <div class="row">
				                      <div class="col-sm-2">
				                        <div class="form-group month-select-group dynamic-select-group">
				                          <div class="col-sm-12 bl-group-select">
				                            <div class="form-group">
				                              <div class="col-sm-12">
				                                <div class="button-group text-center margin">
				                                  <label>CÁC MỐC</label>
				                                  <button target="select-month" class="btn btn-danger btn-remove">-</button>
				                                  <button target="select-month" class="btn btn-success btn-add">+</button>
				                                </div>
				                                <div id="select-month-container" class="row">
				                                </div>
				                              </div>
				                            </div>
				                          </div>
				                        </div>

				                        <div class="form-group quarter-select-group dynamic-select-group" style="display: none;">
				                          <div class="col-sm-12 bl-group-select">
				                            <div class="form-group">
				                              <div class="col-sm-12">
				                                <div class="button-group text-center margin">
				                                  <label>CÁC MỐC</label>
				                                  <button target="select-quarter" class="btn btn-danger btn-remove">-</button>
				                                  <button target="select-quarter" class="btn btn-success btn-add">+</button>
				                                </div>
				                                <div id="select-quarter-container" class="row"></div> 
				                              </div>
				                            </div>
				                          </div>
				                        </div>
				                      </div>
				                      <div class="col-sm-10">
				                        <div class="col-sm-12">
				                          <div class="text-center chart">
				                            <div class="chart" id="chart-col-left" style="height: 380px;width:100%; position: relative;"></div>
				                            <span id="title-chart-col-left"></span>
				                          </div>
				                        </div>
				                        <div class="col-sm-12">
				                          <div class="text-center chart">
				                            <div class="chart" id="chart-col-right" style="height: 380px;width:100%; position: relative;"></div>
				                            <span id="title-chart-col-right"></span>
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
	    </div>

	    <div class="lead-area">
		    <div class="box box-primary">
				<div class="box-header with-border">
		            <h3 class="box-title">PHÂN BỐ DEAL THEO KHU VỰC</h3>
		        </div>
		        <div class="box-body">
		        	<div class="bl-verify">
		        		<div class="row">
		        			<div class="col-sm-12">
		        				@include('graph-reports._area_select')
		        			</div>
		        		</div>
		        	</div>

		        	<div class="bl-table">
		        		<div class="row">
		        			<div class="col-sm-6">
		        				<table id="table-distribution-by-region" class="table table-bordered table-striped">
						            <thead>
						                <tr>
						                	<th>#</th>
						                    <th>KHU VỰC</th>
						                    <th>TỔNG SỐ LISTING</th>
						                    <th>TỔNG SỐ LEAD</th>
						                </tr>
						            </thead>
						            <tbody>

						            </tbody>
						        </table>
		        			</div>
		        			<div id="table-distribution-by-region-customer-container" class="col-sm-12">
		        				<table id="table-distribution-by-region-customer" class="table table-bordered table-striped">
						            <thead>
						                <tr>
						                    <th>STT</th>
						                    <th>TÊN KH</th>
						                    <th>MÃ KH</th>
						                    <th>PHONE</th>
						                    <th>EMAIL</th>
						                    <th>TÊN TM</th>
						                    <th>TRẠNG THÁI</th>
						                    <th>NGÀY TẠO</th>
						                    <th>NGÀY CẬP NHẬT</th>
						                    <th>NGÂN SÁCH DỰ TRÙ</th>
						                    <th>LOẠI GD</th>
						                    <th>LOẠI BĐS</th>
						                </tr>
						            </thead>
						            <tbody>
						            	<tr>
						            	
						            	</tr>
						            </tbody>
						        </table>
		        			</div>
		        			<div id="table-heatmap-container" class="col-sm-12">
		        				<h1>HEATMAP</h1>
		        				<div id="heatmap" style="width: 100%; height: 500px;"></div>
		        				<table id="table-heatmap" class="table table-bordered table-striped ">
						            <thead>
						                <tr>
						                	<th>#</th>
						                    
						                    <th>KHU VỰC</th>
						                    
						                    <th class="text-center">
						                    	GIÁ TRỊ < 1 TỶ <br/>
						                    	LISTING | LEAD
						                    </th>
						                    <th class="text-center">
						                    	1,1 TỶ --> 1,5 TỶ <br/>
						                    	LISTING | LEAD
						                    </th>
						                    <th class="text-center">
						                    	>2 TỶ TRỞ LÊN <br/>
						                    	LISTING | LEAD
						                    </th>
						                </tr>
						            </thead>
						            <tbody>
						            	<tr>
						            		
						            	</tr>
						            </tbody>
						        </table>
		        			</div>
		        		</div>
		        		
		        	</div>
		        </div>
		    </div>
	    </div>
	    <div class="sale-funnel">
		    <div class="box box-primary">
				<div class="box-header with-border">
		            <h3 class="box-title">SALE FUNNEL</h3>
		        </div>
		        <div class="box-body">
		        	<div class="bl-verify">
		        		<div class="row">
		        			<div class="col-sm-12">
		        				<div class="form-group">
		        					<div class="col-sm-2">
		        						<div class="from-group">
					        				<select id="listingTypes" class="form-control select2" data-placeholder="Tất cả các hình thức GD">
					        					<option value="0">Hình thức GD</option>
					        					<option value="1">Mua</option>
					        					<option value="2">Thuê</option>
					        				</select>
				        				</div>
			        				</div>
			        				<div class="col-sm-2">
			        					<div class="form-group">
					        				<select id="propertyTypes" class="form-control select2" multiple="multiple" data-placeholder="Loại BĐS">
					        					<?php foreach ($propertyTypes as $key => $property) { ?>
					        						<option value="<?=$property->propertyTypeID?>"><?=$property->typeName?></option>
					        					<?php } ?>
					        				</select>
				        				</div>
			        				</div>
			        				<div class="col-sm-2">
			        					<div class="form-group">
					        				<select id="transactionType" class="form-control select2" data-placeholder="Tất cả các loại giao dịch">
					        					<option value="0">Loại giao dịch</option>
					        					<option value="3">A2A</option>
					        					<option value="2">CS</option>
					        				</select>
				        				</div>
			        				</div>
			        				<div id="agentIdsContainer" class="col-sm-3" style="display: none;">
			        					<div class="form-group">
					        				<select id="agentIds" class="form-control select2" multiple="multiple" data-placeholder="Tất cả các SALES">
												<?php foreach ($allAgents as $key => $agent) { ?>
					        					<option value="<?=$agent->agentId?>"><?=$agent->name?></option>
					        					<?php } ?>
					        				</select>
				        				</div>
			        				</div>
			        				<div id="saleIdsContainer" class="col-sm-3" style="display: none;">
			        					<div class="form-group">
					        				<select id="saleIds" class="form-control select2" multiple="multiple" data-placeholder="Tất cả các MG">
					        					<?php foreach ($allSales as $key => $agent) { ?>
					        					<option value="<?=$agent->agentId?>"><?=$agent->name?></option>
					        					<?php } ?>
					        				</select>
				        				</div>
			        				</div>
			        				<div id="saleIdsContainer" class="col-sm-2">
			        					<div class="form-group">
					        				<button class="form-control btn btn-success">Xử lý</button>
				        				</div>
			        				</div>
		        				</div>
		        				
		        			</div>
		        		</div>
		        	</div>
		        	<div class="bl-table">
		        		<div class="row">
		        			<div class="col-sm-12">
		        				<div id="funnel-container" style="height: 600px;"></div>
		        				<div id="table-sale-funnel-container" style="display: none;">
			        				<table id="table-sale-funnel" class="table table-bordered table-striped">
							            <thead>
							                <tr>
							                    <th>STT</th>
							                    <th>TÊN KH</th>
							                    <th>MÃ KH</th>
							                    <th>GIÁ TRỊ</th>
							                    <th>TÊN TM</th>
							                    <th>TÊN MG THAM GIA</th>
							                    <th>NGÀY TẠO</th>
							                    <th>NGÀY CẬP NHẬT</th>
							                    <th>SỐ NGÀY THÀNH DEAL</th>
							                    <th>NGÂN SÁCH</th>
							                    <th>EMAIL</th>
							                    <th>SĐT</th>
							                </tr>
							            </thead>
							            <tbody>
							            	<tr>

							            	</tr>
							            </tbody>
							        </table>
								</div>
						        <br>
						        <div id="table-sale-funnel-reason-container" style="display: none;">
							        <table id="table-sale-funnel-reason" class="table table-bordered table-striped">
							            <thead>
							                <tr>
							                    <th>STT</th>
							                    <th>TÊN KH</th>
							                    <th>MÃ KH</th>
							                    <th>GIÁ TRỊ</th>
							                    <th>TÊN TM</th>
							                    <th>TÊN MG THAM GIA</th>
							                    <th>LÝ DO</th>
							                    <th>NGÀY TẠO</th>
							                    <th>NGÀY CẬP NHẬT</th>
							                    <th>SỐ NGÀY THÀNH DEAL</th>
							                    <th>NGÂN SÁCH</th>
							                    <th>EMAIL</th>
							                    <th>SĐT</th>
							                </tr>
							            </thead>
							            <tbody>
							            	<tr>
							            		
							            	</tr>
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
@stop

@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>

<script src="{{loadAsset("/plugins/raphael/raphael-min.js")}}"></script>
<script src="{{loadAsset("/plugins/morris/morris.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://maps.google.com/maps/api/js?key=AIzaSyCk7WmvVHbAB0eRskXYzizEd-tEbxuyZxg"></script>
<script src="{{loadAsset("/js/gmap3.min.js")}}"></script>

<script src="{{loadAsset("/js/d3.min.js")}}"></script>
<script src="{{loadAsset("/js/d3-funnel.min.js")}}"></script>

<script type="text/javascript">
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  var target = $(e.target).attr("see-type") 
	  if(target == "compare") {
	  	drawColCharts();
	  }
	  else if(target == "info") {
	  	drawCharts();
	  }
	});
</script>
<script type="text/javascript">
    var charts = <?=json_encode($chart)?>;
    var colChart = <?=json_encode($colChart)?>;
    var distribute = <?=json_encode($distribute)?>;
    var propertyTypes = <?=json_encode($propertyTypes)?>;
    function clickOnChart(selectedItem, chartId, position) {
    	sourceId = selectedItem.type;
    	$("#dealBySourceContainer").show();
    	$("#dealBySource").DataTable()
            .ajax.url("/report/get-management-report-deal-by-source/"+ sourceId +"/" + postData.fromDate + "/" + postData.toDate + "/" + position)
            .load();
    }
    var drawAllCharts = function (){
    	drawCharts();
    	drawSaleFunnelCharts();
    }
    function drawCharts() {
      loadDataChart('listing-chart', charts.chartLeft.chartName, charts.chartLeft.chartItems)
      loadDataChart('listing-chart-2', charts.chartRight.chartName, charts.chartRight.chartItems)
    }

    var refreshDateData = function(){
        showPropzyLoading();
        $.post("/report/get-management-report-deal", postData, function (response) {
            charts = response;
            drawCharts();
            $("#dealBySourceContainer").hide();
            hidePropzyLoading();
        });
    }
    
    $("#dealBySource").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": "/report/get-management-report-default-table-value",
        "columns": [
	        	{ data: null, render: renderIndex},
		        { data: 'name'},
		        { data: 'customerId'},
		        { data: 'phone' },
		        { data: 'email'},
		        { data: 'tmName' },
		        { data: 'sourceName'},
		        { data: 'createdDate', render: dateConvertRender },
		        { data: 'updatedDate', render: dateConvertRender},
		        { data: 'initialBudget', render: thousandDelimiterRender },
		        { data: 'listingTypeName' },
		        { data: 'propertyTypeName'}
		    ]
	  });

    var regionChangeFired = function(){
    	$("#table-distribution-by-region").DataTable({
		  	"scrollX": true,
		"pageLength": 5,
		  	"processing": true,
	        "serverSide": true,
	        "ajax": {
			    "url": '/report/get-management-report-default-table-value',
			    "type": 'POST',
			    "data": postData
			},
	        "columns": [
		        	{ data: 'areaName'},
			        { data: 'numberListing'},
			        { data: 'numberDeal'},
			    ]
		  });
    }
</script>
@include('graph-reports._draw_chart_js')

<script type="text/javascript">
	var columnChart = [];
	var columnPostData = {
		dateItems : []
	}

	var reloadCompareData = function(){
		columnPostData.dateItems = [];
		$(".dynamic-select-group:visible select option:selected").each(function(idx, optionElement){
			columnPostData.dateItems.push({
				fromDate: $(optionElement).attr("fromdate"),
				toDate: $(optionElement).attr("todate")
			});
		});
		columnPostData.dateItems = JSON.stringify(columnPostData.dateItems);

		showPropzyLoading();
        $.post("/report/get-management-report-deal-compare", columnPostData, function (colChart) {
            drawColChart("chart-col-left", colChart.chartLeft.chartName, colChart.chartLeft.chartColumnItems);
            drawColChart("chart-col-right", colChart.chartRight.chartName, colChart.chartRight.chartColumnItems);
            hidePropzyLoading();
        });
	}
	var drawColCharts = function() {
		drawColChart("chart-col-left", colChart.chartLeft.chartName, colChart.chartLeft.chartColumnItems);
       	drawColChart("chart-col-right", colChart.chartRight.chartName, colChart.chartRight.chartColumnItems);
	}
</script>

@include('graph-reports._draw_col_chart_js')

<script type="text/javascript">
	// Region change
	var customNumberDealRender = function ( data, type, object ) {
	    return "<a href='#' onclick='return renderRegionCustomer("+ object.id +", \""+ object.type +"\")'>" + data + "</a>";
	} 
	var customAreaRender = function ( data, type, object ) {
		return object.type == "ward" ? data : "<a href='#' onclick='return loadDataRegionHeatmap("+ object.id +")'>" + data + "</a>";	    
	} 

	$("#table-distribution-by-region").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": {
		    url: '/report/get-management-report-default-table-value',
		    type: 'POST',
		    data: function ( d ) {
		      return $.extend( postData, d );
		    }
		},
        "columns": [
        		{ data: null, render: renderIndex},
	        	{ data: 'areaName', render: customAreaRender},
		        { data: 'numberListing'},
		        { data: 'numberDeal', render: customNumberDealRender},
		    ]
	});

	var regionChangeFired = function(){
		$("#table-distribution-by-region-customer-container").hide();
		$("#table-heatmap-container").hide();
		$("#table-distribution-by-region").DataTable()
            .ajax.url("/report/get-management-report-deal-distribution").load();
    }
    regionChangeFired();

    $("#table-distribution-by-region-customer").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": {
		    url: '/report/get-management-report-default-table-value',
		    type: 'POST',
		    data: function ( d ) {
		      return $.extend( postData, d );
		    }
		},
        "columns": [
        		{ data: null, render: renderIndex},
		        { data: 'name'},
		        { data: 'customerId'},
		        { data: 'phone' },
		        { data: 'email'},
		        { data: 'tmName' },
		        { data: 'sourceName'},
		        { data: 'createdDate', render: dateConvertRender },
		        { data: 'updatedDate', render: dateConvertRender},
		        { data: 'initialBudget', render: thousandDelimiterRender },
		        { data: 'listingTypeName' },
		        { data: 'propertyTypeName'}
		    ]
	});

    var renderRegionCustomer = function (objectId, objectType) {
    	postData.areaType = objectType;
    	postData.areaId = objectId;
    	$("#table-heatmap-container").hide();
    	$("#table-distribution-by-region-customer-container").show().resize();
    	$("#table-distribution-by-region-customer").DataTable()
            .ajax.url("/report/get-management-report-deal-distribution-customer").load();
        return false;
    }
    var postDataHeatMap;
    $("#table-heatmap").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": {
		    url: '/report/get-management-report-default-table-value',
		    type: 'POST',
		    data: function ( d ) {
		      return $.extend( postDataHeatMap, d );
		    }
		},
        "columns": [
    		{ data: null, render: renderIndex},
	        { data: 'areaName'},
	        { data: 'price1'},
	        { data: 'price2' },
	        { data: 'price3'}
	    ]
	});

	var date, heatmap, tableData, currentData;
	var color = ["92357C","592B67","6A3E78","7C5388","8E6999","A17DAC","BE9BC9","D6B1E2","34123F","25082E"];
	var levelArray = ['2F','3F','4F','5F', '6F','7F','9F', 'AF','BF', 'DF','EF'];

	var map = new google.maps.Map(document.getElementById('heatmap'), {
      center: {lat: 10.7755005, lng: 106.6798501},
      zoom:10,
	  scrollwheel: false
    });
	var arrayKml = [];
	function removeAllKmlLayer() {
		$(arrayKml).each(function(idx, kmlLayer){
			kmlLayer.setMap(null);
		});
		arrayKml = [];
	}

	function addKmlLayer(drawData) {
		
		layerData = [];

		$(drawData).each(function(idx, element){
			if(element.value > 0) {
				step = Math.floor(parseFloat(element.value) / maxValue * 10);
				
				element.name = strToSlug(element.name.replace(/\s/g,""));
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
	}

    function drawMap(drawData, maxValue) {
    	date = new Date();
		removeAllKmlLayer();
		addKmlLayer(drawData);
	}

    var loadDataRegionHeatmap = function(objectId) {
    	$("#table-distribution-by-region-customer-container").hide();
    	$("#table-heatmap-container").show().resize();
		regionDistributionHeatMapData = $("#table-distribution-by-region").DataTable().data();
		$(regionDistributionHeatMapData).each(function(idx, element){
			if(element.id == objectId) {
				postDataHeatMap = JSON.parse(JSON.stringify(postData));

				if(!postDataHeatMap.regionIdsList) {
					postDataHeatMap.regionIdsList = [objectId];
				}
				else if(!postDataHeatMap.cityIdsList) {
					postDataHeatMap.cityIdsList = [objectId];
				}
				else if(!postDataHeatMap.districtIdsList) {
					postDataHeatMap.districtIdsList = [objectId];
				}

				$("#table-heatmap").DataTable()
            		.ajax.url("/report/get-management-report-deal-distribution").load();
            	if(!!postDataHeatMap.regionIdsList && !!postDataHeatMap.cityIdsList && !postDataHeatMap.districtIdsList) {
	            	$.post("/report/get-management-report-deal-distribution", $.extend(postDataHeatMap, {perpage : 1000000}), function (response) {
			           	$("#heatmap").show();
			           	google.maps.event.trigger(map, "resize");

			           	drawData = [];
						maxValue = 0;
						$(response.data).each(function(idx, element){
							drawData.push({ name : element.areaName , value: element.numberListing});
							if(maxValue < element.numberListing) {
								maxValue = element.numberListing;
							}
						});
						drawMap(drawData, maxValue);
			        });
	            } else {
	            	$("#heatmap").hide();
	            }
				return false;
			}
		});
		return false;
	}
</script>
<!-- Sale funnel -->
<script type="text/javascript">
	var funnelColors = ["#3cb878", "#605ca8", "#a186be", "#a864a8", "#630460","#9e005d", "#f26d7d", "#ed145b", "#9e0039", "#ed1c24", "#f26c4f", "#fff568"];

	var sale_funnel =  <?=json_encode($sale_funnel)?>;

	var drawSaleFunnelCharts = function(funnelData, originalData){
		funnelData = [["Element", "Số deal", { role: "style" } ]];

		$(sale_funnel).each(function(idx, element){
			funnelData.push([
				element.name, 
				element.numberDeals, 
				//element.amountDeal,
				funnelColors[idx % (funnelColors.length - 1)]
			]);
		});

		var data = google.visualization.arrayToDataTable(funnelData);

	    var view = new google.visualization.DataView(data);

		var options = {
			title: "",
			bar: {groupWidth: "95%"},
			legend: { position: "none" },
			chartArea: {
				top: 10,
				left: 400,
				height: 600
			}
		};

		var chart = new google.visualization.BarChart(document.getElementById("funnel-container"));
		google.visualization.events.addListener(chart, 'select', function(){
			var selectedItem = chart.getSelection()[0];
			if (!!selectedItem) {
				clickOnBarFunnel(sale_funnel[selectedItem.row]);
			}
		});

		chart.draw(view, options);
	}

	
	var saleFunnelPostData = { };

	$("#table-sale-funnel").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": {
		    url: '/report/get-management-report-default-table-value',
		    type: 'POST',
		    data: function ( d ) {
		      return $.extend( saleFunnelPostData, d );
		    }
		},
        "columns": [
        		{ data: null, render: renderIndex},
		        { data: 'name'},
		        { data: 'customerId'},
		        { data: 'value' },
		        { data: 'tmName'},
		        { data: 'agentServeName' },
		        { data: 'createdDate', render: dateConvertRender },
		        { data: 'updatedDate', render: dateConvertRender},
		        { data: 'dateLeadToDeal'},
		        { data: 'initialBudget' },
		        { data: 'email'},
		        { data: 'phone'}
		    ]
	});

	$("#table-sale-funnel-reason").DataTable({
	  	"scrollX": true,
		"pageLength": 5,
	  	"processing": true,
        "serverSide": true,
        "ajax": {
		    url: '/report/get-management-report-default-table-value',
		    type: 'POST',
		    data: function ( d ) {
		      return $.extend( saleFunnelPostData, d );
		    }
		},
        "columns": [
        		{ data: null, render: renderIndex},
		        { data: 'name'},
		        { data: 'customerId'},
		        { data: 'value' },
		        { data: 'tmName'},
		        { data: 'agentServeName' },
		        { data: 'reasonName' },
		        { data: 'createdDate', render: dateConvertRender },
		        { data: 'updatedDate', render: dateConvertRender},
		        { data: 'dateLeadToDeal'},
		        { data: 'initialBudget' },
		        { data: 'email'},
		        { data: 'phone'}	
		    ]
	});

	agentIdsContainer
saleIdsContainer
	$("#listingTypes").change(function(){
		dataDisplay = [];
		data = $(this).val();
		str = "";
		$(propertyTypes).each(function(propertyIdx,property){
			if(data > 0) {
				if(data == property.listingType.listingTypeID) {
					str += '<option value="'+ property.propertyTypeID +'">'+ property.typeName +'</option>';
				}
			}
			else {
				str += '<option value="'+ property.propertyTypeID +'">'+ property.typeName +'</option>';
			}			
		});
		$("#propertyTypes").html(str).select2();
	});

	$("#transactionType").change(function(){
		self = $(this).val();
		if(self > 0) {
			if(self == "3") {
				$("#agentIdsContainer").show();
				$("#saleIdsContainer").hide();
			} else {
				$("#agentIdsContainer").hide();
				$("#saleIdsContainer").show();
			}
		}
		else {
			$("#agentIdsContainer").hide();
			$("#saleIdsContainer").hide();
		}
		$("#agentIds").select2('val', '');
		$("#saleIds").select2('val', '');
	});

	function clickOnBarFunnel(data) {
		saleFunnelPostData = {
			fromDate: postData.fromDate,
			toDate: postData.toDate,
			statusId: data.id,
		}

		if($("#transactionType").val() > 0) {
			saleFunnelPostData.dealTypeId = $("#transactionType").val()
		}

		if($("#listingTypes").val() > 0) {
			saleFunnelPostData.listingTypeIdsList = $("#listingTypes").val().join(",")
		}

		if($("#propertyTypes").val() > 0) {
			saleFunnelPostData.propertyTypeIdsList = $("#propertyTypes").val().join(",")
		}

		if(saleFunnelPostData.dealTypeId > 0) {
			if(saleFunnelPostData.dealTypeId == 3) {
				saleFunnelPostData.agentIdsList = $("#agentIds").val().join(",")
			}
			else {
				saleFunnelPostData.agentIdsList = $("#saleIds").val().join(",")
			}
		}
		else {
			saleFunnelPostData.agentIdsList = [];
		}
		
		console.log(saleFunnelPostData);
		$.post("/report/get-management-report-deal-sale-customer", saleFunnelPostData , function (response) {
			if(saleFunnelPostData.statusId === 11 || saleFunnelPostData.statusId === 10) {
				$("#table-sale-funnel-container").hide();
				$("#table-sale-funnel-reason-container").show();

		     	$("#table-sale-funnel-reason").DataTable()
		     	.ajax.url("/report/get-management-report-deal-sale-customer").load();
			}
			else {
				$("#table-sale-funnel-container").show();
				$("#table-sale-funnel-reason-container").hide();

				$("#table-sale-funnel").DataTable()
		     	.ajax.url("/report/get-management-report-deal-sale-customer").load();
			}
        });
	}
</script>
<script type="text/javascript">
	google.charts.load('current', {'packages':['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawAllCharts);
</script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />

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