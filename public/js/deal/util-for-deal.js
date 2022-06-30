$(document).ready(function () {

    window.makeCallFromJS = function (phoneNumber, dealId, isViewDetail) {
        let config = {
            type: 78,
            phoneNumber: phoneNumber,
            dealId: dealId,
            leadId: null,
        }
        if (phoneNumber == null) {
            showPropzyAlert(
                "Không có số điện thoại để liên hệ"
            )
            return
        }

        let isBAUser = false
        currentUser.departmentIds.map(departmentId => {
            if ([12,5].includes(departmentId)) {
                isBAUser = true
            } 
        })

        if (isViewDetail && isBAUser) { // true && check departmentId to find the real BA user -> BA user of deal 
            CCall.makeCall({
                "phoneNumber": config.phoneNumber,
                "onCallEnded": function (callInfo) {
                    $('body').css('pointer-events', 'auto');
                    ModalUpdateCall.showModal({
                        type: config.type,
                        dealId: config.dealId,
                        leadId: config.leadId,
                        duration: callInfo.duration,
                        resultCallId: callInfo.duration <= 0 ? 1 : 9999,
                        receiverPhone: config.phoneNumber,
                        config: {
                            onSaved: function (response) {
                                if (response.data.numberOfFailedCall >= 3) {
                                    closePropzyAlert();
                                    var leadOrDeal = "lead";
                                    if (config.dealId) {
                                        leadOrDeal = "deal";
                                    }
                                    ModalConfirm.showModal({
                                        message: "Bạn có muốn hủy " + leadOrDeal + " này?",
                                        onYes: function (modal) {
    
                                            ModalUpdateStatusPendingReason.showModal({
                                                "postData": {
                                                    "typeNeedName": leadOrDeal,
                                                    "needId": config.dealId ? config.dealId : config.leadId,
                                                    "progressQuoId": 3,
                                                    "isSet": true
                                                }
                                            });
                                        },
                                        onNo: function (modal) {
                                        }
                                    });
                                }
                            }
                        }
                    });
                },
                showLoading: false
            });
        } else {
            CCall.makeCall({phoneNumber: phoneNumber})
        }

    }
})
