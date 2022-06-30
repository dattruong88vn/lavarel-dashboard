<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Chi tiết Contact của order</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning hidden">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <form class="form-horizontal">
                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="form-row">
                    <?php if ($data->result): ?>
                        <table class="table table-bordered">
                            <tr><td>Họ tên</th><td>{{$data->data->name}}</td></tr>
                            <tr><td>Số điện thoại</td><td>{{$data->data->phone}}</td></tr>
                            <tr><td>Email</td><td>{{$data->data->email}}</td></tr>
                        </table>
                    <?php else: ?>
                        <h4>{{$data->message}}</h4>
                    <?php endif; ?>
                </div>
                <div class="form-row row">
                    <div class="col-xs-12">
                        <button id="callAgent" class="btn btn-success hide">Call môi giới</button>
                    </div>
                </div>
                <div class="form-row row panelCallButton" style="margin-top: 16px;">
                    <div class="col-xs-12">
                        <button id="" class="btn btn-warning notifyLsContact">Thông báo ls liên hệ</button>
                        <button id="" class="btn btn-danger">Contact không có tin đăng phù hợp</button>
                        <button id="btnListingNote" class="btn btn-success">Tạo note đăng ký cho listing này</button>                </div>
                </div>   
            </form>
            <div id="modalListingNote" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Propzy</h4>
                        </div>
                        <div class="modal-body">
                            <form method="post" class="form-horizontal">
                                <div class="form-row">
                                    <label class="col-sm-2">Địa chỉ</label>
                                    <div class="col-sm-10"><input type="text" name="address" id="address" class="form-control" /></div>
                                </div>
                                <div class="form-row">
                                    <label class="col-sm-2">Liên hệ</label>
                                    <div class="col-sm-10"><input type="text" name="contact" id="contact" class="form-control"  /></div>
                                </div>
                                <div class="form-row">
                                    <label class="col-sm-2">Số ĐT</label>
                                    <div class="col-sm-10"><input type="text" name="phone" id="phone" class="form-control"  /></div>
                                </div>
                                <div class="form-row">
                                    <label class="col-sm-2">Note</label>
                                    <div class="col-sm-10"><input type="text" name="note" id="note" class="form-control"  /></div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

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
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript">
$(".panelCallButton").hide();
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    $("#callAgent").on("click", function (event) {
        event.preventDefault();
        var postData = {
            orderId: "{{$orderId}}",
            statusId: 4
        };
        post_sync("/order/call", postData, true, function (response) {
            showPropzyAlert(response.message);
        });
        $(".panelCallButton").show();
    });
    $("#btnListingNote").on("click", function (event) {
        event.preventDefault();
        $("#modalListingNote").modal();
    });
    $(".notifyLsContact").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajax({
            'url': '/order/notify-ls-contact/{{$orderId}}',
            'type': 'GET'
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            showPropzyLoading();
        });
    });
});
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop