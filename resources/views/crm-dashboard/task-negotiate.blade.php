@extends('layout.default')

@section('content')
    <input type="hidden" id="csrf-token" value="{{csrf_token()}}" />
    <div class='dashboard'>
        <section id="tasks" class="tm-home">
            <div class="content-header" style="margin-bottom: 25px;">
                <h2><a href="/">&larr;</a> {{$task->taskName}}</h2>
            </div>
            <div class="detailt">
                <?php if (isset($task->isClosed) && $task->isClosed == false): ?>
                    <div>
                    <input type="hidden" class="customerPhone" value="{{base64_encode($task->phoneNumber)}}" />
                    <button class="btn btn-app makeCall">
                        <i class="fa fa-phone"></i> Gọi
                    </button>
                    <?php if($task->statusId!=1) { ?>
                            <?php if($defineId == 113 || $defineId == 112 || $defineId == 111) { ?>
                                    <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.showNegotiateModal();">
                                        <i class="fa fa-exchange"></i>
                                        Thương lượng lại
                                    </button>
                                    <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.changeStatusNegotate({{ $task->negotiationId}},{{$taskId}},1);">
                                        <i class="fa fa-check"></i>
                                        Chấp nhận thương lượng
                                    </button>
                                    <button class="btn btn-app" style="background-color: #dd4b39; color:#fff" data-toggle="modal" data-target="#modalPeddingNegotiate">
                                        <i class="fa fa-user-times"></i>
                                        Dừng thương lượng
                                    </button>
                                    <button class="btn btn-app" style="background-color: #dd4b39; color:#fff" onclick="JMDetail.changeStatusNegotate({{ $task->negotiationId}},{{$taskId}},4);">
                                        <i class="fa fa-user-times"></i>
                                        Hủy thương lượng
                                    </button>
                            <?php } else if($defineId == 117 || $defineId ==137 || $defineId ==138) {  ?>
                                    <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.showNegotiateModal();">
                                        <i class="fa fa-exchange"></i>
                                        Thương lượng lại
                                    </button>
                                    <button class="btn btn-app" style="background-color: #dd4b39; color:#fff" onclick="JMDetail.changeStatusNegotate({{ $task->negotiationId}},{{$taskId}},4);">
                                        <i class="fa fa-user-times"></i>
                                        Hủy thương lượng
                                    </button>
                            <?php } ?>
                    <?php } else {  ?>
                                <button class="btn btn-app" style="background-color: #fff" data-negotiateId="{{$taskId}}" onclick="JMDetail.showModalDeposit();">
                                    <i class="fa fa-dollar"></i>
                                    Đăt cọc
                                </button>
                     <?php } ?>
                    </div>
                <?php endif; ?>
                <h3>Thông tin thương lượng</h2>
                <div style="background-color: #f9f9f9; padding:0 15px; box-shadow: 0 1px 1px rgba(0,0,0,0.1);">
                    <div class="row item" style="padding: 15px 0;">
                        <div class="col-md-6"><b>Tình trạng: </b> <span class="status-{{ $task->statusId }}"> {{ $task->statusName }}</span></div>
                        <?php $epoch = $task->updatedDate/1000; ?>
                        <div class="col-md-6"><b>Ngày cập nhật: </b> <?php echo date('d/m/Y h:i A', $epoch) ?></div>
                    </div>
                    <div class="row" style="padding: 15px 0; background-color: #fff;">
                        <div class="col-md-6"><b>Giá thương lượng: </b> {{ $task->negotiationPrice }}</div>
                        <div class="col-md-6"><b>Giá bán: </b> {{ $task->currentPrice }}</div>
                    </div>
                    <div class="row" style="padding: 15px 0;">
                        <div class="col-md-6"><b>Listing: </b><a href="javascript:;" onclick="JMDetail.openModalListingDetailForAllPage({{ $task->rListingId }});return false;">{{ $task->rListingId }}</a></div>
                        <div class="col-md-6"><b>Deal: </b><a href="/deal/detail/{{ $task->dealId }}" target="_blank">{{ $task->dealId }}</a> </div>
                    </div>
                    <div class="row" style="padding: 15px 0;">
                        <div class="col-md-6"><b>Điều kiện chủ nhà tới người mua: </b>{{ $task->ownerNote }}</div>
                        <div class="col-md-6"><b>Điều kiện người mua tới chủ nhà: </b>{{ $task->buyerNote }}</div>
                    </div>
                </div>
            </div>
            <style type="text/css">
                .status-1{
                    border-radius: 30px; padding: 2px 7px; background-color:#3c8dbc; color: #fff;
                }
                .status-2{
                    border-radius: 30px; padding: 2px 7px; background-color:#3c8dbc; color: #fff;
                }
                .status-3{
                    border-radius: 30px; padding: 2px 7px; background-color:#dd4b39; color: #fff;
                }
                .status-4{
                    border-radius: 30px; padding: 2px 7px; background-color:#dd4b39; color: #fff;
                }
            </style>
            <h3>Lịch sử thương lượng</h2>
            <div class="box box-primary">
                <table id="lead-list"  class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Người tạo</th>
                        <th>Giá bán</th>
                        <th>Giá thương lượng</th>
                        <th>Ngày cập nhật</th>
                        <th>Ghi chú</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php if(!empty($task)) { ?>
                        <?php foreach ($task->data as $key => $item) { ?>
                            <tr>
                                <td><?php echo $key+1; ?></td>
                                <td><?php echo $item->createdByName; ?></td>
                                <td><?php echo number_format($item->data->currentPrice); ?></td>
                                <td><?php echo number_format($item->data->negotiationPrice); ?></td>
                                <!-- td><?php echo $item->data->updatedDate/1000 ?></td -->
                                <td><?php echo date('d/m/Y h:i:s', round($item->data->updatedDate/1000)) ?></td>
                                <td><?php echo $item->data->note; ?></td>
                            </tr>
                        <?php } ?>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
    @include('/shared.modal-negotiate')
    @include('/shared.modal-pedding-negotiate')
    @include('/shared.modal-deposit')
    @include('/shared.modal-choose-phone-number')
@endsection

@section('page-js')
    <script src="{{loadAsset('/plugins/select2/select2.full.min.js')}}"></script>
    <script src="{{loadAsset('/dist/js/jquery.magnific-popup.min.js')}}"></script>
    <script src="{{loadAsset('/js/helper.js')}}"></script>
    <script src="{{loadAsset('/plugins/chartjs/Chart.min.js')}}"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"></script> -->
    <script src="{{loadAsset('/plugins/daterangepicker/daterangepicker.js')}}"></script>

    <script src="{{loadAsset('/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
    <script src="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.js')}}"></script>
    <script src="{{loadAsset('/plugins/datatables/jquery.dataTables.min.js')}}"></script>
    <script src="{{loadAsset('/plugins/datatables/dataTables.bootstrap.min.js')}}"></script>
    <script src="{{loadAsset('/js/dashboard.js')}}"></script>

    <script type="text/javascript">
        var tasksInfo = <?php echo json_encode($task) ?>;
        console.log(tasksInfo);
    </script>
    <script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
    <script src="{{loadAsset('/js/commons/jquery.number-percent.js')}}"></script>
    <script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
    <script type="text/javascript">
        (function() {
            $(document).ready(function () {
                $(".makeCall").on("click", function (event) {
                    event.preventDefault();
                    //$('body').css('pointer-events', 'none');
                    var phoneNumber = $(".customerPhone").val().trim();
                    phoneNumber = Base64.decode(phoneNumber);
                    if ($(".customerPhone").val().indexOf(",") > 0) {
                        phoneNumbers = phoneNumber.split(",");
                        ModalChoosePhoneNumber.showModal({
                            phoneNumbers: phoneNumbers,
                            onItemChosen: function (data) {
                                console.log(data);
                                DealFunctions.makeCall({
                                    type: 78,
                                    phoneNumber: data.phoneNumber,
                                    dealId: tasksInfo.dealId,
                                    leadId: null
                                });
                            }
                        });
                    } else {
                        DealFunctions.makeCall({
                            type: 78,
                            phoneNumber: phoneNumber,
                            dealId: tasksInfo.dealId,
                            leadId: null
                        });
                    }
                });
            });
        })($);
    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop


