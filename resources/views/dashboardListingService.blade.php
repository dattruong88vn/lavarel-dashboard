@extends('layout.default')

@section('content')

<div class='dashboard'>
  <!--Block 1-->
  <div class="row">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-aqua"><i class="fa  fa-gear"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">Chưa assign</span>
          <span class="info-box-number">{{ $remainingListing[0]->count + $remainingListing[1]->count + $remainingListing[2]->count}}</span>
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-green"><i class="fa fa-flag-o"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">{{ $remainingListing[0]->userType->name }}</span>
          <span class="info-box-number">{{ $remainingListing[0]->count }}</span>
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-yellow"><i class="fa fa-users"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">{{ $remainingListing[1]->userType->name }}</span>
          <span class="info-box-number">{{ $remainingListing[1]->count }}</span>
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->
    <div class="col-md-3 col-sm-6 col-xs-12">
      <div class="info-box">
        <span class="info-box-icon bg-red"><i class="fa fa-user-plus"></i></span>
        <div class="info-box-content">
          <span class="info-box-text">{{ $remainingListing[2]->userType->name }}</span>
          <span class="info-box-number">{{ $remainingListing[2]->count }}</span>
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->            
  </div><!-- /.row -->

  <!--Block 2-->
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Biểu đồ công việc</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>

            <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <p class="text-center">
                  <!--<strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>-->
              </p>
              <div class="chart">
                <!-- Sales Chart Canvas -->
                <canvas id="statitics" style="height: 180px;"></canvas>
              </div><!-- /.chart-responsive -->
            </div><!-- /.col -->                        
          </div><!-- /.row -->
        </div><!-- ./box-body -->                
      </div><!-- /.box -->
    </div><!-- /.col -->
  </div><!-- /.row -->
  <!-- LINE CHART -->
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Biểu đồ phát triển listing</h3>
      <div class="box-tools pull-right">
        <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="chart">
        <canvas id="everydayListingChart" style="height:250px"></canvas>
      </div>
    </div><!-- /.box-body -->
  </div><!-- /.box -->

  <!--Block 3-->
  @include('task.DashBoardWidget')

  <!--BLock 4-->
  <!-- TABLE: LATEST ORDERS -->
  <div class="row">
    <div class="col-lg-6">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Building mới nhất</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <table class="table no-margin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên tòa nhà</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($newestBuildings as $b) { ?>
                  <tr>
                    <td><a href="#">{{$b->buildingId}}</a></td>
                    <td>{{$b->name}}</td>
                    <td>{{$b->address}}</td>
                  </tr>
                <?php } ?>
              </tbody>
            </table>
          </div><!-- /.table-responsive -->
        </div><!-- /.box-body -->
        <div class="box-footer clearfix">
          <!--<a href="javascript::;" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>-->
          <a href="/building" class="btn btn-sm btn-default btn-flat pull-right">Xem tất cả</a>
        </div><!-- /.box-footer -->
      </div><!-- /.box -->
    </div><!-- /.col -->

    <div class="col-lg-6">
      <div class="box box-info">
        <div class="box-header with-border">
          <h3 class="box-title">Listing mới nhất</h3>
          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <table class="table no-margin">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Loại BĐS - Loại hình</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>

                <?php foreach ($newestListings as $l) { ?>
                  <tr>
                    <td><a href="#">{{$l->rlistingId}}</a></td>
                    <td>{{$l->listingTypeName}} - {{$l->propertyTypeName}}</td>
                    <td>{{$l->address}}</td>
                  </tr>
                <?php } ?>
              </tbody>
            </table>
          </div><!-- /.table-responsive -->
        </div><!-- /.box-body -->
        <div class="box-footer clearfix">
          <!--<a href="javascript::;" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>-->
          <a href="/listing" class="btn btn-sm btn-default btn-flat pull-right">Xem tất cả</a>
        </div><!-- /.box-footer -->
      </div><!-- /.box -->
    </div><!-- /.col -->
  </div>


</div>
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript">
var statiticsData = {
  labels: [],
  data: [
    {
      name: "Chưa assign",
      count: []
    },
    {
      name: "",
      count: []
    },
    {
      name: "",
      count: []
    },
    {
      name: "",
      count: []
    }
  ],
};


// chart data
var data = {
  labels: statiticsData.labels,
  datasets: [
    {
      label: statiticsData.data[0].name,
      fillColor: "#00c0ef",
      strokeColor: "#00c0ef",
      pointColor: "#00c0ef",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: statiticsData.data[0].count
    },
    {
      label: statiticsData.data[1].name,
      fillColor: "#00a65a",
      strokeColor: "#00a65a",
      pointColor: "#00a65a",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: statiticsData.data[1].count
    },
    {
      label: statiticsData.data[2].name,
      fillColor: "#f39c12",
      strokeColor: "#f39c12",
      pointColor: "#f39c12",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: statiticsData.data[2].count
    },
    {
      label: statiticsData.data[3].name,
      fillColor: "#dd4b39",
      strokeColor: "#dd4b39",
      pointColor: "#dd4b39",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: statiticsData.data[3].count
    }
  ]
};
var options = {
  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: true,
  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",
  //Number - Width of the grid lines
  scaleGridLineWidth: 1,
  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,
  //Boolean - Whether the line is curved between points
  bezierCurve: true,
  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.4,
  //Boolean - Whether to show a dot for each point
  pointDot: true,
  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,
  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,
  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,
  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,
  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,
  //Boolean - Whether to fill the dataset with a colour
  datasetFill: false,
  //String - A legend template
  legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

$.ajax({
  url: 'option/show-latest-dashboard-statitics',
  type: 'GET'
}).success(function (response) {
  if (response.status == "success") {
    for (i = response.statitics.length - 1; i >= 0; i--) {
      var st = response.statitics[i];
      statiticsData.labels.push(st.createdDate);
      statiticsData.data[0].count.push(st.remainingListing[0].count + st.remainingListing[1].count + st.remainingListing[2].count);
      statiticsData.data[1].name = st.remainingListing[0].userType.name;
      statiticsData.data[1].count.push(st.remainingListing[0].count);
      statiticsData.data[2].name = st.remainingListing[1].userType.name;
      statiticsData.data[2].count.push(st.remainingListing[1].count);
      statiticsData.data[3].name = st.remainingListing[2].userType.name;
      statiticsData.data[3].count.push(st.remainingListing[2].count);
    }
    var ctx = $("#statitics").get(0).getContext("2d");
    var statiticsChart = new Chart(ctx).Line(data, options);
  }
});

/*
 * Biểu đồ phát triển listing
 */
everyDayListingData = {
  labels: [],
  counts: []
};
var everyDayListingChartData = {
  labels: everyDayListingData.labels,
  datasets: [
    {
      label: 'Biểu đồ phát triển listing',
      fillColor: "#00c0ef",
      strokeColor: "#00c0ef",
      pointColor: "#00c0ef",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: everyDayListingData.counts
    }
  ]
};

$.ajax({
  url: '/option/show-everyday-listing-count',
  type: 'GET'
}).success(function (response) {
  if (response.status == "success") {
    for (i = response.items.length - 1; i >= 0; i--) {
      var st = response.items[i];
      everyDayListingData.labels.push(st.createdDate);
      everyDayListingData.counts.push(st.value);
    }
    var ctx = $("#everydayListingChart").get(0).getContext("2d");
    var everydayListingChart = new Chart(ctx).Line(everyDayListingChartData, options);
  }
});
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />

@stop
