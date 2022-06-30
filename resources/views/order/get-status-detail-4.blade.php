<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Status detail</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning hidden">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="order-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Connected lead/deal</th>
                        <th>Created On</th>
                        <th>Created By</th>
                        <th>Status</th>                        
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
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script type="text/javascript">

function renderStatusName(data, type, object) {
    console.log(object);
    data = " <a class='show-popup' target='_blank' href='/order/contact/{{$orderId}}/" + object.contactId + "'> ( " + data + " )</a>";
    return data;
}

var showData = function (statusId) {
    $("#lead-list").DataTable().ajax.url("lead/get-list-lead/" + statusId + "").load();
    return false;
}

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    $("#order-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/order/get-status-detail/{{$orderId}}/{{$statusId}}",
        "scrollX": true,
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "columns": [
            {data: 'orderId'},
            {data: 'dealId', render: showLeadIdOrDealId},
            {data: 'createdDate', render: dateRender},
            {data: 'agentName'},
            {data: 'statusName', render: renderStatusName}
        ]
    }).on('draw.dt', function () {
        //initShowPopUp();
    });
    $(".btn-export").click(function () {
        showPropzyLoading();
        $.post("/report/export-report/lead-list----1", {}, function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });
});
function initShowPopUp() {

    $(".show-popup").on("click", function (event) {
        event.preventDefault();
        var url = $(this).attr("href");
        showPropzyLoading();
        $.ajax({
            url: url,
            type:"GET",
        }).done(function (response) {
            showPropzyAlert(response, "Thông tin contact");
        }).always(function(){
            hidePropzyLoading();
        });
        
    });

}
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop