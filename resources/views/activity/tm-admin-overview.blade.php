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
                <div class="col-sm-6">
                    <div>Tổng quan</div>
                </div>
                <div class="col-sm-3 pull-right">
                    <input type="text" id="" class="form-control" placeholder="Chọn ngày" />
                </div>
            </div>
            <hr style="width: 100%;" />
            <div class="form-group row">

                <div class="col-sm-4">
                    <div>
                        <label>Chọn khu vực</label>
                    </div>
                    <div>
                        <select id="selectRegions" class="form-control" multiple="multiple">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div>
                        <label>Chọn tỉnh / TP</label>
                    </div>
                    <div>
                        <select id="selectCities" class="form-control" multiple="multiple">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div>
                        <label>Tổng số</label>
                    </div>
                    <div>
                        <select id="type" name="type" class="form-control">
                            <option></option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-1">
                    <div>
                        <label>&nbsp;</label>
                    </div>
                    <div>
                        <button class="btn btn-success btnSearch">Tìm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-body">
            <table id="tableOverview" class="table table-bordered">
                <thead>
                    <tr>
                        <th>Công việc</th>
                        <th>Tổng số</th>
                        <th>Hoàn thành</th>
                        <th>Chưa hoàn thành</th>
                        <th>%Hoàn thành</th>
                        <th>Thời gian xử lý trung bình</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </section>
    <section class="box">
        <div class="box-header">
            <div>Chi tiết công việc</div>
            <hr />
        </div>
        <div class="box-body">
            <div class="col-sm-3">

            </div>
            <div class="col-sm-9">
                <table id="taskDetailTable" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Thời gian nhận</th>
                            <th>Thời gian mở</th>
                            <th>Thời gian thực hiện</th>
                            <th>Giải quyết chậm</th>
                            <th>Tình trạng</th>
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
$(".menu-tm-admin-overview").addClass("active");
</script>
<script type="text/javascript" src="{{loadAsset("/js/activity/tm-admin-overview.js")}}" ></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop