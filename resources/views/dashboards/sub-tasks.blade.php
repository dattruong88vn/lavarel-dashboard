@extends('layout.default')

@section('content')

<?php $csrf_token = csrf_token(); ?>
<input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
<div class='dashboard'>
    <section id="tasks" class="row">
        <div class="col-sm-12">
            <div class="box box-primary" >
                <div class="box-header">
                    <div class="title box-title col-sm-10">{{$parentName}}</div>
                    <!--
                    <div class="title box-title col-sm-2 text-right"><a class="btn btn-danger" href="/"><i class="glyphicon glyphicon-arrow-left"></i> Trở về </a></div>
                    -->
                </div>
                <div class="box-body">
                    <table class="table table-bordered task-data-table">
                        <thead>
                            <tr>
                                <th>Mô tả</th>
                                <th>Tên KH</th>
                                <th>Số điện thoại</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</div>


<!-- make call -->
<div id="createTaskModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <!--<input type="hidden" class="taskId" name="taskId" value="" />-->
                <input type="hidden" class="assignedTo" name="assignedTo" value="" />
                <input type="hidden" class="customerId" name="customerId" value="" />
                <input type="hidden" class="dealId" name="dealId" value="" />
                <input type="hidden" class="leadId" name="leadId" value="" />
                <input type="hidden" class="fromTaskId" name="fromTaskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Tạo task</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">When</label>
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group date">
                                        <input id="whenDate" name="whenDate" class="form-control" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="whenTime" type="text" class="form-control input-small">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">With</label>
                        <div class="col-sm-10">
                            <span class="customerName"></span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Subject</label>
                        <div class="col-sm-10">
                            <div>
                                <!--<input type="text" name="subject" class="form-control subject" placeholder="Please specify the call subject." />-->
                                <select name="subject" class="form-control subject">                                    
                                </select>
                                <input type="hidden" name="defineId" class="defineId" value="" />
                                <div class="errors"></div>
                            </div>
                            <!--
                            <div>
                                <textarea name="content" class="form-control content" rows="4"></textarea>
                                <div class="errors"></div>
                            </div>
                            -->
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveTask">Save</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
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
</div>
<!-- end make call -->


<!-- make call -->
<div id="editTaskModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <input type="hidden" class="taskId" name="taskId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Update task</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">When</label>
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group date">
                                        <input id="whenDate" name="whenDate" class="form-control" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input id="whenTime" type="text" class="form-control input-small">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveEditTask">Save</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Cancel</a>
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
</div>
<!-- end make call -->
<div id="modalNoteTask" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Ghi chú cho task cũ</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal">  
                    <input type="hidden" name="action" class="action" value="" />
                    <div class="form-group">
                        <label for="" class="col-sm-12">Nội dung</label>
                        <div class="col-sm-12">
                            <div class="errors" ></div>
                            <textarea  name="note" id="note" class="form-control note" rows="6" placeholder="Nhập nội dung"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success btnSaveNoteTask">Lưu</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Hủy</button>
            </div>
        </div>

    </div>
</div>


@include('dashboards.modal-schedule')
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
<script>
var userId = "<?php echo $userId; ?>";
var parentId = "<?php echo $parentId; ?>";
var priority = "<?php echo $priority ?>";
</script>
<script type="text/javascript" src="{{loadAsset('/js/dashboard/sub-tasks.js')}}"></script>




@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    td .btn{
        margin-bottom:6px;
    }
</style>
@stop
