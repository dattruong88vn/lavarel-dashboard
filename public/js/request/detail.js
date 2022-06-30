$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    
    //Thêm infos
    $(".btnAddInfos").on("click", function (event) {
        event.preventDefault();
        var newAgentEmail = '';
        var newAgentPhone = '';
        $.ajax({
            url: '/request/customer-main-phone/' + request.customerId,
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
                                "requestId": parseInt(request.requestId),
                                "oldCustomerId" : request.customerId,
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
                                        "requestId": parseInt(request.requestId),
                                        "oldCustomerId" : request.customerId,
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
                                    "requestId": parseInt(request.requestId),
                                    "oldCustomerId" : request.customerId,
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
                                            "requestId": parseInt(request.requestId),
                                            "oldCustomerId" : request.customerId,
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
                                "requestId": parseInt(request.requestId),
                                "oldCustomerId" : request.customerId,
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
                                        "requestId": parseInt(request.requestId),
                                        "oldCustomerId" : request.customerId,
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
                                    "requestId": parseInt(request.requestId),
                                    "oldCustomerId" : request.customerId,
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
                                    "requestId": parseInt(request.requestId),
                                    "oldCustomerId" : request.customerId,
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
});

