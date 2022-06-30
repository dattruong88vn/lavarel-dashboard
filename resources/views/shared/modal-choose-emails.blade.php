<div id="modalChooseEmails" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chọn email để gửi</h4>
            </div>
            <div class="modal-body">	
                <div class="chooseItems">
                </div>                
            </div>
            <div class="modal-footer">
                <button class="btn btn-success btn-choose">Chọn</button>
                <button class="btn btn-danger btn-cancel">Hủy</button>
            </div>
        </div>
    </div>
</div>

<script>

    /**
     * =================================================================================
     * Show a pop up for user to choose email address before send email.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.2
     * @type dialog modal
     */

    var ModalChooseEmails = (function () {
        var myConfig = null;
        var myModal = $("#modalChooseEmails");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
                if (config.message) {
                    myMessage.html(config.message);
                }
            }
            myModal.find(".chooseItems").html("");
            for (var i = 0; i < config.items.length; i++) {
                var item = config.items[i];
                myModal.find(".chooseItems").append("<div class='chooseItem'>" + item.substring(0, 2) + "xxxxxxxxx <input type='checkbox' name='choose' class='choose' data-index='" + i + "' /></div>");
            }
            myModal.modal({
                backdrop: 'static',
                keyboard: false
            });
        };

        myModal.find(".btn-cancel").on("click", function () {
            myModal.modal("hide");
        });

        myModal.find(".btn-choose").on("click", function () {
            var choosenItems = [];
            $(myModal.find(".choose:checked")).each(function (index, item) {
                var numberIndex = $(this).attr("data-index");
                console.log(index);
                choosenItems.push(myConfig.items[numberIndex]);
            });
            myConfig.onItemChosen({
                items: choosenItems
            });
            myModal.modal("hide");
        });

        return {
            showModal: showModal
        };
    })();
</script>