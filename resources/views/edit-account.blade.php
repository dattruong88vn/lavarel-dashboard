@extends('layout.default')

@section('content')
<div class="create-account">
    <input type="hidden" id="csrf-token" name="_token" value="{{csrf_token()}}" />
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Cập nhật tài khoản</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                    <form id="form-create-account">
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
                            <input id="fullName" type="text" class="form-control fullName" name="fullName" placeholder="Họ và tên" value="{{$detailAccount->name or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Địa chỉ email</label>
                            <input id="email" type="text" class="form-control email" name="email" placeholder="Email" value="{{$detailAccount->email or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Số điện thoại</label>
                            <input id="phone" type="text" class="form-control phone" name="phone" placeholder="Số điện thoại" value="{{$detailAccount->phone or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>VoiceIp Extension</label>
                            <input id="voipId" type="text" class="form-control voipId" name="voipId" placeholder="Voice IP Extension" value="{{$detailAccount->voipId or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>VoiceIp Password</label>
                            <input id="voipPassword" type="text" class="form-control voipPassword" name="voipPassword" placeholder="VoiceIp password" value="{{$detailAccount->voipPassword or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Chữ ký Email</label>
                            <textarea id="signature" class="form-control signature" name="signature" placeholder="Chữ ký Email">{{$detailAccount->signature}}</textarea>
                        </div>
                        <div class="form-group has-feedback">
                            <label>Nick Skype</label>
                            <input id="skype" type="text" class="form-control skype" name="skype" placeholder="Nick skype" value="{{$detailAccount->skype or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Nick Zalo</label>
                            <input id="zalo" type="text" class="form-control zalo" name="zalo" placeholder="Nick zalo" value="{{$detailAccount->zalo or ""}}">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Tên tài khoản</label>
                            <input id="username" type="text" class="form-control username" name="username" placeholder="Tên tài khoản" value="{{$detailAccount->userName or ""}}">
                        </div>
                        <input id="userId" type="hidden" value="{{$detailAccount->userId}}">
                        <div class="form-group has-feedback">
                            <label>Mật khẩu</label>
                            <input id="password" type="password" class="form-control password" name="password" value="{{$detailAccount->password}}" placeholder="Mật khẩu">
                        </div>
                        <div class="form-group has-feedback">
                            <label>Xác nhận mật khẩu</label>
                            <input id="confirmPassword" type="password" class="form-control confirmPassword" name="confirmPassword" value="{{$detailAccount->password}}" placeholder="Xác nhận mật khẩu">
                        </div>
                        <div class="box-line">
                            <h3 class="box-title">Liên kết tài khoản Websites</h3>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Nguồn Listing</label>
                                    <select id="source" class="form-control select2" style="width: 100%;">    
                                        <option value="">---Vui lòng chọn---</option>                            
                                        <?php foreach ($userTypeList as $user) : ?>
                                            <option value="{{ $user->id}}" @if(isset($detailAccount->socialUser) && $detailAccount->socialUser->userTypeId == $user->id) selected @endif> {{$user->name}}</option>
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
                                                <option phone="{{$user->phone}}" accountid="{{$user->accountId}}" value="{{$user->socialUid}}" @if(isset($detailAccount->socialUser) && $detailAccount->socialUser->socialUid == $user->socialUid) selected @endif>{{$user->name}}</option>  
                                            <?php endforeach; ?>
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
                                            <option value="{{ $city->cityId }}" @if($city->cityId==$detailAccount->cityId) selected='selected' @endif >{{ $city->cityName }}</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-12">
                                <div class="form-group">
                                    <label>Quận / Huyện</label>
                                    <select name="district" id="district" class="form-control select2 district" style="width: 100%;"  multiple="multiple">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <?php if (Session::get('user')->userId == 1) { ?>
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
                                                        <?php
                                                        $checked = "";
                                                        if ($detailAccount->departments):
                                                            foreach ($detailAccount->departments as $item):
                                                                if ($item->departmentId == $departments->id):
                                                                    $checked = "checked";
                                                                    break;
                                                                else:
                                                                    $checked = "";
                                                                endif;
                                                                ?>

                                                                <?php
                                                            endforeach;
                                                        endif;
                                                        ?>
                                                        <label><input class="{{$departments->parentId>0?'has-parent':''}} choose-department choose-department-{{$departments->id}}" name="choose[]" id="choose" value="{{$departments->id}}" type="checkbox"  data-parent-id="{{$departments->parentId}}" {{$checked}} /> Chọn</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="choose-is-agroupadmin" name="chooseAdmin[]" id="chooseAdmin" value="{{$departments->id}}" type="checkbox">
                                                            <?php
                                                            if ($detailAccount->departments):
                                                                foreach ($detailAccount->departments as $item) :
                                                                    if ($item->departmentId == $departments->id):
                                                                        if ($item->isGroupAdmin == true):
                                                                            ?>
                                                                            <input class="choose-is-agroupadmin" name="chooseAdmin[]" id="chooseAdmin" value="{{$departments->id}}" type="checkbox" checked>
                                                                            <?php
                                                                            break;
                                                                        else:
                                                                            ?>
                                                                            <input class="choose-department" name="choose[]" id="choose" value="{{$departments->id}}" type="checkbox">
                                                                        <?php
                                                                        endif;
                                                                    endif;
                                                                endforeach;

                                                            endif;
                                                            ?>
                                                            Chọn làm admin
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } else { ?>
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
                                            $checkedGroupAdmin = "";

                                            foreach ($detailAccount->departments as $acDeparment) {
                                                if ($acDeparment->departmentId == $department->id) {
                                                    $checked = "checked";
                                                    $isMyDepartments = true;
                                                    if ($acDeparment->isGroupAdmin) {
                                                        $checkedGroupAdmin = "checked";
                                                    }
                                                }
                                            }
                                            ?>
                                            <tr>
                                                <td>
                                                    {{$department->departmentName}}
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="{{$department->parentId?'has-parent':''}} choose-department  choose-department-{{$department->id}} {{$isMyDepartments?"my-department":""}}" name="choose[]" id="choose" value="{{$department->id}}" type="checkbox" {{$checked}} data-parent-id="{{$department->parentId}}">
                                                            Chọn
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="checkbox">
                                                        <label>
                                                            <input class="choose-is-agroupadmin" name="chooseAdmin[]" id="chooseAdmin" value="{{$department->id}}" type="checkbox" {{$checkedGroupAdmin}}  />
                                                            Chọn làm admin
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } ?>
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
                                                    <input type="hidden" id="input_entity" value = "{{$item->id}}" />
                                                    {{$item->name}}
                                                </td>
                                                <?php foreach ($item->actions as $ac): ?>
                                                    <td>
                                                        <input type="hidden" name="{{strtolower($ac->actionName)}}_action" id="input_action" value = "{{$ac->actionId}}" />
                                                        <select id="select_permission" name="{{strtolower($ac->actionName)}}_permission" class="form-control select2" style="width: 100%;">
                                                            <option entityid="-1" actionid="-1" value="-1">--Chọn--</option>
                                                            <?php
                                                            foreach ($ac->permissions as $p):
                                                                $selected = "";
                                                                if (count($detailAccount->privatePermissions) > 0):
                                                                    foreach ($detailAccount->privatePermissions as $private):
                                                                        if ($private->actionId == $ac->actionId && $private->entityId == $item->id && $p->permissionId == $private->permissionId): $selected = "selected";
                                                                        endif;
                                                                    endforeach;
                                                                endif;
                                                                ?>
                                                                <option entityid="{{$item->id}}" actionid="{{$ac->actionId}}" {{$selected}} value="{{$p->permissionId}}">{{$p->permissionName}}</option>
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
                        <button id="finish" class="btn btn-primary">Cập nhật tài khoản</button>
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
<script>
var oldDistrictIds = [
<?php
foreach ($detailAccount->userDistricts as $ds) {
    echo $ds->id->districtId . ',';
}
?>
];
var session_id = <?= Session::get('user')->userId ?>;
var user = <?= json_encode(Session::get('user')) ?>;
var photo = "<?php echo $detailAccount->photo ?>";
var detailAccount = {
    "userId": "<?=$detailAccount->userId ?>"
};
</script>


<script src="{{loadAsset("/js/update-account.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>

<script type="text/javascript">
$(document).ready(function () {
    CKEDITOR.replace('signature');
    CKEDITOR.replace('agent_introduce');
})
</script>

@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
@stop