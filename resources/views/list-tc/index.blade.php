@extends('layout.default')

@section('content')
<?php if (session('status')): ?>
    <div class="alert alert-info">{{session('status')}}</div>
<?php endif ?>
<div class="tcs-page">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="row col-md-12 head-tcs">
                        <p class="box-title title-tcs">Danh sách trung tâm giao dịch</p>
                        <button id="create-tc" class="btn btn-primary pull-right"><span class="glyphicon glyphicon-plus"></span> Tạo mới</button>
                    </div>
                    <div class="filter-tcs col-md-12">
                        <div class="row">
                            <div class="col-md-2">
                                <select id="zoneIds" class="typeUserFilter form-control">
                                    <option value="">-- Zone --</option>
                                    <?php
                                    foreach ($listDepartments as $department):
                                        if ($department->departmentType != "ZONE") {
                                            continue;
                                        }
                                        ?>
                                        <option value="{{$department->id}}">{{$department->departmentName}}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select id="districtIds" class="statusFilter form-control">
                                    <option value="">-- Quận --</option>
                                    <?php foreach ($districts as $district): ?>
                                        <option value="{{ $district->districtId }}">{{ $district->districtName }}</option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                        </div>
                    </div>
                </div><!-- end box-header -->
                <div class="box-body">
                    <table id="data-tcs" class="display" style="width:100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Địa chỉ</th>
                                <th>Zone</th>
                                <th>Quận</th>
                                <th>Phường</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- modal create/update tc -->
<div id="create-update-tc" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content create-update-tc">
            <div class="modal-content" role="document">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Thông tin TC</h4>
                </div>
                <div class="modal-body">
                    <form class="form-create-update-tc" id="form-create-update-tc">
                        <input type="hidden" id="tcId" value=""/>
                        <input type="hidden" id="latitude" value=""/>
                        <input type="hidden" id="longitude" value=""/>
                        <div class="form-group">
                            <label>Tên <span class="text-danger">*</span></label>
                            <input name="name" id="name" type="text" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Tên đầy đủ <span class="text-danger">*</span></label>
                            <input name="fullName" id="fullName" type="text" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Loại <span class="text-danger">*</span></label>
                            <select id="type" name="type" class="form-control">
                                <option value="">-- Chọn loại --</option>
                                <option value="1">Head</option>
                                <option value="2">TC</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Thứ tự hiển thị <span class="text-danger">*</span></label>
                            <input name="orders" id="orders" type="text" class="form-control numvad" value="">
                        </div>
                        <div class="form-group">
                            <label>Quận <span class="text-danger">*</span></label>
                            <select id="districtId" name="districtId" class="form-control">
                                <option value="">-- Chọn quận --</option>
                                <?php foreach ($allDistricts as $district) : ?>
                                    <option value="{{ $district->districtId}}"> {{ $district->districtName}}</option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Phường</label>
                            <select id="wardId" name="wardId" class="form-control">
                                <option value="">-- Chọn phường --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Đường</label>
                            <select id="streetId" name="streetId" class="form-control">
                                <option value="">-- Chọn đường --</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ <span class="text-danger">*</span></label>
                            <input name="address" id="address" type="text" class="form-control" value="">
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ rút gọn<span class="text-danger">*</span></label>
                            <input name="shortAddress" id="shortAddress" type="text" class="form-control" value="">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btnSaveInfoTc" class="btn btn-primary">Lưu</button>
                    <button class="btn btn-default" data-dismiss="modal">Đóng</button>
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
<script src="{{loadAsset("/js/user/list-tc.js")}}"></script>
<script>
    $("div.alert").delay(5000).fadeOut('slow');
</script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/user-role/list-tc.css")}}" rel="stylesheet" type="text/css" />
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

@stop
