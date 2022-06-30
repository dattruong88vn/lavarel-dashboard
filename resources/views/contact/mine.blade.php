@extends('layout.default')

@section('content')
<?php if (session('status')): ?>
    <div class="alert alert-info">{{session('status')}}</div>
<?php endif ?>
<div class="my-contacts-page">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="row col-md-12 head-contacts">
                        <p class="box-title title-contacts">Danh bạ</p>
                        <a style="margin-left: 20px;" class="pull-right btn btn-add btn-info" target="_blank" href="/contact/invite">Thêm liên hệ</a>
                    </div>
                    <div class="filter-contacts col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                <select id="typeUserFilter" class="typeUserFilter form-control">
                                    <option value="">-- Loại User --</option>
                                    <?php foreach($listFilters as $key => $filter): ?>
                                        <option value="{{ $key }}">{{ $key }}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select id="statusFilter" class="statusFilter form-control">
                                    <option value="">-- Trạng thái --</option>
                                    <option value="1">Đã kích hoạt sms</option>
                                    <option value="2">Chưa kích hoạt sms</option>
                                    <option value="3">Đã training</option>
                                    <option value="4">Chưa training</option>
                                    <option value="5">Chưa ký HĐ</option>
                                    <option value="6">Đã ký HĐ</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select id="activeFilter" class="activeFilter form-control">
                                    <option value="">-- Active --</option>
                                    <option value="1">Còn hoạt động</option>
                                    <option value="2">Đang tạm ngưng</option>
                                    <option value="3">Đóng tài khoản</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="filter-type-date col-md-4">
                                <div class="col-md-6 filter-date createDate">
                                    <input class="type-filter-date" type="radio" name="filter_date" value="1" checked="checked"/> Ngày tạo
                                </div>
                                <div class="col-md-6 filter-date updateDate">
                                    <input class="type-filter-date" type="radio" name="filter_date" value="2"/> Ngày cập nhật
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input autocomplete="off" name="startDate" id="startDate" type="text" class="timestame datepicker filt-date form-control" value="" placeholder="Từ">
                            </div>
                            <div class="col-md-2">
                                <input name="endDate" id="endDate" type="text" class="timestame datepicker filt-date form-control" value="" placeholder="Đến">
                            </div>
                            <div class="col-md-2">
                                <button id="btn-filter" type="submit" class="btn btn-filter btn-primary btn-block"><i class="fa fa-filter" aria-hidden="true"></i> Lọc </button>
                            </div>
                        </div>
                    </div>
                </div><!-- end box-header -->
                <div class="box-body">
                    <table id="data-contacts" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Loại User</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th>Nguồn đăng ký</th>
                                <th>Chức vụ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/js/user/my-contacts.js")}}"></script>
<script>
    $("div.alert").delay(5000).fadeOut('slow');
</script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/user-role/my-contacts.css")}}" rel="stylesheet" type="text/css" />
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

@stop
