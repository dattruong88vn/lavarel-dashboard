<div id="modalPeddingNegotiate" data-page="<?php echo (isset($defineId) && $defineId ==33) ? 'tour-listing' : $isPage; ?>" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Dừng thương lượng</h4>
            </div>
            <div class="modal-body">
                <div id="content-negotiate">
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-12">Lý do dừng thương lượng</label>
                            <div class="col-md-12">
                                <select class="reason-pedding-negotation form-control" name="reason-pedding-negotation" id="reason-pedding-negotation">
                                    <?php foreach ($task->reason as $item) { ?>
                                        <option value="<?php echo $item->reasonId ?>"><?php echo $item->reasonName ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-12">Thời gian nhắc nhở</label>
                                <div class="col-md-6">
                                    <label>Thời gian <span style="color:red">*</span></label>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input name='startDate' data-validate-require="true" data-validate-message="Trường Thời gian không được trống" id="reminder-time" type="text" class="form-control" value=""/>
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Ngày <span style="color:red">*</span></label>
                                    <div class="input-group bootstrap-datepicker datepicker">
                                        <input name='startDate' data-validate-require="true" data-validate-message="Trường ngày không được trống" id="reminder-date" type="text" class="form-control" value="" placeholder="Từ"/>
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="JMDetail.changeStatusNegotate(<?php echo $task->negotiationId; ?>,<?php echo $taskId ?>,3);">Dừng thương lượng</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var firstLoadReminderDate = true;
    $(document).ready(function(){
        $("#reminder-time").timepicker({
            showMeridian: false
        })
        $("#reminder-date").datepicker({
            format:'dd-mm-yyyy',
            autoclose: true,
            minDate: 0,
        }).on('show', function (e) {
            var currentdate = new Date();
            var startDate = currentdate.getDate() + "-"
                + (currentdate.getMonth() + 1) + "-"
                + currentdate.getFullYear();
            console.log(startDate);
            $(this).data('datepicker').setStartDate(startDate);
            firstLoadReminderDate = false;
        }).on('changeDate',function (e) {
            if(firstLoadReminderDate){
                return;
            }
            var dateSend = $("#reminder-date").val().trim().trim().replace(/(\d\d)-(\d\d)-(\d{4})/g, "$3/$2/$1");
            var timeSend = $("#reminder-time").val().trim().length == 0 ? '00:00': $("#reminder-time").val().trim();
            var timestamp = Math.round(new Date( dateSend+" "+timeSend ).getTime());
            if(timestamp < new Date().getTime()){
                alert("Thời gian nhắc nhở phải lớn hơn thời gian hiện tại");
                $("#reminder-time").val();
                $("#reminder-time").focus();
            }
        });
    });
</script>
