<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="pfs-list"></div>
@include('pos.blocks.imageEditor')
@endsection

@section('page-js')

    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{loadAsset("/app/pfs_overview_request.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
<style>
.mr-10 {
    margin-right: 10px;
}
.mt-25 {
    margin-top: 25px;
}
.pl-0 {
    padding-left: 0;
}
#modalProfile .modal-dialog {
    min-width: 800px;
}
#modal-pp .modal-dialog {
    min-width: 700px;
}
.mortgage-hr {
    margin-top: 10px;
    margin-bottom: 0;
}
</style>
@stop