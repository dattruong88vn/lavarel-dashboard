@extends('layout.default')

@section('content')
    <div class='dashboard'>
        <section>
            <h1>Nhu Cầu Tìm kiếm</h1>
        </section>
        <section>
            <div class="box box-warning">
                <div class="box-body">
                    <form action="{{ $post_url }}" id="frmCreateRequest" name="frmCreateRequest" method="post" role="form">
                        {{ csrf_field() }}
                        <input type="hidden" id="frmName" name="frmName" value="frmCreateRequest">
                        <input type="hidden" id="requestId" name="requestId" value="<?= df_ref($requestId); ?>">
                        <input type="hidden" id="customerId" name="customerId" value="<?= df_ref($customerId); ?>">
                        <div class="form-group has-success">
                            <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>Thông tin Khách Hàng</label>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Họ Tên</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                           value="{{ df_ref($customeData['name']) }}"
                                           placeholder="Họ và tên" tabindex="1" autofocus>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Nghề Nghiệp</label>
                                    <input type="text" id="job" name="job" class="form-control"
                                           value="{{ df_ref($customeData['job']) }}"
                                           placeholder="Nghề nghiệp" tabindex="4">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Tuổi</label>
                                    <input type="text" id="age" name="age" class="form-control"
                                           value="{{ df_ref($customeData['age']) }}"
                                           placeholder="Tuổi" tabindex="7">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label id="exValidate" name="exValidate">Điện Thoại</label>
                                    <input type="text" id="phone" name="phone" class="form-control"
                                           value="{{ df_ref($customeData['phone']) }}"
                                           placeholder="Số điện thoại" tabindex="2">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Nơi Công Tác</label>
                                    <input type="text" id="workingPlace" name="workingPlace" class="form-control"
                                           value="{{ df_ref($customeData['workingPlace']) }}"
                                           placeholder="Nơi công tác" tabindex="5">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Giới Tính</label>
                                    <div class="radio">
                                        <label><input type="radio" id="gender_1" name="gender" value="male"
                                                      <?= df_ref($customeData['gender']) == 'male' ? 'checked="true"' : ''; ?> tabindex="8"> Nam</label>
                                        <label><input type="radio" id="gender_2" name="gender" value="female"
                                                      <?= df_ref($customeData['gender']) == 'female' ? 'checked="true"' : 'false'; ?>> Nữ</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="text" id="email" name="email" class="form-control"
                                           value="{{ df_ref($customeData['email']) }}"
                                           placeholder="Email" tabindex="3">
                                    <input type="hidden" id="oldEmail" value="{{ df_ref($customeData['email']) }}" />
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label>Liên hệ từ nguồn</label>
                                    <input type="text" id="source" name="source" class="form-control"
                                           value="{{ df_ref($customeData['source']) }}"
                                           placeholder="Liên hệ từ nguồn" tabindex="6">
                                </div>
                            </div>
                        </div>

                        <div class="form-group has-success">
                            <label class="control-label" for="inputSuccess"><i class="fa fa-check"></i>Thông tin, yêu cầu tìm kiếm</label>
                        </div>

                        @include('request-manager.sub-items.html-search-listing-form')

                        <div class="box-footer">
                            @if($allow_assign == 2)
                                <button type="submit" class="btn btn-primary pull-right">Save & Search</button>
                            @else
                                <button type="submit" class="btn btn-primary pull-right">Save</button>
                            @endif
                            <button type="reset" class="btn btn-primary pull-right">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <section id="result-listing">
            @if($allow_assign == 2)            
                @include('request-manager.sub-items.include-request-show-listing-by-request')
                @yield('include-request-show-listing-by-request')
                @include('request-manager.sub-items.include-request-show-listing')
                @yield('include-request-show-listing')
            @endif
        </section>


    </div>

@append


@section('page-js')
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

    <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>

    <script src="{{loadAsset("/plugins/bootstrapValidator/bootstrapValidator.js")}}"></script>



<script language="JavaScript">

    $(function(){

        console.log('validate : frmCreateRequest');

        $('#frmCreateRequest').bootstrapValidator({
            container: 'tooltip',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                'email': {
                    validators: {
                        emailAddress: {
                            message: 'Nhập chính xác email'
                        }
                    }
                },
                'phone': {
                    validators: {
                        callback: {
                            message: 'Nhập chính xác số điện thoại',
                            callback: function(value, validator) {
                                if(isBlank($('#phone').val()))
                                    return true;

                                str = value.replace(/[^0-9]/g, '');
                                $('#phone').val(str);
                                if (str.length < 8 || str.length > 14) {
                                    $('#phone').focus();
                                    return {
                                        valid: false,
                                        message: 'Nhập chính xác số điện thoại'
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }
            }
        }).on('success.field.bv', function(e, data) {
            // If the field is empty
            if (data.element.val() === '') {
                var $parent = data.element.parents('.form-group');
                // Remove the has-success class
                $parent.removeClass('has-success');
                // Hide the success icon
                data.element.data('bv.icon').hide();
            }
        }).on('success.form.bv',function(e){
            if(isBlank($('#phone').val()) && isBlank($('#email').val())) {
                $('#phone').focus();
                showPageAlert('Lỗi', 'Số điện thoại và Email không thể cùng bỏ trống');
                e.preventDefault();
                return false;
            }
        });



    });
    
    /*
     * charlyphan added
     */
    var SelectedSendEmailIds=[];
    var SelectedAssignIds=[];
    function sendEmailForCustomer(btnSend)
    {
        if($("#email").val().trim()===""){
            showPageAlert('Lỗi', 'Bạn phải khai báo email và lưu lại trước khi gửi.');
            return;
        }else if( $("#oldEmail").val().trim()!==$("#email").val().trim() ){            
            showPageAlert('Lỗi', 'Phải lưu thông tin trước khi gửi email.');
            return;
        }
        if (SelectedSendEmailIds.length <= 0)
        {
            showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
            return;
        }
        $("#SelectedSendEmailIds").val(SelectedSendEmailIds);
        $('#frmAssignListing').attr('action', '{{ url('request-manager/send-email-for-customer') }}');
        console.log($('#frmAssignListing').attr('action'));
        $('#frmAssignListing').submit();

        // -- Show loading because server sending email --
        waitingDialog.show('Đang xử lý ...');
        $(btnSend).attr('disabled', 'disabled');
    }

//    function postData()
//    {
//        $("#frmCreateRequest").submit();
//        // -- Validate --
////        waitingDialog.show('Đang tìm kiếm');
////        ajax_post_form($("#frmCreateRequest"), function (data) {
////            $('#result-listing').html(data);
////            waitingDialog.hide();
////            $("html, body").animate({scrollTop: $("#result-listing").offset().top, duration: 100});
////        });
//    }

//    function chooseAgentSubmit(choose_type) // 1 = one, 2 = multi
    function chooseAgentByRequestSubmit(choose_type, btnSend) // 1 = one, 2 = multi
    {
        sList = '';
        validate = false;

        if (choose_type == 1) {
            console.log($("input[name='radAgentId']:checked").length);
            console.log($("input[name='radAgentId']:checked").val());
            if ($("input[name='radAgentId']:checked").length > 0) {
                validate = true;

                sList = $("input[name='radAgentId']:checked").val()+',';
                console.log($("input[name='radAgentId']:checked").val());
            }
        } else{
            $("input[name='chkAgentId[]']").each(function () {
                if(this.checked)
                {
                    validate = true;
                    sList += this.value+',';
                }
            });

        }

        if (!validate)
        {
            showPageAlert('Error', 'Bạn phải chọn danh sách Agent!');
            return;
        }

        console.log($("input[name='rListingIds[]']:checked").length);
        if ($("input[name='rListingIds[]']:checked").length <= 0 && choose_type == 1)
        {
            showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
            return;
        }

        $('#list_agent_id').val(sList);
        $('#choose_type').val(choose_type);
        console.log('serialize');
        console.log($('#frmAssignListing').serialize());
        $('#frmAssignListing').attr('action', '{{ url('request-manager/assign-listing-for-agent') }}');
        console.log($('#frmAssignListing').attr('action'));        
        $("#SelectedAssignIds").val(SelectedAssignIds);
        $('#frmAssignListing').submit();

        // -- Show loading because server sending email --
        waitingDialog.show('Đang xử lý ...');
        $(btnSend).attr('disabled', 'disabled');
    }

</script>

@append

@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
      <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
      <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
      <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
      <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
      <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop