@extends('layout.default')
@section('content')
<?php $csrf_token = csrf_token(); ?>
<div class="row">
   <input type="hidden" id="csrf-token" value="{{$csrf_token}}" />
   <div class="col-md-12">
      <div class="box box-primary">
         <div class="box-body no-padding">
            <!-- THE CALENDAR -->
            <div id="calendar"></div>
         </div>
         <!-- /.box-body -->
      </div>
      <!-- /. box -->
   </div>
   <!-- /.col -->
</div>
@include('lso.modal-meeting')
@endsection
@section('page-js')
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-mask/jquery.mask.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.js")}}"></script>
<script src="{{loadAsset("/plugins/fullcalendar-3.4/fullcalendar.min.js")}}"></script>
<script src="{{loadAsset("/js/template7.min.js")}}"></script>
<script src="{{loadAsset("/js/jssor.slider-22.1.9.min.js")}}"></script>
<!-- Datepicker range -->
<!-- Bootstrap Notify -->
<script src="{{loadAsset("/plugins/bootstrap-notify/bootstrap-notify.min.js")}}"></script>
@if ($tmpDepartmentId == 11)
<script src="{{loadAsset("js/lso/reminder.js") }}"></script>
@endif
<script src="{{loadAsset("/js/lso/list-meeting.js") }}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/listing.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/fullcalendar/fullcalendar.min.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/fullcalendar/fullcalendar.print.css")}}" rel="stylesheet" type="text/css"  media="print"/>
<style>
   .isGuaranteed td{
   background: #d2eaac
   }
</style>
@stop
