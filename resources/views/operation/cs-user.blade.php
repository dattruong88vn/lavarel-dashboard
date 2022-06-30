@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          Quản Lý User
        </h1>
      </section>
      <section>
        <div class="box box-warning">
          <div class="box-body">
            <form role="form">
              
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>User Label</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>#</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>Owner</option>
                      <option>Tenant</option>
                      <option>Propzy Agent</option>
                      <option>Not Yet Approved Agent</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Status</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>Solved</option>
                      <option>Reopend</option>
                      <option>Chờ Dept Khác</option>
                      <option>Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Assigned</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>Thanh</option>
                      <option>Nhi</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Listing Detail View</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Issue Explaination</label>
                <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
              </div>

              <div class="form-group">
                <label>Comment</label>
                <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Type of Trx</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>Thuê</option>
                      <option>Mua</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Type of Product</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>Nhà</option>
                      <option>Căn hộ</option>
                      <option>Nhà trọ</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <h4>Price Range</h4>
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Từ</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Đến</label>
                    <input type="text" class="form-control" placeholder="Enter ...">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label>Location</label>
                    <select class="form-control select2" style="width: 100%;">
                      <option>ávad</option>
                      <option>ávad</option>
                      <option>ávad</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>More Notes</label>
                <textarea class="form-control" rows="3" placeholder="Enter ..."></textarea>
              </div>

            </form>
          </div><!-- /.box-body -->
        </div><!-- /.box -->
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
