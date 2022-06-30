<div id="ModalUnclock" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Lý do mở ?</h4>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label for="sel1" class="col-sm-2">Chọn lý do:</label>
                    <div class="col-sm-10">
                        <select class="form-control reasonId">
                            <option value="-1">Chọn lý do</option>
                            <?php if(!empty($leadDealDetail->listUnlockReasons)) { ?>
                                <?php foreach ($leadDealDetail->listUnlockReasons as $reason): ?>
                                    <option value="{{$reason->code}}">{{$reason->name}}</option>
                                <?php endforeach; ?>
                            <?php } ?>
                        </select>
                        <div class="errors errors-reasonId"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-cornfirm">Xác nhận</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<script>
    var ModalUnclock = (function () {
        var dataSend = null;
        var myModal = $("#ModalUnclock");
        var showModal = function (params) {
            dataSend = params;
            myModal.modal();
            return true;
        };
        myModal.find(".btn-cornfirm").on("click", function (event) {
            event.preventDefault();
            var reasonId = myModal.find(".reasonId").val();
            myModal.find(".errors-reasonId").html("");
            if (reasonId == "-1") {
                myModal.find(".errors-reasonId").html("Chọn lý do");
                return false;
            }
            dataSend.reasonCode = reasonId;
            showPropzyLoading();
            $.ajax({
                url: '/deal/unlock-deal-lead',
                type: 'post',
                data: JSON.stringify(dataSend)
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    window.location.reload();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });
        return {
            "showModal": showModal
        };
    })();

</script>