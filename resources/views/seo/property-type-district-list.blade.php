@extends('layout.default')

@section('content')
    <div class="listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Danh sách SEO(Từng loại bất đông sản theo quận)</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                       
                        <table id="table" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Slug</th>
                                    <th>Loại</th>
                                    <th>Bất động sản</th>
                                    <th>Vị trí</th>
                                    <th>Seo Title</th>
                                    <th>Ngày tạo</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($seoList->data as $key=>$seo)
                               <tr rowIndex={{$key}}>
                                    <td><a href="seo/{{ $seo->slug }}">{{ $seo->slug }}</a></td>
                                    <td>{{ $seo->listingTypeName }}</td>
                                    <td>{{ $seo->propertyTypeName }}</td>
                                    <td>@if($seo->onlyCity == 1)   {{$seo->cityName  }} @else  {{$seo->districtName  }} @endif</td>
                                    <td>{{ $seo->title }}</td>
                                    <td>{{ date("d-m-Y H:i:s", $seo->createdDate/1000)}}</td>
                                    <td class="text-center"><button type="button" data="{{ $seo->slug }}" class="btn btn-info btn-remove">Xóa</button></td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
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
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
           
        $(function () {
            var arrSlug = [];
            var objectSlug = {};
            var rowIndex = "";

            fixDataTableVNSearch("#table");
            $("#table").DataTable({
                "order": [[ 5, "desc" ]]
            });

            $(document).on("click", ".btn-remove", function(){
                $('#confirm-remove').modal(); 
                arrSlug= [];
                arrSlug.push($(this).attr("data"));
                objectSlug.slug = arrSlug;
                rowIndex = $(this).closest("tr").attr("rowIndex");
            });

            $('.btn-confirm-remove').click(function(){
                url = "seo/delete";
                post_sync(url, objectSlug, true, function (data) {
                    $('#confirm-remove').modal('hide'); 
                    $("#table").find("tr[rowIndex="+rowIndex+"]").remove();
                });
            });
        });

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop