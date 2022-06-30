@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class="page-check-activity">
	<section></section>
	<section>
		<div class="row form-group input-search">
			<div class="col-sm-6">
            	<div class="input-group">
				    <input type="text" class="form-control" placeholder="Type LID vô, cách nhau bởi dấu phẩy">
				    <div class="input-group-addon">
				        <i class="fa fa-search"></i>
				    </div>
				</div>
			</div>
			<div class="col-sm-6">
            	<div class="input-group">
				    <input type="text" class="form-control" placeholder="Type sdt cuar MG vô để tìm lịch sử các yêu cầu tìm kiếm của MG">
				    <div class="input-group-addon">
				        <i class="fa fa-search"></i>
				    </div>
				</div>
			</div>
		</div>

		<div class="db-tm-item deal-tm-result-search">
	      	<div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">KẾT QUẢ</h3>
		            </div>
		            <form class="form-horizontal">
			            <div class="box-body">
			            	<?php for ($i = 0; $i < 3; $i++): ?>
								<div class="col-md-4">
									<img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
									<div class="text-center">
										<p>LID | Size (bed/bath) | Price | Address</p>
										<p class="p-call"><a href="#"><span class="icon-st-item"><i class="fa fa-phone"></i></span></a></p>
										<div class="btn-group">
											<a href="#" class="btn btn-default">CÒN TRỐNG</a>
											<a href="#" class="btn btn-default">DEACTIVATE</a>
										</div>
									</div>
								</div>
							<?php endfor; ?>
							<div class="col-sm-12 text-center m-t-20">
								<a href="#" class="btn btn-success margin">Tạo lead với những listing còn trống theo tên và ID của người MG</a>
								<a href="#" class="btn btn-success margin">Lưu tìm kiếm theo tên và ID của môi giới</a>
								<a href="#" class="btn btn-danger margin">Cancel</a>
							</div>
			            </div>
		            </form>
		          </div>
		        </div>
	     	</div>
	    </div>

	    <div class="db-tm-item deal-tm-agent-search">
		    <div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		            <div class="box-header with-border">
		              <h3 class="box-title">YÊU CẦU TÌM KIẾM CỦA MÔI GIỚI</h3>
		            </div>
		            <form class="form-horizontal">
			            <div class="box-body">
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label"></label>
								<div class="col-sm-10">
									<input type="text" class="form-control" id="" placeholder="Check availbility ID (auto)">
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-2 control-label">Tên môi giới:</label>
								<div class="col-sm-4">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Nguyễn Văn A</option>
										<option>Đào Hồng Gấm</option>
									</select>
								</div>
								<label for="" class="col-sm-2 control-label">Cty MG trực thuộc:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="" placeholder="">
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-2 control-label">ID của môi giới:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control">
								</div>
								<label for="" class="col-sm-2 control-label">SDT của MG:</label>
								<div class="col-sm-4">
									<input type="number" class="form-control">
								</div>
								</div>
			                <div class="form-group">
								<label for="" class="col-sm-2 control-label">Email của MG:</label>
								<div class="col-sm-10">
									<div class="input-group">
									    <input type="email" class="form-control">
									    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
									</div>
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-2 control-label">Các loại hình giao dịch chuyên môn:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control">
								</div>
								<label for="" class="col-sm-2 control-label">Các khu vực chuyên môn:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control">
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-4 control-label">Tổng số lần yêu cầu tìm kiếm của môi giới</label>
								<div class="col-sm-2">
									<input type="number" class="form-control">
								</div>
								<label for="" class="col-sm-4 control-label">Tổng số giao dịch đang diễn ra với MG</label>
								<div class="col-sm-2">
									<input type="number" class="form-control">
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-4 control-label">Tổng số giao dịch đã thành công của MG</label>
								<div class="col-sm-2">
									<input type="number" class="form-control">
								</div>
								<label for="" class="col-sm-4 control-label">Tổng số giao dịch ko thành công của MG</label>
								<div class="col-sm-2">
									<input type="number" class="form-control">
								</div>
			                </div>
			                <hr>
			                <div class="">
			                	<div class="nav-tabs-stream">
									<ul class="nav nav-tabs">
										<li class="active"><a href="#tab_stream_1" data-toggle="tab">LỊCH SỬ YÊU CẦU TÌM KIẾM</a></li>
										<li><a href="#tab_stream_2" data-toggle="tab">LỊCH SỬ GIAO DỊCH THÀNH CÔNG</a></li>
										<li><a href="#tab_stream_3" data-toggle="tab">SỐ GIAO DỊCH ĐANG DIỄN RA</a></li>
										<li><a href="#tab_stream_4" data-toggle="tab">LỊCH SỬ GIAO DỊCH KHÔNG THÀNH CÔNG</a></li>
									</ul>
									<div class="tab-content">
										<div class="tab-pane active" id="tab_stream_1">
											<table id="table-deal-match" class="table table-bordered table-striped">
								                <thead>
								                  <tr>
								                    <th style="width: 10px">#</th>
								                    <th>Check availbility ID  </th>
								                    <th>Số listing yêu cầu check</th>
								                    <th>Ngày tháng năm</th>
								                    <th>Nảy sinh giao dịch (có/ko)</th>
								                  </tr>
								                </thead>
								                <tbody>
								                  <tr>
								                    <td>1</td>
								                    <td>123</td>
								                    <td>12/03/2016</td>
								                    <td>bbb</td>
								                    <td>Không</td>
								                  </tr>
								                  <tr>
								                    <td>2</td>
								                    <td>123</td>
								                    <td>12/03/2016</td>
								                    <td>bbb</td>
								                    <td>Không</td>
								                  </tr>
								                </tbody>
								                <tfoot>
								                  <tr>
								                    <th style="width: 10px">#</th>
								                    <th>Check availbility ID  </th>
								                    <th>Số listing yêu cầu check</th>
								                    <th>Ngày tháng năm</th>
								                    <th>Nảy sinh giao dịch (có/ko)</th>
								                  </tr>
								                </tfoot>
								              </table>
										</div>
										<div class="tab-pane" id="tab_stream_2">
											LỊCH SỬ GIAO DỊCH THÀNH CÔNG
										</div>
										<div class="tab-pane" id="tab_stream_3">
											SỐ GIAO DỊCH ĐANG DIỄN RA
										</div>
										<div class="tab-pane" id="tab_stream_4">
											LỊCH SỬ GIAO DỊCH KHÔNG THÀNH CÔNG
										</div>
									</div>				
							    </div>
			                </div>
			            </div>
		            </form>
		          	</div>
		        </div>
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
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />

@stop