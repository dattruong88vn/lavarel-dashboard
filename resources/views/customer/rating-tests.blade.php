<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<div class='page-rating-tests'>
	<form method="post" id="" class="form-horizontal">
	    <section>
	        <div class="db-tm-item deal-tm-rating-tests">
	            <div class="row">
	                <div class="col-md-12">                
	                    <div class="box box-primary">
	                        <div class="box-header with-border">
	                            <h3 class="box-title">HỒ SƠ KHÁCH HÀNG</h3>
	                        </div>
	                        <div class="box-body">
	                            <div class="form-group">
	                            	<div class="col-sm-8">
	                            		<textarea class="form-control" placeholder="Search thông tin khách hàng theo tên, lead/deal id, sdt, email"></textarea>
	                            	</div>
	                            	<button class="btn btn-warning margin">Add</button>
	                            </div>
	                            
                            	<table id="" class="table table-bordered table-striped">
		                            <thead>
		                                <tr>
		                                    <th>Contact</th>
		                                    <th>Phone</th>
		                                    <th>Email</th>
		                                    <th>Address</th>
		                                    <th>Điểm</th>
		                                    <th>deal/lead id</th>
		                                    <th>Primary Coverage Area</th>
		                                    <th>Created by</th>
		                                    <th>Created</th>
		                                    <th>Modified</th>
		                                </tr>
		                            </thead>
		                            <tbody>
		                                <tr>
		                                    <td>Châu Trang</td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                </tr>
		                                <tr>
		                                    <td>Sơn Trinh</td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                    <td></td>
		                                </tr>
		                            </tbody>
		                        </table>
	                           
	                        </div>                        
	                    </div>
	                </div>
	            </div>
	        </div>

	        <div class="db-tm-item deal-tm-rating-tests-1">
	            <div class="row">
	                <div class="col-md-12">                
	                    <div class="box box-primary">
	                        <div class="box-header with-border">
	                            <h3 class="box-title">Châu Trang</h3>
	                        </div>
	                        <div class="box-body">
                                <ul class="nav nav-tabs">
									<li class="active"><a href="#tab_customer_1" data-toggle="tab">01/08/2016</a></li>
									<li><a href="#tab_customer_2" data-toggle="tab">27/07/2016</a></li>
								</ul>
								<div class="tab-content">
									<div class="tab-pane active" id="tab_customer_1">
										01/08/2016
									</div>
									<div class="tab-pane" id="tab_customer_2">
										27/07/2016
									</div>
								</div>
	                        </div>                        
	                    </div>
	                </div>
	            </div>
	        </div>

	    </section>
	</form>
</div>

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript">    
// Nội dung js ở đây
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop