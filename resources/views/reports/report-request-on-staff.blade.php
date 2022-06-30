@extends('layout.default')


@section('content')
    <div class='dashboard'>
        <section>
            <h1>Report (Developing...)</h1>
        </section>
        <section>
          <div class="row">
            <div class="col-md-6">
              <!-- DONUT CHART -->
              <div class="box box-danger">
                <div class="box-header with-border">
                  <h3 class="box-title">Report Request/Staff</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body chart-responsive">
                  <div class="chart" id="sales-chart" style="height: 300px; position: relative;"></div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->

              <!-- DONUT CHART -->
              <div class="box box-danger">
                <div class="box-header with-border">
                  <h3 class="box-title">Report Sale Agent</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body chart-responsive">
                  <div class="chart" id="sales-agent" style="height: 300px; position: relative;"></div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->

              <!-- AREA CHART -->
              <div class="box box-primary">
                <div class="box-header with-border">
                  <h3 class="box-title">Area Chart</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body chart-responsive">
                  <div class="chart" id="revenue-chart" style="height: 300px;"></div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->

            </div><!-- /.col (LEFT) -->
            <div class="col-md-6">
              <!-- LINE CHART -->
              <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Line Chart</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body chart-responsive">
                  <div class="chart" id="line-chart" style="height: 300px;"></div>
                </div>
              </div>

              <div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title">Bar Chart</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body chart-responsive">
                  <div class="chart" id="bar-chart" style="height: 300px;"></div>
                </div>
              </div>

              
              <div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title">Report Rent/buy</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body">
                    <table id="report-rent-buy" class="table table-bordered table-hover">
                      <thead>
                        <tr>
                            <th colspan="2" class="text-center">For rent</th>
                            <th colspan="2" class="text-center">For Sale</th>
                            <th colspan="2" class="text-center">Room for rent</th>
                        </tr>
                        <tr>
                            <th>Units</th>
                            <th>Value</th>
                            <th>Units</th>
                            <th>Value</th>
                            <th>Units</th>
                            <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>data1</td>
                              <td>data2</td>
                              <td>data3</td>
                              <td>data4</td>
                              <td>data1</td>
                              <td>data2</td>
                          </tr>
                      </tbody>
                     
                    </table>
                  </div><!-- /.box-body -->
              </div><!-- /.box -->


            </div><!-- /.col (RIGHT) -->
          </div><!-- /.row -->

          <div class="row">
            <div class="col-md-12">
              <div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title">Report Transaction</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                  </div>
                </div>
                <div class="box-body table-responsive">
                    <table id="report-transaction" class="table table-bordered table-hover">
                      <thead>
                        <tr>
                            <th colspan="2" class="text-center">Hải</th>
                            <th colspan="2" class="text-center">Oanh</th>
                            <th colspan="2" class="text-center">Duy</th>
                            <th colspan="2" class="text-center">Hải 1</th>
                            <th colspan="2" class="text-center">Oanh 1</th>
                            <th colspan="2" class="text-center">Duy 1</th>

                            <th colspan="2" class="text-center">Hải</th>
                            <th colspan="2" class="text-center">Oanh</th>
                            <th colspan="2" class="text-center">Duy</th>
                            <th colspan="2" class="text-center">Hải 1</th>
                            <th colspan="2" class="text-center">Oanh 1</th>
                            <th colspan="2" class="text-center">Duy 1</th>
                        </tr>
                        <tr>
                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>

                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>

                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>

                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>
                            <th>For rent</th>
                            <th>For sale</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                     
                    </table>
                  </div><!-- /.box-body -->
              </div><!-- /.box -->
            </div>
          </div>

        </section>
    </div>
@endsection


@section('page-js')
    
    
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/bootstrap/js/bootstrap.min.js")}}"></script>
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
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/js/function.js")}}"></script>
    <script>
        var dataRequestOnStaff=[];
        <?php
            foreach($report_request_on_staff->data as $key => $result){
                ?>
                    dataRequestOnStaff.push({label:"<?php echo $result->name; ?>", value: <?php echo $result->percent; ?>});
                <?php
            }
        ?>
      $(function () {
        "use strict";

        // AREA CHART
        var area = new Morris.Area({
          element: 'revenue-chart',
          resize: true,
          data: [
            {y: '2011 Q1', item1: 2666, item2: 2666},
            {y: '2011 Q2', item1: 2778, item2: 2294},
            {y: '2011 Q3', item1: 4912, item2: 1969},
            {y: '2011 Q4', item1: 3767, item2: 3597},
            {y: '2012 Q1', item1: 6810, item2: 1914},
            {y: '2012 Q2', item1: 5670, item2: 4293},
            {y: '2012 Q3', item1: 4820, item2: 3795},
            {y: '2012 Q4', item1: 15073, item2: 5967},
            {y: '2013 Q1', item1: 10687, item2: 4460},
            {y: '2013 Q2', item1: 8432, item2: 5713}
          ],
          xkey: 'y',
          ykeys: ['item1', 'item2'],
          labels: ['Item 1', 'Item 2'],
          lineColors: ['#a0d0e0', '#3c8dbc'],
          hideHover: 'auto'
        });

        // LINE CHART
        var line = new Morris.Line({
          element: 'line-chart',
          resize: true,
          data: [
            {y: '2011 Q1', item1: 2666},
            {y: '2011 Q2', item1: 2778},
            {y: '2011 Q3', item1: 4912},
            {y: '2011 Q4', item1: 3767},
            {y: '2012 Q1', item1: 6810},
            {y: '2012 Q2', item1: 5670},
            {y: '2012 Q3', item1: 4820},
            {y: '2012 Q4', item1: 15073},
            {y: '2013 Q1', item1: 10687},
            {y: '2013 Q2', item1: 8432}
          ],
          xkey: 'y',
          ykeys: ['item1'],
          labels: ['Item 1'],
          lineColors: ['#3c8dbc'],
          hideHover: 'auto'
        });

        //DONUT CHART
        var donut = new Morris.Donut({
          element: 'sales-chart',
          resize: true,
          colors: ["#3c8dbc", "#C30101", "#00a65a", "#00285e", "#f66d3e"],
          data: dataRequestOnStaff,
          hideHover: 'auto'
        });

         //DONUT CHART
        var donut = new Morris.Donut({
          element: 'sales-agent',
          resize: true,
          colors: ["#3c8dbc", "#C30101", "#00a65a", "#00285e", "#f66d3e"],
          data: dataRequestOnStaff,
          hideHover: 'auto'
        });

        //BAR CHART
        var bar = new Morris.Bar({
          element: 'bar-chart',
          resize: true,
          data: [
            {y: '2006', a: 100, b: 90},
            {y: '2007', a: 75, b: 65},
            {y: '2008', a: 50, b: 40},
            {y: '2009', a: 75, b: 65},
            {y: '2010', a: 50, b: 40},
            {y: '2011', a: 75, b: 65},
            {y: '2012', a: 100, b: 90}
          ],
          barColors: ['#00a65a', '#f56954'],
          xkey: 'y',
          ykeys: ['a', 'b'],
          labels: ['CPU', 'DISK'],
          hideHover: 'auto'
        });
      });
    </script>

@append

@section('page-css')
    <link href="{{loadAsset("/bootstrap/css/bootstrap.min.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/morris/morris.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop