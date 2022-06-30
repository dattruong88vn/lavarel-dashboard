$(".panelCallButton").hide();

$(document).ready(function () {
    $("#emailsTo").val(toEmail);
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#_token').val()
        }
    });
    $("#callAgent").on("click", function (event) {
        event.preventDefault();
        var postData = {
            orderId: orderId,
            statusId: 3
        };
        post_sync("/order/call", postData, true, function (response) {
            //showPropzyAlert(response.message);
        });
        $(".panelCallButton").show();
    });
    $("#btnListingNote").on("click", function (event) {
        event.preventDefault();
        $("#modalListingNote").modal();
    });

    $(".btnEmailToCustomer").on("click", function (event) {
        event.preventDefault();
        showPropzyLoading();
        $.ajax({
            url: "/order/get-email-content/" + orderId + "/" + rlistingId,
            type: "GET"
        }).done(function (response) {
            CKEDITOR.instances['emailContent'].setData(response);
            $("#sendMailModal").modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });


    $("#btnSendMail").on("click", function (event) {
        event.preventDefault();
        for (var instanceName in CKEDITOR.instances) {
            CKEDITOR.instances[instanceName].updateElement();
        }
        showPropzyLoading();
        $.ajax({
            'url': "/order/send-mail-to-customer/"+orderId,
            'type': 'POST',
            'data': $("#formEmail").serialize()
        }).done(function (response) {
            if (response.result) {
                window.location = window.location;
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});