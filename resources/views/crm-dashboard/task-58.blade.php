@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> 
                Cập nhật thời gian meeting
            </h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">    
                <form id="formCreateMeeting" method="post" >
                    <input type="hidden" id="dealId" name="dealId" value="" />
                    <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="{{$task->id}}" />
                    <input type="hidden" id="taskId" name="taskId" class="taskId" value="{{!empty($taskId)?$taskId:""}}" />
                    <div class="modal-body">
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
                                        {{$task->customerName}}
                                        <span> - <a target="_blank" href="/lead/update/{{$task->leadId}}?show-modal-task-detail=false">{{$task->leadId}}</a></span>
                                    </div>
                                </div>
                            </div>
                            <label class="col-sm-2">Tên TM</label>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-md-6">
                                        {{$task->tmName}}
                                    </div>
                                </div>
                            </div>
                        </div>            
                        <div class="form-group row">
                            <label class="col-sm-2">TC</label>
                            <div class="col-sm-10"><?=!empty($task->tCName)? $task->tCName: "" ?></div>
                        </div>                              
                        <div class="form-group row">
                            <label class="col-sm-2">Nhu cầu KH</label>
                            <div class="col-sm-10">
                                <div class="lbRequest">
                                    {{$task->request}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Note</label>
                            <div class="col-sm-10">
                                <div class="lbNote">
                                    <?php echo $task->noteTm; ?>
                                </div>
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
                        <?php if ($task->isAccepted): ?>
                            <button class="btn btn-success btnDoneTask" onclick="return doneTask({{$taskId}}, false);">Xong</button>
                        <?php else: ?>
                            <button class="btn btn-success btnRejectMeeting">Từ chối</button>
                            <!--<button class="btn btn-success btnShowReassign">Reassign</button>-->
                            <button class="btn btn-success btnDoneTask" onclick="return acceptMeeting({{$taskId}});">Nhận</button>
                        <?php endif; ?><a href="#" class="btn btn-success makeCall" data-number="{{base64_encode($customerPhones)}}">Gọi</a>
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
@include('crm-dashboard.modal-reject-meeting')
@include('crm-dashboard.modal-confirm-meeting-request')
@include('crm-dashboard.modal-task-reminder')
@include('shared.modal-choose-phone-number')

@endsection


@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/crm-dashboard/commons.js")}}"></script>

<script type="text/javascript">
                        var taskId = "{{$taskId}}";
                        var defineId = "{{$defineId}}";
                        var meetingId = "{{$task->id}}";
                        $.ajaxSetup({
                        headers: {
                        'X-CSRF-TOKEN': $('#csrf-token').val()
                        }
                        });
                        /*
                         $(".btnDoneTask").on("click", function (event) {
                         event.preventDefault();
                         doneTask();
                         });
                         */
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop