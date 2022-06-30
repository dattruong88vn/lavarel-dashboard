@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
 
<div class='page-deal'>
  <section>

  </section>

  <section>
    <div class="db-tm-item deal-tm-customer-info">
      <div class="row">
        <div class="col-md-12">                
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">THÔNG TIN KHÁCH HÀNG</h3>
            </div>
            <form class="form-horizontal">
	            <div class="box-body">
	            	<div class="form-group">
						<label for="" class="col-sm-2 control-label">Tên khách hàng *</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" id="" placeholder="Tên khách hàng">
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
						<div class="col-sm-2">
							<button class="btn btn-primary makeCallReminder">Tạo call reminder</button>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Email</label>
						<div class="col-sm-4">
							<div class="input-group">
							    <input type="email" class="form-control">
							    <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
							</div>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Nguồn</label>
						<div class="col-sm-4">
							<select class="form-control">
								<option selected="selected">Call</option>
								<option>Facebook</option>
							</select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Đối tượng</label>
						<div class="col-sm-4">
							<select class="form-control">
								<option selected="selected">Khách mua</option>
								<option>Khách thuê</option>
							</select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Do môi giới nào giới thiệu?</label>
						<div class="col-sm-4">
							<select class="form-control select2" style="width: 100%;">
								<option selected="selected">Nguyễn Văn A</option>
								<option>Đào Hồng Gấm</option>
							</select>
						</div>
	                </div>
	            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="db-tm-item deal-tm-customer-need">
      <div class="row">
        <div class="col-md-12">                
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">THÔNG TIN NHU CẦU KHÁCH HÀNG</h3>
            </div>
            <form class="form-horizontal">
	            <div class="box-body">
	            	<div class="form-group">
						<label for="" class="col-sm-2 control-label">Hình thức giao dịch</label>
						<div class="col-sm-4">
							<select class="form-control select2" style="width: 100%;">
								<option selected="selected">Mua</option>
								<option>Thuê</option>
							</select>
						</div>
						<label for="" class="col-sm-2 control-label">Loại bất động sản</label>
						<div class="col-sm-4">
							<select class="form-control select2" style="width: 100%;">
								<option selected="selected">Nhà</option>
								<option>Chung cư/Căn hộ</option>
							</select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Ngân sách ban đầu (dự trù)</label>
						<div class="col-sm-4">
							<input type="number" class="form-control">
						</div>
						<label for="" class="col-sm-2 control-label">Ngân sách final</label>
						<div class="col-sm-4">
							<input type="number" class="form-control">
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Quận</label>
						<div class="col-sm-10">
							<select class="form-control select2" style="width: 100%;">
								<option selected="selected">Quận 1</option>
								<option>Quận Bình Thạnh</option>
							</select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Số phòng ngủ:</label>
						<div class="col-sm-2">
							<input type="number" class="form-control">
						</div>
						<label for="" class="col-sm-2 control-label">Số phòng tắm:</label>
						<div class="col-sm-2">
							<input type="number" class="form-control">
						</div>
						<label for="" class="col-sm-2 control-label">Diện tích:</label>
						<div class="col-sm-2">
							<input type="number" class="form-control">
						</div>
	                </div>
	                <div class="form-group">
	                	<label for="" class="col-sm-2 control-label">Ngày dự tính dọn vào:</label>
	                	<div class="col-sm-4">
		                	<div class="input-group date" data-provide="datepicker">
							    <input type="text" class="form-control">
							    <div class="input-group-addon">
							        <i class="fa fa-calendar"></i>
							    </div>
							</div>
						</div>
	                </div>
	                <a href="#" class="btn btn-warning">Broadcast</a>
	            </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="db-tm-item deal-tm-deal-info">
      <div class="row">
        <div class="col-md-12">                
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">THÔNG TIN DEAL</h3>
            </div>
            <form class="form-horizontal">
	            <div class="box-body">
	            	<div class="form-group">
						<label for="" class="col-sm-2 control-label">Trạng thái giao dịch</label>
						<div class="col-sm-4">
							<select class="form-control">
								<option selected="selected">Viewing</option>
							</select>
						</div>
						<label for="" class="col-sm-3 control-label">Số listing đi xem lần này</label>
						<div class="col-sm-2">
							<input type="text" class="form-control">
						</div>
						<div class="col-sm-1">
							<a href="#" class="btn btn-primary">Add</a>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Sales đang phụ trách</label>
						<div class="col-sm-4">
							<input type="text" class="form-control" placeholder="Hảo" disabled>
						</div>
						<div class="col-sm-1">
							<a class="btn btn-primary btn-select-toggle">Reassign</a>
						</div>
						<div class="col-sm-4 select-toggle">
							<select multiple="" class="form-control">
								<option>option 1</option>
								<option>option 2</option>
								<option>option 3</option>
								<option>option 4</option>
								<option>option 5</option>
			                </select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">AM đang tham gia</label>
						<div class="col-sm-4">
							<input type="text" class="form-control">
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Môi giới đang tham gia</label>
						<div class="col-sm-4">
							<select class="form-control select2" style="width: 100%;">
								<option selected="selected">Nguyễn Văn A</option>
								<option>Đào Hồng Gấm</option>
							</select>
						</div>
	                </div>
	                <div class="form-group">
						<label for="" class="col-sm-2 control-label">Tồng số listing đã xem đến thời điểm hiện tại:</label>
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

    <div class="db-tm-item deal-tm-listing-info-1">
      <div class="row">
        <div class="col-md-12">                
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">THÔNG TIN LISTING</h3>
            </div>

            <div class="box-body">
				<?php for ($i = 0; $i < 3; $i++): ?>
					<div class="col-md-4">
						<img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
						<div class="text-center">
							LID | Size (bed/bath) | Price | Address
						</div>
						<div class="text-center"><input type="checkbox" /> Deactivate</div>
					</div>
				<?php endfor; ?>
				<a href="#" class="btn btn-success martop-txt">Tìm thêm listing tương tự</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="db-tm-item deal-tm-listing-info-2">
      <div class="row">
        <div class="col-md-12">                
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">THÔNG TIN LISTING</h3>
            </div>

            <div class="box-body">
            	<a href="#" class="btn btn-primary pull-right">Chọn hết</a>
            	<div class="clearfix"></div>
            	<div class="martop-txt">
					<?php for ($i = 0; $i < 3; $i++): ?>
						<div class="col-md-4">
							<img src="http://dummyimage.com/600x400" class="thumbnail" style="width:100%" />
							<div class="text-center">
								LID | Size (bed/bath) | Price | Address
							</div>
							<div class="text-center"><input type="checkbox" /> Tick chọn</div>
						</div>
					<?php endfor; ?>
				</div>
				<div class="clearfix"></div>
				<div class="box-footer">
					<h4 class="list-bt-tm">Tin đăng gửi khách</h4>
					<a href="#" class="btn btn-success">Tìm listing tương tự</a>
				</div>
				<table id="pending-requests"  class="table table-bordered table-striped">
					<thead>
					<tr>
						<th>LID</th>
						<th>Bed</th>
						<th>Bath</th>
						<th>Size</th>
						<th>Price (in VNĐ)</th>
						<th>Address</th>
						<th>Call owner to<br/>check availability</th>
						<th class="text-center">Deactivate</th>
						<th class="text-center">Khách chọn đi xem</th>
						<th>Call Reminder</th>
					</tr>
					</thead>
					<tbody>
					<?php for ($i = 0; $i < 6; $i++): ?>
					<tr>
						<td>{{$i}}</td>
						<td>{{$i}}</td>
						<td>{{$i}}</td>
						<td>{{$i}}</td>
						<td>{{$i}}</td>
						<td>{{$i}}</td>
						<td class="text-center"><span class="icon-st-item"><i class="fa fa-phone"></span></i></td>
						<td class="text-center"><input type="checkbox" /></td>
						<td class="text-center"><input type="checkbox" /></td>
						<td class="text-center"><a href="#" class="btn btn-primary">Tạo call reminder</a></td>
					</tr>
					<?php endfor; ?>
					</tbody>
				</table>
				<a href="#" class="btn btn-danger martop-txt">Email to KH</a>
            </div>
          </div>
        </div>
      </div>
    </div>

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
									<li><a href="#tab_events_2" data-toggle="tab">+ Meeting</a></li>
									<li><a href="#tab_events_3" data-toggle="tab">+ Task</a></li>
									<li><a href="#tab_events_4" data-toggle="tab">+ Event</a></li>
									<li><a href="#tab_events_5" data-toggle="tab">+ Email</a></li>
								</ul>
								<div class="tab-content">
									<div class="tab-pane active" id="tab_events_1">
										Call
									</div>
									<div class="tab-pane" id="tab_events_2">
										Meeting
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
					<div class="button-group">
						<div class="col-sm-3">
							<select multiple="" class="form-control select-toggle-stream">
								<option>option 1</option>
								<option>option 2</option>
								<option>option 3</option>
								<option>option 4</option>
								<option>option 5</option>
				            </select>
						</div>
						<a class="btn btn-primary btn-select-toggle-stream">Reassign</a>
						<a href="#" class="btn btn-success margin">Save</a>
						<a href="#" class="btn btn-warning">Generate to invoice</a>
					</div>					
			    </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
   </section>
</div>

<!-- make call -->
<div id="makeCallReminderModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">New call</h4>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label class="col-sm-2">When</label>
          <div class="col-sm-10">
            <input type="text" id="when-date" />
            <input type="text" id="when-time" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
            <label><input type="checkbox" /> set reminder</label> <input type="text" size="4" /> mins
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Type</label>
          <div class="col-sm-10">Outgoing call</div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">With</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Subject</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Please specify the call subject." />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" placeholder="Please enetr the meeting description."></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Responsible persion</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="John Le" />
          </div>          
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
            <div>status: pending</div>
            <div>Priority: normal</div>
            <div>Attach file</div>
          </div>          
        </div>
        <div class="form-group text-center">
          <button class="btn btn-success">Save</button>
          <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
        </div>
      </div>
      <!--
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      -->
    </div>

  </div>
</div>
<!-- end make call -->

<!-- new meeting -->
<div id="newMeetingReminderModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">New meeting</h4>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label class="col-sm-2">When</label>
          <div class="col-sm-10">
            <input type="text" id="when-date" />
            <input type="text" id="when-time" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
            <label><input type="checkbox" /> set reminder</label> <input type="text" size="4" /> mins
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Where</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">With</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Subject</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="Please specify the call subject." />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" placeholder="Please enetr the meeting description."></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Responsible persion</label>
          <div class="col-sm-10">
			<input type="text" class="form-control" placeholder="John Le"/>            
          </div>          
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Deal</label>
          <div class="col-sm-10">Tuyết</div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2"></label>
          <div class="col-sm-10">
          	<div>status: pending</div>
            <div>Priority: normal</div>
          	<div>Attach file</div>
          </div>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-success">Save</button>
          <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
        </div>
      </div>
      <!--
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      -->
    </div>

  </div>
</div>
<!-- end new meeting -->

<!-- add new event -->
<div id="newEventReminderModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add new event</h4>
      </div>
      <div class="modal-body">
        <div class="form-group row">
          <label class="col-sm-2">Deal</label>
          <div class="col-sm-10">Nguyễn Thị Hiền</div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Event Type</label>
          <div class="col-sm-10">
            	<select class="form-control">
            		<option>Deposit</option>
            	</select>
           </div>
            <div class="col-md-12">
            	<textarea class="form-control" rows="3" placeholder="Type in the event description"></textarea>
            </div>
          </div>
        <div class="form-group row">
          <label class="col-sm-2">Event Date:</label>
          <div class="col-sm-5">1 Apr 2016</div>
          <div class="col-sm-5">
            <label><input type="checkbox" /> set reminder</label> <input type="text" size="4" /> mins
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Where</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Attach file</label>
          <div class="col-sm-10">
           </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2">Deal Stage</label>
          <div class="col-sm-10">
            	<select class="form-control">
            		<option>Viewed-Not Satisfied</option>
            	</select>
           </div>
        </div>
        <div class="form-group text-center">
          <button class="btn btn-success">Add</button>
          <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
        </div>
      </div>
      </div>
      <!--
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
      -->
    </div>

  </div>
</div>
<!-- end add new event -->
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


<script type="text/javascript">
	$(document).ready(function () {
	  $(".makeCallReminder").on("click", function (event) {
        event.preventDefault();
	    $("#makeCallReminderModal").modal();
	  });
	  $(".btn-select-toggle").on("click", function () {
	    $(".select-toggle").slideToggle();
	  });
	  $(".btn-select-toggle-stream").on("click", function () {
	    $(".select-toggle-stream").slideToggle();
	  });
	});
</script>



@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />

@stop