<div id="modalNegotiate" data-page="<?php echo (isset($defineId) && $defineId ==33) ? 'tour-listing' : $isPage; ?>" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Thương lượng</h4>
            </div>
            <div class="modal-body">
                <div id="content-negotiate">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6" style="position: relative">
                                <label class="col-sm-12">Giá bán</label>
                                <div class="col-md-12">
                                    <input type="text" name="old-price" readonly class="old-price form-control">
                                    <input type="hidden" name="actionCode" value="0" class="actionCode">
                                </div>
                                <span style="position: absolute; top:60%; right: -7px;" class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
                            </div>
                            <div class="col-md-6">
                                <label class="col-sm-12">Giá thương lượng mới <span style="color:red">*</span></label>
                                <div class="col-md-12">
                                    <input type="text" data-validate-require="true" data-validate-message="Giá thương lượng không được để trống"  name="new-price" id="new-price" class="new-price form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12" id="message-error"></div>
                            <div class="col-md-12">
                                <label class="col-sm-12">Điều kiện người mua tới người bán</label>
                                <div class="col-md-12">
                                    <textarea name="condition" class="condition form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-md-12" style="margin-top: 10px;">
                                <label class="col-sm-12">Ghi chú (BA tới SA)</label>
                                <div class="col-md-12">
                                    <textarea name="note" class="note form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="history-negotiation">
                    <div class="text-center"><a style="display: inline-block; margin-bottom: 10px; color: #3c8dbc;" href="#content-history" data-toggle="collapse"  aria-expanded="false" aria-controls="collapseExample">Xem lịch sử thương lượng</a></div>
                    <div id="content-history" class="collapse">
                        <div class="text-center"> Chưa có lịch sử</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="button-send-negotiation" class="btn btn-primary" onclick="JMDetail.showModalDeposit();">Đặt cọc</button>
                    <button type="button" id="button-negotiate" onclick="JMDetail.sendDataNegotiate();" class="btn btn-info">Thương lượng</button>
                </div>
            </div>
        </div>
    </div>
</div>
