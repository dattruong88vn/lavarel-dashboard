@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> 
                <?= $task->taskName ?>
            </h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">    
                <form id="formCreateMeeting" method="post" >
                    <input type="hidden" id="dealId" name="dealId" value="" />
                    <input type="hidden" id="taskId" name="taskId" class="taskId" value="{{$taskId}}" />
                    <input type="hidden" id="defineId" name="defineId" class="defineId" value="{{$defineId}}" />                                                       
                    <div class="form-group row">
                        <label class="col-sm-2">Tên khách hàng</label>
                        <div class="col-sm-4">
                            <div class="row">
                                <div class="col-md-12">
                                    {{!empty($task->customers)?$task->customers->name:""}}
                                </div>
                            </div>
                        </div>
                    </div>                                     
                    <div class="form-group row">
                        <?php if (!empty($task->dealId)): ?>
                            <label class="col-sm-2">Deal ID:</label>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <!--<span><a target="_blank" href="/lead/update/{{$task->leadId}}?show-modal-task-detail=false">{{$task->leadId}}</a></span>-->
                                        <span>{{$task->dealId}}</span>
                                    </div>
                                </div>
                            </div>
                        <?php elseif (!empty($task->leadId)): ?>
                            <label class="col-sm-2">Lead ID:</label>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <!--<span><a target="_blank" href="/lead/update/{{$task->leadId}}?show-modal-task-detail=false">{{$task->leadId}}</a></span>-->
                                        <span>{{$task->leadId}}</span>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>

                        <label class="col-sm-2">Lý do hủy</label>
                        <div class="col-sm-4">
                            <div class="lbRequest">
                                <?=$reasonName; ?>
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

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/crm-dashboard/commons.js")}}"></script>

<script type="text/javascript">
                        var myUserId = "{{$myUserId}}";
                        var defineId = "{{$defineId}}";
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop