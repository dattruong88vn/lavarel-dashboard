@extends('layout.default')
<script type="text/javascript">
    var tasksInfo = <?php echo json_encode($task) ?>;
</script>
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
                    <?php if($defineId == 115) { ?>
                        <!-- Hỗ trợ đặt cọc cho người bán và người mua, Khi này đã xác nhận metting -->
                        <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.printDeposit(tasksInfo);">
                            <i class="fa fa-print"></i>
                            In thông tin đặt cọc
                        </button>
                        <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.showModalDeposit();">
                            <i class="fa fa-history"></i>
                            Hẹn đặt cọc lại
                        </button>
                        <button class="btn btn-app" style="background-color: #1785a0; color: #fff; " onclick="JMDetail.finishDeposit();">
                            <i class="fa fa-check"></i>
                            Hoàn thành đặt cọc
                        </button>
                        <button class="btn btn-app" style="background-color: #dd4b39; color: #fff;" data-toggle="modal" data-target="#modalCancelDeposit">
                            <i class="fa fa-remove "></i>
                            Hủy đặt cọc
                        </button>
                    <?php } else if($defineId == 118) {  ?>
                        <!-- Bên SA từ chối -->
                        <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.printDeposit(tasksInfo);">
                            <i class="fa fa-print"></i>
                            In thông tin đặt cọc
                        </button>
                        <button class="btn btn-app hidden" style="background-color: #fff" onclick="JMDetail.showModalDeposit();">
                            <i class="fa fa-history"></i>
                            Hẹn đặt cọc lại
                        </button>
                        <button class="btn btn-app" style="background-color: #dd4b39; color: #fff;" data-toggle="modal" data-target="#modalCancelDeposit">
                            <i class="fa fa-remove "></i>
                            Hủy đặt cọc
                        </button>
                    <?php } else if($defineId == 119 || $defineId == 120) {  ?>
                        <!-- Hỗ trợ đặt cọc cho người bán và người mua (Chờ cập nhật) -->
                        <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.printDeposit(tasksInfo);">
                            <i class="fa fa-print"></i>
                            In thông tin đặt cọc
                        </button>
                        <button class="btn btn-app" style="background-color: #fff" onclick="JMDetail.showModalDeposit();">
                            <i class="fa fa-history"></i>
                            Hẹn đặt cọc lại
                        </button>
                        <button class="btn btn-app" style="background-color: #1785a0; color: #fff; " onclick="JMDetail.finishDeposit();">
                            <i class="fa fa-check"></i>
                            Hoàn thành đặt cọc
                        </button>
                        <?php if($task->statusId==5 || $task->statusId ==7) { ?>
                        <button class="btn btn-app" style="background-color: #00a65a; color:#fff;" onclick="JMDetail.confirmDeposit({{$taskId}});">
                            <i class="fa fa-thumbs-up"></i>
                            Xác nhận metting
                        </button>
                        <?php } ?>
                        <button class="btn btn-app" style="background-color: #dd4b39; color: #fff;" data-toggle="modal" data-target="#modalCancelDeposit">
                            <i class="fa fa-remove "></i>
                            Hủy đặt cọc
                        </button>
                    <?php } ?>
                </div>
                <?php endif; ?>
                <h3>Thông tin giấy tờ</h2>
                <div style="background-color: #f9f9f9; padding:0 15px; box-shadow: 0 1px 1px rgba(0,0,0,0.1);">
                    <div class="row item" style="padding: 15px 0;">
                        <div class="col-md-6">
                            <h4 style="margin: 0px">Bên bán</h4>
                            <?php if(!empty($task->ownerAnswers)) { ?>
                                <?php foreach ($task->ownerAnswers as $item) { ?>
                                    <?php if(!empty($item->value)) {?>
                                        <div style="padding: 5px;">- <?php echo $item->answer ?></div>
                                    <?php } ?>
                                <?php } ?>
                            <?php } else{  ?>
                                <div style="border:1px solid #ff998c; margin-top: 10px; padding: 10px;">Chưa có giấy tờ</div>
                            <?php } ?>
                        </div>
                        <div class="col-md-6">
                            <h4 style="margin: 0px">Bên mua</h4>
                            <div><b><?php echo $task->questionGroupName; ?></b></div>
                            <?php if(!empty($task->buyerAnswers)) { ?>
                                <?php foreach ($task->buyerAnswers as $item) { ?>
                                    <?php if(!empty($item->value)) {?>
                                        <?php if($item->control=='checkbox') {?>
                                            <div style="padding: 5px;">- <?php echo $item->answer ?></div>
                                            <?php if(!empty($item->subResults)) {?>
                                                <?php foreach ($item->subResults as $item_sub) { ?>
                                                    <?php if(!empty($item_sub->value)) {?>
                                                        <div style="padding: 5px 5px 5px 15px;">+ <?php echo $item_sub->answer ?>:  <?php echo $item_sub->value ?></div>
                                                    <?php } ?>
                                                <?php } ?>
                                            <?php } ?>
                                        <?php } else if($item->control=='text') { ?>
                                            <div style="padding: 5px;">- <?php echo $item->answer ?>: <?php echo $item->value; ?></div>
                                        <?php } ?>
                                    <?php } ?>
                                <?php } ?>
                            <?php } ?>
                        </div>
                    </div>
                </div>

                <h3>Thông tin Đặt cọc</h2>
                <div id="body-deposit" style="background-color: #f9f9f9; box-shadow: 0 1px 1px rgba(0,0,0,0.1);">
                    <table id="content-diposit-table">
                        <tr>
                            <td><b>Khách hàng: </b> <?php echo $task->customerName ?></td>
                            <td><b> Thông tin listing: </b> <a href="javasctipt:;" onclick="JMDetail.openModalListingDetailForAllPage({{ $task->listingId }});return false;"> {{ $task->listingId }}</a></td>

                        </tr>
                        <tr>
                            <td><b>Chủ nhà: </b> <?php echo $task->ownerName ?></td>
                            <td> <b> Deal: </b> <a href="/deal/detail/{{ $task->dealId }}" target="_blank"> #{{ $task->dealId }}</a></td>

                        </tr>
                        <tr>
                            <?php  $epoch = $task->depositMeeting->scheduleTime/1000; ?>
                            <td> <b>Ngày giờ đặt cọc: </b> <?php echo date('d/m/Y h:i A', $epoch) ?></td>
                            <td><b>Cần vay vốn: </b> {{ $task->isLoanNeeded ? number_format($task->depositMeeting->loanValue): 'Không có nhu cầu' }}</td>

                        </tr>
                        <tr>
                            <td><b>Địa điểm đặt cọc: </b> <span style="font-size: 13px;">{{ $task->depositMeeting->address }}</span></td>
                            <td><b>Ghi chú SA tới BA: </b><span style="font-size: 13px;">{{ $task->note }}</span></td>
                        </tr>
                        <tr>
                            <td><b>Số tiền đặt cọc: </b> {{ number_format($task->depositPrice) }}</td>
                            <td><b>Trạng thái: </b><span class="status-{{ $task->statusId }}"> {{ $task->statusId!=9 ? $task->statusName : 'Hoàn thành'}}</span></td>

                        </tr>
                        <tr>
                            <td><b>Giá chốt cọc: </b> {{ number_format($task->price) }}</td>
                            <td><div class="hidden"><b>Sử dụng dịch vụ: </b> {{ $task->isEsCrowService ? 'Có': 'Không có' }}</div></td>
                        </tr>
                        @if(!empty($task->agentCommisstionPrice))
                          <tr>
                              <td><b>Hoa hồng (môi giới): </b> {{ number_format($task->agentCommisstionPrice) }}</td>
                              <td class="hidden"></td>
                          </tr>
                        @endif
                    </table>
                </div>
            </div>
            <style type="text/css">
                table#content-diposit-table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }

                table#content-diposit-table td, table#content-diposit-table th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 15px;
                }

                table#content-diposit-table tr:nth-child(even) {
                    background-color: #dddddd;
                }
                #body-deposit .item{
                    padding: 15px;
                }
                #body-deposit .col-md-6{
                    padding: 0;
                }
                .status-7{
                    border-radius: 30px; padding: 2px 7px; background-color:#2196F3; color: #fff;
                }
                .status-8{
                    border-radius: 30px; padding: 2px 7px; background-color:#F44336; color: #fff;
                }
                .status-6{
                    border-radius: 30px; padding: 2px 7px; background-color:#F44336; color: #fff;
                }
                .status-5{
                    border-radius: 30px; padding: 2px 7px; background-color:#FF9800; color: #fff;
                }
                .status-9{
                    border-radius: 30px; padding: 2px 7px; background-color:#2196F3; color: #fff;
                }
            </style>
    </div>

    <div id="finishDeposit" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Hoàn thành quy trình đặt cọc</h4>
                </div>
                <div class="modal-body">
                    <div style="background-color: #f9f9f9; padding:0 15px; box-shadow: 0 1px 1px rgba(0,0,0,0.1);">
                        <div class="row item" style="padding: 15px 0; background-color: #fff;">
                            <div class="col-md-6"><b>Khách hàng: </b> <?php echo $task->customerName ?></div>
                            <div class="col-md-6"><b>Chủ nhà: </b> <?php echo $task->ownerName ?> </div>
                        </div>
                        <div class="row item" style="padding: 15px 0;">
                            <?php  $epoch = $task->depositMeeting->scheduleTime/1000; ?>
                            <div class="col-md-6"><b>Ngày giờ đặt cọc: </b> <?php echo date('d/m/Y h:i A', $epoch) ?></div>
                            <div class="col-md-6"><b>Địa điểm đặt cọc: </b> {{ $task->depositMeeting->address }} </div>
                        </div>
                        <div class="row" style="padding: 15px 0; background-color: #fff;">
                            <div class="col-md-6"><b>Số tiền đặt cọc: </b> {{ $task->formattedDepositPrice }}</div>
                            <div class="col-md-6"><b>Thông tin listing: </b> <a href="javasctipt:;" onclick="JMDetail.openModalListingDetailForAllPage({{ $task->listingId }});return false;"> {{ $task->listingId }}</a></div>
                        </div>
                        <div class="row" style="padding: 15px 0; background-color: #f9f9f9;">
                            <div class="col-md-6"><b>Cần vay vốn: </b> {{ $task->isLoanNeeded ? $task->depositMeeting->loanValue: 'Không có nhu cầu' }}</div>
                            <div class="col-md-6"><b>Sử dụng dịch vụ: </b> {{ $task->isEsCrowService ? 'Có': 'Không có' }}</div>
                        </div>
                        <div class="row" style="padding: 15px 0; background-color: #fff;">
                            <div class="col-md-6"><b>Ghi chú SA tới BA: </b>{{-- $task->depositEventReason --}}{{ $task->note }}</div>
                            <div class="col-md-6"><b>Trạng thái: </b><span class="status-{{ $task->statusId }}"> {{ $task->statusId!=9 ? $task->statusName : 'Hoàn thành'}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btn-finishDeposit">Hoàn thành </button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
    <style type="text/css" media="print">
        @page
        {
            size: auto;   /* auto is the initial value */
            margin: 0mm;  /* this affects the margin in the printer settings */
        }
    </style>
    @include('/shared.modal-deposit')
    @include('/shared.modal-cancel-deposit')
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

    <script type="text/javascript" src="/js/jm_commons/leadDealDetail/scripts.js"></script>
    <script src="{{loadAsset('/js/commons/deal/deal-functions.js')}}"></script>
    <script src="{{loadAsset('/js/commons/jquery.number-percent.js')}}"></script>
    <script type="text/javascript">
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

    </script>
@stop
@section('page-css')
    <link href="{{loadAsset("/plugins/datepicker/datepicker3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/daterangepicker/daterangepicker-bs3.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset("/plugins/datatables/dataTables.bootstrap.css")}}" rel="stylesheet" type="text/css" />
    <link href="{{loadAsset('/plugins/timepicker/bootstrap-timepicker.css')}}" rel="stylesheet" type="text/css" />
@stop
