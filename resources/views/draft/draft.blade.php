@extends('layout.default')

@section('content')
    <div class="listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Danh sách Listing</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                        <table id="table-listing" class="table table-bordered table-striped table-listing">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Người tạo</th>
                                <th>Bước</th>
                                <th>Loại hình</th>
                                <th>Loại BĐS</th>
                                <th>Ngày đăng</th>
                                <th class="width-col">Địa chỉ</th>
                              </tr>
                            </thead>
                            <tbody>
                                @foreach($listingList as $listing)
                               <tr>
                                    <td><a href="/draft/{{ $listing['draftId'] or ""}}">{{ $listing['draftId'] or ""}}</a></td>
                                    <td><a href="/draft/{{ $listing['draftId'] or ""}}">
                                        {{ $listing['socialUser']->name or "--"}} <br/>
                                        {{ $listing['socialUser']->phone or ""}}
                                        </a>
                                    </td>
                                    <td>{{ $listing['step'] or ""}}</td>
                                    <td>{{ $listing['listingTypeName'] or ""}}</td>
                                    <td>{{ $listing['propertyTypeName'] or ""}}</td>
                                    <td>
                                        @if(isset($listing['createdDate']))    
                                            <br>{{ date('d-m-Y H:i:s', $listing['createdDate']/1000) }}
                                        @endif
                                    </td>
                                    <td>{{ $listing['address'] or ""}}</td>
                                   
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <div class="pull-left">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary">Delete</button>
                                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="#">Delete</a></li>
                                    <li><a href="#">Deactive</a></li>
                                    <li><a href="#">Duplicate</a></li>
                                </ul>
                            </div>
                        </div>
                    </div><!-- /.box-body -->                    
              </div><!-- /.box -->
            </div>
        </div>
    </div>
@endsection

@section('page-js')
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
     <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
        $(function () {
            fixDataTableVNSearch("#table-listing");
            $("#table-listing").DataTable({
                "scrollX": true
            });

            var dateCreate = $('#date-create').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
                $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
                filterListing.deletedDate = e.timeStamp;
              //console.log(e.timeStamp)
            });

            $('#date-live').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
               $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
               filterListing.deletedDate = e.timeStamp;
              //code
            });

            $('#date-delete').datepicker({
                format: 'dd-mm-yyyy'
            }).on('changeDate', function(e) {
                $(this).parent().find('input[type="hidden"]').val(e.timeStamp)
                filterListing.deletedDate = e.timeStamp;
                //code
            });


            var filterListing = {
              "buildingId":83,
              "propertyTypeId":1,
              "source":"BD",
              "createdDate":347327460000,
              "reviewedDate":347327460000,
              "deletedDate":347327460000
            }
        });

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop