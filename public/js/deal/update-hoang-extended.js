$("#statusId").change(function () {
    var statusId = parseInt($(this).val());
    console.log("change to " + statusId);
    if ($.inArray(parseInt(statusId), [20, 17, 13]) >= 0) {
        $(".btn-request-feedback").prop('disabled', false);
    } else {
        $(".btn-request-feedback").prop('disabled', true);
    }
    switch (statusId) {
        case 6:
            showModalSendContract();
            break;
        case 7:
            showModalRequestPayment();
            break;
        case 11:
            loadEmailNoListingsForm(dealId);
            break;
        default:
            break;
    }
});
/*
 if ($("#statusId").val() === "13") {
 $("#btnShowPaymentRequestForm").click();
 }
 */

if ($("#statusId").val() === "13") {
    $("#statusId").trigger('change');
    loadRequestPaymentForm(dealId);
}
function showModalRequestPayment() {
    loadRequestPaymentForm(dealId);
}



var savePaymentRequest = function (button, isDraft) {
    var dealRequestData = $("#paymentRequestModal").find(".dealJson").val();
    var postData = null;
    if (isDraft) {
        postData = {
            "dealId": dealId,
            "customerId": $("#customerId").val(),
            "customerName": $("#customerName").val(),
            "saleId": $("#saleId").val() !== "" ? $("#saleId").val() : null,
            "saleName": $("#saleName").val() !== "" ? $("#saleName").val() : null,
            "sentDate": $("#sentDate").val() !== "" ? moment($("#sentDate").val()).unix() * 1000 : null,
            "method": $(".paymentMethod:checked").val(),
            "isDraft": isDraft
        };
    } else {
        postData = {
            request: JSON.parse(dealRequestData),
            payment: {
                "dealId": dealId,
                "customerId": $("#customerId").val(),
                "customerName": $("#customerName").val(),
                "saleId": $("#saleId").val() !== "" ? $("#saleId").val() : null,
                "saleName": $("#saleName").val() !== "" ? $("#saleName").val() : null,
                "sentDate": $("#sentDate").val() !== "" ? moment($("#sentDate").val()).unix() * 1000 : null,
                "method": $(".paymentMethod:checked").val()
            },
            "isDraft": isDraft
        };
    }
    /*
     console.log(postData);
     return false;
     */
    showPropzyLoading();
    $.ajax({
        url: "/deal/save-payment-request",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
            if (!isDraft) {
                $(button).remove();
            }
            showPropzyAlert(response.message);
            $("#paymentRequestModal").modal("hide");
        } else {
            alert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function showModalSendContract() {
    if (!deal.contractFile) {
        showPropzyAlert("Upload hợp đồng trước khi gửi");
    } else {
        /*
         var listingHtml = "";
         $("#customer-listings .listing").each(function () {
         var itemId = $(this).attr('data-item-id');
         var haveRequestContract = $(this).attr('data-have-request-contract') === 'true' ? "checked" : "";
         listingHtml += "<label style='margin-right:16px;' ><input name='rlistingIds[]' type='checkbox' " + haveRequestContract + " value='" + itemId + "' /> " + itemId + "</label>";
         });
         $("#emailContractToCustomer .select-listing").html(listingHtml);
         */
        showPropzyLoading();
        $.ajax({
            url: "/deal/product-listings-data/" + dealId + "?type=deposit",
            type: "get"
        }).done(function (response) {
            if (response.result) {
                var listingHtml = "";
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    var itemId = item.rlistingId;
                    //var haveRequestContract = item.hasRequestContract === 'true' ? "checked" : "";
                    var haveRequestContract = "checked";
                    listingHtml += "<label style='margin-right:16px;' ><input name='rlistingIds[]' type='checkbox' " + haveRequestContract + " value='" + itemId + "' /> " + itemId + "</label>";
                }
                $("#emailContractToCustomer .select-listing").html(listingHtml);
                $.ajax({
                    url: "/deal/get-contract-email-template/" + dealId,
                    type: "get"
                }).done(function (response) {
                    CKEDITOR.instances['contractEmailContent'].setData(response);
                    $("#emailContractToCustomer").modal();
                }).always(function () {
                    hidePropzyLoading();
                });
                updateTypeName();
                $.ajax({
                    url: '/deal/generate-request-json',
                    type: 'post',
                    data: $("#dealInformation").serialize()
                }).done(function (response) {
                    $("#emailContractToCustomer #dealJson").val(JSON.stringify(response));
                }).always(function () {
                });

            }
        }).always(function () {
            //hidePropzyLoading();
        });
    }
}