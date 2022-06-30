<div id="emailToCustomer" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Gửi Email cho khách hàng</h4>
            </div>
            <div class="modal-body">
                <form id="formEmail" method="post">
                    <input type="hidden" class="dealId" name="dealId" value="" />
                    <input type="hidden" class="leadId" name="leadId" value="" />
                    <!--<input type="hidden" class="customerId" name="customerId" value="" />-->
                    <!--<input type="hidden" class="customerName" name="customerName" value="" />-->
                    <input type="hidden" class="photos" name="photos" value="" />
                    <input type="hidden" class="emailType" name="emailType" value="" />
                    <input type="hidden" class='rlistingIds' name="rlistingIds" value='' />
                    <!--<input type="hidden" class='requestJson' class="requestJson" name="requestJson" value='' />-->
                    <div class="form-group row hidden">
                        <label class="col-sm-2">To</label>
                        <div class="col-sm-10">
                            <input  name="emailsTo" type="text" class="form-control emailsTo" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">CC</label>
                        <div class="col-sm-10">

                            <input id="emailsCc" name="emailsCc" type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2">Tiêu đề</label>
                        <div class="col-sm-10">
                            <input name="subject" type="text" class="form-control emailSubject" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-xs-12">
                            <textarea id="emailContent" name="content" class="form-control" rows="16"></textarea>
                        </div>
                    </div>
                    <div class="photos-preview hidden" style="margin-bottom: 32px;">

                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnDoSendMail">Gửi</button>
                        <a href="#" class="btn btn-danger"  data-dismiss="modal" >Hủy</a>
                    </div>
                </form>
            </div>
        </div>
        <!--
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
        -->
    </div>

</div>

<script>

    var EmailToCustomer = (function () {
        //modal.find("#customerId").val(request.customer.customerId);
        //modal.find("#customerName").val(request.customers.name);


        var myConfig = null;
        var myModal = $("#emailToCustomer");
        var showModal = function (config) {
            if (config) {
                myConfig = config;
            }
            myModal.find("input").val("");
            myModal.find('.dealId').val(config.dealId);
            myModal.find('.leadId').val(config.leadId);
            myModal.find('.emailType').val(config.emailType);
            myModal.find(".emailsTo").val(config.emailsTo);
            myModal.find(".emailSubject").val(config.subject);
            myModal.find(".isGoodsAvailable").val(config.isGoodsAvailable);
            if (config.rListingIds && config.rListingIds.length > 0) {
                myModal.find(".rlistingIds").val(config.rListingIds.join(","));
            }
            CKEDITOR.instances['emailContent'].setData(config.content);
            myModal.modal();
        };

        myModal.find(".btnDoSendMail").on('click', function (event) {
            event.preventDefault();

            event.preventDefault();
            var email = myModal.find(".emailsTo").val();
            if (email.trim() == "") {
                alert("Phải nhập email để gửi.");
                return false;
            }
            for (var instanceName in CKEDITOR.instances) {
                CKEDITOR.instances[instanceName].updateElement();
            }
            var photos = [];
            $(".photos-preview img").each(function () {
                photos.push($(this).attr('src'));
            });
            $("#photos").val(photos);
            showPropzyLoading();
            $.ajax({
                url: "/deal/send-email-listing",
                type: 'post',
                data: myModal.find("#formEmail").serialize()
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    //window.location = window.location;
                    myModal.modal('hide');
                    if (myConfig.onSent) {
                        myConfig.onSent(response);
                    }
                }
            }).always(function () {
                hidePropzyLoading();
            });
        });

        return {
            showModal: showModal
        };

    })();
</script>
