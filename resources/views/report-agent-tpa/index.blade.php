<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="root"></div>
@endsection

@section('page-js')
    {{--<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>--}}
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{loadAsset("/app/report_agent_tpa.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
@stop