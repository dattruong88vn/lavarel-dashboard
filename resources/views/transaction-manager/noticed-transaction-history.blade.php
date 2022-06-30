@extends('layout.default')

@section('content')
    <div class='dashboard'>
        <section>
            <h1>History Transaction</h1>
        </section>
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab-01" data-toggle="tab">Sales Agents</a></li>
                <li><a href="#tab-02" data-toggle="tab">Listing Agents</a></li>
            </ul>
            <div class="tab-content">

                <div class="active tab-pane" id="tab-01">
                    
                    <section>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box">
                                    <div class="box-body">
                                        <table id="tableSaleAgent" class="table table-bordered table-striped">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($saleAgent as $item)
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="getNoticedTransactionLogDeatail({{$item->transactionId}},'{{$item->dateTime}}')" id="clickSaleAgent" class="click-ds-sa">{{$item->dateTime}}</a>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div><!-- /.box-body -->

                                </div><!-- /.box -->
                            </div>
                        </div>
                    </section>
                </div>

                <div class="tab-pane" id="tab-02">

                    <section>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="box">
                                    <div class="box-body">
                                        <table id="tableListingAgent" class="table table-bordered table-striped">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                @foreach($listingAgent as $item)
                                                <tr>
                                                    <td>
                                                        <a href="#" onclick="getNoticedTransactionLogDeatail({{$item->transactionId}},'{{$item->dateTime}}')" id="clickListingAgent" class="click-ds-ls">{{$item->dateTime}}</a>
                                                    </td>
                                                </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div><!-- /.box-body -->

                                </div><!-- /.box -->
                            </div>
                        </div>
                    </section>

                </div>

            </div>
        </div>
    </div>

    <div id="ds-saleagent-popup" class="white-popup mfp-hide zoom-anim-dialog">
      <a href="#" class="mpf-close-cus">X close</a>
      <div class="content-popup">
          <div class="title">
            <h1>Danh Sách Sale Agents</h1>
          </div>
          <div class="inner-popup box">
            <div class="box-body">
                <table id="tableAgentsList" class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                        </tr>
                    </tfoot>
                </table>
            </div><!-- /.box-body -->
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
    <script src="{{loadAsset("/js/function.js")}}"></script>   
    <script src="{{loadAsset("/js/helper.js")}}"></script>
    <script language="JavaScript">
        
        var table = null;
        function getNoticedTransactionLogDeatail(transactionId, dateTime){
            var post = {
               "transactionId": transactionId,
               "dateTime":dateTime
            };

            post_sync("/transaction-manager/noticed-transaction-log", post, true, function(data){
                if(data.result){
                    var agentsList = data.data;
                    var data = [];
                    for(i = 0; i < agentsList.length; i++){
                        var item = [];
                        item.push(agentsList[i].agentId);
                        item.push(agentsList[i].name);
                        item.push(agentsList[i].email);
                        item.push(agentsList[i].phone);
                        data.push(item);
                    }

                    if(table != null)
                        table.destroy();
                    
                    table = $('#tableAgentsList').DataTable({
                        "data":data,
                        "paging": true,
                        "lengthChange": true,
                        "searching": true,
                        "ordering": false,
                        "info": true,
                        "autoWidth": true
                    });

                    $.magnificPopup.open({
                        items: {
                            src: '#ds-saleagent-popup',
                            type: 'inline',
                        },
                        closeOnBgClick: false,
                        removalDelay: 50,
                        callbacks: { 
                            close: function() {
                                // Will fire when popup is closed
                                //UI.GA.ga_post('Promoter Prep Signup' , 'Promoter Prep Signup Status', 'SignUp  Cancel');
                            }
                        }
                    });
                }
                else{
                    showPageAlert('Message', data.message);
                }       
           });  
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