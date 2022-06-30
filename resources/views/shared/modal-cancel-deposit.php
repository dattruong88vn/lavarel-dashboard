<div id="modalCancelDeposit" data-page="<?php echo (isset($defineId) && $defineId ==33) ? 'tour-listing' : $isPage; ?>" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Hủy đặt cọc</h4>
            </div>
            <div class="modal-body">
                <div id="content-negotiate">
                    <div class="form-group">
                        <div class="row">
                            <p class="col-md-12">Bạn có muốn hủy cọc ? Nếu hủy sẽ...</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-12">Lý do hủy</label>
                            <div class="col-md-12">
                                <select class="reason-cancel-deposit form-control" name="reason-cancel-deposit" id="reason-cancel-deposit">
                                    <?php foreach ($reason_deposite as $item) { ?>
                                        <option value="<?php echo $item->reasonId ?>"><?php echo $item->reasonName ?></option>
                                    <?php } ?>
                                </select>
                                <div id="container-text-other" style="display: none; margin-top: 7px;">
                                    <label>Nhập lý do khác</label>
                                    <input type="text" class="form-control" id="text-other" name="text-other">
                                </div>
                                <script type="text/javascript">
                                    $("#reason-cancel-deposit").change(function(){
                                        if($(this).find("option:selected").text()=="Khác"){
                                            $("#container-text-other").show();
                                        }else{
                                            $("#container-text-other").hide();
                                        }
                                    });
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="JMDetail.cancelDeposit(<?php echo $depositId; ?>);">Hủy đặt cọc</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</div>
