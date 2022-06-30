@extends('layout.default')

@section('content')
    <div class="building">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Danh sách tòa nhà</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <input class="form-control" placeholder="Id, Tên tòa nhà, Quận, Địa chỉ"
                                       id="input-search">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12 text-right">
                                <button class="btn btn-sm btn-primary" id="btn-search">Lọc dữ liệu</button>
                                <button class="btn btn-sm btn-default" id="btn-clear-search">Xóa</button>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <table id="tb-budding" class="table table-bordered table-striped" width="100%" style="width: 100%;">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên tòa nhà</th>
                                        <th>Địa chỉ</th>
                                        <th>Quận</th>
                                        <th>Listing</th>
                                        <th>Live listing</th>
                                        <th>Tạo bởi</th>
                                        <th>Chỉnh sửa bởi</th>
                                    </tr>
                                    </thead>
                                </table>
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
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{loadAsset("/js/building/list.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop