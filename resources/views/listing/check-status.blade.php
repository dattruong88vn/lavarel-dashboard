<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Kiểm tra tình trạng tin đăng</h3>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <div class="buttons" style="margin-bottom: 16px;">
                <button id="btnNewStatusCheck" class="btn btn-success active">Kiểm tra mới</button>
                <button id="btnStatusCheckRequests" class="btn btn-success">Yêu cầu kiểm tra từ môi giới</button>
            </div>
            <div id="page-new">
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-xs-6">
                            <label class="col-xs-12">Số điện thoại</label>
                            <div class="col-xs-12">
                                <input type="text" name="searchPhone" id="searchPhone" />
                                <button class="btnSearchAgent">Go</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form class="form-horizontal" id="formFindListings">
                    <div class="form-group row">
                        <div class="col-xs-8">
                            <label class="col-xs-12">Nhập thông tin listing cần kiểm tra: <span>(lising ID hoặc địa chỉ cách nhau bằng dấu ,)</span></label>
                            <div class="col-xs-9">
                                <input type="text" name="term" id="term" class="form-control" placeholder="" />
                            </div>
                            <div class="col-xs-3">
                                <button class="btnSearchListing btn btn-warning">Tìm</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div id="page-requests">
                <table id="agentRequests"  class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Mã tìm kiếm</th>
                            <th>Tên agent</th>
                            <th>Số lượng listing</th>
                            <th>Ngày giờ yêu cầu</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>                

            </div>
        </div>
    </div>

    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Kết quả tìm kiếm</h3>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <table id="items"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Hình</th>
                        <th>rlisting ID</th>
                        <th>Size (Beds/Baths)</th>
                        <th>giá</th>
                        <th>Address</th>
                        <th>Còn trống</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div class="box-footer">
            <div class="col-xs-12">
                <button class="btnSaveSearchListing btn btn-warning">Lưu tìm kiếm</button>
                <button class="btnCreateLeadFromListing btn btn-danger">Tạo lead với những listing còn trống</button>
            </div>
        </div>
    </div>
</section>

<!-- Tạo mới Agent -->
<div id="modalCreateAgent" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Tạo mới agent</h4>
            </div>
            <div class="modal-body">
                <form id="formCreateAgent" class="form-horizontal formCreateAgent">
                    <table class="table table-bordered">
                        <tr>
                            <th>Tên</th>
                            <td>
                                <input type="text" name="name" class="name form-control" />
                                <div class="errors" ></div>
                            </td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>
                                <input type="text" name="phone" class="phone form-control"  />
                                <div class="errors" ></div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <a class='btn btn-warning btnSaveNewAgent' href='#' style='margin-left:6px;'>Lưu</a>
                <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
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

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>

<script src="{{loadAsset("/js/listing/check-status.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop