@extends('layout.default')

@section('content')

    <div class='dashboard'>
        <section>
            <h1>
                Quản Lý Requets
            </h1>
        </section>
        <section>
            <div class="row">
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Transactions</span>
                            <span class="info-box-number">{{ $list_requests->numberTransaction }}</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="info-box">
                        <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">Requests</span>
                            <span class="info-box-number"><i>Có Listing:</i> {{ $list_requests->numberRequest->haveListing }}</span>
                            <span class="info-box-number"><i>Không có Listing:</i> {{ $list_requests->numberRequest->haveNotListing }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- agent-support/quan-ly-requests --}}
        <form action="{{ url('request-manager/show') }}" id="frmAssignRequest" name="frmAssignRequest" method="post">
            <input type="hidden" id="cur_request_id" name="cur_request_id" value="">
            <input type="hidden" id="list_agent_id" name="list_agent_id" value="">
            <input type="hidden" id="agent_id" name="agent_id" value="">
            <input type="hidden" id="choose_type" name="choose_type" value="">
            <input type="hidden" id="str_listing_id" name="str_listing_id" value="">
            <input type="hidden" id="list_staff_id" name="list_staff_id" value="">
            <input type="hidden" id="staff_id" name="staff_id" value="">
            <input type="hidden" id="current_page" name="current_page" value="{{ $current_page }}">
            <section>

                <div class="row">
                    <div class="col-md-12">
                        <div class="box">
                            <div class="box-header with-border">
                                <h3 class="box-title">#</h3>
                            </div>
                            <div class="box-body">
                                <table id="table-request" class="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th width="10%">Date Create</th>
                                        <th>CustomerID</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>TransactionID</th>
                                        <th style="width:280px;">Assigned Agent/Staff</th>
                                        <th>District</th>
                                        <th>Urgency</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    @foreach ($list_requests->requestList as $item)
                                        <?php
                                        $var = 'success';
                                        if($item->urgencyLevel == 2)
                                            $var = 'warning';
                                        elseif($item->urgencyLevel == 3)
                                            $var = 'danger';

                                        $str_assigned = '';
                                        $str_assigned_id = '-';
                                        foreach ($item->assigned->agentsList as $agent) {
                                            //$str_assigned .= 'BD '.$agent->name.', ';
                                            $str_assigned .= $agent->name.', ';
                                            $str_assigned_id .= $agent->id.'-';
                                        }

                                        foreach ($item->assigned->staffsList as $staff) {
                                            $str_assigned .= $staff->name.', ';
                                            $str_assigned_id .= $staff->id.'-';
                                        }

                                        ?>
                                        <tr>
                                            <td data-order="{{ date("Y-m-d", $item->createdDate / 1000 ) }}">{{ date("d-m-Y", $item->createdDate / 1000 ) }}</td>
                                            <td>{{$item->customerId}}</td>
                                            <td>
                                                <?php
                                                if(havePermission('edit_request'))
                                                    echo "<a href='".url('request-manager/update').'/'.$item->requestId."'>{$item->name}</a>";
                                                else
                                                    echo $item->name;
                                                ?>
                                            </td>
                                            <td width="7%" align="center">
                                                @if ($item->type == REQUEST_HAVE_LISTING)
                                                    <img width="50%" src="{{loadAsset('dist/img/request_have_listing.png') }}" data-toggle="tooltip" title="Có Listing">
                                                @else
                                                    <img width="50%" src="{{loadAsset('dist/img/request_no_listing.png') }}" data-toggle="tooltip" title="Không Có Listing">
                                                @endif
                                            </td>
                                            <td>
                                                @if(isset($item->transactionId))
                                                    <a href="/transaction-manager/detail/{{$item->transactionId}}">Transaction-{{$item->transactionId}}</a>
                                                @else
                                                    N/A
                                                @endif
                                            </td>
                                            <td>
                                            <span id="str_agent_name_{{$item->requestId}}">
                                                {{ substr($str_assigned, 0 , strlen($str_assigned) - 2) }}
                                            </span>
                                                @if(havePermission('assign_agent'))

                                                    @if ($item->type == REQUEST_HAVE_LISTING)
                                                        <?php
                                                        $rlistingId = array();
                                                        foreach ($item->listings as $listing)
                                                            $rlistingId[] = $listing->id->rlistingId;
                                                        $strrlistingId = serialize($rlistingId);

                                                        ?>
                                                        @if(!isset($item->transactionId))
                                                            <a href="javascript:void(0);"
                                                               onclick="callAssignAgentByRequest({{ $item->requestId }}, '{{ url('request-manager/get-html-agent-list-by-request-id/'.$item->requestId.'/2/1/'.$str_assigned_id) }}', '{{ $strrlistingId }}')"
                                                               class="assign-agent-by-request_BAK pull-right">
                                                                <span class="label label-assign">Assign</span>
                                                            </a>
                                                        @endif
                                                    @else
                                                        @if(!isset($item->transactionId))
                                                            <a href="javascript:void(0);"
                                                               onclick="callAssignAgentByRequest({{ $item->requestId }}, '{{ url('request-manager/get-html-agent-list-by-request-id/'.$item->requestId.'/1/2/'.$str_assigned_id) }}', '')"
                                                               class="assign-agent-by-request_BAK pull-right">
                                                                <span class="label label-assign">Assign</span>
                                                            </a>
                                                        @endif
                                                    @endif
                                                @endif
                                            </td>

                                            <td>
                                                <span id="str_agent_name" data-toggle="tooltip" title="{{ $item->strDistrict }}">
                                                    {{ word_limiter($item->strDistrict, 5)  }}
                                                </span>
                                                @if(havePermission('assign_staff_to_request'))
                                                    @if(!isset($item->transactionId))
                                                        <a href="javascript:void(0);"
                                                           onclick="doAssignRequestToBdeOne({{$item->requestId}});"
                                                           class="assign-bde-one">
                                                            <span class="label label-assign">
                                                                @if(count($item->assigned->staffsList) > 0)
                                                                    Assign
                                                                @else
                                                                    Assign
                                                                @endif
                                                            </span>
                                                        </a>
                                                    @endif
                                                @endif
                                            </td>
                                            <td><p class="label-{{ $var }}" style="width:100%">&nbsp;</p></td>
                                        </tr>
                                    @endforeach

                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th width="10%">Date Create</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>TransactionID</th>
                                        <th>Assigned Agent/Staff</th>
                                        <th>District</th>
                                        <th>Urgency</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div><!-- /.box-body -->

                        </div><!-- /.box -->
                    </div>
                </div>

            </section>

            @if(havePermission('assign_agent'))
                @include('request-manager.sub-items._include_process_assign_agent_by_request')
                @yield('_include_process_assign_agent_by_request')
            @endif

            @if(havePermission('assign_staff_to_request'))
                @include('request-manager.sub-items._include_process_assign_staff')
                @yield('_include_process_assign_staff')
            @endif

        </form>


    </div>
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
    <script src="{{loadAsset("/js/dashboard.js")}}"></script>
    <script src="{{loadAsset("/js/helper.js")}}"></script>


    <script language="JavaScript">

        $(function(){
            console.log('run js');

            fixDataTableVNSearch("#table-request");
            // -- Display row from page --
            var table_request = $('#table-request').DataTable({
                "order": [[ 0, "desc" ]],
                "iDisplayStart": {{ $current_page * 10 }},
                
            });

            $('#table-request').on('page.dt', function () {
                var info = table_request.page.info();
                $('#current_page').val(info.page);
            } );
        });

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
