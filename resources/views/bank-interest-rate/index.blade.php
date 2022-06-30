<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="bank-interest-rate"></div>
@include('pos.blocks.imageEditor')
@endsection

@section('page-js')
    {{--<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>--}}
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
    <script src="{{loadAsset("/app/bank_interest_rate.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
<style>
#modalConfirm, #alertModal {
    z-index: 9999 !important;
}
#btnSendEmail, .btn-modal {
    color: #fff !important;
}
.mr-10 {
    margin-right: 10px;
}
.pl-0 {
    padding-left: 0;
}
#modalProfile .modal-dialog {
    min-width: 800px;
}
.title-profile {
    margin-top: 0;
    font-size: 18px;
    font-weight: 600;
}
</style>
@stop