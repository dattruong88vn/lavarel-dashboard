@extends('layout.default')

@section('content')
<section>
    <div class="box box-primary" >
        <div class="box-body">
            <div class="form-group">
                <label>Tên khách hàng:</label> {{$feedback->customerName}}
            </div>
            <div class="form-group">
                <label>Tên TM:</label> {{$feedback->tmName}}
            </div>
            <div class="form-group hidden">
                <label>Điểm của TM:</label> {{$feedback->tmPoint}}
            </div>
            <div class="form-group">
                <label>Tên CS:</label> {{$feedback->csName}}
            </div>
            <div class="form-group hidden">
                <label>Điểm của CS:</label> {{$feedback->csPoint}}
            </div>
            <div class="form-group">
                <label>Ngày gửi:</label> {{!empty($feedback->dateSendFeedback)?date('d-m-Y H:i:s',$feedback->dateSendFeedback/1000):""}}
            </div>
            <div class="form-group">
                <label>Ngày khách hàng feedback:</label> {{!empty($feedback->dateCutomerFeedback)?date('d-m-Y H:i:s',$feedback->dateCutomerFeedback/1000):""}}
            </div>
            <hr />
            <?php foreach ($feedback->groupsList as $group): ?>
                <ul>
                    <li class="question-group">
                        <h3>{{$group->groupName}}</h3>
                        <ul>
                            <?php foreach ($group->questionsList as $question): ?>
                                <li class="question">
                                    <h4>{{$question->questionName}}</h4>
                                    <ul>
                                        <?php foreach ($question->resultList as $result): ?>
                                            <?php if (!empty($result->answerName)): ?>
                                                <li class="result">{{$result->answerName}}</li>
                                            <?php endif; ?>
                                            <?php if (!empty($result->reasonContent)): ?>
                                                <li>
                                                    {{$result->answerId==null?"":"Lý do: "}} {{$result->reasonContent}}
                                                </li>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    </ul>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </li>
                </ul>
            <?php endforeach; ?>
        </div>
    </div>
</section>
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
<script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
<script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
<script src="{{loadAsset("/js/dashboard.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<!--<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>-->
<!--<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>-->
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.carousel.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/owl.carousel/owl-carousel/owl.theme.css")}}" rel="stylesheet" type="text/css" />
<style type="text/css">
    .prefered{
        text-decoration: underline;
    }

    .datepicker {
        z-index: 100000 !important;
    }
    .pac-container{ 
        z-index: 100000 !important;        
    }
    ul.notesList {
        list-style: none;
        margin:0px;
        padding:0px;
    }
    .notesList li{
        padding:16px;
    }
    .notesList li img{
        width:auto;
        height:48px;
        margin-right:  16px;
        float:left;
    }

    .notesList .isMine img{
        width:auto;
        height:48px;
        margin-right: 16px;
        float: left;
    }
    .notesList .isMine{
        text-align: left;
    }
    #image-slider{
        z-index:999999999;
    }
</style>
@stop