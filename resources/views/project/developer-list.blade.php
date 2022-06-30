@extends('layout.default')

@section('content')
    <div class="listing">
        <div class="row">
            <div class="col-md-12">                
                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">{{ $title ? $title : "Danh sách" }}</h3>
                    </div><!-- /.box-header -->
                    <div class="box-body">
                       
                        <table id="table-developer" class="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Tên</th>
                                <th>Tình trạng</th>
                              </tr>
                            </thead>
                            <tbody>
                                @foreach($developerList->data as $developer)
                               <tr>
                                    <td><a href="developer-edit/{{ $developer->investorId }}">{{ $developer->investorId }} </a></td>
                                    <td>{{ $developer->investorName }}</td>
                                    <td>
                                    @if($developer->isDeleted)
                                      Tạm ngừng hoạt động
                                    @else
                                      Đang hoạt động
                                    @endif
                                  </td>
                               
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <!-- <div class="pull-left">
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
                        </div> -->
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
            fixDataTableVNSearch("#table-developer");
            $("#table-developer").DataTable({
                //"scrollX": true
            });

           


            // $("select.form-control, input.filter-date").change(function(){
            //     var type = $(this).attr('id');
            //     switch(type) {
            //         case 'building-name':
            //             filterListing.buildingId = parseInt($(this).val());
            //             console.log(filterListing.buildingId);
            //             break;
            //         case 'property-type':
            //             filterListing.propertyTypeId = parseInt($(this).val());
            //             console.log(filterListing.propertyTypeId);
            //             break;
            //         case 'source':
            //             filterListing.source = parseInt($(this).val());
            //             console.log(filterListing.source);
            //             break;                      
            //         // default:
            //         //     default code block
            //     }
            // });
        });

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop