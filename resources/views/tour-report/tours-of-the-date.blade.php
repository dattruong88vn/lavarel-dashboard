<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<?php $csrf_token = csrf_token(); ?>
<input type="hidden" id="csrf-token" value="{{$csrf_token}}" />

<div class="box box-primary">
    <div class="box-header with-border">

        <div class="col-sm-4"><h4>Tour trong ngày <span class="labelGoingTourCount"></span></h4></div>
        <div>
            <span class="color-instruct"><span style="background:#000;width:20px;display: inline-block">&nbsp;&nbsp;</span> chưa đi</span>
            <span class="color-instruct"><span style="background:#0f0;width:20px;display: inline-block">&nbsp;&nbsp;</span> đã đi</span>
            <span class="color-instruct"><span style="background:#f1f1f1;width:20px;display: inline-block">&nbsp;&nbsp;</span> bỏ qua</span>
            <span class="color-instruct"><span style="background:#c52020;width:20px;display: inline-block">&nbsp;&nbsp;</span> cần hỗ trợ</span>
        </div>

    </div><!-- /.box-header -->
    <div class="box-body report-going-tour" style="margin-top: 48px;">
    </div>

</div>

<!-- add listings -->
<div id="modalAddListings" class="modal fade " role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">       
            <div class="modal-body">
                <input type="hidden" class="scheduleId" value="" />
                @include('deal.panel-customer-cart', ['showType'=>'add_listing_to_schedule'])
            </div>
            <!--
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            -->
        </div>

    </div>
</div>
<!-- end add listings -->

@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/fnSetFilteringDelay.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
<script type="text/javascript">
var dealId = "";
function getGoingTourTimeLine() {
    $.ajax({
        'url': "/tour-report/personal-going-tour",
        'type': 'get'
    }).done(function (response) {
        $(".report-going-tour").html(response);
        renderStar();
        var goingTourCount = $("input.goingTourCount").val();
        $(".labelGoingTourCount").html(goingTourCount);
    }).always(function () {
        //hidePropzyLoading();
    });
}

function loadData() {
    getGoingTourTimeLine();
}
loadData();
setInterval(getGoingTourTimeLine, 30000);
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
<style>
    .bs-wizard {margin-top: 0px;font-size:10px}

    /*Form Wizard*/
    .bs-wizard {border-bottom: solid 1px #e0e0e0; padding: 0 0 10px 0;}
    .bs-wizard > .bs-wizard-step {padding: 0; position: relative;}
    .bs-wizard > .bs-wizard-step + .bs-wizard-step {}
    .bs-wizard > .bs-wizard-step .bs-wizard-stepnum {color: #595959; font-size: 14px; margin-bottom: 5px;height: 60px;}
    .bs-wizard > .bs-wizard-step .bs-wizard-info {color: #999; font-size: 12px;}
    .bs-wizard > .bs-wizard-step > .bs-wizard-dot {position: absolute; width: 30px; height: 30px; display: block; background: #000; top: 83px; left: 0%; margin-top: -15px; margin-left: -15px; border-radius: 50%;} 
    .bs-wizard > .bs-wizard-step > .bs-wizard-dot:after {content: ' '; width: 14px; height: 14px; background: #000; border-radius: 50px; position: absolute; top: 8px; left: 8px; } 

    .bs-wizard > .bs-wizard-step.complete > .bs-wizard-dot {position: absolute; width: 30px; height: 30px; display: block; background: #fbe8aa; top: 45px; left: 0%; margin-top: -15px; margin-left: -15px; border-radius: 50%;} 
    .bs-wizard > .bs-wizard-step.complete > .bs-wizard-dot:after {content: ' '; width: 14px; height: 14px; background: #f39c12; border-radius: 50px; position: absolute; top: 8px; left: 8px; } 

    .bs-wizard > .bs-wizard-step > .progress {position: relative; border-radius: 0px; height: 8px; box-shadow: none; margin: 20px 0;}
    .bs-wizard > .bs-wizard-step > .progress > .progress-bar {width:100%; box-shadow: none; background: #000;}
    .bs-wizard > .bs-wizard-step.complete > .progress > .progress-bar {width:100%;}
    .bs-wizard > .bs-wizard-step.active > .progress > .progress-bar {width:100%;background: #00ff00}
    .bs-wizard > .bs-wizard-step.disabled > .progress > .progress-bar {width:100%;background: #c1c1c1}

    .bs-wizard > .bs-wizard-step.status-2 > .bs-wizard-dot {background-color: #00ff00;}
    .bs-wizard > .bs-wizard-step.status-2 > .bs-wizard-dot:after {background-color: #00a65a}

    .bs-wizard > .bs-wizard-step.status-3 > .bs-wizard-dot {background-color: #f1f1f1;}
    .bs-wizard > .bs-wizard-step.status-3 > .bs-wizard-dot:after {background-color: #c1c1c1}

    .bs-wizard > .bs-wizard-step.status-4 > .bs-wizard-dot {background-color: #c52020;}
    .bs-wizard > .bs-wizard-step.status-4 > .bs-wizard-dot:after {background-color: #ff0000}

    .bs-wizard > .bs-wizard-step:first-child  > .progress {left: 0%; width: 100%;}
    .bs-wizard > .bs-wizard-step:last-child  > .progress {width: 0%;}
    /*END Form Wizard*/

    .color-instruct{margin-right: 16px;}
</style>

@stop