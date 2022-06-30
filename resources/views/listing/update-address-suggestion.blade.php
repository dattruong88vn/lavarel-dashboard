<?php

use App\Libraries\PropzyCommons
?>

@extends('layout.default')

@section('content')
<!-- Nội dung website ở đây -->
<section>
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">Suggest địa chỉ</h3>
            <span class="pull-right">
                <!--<button class="btn-export btn btn-warning">Export to xlsx/csv</button>-->
            </span>
        </div><!-- /.box-header -->
        <div class="box-body">
            <form id="formMain">
                <input type="hidden" id="_token" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="form-group row">
                    <label class="col-sm-2" for="streetName">Tên đường</label>
                    <div class="col-sm-10">
                        <input type="text" name="streetName" id="streetName" class="form-control" value="{{$item->streetName}}" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2" for="wardId">Phường</label>
                    <div class="col-sm-10">
                        <select name="wardId" id="wardId" class="form-control" >
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2" for="districtName">Quận</label>
                    <div class="col-sm-10">
                        <select name="districtName" id="districtName" class="form-control" >
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2" for="cityName">Tỉnh / TP</label>
                    <div class="col-sm-10">
                        <select name="cityName" id="cityName" class="form-control" >
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2" for="description">Mô tả</label>
                    <div class="col-sm-10">
                        <textarea name="description" id="description" class="form-control" rows="12" >{{$item->description}}</textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-xs-12">
                        <button type="button" class="btn btn-success btnSave">Lưu</button>
                        <a class="btn btn-warning" href="/listing/address-suggestions">Trở về</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>
@endsection



@section('page-js')
<script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
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

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script>
<script src="{{loadAsset("/js/listing/address-suggestion-util.js")}}"></script>

<script type="text/javascript">
var currentCityId = "{{$item->cityId}}";
var currentDistrictId = "{{$item->districtId}}";
var currentWardId = "{{$item->wardId}}";
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });

    getCities("#cityName", currentCityId, function (cityId, selectedId) {
        getDistricts(cityId, "#districtName",currentDistrictId, function(selector){
            getWards($(selector).val(),$("#wardId"), currentWardId, function(){
                
            });
        });
    });
    $(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = preparePostData();
        showPropzyLoading();
        $.ajax({
            url: "/listing/update-address-suggestion/{{$item->id}}",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
});
</script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />

<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop