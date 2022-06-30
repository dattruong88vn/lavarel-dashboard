@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý Staff
        </h1>
      </section>
      <section>
        <div class="row">
          <div class="col-md-12">
            <div class="box box-solid">
              <div class="box-header with-border">
                <h3 class="box-title">#</h3>
              </div>
              <div class="box-body">
                <div class="row">
                  <div class="col-md-9 cus-filter">

                    <div class="form-group pull-left">
                        <label>Staff 1</label>
                        <select class="form-control select2" style="width: 100%;">
                          <option>1</option>
                          <option>2</option>
                        </select>
                      </div>

                    <div class="form-group pull-left">
                      <label>Staff 2</label>
                      <select class="form-control select2"  style="width: 100%;">
                        <option>1</option>
                        <option>2</option>
                      </select>
                    </div>

                  </div>
                  
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Date:</label>
                      <div class="input-group">
                        <div class="input-group-addon">
                          <i class="fa fa-clock-o"></i>
                        </div>
                        <input type="text" class="form-control pull-right" id="date-staff">
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                  <h3 class="box-title">#</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <table id="table-listing" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Client ID</th>
                        <th>Date</th>
                        <th>Issue Type</th>
                        <th>CS Status</th>
                        <th>TRX Status</th>
                        <th>Total Tổng Số Ticket</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                      <tr>
                        <td><a href="http://dashboard.dev/customer-service/quan-ly-user">001</a></td>
                        <td>2/29/2015</td>
                        <td>2</td>
                        <td>hi</td>
                        <td>ABC</td>
                        <td>OIU</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Client ID</th>
                        <th>Date</th>
                        <th>Issue Type</th>
                        <th>CS Status</th>
                        <th>TRX Status</th>
                        <th>Total Tổng Số Ticket</th>
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