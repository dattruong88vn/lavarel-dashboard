<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="root"></div>
@endsection

@section('page-js')    
    <script src="{{loadAsset("/js/CCall_V1.js?v=12")}}"></script>
    <script src="{{loadAsset("/app/app.js?v=12")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop