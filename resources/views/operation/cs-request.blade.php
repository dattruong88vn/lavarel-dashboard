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
                                    <label>Điện Thoại</label>
                                    <input type="text" id="customerId" name="customerId" class="form-control"
                                           value="{{ df_ref($customeData['customerId']) }}"
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

                        @include('operation.sub-items.html-search-listing-form')

                        <div class="box-footer">
                            @if($allow_assign == 2)
                                <button type="button" onclick="postData();" class="btn btn-primary pull-right">Save & Search</button>
                            @else
                                <button type="button" onclick="postData();" class="btn btn-primary pull-right">Save</button>
                            @endif
                            <button type="reset" class="btn btn-primary pull-right">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <section id="result-listing">
            @if($allow_assign == 2)
                @include('operation.sub-items.include-request-show-listing')
                @yield('include-request-show-listing')
            @endif
        </section>


    </div>

@append


@section('page-js')
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

    <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>


<script language="JavaScript">

    $(function(){


    });

    function postData()
    {
        $("#frmCreateRequest").submit();
        // -- Validate --
//        waitingDialog.show('Đang tìm kiếm');
//        ajax_post_form($("#frmCreateRequest"), function (data) {
//            $('#result-listing').html(data);
//            waitingDialog.hide();
//            $("html, body").animate({scrollTop: $("#result-listing").offset().top, duration: 100});
//        });
    }

    function chooseAgentSubmit(choose_type) // 1 = one, 2 = multi
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
        if ($("input[name='rListingIds[]']:checked").length <= 0)
        {
            showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
            return;
        }

        $('#list_agent_id').val(sList);
        $('#choose_type').val(choose_type);
        console.log('serialize');
        console.log($('#frmAssignListing').serialize());
        $('#frmAssignListing').attr('action', '{{ url('operation-db/assign-listing-for-agent') }}');
        console.log($('#frmAssignListing').attr('action'));
        $('#frmAssignListing').submit();
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