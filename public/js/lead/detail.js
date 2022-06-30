$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });


    CKEDITOR.replace("emailContent");
    var modalCreateMeeting = $("#modalCreateMeeting");
    $("#btnSendToCrm").on("click", function (event) {
        event.preventDefault();
        //isQuestionFormComplete(lead.leadId, triggerSendToCrm);
        triggerSendToCrm();
    });

    $(".btnSaveMeeting").on("click", function (event) {
        event.preventDefault();
        var meetingData = {
            "tCId": null,
            "leadId": parseInt(lead.leadId),
            "dealId": null,
            "assignTo": parseInt(modalCreateMeeting.find(".assignTo").val()),
            "reminderDate": null,
            //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
            "noteTm": modalCreateMeeting.find(".noteTm").val()
        };
        var whenDate = modalCreateMeeting.find(".whenDate").val();
        var whenTime = modalCreateMeeting.find(".whenTime").val();
        var date = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm");
        if (date.isValid()) {
            meetingData.reminderDate = date.unix() * 1000;
        }
        saveMeeting(meetingData);
        /*
         if (!lead.dealId) {
         generateDeal(function (response) {
         meetingData.dealId = response.data.dealId;
         saveMeeting(meetingData);
         });
         } else {
         meetingData.dealId = lead.dealId;
         saveMeeting(meetingData);
         }
         */
    });


    $(".makeCall").on("click", function (event) {
        event.preventDefault();
        //$('body').css('pointer-events', 'none');
        var phoneNumber = $(".customerPhone").val().trim();
        if ($(".customerPhone").val().indexOf(",") > 0) {
            phoneNumbers = phoneNumber.split(",");
            let phoneNumbersParse = phoneNumbers.map((phone,key)=>{
                return Base64.decode(phone);
            })
            ModalChoosePhoneNumber.showModal({
                phoneNumbers: phoneNumbersParse,
                onItemChosen: function (data) {
                    console.log(data);
                    DealFunctions.makeCall({
                        type: 78,
                        phoneNumber: data.phoneNumber,
                        dealId: null,
                        leadId: lead.leadId
                    });
                }
            });
        } else {
            DealFunctions.makeCall({
                type: 78,
                phoneNumber: Base64.decode(phoneNumber),
                dealId: null,
                leadId: lead.leadId
            });
        }
    });

    var timer = new SendTimerCounter({key:`lead-${lead.leadId}`, timeDoAction: lead.timeInactive});
    timer.init();

    // check close, reload browser
    var _BrowserCloseAction = new BrowserCloseAction(
        `lead-${lead.leadId}`,
        function(){
            console.log("reload");
            if(lead.progressQuoId != 3 && lead.progressQuoId != 4){
                if(lead.dealId == ""){
                    timer.submit({leadId: lead.leadId});
                }  
            }
        },
        function(){
            console.log("close");
            if(lead.progressQuoId != 3 && lead.progressQuoId != 4){
                if(lead.dealId == ""){
                    timer.submit({leadId: lead.leadId});
                } 
            }
        }
    );
    _BrowserCloseAction.init();

    $(".btnCancelLead").on("click", function (event) {
        event.preventDefault();
        
        
        ModalUpdateStatusPendingReason.showModal({
            "postData": {
            "typeNeedName": "lead",
            "needId": lead.leadId,
            "progressQuoId": 3,
            "isSet": true
        }
        });
    });

    //Thêm infos
    $(".btnAddInfos").on("click", function (event) {
        event.preventDefault();
        var newAgentEmail = '';
        var newAgentPhone = '';
        $.ajax({
            url: '/lead/customer-main-phone/' + lead.customerId,
            type: 'get'
        }).done(function (response) {
            //console.log(response);
            var htmlEmail = '';
            var htmlPhone = '';
            if (response.result) {
                if(response.data.emailList.length == 0){
                    // popup get email : newAgentEmail
                    $("#modalAddEmailAgent").modal();
                    $("#modalAddEmailAgent").find(".btn-add-email").on("click", function (event){
                        event.preventDefault();
                        $("#modalAddEmailAgent").find('.errors').html('');
                        newAgentEmail = $("#modalAddEmailAgent").find("#newAgentEmail").val().trim();
                        if(newAgentEmail == '' || !isValidEmail(newAgentEmail)){
                            $("#newAgentEmail").parent().find('.errors').html('Email không hợp lệ');
                            return false;
                        } else{
                            $("#modalAddEmailAgent").modal('hide');
                        }

                        if(response.data.phoneList.length == 1){
                            newAgentPhone = response.data.phoneList[0].phone;
                            //console.log(newAgentEmail);
                            //console.log(newAgentPhone);
                            ModalAddInfosNewCustomer.showModal({
                                "leadId": parseInt(lead.leadId),
                                "oldCustomerId" : lead.customerId,
                                "newAgentEmail" : newAgentEmail,
                                "newAgentPhone" : newAgentPhone
                            });
                        } else if(response.data.phoneList.length > 1){
                            for(var i=0;i<response.data.phoneList.length;i++){
                                htmlPhone+= '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="'+response.data.phoneList[i].phone+'"/> '+response.data.phoneList[i].phone+ ' ';
                            }
                            $('#modalChooseMainPhone').modal();
                            if(htmlPhone != ''){
                                $("#modalChooseMainPhone").find('#phoneList').html('Số điện thoại : '+htmlPhone);
                            }
                            $("#modalChooseMainPhone").find(".btn-choose-main-phone").on("click", function (event){
                                event.preventDefault();
                                newAgentPhone = $("#modalChooseMainPhone").find('input[name="chosenPhoneMain"]:checked').val();
                                if(!newAgentPhone){
                                    showPropzyAlert('Vui lòng chọn số điện thoại');
                                    return false;
                                } else{
                                    //console.log(newAgentEmail);
                                    //console.log(newAgentPhone);
                                    $('#modalChooseMainPhone').modal('hide');
                                    ModalAddInfosNewCustomer.showModal({
                                        "leadId": parseInt(lead.leadId),
                                        "oldCustomerId" : lead.customerId,
                                        "newAgentEmail" : newAgentEmail,
                                        "newAgentPhone" : newAgentPhone
                                    });
                                }
                            });
                        }
                    }); //end btn-add-email click
                } // end emailList.length = 0
                else if(response.data.emailList.length == 1){
                    newAgentEmail = response.data.emailList[0].email;
                    if(!newAgentEmail){ // tồn tại emailList nhưng email = null
                        // popup get email : newAgentEmail
                        $("#modalAddEmailAgent").modal();
                        $("#modalAddEmailAgent").find(".btn-add-email").on("click", function (event){
                            event.preventDefault();
                            $("#modalAddEmailAgent").find('.errors').html('');
                            newAgentEmail = $("#modalAddEmailAgent").find("#newAgentEmail").val().trim();
                            if(newAgentEmail == '' || !isValidEmail(newAgentEmail)){
                                $("#newAgentEmail").parent().find('.errors').html('Email không hợp lệ');
                                return false;
                            } else{
                                $("#modalAddEmailAgent").modal('hide');
                            }

                            if(response.data.phoneList.length == 1){
                                newAgentPhone = response.data.phoneList[0].phone;
                                //console.log(newAgentEmail);
                                //console.log(newAgentPhone);
                                ModalAddInfosNewCustomer.showModal({
                                    "leadId": parseInt(lead.leadId),
                                    "oldCustomerId" : lead.customerId,
                                    "newAgentEmail" : newAgentEmail,
                                    "newAgentPhone" : newAgentPhone
                                });
                            } else if(response.data.phoneList.length > 1){
                                for(var i=0;i<response.data.phoneList.length;i++){
                                    htmlPhone+= '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="'+response.data.phoneList[i].phone+'"/> '+response.data.phoneList[i].phone+ ' ';
                                }
                                $('#modalChooseMainPhone').modal();
                                if(htmlPhone != ''){
                                    $("#modalChooseMainPhone").find('#phoneList').html('Số điện thoại : '+htmlPhone);
                                }
                                $("#modalChooseMainPhone").find(".btn-choose-main-phone").on("click", function (event){
                                    event.preventDefault();
                                    newAgentPhone = $("#modalChooseMainPhone").find('input[name="chosenPhoneMain"]:checked').val();
                                    if(!newAgentPhone){
                                        showPropzyAlert('Vui lòng chọn số điện thoại');
                                        return false;
                                    } else{
                                        //console.log(newAgentEmail);
                                        //console.log(newAgentPhone);
                                        $('#modalChooseMainPhone').modal('hide');
                                        ModalAddInfosNewCustomer.showModal({
                                            "leadId": parseInt(lead.leadId),
                                            "oldCustomerId" : lead.customerId,
                                            "newAgentEmail" : newAgentEmail,
                                            "newAgentPhone" : newAgentPhone
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        if(response.data.phoneList.length == 1){
                            newAgentPhone = response.data.phoneList[0].phone;
                            //console.log(newAgentEmail);
                            //console.log(newAgentPhone);
                            ModalAddInfosNewCustomer.showModal({
                                "leadId": parseInt(lead.leadId),
                                "oldCustomerId" : lead.customerId,
                                "newAgentEmail" : newAgentEmail,
                                "newAgentPhone" : newAgentPhone
                            });
                        } else if(response.data.phoneList.length > 1){
                            for(var i=0;i<response.data.phoneList.length;i++){
                                htmlPhone+= '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="'+response.data.phoneList[i].phone+'"/> '+response.data.phoneList[i].phone+ ' ';
                            }
                            $('#modalChooseMainPhone').modal();
                            if(htmlPhone != ''){
                                $("#modalChooseMainPhone").find('#phoneList').html('Số điện thoại : '+htmlPhone);
                            }
                            $("#modalChooseMainPhone").find(".btn-choose-main-phone").on("click", function (event){
                                event.preventDefault();
                                newAgentPhone = $("#modalChooseMainPhone").find('input[name="chosenPhoneMain"]:checked').val();
                                if(!newAgentPhone){
                                    showPropzyAlert('Vui lòng chọn số điện thoại');
                                    return false;
                                } else{
                                    //console.log(newAgentEmail);
                                    //console.log(newAgentPhone);
                                    $('#modalChooseMainPhone').modal('hide');
                                    ModalAddInfosNewCustomer.showModal({
                                        "leadId": parseInt(lead.leadId),
                                        "oldCustomerId" : lead.customerId,
                                        "newAgentEmail" : newAgentEmail,
                                        "newAgentPhone" : newAgentPhone
                                    });
                                }
                            });
                        }
                    }
                } // end emailList.length = 1
                else if(response.data.emailList.length > 1){
                    if(response.data.phoneList.length == 1){
                        newAgentPhone = response.data.phoneList[0].phone;
                        //modalChooseMainEmail
                        for(var i=0;i<response.data.emailList.length;i++){
                            htmlEmail+= '<input class="chosenEmail chosen-select-email" type="radio" name="chosenEmailMain" value="'+response.data.emailList[i].email+'"/> '+response.data.emailList[i].email+ ' ';
                        }
                        $('#modalChooseMainEmail').modal();
                        if(htmlEmail != ''){
                            $("#modalChooseMainEmail").find('#emailList').html('Email : '+htmlEmail);
                        }
                        //
                        $("#modalChooseMainEmail").find(".btn-choose-main-email").on("click", function (event){
                            event.preventDefault();
                            newAgentEmail = $("#modalChooseMainEmail").find('input[name="chosenEmailMain"]:checked').val();
                            if(!newAgentEmail){
                                showPropzyAlert('Vui lòng chọn email');
                                return false;
                            } else{
                                //console.log(newAgentEmail);
                                //console.log(newAgentPhone);
                                $('#modalChooseMainEmail').modal('hide');
                                ModalAddInfosNewCustomer.showModal({
                                    "leadId": parseInt(lead.leadId),
                                    "oldCustomerId" : lead.customerId,
                                    "newAgentEmail" : newAgentEmail,
                                    "newAgentPhone" : newAgentPhone
                                });
                            }
                        });
                    } else if(response.data.phoneList.length > 1){
                        $("#modalChooseMainPhoneEmail").modal();
                        for(var i=0;i<response.data.emailList.length;i++){
                            htmlEmail+= '<input class="chosenEmail chosen-select-email" type="radio" name="chosenEmailMain" value="'+response.data.emailList[i].email+'"/> '+response.data.emailList[i].email+ ' ';
                        }
                        for(var i=0;i<response.data.phoneList.length;i++){
                            htmlPhone+= '<input class="chosenPhone chosen-select-phone" type="radio" name="chosenPhoneMain" value="'+response.data.phoneList[i].phone+'"/> '+response.data.phoneList[i].phone+ ' ';
                        }
                        if(htmlEmail != ''){
                            $("#modalChooseMainPhoneEmail").find('#emailListing').html('Email : '+htmlEmail);
                        }
                        if(htmlPhone != ''){
                            $("#modalChooseMainPhoneEmail").find('#phoneList').html('Số điện thoại : '+htmlPhone);
                        }
                        //
                        $("#modalChooseMainPhoneEmail").find(".btn-chosen-main-email-phone").on("click", function (event){
                            event.preventDefault();
                            newAgentEmail = $("#modalChooseMainPhoneEmail").find('input[name="chosenEmailMain"]:checked').val();
                            if(!newAgentEmail){
                                showPropzyAlert('Vui lòng chọn Email');
                                return false;
                            }
                            newAgentPhone = $("#modalChooseMainPhoneEmail").find('input[name="chosenPhoneMain"]:checked').val();
                            if(!newAgentPhone){
                                showPropzyAlert('Vui lòng chọn số điện thoại');
                                return false;
                            }

                            if(newAgentEmail != '' && newAgentPhone!= ''){
                                //console.log(newAgentEmail);
                                //console.log(newAgentPhone);
                                $("#modalChooseMainPhoneEmail").modal('hide');
                                ModalAddInfosNewCustomer.showModal({
                                    "leadId": parseInt(lead.leadId),
                                    "oldCustomerId" : lead.customerId,
                                    "newAgentEmail" : newAgentEmail,
                                    "newAgentPhone" : newAgentPhone
                                });
                            }
                        });
                    }
                } // end emailList.length > 1
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
    
    $(".btnUnlockDeal").on("click", function (event) {
        event.preventDefault();
        ModalUnclock.showModal({
            "type": 'lead',
            "progressQuoId": 3,
            "needId": parseInt(lead.leadId),
            "reasonCode": -1,
            "note":null
        });
    });

    $(".btnSendMail").on('click', function (event) {
        event.preventDefault();
        EmailSmsSender.sendMailOrSms({
            leadId: lead.leadId,
            customerEmails: lead.customerEmails,
            customerPhones: Base64.decode(lead.customerPhones)
        });
    });



    $(".btn-quick-check-listings").on("click", function () {
        var listingIdsJsonText = $("#arrayStoreListingForAction").val().trim();
        if (listingIdsJsonText == "") {
            showPropzyAlert("Chọn listing để gửi check");
        }

        var rlistingIds = JSON.parse(listingIdsJsonText);
        QuickCheckListings.showQuickCheckModal({
            "dealId": null,
            "leadId": lead.leadId,
            "rlistingIds": rlistingIds
        });
    });

    
    $(".btnReassign").on('click', function (event) {
        event.preventDefault();
        $('#modalReassignResponsiblePerson').modal();
    });
    $(".btnSaveReassignResponsiblePerson").on('click', function (event) {
        var postData = {
            "dealId": null,
            "leadId": lead.leadId,
            "reason": $("#leadReassignReason").val(),
            "assignedTo": $("#modalReassignResponsiblePerson .assignedTo").val()
        };
        var isValidated = true;
        if (postData.reason.trim() === "") {
            $("#leadReassignReason").parent().find('.errors').html('Nhập lý do');
            isValidated = false;
        }
        if ("" === postData.assignedTo.trim()) {
            $("#modalReassignResponsiblePerson .assignedTo").parent().find('.errors').html('Chọn người chịu trách nhiệm chính');
        }
        if (false === isValidated) {
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/lead/reassign-responsible-person',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                // window.location = window.location;
                window.location.replace("/");
            }
            showPropzyAlert(response.message);
            $('#modalReassignResponsiblePerson').modal('hide');
        }).always(function () {
            hidePropzyLoading();
        });
    });
    $(".btnShowConfig").on("click", function (event) {
        event.preventDefault();
        ConfigNewListings.showModal(lead.leadId);
    });
});

function isQuestionFormComplete(leadId, callBack) {
    var postData = {leadId: leadId};
    $.ajax({
        url: "/question/check-complete-question-form",
        data: JSON.stringify(postData),
        type: "post"
    }).done(function (response) {
        console.log(response);
        if (response.result == true) {
            callBack();
        } else {
            alert(response.message);
        }
    });

}
var isValidEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var triggerSendToCrm = function () {
    showPropzyLoading();
    //check data
    if (lead.crmAssignedList && lead.crmAssignedList.length > 0) {
        DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
    } else {
        findCrms(null, null);
    }
    $.ajax({
        url: "/lead/get-detail-json/" + lead.leadId,
        type: "get"
    }).done(function (response) {

        //check isPrefered
        var check_districtsPrefered = false;
        var districtsLength = response.data.districtsList.length;
        console.log(districtsLength);

        for (var i = 0; i < districtsLength; i++) {
            if (response.data.districtsList[i].isPrefered == true) {
                //console.log('districtsPrefered ' + i + ' = ' + response.data.request.districtsList[i].isPrefered);
                check_districtsPrefered = true;
                break;
            }
        }

        //check initialBudgetFixed
        /*
         console.log('initialBudgetFixed = ' + response.data.request.initialBudgetFixed);
         var check_initialBudgetFixed = false;
         if (response.data.request.initialBudgetFixed > 0) {
         //error initialBudgetFixed
         check_initialBudgetFixed = true;
         }
         */

        //check customerReview
        console.log('customerReview = ' + response.data.customerReview);
        // var check_customerReview = false;
        // if (response.data.customerReview != null) {
        //     check_customerReview = true;
        // }

        if (check_districtsPrefered) {
            var isChecked = ($(this).prop("checked") || lead.meetingId);
            showUpdateOrCreateMeetingForm(lead.meetingId);
        } else {
            hidePropzyLoading();
            var alert_text = '';
            if (check_districtsPrefered == false) {
                $(".district-errors").html("Chưa chọn Quận ưa thích !");
                alert_text += "Chưa chọn Quận ưa thích\r\n";
                alert(alert_text);
            }
            /*
             if (check_initialBudgetFixed == false) {
             $(".initialbudgetfixed-errors").html("Chưa chọn Ngân sách !");
             alert_text += "Chưa chọn Ngân sách ban đầu (Fixed) \r\n";
             alert(alert_text);
             }
             */
            // if (check_customerReview == false) {
            //     alert_text += "Chưa có đánh giá khách hàng";
            // }

        }

    }).always(function () {
        hidePropzyLoading();
    });
};

$(".btnOpenEmailForm").on("click", function (event) {


    event.preventDefault();

    var photos = [];
    var photosPreview = "";
    var txtRListingIds = $('#arrayStoreListingForAction').val().trim();

    if (txtRListingIds.length <= 0) {
        showPropzyAlert('Không có listing để gửi');
        return false;
    }
    var rListingIds = JSON.parse($('#arrayStoreListingForAction').val());
    if (rListingIds.length <= 0) {
        showPropzyAlert('Không có listing để gửi');
        return false;
    } else if (rListingIds.length > 3) {
        showPropzyAlert('Chỉ được chọn tối đa 3 listing');
        return false;
    }

    let phoneNumber = lead.customerPhones;
    // phoneNumber = Base64.decode(phoneNumber);
    if (phoneNumber.indexOf(",") > 0) {
        phoneNumbers = phoneNumber.split(",")
        let phoneNumbersParse = phoneNumbers.map((phone, key) => {
            return Base64.decode(phone)
        })
        ListingsEmailSmsSender.sendMailOrSms({
            leadId: lead.leadId,
            customerEmails: lead.customerEmails,
            customerPhones: phoneNumbersParse.toString(','),
            rListingIds: rListingIds,
            photosPreview: photosPreview,
            photos: photos
        });
    } else {
        ListingsEmailSmsSender.sendMailOrSms({
            leadId: lead.leadId,
            customerEmails: lead.customerEmails,
            customerPhones: Base64.decode(phoneNumber),
            rListingIds: rListingIds,
            photosPreview: photosPreview,
            photos: photos
        });
    }


    // ListingsEmailSmsSender.sendMailOrSms({
    //     leadId: lead.leadId,
    //     customerEmails: lead.customerEmails,
    //     customerPhones: Base64.decode(lead.customerPhones),
    //     rListingIds: rListingIds,
    //     photosPreview: photosPreview,
    //     photos: photos
    // });

    // let phoneNumber = lead.customerPhones;
    // // phoneNumber = Base64.decode(phoneNumber);
    // if (phoneNumber.indexOf(",") > 0) {
    //     phoneNumbers = phoneNumber.split(",")
    //     let phoneNumbersParse = phoneNumbers.map((phone, key) => {
    //         return Base64.decode(phone)
    //     })
    //     ListingsEmailSmsSender.sendMailOrSms({
    //         leadId: lead.leadId,
    //         customerEmails: lead.customerEmails,
    //         customerPhones: phoneNumbersParse.toString(','),
    //         rListingIds: rListingIds,
    //         photosPreview: photosPreview,
    //         photos: photos
    //     });
    // } else {
    //     ListingsEmailSmsSender.sendMailOrSms({
    //         leadId: lead.leadId,
    //         customerEmails: lead.customerEmails,
    //         customerPhones: Base64.decode(phoneNumber),
    //         rListingIds: rListingIds,
    //         photosPreview: photosPreview,
    //         photos: photos
    //     });
    // }
    return false;
});