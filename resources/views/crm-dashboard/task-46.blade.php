@extends('layout.default')

@section('content')
<!--MODAL LISTING DETAIL -->
<div id = "listingDetailModal" class = "modal fade" role = "dialog">

</div> <!-- \ MODAL LISTING DETAIL -->
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> 
                Chi tiết công việc
            </h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">    
                <form id="formTaskDetail" method="post" >
                    <input type="hidden" id="dealId" name="dealId" value="" />
                    <input type="hidden" id="taskId" name="taskId" class="taskId" value="{{$taskId}}" />
                    <input type="hidden" id="defineId" name="defineId" class="defineId" value="{{$defineId}}" /> 
                    <input type="hidden" id="customerEmails" name="defineId" class="defineId" value="{{$customerEmails}}" /> 
                    <input type="hidden" id="customerPhones" name="defineId" class="defineId" value="{{base64_encode($customerPhones)}}" /> 
                    <div class="form-group row" >
                        <h4 class="col-sm-4">Tên KH: {{$task->request->customers->name}}</h4>
                        <h4 class="col-sm-12">{{$task->infoRequest}}</h4>
                    </div>
                    <div id="listings" class="form-group row">
                        <div class="col-sm-12">
                            <table class="table table-bordered table-striped" id="dataTableListings">
                                <thead>
                                    <tr>
                                        <th data-orderable="false">Chọn</th>
                                        <th>LID</th>
                                        <th data-orderable="false">Hình</th>
                                        <th data-orderable="false">Giấy chủ quyền</th>
                                        <th>Giá</th>
                                        <th data-orderable="false">Diện tích (dài x rộng)</th>
                                        <th>Địa chỉ</th>
                                        <th>Thông tin chủ listing</th>
                                        <th>Số ngày live</th>
                                        <th>updated (Days)</th>
                                        <th>Hướng</th>
                                        <th data-orderable="false">Năm xây dựng</th>
                                        <th data-orderable="false">Điểm</th>
                                    </tr>
                                </thead>                  
                            </table> 
                        </div>
                    </div>
                    <div style="margin-top:16px;">
                        <a id="btnOpenEmailForm" href="#" class="btn btn-success">Email to KH</a>
                        <!--<a id="btnAddCart" href="#" class="btn btn-success">Thêm vào giỏ hàng</a>-->
                        <button class="btn btn-danger btnDoneTask">Bỏ qua</button>
                        <?php if (!empty($task->dealId)): ?>
                            <a href="/deal/detail/{{$task->dealId}}" target="_blank" class="btn btn-warning">Deal: {{$task->dealId}}</a>
                        <?php endif; ?>
                        <?php if (!empty($task->leadId)): ?>
                            <!--<a href="/lead/update/{{$task->leadId}}" target="_blank" class="btn btn-warning">Lead: {{$task->leadId}}</a>-->
                        <?php endif; ?>
                        <a href="#" class="btn btn-success makeCall" data-number="{{base64_encode($customerPhones)}}">Gọi</a>
                    </div>

                    <!--
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    -->
                </form>
            </div>
            <div class="box-footer">
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                    <div class="form-group text-center">
                    </div>
                <?php endif; ?>                
            </div>
        </div>
    </section>
</div>

@include('crm-dashboard.modal-task-reminder')
@include('shared.modal-show-log-listing')
@include('deal.email-listing-to-customer-modal')
@include('shared.modal-choose-send-type')
@include('shared.modal-send-sms')
@include('shared.modal-choose-emails')
@include('shared.modal-choose-phone-number')
@include('crm-dashboard.snippet-call-from-task-detail', [
'leadId'=>$task->leadId, 
'dealId'=>$task->dealId,
'taskId'=>$taskId, 
'defineId'=>$defineId,
'taskName'=>$task->taskName
]
)

@endsection


@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/crm-dashboard/commons.js")}}"></script>
<script src="{{loadAsset('/js/commons/deal/email-sms-sender.js')}}"></script>
<script src="{{loadAsset('/js/commons/deal/listing-email-sms-sender.js')}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>

<script type="text/javascript">

var myUserId = "{{$myUserId}}";
var defineId = "{{$defineId}}";
var leadId = "{{$task->leadId}}";
var lead = {
    leadId: "{{$task->leadId}}"
};
var deal = {
    dealId: "{{$task->dealId}}"
};
var dealId = "{{$task->dealId}}";
var propertyType = "{{$task->request->propertyType->typeName}}";
CKEDITOR.replace("emailContent");
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
var taskId = "{{$taskId}}";
var listings = <?php echo GuzzleHttp\json_encode($task->list); ?>;

<?php
    // hidden phone number
    $customers = !empty($task->request->customers) ? $task->request->customers : null;
    if(!empty($customers)){
        $customers->phone = !empty($customers->phone) ? base64_encode($customers->phone) : null;
        if(!empty($customers->phoneList)){
            foreach($customers->phoneList as $index => $phone){
                $customers->phoneList[$index]->phone = !empty($phone->phone) ? base64_encode($phone->phone) : null;
            }
        }
        $task->request->customers = $customers;
    }
?>

var lead = {
    "request": <?php echo GuzzleHttp\json_encode($task->request); ?>
};
$(document).ready(function () {
    var dataTableListings = $('#dataTableListings').DataTable({
        "processing": true,
        "serverSide": false,
        "data": listings,
        "lengthChange": false,
        "drawCallback": function () {
            JMDetail ? JMDetail.openPhoto() : ''; // load function open Photos
          // *****************************
            // **********************
            $('.dataTables_paginate > .pagination').addClass('pagination-sm');
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
                pagination.toggle(this.api().page.info().pages > 1);
        },
        "paging": false,
        "searching": false,
        "ordering": true,
        "fixedHeader": true,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderMatchedListing.renderSelectListing},
            {"data": "rlistingId", render: renderMatchedListing.renderListingId},
            {"data": "rlistingId", render: renderMatchedListing.renderPhotoJM},
            {"data": "rlistingId", render: renderMatchedListing.renderRedOrPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize", render: renderMatchedListing.renderSize},
            {"data": "address", width: "16%"},
            {"data": "sourceBy", render: renderMatchedListing.renderSourceBy, visible: false},
            {"data": "liveDate", render: renderMatchedListing.renderLiveDateCount},
            {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate},
            {"data": "directionName"},
            {"data": "yearBuilt"},
            {"data": "percentValue"}
        ],
        "createdRow": function (row, data, dataIndex) {
            $(row).attr('data-item-id', data.rlistingId);
            return renderRowColorListing(row,data); 
        }
    });
    $('.getLogListing').on('click', function (e, value) {
        event.preventDefault();
        var listingID = $(this).attr('data-listing-id');
        getLogListing(listingID);
    });
    $(".pinkBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find(".pinkBookPhotos").html());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
    $(".redBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find(".redBookPhotos").text());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
    $("#btnOpenEmailForm").on("click", function (event) {
        event.preventDefault();
        var photos = [];
        var photosPreview = "";
        var rListingIds = [];
        $("#dataTableListings_wrapper table tr .selected-email-listing:checked").each(function () {
            var rListingId = $(this).val();
            if (rListingId) {
                rListingIds.push(rListingId);
            }
            var redBookPhotos = $(this).parents('.item.listing').find(".redBookPhotos").val();
            if (redBookPhotos) {
                redBookPhotos = JSON.parse(redBookPhotos);
                $(redBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ đỏ", rListingId);
                });
            }
            var pinkBookPhotos = $(this).parents('.item.listing').find(".pinkBookPhotos").val();
            if (pinkBookPhotos) {
                pinkBookPhotos = JSON.parse(pinkBookPhotos);
                $(pinkBookPhotos).each(function (index, item) {
                    photos.push(item);
                    photosPreview += generatePhotosPreview(item, "Sổ hồng", rListingId);
                });
            }

        });
        if (rListingIds.length <= 0) {
            showPropzyAlert('Không có listing để gửi');
            return false;
        }

        ListingsEmailSmsSender.sendMailOrSms({
            leadId: null,
            dealId: deal.dealId,
            customerEmails: $("#customerEmails").val(),
            customerPhones: Base64.decode($("#customerPhones").val()),
            rListingIds: rListingIds,
            photosPreview: photosPreview,
            photos: photos
        });
    });
//    $("#btnSendMail").on("click", function (event) {
//        event.preventDefault();
//        for (var instanceName in CKEDITOR.instances) {
//            CKEDITOR.instances[instanceName].updateElement();
//        }
//        var photos = [];
//        $(".photos-preview img").each(function () {
//            photos.push($(this).attr('src'));
//        });
//        $("#photos").val(photos);
//        var isValid = true;
//        var errorMessages = "";
//        if ($("#emailsTo").val().trim() == "") {
//            errorMessages += "- Không có email để gửi<br />";
//            isValid = false;
//        }
//        if ($("#emailSubject").val().trim() == "") {
//            errorMessages += "- Nhập tiêu đề!";
//            isValid = false;
//        }
//        if (isValid == false) {
//            showPropzyAlert(errorMessages);
//            return false;
//        }
//        $.ajax({
//            url: "/deal/send-email-listing/" + dealId + "?taskId=" + taskId,
//            type: 'post',
//            data: $("#formEmail").serialize()
//        }).done(function (response) {
//            if (response.result) {
//                if (confirm("Bạn có muốn đổi trạng thái deal không?")) {
//                    window.location = "/deal/update/" + dealId;
//                } else {
//                    window.location = "/";
//                }
//            } else {
//                showPropzyAlert(response.message);
//            }
//        }).always(function () {
//
//        });
//    });
    $("#btnAddCart").on("click", function (event) {
        event.preventDefault();
        var rListingIds = [];
        $("#dataTableListings_wrapper tr .selected-email-listing:checked").each(function () {
            var rListingId = $(this).val();
            if (rListingId) {
                rListingIds.push(rListingId);
            }
        });
        if (rListingIds.length <= 0) {
            showPropzyAlert('Không có listing để gửi');
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: "/deal/add-listing-cart",
            data: 'rlistingIds=' + rListingIds + '&leadId=' + leadId + "&taskId=" + taskId,
            type: "post"
        }).done(function (response) {
            if (response.result) {
                if (confirm("Bạn có muốn đổi trạng thái deal không?")) {
                    window.location = "/deal/update/" + dealId;
                } else {
                    window.location = "/";
                }
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".btnDoneTask").on("click", function () {
        showPropzyLoading();
        $.ajax({
            url: "/crm-dashboard/done-task/" + taskId,
            type: "get"
        }).done(function (response) {
            showPropzyAlert(response.message);
            if (response.result) {
                $("#modalTaskDetail").modal("hide");
                showModalCreateTasks(taskId);
                $("#modalCreateTasks").on('hide.bs.modal', function (e) {
                    showPropzyLoading();
                    window.location = "/";
                });
            }
        }).always(function () {
            hidePropzyLoading();
        });
        return false;
    });
});</script>
<script src="{{loadAsset("/js/deal/search-listing.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
@stop