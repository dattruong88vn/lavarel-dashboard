@extends('layout.default')

@section('content')
    <div class="listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Danh sách SEO</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">

                        <div class="row">
                            <div class="col-md-6"></div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input type="text" class="form-control" id="search-key" placeholder="Slug, Loại hình, Loại BDS, Quận">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <table id="table-seo" class="table table-bordered table-striped table-hover">
                                                <thead>
                                                <tr>
                                                    <th>Slug</th>
                                                    <th>Loại</th>
                                                    <th>Nhóm BĐS</th>
                                                    <th>Bất động sản</th>
                                                    <th>Vị trí</th>
                                                    <th>Seo Title</th>
                                                    <th>Ngày tạo</th>
                                                    <th class="text-center">Action</th>
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

    <div class="modal fade" id="confirm-remove">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Thông báo</h4>
                </div>
                <div class="modal-body">
                    Bạn muốn xóa?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary btn-confirm-remove">Xóa</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
@endsection

@section('page-js')
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script src="{{loadAsset("/js/seo/list.js")}}"></script>
@stop
@section('page-css')
    <link href="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.css")}}" rel="stylesheet" type="text/css"/>
    <link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
@stop