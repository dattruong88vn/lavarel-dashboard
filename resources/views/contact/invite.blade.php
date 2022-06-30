@extends('layout.default')
@section('content')
<div class="create-contact invite-contacts">
    <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
            <div class="box box-info">
                <div class="box-header with-border text-center">
                    <h3 class="box-title">Tạo mới người dùng</h3>
                </div>
                @php
                echo App\Http\Controllers\ContactController::profileForm(0);
                @endphp

            </div>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
@endsection
@section('page-js')
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/js/user/invite-contacts2.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
@stop