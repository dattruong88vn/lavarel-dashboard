@extends('layout.default')

@section('content')

<div class="create-department-page">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="col-md-1"></div>
                <div class="col-md-10 content-create-department">
                    <h3 class="box-title create-header">TẠO BỘ PHẬN</h3>
                    <a class="list-departments" href="/user-role/list-departments/0">Danh sách bộ phận</a>
                    <div class="box-body body-create-department">
                        <form id="form-create-department">
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Tên bộ phận:<span class="required">(*)</span>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" value="" name="department_name" id="department_name" class="create-input department_name"/>
                                    <div class="errors department-name-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Tên bộ phận viết tắt:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" value="" name="department_shortname" id="department_shortname" class="create-input department_shortname"/>
                                    <div class="errors department-short-name-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Loại bộ phận:<span class="required">(*)</span>
                                </div>
                                <div class="col-md-9">
                                    <select class="form-control department_type" id="department_type" name="department_type">
                                        <option value="">-- Chọn --</option>
                                        <?php foreach ($listDepartmentTypes as $departmentType): ?>
                                            <option value="{{$departmentType->typeId}}">{{$departmentType->typeName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <div class="errors department_type-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Bộ phận trực thuộc:
                                </div>
                                <div class="col-md-9">
                                    <select class="form-control department_unit" id="department_unit" name="department_unit">
                                        <option value="0">-- Chọn --</option>
                                        <?php foreach ($listDepartments as $department): ?>
                                            <option value="{{$department->id}}">{{$department->departmentName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <div class="errors department-unit-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Khu vực quản lý:
                                </div>
                                <div class="col-md-9">
                                    <select class="form-control department_manage" id="department_manage" name="department_manage">
                                        <option value="1">Hồ Chí Minh</option>
                                    </select>
                                    <div class="errors department_type-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Quận huyện quản lý:<span class="required">(*)</span>
                                </div>
                                <div class="col-md-9 districtIds">
                                    <select id="districtIds" name="districtIds[]" multiple="multiple">
                                        <?php foreach ($listDistricts as $district): ?>
                                            <option value="{{$district->districtId}}-{{$district->districtName}}">{{$district->districtName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" id="preferDistrict" name="preferDistrict" value=""/>
                                    <div class="errors districtIds-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3"></div>
                                <div class="col-md-9">
                                    <button id="add-department" class="btn btn-add btn-warning add-department">Lưu</button>
                                    <button id="cancel" class="btn btn-add btn-danger cancel-create">Hủy</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-1"></div>
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
<script src="{{loadAsset("/js/user/create-department.js")}}"></script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
@stop
