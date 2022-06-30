<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="create-task-view">
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tạo task cho TM</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter active" data-filter-type="1">Cần làm hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Hôm qua</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Ngày mai</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>
                    </div>
                    <div class="chooseDate row">
                        <div class="col-xs-12 col-sm-3">
                            <label>Từ ngày</label>
                            <div class="input-group date">
                                <input type="text" class="form-control datepicker" id="fromDate"/>
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <label>Đến ngày</label>

                            <div class="input-group date">
                                <input type="text" class="form-control datepicker" id="toDate" />
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <label class="col-xs-12">&nbsp;</label>
                            <button class="viewFromDateToDate btn btn-warning">Xem</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <table id="items" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Deal/Lead ID</th>
                                    <th>Thời gian</th>
                                    <th>Loại công việc</th>
                                    <th>Hoàn tất việc này?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <span class="old-task">Call</span>
                                    </td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input name="" id="" value="" type="checkbox">
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2
                                    </td>
                                    <td>
                                        <span>Email</span>
                                    </td>
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                <input name="" id="" value="" type="checkbox">
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@include("task.call-reminder-detail-modal")
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
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});
var itemsTable = null;
var filterType = 1;
$(document).ready(function () {
    $('.datepicker').datepicker();
    $(".chooseDate").hide();
    initItemsTable(filterType);
    $(".btn-filter").on('click', function (event) {
        event.preventDefault();
        $(".chooseDate").hide();
        $(".btn-filter").removeClass("active");
        $(this).addClass("active");
        filterType = $(this).attr("data-filter-type");
        //console.log(filerType);
        if (filterType == 4) {
            $(".chooseDate").show();
        } else {
            initItemsTable(filterType);
        }
    });
    $(".viewFromDateToDate").on("click", function (event) {
        event.preventDefault();
        if ($("#fromDate").val() === "") {
            showPropzyAlert("Chọn ngày bắt đầu");
            return false;
        }
        if ($("#toDate").val() === "") {
            showPropzyAlert("Chọn ngày kết thúc");
            return false;
        }
        initItemsTable(filterType);
    });
});
/*
 var dateRender = function (data, type, object) {
 if (!data)
 return "";
 return $.format.date(new Date(data), "dd/MM/yyyy");
 }
 */
var dealIdOrLeadId = function (data, type, object) {
    if (object.dealId == null && object.leadId == null) {
        return "";
    }
    var dealOrLead = object.dealId != null ? "deal" : "lead";
    var value = object.dealId != null ? object.dealId : object.leadId;
    data = "<a target='_blank' href='/" + dealOrLead + "/update/" + value + "'  onclick=\"return updateAccepted(this,'" + dealOrLead + "', " + value + ", " + object.typeId + ");\"  >" + dealOrLead + "-" + value + "</a>";
    return data;
}

function updateAccepted(selector, dealOrLead, id, typeId) {
    var postData = {
        "leadId": dealOrLead === "lead" ? id : null,
        "dealId": dealOrLead === "deal" ? id : null,
        "typeId": typeId
    };
    showPropzyLoading();
    $.ajax({
        url: "/activity/acepted",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (!response.result) {
            showPropzyAlert(response.message);
        } else {
            window.location = $(selector).attr("href");
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}

var linkRender = function (data, type, object) {
    if (!data) {
        return "";
    }
    var dealOrLead = object.dealId != null ? "deal" : "lead";
    var value = object.dealId != null ? object.dealId : object.leadId;
    var isOldTask = object.isLate && !object.isDone ? "old-task" : "";
    if (object.typeId == 7 || object.typeId == 8 || object.typeId == 9 || object.typeId == 10 || object.typeId == 11 || object.typeId == 12) {
        style = "";
        if (object.typeId == 10) {
            style = "background:#27ff00";
        }
        data = "<a target='_blank' href='/" + dealOrLead + "/update/" + value + "' ><span class='" + isOldTask + "' style='" + style + "' >" + data + "</span></a>";
    } else if (object.typeId == 2) {
        var detailType = "deal";
        if (object.dealReminderId === null) {
            detailType = "lead";
        }
        var id = object.dealReminderId;
        if (id === null) {
            console.log(id + " - " + object.leadReminderId);
            id = object.leadReminderId;
        }
        var callBackFunc = "showCallDetail(\"" + detailType + "\", " + id + ")";
        data = "<a href='#' onclick='return " + callBackFunc + "' ><span class='" + isOldTask + "'>" + data + "</span></a>";
    } else if (object.typeId == 3) {
        var detailType = "meeting";
        var id = object.meetingReminderId;
        var callBackFunc = "showCallDetail(\"" + detailType + "\", " + id + ")";
        data = "<a href='#' onclick='return " + callBackFunc + "' ><span class='" + isOldTask + "'>" + data + "</span></a>";
    }
    return data;
}
var checkboxRender = function (data, type, object) {
    var dealOrLead = object.dealId != null ? "deal" : "lead";
    var value = object.dealId != null ? object.dealId : object.leadId;
    var isDisabled = object.isDone || filterType != 1 ? "disabled" : "";
    var isChecked = object.isDone ? "checked" : "";
    data = "<input type='checkbox' onclick='return setDone(this);' data-type-id='" + object.typeId + "' data-type='" + dealOrLead + "' value=" + value + " " + isDisabled + " " + isChecked + " />";
    return data;
}
function setDone(selector) {
    var type = $(selector).attr("data-type") + "Id";
    var typeId = $(selector).attr("data-type-id");
    var value = $(selector).val();
    showPropzyLoading();
    $.ajax({
        url: "/task/tm-basket-done?type=" + type + "&value=" + value + "&typeId=" + typeId,
        type: "get"
    }).done(function (response) {
        if (response.result) {
            $(selector).prop("readonly", true);
            $(selector).prop("disabled", true);
        }
        showPropzyAlert(response.message);
        initItemsTable(filterType);
    }).always(function () {
        hidePropzyLoading();
    });
}
function initItemsTable(filter) {
    if (!filter) {
        filter = 1;
    }
    var dataUrl = "/task/tm-basket-data?filterType=" + filter;
    if (filter == 4) {
        console.log("từ ngày đến ngày");
        var fromDate = $("#fromDate").val();
        if (fromDate !== "") {
            fromDate = moment(fromDate).unix() * 1000;
        }
        var toDate = $("#toDate").val();
        if (toDate !== "") {
            toDate = moment(toDate).unix() * 1000;
        }
        dataUrl += "&fromDate=" + fromDate + "&toDate=" + toDate;
    }
    if (itemsTable) {
        itemsTable.destroy();
    }
    itemsTable = $("#items").DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": dataUrl,
        "scrollX": true,
        "ordering": false,
        "lengthChange": false,
        "searching": false,
        "columns": [
            {data: 'dealId', render: dealIdOrLeadId},
            {data: 'reminderDate', render: dateRender},
            {data: 'typeName', render: linkRender},
            {data: 'dealId', render: checkboxRender}
        ],
        "createdRow": function (row, data, index) {
            if (!data.isActivated) {
                $('td', row).parent('tr').addClass("unactivated");
            }
        }
    });
}
function showCallDetail(type, id) {
    $.ajax({
        url: "/task/get-call-detail/" + id + "?type=" + type,
        type: "get"
    }).done(function (response) {
        console.log(response);
        if (response.result) {
            console.log(response.data.reminderDate);
            $("#whenDate").html(moment(response.data.reminderDate).format("DD/MM/YYYY HH:mm:ss"));
            $("#reminderTime").html(response.data.reminderTime);
            $("#subject").html(response.data.subject);
            $("#content").html(response.data.content);
            $("#status").html(response.data.reminderStatus.statusName);
            $("#status").html(response.data.reminderStatus.statusName);
            $("#priority").html(response.data.reminderPriority.priorityName);
            $("#type").html(response.data.reminderType.reminderName);
            $("#with").html(response.data.customerName);
            $("#responsiblePerson").html(response.data.userName);
            $("#CallReminderModal").modal();
        }
    }).always(function () {

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