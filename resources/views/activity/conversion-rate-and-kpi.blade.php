@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-activities'>
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <section class="box">
        <div class="box-header"></div>
        <div class="box-body">
            @include("activity.task-overview-menu")
        </div>
    </section>
    <section class="box">
        <div class="box-header">
            <div>Conversion Lead to Deal</div>
            <hr />
        </div>
        <div class="box-body">
            <div class="col-sm-3">
                <table id="tableConversionDetail" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tiêu chí</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="col-sm-9">
                <table id="tableAssignedLead" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Lead</th>
                            <th>Assign từ</th>
                            <th>Lý do</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>

    </section>
    <section class="box">
        <div class="box-header">
            <div>KPI</div>
            <hr />
        </div>
        <div class="box-body">
            <table id="tableKpiDetail" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Tiêu chí</th>
                        <th>Credit %</th>
                        <th>Target %</th>
                        <th>Execution %</th>
                        <th>KPI %</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>

</div>
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script type="text/javascript">
$(".menu-kpi").addClass("active");
</script>
<script type="text/javascript" src="{{loadAsset("/js/activity/conversion-rate-and-kpi.js")}}" ></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop