@extends('layout.default')


@section('content')
    <div class='dashboard'>
        <section>
            <h1>Transaction Detail</h1>
        </section>
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab-01" data-toggle="tab">Thông Tin Transaction</a></li>
                <li><a href="#tab-02" data-toggle="tab">Thêm Listing Vào Transaction</a></li>
            </ul>
            <div class="tab-content">

                <div class="active tab-pane" id="tab-01">
                    <section>
                        <div class="box-header with-border">
                            <h3 class="box-title">Thông tin Customer</h3>
                        </div>


                        <div class="box-body tran-detail">

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Họ tên</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->name }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Giới Tính</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->gender }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Tuổi</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->age }}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Điện thoại</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->customerId }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Nghề nghiệp</label>
                                        <div class="col-sm-8"><div class="col-sm-8">{{ $transactionDetail->customer->job }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Email</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->email }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="col-sm-4 control-label">Nơi công tác</label>
                                        <div class="col-sm-8">{{ $transactionDetail->customer->workingPlace }}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>



                    <section>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Danh Sách Listing</h3>
                                    </div>
                                    <div class="box-body">
                                        <table id="table-request" class="table table-bordered table-striped">
                                            <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Address</th>
                                                <th>District</th>
                                                <th>Price</th>
                                                <th>Type</th>
                                                <th>Chung cư/dự án</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            @foreach ($transactionListing as $item)
                                                <tr>
                                                    <td>
                                                        <a href="#{{ $item->rId }}" target="_blank">
                                                            {{ $item->title }}
                                                        </a>
                                                    </td>
                                                    <td>{{ $item->address }}</td>
                                                    <td>{{ $item->districtName }}</td>
                                                    <td>{{ $item->formatPrice }}</td>
                                                    <td>{{ $item->listingTypeName }}</td>
                                                    <td>{{ $item->propertyName }}</td>
                                                </tr>
                                            @endforeach

                                            </tbody>
                                            <tfoot>
                                            <tr>
                                                <th>Title</th>
                                                <th>Address</th>
                                                <th>District</th>
                                                <th>Price</th>
                                                <th>Type</th>
                                                <th>Chung cư/dự án</th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div><!-- /.box-body -->

                                </div><!-- /.box -->
                            </div>
                        </div>
                    </section>
                </div>

                <div class="tab-pane" id="tab-02">

                    <form action="/transactions/detail/{{ $transactionDetail->transactionId }}" id="frmSearchListing" name="frmSearchListing" method="post">
                        {{ csrf_field() }}
                        <input type="hidden" id="transactionId" name="transactionId" value="{{ $transactionDetail->transactionId }}">

                        @include('operation.sub-items.html-search-listing-form')

                        <div class="box-footer">
                            <button type="button" onclick="searchData();" class="btn btn-primary pull-right">Tìm kiếm Listing</button>
                        </div>

                        <section id="result-listing"></section>

                        <div id="action-bar" class="box-footer">
                            <button type="button" onclick="doSubmit($('#frmSearchListing'))" class="btn btn-primary pull-right">Thêm listing vào transaction</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>



    </div>

@endsection


@section('page-js')

    <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

    <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>

    <script language="JavaScript">

        $(function(){
            console.log('chay trong file chinh');
            $('#action-bar').hide();
        });

        function searchData()
        {
            console.log('searchData');
            waitingDialog.show('Đang tìm kiếm');
            $.ajax({
                type: 'POST',
                url: '/listing/search',
                data: $("#frmSearchListing").serialize(),
                success: function(data){
                    $('#result-listing').html(data);
                    waitingDialog.hide();
                    $('#action-bar').show();
                    $("html, body").animate({scrollTop: $("#result-listing").offset().top, duration: 100});
                },
                error: function(data){
                    waitingDialog.hide();
                    showPageAlert('Lỗi', 'Có lỗi xảy ra! Hãy thử lại');
                }
            });
        }

        function doSubmit(frm)
        {
            console.log($("input[name='rListingIds[]']:checked").length);
            if ($("input[name='rListingIds[]']:checked").length <= 0)
            {
                showPageAlert('Lỗi', 'Bạn phải chọn danh sách listing!');
                return;
            }
            console.log(frm.serialize());
            frm.submit();
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