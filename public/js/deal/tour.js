var modalReassign = $("#modalReassign");
var modalCancelTour = $("#modalCancelTour");
var assignSelect = modalReassign.find('.assignee-select');
var stopPostingMessage = 'Listing đã ngưng đăng tin';

function agentSelected(socialUid, name) {
    modalReassign.find(".socialUid").val(socialUid);
    $(".txtSearchAssignTo").val(name);
    $(".tableAgents_wrapper").hide();
}
$(".btnCloseAgentSuggest").on("click", function () {
    $(".tableAgents_wrapper").hide();
    $(".txtSearchAssignTo").val("");
    modalReassign.find(".socialUid").val("");
});

function renderAgentStatus(object) {
    if (object.startTime === null || object.endTime === null) {
        return "Rảnh";
    } else {
        var startTime = moment(object.startTime).format("HH:mm");
        var endTime = moment(object.endTime).format("HH:mm");
        return "Bận từ " + startTime + " đến " + endTime;
    }
}
var scheduleTime = null;
var estimatedTime = null;
var estimatedDate = null;

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('#csrf-token').val()
        }
    });

    var listAssignUser = [];
    var isLoadListUser = false;

    var getListAssignUser = (callBack) => {
        Promise.all([
            $.ajax({
                url: "/deal/get-assign-user-list",
                type: "get",
            })
        ]).then(res => {
            const listUserRes = res[0];
            if (listUserRes && listUserRes.result) {
                isLoadListUser = true;
                listAssignUser = listUserRes.data.map((item) => {
                    return {
                        id: item.userId,
                        text: item.name,
                        socialUid: item.socialUid,
                    }
                }).filter(Boolean);
                callBack && callBack();
            }
        })
    }
    

    $(".tableAgents_wrapper").hide();

    $(".btn-save-reassign").on("click", function (event) {
        event.preventDefault();
        $(".errors").html("");

        var selectedUser = assignSelect.hasClass("select2-hidden-accessible") ? assignSelect.select2("data") : [];
        var selectedUserId = selectedUser.length > 0 ? selectedUser[0].id : '';
        var postData = {
            "assignedTo": selectedUserId,
            "scheduleId": modalReassign.find(".scheduleId").val(),
            "note": modalReassign.find(".note").val()
        }

        var isValid = true;
        if (postData.assignedTo.trim() == "") {
            modalReassign.find(".assignee-select").parent().find(".errors").html("Chọn nhân viên dẫn tour");
            isValid = false;
        }
        if (!postData.note || postData.note.trim() == "") {
            modalReassign.find(".note").parent().find(".errors").html("Nhập ghi chú");
            isValid = false;
        }
        if (isValid) {
            assignSchedule(postData);
        }
    });
    $(".btn-cancel-schedule").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        modalCancelTour.find(".errors").html("");
        showPropzyLoading();
        $.ajax({
            url: "/tour/get-reasons?type=3",
            type: "get"
        }).done(function (response) {
            console.log(response);
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                var item = response.data[i];
                if(item.control != 'input_hidden'){
                    if(item.control == 'input_text_if_checked'){
                        html += "<div><label style='display:block'><input type='checkbox' name='select-reason' class='reason' value='" + item.reasonId + "' /> " + item.reasonName + "<div><textarea placeholder='Vui lòng nhập lý do tại đây ...' class='form-control'></textarea></div></label></div>";
                    }else{
                        html += "<div><label style='display:block'><input type='checkbox' name='select-reason' class='reason' value='" + item.reasonId + "' /> " + item.reasonName + "</label></div>";
                    }
                }
            }
            modalCancelTour.find(".reasons").html(html);
            modalCancelTour.find(".type").val("tour");
            modalCancelTour.find(".schedule-id").val(scheduleId);
            modalCancelTour.find(".listing-id").val("");
            modalCancelTour.find('.modal-title').text('Lý do hủy tour');
            modalCancelTour.modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });
    modalCancelTour.find(".btn-save").on("click", function (event) {
        event.preventDefault();
        var scheduleId = modalCancelTour.find(".schedule-id").val();
        var type = modalCancelTour.find(".type").val();
        modalCancelTour.find(".errors").html("");
        var postData = {
            "scheduleId": parseInt(scheduleId),
            "reasonsList": []
        };
        var checkEmpty = false;
        $(modalCancelTour.find(".reason:checked")).each(function () { 
               var reasonContent = $(this).siblings('div').children('textarea').val();
               var obj = {
                 "reasonId" : parseInt($(this).val()),
                 "reasonContent": reasonContent
               }
               if(reasonContent == ''){
                    $(this).siblings('div').children('textarea').css({'border':'1px solid red'});
                    checkEmpty = true ;return false;
               }
               postData.reasonsList.push(obj);
        });
        if(checkEmpty){
            modalCancelTour.find(".errors").html("Vui lòng nhập lý do");
            return false;
        }
        // console.log(JSON.stringify(postData)) ;return false;


        if (postData.reasonsList.length <= 0) {
            modalCancelTour.find(".errors").html("Chọn lý do");
            return false;
        }
        if (type == "tour") {
            cancelSchedule(postData);
        } else {
            postData.rlistingId = parseInt(modalCancelTour.find(".listing-id").val());
            showPropzyLoading();
            $.ajax({
                url: "/tour/dismiss-listing",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                showPropzyAlert(response.message);
                if (response.result) {
                    window.location.reload();
                }
            }).always(function () {
                hidePropzyLoading();
            });
        }
    });

    $(".btn-save-schedule").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        var schedulePanel = $('#schedule' + scheduleId);
        var reasonId = schedulePanel.find('[data-reason-change-id]').data('reason-change-id');
        var scheduleDate = $(".schedule-date-" + scheduleId).val();

        var listEnableListing = getListingsFromTable(
          scheduleId,
          scheduleDate,
          false
        );

        if (listEnableListing.length === 0) {
            showPropzyAlert("Không thể cập nhật do tất cả listing đều đã bị bỏ qua");
            return false;
        }

        var postData = {
            "scheduleTime":schedulePanel.find('[data-schedule-time]').data('schedule-time'),
            "estimatedTime": schedulePanel.find('[data-estimate-time]').data('estimate-time'),
            "estimatedDate": schedulePanel.find('[data-estimate-date]').data('estimate-date'),
            "estimatedDistance": schedulePanel.find('[data-estimate-distance]').data('estimate-distance'),
            "scheduleId": scheduleId,
            "note": schedulePanel.find('.tour-note').val(),
            "csSchListings": getListingsFromTable(scheduleId, scheduleDate, true)
        };

        if(reasonId) {
            postData.typeId = reasonId;
        }        

        updateSchedule(postData);
    });
    $(".listing-schedule-time").timepicker({
        showMeridian: false
    });
    initListingRow();
    $(".btn-view-feedback").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        showPropzyLoading();
        $.ajax({
            url: "/deal/schedule-feedback/" + scheduleId,
            type: "get"
        }).done(function (response) {
            if (response.result) {
                var html = "<ul class='feedback-content' >";
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    html += "<li>";
                    html += "<div>" + item.questionName + "</div>";
                    if(item.control != 'free_text'){
                        html += "<div class='starRenderPropzy' poin='"+item.answer+"'>Kết quả: " + item.answer + "</div>";
                    }else{
                        html += "<div>Kết quả: " + item.answer + "</div>";
                    }
                    
                    if (item.reasonName) {
                        html += "<div>" + item.reasonName + "</div>";
                    }
                    html += "</li>";
                }
                html += "</ul>";
                $("#modalFeedBack").find(".modal-body").html(html);
                renderStar();
                $("#modalFeedBack").modal();
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    $(".btn-show-add-listing-modal").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        $("#modalAddListings .scheduleId").val(scheduleId);
        
        // get ids of exist listings
        let listingIds = [];
        $(`.schedule.schedule-${scheduleId}`)
          .find(".table-listing > tbody > tr")
          .each(function (e) {
            listingIds.push($(this).data("rlisting-id"));
          });

        CustomerCart.showCart(dealId, listingIds);
        $("#modalAddListings").modal();
    });
    $(".btn-show-reassign").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $(this).attr("data-schedule-id");
        scheduleTime = $(this).attr("data-schedule-time");
        estimatedTime = $(".estimatedTime-" + scheduleId).val();
        estimatedDate = $(".estimatedDate-" + scheduleId).val();
        var modal = $("#modalReassign");
        modal.find('.errors').html('');
        modal.find('.note').val('');
        modal.find(".scheduleId").val(scheduleId);
        modal.find('.assignee-select').val('').trigger('change');
        modal.modal();

        var curAssignId = $('#schedule' + scheduleId).find('[data-assigned-to]').data('assigned-to');

        if(assignSelect.hasClass("select2-hidden-accessible")) {
            assignSelect.select2('destroy');
        }

        if(!isLoadListUser) {
            getListAssignUser(function() {
                assignSelect.html('<option value="">-- Chọn --</option>');
                assignSelect.select2({
                    data: listAssignUser.filter(item => item.id != curAssignId),
                    multiple: false,
                    width: "resolve",
                });
            });
        } else {
            assignSelect.select2({
                data: listAssignUser.filter(item => item.id != curAssignId),
                multiple: false,
                width: "resolve",
            });
        }

        
    });
    initRemoveListingButton();
    $("#btnContinueScheduleForm").on("click", function (event) {
        event.preventDefault();
        var scheduleId = $("#modalAddListings .schedule-id").val();
        var rlistingIds = [];
        $(".schedule-" + scheduleId + " tbody>tr").each(function () {
            var rlistingId = $(this).attr("data-rlisting-id");
            if (rlistingId != undefined) {
                rlistingIds.push(rlistingId);
            }
        });
        $("#dataTableSentListings .select-listing:checked").each(function () {
            var rlistingId = $(this).val();
            if ($.inArray(rlistingId, rlistingIds) < 0) {
                rlistingIds.push(rlistingId);
            }
        });
        console.log(rlistingIds);
        if (rlistingIds.length <= 0) {
            $("#modalAddListings").modal("hide");
            return false;
        }
        var scheduleDate = $(".schedule-date-" + scheduleId).val();
        getScheduleListingsRow(scheduleId, rlistingIds, scheduleDate);
    });


    $(".table-schedule").each(function () {
        var scheduleId = $(this).attr("data-schedule-id");
        var disabledEdit = $(this).hasClass("table-schedule-past") || $(this).hasClass("table-schedule-canceled"); //table-schedule-canceled
        $(this).dataTable({
            "processing": false,
            "serverSide": false,
            "ajax": "/tour/get-support-requests/" + scheduleId,
            "lengthChange": false,
            "paging": true,
            "searching": false,
            "ordering": false,
            "columns": [
                {data: "createdDate", render: shortDateRender},
                {data: "reasonName", width: "20%"},
                {data: "address", width: "20%"},
                {data: "id", render: function (data, type, object) {
                        var returnValue = "<textarea " + (disabledEdit ? "disabled" : "") + " class='form-control note' style='width:100%' onblur=\"return saveScheduleNotifyNote(this, " + object.id + ")\">" + (object.note ? object.note : "") + "</textarea>";
                        returnValue += "<div class='text-red errors'>" + (supportId && supportId == object.id && !object.note ? "Nhập hướng giải quyết" : "") + "</div>";
                        return returnValue;
                    }
                },
                {data: "id", render: function (data, type, object) {
                        var returnValue = "<div class='text-center'><input " + (disabledEdit ? "disabled" : "") + " type='checkbox' value='" + object.id + "' " + (object.statusId == 3 ? "checked" : "") + "  onchange=\"return doneScheduleNotify(this, " + object.id + ", " + object.dealId + ", 3, null)\" /></div>";
                        return returnValue;
                    }, width: "60px"
                }
            ]
        });
    });

    initRequestChangeTimeButtons();    

    bindChangeNote($('.listing-note'));
    bindChangeSchedulDate($('.listing-schedule-time'));
});

function bindChangeNote (ele) {
    ele.on('change', function(e) {
        var self = $(this);
        var rlistingId = self.data('rlisting-id');
        var listingValEl = self.closest('.schedule-box').find(`.listing-item-${rlistingId}`);
        var oldJson = JSON.parse(listingValEl.val());
        
        oldJson.note = e.target.value;
        $(`.listing-item-${rlistingId}`).val(JSON.stringify(oldJson));
    })
}

function bindChangeSchedulDate (ele) {
    ele.on('change', function(e) {
        var self = $(this);
        var rlistingId = self.data('rlisting-id');
        var listingValEl = self.closest('.schedule-box').find(`.listing-item-${rlistingId}`);
        var oldJson = JSON.parse(listingValEl.val());
        var curDate = $(`.lbScheduleTime-${rlistingId}`).html();
        
        oldJson.scheduleTime = moment(e.target.value + " " + curDate, "HH:mm DD/MM/YYYY").unix() * 1000;
        $(`.listing-item-${rlistingId}`).val(JSON.stringify(oldJson));
    })
}

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
            {"data": "rlistingId", render: renderSentSelectListing},
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
            {"data": "note", width: '20%'}
        ]
    });
    $('#dataTableSentListings').on('draw.dt', function () {
        //initBookPhotos();
        //defineNoteFunction();
    });
}

var renderEmpty = function (data, type, object) {
    return "";
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


var renderCreatedByName = function (data, type, object) {
    return object.createdByName + "<br />" + object.createdByPhone;
};

function updateSchedule(postData, callback) {
    showPropzyLoading();
    $.ajax({
        url: "/deal/update-schedule",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
        if (callback) {
            callback(response);
        }
    }).fail(function () {
        showPropzyAlert();
    }).always(function () {
        hidePropzyLoading();
    });
}

function assignSchedule(postData, callback) {
    showPropzyLoading();
    $.ajax({
        url: "/deal/assign-tour",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
        if (callback) {
            callback(response);
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function getScheduleListingsRow(scheduleId, rlistingIds, scheduleDate, callback) {
    //var scheduleDate = $(".schedule-date-" + scheduleId).val();
    var schedulePanel = $(".schedule-" + scheduleId);
    var scheduleDateFull = $(".schedule-date-full-" + scheduleId).val();
    var scheduleMoment = moment(parseInt(scheduleDateFull));
    var hasUpdatePermission = Boolean($('.permission-update-' + scheduleId).val());
    showPropzyLoading();
    $.ajax({
        url: "/listing/find?rlistingIds=" + rlistingIds + "&dealId=" + dealId,
        type: "get",
        async: true
    }).done(function (response) {
        if(response.result || response.code === '10001') {
            oldListings = getListingsFromTable(scheduleId, scheduleDate);
            $("#modalAddListings").modal("hide");
            html = "";
            const curListing = response.data.list || [];
            for (var i = 0; i < curListing.length; i++) {
                var listing = curListing[i];            
                oldListingJson = schedulePanel.find(".listing-item-" + listing.rlistingId).val();
                oldListing = null;
                if (oldListingJson) {
                    var oldListing = JSON.parse(oldListingJson);
                }
                var isDismiss = oldListing && oldListing.isDismiss;
                var isFeedback = oldListing && oldListing.isFeedback;
                var isUnvailabel = !oldListing.isDismiss && oldListing.reasonName && oldListing.reasonName !== '';
                var isDisabled = isDismiss || isFeedback;
                var note = oldListing && oldListing.note || '';
                html += "<tr data-rlisting-id='" + listing.rlistingId + "' class='" + (isDismiss ? "dismiss" : "") + " " + (isFeedback ? "feedback" : "") + (isUnvailabel ? "unvailabel" : "") + "' data-disabled='" + isDismiss + "'>";
                html += "<td >";
                html += "<a href='/listing/" + listing.rlistingId + "' target='blank'>" + listing.rlistingId + "</a>";
                if (!isDisabled) {
                    html += '<a href="#" class="btn-remove-listing text-red" data-rlisting-id="' + listing.rlistingId + '"><i class="glyphicon glyphicon-minus-sign"></i></a>';
                }
                html += '<input class="is-dismiss is-dismiss-' + listing.rlistingId + '" type="hidden" value="' + (isDismiss ? 1 : 0) + '" />';
                html += '<input class="listing-item-' + listing.rlistingId + '" type="hidden" value=\'' + (oldListingJson ? oldListingJson : "") + '\' />';
                html += "</td>";
                html += "<td>" + listing.address + "</td>";
                // timepicker
                html += '<td>';
                html += '<div class="form-group">';
                html += '<div class="input-group bootstrap-timepicker timepicker">';
                scheduleMoment.add(parseInt(listing.duration), 's');
                html += `<input type="text" class="form-control ${!isDismiss && 'listing-schedule-time'}" value="${!isDismiss ? scheduleMoment.format('HH:mm') : moment(oldListing.scheduleTime).format('HH:mm')}"  data-rlisting-id="${listing.rlistingId}" />`;
                html += '<span class="input-group-addon">';
                html += '<span class="glyphicon glyphicon-calendar"></span>';
                html += '</span>';
                html += '</div>';
                html += '</div>';
                html += '</td>';
                // end timepicker
                html += `<td>
                    ${hasUpdatePermission ? '<input type="text" class="listing-note listing-note-' + listing.rlistingId + ' form-control" value="' + note + '" data-rlisting-id="' + listing.rlistingId + '" />' : note}
                </td>`;
                html += "<td>";
                if (oldListing.percentValue && oldListing.percentValue !== '') {
                    html += `<a href='#' data-rlistingid="${oldListing.rlistingId}" class="starRenderPropzy" poin="${oldListing.percentValue.toFixed(0)}">
                        ${oldListing.percentValue.toFixed(0)}%
                    </a>`;
                }
                if (isDismiss) {
                    html += `<span>Listing này bị bỏ qua. ${(oldListing.reasonName || oldListing.reasonName !== '') ? 'Lý do: ' + oldListing.reasonName : '' }</span>`;
                } else if(isUnvailabel) {
                    html += `<span class="error">${stopPostingMessage}</span>`;
                }
                html += "</td>";
                html += `
                    ${hasUpdatePermission ? `
                    <td>
                        ${!isDismiss ? `
                            <a class="order-btn-up" onclick=\"return orderScheduleListing(this, 'up', ${listing.rlistingId});\" data-schedule-id='${scheduleId}' ><i class='glyphicon  glyphicon-arrow-up'></i></a>
                            <a class="order-btn-down" onclick=\"return orderScheduleListing(this, 'down', ${listing.rlistingId});\" data-schedule-id='${scheduleId}' ><i class='glyphicon  glyphicon-arrow-down'></i></a>
                        ` : ''}
                    </td>
                    ` : ''}
                `;
                html += "</tr>";
            }
            //html += "</ul>";
            var scheduleBoxEle = $(".schedule-" + scheduleId);
            var tbodyEle = scheduleBoxEle.find("table.table-listing > tbody");
            var firstDisabledTr = tbodyEle.children("tr[data-disabled='true']");
            tbodyEle.html(html);
            if(firstDisabledTr.length > 0) {
                firstDisabledTr.each(function() {
                    tbodyEle.append($(this));
                })
            }
            
            tbodyEle.find(".listing-schedule-time").timepicker({
                showMeridian: false
            });
            scheduleBoxEle.find(".starRenderPropzy").on('click', function() {
                showListingFeedBack(scheduleId, $(this).data('rlistingid'));
            });
            bindChangeNote(schedulePanel.find('.listing-note'));
            bindChangeSchedulDate(schedulePanel.find('.listing-schedule-time'));
            initRemoveListingButton(".schedule-" + scheduleId + " table.table-listing tbody");
            initListingRow(tbodyEle);
            callback && callback(response)
        } else {
            showPropzyAlert(response.message);
        }        
    }).always(function () {
        hidePropzyLoading();
    });
}


function getListingIdsFromTable(scheduleId) {
    returnVal = [];
    $(".schedule-" + scheduleId + " table.table-listing tbody>tr").each(function () {
        var self = $(this);
        if(!self.data('disabled')) {
            var rlistingId = $(this).attr("data-rlisting-id");
            if (rlistingId === undefined) {
                return;
            }
            returnVal.push(rlistingId);
        }
    });
    return returnVal;
}


function getListingsFromTable(scheduleId, scheduleDate, getAll) {
    var returnVal = [];
    $(".schedule-" + scheduleId + " table.table-listing tbody>tr").each(function () {
        if(!getAll && $(this).data('disabled')) {
            return false;
        }
        var rlistingId = $(this).attr("data-rlisting-id");
        if (rlistingId === undefined) {
            return;
        }
        var listing =
                {
                    "rlistingId": rlistingId,
                    "scheduleTime": null,
                    "note": null,
                    "isDismiss": ($(this).find(".is-dismiss-" + rlistingId).val() == 1),
                    "estimatedTime": $(this).find(".estimatedTime-" + rlistingId).val(),
                    "estimatedDistance": $(this).find(".estimatedDistance-" + rlistingId).val()
                };
        if (!listing.isDismiss) {
            if ($(this).find(".listing-note").length > 0) {
                listing.note = $(this).find(".listing-note").val();
            }
            if (listing.note === undefined || listing.note.trim() === "") {
                listing.note = null;
            }

            if ($(this).find(".listing-schedule-time").length > 0) {
                var theDate = $(this).find(".listing-schedule-time").val() + " " + scheduleDate;
                if (theDate.trim() !== "") {
                    listing.scheduleTime = moment(theDate, "HH:mm DD-MM-YYYY").unix() * 1000;
                }
            }
        }
        returnVal.push(listing);
    });
    return returnVal;
}

function initRemoveListingButton_bk(parentSelector) {
    var selector = ".btn-remove-listing";
    if (parentSelector) {
        selector = parentSelector + " " + selector;
    }
    $(selector).on("click", function (event) {
        event.preventDefault();
        var rlistingId = $(this).attr("data-rlisting-id");
        var listingData = $(".listing-item-" + rlistingId).val();
        if (listingData.trim() == "") {
            $(this).parents("tr").remove();
            return;
        }
        $(".is-dismiss-" + rlistingId).val(1);
        $(this).remove();
    });
}

function initRemoveListingButton(parentSelector) {
    var selector = ".btn-remove-listing";
    if (parentSelector) {
        selector = parentSelector + " " + selector;
    }
    $(selector).on("click", function (event) {
        modalCancelTour.find(".errors").html("");
        event.preventDefault();
        var scheduleId = $(this).parents(".schedule").attr("data-schedule-id");
        var rlistingId = $(this).attr("data-rlisting-id");
        var listingData = $(".listing-item-" + rlistingId).val();
        if (listingData.trim() == "") {
            $(this).parents("tr").remove();
            return;
        }
        showPropzyLoading();
        $.ajax({
            url: "/tour/get-reasons?type=4",
            type: "get"
        }).done(function (response) {
            // console.log('active');
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                // var item = response.data[i];
                // if(item.control != 'input_hidden'){
                //     if(item.control == 'input_text_if_checked'){
                //         html += "<div><label style='display:block'><input type='checkbox' name='select-reason' class='reason' value='" + item.reasonId + "' /> " + item.reasonName + "<div><textarea placeholder='Vui lòng nhập lý do tại đây ...' class='form-control'></textarea></div></label></div>";
                //     }else{
                //         html += "<div><label style='display:block'><input type='checkbox' name='select-reason' class='reason' value='" + item.reasonId + "' /> " + item.reasonName + "</label></div>";
                //     }
                // }
                var item = response.data[i];
                html += "<div><label><input type='checkbox' name='select-reason' class='reason' value='" + item.reasonId + "' /> " + item.reasonName + "</label></div>";
            }
            modalCancelTour.find(".reasons").html(html);
            modalCancelTour.find(".type").val("listing");
            modalCancelTour.find(".schedule-id").val(scheduleId);
            modalCancelTour.find(".listing-id").val(rlistingId);
            modalCancelTour.find('.modal-title').text('Lý do bỏ qua listing');
            modalCancelTour.modal();
        }).always(function () {
            hidePropzyLoading();
        });
    });
}


function initListingRow(focusTbEl) {
    $("tr.feedback").each(function () {
        $(this).find("input").prop("disabled", true);
    });

    $("tr.dismiss").each(function () {
        $(this).find("input").prop("disabled", true);
    });
    
    function handleInitRow(ele) {
        var curDisableRow = ele.find('tr.dismiss');
        if(curDisableRow.length > 0) {
            var lastAvaiIndex = curDisableRow.eq(0).index() - 1;
            if(lastAvaiIndex >= 0) {
                ele.children('tr').eq(lastAvaiIndex).find('.order-btn-down').attr('onClick', '');
            }
        }
    }

    if(focusTbEl) {
        handleInitRow(focusTbEl);
    } else {
        $('.schedule-box .table-listing tbody').each(function() {
            handleInitRow($(this))        
        });
    } 
}


var selectedScheduleRlistingIds = [];
function orderScheduleListing(selector, direction, rlistingId) {
    var scheduleId = $(selector).attr("data-schedule-id");
    selectedScheduleRlistingIds = getListingIdsFromTable(scheduleId);
    console.log(selectedScheduleRlistingIds);
    var itemIndex = selectedScheduleRlistingIds.indexOf(rlistingId + "");
    if (itemIndex == -1) {
        return false;
    }
    var replaceItem = null;
    if (direction == "up") {
        if (itemIndex == 0) {
            return false;
        }
        replaceItem = selectedScheduleRlistingIds[itemIndex - 1];
        selectedScheduleRlistingIds[itemIndex - 1] = rlistingId + "";
    } else if (direction == "down") {
        if (itemIndex == selectedScheduleRlistingIds.length - 1) {
            return false;
        }
        replaceItem = selectedScheduleRlistingIds[itemIndex + 1];
        selectedScheduleRlistingIds[itemIndex + 1] = rlistingId + "";
    }
    selectedScheduleRlistingIds[itemIndex] = replaceItem;
    var scheduleDate = $(".schedule-date-" + scheduleId).val();
    getScheduleListingsRow(scheduleId, selectedScheduleRlistingIds, scheduleDate);
    //loadScheduleListingsDataTable(selectedScheduleRlistingIds);
    return false;
}

function saveScheduleNotifyNote(selector, id) {
    var note = $(selector).val();
    if (!note || note.trim() == "") {
        return false;
    }
    $(selector).parents("td").find(".errors").html("");
    var postData = {
        "id": id,
        "note": note.trim(),
        "statusId": null,
        "isConfirmed": null
    };
    $.ajax({
        url: "/tour/change-support-notify-status",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        if (response.result) {
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {

    });
}

function initRequestChangeTimeButtons(){
    $(".btnRecheckListing").unbind("click");
    $(".btnRecheckListing").on('click', function(event){
        event.preventDefault();
        var rlistingId = $(this).attr("data-rlisting-id");
        QuickCheckListings.showQuickCheckModal({
            "dealId": dealId,
            "leadId": leadId,
            "rlistingIds": [rlistingId]
        });
    });

    $(".btnConfirmChangeTime").unbind("click");
    $(".btnConfirmChangeTime").on("click", function(event){
        event.preventDefault();
        var requestGroup = $(this).parents(".group-request-change-time");
        var requestChangeTimeId = requestGroup.attr("data-id");
        console.log(requestChangeTimeId);
        var postData = {
            "id": parseInt(requestChangeTimeId)
        };
        showPropzyLoading();
        $.ajax({
            "url": "/tour/confirm-listing-time-change",
            "type": "POST",
            "data": JSON.stringify(postData)
        }).done(function(response){
            if(response.result){
                requestGroup.remove();
                window.location.reload();
            }
        }).always(function(){
            hidePropzyLoading();
        });
    });
}




function cancelSchedule(postData) {
    showPropzyLoading();
    $.ajax({
        url: "/deal/cancel-schedule",
        type: "post",
        data: JSON.stringify(postData)
    }).done(function (response) {
        showPropzyAlert(response.message);
        if (response.result) {
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}

function doneScheduleNotify(selector, id, dealId, statusId, isConfirm) {
    var note = $(selector).parents("tr").find(".note").val();
    console.log(note);
    if (!note || note.trim() == "") {
        console.log("I am here");
        $(selector).prop("checked", false);
        $(selector).parents("tr").find(".note").focus();
        $(selector).parents("tr").find(".errors").html("Nhập hướng giải quyết");
        return false;
    }
    var postData = {
        "id": id,
        "note": null,
        "statusId": statusId,
        "isConfirmed": isConfirm
    };
    if (statusId == 3) {
        var item = null;
        for (var i = 0; i < supportNotifies.length; i++) {
            item = supportNotifies[i];
            if (item.id == id) {
                break;
            }
        }
        if (item != null && (item.note == null || item.note.trim() == "")) {
            window.location = "/deal/tour/" + dealId + "?supportId=" + id;
            return false;
        }
    }
    $.ajax({
        url: "/tour/change-support-notify-status?data=" + JSON.stringify(postData),
        type: "get"
    }).done(function (response) {
        if (response.result) {
            $(".notify-schedule-" + id).remove();
            if (isConfirm === true || statusId == 3) {
                window.location = "/deal/tour/" + dealId;
            }
        } else {
            showPropzyAlert(response.message);
        }
    }).always(function () {

    });

}

$(".btn-show-request-update-tour").on('click', function(event){
    event.preventDefault();
    var scheduleId = $(this).attr("data-schedule-id");
    var rlistingIds = [];
    var section = $("#schedule"+scheduleId);
    section.find(".table-listing tr").each(function(){
        var rlistingId = $(this).attr("data-rlisting-id");
        if(!rlistingId){
            return;
        }
        var listing = JSON.parse($(this).find(".listing-item-"+rlistingId).val());
        var isRlistingIdExitsted = (rlistingIds.filter(function(item){
            item.rlistingId==rlistingId;
        }).length<0);
        rlistingIds.push(listing);            
    });
    ModalRequestUpdateTour.showModal({
        "scheduleId": scheduleId,
        "rlistingIds": rlistingIds
    });
});