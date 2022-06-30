@extends('layout.default')

@section('content')
<div class="unblock-phone">
    <div class="row">
        <div class="col-md-12">                
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Danh sách số điện thoại</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-12">
                                        <table id="table-unblock-phone" class="table table-bordered table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <th>Thời gian khóa</th>
                                                <th>Mở khóa</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.box-body -->                    
            </div><!-- /.box -->
        </div>
    </div>
</div>
@endsection


@section('page-js')
<script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/js/customer/unblock-phone.js")}}"></script>

@stop
@section('page-css')
    <link href="{{loadAsset("/css/customer/unblock-phone.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
@stop