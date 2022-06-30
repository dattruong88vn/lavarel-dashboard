@extends('layout.default')
<?php 
	function coverDuration($data){
		$seconds = intval($data, 10);

		$days = floor($seconds / (3600*24));
		$seconds  -= $days*3600*24;
		$hrs   = floor($seconds / 3600);
		$seconds  -= $hrs*3600;
		$mnts = floor($seconds / 60);
		$seconds  -= $mnts*60;

		if($seconds > 0 || $hrs > 0 || $mnts > 0){
			$days = $days +1;
		}
		return $days;
	} 
?>
@section('page-css')
	<link rel="stylesheet" type="text/css" href="{{loadAsset('css\fontawesome-free-5.0.8\web-fonts-with-css\css\fontawesome-all.min.css')}}">
	<!-- <link rel="stylesheet" type="text/css" href="{{loadAsset('plugins/daterangepicker/daterangepicker-bs3.css')}}"> -->
	<style type="text/css">
		.ui-datepicker-calendar {
		    display: none;
		    }
	</style>
@stop

@section('content')
		@if(!empty($ba_summary))
		<div class="row">
			<input type="hidden" id="trackingFilterDate" value="default" name="">
			<input type="hidden" id="fromDate" name="fromDate" value="{{ $fromDate }}">
			<input type="hidden" id="toDate" name="toDate" value="{{ $toDate }}">
			<div class="col-md-12">
	          <div class="box">
	            
	            <div class="box-body">
	              <div class="row">
	                <div style="padding-top: 3%" class="col-md-6 col-md-offset-1">
	                  <div id="funnel"></div>
	                </div><!-- /.col -->
	                <div style="" class="col-md-4">
	                	<div class="row">
	                		<div class="col-md-12">
	                			<div><b>Deal total:</b> {{ $funel_all->funelTotal->totalDetalActive }} (active) / {{ $funel_all->funelTotal->totalDeal }}
				            	  	<div class="input-group" style="display: inline;,_margin-left: 38%; width: 100%; margin-bottom: 10px;">
				            	  	  <input type="text" class="monthPicker" style="position: absolute;visibility:hidden" name="daterange" value="">
			                            <button data-toggle="dropdown" aria-expanded="false" style="border: none;_float: left;_margin-left: 35%;" class="btn btn-default dropdown-toggle" id="daterange-btn">
			                                <i class="fas fa-calendar-alt"></i>
			                                {{$label}}
			                                <i class="fa fa-caret-down"></i>
			                            </button>
			                            <ul class="dropdown-menu" id="daterange-list">
			                                <li><a href="javascript:;" data-date="thisMonth">Tháng này</a></li>
			                                <li><a href="javascript:;" data-date="threeMonth">3 tháng trước</a></li>
			                                <li><a href="javascript:;" data-date="sixMonth">6 tháng trước</a></li>
			                                <li><a href="javascript:;" data-date="niceMonth">9 tháng trước</a></li>
			                                <li><a href="javascript:;" data-date="twelfthMonth">12 tháng trước</a></li>
			                                <li><a href="javascript:;" data-date="all">Tất cả</a></li>
			                            </ul>

			          	            	
				                    </div>
	                			</div>
	                			<hr style="margin:10px 0px 30px 0px;">
	                  			<div style="margin-bottom: 20px;" class="blockDuration">
	  	    		                <p class="">
	  	    		                  <strong>AVG Duration</strong>
	  	    		                </p>
	  	    			              <table style="margin-bottom: 0px;" class="table table-striped">
	  	    			                <tbody>
	  	    		                		<tr>
	  	    		                	      <td>Booking <i class="fas fa-arrow-right"></i> Meeting: {{coverDuration($ba_summary->avgDuration->booking)}} days</td>
	  	    		                	    </tr>
	  	    			                    <tr>
	  	    			                    	<td>Meeting <i class="fas fa-arrow-right"></i> Touring: {{coverDuration($ba_summary->avgDuration->meeting)}} days</td>
	  	    			                    </tr>
	  	    			                    	<tr>
	  	    			                          <td>Touring <i class="fas fa-arrow-right"></i> Negotiating: {{coverDuration($ba_summary->avgDuration->tour)}} days</td>
	  	    			                        </tr>
	  	    			                    <tr>
	  	    			                    	<td>Negotiating <i class="fas fa-arrow-right"></i> Desposit: {{coverDuration($ba_summary->avgDuration->negotiate)}} days</td>
	  	    			                    </tr>
	  	    			                    
	  	    			                <!-- <tr>
	  	    			                  <td>1.</td>
	  	    			                  <td>Update software</td>
	  	    			                  <td>
	  	    			                    <div class="progress progress-xs">
	  	    			                      <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
	  	    			                    </div>
	  	    			                  </td>
	  	    			                  <td><span class="badge bg-red">55%</span></td>
	  	    			                </tr> -->
	  	    			                
	  	    			              </tbody></table>
	  		                	</div>
	  		                	<div class="blockDuration">
		      		              <p class="">
		      	                  <strong>Conversion Rate</strong>
		      	                </p>
		      	                <table style="margin-bottom: 0px;" class="table table-striped">
		      	                  <tbody>
		      		                    <tr>
		      		                    	<td>Booking <i class="fas fa-arrow-right"></i> Meeting: {{ round($ba_summary->closingStatusCount->meeting_percen < 100 ? $ba_summary->closingStatusCount->meeting_percen: 100) }}%</td>
		      		                    </tr>
		      		                    <tr>
		      		                    	<td>Meeting <i class="fas fa-arrow-right"></i> Touring: {{ round($ba_summary->closingStatusCount->tour_percen <100 ? $ba_summary->closingStatusCount->tour_percen: 100) }}%</td>
		      		                    </tr>
		      		                    <tr>
		      		                    	<td>Touring <i class="fas fa-arrow-right"></i> Negotiating: {{ round($ba_summary->closingStatusCount->negotiate_percen < 100 ? $ba_summary->closingStatusCount->negotiate_percen: 100) }}%</td>
		      		                    </tr>
		      		                    <tr>
		      		                    	<td>Negotiating <i class="fas fa-arrow-right"></i> Desposit: {{ round($ba_summary->closingStatusCount->deposit_percen < 100 ? $ba_summary->closingStatusCount->deposit_percen:100) }}%</td>
		      		                    </tr>
		      	                  
		      	                </tbody></table>
			                  </div>
	                		</div>
	                		
	                	</div>
	  	              

	                </div><!-- /.col -->
	              </div><!-- /.row -->
	            </div><!-- ./box-body -->
	          </div><!-- /.box -->
	        </div>
			
		</div><!-- /.row -->
		@endif

		<div id="wrapTableSaleFunel">
			<div style="display: none;" class="row nav-tabs-custom">
				<div class="col-md-12">
					<h2 class="title-with-line"><span style="background-color: white;">Booking</span></h2>
		            <ul class="nav nav-tabs" style="padding-top: 10px;">
		            	@if(isset($_GET['date']))
		              		<li class="active"><a onclick="RenderTableBooking('#booking-table',24)" href="#tab_1" data-toggle="tab" aria-expanded="true">{!!$ba_summary->saleFor->label!!}</a></li>
		              	@endif
		              <li class=""><a onclick="RenderTableBooking('#booking-table',24,'all')" href="#tab_1" data-toggle="tab" aria-expanded="false">Xem tất cả</a></li>
		            </ul>
		            <div class="tab-content">
		              <div class="tab-pane active" id="tab_1">
		                <table id="booking-table" class="table table-striped table-striped-custom">
			                <thead>
			                	<tr>
			                	  <th>Tên KH</th>
				                  <th>Điểm KH</th>
				                  <th>Số ngày không đổi trạng thái</th>
				                  <th>Giá fix</th>
				                  <th>Tiến độ</th>
				                  <!-- <th>LPL</th> -->
				                  <th>LPD</th> 
				                </tr>
			              </thead>
			          	</table>
		              </div>
		            </div><!-- /.tab-content -->
				</div>
	        </div>

    		<div style="display: none;" class="row nav-tabs-custom">
    			<div class="col-md-12">
    				<h2 class="title-with-line"><span style="background-color: white;">Meeting</span></h2>
				    <ul class="nav nav-tabs" style="padding-top: 10px;">
				    	@if(isset($_GET['date']))
				      		<li class="active"><a onclick="RenderTableMeeting('#meeting-table',29)" href="#tab_1" data-toggle="tab" aria-expanded="true">{!!$ba_summary->saleFor->label!!}</a></li>
				      	@endif
				      <li class=""><a onclick="RenderTableMeeting('#meeting-table',29,'all')" href="#tab_1" data-toggle="tab" aria-expanded="false">Xem tất cả</a></li>
				    </ul>
				    <div class="tab-content">
				      <div class="tab-pane active" id="tab_1">
				      		<h5 id="totalMeeting"></h5>
							<table id="meeting-table" class="table table-striped">
				                <thead>
				                	<tr>
					                  <th>Tên KH</th>
					                  <th>Điểm KH</th>
					                  <th>Số ngày không đổi trạng thái</th>
					                  <th>Giá fix</th>
					                  <th>Tiến độ</th>
					                  <th>Số meeting</th>
					                  <!-- <th>LPL</th> -->
					                  <th>LPD</th>   
					                </tr>
				              </thead>
				          	</table>
				      </div>
				    </div><!-- /.tab-content -->
    			</div>
            </div>

    		<div style="display: none;" class="row nav-tabs-custom">
    			<div class="col-md-12">
    				<h2 class="title-with-line"><span style="background-color: white;">Touring</span></h2>
	                <ul class="nav nav-tabs" style="padding-top: 10px;">
	                	@if(isset($_GET['date']))
	                  		<li class="active"><a onclick="RenderTableTour('#touring-table',25)" href="#tab_1" data-toggle="tab" aria-expanded="true">{!!$ba_summary->saleFor->label!!}</a></li>
	                  	@endif
	                  <li class=""><a onclick="RenderTableTour('#touring-table',25,'all')" href="#tab_1" data-toggle="tab" aria-expanded="false">Xem tất cả</a></li>
	                </ul>
	                <div class="tab-content">
	                  <div class="tab-pane active" id="tab_1">
	                  	<h5 id="totalTour"></h5>
						<table id="touring-table" class="table table-striped">
			                <thead>
			                	<tr>
				                  <th>Tên khách hàng</th>
				                  <th>Số ngày không đổi trạng thái</th>
				                  <th>Giá fix</th>
				                  <th>LPD</th>
				                  <!-- <th>LPC</th> -->
				                  <th>Tours</th>
				                  <th>Số listing đã xem</th>   
				                </tr>
			              </thead>
			          	</table>
	                  </div>
	                </div><!-- /.tab-content -->
    			</div>
            </div>

    		<div style="display: none;" class="row nav-tabs-custom">
    			<div class="col-md-12">
    				<h2 class="title-with-line"><span style="background-color: white;">Negotiating</span></h2>
	                <ul class="nav nav-tabs" style="padding-top: 10px;">
	                	@if(isset($_GET['date']))
	                  		<li class="active"><a onclick="RenderTableNego('#negotiating-table',26)" href="#tab_1" data-toggle="tab" aria-expanded="true">{!!$ba_summary->saleFor->label!!}</a></li>
	                  	@endif
	                  <li class=""><a onclick="RenderTableNego('#negotiating-table',26,'all')" href="#tab_1" data-toggle="tab" aria-expanded="false">Xem tất cả</a></li>
	                </ul>
	                <div class="tab-content">
	                  <div class="tab-pane active" id="tab_1">
						<table id="negotiating-table" class="table table-striped">
			                <thead>
			                	<tr>
			                	  <th>Tên KH</th>
				                  <th>Listing ID đang thương lượng</th>  
				                </tr>
			              </thead>
			          	</table>
	                  </div>
	                </div><!-- /.tab-content -->
    			</div>
            </div>

    		<div style="display: none;" class="row nav-tabs-custom">
    			<div class="col-md-12">
    				<h2 class="title-with-line"><span style="background-color: white;">Deposit</span></h2>
	                <ul class="nav nav-tabs" style="padding-top: 10px;">
	                	@if(isset($_GET['date']))
	                  		<li class="active"><a onclick="RenderTableDepo('#deposit-table',27)" href="#tab_1" data-toggle="tab" aria-expanded="true">{!!$ba_summary->saleFor->label!!}</a></li>
	                  	@endif
	                  <li class=""><a onclick="RenderTableDepo('#deposit-table',27,'all')" href="#tab_1" data-toggle="tab" aria-expanded="false">Xem tất cả</a></li>
	                </ul>
	                <div class="tab-content">
	                  <div class="tab-pane active" id="tab_1">
						<table id="deposit-table" class="table table-striped">
			                <thead>
			                	<tr>
			                	  <th>Tên KH</th>
				                  <th>Listing ID đặt cọc</th> 
				                </tr>
			              </thead>
			          	</table>
	                  </div>
	                </div><!-- /.tab-content -->
    			</div>
            </div>
			<!-- <div class="row" style="display: none;">
				<div class="col-md-12">
					<h2 class="title-with-line"><span>Booking</span></h2>
					<div class="box">
						<div class="box-body">
							<table id="booking-table" class="table table-striped table-striped-custom">
				                <thead>
				                	<tr>
				                	  <th>Tên KH</th>
					                  <th>Điểm KH</th>
					                  <th>Số ngày không đổi trạng thái</th>
					                  <th>Tiến độ</th>
					                  <th>LPD</th> 
					                </tr>
				              </thead>
				          	</table>
						</div>
					</div>
				</div>
				
			</div> -->

			<!-- <div class="row" style="display: none;">
				<div class="col-md-12">
					<h2 class="title-with-line"><span>Meeting <small id="totalMeeting"></small></span></h2>
					<div class="box">
						<div class="box-body">
							<table id="meeting-table" class="table table-striped">
				                <thead>
				                	<tr>
					                  <th>Tên KH</th>
					                  <th>Điểm KH</th>
					                  <th>Số ngày không đổi trạng thái</th>
					                  <th>Tiến độ</th>
					                  <th>Số meeting</th>
					                  <th>LPD</th>   
					                </tr>
				              </thead>
				          	</table>
						</div>
					</div>
				</div>
				
			</div> -->

			<!-- <div class="row" style="display: none;">
				<div class="col-md-12">
					<h2 class="title-with-line"><span>Tour <small id="totalTour"></small></span></h2>
					<div class="box">
						<div class="box-body">
							<table id="touring-table" class="table table-striped">
				                <thead>
				                	<tr>
					                  <th>Tên khách hàng</th>
					                  <th>Số ngày không đổi trạng thái</th>
					                  <th>LPD</th>
					                  <th>Tours</th>
					                  <th>Số listing đã xem</th>   
					                </tr>
				              </thead>
				          	</table>
						</div>
					</div>
				</div>
				
			</div> -->

			<!-- <div class="row" style="display: none;">
				<div class="col-md-12">
					<h2 class="title-with-line"><span>Negotiate</span></h2>
					<div class="box">
						<div class="box-body">
							<table id="negotiating-table" class="table table-striped">
				                <thead>
				                	<tr>
				                	  <th>Tên KH</th>
					                  <th>Listing ID đang thương lượng</th>  
					                </tr>
				              </thead>
				          	</table>
						</div>
					</div>
				</div>
				
			</div> -->

			<!-- <div class="row" style="display: none;">
				<div class="col-md-12">
					<h2 class="title-with-line"><span>Deposit</span></h2>
					<div class="box">
						<div class="box-body">
							<table id="deposit-table" class="table table-striped">
				                <thead>
				                	<tr>
				                	  <th>Tên KH</th>
					                  <th>Listing ID đặt cọc</th> 
					                </tr>
				              </thead>
				          	</table>
						</div>
					</div>
				</div>
				
			</div> -->
		</div>
@stop

@section('page-js')
	<script type="text/javascript" src="/plugins/datatables/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/plugins/datatables/dataTables.bootstrap.js"></script>
	<script src="https://d3js.org/d3.v4.min.js"></script>
	<script type="text/javascript" src="{{loadAsset('d3-funnel-master\dist\d3-funnel.min.js') }}"></script>
	<script type="text/javascript" src="{{loadAsset('js\crm-sale-funel\sale-funel-datatable.js') }}"></script>
	<!-- <script type="text/javascript" src="{{loadAsset('plugins/daterangepicker/daterangepicker.js') }}"></script> -->
	<script type="text/javascript" src="{{loadAsset('js\dashboard.js') }}"></script>
	<script type="text/javascript">
		var funnel_all = '{{ json_encode($funel_all) }}';
		var funel_month = '{{ json_encode($funel_month) }}';
	</script>
	<script type="text/javascript" src="{{loadAsset('js\crm-sale-funel\sale-funel-config.js') }}"></script>
	<script type="text/javascript" src="{{loadAsset('js\crm-sale-funel\function.js') }}"></script>
	<script type="text/javascript" src="{{loadAsset('js\crm-sale-funel\scripts.js') }}"></script>
	<script type="text/javascript" src="{{loadAsset('js\jm_commons\leadDealDetail\scripts.js')}}"></script>

@stop