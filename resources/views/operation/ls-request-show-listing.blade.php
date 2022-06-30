@extends('layout.empty')

@section('content')

    <form action="{{ url('customer-service/tao-request') }}" id="frmAssignListing" name="frmAssignListing" method="post">
        <input type="hidden" id="frmName" name="frmName" value="frmAssignListing">
        <input type="hidden" id="requestId" name="requestId" value="{{ $listingList->data[0]->requestId }}">
        <input type="hidden" id="agentId" name="agentId" value="{{ $listingList->data[0]->requestId }}">

        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Kết Quả Tìm Kiếm</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-request" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Chung cư/dự án</th>
                                <th width="10%">#</th>
                            </tr>
                            </thead>
                            <tbody>

                            @foreach($listingList->data[0]->listings as $item)
                            <tr>
                                <td><a href="#" target="_blank">{{ $item->title }}</a></td>
                                <td>{{ $item->address }}</td>
                                <td>{{ $item->typeName }}</td>
                                <td>{{ $item->propertyName }}</td>
                                <td><div class="checkbox"><label><input type="checkbox" class="chkListingIds" name="rListingIds[]" value="{{  $item->rlistingId }}"></label></div></td>
                            </tr>
                            @endforeach

                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Title</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Chung cư/dự án</th>
                                <th width="10%">#</th>
                            </tr>
                            </tfoot>
                        </table>
                        <div class="box-footer">
                            <button type="button" class="btn btn-primary pull-right add-assign">Assign Listing Cho Agent</button>
                            <button type="submit" class="btn btn-primary pull-right">Gửi Email cho Khách Hàng</button>
                        </div>
                    </div><!-- /.box-body -->

                </div><!-- /.box -->
            </div>
        </div>


        <div id="assign-popup" class="white-popup mfp-hide zoom-anim-dialog">
            <a href="#" class="mpf-close-cus">X close</a>
            <div class="content-popup">
                <div class="title">
                    <h1>Assign</h1>Request #1
                </div>
                <div class="inner-popup box">
                    <div class="box-body">
                        <form role="form">
                            <table id="table-assign" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th>Agent</th>
                                    <th>Type</th>
                                    <th>Address</th>
                                    <th width="10%">#</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($agentList as $item)
                                <tr>
                                    <td>{{ $item->name }}</td>
                                    <td>{{ $item->phone }}</td>
                                    <td>{{ $item->email }}</td>
                                    <td><div class="checkbox"><label><input type="radio" name="radAgentId" value="{{ $item->agentId }}"></label></div></td>
                                </tr>
                                @endforeach
                                </tbody>
                            </table>
                            <button type="button" id="btnSend" name="btnSend" onclick="doSubmit($('#frmAssignListing'));" class="btn btn-block btn-primary">Gửi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </form>
    <script src="{{loadAsset("/js/helper.js")}}"></script>
<script language="JavaScript">

    $(function(){
        fixDataTableVNSearch("#table-request");
        fixDataTableVNSearch("#table-assign");
        $("#table-request").DataTable();
        $('#table-assign').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": false,
            "ordering": false,
            "info": false,
            "autoWidth": true
        });

        $('#btnSend').prop('disabled', true);
        $('input[type=radio][name=radAgentId]').change(function() {
            $('#btnSend').prop('disabled', false);
            $('#agentId').val(this.value);
        });
        $('#table-assign').on('draw.dt', function () {
            $('input[type=radio][name=radAgentId]').change(function() {
                $('#btnSend').prop('disabled', false);
                $('#agentId').val(this.value);
            });
        } );

        $('.add-assign').magnificPopup({
            items: {
                src: '#assign-popup',
                type: 'inline',
            },
            closeOnBgClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom',
            callbacks: {
                close: function() {
                    // Will fire when popup is closed
                    //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
                }
            }
        });
        $('.mpf-close-cus').click(function() {
            $.magnificPopup.close();
        });
//            },false, false);


    });

    function doSubmit(frm)
    {
        console.log($("input[name='rListingIds[]']:checked").length);
        if ($("input[name='rListingIds[]']:checked").length <= 0)
        {
            showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
            return;
        }
        console.log($("input[name='agentId']:checked").length);
        console.log(frm.serialize());
        frm.submit();
    }

</script>

@endsection