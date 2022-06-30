/**
 * =================================================================================
 * handle email and sms listing to customer.
 * =================================================================================
 * @author Phan Minh Hoàng <hoang.phan@propzy.com>
 * @since CRM 2.2
 * @type dialog modal
 */
var ListingsEmailSmsSender = (function () {

    var sendMailOrSms = function (params) {
        if (params.customerEmails.trim() != "" && params.customerPhones.trim() != "") {
            ModalChooseSendType.showModal({
                onItemChosen: function (returnParams) {
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



    var sendEmail = function (params) {
        var emails = params.customerEmails.split(",");
        if (emails.length > 1) {
            ModalChooseEmails.showModal({
                items: emails,
                onItemChosen: function (chooseReturnParams) {
                    params.customerEmails = chooseReturnParams.items.join(",");
                    getEmailTemplate(params);
                }
            });
        } else {
            getEmailTemplate(params);
        }
    };



    function chooseSendSmsType(params) {
        EmailSmsSender.getSmsTemplate({
            "leadId": params.leadId,
            "dealId": params.dealId,
            "type": 1,
            "rlistingIds": params.rListingIds,
            "callback": function (smsContent) {
                var code = smsContent.match(/\[code\][a-z0-9]+\[code\]/g);
                smsContent = smsContent.replace(code, '');
                smsContent = smsContent.replace(/\n/g, '');
                smsContent = smsContent.replace(/\r/g, '');
                smsContent = smsContent.trim();
                if (code && code.length > 0) {
                    //code = code[0].replace('[code]', '');
                    var re = new RegExp('\\[code\\]', 'g');
                    code = code[0].replace(re, '');
                }
                console.log(code);
                ModalSendSms.showModal({
                    message: smsContent,
                    onYes: function (modal) {
                        var postData = {
                            "phones": params.phoneNumbers.join(),
                            "body": modal.find('textarea').val(),
                            "code": code,
                            "rlistingIds": params.rListingIds.join(','),
                            "dealId": params.dealId,
                            "leadId": params.leadId,
                            "smsType": 1
                        };
                        EmailSmsSender.sendSmsToServer({
                            postData: postData,
                            callback: function (response) {
                                try{
                                    DealFunctions.updateViewDetailRealTime();
                                }catch(ex){}
                                window.location.reload();
                            }
                        });
                    }
                });
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
                        "phoneNumbers": choosePhoneReturnParams.phoneNumbers,
                        "rListingIds": params.rListingIds
                    });
                }
            });
        } else {
            chooseSendSmsType({
                "dealId": params.dealId,
                "leadId": params.leadId,
                "phoneNumbers": phoneNumbers,
                "rListingIds": params.rListingIds
            });
        }

    };


    function getEmailTemplate(params) {
        showPropzyLoading();
        $.ajax({
            url: "/deal/get-customer-email-template/",
            type: "get",
            data: "leadId=" + (params.leadId ? params.leadId : '') + "&dealId=" + (params.dealId ? params.dealId : '') + "&rlistingIds=" + params.rListingIds,
        }).done(function (response) {
            $(".photos-preview").html(params.photosPreview);
            $(".btnRemovePhoto").on("click", function (event) {
                event.preventDefault();
                $(this).parent().remove();
            });
            var content = $(response);
            $("#photos").val(params.photos);
//        $("#emailSubject").val("Nhà phù hợp với nhu cầu của "+$("#customerName").val());
//        var propertyType = content.find(".propertyType").html();
//        var emailSubject = "Propzy chia sẻ Bộ sưu tập " + propertyType + " phù hợp nhu cầu";
            var emailSubject = "Thông báo có BĐS phù hợp với nhu cầu tìm kiếm của quý khách";
            EmailToCustomer.showModal({
                leadId: params.leadId,
                dealId: params.dealId,
                emailsTo: params.customerEmails,
                subject: emailSubject,
                content: response,
                emailType: 1,
                rListingIds: params.rListingIds,
                onSent: function (response) {
                    if (response.result) {     
                        try{
                            DealFunctions.updateViewDetailRealTime();
                        }catch(ex){}
                        window.location.reload();
                    }
                }

            });
        }).always(function () {
            hidePropzyLoading();
        });
    }


    return {
        "sendMailOrSms": sendMailOrSms
    };

})();