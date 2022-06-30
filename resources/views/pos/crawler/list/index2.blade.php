@extends('layout.default')

@section('content')
    <div id="root"></div>
@endsection

@section('page-js')
	<script src="{{ loadAsset("/js/pos/common/Listing.js")}}"></script>
	<script src="{{ loadAsset("/js/pos/common/plugins/fancy/jquery.fancybox.min.js") }}"></script>
        <script src="{{ loadAsset("/js/pos/crawler/list/index.js")}}"></script>
	<script src="{{ loadAsset("/app/crawler.js")}}"></script>
@stop

@section('page-css')
	<link href="{{ loadAsset("/css/pos/common-pos.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/crawler/style.css")}}" rel="stylesheet" type="text/css"/>
	<link href="{{ loadAsset("/css/pos/jquery.fancybox.min.css")}}" rel="stylesheet" type="text/css"/>
@stop
