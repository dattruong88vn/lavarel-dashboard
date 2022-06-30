@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> 
                <?php echo $defineId == 32 ? "Chi tiết công việc" : "Follow up Meeting" ?>
            </h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">    
                <form id="formCreateMeeting" method="post" >
                    <input type="hidden" id="dealId" name="dealId" value="" />
                    <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="{{$task->id}}" />
                    <input type="hidden" id="taskId" name="taskId" class="taskId" value="{{$taskId}}" />
                    <input type="hidden" id="defineId" name="defineId" class="defineId" value="{{$defineId}}" />
                    @if($defineId == 31)
                        <div class="form-group row">

                            <label class="col-sm-2">LeadIDs</label>
                            <div class="col-sm-10">
                                @foreach($task->meetingItem as $item)
                                    <a href="/lead/detail/{{$item->id->leadId}}">{{$item->id->leadId}}</a>
                                    <span >:{{$item->request}}</span>
                                @endforeach
                            </div>
                        </div>
                    @else
                        <div class="form-group row">
                            <label class="col-sm-2">IDs</label>
                            <div class="col-sm-10">
                                @foreach($task->meetingItem as $item)
                                    @if(!$item->isUpdateAfterView && $item->isGenerated)
                                        <?php $redirect = false; ?>
                                        <a href="/lead/detail/{{$item->id->leadId}}">{{$item->id->leadId}}</a> 
                                        <span >: {{$item->request}}</span>
                                        
                                    @else
                                        <a href="/deal/detail/{{$item->dealId}}">{{$item->dealId}}</a> 
                                        <span style="margin-right: 6%">: {{$item->request}}</span>
                                    @endif
                                    
                                @endforeach
                                
                            </div>
                        </div>
                    @endif
                    <div class="form-group row">

                        <label class="col-sm-2">Giờ</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-6 lbTime">
                                    <?php echo date('H:i', $task->reminderDate / 1000) ?>
                                </div>
                            </div>
                        </div>
                        <label class="col-sm-2">Ngày</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-6 lbDate">
                                    <?php echo date('d/m', $task->reminderDate / 1000) ?>
                                </div>
                            </div>
                        </div>
                    </div>                                     
                    <div class="form-group row">
                        <label class="col-sm-2">Tên khách hàng</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-12">
                                    {{!empty($task->customerName)?$task->customerName:""}}
                                </div>
                            </div>
                        </div>
                        <label class="col-sm-2">Tên TM</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-12">
                                    {{!empty($task->tmName)?$task->tmName:""}}
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div class="form-group row">
                        <label class="col-sm-2">TC</label>
                        <div class="col-sm-10"><?=!empty($task->tCName)? $task->tCName: "" ?></div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Note</label>
                        <div class="col-sm-10">
                            <div class="lbNote">
                                <?php echo $task->noteTm; ?>
                            </div>
                        </div>
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
                        <button class="btn btn-success btnDoneTask">Đóng</button>
                        <?php if ($defineId == 31): ?>
                            <button class="btn btn-success btnRejectMeeting">Từ chối</button>
                            <!--<button class="btn btn-success btnShowReassign">Reassign</button>-->
                            <button class="btn btn-success" onclick="return acceptMeeting(<?php echo $taskId; ?>);">Nhận</button>
                        <?php else: ?>
                            <!-- <button class="btn btn-success btnShowModalConfirmRequest">Update nhu cầu</button> -->
                            <input type="hidden" id="leadIdModal" value="{{$task->leadId}}" name="">
                            
                            <!-- <button class="btn btn-success btnDoneTask">Đóng</button> -->
                        <?php endif; ?>

                        <?php if ($defineId != 31): ?>
                            
                            @include('crm-dashboard.snippet-call-from-task-detail', [
                            'leadId'=>$task->leadId, 
                            'dealId'=>$task->dealId,
                            'taskId'=>$taskId, 
                            'defineId'=>$defineId,
                            'taskName'=>$task->taskName
                            ]
                            )
                        <?php endif; ?>
                    </div>
                <?php endif; ?>                
            </div>
        </div>
    </section>
</div>

@include('crm-dashboard.modal-confirm-meeting-request')
@include('crm-dashboard.modal-task-reminder')
@include('shared.modal-choose-phone-number')
@include('crm-dashboard.modal-note-task')
@endsection


@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/crm-dashboard/commons.js")}}"></script>

<script type="text/javascript">
    var myUserId = "{{$myUserId}}";
    var defineId = "{{$defineId}}";
    $(".btnDoneTask").on("click", function (event) {
        showModalNoteTask();
    });
</script>

<script src="{{loadAsset("/js/crm-dashboard/task-31.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop