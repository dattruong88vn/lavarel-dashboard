<!-- make call -->
<div id="modalUpdateCall" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formMakeCallReminderModal" method="post" >
                <input type="hidden" class="dealId" name="dealId" value="" />
                <input type="hidden" class="leadId" name="leadId" value="" />
                <input type="hidden" class="listingIds" name="listingIds" value="" />
                <input type="hidden" class="duration" name="duration" value="0" />
                <input type="hidden" class="receiverPhone" name="receiverPhone" value="" />
                <input type="hidden" class="fromTaskId" name="fromTaskId" value="" />
                <input type="hidden" class="defineId" name="defineId" value="" />
                <input type="hidden" class="type" name="type" value="" />
                <div class="modal-header">
                    <h4 class="modal-title">Cập nhật cuộc gọi</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label class="col-sm-2">Mục đích gọi</label>
                        <div class="col-sm-10">
                            <select name="purposeId" class="purposeId form-control" >
                                <?php foreach ($callPurposes as $callPurpose): ?>
                                    <option value="{{$callPurpose->defineId}}">{{$callPurpose->name}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors errors-purposeId"></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Ghi chú thêm</label>
                        <div class="col-sm-10">
                            <input type="text" name="purpose" class="purpose form-control" placeholder="mục đích gọi" />
                            <div class="errors errors-purpose"></div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2">Kết quả gọi</label>
                        <div class="col-sm-10">
                            <select class="resultCallId form-control" name="statusId" >
                                <option value=1>Không liên hệ được</option>
                                <option value=9999 selected="selected">Khác</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10">
                            <textarea type="text" class="resultCallText form-control" placeholder="Nhập kết quả cuộc gọi" ></textarea>
                            <div class="errors errors-resultCallText"></div>
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-sm-2">Thiết lặp nhắc nhở</label>
                        <div class="col-sm-10">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group date">
                                        <input id="whenDate" name="whenDate" class="form-control whenDate" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors"></div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input type="text" class="form-control input-small whenTime">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2"></label>
                        <div class="col-sm-10">
                            <div class="errors errors-whenTime"></div>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSave">Lưu</button>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>
<!-- end make call -->

<script type="text/javascript">
    var ModalUpdateCall = (function () {
        var myModal = $("#modalUpdateCall");
        var btnSave = myModal.find(".btnSave");
        var myConfig = {};
        function init() {
            myModal.find(".resultCallId").trigger("change");
            btnSave.unbind("click");
            btnSave.on("click", function (event) {
                btnSaveOnClicked(event);
            });

            myModal.find('.whenTime').timepicker({
                showMeridian: false
            });

            myModal.find('.whenDate').datepicker({startDate: '0d'});
            myModal.find("#whenDate").val("");
            myModal.find(".whenTime").val("");
        }
        myModal.find(".resultCallId").change(function () {
            var selectedVal = $(this).val();
            if (selectedVal == "1") {
                myModal.find(".resultCallText").val($(this).find("option:selected").html());
                myModal.find(".resultCallText").hide();
            } else {
                myModal.find(".resultCallText").val("");
                myModal.find(".resultCallText").show();
            }
        });

        function btnSaveOnClicked(event) {
            event.preventDefault();
            var postData = {
                "dealId": myModal.find(".dealId").val() ? myModal.find(".dealId").val() : null,
                "leadId": myModal.find(".leadId").val() ? myModal.find(".leadId").val() : null,
                "listingIds": myModal.find(".listingIds").val() ? JSON.parse(myModal.find(".listingIds").val()) : null,
                "purpose": myModal.find(".purpose").val().trim(),
                "purposeId": myModal.find(".purposeId").val(),
                //"statusId": 1, chưa biết làm gì nên tắt đi
                "duration": myModal.find(".duration").val(),
                "resultCallId": myModal.find(".resultCallId").val(),
                "resultCallText": null,
                "receiverPhone": myModal.find(".receiverPhone").val() ? myModal.find(".receiverPhone").val() : null,
                "fromTaskId": myModal.find(".fromTaskId").val() ? myModal.find(".fromTaskId").val() : null,
                "defineId": myModal.find(".defineId").val() ? myModal.find(".defineId").val() : null,
                "type": myModal.find(".type").val(),
                "reminderTime": null,
                "direction": "outbound",
                "propzyCallId": $("#propzyCallId").val() ? $("#propzyCallId").val() : null,
            };

            if (postData.resultCallId == 1) {
                postData.resultCallText = myModal.find(".resultCallId>option:selected").text().trim();
            } else {
                postData.resultCallText = myModal.find(".resultCallText").val();
            }
            var whenDate = myModal.find(".whenDate").val().trim();
            var whenTime = myModal.find(".whenTime").val().trim();
            if (whenDate !== "" && whenTime !== "") {
                var reminderTime = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm");
                if (reminderTime.isValid()) {
                    postData.reminderTime = reminderTime.unix() * 1000;
                }
            }
            if (!validateCallData(postData)) {
                return false;
            }
            showPropzyLoading();
            $.ajax({
                url: "/call/save-history",
                type: "POST",
                data: JSON.stringify(postData)
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    hideModal();
                    if (myConfig && myConfig.onSaved) {
                        console.log("svaed");
                        myConfig.onSaved(response);
                    }
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }

        function validateCallData(data) {
            var isValid = true;
            myModal.find(".errors").html("");
            if (data.purpose == "") {
                myModal.find(".errors-purpose").html("Nhập mục đích gọi.");
                isValid = false;
            }
            if (data.resultCallText == "") {
                myModal.find(".errors-resultCallText").html("Kết quả gọi.");
                isValid = false;
            }

            if (myModal.find("#whenDate").val() != "" && myModal.find(".whenTime").val() == "") {
                myModal.find(".errors-whenTime").html("Chọn giờ lập lịch.");
                isValid = false;
            } else if (myModal.find(".whenTime").val() != "" && myModal.find("#whenDate").val() == "") {
                myModal.find(".errors-whenTime").html("Chọn giờ lập lịch.");
                isValid = false;
            }
            return isValid;
        }

        /**
         * var config = {
         "dealId": myModal.find(".dealId").val() ? myModal.find(".dealId").val() : null,
         "leadId": myModal.find(".leadId").val() ? myModal.find(".leadId").val() : null,
         "purpose": myModal.find(".purpose").val(),
         //"statusId": 1, chưa biết làm gì nên tắt đi
         "duration": myModal.find(".duration").val(),
         "resultCallId": myModal.find(".resultCallId").val(),
         "resultCallText": "Thích thì lưu thôi",
         "receiverPhone": myModal.find(".receiverPhone").val(),
         "fromTaskId": myModal.find(".fromTaskId").val() ? myModal.find(".fromTaskId").val() : null,
         "defineId": myModal.find(".defineId").val() ? myModal.find(".defineId").val() : null,
         "type": myModal.find(".type").val(),
         "reminderTime": 1503462548000
         };
         * @type type
         */

        function resetModal() {
            myModal.find(".dealId").val("");
            myModal.find(".leadId").val("");
            myModal.find(".rlistingId").val("");
            myModal.find(".purpose").val("");
            myModal.find(".duration").val("");
            myModal.find(".resultCallId").val(9999);
            myModal.find(".receiverPhone").val("");
            myModal.find(".fromTaskId").val("");
            myModal.find(".defineId").val("");
            myModal.find(".type").val("");
        }

        function showModal(params) {
            resetModal();
            if (params) {
                myModal.find(".dealId").val(params.dealId);
                myModal.find(".leadId").val(params.leadId);
                myModal.find(".rlistingId").val(params.rlistingId);
                if (params.listingIds) {
                    myModal.find(".listingIds").val(JSON.stringify(params.listingIds));
                }
                myModal.find(".purpose").val(params.purpose ? params.purpose : "");
                myModal.find(".duration").val(params.duration);
                myModal.find(".resultCallId").val(params.resultCallId ? params.resultCallId : "1");
                myModal.find(".receiverPhone").val(params.receiverPhone ? params.receiverPhone : "");
                myModal.find(".fromTaskId").val(params.fromTaskId ? params.fromTaskId : "");
                myModal.find(".defineId").val(params.defineId ? params.defineId : "");
                myModal.find(".type").val(params.type ? params.type : "");
                if (params.config) {
                    myConfig = params.config;
                }
            }
            init();
            myModal.modal({
                backdrop: 'static',
                keyboard: false
            });
        }

        function hideModal() {
            myModal.modal("hide");
        }

        return {
            showModal: showModal
        };
    })();
</script>