<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<div id="pfs-detail"></div>
@include('pos.blocks.imageEditor')
@include('shared.modal-choose-phone-number')
@include('shared.modal-choose-phone-numbers')
@endsection

@section('page-js')
    <script type="text/javascript">
        var mortgage = <?php echo json_encode($mortgage); ?>
    </script>
    {{--<script src="{{ loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{ loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>--}}
    <script src="{{ loadAsset("/js/pos/common/plugins/datatables/datatables.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/DatatableHelper.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
    <script src="{{loadAsset("/app/pfs_detail.js")}}"></script>
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
.ml-10 {
    margin-left: 10px;
}
.mt-25 {
    margin-top: 25px;
}
.mb-10 {
    margin-bottom: 10px;
}
.pl-0 {
    padding-left: 0;
}
#pfs-detail .img-thumbnail {
    max-width: 40%;
}
#alertModal {
    z-index: 9999;
}
</style>
@stop