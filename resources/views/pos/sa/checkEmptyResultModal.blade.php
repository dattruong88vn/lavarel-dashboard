<div id="check-empty-result-modal" class="modal" role="dialog" aria-hidden="false">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Kết quả check trống</h4>
            </div>
            <div class="modal-body message">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div class="col-md-12">
                            <label for="check-empty-result" class="control-label">Kết quả check trống</label>
                            <div class="col-md-12 ">
                                <div class="row">
                                    <select name="" id="check-empty-result" class="form-control">
                                        <option value="1">Trống</option>
                                        <option value="2">Đã bán</option>
                                        <option value="3">Không liên hệ được</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="check-empty-result-note" class="control-label">Ghi chú</label>
                            <div class="col-md-12 ">
                                <div class="row">
                                    <textarea name="" id="check-empty-result-note" cols="20" rows="10" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="check-empty-result-date-time-view-group" class="form-group">
                        <div class="col-md-12">
                            <label class="control-label" style="font-weight: bold">
                                <input type="checkbox" name="check-empty-result-unknown" id="check-empty-result-unknown" value="false">
                                <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Thời gian không xác định
                            </label>
                        </div>
                        <div class="col-md-12">
                            <label for="" class="control-label">Ngày đi xem</label>
                        </div>
                        <div class="col-md-12">
                            <div class="input-group date">
                                <input type="text" class="form-control" id="check-empty-result-date">
                                <div class="input-group-addon">
                                    <span class="glyphicon glyphicon-th"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="" class="control-label">Từ giờ</label>
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input type="text" id="check-empty-result-time-from" class="form-control check-empty-result-time">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="" class="control-label">Đến giờ</label>
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input type="text" id="check-empty-result-time-to" class="form-control check-empty-result-time">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="send-check-empty-result" type="button" class="btn btn-default">Gửi</button>
            </div>
        </div>

    </div>
</div>