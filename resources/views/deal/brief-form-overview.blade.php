<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách brief form</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="brief-form-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hình</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Điện thoại</th>
                        <th>Note</th>      
                        <th>Action</th>                        
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
<script src="{{loadAsset("/js/deal/commons.js")}}"></script>


<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<!-- <script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script> -->
<script src="{{loadAsset("/js/jquery.geocomplete.js")}}"></script>

<script type="text/javascript">

dateRender = function (data, type, object) {
    if (!data)
        return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
}

var showData = function (statusId) {
    $("#lead-list").DataTable().ajax.url("/deal/get-list-deal/" + statusId + "").load();
    return false;
}
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    listBriefForms("#brief-form-list");
    $(".btn-export").click(function () {
        return false;
    });
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
