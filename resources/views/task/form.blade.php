@extends('layout.default')
@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="box box-info">
            <div class="box-header">
                <h3 class="box-title">{{$title}}</h3>
                 <!-- <small>Advanced and full of features</small> -->
            </div>
            <form role="form" id="mainForm" method="post" >
                <input type="hidden" id="id" name="id" value="{{$item->id}}" />
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>" />
                <div class="box-body">   
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Tên</label>
                                <input id="name" name="name" type="text" class="form-control" placeholder="Tên việc cần làm"
                                       value="{{$item->name}}">
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Thời gian hoàn thành (H)</label>
                                <input id="estimated_time" name="estimated_time" type="number" class="form-control" placeholder="Enter ..." value="{{$item->estimated_time}}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Ngày bắt đầu</label>
                                <input id="start_date" name="start_date" type="text" class="form-control form_datetime" placeholder="Enter ..." value="{{$item->start_date}}" />
                            </div>
                        </div>
                        <div class="col-md-6 col-xs-12">
                            <div class="form-group">
                                <label>Ngày kết thúc</label>
                                <input id="end_date" name="end_date" type="text" class="form-control" placeholder="Enter ..." value="{{$item->end_date}}" />
                            </div>
                        </div>
                    </div><!-- /.row -->

                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label>Mô tả</label>
                                <div class="form-group">
                                    <form>
                                        <textarea class="form-control" name="description" id="description" rows="3" placeholder="Mô tả Listing">{{$item->description}}</textarea>
                                    </form>
                                </div> 
                            </div>
                        </div>  
                    </div><!-- /.row -->


                </div><!-- /.box-body -->
                <div class="box-footer">
                    <button type="button" id="save" class="btn btn-primary">Lưu</button>
                    <a href="/task" class="btn btn-warning" >Hủy</a>
                </div>
            </form>
        </div><!-- /.box -->
    </div>
</div>
@endsection

@section('page-js')   

   <!-- <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script>
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>-->

<!-- select2 -->

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<!-- iCheck 1.0.1 -->
<script src="{{loadAsset("/plugins/iCheck/icheck.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datetimepicker/bootstrap-datetimepicker.min.js")}}"></script>

<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/wysihtml/wysihtml5.js")}}"></script>

<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/define.js")}}"></script>
<script src="{{loadAsset("/js/function.js")}}"></script> 

<script src="{{loadAsset("/plugins/autocomplete/jquery.auto-complete.js")}}"></script>

<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA63Gx61Bfl3IiPziUWpblq4DY-q4caXLM&libraries=places&sensor=false&language=vi-VN"></script>
<script src="{{loadAsset("/plugins/geocomplete/jquery.geocomplete.min.js")}}"></script>



<script>
// $(function () {
//     $("#table-staff").DataTable();
//     $("#calenda").daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A'});
//   });
var formType = "{{$type}}";
$(function () {
    $("#start_date").datetimepicker();
    $("#end_date").datetimepicker();
    CKEDITOR.replace("description");
    $("#save").on("click", function () {
        for (instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }
        switch (formType) {
            case 'create':
                $("#mainForm").attr("action", "/task/insert");
                break;
            case 'update':
                $("#mainForm").attr("action", "/task/update/{{$item->id}}");
                break;
        }
        $("#mainForm").submit();
    });
});

</script>

@stop
@section('page-css')
<!-- <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" /> -->
<link href="{{loadAsset("/plugins/datetimepicker/bootstrap-datetimepicker.min.css") }}" type="text/css" rel="stylesheet" />


@stop
