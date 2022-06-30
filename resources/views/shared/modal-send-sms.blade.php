<div id="modalSendSms" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Nội dung SMS</h4>
            </div>
            <div class="modal-body">	
                <textarea id="field" onkeyup="countChar(this)" rows="7" class="form-control message"></textarea>                
            </div>
            <div class="modal-footer">
                <div style="float: left;" id="charNum"></div>
                <button class="btn btn-success btn-yes">Gửi</button>
                <button class="btn btn-danger btn-no">Không</button>
            </div>
        </div>
    </div>
</div>

<script>
    function countChar(val) {
        var len = val.value.length;
        if (len >= 500) {
          val.value = val.value.substring(0, 500);
        } else {
          $('#charNum').text(500 - len);
        }
      };

    /**
     * =================================================================================
     * show review sms content. This modal is written base on bootstrap's modal.
     * =================================================================================
     * @author Phan Minh Hoàng <hoang.phan@propzy.com>
     * @since CRM 2.1
     * @type dialog modal
     */

    var ModalSendSms = (function () {
        var myConfig = null;
        var myModal = $("#modalSendSms");
        var myMessage = myModal.find(".message");
        var btnYes = myModal.find(".btn-yes");
        var btnNo = myModal.find(".btn-no");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
                if(config.title){
                    
                }
                if (config.message) {
                    myMessage.val(config.message);
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
            });

            btnNo.unbind("click");
            btnNo.on("click", function (event) {
                event.preventDefault();
                if (myConfig.onNo) {
                    myConfig.onNo(myModal);
                }
                myModal.modal("hide");
            });

        };
        return {
            showModal: showModal
        };
    })();
</script>