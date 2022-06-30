<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="view-tieu-chuan">

    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">LS CREDIT (STAFF)</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter active" data-filter-type="1">Hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Cả tuần</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Tháng</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>

                    </div>
                    <div id="sectionSelectDate" class="row">
                        <div class="col-sm-3">
                            <input type="text" id="fromDate" class="form-control" />
                        </div>
                        <div class="col-sm-3">                            
                            <input type="text" id="toDate" class="form-control" />
                        </div>
                        <div class="col-sm-3">                            
                            <button class="btnViewFromTo btn btn-primary">Xem</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <div id="editBaseScoreWrapper" class="section-edit-setting">
                                <div class="form-group">
                                </div>
                                <div id="lsListSection" class="form-group">
                                    <table class="table table-bordered table-striped" id="scoreTable">
                                        <thead>
                                            <tr>
                                                <th>Ngày</th>
                                                <th>Số điểm</th>
                                                <th>Không đạt chỉ tiêu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div>
                                <?php
                                if (isset($lsTargetGradingScale) && $lsTargetGradingScale):
                                    $hrmChildTargets = $lsTargetGradingScale->gradingScale;
                                    ?>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Tùy chỉnh điểm sàn</th>
                                                <th>Số lượng</th>
                                                <th>Điểm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($hrmChildTargets as $hrmGradingScale): ?>
                                                <tr>
                                                    <td>
                                                        {{$hrmGradingScale->name}}
                                                    </td>
                                                    <td>
                                                        {{$hrmGradingScale->totalValue}}
                                                    </td>
                                                    <td>
                                                        {{$hrmGradingScale->totalTargetValue}}
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                            <tr class="sum">
                                                <td>
                                                    Điểm sàn
                                                </td>
                                                <td>

                                                </td>
                                                <td>
                                                    {{$lsTargetGradingScale->targetValue}}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>

                </div>
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

<!-- Page script -->
<script type="text/javascript">
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
var today = new Date();
var scoreTable = null;
$("#sectionSelectDate").hide();
$("#fromDate").datepicker();
$("#toDate").datepicker();
$(document).ready(function () {
    $(".btn-filter.active").click();
});
$(".btn-filter").on("click", function (event) {
    event.preventDefault();
    $("#sectionSelectDate").hide();
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");
    var type = $(this).attr("data-filter-type");
    var fromMoment = null;
    var toMoment = moment().endOf('day');
    if (scoreTable) {
        scoreTable.clear().draw();
    }
    switch (type) {
        case "1":
            fromMoment = moment().startOf('day');
            getScoreTable(fromMoment, toMoment);
            break;
        case "2":
            fromMoment = moment().startOf('isoweek');
            //toMoment = moment().endOf('isoweek');            
            getScoreTable(fromMoment, toMoment);
            break;
        case "3":
            fromMoment = moment().startOf('month');
            //toMoment = moment().endOf('month');
            getScoreTable(fromMoment, toMoment);
            break;
        case "4":
            // xử lý cho chọn fromdate - todate
            if (scoreTable) {
                scoreTable.clear().draw();
                //scoreTable.destroy();
            }
            $("#sectionSelectDate").show();
            break;
    }
});

$(".btnViewFromTo").on("click", function () {
    var fromMoment = moment($("#fromDate").val());
    var toMoment = moment($("#toDate").val());
    getScoreTable(fromMoment, toMoment);
});

function getScoreTable(fromMoment, toMoment) {
    var postData = {
        "fromDate": fromMoment.unix() * 1000,
        "toDate": toMoment.unix() * 1000
    };
    showPropzyLoading();
    $.ajax({
        "url": "/credit/ls-staff-target",
        "type": "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (scoreTable) {
            scoreTable.destroy();
            $("#scoreTable").empty();
        }
        scoreTable = $("#scoreTable").DataTable({
            "searching": false,
            "paging": false,
            "ordering": false,
            "lengthChange": false,
            "data": response.data,
            "columns": [
                {data: "createdDate", render: dateRender},
                {data: "excecution"},
                {data: "isPass"}
            ]
        });
    }).always(function () {
        hidePropzyLoading();
    });
}
var dateRender = function (data, type, object) {
    if (!data) {
        return "";
    }
    return moment(data).format("DD/MM/YYYY");
}

var renderIsPass = function (data, type, object) {
    if (!object.isPass) {
        data = "<input type='checkbox' checked disabled />";
    } else {
        data = "";
    }
    return data;

}
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop