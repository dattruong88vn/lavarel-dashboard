$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    $("#dataTableRespondedListing").hide();
    $("#dataTableRespondedContact").hide();
    $(".show-response").on("click", function (event) {
        event.preventDefault();
        var type = $(this).attr('data-type');
        var load = $(this).attr('data-load');
        var postData = {
            "leadId": leadId,
            "type": parseInt(type), // type=1 cho contact, != 1 cho listing
            "load": parseInt(load) // load=1 load đã đọc, != 1 load all
        };
        showPropzyLoading();
        $.ajax({
            'url': '/deal/get-order-response-data',
            'type': 'post',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                if (postData.type !== 1) {
                    showResponsedListingDataTable(response.data);
                } else {
                    showResponsedContactDataTable(response.data);
                }
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
});
var dataTableRespondedListing = null;
var dataTableRespondedContact = null;
function showResponsedListingDataTable(data) {
    try {
        dataTableRespondedListing.destroy();
    } catch (Ex) {
    }
    if (data) {
        $("#dataTableRespondedListing").show();
        dataTableRespondedListing = $("#dataTableRespondedListing").DataTable({
            'searching': false,
            'ordering': false,
            'paging': false,
            data: data,
            columns: [
                {data: 'createdDate', render: dateRender},
                {data: 'name'},
                {data: 'status', render: function (data, type, object) {
                        data = "<a href='/order/listing/" + object.orderId + "/" + object.rlistingId + "' target='_blank'>" + data + "</a>";
                        return data;
                    }}
            ]
        });
    } else {
        $("#dataTableRespondedListing").hide();
    }
}
function showResponsedContactDataTable(data) {
    try {
        dataTableRespondedContact.destroy();
    } catch (Ex) {
    }
    if (data) {
        $("#dataTableRespondedContact").show();
        dataTableRespondedContact = $("#dataTableRespondedContact").DataTable({
            'searching': false,
            'ordering': false,
            'paging': false,
            data: data,
            columns: [
                {data: 'createdDate', render: dateRender},
                {data: 'name'},
                {data: 'status', render: function (data, type, object) {
                        data = "<a href='/order/contact/" + object.orderId + "/" + object.contactId + "' target='_blank'>" + data + "</a>";
                        return data;
                    }}
            ]
        });
    } else {
        $("#dataTableRespondedContact").hide();
    }
}