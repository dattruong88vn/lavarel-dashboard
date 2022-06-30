<?php

function showTaskRow($taskGroup, $defineId, $task, $isSubTask = false) {
    ?>
    <tr class="{{$isSubTask?"sub-task":""}} sub-task-{{$defineId}}" data-task-id="{{$task->taskId}}">                        
        <td>{{!$isSubTask?$taskGroup->priorityName:""}}</td>
        <?php if (in_array($defineId, [31])): ?>
            <td>{{$isSubTask?"&#8594;":""}} <a href="#" class="btn-show-detail" onclick="return showMeetingDetailPopup({{$task->taskId}}, {{$task->meetingId}})">{{$task->taskName}}</a></td>
        <?php else: ?>
            <td>{{$isSubTask?"&#8594;":""}} {{$task->taskName}}</td>
        <?php endif; ?>
        <td><input type="checkbox" value="{{$task->taskId}}" onclick="return doneTask({{$task->taskId}}, {{$task->meetingId}} , {{$defineId}});" /></td>
        <td><input type="checkbox" value="{{$task->taskId}}" {{in_array($defineId, [31, 32])?"disabled":""}} /></td>
        <td>
            <?php if ($task->dealId): ?>
                <a href="/deal/update/{{$task->dealId}}">{{$task->dealId}}</a>
            <?php else: ?>
                <a href="/lead/update/{{$task->leadId}}" target="_blank">{{$task->leadId}}</a>
            <?php endif; ?>
        </td>
    </tr>
    <?php
}
?>

@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2>Crm Task</h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ưu tiên</th>
                            <th>Tên</th>
                            <th>Hoàn tất</th>
                            <th>Nhắc lại</th>
                            <th>Deal ID</th>
                        </tr>
                    </thead>
                    <?php foreach ($taskGroups as $taskGroup): ?>
                        <?php
                        foreach ($taskGroup->tasks as $task):
                            if ($task->totalTask <= 1) {
                                foreach ($task->subTasks as $subTask) {
                                    showTaskRow($taskGroup, $task->defineId, $subTask);
                                }
                                continue;
                            }
                            ?>
                            <tr data-task-id="{{$task->defineId}}">                        
                                <td>{{$taskGroup->priorityName}}</td>
                                <td colspan="4"><a href="#" class="toggleSubTask">{{$task->defineName}} <span style="background: #f00;border-radius: 160px;padding:3px 10px; color:#fff">{{$task->totalTask}}</span></a></td>
                            </tr>
                            <?php
                            foreach ($task->subTasks as $subTask) {
                                showTaskRow($taskGroup, $task->defineId, $subTask, true);
                            }
                            ?>
                        <?php endforeach; ?>
                    <?php endforeach; ?>
                </table>
            </div>
        </div>
    </section>

</div>
@endsection
@include('crm-dashboard.modal-meeting-detail')
@include('crm-dashboard.modal-reassign-meeting')
@include('crm-dashboard.modal-confirm-meeting-request')
@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script type="text/javascript" src="{{loadAsset('/js/crm-dashboard/index.js')}}"></script>




@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop
