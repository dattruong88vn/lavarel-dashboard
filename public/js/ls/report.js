$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('#csrf-token').val()
    }
});
$(document).ready(function () {
    initListingPending(".section-pending-listing");
    initAvgTimeToLive(".section-avg-time-to-live");
    initStatusListing(".section-status-listing");
    initDiyListing(".section-listing-diy");
});

function initListingTypes(container, option) {
    $(container + " .listingTypes").change(function () {
        var listingTypeId = $(this).val();
        getPropertyTypes(container, listingTypeId);
        if (option && option.changeCallback) {
            option.changeCallback();
        }
    });
}
//getDistricts(".section-pending-listing", $(".section-pending-listing .cities").val());
function getPropertyTypes(container, listingTypes) {
    $(container + " .propertyTypes").html("").select2();
    showPropzyLoading();
    var dataUrl = '/common/get-property-type/';
    if (listingTypes && listingTypes.length == 1) {
        dataUrl += listingTypes;
    }
    $.ajax({
        url: dataUrl,
        type: 'get'
    }).done(function (response) {
        var html = "<option value=''>Chọn loại BĐS</option>";
        for (i = 0; i < response.length; i++) {
            var item = response[i];
            html += "<option value='" + item.propertyTypeID + "'>" + item.typeName + "</option>";
        }
        $(container + " .propertyTypes").html(html).select2();
    }).always(function () {
        hidePropzyLoading();
    });
}

function getDistricts(container, cityId) {
    showPropzyLoading();
    var dataUrl = '/common/get-district/' + cityId;
    $.ajax({
        url: dataUrl,
        type: 'get'
    }).done(function (response) {
        var html = "<option value=''>Chọn quận</option>";
        for (i = 0; i < response.length; i++) {
            var item = response[i];
            html += "<option value='" + item.districtId + "'>" + item.districtName + "</option>";
        }
        $(container + " .districts").html(html).select2();
    }).always(function () {
        hidePropzyLoading();
    });

}

function initListingPending(container) {
    loadListingPending(container);
    initListingTypes(container);
    initExportButton(container, "/ls/report-reason-pending-listing?type=export");
    $(container + " .tableContent").hide();
    getDistricts(container, 1);
    $(container + " select").on("change", function () {
        loadListingPending(container);
    });
    $(container + " .fromDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        $(container + " .toDate").focus();
        loadListingPending(container);
    });
    $(container + " .toDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        loadListingPending(container);
    });
}

function loadListingPending(container) {
    showPropzyLoading();
    var postData = getpostData(container);
    $(container + " .tableContent").hide();
    $.ajax({
        url: "/ls/report-reason-pending-listing",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<tr><td>" + item.reasonName + "</td><td>" + item.numberOfListings + "</td></tr>";
        }
        $(container + " .tableContent tbody").html(html);
        $(container + " .tableContent").show();
    }).always(function () {
        hidePropzyLoading();
    });
}


function initAvgTimeToLive(container) {
    loadAvgTimeToLive(container);
    initListingTypes(container);
    $(container + " .tableContent").hide();
    getDistricts(container, 1);
    $(container + " select").on("change", function () {
        loadAvgTimeToLive(container);
    });
    $(container + " .fromDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        $(container + " .toDate").focus();
        loadAvgTimeToLive(container);
    });
    $(container + " .toDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        loadAvgTimeToLive(container);
    });

    initExportButton(container, "/ls/report-avg-time-to-live?type=export");
}

function loadAvgTimeToLive(container) {
    var postData = getpostData(container);
    delete(postData['sources']);
    showPropzyLoading();
    $(container + " .tableContent").hide();
    $.ajax({
        url: "/ls/report-avg-time-to-live",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<tr><td>" + item.typeName + "</td><td>" + item.avgTime + "</td></tr>";
        }
        $(container + " .tableContent tbody").html(html);
        $(container + " .tableContent").show();
    }).always(function () {
        hidePropzyLoading();
    });
}



function initStatusListing(container) {
    loadStatusListing(container);
    initListingTypes(container);
    $(container + " .tableContent").hide();
    getDistricts(container, 1);
    $(container + " select").on("change", function () {
        loadStatusListing(container);
    });
    $(container + " .fromDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        $(container + " .toDate").focus();
        loadStatusListing(container);
    });
    $(container + " .toDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        loadStatusListing(container);
    });
    initExportButton(container, "/ls/report-status-listing?type=export");
}

function loadStatusListing(container) {
    showPropzyLoading();
    $(container + " .tableContent").hide();
    var postData = getpostData(container);
    delete(postData['sources']);
    $.ajax({
        url: "/ls/report-status-listing",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<tr><td>" + item.nameType + "</td><td><a href='#' onclick=\"return showListing(" + item.source + ", 3);\">" + item.live + "</a></td><td><a href='#' onclick=\"return showListing(" + item.source + ", 2);\">" + item.pending + "</a></td><td><a href='#'  onclick=\"return showListing(" + item.source + ", 5);\">" + item.reject + "</a></td><td><a href='#'  onclick=\"return showListing(" + item.source + ", 7);\">" + item.rented + "</a></td></tr>";
        }
        $(container + " .tableContent tbody").html(html);
        $(container + " .tableContent").show();
    }).always(function () {
        hidePropzyLoading();
    });
}


function initDiyListing(container) {
    loadDiyListing(container);
    initListingTypes(container);
    $(container + " .tableContent").hide();
    getDistricts(container, 1);
    $(container + " select").on("change", function () {
        loadDiyListing(container);
    });
    $(container + " .fromDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        $(container + " .toDate").focus();
        loadDiyListing(container);
    });
    $(container + " .toDate").datepicker({
        autoclose: true,
    }).on("changeDate", function () {
        loadDiyListing(container);
    });
    initExportButton(container, "/ls/report-listing-diy?type=export");
}

function loadDiyListing(container) {
    showPropzyLoading();
    $(container + " .tableContent").hide();
    var postData = getpostData(container);
    delete(postData['sources']);
    $.ajax({
        url: "/ls/report-listing-diy",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        var html = "";
        for (var i = 0; i < response.data.length; i++) {
            var item = response.data[i];
            html += "<tr><td>" + item.typeName + "</td><td>" + item.rsT + "</td><td>" + item.rsDQ + "</td></tr>";
        }
        $(container + " .tableContent tbody").html(html);
        $(container + " .tableContent").show();
    }).always(function () {
        hidePropzyLoading();
    });
}


function getpostData(container) {
    var postData = {
        "districts": $(container).find(".districts").val(),
        "propertyTypes": $(container).find(".propertyTypes").val(),
        "listingTypes": $(container).find(".listingTypes").val(),
        "fromDate": 0,
        "toDate": moment().unix() * 1000,
        "cities": $(container).find(".cities").val(),
        "sources": $(container).find(".source").val()
    };
    if ($(container).find(".toDate").val()) {
        postData.toDate = moment($(container).find(".toDate").val(), "MM/DD/YYYY").unix() * 1000;
    }
    if ($(container).find(".fromDate").val()) {
        postData.fromDate = moment($(container).find(".fromDate").val(), "MM/DD/YYYY").unix() * 1000;
    } else {
        if (postData.toDate) {
            postData.fromDate = 0;
        }
    }
    return postData;
}

function exportExcel(container, link) {
}

function initExportButton(container, link) {
    $(container + " .btn-export").on("click", function () {
        var postData = getpostData(container);
        showPropzyLoading();
        $.ajax({
            url: link,
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                window.location.href = response.data.linkFile;
            } else {
                alert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });
}
var tableListing = null;
function showListing(source, statusId) {
    var postData = getpostData(".section-status-listing");
    postData.source = source;
    postData.statusId = statusId;
    try {
        tableListing.destroy();
    } catch (Ex) {
    }
    tableListing = $('.tableListing').DataTable({
        'searching': false,
        'lengthChange': false,
        'orderCellsTop': true,
        "processing": true,
        "serverSide": true,
        "ajax": "/ls/get-report-listings-by-status?postData=" + JSON.stringify(postData),
        'scrollX': true,
        'ordering': false,
        "columns": [
            {"data": "rlistingId"},
            {"data": "name", orderable: false},
            {"data": "formatPrice", orderable: true},
            {"data": "streetName", orderable: false}
        ]
    });
    return false;
}


$(".btn-export-live-listings").on("click", function (event) {
    event.preventDefault();
    showPropzyLoading();
    $.ajax({
        url: "/ls/export-live-listings",
        type: "get"
    }).done(function (response) {
        if (response.result) {
            window.location.href = response.data.linkFile;
        } else {
            alert(response.message);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});