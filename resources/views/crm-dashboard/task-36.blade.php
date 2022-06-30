@extends('layout.default')

@section('content')
<input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
<div class='dashboard'>
    <section id="tasks" class="tm-home">
        <div class="content-header">
            <h2><a href="/">&larr;</a> Chi tiết tour trễ</h2>
        </div>
        <div class="box  box-primary">
            <div class="box-body">
                <?php if (!empty($task->listingList)) : ?>
                    <table class="table table-bordered" id="datatables">
                        <thead>
                            <tr>
                                <th>TÊN & SĐT KHÁCH HÀNG</th>
                                <th>TÊN & SĐT CS</th>
                                <th>ĐANG ĐI TỪ - ĐẾN</th>
                                <th>TÊN & SĐT CHỦ NHÀ</th>
                                <th>GIẢI QUYẾT XONG?</th>
                            <tr>
                        </thead>
                        <tbody>
                            <?php foreach ($task->listingList as $lateTour) : ?>
                                <tr>
                                    <td>
                                        <a href="#{{$lateTour->rlistingId}}">{{$lateTour->customerInfo}}</a>
                                    </td>
                                    <td>
                                        {{$lateTour->csInfo}}
                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        {{$lateTour->ownerInfo}}
                                    </td>
                                    <td>
                                        <label>
                                                <!-- <input type="checkbox" value="1" name=""> -->
                                        </label>
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
@include('crm-dashboard.modal-solve-late-tour')
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
    showModalSolveLateTour();
});
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop