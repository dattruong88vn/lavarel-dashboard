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
    <script src="{{ loadAsset("/js/pos/common/common-pos.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
    <script src="{{ loadAsset("/js/commons/images-crm-lib.js") }}"></script>
    <script type="text/javascript">
        const isAdmin = hasValue(currentUser.departments[0].isGroupAdmin) ? 1 : 0;
    </script>
    <script src="{{loadAsset("/app/documents.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
<style>
#modalConfirm, #alertModal {
    z-index: 9999 !important;
}
#btnSendEmail, .btn-modal {
    color: #fff !important;
}
</style>
@stop