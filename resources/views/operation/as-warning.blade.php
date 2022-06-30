@extends('layout.default')

@section('content')
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý Warning
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <div class="info-box">
              <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">Total Warning</span>
                <span class="info-box-number">{{ $results->data->subTotalWarning }}</span>
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
                <table class="table table-bordered" id="blackWarning">
                  <thead>
                    <th style="width: 10px">#</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Last Login</th>
                    <th>Số Ngày</th>
                  </thead>
                  <tbody>
                  @foreach($results->data->agents as $key =>$result)
                  <tr>
                    <td>{{ $key+1 }}</td>
                    <td>{{ $result-> agentName }}</td>
                    <td>{{ $result-> email }}</td>
                    <td>{{ date('d-m-Y H:i:s', $result-> lastLogin/1000) }}</td>
                    <td>{{ $result-> numberDay }}</td>
                  </tr>
                  @endforeach
                  </tbody>
                </table>
              </div>
             <!--  <div class="box-footer clearfix">
                <ul class="pagination pagination-sm no-margin pull-right">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>
              </div> -->
            </div>
          </div>
        </div>
      </section>

    </div>
@endsection


@section('page-js')
  
  <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>  
  <script type="text/javascript">
        fixDataTableVNSearch("#blackWarning");
        $('#blackWarning').dataTable();
  </script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop