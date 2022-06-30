<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<?php $csrf_token = csrf_token() ?>
<input type="hidden" id="csrf-token" name="_token" value="{{$csrf_token}}" />
<div class="box box-primary">
    <div class="box-body">           
        <div class="liveListing col-sm-3">Tổng listing live: {{$liveListings->liveListing}}</div>
        <div class="liveListing col-sm-3">Owner listing: {{$liveListings->ownerListing}}</div>
        <div class="liveListing col-sm-2">Agents listing: {{$liveListings->agentListing}}</div>
        <div class="liveListing col-sm-2">Độc quyền: {{$liveListings->guaranteeListing}}</div>
        <div class="liveListing col-sm-2">
            <button class="btn-export-live-listings btn btn-warning pull-right">Export to excel</button>
        </div>
    </div>
</div>

<div class="box box-primary section-pending-listing">
    <div class="box-header with-border">
        <h3 class="box-title">1. Số lượng listing pending</h3>
    </div><!-- /.box-header -->
    <div class="box-body">  
        <div class="filters">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Hình thức giao dịch</label>
                        <?php
                        $listingTypes = array(
                            1 => 'Mua',
                            2 => 'Thuê'
                        );
                        ?>
                        <select class="form-control listingTypes select2"  multiple="multiple">
                            <option value="" >Hình thức giao dịch</option>
                            <?php foreach ($listingTypes as $key => $value): ?>
                                <option value={{$key}} >{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Loại BĐS</label>
                        <select class="form-control propertyTypes select2"  multiple="multiple">
                            <option value="" >Loại BĐS</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="form-group">
                        <label>Nguồn Listing</label>
                        <select class="form-control source select2" multiple="multiple">
                            <option value="">Nguồn Listing</option>
                            <?php foreach ($userTypes as $useryType): ?>
                                <option value="{{ $useryType->id }}" >{{ $useryType->name }}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label>Tỉnh / TP</label>
                        <select class="form-control cities select2" multiple="multiple" style="width: 100%;">
                            <option value="">Tỉnh / TP</option>
                            <option value="1" selected="selected">Hồ Chí Minh</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Quận/Huyện</label>
                        <select class="form-control districts select2" multiple="multiple" style="width: 100%;">
                            <option value="">Quận/Huyện</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="input-group date">
                        <input class="form-control fromDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="input-group date">
                        <input class="form-control toDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content row">
            <div class="col-sm-4">
                <table class="tableContent table  table-bordered">
                    <thead>
                        <tr>
                            <th>Lý do pending</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-warning btn-export">Export to Excel</button>
            </div>
        </div>
    </div>
</div>

<div class="box box-primary section-avg-time-to-live">
    <div class="box-header with-border">
        <h3 class="box-title">2. Thời gian lên live listing</h3>
    </div><!-- /.box-header -->
    <div class="box-body">  
        <div class="filters">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Hình thức giao dịch</label>
                        <?php
                        $listingTypes = array(
                            1 => 'Mua',
                            2 => 'Thuê'
                        );
                        ?>
                        <select class="form-control listingTypes select2"  multiple="multiple">
                            <option value="" >Hình thức giao dịch</option>
                            <?php foreach ($listingTypes as $key => $value): ?>
                                <option value={{$key}} >{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Loại BĐS</label>
                        <select class="form-control propertyTypes select2"  multiple="multiple">
                            <option value="" >Loại BĐS</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 hidden">
                    <div class="form-group">
                        <label>Tỉnh / TP</label>
                        <select class="form-control cities select2" multiple="multiple" style="width: 100%;">
                            <option value="">Tỉnh / TP</option>
                            <option value="1" selected="selected">Hồ Chí Minh</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Quận/Huyện</label>
                        <select class="form-control districts select2" multiple="multiple" style="width: 100%;">
                            <option value="">Quận/Huyện</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2">
                    <label>Từ ngày</label>
                    <div class="input-group date">
                        <input class="form-control fromDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <label>Đến ngày</label>
                    <div class="input-group date">
                        <input class="form-control toDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content row">
            <div class="col-sm-4">
                <table class="tableContent table  table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>AVG Time to live</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-warning btn-export">Export to Excel</button>
            </div>
        </div>
    </div>
</div>

<div class="box box-primary section-status-listing">
    <div class="box-header with-border">
        <h3 class="box-title">3. Tổng quan số lượng listing</h3>
    </div><!-- /.box-header -->
    <div class="box-body">  
        <div class="filters">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Hình thức giao dịch</label>
                        <?php
                        $listingTypes = array(
                            1 => 'Mua',
                            2 => 'Thuê'
                        );
                        ?>
                        <select class="form-control listingTypes select2"  multiple="multiple">
                            <option value="" >Hình thức giao dịch</option>
                            <?php foreach ($listingTypes as $key => $value): ?>
                                <option value={{$key}} >{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Loại BĐS</label>
                        <select class="form-control propertyTypes select2"  multiple="multiple">
                            <option value="" >Loại BĐS</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 hidden">
                    <div class="form-group">
                        <label>Tỉnh / TP</label>
                        <select class="form-control cities select2" multiple="multiple" style="width: 100%;">
                            <option value="">Tỉnh / TP</option>
                            <option value="1" selected="selected">Hồ Chí Minh</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Quận/Huyện</label>
                        <select class="form-control districts select2" multiple="multiple" style="width: 100%;">
                            <option value="">Quận/Huyện</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2">
                    <label>Từ ngày</label>
                    <div class="input-group date">
                        <input class="form-control fromDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <label>Đến ngày</label>
                    <div class="input-group date">
                        <input class="form-control toDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content row">
            <div class="col-sm-4">
                <table class="tableContent table  table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Live</th>
                            <th>Pending</th>
                            <th>Rejected</th>
                            <th>Rented</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div><button class="btn btn-warning btn-export">Export to Excel</button></div>
            </div>
            <div class="col-sm-8"><table class="tableListing table  table-bordered">
                    <thead>
                        <tr>
                            <th>LID</th>
                            <th>Tên chủ tin đăng</th>
                            <th>Giá</th>
                            <th>Tên đường</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="box box-primary section-listing-diy">
    <div class="box-header with-border">
        <h3 class="box-title">4. Tổng quan số lượng listing - DIY</h3>
    </div><!-- /.box-header -->
    <div class="box-body">  
        <div class="filters">
            <div class="row">
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Hình thức giao dịch</label>
                        <?php
                        $listingTypes = array(
                            1 => 'Mua',
                            2 => 'Thuê'
                        );
                        ?>
                        <select class="form-control listingTypes select2"  multiple="multiple">
                            <option value="" >Hình thức giao dịch</option>
                            <?php foreach ($listingTypes as $key => $value): ?>
                                <option value={{$key}} >{{$value}}</option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div class="form-group">
                        <label>Loại BĐS</label>
                        <select class="form-control propertyTypes select2"  multiple="multiple">
                            <option value="" >Loại BĐS</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-2 hidden">
                    <div class="form-group">
                        <label>Tỉnh / TP</label>
                        <select class="form-control cities select2" multiple="multiple" style="width: 100%;">
                            <option value="">Tỉnh / TP</option>
                            <option value="1" selected="selected">Hồ Chí Minh</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Quận/Huyện</label>
                        <select class="form-control districts select2" multiple="multiple" style="width: 100%;">
                            <option value="">Quận/Huyện</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-2">
                    <label>Từ ngày</label>
                    <div class="input-group date">
                        <input class="form-control fromDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">
                    <label>Đến ngày</label>
                    <div class="input-group date">
                        <input class="form-control toDate" />
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content row">
            <div class="col-sm-4">
                <table class="tableContent table  table-bordered">
                    <thead>
                        <tr>
                            <th>LSO</th>
                            <th>ĐT Thường</th>
                            <th>ĐT Độc quyền</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-sm-4">
                <button class="btn btn-warning btn-export">Export to Excel</button>
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
<script type="text/javascript">
</script>
<script src="{{loadAsset("/js/ls/report.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop