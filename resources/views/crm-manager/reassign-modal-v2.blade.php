<div id="modalReassignDeals-v2" class="modal fade" role="dialog" aria-hidden="false">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close close-reassign" data-dismiss="modal">×</button>
                <h4 class="modal-title">Danh sách BA</h4>
            </div>
            <div class="modal-body message">
                <div class="row">
                    <div class="col-sm-4">
                        <input class="form-control" type="text" name="filter-ba-name" id="filter-ba-name" placeholder="Tên" data-name="code">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <table id="department-user-list-table-v2" class="table table-bordered table-striped table-listing check-empty-table" width="100%" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Flow</th>
                                    <th>Zone</th>
                                    <th>Quận</th>
                                    <th>Phường</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Lý do (*)</label>
                            <textarea class="form-control" rows="3" name="ba-note" id="ba-note"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default close-reassign" data-dismiss="modal">Đóng</button>
                <button id="reassign-deal-btn" type="button" class="btn btn-warning">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Reassign
                </button>
            </div>
        </div>

    </div>
</div>
<style>
    @media (min-width: 768px) {
        #modalReassignDeals-v2 .modal-dialog {
            width: auto;
            min-width: 500px;
        }
    }

    #department-user-list-table tbody tr {
        cursor: pointer;
    }

    #department-user-list-table.dataTable tbody>tr.selected,
    #department-user-list-table.dataTable tbody>tr>.selected {
        background-color: #398439;
    }

    #department-user-list-table-v2_filter {
        display: none;
    }
</style>