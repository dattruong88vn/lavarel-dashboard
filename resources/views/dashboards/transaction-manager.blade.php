<?php

function showTaskRow($defineId, $task, $isSubTask = false) {
    ?>
    <tr class="{{$isSubTask?"sub-task":""}} sub-task-{{$defineId}}" data-task-id="{{$task->taskId}}">                        
        <td></td>
        <?php if (in_array($defineId, [31])): ?>
            <td>{{$isSubTask?"&#8594;":""}} <a href="#" class="btn-show-detail" onclick="return showMeetingDetailPopup({{$task->taskId}}, {{$task->meetingId}})">{{$task->taskName}}</a></td>
        <?php else: ?>
            <td><a href="#{{$task->taskId}}_{{$task->defineId}}" onclick="return showTaskDetail({{$task->taskId}}, {{$task->defineId}}, {{$task->leadId}});" >{{$isSubTask?"&#8594;":""}} {{$task->taskName}}</a></td>
        <?php endif; ?>
        <td>
            <button class="btn btn-warning" onclick = "return doneCrmTask({{$task->taskId}}, {{$task->leadId}}, {{$task->defineId}}, {{$task->meetingId}})">Hoàn tất</button>
            <button class="btn btn-success btnShowTaskReminder" data-task-id="{{$task->leadId}}" data-define-id="{{$task->defineId}}">Nhắc nhở</button>
            <!--
            <?php if ($task->dealId): ?>
                                <a class="btn btn-success" href="/deal/update/{{$task->dealId}}">Deal {{$task->dealId}}</a>
            <?php else: ?>
                                <a class="btn btn-success"  href="/lead/update/{{$task->leadId}}" target="_blank">Lead {{$task->leadId}}</a>
            <?php endif; ?>
            -->
            <a class="btn btn-success"  href="/lead/detail/{{$task->leadId}}" target="_blank">Lead {{$task->leadId}}</a>
        </td>
    </tr>
    <?php
}
?>

@extends('layout.default')

@section('content')

<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="row tm-home hidden">
        <div class="content-header">
            <h2>Transaction Manager</h2>
        </div>
        <div class="col-sm-4">
            <div class="box box-danger box-1" >
                <div class="box-header bg-white text-center">
                    <div class="title box-title">High</div>
                </div>
                <div class="box-body no-padding">

                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="box box-warning box-2" >
                <div class="box-header bg-white text-center">
                    <div class="title box-title">Medium</div>
                </div>
                <div class="box-body no-padding">
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="box box-success box-3" >
                <div class="box-header bg-white text-center">
                    <div class="title box-title">Low</div>
                </div>
                <div class="box-body no-padding">

                </div>
            </div>
        </div>
    </section>

</div>

<section id="tasks" class="tm-home">
    <div class="content-header">
        <h2>Danh sách việc cần làm</h2>
    </div>
    <div class="box  box-primary">
        <div class="box-body">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Ưu tiên</th>
                        <th>Tên</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <?php
                foreach ($taskGroups as $task) {
                    showTaskRow($task->defineId, $task);
                }
                ?>
            </table>
        </div>
    </div>
</section>

@include('shared.modal-meeting')
@include('crm-dashboard.modal-task-reminder')
@include('dashboards.modal-tm-task-detail')
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/dashboard/transaction-manager.js')}}"></script>
<script type="text/javascript">
                var action = "{{$action}}";
<?php if ($action == "show_task_detail"): ?>
                    showTaskDetail({{$taskId}}, {{$defineId}});
<?php endif; ?>
</script>




@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>


    .datepicker {
        z-index: 100000 !important;
    }
</style>
@stop
