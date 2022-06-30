@extends('layout.default')

@section('content')
<div id="bpo-zone-listing"></div>
@endsection

@section('page-js')
<script src="{{loadAsset("/app/bpo_zone_listing.js")}}"></script>
@endsection
