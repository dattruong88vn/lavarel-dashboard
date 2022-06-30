$(document).ready(function () {
    $(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postUrl = "/bank/save";
        if (!validateForm("#formMain")) {
            return false;
        }
        showPropzyLoading();
        $.ajax({
            url: postUrl,
            type: "post",
            data: $("#formMain").serialize()
        }).done(function (response) {
            if ($("#id").val().trim() === "" && response.result) {
                window.location.href = "/bank";
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });
});

var validateForm = function (form) {
    $(".errors").html("");
    var code = $(form + " #code").val();
    var isValidate = true;
    if (code.trim() === "") {
        $(form + " #code").parents(".input-group").find(".errors").html("Nhập mã");
        isValidate = false;
    }
    var name = $(form + " #name").val();

    if (name.trim() === "") {
        $(form + " #name").parents(".input-group").find(".errors").html("Nhập tên");
        isValidate = false;
    }
    var interestedRate = $(form + " #interestedRate").val();

    if (interestedRate.trim() === "") {
        $(form + " #interestedRate").parents(".input-group").find(".errors").html("Nhập tỷ giá");
        isValidate = false;
    }
    return isValidate;
}