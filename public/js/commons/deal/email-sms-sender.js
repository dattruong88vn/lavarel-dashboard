/**
 * =================================================================================
 * handle email and sms.
 * =================================================================================
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM 2.2
 * @type dialog modal
 */
var EmailSmsSender = (function () {
    var sendMailNoListing = function (config) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/no-listing-email/",
            type: "get",
            data: "leadId=" + (config.leadId ? config.leadId : '') + "&dealId=" + (config.dealId ? config.dealId : '')
        }).done(function (response) {

            EmailToCustomer.showModal({
                leadId: config.leadId,
                dealId: config.dealId,
                emailsTo: config.emailsTo,
                subject: noListingEmailTitle,
                content: response,
                emailType: config.emailType,
                onSent: function (response) {
                    if (response.result) {
                        try {
                            JMDetail.renderProgressList();
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                }
            });

        }).always(function () {
            hidePropzyLoading();
        });
    };

    var sendMailNotContacted = function (config) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/not-contacted-email-template",
            type: "get",
            data: "leadId=" + (config.leadId ? config.leadId : '') + "&dealId=" + (config.dealId ? config.dealId : '')
        }).done(function (response) {

            EmailToCustomer.showModal({
                leadId: config.leadId,
                dealId: config.dealId,
                emailsTo: config.emailsTo,
                subject: "Xác nhận lại thông tin đã đăng ký trên hệ thống Propzy",
                content: response,
                emailType: config.emailType,
                onSent: function (response) {
                    console.log(response);
                    if (response.result) {
                        try {
                            JMDetail.renderProgressList();
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                }
            });

        }).always(function () {
            hidePropzyLoading();
        });
    };




    var sendOtherEmail = function (config) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/other-email-template/",
            type: "get",
            data: "leadId=" + (config.leadId ? config.leadId : '') + "&dealId=" + (config.dealId ? config.dealId : '')
        }).done(function (response) {
            EmailToCustomer.showModal({
                leadId: config.leadId,
                dealId: config.dealId,
                emailsTo: config.emailsTo,
                subject: '',
                content: response,
                emailType: config.emailType,
                onSent: function (response) {
                    if (response.result) {
                        try {
                            JMDetail.renderProgressList();
                        } catch (ex) {
                            console.log(ex);
                        }
                    }
                }
            });
        }).always(function () {
            hidePropzyLoading();
        });
    };

    function chooseSendSmsType(params) {
        modalChooseEmailType.showModal({
            onItemChosen: function (returnParams) {
                //console.log(returnParams);
                var smsType = returnParams.value;
                if (smsType == 4) {
                    showPropzyAlert("Không hỗ trợ gửi SMS khác.");
                    return false;
                }
                getSmsTemplate({
                    type: returnParams.value,
                    callback: function (smsContent) {
                        ModalSendSms.showModal({
                            message: smsContent,
                            onYes: function (modal) {
                                var postData = {
                                    "phones": params.phoneNumbers.join(),
                                    "body": modal.find('textarea').val(),
                                    "code": null,
                                    "rlistingIds": null,
                                    "dealId": params.dealId,
                                    "leadId": params.leadId,
                                    "smsType": smsType
                                };
                                // console.log(postData);return false;
                                sendSmsToServer({
                                    postData: postData,
                                    callback: function (response) {
                                        if (response.result) {
                                            try {
                                                JMDetail.renderProgressList();
                                            } catch (ex) {
                                                console.log(ex);
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    }

    function chooseSendEmailType(params) {
        modalChooseEmailType.showModal({
            onItemChosen: function (returnParams) {
                var emailConfig = {
                    dealId: params.dealId,
                    leadId: params.leadId,
                    emailsTo: params.customerEmails,
                    emailType: returnParams.value
                };
                switch (returnParams.value) {
                    case 2:
                        sendMailNotContacted(emailConfig);
                        break;
                    case 3:
                        sendMailNoListing(emailConfig);
                        break;
                    case 4:
                        sendOtherEmail(emailConfig);
                        break;
                }
            }
        });

    }

    var sendSms = function (params) {
        var phoneNumbers = params.customerPhones.split(",");
        if (phoneNumbers.length > 1) {
            ModalChoosePhoneNumbers.showModal({
                phoneNumbers: phoneNumbers,
                onItemChosen: function (choosePhoneReturnParams) {
                    //console.log(choosePhoneReturnParams);
                    chooseSendSmsType({
                        "dealId": params.dealId,
                        "leadId": params.leadId,
                        "phoneNumbers": choosePhoneReturnParams.phoneNumbers
                    });
                }
            });
        } else {
            chooseSendSmsType({
                "dealId": params.dealId,
                "leadId": params.leadId,
                "phoneNumbers": phoneNumbers
            });
        }

    };

    var sendEmail = function (params) {

        var emails = params.customerEmails.split(",");
        if (emails.length > 1) {
            ModalChooseEmails.showModal({
                items: emails,
                onItemChosen: function (chooseReturnParams) {
                    chooseSendEmailType({
                        "dealId": params.dealId,
                        "leadId": params.leadId,
                        "customerEmails": chooseReturnParams.items.join(",")
                    });
                }
            });
        } else {
            chooseSendEmailType({
                "dealId": params.dealId,
                "leadId": params.leadId,
                "customerEmails": params.customerEmails
            });
        }



    };

    var sendMailOrSms = function (params) {
        if (params.customerEmails.trim() != "" && params.customerPhones.trim() != "") {
            ModalChooseSendType.showModal({
                onItemChosen: function (returnParams) {
                    console.log(returnParams);
                    if (returnParams.value == "sms") {
                        sendSms(params);
                    } else if (returnParams.value == "email") {
                        sendEmail(params);
                    }
                }
            });
        } else if (params.customerPhones) {
            sendSms(params);
        }
    };

    function getSmsTemplate(params) {
        var data = "type=" + params.type;
        if (params.rlistingIds) {
            data += "&rlistingIds=" + params.rlistingIds.join(",");
        }
        if (params.leadId) {
            data += "&leadId=" + params.leadId;
        }
        if (params.dealId) {
            data += "&dealId=" + params.dealId;
        }
        showPropzyLoading();
        $.ajax({
            url: "/deal/get-sms-template",
            type: "get",
            data: data
        }).done(function (response) {
            params.callback(response);
        }).always(function () {
            hidePropzyLoading();
        });
    }



    function sendSmsToServer(params) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/send-sms",
            type: "post",
            data: JSON.stringify(params.postData)
        }).done(function (response) {
            showPropzyAlert(response.message);
            params.callback(response);
        }).always(function () {
            hidePropzyLoading();
        });
    }


    return {
        "sendMailNoListing": sendMailNoListing,
        "sendOtherEmail": sendOtherEmail,
        "sendMailNotContacted": sendMailNotContacted,
        "sendMailOrSms": sendMailOrSms,
        "getSmsTemplate": getSmsTemplate,
        "sendSmsToServer": sendSmsToServer
    };

})();