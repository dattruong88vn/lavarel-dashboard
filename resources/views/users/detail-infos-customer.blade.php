@extends('layout.default')

@section('content')

<div class="detail-infos-customer-page">
    <div class="row">
        <div class="col-md-12 customer-details">
            <div class="col-md-12 customer-image">
                <input type="hidden" id="customerId" value="{{ $userInfor->customerId }}"/>
                <?php if($userInfor->photo): ?>
                    <img class="img-photo" src="{{ $userInfor->photo }}" alt="" title="">
                <?php else: ?>
                    <img class="img-photo" src="/images/icon-12.png" alt="" title="">
                <?php endif ?>
                <p class="customer-name">{{ $userInfor->name }}</p>
            </div>
        </div>
    </div>
    <div class="row body-infos-customer">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="row col-md-12 head-detail">
                        <p class="box-title">Thông tin</p>
                        <button id="update-password" style="margin-left: 20px;" class="pull-right btn btn-add btn-primary">Reset mật khẩu</button>
                        <button id="edit-infos" style="margin-left: 20px;" class="pull-right btn btn-add btn-warning">Cập nhật</button>
                        <select id="status-customer" class="pull-right status-customer form-control" name="status_customer">
                            <option value="1">Chờ duyệt</option>
                            <option value="2">Đang hoạt động</option>
                            <option value="3">Khóa</option>
                        </select>
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
                                <p>Chỉnh sửa bởi</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>
                                    <?php if($emails): ?>
                                        <?php foreach ($emails as $key => $email): ?>
                                            {{ $email->email }}
                                            <?php if($email->isPrimary == true):  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if($key !== count($emails)-1): ?>
                                                , 
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>
                                    <?php if($phones): ?>
                                        <?php foreach ($phones as $key => $phone): ?>
                                            {{ $phone->phone }}
                                            <?php if($phone->isPrimary == true):  ?>
                                                <sup class="prefered-item"><i class="fa fa-star"></i></sup>
                                            <?php endif; ?>
                                            <?php if($key !== count($phones)-1): ?>
                                                , 
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->updateByName }}</p>
                            </div>
                        </div>
                        <div class="row col-md-12 title-col">
                            <div class="col-md-4">
                                <p>CMND/CCCD</p>
                            </div>
                            <div class="col-md-4">
                                <p>Địa chỉ</p>
                            </div>
                            <div class="col-md-4">
                                <p>Lần mua BĐS gần nhất</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>{{ $userInfor->cmnd }}</p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->address }}</p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ date('d-m-Y', $userInfor->lastActivityDate/1000) }}</p>
                            </div>
                        </div>
                        <div class="row col-md-12 title-col">
                            <div class="col-md-4">
                                <p>Đối tượng / Nguồn</p>
                            </div>
                            <div class="col-md-4">
                                <p>Ngày tham gia</p>
                            </div>
                            <div class="col-md-4">
                                <p>Tài khoản</p>
                            </div>
                        </div>
                        <div class="row col-md-12">
                            <div class="col-md-4">
                                <p>
                                    Khách mua / 
                                    <?php foreach ($sources as $key => $source): ?>
                                        {{ $source->sourceName }}
                                        <?php if($key !== count($sources)-1): ?>
                                            , 
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ date('d-m-Y', $userInfor->startDate/1000) }}</p>
                            </div>
                            <div class="col-md-4">
                                <p>{{ $userInfor->userName }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="table-list">
                        <h3>Bất động sản đã đăng</h3>
                        <div class="group-button-deal text-center">
                            <div class="group-button-deal text-center">
                                @foreach ($deal_buttons as $button)
                                    @if (!empty($button->childList) && $button->numberOfDeals !=0)
                                        <div class="btn-group btn-see">
                                            <button onclick="showData('{{$userInfor->customerId}}',{{$button->statusId }});" type="button" class="btn btn-default">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                <span class="caret"></span>
                                                <span class="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul class="dropdown-menu" role="menu">
                                                @foreach ($button->childList as $child_button)
                                                    <li><a onclick="showData('{{$userInfor->customerId}}',{{$button->statusId}}, {{ $child_button->statusId }});" >{{ $child_button->statusName }} ({{ $child_button->numberOfDeals }})</a></li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    @else 
                                        <button onclick="showData('{{$userInfor->customerId}}',{{$button->statusId }});" type="button" class="btn btn-default">{{ $button->statusName }} ({{ $button->numberOfDeals }})</button>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="box-body">
                        <table id="data-detail-transaction" class="display" style="width:100%">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- modal -->
<div id="updateInfosContactsCustomer" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content update-infos-contacts-customer">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
                <h4 class="modal-title">Thông tin tài khoản</h4>
            </div>
            <div class="modal-body">
                <div id="contacts-infos" class="form-group row contacts-infos">
                    <form id="form-update-infos-customer">
                        <div class="col-md-3">
                            <?php if($userInfor->photo): ?>
                                <img class="img-photo" src="{{ $userInfor->photo }}" alt="" title="">
                            <?php else: ?>
                                <img class="img-photo" src="/images/icon-12.png" alt="" title="">
                            <?php endif ?>
                        </div>
                        <div class="col-md-9">
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Ảnh đại diện</div>
                            </div>
                            <div class="form-row row">
                                <input type="file" name="file_data" id="file_data" class="form-control">
                                <input type="hidden" name="photo" id="photo" value="{{ $userInfor->photo }}">
                            </div>
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Họ và Tên <span class="required">(*)</span></div>
                            </div>
                            <div class="form-row row">
                                <input id="name" name="name" class="form-control" type="text" value="{{ $userInfor->name }}"/>
                                <div class="errors"></div>
                            </div>
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Email <span class="required">(*)</span></div>
                            </div>
                            @if(count($emails) > 0)
                                <div class="form-group wrapEmailProfile">
                                    @foreach($emails as $email)
                                    <div class="row have-emails">
                                        <div class="col-md-6">
                                            <input type="text" name="email" value="{{ $email->email }}" class="form-control email_text">
                                            <div class="errors"></div>
                                        </div>
                                        <div class="col-md-6">
                                            <select name="primaryEmail" onchange="changePrimaryEmail(this)" class="form-control">
                                                <option value="0">Email phụ</option>
                                                <option
                                                    @if($email->isPrimary)
                                                        selected
                                                    @endif
                                                value="1">Email chính</option>
                                            </select>
                                        </div>
                                    </div>
                                    @endforeach
                                    <a onclick="addMoreEmailCustomerProfile(this);return false;" href="#">Thêm email</a>
                                </div>
                            @else
                                <div class="form-group wrapEmailProfile">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input type="text" name="email" class="form-control email_text">
                                            <div class="errors"></div>
                                        </div>
                                        <div class="col-md-6">
                                            <select name="primaryEmail" onchange="changePrimaryEmail(this)" class="form-control">
                                                <option value="1">Email chính</option>
                                                <option value="0">Email phụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <a onclick="addMoreEmailCustomerProfile(this);return false;" href="#">Thêm email</a>
                                </div>
                            @endif
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Phone <span class="required">(*)</span></div>
                            </div>
                            @if(count($phones) > 0)
                                <div class="form-group wrapPhoneProfile">
                                    @foreach($phones as $phone)
                                    <div class="row have-phones">
                                        <div class="col-md-6">
                                            <input type="text" name="phone" value="{{ $phone->phone }}" class="form-control phone_num">
                                            <div class="errors"></div>
                                        </div>
                                        <div class="col-md-6">
                                            <select name="primaryPhone" onchange="changePrimary(this)" class="form-control">
                                                <option value="0">Số phụ</option>
                                                <option
                                                    @if($phone->isPrimary)
                                                        selected
                                                    @endif
                                                value="1">Số chính</option>
                                            </select>
                                        </div>
                                    </div>
                                    @endforeach
                                    <a onclick="addMorePhoneCustomerProfile(this);return false;" href="#">Thêm số điện thoại</a>
                                </div>
                            @else
                                <div class="form-group wrapPhoneProfile">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <input type="text" name="phone" class="form-control phone_num">
                                            <div class="errors"></div>
                                        </div>
                                        <div class="col-md-6">
                                            <select name="primaryPhone" onchange="changePrimary(this)" class="form-control">
                                                <option value="1">Số chính</option>
                                                <option value="0">Số phụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <a onclick="addMorePhoneCustomerProfile(this);return false;" href="#">Thêm số điện thoại</a>
                                </div>
                            @endif
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">CMND/CCCD <span class="required">(*)</span></div>
                            </div>
                            <div class="form-row row">
                                <input id="cmnd" name="cmnd" class="form-control" type="text" value="{{ $userInfor->cmnd }}"/>
                                <div class="errors"></div>
                            </div>
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Địa chỉ <span class="required">(*)</span></div>
                            </div>
                            <div class="form-row row departmentIds">
                                <input id="address" name="address" class="form-control" type="text" value="{{ $userInfor->address }}"/>
                                <div class="errors"></div>
                            </div>
                            <!--<div class="form-row row">
                                <div class="row col-md-12 title-col">Tài khoản</div>
                            </div>
                            <div class="form-row row">
                                <input id="userName" name="userName" class="form-control" type="text" value="{{ $userInfor->userName }}"/>
                                <div class="errors"></div>
                            </div>-->
                            <div class="form-row row">
                                <div class="row col-md-12 title-col">Ngày tham gia</div>
                            </div>
                            <div class="form-row row">
                                <input id="startDate" name="startDate" class="form-control" type="text" value="{{ date('d-m-Y', $userInfor->startDate/1000) }}"/>
                                <div class="errors"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button id="update-infos" type="button" class="btn btn-primary btn-update-infos">Cập nhật</button>
                <button id="cancel-update-infos" type="button" class="btn cancel-update-infos">Bỏ qua</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

@endsection

@section('page-js')

<script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
<script src="{{loadAsset("/plugins/selectize.js/dist/js/standalone/selectize.min.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-validation/dist/jquery.validate.js")}}"></script>
<script src="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.js")}}"></script>
<script src="{{loadAsset("/plugins/jquery-dateformat/jquery-dateFormat.js")}}"></script>
<script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>
<script src="{{loadAsset("/js/user/detail-infos-customer.js")}}"></script>
<script type="text/javascript">
    var inputAllowNumber = function(input, allowSeparator){
        allowSeparator = (typeof allowSeparator !== 'undefined' ? allowSeparator : true);
        if($.isArray(input)) {
            $.each(input,function(index,element) {
                $(element).on('input', function () {
                    var text = $(this).val().match(/[\d]/g);
                    if(allowSeparator)
                    	var text = $(this).val().match(/[\d\.]/g);
                    text = !!text ? text.join("") : "";
                    $(this).val(text);
                });
            });
        }else{
            $(input).on('input', function () {
                var text = $(this).val().match(/[\d]/g);
                if(allowSeparator)
                    var text = $(this).val().match(/[\d\.]/g);
                text = !!text ? text.join("") : "";
                $(this).val(text);
            });
		}
	};
    function changePrimary(element){
        if($(element).val() == 1){
            $('.wrapPhoneProfile').find('select').not(element).val(0);
        }
    }
    function addMorePhoneCustomerProfile(element){
        let parent = $(element).parent('.form-group');
        let sibling = $(element).siblings('.row:first-child');
        let elementAdd = '<div class="row rowMorePhone">'+sibling.html()+'</div>';
        parent.append(elementAdd);
        $('.rowMorePhone:last-child').find('input').val('');
        $('.rowMorePhone:last-child').find('select').val(0);
        inputAllowNumber(".phone_num",false);
    }
    
    function changePrimaryEmail(element){
        if($(element).val() == 1){
            $('.wrapEmailProfile').find('select').not(element).val(0);
        }
    }
    function addMoreEmailCustomerProfile(element){
        let parent = $(element).parent('.form-group');
        let sibling = $(element).siblings('.row:first-child');
        let elementAdd = '<div class="row rowMoreEmail">'+sibling.html()+'</div>';
        parent.append(elementAdd);
        $('.rowMoreEmail:last-child').find('input').val('');
        $('.rowMoreEmail:last-child').find('select').val(0);
    }
    
    $(document).ready(function(){
        $('#file_data').change(function(){
            var formData = new FormData();
            formData.append('file_data', $('#file_data')[0].files[0]);

            $.ajax({
                   url : '/user/upload-avatar-get-url',
                   type : 'POST',
                   data : formData,
                   processData: false,  // tell jQuery not to process the data
                   contentType: false,  // tell jQuery not to set contentType
                   success : function(data) {
                        $('#photo').val(data == '' ? null : data)
                       console.log(data);
                   }
            });
        })
    })
</script>
@stop
@section('page-css')
<link href = "{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.css")}}" rel = "stylesheet" type = "text/css" />
<link href="{{loadAsset("/plugins/bootstrap-fileinput/fileinput.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/selectize.js/dist/css/selectize.css")}}" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/css/user-role/detail-infos-customer.css")}}" rel="stylesheet" type="text/css" />
<link href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
<link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css"/>

@stop
