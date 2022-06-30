var renderPhoto = function (data, type, object) {
    if (!object.photos) {
        return "";
    }
    if (object.photos.length <= 0) {
        return "";
    }
    return "<img style='max-width:32px' src='" + object.photos[0] + "' />";
}

var renderName = function (data, type, object) {
    if (data == null || data === "") {
        return "";
    }
    if (!object.isTransferToLs) {
        data = "<a href='#' class='btn-detail' data-item-id='" + object.id + "'>" + data + "</a>";
    }
    return data;
};

var renderStatus = function (data, type, object) {

    console.log("dljfksdjkfdfdf");
    if (!data) {
        return "";
    }
    if (object.isDeposited) {
        data = "Đã đặc cọc";
    } else {
        data = '';
    }
    return data;
};


var renderActions = function (data, type, object) {
    if (!data) {
        return "";
    }
    data = "<a href='/listing/create-from-brief-form/" + object.id + "'>Chuyển sang listing</a>";
    return data;
}
var renderSelectBriefForm = function (data, type, object) {
    if (!data) {
        return "";
    }
    if (object.isDeposited) {
        return "Đã đặc cọc";
    }
    var isChecked = "";
    var isDisabled = "";
    if (object.isScheduled) {
        isChecked = 'checked';
        isDisabled = 'disabled';
    }
    data = '<input type="checkbox" class="select-brief-form" ' + isChecked + ' ' + isDisabled + ' value="' + object.id + '" />';
    return data;
};
var renderBriefFormAddress = function (data, type, object) {
    return "<span class='address'>" + data + "</span>";
};

function listBriefForms(selector, id) {
    if (id === undefined) {
        id = -1;
    }
    $(selector).DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/deal/ajax-list-brief-form/" + id,
        "scrollX": true,
        "ordering": false,
        "lengthChange": false,
        "columns": [
            {data: null, render: renderSelectBriefForm},
            {data: 'photo', render: renderPhoto},
            //{data: 'name', render: renderName},
            {data: 'address', render: renderBriefFormAddress},
            //{data: 'phone'},
            {data: 'note'},
            {data: 'id', render: renderStatus}
        ],
        "createdRow": function (row, data, index) {
        }
    });

    $(selector).on('draw.dt', function () {
        $(".btn-detail").on("click", function (event) {
            event.preventDefault();
            $("#modalContactNote").remove();
            var dataUrl = '/deal/brief-form-detail/' + $(this).attr("data-item-id");
            showPropzyLoading();
            $.ajax({
                url: dataUrl,
                type: 'get'
            }).done(function (response) {
                $("body").append(response);

            }).always(function () {
                hidePropzyLoading();
            });
        });
    });
}



var loadRequestPaymentForm = function (dealId) {
    var modalId = "#paymentRequestModal";
    showPropzyLoading();
    $(modalId + " .saleName").val($("#saleName").val());
    $(modalId + " .dealId").val(dealId);
    $.ajax({
        url: "/deal/payment-request-detail?dealId=" + dealId,
        type: "get"
    }).done(function (response) {
        if (response.result) {
            if (response.data !== null) {
                var item = response.data;
                if (item.sentDate !== null) {
                    $(modalId + " #sentDate").val(moment(item.sentDate).format("MM/DD/YYYY"));
                }
                if (item.address !== null) {
                    $(modalId + " #address").val(item.sentDate);
                }
                if (item.taxCode !== null) {
                    $(modalId + " #taxCode").val(item.taxCode);
                }
                if (item.saleName !== null) {
                    $(modalId + " #saleName").val(item.saleName);
                }
                if (item.transactionValue !== null) {
                    $(modalId + " #transactionValue").val(item.transactionValue);
                }
                if (item.totalCommission !== null) {
                    $(modalId + " #totalCommission").val(item.totalCommission);
                }
                if (item.commissionForSale !== null) {
                    $(modalId + " #commissionForSale").val(item.commissionForSale);
                }
                if (item.serviceFees !== null) {
                    $(modalId + " #serviceFees").val(item.serviceFees);
                }
                if (item.serviceFeesInText !== null) {
                    $(modalId + " #serviceFeesInText").val(item.serviceFeesInText);
                }
                $(modalId + " .paymentMethod").prop("checked", false);
                if (item.method !== null) {
                    $(modalId + " .paymentMethod-" + item.method).prop("checked", true);
                }
                if (item.isDraft !== undefined && item.isDraft !== null && !item.isDraft) {
                    $(modalId + " .btnSendPaymentRequest").hide();
                }
            }
            $("#paymentRequestModal").modal();
        }
    }).always(function () {
        hidePropzyLoading();
    });

    updateTypeName();
    $.ajax({
        url: '/deal/generate-request-json',
        type: 'post',
        data: $("#dealInformation").serialize()
    }).done(function (response) {
        $("#paymentRequestModal .dealJson").val(JSON.stringify(response));
    }).always(function () {
    });
};

var loadEmailNoListingsForm = function (dealId, leadId) {
    var modal = $("#emailToCustomer");
    showPropzyLoading();
    modal.find("#isGoodsAvailable").val('0');
    modal.find("#emailsTo").val($("#customerEmail").text().trim());
    $.ajax({
        url: "/deal/no-listing-email/" + dealId,
        type: "get"
    }).done(function (response) {
        //$("#emailContent").val(response);
        CKEDITOR.instances['emailContent'].setData(response);
        modal.find(".photos-preview").html('');
        modal.find("#photos").val('');
        modal.find("#emailSubject").val(noListingEmailTitle);
        //$("#emailsTo").val($("#customerEmail").val());
        $("#emailToCustomer").modal();
    }).always(function () {
        hidePropzyLoading();
    });

    updateTypeName();
    $.ajax({
        url: '/deal/generate-request-json',
        type: 'post',
        data: $("#dealInformation").serialize()
    }).done(function (response) {
        modal.find(".requestJson").val(JSON.stringify(response));
    }).always(function () {
    });
};