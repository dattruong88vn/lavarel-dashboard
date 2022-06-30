var level = 2;
var firstRun = true;
$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    if ($("#sourceId").val() == 7) {
        $("#sourceOther").show();
    }
    $(".select2").select2();
    repopulateTuTrachChecked('input.directions');
    $('#initialBudget').mask("#,##0", {reverse: true});
    $('#finalBudget').mask("#,##0", {reverse: true});
    $('#initialBudgetFixed').mask("#,##0", {reverse: true});

    $("#listingTypeId").change(function () {
        var listingTypeId = $(this).val();
        getPropertyTypes(listingTypeId);

        listingTypeId = $('#listingTypeId').val();
        var propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#propertyTypeId").change(function () {
        listingTypeId = $('#listingTypeId').val();
        propertyTypeId = $('#propertyTypeId').val();
        getAmedities(listingTypeId, propertyTypeId);
    });
    $("#sourceId").change(function () {
        var sourceId = $(this).val();
        $("#sourceOther").val("");
        if (sourceId == 7) {
            $("#sourceOther").show();
        } else {
            $("#sourceOther").hide();
        }
    });

    $("#saveAndUpdate").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            $("#modalMissingInfo").modal();
        }
    });

    $("#saveAndUpdate_step_2").on("click", function (event) {
        event.preventDefault();

        if (isBlank($('#areaMissingInfo').val()))
        {
            $("#alertModal .message").html('Nhập giá trị "Thông tin bị thiếu"');
            $("#alertModal").modal();
            return;
        }

        showPropzyLoading();

        $('<input />').attr('type', 'hidden')
                .attr('name', "missingInfo")
                .attr('value', $('#areaMissingInfo').val())
                .appendTo('#formCustomerInfo');

        $.ajax({
            url: "/request/do-update",
            data: $("#formCustomerInfo").serialize(),
            type: "post"
        }).done(function (response) {
            var message = response.message;
            if (response.result === true) {
                //window.location = '/request';
            } else {
                if (response.data !== null && response.data.length > 0) {
                    message = response.message + ' (Mã KH :' + response.data[0].customerId + ')';
                }
            }
            $("#modalMissingInfo").modal('hide');
            showPropzyAlert(message);
        }).always(function () {
            hidePropzyLoading();
        });

    });

    $("#createLead").on("click", function (event) {
        event.preventDefault();
        prepareForm();
        if (validateForm()) {
            $("#ajax-loading").show();

            $.ajax({
                url: "/request/create-lead",
                data: $("#formCustomerInfo").serialize(),
                type: "post"
            }).done(function (response) {
                if (response.result === true) {
                    window.location = '/lead/update/' + response.data.leadId;
                } else {
                    $("#alertModal .message").html(response.message + ' (Mã KH :' + response.data[0].customerId + ')');
                    $("#alertModal").modal();
                }
            }).always(function () {
                $("#ajax-loading").hide();
            });
        }
    });
    $("#checkphone").on("click", function () {
        var customerPhone = $("#customerPhone").val().trim();
        if (customerPhone === "") {
            showPropzyAlert("Chưa nhập số điện thoại!");
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/request/check-phone/' + $("#customerPhone").val(),
            'type': 'get'
        }).done(function (response) {
            showPropzyAlert(response);
            try {
                if (closeModel) {
                    closePropzyAlert();
                    closeModel = false;
                }
            } catch (err) {
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $("#checkEmail").on("click", function () {
        var customerEmail = $("#customerEmail").val().trim();
        if (customerEmail === "") {
            showPropzyAlert("Chưa nhập email!");
            return false;
        }
        showPropzyLoading();
        $.ajax({
            'url': '/request/check-email/' + customerEmail,
            'type': 'get'
        }).done(function (response) {
            showPropzyAlert(response);
            try {
                if (closeModel) {
                    closePropzyAlert();
                    closeModel = false;
                }
            } catch (err) {
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".chon_tu_trach").on("click", function () {
        var tuTrachType = $(this).val();
        getTuTrachCheckBoxs(tuTrachType, $(this).prop('checked'));
    });
});
function prepareForm() {
    $("#sourceName").val($("#sourceId").find('option:selected').text());
    $("#subjectName").val($("#subjectId").find('option:selected').text());
    $("#statusName").val($("#statusId").find('option:selected').text());
    $("#agentName").val($("#agentId").find('option:selected').text());
}