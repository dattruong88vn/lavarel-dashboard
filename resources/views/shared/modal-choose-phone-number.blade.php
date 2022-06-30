<div id="modalChoosePhoneNumber" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Chọn số điện thoại</h4>
            </div>
            <div class="modal-body">	
                <div class="phoneNumbers">
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
     * Show a pop up for user to choose phone number before make call.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.2
     * @type dialog modal
     */

    var ModalChoosePhoneNumber = (function () {
        var myConfig = null;
        var myModal = $("#modalChoosePhoneNumber");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
                if (config.message) {
                    myMessage.html(config.message);
                }
            }
            myModal.find(".phoneNumbers").html("");
            for (var i = 0; i < config.phoneNumbers.length; i++) {
                var phoneNumber = config.phoneNumbers[i];
                myModal.find(".phoneNumbers").append("<div class='phoneNumber'>xxxxxxxxx" + phoneNumber.substring(phoneNumber.length - 2, phoneNumber.length) + " <input type='radio' name='choosePhone' class='choosePhone' data-index='" + i + "' /></div>");
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
            var numberIndex = myModal.find(".choosePhone:checked").attr("data-index");
            myModal.modal("hide");
            myConfig.onItemChosen({
                phoneNumber: myConfig.phoneNumbers[numberIndex]
            });
        });

        return {
            showModal: showModal
        };
    })();
</script>