@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> Chi tiết task</h2>
        </div>
        <div class="box box-primary">
            <div class="box-body">                
                <h4>Khách Hàng: <strong>{{$task->customerName}}</strong> <!-- - Điện thoại: {{$task->customerPhone}}--></h4>
                <h4>Chủ Tin Đăng: <strong>{{$task->ownerName}}</strong>  <!-- - Điện thoại: {{$task->ownerPhone}} --></h4>
                <h4>LID: <strong>{{$task->rlistingId}}</strong></h4>
                <h4>Địa chỉ: <strong>{{$task->address}}</strong></h4>
                <h4>Giá: <strong>{{$task->formatPrice}}</strong></h4>
                <p>Ghi chú: {{$task->feedbackForCustomer}}</p>
                <div class="hidden">
                    <?php if (!empty($task->feedbackOfCustomer)) : ?>
                        <h3>Listing chọn Đăt Cọc</h3>
                        <table class="table table-bordered" id="datatables">
                            <thead>
                                <tr>
                                    <th>Tên Listing</th>
                                    <th>Thích/Không Thích</th>
                                    <th>Tại sao</th>
                                    <th>Xem xét</th>
                                <tr>
                            </thead>
                            <tbody>
                                <?php foreach ($task->feedbackOfCustomer as $detail) : ?>
                                    <tr>
                                        <td>
                                            {{$detail->rlistingId}}
                                        </td>
                                        <td>
                                            <?php
                                            if ($detail->customerFeedback == 1) {
                                                echo 'Thích';
                                            } else {
                                                echo 'Không thích';
                                            }
                                            ?>
                                        </td>
                                        <td>
                                            {{$detail->reason}}
                                        </td>
                                        <td>
                                            <?php
                                            if ($detail->investigate == 1) {
                                                echo 'Có';
                                            } else {
                                                echo 'Không';
                                            }
                                            ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                    <div style="padding:10px 0">
                        <button class="btn btn-success btnDoneTask">Hoàn tất</button>
                        <button class="btn btn-success btnShowTaskReminder">Nhắc nhở</button>
                        <?php if (!empty($task->dealId)) : ?>
                            <a class="btn btn-success" href="/deal/update/{{$task->dealId}}" >Deal {{$task->dealId}}</a>
                        <?php elseif (!empty($task->leadId)) : ?>
                            <a class="btn btn-success" href="/lead/update/{{$task->leadId}}" >Lead {{$task->leadId}}</a>
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
            </div>
        </div>
    </section>
</div>

@include('crm-dashboard.modal-reassign-meeting')
@include('crm-dashboard.modal-confirm-meeting-request')
@include('crm-dashboard.modal-call-owner-schedule-view')
@include('crm-dashboard.modal-note-task')
@include('crm-dashboard.modal-task-reminder')
@include('crm-dashboard.modal-setup-deposit')
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

<script>
var taskId = "{{$taskId}}";
var defineId = "{{$defineId}}";
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
//showModalSetupDeposit();
$(".btnDoneTask").on("click", function (event) {
    showModalSetupDeposit();
});
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop