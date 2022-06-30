<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<button class="btnReassign btn btn-danger" style="display: none; position: fixed; bottom: 10px; right: 10px; z-index: 100000000">Reassign</button>
<section>
    <div class="box box-primary" id="box-reasign">
        <div class="box-header with-border">
            <h3 class="box-title">Chuyển Leads</h3>
            <a href="#" id="filter" class="pull-right btn btn-success"><i class="fa fa-filter" aria-hidden="true"></i> Lọc</a>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <!-- <div class="form-group row">
                <div class="col-sm-5">
                    <label>Chọn tm nguồn</label>
                    <select class="crms crms-from"></select>
                </div>
                <div class="col-sm-2">
                    <button class="btnReassign btn btn-danger" style="display: none; position: fixed; bottom: 10px; right: 10px; z-index: 100000000">Reassign</button>
                </div>
            </div> -->
            <!-- <div class="form-group row">
                <div class="col-md-12">
                    <div class="col-sm-4">
                        <label>Chọn TM</label>
                        <select name="assignedTos" multiple="multiple" class="assignedTos crm_select crms-from form-control"></select>
                    </div>
                    <div class="col-sm-4">
                        <label>Quận</label>
                        <select multiple="multiple" name="districts" class="select_for_filter form-control">
                            @foreach($districts as $district)
                                <option value="{{$district->districtId}}">{{$district->districtName}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label>Tìm kiếm</label>
                        <input disabled="disabled" type="text" name="searchKeywords" placeholder="Leads ID, Tên, Mã KH" class="form-control">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="col-sm-4">
                        <label>Trạng thái</label>
                        <select multiple="multiple" name="statusIds" class="select_for_filter form-control">
                            @foreach($status as $stt)
                                <option value="{{$stt->statusId}}">{{$stt->statusName}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label>Tiến độ</label>
                        <select multiple="multiple" name="progressQuoId" class="select_for_filter form-control">
                            @foreach($quos as $quo)
                                <option value="{{$quo->progressQuoId}}">{{$quo->progressQuoName}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-sm-4" style="padding-top:2.3%">
                        <a href="#" id="filter" class="btn btn-success disabled"><i class="fa fa-filter" aria-hidden="true"></i> Lọc</a>
                    </div>
                </div>
                
                
            </div> -->
            <ul class="nav nav-tabs">
              <li class="active"><a data-toggle="tab" href="#home">Lọc theo theo IDs</a></li>
              <li><a data-toggle="tab" onclick="ReassignLeads.loadFilter()" href="#menu1">Nâng cao</a></li>
            </ul>
            <div class="tab-content">
              <div id="home" style="padding-top: 15px;" class="tab-pane fade in active">
                <div class="form-group">
                    <!-- <label for="inputlg">IDs</label> -->
                    <input class="form-control input-lg numvad" name="strNeedIds" autofocus="autofocus" placeholder="Nhập nhiều id với dấu , ngăn cách giữa các id. Ví dụ: 123,456" type="text">
                  </div>
              </div>
              <div id="menu1" style="padding-top: 15px;" class="tab-pane fade">
                <div class="form-group">
                    <div style="margin-bottom: 10px;" class="col-md-12">
                        <div class="col-sm-4">
                            <label>Chọn TM</label>
                            <select name="assignedTos" multiple="multiple" class="assignedTos crm_select crms-from form-control"></select>
                        </div>
                        <div class="col-sm-4">
                            <label>Quận</label>
                            <select multiple="multiple" name="districts" class="select_for_filter form-control">
                                @foreach($districts as $district)
                                    <option value="{{$district->districtId}}">{{$district->districtName}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label>Tìm kiếm</label>
                            <input type="text" name="searchKeywords" placeholder="LEAD IDs, Tên, Mã KH" class="form-control">
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
                            <!-- <p id="warning_pending" class="text-danger hidden"></p> -->
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
            <div>
                <table id="dataTableLeads"  class="table table-bordered table-striped" style="width: 100%">
                    <thead>
    <!--  Lead ID, Tên KH, Tên TM, Trạng thái, Tiến độ, Ngày tạo, Ngày cập nhật, Giá, Loại BDS, Nguồn, Đối tượng, Days of Being Lead 23-->
                        <tr>
                            <th><input type="checkbox" class="select-all-customers" /></th>
                            <th style="width: 300px;" width='200px'>Leads</th>
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
    </div>
</section>

<div id="modalReassignLeads" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Reassign</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label for="" class="col-sm-12">Chuyển cho</label>
                        <div class="col-sm-12">
                            <select class="assignedTos crm_except crms-to form-control"></select>
                            <div class="errors" ></div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="" class="col-sm-12">Lý do chuyển cho người khác</label>
                        <div class="col-sm-12">
                            <textarea  name="reason" id="reason" class="form-control reason" rows="6" placeholder="Nhập lý do"></textarea>
                            <div class="errors" style="display: block;" ></div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSaveReassign">Lưu</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Hủy</button>
            </div>
        </div>

    </div>
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
<script src="{{loadAsset("/js/crm-manager/reassign-leads.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop