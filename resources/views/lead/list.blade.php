<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Lead</h3>
            <span class="pull-right">
                <?php if ($isCurrentAdmin || $myUserId == 12 || $myUserId == 13): ?>
                   <!--  <input type="text" class="fromDate form-control" style="display: inline-block;width: 150px;" placeholder="Từ ngày" />
                    <input type="text" class="toDate form-control" style="display: inline-block;width: 150px;" placeholder="Đến ngày" />
                    <select name="assignes" class="assignedTos form-control" style="display: inline-block;width: 150px;" id="assignes"></select>
                    
                    
                    <button id="btn_filter_button_deal" class="btn btn-primary"><i class="fa fa-filter" aria-hidden="true"></i></button>
                    <button class="btn-export btn btn-warning">Export to xlsx/csv</button> -->
                <?php endif; ?>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <!-- header filter -->
            <div style="text-align: center;margin-bottom: 10px;" class="form-inline">
                <?php if ($isCurrentAdmin || $myUserId == 12 || $myUserId == 13): ?>
                      <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                        <label >Từ ngày:</label>
                        <input type="text" class="form-control fromDate"  placeholder="Từ ngày">
                      </div>
                      <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                        <label >Đến ngày:</label>
                        <input type="text" class="form-control toDate" placeholder="Đến ngày">
                      </div>
                      <div class="form-group" style="width: auto; margin:5px 5px 5px 0px" placeholder="Đến ngày">
                        <label >Nhân viên:</label>
                        <select name="assignes" class="assignedTos form-control" style="width: 150px;" id="assignes"></select>
                      </div>
                <?php endif; ?>
              <br/><div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                  <label>Hình thức GD:</label>
                  <select style="width: 150px;" id="listingTypeId" name="listingTypeId" class="form-control">
                      <option value="">Tất cả</option>
                      <?php foreach ([1 => 'Mua', 2 => 'Thuê'] as $key => $value): ?>
                          <option value={{$key}} >{{$value}}</option>
                      <?php endforeach; ?>
                  </select>
                </div>
                <div class="form-group" style="width: auto; margin:5px 5px 5px 0px">
                    <label>Loại BĐS:</label>
                    <select style="width: 150px;" name="propertyTypeId" id="propertyTypeId" class="form-control">
                        <option value="">N/A</option>
                    </select>
                  </div>
                    <?php if ($isCurrentAdmin || $myUserId == 12 || $myUserId == 13): ?>
                        <!-- <br/> -->
                    <?php endif; ?>
                    
                  <button id="btn_filter_button_deal" class="btn btn-primary"><i class="fa fa-filter" aria-hidden="true"></i></button>
                    <?php if ($isCurrentAdmin || $myUserId == 12 || $myUserId == 13): ?>
                        <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
                    <?php endif; ?>
            </div> <!--\ header filter -->
            <div id="wrap_group_button_deal">
                @include('shared.group-button-lead')
            </div>
            
            <hr>
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="lead-list"  class="table table-bordered table-striped">
<!-- Lead ID, Tên KH, Tên TM, Trạng thái, Tiến độ, Ngày tạo, Ngày cập nhật, Giá, Loại BDS, Nguồn, Đối tượng, Days of Being Lead -->
                <thead>
                    <tr>
                        <!-- <th>#</th> -->
                        <!-- <th>Mã KH</th> -->
                        <th >Lead ID</th>
                        <th style="width: 20%">Tên KH</th>
                        <th>Tên TM</th>
                        <th>Time counter</th>
                        <th>Trạng thái</th>
                        <th>Tiến độ</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Giá</th>
                        <!-- <th>Giá / m2</th> -->
                        <!-- <th>Loại giao dịch</th> -->
                        <th>Thuộc nhóm BĐS</th>
                        <th>Loại BDS</th>
                        
                        <!-- <th>Activity</th> -->
                        <!-- <th>Ngày dự định dọn vào</th> -->
                        <th>Quận - Phường ưa thích</th>
                        <th>Nguồn</th>
                        <th>Đối tượng</th>
                        <!-- <th>Thiết bị</th>
                        <th>Days of last activity</th> -->
                        <th>Days of Being Lead</th>
                        <!-- <th>Khả năng đáp ứng của thị trường</th> -->
                        <!-- <th>Action</th> -->
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
</section>

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
<script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{loadAsset("/js/crm-manager/reassign-leads.js")}}"></script>
<script type="text/javascript">
                    var isGroupAdmin = "{{$isGroupAdmin}}";
</script>

<script src="{{loadAsset("/js/lead/list.js")}}"></script>
<script type="text/javascript">
    $(document).ready(function(){
        DealFunctions.initSelectListingTypes();
    })
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop
