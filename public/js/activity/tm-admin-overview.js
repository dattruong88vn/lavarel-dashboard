$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#_token').val()
    }
});

$(document).ready(function () {
    $("#selectCities").select2();
    $("#selectRegions").change(function () {
        var regionIds = $(this).val();
        getCities(regionIds, "#selectCities");
    });
    getRegions("#selectRegions");
    getType();
});

function getRegions(selector) {
    $.ajax({
        "url": "/zone/get-regions",
        "type": "get"
    }).done(function (response) {
        var html = "";
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                html += "<option value='" + response.data[i].regionId + "'>" + response.data[i].regionName + "</option>";
            }
        }
        $(selector).html(html).select2();
    }).always(function () {

    });
}

function getCities(regionIds, selector) {
    var postData = {
        "regionIdsList": regionIds
    };
    $.ajax({
        "url": "/zone/get-cities-by-regions",
        "type": "post",
        "data": JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        if (response.result) {
            for (var i = 0; i < response.data.length; i++) {
                html += "<option value='" + response.data[i].cityId + "'>" + response.data[i].cityName + "</option>";
            }
        }
        $(selector).html(html).select2();
    }).always(function () {

    });
}

function getType() {
    $.ajax({
        "url": "/activity/get-item-type",
        "type": "get"
    }).done(function (response) {
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
            html += "<option value='" + response.data[i].key + "'>" + response.data[i].value + "</option>";
        }
        $("#type").html(html);
    }).always(function () {

    });
}

