@extends('layout.default')

@section('content')
<div class="create-country">
  <div class="row">
    <div class="col-md-12">
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Cấu hình dashboard</h3>
        </div><!-- /.box-header -->
        <div class="box-body">
          <form class="form-horizontal" method="post">
            <input type="hidden" name="_token" value="{{csrf_token()}}" />
            <h3>Biểu đồ công việc</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-sm-2">Số ngày gần nhất:</label>
                  <div class='col-sm-10'>
                    <input type="text" class="form-control" name="latest_statitics_count" placeholder="0" value="{{$item->latest_statitics_count}}" />
                  </div>
                </div>
              </div>
            </div><!--#row-->
            <h3>Biểu đồ phát triển listing</h3>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label class="col-sm-2">Số ngày gần nhất</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" name="latest_listing_statitics_count" placeholder="0" value="{{$item->latest_listing_statitics_count}}" />
                  </div>
                </div>
              </div>
            </div><!--#row-->

            <div class="box-footer">
              <button id="finish" type="submit" class="btn btn-primary">Lưu</button>
            </div>
          </form>
        </div><!--#box-body-->
      </div>
    </div>
  </div>
</div>
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
@stop