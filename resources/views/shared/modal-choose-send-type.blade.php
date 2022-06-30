<div id="modalChooseSendType" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chọn Hình Thức Gửi</h4>
            </div>
            <div class="modal-body">
                <div><label class="no-bold"><input class="chooseSendType" type="radio" name="chooseSendType" value="email" /> Gửi email</label></div>
                <div><label class="no-bold"><input class="chooseSendType" type="radio" name="chooseSendType" value="sms" />  Gửi SMS</label></div>
            </div>
        </div>
    </div>
</div>

<script>

    /**
     * =================================================================================
     * show pop up for user choose send type. This modal is written base on bootstrap's modal.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.1
     * @type dialog modal
     */

    var ModalChooseSendType = (function () {
        var myConfig = null;
        var myModal = $("#modalChooseSendType");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
            }
            myModal.modal({
                backdrop: 'static',
                keyboard: false
            });

        };

        myModal.find(".chooseSendType").click(function (event) {
            var value = $(this).val();
            $(this).prop("checked", false);
            myModal.modal("hide");
            myConfig.onItemChosen({
                "value": value
            });
        });

        return {
            showModal: showModal
        };
    })();
</script>