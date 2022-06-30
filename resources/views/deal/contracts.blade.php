<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Danh sách Deal</h3>
            <span class="pull-right">
                <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <div class="group-button-deal">                
                        <button onclick="showData(14);" type="button" class="btn btn-default">Đang yêu cầu hợp đồng</button>
                        <button onclick="showData(2);" type="button" class="btn btn-default">Đã gửi hợp đồng</button>
            </div>
            <hr>
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <table id="lead-list"  class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã KH</th>
                        <th>Tên deal</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Tên TM</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Loại giao dịch</th>
                        <th>Loại BDS</th>
                        <th>ID</th>
                        <th>Activity</th>
                        <th>Ngày dự định dọn vào</th>
                        <th>Nguồn</th>
                        <th>Đối tượng</th>
                        <th>Hành động cuối</th>
                        <th>Ngày kể từ hành động cuối</th>
                        <th>Days of being LEAD/DEAL</th>
                        <th>Khả năng đáp ứng của thị trường</th>
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
<script type="text/javascript">
    
dateRender = function ( data, type, object ) {
    if(!data) return "";
    return $.format.date(new Date(data), "dd/MM/yyyy");
} 

var renderLink = function ( data, type, object ) {
    return "<a href='/deal/update/"+ object.dealId +"'>" + data + "</a>";
}

var showData = function(statusId) {
    $("#lead-list").DataTable().ajax.url("/deal/contracts-data/" + statusId).load();
    return false;
}
var statusId = 14;
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    
    $("#lead-list").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/deal/contracts-data/"+statusId,
        "scrollX": true, 
        "ordering":  false,
        "lengthChange": false,
        "columns": [
            { data: null, render: customKey},
            { data: 'customerId'},
            { data: 'customerName', render: renderLink},
            { data: 'customerPhone'},
            { data: 'customerEmail'},
            { data: 'tmName'},
            { data: 'statusName'},
            { data: 'createdDate', render: dateTimeRender},
            { data: 'listingTypeName'},
            { data: 'propertyTypeName'},
            { data: 'dealId'},
            { data: null, defaultContent: ""},
            { data: 'moveInDate', render: dateRender},
            { data: 'sourceName'},
            { data: 'subjectName'},
            { data: 'recentlyStatusName'},
            { data: 'lastActivityDate', render: dateTimeRender, defaultContent: ""},
            { data: 'createdDate', render: datePrettyRender},
            { data: null, defaultContent: ""},
        ],
        "createdRow":function(row, data, index){
            console.log(data);
            if(!data.isActivated){
                $('td', row).parent('tr').addClass("unactivated");
            }
        }
    });
    $("#lead-list").dataTable().fnSetFilteringDelay(1000);
    /*
    $(".btn-export").click(function(){
        showPropzyLoading();
        $.post("/report/export-report/deal-list----1", {}, function(response){
            if(response.result) {
                window.location.href = response.data.linkFile;
            }
            else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });
    */
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop