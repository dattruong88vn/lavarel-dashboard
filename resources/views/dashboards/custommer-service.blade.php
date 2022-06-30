@extends('layout.default')

@section('content')

<div class='dashboard'>
  <section>
    <div>
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="pill" href="#today">Today</a></li>
        <li><a data-toggle="pill" href="#weekly">Weekly</a></li>
        <li><a data-toggle="pill" href="#monthly">Monthly</a></li>
        <li><a data-toggle="pill" href="#from-to">From - to</a></li>
      </ul>
      <div class="tab-content" style="padding-top:16px;">
        <div id="today" class="tab-pane fade in active">
          <?php $date = date('d/m/Y'); ?>
          <h4>{{$date}}</h4>
        </div>
        <div id="weekly" class="tab-pane fade">          
          <h4><label>Từ ngày: </label> <span>{{$date}}</span> - <label>Đến ngày: </label>  <span>{{$date}}</span> </h4>

        </div>
        <div id="monthly" class="tab-pane fade">

          <h4><label>Từ ngày: </label> <span>{{$date}}</span> - <label>Đến ngày: </label>  <span>{{$date}}</span> </h4>
          <div class="form-group">
            <!--<label>Từ tháng: </label> <input type="text" /> <label>Đến tháng: </label><input type="text" />-->
          </div>
        </div>
        <div id="from-to" class="tab-pane fade">
          <div class="form-group">
            <label>Từ ngày: </label> <input type="text" class="datepicker" /> <label>Đến ngày: </label><input type="text" class="datepicker" />
          </div>
        </div>
      </div>
    </div>    
  </section>
  <section>
    <h2  style="border-bottom:double 4px #aaa;display:inline-block;" class="text-green">Pending requests</h2>
    <table id="pending-requests"  class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Name</th>
          <th>Created Date</th>
          <th>Missing Info</th>
          <th>Standby Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <?php for ($i = 0; $i < 10; $i++): ?>
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

    <h2  style="margin-top: 32px !important;border-bottom:double 4px #aaa;display:inline-block;" class="text-green">Created leads</h2>
    <table id="created-leads"  class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Lead ID</th>
          <th>Created Date</th>
          <th>Status</th>
          <th>People in charge</th>
        </tr>
      </thead>
      <tbody>
        <?php for ($i = 0; $i < 10; $i++): ?>
          <tr>
            <td>{{$i}}</td>
            <td>{{$i}}</td>
            <td>{{$i}}</td>
            <td>{{$i}}</td>
          </tr>
        <?php endfor; ?>
      </tbody>
    </table>
  </section>

</div>
@endsection

@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript">
fixDataTableVNSearch("#pending-requests");
$("#pending-requests").DataTable();


fixDataTableVNSearch("#created-leads");
$("#created-leads").DataTable();

$(".datepicker").datepicker();
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop
