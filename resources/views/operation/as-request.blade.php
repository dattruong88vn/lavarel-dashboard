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

        <form action="/agent-support/quan-ly-requests" id="frmAssignRequest" name="frmAssignRequest" method="post">
            <input type="hidden" id="cur_request_id" name="cur_request_id" value="">
            <input type="hidden" id="list_agent_id" name="list_agent_id" value="">
            <input type="hidden" id="agent_id" name="agent_id" value="">
            <input type="hidden" id="choose_type" name="choose_type" value="">
            <input type="hidden" id="str_listing_id" name="str_listing_id" value="">
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
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Assigned Agent/BDE</th>
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
                                        $str_assigned_id = ',';
                                        foreach ($item->assigned->agentsList as $agent) {
                                            $str_assigned .= 'BD '.$agent->name.', ';
                                            $str_assigned_id .= $agent->id.',';
                                        }

                                        foreach ($item->assigned->staffsList as $staff) {
                                            $str_assigned .= $staff->name.', ';
                                            $str_assigned_id .= $staff->id.',';
                                        }

                                    ?>
                                    <tr>
                                        <td>{{ date("d-m-Y", $item->createdDate / 1000 ) }}</td>
                                        <td>
                                            <?php
                                                if(havePermission('edit_request'))
                                                    echo "<a href='".url('customer-service/update-request').'/'.$item->requestId."'>{$item->name}</a>";
                                                else
                                                    echo $item->name;
                                            ?>
                                        </td>
                                        <td>
                                            @if ($item->type == REQUEST_HAVE_LISTING)
                                                <img src="{{loadAsset('dist/img/request_have_listing.png') }}" data-toggle="tooltip" title="Có Listing">
                                            @else
                                                <img src="{{loadAsset('dist/img/request_no_listing.png') }}" data-toggle="tooltip" title="Không Có Listing">
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
                                                    <a href="javascript:void(0);"
                                                       onclick="doAssignRequestToAgentOne({{$item->requestId}}, '{{$str_assigned_id}}', '{{ $strrlistingId }}');"
                                                       class="assign-agent-one">
                                                        <span class="label label-assign">Assign</span>
                                                    </a>
                                                @else
                                                    <a href="javascript:void(0);"
                                                       onclick="doAssignRequestToAgentMulti({{$item->requestId}}, '{{$str_assigned_id}}');"
                                                       class="assign-agent-multi">
                                                        <span class="label label-assign">Assign</span>
                                                    </a>
                                                @endif
                                            @endif
                                        </td>

                                        <td>
                                            <span id="str_agent_name">
                                                Quận 1, Quận 3, Quận Bình Thạnh
                                            </span>
                                            <a href="javascript:void(0);"
                                               onclick=""
                                               class="assign-agent-one">
                                                <span class="label label-assign">Assign</span>
                                            </a>
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
                                    <th>Assigned Agent/BDE</th>
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

        <?php echo $html_agent_list_choose_multi; ?>

        <?php echo $html_agent_list_choose_one; ?>

        </form>


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
            console.log('run js');
//            $('#table-assign-one').DataTable({
//                "paging": true,
//                "lengthChange": true,
//                "searching": true,
//                "ordering": false,
//                "info": true,
//                "autoWidth": true
//            });
//
//            $('#table-assign-multi').DataTable({
//                "paging": true,
//                "lengthChange": true,
//                "searching": true,
//                "ordering": false,
//                "info": true,
//                "autoWidth": true
//            });
        });

        function doAssignRequestToAgentOne(request_id, str_agent_id, str_listing_id)
        {
//            console.log(request_id);
//            $("input:checkbox[name='ProductCode']")
//            $("input[name='radAgentId[]']").each(function () {

//            $("input[name='radAgentId']").each(function () {
//                if(str_agent_id.indexOf(','+this.value+',') >= 0) {
//                    this.checked = true;
//                } else
//                {
//                    this.checked = false;
//                }
//            });

            $('#cur_request_id').val(request_id);
            $('#str_listing_id').val(str_listing_id);

            $.magnificPopup.open({
                items: {
                    src: '#assign-agent-popup-one',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom',
                callbacks: {
                    close: function() {
                        // Will fire when popup is closed
                        //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
                    }
                }
            });
        }

        function doAssignRequestToAgentMulti(request_id, str_agent_id)
        {
//            console.log(request_id);
//            $("input:checkbox[name='ProductCode']")

            $("input[name='chkAgentId[]']").each(function () {
//                console.log(this.value);
                if(str_agent_id.indexOf(','+this.value+',') >= 0) {
                    this.checked = true;
                } else
                {
                    this.checked = false;
                }
            });

            $('#cur_request_id').val(request_id);

            $.magnificPopup.open({
                items: {
                    src: '#assign-agent-popup-multi',
                    type: 'inline',
                },
                closeOnBgClick: false,
                removalDelay: 300,
                mainClass: 'my-mfp-slide-bottom',
                callbacks: {
                    close: function() {
                        // Will fire when popup is closed
                        //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
                    }
                }
            });
        }


        function chooseAgentSubmit(choose_type) // 1 = one, 2 = multi
        {
//            console.log($("input[name='radAgentId[]']:checked").length);

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

//            sList = '';
//            validate = false;
            $("input[name='chkAgentId[]']").each(function () {
                if(this.checked)
                {
                    validate = true;
                    sList += this.value+',';
                }
            });

            if (!validate)
            {
                showPageAlert('Error', 'Bạn phải chọn danh sách Agent!');
                return;
            }

            $('#list_agent_id').val(sList);
            $('#choose_type').val(choose_type);
            console.log($('#frmAssignRequest').serialize());
            $('#frmAssignRequest').submit();
        }

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
