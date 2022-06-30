@extends('layout.operation')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
            Quản Lý Brokerage Firm
        </h1>
      </section>
      <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title"># </h3>
                        </div>
                        <div class="box-body">
                            <table id="table-brokerage" class="table table-bordered table-striped">
                                <thead>
                                  <tr>
                                      <th style="width: 10px">#</th>
                                      <th>Tên Công Ty</th>
                                      <th>Logo</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                      <td>1</td>
                                      <td><a href="/brokerage-firm/tao-moi">ABC</a></td>
                                      <td><div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div></td>
                                  </tr>
                                  <tr>
                                      <td>1</td>
                                      <td><a href="/brokerage-firm/tao-moi">ABC</a></td>
                                      <td><div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div></td>
                                  </tr>
                                  <tr>
                                      <td>1</td>
                                      <td><a href="/brokerage-firm/tao-moi">ABC</a></td>
                                      <td><div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div></td>
                                  </tr>
                                  <tr>
                                      <td>1</td>
                                      <td><a href="/brokerage-firm/tao-moi">ABC</a></td>
                                      <td><div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div></td>
                                  </tr>
                                  <tr>
                                      <td>1</td>
                                      <td><a href="/brokerage-firm/tao-moi">ABC</a></td>
                                      <td><div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div></td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                      <th style="width: 10px">#</th>
                                      <th>Tên Công Ty</th>
                                      <th>Logo</th>
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