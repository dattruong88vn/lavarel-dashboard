@section('include-request-show-listing-by-request')

    {{--{{ url('customer-service/tao-request') }}--}}
    {{-- operation-db/assign-listing-for-agent --}}
        {{ csrf_field() }}
        <input type="hidden" id="frmName" name="frmName" value="frmAssignListing">
        <input type="hidden" id="requestId" name="requestId" value="{{ $requestId }}">
        <input type="hidden" id="list_agent_id" name="list_agent_id" value="">
        <input type="hidden" id="choose_type" name="choose_type" value="">

        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Danh sách listing khách hàng đặt lịch</h3>
                    </div>
                    <div class="box-body">
                        <table id="table-request-listing-by-request" class="table table-bordered table-striped">
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
                            @foreach($listingsByRequest->data as $item)
                                <tr>
                                    <?php
                                    $url = PRODUCT_URL.'chi-tiet/'.str2url($item->title).'/'.str2url($item->districtName).'/'.$item->rlistingId;
                                    ?>
                                    <td><a href="{{ $url }}" target="_blank">{{ $item->title }}</a></td>
                                    <td>{{ $item->address }}</td>
                                    <td>{{ $item->districtName }}</td>
                                    <td>{{ $item->formatPrice }}</td>
                                    <td>{{ $item->listingTypeName }}</td>
                                    <td>{{ $item->propertyTypeName }}</td>
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
@stop

@section('page-js')
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script language="JavaScript">

        $(function(){
            console.log('chay vao trong file include request');
            // -- Mot so ham da chuyen vao dashboard.js --
            fixDataTableVNSearch("#table-request-listing-by-request");
            $("#table-request-listing-by-request").DataTable({
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
                    });
                    return nRow;
                },
            });

        });

    </script>

@append
