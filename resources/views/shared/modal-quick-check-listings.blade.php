<?php

function renderChooseTime() { ?>
    <div class="row hidden hiddenQuickcheck">
        <label class="col-sm-2">Ngày</label>
        <div class="col-sm-10">
            <div class="col-md-12" style="padding: 0px; margin-bottom: 10px;">
                <div class="input-group date">
                    <input name="whenDate" class="form-control whenDate" value="{{date('d/m/Y')}}" />
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
                <div class="errors errors-whenDate"></div>
            </div>

        </div>
    </div>
    <!-- <div class="form-group row">
        <label class="col-sm-2">Giờ</label>
        <div class="col-sm-10">
            <div class="col-md-6">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type="text" class="form-control input-small whenTime">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>
                <div class="errors"></div>
            </div>
            <div class="col-md-6 hidden">
                <div class="input-group date">
                    <input name="toDate" class="form-control toDate" value="{{date('d/m/Y')}}" />
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
                <div class="errors errors-toDate"></div>
            </div>
            <div class="col-md-6">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type="text" class="form-control input-small toTime">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>
                <div class="errors errors-toDate"></div>
            </div>
        </div>
    </div> -->
<?php } ?>
<?php
function renderChooseTimeReject() { ?>
    <div class="row">
        <label class="col-sm-2">Ngày</label>
        <div class="col-sm-10">
            <div class="col-md-12" style="padding: 0px; margin-bottom: 10px;">
                <div class="input-group date">
                    <input name="whenDate" class="form-control whenDate" value="{{date('d/m/Y')}}" />
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
                <div class="errors"></div>
            </div>

        </div>
    </div>
    <div class="form-group row">
        <label class="col-sm-2">Giờ</label>
        <div class="col-sm-10">
            <div class="col-md-6">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type="text" class="form-control input-small whenTime">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>
                <div class="errors errors-whenDate"></div>
            </div>
            <div class="col-md-6 hidden">
                <div class="input-group date">
                    <input name="toDate" class="form-control toDate" value="{{date('d/m/Y')}}" />
                    <div class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </div>
                </div>
                <div class="errors errors-toDate"></div>
            </div>
            <div class="col-md-6">
                <div class="input-group bootstrap-timepicker timepicker">
                    <input type="text" class="form-control input-small toTime">
                    <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                </div>
                <div class="errors errors-toDate"></div>
            </div>
        </div>
    </div>
<?php } ?>
<div id="modalSendQuickCheckListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kiểm tra nhanh</h4>
            </div>
            <div class="modal-body">
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home-doc">Hướng dẫn sử dụng</a></li>
                    <li ><a data-toggle="tab" onclick="hideInputQuickCheck()" href="#home">Kiểm tra xem còn trống không?</a></li>
                    <li><a data-toggle="tab" onclick="showInputQuickCheck()" href="#home">Kiểm tra để đặt lịch xem</a></li>
                  </ul>



                  <div class="tab-content">
                    <div style="padding: 20px;" id="home-doc" class="tab-pane fade in active">
                        <h4>Vui lòng chọn một tác vụ dưới đây: </h4>
                        <ul>
                            <li style="margin-bottom: 10px;"><a href="#" onclick="$('.nav-tabs > .active').next('li').find('a').trigger('click');return false;">Kiểm tra xem listings đã chọn còn trống hay không?</a> (khi bạn chỉ muốn kiểm tra xem tin đăng này còn hay đã bán mà chưa xác định được giờ đi xem)</li>
                            <li><a href="#" onclick="$('#modalSendQuickCheckListings .nav-tabs > .active').nextAll('li:lt(2)').find('a').trigger('click');return false;">Kiểm tra listings để đặt lịch xem</a> (khi bạn vừa muốn kiểm tra xem tin đăng này còn hay đã bán và có giờ đi xem xác định)</li>
                        </ul>
                    </div>
                    <div style="padding: 20px;" id="home" class="tab-pane fade in">
                      <input type="hidden" class="dealId" value="" />
                      <input type="hidden" class="leadId" value="" />
                      <?php renderChooseTime(); ?>
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
                      <div class="hidden">
                          <textarea class="check-note form-control" rows="6"></textarea>
                      </div>
                    </div>
                    <div id="menu1" class="tab-pane fade">
                      <h3>Menu 1</h3>
                      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
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
                <button style="display: none;" class="btn btn-success btnSave pull-right" data-action="2"><i class="fa fa-paper-plane-o" aria-hidden="true"></i> Gửi</button>
            </div>
        </div>
    </div>
</div>


<div id="modalSendReCheckListings" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kiểm tra nhanh</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" class="dealId" value="" />
                <input type="hidden" class="leadId" value="" />
                <?php renderChooseTimeReject(); ?>
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
                <div class="hidden">
                    <textarea class="check-note form-control" rows="6"></textarea>
                </div>
            </div>
            <div class="modal-footer" style="text-align: left;">
                <button class="btn btn-success btnSaveRecheck" >Gửi Check Lại</button>
            </div>
        </div>
    </div>
</div>


<div id="modalQuickCheckListingResults" class="modal fade reject" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Kết quả kiểm tra nhanh</h4>
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
                            <th>Ghi chú gửi</th>
                            <th>Ghi chú nhận</th>
                            <th>Khi nào xem được</th>
                            <th style="width:80px">Action</th>
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
    // show hide button save
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
         if($(e.target).attr('href') == '#home') {
              $('#modalSendQuickCheckListings .btnSave').show();
         }else{
            $('#modalSendQuickCheckListings .btnSave').hide();
         }
    });

    function showInputQuickCheck(){
        $('#modalSendQuickCheckListings .hiddenQuickcheck').each(function(){
            $(this).removeClass('hidden');
        })
    }

    function hideInputQuickCheck(){
        $('#modalSendQuickCheckListings .hiddenQuickcheck').each(function(){
            $(this).addClass('hidden');
            $('.whenDate').val('');
        })
    }

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
        var modalSendReCheckListings = $("#modalSendReCheckListings");
        var modalQuickCheckListingResults = $("#modalQuickCheckListingResults");
        var tableListings = modalSendQuickCheckListings.find('.table-listings');



        modalSendQuickCheckListings.find('.whenDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "0 days"
        });
        modalSendReCheckListings.find('.whenDate').datepicker({
            format: "dd/mm/yyyy",
            startDate: "0 days"
        });

        modalSendQuickCheckListings.find('.whenTime').timepicker({
            showMeridian: false
        });
        modalSendReCheckListings.find('.whenTime').timepicker({
            showMeridian: false
        });

        modalSendQuickCheckListings.find('.toTime').timepicker({
            showMeridian: false
        });
        modalSendReCheckListings.find('.toTime').timepicker({
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
                        html += "<tr>";
                        html += "<td>" + item.rlistingId + "</td>";
                        html += "<td>" + item.address + "</td>";
                        html += "<td style='width: 50%' class=''>"+'<div class="form-group row hidden hiddenQuickcheck"> <label class="col-sm-2">Giờ</label> <div class="col-sm-10"> <div class="col-md-6"> <div class="input-group bootstrap-timepicker timepicker"> <input type="text" class="form-control input-small whenTime whenTime-'+item.rlistingId+'"> <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span> </div> <div class="errors errors-whenDate-'+item.rlistingId+'"></div> </div> <div class="col-md-6 hidden"> <div class="input-group date"> <input name="toDate" class="form-control toDate" value="{{date('d/m/Y')}}" /> <div class="input-group-addon"> <i class="fa fa-calendar"></i> </div> </div> <div class="errors errors-toDate-'+item.rlistingId+'"></div> </div> <div class="col-md-6"> <div class="input-group bootstrap-timepicker timepicker"> <input type="text" class="form-control input-small toTime toTime-'+item.rlistingId+'"> <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span> </div> <div class="errors errors-toDate-'+item.rlistingId+'"></div> </div> </div> </div>'+"<input type='text' class='form-control noteSendCheck noteSendCheck-" + item.rlistingId + "' placeholder='Ghi chú' />"+"</td>";
                        html += "</tr>";
                    }
                    modalSendQuickCheckListings.find(".check-note").val(response.data.note);
                }
                tableListings.html(html);
                modalSendQuickCheckListings.find('.whenDate').val("");
                modalSendQuickCheckListings.find('.whenTime').val("");
                modalSendQuickCheckListings.find('.toTime').val("");
                if (response.result) {
                    modalSendQuickCheckListings.modal({
                        backdrop: 'static',
                        keyboard: false
                    }).on('shown.bs.modal', function (e) {
                      modalSendQuickCheckListings.find('.whenTime').timepicker({
                          showMeridian: false
                      });
                      modalSendQuickCheckListings.find('.toTime').timepicker({
                          showMeridian: false
                      });
                      $('#modalSendQuickCheckListings .nav-tabs').find('a:first').trigger('click');
                    }).on('hidden.bs.modal', function (e) {
                        console.log('close modal quick check');
                        $('#crm_jm_tableSearchListing_wrapper input[type="checkbox"]').prop('checked',false);
                        $('#likeListing input[type="checkbox"]').prop('checked',false);
                        $('#arrayStoreListingForAction').val(null);
                        $('#arrayStoreTourListingForAction').val(null);
                    });
                }
            }).always(function () {
                hidePropzyLoading();
            });
        };

        modalSendQuickCheckListings.find(".btnSave").on('click', function () {
            if($('#modalSendQuickCheckListings .whenDate').is(":visible")){
                if($('#modalSendQuickCheckListings .whenDate').val() == ''){
                    $('#modalSendQuickCheckListings .whenDate').css('border','2px solid red');
                    return false;
                }
            }

            modalSendQuickCheckListings.find('.errors').html("");
            var isValid = true;
            var whenDate = modalSendQuickCheckListings.find(".whenDate").val().trim();
            var postData = {
                "dealId": myConfig.dealId,
                "leadId": myConfig.leadId,
                "note": modalSendQuickCheckListings.find(".check-note").val().trim(),
                // "scheduleTimeFrom": null,
                // "scheduleTimeTo": null,
                "checkListings": []
            };
            for (var i = 0; i < myConfig.rlistingIds.length; i++) {
                var whenTime = modalSendQuickCheckListings.find(".whenTime-" + myConfig.rlistingIds[i]).val().trim();
                if (whenDate !== "" && whenTime !== "") {
                    var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                    console.log(reminderTime);
                    if (reminderTime.isValid()) {
                        whenTime = reminderTime.unix() * 1000;
                    }
                } else {
                    whenTime = null;
                    // modalSendQuickCheckListings.find(".errors-whenDate").html("Chọn giờ bắt đầu!");
                    // isValid = false;
                }

                var toTime = modalSendQuickCheckListings.find(".toTime-" + myConfig.rlistingIds[i]).val().trim();
                if (whenDate !== "" && toTime !== "") {
                    var reminderTime = moment(whenDate + " " + toTime, "DD/MM/YYYY HH:mm");
                    console.log(reminderTime);
                    if (reminderTime.isValid()) {
                        toTime = reminderTime.unix() * 1000;
                    }
                } else {
                    toTime = null;
                    // modalSendQuickCheckListings.find(".errors-toDate").html("Chọn giờ kết thúc!");
                    // isValid = false;
                }

                if (whenTime > toTime) {
                    modalSendQuickCheckListings.find(".errors-toDate-"+ myConfig.rlistingIds[i]).html("Giờ kết thúc phải lớn hơn giờ bắt đầu!");
                    isValid = false;
                    // return false;
                }
                if(whenTime){
                    var now = moment().unix()*1000;
                    if(whenTime<=now){
                        modalSendQuickCheckListings.find(".errors-whenDate-"+ myConfig.rlistingIds[i]).html("Giờ bắt đầu phải lớn hơn hiện tại!");
                        isValid = false;
                        // return false;
                    }
                }

                postData.checkListings.push({
                    "rlistingId": myConfig.rlistingIds[i],
                    "noteSendCheck": $(".noteSendCheck-" + myConfig.rlistingIds[i]).val(),
                    "scheduleTimeFrom": whenTime,
                    "scheduleTimeTo": toTime
                });
            }

            //var toDate = modalSendQuickCheckListings.find(".toDate").val().trim();




            if (!isValid) {
                return false;
            }

//             console.log(JSON.stringify(postData));return false;

            showPropzyLoading();
            $.ajax({
                url: "/crm-dashboard/quick-check-listing",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                // console.log(response);
                if((response.code=='10001' || response.code=='405') && !$.isEmptyObject(response.data)){
                    response.message ='';
                    $.each(response.data,function (key,item) {
                        response.message +='<div style="padding:10px; margin-bottom: 10px; font-weight: bold; border-radius: 3px; border:1px solid #eee;">'+item.message+'</div>';
                    });
                }
                // if (response.result) {
                //     modalSendQuickCheckListings.modal('hide');
                //     for (var i = 0; i < myConfig.rlistingIds.length; i++) {
                //         $('.selected-listing-'+myConfig.rlistingIds[i]).removeAttr("checked");
                //         $('.selected-listing-'+myConfig.rlistingIds[i]).parent().parent().children().last().text('Đang chờ kết quả');
                //     }
                //     $('#arrayStoreListingForAction').val('');
                //     //window.location.reload();
                // }

                // fix cho trường hợp chuyển tab bị reset lại store --- do logic này nên trường hợp bị lỗi cũng reset lại check box là hidde modal
                modalSendQuickCheckListings.modal('hide');
                for (var i = 0; i < myConfig.rlistingIds.length; i++) {
                    $('.selected-listing-'+myConfig.rlistingIds[i]).removeAttr("checked");
                    const virtualStatusElement = $('.selected-listing-'+myConfig.rlistingIds[i]).parent().parent().children('.virtualStatus');
                    if (virtualStatusElement.length > 0) {
                        virtualStatusElement.text('Đang chờ kết quả ('+moment().format('DD/MM/YY H:m:s')+')')
                    }
                }
                $('#arrayStoreListingForAction').val('');
                showPropzyAlert(response.message);
            }).always(function () {
                hidePropzyLoading();
            });
        });


        var showReCheckModal = function (params) {
            var html = "";
            for (var i = 0; i < params.list.length; i++) {
                var item = params.list[i];
                html += "<tr class='listing' data-id='" + item.rlistingId + "' data-check-id='" + (item.checkId?item.checkId:null) + "' >";
                html += "<td>" + item.rlistingId + "</td>";
                html += "<td>" + item.address + "</td>";
                html += "<td style='width: 50%'><input type='text' class='form-control noteSendCheck noteSendCheck-" + item.rlistingId + "' placeholder='Ghi chú' value='" + (item.noteSendCheck?item.noteSendCheck:"") + "' /></td>";
                html += "</tr>";
                modalSendReCheckListings.find(".leadId").val(item.leadId);
                modalSendReCheckListings.find(".dealId").val(item.dealId);
            }
            modalSendReCheckListings.find(".check-note").val("");
            modalSendReCheckListings.find('.table-listings').html(html);
            modalQuickCheckListingResults.modal("hide");
            modalSendReCheckListings.find('.whenDate').val("");
            modalSendReCheckListings.find('.whenTime').val("");
            modalSendReCheckListings.find('.toTime').val("");
            modalSendReCheckListings.modal({
                backdrop: 'static',
                keyboard: false
            });
        };
        modalSendReCheckListings.find(".btnSaveRecheck").on('click', function () {
            modalSendReCheckListings.find('.errors').html("");
            var postData = {
                "dealId": modalSendReCheckListings.find(".dealId").val(),
                "leadId": modalSendReCheckListings.find(".leadId").val(),
                "note": modalSendReCheckListings.find(".check-note").val().trim(),
                "scheduleTimeFrom": null,
                "scheduleTimeTo": null,
                "checkListings": []
            };

            postData.dealId = postData.dealId.trim() != "" ? postData.dealId : null;
            postData.leadId = postData.leadId.trim() != "" ? postData.leadId : null;

            var isValid = true;
            var whenDate = modalSendReCheckListings.find(".whenDate").val().trim();
            if(whenDate == ''){
                modalSendReCheckListings.find(".whenDate").css('border','2px solid red');
            }
            var whenTime = modalSendReCheckListings.find(".whenTime").val().trim();
            if (whenDate !== "" && whenTime !== "") {
                var reminderTime = moment(whenDate + " " + whenTime, "DD/MM/YYYY HH:mm");
                console.log(reminderTime);
                if (reminderTime.isValid()) {
                    postData.scheduleTimeFrom = reminderTime.unix() * 1000;
                }
            } else {
                modalSendReCheckListings.find(".errors-whenDate").html("Chọn giờ bắt đầu!");
                isValid = false;
            }

            //var toDate = modalSendQuickCheckListings.find(".toDate").val().trim();
            var toTime = modalSendReCheckListings.find(".toTime").val().trim();
            if (whenDate !== "" && toTime !== "") {
                var reminderTime = moment(whenDate + " " + toTime, "DD/MM/YYYY HH:mm");
                console.log(reminderTime);
                if (reminderTime.isValid()) {
                    postData.scheduleTimeTo = reminderTime.unix() * 1000;
                }
            } else {
                modalSendReCheckListings.find(".errors-toDate").html("Chọn giờ kết thúc!");
                isValid = false;
            }



            if (postData.scheduleTimeFrom > postData.scheduleTimeTo) {
                modalSendReCheckListings.find(".errors-toDate").html("Giờ kết thúc phải lớn hơn giờ bắt đầu!");
                isValid = false;
            }

            if(postData.scheduleTimeFrom){
                var now = moment().unix()*1000;
                if(postData.scheduleTimeFrom<=now){
                    modalSendReCheckListings.find(".errors-whenDate").html("Giờ bắt đầu phải lớn hơn hiện tại!");
                    isValid = false;
                }
            }

            modalSendReCheckListings.find(".listing").each(function () {
                var rlistingId = $(this).attr("data-id");
                var checkId = $(this).attr("data-check-id");
                postData.checkListings.push({
                    "checkId": checkId,
                    "rlistingId": rlistingId,
                    "noteSendCheck": $(".noteSendCheck-" + rlistingId).val(),
                    "scheduleTimeFrom": postData.scheduleTimeFrom,
                    "scheduleTimeTo": postData.scheduleTimeTo,
                });
            });
            if (!isValid) {
                return false;
            }

            // console.log(JSON.stringify(postData));return false;
            // console.log(isValid);
            // return false;
            showPropzyLoading();
            $.ajax({
                url: "/crm-dashboard/recheck-listing",
                type: "post",
                data: JSON.stringify(postData)
            }).done(function (response) {
                if (response.result) {
                    // lol Jack
                    // var postData = {
                    //     "checkIds": []
                    // };
                    // modalSendReCheckListings.find(".listing").each(function () {
                    //     var checkId = $(this).attr("data-check-id");
                    //     if (checkId) {
                    //         postData.checkIds.push(parseInt(checkId));
                    //     }
                    // });
                    // console.log(postData);return false;
                    // if (postData.checkIds.length > 0) {
                    //     // showPropzyLoading();
                    //     $.ajax({
                    //         url: "/crm-dashboard/set-quick-check-listing-result-read",
                    //         type: "post",
                    //         data: JSON.stringify(postData)
                    //     }).done(function (response) {
                    //         console.log(response);
                    //     })
                    // }
                    //\\ lol Jack
                    modalSendReCheckListings.modal('hide');
                }
                showPropzyAlert(response.message);
                // getUnreadNotifications();
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
                "autoWidth": false,
                columns: [
                    {data: "rlistingId", render: function (data, type, object) {
                            var returnValue = "";
                            if (object.dealId) {
                                returnValue = "<a href='/deal/detail/" + object.dealId + "' target='_blank' >" + object.dealId + "</a>";
                            } else if (object.leadId) {
                                returnValue = "<a href='/lead/detail/" + object.leadId + "' target='_blank' >" + object.leadId + "</a>";
                            }
                            return returnValue + "<br/><small>(" + object.customerName + ")</small>";
                        }},
                    {data: "rlistingId"},
                    {data: "address"},
                    {data: "formatPrice"},
                    {data: "rlistingId", render: renderQuickCheckListing.renderAvalable},
                    {data: "noteSendCheck"},
                    {data: "note", "width": "100px"},
                    {data: "dateView", render: function (data, type, object) {
                            if (object.statusId != 1) {
                                return "";
                            }
                            if (object.statusId == 1 && object.unknown) {
                                return "Không xác định thời gian";
                            }
                            var from = (object.timeViewFrom!=null) ? object.timeViewFrom : object.scheduleTimeFrom;
                            var to = (object.timeViewTo!=null) ? object.timeViewTo : object.scheduleTimeTo;
                            if(!from || !to){
                                return "";
                            }
                            return "Từ: " + moment(from).format("H:mm DD/MM") + "<br />Đến: " + moment(to).format("H:mm DD/MM");
                        }, width: "120px"},
                    {data: "rlistingId", render: renderQuickCheckListing.renderResultActions, width: "80px"}
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
                    $(row).find(".btnRecheckResult").on("click", function (event) {
                        event.preventDefault();
                        var checkItem = JSON.parse($(this).attr("data-check-item"));
                        console.log(checkItem);
                        var params = {
                            "list": []
                        };
                        params.list.push(checkItem);
                        showReCheckModal(params);
                    });

                    $(row).find(".btnConfirmResult").on("click", function (event) {
                        event.preventDefault();
                        var postData = {
                            "checkId": data.checkId
                        };
                        if (data.confirmId) {
                            postData.confirmId = data.confirmId;
                        }
                        showPropzyLoading();
                        $.ajax({
                            "url": "/crm-dashboard/accept-empty-check",
                            "type": "POST",
                            "data": JSON.stringify(postData)
                        }).done(function (response) {
                            if (response.result) {
                                $(row).find(".btnConfirmResult").remove();
                                $(row).find(".btnRecheckResult").remove();
                            }
                            showPropzyAlert(response.message);
                        }).always(function () {
                            hidePropzyLoading();
                        });
                    });
                }
            });
            modalQuickCheckListingResults.modal();
        }

        modalQuickCheckListingResults.on('hide.bs.modal', function (event) {

            // console.log($(document.activeElement).attr('class'));return false;
            // if($(document.activeElement).attr('class') == 'btn btn-success btnRecheckResult'){
            if($(document.activeElement).attr('class') == 'close'){

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
                        if(response.result){
                            var intercom = Intercom.getInstance();
                            intercom.emit('closeQuickCheckResult', {action: true});
                        }
                        console.log(response);
                    }).always(function () {
                        hidePropzyLoading();
                    });
                }
            }

        });

        var loadQuickCheckListingsResult = function (leadId) {
            $.ajax({
                url: "/crm-dashboard/quick-check-listings-result/?leadId=" + leadId,
                type: "get"
            }).done(function (response) {
                if (response.result) {
                    if (response.data.list && response.data.list.length > 0) {
                        if(!$('#modalSendReCheckListings').hasClass('in')){
                            showPopUpQuickCheckListingsResults(response.data.list);
                        }
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
                        if (response.data[i].code == "reply_empty_check" && response.data[i].checkListings.length!=0) {
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
            "loadQuickCheckListingsResults": loadQuickCheckListingsResults,
            "showReCheckModal": showReCheckModal
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
        },
        renderResultActions: function (data, type, object) {
            var html = "";
            object.note = "";
            object.noteSendCheck = "";
            if (!object.isConfirmed && object.timeViewFrom != null && object.timeViewTo != null && object.isSendConfirm != true) {
                if (object.scheduleTimeFrom != object.timeViewFrom || object.scheduleTimeTo != object.timeViewTo) {
                    html += "<button class='btn btn-danger btnConfirmResult' ><i class='fa fa-check' ></i></button> ";
                    html += "<button class='btn btn-success btnRecheckResult' data-id='" + object.id + "' data-check-item='" + JSON.stringify(object) + "' ><i class='fa fa-refresh' ></i></button>";
                }
            }
            return html;
        }
    };


    QuickCheckListings.loadQuickCheckListingsResults();
    setInterval(QuickCheckListings.loadQuickCheckListingsResults, 60000);

</script>
