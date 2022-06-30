<div id="modal-deposit" data-page="<?php echo (isset($defineId) && $defineId ==33) ? 'tour-listing' : $isPage; ?>" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Đặt cọc</h4>
            </div>
            <div class="modal-body">
                <div id="list-question">
                    <div id="buyer-question">
                        <h4 class="title-with-line"><span>Thông tin, giấy tờ cần thiết bên mua <span style="color:red; background: none;">*</span></span></h4>
                        <?php if(!empty($list_group_question)) { ?>
                            <select name="list_group_question" id="list_group_question" class="form-control">
                                <option value="-1">---- Chọn nhóm giấy tờ---- </option>
                                <?php foreach($list_group_question as $item){ ?>
                                    <?php if(isset($task->questionGroupId) && $item->id == $task->questionGroupId) { ?>
                                        <option selected="selected" value="<?php echo $item->id;?>"><?php echo $item->name; ?></option>
                                    <?php }else { ?>
                                        <option value="<?php echo $item->id;?>"><?php echo $item->name; ?></option>
                                    <?php } ?>
                                <?php }?>
                            </select>
                            <div class="show-error-giay-to" style="display: none; left: 15px; bottom: -20px; color:red; font-size: 13px;">Thông tin, giấy tờ không được trống</div>
                        <?php } ?>
                        <div id="show-list-question" style="margin-top: 10px;">
                            <?php if(!empty($list_question)){  ?>
                                <?php foreach($list_question as $item){ ?>
                                    <?php $item->validate = isset($list_question_check[$item->questionItemId]) ? $item->validate =  $list_question_check[$item->questionItemId]->value : $item->validate; ?>
                                    <div class="form-group">
                                        <?php if($item->control == 'checkbox') { ?>
                                            <label>
                                                <input data-parent="true" data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $item->questionId;?>" type="checkbox" value="1" <?php echo $item->value==1 ? 'checked="checked"':''; ?> class="checkbox-parent">
                                                <?php echo $item->answer ?>
                                            </label>
                                            <div class="sub-question" style="margin-left: 15px; <?php echo ($item->validate=='1') ? '':'display:none' ?>">
                                                <?php if(!empty($item->subResults)){?>
                                                    <?php foreach($item->subResults as $subQuestion){ ?>
                                                        <?php if($subQuestion->control == 'checkbox') { ?>
                                                            <label>
                                                                <input data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $subQuestion->questionId;?>" type="checkbox" value="<?php echo $subQuestion->value; ?>" <?php echo ($subQuestion->value==1 && $item->value==1) ? 'checked="checked"':'';  ?>>
                                                                <?php echo $subQuestion->answer ?>
                                                            </label>
                                                        <?php } else if($subQuestion->control == 'text') { ?>
                                                            <label><?php echo $subQuestion->answer ?></label>
                                                            <input name="" data-id="<?php echo $subQuestion->questionItemId;?>" data-question-id="<?php echo $subQuestion->questionId;?>" type="text" value="<?php echo $subQuestion->value; ?>" class="form-control">
                                                        <?php }?>
                                                    <?php }?>
                                                <?php } ?>
                                            </div>
                                        <?php } else if($item->control == 'text') { ?>
                                            <label><?php echo $item->answer ?></label>
                                            <input data-id="<?php echo $item->questionItemId;?>" data-question-id="<?php echo $item->questionId;?>" type="text" value="<?php echo $item->value; ?>" class="form-control">
                                        <?php }?>
                                    </div>
                                <?php }?>
                            <?php } else { ?>
                                <div style="padding: 10px; text-align: center; border:1px solid ##f3581d; background-color: #ffe2d7">Chọn nhóm giấy tờ pháp lý để tiếp tục</div>
                            <?php }?>
                        </div>
                    </div>
                    <div id="time-view">
                        <h4 class="title-with-line"><span>Thời gian và địa điểm đặt cọc</span></h4>
                        <div id="old-time" class="text-center" style="background-color:#f5fdff;display: none; font-size: 16px; margin-bottom: 10px; padding: 3px; border:1px solid #00c0ef;">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Thời gian <span style="color:red">*</span></label>
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input name='startDate' data-validate-require="true" data-validate-message="Trường Thời gian không được trống" id="view-time" type="text" class="form-control" value=""/>
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Ngày <span style="color:red">*</span></label>
                                    <div class="input-group bootstrap-datepicker datepicker">
                                        <input name='startDate' data-validate-require="true" data-validate-message="Trường ngày không được trống" id="view-date" type="text" class="form-control" value="" placeholder="Từ"/>
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label class="col-sm-12">Điểm hẹn đặt cọc <span style="color:red">*</span></label>
                                <div class="col-md-12">
                                    <select name="tc-postion" id="tc-postion" class="form-control">
                                        <?php foreach (get_transaction_centers() as $item){  ?>
                                            <option value="<?php echo $item->id ?>" data-address="<?php echo $item->address ?>"><?php echo $item->name ?></option>
                                        <?php } ?>
                                    </select>
                                    <input style="display: none; margin-top: 5px;" name="address-deposit" data-validate-require="true" data-validate-message="Địa chỉ không được trống" id="address-deposit" placeholder="nhập địa điểm đặt cọc" class="form-control"/>
                                    <script type="text/javascript">
                                        $("#tc-postion").change(function () {
                                             if($(this).val()==3 || $(this).find('option:selected').data('address')==-1){
                                                 $("#address-deposit").show();
                                             }else{
                                                 $("#address-deposit").hide();
                                             }
                                        });
                                    </script>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 class="title-with-line"><span>Thông tin đặt cọc</span></h4>
                    <div id="form-deposit">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Giá chốt bán</label>
                                    <div>
                                        <input type="text" name="hard-price" data-validate-require="true" readonly class="hard-price form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Số tiền cọc <span style="color:red">*</span></label>
                                    <div>
                                        <input type="text" name="negotiate-price" data-validate-require="true" data-validate-message="Trường giá không được trống" id="negotiate-price" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Listing: </label>
                                    <div id="listing-id-view">

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Khu vực</label>
                                    <div>
                                        <input type="text" readonly name="district-name-price" id="district-name-price" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label style="margin-bottom:0px;">Doanh thu thực tế <span style="color:red">*</span> </label>
                                    <div style="color:red;font-size:13px;">Tổng số tiền sẽ nhận từ khách hàng </div>
                                    <div>
                                        <input type="text" data-validate-require="true" data-validate-message="Trường doanh thu không được trống" name="actual-commission" id="actual-commission" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Hoa hồng thực tế(%)</label>
                                    <div>
                                        <input type="text" name="actual-rate" id="actual-rate" class="form-control number-percent">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label style="margin-bottom:0px;">Thực chi TPA </label>
                                    <div style="color:red;font-size:13px;">Số tiền sẽ chi cho TPA </div>
                                    <div>
                                        <input type="text" name="tpa-commission" id="tpa-commission" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label>Hoa hồng TPA(%)</label>
                                    <div>
                                        <input type="text" name="tpa-rate" id="tpa-rate" class="form-control number-percent">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Có yêu cầu vốn</label>
                                    <div>
                                        <select name="require-original-money" id="require-original-money" class="form-control">
                                            <option value="true">Có</option>
                                            <option value="false">Không</option>
                                        </select>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div id="loan-value">
                                        <label>Số tiền vay <span style="color:red">*</span></label>
                                        <input type="text" id="load-value" name="load-value" class="form-control">
                                        <div class="show-error-so-tien-vay" style="display: none; position: absolute; left: 15px; bottom: -20px; color:red; font-size: 13px;">Số tiền vay không được trống</div>
                                    </div>
                                    <script type="text/javascript">
                                        $("#require-original-money").change(function () {
                                            var isLoan = $(this).val();
                                            if(isLoan == "false")
                                                $("#loan-value").hide();
                                            else
                                                $("#loan-value").show();
                                        });
                                    </script>
                                    <div class="hidden">
                                        <label>Có sử dụng dịch vụ Escrow</label>
                                        <div>
                                            <select name="require-service-escrow" id="require-service-escrow" class="form-control">
                                                <option value="true">Có</option>
                                                <option value="false">Không</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <label class="col-sm-12">Ghi chú</label>
                                <div class="col-md-12">
                                    <textarea name="note-deposit" id="note-deposit" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="send-deposit">Đặt cọc</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function(){
        $("#view-time").timepicker({
            showMeridian: false
        })
        $("#view-date").datepicker({
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
        }).on('changeDate',function (e) {
                var dateSend = $("#view-date").val().trim().trim().replace(/(\d\d)-(\d\d)-(\d{4})/g, "$3/$2/$1");
                var timeSend = $("#view-time").val().trim().length == 0 ? '00:00': $("#view-time").val().trim();
                var timestamp = Math.round(new Date( dateSend+" "+timeSend ).getTime());
                if(timestamp < new Date().getTime()){
                    alert("Lịch đặt cọc đang là trong quá khứ, Chọn lại giờ");
                    $("#view-time").val();
                    $("#view-time").focus();
                }

        });
        $("#list_group_question").change(function () 
        {   /*get list question by group */
            $.ajax({
                url: "/deal/get-question-deposit-by-group/"+$("#list_group_question").val(),
                type: "GET",
                beforeSend: function (xhr) {
                    //dashboardNotify('success',"<div class='text-center'> <i class=\"icon-loadding fa fa-spinner\"></i><br>Đang gửi thông tin...</div>");
                }
            }).done(function (response) {
                if(!response.error) {
                    $("#show-list-question").html(response.content);
                    $('.datepicker_question').datepicker({
                        format:'dd-mm-yyyy',
                        autoclose: true,
                        minDate: 0,
                    })
                }else {
                    dashboardNotify('error', "Đã có lỗi sảy ra khi tải, Kiểm tra mạng của bạn. Trường hợp xấu đây là lỗi hệ thống");
                }
            }).fail(function () {
                dashboardNotify('error',"Đã có lỗi sảy ra");
            }).always(function () {
            });
        });
    });
</script>