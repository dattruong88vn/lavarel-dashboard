<script>
    var dealId = <?php echo(!empty($dealId) ? $dealId : "null"); ?>;
    var leadId = <?php echo(!empty($leadId) ? $leadId : "null"); ?>;
    var taskName = "<?php echo(!empty($taskName) ? $taskName : "null"); ?>";
</script>
<script>

    var CallFromTask = (function () {
        $(".makeCall").on("click", function (event) {
            event.preventDefault();
            var phoneNumber = $(this).attr("data-number");
            phoneNumber = Base64.decode(phoneNumber);
            if (phoneNumber.indexOf(",") > 0) {
                var phoneNumbers = phoneNumber.split(",");
                ModalChoosePhoneNumber.showModal({
                    phoneNumbers: phoneNumbers,
                    onItemChosen: function (data) {
                        console.log(data);
                        CallFromTask.makeCall({
                            type: 78,
                            phoneNumber: data.phoneNumber,
                            dealId: dealId,
                            leadId: leadId
                        });
                    }
                });
            } else {
                makeCall({
                    "phoneNumber": phoneNumber,
                    "leadId":leadId,
                    "dealId":dealId
                });
            }
        });

        var makeCall = function (params) {
            CCall.makeCall({
                "phoneNumber": params.phoneNumber,
                "leadId" : params.leadId,
                "dealId" : params.dealId,
                "fromTaskId": "{{$taskId}}",
                "defineId": "{{$defineId}}",
                "onCallEnded": function (callInfo) {
                    ModalUpdateCall.showModal({
                        dealId: dealId,
                        leadId: !dealId ? leadId : null,
                        type: 79,
                        purpose: taskName,
                        fromTaskId: "{{$taskId}}",
                        defineId: "{{$defineId}}",
                        duration: callInfo.duration,
                        resultCallId: callInfo.duration <= 0 ? 1 : 9999,
                        receiverPhone: params.phoneNumber,
                        config: {
                            onSaved: function () {
                                window.location.reload();
                            }
                        }
                    });
                }
            });
        };

        return {
            "makeCall": makeCall
        };

    })();
</script>