@extends('layout.default')

@section('content')
    <div class='dashboard'>
        <section>
            <h1>
                Transactions assign by (AS, TM, BDE)
            </h1>
        </section>
        <section>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Transactions</span>
                            <span class="info-box-number">{{ $results->data->subTotalTransaction }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <a href="#">
                        <div class="info-box">
                            <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Requests</span>
                                <span class="info-box-number">{{ $results->data->subTotalRequest }}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="box">
                        <div class="box-header with-border">
                            <h3 class="box-title"># </h3>
                        </div><!-- /.box-header -->
                        <div class="box-body">
                            <table id="table-transac-order-id" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Ngày Tạo</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Type</th>
                                    <th>Assigned Agent</th>
                                    <th>Assigned Staff</th>
                                    <th>Listings Đã Gửi</th>
                                    <th>Status</th>
                                    <th>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($results->data->list as $key => $result)
                                    <tr>
                                        <!--<td>{{ $key+1 }}.</td>-->
                                        <td>{{$result->transactionId}}</td>
                                        <td>{{ date('d-m-Y', $result->createdDate/1000) }}</td>
                                        <td><a href="{{ url('transaction-manager/detail') }}/{{ $result->transactionId }}"><i class="fa fa-fw fa-file"></i> {{ $result->customer->name }}</a></td>
                                        <td width="7%" align="center">
                                            @if ($result->requestId != null)
                                                <span class="icon-yes"></span>
                                            @else
                                                <span class="icon-no"></span>
                                            @endif
                                        </td>
                                        <td>
                                            {{ $result->agent->name }}
                                            @if(havePermission('assign_agent'))
                                                <a href="#" class="assign-agent-one" transactionId="{{ $result->transactionId }}" agentId="{{$result->agent->agentId}}">
                                                    <span class="label label-assign">Change</span>
                                                </a>
                                            @endif
                                        </td>
                                        <td>
                                            @if(isset($result->user))
                                                {{ $result->user->name }}
                                            @else
                                                @if(havePermission('assign_staff_to_transaction'))
                                                    <a href="#" class="assign-user-one" transactionId="{{ $result->transactionId }}">
                                                        <span class="label label-assign">Assign</span>
                                                    </a>
                                                @endif
                                            @endif
                                        </td>
                                        <td><strong>{{ count($result->transactionRelatedListings) }}</strong> - <a href="{{ url('transaction-manager/sent-listings') }}/{{ $result->transactionId }}"><span class="label label-assign">Xem danh sách</span></a></td></td>
                                        <td>
                                            <div class="form-group">
                                                <select class="form-control select2 change-status" transactionId="{{ $result->transactionId }}" style="width: 100%;">
                                                    @foreach($transaction_status_list as $item)
                                                        <option value="{{ $item->tId }}" <?= $item->tId == $result->status ? 'selected' : ''; ?>>{{ $item->statusName }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                        </td>
                                        <td width="5%" align="center">
                                          <a title="Delete Transaction" href="#" class="btn-delete-transaction" onclick="deleteTransaction({{ $result->transactionId }});"><i class="fa fa-fw fa-trash"></i></a>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Ngày Tạo</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Type</th>
                                    <th>Assigned Agent</th>
                                    <th>Assigned Staff</th>
                                    <th>Listings Đã Gửi</th>
                                    <th>Status</th>
                                    <th>#</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
                </div>
            </div>
        </section>
    </div>

    <?php echo df_ref($html_agent_sale_list); ?>

    <?php echo df_ref($html_staff_list); ?>

@append


@section('page-js')
    <script src="{{loadAsset("/plugins/chartjs/Chart.min.js")}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset("/plugins/daterangepicker/daterangepicker.js")}}"></script>
    <script src="{{loadAsset("/plugins/datepicker/bootstrap-datepicker.js")}}"></script>

    <script src="{{loadAsset("/dist/js/jquery.magnific-popup.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/select2/select2.full.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/jquery.dataTables.min.js")}}"></script>
    <script src="{{loadAsset("/plugins/datatables/dataTables.bootstrap.min.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script>
        fixDataTableVNSearch("#table-transac-order-id");    
    </script>
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>    
    <script type="text/javascript">
        
        
        $('#table-transac-order-id').DataTable({
            "order": [[ 0, "desc" ]],
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": true
        });

        var transactionId;
        $('.assign-agent-one').click(function(){
            transactionId = $(this).attr('transactionid');

            var CurrentAgentId = $(this).attr('agentId');   
            console.log("sdjf ldjsl kfdjk ");
            $("#table-assign-one input[type='radio']").each(function(){
                console.log($(this).val()+"="+CurrentAgentId);
                if($(this).val()===CurrentAgentId){
                    $(this).prop("checked",true);
                }
            });
            
            $.magnificPopup.open({
                items: {
                    src: '#assign-agent-popup-one',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });
        });

         $('.assign-user-one').click(function(){
            transactionId = $(this).attr('transactionid');
            $.magnificPopup.open({
                items: {
                    src: '#assign-bde-popup-one',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom'
            });
        });

        function chooseAgentSaleSubmit()
        {
            itemCheck = $("input[name='radAgentId']:checked");
            if (itemCheck.length == 1){
                agentId = itemCheck.val();
                url = "{{ url('transaction-manager/change-agent') }}/"+transactionId+"/"+agentId;
                get_sync(url, false, function(data){
                    if(data.result)
                        showPageAlert('Message', 'Thay đổi agent thành công');
                    else
                        showPageAlert('Error', data.message);
                    console.log(data);
                    location.reload();
                });
            }
            else{
                showPageAlert('Error', 'Bạn phải chọn Agent!');
                return;
            }
        }

        function assignStaffToTransaction()
        {
            itemCheck = $("input[name='radStaffId']:checked");
            if (itemCheck.length == 1){
                agentId = itemCheck.val();
                url = "{{ url('transaction-manager/assign-staff') }}/"+transactionId+"/"+agentId;
                get_sync(url, false, function(data){
                    if(data.result)
                        showPageAlert('Message', 'Thành công');
                    else
                        showPageAlert('Error', data.message);
                    console.log(data);
                    location.reload();
                });
            }
            else{
                showPageAlert('Error', 'Bạn phải chọn Member!');
                return;
            }
        }

        function deleteTransaction(transactionId){
            if(!confirm('Bạn có chắc là muốn xóa?')){
                return;
            }
            url = "{{ url('transaction-manager/delete') }}/"+transactionId;
            get_sync(url, false, function(data){
                if(data.result)
                    showPageAlert('Message', 'Xóa thành công');
                else
                    showPageAlert('Error', data.message);
                console.log(data);
                location.reload();
            });
        }

        $('.change-status').change(function(){
            transactionId = $(this).attr('transactionid');
            statusId = $(this).val();
            url = "{{ url('transaction-manager/change-status') }}/"+transactionId+"/"+statusId;
            get_sync(url, false, function(data){
                if(data.result){
                    showPageAlert('Message', 'Thay đổi status thành công');
                }
                else {
                    alert(data.message);
                }
                console.log(data);
            });
        });

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/magnific-popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/popup.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/dist/css/main.css")}}" rel="stylesheet" type="text/css" />
@stop