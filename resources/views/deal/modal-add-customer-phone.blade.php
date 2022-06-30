<div id="modalAddCustomerPhone" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                <h4 class="modal-title">Thêm số điện thoại liên hệ</h4>
            </div>

            <div class="modal-body">
                <form class="formAdd">
                    <input type="hidden" class="leadId" value="" />
                    <input type="hidden" class="dealId" value="" />
                    <input type="hidden" class="customerId" value="" />
                    <input type="hidden" class="type" value="phone" />

                    <div class="form-group">
                        <input type="text" name="infoValue" class="infoValue form-control" />
                    </div>
                    <div class="form-group">
                        Số này là: <label><input type="radio" class="isPrimary" name="isPrimary" value="primary" /> Số chính</label> <label><input type="radio" class="isPrimary" name="isPrimary" value="slave" checked="checked" /> Số phụ</label>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Hủy</button>
                <button type="button" class="btn btn-success btnSave">Lưu</button>
            </div>
        </div>
    </div>
</div>

<div id="modalAddCustomerEmail" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>

                <h4 class="modal-title">Thêm địa chỉ email liên hệ</h4>
            </div>

            <div class="modal-body">
                <form class="formAdd">
                    <input type="hidden" class="leadId" value="" />
                    <input type="hidden" class="dealId" value="" />
                    <input type="hidden" class="customerId" value="" />
                    <input type="hidden" class="type" value="email" />

                    <div class="form-group">
                        <input type="text" name="infoValue" class="infoValue form-control" />
                    </div>
                    <div class="form-group">
                        Email này là: <label><input type="radio" class="isPrimary" name="isPrimary" value="primary" /> Email chính</label> <label><input type="radio" class="isPrimary" name="isPrimary" value="slave" checked="checked" /> Email phụ</label>
                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Hủy</button>
                <button type="button" class="btn btn-success btnSave">Lưu</button>
            </div>
        </div>
    </div>
</div>

<script>
    var ModalAddCustomerPhone = (function () {

        var myModal = null;
        var validateFormEmail = null;
        var validateFormPhone = null;

        var showModal = function (config) {
            if (config.type === "phone") {
                myModal = $("#modalAddCustomerPhone");
            } else {
                myModal = $("#modalAddCustomerEmail");
            }

            myModal.find(".leadId").val(config.leadId);
            myModal.find(".dealId").val(config.dealId);
            myModal.find(".customerId").val(config.customerId);
            myModal.find(".type").val(config.type);
            initValidateForm(config.type);
            myModal.modal();

            myModal.find(".btnSave").unbind('click');
            myModal.find(".btnSave").on("click", function (event) {
                event.preventDefault();
                if (config.type === "phone" && !validateFormPhone.form()) {
                    return false;
                } else if (config.type === "email" && !validateFormEmail.form()) {
                    return false;
                }
                ModalConfirm.showModal({
                    message: "Bạn có chắc thông tin này là chính xác",
                    onYes: save,
                    onNo: function () {
                        // not implemented
                    }
                });
            });
        };

        function initValidateForm(type) {
            if (type === "phone") {
                validateFormPhone = myModal.find(".formAdd").validate({
                    rules: {
                        infoValue: {
                            required: true,
                            number: true,
                            phoneValidate: true
                        }
                    },
                    messages: {
                        infoValue: {
                            required: "Nhập số điện thoại",
                            number: "Số điện thoại không hợp lệ"
                        }
                    }
                });
            } else {
                validateFormEmail = myModal.find(".formAdd").validate({
                    rules: {
                        infoValue: {
                            required: true,
                            email: true
                        }
                    },
                    messages: {
                        infoValue: {
                            required: "Nhập email",
                            email: "Email không hợp lệ"
                        }
                    }
                });

            }
        }
        var save = function () {
            var postData = {
                "leadId": myModal.find(".leadId").val(),
                "dealId": myModal.find(".dealId").val(),
                "customerId": myModal.find(".customerId").val(),
                "type": myModal.find(".type").val(),
                "infos": [
                    {
                        value: myModal.find(".infoValue").val().trim(),
                        isPrimary: myModal.find(".isPrimary:checked").val().trim() === "primary"
                    }
                ]
            };
            showPropzyLoading();
            $.ajax({
                url: "/deal/add-customer-phone-or-email",
                data: JSON.stringify(postData),
                type: "post"
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    if (postData.type == "phone") {
                        if ($(".customerPhones .phone-item").length >= 2) {
                            $("#addCustomerPhone").remove();
                        }
                        var newItem = "<span class='phone-item'>xxxxxxxx" + postData.infos[0].value.substring(postData.infos[0].value.length - 2, postData.infos[0].value.length) + ", </span>";
                        $(".customerPhones").append(newItem);
                    }
                    if (postData.type == "email") {
                        $("#addCustomerEmail").remove();
                    }
                    myModal.find(".infoValue").val("");
                    myModal.modal("hide");
                }
            }).always(function () {
                hidePropzyLoading();
            });
        };

        return {
            showModal: showModal
        };
    })();
</script>