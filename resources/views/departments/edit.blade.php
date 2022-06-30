@extends('layout.default')

@section('content')

<div class="edit-department-content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="col-md-1"></div>
                <div class="col-md-10 content-update-department">
                    <h3 class="box-title update-header">CẬP NHẬT BỘ PHẬN <?php if($detailDepartment->departmentName != '') echo ': '. $detailDepartment->departmentName ?></h3>
                    <input type="hidden" id="departmentId" value="{{ $detailDepartment->id }}"/>
                    <a class="list-departments" href="/user-role/list-departments/0">Danh sách bộ phận</a>
                    <div class="box-body body-update-department">
                        <form id="form-update-department">
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Tên bộ phận:<span class="required">(*)</span>
                                </div>
                                <div class="col-md-9">
                                    <input type="text" value="{{ $detailDepartment->departmentName }}" name="department_name" id="department_name" class="create-input department_name"/>
                                    <div class="errors department-name-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3 label-department">
                                    Tên bộ phận viết tắt:
                                </div>
                                <div class="col-md-9">
                                    <input type="text" value="{{ $detailDepartment->departmentShortName }}" name="department_shortname" id="department_shortname" class="create-input department_shortname"/>
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
                                            <option value="{{$departmentType->typeId}}" <?php echo $departmentType->typeId == $detailDepartment->departmentType ? "selected='selected'" : ""; ?> >{{$departmentType->typeName}}</option>
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
                                            <option value="{{$department->id}}" <?php echo $department->id == $detailDepartment->parentId ? "selected='selected'" : ""; ?> >{{$department->departmentName}}</option>
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
                                        <?php foreach ($districts as $district): 
                                            $selected = '';
                                            if(in_array($district->districtId, $currentDistricts)){
                                                $selected = "selected";
                                            }
                                        ?>
                                            <option {{$selected}} value="{{$district->districtId}}-{{$district->districtName}}">{{$district->districtName}}</option>
                                        <?php endforeach; ?>
                                    </select>
                                    <input type="hidden" id="preferDistrict" name="preferDistrict" value="{{$isPreferedDistrict>0?$isPreferedDistrict:""}}"/>
                                    <div class="errors district-errors"></div>
                                </div>
                            </div>
                            <div class="row row-invite">
                                <div class="col-md-3"></div>
                                <div class="col-md-9">
                                    <button id="update-department" class="btn btn-add btn-warning update-department">Lưu</button>
                                    <button id="cancel" class="btn btn-add btn-danger cancel-update">Hủy</button>
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
<script src="{{loadAsset("/js/user/update-department.js")}}"></script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
@stop
