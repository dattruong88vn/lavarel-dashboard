@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-count-overview'>
    <section></section>
    <section>
        <div class="db-tm-item table-count-overview">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">Số lượng agent đăng ký</h3>
                        </div>
                        <div class="box-body">
                            <form class="form-horizontal">
                                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                                <div class="form-group">
                                    <label for="" class="col-sm-2 control-label">From</label>
                                    <div class="col-sm-3">
                                        <div id="from-date" class="input-group date date-overview-status">
                                            <input type="text" class="form-control">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <label for="" class="col-sm-2 control-label">To</label>
                                    <div class="col-sm-3">
                                        <div id="to-date" class="input-group date date-overview-status">
                                            <input  type="text" class="form-control">
                                            <div class="input-group-addon">
                                                <i class="fa fa-calendar"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button class="btn-export btn btn-warning">Export to xlsx/csv</button>
                                    </div>
                                </div>
                            </form>
                            <div class="col-sm-6">
                                <table id="count-agent-register" class="table table-bordered table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Số agent đăng ký tài khoản</td>
                                            <td id="number-agent"></td>
                                            <!--<td id="number-agent-total"></td>-->
                                        </tr>
                                        <tr>
                                            <td>Không phải agent(khách mua-chủ nhà-link khác)</td>
                                            <td id="number-not-agent"></td>
                                            <!--<td id="number-not-agent-total"></td>-->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-sm-6">
                                <table id="agent-count-detail-table" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tên AM</th>
                                            <th>Số lượng agent</th>
                                            <th> < 1 tuần</th>
                                            <th>1 tháng</th>
                                            <th>2 tháng</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
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

<script type="text/javascript">
var currentTime = (new Date()).getTime();
var postData = {
    fromDate: currentTime - (currentTime % 86400000),
    toDate: currentTime + 86400000 - (currentTime % 86400000)
}
var numberUpdate;

function updateLoading() {
    if (++numberUpdate === 1) {
        hidePropzyLoading();
        numberUpdate = 0;
    }
}
function refreshDataTable() {
    numberUpdate = 0;
    showPropzyLoading();
    get_sync("/report/get-agent-count-overview/" + postData.fromDate + "/" + postData.toDate, true, function (response) {
        $("#number-agent").text(response.numberOfAgents);
        $("#number-not-agent").text(response.numberOfCustomers);
        $("#number-agent-total").text(response.totalOfAgents);
        $("#number-not-agent-total").text(response.totalOfCustomers);
        updateLoading();
    });
    $('#agent-count-detail-table').DataTable()
            .ajax.url("/report/get-agent-count-detail/" + postData.fromDate + "/" + postData.toDate)
            .load();
}
$(document).ready(function () {
    $("#agent-count-detail-table").DataTable({
        "scrollX": true,
        "processing": true,
        "pageLength": 10,
        "ajax": "/report/get-agent-count-detail/" + postData.fromDate + "/" + postData.toDate,
        "columns": [
            {data: 'amName'},
            {data: 'numberOfAgents'},
            {data: 'numberOfAgentsInWeek'},
            {data: 'numberOfAgentsInOneMonth'},
            {data: 'numberOfAgentsInTwoMonths'}
        ]

    });

    $('.date-overview-status').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
    }).datepicker("update", new Date());

    $('#from-date').on("changeDate", function (e) {
        postData.fromDate = e.date.getTime();
        refreshDataTable();
    });

    $('#to-date').on("changeDate", function (e) {
        postData.toDate = e.date.getTime() + 86400000;
        refreshDataTable();
    });

    $('.date-overview-status').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true
    }).datepicker("update", new Date());

    $(".btn-export").click(function () {
        showPropzyLoading();
        $.post("/report/export-report/agent-count-overview", postData, function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
            hidePropzyLoading();
        });
        return false;
    });
    refreshDataTable();
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop