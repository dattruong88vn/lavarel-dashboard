<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Lịch sử Event</h3>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">            
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="event-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Ngày xảy ra sự kiện</th>
                        <th>Trạng thái</th>
                        <th>Độ ưu tiên</th>
                        <td>Người tạo</td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>


<!-- Modal -->
<div id="eventDetailModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chi tiết sự kiện</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label class="col-sm-3">Tên</label>
                    <div class="col-sm-9 eventName"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Ghi chú</label>
                    <div class="address col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Người tham gia</label>
                    <div class="participants col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Ngày xảy ra sự kiện</label>
                    <div class="reminderDate col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Thời gian</label>
                    <div class="reminderTime col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Trạng thái</label>
                    <div class="status col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Độ ưu tiên</label>
                    <div class="priority col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-3">Người tạo</label>
                    <div class="createrName col-xs-9"></div>
                </div>
                <div class="form-group row">
                    <label class="col-xs-12">Mô tả</label>
                    <div class="descripiton col-xs-12"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
<script src="{{loadAsset("/js/events/histories.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop