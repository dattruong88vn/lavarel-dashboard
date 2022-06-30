@extends('layout.default')

@section('content')
	<div class="list-city">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
	                <div class="box-header with-border">
	                  <h3 class="box-title">Danh sách Tỉnh/Thành phố</h3>
	                </div><!-- /.box-header -->
	                <div class="box-body">
	                	<table id="table-city" class="table table-bordered table-striped table-listing">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Tên Tỉnh/Thành phố</th>
                                <th>Quốc gia</th>
                                <th>Tình trạng</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                              </tr>
                            </thead>
                            <tbody>
                               <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><a href="#">Hồ Chí Minh</a></td>
                                    <td>Việt Nam</td>
                                    <td></td>
                                    <td>20/10/2015</td>
                                    <td>21/10/2015</td>
                                </tr>
                            </tbody>
                        </table>
	                </div>
	            </div>
			</div>
		</div>
	</div>
@endsection

@section('page-js')
    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>    
    <script>
       $(function () {
           fixDataTableVNSearch("#table-city");
           $("#table-city").DataTable();
        });		
    </script>
@stop
@section('page-css')
     <link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
     <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop