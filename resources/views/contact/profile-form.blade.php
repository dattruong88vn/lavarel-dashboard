<style type="text/css">
    .prop-hidden {
        margin: 0px !important;
        padding: 0px !important;
        display: none !important;
    }
</style>
<div class="box-body">
    <form id="form-invite-contacts" class="form-horizontal">
        <div class="row">
            <div class="col-md-10">                
                <div class="form-group">
                    <label for="realName" class="col-md-4 control-label">Họ và tên <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <input id="realName" class="form-control" name="realName" placeholder="Nhập họ và tên (trên CMND/CCCD)" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="fullName" class="col-md-4 control-label">Tên tài khoản <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <input id="fullName" class="form-control" name="fullName" placeholder="Nhập tên người dùng" />
                        <input id="profileId" name="profileId" value="{{$profileId}}" type="hidden" />
                    </div>
                </div>
                @if ($profileId > 0)
                <div class="form-group">
                    <label for="username" class="col-md-4 control-label">Username <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <input id="username" class="form-control" value="" name="username" placeholder="Username" />
                    </div>
                </div>
                @endif
                <div class="form-group">
                    <label for="employeeCode" class="col-md-4 control-label">MSNV</label>
                    <div class="col-md-8">
                        <input id="employeeCode" class="form-control" name="employeeCode" placeholder="MSNV" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="invite_email" class="col-md-4 control-label">Email <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <input type="email" id="invite_email" class="form-control invite-input invite-email" name="invite_email" placeholder="Email" />
                    </div>
                </div>

                <div id="alternativePhones">
                    <div class="form-group">
                        <label for="invite_phone" class="col-md-4 control-label">Số điện thoại <span class="required">(*)</span></label>
                        <div class="col-md-8">
                            <div id="phone_container">
                                <div class="row" style="margin-top: 10px;">
                                    <div class="col-md-6">
                                        <input class="form-control invite-input invite-phone" name="invite_phone" placeholder="Số điện thoại" />
                                    </div>
                                    <div class="col-md-4" style="padding-top: 7px">
                                        <input type="checkbox" class="chkPhoneNumberIsMain" value="" checked />
                                        <label for="chkPhoneNumberIsMain">số chính</label>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <button type="button" class="btn btn-danger phone-remove"><i class="fa fa-minus" title="Xóa số điện thoại"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 20px;">

                                <button type="button" class="btn btn-secondary" id="phone-add"><i class="fa fa-plus" title="Thêm số điện thoại"></i> Thêm số điện thoại</button>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label class="col-md-4 control-label"></label>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chkBuy" name="chkBuy" /> Mua-bán
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="chkRent" name="chkRent" /> Thuê
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="startDate" class="col-md-4 control-label">Ngày vào làm <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <input id="startDate" class="form-control" name="startDate" placeholder="Ngày vào làm" />
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="zoneIds" class="col-md-4 control-label">Zone</label>
                    <div class="col-md-4">
                        <div id="zoneIds_container"><select id="zoneIds" class="form-control" name="zoneIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                    <div class="col-md-2" style="padding: 0px; padding-top: 7px">
                        <input type="checkbox" id="all-zone" name="all-zone" value="1">
                        <label for="all-zone">Tất cả</label>
                    </div>
                    <div class="col-md-2" style="padding: 0px; padding-top: 7px">
                        <input type="checkbox" id="manage-zone" name="manage-zone" value="1">
                        <label for="manage-zone">Quản lý</label>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="teamIds" class="col-md-4 control-label">Team</label>
                    <div class="col-md-4">
                        <div id="teamIds_container"><select class="form-control" id="teamIds" name="teamIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                    <div class="col-md-2" style="padding: 0px; padding-top: 7px">
                        <input type="checkbox" id="all-team" name="all-team" value="1">
                        <label for="all-team">Tất cả</label>
                    </div>
                    <div class="col-md-2" style="padding: 0px; padding-top: 7px">
                        <input type="checkbox" id="manage-team" name="manage-team" value="1">
                        <label for="manage-team">Quản lý</label>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="tcIds" class="col-md-4 control-label">TCs <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <div id="tcIds_container"><select id="tcIds" class="form-control" name="tcIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="cityIds" class="col-md-4 control-label">Thành phố <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <div id="cityIds_container"><select id="cityIds" class="form-control" name="cityIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="districtIds" class="col-md-4 control-label">Quận/huyện quản lý <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <div id="districtIds_container"><select id="districtIds" class="form-control" name="districtIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="wardIds" class="col-md-4 control-label">Phường/xã quản lý</span></label>
                    <div class="col-md-8">
                        <div id="wardIds_select_container"></div>
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="departmentIds" class="col-md-4 control-label">Bộ phận <span class="required">(*)</span></label>
                    <div class="col-md-6">
                        <div id="container_departmentIds"><select id="departmentIds" class="form-control" name="departmentIds[]" multiple="multiple"></select></div>
                        <div class="errors"></div>
                    </div>
                    <div class="col-md-2 manage-department-checkbox" style="padding: 0px; padding-top: 7px">
                        <input type="checkbox" id="manage-department" name="manage-department" value="1">
                        <label for="manage-department">Quản lý</label>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label class="col-md-4 control-label">Chức vụ <span class="required">(*)</span></label>
                    <div class="col-md-8">
                        <div id="positionIds_select_container"></div>
                        <input type="hidden" id="position_required" name="position_required" value="" />
                        <div class="errors"></div>
                    </div>
                </div>

                <hr class="{{$classVisiable}}">

                <h5 id="agent_info" class="{{$classVisiable}}" style="font-weight: bold; margin-bottom: 30px; padding-left: 15px">Thông tin hồ sơ chuyên viên môi giới 
                </h5>
                

                <div class="{{$classVisiable}}">
                    <label for="avatar-profile" class="col-md-4 control-label">Hình ảnh trên hồ sơ</label>
                    <div class="col-md-8">
                        <div style="width: 200px; cursor: pointer; position: relative;" onclick="$('#avatarProfileImage').click();">
                            <img id="avatar_profile_photo" style="width: 100%; height: 100%;" />
                            <div style="position: absolute; top: 10px; right: 10px; width: 30px;  height: 30px; border-radius: 50%; background: #535559; display: flex; align-items: center; justify-content: center;">
                                <img  src="/images/icon_camera.png" style="width: 50%;"/>
                            </div>
                        </div>
                            <input id="avatarProfileImage" class="form-control" name="avatarProfileImage" style="display: none;" type="file">
                        <div class="errors"></div>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="agent_position" class="col-md-4 control-label">Vị trí</label>
                    <div class="col-md-8">
                    <select id="agent_position" name="agent_position" class="form-control">
                            <option value="0">--- Chọn ---</option>
                            @foreach($userTitleList as $title)
                            <option value="{{$title->id}}">{{$title->name}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="agent_introduce" class="col-md-4 control-label">Giới thiệu</label>
                    <div class="col-md-8">
                        <input id="agent_introduce" class="form-control" name="agent_introduce" style="width: 100%;" placeholder="Giới thiệu" rows="3"></input>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="social-network" class="col-md-4 control-label">Mạng xã hội</label>
                    <div class="col-md-8">
                        <div id="social_network_container">
                        </div>
                        <div class="row" style="margin-top: 10px;">
                            <div class="col-md-3">
                                <button type="button" class="btn btn-secondary" id="social-network-add"><i class="fa fa-plus" title="Thêm số điện thoại"></i> Thêm mạng xã hội</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="{{$classVisiable}}">

                <div class="{{$classVisiable}}">
                    <label class="col-md-4 control-label"></label>
                    <div class="col-md-8">
                        <h5>Liên kết tài khoản website</h5>
                    </div>
                </div>
                <div class="{{$classVisiable}}" id="isDisplayUserPortal" style="display:none">
                    <label class="col-md-4 control-label"></label>
                    <div class="col-md-8">
                        <input type="checkbox" id="isUserPortal" name="isUserPortal" value="1">
                        <label for="isUserPortal">Tạo tài khoản portal</label>
                    </div>
                </div>
                <div class="{{$classVisiable}}">
                    <label for="agent" class="col-md-4 control-label">Nguồn listing</label>
                    <div class="col-md-4">
                        <select id="userTypeId" name="userTypeId" class="form-control">
                            <option value="">---chọn---</option>
                            @foreach($userTypeList as $type)
                            <option value="{{$type->id}}">{{$type->name}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control select2" style="width: 100%;" name="listUser" id="listUser" placeholder="Nhập tên">
                            <option>---Vui Lòng chọn---</option>
                        </select>
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="voipId" class="col-md-4 control-label">Voip Id</label>
                    <div class="col-md-8">
                        <input id="voipId" class="form-control" name="voipId" type="number" placeholder="Voip Id" />
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="voipPassword" class="col-md-4 control-label">Voip Password</label>
                    <div class="col-md-8">
                        <input id="voipPassword" class="form-control" name="callId" placeholder="Voip Password" />
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="voip3CXID" class="col-md-4 control-label">Voip3CX Id</label>
                    <div class="col-md-8">
                        <input id="voip3CXID" class="form-control" name="voip3CXID" type="number" placeholder="Voip3CX Id" />
                    </div>
                </div>

                <div class="{{$classVisiable}}">
                    <label for="voip3CXPassword" class="col-md-4 control-label">Voip3CX Password</label>
                    <div class="col-md-8">
                        <input id="voip3CXPassword" class="form-control" name="voip3CXPassword" placeholder="Voip3CX Password" />
                    </div>
                </div>

                <div class="form-group">
                    <label for="emailSignature" class="col-md-4 control-label">Chữ ký email</label>
                    <div class="col-md-8">
                        <textarea id="signature" class="form-control" name="signature" style="width: 100%;" placeholder="Chữ ký email" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div class="col-md-2 text-center">
                <div class="avatar">
                    <img id="imgPhoto" class="img-circle" onclick="$('#image_file').click();" src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg" />
                    <input type="file" id="image_file" style="display: none;" name="avatar" accept="image/*" />
                    <input type="hidden" name="photo" id="photo" />
                </div>
            </div>
        </div>
        @if ($profileId <= 0) <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <button type="button" id="add-contacts" class="btn btn-add btn-primary add-contacts">Tạo người dùng</button>
            </div>
            <div class="col-md-4"></div>
</div>
@endif
</form>
</div>