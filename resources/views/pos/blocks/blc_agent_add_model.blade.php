<div id="agent-add-modal" class="modal fade" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Tạo Môi Giới</h4>
            </div>
            <div class="modal-body message">
                <form>
                    <div class="form-group row">
                        <label for="agent-add-name" class="control-label required col-xs-12 label-agent-add-name">Tên môi giới</label>
                        <div class="col-xs-12">
                            <input type="text" class="required form-control" id="agent-add-name"  value="" placeholder="Nhập tên môi giới" name="name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="agent-add-email" class="control-label required col-xs-12  label-agent-add-email">Email</label>
                        <div class="col-xs-12">
                            <input type="text" class="required form-control" id="agent-add-email"  value="" placeholder="Nhập email" name="email">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="agent-add-phone" class="control-label required col-xs-12 label-agent-add-phone">Số điện thoại</label>
                        <div class=" col-xs-12">
                            <input type="text" class="required form-control" id="agent-add-phone"  value="" placeholder="Nhập số điện thoại" name="phone">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="agent-add-contract-signed" class="checkbox control-label col-xs-12">
                            <input id="agent-add-contract-signed" type="checkbox" value="" name="contractSigned">
                            <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span> Đã ký hợp đồng
                        </label>
                    </div>
                    <div class="form-group row">
                        <div class=" col-xs-12">
                            <p id="agent-add-message" style="color: #d9534f; text-align: center; font-size: 13pt"></p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                <button id="btn-agent-create-modal" type="button" class="btn btn-success">Tạo</button>
            </div>
        </div>

    </div>
</div>

<script>
    $(document).ready(function () {
        $('#agent-add-phone').phoneBasic();
        $('body').off('click', '#btn-agent-create').on('click', '#btn-agent-create', function (e) {
            e.preventDefault();

            $('#agent-add-name').val('');
            $('#agent-add-email').val('');
            $('#agent-add-phone').val('');
            $('#agent-add-contract-signed').prop('checked' , false)
            $('#agent-add-modal #agent-add-message').text('');

            $('#agent-add-modal').modal('show')
        })
        $('body').off('click', '#agent-add-modal #btn-agent-create-modal').on('click', '#agent-add-modal #btn-agent-create-modal', function (e) {
            e.preventDefault();
            $('#agent-add-modal #agent-add-message').text('');
            //validate
            var name = {
                val : $('#agent-add-name').val(),
                noShowMess : true
            }
            var email = {
                val : $('#agent-add-email').val(),
                noShowMess : true
            }
            var phone = {
                val : $('#agent-add-phone').val(),
                noShowMess : true
            }

            if (isVal(email.val) && !isEmail(email.val)) {
                email.val = null;
            }
            if (isVal(phone.val) && phone.val.slice(0, 1) != "0") {
                phone.val = null;
            }

            var errName = $('#agent-add-name').validateInputData(name);
            var errEmail = $('#agent-add-email').validateInputData(email);
            var errPhone = $('#agent-add-phone').validateInputData(phone);

            if (!errName && !errEmail && !errPhone) {

                var url = "/agent-manager/agent-create-json"
                var dataPost = {
                    name : name.val,
                    email : email.val,
                    phone : phone.val,
                    contractSigned : $('#agent-add-contract-signed').is(':checked')
                }

                $.ajax({
                    url: url,
                    type: "POST",
                    data : JSON.stringify(dataPost)
                }).done(function (res) {
                    try {
                        res = JSON.parse(res);
                        if (res.result) {
                            $('#agent-add-modal').modal('hide')
                        } else {
                            $('#agent-add-modal #agent-add-message').html(res.message);
                        }
                    } catch (errorParse) {
                        $('#agent-add-modal #agent-add-message').html('Lỗi dữ liệu trả về');
                    }
                }).fail(function (err) {
                    $('#agent-add-modal #agent-add-message').html('Lỗi hệ thống');
                });

            }


        })
        $('body').off('change', '#agent-add-modal input[type="text"]').on('change', '#agent-add-modal input[type="text"]', function (e) {
            $(this).validateInputData({
                val : $(this).val(),
                noShowMess : true,
            })
        })
    })
</script>