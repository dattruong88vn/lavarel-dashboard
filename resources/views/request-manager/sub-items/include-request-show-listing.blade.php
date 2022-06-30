@section('include-request-show-listing')

    {{--{{ url('customer-service/tao-request') }}--}}
    {{-- operation-db/assign-listing-for-agent --}}
    <form action="{{ url('request-manager/assign-listing-for-agent') }}" id="frmAssignListing" name="frmAssignListing" method="post">
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
                        <table id="table-request-listing" class="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Address</th>
                                <th>District</th>
                                <th>Price</th>
                                <th>Type</th>
                                <th>Chung cư/dự án</th>
                                <th>Send Mail</th>
                                <th>Assign Sale</th>
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
                                    <td>
                                        <div class="checkbox">
                                            <label>
                                                @if(!empty($item->isSent))
                                                    <img width="20px" src="{{loadAsset('dist/img/mail_sent.png') }}">
                                                @else
                                                    <input type="checkbox" class="chkSendEmailIds" name="rSendEmailIds[]" value="{{  $item->rlistingId }}">
                                                @endif
                                            </label>
                                        </div>
                                    </td>
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
                                <th>Send Mail</th>
                                <th>Assign Sale</th>
                            </tr>
                            </tfoot>
                        </table>
                        <div class="box-footer">
                            <?php if (empty($listingsList)) : ?>
                            <button type="button" class="btn btn-primary pull-right add-assign-multi-agent">Open Order Request</button>
                            <?php else : ?>
                            <button type="button" class="btn btn-primary pull-right add-assign-one-agent">Assign Listing Cho Agent</button>
                            <?php endif; ?>
                            <button type="button" onclick="sendEmailForCustomer(this);" class="btn btn-primary pull-right">Gửi Email cho Khách Hàng</button>
                        </div>
                    </div><!-- /.box-body -->

                </div><!-- /.box -->
            </div>
        </div>

        <?php echo df_ref($html_agent_list_choose_one); ?>

        <?php echo df_ref($html_agent_list_choose_multi); ?>


        <input type="hidden" id="SelectedSendEmailIds" name="SelectedSendEmailIds" value="" />
        <input type="hidden" id="SelectedAssignIds" name="SelectedAssignIds" value="" />
    </form>
@stop

@section('page-js')
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script language="JavaScript">

        $(function(){
            console.log('chay vao trong file include request');
            // -- Mot so ham da chuyen vao dashboard.js --
            fixDataTableVNSearch("#table-request-listing");
            $("#table-request-listing").DataTable({
                "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
                    $("input[name='rSendEmailIds[]']").unbind("click");
                    $("input[name='rSendEmailIds[]']").on("click",function(){
                        val =$(this).val();
                        varIndex = SelectedSendEmailIds.indexOf(val);
                        if($(this).prop('checked')){
                            if(varIndex<0){
                                SelectedSendEmailIds.push(val);
                            }
                        }else{
                            SelectedSendEmailIds.splice(varIndex,1);
                        }
                        console.log(SelectedSendEmailIds);
                    });
                    
                    
                    $("input[name='rListingIds[]']").unbind("click");
                    $("input[name='rListingIds[]']").on("click",function(){
                        val =$(this).val();
                        varIndex = SelectedAssignIds.indexOf(val);
                        if($(this).prop('checked')){
                            if(varIndex<0){
                                SelectedAssignIds.push(val);
                            }
                        }else{
                            SelectedAssignIds.splice(varIndex,1);
                        }
                        console.log(SelectedAssignIds);
                    });
                    return nRow;
                },
            });

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
            fixDataTableVNSearch("#table-assign-agent-from-request-multi");
            $('#table-assign-agent-from-request-multi').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": false,
                "info": true,
                "autoWidth": true

            });
            fixDataTableVNSearch("#table-assign-agent-from-request-one");
            $('#table-assign-agent-from-request-one').DataTable({
                "paging": true,
                "lengthChange": true,
                "searching": true,
                "ordering": false,
                "info": true,
                "autoWidth": true
            });

        });

    </script>

@append
