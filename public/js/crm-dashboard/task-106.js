var QuickCheckTaskDetail = (function () {
    var myForm = $(".taskDetail");
    $(".callOwner").on("click", function (event) {
        event.preventDefault();
        var phoneNumber = $(this).attr("data-number");
        var rlistingid = $(this).attr("data-rlistingid");
        CCall.makeCall({
            "phoneNumber": phoneNumber,
            "onCallEnded": function (callInfo) {
                console.log(".listing-" + rlistingid);
                myForm.find(".listing-" + rlistingid).attr("data-duration", callInfo.duration);
                if (callInfo.duration <= 0) {
                    myForm.find(".status-" + rlistingid).val(3);
                } else {
                    myForm.find(".status-" + rlistingid).val("");
                }
            }
        });
    });

    myForm.find(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = {
            "dealId": deal.dealId,
            "leadId": deal.leadId,
            "typeId": parseInt($(this).attr("data-action")),
            "checkListings": [
            ],
            "note": null
        };
        var isValid = true;
        myForm.find(".errors").removeClass("errors");
        myForm.find(".listing").each(function (idx, item) {
            var isCurrentItemValid = true;
            var checkListing = {
                "rlistingId": parseInt($(this).attr("data-rlistingid")),
                "isSeen": null,
                "isChecked": null,
                "note": null,
                "statusId": null,
                "checkId": $(this).attr("data-checkId") ? parseInt($(this).attr("data-checkId")) : null,
                "duration": $(this).attr("data-duration") ? parseInt($(this).attr("data-duration")) : null
            };
            if (checkListing.checkId == null && postData.typeId != 2) {
                postData.typeId = 1;
            }
            switch (postData.typeId) {
                case 1:
                case 3:
                    checkListing.isSeen = $(this).find(".isSeen").prop("checked");
                    checkListing.note = $(this).find(".note").val();
                    checkListing.statusId = parseInt($(this).find(".statusId").val());
                    if (!checkListing.statusId) {
                        isCurrentItemValid = false;
                    } else {
                        if (checkListing.statusId == 1 && !checkListing.isSeen && checkListing.note.trim() == "") {
                            isCurrentItemValid = false;
                        }
                    }
                    if (!isCurrentItemValid) {
                        $(this).addClass("errors");
                    }
                    isValid = isCurrentItemValid;
                    break;
                case 2:
                    break;
            }
            postData.checkListings.push(checkListing);
        });
        if (!isValid) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }

        showPropzyLoading();

        $.ajax({
            url: "/crm-dashboard/quick-check-listing",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                showModalUpdateCallAfterSavedQuickCheck(postData);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    function showModalUpdateCallAfterSavedQuickCheck(postData) {
        var callFailListings = [];
        $(postData.checkListings).each(function (index, item) {
            if (item.statusId == 3) {
                callFailListings.push({
                    "checkId": item.checkId,
                    "rlistingId": item.rlistingId
                });
            }
        });
        if (callFailListings.length > 0) {
            ModalConfirm.showModal({
                message: "Bạn có muốn tạo nhắc nhở cho các cuộc gọi không liên hệ được",
                onYes: function (modal) {
                    var modalUpdateCallParamsOfQuickCheckListing = {
                        dealId: postData.dealId,
                        leadId: !postData.dealId ? postData.leadId : null,
                        fromTaskId: taskId,
                        defineId: defineId,
                        listingIds: callFailListings,
                        type: 114,
                        duration: 0,
                        resultCallId: 1,
                        receiverPhone: null,
                        config: {
                            onSaved: function () {
                                // do nothing
                            }
                        }
                    };
                    ModalUpdateCall.showModal(modalUpdateCallParamsOfQuickCheckListing);
                },
                onNo: function (modal) {
                    doneTask(taskId);
                }
            });


        } else {
            doneTask(taskId);
            console.log("All call success. No need to show modal update!");
        }
    }
    function doneTask(taskId) {
        showPropzyLoading();
        $.ajax({
            url: "/crm-dashboard/done-task/" + taskId,
            type: "get"
        }).done(function (response) {
            if (response.result) {
                window.location = "/";
            }
        }).always(function () {
            hidePropzyLoading();
        });
    }
})();