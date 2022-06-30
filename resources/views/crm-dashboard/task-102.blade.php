@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> {{$task->taskName}}</h2>
        </div>
        <div class="box box-primary">
            <div class="box-body">                
                <?php if(empty($task->dealId)): ?>
                <h4>Lead ID: <a href="/lead/detail/{{$task->leadId}}" target="_blank">{{$task->leadId}}</a></h4>
                <?php else: ?>
                <h4>Deal ID: <a href="/deal/detail/{{$task->dealId}}" target="_blank">{{$task->dealId}}</a></h4>
                <?php endif; ?>
                <h4>Mục đích gọi: {{$task->purpose}}</h4>
                <h4>Người nhận: {{$task->receiverName}}</h4>
                <!-- <h4>Số điện thoại: {{$task->receiverPhone}}</h4> -->
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                    <div style="padding:10px 0">
                        <button class="btn btn-success btnDoneTask">Hoàn tất</button>
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


$(".btnDoneTask").on("click", function (event) {
    doneTask(taskId);
});

</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop