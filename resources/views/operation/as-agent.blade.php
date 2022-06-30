@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý Agents
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="info-box">
              <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Total Listing</span>
                <span class="info-box-number">{{ $results->data->subTotalListing }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="info-box">
              <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Total Requests</span>
                <span class="info-box-number">{{ $results->data->subTotalRequest }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">#</h3>
              </div>
              <div class="box-body">
                <table id="table-request" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Tên</th>
                      <th>Brokerage Firm</th>
                      <th>No of Listings</th>
                      <th>No of Requests</th>
                    </tr>
                  </thead>
                  <tbody>
                  @foreach($results->data->agentsList as $key => $result)
                    <tr>
                      <td>{{$key+1}}.</td>
                      <td><a href="/agent-support/agent/{{$result->agentId}}">{{ $result->agentName }}</a></td>
                      <td>{{ $result->brokerageFirmName }}</td>
                      <td>{{ $result->numberOfListing }}</td>
                      <td>{{ $result->numberOfRequest }}</td>
                    </tr>
                   @endforeach
                  </tbody>
                  <tfoot>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Tên</th>
                      <th>Brokerage Firm</th>
                      <th>No of Listings</th>
                      <th>No of Requests</th>
                    </tr>
                  </tfoot>
                </table>
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
  
  <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
  <script src="{{loadAsset("/js/dashboard.js")}}"></script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop