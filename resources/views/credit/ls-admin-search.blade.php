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
                    <h3 class="box-title">Tìm LS</h3>
                </div>
                <div class="box-body">
                    <div class="form-group row">
                        <div class="col-sm-7">
                            <input type="text" class="form-control lsSearchTerm" id="lsSearchTerm" placeholder="Tên, số điện thoại, email của LS">
                        </div>
                        <div class="col-sm-2">
                            <button class="btnSearchLs btn btn-success">Tìm</button>
                        </div>
                    </div>

                    <table id="lsList" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Tên LS</th>
                                <th>Quận huyện</th>
                                <th>Tỉnh / TP</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <!--<div class="ch-button"><button class="btn btn-block btn-success">Next</button></div>-->

                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Chọn ngày</h3>
                </div>
                <div class="box-body">
                    <div class="listing-button">
                        <ul>
                            <li><button class="btn btn-block btn-primary btn-filter active"  data-filter-type="1">Hôm nay</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="2">Cả tuần</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="3">Tháng</button></li>
                            <li><button class="btn btn-block btn-primary btn-filter" data-filter-type="4">From - to</button></li>
                        </ul>

                    </div>

                    <div id="sectionSelectDate" class="row" style="margin-bottom: 32px;">
                        <div class="col-sm-3">
                            <input type="text" id="fromDate" class="form-control" />
                        </div>
                        <div class="col-sm-3">                            
                            <input type="text" id="toDate" class="form-control" />
                        </div>
                        <div class="col-sm-3">                            
                            <button class="btnViewFromTo btn btn-primary">Xem</button>
                        </div>
                    </div>

                </div>
            </div>


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
</script>

<script src="{{loadAsset("/js/credit/ls-admin-search.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
@stop