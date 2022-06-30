@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<div class='agent-activities'>
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <section class="box">
        <div class="box-header"></div>
        <div class="box-body">
            @include("activity.tm-admin-overview-menu")
        </div>
    </section>
    <section class="box">
        <div class="box-header">
            <div class="form-group row">
                <div class="col-sm-4">
                    <div>
                        <label>Chọn khu vực</label>
                    </div>
                    <div>
                        <select id="regions" multiple class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div>
                        <label>Chọn tỉnh / TP</label>
                    </div>
                    <div>
                        <select id="cities" multiple class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div>
                        <label>Chọn quận</label>
                    </div>
                    <div>
                        <select id="" class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-4">
                    <div>
                        <label>Tên TM</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" />
                    </div>
                </div>
                <div class="col-sm-8">
                    <div>
                        <label>&nbsp;</label>
                    </div>
                    <div>
                        <button class="btn btn-success btnSearchTM">Search</button>
                        <button class="btn btn-warning btnShowSetTargetForm">Thiết lập chỉ tiêu</button>
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <div class="box-body">
            <table id="dataTableSearchResult" class="table table-bordered">
                <thead>
                    <tr>
                        <th>TM</th>
                        <th>Khu vực</th>
                        <th>Thành Phố</th>
                        <th>Quận</th>
                        <th>Lead</th>
                        <th>Deal</th>
                        <th>KPI</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
    <section class="box">
        <div class="box-header">
            <div>Lịch sử thiết lập chỉ tiêu</div>
            <hr />
        </div>
        <div class="box-body">
            <div class="col-sm-12">
                <table id="dataTableHistory" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ẩn</th>
                            <th>Tên</th>
                            <th>Khu vực</th>
                            <th>Thành phố</th>
                            <th>Quận</th>
                            <th>Credit</th>
                            <th>Target</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                </table>
            </div>
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
$(".menu-task-overview").addClass("active");
</script>
<script type="text/javascript" src="{{loadAsset("/js/activity/tm-admin-set-target.js")}}" ></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop