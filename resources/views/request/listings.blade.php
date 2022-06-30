<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->

<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách listing</h3>
            <span class="pull-right">
                    <input type="text" class="fromDate" placeholder="Từ ngày" />
                    <input type="text" class="toDate" placeholder="Đến ngày" />
                
                <?php if($isCurrentAdmin): ?>
                    <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
                <?php endif; ?>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="request-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style="width: 7%">Pre ID</th>
                        <th>Listing ID</th>
                        <th>Tên KH</th>
                        <th>Chuyển tới</th>
                        <th>Người tạo</th>
                        <th>Ngày tạo</th>
                        <th>Hình thức GD</th>
                        <th>Nhóm BĐS</th>
                        <th>Loại BĐS</th>
                        <th>Giá</th>
                        <th>Nguồn</th>
                        <th style="width: 160px">Trạng thái</th>
                        <th>Action</th>
                    </tr>
                    <tr class="filter-row">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><select class="select-status" style="width: 100%" multiple="multiple" >
                            <option value="Chờ bổ sung hình ảnh">Chờ bổ sung hình ảnh</option>
                            <option value="Chủ nhà dịch vụ">Chủ nhà dịch vụ</option>
                            <option value="Deactivate">Deactivate</option>
                        </select></th>
                        <th></th>
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
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script>
    var isGroupAdmin = "{{$isGroupAdmin}}";
</script>
<script type="text/javascript" src="{{loadAsset("js/request/listings.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop