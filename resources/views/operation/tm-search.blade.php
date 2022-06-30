@extends('layout.default')

@section('content')
    <div class='dashboard'>
       <section>
        <h1>
          Search Them Listing
        </h1>
      </section>
        <div class="box box-info">
          <div class="box-header with-border">
            <h3 class="box-title">Thông tin/yêu cầu tìm kiếm</h3>
          </div>
          <div class="box-body tran-detail">
            <div class="form-group">
              <label class="col-sm-2 control-label">Địa Điểm</label>
              <div class="col-sm-10">
                Q 1
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Loại Hình Giao Dịch</label>
              <div class="col-sm-10">
                Thuê
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Loại Bất Động Sản</label>
              <div class="col-sm-10">
                Văn Phòng
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Phòng Ngủ</label>
              <div class="col-sm-10">
                2
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Phòng Tắm</label>
              <div class="col-sm-10">
                3
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Hướng Nhà</label>
              <div class="col-sm-10">
                Nam
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Năm Xây Dựng</label>
              <div class="col-sm-10">
                3000
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Diện Tích</label>
              <div class="col-sm-10">
                40m - 60m
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Giá</label>
              <div class="col-sm-10">
                100000 - 40000000
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">Note</label>
              <div class="col-sm-10">
                sdfasdf sdfasdf sdfasdf sdfasdf sdfasdf sdfasdf sdfasdf sdfasdf sdfasdf
              </div>
            </div>
           
          </div>
        </div>
        <div class="box-footer">
          <button type="submit" class="btn btn-primary pull-right add-assign">Search</button>
        </div>
      </section>
    </div>

    <div id="assign-popup" class="white-popup mfp-hide zoom-anim-dialog">
      <a href="#" class="mpf-close-cus">X close</a>
      <div class="content-popup">
          <div class="title">
            <h1>Assign</h1>
          </div>
          <div class="inner-popup box">
            <div class="box-body">
              <form role="form">
                <table id="table-assign" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Type</th>
                      <th>Address</th>
                      <th width="10%">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>Sales</td>
                      <td>Quận 1</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>Sales</td>
                      <td>Quận 1</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>Sales</td>
                      <td>Quận 1</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>Sales</td>
                      <td>Quận 1</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    <tr>
                      <td>Nguyễn B</td>
                      <td>Sales</td>
                      <td>Quận 1</td>
                      <td><div class="checkbox"><label><input type="checkbox"></label></div></td>
                    </tr>
                    
                  </tbody>
                </table>
                <button class="btn btn-block btn-primary">Gửi</button>
              </form>
            </div>
          </div>
      </div>
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