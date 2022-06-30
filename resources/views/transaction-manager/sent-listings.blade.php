@extends('layout.default')

@section('content')
    
    <div class='dashboard'>
      <section>
        <h1>
          Listings Đã Gửi
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
                <table id="table-transac" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Ngày Tạo</th>
                      <th>Loại Giao Dịch</th>
                      <th>Loại BĐS</th>
                      <th>Links</th>
                    </tr>
                  </thead>
                  <tbody>
                  @foreach($results->data as $key => $result)
                    <tr>
                      <td>{{ $key+1 }}.</td>
                      <td>{{ date('d-m-Y', $result->createdDate/1000) }}</td>
                      <td>{{ $result->listingTypeName }}</td>
                      <td>{{ $result->propertyName }}</td>
                      <td><a href="{{ PRODUCT_URL }}chi-tiet/{{ Str::slug($result->propertyName) }}/{{ Str::slug($result->districtName) }}/{{ $result->rId}}">{{ PRODUCT_URL }}chi-tiet/{{ Str::slug($result->propertyName) }}/{{ Str::slug($result->districtName) }}/{{ $result->rId}}</a></td>
                    </tr>
                  @endforeach
                  </tbody>
                  <tfoot>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Ngày Tạo</th>
                      <th>Loại Giao Dịch</th>
                      <th>Loại BĐS</th>
                      <th>Links</th>
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
