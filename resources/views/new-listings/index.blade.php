<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-body">
            <ul style="margin-bottom: 10px;" class="nav nav-tabs">
              <li class="{{ !isset($_GET['listingTypeId']) ? 'active' : '' }}"><a href="/new-listings">Mua</a></li>
              <li class="{{ isset($_GET['listingTypeId']) ? 'active' : '' }}"><a href="/new-listings?listingTypeId=2">Thuê</a></li>
            </ul>
            <input type="hidden" id="listingTypeId" name="listingTypeId" value="{{ isset($_GET['listingTypeId']) ? $_GET['listingTypeId'] : 1 }}">
            <div class="form-group">
                <div class="col-sm-4">
                    <label for="">Từ ngày</label>
                    <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                        <input type="text" class="form-control" id="fromDate" name="fromDate" value="{{date('d/m/Y')}}">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <label>Đến ngày</label>
                    <div class="input-group date" data-provide="datepicker"  data-date-format="dd/mm/yyyy">
                        <input  type="text" class="form-control" id="toDate" name="toDate" value="{{date('d/m/Y')}}">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <div>&nbsp;</div>
                    <button class="btn btn-warning btnFilterNewListings">Tìm</button>
                </div>
            </div>
        </div>
    </div>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Bất Động Sản Mới Hôm Nay</h3>
            <?php if ($isAdmin): ?>
                <button class="btnShowConfig btn" style="float:right" ><i class="fa fa-cog"></i> Điều chỉnh tiêu chí</button>
            <?php endif; ?>
        </div><!-- /.box-header -->
        <div class="box-body">            
            <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
            <div class="listings">
                <ul class="table-listings" style="width: 100%; list-style: none;">
                </ul>
            </div>
            <nav class="text-center">
                <ul class="pages pagination pagination-sm"></ul>
            </nav>

        </div>
    </div>
</section>
<div id="modalChooseListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Chọn listings</h4>
            </div>

            <div class="modal-body">
                <input type="hidden" class="current-deal-id" value="" />
                <table class="table table-bordered dataTableChooseListings">
                    <thead>
                        <tr>                        
                            <th>Chọn</th>
                            <th>ID</th>
                            <th>Địa chỉ listing</th>
                            <th>Điểm</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-warning btn-email-sms-listings">Gửi</button>
            </div>
        </div>
    </div>
</div>
@include('shared.modal-choose-phone-number')
@include('shared.modal-choose-phone-numbers')
@include('shared.modal-choose-emails')
@include('shared.modal-choose-email-type')
@include('shared.modal-choose-send-type')
@include('shared.modal-send-sms')
@include('deal.email-listing-to-customer-modal')
@include('new-listings.modal-config')
@include('shared.modal-update-status-pending-reason')

@endsection



@section('page-js')
<script src="{{ loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{ loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{ loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{ loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{ loadAsset("/js/dashboard.js")}}"></script>
<script src="{{ loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{ loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{ loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{ loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
<script src="{{ loadAsset('/js/commons/deal/email-sms-sender.js')}}"></script>
<script src="{{ loadAsset('/js/commons/deal/listing-email-sms-sender.js')}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>

<script src="{{ loadAsset("/js/new-listings/index.js")}}"></script>


@stop
@section('page-css')
<link href="{{ loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    td{
        padding: 16px;
        vertical-align: top;
    }

    .first-child td, .table-deals .deal:first-child td{
        background: #7bbe0b !important;
    }
    .table-deals .deal td .customer span{
        display: inline-block;
        line-height: 20px;
        padding: 0px 10px;
        border-radius: 10px;
        background-color: #7bbe0b;
        color: #fff;
    }
    .table-deals .deal.first-child td .customer span{
        background-color: #fff;
        color: #7bbe0b;
    }


    .first-child td a , .table-deals .deal:first-child td a{
        color: #fff;
    }

    .deal-good td{
        background: #faa;
    }
    .listing-label{
        position: absolute;
        top: 0px;
        right: 16px;
    }

    .listing-label label{
        display: inline-block;
        padding: 10px;
        background: #dd4b39b3;
        color: #fff;
        margin-left: 10px;
    }
</style>
@stop
