<div id="negotiation-modal" class="modal" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content modal-lg">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">×</button>
				<h4 class="modal-title">Thông tin thương lượng</h4>
			</div>
			<div class="modal-body message">
				<div class="form-horizontal">
                    <input type="hidden" id="negotiation-info-rlistingId" value="">
                    <input type="hidden" id="deposit-info-id" value="">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col-md-12 text-right">
                                <a href="#"  id="negotiation-info-link-detail" target="_blank">Xem chi tiết tin đăng ...</a>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4">
                                <label>Chủ tin đăng:  </label> <span id="negotiation-info-owner-name" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-4">
                                <label>Phân loại:  </label> <span id="negotiation-info-owner-type-name" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-4">
                                <label>Trạng thái:  </label> <span id="negotiation-info-owner-status" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4">
                                <label>Số tiền chốt bán :  </label> <span id="negotiation-info-price" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-4">
                                <label>Số điện thoại:  </label> <span id="negotiation-info-owner-phone" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-4">
                                <button style="margin-top: 25px;" class="btn-sm btn btn-success" id="negotiation-modal-call"><i class="fa fa-phone"></i> Gọi chủ tin đăng</button>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4">
                                <label>Số tiền thương lượng gần nhất:  </label> <span id="negotiation-info-price-latest" class="form-control" readonly></span>
                            </div>
                            <div class="col-md-4">
                                <label>Thời gian thương lượng:  </label> <span id="negotiation-info-time-latest" class="form-control" readonly></span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <table id="tb-modal-negotiation-child" class="table-bordered table table-hover">
                                <thead>
                                    <tr>
                                        <th>Deal Id</th>
                                        <th>Giá thương lượng</th>
                                        <th>Giá cuối thương lượng</th>
                                        <th>Ngày nhận</th>
                                        <th>Tên Crm</th>
                                        <th>Điều kiện</th>
                                        <th>Ghi chú</th>
                                        <th>Lịch sử</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
			</div>
		</div>
	</div>
</div>
<div id="negotiation-modal-show-phone" class="modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Thông tin số điện thoại</h4>
            </div>
            <div class="modal-body message">
                <div class="form-horizontal">
                    <div class="col-md-12" id="negotiation-modal-call-content"></div>
                </div>
            </div>
            <div class="modal-footer" style="border: none">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-negotiation-call" type="button" class="btn btn-success">Gọi</button>
            </div>
        </div>
    </div>
</div>

<div id="negotiation-modal-show-response" class="modal" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Trả lời thương lượng</h4>
            </div>
            <div class="modal-body message">
                <div class="form-horizontal">
                    <div class="col-md-12">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label class="control-label">Trạng thái thương lượng</label>
                                <select class="form-control" id="negotiation-response-status">
                                    <option value="1" selected>Đồng ý</option>
                                    <option value="2">Thương lượng</option>
                                    <option value="3">Tạm dừng</option>
                                    <option value="4">Hủy</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="row form-group" id="negotiation-response-price-wrapper" style="display: none;">
                            <div class="col-md-12">
                                <label class="control-label">Giá thương lượng</label>
                                <input type="text" id="negotiation-response-price" class="form-control"/>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-owner-note-wrapper">
                            <div class="col-md-12">
                                <label class="control-label">Điều kiện kèm theo</label>
                                <input type="text" id="negotiation-response-owner-note" class="form-control"/>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-note-wrapper">
                            <div class="col-md-12">
                                <label class="control-label">Ghi chú</label>
                                <textarea class="form-control" rows="3" id="negotiation-response-note"></textarea>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-reject-wrapper" style="display: none;">
                            <div class="col-md-12">
                                <label class="control-label">Lý do từ chối</label>
                                <select id="negotiation-response-reject" class="form-control"></select>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-reject-note-wrapper" style="display: none;">
                            <div class="col-md-12">
                                <label class="control-label">Ghi chú</label>
                                <textarea class="form-control" rows="3" id="negotiation-response-reject-note"></textarea>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-pending-wrapper" style="display: none;">
                            <div class="col-md-12">
                                <label class="control-label">Lý do tạm ngưng</label>
                                <select id="negotiation-response-pending" class="form-control"></select>
                            </div>
                        </div>
                        <div class="row form-group" id="negotiation-response-pending-note-wrapper" style="display: none;">
                            <div class="col-md-12">
                                <label class="control-label">Ghi chú</label>
                                <textarea class="form-control" rows="3" id="negotiation-response-pending-note"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="border: none">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-negotiation-response-send" type="button" class="btn btn-success">Gửi</button>
            </div>
        </div>
    </div>
</div>