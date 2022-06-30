$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    reloadTables();
    $('.whenTime').timepicker({
        showMeridian: false
    });
    var scheduleListingsDataTable = null;
    $(".tableAgents_wrapper").hide();
    $(".txtSearchAssignTo").on("keyup", function () {
        var value = $(this).val();
        var whenTime = $("#whenTime").val();
        //var whenTime = "";
        var whenDate = $("#whenDate").val();
        var scheduleTime = moment(whenTime + " " + whenDate, "HH:mm MM/DD/YYYY").unix() * 1000;
        $.ajax({
            url: "/agent/schedule-suggest?scheduleTime=" + scheduleTime + "&keySearch=" + value,
            type: "get"
        }).done(function (response) {
            var html = "";
            if (response.result) {
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<tr onclick=\"agentSelected('" + item.socialUid + "' , '" + item.name + "')\">";
                    html += "<td>" + item.name + "</td>";
                    html += "<td>" + item.phone + "</td>";
                    html += "<td>" + renderAgentStatus(item) + "</td>";
                    html += "</tr>";
                }
                $(".tableAgents_wrapper").show();
            } else {

                $(".tableAgents_wrapper").hide();
            }
            $(".tableAgents tbody").html(html);
        }).always(function () {

        });
    });
    function renderAgentStatus(object) {
        if (object.startTime === null || object.endTime === null) {
            return "Rãnh";
        } else {
            var startTime = moment(object.startTime / 1000).format("HH:mm");
            var endTime = moment(object.endTime / 1000).format("HH:mm");
            return "Bận từ " + startTime + " đến " + endTime;
        }
    }
    function loadScheduleListingsDataTable(listingIds) {

        if (listingIds.length <= 0) {
            return;
        }
        showPropzyLoading();
        $.ajax({
            url: "/listing/find-by-ids?rlistingIds=" + listingIds + "&dealId=" + dealId,
            type: "get"
        }).done(function (response) {
            try {
                scheduleListingsDataTable.destroy();
            } catch (Ex) {
            }
            //$("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
            $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
            scheduleListingsDataTable = $("#makeScheduleModal .scheduleListings").DataTable({
                "paging": false,
                lengthChange: false,
                searching: false,
                "data": response.data,
                columns: [
                    {data: "rlistingId", orderable: false},
                    {data: "address", orderable: false},
                    {data: "address", orderable: false},
                    {data: "createdByPhone", orderable: false},
                    {data: "rlistingId", render: renderVisitTime, orderable: false},
                    {data: "rlistingId"},
                    {data: "rlistingId", render: renderListingNote, orderable: false}
                ]
            });

            $("#makeScheduleModal").modal({
                backdrop: 'static',
                keyboard: false
            });
            $("#makeScheduleModal").on('shown.bs.modal', function (e) {
                setTimeout(function () {
                    $(".visitTime").timepicker({
                        showMeridian: false
                    });
                }, 500);
            });
        }).always(function () {
            hidePropzyLoading();
        });
    }

    var renderVisitTime = function (data, type, object) {
        var returnVal = "<div class='input-group bootstrap-timepicker timepicker'>";
        returnVal += "<input type='text' class='visitTime visitTime-" + object.rlistingId + "' data-rlistingId='" + object.rlistingId + "' />";
        returnVal += "</div>";
        return returnVal;
    };
    var renderListingNote = function (data, type, object) {
        return "<input type='text' class='listingNote-" + object.rlistingId + "' data-rlistingId='" + object.rlistingId + "' />";
    };
    $("#btnOpenScheduleForm").on("click", function (event) {
        event.preventDefault();
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#dataTableSentListings .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = '<a href="/listing/' + $(this).val() + '" target="_blank" >' + $(this).val() + '</a>';
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('tr').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn listing để đặt lịch');
            return;
        }
        loadScheduleListingsDataTable(listingIds);
        //$("#makeScheduleModal .address").val(addressList.join(';\r\n'));
    });
    $("#btnOpenBriefFormScheduleForm").on("click", function (event) {
        isEditingSchedule = false;
        var addressList = [];
        var listingIdLinks = [];
        var listingIds = [];
        $("#listing-to-send .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var listingId = '<a href="/listing/' + $(this).val() + '" target="_blank" >' + $(this).val() + '</a>';
            listingIdLinks.push(listingId);
            listingIds.push($(this).val());
            var address = $(this).parents('tr').find('span.address').text();
            addressList.push(address);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert('Chọn listing để đặt lịch');
            return;
        }
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
        event.preventDefault();
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $("#btnContinueScheduleForm").on('click', function (event) {
        event.preventDefault();
        $(this).hide();
        $('#btnOpenScheduleForm').show();
        var arrListingIds = [];
        $("#dataTableSentListings .select-listing:checked").each(function () {
            if ($(this).prop("disabled")) {
                return;
            }
            var value = $(this).val();
            arrListingIds.push(value);
        });
        generateScheduleListingLinks(arrListingIds);
        $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
        loadScheduleListingsDataTable(arrListingIds);
    });


    $(".btnSaveSchedule").on("click", function (event) {
        event.preventDefault();
        var theForm = $("#formMakeSchedule");
        $("#formMakeSchedule .errors").html('');
        var isValidated = true;
        var date = theForm.find('#whenDate');
        if (date.val().trim() === "") {
            date.parent().parent().find('.errors').html('Chọn ngày');
            isValidated = false;
        }
        var time = theForm.find('#whenTime');
        if (time.val().trim() === "") {
            time.parent().parent().find('.errors').html('Chọn giờ');
            isValidated = false;
        }
        var theDate = moment(date.val() + " " + time.val(), 'MM/DD/YYYY HH:mm');
        var now = moment();
        if (theDate.isBefore(now)) {
            date.parent().parent().find('.errors').html('Ngày phải lớn hơn thời điểm hiện tại');
            isValidated = false;
        }
        if (!isValidated) {
            return false;
        }
        showPropzyLoading();
        var scheduleTime = moment(time + " " + date, "HH:mm MM/DD/YYYY").unix() * 1000;
        var postData = {
            "dealId": $("#formMakeSchedule").find("#dealId").val(),
            "customerId": $("#formMakeSchedule").find("#customerId").val(),
            "socialUid": $("#formMakeSchedule").find("#socialUid").val(),
            "note": $("#formMakeSchedule").find(".note").val(),
            "scheduleTime": scheduleTime, // min time cua listing
            "listingsList": []
        };
        var listingIds = theForm.find(".listingIds").val().split(';');
        for (var i = 0; i < listingIds.length; i++) {
            var rlistingId = listingIds[i];
            var listingNote = theForm.find(".listingNote-" + rlistingId).val();
            var listingTime = theForm.find(".visitTime-" + rlistingId).val();
            var listingScheduleTime = moment(listingTime + " " + date, "HH:mm MM/DD/YYYY").unix() * 1000;
            listing = {
                "id": {
                    "rlistingId": rlistingId
                },
                "scheduleTime": listingScheduleTime,
                "note": listingNote
            };
            postData.listingsList.push(listing);
        }
        $.ajax({
            'url': '/deal/make-schedule',
            'type': 'POST',
            'data': JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                $("#makeScheduleModal").modal('hide');
                //generateScheduleTable(5);
                //getEmailListings();
                getSentListingsDataTable();
                reloadTables();
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
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
var isEditingSchedule = false;
function editSchedule(scheduleId) {
    showPropzyLoading();
    $.ajax({
        "url": '/deal/schedule-detail/' + scheduleId,
        'type': 'get'
    }).done(function (response) {
        if (response.result) {
            isEditingSchedule = true;
            var addressList = [];
            var listingIdLinks = [];
            var listingIds = [];
            $(response.data.listingsList).each(function (index, item) {
                if ($(this).prop("disabled")) {
                    return;
                }
                var listingId = '<span class="listing-group">'
                        + '<a href="/listing/' + item.id.rlistingId + '" target="_blank" >' + item.id.rlistingId + '</a>'
                        + '<a href="#" class="text-red"><i class="glyphicon glyphicon-remove" onclick="return deleteScheduleListing(this, \'' + item.id.rlistingId + '\')"></i></a>'
                        + '; </span>';
                listingIdLinks.push(listingId);
                listingIds.push(item.id.rlistingId);
                //var address = $(this).parents('tr').find('span.address').text();
                //addressList.push(address);
            });

            $("#makeScheduleModal #scheduleId").val(response.data.scheduleId);
            $("#makeScheduleModal .address").val(response.data.address);
            $("#makeScheduleModal #whenDate").val(moment(response.data.scheduleTime).format('MM/DD/YYYY'));
            $("#makeScheduleModal #whenTime").val(moment(response.data.scheduleTime).format('HH:mm'));
            $("#makeScheduleModal .note").val(response.data.note);
            $("#makeScheduleModal .listings").html(listingIdLinks.join(''));
            $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
            event.preventDefault();
            $("#makeScheduleModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }
    }).always(function () {
        hidePropzyLoading();
    });
    return false;
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

$("#makeScheduleModal .btnAddlisting").on("click", function () {
    $("#makeScheduleModal").modal('hide');
    $("#btnContinueScheduleForm").show();
    $("#btnOpenScheduleForm").hide();
});

$(".btnCancelSchedule").on('click', function (event) {
    event.preventDefault();
    $("#makeScheduleModal").modal('hide');
    isEditingSchedule = false;
    getEmailListings();
});


var dataTableSentListings = null;
function getSentListingsDataTable() {
    try {
        dataTableSentListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/deal/product-listings-data/" + dealId + "?type=sentmail";
    dataTableSentListings = $('#dataTableSentListings').DataTable({
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "sentDate", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing},
            {"data": "rlistingId", render: renderSentSelectListing}
        ]
    });
    $('#dataTableSentListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
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
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
            {"data": "photo.link", render: renderListingImage},
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
var renderListingImage = function (data, type, object) {
    if (null === data) {
        return;
    }
    data = "<img src='" + data + "' style='max-height:32px;' />";
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
    data = "<input type='checkbox' class='select-listing' value='" + object.rlistingId + "' " + disabled + " " + checked + " />";
    data += "<span class='address hidden'>" + object.address + "</span>";
    return data;
};
var renderViewingSelectListing = function (data, type, object) {
    var disabled = "";
    var checked = "";
    data = "<input type='checkbox' class='select-listing' value='" + object.rlistingId + "' " + disabled + " " + checked + " />";
    data += "<span class='address hidden'>" + object.address + "</span>";
    return data;
};
var renderNoteListing = function (data, type, object) {
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
            "dealId": dealId,
            "rlistingId": $(this).val(),
            "statusId": status
        };
        postItems.push(postItem);
    });
    if (postItems.length <= 0) {
        showPropzyAlert('Chọn listing.');
        return false;
    }
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

function reloadTables() {
    getLikedListingsDataTable();
    getSelectedListingsDataTable();
    getFromScheduleListingsDataTable();
    getSentListingsDataTable();
    getLegalCheckListingsDataTable();
    getRequestContractListingsDataTable();
    getDepositListingsDataTable();
    getThinkMoreListingsDataTable();
    getUnavalableListingsDataTable();
    getUnlikeListingsDataTable();
}


function initBookPhotos() {

    $(".pinkBookPhoto").on("click", function (event) {
        alert('o day ne');
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find("input.pinkBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });

    $(".redBookPhoto").on("click", function (event) {
        event.preventDefault();
        var photos = JSON.parse($(this).parents("tr").find("input.redBookPhotos").val());
        if (photos) {
            var html = "";
            for (var x in photos) {
                html += "<div class='item' style='text-align:center'><img src='" + photos[x] + "' /></div>";
            }
            initSlideModal(html);
        }
    });
}

function initSlideModal(html) {
    try {
        $("#owl-carousel").data('owlCarousel').destroy();
    } catch (ex) {
    }
    $("#owl-carousel").html(html);
    $("#owl-carousel").owlCarousel({
        singleItem: true,
        navigation: true,
        navigationText: ['trước', 'sau']
    });
    $("#image-slider").modal();
}

function defineNoteFunction() {
    $('.noteListing').on('click', function (event) {
        event.preventDefault();
        $("#noteListingId").val($(this).attr('data-listing-id'));
        $("#noteContent").val($(this).attr('data-value'));
        $("#noteForListing").modal('show');
    });

    $('#btnUpdateNote').on('click', function (event) {
        $.ajax({
            'url': '/listing/note-for-listing',
            'type': 'post',
            'data': $('#formNoteForListing').serialize()
        }).done(function (response) {
            location.reload();
        }).always(function () {
            $("#noteForListing").modal('hide');
        });
    });
}
