@extends('layout.default')
@section('content')
<div id="dashboard-map" style="height: calc(100vh - 56px); margin: 0 -15px"></div>
<script type="text/javascript">
    var BASE_BACKOFFICE_API = "";
    $(document).ready(function () {
        $('.content-wrapper').removeStyle();
    });    
</script>
@endsection
<?php $pathToService = '/app/dashboard-map/static' ?>

@section('page-css')
    @foreach(File::allFiles(public_path("$pathToService/css")) as $fileinfo)
        @if(pathinfo($fileinfo)['extension'] === 'css')
        <?php
            $url = "$pathToService/css/".pathinfo($fileinfo)['basename'];
        ?>
        <link href="{{ loadAsset($url) }}" rel="stylesheet" type="text/css" />
        @endif
    @endforeach    
@endsection

@section('page-js')
    @foreach(File::allFiles(public_path("$pathToService/js")) as $fileinfo)
        @if(pathinfo($fileinfo)['extension'] === 'js')
        <?php
            $url = "$pathToService/js/".pathinfo($fileinfo)['basename'];
        ?>
        <script src="{{ loadAsset($url) }}"></script>
        @endif
    @endforeach
@endsection

@section('page-css-body')
    <style type="text/css">
        /* REPLACE BOOTSTRAP STYLE FROM PROPZY MAP JS */
        b, strong {
            font-weight: 700;
        }
        a {
            text-decoration: none;
        }
        .nav, .navbar, .navbar-nav {
            display: block;
        }
        .navbar {
            padding: 0;
        }
        .content {
            padding: 0 15px 0;
        }
        .dropdown-toggle::after {
            content: none;
        }
        .content-wrapper {
            min-height: auto !important;
        }
        .table-fixed tr {
            
        }
        .fade:not(.show) {
            opacity: inherit;
        }
    </style> 
@endsection

