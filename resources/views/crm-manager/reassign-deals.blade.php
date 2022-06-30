<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<div class="col-sm-2">
    <button class="btnReassign btn btn-danger" style="display: none; position: fixed; bottom: 10px; right: 10px; z-index: 100000000">Reassign</button>
</div>
<section>
    <div class="box box-primary" id="box-reasign">
        <div class="box-header with-border">
            <h3 class="box-title">Chuyển Deals</h3> 
            <a href="#" id="filter" class="pull-right btn btn-success"><i class="fa fa-filter" aria-hidden="true"></i> Lọc</a>           
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#home">Lọc theo IDs</a></li>
              <li><a data-toggle="tab" onclick="ReassignDeals.loadFilter()" href="#menu1">Nâng cao</a></li>
            </ul>

            <div class="tab-content">
              <div id="home" style="padding-top: 15px;" class="tab-pane fade in active">
                <div class="form-group">
                    <!-- <label for="inputlg">IDs</label> -->
                    <input class="form-control input-lg numvad" name="strNeedIds" autofocus="autofocus" placeholder="Nhập nhiều id với dấu , ngăn cách giữa các id. Ví dụ: 123,456" type="text">
                  </div>
              </div>
              <div id="menu1" style="padding-top: 15px;" class="tab-pane fade advanced-tab">
                <div class="form-group">
                    <div style="margin-bottom: 10px;" class="col-md-12">
                        <div class="col-md-3">
                            <label>Zone</label>
                            <select id="zoneField" class="form-control"></select>
                        </div>
                        <div class="col-md-3">
                            <label>Team</label>
                            <select id="teamField" class="form-control"></select>
                        </div>
                        <div class="col-sm-3">
                            <label>Quận</label>
                            <select id="districtId" class="form-control"></select>
                        </div>
                        <div class="col-md-3">
                            <label>Phường</label>
                            <select id="wardId" class="form-control"></select>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px;" class="col-md-12">
                        <div class="col-md-3">
                            <label>Phòng ban</label>
                            <select id="departmentField" class="form-control"></select>
                        </div>
                        <div class="col-md-3">
                            <label>Thành viên</label>
                            <select id="memberField" class="form-control"></select>
                        </div>
                        <!-- div class="col-sm-3">
                            <label>Chọn người phụ trách meeting</label>
                            <select name="assignedTos" multiple="multiple" class="assignedTos crm_select crms-from form-control"></select>
                        </div> -->
                        
                        <div class="col-sm-3">
                            <label>Tìm kiếm</label>
                            <input type="text" name="searchKeywords" placeholder="DealID" class="form-control">
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;" class="col-md-12">
                        <div class="col-sm-4">
                            <label>Trạng thái <i style="font-size: 11px;" class="text-danger">(Pending không kèm các trạng thái khác)</i></label>
                            <select multiple="multiple" name="statusIds" class="select_for_filter form-control">
                                @foreach($status as $stt)
                                    <option value="{{$stt->statusId}}">{{$stt->statusName}}</option>
                                @endforeach
                            </select>
                            <!-- <p id="warning_pending" class="text-danger hidden"><i>(Pending không bao gồm các trạng thái khác)</i></p> -->
                        </div>
                        <div class="col-sm-4">
                            <label>Tiến độ</label>
                            <select multiple="multiple" name="progressId" class="select_for_filter form-control">
                                
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label>Tiến độ nhãn</label>
                            <select multiple="multiple" name="progressQuoId" class="select_for_filter form-control">
                                @foreach($quos as $quo)
                                    <option value="{{$quo->progressQuoId}}">{{$quo->progressQuoName}}</option>
                                @endforeach
                            </select>
                        </div>
                       <!--  <div class="col-sm-4" style="padding-top:2.3%">
                            <a href="#" id="filter" class="btn btn-success disabled"><i class="fa fa-filter" aria-hidden="true"></i> Lọc</a>
                        </div> -->
                    </div>
                    
                    
                </div>
              </div>
            </div>
            
            <!-- <hr> -->
            <table id="dataTableDeals"  class="table table-bordered table-striped" style="width: 100%">
                <thead>
<!--  Deal ID, Tên KH, Tên TM, Trạng thái, Tiến độ, Ngày tạo, Ngày cập nhật, Giá, Loại BDS, Nguồn, Đối tượng, Days of Being Deal 23-->
                    <tr>
                        <th width='60px'><input type="checkbox" class="select-all-customers" /></th>
                        <th style="width: 300px;" width='200px'>Deals</th>
                        <th>Người phụ trách</th>
                        <th>Tên KH</th>
                        <th>Mã KH</th>
                        <!-- <th>Action</th> -->
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>

@include('crm-manager.reassign-modal-v2')


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
<script src="{{ loadAsset("/js/commons/common.js")}}"></script>
<script src="{{loadAsset("/js/crm-manager/reassign-deals.js")}}"></script>
<script src="{{loadAsset("/js/ba-dashboard/common-split-matrix.js")}}"></script>
<script src="{{loadAsset("/js/deal/list.js")}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/crm-manager/reassign-deals.css")}}" rel="stylesheet" type="text/css" />
@stop

<style>
    .select2-container {
        width: 100% !important;
    }
</style>