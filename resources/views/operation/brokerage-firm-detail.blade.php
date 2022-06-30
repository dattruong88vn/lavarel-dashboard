@extends('layout.operation')

@section('content')
    <section>
      <h1>
          Tạo Mới Brokerage Firm
      </h1>
    </section>
    <section>
      <div class="box box-warning">
          <div class="box-body">
              <form action="" id="" name="" method="post" role="form">
                  
                  <div class="row">
                      <div class="col-lg-6">
                          <div class="form-group">
                              <label>Tên Công Ty (Vi)</label>
                              <input type="text" id="name" name="name" class="form-control" value="" placeholder="Tên Công Ty" tabindex="1" autofocus>
                          </div>
                      </div>
                      <div class="col-lg-6">
                          <div class="form-group">
                              <label>Tên Công Ty (En)</label>
                              <input type="text" id="name" name="name" class="form-control" value="" placeholder="Tên Công Ty" tabindex="1" autofocus>
                          </div>
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-lg-12">
                          <div class="form-group">
                              <label>Tên Công Ty (Vi)</label>
                              <div class="logo-company"><a href="/brokerage-firm/tao-moi"><img src="/dist/img/avatar.png"></a></div>
                          </div>
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-lg-6">
                          <div class="form-group">
                              <label>Mô Tả (Vi)</label>
                              <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                          </div>
                      </div>
                      <div class="col-lg-6">
                          <div class="form-group">
                              <label>Mô Tả (En)</label>
                              <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
                          </div>
                      </div>
                  </div>

                  <div class="box-footer">
                      <button type="button" onclick="" class="btn btn-primary pull-right">Tạo</button>
                      <button type="reset" class="btn btn-primary pull-right">Cancel</button>
                  </div>
              </form>
          </div>
      </div>
  </section>
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