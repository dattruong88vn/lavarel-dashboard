@extends('layout.default')

@section('content')
<div class="tasks-list">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Danh sách việc cần làm</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <table id="table-tasks" class="table table-bordered table-striped table-listing">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Thời gian dự tính (h)</th>
                                <th>Ngày cập nhật</th>
                                <th><a href="/task/get-form"><i class="fa fa-plus"></i></a></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($tasks as $task) { ?>
                                <tr>
                                    <td>{{$task->id}}</td>
                                    <td><a href="/task/get-form/{{$task->id}}">{{$task->name}}</a></td>
                                    <td>{{date_create($task->start_date)->format('d/m/Y H:i:s')}}</td>
                                    <td>{{date_create($task->end_date)->format('d/m/Y H:i:s')}}</td>
                                    <td>{{number_format($task->estimated_time,2,'.',',')}}</td>
                                    <td>{{$task->updated_at}}</td>
                                    <td>
                                        <a href="/task/get-form/{{$task->id}}"><i class='fa fa-edit'></i></a>
                                        <a href="/task/delete/{{$task->id}}" class="btnDelete"><i class='fa fa-trash-o'></i></a>
                                    </td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('page-js')
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>    
<script>
$(function () {
    fixDataTableVNSearch("#table-tasks");
    $("#table-tasks").DataTable();
    $(".btnDelete").on("click", function (event) {
        event.preventDefault();
        if (!confirm("Bạn có chắc là xóa việc này")) {
            return false;
        }
        var url = $(this).attr("href");
        var current = $(this);
        $.ajax({
            url: url,
            type: "GET",
        }).success(function (response) {
            if (response.status == "success") {
                current.parent().parent().remove();
            }
        }).always(function () {

        });
    });
});
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop