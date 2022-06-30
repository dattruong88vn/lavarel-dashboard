@extends('layout.default')

@section('content')
    <script type="text/javascript">
        var lead = {{$task->leadId}};
        var deal = {{$task->dealId}};
        var taksid_for_deposit = {{$taksID}};
    </script>
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> {{$task->taskName}}</h2>
        </div>
        <div class="box box-primary">
            <div class="box-body">
                <div>
                    <?php $currentSchedule = $task->schedules[0]; ?>
                    <h3>
                        Lần: {{count($task->schedules)}}, ngày: {{date('d/m/Y',$currentSchedule->scheduleTime/1000)}}, khách hàng: {{$currentSchedule->customerName}}, CC: {{$currentSchedule->csName}}
                        <span id="expandTable" class="glyphicon glyphicon-triangle-bottom" aria-hidden="true" ></span>
                        <span id="collapseTable" class="glyphicon glyphicon-triangle-top" aria-hidden="true" style="display: none;"></span>
                    </h3>
                    <table id="history-list" class="table table-bordered" style="display: none;">
                        <thead>
                            <tr >
                                <th style="text-align: center;">#</th>
                                <th style="text-align: center;">CC</th>
                                <th style="text-align: center;">Khách hàng phản hồi về tour</th>
                                <th style="text-align: center;">CC phản hồi về khách hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($task->schedules as  $key => $schedule) :  ?>
                                
                                    <tr>
                                        <td align="center">
                                            <?=($key + 1)?>
                                        </td>
                                        <td>
                                            {{$schedule->csName}}
                                        </td>
                                        <td>
                                            <?php foreach ($schedule->customerFeedbackForTour as $feedback): ?>
                                              <div>- {{$feedback->questionName}}: <a href='#' class="starRenderPropzy" poin="{{number_format($feedback->percentValue, 0)}}">
                                                    {{number_format($feedback->percentValue, 0)."%"}}
                                                </a></div>
                                             <?php endforeach; ?>
                                        </td>
                                        <td>
                                            {{$schedule->csFeebacForkCustomer}}
                                        </td>
                                    </tr> 
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                    <div>
                        <label>Khách hàng phản hồi về tour:</label>
                        <?php foreach ($currentSchedule->customerFeedbackForTour as $feedback): ?>
                            <div>- {{$feedback->questionName}}: <a href='#' class="starRenderPropzy" poin="{{number_format($feedback->percentValue, 0)}}">
                                    {{number_format($feedback->percentValue, 0)."%"}}
                                </a></div>
                        <?php endforeach; ?>
                    </div>
                    <div>
                        <label>Concierge phản hồi về khách hàng:</label> {{$currentSchedule->csFeebacForkCustomer}}
                    </div>
                    <table class="table table-bordered listingViews">
                        <thead>
                            <tr>
                                <th>Chọn</th>
                                <th>TTYT</th>
                                <th>LID</th>
                                <th>Địa chỉ</th>
                                <th>Trạng thái</th>
                                <th>Giá</th>
                                <th>Ưu đãi giá</th>
                                <th style="width:100px;color:orange" class="text-center"><i class="fa fa-star"></i></th>
                                <th>Đánh giá từ KH</th>
                                <th>Đánh giá từ CC</th>
                                <th>Ngày xem</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            foreach ($task->schedules as $schedule):
                                foreach ($schedule->listings as $listing):
                                    ?>
                                    <tr>
                                        <td class="text-center"><input type="checkbox" class="selected-email-listing" data-rlisting-price ="{{$listing->price}}" name="rlistingIds[]" data-rlisting-id="{{$listing->rlistingId}}" value="{{$listing->rlistingId}}"  /></td>
                                        <td><input type="text" class="ttyt" data-old-value="{{$listing->favoriteOrder}}" data-rlisting-id="{{$listing->rlistingId}}" data-schedule-id="{{$schedule->scheduleId}}" size="4" value="{{$listing->favoriteOrder}}" /></td>
                                        <td><a onclick="JMDetail.openModalListingDetailForAllPage({{$listing->rlistingId}});return false;" href="#">{{$listing->rlistingId}}</a></td>
                                        <td>{{$listing->address}}</td>
                                        <td>{{$listing->legal}}</td>
                                        <td>{{$listing->formatPrice}}</td>
                                        <td>{{!empty($listing->offers)?$listing->offers:""}}</td>
                                        <td class="text-center">
                                            <a href='#' class="starRenderPropzy" poin="{{number_format($listing->percentValue, 0)}}">
                                                {{number_format($listing->percentValue, 0)."%"}}
                                            </a>
                                        </td>
                                        <td>{!!$listing->customerFeedbackForListingOnApp!!}</td>
                                        <td>{!!$listing->csFeedbackForListing!!}</td>
                                        <td>{{date('d/m/Y H:i:s',$schedule->scheduleTime/1000)}}</td>
                                    </tr>
                                    <?php
                                endforeach;
                            endforeach;
                            ?>
                        </tbody>
                    </table>
                </div>
                <div style="padding:10px 0">
                    <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                        <div id="button-action">
                            <button class="btn btn-success btnDoneTask">Hoàn tất</button>
                            <button class="btn btn-success btnShowTaskReminder">Nhắc nhở</button>
                            <?php if (!empty($task->dealId)) : ?>
                                <a class="btn btn-success" href="/deal/detail/{{$task->dealId}}" >Deal {{$task->dealId}}</a>
                            <?php elseif (!empty($task->leadId)) : ?>
                                <a class="btn btn-success" href="/lead/detail/{{$task->leadId}}" >Lead {{$task->leadId}}</a>
                            <?php endif; ?>
                            <a href="#" class="btn btn-success makeCall" data-number="{{base64_encode($customerPhones)}}">Gọi</a>
                            @include('crm-dashboard.snippet-call-from-task-detail', [
                            'leadId'=>$task->leadId,
                            'dealId'=>$task->dealId,
                            'taskId'=>$taskId,
                            'defineId'=>$defineId,
                            'taskName'=>$task->taskName
                            ]
                            )
                        </div>
                    <?php endif; ?>
                    <?php if (isset($task->isClosed) && $task->isClosed == true): ?>
                        <a onclick="JMDetail.showNegotiateModal(); return false;" class="btn btn-primary negotiate-button">
                            <i class="fa fa-dollar"></i> Thương lượng
                        </a>
                    <?php else: ?>
                        <a onclick="JMDetail.showNegotiateModal(); return false;" style="display: none" class="btn btn-primary negotiate-button">
                            <i class="fa fa-dollar"></i> Thương lượng
                        </a>
                    <?php endif; ?>
                </div>
            </div>

        </div>
    </section>
</div>
@include('shared.modal-negotiate')
@include('shared.modal-deposit')
@include('crm-dashboard.modal-reassign-meeting')
@include('crm-dashboard.modal-confirm-meeting-request')
@include('crm-dashboard.modal-update-after-view')
@include('crm-dashboard.modal-task-reminder')
@include('shared.modal-choose-phone-number')

@endsection
@section('page-js')
<script src="{{loadAsset('/plugins/select2/select2.full.min.js')}}"></script>
<script src="{{loadAsset('/dist/js/jquery.magnific-popup.min.js')}}"></script>
<script src="{{loadAsset('/js/helper.js')}}"></script>
<script src="{{loadAsset('/plugins/chartjs/Chart.min.js')}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset('/plugins/daterangepicker/daterangepicker.js')}}"></script>

<script src="{{loadAsset('/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{loadAsset('/plugins/datatables/dataTables.bootstrap.min.js')}}"></script>
<script src="{{loadAsset('/js/dashboard.js')}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
<script src="{{loadAsset('/js/commons/jquery.number-percent.js')}}"></script>

<script>
var taskId = "{{$taskId}}";
var defineId = "{{$defineId}}";
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});

$('#modalCreateTasks').on('hidden.bs.modal', function () {
    location.reload();
})

//var listingIds = [1054, 2534]; 
//showModalUpdateAfterView(listingIds);

$(".btnDoneTask").on("click", function (event) {
    var listingIds = [];
    $('.listingViews').find('input[name="rlistingIds[]"]').each(function () {
        var listingItem = $(this).val();
        var isRented = $(this).attr("data-isRented");
        if (isRented) {
            return;
        }
        console.log(listingItem);
        listingIds.push(listingItem);
    });
    showModalUpdateAfterView(listingIds);
});

$("#expandTable").click(function(){
    $("#expandTable").hide();
    $("#collapseTable").show();
    $("#history-list").fadeIn();
});

$("#collapseTable").click(function(){
    $("#collapseTable").hide();
    $("#expandTable").show();
    $("#history-list").fadeOut();
});

$(".ttyt").blur(function () {
    var newValue = $(this).val();
    var oldValue = $(this).attr("data-old-value");
    var selector = this;
    if (oldValue != newValue) {
        var postData = [
            {
                "scheduleId": $(this).attr("data-schedule-id"),
                "rlistingId": $(this).attr("data-rlisting-id"),
                "favoriteOrder": newValue
            }
        ];
        //console.log(postData);
        showPropzyLoading();
        $.ajax({
            url: '/tour/order-listing',
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                $(selector).attr("data-old-value", newValue);
            }
            console.log(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    }
});

</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop