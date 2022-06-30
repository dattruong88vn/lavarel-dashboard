@extends('layout.default')

@section('content')
    <div id="root"></div>
@endsection

@section('page-js')
    <script src="{{ loadAsset("/js/pos/common/plugins/axios/axios.min.js")}}"></script>
    <script src="{{ loadAsset("/js/pos/common/images-pos-editor-lib.js") }}"></script>
    <script src="{{loadAsset("/app/commission_config.js")}}"></script>
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
<link href="{{loadAsset("/css/commission/commission.css")}}" rel="stylesheet" type="text/css" />
@stop
