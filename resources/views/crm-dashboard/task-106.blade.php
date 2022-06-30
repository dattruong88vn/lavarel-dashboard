@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> {{$task->taskName}}</h2>
        </div>
        <div class="box box-primary taskDetail">
            <div class="box-body">                
                <h4>Mục đích gọi: {{$task->purpose}}</h4>
                <h4>Người nhận: {{$task->receiverName}}</h4>
                <h4>Số điện thoại: {{$task->receiverPhone}}</h4>
                <div>
                    <table class="table table-bordered table-striped" id="dataTableListings">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th width="120px">Địa chỉ</th>
                                <th>TTLH</th>
                                <th>Giá</th>
                                <th>Còn trống</th>
                                <th>Khi nào xem được</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="listing listing-{{$task->infoListingQuickCheck->rlistingId}}" data-rlistingid="{{$task->infoListingQuickCheck->rlistingId}}" data-checkId="{{$task->infoListingQuickCheck->checkId}}">
                                <td>
                                    {{$task->infoListingQuickCheck->rlistingId}}
                                    <input type="checkbox" class="select-listing hidden" checked="checked" value="{{$task->infoListingQuickCheck->rlistingId}}" />
                                </td>
                                <td>{{$task->infoListingQuickCheck->address}}</td>
                                <td>{{$task->infoListingQuickCheck->nameOwner}} - {{$task->infoListingQuickCheck->phoneOwner}}</td>
                                <td>{{$task->infoListingQuickCheck->formatPrice}}</td>
                                <td>
                                    <select class="statusId status-6106">
                                        <option value="">Chọn</option>
                                        <option value="1">Còn</option>
                                        <option value="2">Không</option>
                                        <option value="3" selected="selected">Không liên lạc được</option>
                                    </select>
                                </td>
                                <td>
                                    <label><input type="checkbox" class="isSeen"> Ngay</label>
                                    hoặc
                                    <input type="text" class="note" placeholder="Vào lúc..." value="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>

                    <div style="padding:10px 0">
                        <button class="btn btn-success btnDoneTask">Hoàn tất</button>
                        <button type="button" class=" btn  btn-success callOwner" data-rlistingid="{{$task->infoListingQuickCheck->rlistingId}}" data-number="{{base64_encode($task->receiverPhone)}}">Gọi</button>
                        <button type="button" class=" btn  btn-success btnSave" data-action="3">Lưu</button>
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
var deal = {
    dealId: "{{$task -> dealId}}",
    leadId: "{{$task -> leadId}}"
}
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});



$(".btnDoneTask").on("click", function (event) {
    doneTask(taskId);
});
</script>
<script src="{{loadAsset('/js/crm-dashboard/task-106.js')}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop