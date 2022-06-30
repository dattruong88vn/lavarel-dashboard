@extends('layout.default')

@section('content')
<div class="list-departments-content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="col-md-12 content-list-departments">

                    <div class="box-body body-list-departments">
                        <input type="hidden" id="parentId" value="{{ $parentId }}" />
                        <div class="row">
                            <div class="col-md-6">
                                <h3 class="box-title list-departments-header">DANH SÁCH CÁC KHU VỰC</h3>
                                <button class="btn btn-link" onclick="return PROPZY_JSON.openPopup(this,0);">Thêm khu vực</button>
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

<!-- modal department -->
<div id="modalDepartment" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content modal-department">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title" id="modal-title">TẠO KHU VỰC</h4>
            </div>
            <div class="modal-body body-department-popup">
                <form id="form-department">
                    <input id="departmentId" value="" name="departmentId" type="hidden" />
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Chọn quốc gia:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <select id="countryId" name="countryId" class="form-control countryId">
                                @foreach ($countries as $country)
                                <option value="{{$country->countryID}}">{{$country->countryName}}</option>
                                @endforeach
                            </select>
                            <div class="errors country-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên khu vực:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="department_name" id="department_name" class="create-input department_name" />
                            <div class="errors department-name-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Tên khu vực viết tắt:
                        </div>
                        <div class="col-md-9">
                            <input type="text" value="" name="department_shortname" id="department_shortname" class="create-input department_shortname" />
                            <div class="errors department-short-name-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Thành phố:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9">
                            <select class="form-control department_manage" id="department_manage" name="department_manage"></select>
                            <div class="errors department_manage-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Quận/Huyện:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9 districtIds">
                            <div class="" id="districtIds_container"></div>
                            <div class="errors district-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Phường/Xã:<span class="required">(*)</span>
                        </div>
                        <div class="col-md-9 wardIds">
                            <div id="wardIds_select_container" class="wardIds_select_container"></div>
                            <div class="errors ward-errors"></div>
                        </div>
                    </div>
                    <div class="row row-invite">
                        <div class="col-md-3 label-department">
                            Email CC cho Legal khi chốt Deal:
                        </div>
                        <div class="col-md-9">
                            <input style="width: 65% !important;border-radius: 4px;" type="text" value="" name="emailCCLegal" id="emailCCLegal" class="create-input emailCCLegal" />
                            <div class="emailCCLegal-errors"></div>
                            <div>
                                <small class="text-muted">
                                    (*) Các email cách nhau bởi dấu "," <br />
                                    Thí dụ: <br />
                                    - 1 email: <b>a@propzy.com</b> <br />
                                    - 2 email: <b>a@propzy.com,b@propzy.com</b> <br />
                                    - n email: <b>a@propzy.com,....,n@propzy.com</b>
                                </small>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="department-submit" class="btn btn-add btn-warning department-submit">Lưu</button>
                <button id="department-cancel" class="btn btn-add btn-danger department-cancel">Hủy</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- end modal create department -->

@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/js/user/list-zones.js")}}"></script>
<script src="{{loadAsset("/js/user/treeview.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/js/user-role/scripts.js")}}"></script>


@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/users.css")}}" rel="stylesheet" type="text/css" />
<style>
    select {
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

    .selectize-input {
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