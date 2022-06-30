<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<div class="create-task-view">
    <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">REJECTED LISTING</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter active" data-filter-type="1">Hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Tuần</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Tháng</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>
                    </div>
                    <div class="chooseDate row">
                        <div class="col-xs-12 col-sm-3">
                            <label>Từ ngày</label>
                            <div class="input-group date">
                                <input type="text" class="form-control datepicker" id="fromDate"/>
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-3">
                            <label>Đến ngày</label>

                            <div class="input-group date">
                                <input type="text" class="form-control datepicker" id="toDate" />
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-top: 16px;">
                        <div class="col-sm-3">                            
                            <!--<input type="text" id="keySearch" placeholder="Tên AM" class="form-control" />-->
                            <select id="keySearch" multiple="multiple" style="width:100%;">
                                <?php foreach ($accountManagers as $am): ?>
                                    <option value="{{$am->name}}">{{$am->name}}</option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-sm-3">
                            <button class="btnSearch btn btn-warning">Tìm</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <table id="items" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Reason</th>
                                    <th>Số lượng listing</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div class="form-group">
                        <table id="itemDetail" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Tên MG</th>
                                    <th>Số lượng listing</th>
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
</div>
@include("task.call-reminder-detail-modal")
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
<script type="text/javascript" src="/js/report/am-rejected-listing.js"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop