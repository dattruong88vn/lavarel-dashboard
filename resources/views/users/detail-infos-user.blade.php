@extends('layout.default')
@section('content')
<div class="detail-infos-user-page">
    <div class="row">
        <div class="col-md-12 user-details">
            <div class="col-md-12 user-image">
                <input type="hidden" id="userId" value="{{ $userInfor->userId }}" />
                <input type="hidden" id="statusId" value="{{ $userInfor->statusId }}" />
                <input type="hidden" id="userName" value="{{ $userInfor->userName }}" />
                <?php if ($userInfor->photo) : ?>
                    <img class="img-photo" src="{{ $userInfor->photo }}" alt="" title="">
                <?php else : ?>
                    <img class="img-photo" src="/images/icon-12.png" alt="" title="">
                <?php endif ?>
                <?php if ($userInfor->statusId == 1) : ?>
                    <p class="status-pending"><i class="fa fa-circle"></i> Pending</p>
                <?php elseif ($userInfor->statusId == 2) : ?>
                    <p class="status-active"><i class="fa fa-circle"></i> Active</p>
                <?php elseif ($userInfor->statusId == 3) : ?>
                    <p class="status-blocked"><i class="fa fa-circle"></i> Blocked</p>
                <?php endif ?>
                <p class="user-name">{{ $userInfor->name }}</p>

            </div>
        </div>
        <div class="col-md-12">
            <div class="col-md-12 area-manage">
                <div class="row">
                    <h4>Khu vực quản lý: </h4>
                    @foreach ($districts as $key => $district)
                    <div class=" col-md-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">{{ $district->districtName }}
                                @if ($district->isPrimary == true)
                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                @endif
                            </div>
                            <div class="panel-body">
                                <ul>
                                    @foreach ($district->wards as $ward)
                                    <li>{{$ward->wardName}}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 infos-contents">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="row col-md-12 head-detail">
                        <p class="box-title">Thông tin</p>
                        <button id="update-password" style="margin-left: 20px;" class="pull-right btn btn-add btn-primary">Đổi mật khẩu</button>
                        <button id="edit-infos" style="margin-left: 20px;" class="pull-right btn btn-add btn-warning">Chỉnh sửa</button>
                        @if(request()->path() != 'user/profile')
                        <button {{ $currentUser->userRole == 'ASM' ? 'style=pointer-events:none;opacity:0.4;margin-left:20px;' : 'style=margin-left:20px;'}}
                        id="btn-show-permissions" class="pull-right btn btn-add btn-primary">Quyền</button>
                        <select style="margin-left: 20px;" id="status-user" class="pull-right status-user form-control" name="status_user">
                            <option {{ $userInfor->statusId == 1 ? 'selected' : ''}} value="1">Chờ duyệt</option>
                            <option {{ $userInfor->statusId == 2 ? 'selected' : ''}} value="2">Đang hoạt động</option>
                            <option {{ $userInfor->statusId == 3 ? 'selected' : ''}} value="3">Khóa</option>
                        </select>
                        <div {{ $currentUser->userRole == 'ASM' ? 'style=pointer-events:none;opacity:0.4;margin-left:20px;' : 'style=margin-left:20px;'}} 
                         class="hidden-sm hidden-xs pull-right">
                            <div id="keep-open" class="inline position-relative dropdown">
                                <button id="check-roles" class="btn btn-minier btn-primary" data-toggle="dropdown" data-position="auto">Chức vụ đang có<i class="ace-icon fa fa-angle-down bigger-110"></i></button>
                                <ul class="dropdown-role dropdown-menu dropdown-only-icon dropdown-menu-right dropdown-caret dropdown-close">
                                    <?php foreach ($allPositions as $itemPosition) : ?>
                                        <?php
                                        $checked = "";
                                        if ($positions && count($positions) > 0) {
                                            foreach ($positions as $position) {
                                                if ($position->positionId == $itemPosition->positionId) {
                                                    $checked = 'checked="checked"';
                                                }
                                            }
                                        }
                                        ?>
                                        <li onclick="event.stopPropagation();"><label class="checkbox"><input {{ $checked }} onclick="updatePositionsContact(event,this);" class="data-position" type="checkbox" data-userId="{{ $userInfor->userId }}" value="{{ $itemPosition->positionId }}" />{{ $itemPosition->positionName }}</label></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        </div>
                        @endif
                    </div>
                    <div class="row info-head">
                        <div class="row col-md-12 title-col">
                            <div class="col-md-4">
                                <p>Email</p>
                            </div>
                            <div class="col-md-4">
                                <p>Số điện thoại</p>
                            </div>
                            <div class="col-md-4">
                                <p>Call ID</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>
                                    <?php if ($emails) : ?>
                                        <?php foreach ($emails as $key => $email) : ?>
                                            <span>{{ $email->email }}</span>
                                            <?php if ($email->isPrimary == true) :  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if ($key !== count($emails) - 1) : ?>
                                                ,
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>
                                    <?php if ($phones) : ?>
                                        <?php foreach ($phones as $key => $phone) : ?>
                                            <span>{{ $phone->phone }}</span>
                                            <?php if ($phone->isPrimary == true) :  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if ($key !== count($phones) - 1) : ?>
                                                ,
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->callId }}</p>
                            </div>
                        </div>
                        <div class="row col-md-12 title-col">
                            <div class="col-md-4">
                                <p>Phòng ban</p>
                            </div>
                            <div class="col-md-4">
                                <p>TC</p>
                            </div>
                            <div class="col-md-4">
                                <p>Ngày vào làm</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>
                                    <?php if ($listDepartments) : ?>
                                        <?php foreach ($listDepartments as $key => $department) : ?>
                                            <span>{{ $department->departmentName }}</span>
                                            <?php if ($department->isPrimary == true) :  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if ($key !== count($listDepartments) - 1) : ?>
                                                ,
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>
                                    <?php if ($tcs) : ?>
                                        <?php foreach ($tcs as $key => $tc) : ?>
                                            <span>{{ $tc->tcName }}</span>
                                            <?php if ($tc->isPrimary == true) :  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if ($key !== count($tcs) - 1) : ?>
                                                ,
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->startDate?date('d-m-Y', $userInfor->startDate/1000):'N/A' }}</p>
                            </div>
                        </div>
                        <div class="row col-md-12 title-col">
                            <div class="col-md-4">
                                <p>Vị trí</p>
                            </div>
                            <div class="col-md-4">
                                <p>Thành viên</p>
                            </div>
                            <div class="col-md-4">
                                <p>Lần đăng nhập gần nhất</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>
                                    <?php if ($positions) : ?>
                                        <?php foreach ($positions as $key => $position) : ?>
                                            <span>{{ $position->positionName }}</span>
                                            <?php if ($position->isPrimary == true) :  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if ($key !== count($positions) - 1) : ?>
                                                ,
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>
                                    <?php if ($groups) : ?>
                                        <?php foreach ($groups as $key => $group) : ?>
                                            <?php if ($key < 3) : ?>
                                                <span>{{ $group->name }}</span>,
                                            <?php endif; ?>
                                            <?php endforeach; ?>...
                                        <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->lastActivityDate }}</p>
                            </div>
                        </div>
                    </div>
                    @if(request()->path() != 'user/profile')
                    {{-- <div class="table-list">
                        <h3>Tổng quan giao dịch</h3>
                        <div class="group-button-deal text-center">
                            @foreach ($deal_buttons as $button)
                            @if (!empty($button->childList) && $button->numberOfDeals !=0)
                            <div class="btn-group btn-see">
                                <button onclick="showData({{$userInfor->userId}},{{$button->statusId }});" type="button" class="btn btn-default">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                    <span class="caret"></span>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    @foreach ($button->childList as $child_button)
                                    <li><a onclick="showData({{$userInfor->userId}},{{$button->statusId}}, {{ $child_button->statusId }});">{{ $child_button->statusName }} ({{ $child_button->numberOfDeals }})</a></li>
                                    @endforeach
                                </ul>
                            </div>
                            @else
                            <button onclick="showData({{$userInfor->userId}},{{$button->statusId }});" type="button" class="btn btn-default">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
                            @endif
                            @endforeach
                        </div>
                    </div> --}}
                    {{-- <div class="box-body">
                        <table id="data-detail" class="display table table-bordered table-striped" style="width:100%">
                            <thead>
                                <tr>
                                    <th>ID Lead/Deal</th>
                                    <th>Tên KH</th>
                                    <th>Trạng thái</th>
                                    <th>Tiến độ</th>
                                    <th>TM Name</th>
                                    <th>Ngày tạo deal</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div> --}}
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
<!-- modal: update info user -->
<div id="updateInfosContacts" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content update-infos-contacts-user">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Thông tin tài khoản</h4>
            </div>
            <div class="modal-body">
                @php
                echo App\Http\Controllers\ContactController::profileForm($userInfor->userId);
                @endphp
            </div>
            <div class="modal-footer">
                <?php if ($selfUpdate == false) : ?>
                    <button id="unpublic-infos" type="button" class="btn btn-danger btn-update-infos hide">Ngừng xuất bản hồ sơ</button>
                    <button id="public-infos" type="button" class="btn btn-success btn-update-infos hide"> Lưu và Xuất bản hồ sơ</button>
                <?php endif ?>
                <button id="update-infos" type="button" class="btn btn-primary btn-update-infos">Lưu</button>
                <button id="cancel-update-infos" type="button" class="btn cancel-update-infos">Bỏ qua</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
<!-- change password -->
<div id="updatePassword" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content update-pass-contacts-user">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Thay đổi mật khẩu</h4>
            </div>
            <div class="modal-body">
                <div id="contacts-infos" class="form-group row contacts-pass">
                    <p class="p-text">Nhập mật khẩu mới và xác nhận <br> để thay đổi</p>
                    <form class="form-user-change-pass" id="form-update-pass-user">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="bl-div div-password">
                                    <input id="user_pass_old" name="old_password" type="password" class="form-control" placeholder="Mật khẩu cũ">
                                    <div class="errors old-password-errors"></div>
                                    <span class="span-eyes"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="bl-div div-password">
                                    <input id="user_pass" name="password" type="password" class="form-control" placeholder="Mật khẩu mới">
                                    <div class="errors password-errors"></div>
                                    <span class="span-eyes"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <div class="bl-div div-password">
                                    <input id="user_repass" name="confirm_password" type="password" class="form-control" placeholder="Nhập lại mật khẩu mới">
                                    <div class="errors confirm_password-errors"></div>
                                    <span class="span-eyes"></span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button id="update-pass" type="button" class="btn btn-primary btn-update-pass">Lưu</button>
            </div>
        </div>
    </div>
</div>
<!-- /.modal -->
@include("users.modal-my-permissions")
@include("users.blc-choose-district-model")
@include("users.transfer-listings-modal")
@include("users.transfer-deals-modal")
@include("users.receive-listings-modal")
@include("users.confirm-bsa-modal")
@include("users.modal-confirm-public")
@include("users.modal-confirm-unpublic")
@endsection
@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/ckeditor/ckeditor.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/js/user/detail-infos-user2.js")}}"></script>
<script src="{{loadAsset("/js/user/invite-contacts2.js")}}"></script>
<script src="{{loadAsset("/js/helper.js")}}"></script> 

<script type="text/javascript">
    function changePrimary(element) {
        if ($(element).val() == 1) {
            $('#alternativePhones').find('select').not(element).val(0);
        }
    }
    const addNewPhone = () => {
        $('#alternativePhones').append(
            `<div class="form-group">
				<label class="col-md-4 control-label"></label>
				<div class="col-md-5">
					<input class="form-control phone_num" name="phone" placeholder="Số điện thoại" />
				</div>
				<div class="col-md-3">
					<select class="form-control" name="primaryPhone" onchange="changePrimary(this)">
						<option value="1">Số chính</option>
						<option value="0" selected>Số phụ</option>
					</select>
				</div>
			</div>`
        );
        $('.phone_num').phoneBasic();
    };
    $(document).ready(function() {
        CKEDITOR.replace('signature');
        CKEDITOR.replace('agent_introduce');
        $('#image_file').change(function() {
            var formData = new FormData();
            formData.append('file_data', $('#image_file')[0].files[0]);
            $.ajax({
                url: '/user/upload-avatar-get-url',
                type: 'POST',
                data: formData,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function(data) {
                    $('#photo').val(data == '' ? null : data)
                    $('#imgPhoto').attr('src', data);
                }
            });
        })
    })
</script>
@stop
@section('page-css')
<link href="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/user-role/detail-infos-user.css")}}" rel="stylesheet" type="text/css" />
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
@stop