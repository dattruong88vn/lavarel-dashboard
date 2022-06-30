
var oldListings = [];
var selectedScheduleRlistingIds = [];
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    CKEDITOR.replace("emailContent");
    //CKEDITOR.replace("contractEmailContent");
    reloadTables();
    $('.whenTime').timepicker({
        showMeridian: false,
        defaultTime: moment().format('HH:mm')
    });
    $('#whenTime').timepicker({
        showMeridian: false,
        defaultTime: moment().format('HH:mm')
    });


    $(".btn-change-status").on('click', function (event) {
        event.preventDefault();
        changeListingStatus(this);
    });


});

function generatePhotosPreview(src, bookType, rlistingId) {
    var returnValue = "<div style='position:relative;display:inline-block'>"
        + "<img style='width:113px;height:64px;margin-right:16px;' src='" + src + "' />"
        + "<a style='position:absolute;top:0px;right:20px;color:#f00;font-weight:bold' class='btnRemovePhoto' href='#'>xóa</a>"
        + "<div>" + bookType + " - " + rlistingId + "</div>"
        + "</div>";

    return returnValue;
}
function generateScheduleListingLinks(arrListing) {
    var listingIdLinks = [];
    $(arrListing).each(function (index, item) {
        var listingId = '<span class="listing-group">'
            + '<a href="/listing/' + item + '" target="_blank" >' + item + '</a>'
            + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item + '\')"></i></a>'
            + '; </span>';
        listingIdLinks.push(listingId);
    });
    $("#makeScheduleModal .listings").html(listingIdLinks.join(''));

}

function deleteScheduleListing(selector, id) {
    var strListingIds = $("#makeScheduleModal .listingIds").val();
    var arrListingIds = strListingIds.split(';');
    var index = arrListingIds.indexOf(id);
    arrListingIds.splice(index, 1);
    $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
    $(selector).parents('span.listing-group').remove();
    $("#listing-to-send .select-listing").each(function () {
        var listingId = $(this).val();
        if (listingId == id) {
            $(this).prop('checked', false);
            $(this).prop('disabled', false);
        }
    });
}



var dataTableSentListings = null;
function getSentListingsDataTable() {
    try {
        dataTableSentListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/sent-email-listings-data/?dealId=" + dealId;
    dataTableSentListings = $('#dataTableSentListings').DataTable({
        "processing": false,
        "serverSide": true,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            {"data": "rlistingId", render: ProductRender.renderSelectListing},
            {"data": "rlistingId", render: ProductRender.renderRlistingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            // {"data": "formatMinPrice"},
            // {"data": "valuationType"},
            {"data": "pinkBookPhotos", render: ProductRender.renderUseRightImages},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "formatPrice"},
            {"data": "formatSize", render: ProductRender.renderSize},
            {"data": "address"},
            {"data": "ownerName", render: ProductRender.renderOwner},
            {"data": "liveDate"},
            {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate},
            {"data": "directionName"},
            {"data": "yearBuilt"},
            {"data": "percentValue"}
        ],
        "order": [[1, "desc"]],
    });
    $('#dataTableSentListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
        $('.getLogListing').on('click', function (e, value) {
            event.preventDefault();
            var listingID = $(this).attr('data-listing-id');
            getLogListing(listingID);
        });
    });
}
var dataTableSelectedListings = null;
function getSelectedListingsDataTable() {
    try {
        dataTableSelectedListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=scheduled";
    dataTableSelectedListings = $('#dataTableSelectedListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderViewingSelectListing},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing}

        ]
    });
    $('#dataTableSelectedListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableFromScheduleListings = null;
function getFromScheduleListingsDataTable() {
    try {
        dataTableFromScheduleListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=fromSchedule";
    dataTableFromScheduleListings = $('#dataTableFromScheduleListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing}
        ]
    });
    $('#dataTableFromScheduleListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}


var dataTableLikedListings = null;
function getLikedListingsDataTable() {
    try {
        dataTableLikedListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=liked";
    dataTableLikedListings = $('#dataTableLikedListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableLikedListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableLegalCheckListings = null;
function getLegalCheckListingsDataTable() {
    try {
        dataTableLegalCheckListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=legalcheck";
    dataTableLegalCheckListings = $('#dataTableLegalCheckListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '25%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableLegalCheckListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableRequestContractListings = null;
function getRequestContractListingsDataTable() {
    try {
        dataTableRequestContractListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=requestcontract";
    dataTableRequestContractListings = $('#dataTableRequestContractListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableRequestContractListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableThinkMoreListings = null;
function getThinkMoreListingsDataTable() {
    try {
        dataTableThinkMoreListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=thinkmore";
    dataTableThinkMoreListings = $('#dataTableThinkMoreListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableThinkMoreListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableUnavalableListings = null;
function getUnavalableListingsDataTable() {
    try {
        dataTableUnavalableListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=unavailable";
    dataTableUnavalableListings = $('#dataTableUnavalableListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "reasonName"},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableUnavalableListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableUnlikeListings = null;
function getUnlikeListingsDataTable() {
    try {
        dataTableUnlikeListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=unlike";
    dataTableUnlikeListings = $('#dataTableUnlikeListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "reasonName"},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderViewingSelectListing}

        ]
    });
    $('#dataTableUnlikeListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var dataTableDepositListings = null;
function getDepositListingsDataTable() {
    try {
        dataTableDepositListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=deposit";
    dataTableDepositListings = $('#dataTableDepositListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": true,
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '25%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing}
        ]
    });
    $('#dataTableDepositListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
    });
}
var renderEmpty = function (data, type, object) {
    return "";
};
var renderListingId = function (data, type, object) {
    data = "<a href='" + object.link + "' class='site-link hidden' >" + data + "</a>";
    data += "<a href='" + object.link + "' target='_blank' >" + object.rlistingId + "</a>";
    return data;
};
var renderRedbook = function (data, type, object) {
    if (null === object.redBookPhotos) {
        return "";
    }
    data = "<img class='redBookPhoto' src='" + object.redBookPhotos[0] + "' style='max-height:32px;' />";
    data += "<input type='hidden' class='redBookPhotos' value='" + JSON.stringify(object.redBookPhotos) + "' />";
    return data;
};
var renderPinkBook = function (data, type, object) {
    if (null === object.pinkBookPhotos) {
        return "";
    }
    data = "<img class='pinkBookPhoto' src='" + object.pinkBookPhotos[0] + "' style='max-height:32px;' />";
    data += "<input type='hidden' class='pinkBookPhotos' value='" + JSON.stringify(object.pinkBookPhotos) + "' />";
    return data;
};
var renderSentSelectListing = function (data, type, object) {
    var disabled = "";
    var checked = "";
    if (object.scheduleTime !== null) {
        disabled = "disabled";
        checked = "checked";
    }
    data = "<input type='checkbox' class='select-listing selected-email-listing' value='" + object.rlistingId + "' " + disabled + " " + checked + " />";
    data += "<span class='address hidden'>" + object.address + "</span>";
    return data;
};
var renderViewingSelectListing = function (data, type, object) {
    var disabled = "";
    var checked = "";
    data = "<input type='checkbox' class='select-listing selected-email-listing' value='" + object.rlistingId + "' " + disabled + " " + checked + " />";
    data += "<span class='address hidden'>" + object.address + "</span>";
    return data;
};
var renderNoteListing = function (data, type, object) {
    // console.log(data);
    // -- Gioi han so ky tu hien thi --
    var returnData = " ";
    if (data != null)
        returnData = wordLimiter(data, 5, '...') + " | ";

    returnData += "<a href='javascript:void(0);' class='noteListing' data-value='" + (data == null ? '' : data) + "' data-listing-id='" + object.rlistingId + "'>Cập nhật</a>";
    return returnData;
};

var renderCreatedByName = function (data, type, object) {
    return object.createdByName + "<br />" + object.createdByPhone;
};

$("#btnDeactivateEmailListing").on("click", function (event) {
    event.preventDefault();
    deactivateListing("#dataTableSentListings", function () {
        reloadTables();
    });
});
$("#btnDeactivateUnavalableListing").on("click", function (event) {
    event.preventDefault();
    deactivateListing("#dataTableUnavalableListings", function () {
        reloadTables();
    });
});
$("#btnDeactivateUnlikeListing").on("click", function (event) {
    event.preventDefault();
    deactivateListing("#dataTableUnlikeListings", function () {
        reloadTables();
    });
});
function deactivateListing(dataTable, successCallback) {
    var listingsList = [];
    $(dataTable + " .select-listing:checked").each(function () {
        if ($(this).prop('disabled')) {
            return;
        }
        var rlistingId = parseInt($(this).val());
        var link = $(this).parents("tr").find("a.site-link").attr("href");
        var listing = {
            rlistingId: rlistingId,
            link: link
        };
        listingsList.push(listing);
    });
    if (listingsList.length <= 0) {
        showPropzyAlert("Chọn listing để deactivate");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: '/deal/deactivate-listing',
        type: 'post',
        data: JSON.stringify({
            'listingsList': listingsList,
            'dealId': parseInt(dealId)
        })
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            successCallback(response);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function changeListingStatus(button) {
    var tableId = $(button).attr('data-table-id');
    var status = $(button).attr('data-status');
    var postItems = [];
    $("#" + tableId + " .select-listing:checked").each(function () {
        var postItem = {
            "dealId": parseInt(dealId),
            "rlistingId": parseInt($(this).val()),
            "statusId": parseInt(status)
        };
        postItems.push(postItem);
    });
    if (postItems.length <= 0) {
        showPropzyAlert('Chọn listing.');
        return false;
    }
    // console.log( JSON.stringify(postItems) );return false;
    showPropzyLoading();
    $.ajax({
        'url': '/deal/change-listings-status',
        'type': 'post',
        'data': JSON.stringify(postItems)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            reloadTables();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

var datatableListingCart = null;
function getListingCartList() {
    try {
        datatableListingCart.destroy();
    } catch (Ex) {
    }
    showPropzyLoading();
    $.fn.dataTableExt.sErrMode = 'throw';
    datatableListingCart = $("#datatableListingCart").on('xhr.dt', function (e, settings, json, xhr) {
        if (json.basketId) {
            var link = agentSiteUrl + "?accessToken=" + currentUserWebAccessToken + "&basketId=" + json.basketId + "&dealId=" + dealId + "&dashboardAction=dashboard-basket-detail";
            $(".btnViewCustomerCollection").attr("href", link);
            $(".btnViewCustomerCollection").show();
        } else {
            $(".btnViewCustomerCollection").hide();
        }
    }).DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "/deal/get-listing-cart-list/?leadId=" + leadId,
        "scrollX": true,
        "paging": false,
        //"ordering": false,
        //"lengthChange": false,
        //"searching": false,
        "columns": [
            {"data": "rlistingId", render: renderViewingSelectListing, width: "50px"},
            {"data": "rlistingId", render: renderRlistingId},
            //{"data": "virtualStatus"},
            {"data": "photo.link", render: ProductRender.renderListingImage},
            {"data": "pinkBookPhotos", render: renderUseRightImages},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "formatPrice"},
            {"data": "formatSize"},
            {"data": "address", width: "80px"},
            {"data": "ownerName", render: renderOwner},
            {"data": "liveDate"},
            {"data": "updatedDate", render: ProductRender.renderListingCountDayFromLastUpdate, width: "60px"},
            {"data": "directionName"},
            {"data": "yearBuilt"},
            {"data": "percentValue"}
        ],
        "order": [[1, "desc"]],
        "initComplete": function (settings, json) {
            hidePropzyLoading();
        },
        "createdRow": function (row, data, index) {
            if (data.isInBasket) {
                $(row).addClass("in-basket");
            }
        }
    });
    $('#datatableListingCart').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
        defineGetLogListing();
    });
}



var renderRlistingId = function (data, type, object) {
    var returnValue = "<a target='_blank' href='" + object.link + "' >" + data + "</a>";
    if (object.cartId) {
        returnValue += '<span class="fa fa-minus-circle pull-right btnRed" id="myCart' + object.cartId + '" onclick="deletebListingMyCart(' + object.cartId + ');"></span>';
    }
    return returnValue;
};


var renderOwner = function (data, type, object) {
    var returnValue = "<div>- " + object.ownerType + "</div>";
    returnValue += "<div>- " + object.ownerName + "</div>";
    returnValue += "<div>- " + object.ownerPhone + "</div>";
    return returnValue;
};

var renderUseRightImages = function (data, type, object) {
    var returnValue = "";
    if (object.redBookPhotos) {
        returnValue = "<img class='redBookPhoto' src='" + object.redBookPhotos[0] + "' style='max-height:32px;' />";
        returnValue += "<input type='hidden' class='redBookPhotos' value='" + JSON.stringify(object.redBookPhotos) + "' />";
    }
    if (object.pinkBookPhotos) {
        returnValue = "<img class='redBookPhoto' src='" + object.pinkBookPhotos[0] + "' style='max-height:32px;' />";
        returnValue += "<input type='hidden' class='redBookPhotos' value='" + JSON.stringify(object.pinkBookPhotos) + "' />";
    }
    return returnValue;
};

function reloadTables() {
    CustomerCart.showCart(dealId);
    VisitedListings.showTable(dealId);
    MyCart.getListingCart();
    getSentListingsDataTable();

    /*
    getLikedListingsDataTable();
    getSelectedListingsDataTable();
    getFromScheduleListingsDataTable();
    getLegalCheckListingsDataTable();
    getRequestContractListingsDataTable();
    getDepositListingsDataTable();
    getThinkMoreListingsDataTable();
    getUnavalableListingsDataTable();
    getUnlikeListingsDataTable();
    */
}


function formatTime(value) {
    value = parseInt(value + "");
    var returnValue = "";
    var hour = 0;
    var minute = 0;
    if (value > 60) {
        hour = Math.floor(value / 60);
    }
    minute = value - hour * 60;
    if (hour > 0) {
        returnValue = hour + " tiếng ";
    }
    returnValue += minute + " phút";
    return returnValue;
}


var renderDistance = function (data, type, object) {
    if (data == null) {
        return "";
    }
    var returnValue = "<input class='estimatedDistance-" + object.rlistingId + "' type='hidden' value='" + data + "' />" + data;
    return returnValue;
};
var renderDuration = function (data, type, object) {
    if (!data) {
        return "";
    }
    var returnValue = "<input class='estimatedTime-" + object.rlistingId + "' type='hidden' value='" + data + "' />" + Math.ceil(data / 60);
    return returnValue;
};
var renderListingNote = function (data, type, object) {
    for (var i = 0; i < oldListings.length; i++) {
        var item = oldListings[i];
        if (item.rlistingId == object.rlistingId) {
            object.note = item.note;
            break;
        }
    }
    if (!object.note) {
        object.note = "";
    }
    return "<input type='text' class='listingNote listingNote-" + object.rlistingId + "' data-rlistingId='" + object.rlistingId + "' value='" + object.note + "' />";
};

function deletebListingMyCart(cartId) {
    $("#deleteFormListingMyCart").modal();
    $("#noteMyListingCartId").val(cartId);
}
$('#btnDoDeleteListingMyCart').on('click', function (event) {
    var cartID = $("#noteMyListingCartId").val();
    if ($("#noteDeleteListingMyCart").val().trim() != '') {
        $.ajax({
            'url': '/lead/remove-listing-cart',
            'type': 'post',
            'data': $('#formListingMyCart').serialize()
        }).done(function (response) {
            if (response.result) {
                $("#myCart" + cartID).closest('tr').remove();
                $("#noteDeleteListingMyCart").val('');
                $("#deleteFormListingMyCart").modal('hide');
                showPropzyAlert(response.message);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            $("#deleteFormListingMyCart").modal('hide');
        });
    } else {
        showPropzyAlert("Cần điền nội dung");
    }


});
function noteMyCart(id) {
    $("#FormNoteMyCart").modal();
}
$('#btnDoNoteListingMyCart').on('click', function (event) {
    if ($("#noteListingMyCart").val().trim() != '') {
        $("#noteListingMyCart").val('');
        $("#FormNoteMyCart").modal('hide');
    } else {
        showPropzyAlert("Cần điền nội dung");
    }
});




$(".btnOpenEmailForm").on("click", function (event) {
    event.preventDefault();

    var photos = [];
    var photosPreview = "";
    var rListingIds = [];
    var fromTable = $(this).attr("data-from-table");
    $(fromTable + " .selected-email-listing:checked").each(function () {
        var rListingId = $(this).val();
        if (rListingId) {
            rListingIds.push(rListingId);
        }
        var redBookPhotos = $(this).parents('.item.listing').find(".redBookPhotos").val();
        if (redBookPhotos) {
            redBookPhotos = JSON.parse(redBookPhotos);
            $(redBookPhotos).each(function (index, item) {
                photos.push(item);
                photosPreview += generatePhotosPreview(item, "Sổ đỏ", rListingId);
            });
        }
        var pinkBookPhotos = $(this).parents('.item.listing').find(".pinkBookPhotos").val();
        if (pinkBookPhotos) {
            pinkBookPhotos = JSON.parse(pinkBookPhotos);
            $(pinkBookPhotos).each(function (index, item) {
                photos.push(item);
                photosPreview += generatePhotosPreview(item, "Sổ hồng", rListingId);
            });
        }

    });

    if (rListingIds.length <= 0) {
        showPropzyAlert('Không có listing để gửi');
        return false;
    } else if (rListingIds.length > 3) {
        showPropzyAlert('Chỉ được chọn tối đa 3 listing');
        return false;
    }

    showPropzyLoading();
    $("#emailToCustomer #isGoodsAvailable").val('1');
    $("#emailToCustomer #rlistingIds").val(rListingIds + "");
    $.ajax({
        url: "/lead/get-customer-email-template/" + leadId + "?rlistingIds=" + rListingIds,
        type: "get"
    }).done(function (response) {
        $("#emailContent").val(response);
        CKEDITOR.instances['emailContent'].setData(response);
        $(".photos-preview").html(photosPreview);
        $(".btnRemovePhoto").on("click", function (event) {
            event.preventDefault();
            $(this).parent().remove();
        });
        var content = $(response);
        var propertyType = content.find(".propertyType").html();
        $("#photos").val(photos);
        $("#emailsTo").val($("#customerEmail").val());
        //$("#emailSubject").val("Nhà phù hợp với nhu cầu của "+$("#customerName").val());
        $("#emailSubject").val("Propzy chia sẻ Bộ sưu tập " + propertyType + " phù hợp nhu cầu");
        $("#emailToCustomer").modal();
    }).always(function () {
        hidePropzyLoading();
    });
});



$("#btnSendMail").on("click", function (event) {
    event.preventDefault();
    for (var instanceName in CKEDITOR.instances) {
        CKEDITOR.instances[instanceName].updateElement();
    }
    var photos = [];
    $(".photos-preview img").each(function () {
        photos.push($(this).attr('src'));
    });
    $("#photos").val(photos);
    showPropzyLoading();
    $.ajax({
        url: "/deal/send-email-listing/" + dealId,
        type: 'post',
        data: $("#formEmail").serialize()
    }).done(function (response) {
        $("#emailToCustomer").modal('hide');
        if (response.result) {
            window.location.reload();
        }
        showPropzyAlert(response.message);
    }).always(function () {
        hidePropzyLoading();
    });
});

$(".btnAddListingsToCustomerCart").on("click", function (event) {
    event.preventDefault();
    var dataTableListingId = "#" + $(this).attr("data-from-table");
    var postData = {
        "leadId": (typeof lead) != "undefined" ? parseInt(lead.leadId) : null,
        "dealId": (typeof deal) != "undefined" ? parseInt(deal.dealId) : null,
        "listingIds": []
    };
    $(dataTableListingId + " .select-listing:checked").each(function () {
        postData.listingIds.push(parseInt($(this).val()));
    });
    showPropzyLoading();
    $.ajax({
        url: "/deal/add-listings-to-customer-cart",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            $(dataTableListingId + " .select-listing").prop("checked", false);
            reloadTables();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});



$(".btnAddListingsToCustomerCollection").on("click", function (event) {
    event.preventDefault();
    var dataTableListingId = "#" + $(this).attr("data-from-table");
    var postData = {
        "leadId": null,
        "dealId": (typeof deal) != "undefined" ? parseInt(deal.dealId) : null,
        "description": null,
        "relatedListings": []
    };
    $(dataTableListingId + " .select-listing:checked").each(function () {
        postData.relatedListings.push(parseInt($(this).val()));
    });
    if (postData.relatedListings.length <= 0) {
        showPropzyAlert("Chọn listing để thêm vào BST.");
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: "/crm-dashboard/create-collection",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            $(dataTableListingId + " .select-listing").prop("checked", false);
            reloadTables();
            var link = agentSiteUrl + "?accessToken=" + currentUserWebAccessToken + "&basketId=" + response.data.basketId + "&dealId=" + deal.dealId + "&dashboardAction=dashboard-basket-detail";
            window.open(link);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});