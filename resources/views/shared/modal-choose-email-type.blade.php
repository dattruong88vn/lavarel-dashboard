<div id="modalChooseEmailType" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chọn loại</h4>
            </div>
            <div class="modal-body">
                <div><label class="no-bold"><input class="chooseEmailType" type="radio" name="chooseEmailType" value="2" /> Nhắc nhở khi không liên hệ được KH</label></div>
                <div><label class="no-bold"><input class="chooseEmailType" type="radio" name="chooseEmailType" value="3" />  Báo chưa có hàng phù hợp</label></div>
                <div><label class="no-bold"><input class="chooseEmailType" type="radio" name="chooseEmailType" value="4" />  Khác</label></div>
            </div>
        </div>
    </div>
</div>

<script>

    /**
     * =================================================================================
     * show pop up for user choose email type. This modal is written base on bootstrap's modal.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.1
     * @type dialog modal
     */

    var modalChooseEmailType = (function () {
        var myConfig = null;
        var myModal = $("#modalChooseEmailType");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
            }
            myModal.modal({
                backdrop: 'static',
                keyboard: false
            });

        };

        myModal.find(".chooseEmailType").click(function (event) {
            var value = parseInt($(this).val());
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