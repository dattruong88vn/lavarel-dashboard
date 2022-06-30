@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class='dashboard'>
    <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
    <section>
        <div>
            <?php if (!empty($dealId)): ?>
                @include('deal.header-nav')
            <?php else: ?>
                <h1>
                    Danh sách feedbacks
                </h1>
            <?php endif; ?>
        </div>
    </section>
    <section>
        <div class="row">
            <div class="col-md-12">
                <div class="box">  
                    <div class="box-header">
                        <div id="filter-group">
                            <div class="col-sm-3">
                                <label>Chọn TM</label>
                                <select id="tmName"  class="tmName form-control select2" multiple="multiple" >
                                    <?php
                                    if ($tms):
                                        foreach ($tms as $account):
                                            ?>
                                            <option value="{{$account->userId}}" >{{$account->name}}</option>
                                            <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </select>
                            </div>
                            <div class="col-sm-3 hidden">
                                <label>Chọn CS</label>
                                <select class="csName select2" style="width:100%" multiple="multiple">
                                    <?php
                                    if ($tms):
                                        foreach ($csList as $account):
                                            ?>
                                            <option value="{{$account->agentId}}" >{{$account->name}}</option>
                                            <?php
                                        endforeach;
                                    endif;
                                    ?>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Chọn Trạng thái deal</label>
                                <select class="statusName select2" style="width:100%" multiple="multiple">
                                    <?php foreach ($statusList as $status): ?>
                                        <option value="{{$status->statusId}}">{{$status->statusName}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Từ khóa cần tìm</label>
                                <input type="text" class="searchKeywords form-control" placeholder="từ khóa cần tìm" />
                            </div>
                        </div>
                    </div>
                    <div class="box-body">
                        <table id="dataTableFeedbacks" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ngày gửi phản hồi</th>
                                    <th>Tên khách hàng</th>
                                    <th>Tên TM</th>
                                    <!--<th>Tên CS</th>-->
                                    <th>Ngày phản hồi</th>
                                    <th>Điểm TB của TM</th>
                                    <!--<th>Điểm TB của CS</th>-->
                                    <th>Deal ID</th>
                                    <th>Deal Status</th>
                                </tr>
                            </thead>
                            <tbody>                                
                            </tbody>
                        </table>
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

<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>

<script language="JavaScript">
var dealId = "<?php echo $dealId; ?>";
</script>
<script src="{{loadAsset("/js/deal/feedbacks.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    tr.new-update td{
        background-color:#f39c12;
        color:#fff;
    }
</style>
@stop