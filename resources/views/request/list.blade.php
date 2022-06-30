<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->

<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Request</h3>
            <span class="pull-right">
                <?php if($isCurrentAdmin): ?>
                    <input type="text" class="fromDate" placeholder="Từ ngày" />
                    <input type="text" class="toDate" placeholder="Đến ngày" />
                    <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
                <?php endif; ?>
                <button class="btn-import btn btn-primary">Import</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <!-- Content for Popover #1 -->
            <div class="hidden" id="a1">
              <div class="popover-heading">
                This is the heading for #1
              </div>

              <div class="popover-body">
                This is the body for #1
              </div>
            </div>
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="request-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th >Request ID</th>
                        <th>Deal ID</th>
                        <th>Lead ID</th>
                        <th>Tên KH</th>
                        <th>Tên TM</th>
                        <th>Tên BA</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Hình thức GD</th>
                        <th>Nhóm BĐS</th>
                        <th>Loại BĐS</th>
                        <th>Giá</th>
                        <th>Nguồn</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</section>

@include('shared.modal-import-google-sheets')

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
<script>
    var isGroupAdmin = "{{$isGroupAdmin}}";
</script>
<script type="text/javascript" src="{{loadAsset("js/request/list.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop