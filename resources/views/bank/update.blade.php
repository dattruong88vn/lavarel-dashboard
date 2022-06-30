@extends('layout.default')

@section('content')
<!-- nội dung của các page để ở đây. -->
<?php $csrf_token = csrf_token() ?>
<div class='page-bank'>
    <section>
        <div class="db-tm-item deal-tm-customer-info">
            <div class="row">
                <div class="col-md-12">                
                    <div class="box box-primary">
                        <div class="box-header with-border">
                            <h3 class="box-title">THÔNG TIN NGÂN HÀNG</h3>
                        </div>
                        <form id="formMain" class="form-horizontal">
                            <div class="box-body">
                                <input type="hidden" name="id" id="id" value="{{$item->id}}"  />
                                <input type="hidden" id="_token" name="_token" value="{{$csrf_token}}">
                                <div class="form-group">
                                    <label for="" class="col-sm-2">Mã</label>
                                    <div class="col-sm-4">
                                        <input type="text" name="code" id="code" class="form-control" value="{{$item->code}}" />
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2">Tên</label>
                                    <div class="col-sm-4">
                                        <input type="text" name="name" id="name" class="form-control" value="{{$item->name}}"  />
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2">Lãi suất</label>
                                    <div class="col-sm-4">
                                        <input type="text" name="interestedRate" id="interestedRate" class="form-control" value="{{$item->interestedRate}}"   />
                                        <div class="errors"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="col-sm-2">&nbsp;</label>
                                    <div class="col-sm-4">
                                        <button class="btn btn-success btnSave">Lưu</button>
                                        <a href="/bank" class="btn btn-danger">Trở về</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </section>
</div>
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
<script type="text/javascript" src="{{loadAsset("/js/bank/commons.js")}}"></script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/timepicker/bootstrap-timepicker.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
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
</style>
@stop