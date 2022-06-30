@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> 
                Meeting bị từ chối
            </h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">    
                <form id="formReassignMeeting" method="post" >
                    <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="{{$task->id}}" />
                    <input type="hidden" id="taskId" name="taskId" class="taskId" value="{{$taskId}}" />
                    <div class="modal-body">
                        <div class="form-group row">
                            <label class="col-sm-3">Chọn trung tâm giao dịch:</label>
                            <div class="col-sm-9">
                                <?php
                                $tcs = get_transaction_centers();
                                ?>
                                <select class="form-control tCId">
                                    <option value="-1">Chọn</option>
                                    <?php foreach ($tcs as $tc): ?>
                                    <option value="{{$tc->id}}" {{$tc->id==$task->tCId?'selected': ''}}>{{$tc->name}}</option>
                                    <?php endforeach; ?>
                                </select>
                                <div class="errors" ></div>
                            </div>
                        </div>
                        <div class="form-group row chooseAddress">
                            <label class="col-sm-3">Chọn địa chỉ:</label>
                            <div class="col-sm-9">
                                <input id="address" name="address" type="text" class="form-control address" placeholder="Chưa Có Dữ Liệu" value="{{$task->address}}" />
                                <div class="errors"></div>
                            </div>
                            <div class="col-md-6 col-xs-12 hidden">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label>Lat</label>
                                            <input id="lat" name="lat" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="{{$task->latitude}}" disabled="disabled">
                                        </div>
                                    </div>
                                    <div class="col-xs-12">
                                        <div class="form-group">
                                            <label>Long</label>
                                            <input id="long" name="long" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="{{$task->longitude}}" disabled="disabled">           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Tên crm từ chối</label>
                            <div class="col-sm-10">
                                <div class="lbRequest">
                                    {{!empty($task->crmName)?$task->crmName:""}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2">Lý do từ chối</label>
                            <div class="col-sm-10">
                                <div class="lbRequest">
                                    {{!empty($task->reasonName)?$task->reasonName:""}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">

                            <label class="col-sm-2">Giờ</label>
                            <div class="col-sm-4">
                                <div class="input-group bootstrap-timepicker timepicker">
                                    <input type="text" class="form-control input-small whenTime" value="{{date('H:i', $task->reminderDate / 1000)}}">
                                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                </div>
                            </div>
                            <label class="col-sm-2">Ngày</label>
                            <div class="col-sm-4">
                                <div class="input-group date">
                                    <input class="form-control whenDate" value="{{date('m/d/Y', $task->reminderDate / 1000)}}" />
                                    <div class="input-group-addon">
                                        <i class="fa fa-calendar"></i>
                                    </div>
                                </div>
                                <div class="errors" ></div>
                            </div>
                        </div> 
                        <div class="form-group row">
                            <label class="col-sm-2">Assign To</label>
                            <div class="col-sm-10">
                                <select class="assignTo form-control select2" style="width:100%" >
                                    <option value="">N/A</option>
                                </select>
                                <div class="errors" ></div>
                            </div>
                        </div>  


                        <div class="form-group row">
                            <label class="col-sm-2">Tên khách hàng</label>
                            <div class="col-sm-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        {{$task->customerName}}
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="form-group row">
                            <label class="col-sm-2">IDs</label>
                            <div class="col-sm-10">
                                @foreach($task->meetingItem as $item)
                                    <a href="/lead/detail/{{$item->id->leadId}}">{{$item->id->leadId}}</a> 
                                    <span >: {{$item->request}}</span>
                                @endforeach
                                
                            </div>
                        </div>  
                        <div class="form-group row">
                            <label class="col-sm-2">Note</label>
                            <div class="col-sm-10">

                                <div>
                                    <div class="errors" ></div>
                                    <textarea class="form-control noteTm" rows="4">{{$task->noteTm}}</textarea>
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
            
        </div>
    </section>
</div>

@include('crm-dashboard.modal-reassign-meeting')
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

<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
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
new ReassignMeeting();
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop