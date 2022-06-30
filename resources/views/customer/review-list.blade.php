<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<div class='page-rating-tests'>
    <form method="post" id="" class="form-horizontal">
        <section>
            <div class="db-tm-item deal-tm-rating-tests">
                <div class="row">
                    <div class="col-md-12">                
                        <div class="box box-primary">
                            <div class="box-header with-border">
                                <h3 class="box-title">HỒ SƠ KHÁCH HÀNG</h3>
                            </div>
                            <div class="box-body">
                                <div class="form-group">
                                    <div class="col-sm-8">
                                        <input  class="form-control" type="text" id="txtSearch" placeholder="Search thông tin khách hàng theo tên, lead/deal id, sdt, email" />
                                    </div>
                                    <button class="btn btn-warning btnSearch">Search</button>
                                </div>

                                <table id="items" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Contact</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Điểm</th>
                                            <th>deal/lead id</th>
                                            <th>Primary Coverage Area</th>
                                            <th>Created by</th>
                                            <th>Created</th>
                                            <th>Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Châu Trang</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Sơn Trinh</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>                        
                        </div>
                    </div>
                </div>
            </div>
            <div class="reviewHistoryWrapper">

            </div>
        </section>
    </form>
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
<script type="text/javascript">
// Nội dung js ở đây
var tryRender = function (data, type, object) {
    if (!data) {
        return "";
    }
    return data;
}
var renderName = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='#' onclick=\"return getReviewHistory('" + object.customerId + "','" + object.customerName + "')\" >" + data + "</a>";
    return data;
};
var renderDealOrLead = function (data, type, object) {
    if (object.dealId === null) {
        return object.leadId;
    } else {
        return object.dealId;
    }
};
var itemsTable = null;
initDataTable();
function initDataTable() {
    if (itemsTable !== null) {
        itemsTable.destroy();
    }
    var term = $("#txtSearch").val();
    itemsTable = $("#items").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/customer/review-list-data?term=" + term,
        "scrollX": true,
        "ordering": false,
        "lengthChange": false,
        "searching": false,
        "columns": [
            {data: 'customerName', render: renderName},
            {data: 'customerPhone'},
            {data: 'customerEmail'},
            {data: 'totalPointValue'},
            {data: 'dealId', render: renderDealOrLead},
            {data: 'districts', render: tryRender},
            {data: 'createdByName'},
            {data: 'createdDate', render: dateRender},
            {data: 'updatedDate', render: dateRender}
        ],
        "createdRow": function (row, data, index) {
        }
    });
    return itemsTable;
}

$(".btnSearch").on("click", function (event) {
    event.preventDefault();
    initDataTable();
});

function getReviewHistory(customerId, customerName) {
    showPropzyLoading();
    $.ajax({
        url: "/customer/review-history/" + customerId,
        type: "get"
    }).done(function (response) {
        $(".reviewHistoryWrapper").html(response);
        $(".customerName.box-title").html(customerName);
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop