@extends('layout.default')

@section('content')

<div class="management-listing form-horizontal">
	<div class="box box-primary">
		<div class="box-header with-border">
            <h3 class="box-title">BÁO CÁO LISTING</h3>
        </div>
        <div class="box-body">
          <div class="nav-tabs-custom nav-group">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" see-type="info" data-toggle="tab" aria-expanded="true">XEM THÔNG TIN</a></li>
              <li class=""><a href="#tab_2" see-type="compare" data-toggle="tab" aria-expanded="false">SO SÁNH</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <div class="bl-verify">
                  <div class="row">
                    <div class="col-sm-12">
                        @include('graph-reports._from_to_date')
                    </div>
                  </div>
                </div>
                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="bl-chart">
                  <div class="bl-chart-1">
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="text-center chart chart-responsive">
                          <div class="chart" id="listing-chart" style="width:500px;height:350px;position: relative;line-height: 400px;"></div><br/><br/>
                          <span id="title-listing-chart"></span>
                        </div>
                      </div>
                      
                      <div class="col-sm-6">
                        <div class="text-center chart chart-responsive">
                          <div class="chart" id="listing-chart-2" style="width:500px;height:350px;position: relative;line-height: 400px;"></div> <br/><br/>
                          <span id="title-listing-chart-2"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="table-listing-chart-container" class="col-sm-5 table-container" style="display: none;">
                  <table id="table-listing-chart" class="table table-bordered table-striped" >
                      <thead>
                          <tr>
                              <th>AM</th>
                              <th>AG</th>
                              <th>SỐ LISTING</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                         
                        </tr>
                      </tbody>
                  </table>
                </div>
                <div class="col-sm-2">
                  &nbsp;
                </div>
                <div id="table-listing-chart-2-container" class="col-sm-5  table-container" style="display: none;">
                  <table id="table-listing-chart-2" class="table table-bordered table-striped" >
                      <thead>
                          <tr>
                              <th>AM</th>
                              <th>AG</th>
                              <th>LISTINGS</th>
                              <th>HOA HỒNG </th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                        
                        </tr>
                      </tbody>
                  </table>
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
                      <div class="col-sm-3">
                        <div class="form-group month-select-group dynamic-select-group">
                          <div class="col-sm-12 bl-group-select">
                            <div class="form-group">
                              <div class="col-sm-12">
                                <div class="button-group text-center margin">
                                  <label>CÁC MỐC</label><br>
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
                                  <label>CÁC MỐC</label><br>
                                  <button target="select-quarter" class="btn btn-danger btn-remove">-</button>
                                  <button target="select-quarter" class="btn btn-success btn-add">+</button>
                                </div>
                                <div id="select-quarter-container" class="row"></div> 
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-9">
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

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

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
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCharts);

    var charts = <?=json_encode($chart)?>;
    var colChart = <?=json_encode($colChart)?>;
    function drawCharts() {
      loadDataChart('listing-chart', charts.chartLeft.chartName, charts.chartLeft.chartItems)
      loadDataChart('listing-chart-2', charts.chartRight.chartName, charts.chartRight.chartItems)
    }
    var refreshDateData = function(){
        showPropzyLoading();
        $.post("/report/get-management-report-listing", postData, function (response) {
            charts = response;
            drawCharts();
            hidePropzyLoading();
        });
    }
    
    function clickOnChart(selectedItem, chartId) {
      $("#table-" + chartId).show();
      type = selectedItem.type;
      url = "";
      if(chartId == 'listing-chart') {
        url = "/report/get-management-report-listing-value/"+ type +"/" + postData.fromDate + "/" + postData.toDate;
      }
      else {
        url = "/report/get-management-report-listing-commission/"+ type +"/" + postData.fromDate + "/" + postData.toDate;
      }
      $(".table-container").show();
      table = $("#table-" + chartId).DataTable();
      if(type == "owner") {
        table.column( 0 ).visible( false );
      }
      else {
        table.column( 0 ).visible( true );
      }
      table.ajax.url(url).load();  
      $("#table-" + chartId).resize()
    }
</script>

@include('graph-reports._draw_chart_js')

<script type="text/javascript">
	$(function(){
		"use strict";
	     $("#table-listing-chart").DataTable({
          "scrollX": true,
		      "pageLength": 5,
          "processing": true,
          "serverSide": true,
          "ajax": "/report/get-management-report-listing-value/0/0/0",
          "columns": [
              { data: 'amName'},
              { data: 'agentName'},
              { data: 'numberListing' }
          ]
      });

      $("#table-listing-chart-2").DataTable({
       "scrollX": true,
		"pageLength": 5,
        "processing": true,
        "serverSide": true,
        "ajax": "/report/get-management-report-listing-commission/0/0/0",
        "columns": [
            { data: 'amName'},
            { data: 'agentName'},
            { data: 'numberListing' },
            { data: 'commission' }
        ]
    });
	});
</script>

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
        $.post("/report/get-management-report-listing-compare", columnPostData, function (colChart) {
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

@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />

@stop