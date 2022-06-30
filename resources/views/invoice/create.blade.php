@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='page-invoice'>
	<section></section>
	<section>
		<div class="row btn-group-invoice text-center">
			<a href="#" class="btn btn-primary margin">IN</a>
			<a href="#" class="btn btn-primary margin">DOWNLOAD PDF</a>
			<a href="#" class="btn btn-primary margin">REVIEW</a>
		</div>

		<div class="db-tm-item deal-tm-invoice">
			<div class="row">
				<div class="col-md-12">                
				  <div class="box box-primary">
				    <div class="box-header with-border">
				      <h3 class="box-title">THÔNG TIN INVOICE</h3>
				    </div>
				    <form class="form-horizontal">
				        <div class="box-body">
				        	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Mã giao dịch *</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="" placeholder="Mã giao dịch">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Subject *</label>
								<div class="col-sm-4">
									<input type="text" class="form-control">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Status *</label>
								<div class="col-sm-4">
									<select class="form-control">
										<option selected="selected">Draft</option>
									</select>
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Invoice date</label>
								<div class="col-sm-4 m-t-7">15/04/2016</div>
				            </div>
				            <div class="form-group">
			                	<label for="" class="col-sm-2 control-label">Pay Before:</label>
			                	<div class="col-sm-10">
				                	<div class="input-group date" data-provide="datepicker">
									    <input type="text" class="form-control">
									    <div class="input-group-addon">
									        <i class="fa fa-calendar"></i>
									    </div>
									</div>
								</div>
			                </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Tên quản lý giao dịch:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Tên quản lý giao dịch">
								</div>
								<label for="" class="col-sm-2 control-label">Tên dịch vụ khách hàng:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Tên dịch vụ khách hàng">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Supervisor:</label>
								<div class="col-sm-10">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Châu</option>
										<option>Đào Hồng Gấm</option>
									</select>
								</div>
			                </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Invoice currency:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="VND">
								</div>
								<label for="" class="col-sm-2 control-label">DEAL gốc:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Payment method:</label>
								<div class="col-sm-4">
									<select class="form-control">
										<option selected="selected">Cash</option>
									</select>
								</div>
				            </div>
				        </div>
				    </form>
				  </div>
				</div>
			</div>
	    </div>

	    <div class="db-tm-item deal-tm-seller">
			<div class="row">
				<div class="col-md-12">                
				  <div class="box box-primary">
				    <div class="box-header with-border">
				      <h3 class="box-title">THÔNG TIN BÊN BÁN</h3>
				    </div>
				    <form class="form-horizontal">
				        <div class="box-body">
				        	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Tên chủ nhà:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="" placeholder="Tên chủ nhà">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Tên công ty môi giới:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Tên công ty môi giới">
								</div>
								<div class="col-sm-2">
									<button class="btn btn-primary makeCallReminder">Tạo call reminder</button>
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Tên đối tác môi giới:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Tên đối tác môi giới">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Phone</label>
								<div class="col-sm-4">
									<div class="input-group">
									    <input type="number" class="form-control">
									    <span class="input-group-addon"><i class="fa fa-phone"></i></span>
									</div>
								</div>
								<label for="" class="col-sm-2 control-label">Email</label>
								<div class="col-sm-4">
									<div class="input-group">
									    <input type="email" class="form-control">
									    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
									</div>
								</div>
			                </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Địa chỉ</label>
								<div class="col-sm-10">
									<input type="text" class="form-control">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Mã số thuế</label>
								<div class="col-sm-4">
									<input type="number" class="form-control">
								</div>
			                </div>
				        </div>
				    </form>
				  </div>
				</div>
			</div>
	    </div>

	    <div class="db-tm-item deal-tm-products">
			<div class="row">
				<div class="col-md-12">                
				  <div class="box box-primary">
				    <div class="box-header with-border">
				      <h3 class="box-title">THÔNG TIN SẢN PHẨM</h3>
				    </div>
				    <form class="form-horizontal">
				        <div class="box-body">
				        	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Product Type:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="" placeholder="Product Type">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Transaction Type:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Transaction Type">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Lead Type:</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Lead Type">
								</div>
				            </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Value</label>
								<div class="col-sm-4">
									<input type="number" class="form-control">
								</div>
			                </div>
			                <div class="form-group">
								<label for="" class="col-sm-2 control-label">Commision (bằng số):</label>
								<div class="col-sm-4">
									<input type="number" class="form-control" placeholder="Commision (bằng số)">
								</div>
			                </div>
				            <div class="form-group">
								<label for="" class="col-sm-2 control-label">Commision (bằng chữ):</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" placeholder="Commision (bằng chữ)">
								</div>
				            </div>
				        </div>
				    </form>
				  </div>
				</div>
			</div>
	    </div>

	    <div class="db-tm-item deal-tm-note">
			<div class="row">
				<div class="col-md-12">                
				  <div class="box box-primary">
				    <div class="box-header with-border">
				      <h3 class="box-title">GHI CHÚ</h3>
				    </div>
				    <form class="form-horizontal">
				        <div class="box-body">
				        	<div class="form-group">
								<div class="col-sm-12">
									<textarea class="form-control" placeholder="Ghi chú"></textarea>
								</div>
				            </div>
				        </div>
				    </form>
				  </div>
				</div>
			</div>
	    </div>

	    <div class="btn-group-invoice text-center">
	    	<a href="#" class="btn btn-success margin">Save</a>
	    	<a href="#" class="btn btn-warning margin">Request Contract</a>
	    </div>
	    <br><br>
	    <div class="db-tm-item deal-tm-stream">
     		<div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		            <div class="box-body">
		            	<div class="nav-tabs-stream">
							<ul class="nav nav-tabs">
								<li class="active"><a href="#tab_stream_1" data-toggle="tab">Stream</a></li>
								<li><a href="#tab_stream_2" data-toggle="tab">Activity</a></li>
								<li><a href="#tab_stream_3" data-toggle="tab">Products</a></li>
								<li><a href="#tab_stream_4" data-toggle="tab">History</a></li>
							</ul>
							<div class="tab-content">
								<div class="tab-pane active" id="tab_stream_1">
									<div class="nav-tabs-events">
										<ul class="nav nav-tabs">
											<li class="active"><a href="#tab_events_1" data-toggle="tab">+ Call</a></li>
										</ul>
										<div class="tab-content">
											<div class="tab-pane active" id="tab_events_1">
												Call
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane" id="tab_stream_2">
									Activity
								</div>
								<div class="tab-pane" id="tab_stream_3">
									Products
								</div>
								<div class="tab-pane" id="tab_stream_4">
									History
								</div>
							</div>				
					    </div>
		            </div>
		          </div>
		        </div>
	      </div>
	    </div>
	</section>
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />

@stop