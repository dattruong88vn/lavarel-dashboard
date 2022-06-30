<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="root"></div>
@include('pos.blocks.imageEditor')
@endsection

@section('page-js')
    {{--<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>--}}
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
    <script src="{{loadAsset("/app/student_survey.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
<style>
#modalConfirm, #alertModal {
    z-index: 9999 !important;
}
#btnSendEmail, .btn-modal {
    color: #fff !important;
}
    .edit-photo-survey {
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        position: relative;
        top: 0px;
        vertical-align: bottom;
        z-index: 1;
        height: 40px;
        width: 40px;
        display: flex;
        fill: white;
    }
.edit-photo-survey > span {
        color: white;
        font-size: 20px;
    }
.ril-caption.ril__caption {
    text-align: center;
    display: block;
}
    .ReactModal__Overlay {
        z-index: 10000;
    }
</style>
@stop