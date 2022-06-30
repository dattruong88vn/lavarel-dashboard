@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class="reports-admin">
    <section></section>
    <section>
        <div class="db-tm-item deal-tm-filter-reports">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-body">
                            <div class="nav-tabs-filter-reports">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_filter_reports_1" data-toggle="tab">CURRENT MONTH</a></li>
                                    <li><a href="#tab_filter_reports_2" data-toggle="tab">CURRENT QUARTER</a></li>
                                    <li><a href="#tab_filter_reports_3" data-toggle="tab">+</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_filter_reports_1">
                                        <form class="form-horizontal m-t-20">
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Responsible person:</label>
                                                <div class="col-sm-9">
                                                    <input type="text" class="form-control">
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="" class="col-sm-2 control-label">Reporting period:</label>
                                                <div class="col-sm-9">
                                                    <select class="form-control select2" style="width: 100%;">
                                                        <option selected="selected">Last 30 days</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-1">
                                                    <a href="#" class="btn btn-default">-</a>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="col-sm-6">
                                                <a href="#" class="btn btn-success">SAVE</a>
                                                <a href="#" class="btn btn-warning m-l-10">CANCEL</a>
                                            </div>
                                            <div class="col-sm-6 text-right">
                                                <a href="#" class="btn btn-default"><i class="fa fa-cog"></i></a>
                                                <a href="#" class="btn btn-default m-l-10">+</a>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tab-pane" id="tab_filter_reports_2">
                                        CURRENT QUARTER
                                    </div>
                                </div>				
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-tm-result-reports">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-body">
                            <table id="table-contact" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type of trx</th>
                                        <th>Type of product </th>
                                        <th>Value</th>
                                        <th>Responsible TM</th>
                                        <th>Responsible Sales</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php for ($i = 0; $i < 6; $i++): ?>
                                        <tr>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                            <td>{{$i}}</td>
                                        </tr>
                                    <?php endfor; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-reports-admin block-1">
            <div class="row">
                <div class="col-md-6">                
                    <!-- DONUT CHART -->
                    <div class="box box-danger">
                        <div class="box-header with-border">
                            <h3 class="box-title">SALES FUNNEL FOR DEALS</h3>
                            <div class="box-tools pull-right">
                                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                                <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>
                        </div>
                        <div class="box-body chart-responsive">
                            <div class="chart" id="sales-chart" style="height: 300px; position: relative;"></div>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
                <div class="col-md-6 data-sum">                
                    <div class="box bg-green">
                        <div class="box-header bg-green-active">
                            <h3 class="box-title">TOTAL VALUE OF DEALS</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <!-- /.box-tools -->
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body padding-0" style="display: block;">
                            <h1 class="text-center f-size-70 padding-30"><b>200.498.00đ</b></h1>

                            <div class="col-md-6 padding-0">
                                <div class="box bg-teal not-box-shadow m-b-0">
                                    <div class="box-header bg-teal-active">
                                        <h3 class="box-title">TOTAL OF DEALS WON</h3>
                                    </div>
                                    <!-- /.box-header -->
                                    <div class="box-body padding-28" style="display: block;">
                                        <h1 class="text-center f-size-40"><b>8.288.00đ</b></h1>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>
                            <div class="col-md-6 padding-0">
                                <div class="box bg-red not-box-shadow m-b-0">
                                    <div class="box-header bg-red-active">
                                        <h3 class="box-title">TOTAL OF DEALS IN PROGRESS</h3>
                                    </div>
                                    <!-- /.box-header -->
                                    <div class="box-body padding-28" style="display: block;">
                                        <h1 class="text-center f-size-40"><b>192.210.00đ</b></h1>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>

                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-reports-admin block-2">
            <div class="row">
                <div class="col-md-12">                
                    <!-- BAR CHART -->
                    <div class="box box-success">
                        <div class="box-header with-border">
                            <h3 class="box-title">DEALS IN PROGRESS (BY EMPLOYEE)</h3>
                            <div class="box-tools pull-right">
                                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                                <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>
                        </div>
                        <div class="box-body chart-responsive">
                            <div class="chart" id="bar-chart" style="height: 300px;"></div>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
            </div>
        </div>

        <div class="db-tm-item deal-reports-admin block-3">
            <div class="row">
                <div class="col-md-6">
                    <!-- AREA CHART -->
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">DEALS IN PROGRESS</h3>
                            <div class="box-tools pull-right">
                                <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                                <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                            </div>
                        </div>
                        <div class="box-body chart-responsive">
                            <div class="chart" id="revenue-chart" style="height: 300px;"></div>
                        </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
                <div class="col-md-6 data-sum">                
                    <div class="box bg-green">
                        <div class="box-header bg-green-active">
                            <h3 class="box-title">NUMBER OF DEALS IN PROGRESS</h3>

                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <!-- /.box-tools -->
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body padding-0" style="display: block;">
                            <h1 class="text-center f-size-70 padding-30">94</h1>

                            <div class="col-md-6 padding-0">
                                <div class="box bg-teal not-box-shadow m-b-0">
                                    <div class="box-header bg-teal-active">
                                        <h3 class="box-title">ACTIVITY COUNT</h3>
                                    </div>
                                    <!-- /.box-header -->
                                    <div class="box-body padding-28" style="display: block;">
                                        <h1 class="text-center f-size-40"><b>183</b></h1>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>
                            <div class="col-md-6 padding-0">
                                <div class="box bg-red not-box-shadow m-b-0">
                                    <div class="box-header bg-red-active">
                                        <h3 class="box-title">NUMBER OF CALLS</h3>
                                    </div>
                                    <!-- /.box-header -->
                                    <div class="box-body padding-28" style="display: block;">
                                        <h1 class="text-center f-size-40"><b>184</b></h1>
                                    </div>
                                    <!-- /.box-body -->
                                </div>
                            </div>

                        </div>
                        <!-- /.box-body -->
                    </div>
                </div>
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


<script type="text/javascript">
$(function () {
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
    // DONUT CHART
    var donut = new Morris.Donut({
        element: 'sales-chart',
        resize: true,
        colors: ["#3c8dbc", "#f56954", "#00a65a"],
        data: [
            {label: "Download Sales", value: 12},
            {label: "In-Store Sales", value: 30},
            {label: "Mail-Order Sales", value: 20}
        ],
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



@stop
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