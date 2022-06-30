<div id="deposit-modal" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Thông tin đặt cọc</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
                    <input type="hidden" id="deposit-info-rlistingId" value="">
                    <input type="hidden" id="deposit-info-id" value="">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col-md-6">
                                <a href="#"  id="deposit-info-link-detail" target="_blank"></a>
                            </div>
                            <div class="col-md-6">
                                <a href="#" style="float: right" id="deposit-info-link-history" target="_blank">Xem lịch sử đặt cọc ...</a>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-6">
                                <label>Chủ tin đăng:  </label> <span id="deposit-info-owner-name" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-6">
                                <label>Phân loại:  </label> <span id="deposit-info-owner-type-name" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-6">
                                <label>Số điện thoại:  </label> <span id="deposit-info-owner-phone" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-6">
                                <button style="margin-top: 25px;" class="btn-sm btn btn-success" id="deposit-modal-call"><i class="fa fa-phone"></i> Gọi chủ tin đăng</button>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-6">
                                <label>Số tiền chốt bán :  </label> <span id="deposit-info-price" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-6">
                                <label>Số tiền đặt cọc :  </label> <span id="deposit-info-price-desposit" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Ngày giờ hẹn :  </label> <span id="deposit-info-time" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Địa điểm đặt cọc :  </label> <span id="deposit-info-place" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Thông tin pháp lý :  </label> <div id="deposit-info-privacy"></div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Trạng thái đặt cọc</label>
                                <select class="form-control" id="deposit-modal-status" >
                                    <option value="1" selected>Đồng ý</option>
                                    <option value="2">Hủy</option>
                                    <option value="3">Thay đổi thời gian đặt cọc</option>
                                </select>
                            </div>
                        </div>
                        <div class="row form-group deposit-modal-accept-wrapper" style="display: none">

                        </div>
                        <div class="row form-group deposit-modal-reject-wrapper" style="display: none">
                            <div class="col-md-12">
                                <label>Lý do</label>
                                <select class="form-control" id="deposit-modal-reject-reason" ></select>
                            </div>
                        </div>
                        <div class="row form-group deposit-modal-change-time-wrapper" style="display: none">
                            <div class="col-md-12">
                                <label>Thời gian mới: </label>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="input-group date" id="deposit-modal-meeting-date">
                                            <input type="text" class="form-control date-range-to">
                                            <div class="input-group-addon">
                                                <span class="glyphicon glyphicon-th"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group bootstrap-timepicker timepicker" id="deposit-modal-meeting-time">
                                            <input type="text"  class="form-control">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group deposit-modal-change-time-wrapper" style="display: none">
                            <div class="col-md-12">
                                <label>Địa điểm mới: </label>
                                <div class="form-group" >
                                    <div class="col-md-12">
                                        <select id="deposit-modal-transaction-place" class="form-control"></select>
                                    </div>
                                </div>
                                <input class="form-control" id="deposit-modal-meeting-place" placeholder="Nhập địa điểm mới"/>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label > Ghi chú từ SA sang BA</label>
                                <textarea rows="5" class="form-control" id="deposit-modal-note"></textarea>

                            </div>
                        </div>
                    </div>
					<div class="row">
                        <div class="col-md-12">
						    <div id="noteCRM-wrapper" class="col-md-12"></div>
                        </div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
				<button id="btn-save-deposit" type="button" class="btn btn-success">Lưu</button>
			</div>
		</div>
	</div>
</div>
<div id="deposit-modal-show-phone" class="modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Thông tin số điện thoại</h4>
            </div>
            <div class="modal-body message">
                <div class="form-horizontal">
                    <div class="col-md-12" id="deposit-modal-call-content"></div>
                </div>
            </div>
            <div class="modal-footer" style="border: none">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-deposit-call" type="button" class="btn btn-success">Gọi</button>
            </div>
        </div>
    </div>
</div>