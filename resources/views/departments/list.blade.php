@extends('layout.default')

@section('content')
<div class="list-departments-content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="col-md-12 content-list-departments">
                    
                    <div class="box-body body-list-departments">
                            <input type="hidden" id="parentId" value="{{ $parentId }}"/>
                            <div class="row">
                              <div class="col-md-6">
                                <h3 class="box-title list-departments-header">DANH SÁCH CÁC PHÒNG BAN</h3>
                                <button class="btn btn-link" onclick="return createPopup(this,0);">Thêm phòng ban</button>
                                <button class="btn btn-link" data-toggle="modal" data-type="add" data-target="#myModal">Thêm mới chức vụ</button>
                                <div id="treeview"></div>
                              </div>
                              @include('user-role.position')
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- modal update department -->
<div id="modalUpdateDepartment" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal-update-department">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">CẬP NHẬT PHÒNG BAN</h4>
                <input type="hidden" id="departmentId" value=""/>
            </div>
            <div class="modal-body body-update-department-popup">
                <form id="form-update-department">
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên phòng ban:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="department_name" id="department_name" class="create-input department_name"/>
                            <div class="errors department-name-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên phòng ban viết tắt:
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="department_shortname" id="department_shortname" class="create-input department_shortname"/>
                            <div class="errors department-short-name-errors"></div>
                        </div>
                    </div>
                    <!--<div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Loại bộ phận:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <select class="form-control department_type" id="department_type" name="department_type">
                                <option value="">-- Chọn --</option>
                            </select>
                            <div class="errors department_type-errors"></div>
                        </div>
                    </div>-->
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Bộ phận trực thuộc:
                        </div>
                        <div class="col-md-9">
                            <select class="form-control department_unit" id="department_unit" name="department_unit">
                                <option value="0">-- Chọn --</option>
                            </select>
                            <div class="errors department-unit-errors"></div>
                        </div>
                    </div>
                    <!-- <div class="row row-invite">
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
                            <select id="districtIds" name="districtIds[]" multiple="multiple"></select>
                            <input type="hidden" id="preferDistrict" name="preferDistrict" value=""/>
                            <div class="errors district-errors"></div>
                        </div>
                    </div> -->
                </form>
            </div>
            <div class="modal-footer">
                <button id="update-department" class="btn btn-add btn-warning update-department">Lưu</button>
                <button id="cancel-update" class="btn btn-add btn-danger cancel-update">Hủy</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal update department -->

<!-- modal create department -->
<div id="modalCreateDepartment" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal-create-department">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="create-modal-title">TẠO PHÒNG BAN</h4>
            </div>
            <div class="modal-body body-create-department-popup">
                <form id="form-create-department">
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên phòng ban:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="create_department_name" id="create_department_name" class="create-input create_department_name"/>
                            <div class="errors create-department-name-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên phòng ban viết tắt:
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="create_department_shortname" id="create_department_shortname" class="create-input create_department_shortname"/>
                            <div class="errors create_department-short-name-errors"></div>
                        </div>
                    </div>
                    <!--<div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Loại bộ phận:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <select class="form-control create_department_type" id="create_department_type" name="create_department_type">
                                <option value="">-- Chọn --</option>
                                <?php foreach ($listDepartmentTypes as $departmentType): ?>
                                    <option value="{{$departmentType->typeId}}">{{$departmentType->typeName}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors create_department_type-errors"></div>
                        </div>
                    </div>-->
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Bộ phận trực thuộc:
                        </div>
                        <div class="col-md-9">
                            <select class="form-control create_department_unit" id="create_department_unit" name="create_department_unit">
                                <option value="0">-- Chọn --</option>
                                <?php foreach ($listDepartments as $department): ?>
                                    <option value="{{$department->id}}">{{$department->departmentName}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors create_department-unit-errors"></div>
                        </div>
                    </div>
                    <!-- <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Khu vực quản lý:
                        </div>
                        <div class="col-md-9">
                            <select class="form-control create_department_manage" id="create_department_manage" name="create_department_manage">
                                <option value="1">Hồ Chí Minh</option>
                            </select>
                            <div class="errors create_department_type-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Quận huyện quản lý:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9 create_districtIds">
                            <select id="create_districtIds" name="create_districtIds[]" multiple="multiple">
                                <?php foreach ($listDistricts as $district): ?>
                                    <option value="{{$district->districtId}}-{{$district->districtName}}">{{$district->districtName}}</option>
                                <?php endforeach; ?>
                            </select>
                            <input type="hidden" id="create_preferDistrict" name="create_preferDistrict" value=""/>
                            <div class="errors crseate_district-errors"></div>
                        </div>
                    </div> -->
                </form>
            </div>
            <div class="modal-footer">
                <button id="create-department" class="btn btn-add btn-warning create-department">Lưu</button>
                <button id="cancel-create" class="btn btn-add btn-danger cancel-create">Hủy</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal create department -->

@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/js/user/list-departments.js")}}"></script>
<script src="{{loadAsset("/js/user/treeview.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/js/user-role/scripts.js")}}"></script>


@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
<style>
    select{
        border: 1px solid #d0d0d0;
        padding: 8px 8px;
        display: inline-block;
        width: 100%;
        overflow: hidden;
        z-index: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
    }
    .selectize-input{
        -webkit-border-radius: 0px;
        -moz-border-radius: 0px;
        border-radius: 0px;
    }
    tr {
        width: 100%;
        display: inline-table;
        table-layout: fixed;
    }

    table {
        min-height: 250px;
    }

    tbody {
        overflow-y: scroll;
        min-height: 220px;
        position: absolute;
    }
</style>
@stop
