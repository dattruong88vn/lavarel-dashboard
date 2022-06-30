@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
          <h1>
              Overview For TM
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

                        <div class="form-group">
                          <label>Date range:</label>
                          <div class="input-group">
                            <div class="input-group-addon">
                              <i class="fa fa-calendar"></i>
                            </div>
                            <input type="text" class="form-control pull-right" id="date-overview">
                          </div>
                        </div>

                        <table id="table-overview" class="table table-bordered table-striped">
                            <thead>
                              <tr>
                                  <th style="width: 10px">#</th>
                                  <th>Status</th>
                                  <th>--</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                              <tr>
                                  <td>1</td>
                                  <td>Pending</td>
                                  <td>9</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                  <th style="width: 10px">#</th>
                                  <th>Status</th>
                                  <th>--</th>
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
  <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
  <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
  
  <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
  <script src="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.js")}}"></script>

  <script src="{{loadAsset("/js/dashboard.js")}}"></script>
@stop
@section('page-css')
  <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/plugins/jquery-confirm/jquery-confirm.min.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
  <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop
