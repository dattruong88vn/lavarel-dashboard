<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="view-tieu-chuan">

    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">View</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Search</label>
                        <input type="text" class="form-control" id="" placeholder="Enter Words">
                    </div>

                    <table id="tc-table" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Tên LS</th>
                                <th>Thành phố</th>
                                <th>Khu vực</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    AN LS1 <input name="" id="" value="" type="checkbox">
                                </td>
                                <td>
                                    <input name="" id="" value="" type="checkbox">
                                </td>
                                <td>
                                    <input name="" id="" value="" type="checkbox">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    AN LS2 <input name="" id="" value="" type="checkbox">
                                </td>
                                <td>
                                    <input name="" id="" value="" type="checkbox">
                                </td>
                                <td>
                                    <input name="" id="" value="" type="checkbox">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="ch-button"><button class="btn btn-block btn-success">Next</button></div>

                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">View</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter active" data-filter-type="1">Hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Cả tuần</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Tháng</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>

                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="nav-tabs-custom">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a href="#tab_1" data-toggle="tab">Điểm tiêu chuẩn</a></li>
                                    <li><a href="#tab_2" data-toggle="tab">Run-rate</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tab_1">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tên LS</th>
                                                    <th>3/4/2014</th>
                                                    <th>3/4/2014</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        abc
                                                    </td>
                                                    <td>
                                                        x
                                                    </td>
                                                    <td>
                                                        y
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        abc
                                                    </td>
                                                    <td>
                                                        x
                                                    </td>
                                                    <td>
                                                        y
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div><!-- /.tab-pane -->
                                    <div class="tab-pane" id="tab_2">
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tên LS</th>
                                                    <th>3/4/2014</th>
                                                    <th>3/4/2014</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        abc
                                                    </td>
                                                    <td>
                                                        x
                                                    </td>
                                                    <td>
                                                        y
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        abc
                                                    </td>
                                                    <td>
                                                        x
                                                    </td>
                                                    <td>
                                                        y
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>

<script>
$(function () {

    $('#tc-table').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": false,
        "autoWidth": true
    });

});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop