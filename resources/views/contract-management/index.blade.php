<?php
    $pathToService = "fe-services/service-contract-management/build/static";
?>
@extends('layout.default')

@section('content')
<div id="contract-management"></div>
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
@stop

@section('page-css')
@foreach(File::allFiles(public_path("$pathToService/css")) as $fileinfo)
   @if(pathinfo($fileinfo)['extension'] === 'css')
   <?php
        $url = "$pathToService/css/".pathinfo($fileinfo)['basename'];
   ?>
   <link href="{{ loadAsset($url) }}" rel="stylesheet" type="text/css" />
   @endif
@endforeach
@stop
