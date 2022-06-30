@extends('layout.default')

@section('content')
<div class="create-account">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tạo tài khoản</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <form id="form-create-account">
                        <input type="hidden" id="token" name="token" value="{{ csrf_token() }}" />
                        <div class="row">
                            <!--Images/Video-->
                            <div class="col-md-12 col-xs-12">
                                <div class="form-group avatar">
                                    <label>Hình ảnh</label>
                                    <input class="file-image" type="file" class="file" data-upload-url="/user/upload-avatar" >

                                </div>
                            </div>
                            <!-- #Images/Video-->
                        </div>
                        <div class="form-group has-feedback">
                            <label>Họ và tên</label>
                            <input id="fullName" type="text" class="form-control fullName" name="fullName" placeholder="Họ và tên">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Địa chỉ email</label>
                            <div class="input-group">
                                <input id="email" type="text" class="form-control email" name="email" placeholder="Tên email">
                                <div class="input-group-append input-group-addon">
                                    <span class="input-group-text">@propzy.com</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group has-feedback">
                            <label>Số điện thoại</label>
                            <input id="phone" type="text" class="form-control phone" name="phone" placeholder="Số điện thoại">
                        </div>
                        <div class="form-group has-feedback">
                            <label>VoiceIp Extension</label>
                            <input id="voipId" type="text" class="form-control voipId" name="voipId" placeholder="Voice IP Extension" value="" />
                        </div>
                        <div class="form-group has-feedback">
                            <label>VoiceIp Password</label>
                            <input id="voipPassword" type="text" class="form-control voipPassword" name="voipPassword" placeholder="VoiceIp password" value="" />
                        </div>
                        <div class="form-group has-feedback">
                            <label>Chữ ký Email</label>
                            <input id="signature" type="text" class="form-control signature" name="signature" placeholder="Chữ ký Email">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Nick Skype</label>
                            <input id="skype" type="text" class="form-control skype" name="skype" placeholder="Nick skype">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Nick Zalo</label>
                            <input id="zalo" type="text" class="form-control zalo" name="zalo" placeholder="Nick zalo">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Tên tài khoản</label>
                            <input id="username" type="text" class="form-control username" name="username" placeholder="Tên tài khoản">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Mật khẩu</label>
                            <input id="password" type="password" class="form-control password" name="password" placeholder="Mật khẩu">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Xác nhận mật khẩu</label>
                            <input id="confirmPassword" type="password" class="form-control confirmPassword" name="confirmPassword" placeholder="Xác nhận mật khẩu">
                        </div>
                        <div class="box-line">
                            <h3 class="box-title">Liên kết tài khoản Websites</h3>
                        </div>
                        <?php
                            $isTmOrCrm = $createdBy->departments[0]->isGroupAdmin && in_array($createdBy->departments[0]->departmentId, [5, 12]);
                            $showGroup = $isTmOrCrm ? "none" : "block";
                        ?>
                        @if($isTmOrCrm)
                            <div class="row">
                                <div class="col-md-12 col-xs-12">
                                    <div class="form-group">
                                        <div class="checkbox">
                                            <label class="control-label">
                                                <input class="" name="autoCreateAgent" id="autoCreateAgent"  type="checkbox" checked>
                                                Tạo tài khoản portal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                        <div class="row autoCreateAgent-group" style="display: {{$showGroup}} ">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Nguồn Listing</label>
                                    <select id="source" class="form-control select2" style="width: 100%;">
                                        <option value="">---Vui lòng chọn---</option>
                                        <?php foreach ($userTypeList as $user): ?>
                                            @if($createdBy->departments[0]->departmentId == 12 || $createdBy->departments[0]->departmentId == 5)
                                                <option {{ $user->id == 4 ? '' : 'disabled'}} value="{{ $user->id}}" @if(isset($listing->source) && $listing->source == $user->id) selected @endif> {{$user->name}}</option>
                                            @else
                                                <option value="{{ $user->id}}" @if(isset($listing->source) && $listing->source == $user->id) selected @endif> {{$user->name}}</option>
                                            @endif
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Tên</label>
                                    <select id="listuser" class="form-control select2" class="form-control select2" style="width: 100%;">
                                        <option value="">---Vui Lòng chọn---</option>
                                        <?php if (isset($listUser)): ?>
                                        <?php foreach ($listUser as $user) : ?>
                                        <option phone="{{$user->phone}}" accountid="{{$user->accountId}}" value="{{$user->socialUid}}">{{$user->name}}</option>
                                        <?php endforeach ?>
                                        <?php endif; ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <h3>Quản lý listing theo khu vực</h3>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Thành phố</label>
                                    <select name="city" class="form-control select2" id="city" style="width: 100%;">
                                        <?php foreach ($cityList as $city): ?>
                                            <option value="{{ $city->cityId }}">{{ $city->cityName }}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Quận / Huyện</label>
                                    <select name="district" id="district" class="form-control select2 district" style="width: 100%;"  multiple="multiple">
                                        <?php foreach ($districtList as $district): ?>
                                            <option value="{{ $district->districtId }}">{{ $district->districtName }}</option>
                                        <?php endforeach ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <?php
                        if (Session::get('user')->userId == 1) {
                            ?>
                            <div class="form-group">
                                <label>Thuộc bộ phận</label>
                                <table id="table-staff" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tên bộ phận</th>
                                            <th>Chọn</th>
                                            <th>Admin của bộ phận</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($listDepartments as $departments): ?>
                                            <tr>
                                                <td>
                                                    {{$departments->departmentName}}
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="{{$departments->parentId>0?'has-parent':''}} choose-department choose-department-{{$departments->id}}" name="choose[]" id="choose" value="{{$departments->id}}" type="checkbox"  data-parent-id="{{$departments->parentId}}" />
                                                            Chọn
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="choose-is-agroupadmin" name="chooseAdmin[]" id="chooseAdmin" value="{{$departments->id}}" type="checkbox">
                                                            Chọn làm admin
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            <?php
                        }else {
                            ?>
                            <div class="form-group">
                                <label>Thuộc bộ phận</label>
                                <table id="table-staff" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tên bộ phận</th>
                                            <th>Chọn</th>
                                            <th>Admin của bộ phận</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        $checked = "";
                                        $myDepartments = array();
                                        if (isset($createdBy->departments)):
                                            $myDepartments = $createdBy->departments;
                                        endif;
                                        foreach ($listDepartments as $department):
                                            $isMyDepartments = false;
                                            if ($myDepartments[0]->departmentId != $department->id && $department->parentId != $myDepartments[0]->departmentId) {
                                                continue;
                                            }
                                            $checked = "";
                                            if ($myDepartments[0]->departmentId == $department->id) {
                                                $checked = "checked";
                                                $isMyDepartments = true;
                                            }
                                            ?>
                                            <tr>
                                                <td>
                                                    {{$department->departmentName}}
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="{{$department->parentId>0?'has-parent':''}} choose-department  choose-department-{{$department->id}} {{$isMyDepartments?"my-department":""}}" name="choose[]" value="{{$department->id}}" type="checkbox" {{$checked}} data-parent-id="{{$department->parentId}}">
                                                            Chọn
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="choose-is-agroupadmin" name="chooseAdmin[]" value="{{$department->id}}" type="checkbox">
                                                            Chọn làm admin
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            <?php
                        }
                        ?>
                        <div class="box-line">
                            <h3 class="box-title">Phân quyền chức năng</h3>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <table id="table-permission" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Đối tượng</th>
                                            <th>Read</th>
                                            <th>Add</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                            <th>Export</th>
                                            <th>Import</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($entitiesList as $item): ?>
                                            <tr>
                                                <td>
                                                    <input type="hidden" value = "{{$item->id}}" />
                                                    {{$item->name}}
                                                </td>
                                                <?php foreach ($item->actions as $ac): ?>
                                                    <td>
                                                        <input type="hidden" name="{{strtolower($ac->actionName)}}_action"  value = "{{$ac->actionId}}" />
                                                        <select  name="{{strtolower($ac->actionName)}}_permission" class="form-control select2 select_permission" style="width: 100%;">
                                                            <option entityid="-1" actionid="-1" value="-1">--Chọn--</option>
                                                            <?php foreach ($ac->permissions as $p): ?>
                                                                <option entityid="{{$item->id}}" actionid="{{$ac->actionId}}" value="{{$p->permissionId}}">{{$p->permissionName}}</option>
                                                            <?php endforeach; ?>
                                                        </select>
                                                    </td>
                                                <?php endforeach; ?>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button id="finish" class="btn btn-primary">Tạo tài khoản</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    @include("users.blc-choose-district-model")
@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>

<script type="text/javascript">
var user = <?= json_encode(Session::get('user')) ?>;
var isTMorCrm = "{{$isTmOrCrm ? 1 : 0}}";
</script>
<script type="text/javascript" src="/js/user/create-account.js"></script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop
