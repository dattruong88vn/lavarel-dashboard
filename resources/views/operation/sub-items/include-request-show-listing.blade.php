@section('include-request-show-listing')

    {{--{{ url('customer-service/tao-request') }}--}}
    <form action="{{ url('operation-db/assign-listing-for-agent') }}" id="frmAssignListing" name="frmAssignListing" method="post">
        {{ csrf_field() }}
        <input type="hidden" id="frmName" name="frmName" value="frmAssignListing">
        <input type="hidden" id="requestId" name="requestId" value="{{ $requestId }}">
        <input type="hidden" id="list_agent_id" name="list_agent_id" value="">
        <input type="hidden" id="choose_type" name="choose_type" value="">

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
                                <th>District</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Chung cư/dự án</th>
                                <th width="10%">#</th>
                            </tr>
                            </thead>
                            <tbody>

                            @foreach($listingsList as $item)
                            <tr>
                                <?php
                                    $url = PRODUCT_URL.'chi-tiet/'.str2url($item->title).'/'.str2url($item->districtName).'/'.$item->rlistingId;
                                ?>
                                <td><a href="{{ $url }}" target="_blank">{{ $item->title }}</a></td>
                                <td>{{ $item->address }}</td>
                                <td>{{ $item->districtName }}</td>
                                <td>{{ $item->formatPrice }}</td>
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
                                <th>District</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Chung cư/dự án</th>
                                <th width="10%">#</th>
                            </tr>
                            </tfoot>
                        </table>
                        <div class="box-footer">
                        <?php if (empty($listingsList)) : ?>
                            <button type="button" class="btn btn-primary pull-right add-assign-multi-agent">Open Order Request</button>
                        <?php else : ?>
                            <button type="button" class="btn btn-primary pull-right add-assign-one-agent">Assign Listing Cho Agent</button>
                        <?php endif; ?>
                            <button type="submit" class="btn btn-primary pull-right">Gửi Email cho Khách Hàng</button>
                        </div>
                    </div><!-- /.box-body -->

                </div><!-- /.box -->
            </div>
        </div>

        <?php echo df_ref($html_agent_list_choose_one); ?>

        <?php echo df_ref($html_agent_list_choose_multi); ?>


    </form>
@stop

@section('page-js')

    <script language="JavaScript">

        $(function(){

            console.log('chay vao trong file include request');
            // -- Mot so ham da chuyen vao dashboard.js --

            $('#btnSend').prop('disabled', true);
            $('input[type=radio][name=radAgentId]').change(function() {
                $('#btnSend').prop('disabled', false);
                $('#agentId').val(this.value);
            });
//            $('#table-assign').on('draw.dt', function () {
            $('#table-assign-one').on('draw.dt', function () {
                $('input[type=radio][name=radAgentId]').change(function() {
                    $('#btnSend').prop('disabled', false);
                    $('#agentId').val(this.value);
                });
            } );

        });

//        function doSubmit(frm)
//        {
//            console.log($("input[name='rListingIds[]']:checked").length);
//            if ($("input[name='rListingIds[]']:checked").length <= 0)
//            {
//                showPageAlert('Error', 'Bạn phải chọn danh sách listing!');
//                return;
//            }
//            console.log($("input[name='agentId']:checked").length);
//            console.log(frm.serialize());
//            frm.submit();
//        }

    </script>

@append
