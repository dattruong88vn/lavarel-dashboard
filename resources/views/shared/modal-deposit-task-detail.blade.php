<div id="modal_deposit_task_detail" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chi tiết task đăt cọc</h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="finish-degotiate-task">Xem chi tiết</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            </div>
        </div>

    </div>
</div>

<script type="text/javascript">
    $("#modal_deposit_task_detail").on('hidden.bs.modal',function () {
        localStorage.setItem("check_show_detail_metting",'hide');
        $('.higlight-nofity-meting').show();
    });
    $("#modal_deposit_task_detail").on('show.bs.modal',function () {
        localStorage.setItem("check_show_detail_metting",'show');
        $('.higlight-nofity-meting').hide();
    })
</script>

