<div id="modalQuickCheckListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kiểm tra nhanh</h4>
            </div>
            <div class="modal-body">
                <div class="extra_data">
                    <h4>Từ Crm <span class="createdName"></span> cho khách hàng <span class="customerName"></span></h4>
                </div>
                <input type="hidden" class="dealId" value="" />
                <input type="hidden" class="leadId" value="" />
                <table class="table table-bordered table-striped" id="dataTableQuickCheckListings">
                    <thead>
                        <tr>
                            <th>LID</th>
                            <th width="120px">Địa chỉ</th>
                            <th>TTLH</th>
                            <th>Giá</th>
                            <th>Còn trống</th>
                            <th>Khi nào xem được</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div>
                    <textarea class="check-note form-control" rows="6"></textarea>
                </div>
            </div>
            <div class="modal-footer" style="text-align: left;">
                <?php
                $quickCheckListingsSaveAction = 1;
                //if ($currentGroup['departmentId'] == 5)
                switch ($currentGroup['departmentId']) {
                    case 5:
                        $quickCheckListingsSaveAction = 3;
                        break;
                    case 12:
                        $quickCheckListingsSaveAction = 1;
                        break;
                    default :
                        break;
                }
                ?>
                <button class="btn btn-success btnSave" data-action="{{$quickCheckListingsSaveAction}}">Lưu</button>
                <?php if ($currentGroup['departmentId'] == 12): ?>
                    <button class="btn btn-success btnSave" data-action="2">Gửi cho TM</button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<script>
    var quickCheckListings = [];
    var modalQuickCheckListings = $("#modalQuickCheckListings");
    var dataTableQuickCheckListings = null;
    var modalQuickCheckListingGlobal = {
        CRM_REQUEST: "crm_request",
        quickCheckFrom: null,
        isShowingModalQuickCheckListing: false,
        customerName: null,
        createdName: null,
        dealId: null,
        leadId: null
    };
    $(".btnShowModalQuickCheckListings").on("click", function (event) {
        modalQuickCheckListingGlobal.quickCheckFrom = null;
        quickCheckListings = [];
        event.preventDefault();
        var dataTableListingId = "#" + $(this).attr("data-from-table");
        var listingIds = [];
        $(dataTableListingId + " .select-listing:checked").each(function () {
            var listingId = parseInt($(this).val());
            if ($(this).hasClass("disable-quick-check")) {
                $(this).prop("checked", false);
                return;
            }
            listingIds.push(listingId);
        });
        if (listingIds.length <= 0) {
            showPropzyAlert("Chọn listing để check!");
            return false;
        }
        showPopUpQuickCheckListings(listingIds, deal.dealId, deal.leadId, true, true);
    });

    function initMakeCall(dealId, leadId) {
        $(".callOwner").on("click", function (event) {
            event.preventDefault();
            var phoneNumber = $(this).attr("data-number");
            phoneNumber = Base64.decode(phoneNumber);
            var rlistingid = $(this).attr("data-rlistingid");
            CCall.makeCall({
                "phoneNumber": phoneNumber,
                "onCallEnded": function (callInfo) {
                    modalQuickCheckListings.find(".listing-" + rlistingid).attr("data-duration", callInfo.duration);
                    if (callInfo.duration <= 0) {
                        modalQuickCheckListings.find(".status-" + rlistingid).val(3);
                    }
                    modalUpdateCallParamsOfQuickCheckListing = {
                        dealId: dealId,
                        leadId: !dealId ? leadId : null,
                        listingIds: [],
                        type: 114,
                        duration: 0,
                        resultCallId: callInfo.duration <= 0 ? 1 : 9999,
                        receiverPhone: null,
                        config: {
                            onSaved: function () {
                                // do nothing
                            }
                        }
                    };
                }
            });
        });
    }

    function showPopUpQuickCheckListings(rlistingIds, dealId, leadId, closable, editable) {
        showPropzyLoading();
        $.ajax({
            url: "/lead/get-listing-quick-check/" + leadId + "?rlistingIds=" + rlistingIds,
            type: "get"
        }).done(function (response) {
            try {
                dataTableQuickCheckListings.clear();
                dataTableQuickCheckListings.destroy();
            } catch (ex) {
            }
            if (response.result) {
                if (modalQuickCheckListingGlobal.quickCheckFrom == modalQuickCheckListingGlobal.CRM_REQUEST) {
                    modalQuickCheckListings.find(".extra_data").show();
                    modalQuickCheckListings.find(".customerName").html(modalQuickCheckListingGlobal.customerName);
                    modalQuickCheckListings.find(".createdName").html(modalQuickCheckListingGlobal.createdName);
                } else {
                    modalQuickCheckListings.find(".extra_data").hide();
                }
                modalQuickCheckListings.find(".check-note").val(response.data.note);
                dataTableQuickCheckListings = modalQuickCheckListings.find("#dataTableQuickCheckListings").DataTable({
                    "paging": false,
                    lengthChange: false,
                    searching: false,
                    ordering: false,
                    "data": response.data.list,
                    columns: [
                        {data: "rlistingId"},
                        {data: "address"},
                        {data: "sourceBy", render: renderQuickCheckListing.renderSourceBy},
                        {data: "formatPrice"},
                        {data: "rlistingId", render: renderQuickCheckListing.renderAvalable},
                        {data: "rlistingId", render: renderQuickCheckListing.renderAvailableTime, width: "240px"},
                    ],
                    "createdRow": function (row, data, index) {
                        $(row).addClass("listing");
                        $(row).addClass("listing-" + data.rlistingId);
                        $(row).attr("data-rlistingId", data.rlistingId);
                        var dataCheckId = "";
                        if (quickCheckListings.length > 0) {
                            $(quickCheckListings).each(function (idx, item) {
                                console.log(item);
                                console.log(item.rlistingId + " = " + data.rlistingId);
                                if (item.rlistingId == data.rlistingId) {
                                    dataCheckId = item.checkId;
                                }
                            });
                        }
                        $(row).attr("data-checkId", dataCheckId);
                    }
                });
                initMakeCall(dealId, leadId);
                modalQuickCheckListings.find(".dealId").val(dealId);
                modalQuickCheckListings.find(".leadId").val(leadId);
                modalQuickCheckListings.on("shown.bs.modal", function () {
                    modalQuickCheckListingGlobal.isShowingModalQuickCheckListing = true;
                });
                modalQuickCheckListings.on("hidden.bs.modal", function () {
                    modalQuickCheckListingGlobal.isShowingModalQuickCheckListing = false;
                    var postData = {
                        "checkIds": []
                    };
                    modalQuickCheckListings.find(".listing").each(function () {
                        var checkId = $(this).attr("data-checkid");
                        if (checkId) {
                            postData.checkIds.push(parseInt(checkId));
                        }
                    });
                    if (departmentId == 12 && postData.checkIds.length > 0) {
                        showPropzyLoading();
                        $.ajax({
                            url: "/crm-dashboard/set-quick-check-listing-result-read",
                            type: "post",
                            data: JSON.stringify(postData)
                        }).done(function (response) {
                            try {
                                getCustomerCartDataTable();
                                getListingCartList();
                            } catch (Ex) {

                            }
                        }).always(function () {
                            hidePropzyLoading();
                        });
                    }
                });
                if (closable) {
                    modalQuickCheckListings.find("button.close").show();
                } else {
                    modalQuickCheckListings.find("button.close").hide();
                }

                if (!editable) {
                    modalQuickCheckListings.find(".btnSave").hide();
                } else {
                    modalQuickCheckListings.find(".btnSave").show();

                }
                modalQuickCheckListings.modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }
        }).always(function () {
            modalQuickCheckListings.find(".isSeen").on("click", function () {
                console.log("clicked");
                if ($(this).prop("checked")) {
                    $(this).parents("tr").find(".note").val("Xem ngay");
                } else {
                    $(this).parents("tr").find(".note").val("");
                }
            });
            hidePropzyLoading();
        });
    }
    var renderQuickCheckListing = {
        renderId: function (data, type, object) {
            var returnVal = data + " ";
            returnVal += "<a href='#' class='callOwner' data-number='" + Base64.encode(object.createdByPhone) + "' data-rlistingId='" + object.rlistingId + "'>Gọi</a>";
            return returnVal;
        },
        renderAvalable: function (data, type, object) {
            var options = [
                ["1", "Còn"],
                ["2", "Không"],
                ["3", "Không liên lạc được"]
            ];
            var returnValue = "<select class='statusId status-" + data + "'>";
            returnValue += "<option value=''>Chọn</option>";
            var dataStatusId = "";
            if (quickCheckListings.length > 0) {
                $(quickCheckListings).each(function (idx, item) {
                    if (item.rlistingId == object.rlistingId) {
                        dataStatusId = item.statusId;
                    }
                });
            }
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                var selected = (option[0] == dataStatusId) ? "selected" : "";
                returnValue += "<option value=" + option[0] + " " + selected + " >" + option[1] + "</option>";
            }
            returnValue += "</select>";
            return returnValue;
        },
        renderAvailableTime: function (data, type, object) {


            var isSeen = "";
            var note = "";
            if (quickCheckListings.length > 0) {
                $(quickCheckListings).each(function (idx, item) {
                    console.log(item.rlistingId + " = " + data.rlistingId);
                    if (item.rlistingId == object.rlistingId) {
                        isSeen = item.isSeen ? "checked" : "";
                        note = item.note ? item.note : "";
                    }
                });
            }

            var returnValue = "<label><input type='checkbox' class='isSeen' " + isSeen + " /> Ngay</label>";
            returnValue += " Hoặc <input type='text' class='note' placeholder='Vào lúc...' value='" + note + "' />";
            return returnValue;
        },
        renderSourceBy: function (data, type, object) {
            var returnValue = "<div>" + object.sourceBy + "</div>";
            returnValue += "<div>" + object.createdByName + "</div>";
            returnValue += "<div>" + object.createdByPhone + "</div>";
            return returnValue;
        }
    };

    function showModalUpdateCallAfterSavedQuickCheck(postData) {
        var callFailListings = [];
        $(postData.checkListings).each(function (index, item) {
            if (item.statusId == 3) {
                callFailListings.push({
                    "checkId": item.checkId,
                    "rlistingId": item.rlistingId
                });
            }
        });
        if (callFailListings.length > 0) {

            ModalConfirm.showModal({
                message: "Bạn có muốn tạo nhắc nhở cho các cuộc gọi không liên hệ được",
                onYes: function (modal) {
                    var modalUpdateCallParamsOfQuickCheckListing = {
                        dealId: postData.dealId,
                        leadId: !postData.dealId ? postData.leadId : null,
                        listingIds: callFailListings,
                        type: 114,
                        duration: 0,
                        resultCallId: 1,
                        receiverPhone: null,
                        config: {
                            onSaved: function () {
                                // do nothing
                            }
                        }
                    };
                    ModalUpdateCall.showModal(modalUpdateCallParamsOfQuickCheckListing);
                },
                onNo: function (modal) {
                    console.log("nothing happened");
                }
            });


        } else {
            console.log("All call success. No need to show modal update!");
        }
    }
    modalQuickCheckListings.find(".btnSave").on("click", function (event) {
        event.preventDefault();
        var postData = {
            "dealId": parseInt(modalQuickCheckListings.find(".dealId").val()),
            "leadId": parseInt(modalQuickCheckListings.find(".leadId").val()),
            "typeId": parseInt($(this).attr("data-action")),
            "checkListings": [
            ],
            "note": modalQuickCheckListings.find(".check-note").val()
        };
        var isValid = true;
        modalQuickCheckListings.find(".errors").removeClass("errors");
        modalQuickCheckListings.find(".listing").each(function (idx, item) {
            var isCurrentItemValid = true;
            var checkListing = {
                "rlistingId": parseInt($(this).attr("data-rlistingid")),
                "isSeen": null,
                "isChecked": null,
                "note": null,
                "statusId": null,
                "checkId": $(this).attr("data-checkId") ? parseInt($(this).attr("data-checkId")) : null,
                "duration": $(this).attr("data-duration") ? parseInt($(this).attr("data-duration")) : null
            };
            if (checkListing.checkId == null && postData.typeId != 2) {
                postData.typeId = 1;
            }
            switch (postData.typeId) {
                case 1:
                case 3:
                    checkListing.isSeen = $(this).find(".isSeen").prop("checked");
                    checkListing.note = $(this).find(".note").val();
                    checkListing.statusId = parseInt($(this).find(".statusId").val());
                    if (!checkListing.statusId) {
                        isCurrentItemValid = false;
                    } else {
                        if (checkListing.statusId == 1 && !checkListing.isSeen && checkListing.note.trim() == "") {
                            isCurrentItemValid = false;
                        }
                    }
                    if (!isCurrentItemValid) {
                        $(this).addClass("errors");
                    }
                    isValid = isCurrentItemValid;
                    break;
                case 2:
                    break;
            }
            postData.checkListings.push(checkListing);
        });
        if (!isValid) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return false;
        }
        showPropzyLoading();

        // console.log(JSON.stringify(postData));return false;
        $.ajax({
            url: "/crm-dashboard/quick-check-listing",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            if (response.result) {
                modalQuickCheckListingGlobal.isShowingModalQuickCheckListing = false;
                modalQuickCheckListings.modal("hide");
                if ((typeof reloadTables) != "undefined") {
                    reloadTables();
                }
                showModalUpdateCallAfterSavedQuickCheck(postData);
            } else {
                showPropzyAlert(response.message);
            }
        }).always(function () {
            hidePropzyLoading();
        });
    });

    function loadQuickCheckListingsRequests() {
        if (modalQuickCheckListingGlobal.isShowingModalQuickCheckListing) {
            return false;
        }
        quickCheckListings = [];
        $.ajax({
            url: "/tm-dashboard/get-quick-check-listings-requests",
            type: "get"
        }).done(function (response) {
            var listingIds = [];
            if (response.result) {
                if (response.data.length > 0) {
                    var request = response.data[0];
                    modalQuickCheckListingGlobal.quickCheckFrom = modalQuickCheckListingGlobal.CRM_REQUEST;
                    modalQuickCheckListingGlobal.createdName = request.createdName;
                    modalQuickCheckListingGlobal.customerName = request.customerName;
                    quickCheckListings = request.listings;
                    for (var i = 0; i < request.listings.length; i++) {
                        listingIds.push(request.listings[i].rlistingId);
                    }
                    showPopUpQuickCheckListings(listingIds, request.dealId, request.leadId, false, true);
                }
            }
        }).always(function () {

        });
    }
    function loadQuickCheckListingsResult() {
        modalQuickCheckListingGlobal.quickCheckFrom = null;
        quickCheckListings = [];
        $.ajax({
            url: "/crm-dashboard/quick-check-listings-result/?leadId=" + leadId,
            type: "get"
        }).done(function (response) {
            var listingIds = [];
            if (response.result) {
                if (response.data.list && response.data.list.length > 0) {
                    var listings = response.data.list;
                    quickCheckListings = listings;
                    for (var i = 0; i < listings.length; i++) {
                        listingIds.push(listings[i].rlistingId);
                    }
                    showPopUpQuickCheckListings(listingIds, dealId, leadId, true, false);
                }
            }
        }).always(function () {

        });
    }
<?php if ($currentGroup['departmentId'] == 5 || $currentGroup['departmentId'] == 12): ?>
        loadQuickCheckListingsRequests();
        setInterval(loadQuickCheckListingsRequests, 10000);
<?php endif; ?>
</script>
