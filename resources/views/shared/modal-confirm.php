<div id="modalConfirm" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chú ý</h4>
            </div>
            <div class="modal-body">	
                <div class="message">Bạn có chắc thực hiện</div>                
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btn-yes">Có</button>
                <button class="btn btn-danger btn-no">Không</button>
            </div>
        </div>
    </div>
</div>

<script>

    /**
     * =================================================================================
     * A replacement for default javascript confirm pop up. This modal is written base on bootstrap's modal.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.1
     * @type dialog modal
     */

    var ModalConfirm = (function () {
        var showModal = function (config) {
            var myConfig = null;
            const myModal = $("#modalConfirm");
            const myMessage = myModal.find(".message");
            const btnYes = myModal.find(".btn-yes");
            const btnNo = myModal.find(".btn-no");

            if (config) {
                myConfig = config;
                if (config.message) {
                    myMessage.html(config.message);
                }

                if (config.removeDisableActionBtn) {
                    btnYes.removeAttr('disabled') // remove disabled attr when init
                    btnNo.removeAttr('disabled') // remove disabled attr when init
                }
            }
            myModal.modal({
                backdrop: 'static',
                keyboard: false
            });

            btnYes.unbind("click");
            btnYes.on("click", function (event) {
                event.preventDefault();
                if (myConfig.onYes) {
                    myConfig.onYes(myModal);
                }
                myModal.modal("hide");

                return false
            });

            btnNo.unbind("click");
            btnNo.on("click", function (event) {
                event.preventDefault();
                if (myConfig.onNo) {
                    myConfig.onNo(myModal);
                }
                myModal.modal("hide");

                return false
            });

        };
        return {
            showModal: showModal
        };
    })();
</script>
