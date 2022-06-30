@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class="page-contact">
	<section></section>
	<section>
		<div class="db-tm-item deal-tm-filter-contact">
     		<div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		            <div class="box-body">
		            	<div class="nav-tabs-filter-contact">
							<ul class="nav nav-tabs">
								<li class="active"><a href="#tab_filter_contact_1" data-toggle="tab">Filter</a></li>
								<li><a href="#tab_filter_contact_2" data-toggle="tab">My Contacts</a></li>
								<li><a href="#tab_filter_contact_3" data-toggle="tab">Modified by Me</a></li>
								<li><a href="#tab_filter_contact_4" data-toggle="tab">Primary Coverage Area</a></li>
								<li><a href="#tab_filter_contact_5" data-toggle="tab">Specialty</a></li>
								<li><a href="#tab_filter_contact_6" data-toggle="tab">+</a></li>
							</ul>
							<div class="tab-content">
								<div class="tab-pane active" id="tab_filter_contact_1">
									<form class="form-horizontal m-t-20">
										<div class="form-group">
											<label for="" class="col-sm-2 control-label">Search:</label>
											<div class="col-sm-5">
												<input type="text" class="form-control">
											</div>
											<div class="col-sm-4">
												<select class="form-control select2" style="width: 100%;">
													<option selected="selected">First and Last Name</option>
												</select>
											</div>
											<div class="col-sm-1">
												<a href="#" class="btn btn-default">-</a>
											</div>
										</div>
										<div class="form-group">
											<label for="" class="col-sm-2 control-label">Companies:</label>
											<div class="col-sm-9 m-t-7">
												<a href="#">Select</a>
											</div>
											<div class="col-sm-1">
												<a href="#" class="btn btn-default">-</a>
											</div>
										</div>
										<div class="form-group">
											<label for="" class="col-sm-2 control-label">Contact Type:</label>
											<div class="col-sm-9">
												<select multiple="" class="form-control">
								                    <option>(none)</option>
								                    <option>Agent</option>
								                    <option>Buyer</option>
								                    <option>Renter</option>
								                </select>
											</div>
											<div class="col-sm-1">
												<a href="#" class="btn btn-default">-</a>
											</div>
										</div>
										<div class="form-group">
											<label for="" class="col-sm-2 control-label">Modified:</label>
											<div class="col-sm-9">
												<select class="form-control select2" style="width: 100%;">
													<option selected="selected">(no)</option>
												</select>
											</div>
											<div class="col-sm-1">
												<a href="#" class="btn btn-default">-</a>
											</div>
										</div>
										<hr>
										<div class="col-sm-6">
											<a href="#" class="btn btn-success">SAVE</a>
											<a href="#" class="btn btn-warning m-l-10">CANCEL</a>
										</div>
										<div class="col-sm-6 text-right">
											<a href="#" class="btn btn-default"><i class="fa fa-cog"></i></a>
											<a href="#" class="btn btn-default m-l-10">+</a>
										</div>
									</form>
								</div>
								<div class="tab-pane" id="tab_filter_contact_2">
									My Contacts
								</div>
								<div class="tab-pane" id="tab_filter_contact_3">
									Modified by Me
								</div>
								<div class="tab-pane" id="tab_filter_contact_4">
									Primary Coverage Area
								</div>
							</div>				
					    </div>
		            </div>
		          </div>
		        </div>
	      	</div>
	    </div>

	    <div class="db-tm-item deal-tm-result-contact">
     		<div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		          	<div class="box-header with-border">
		              	<div class="btn-group-table">
		            		<a href="#" class="btn btn-success">Add</a>
		            		<a href="#" class="btn btn-default pull-right"><i class="fa fa-cog"></i></a>
		            	</div>
		            </div>
		            <div class="box-body">
		            	<div class="alert alert-info bg-teal">
			                You no longer need to enter company details in your invoice every time you create them. Add company details for your clients in CRM once, and you'll be able to use them when you work with varous CRM records. If you entered company detail earlier, you can transfer them automatically now. 
			                <a href="#">Transfer.</a>
			            </div>
		            	<table id="table-contact" class="table table-bordered table-striped">
							<thead>
							<tr>
								<th><input type="checkbox"></th>
								<th>Contact</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Address</th>
								<th>Contact Type</th>
								<th>Specialty</th>
								<th>Primary Coverage Area</th>
								<th>Created by</th>
								<th>Ngày tham gia (created date)</th>
								<th>Số tin đăng trong 7 ngày gần đây</th>
								<th>Số tin đăng trong 1 tháng gần đây</th>
								<th>Số tin đăng trong 2 tháng gần đây</th>
							</tr>
							</thead>
							<tbody>
							<?php for ($i = 0; $i < 6; $i++): ?>
							<tr>
								<td><input type="checkbox"></td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
								<td>{{$i}}</td>
							</tr>
							<?php endfor; ?>
							</tbody>
						</table>
		            </div>
		          </div>
		        </div>
	      </div>
	    </div>

	    <div class="db-tm-item deal-tm-create-contact">
     		<div class="row">
		        <div class="col-md-12">                
		          <div class="box box-primary">
		          	<div class="box-header with-border">
		              	<h3 class="box-title">TẠO CONTACT MỚI</h3>
		            </div>

		            <form class="form-horizontal">
			            <div class="box-body">
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Số điện thoại:</label>
								<div class="col-sm-5">
									<input type="text" class="form-control">
								</div>
								<div class="col-sm-4">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Work</option>
									</select>
								</div>
								<div class="col-sm-1 text-right">
									<a href="#" class="btn btn-default">+</a>
								</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label"></label>
								<div class="col-sm-5">
									<input type="text" class="form-control">
								</div>
								<div class="col-sm-4">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Work</option>
									</select>
								</div>
								<div class="col-sm-1 text-right">
									<a href="#" class="btn btn-default">+</a>
								</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Địa bàn hoạt động:</label>
			            		<div class="col-sm-10 m-t-7">
			            			<div class="col-sm-2">
										<input type="checkbox"> Quận 1
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 2
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 3
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 4
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 5
									</div>
			            		</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label"></label>
			            		<div class="col-sm-10 m-t-7">
			            			<div class="col-sm-2">
										<input type="checkbox"> Quận 6
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 7
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 8
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 9
									</div>
									<div class="col-sm-2">
										<input type="checkbox"> Quận 10
									</div>
			            		</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Họ tên:</label>
			            		<div class="col-sm-10">
			            			<input type="text" class="form-control">
			            		</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Email:</label>
								<div class="col-sm-5">
									<input type="email" class="form-control">
								</div>
								<div class="col-sm-4">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Work</option>
									</select>
								</div>
								<div class="col-sm-1 text-right">
									<a href="#" class="btn btn-default">+</a>
								</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label"></label>
								<div class="col-sm-5">
									<input type="email" class="form-control">
								</div>
								<div class="col-sm-4">
									<select class="form-control select2" style="width: 100%;">
										<option selected="selected">Work</option>
									</select>
								</div>
								<div class="col-sm-1 text-right">
									<a href="#" class="btn btn-default">+</a>
								</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Responsible</label>
								<div class="col-sm-10">
									<input type="text" class="form-control">
								</div>
								</div>
			            	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Nguồn</label>
								<div class="col-sm-10">
									<select class="form-control">
										<option selected="selected">Call</option>
									</select>
								</div>
			            	</div>
			            	<div class="form-group">
			            		<label for="" class="col-sm-2 control-label">Miêu tả</label>
								<div class="col-sm-10 m-t-7">
									aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
								</div>
			            	</div>
			            	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Chuyên môn</label>
								<div class="col-sm-10">
									<select class="form-control">
										<option selected="selected">No</option>
									</select>
								</div>
			            	</div>
			            	<div class="form-group">
								<label for="" class="col-sm-2 control-label">Contact Type</label>
								<div class="col-sm-10">
									<select class="form-control">
										<option selected="selected">Agent</option>
										<option>Buyer</option>
									</select>
								</div>
			            	</div>
			            	<div class="btn-create-contact text-center">
			            		<a href="#" class="btn btn-warning">Hủy</a>
			            		<a href="#" class="btn btn-success margin">Lưu</a>
			            		<a href="#" class="btn btn-primary">Lưu và tạo contact mới</a>
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
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>


<script type="text/javascript">
	$(document).ready(function () {
	  $("#table-contact").DataTable({
	  	"scrollX": true
	  });
	});
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop