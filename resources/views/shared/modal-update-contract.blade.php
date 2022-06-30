<!-- Modal -->
<div class="modal fade" id="modal-update-contract" role="dialog">
    <div class="modal-dialog">
        <form class="form-horizontal" role="form" method="post" action="">
            <div class="modal-content modal-lg">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Bổ sung thông tin hợp đồng</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="col-sm-2">
                            <label for="">Mã hợp đồng</label>
                        </div>
                        <div class="col-sm-10">
                            <input type="text" value="{{ !empty($contract_info->contractCode) ? $contract_info->contractCode : '' }}" id="contractCode" name="contractCode" class="form-control" placeholder="Mã hợp đồng">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2">
                            <label for="">Tệp đính kèm</label>
                        </div>
                        <div class="col-sm-10">
                            <?php
                            if(empty($contract_info->files)){
                                $currentInfo = [];
                            }else{
                                $currentInfo = $contract_info->files;
                            }
                            ?>
                            <div current-info='<?php echo json_encode($currentInfo); ?>' id="appraisal-photo"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success">Lưu</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
            </div>
        </form>
    </div>
</div>