<div id="deposit-support-modal" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Thông tin hỗ trợ khách hàng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label>Chủ tin đăng:  </label> <span id="deposit-info-owner-name" class="form-control" readonly></span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label>Số điện thoại:  </label> <span id="deposit-info-owner-phone" class="form-control" readonly></span>
                        </div>
                        <div class="col-md-6">
                            <button style="margin-top: 25px;" class="btn-sm btn btn-success deposit-modal-call"><i class="fa fa-phone"></i> Gọi chủ tin đăng</button>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label>Số tiền đặt cọc :  </label> <span id="deposit-info-price" class="form-control" readonly></span>
                        </div>
                        <div class="col-md-6">
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
                            <label>Trạng thái đặt cọc</label>
                            <select class="form-control" id="deposit-modal-status" >
                                <option value="1" selected>Hoàn tất</option>
                                <option value="2">Hủy đặc cọc</option>
                            </select>
                        </div>
                    </div>
                    <div class="row form-group deposit-modal-reject-wrapper" style="display: none">
                        <div class="col-md-12">
                            <label>Lý do</label>
                            <select class="form-control" id="deposit-modal-reject-reason" ></select>
                        </div>
                    </div>
                    <div class="row form-group deposit-modal-note" style="display: none">
                        <div class="col-md-12">
                            <label > Ghi chú </label>
                            <textarea rows="5" class="form-control" id="deposit-modal-note"></textarea>
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
<div id="deposit-cancel-modal" class="modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content modal-lg">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Thông tin hủy đặc cọc</h4>
            </div>
            <div class="modal-body message">
                <div class="form-horizontal">
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label>Chủ tin đăng:  </label> <span id="deposit-cancel-info-owner-name" class="form-control" readonly></span>
                        </div>
                        <div class="col-md-6">
                            <label>Giá đặc cọc:  </label> <span id="deposit-cancel-info-price" class="form-control" readonly></span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label>Số điện thoại:  </label> <span id="deposit-cancel-info-owner-phone" class="form-control" readonly></span>
                        </div>
                        <div class="col-md-6">
                            <button style="margin-top: 25px;" class="btn-sm btn btn-success deposit-modal-call"><i class="fa fa-phone"></i> Gọi chủ tin đăng</button>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label>Lý do hủy :  </label> <span id="deposit-cancel-info-reason" class="form-control" readonly></span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <label>Ghi chú :  </label>  <textarea rows="5" class="form-control" id="deposit-cancel-modal-note" readonly></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-update-task-deposit-cancel" type="button" class="btn btn-success">Hoàn tất</button>
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