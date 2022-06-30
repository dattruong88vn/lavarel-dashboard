<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="view-tieu-chuan">

    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">View</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter-today active">Hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Cả tuần</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Tháng</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>

                        <div class="btn-group pull-right">
                            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">Tùy chỉnh</button>
                            <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                                <span class="caret"></span>
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="menu-edit-setting" href="#" data-target="editBaseScoreWrapper">Tùy chỉnh điểm sàn</a></li>
                                <li><a class="menu-edit-setting" href="#" data-target="editWorkingDaysWrapper">Set ngày làm việc</a></li>
                                <li class="divider"></li>
                            </ul>
                        </div>

                    </div>

                    <div id="sectionSelectDate" class="row" style="margin-bottom: 32px;">
                        <div class="col-sm-2">
                            <input type="text" id="fromDate" class="form-control" placeholder="Từ ngày" />
                        </div>
                        <div class="col-sm-2">                            
                            <input type="text" id="toDate" class="form-control" placeholder="Đến ngày" />
                        </div>
                        <div class="col-sm-2">                            
                            <button class="btnViewFromTo btn btn-primary">Xem</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div id="donut-chart" style="height: 400px;"></div>
                        </div>
                        <div class="col-md-6">
                            <div id="editBaseScoreWrapper" class="section-edit-setting">
                                <div class="form-group">
                                    <?php
                                    if (isset($lsTargetGradingScale) && $lsTargetGradingScale):
                                        $hrmChildTargets = $lsTargetGradingScale->hrmChildTargets[0];
                                        ?>
                                        <table class="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Tùy chỉnh điểm sàn</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($hrmChildTargets->hrmGradingScales as $hrmGradingScale): ?>
                                                    <tr>
                                                        <td>
                                                            {{$hrmGradingScale->name}}
                                                        </td>
                                                        <td>
                                                            <input type="text" value="{{$hrmGradingScale->value}}" class="txtTargetValue" data-id="{{$hrmGradingScale->id}}" />
                                                        </td>
                                                    </tr>
                                                <?php endforeach; ?>
                                                <tr class="sum">
                                                    <td>
                                                        Điểm sàn
                                                    </td>
                                                    <td>
                                                        <input type="text" value="{{$hrmChildTargets->targetValue}}" class="txtBaseTargetValue" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="ch-button"><button id="showLsList" class="btn btn-block btn-primary">Next</button></div>
                                    <?php endif; ?>
                                </div>
                                <div id="lsListSection" class="form-group">
                                    <table id="lsList" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Danh sách LS</th>
                                                <th>Thành phố</th>
                                                <th>Khu vực</th>
                                            </tr>
                                        </thead>
                                        <tbody>                                        
                                        </tbody>
                                    </table>
                                    <div class="ch-button">
                                        <!--<button class="btn btn-block btn-success">Save</button>-->
                                    </div>

                                </div>
                            </div>
                            <div id="editWorkingDaysWrapper" class="section-edit-setting">
                                <h4>Set ngày làm việc</h4>
                                <div class="navbar navbar-inverse" style="background: #3c8dbc; border:none">
                                    <ul class="nav navbar-nav" id="yearChooser">
                                        <?php foreach ($years as $year): ?>
                                            <li class="{{$year['isCurrent']?'active':''}}">
                                                <a href="#" data-value="{{$year["value"]}}">{{$year["value"]}}</a>
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                                <div>
                                    <table id="tableEditWorkingDays" class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Tháng</th>
                                                <th>Ngày làm việc</th>
                                                <th>Ngày chốt công</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <button class="btn btn-success saveWorkingDays">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <section id="sectionToDayTable">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Cá nhân không đạt chỉ tiêu ngày</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <table class="tableUserNotPass table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Số điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Cá nhân đạt chỉ tiêu ngày</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <table class="tableUserPass table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Số điểm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="sectionFromToTable">
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">
                    <div class="box-header with-border">
                        <h3 class="box-title">Chỉ tiêu</h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <table class="table table-bordered table-striped" id="scoreTable">
                                <thead>
                                </thead>
                                <tbody>                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>


<!-- FLOT CHARTS -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.min.js")}}"></script>
<!-- FLOT RESIZE PLUGIN - allows the chart to redraw when the window is resized -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.resize.min.js")}}"></script>
<!-- FLOT PIE PLUGIN - also used to draw donut charts -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.pie.min.js")}}"></script>
<!-- FLOT CATEGORIES PLUGIN - Used to draw bar charts -->
<script src="{{loadAsset("/plugins/flot/jquery.flot.categories.min.js")}}"></script>
<!-- Page script -->
<script>
var currentYear = "{{$currentYear}}";
var currentMonth = "{{$currentMonth}}";
</script>

<script src="{{loadAsset("/js/credit/ls-admin.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop