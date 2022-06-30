<div id="modalSendQuickCheckListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kiểm tra nhanh</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="dealId" value="" />
                <input type="hidden" class="leadId" value="" />
                <div class="form-group row">
                    <label class="col-sm-2">Thời gian</label>
                    <div class="col-sm-10">
                        <div class="col-md-6">
                            <div class="input-group date">
                                <input name="whenDate" class="form-control whenDate" value="{{date('d/m/Y')}}" />
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                            <div class="errors"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-group bootstrap-timepicker timepicker">
                                <input type="text" class="form-control input-small whenTime">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                            </div>
                            <div class="errors"></div>
                        </div>
                    </div>
                </div>
                <table class="table table-bordered table-striped table-listings">
                    <thead>
                        <tr>
                            <th>LID</th>
                            <th width="120px">Địa chỉ</th>
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
                <button class="btn btn-success btnSave" data-action="2">Gửi</button>
            </div>
        </div>
    </div>
</div>


<div id="modalQuickCheckListingResults" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kiểm tra nhanh</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="dealId" value="" />
                <input type="hidden" class="leadId" value="" />
                <table class="table table-bordered table-striped" id="dataTableQuickCheckListings">
                    <thead>
                        <tr>
                            <th>Lead/Deal</th>
                            <th>LID</th>
                            <th width="120px">Địa chỉ</th>
                            <th>Giá</th>
                            <th>Còn / Không</th>
                            <th>Ghi chú</th>
                            <th>Khi nào xem được</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div>
                </div>
            </div>
            <div class="modal-footer" style="text-align: left;">
            </div>
        </div>
    </div>
</div>

<script>
    var QuickCheckListings = (function () {
        var modalQuickCheckListingGlobal = {
            CRM_REQUEST: "crm_request",
            quickCheckFrom: null,
            isShowingModalQuickCheckListing: false,
            customerName: null,
            createdName: null,
            dealId: null,
            leadId: null
        };
        var quickCheckListings = [];
        var myConfig = null;
        var modalSendQuickCheckListings = $("#modalSendQuickCheckListings");
        var modalQuickCheckListingResults = $("#modalQuickCheckListingResults");
        var tableListings = modalSendQuickCheckListings.find('.table-listings');

        modalSendQuickCheckListings.find('.whenDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "0 days"
        });

        modalSendQuickCheckListings.find('.whenTime').timepicker({
            showMeridian: false
        });

        var showQuickCheckModal = function (params) {
            myConfig = params;
            showPropzyLoading();
            $.ajax({
                url: "/lead/get-listing-quick-check/" + params.leadId + "?rlistingIds=" + params.rlistingIds,
                type: "get"
            }).done(function (response) {
                var html = "";
                if (response.result) {
                    for (var i = 0; i < response.data.list.length; i++) {
                        var item = response.data.list[i];
                        html += "<tr><td>" + item.rlistingId + "</td><td>" + item.address + "</td></tr>";
                    }
                    modalSendQuickCheckListings.find(".check-note").val(response.data.note);
                }
                tableListings.html(html);
                if (response.result) {
                    modalSendQuickCheckListings.modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                }
            }).always(function () {
                hidePropzyLoading();
            });
        };

        modalSendQuickCheckListings.find(".btnSave").on('click', function () {
            var postData = {
                "dealId": myConfig.dealId,
                "leadId": myConfig.leadId,
                "note": modalSendQuickCheckListings.find(".check-note").val().trim(),
                "scheduleTime": null,
                "checkListings": []
            };
            for (var i = 0; i < myConfig.rlistingIds.length; i++) {
                postData.checkListings.push({
                    "rlistingId": myConfig.rlistingIds[i]
                });
            }
            var whenDate = modalSendQuickCheckListings.find(".whenDate").val().trim();
            var whenTime = modalSendQuickCheckListings.find(".whenTime").val().trim();
            if (whenDate !== "" && whenTime !== "") {
                var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                console.log(reminderTime);
                if (reminderTime.isValid()) {
                    postData.scheduleTime = reminderTime.unix() * 1000;
                }
            } else {
                showPropzyAlert("Chọn giờ đi xem!");
            }
            showPropzyLoading();
            $.ajax({
                url: "/crm-dashboard/quick-check-listing",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    modalSendQuickCheckListings.modal('hide');
                    window.location.reload();
                }
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        });
        var dataTableQuickCheckListings = null;
        function showPopUpQuickCheckListingsResults(checkData) {
            try {
                dataTableQuickCheckListings.destroy();
            } catch (ex) {
                console.log(ex);
            }
            dataTableQuickCheckListings = modalQuickCheckListingResults.find("#dataTableQuickCheckListings").DataTable({
                "paging": false,
                lengthChange: false,
                searching: false,
                ordering: false,
                "data": checkData,
                columns: [
                    {data: "rlistingId", render: function(data, type, object){
                        var returnValue = "";
                        if(object.dealId){
                            returnValue = "<a href='/deal/detail/"+object.dealId+"' target='_blank' >"+object.dealId+"</a>";
                        }else if(object.leadId) {
                            returnValue = "<a href='/lead/detail/"+object.leadId+"' target='_blank' >"+object.leadId+"</a>";
                        }
                        return returnValue;
                    }},
                    {data: "rlistingId"},
                    {data: "address"},
                    {data: "formatPrice"},
                    {data: "rlistingId", render: renderQuickCheckListing.renderAvalable},
                    {data: "note"},
                    {data: "dateView", render: dateRender, width: "240px"}
                ],
                "createdRow": function (row, data, index) {
                    $(row).addClass("listing");
                    $(row).addClass("listing-" + data.rlistingId);
                    $(row).attr("data-rlistingId", data.rlistingId);
                    var dataCheckId = "";
                    if (quickCheckListings.length > 0) {
                        $(quickCheckListings).each(function (idx, item) {
                            if (item.rlistingId == data.rlistingId) {
                                dataCheckId = item.checkId;
                            }
                        });
                    }
                    console.log(data);
                    $(row).attr("data-checkId", data.checkId);
                }
            });
            modalQuickCheckListingResults.modal();
        }

        modalQuickCheckListingResults.on('hide.bs.modal', function () {
            var postData = {
                "checkIds": []
            };
            modalQuickCheckListingResults.find(".listing").each(function () {
                var checkId = $(this).attr("data-checkid");
                if (checkId) {
                    postData.checkIds.push(parseInt(checkId));
                }
            });
            if (postData.checkIds.length > 0) {
                showPropzyLoading();
                $.ajax({
                    url: "/crm-dashboard/set-quick-check-listing-result-read",
                    type: "post",
                    data: JSON.stringify(postData)
                }).done(function (response) {
                    console.log(response);
                }).always(function () {
                    hidePropzyLoading();
                });
            }

        });

        var loadQuickCheckListingsResult = function (leadId) {
            $.ajax({
                url: "/crm-dashboard/quick-check-listings-result/?leadId=" + leadId,
                type: "get"
            }).done(function (response) {
                if (response.result) {
                    if (response.data.list && response.data.list.length > 0) {
                        showPopUpQuickCheckListingsResults(response.data.list);
                    }
                }
            }).always(function () {

            });
        };

        var loadQuickCheckListingsResults = function () {
            $.ajax({
                url: "/crm-dashboard/quick-check-listings-results/",
                type: "get"
            }).done(function (response) {
                if (response.result && response.data) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].code == "reply_empty_check") {
                            loadQuickCheckListingsResult(response.data[i].checkListings[0].leadId);
                            break;
                        }
                    }
                }
            }).always(function () {

            });
        };



        return {
            "showQuickCheckModal": showQuickCheckModal,
            "loadQuickCheckListingsResult": loadQuickCheckListingsResult,
            "showPopUpQuickCheckListingsResults": showPopUpQuickCheckListingsResults,
            "loadQuickCheckListingsResults": loadQuickCheckListingsResults
        };
    })();


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
            var returnValue = "";
            for (var i = 0; i < options.length; i++) {
                var option = options[i];
                console.log(option[0] + " == " + object.statusId);
                if (option[0] == object.statusId) {
                    returnValue = option[1];
                    break;
                }
            }
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


    QuickCheckListings.loadQuickCheckListingsResults();
    setInterval(QuickCheckListings.loadQuickCheckListingsResults, 60000);

</script>