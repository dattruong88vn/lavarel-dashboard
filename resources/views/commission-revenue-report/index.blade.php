@extends('layout.default')

@section('content')
    <div id="root"></div>
@endsection

@section('page-js')
    <script src="{{loadAsset("/app/commission_revenue_report.js")}}"></script>
@endsection
@section('page-css')
<link href="{{loadAsset("/css/commission/commission.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/css/commission/commission_revenue_report.css")}}" rel="stylesheet" type="text/css" />
@endsection
