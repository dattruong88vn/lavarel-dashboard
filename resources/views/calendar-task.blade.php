@extends('layout.default')

<?php $pathToService = '/app/calendar-task/static' ?>


@section('content')
<div class='dashboard'>
    <section id="calendar-task-container" class="tm-home">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist" id="myTab">
            <li class="active"><a href="/calendar-task" id="calendar-task-tab">Lịch làm việc</a></li>
            <li><a href="/crm-dashboard">Việc cần làm</a></li>
        </ul>
        
        <div class="tab-content">
            <div class="tab-pane active" id="calendar-task"></div>
        </div>
    </section>
</div>
@endsection

@section('page-js')
<noscript>You need to enable JavaScript to run this app.</noscript>
<script>
  var CALENDAR_TASK_BASE_API = "{{CALENDAR_TASK_BASE_API}}"; 
  var BASE_BACKOFFICE_API = "{{BASE_BACKOFFICE_API}}";
  if ($(location).attr('pathname').indexOf('/detail') > 0) {
    $('#calendar-task-container #myTab').hide()
  }
</script>
  @foreach(File::allFiles(public_path("$pathToService/js")) as $fileinfo)
    @if(pathinfo($fileinfo)['extension'] === 'js')
    <?php
          $url = "$pathToService/js/".pathinfo($fileinfo)['basename'];
    ?>
    <script src="{{ loadAsset($url) }}"></script>
    @endif
  @endforeach
@endsection
@section('page-css')
  @foreach(File::allFiles(public_path("$pathToService/css")) as $fileinfo)
    @if(pathinfo($fileinfo)['extension'] === 'css')
    <?php
          $url = "$pathToService/css/".pathinfo($fileinfo)['basename'];
    ?>
    <link href="{{ loadAsset($url) }}" rel="stylesheet" type="text/css" />
    @endif
  @endforeach
<style>
.MuiGrid-item .datepicker > div {
  display: inherit;
}
</style>
@endsection