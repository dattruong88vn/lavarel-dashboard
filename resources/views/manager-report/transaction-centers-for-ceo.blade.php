@extends('layout.default')

@section('content')

<div id='panelFilter' class="box box-danger">
    <div class="box-header">
        <h4>Tùy chỉnh bộ lọc theo</h4>
    </div>
    <div class="box-body">
        <div class="row">
            <div class="city-wrapper col-sm-3">
                <select class="cityId form-control">
                    <option value="">Chọn Tỉnh / TP</option>
                    <?php foreach ($cities as $city): ?>
                        <option value="{{$city->cityId}}">{{$city->cityName}}</option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="transaction-center-wrapper col-sm-3">
                <select class="transactionCenterId form-control">
                    <option value="">Chọn Trung Tâm Giao Dịch</option>
                    <?php foreach ($transactionCenters as $transactionCenter): ?>
                        <option value="{{$transactionCenter->id}}">{{$transactionCenter->name}}</option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="from-date-wrapper col-sm-3">
                <input type="text" class="fromDate form-control" placeholder="Từ ngày" />
            </div>
            <div class="to-date-wrapper col-sm-3">
                <input type="text" class="toDate form-control" placeholder="Đến ngày" />
            </div>
        </div>
    </div>
</div>
<div class="row" >
    <div class="col-sm-6">
        <section class="box box-primary">
            <div class="box-header">
                <h4>LPT - LPR Theo khu vực</h4>
            </div>
            <div class="box-body">
                <canvas id="canvas-lpt-lpr-by-regions" height="260px"></canvas>
            </div>
        </section>
    </div>

    <div class="col-sm-6">
        <section class="box box-primary">
            <div class="box-header">
                <h4>Phân Bố Deal Theo Trạng Thái</h4>
            </div>
            <div class="box-body text-center">
                <div style="float:none;margin:0 auto;">
                    <canvas id="canvas-deal-by-status" height="260px"></canvas>
                </div>
            </div>
        </section>
    </div>
</div>
<div class="row" >
    <div class="col-sm-6">
        <section class="box box-primary">
            <div class="box-header">
                <h4>Phân Bố Deal Theo Khu vực</h4>
            </div>
            <div class="box-body">
                <div style="float:none; margin: 0 auto;">
                    <canvas id="canvas-deal-by-regions" height="260px"></canvas>
                </div>
            </div>
        </section>
    </div>
</div>
<div class="row" >
    <div class="col-sm-12">
        <section class="box box-primary">
            <div class="box-header">
                <h4>Số Deal Có Tour < 7 ngày</h4>
            </div>
            <div class="box-body">
                <canvas id="canvas-deal-with-tours-last-seven-days"></canvas>
            </div>
        </section>
    </div>
</div>
@endsection



@section('page-js')
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
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
<script src="{{loadAsset("/js/manager-report/transaction-centers-for-ceo.js")}}"></script>

@endsection

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@endsection