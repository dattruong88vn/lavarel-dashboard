$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });
    reloadTables();
    $('#whenTime').timepicker({
        showMeridian: false
    });
    $('.whenTime').timepicker({
        showMeridian: false
    });

    $("#btnOpenScheduleForm").on("click", function (event) {
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
        $("#makeScheduleModal .address").val(addressList.join(';\r\n'));
        $("#makeScheduleModal .listings").html(listingIdLinks.join('; '));
        $("#makeScheduleModal .listingIds").val(listingIds.join(';'));
        event.preventDefault();
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
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
        var strListingIds = $("#makeScheduleModal .listingIds").val();
        var arrListingIds = [];
        if (strListingIds) {
            arrListingIds = strListingIds.split(';');
        }
        $("#listing-to-send .select-listing:checked").each(function () {
            var value = $(this).val();
            if (!$(this).prop('disabled') && -1 == $.inArray(value, arrListingIds)) {
                arrListingIds.push($(this).val());
            }
        });
        generateScheduleListingLinks(arrListingIds);
        $("#makeScheduleModal .listingIds").val(arrListingIds.join(';'));
        $("#makeScheduleModal").modal({
            backdrop: 'static',
            keyboard: false
        });
    });
    $(".btnSaveSchedule").on("click", function (event) {
        event.preventDefault();
        var theForm = $("#formMakeSchedule");
        $("#formMakeSchedule .errors").html('');
        var address = theForm.find('.address');
        var isValidated = true;
        if (address.val().trim() === "") {
            address.parent().find('.errors').html('Nhập địa điểm');
            isValidated = false;
        }
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
        $.ajax({
            'url': '/lead/make-schedule',
            'type': 'POST',
            'data': $("#formMakeSchedule").serialize()
        }).done(function (response) {
            if (response.result) {
                $("#makeScheduleModal").modal('hide');
                //generateScheduleTable(5);
                //getEmailListings();
                reloadTables();
            }
            showPropzyAlert(response.message);
        }).always(function () {
            hidePropzyLoading();
        });
    });


    CKEDITOR.replace("emailContent");
    $("#btnOpenEmailForm").on("click", function (event) {
        event.preventDefault();

        var photos = [];
        var photosPreview = "";
        var rListingIds = [];
        $("#datatableListingCart_wrapper table tr .select-listing:checked").each(function () {
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
        // alert('sendemail');return false;
        event.preventDefault();
        var email = $("#formEmail").find("#emailsTo").val();
        if (email.trim() == "") {
            alert("Phải nhập email để gửi.");
            return false;
        } else if (!isEmail(email)) {
            alert("Email không hợp lệ.");
            return false;
        }
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
            url: "/deal/send-email-listing/" + leadId,
            type: 'post',
            data: $("#formEmail").serialize()
        }).done(function (response) {
            // console.log( JSON.stringify(response));return false ;
            showPropzyAlert(response.message);
            if (response.result) {
                window.location = window.location;
            }
        }).always(function () {
            hidePropzyLoading();
        });
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
        "url": '/lead/schedule-detail/' + scheduleId,
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
    reloadTables();
});


var dataTableSentListings = null;
function getSentListingsDataTable() {
    try {
        dataTableSentListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/lead/sent-listings-data/" + leadId;
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
            {"data": "rlistingId", render: renderSelectListing},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: renderListingImage},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize", render: ProductRender.renderSize},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "sentDate", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing}
        ]
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
var renderEmpty = function (data, type, object) {
    return "";
}
var renderListingId = function (data, type, object) {
    data = "<a href='" + object.link + "' class='site-link hidden' >" + data + "</a>";
    data += "<a href='" + object.link + "' target='_blank' >" + object.rlistingId + "</a>";
    return data;
}
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
var renderSelectListing = function (data, type, object) {
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

var renderCreatedByName = function (data, type, object) {
    return object.createdByName + "<br />" + object.createdByPhone;
};
var renderNoteListing = function (data, type, object) {
    returnValue = '<a href="#" class="getLogListing" data-listing-id="' + object.rlistingId + '">Cập nhật</a>';
    return returnValue;
};

$("#btnDeactivateEmailListing").on("click", function (event) {
    event.preventDefault();
    deactivateListing("#dataTableSentListings", function () {
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
        url: '/lead/deactivate-listing',
        type: 'post',
        data: JSON.stringify({
            'listingsList': listingsList,
            'leadId': parseInt(leadId)
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


var dataTableSelectedListings = null;
function getSelectedListingsDataTable() {
    try {
        dataTableSelectedListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/lead/product-listings-data/" + leadId + "?type=scheduled";
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
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize", render: ProductRender.renderSize},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "createdDate", render: dateRender},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "note", width: '20%', render: renderNoteListing}
        ]
    });
    $('#dataTableSelectedListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
        $('.getLogListing').on('click', function (e, value) {
            event.preventDefault();
            var listingID = $(this).attr('data-listing-id');
            getLogListing(listingID);
        });
    });
}

var dataTableFromScheduleListings = null;
function getFromScheduleListingsDataTable() {
    try {
        dataTableFromScheduleListings.destroy();
    } catch (Ex) {
    }
    var dataUrl = "/lead/product-listings-data/" + leadId + "?type=fromSchedule";
    dataTableFromScheduleListings = $('#dataTableFromScheduleListings').DataTable({
        "processing": false,
        "serverSide": false,
        "ajax": dataUrl,
        "scrollX": '500px',
        "lengthChange": false,
        "paging": false,
        "searching": false,
        "ordering": false,
        "columns": [
            //{"data": "rlistingId"},
            {"data": "rlistingId", render: renderListingId},
            {"data": "photo.link", render: renderListingImage},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "rlistingId", render: renderRedbook},
            {"data": "rlistingId", render: renderPinkBook},
            {"data": "formatPrice"},
            {"data": "formatSize", render: ProductRender.renderSize},
            {"data": "rlistingId", render: renderEmpty},
            {"data": "address", width: '30%'},
            {"data": "createdByName", render: renderCreatedByName},
            {"data": "sourceBy"},
            {"data": "districtName"},
            {"data": "directionName"},
            {"data": "createdDate", render: dateRender},
            {"data": "schedulingOrder"},
            {"data": "scheduleTime", render: dateRender},
            {"data": "rlistingId", render: renderSuitableCheck, width: '10%'},
            {"data": "rlistingId", render: renderRejectedReason, width: '10%'},
            {"data": "note", width: '20%', render: renderNoteListing}
        ]
    });
    $('#dataTableFromScheduleListings').on('draw.dt', function () {
        initBookPhotos();
        defineNoteFunction();
        setTimeout(function () {
            $('.ckSuitable').each(function () {
                if ($(this).hasClass('checked')) {
                    //console.log($(this));
                    $(this).prop('checked', true);
                }
            });
        }, 1000);
        $(".ckSuitable").on('click', function (event) {
            var postData = {
                "scheduleId": $(this).attr('data-schedule-id'),
                "suitable": $(this).val()
            };
            showPropzyLoading();
            $.ajax({
                'url': '/lead/set-suitable-schedule',
                'type': 'post',
                'data': JSON.stringify(postData)
            }).done(function (response) {
                showPropzyAlert(response.message);
                reloadTables();
            }).always(function () {
                hidePropzyLoading();
            });
        });

        $(".setRejectedReason").on('click', function (event) {
            event.preventDefault();
            var receiverName = $(this).attr('data-agent-name');
            //var statusId = $(this).attr('data-status-id');
            var scheduleId = $(this).attr('data-schedule-id');
            var statusId = 2;
            $('#change-schedule-status .receiverName').text(receiverName);
            $('#change-schedule-status .statusId').val(statusId);
            $('#change-schedule-status .scheduleId').val(scheduleId);
            $("#change-schedule-status").modal();
        });
        $("#change-schedule-status .btnSave").on("click", function (event) {
            event.preventDefault();
            var reasonId = $("#change-schedule-status .reasonId").val();
            $("#change-schedule-status .reasonId").parent().find('.errors').html("");
            if (reasonId == "") {
                $("#change-schedule-status .reasonId").parent().find('.errors').html("Chọn lý do");
                return false;
            }
            var postData = {
                "statusId": $('#change-schedule-status .statusId').val(),
                "scheduleId": $('#change-schedule-status .scheduleId').val(),
                "reasonId": reasonId
            };
            showPropzyLoading();
            $.ajax({
                'url': '/lead/change-schedule-status',
                'type': 'post',
                'data': JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    reloadTables();
                }
                $("#change-schedule-status").modal('hide');
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        });


        $('.getLogListing').on('click', function (e, value) {
            event.preventDefault();
            var listingID = $(this).attr('data-listing-id');
            getLogListing(listingID);
        });
    });
}

var renderSuitableCheck = function (data, type, object) {
    if (object.agentName == null) {
        return "";
    }
    var checkBoxes = [
        {key: 1, value: 'có'},
        {key: 2, value: 'không'}
    ];
    var returnVal = "";
    checkBoxesCount = checkBoxes.length;
    for (var i = 0; i < checkBoxesCount; i++) {
        var checked = "";
        var key = checkBoxes[i].key;
        if (object.suitable == key) {
            checked = 'checked';
        }
        returnVal += "<label><input type='radio' name='cksuitable" + object.scheduleId + "' id='ckSuitable-" + object.scheduleId + "-" + key + "' class='ckSuitable " + checked + "' value='" + key + "' " + checked + " data-schedule-id = '" + object.scheduleId + "'  /> " + checkBoxes[i].value + "</label><br />";
    }
    return returnVal;
};

var renderRejectedReason = function (data, type, object) {
    var returnValue = "";
    if (object.suitable == 1) {
        if (object.statusId == 1) {
            returnValue = "<a class='setRejectedReason' href='#'  data-schedule-id = '" + object.scheduleId + "' data-status-id = '" + object.statusId + "' data-agent-name = '" + object.agentName + "' >Thông báo</a>";
        } else if (object.statusId == 2) {
            returnValue = object.reasonName;
        } else if (object.statusId == 3) {
            returnValue = "Chấp nhận";
        }
    } else {
        returnValue = "";
    }
    return returnValue;
};

var renderViewingSelectListing = function (data, type, object) {
    var disabled = "";
    var checked = "";
    data = "<input type='checkbox' class='select-listing' value='" + object.rlistingId + "' " + disabled + " " + checked + " />";
    data += "<span class='address hidden'>" + object.address + "</span>";
    return data;
};


$(".btn-change-status").on('click', function (event) {
    event.preventDefault();
    changeListingStatus(this);
});


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
    datatableListingCart = $("#datatableListingCart").DataTable({
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
            {"data": "photo.link", render: renderListingImage},
            {"data": "pinkBookPhotos", render: renderUseRightImages},
            {"data": "formatMinPrice"},
            {"data": "valuationType"},
            {"data": "formatPrice"},
            {"data": "formatSize", render:ProductRender.renderSize},
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
            $('.getLogListing').on('click', function (e, value) {
                event.preventDefault();
                var listingID = $(this).attr('data-listing-id');
                getLogListing(listingID);
            });
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
    });
}


var renderRlistingId = function (data, type, object) {
    var returnValue = "<a target='_blank' href='" + object.link + "' >" + data + "</a>";
    if (object.cartId) {
        returnValue += '<span class="fa fa-minus-circle pull-right btnRed" id="myCart' + object.cartId + '" onclick="deletebListingMyCart(' + object.cartId + ');"></span>';
    }
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
var renderOwner = function (data, type, object) {
    var returnValue = "<div>- " + object.ownerType + "</div>";
    returnValue += "<div>- " + object.ownerName + "</div>";
    returnValue += "<div>- " + object.ownerPhone + "</div>";
    return returnValue;
};


function reloadTables() {
    getListingCartList();
    getSentListingsDataTable();
    getSelectedListingsDataTable();
    getFromScheduleListingsDataTable();
}

function initBookPhotos() {

    $(".pinkBookPhoto").on("click", function (event) {
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
        console.log('clicked');
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
        // console.log($(this).attr('data-value') + ' --- ' + $(this).attr('data-listing-id'));
    });

    $('#btnUpdateNote').on('click', function (event) {
        $.ajax({
            'url': '/listing/note-for-listing',
            'type': 'post',
            'data': $('#formNoteForListing').serialize()
        }).done(function (response) {
            // console.log(response);
            location.reload();
        }).always(function () {
            $("#noteForListing").modal('hide');
        });
    });
}
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



$(".btnAddListingsToCustomerCollection").on("click", function (event) {
    event.preventDefault();
    var dataTableListingId = "#" + $(this).attr("data-from-table");
    var postData = {
        "leadId": parseInt(leadId),
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
            var link = agentSiteUrl + "?accessToken=" + currentUserWebAccessToken + "&basketId=" + response.data.basketId + "&leaId=" + leadId + "&dashboardAction=dashboard-basket-detail";
            console.log(link);
            window.open(link);
        }
    }).always(function () {
        hidePropzyLoading();
    });
});
