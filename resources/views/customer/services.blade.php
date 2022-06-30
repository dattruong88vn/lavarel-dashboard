<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<div class='page-rating-tests'>

    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
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
                                        <input  class="form-control" type="text" id="txtSearch" placeholder="Search thông tin khách hàng theo tên, sdt, email" />
                                    </div>
                                    <button class="btn btn-warning btnSearch">Search</button>
                                </div>

                                <table id="dataTableServices" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên</th>
                                            <th>Điện thoại</th>
                                            <th>Email</th>
                                            <th>Listing</th>
                                            <th>Mã</th>
                                            <th>Status</th>
                                            <th>Ngày tạo</th>
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
            <div class="reviewHistoryWrapper">

            </div>
        </section>
    </form>
</div>

<!-- Modal -->
<div id="modalServiceDetail" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Gửi cho AM</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">
                    <div class="form-group">
                        <div class="col-sm-3">Ngày tạo: </div>
                        <div class="col-sm-9 createdDate"></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Tên: <a href="#" class="save-field" data-field="name">Apply</a></div>
                        <div class="col-sm-9 "><input type="text" class="name form-control" /></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Số điện thoại: <a href="#" class="save-field" data-field="phone">Apply</a></div>
                        <div class="col-sm-9"><input type="text" class="phone form-control" /></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Email: <a href="#" class="save-field" data-field="email">Apply</a></div>
                        <div class="col-sm-9"><input type="text" class="email form-control" /></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-12">Nhu cầu: <a href="#" class="save-field" data-field="customerServiceConsults">Apply</a></div>
                        <div class="col-sm-12 listing-type">
                            <?php foreach ($servicePropertyTypes as $servicePropertyType): ?>
                                <div>
                                    <label><input type="checkbox" class="customerServiceId customerServiceId-{{$servicePropertyType->propertyTypeId}}" value="{{$servicePropertyType->propertyTypeId}}" /> {{$servicePropertyType->name}}</label>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-3">Listing IDs: <a class="save-field" data-field="listings">Apply</a></div>
                        <div class="col-sm-9 "><input type="text" class="listings form-control" /></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Mã: <a class="save-field" data-field="code">Apply</a></div>
                        <div class="col-sm-9 "><input type="text" name="code" class="code form-control" /></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Ghi chú: <a class="save-field" data-field="note">Apply</a></div>
                        <div class="col-sm-9 "><textarea type="text" name="note" class="note form-control" ></textarea></div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-3">Status:</div>
                        <div class="col-sm-9 ">
                            <div class="statusName" style="margin-bottom:16px;"></div>
                            <button class="btn btn-success btnChangeStatus btnChangeStatus-2" data-status="2">Chưa chuyển CS</button>
                            <button class="btn btn-success btnChangeStatus btnChangeStatus-3" data-status="3">Đã chuyển CS</button>
                            <button class="btn btn-success btnChangeStatus btnChangeStatus-4" data-status="4">Done / Độc quyền</button>
                            <button class="btn btn-success btnChangeStatus btnChangeStatus-5" data-status="5">Done / Không Độc quyền</button>
                            <button class="btn btn-success btnChangeStatus btnChangeStatus-6" data-status="6">Hủy</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer text-left">
            </div>
        </div>

    </div>
</div>


@endsection



@section('page-js')
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
<script >
var customerServiceConsults = <?php echo json_encode($servicePropertyTypes); ?>;
var statusList = [
    "Mới", "Chưa chuyển CS", "Đã chuyển CS", "Done / Độc quyền", "Done / Không Độc quyền", "Hủy"
];
</script>
<script type="text/javascript">
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
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
        data = "<a href='#' onclick=\"return showDetailModal('" + object.id + "','" + object.name + "')\" >" + data + "</a>";
        return data;
    };
    var dataTableServices = null;
    initDataTable();
    function initDataTable() {
        if (dataTableServices !== null) {
            dataTableServices.destroy();
        }
        var term = $("#txtSearch").val();
        dataTableServices = $("#dataTableServices").DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "/customer/services-data?term=" + term,
            "ordering": false,
            "lengthChange": false,
            "searching": false,
            "bStateSave": true,
            "columns": [
                {data: 'id'},
                {data: 'name', render: renderName},
                {data: 'phone'},
                {data: 'email'},
                {data: 'listings'},
                {data: 'code'},
                {data: 'customerServiceStatus.name'},
                {data: 'createdDate', render: dateRender}
            ]
        });
        return dataTableServices;
    }

    $(".btnSearch").on("click", function (event) {
        event.preventDefault();
        initDataTable();
    });
    var serviceDetail = null;
    function showDetailModal(id) {
        serviceDetail = null;
        showPropzyLoading();
        $.ajax({
            url: "/customer/service-detail/" + id,
            type: "get"
        }).done(function (response) {
            serviceDetail = response.data;
            var modal = $("#modalServiceDetail");
            modal.find(".customerServiceId").prop("checked", false);
            if (response.result) {
                showStatusButton(response.data.statusId);
                modal.find(".name").val(response.data.name);
                modal.find(".createdDate").html(moment(response.data.createdDate).format("DD/MM/YYYY H:mm:ss"));
                modal.find(".phone").val(response.data.phone);
                modal.find(".email").val(response.data.email);
                modal.find(".listings").val(response.data.listings);
                modal.find(".code").val(response.data.code);
                modal.find(".note").val(response.data.note);
                modal.find(".statusName").html(response.data.customerServiceStatus.name);
                $(response.data.customerServiceConsults).each(function (index, item) {
                    modal.find(".customerServiceId-" + item.id.typeId).prop("checked", true);
                });
                modal.modal();
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
        return false;
    }

    $(".btnChangeStatus").on("click", function (event) {
        event.preventDefault();
        var statusId = $(this).attr("data-status");
        serviceDetail.statusId = parseInt(statusId);
        delete serviceDetail.customerServiceStatus;
        saveServiceDetail();
    });
    /*
     $(".btnDelete").on("click", function (event) {
     event.preventDefault();
     serviceDetail.isDeleted = true;
     saveServiceDetail();
     });
     */
    function showStatusButton(status) {
        switch (status) {
            case 1:
                showHideStatusButtons([2, 3, 6]);
                break;
            case 2:
                showHideStatusButtons([3, 6]);
                break;
            case 3:
                showHideStatusButtons([4, 5, 6]);
                break;
            case 4:
                showHideStatusButtons([5, 6]);
                break;
            case 5:
                showHideStatusButtons([4, 6]);
                break;
            case 6:
                showHideStatusButtons([0]);
                break;
        }
    }

    function showHideStatusButtons(ids) {
        $(".btnChangeStatus").hide();
        $(ids).each(function (index, id) {
            $(".btnChangeStatus-" + id).show();
        });
    }

    $(".save-field").on("click", function () {
        var fieldName = $(this).attr('data-field');
        var customerServiceIds = [];
        $(".customerServiceId:checked").each(function () {
            customerServiceIds.push(parseInt($(this).val()));
        });
        console.log(customerServiceIds);
        //return;
        if (fieldName === "customerServiceConsults") {
            serviceDetail.customerServiceConsults = [];
            $(customerServiceConsults).each(function (index, item) {
                if ($.inArray(item.propertyTypeId, customerServiceIds) >= 0) {
                    serviceDetail.customerServiceConsults.push({
                        "id": {
                            "typeId": item.propertyTypeId
                        }
                    });
                }
            });
        } else {
            serviceDetail[fieldName] = $("." + fieldName).val();
        }
        saveServiceDetail();
    });

    function saveServiceDetail() {
        //console.log(serviceDetail);
        showPropzyLoading();
        $.ajax({
            "url": "/customer/update-service",
            "type": "post",
            "data": JSON.stringify(serviceDetail)
        }).done(function (response) {
            if (!response.result) {
                showPropzyAlert(response.message);
            } else {
                showStatusButton(serviceDetail.statusId);
                $("#modalServiceDetail").find(".statusName").html(statusList[serviceDetail.statusId-1]);
                if (serviceDetail.statusId == 6) {
                    $("#modalServiceDetail").modal("hide");
                }
                dataTableServices.ajax.reload();
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    .btnDelete, .btnChangeStatus{
        margin-bottom: 16px;
    }
</style>
@stop