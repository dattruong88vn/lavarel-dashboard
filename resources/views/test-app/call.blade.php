<?php

use App\Libraries\PropzyCommons
?>
@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->

<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Test call</h3>
            <span class="pull-right">
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <input type="text" class="phoneNumber" value = "" />
            <button class="btn-makeCCall">Gọi</button>
        </div>
        <div id="errors-log"></div>
    </div>
    <script type="text/javascript">
        $(document).ready(function(){
            CCall.start({
                user_extend: '881',
                password: 'v9QC5!vES!'
            });
        });    
    </script>
</section>

<script type="text/javascript">
    $(".btn-makeCCall").on("click", function (event) {
        event.preventDefault();
        //$('body').css('pointer-events', 'none');
        var phoneNumber = $(".phoneNumber").val();
        CCall.makeCall({
            phoneNumber: phoneNumber,
            onCallEnded: function (callResultInfo) {
                console.log(callResultInfo);
                $('body').css('pointer-events', 'auto');
            }
        });
        CCall.activeButtons();
    });

    $(".btn-stopCCall").on("click", function (event) {
        event.preventDefault();
        CCall.terminateCall();
    });

</script>
@endsection

@section('page-js')    
    <!-- <script src="{{loadAsset("/js/CCall_V1.js?v=12")}}"></script> -->
@stop

@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

@stop