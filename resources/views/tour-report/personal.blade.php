<?php
use App\Libraries\PropzyCommons
?>
@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
<div class="box box-primary">
    <div class="box-body">
        <div class="form-group">
            <div class="col-sm-4">
                <label for="">From</label>
                <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                    <input type="text" class="form-control" id="fromDate" name="fromDate" value="{{date('d/m/Y')}}">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <label>To</label>
                <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                    <input  type="text" class="form-control" id="toDate" name="toDate" value="{{date('d/m/Y')}}">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="box box-primary">
    <div class="box-header with-border">
        <h4>Tour bị hủy <span class="labelCanceledTourCount"></span></h4>
    </div><!-- /.box-header -->
    <div class="box-body report-canceled-tour">
        <div class="col-sm-6">
            <table id="dataTableCanceledTours" class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Lý do hủy</th>
                        <th>Số lượng</th>
                        <th>%</th>
                    </tr>
                </thead>
                <tbody>                                    
                </tbody>
            </table>
        </div>
        <div class="col-sm-6">
            <div style="float:none;margin:0 auto;">
                <canvas id="canvas-canceled-tours" height="200px"></canvas>
            </div>
        </div>
    </div>
</div>
<div class="box box-primary">
    <div class="box-header with-border">
        <h4>Danh sách tour </h4>
        <span class="labelViewedToursCount"></span>
    </div><!-- /.box-header -->
    <div class="box-body report-viewed-tour">
        <table id="viewed-tours" class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Bình thường</th>
                    <th>Trễ</th>
                    <th>Sai location</th>
                    <th>Cần hỗ trợ</th>
                    <th>Tổng</th>
                </tr>
            </thead>
            <tbody>                                    
            </tbody>
        </table>
    </div>
</div>
<div id="modalInfoDeals" class="modal fade" role="dialog">
    <div class="modal-dialog" style="min-width: 800px;">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Danh sách deals</h4>
            </div>
            <div class="modal-body">
                <div class="col-xs-4">
                    <select style="width: 150px;" id="zoneId" name="" class="form-control">
                          <option value="0">-Zone-</option>
                    </select>
                </div>
                <div class="col-xs-4">
                    <select style="width: 150px;" id="teamId" name="" class="form-control">
                          <option value="0">-Team-</option>
                    </select>
                </div>
                <div class="col-xs-4">
                    <select style="width: 150px;" id="memId" name="" class="form-control">
                          <option value="0">-Thành viên-</option>
                    </select>
                </div>
                <table id="dataTableInfoDeals" style="width: 100%;" class="table table-bordered">
                    <thead>
                        <tr>                        
                            <th>Tên KH</th>
                            <th>Loại giao dịch</th>
                            <th>Loại BĐS</th>
                            <th>Ngân sách</th>
                            <th>Ngày đi tour</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button id="btnCancelSchedule" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@endsection
@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
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
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script type="text/javascript">
var memIdArr = [];
var teamArr = [];
var memArr = [];

function initZoneTeamMem () {
    $.ajax({
    "url" : "/tour-report/get-list-of-zone-team-member",
    "type" : "get",
    }).done(function (response) {
        let zoneArr = response.data.zone;
        // $.each(zoneArr, function(index, value) {
        //     $("<option></option>", {value: value.id, text: value.departmentName}).appendTo('#zoneId');
        // })
        renderOptionToSelect(zoneArr, "#zoneId", "id", "departmentName");
        teamArr = response.data.team;
        // $.each(teamArr, function(index, value) {
        //     $("<option></option>", {value: value.id, text: value.departmentName}).appendTo('#teamId');
        // })
        renderOptionToSelect(teamArr, "#teamId", "id", "departmentName");
        
        memArr = response.data.member;
        memArr = memArr.filter((thing, index, self) =>
            index === self.findIndex((t) => (
            t.userId === thing.userId
            ))
        )
        memIdArr = memArr.map((user) => user.userId);
        // $.each(memArr, function(index, value) {
        //     $("<option></option>", {value: value.userId, text: value.name}).appendTo('#memId');
        // })
        
        renderOptionToSelect(memArr, "#memId", "userId", "name");
        memArrDependOnZone = memArr;
    });
}
initZoneTeamMem();

function renderOptionToSelect(data, idElement, valueId, text) {
    $(idElement).children().not('option:first').remove();
    $.each(data, function(index, value) {
        $("<option></option>", {value: value[valueId], text: value[text]}).appendTo(idElement);
    })
}
var memArrDependOnZone = [];
$("#zoneId").change(function(e) {
    if(e.target.value == "0") {
        //document.getElementById('teamId').value = "0";
        //document.getElementById('memId').value = "0";
        $("#teamId").val("0");
        $("#memId").val("0");
        //$("#teamId").children().not('option:first').remove();
        //$("#memId").children().not('option:first').remove();
        memIdArr = memArr.map((user) => user.userId);
        renderOptionToSelect(teamArr, "#teamId", "id", "departmentName");
        renderOptionToSelect(memArr, "#memId", "userId", "name");
        memArrDependOnZone = memArr;
        memArrDependOnTeam = memArr;
    } else {
        //render team
        let teamArrLocal = teamArr.filter((o) => {return o.parentId == e.target.value});
        renderOptionToSelect(teamArrLocal, "#teamId", "id", "departmentName");
        //render mem by zone id
        let memArrLocal = memArr.filter((o) => {return o.zoneId == e.target.value})
        memArrDependOnZone = memArrLocal;
        memArrDependOnTeam = memArrLocal;
        renderOptionToSelect(memArrLocal, "#memId", "userId", "name");
        memIdArr = memArrLocal.map((user) => user.userId);
        
    }
    getInfoDeals(selectorGlobal);
});
var memArrDependOnTeam = [];
$("#teamId").change(function(e) {
    if(e.target.value == "0") {
        //document.getElementById('memId').value = "0";
        $("#memId").val("0");
        //$("#memId").children().not('option:first').remove();
        memIdArr = memArrDependOnZone.map((user) => user.userId);
        renderOptionToSelect(memArrDependOnZone, "#memId", "userId", "name");
        memArrDependOnTeam = memArrDependOnZone;
    } else {
        //filter member
        let memArrLocal = memArr.filter((o) => {return o.teamId == e.target.value});
        memArrDependOnTeam = memArrLocal;
        renderOptionToSelect(memArrLocal, "#memId", "userId", "name");
        //action filter
        memIdArr = memArrLocal.map((user) => user.userId);
    }
    getInfoDeals(selectorGlobal);
});
$("#memId").change(function(e) {
    if(e.target.value == "0") {
        memIdArr = memArrDependOnTeam.map((user) => user.userId);
    } else {
        let memArrLocal = memArr.filter((o) => {return o.userId == e.target.value});
        //action filter
        memIdArr = memArrLocal.map((user) => user.userId);
    }
    
    getInfoDeals(selectorGlobal);
});
var dealId = "";
var datatableViewedTours = null;
function getViewedTour() {
    $.ajax({
        'url': "/tour-report/viewed-tour",
        'method': 'post',
        'type': 'json',
        'data': JSON.stringify(getPostData())
    }).done(function (response) {
        var lengthOfTour = response.data.list.length;
        response.data.list.map((itemTour, index) => {
            if (lengthOfTour == (index + 1)) {
                itemTour.numberOfLatedTour = '';
                itemTour.numberOfSupportTour = '';
                itemTour.numberOfTour = '';
                itemTour.numberOfWrongLocation = '';
            }
            return itemTour;
        })
        if (response.data.total < 2) {
            $(".labelViewedToursCount").html(response.data.total + ' tour');
        } else {
            $(".labelViewedToursCount").html(response.data.total + ' tours');
        }
        
        try {
            datatableViewedTours.destroy();
        } catch (Ex) {
        }
        datatableViewedTours = $("#viewed-tours").DataTable({
            "processing": false,
            "serverSide": false,
            "data": response.data.list,
            "lengthChange": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "columns": [
                //{"data": "rlistingId"},
                {"data": "statusName"},
                {"data": "numberOfTour", render: tourReportRenders.renderViewedToursValue},
                {"data": "numberOfLatedTour", render: tourReportRenders.renderViewedToursValue},
                {"data": "numberOfWrongLocation", render: tourReportRenders.renderViewedToursValue},
                {"data": "numberOfSupportTour", render: tourReportRenders.renderViewedToursValue},
                {"data": "numberOfTotal", render: tourReportRenders.renderViewedToursValue}
            ],
            "createdRow": function (row, data, dataIndex) {
                var buttons = $(row).find(".btn-get-info-deals");
                for (var i = 0; i < buttons.length; i++) {
                    var button = buttons[i];
                    $(button).attr("data-typeHorizontal", i+1);
                }
            }
        });
    }).always(function () {
        //hidePropzyLoading();
    });
}
var viewedToursColumns = [
    "statusName",
    "numberOfTour",
    "numberOfLatedTour",
    "numberOfWrongLocation",
    "numberOfSupportTour",
    "numberOfTotal",
];
var dataTableCanceledTours = null;
function getCanceledTours() {
    $.ajax({
        'url': "/tour-report/canceled-tour",
        'method': 'post',
        'type': 'json',
        'data': JSON.stringify(getPostData())
    }).done(function (response) {
        $(".labelCanceledTourCount").html(response.data.total);
        try {
            dataTableCanceledTours.destroy();
        } catch (Ex) {
        }
        // console.log(response.data.list)
        var dataRender = [];
        $.each(response.data.list,function(key,value){
            if(value.control != 'input_hidden'){
                dataRender.push(value);
            }
        })
        dataTableCanceledTours = $("#dataTableCanceledTours").DataTable({
            "processing": false,
            "serverSide": false,
            "data": dataRender,
            "lengthChange": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "columns": [
                //{"data": "rlistingId"},
                {"data": "name"},
                {"data": "value", render: tourReportRenders.renderCanceledToursValue},
                {"data": "percentValue"}
            ]
        });
        showCanvasCanceledTours(response.data.list);
    }).always(function () {
        //hidePropzyLoading();
    });
}
function getPostData() {
    var postData = {
        "toDate": $('#toDate').val() ? moment($('#toDate').val(), 'DD-MM-YYYY').unix() * 1000 : null,
        "fromDate": $('#fromDate').val() ? moment($('#fromDate').val(), 'DD-MM-YYYY').unix() * 1000 : null,
        "member": memIdArr
    };
    return postData;
}
var canvasCanceledTours = $("#canvas-canceled-tours");
function showCanvasCanceledTours(data) {
    var ctx = canvasCanceledTours.get(0).getContext("2d");
    var statusNames = [];
    var value = [];
    var lpRValue = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        statusNames[i] = item.name;
        value[i] = item.value;
    }
    window.reportDealByStatus = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                    data: value,
                    backgroundColor: [
                        window.chartColors.red,
                        window.chartColors.green,
                        window.chartColors.yellow,
                        window.chartColors.grey,
                    ],
                    label: 'Tour bị hủy'
                }],
            labels: statusNames
        },
        options: {
            responsive: true
        }
    });
}
function loadData() {
    getViewedTour();
    getCanceledTours();
}
loadData();
setInterval(getViewedTour, 30000);
setInterval(getCanceledTours, 30000);
$("#fromDate").on("change", function () {
    loadData();
});
$("#toDate").on("change", function () {
    loadData();
});
function renderCustomerName(data, type, object){
    return "<a href='/deal/detail/"+object.dealId+"'>"+data+"</a>";
}
var dataTableInfoDeals = null;
var selectorGlobal = null;
function getInfoDeals(selector) {
    selectorGlobal = selector;
    var reasonId = $(selector).attr("data-reason-id");
    var postData = getPostData();
    if (reasonId) {
        postData.reasonId = parseInt(reasonId);
    } else {
        postData.typeVertical = $(selector).attr("data-typeVertical");
        postData.typeHorizontal = $(selector).attr("data-typeHorizontal");
        postData.typeHorizontal = viewedToursColumns[postData.typeHorizontal];
        postData.member = this.memIdArr;
    }
    showPropzyLoading();
    $.ajax({
        'url': "/tour-report/info-deals",
        'type': 'post',
        'data': JSON.stringify(postData)
    }).done(function (response) {
        try {
            dataTableInfoDeals.destroy();
        } catch (Ex) {
        }
        dataTableInfoDeals = $("#dataTableInfoDeals").DataTable({
            "processing": false,
            "serverSide": false,
            "data": response.data.list,
            "lengthChange": false,
            "paging": false,
            "searching": false,
            "ordering": false,
            "columns": [
                //{"data": "rlistingId"},
                {"data": "customerName",render:renderCustomerName},
                {"data": "listingTypeName"},
                {"data": "propertyTypeName"},
                {"data": "formatInitialBudget"},
                {"data": "touringDate", render: function(data, type, object) {
                    var d = new Date(data);
                    return moment(d).format("DD/MM/YYYY HH:mm:ss");
                }}
            ]
        });
        $("#modalInfoDeals").modal();
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
}

// close popup init again
$("#modalInfoDeals").on('hidden.bs.modal', function(){
    initZoneTeamMem();
});

var tourReportRenders = {
    renderCanceledToursValue: function (data, type, object) {
        return "<a href='#' onclick='return getInfoDeals(this)' data-reason-id=" + object.id + ">" + data + "</a>";
    },
    /**
     * 
     * {"data": "numberOfTour", render: tourReportRenders.renderViewedToursValue},
     * {"data": "numberOfLatedTour", render: tourReportRenders.renderViewedToursValue},
     * {"data": "numberOfWrongLocation", render: tourReportRenders.renderViewedToursValue},
     * {"data": "numberOfSupportTour", render: tourReportRenders.renderViewedToursValue},
     * {"data": "numberOfTotal", render: tourReportRenders.renderViewedToursValue}
     *      
     */
    renderViewedToursValue: function (data, type, object) {
        var typeHorizontal = "";
        return "<a class='btn-get-info-deals' href='#' onclick='return getInfoDeals(this)' data-typeVertical='" + object.typeVertical + "' data-typeHorizontal='" + typeHorizontal + "' >" + data + "</a>";
    }
};
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop