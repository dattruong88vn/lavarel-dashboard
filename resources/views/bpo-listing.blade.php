@extends('layout.default')

@section('content')
<div id="tasks-of-bpo-listing"></div>
<!-- @include('pos.sa.modals.bpo-modal') -->
<div id="spa-main"></div>
<script>
$(function(){
    $('#section-bpo-selectBAs').hide();
});

</script>
@endsection

@section('page-js')
<script src="{{loadAsset("/app/tasks_of_bpo_listing.js")}}"></script>
<noscript>You need to enable JavaScript to run this app.</noscript>
<script src="{{loadAsset('/app/spa/static/js/spa_index.js')}}"></script>
<script src="{{loadAsset('/app/spa/static/js/main.chunk.js')}}"></script>
<script src="{{loadAsset('/js/deal/util-for-deal.js')}}"></script>
@endsection
@section('page-css')
<link href="{{loadAsset('/app/spa/static/css/main.chunk.css')}}" rel="stylesheet">
<link href="{{loadAsset("/css/slick-carousel/slick-theme.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/slick-carousel/slick.min.css")}}" rel="stylesheet" type="text/css" />
@endsection