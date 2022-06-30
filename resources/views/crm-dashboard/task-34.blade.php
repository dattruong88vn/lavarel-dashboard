@extends('layout.default')

@section('content')
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> Reassign - Trường hợp khẩn cấp</h2>
        </div>
        <div class="box box-primary">
            <div class="box-body">
                <?php if (!empty($task->listings)) : ?>
                    <h4>Lý do: {{$task->reasonName}}</h4>
                    <table class="table table-bordered" id="datatables">
                        <thead>
                            <tr>
                                <th>LID</th>
                                <th>Địa chỉ</th>
                                <th>Số đt chủ nhà</th>
                                <th>Giờ đi xem</th>
                                <th>Ghi chú</th>
                            <tr>
                        </thead>
                        <tbody>
                            <?php foreach ($task->listings as $listing) : ?>
                                <tr>
                                    <td>
                                        <a href="{{!empty($list->link)?$list->link:"#"}}" target="_blank">{{$listing->rListingId}}</a>
                                        <input type="hidden" value="{{$listing->rListingId}}" name="rlistingIds[]">
                                    </td>
                                    <td>
                                        {{$listing->address}}
                                    </td>
                                    <td>
                                        {{$listing->ownerPhone}} ({{$listing->ownerName}})
                                    </td>
                                    <td>
                                        {{date('H:i:s d-m-Y',$listing->scheduleTime/1000)}}
                                    </td>
                                    <td>
                                        {{$listing->note}}
                                    </td>
                                </tr>
                            <?php endforeach; ?>

                        </tbody>
                    </table>
                <?php endif; ?>
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                    <div style="padding:10px 0">
                        <button class="btn btn-success btnDoneTask">Hoàn tất</button>
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
@include('crm-dashboard.modal-note-task')
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
    showModalNoteTask();
});
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop