@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          <!-- Agent Đã Xem -->
          Listing Đã Xem
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title"># </h3>
              </div><!-- /.box-header -->
              <div class="box-body">
                <table id="table-request" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Ngày Giờ Xem</th>
                      <th>Title</th>
                      <th>Transactions</th>
                      <th>Chủ Listing</th>
                      <th>Điện Thoại</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Sales</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Sales</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Sales</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Sales</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Sales</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>
                    <tr>
                      <td>1.</td>
                      <td>12-12-2014 09:30 AM</td>
                      <td>abc</td>
                      <td>Rent</td>
                      <td>Nguyễn A</td>
                      <td>0930403443</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Ngày Giờ Xem</th>
                      <th>Title</th>
                      <th>Transactions</th>
                      <th>Chủ Listing</th>
                      <th>Điện Thoại</th>
                    </tr>
                  </tfoot>
                </table>
              </div><!-- /.box-body -->
              
            </div><!-- /.box -->
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