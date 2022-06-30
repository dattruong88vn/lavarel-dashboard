<div id="modal-cancel-crawler" style="z-index: 1051" class= "modal fade" role = "dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Lý do hủy tin</h4>
            </div>
            <div class="modal-body">
                <div id="content-cancel-crawler">
                    <div class="from-group">
                        <label>Nhập lý do</label>
                        <select id="reason-cancel" class="form-control">
                            <option value="1">Trùng</option>
                            <option value="2">Khác</option>
                        </select>
                        <div id="reason-other" style="display: none; margin-top: 15px;" >
                            <label>Nhập lý do khác</label>
                            <input id="reason-text" type="text" class="form-control" />
                       </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-default">Đóng</button>
                    <button type="button" id="delete-crawler" class="btn btn-danger">Hủy tin</button>
                </div>
            </div>
        </div>
    </div>
</div>
