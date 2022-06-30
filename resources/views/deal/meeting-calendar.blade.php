@extends('layout.default')
@section('content')
<div>
    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
    <div class="col-sm-3">
        <div class="box">
            <div class="box-body">
                <form>
                    <div><input name="txtSearchAgent" id="txtSearchAgent" class="form-control" placeholder="Tên, email... của agents" /></div>
                    <div>
                        <h3>Danh sách sales</h3>
                        <ul class="selectedAgents">                    
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-sm-9">

        <div class="box">
            <div class="box-body">
                <div id='meetingCalendar'></div>
            </div>
        </div>
    </div>
</div>
@stop


@section('page-js')
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/fullcalendar/fullcalendar.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script type="text/javascript">
</script>

<script src="{{loadAsset("/js/deal/commons.js")}}"></script>
<script src="{{loadAsset("/js/deal/meeting-calendar.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/fullcalendar/fullcalendar.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/jquery-ui.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">

    .selectedAgents{
        margin: 0px;
        padding:0px;
        list-style: none;
    }
</style>
@stop