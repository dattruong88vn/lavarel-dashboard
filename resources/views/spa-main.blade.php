@extends('layout.default')

@section('content')
<script type="text/javascript">
    localStorage.setItem('tokenUser', '{{$user->token}}');
</script>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="spa-main"></div>

<!-- @include('pos.sa.modals.bpo-modal')
@include('pos.sa.modals.bpo-modal-resolve') -->
@endsection

@section('page-css')
<link href="{{loadAsset('/app/spa/static/css/main.chunk.css')}}" rel="stylesheet">
@endsection

@section('page-js')
<script src="{{loadAsset('/js/deal/util-for-deal.js')}}"></script>
<script src="{{loadAsset('/app/spa/static/js/spa_index.js')}}"></script>
<script src="{{loadAsset('/app/spa/static/js/main.chunk.js')}}"></script>
@endsection