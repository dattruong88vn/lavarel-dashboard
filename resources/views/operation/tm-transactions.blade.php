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
                            <table id="table-transac" class="table table-bordered table-striped">
                                <thead>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Ngày Tạo</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Assigned Agent</th>
                                    <th>Listings Đã Gửi</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($results->data->list as $key => $result)
                                    <tr>
                                        <td>{{ $key+1 }}.</td>
                                        <td>{{ date('d-m-Y', $result->createdDate/1000) }}</td>
                                        <td><a href="transactions/detail/{{ $result->transactionId }}"><i class="fa fa-fw fa-file"></i> {{ $result->customer->name }}</a></td>
                                        <td>{{ $result->agent->name }} <a href="#" class="assign-agent-one"  transactionId="{{ $result->transactionId }}"><span class="label label-assign">Change</span></a></td>
                                        <td><strong>{{ count($result->transactionRelatedListings) }}</strong> - <a href="/transactions/sent-listings/{{ $result->transactionId }}"><span class="label label-assign">Xem danh sách</span></a></td></td>
                                        <td>
                                            <div class="form-group">
                                                <select class="form-control select2 change-status" transactionId="{{ $result->transactionId }}" style="width: 100%;">
                                                    <option value="1" {{ $result->status == 1 ? 'selected="selected"' : ""}} >Waiting For Processing</option>
                                                    <option value="2" {{ $result->status == 2 ? 'selected="selected"' : ""}} >Booking With Agent</option>
                                                    <option value="3" {{ $result->status == 3 ? 'selected="selected"' : ""}} >Viewing</option>
                                                    <option value="4" {{ $result->status == 4 ? 'selected="selected"' : ""}} >Considering</option>
                                                    <option value="5" {{ $result->status == 5 ? 'selected="selected"' : ""}} >Negotiating</option>
                                                    <option value="6" {{ $result->status == 6 ? 'selected="selected"' : ""}} >Out for contract</option>
                                                    <option value="7" {{ $result->status == 7 ? 'selected="selected"' : ""}} >Success</option>
                                                    <option value="7" {{ $result->status == 8 ? 'selected="selected"' : ""}} >Closed</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th style="width: 10px">#</th>
                                    <th>Ngày Tạo</th>
                                    <th>Tên Khách Hàng</th>
                                    <th>Assigned Agent</th>
                                    <th>Listings Đã Gửi</th>
                                    <th>Status</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div><!-- /.box-body -->

                    </div><!-- /.box -->
                </div>
            </div>
        </section>
    </div>
    <?php echo $html_agent_list; ?>

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
    <script type="text/javascript">

        var transactionId;
        $('.assign-agent-one').click(function(){
            transactionId = $(this).attr('transactionid');

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

        });

        function chooseAgentSubmit()
        {
            itemCheck = $("input[name='radAgentId']:checked");
            if (itemCheck.length == 1){
                agentId = itemCheck.val();
                url = "/transaction/change/agent/"+transactionId+"/"+agentId;
                get_sync(url, false, function(data){
                    if(data.result){
                        showPageAlert('Message', 'Thay đổi agent thành công');
                    }
                    else {
                        alert(data.message);
                    }
                    console.log(data);
                });
            }
            else{
                showPageAlert('Error', 'Bạn phải chọn Agent!');
                return;
            }
        }

        $('.change-status').change(function(){
            transactionId = $(this).attr('transactionid');
            statusId = $(this).val();
            url = "/transaction/update/status/"+transactionId+"/"+statusId;
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