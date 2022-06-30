<div id="modalCreateMeeting" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCreateMeeting" method="post" >
                <input type="hidden" id="dealId" name="dealId" value="" />
                <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="" />
                <div class="modal-header">
                    <button style="display: none;" type="button" onclick="confirmMeeting()" class="close closeCreateMeeting">&times;</button>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Tạo meeting</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="type" class="type">
                    @if(!empty($need_active))
                        <div class="form-group row">
                            <label class="col-sm-3">IDs:</label>
                            <div class="col-sm-9">
                                @foreach($need_active as $lead_active)
                                    <div class="checkbox-inline" style="padding-left:0px">
                                        <label>
                                            <input checked="checked" disabled="disabled" class="leadIds hidden" type="checkbox" value="{{$lead_active->leadId}}" name="leadIds[]"> {{$lead_active->leadId}} <span class="badge">{{$lead_active->statusName}} - {{$lead_active->progressName}}</span>
                                        </label>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif
                    <div class="form-group row">
                        <label class="col-sm-3">Chọn trung tâm giao dịch:</label>
                        <div class="col-sm-9">
                            <?php
                            $tcs = get_transaction_centers();
                            ?>
                            <select class="form-control tCId">
                                <option value="-1">Chọn</option>
                                <?php foreach ($tcs as $tc): ?>
                                    <option value="{{$tc->id}}">{{$tc->name}}</option>
                                <?php endforeach; ?>
                            </select>
                            <div class="errors" ></div>
                        </div>
                    </div>
                    <div class="form-group row chooseAddress">
                        <label class="col-sm-3">Chọn địa chỉ:</label>
                        <div class="col-sm-9">
                            <input id="address" name="address" type="text" class="form-control address" placeholder="Chưa Có Dữ Liệu" value="" />
                            <div class="errors"></div>
                        </div>
                        <div class="col-md-6 col-xs-12 hidden">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Lat</label>
                                        <input id="lat" name="lat" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="" disabled="disabled">
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>Long</label>
                                        <input id="long" name="long" type="text" class="form-control" placeholder="Chưa Có Dữ Liệu" value="" disabled="disabled">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Ngày</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group date">
                                        <input class="form-control whenDate" readonly="readonly" value="{{date('m/d/Y')}}" />
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                    <div class="errors" ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3">Giờ</label>
                        <div class="col-sm-9">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group bootstrap-timepicker timepicker">
                                        <input type="text" class="form-control input-small whenTime" value="{{date('H:i')}}">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row hidden">
                        <label class="col-sm-3">Thời gian</label>
                        <div class="col-sm-9">
                            <select class="reminderTime">
                                <?php for ($i = 0; $i < 60; $i = $i + 15): if ($i == 0) continue; ?>
                                    <option value="{{$i}}">{{$i}} phút</option>
                                <?php endfor; ?>
                            </select>
                            <div class="errors" ></div>
                        </div>
                    </div>
                    <div class="form-group row block-assign-meeting">
                        <label class="col-sm-3">Assign To</label>
                        <div class="col-sm-9">
                            <select class="assignTo form-control select2" style="width:100%" >
                                <option value="">N/A</option>
                            </select>
                            <div class="errors" ></div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Note</label>
                        <div class="col-sm-12">
                            <div>
                                <div class="errors" ></div>
                                <textarea class="form-control noteTm" rows="6"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-success btnCancelMeeting">Hủy Meeting</button>
                        <button class="btn btn-success btnUpdateMeeting">Update Meeting</button>
                        <button class="btn btn-success btnSaveMeeting">Tạo Meeting</button>
                    </div>
                </div>
                <!--
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                -->
            </form>
        </div>

    </div>
</div>

<script src="{{loadAsset("/plugins/jQueryUI/jquery-ui.js")}}"></script>
<script src="{{loadAsset('/js/commons/send-timer-counter.js')}}"></script>
<script>
var modalCreateMeeting = $("#modalCreateMeeting");
var timer = new SendTimerCounter();
function showUpdateOrCreateMeetingForm(meetingId,type = '') {
    setChooseAddressVisible(modalCreateMeeting, false);
    if (meetingId) {
        $("#isSpecialDeal").prop("checked", true);
        showPropzyLoading();
        $.ajax({
            url: "/deal/meeting-detail/" + meetingId,
            type: "get"
        }).done(function (response) {
            var date = moment(response.data.reminderDate);
            try {
                if (response.data.tCId) {
                    modalCreateMeeting.find(".tCId").val(response.data.tCId);
                }
            } catch (ex) {
            }

            modalCreateMeeting.find(".meetingId").val(meetingId);
            modalCreateMeeting.find(".reminderTime").val(response.data.reminderTime);
            modalCreateMeeting.find(".noteTm").val(response.data.noteTm);
            modalCreateMeeting.find(".whenDate").val(date.format("MM/DD/YYYY"));
            modalCreateMeeting.find(".whenTime").val(date.format("HH:mm"));
            if ((typeof lead) != "undefined" && lead.crmAssignedList && lead.crmAssignedList.length > 0) {
                DealFunctions.setDefaultCrms(lead.crmAssignedList, response.data.assignTo);
            } else {
                findCrms(null, response.data.assignTo);
            }
            modalCreateMeeting.find(".whenDate").bind('keydown',function(e){

                if (e.which == 13)
                    e.stopImmediatePropagation();
            }).datepicker().on("changeDate", function (e) {
                if ((typeof lead) != "undefined" && lead.crmAssignedList && lead.crmAssignedList.length > 0) {
                    DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
                } else {
                    findCrms(null, null);
                }
            });
            modalCreateMeeting.find(".whenTime").timepicker({
                showMeridian: false
            }).on('changeTime.timepicker', function (e) {
                if ((typeof lead) != "undefined" && lead.crmAssignedList && lead.crmAssignedList.length > 0) {
                    DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
                } else {
                    findCrms(null, null);
                }
            });
            if (response.data.tCId == 0) {
                modalCreateMeeting.find(".address").val(response.data.address);
                modalCreateMeeting.find("#long").val(response.data.longitude);
                modalCreateMeeting.find("#lat").val(response.data.latitude);
                setChooseAddressVisible(modalCreateMeeting, true);
            } else {
                modalCreateMeeting.find(".address").val("");
                modalCreateMeeting.find("#long").val("");
                modalCreateMeeting.find("#lat").val("");
                setChooseAddressVisible(modalCreateMeeting, false);
            }
        }).always(function () {
            hidePropzyLoading();
        });
        modalCreateMeeting.find(".btnSaveMeeting").hide();
        modalCreateMeeting.find(".btnUpdateMeeting").show();
        modalCreateMeeting.find(".btnCancelMeeting").show();
        if(type == 'deal'){
            modalCreateMeeting.find(".type").val('deal');
            $('.block-assign-meeting').hide();
            modalCreateMeeting.find(".btnCancelMeeting").hide();
        }
        //modalCreateMeeting.find(".noteTm").prop("disabled", true);
        //modalCreateMeeting.find(".assignTo").prop("disabled", true);
    } else {
        modalCreateMeeting.find(".btnSaveMeeting").show();
        modalCreateMeeting.find(".close").hide();
        modalCreateMeeting.find(".closeCreateMeeting").show();
        modalCreateMeeting.find(".btnUpdateMeeting").hide();
        modalCreateMeeting.find(".btnCancelMeeting").hide();
        //modalCreateMeeting.find(".noteTm").prop("disabled", false);
        //modalCreateMeeting.find(".assignTo").prop("disabled", false);
    }
    modalCreateMeeting.find(".whenDate").bind('keydown',function(e){

    if (e.which == 13)
            e.stopImmediatePropagation();
    }).datepicker({autoclose: true, startDate: '0 days'}).on("changeDate", function (e) {
        if ((typeof lead) != "undefined" && lead.crmAssignedList && lead.crmAssignedList.length > 0) {
            DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
        } else {
            findCrms(null, null);
        }
    });
    modalCreateMeeting.find(".whenTime").timepicker({
        autoclose: true,
        showMeridian: false
    }).on('changeTime.timepicker', function (e) {
        if ((typeof lead) != "undefined" && lead.crmAssignedList && lead.crmAssignedList.length > 0) {
            DealFunctions.setDefaultCrms(lead.crmAssignedList, null);
        } else {
            findCrms(null, null);
        }
    });


    $(modalCreateMeeting.find(".address")).geocomplete()
            .bind("geocode:result", function (event, result) {
                console.log(result);
                modalCreateMeeting.find('#lat').val(result.geometry.location.lat());
                modalCreateMeeting.find('#long').val(result.geometry.location.lng());
            });

    modalCreateMeeting.modal({backdrop: 'static'}).on('shown.bs.modal',function () {
        modalCreateMeeting.on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
    });
}

modalCreateMeeting.find(".tCId").change(function () {
    var tcId = $(this).val();
    setChooseAddressVisible(modalCreateMeeting, tcId==0);
});

$(".btnUpdateMeeting").on("click", function (event) {
    event.preventDefault();
    var whenDate = modalCreateMeeting.find(".whenDate").val();
    var whenTime = modalCreateMeeting.find(".whenTime").val();
    var date = moment(whenDate + " " + whenTime, "MM/DD/YYYY HH:mm");
    var meetingData = {
        "id": modalCreateMeeting.find(".meetingId").val(),
        "reminderDate": date.unix() * 1000,
        "assignTo": modalCreateMeeting.find(".type").val() != '' ? null : parseInt(modalCreateMeeting.find(".assignTo").val()),
        //"reminderTime": parseInt(modalCreateMeeting.find(".reminderTime").val()),
        "noteTm": modalCreateMeeting.find(".noteTm").val()
    };

    modalCreateMeeting.find(".errors").html("");
    var isValid = true;

    if (meetingData.reminderDate == null) {
        modalCreateMeeting.find(".whenDate").parent().parent().find(".errors").html("Chọn ngày / giờ.");
        isValid = false;
    } else {
        var nowTimestamp = moment().unix() * 1000;
        if (meetingData.reminderDate <= nowTimestamp) {
            modalCreateMeeting.find(".whenDate").parent().parent().find(".errors").html("Ngày giờ phải lớn hơn hiện tại.");
            isValid = false;
        }
    }
    if (!meetingData.noteTm.trim()) {
        modalCreateMeeting.find(".noteTm").parent().find(".errors").html("Nhập ghi chú.");
        isValid = false;
    }

    if(modalCreateMeeting.find(".type").val() != ''){
        meetingData.type = 'deal';
    }else{
      if (!meetingData.assignTo) {
          modalCreateMeeting.find(".assignTo").parent().find(".errors").html("Chọn người phụ trách meeting.");
          isValid = false;
      }
    }

    meetingData.tCId = parseInt(modalCreateMeeting.find(".tCId").val());
    if (meetingData.tCId == -1) {
        modalCreateMeeting.find(".tCId").parent().find(".errors").html("Chọn trung tâm giao dịch.");
        isValid = false;
    }



    if (meetingData.tCId == 0) {
        meetingData.address = modalCreateMeeting.find(".address").val();
        if (meetingData.address.trim() == "") {
            modalCreateMeeting.find(".address").parent().find(".errors").html("Chọn địa chỉ");
            modalCreateMeeting.find('#lat').val();
            modalCreateMeeting.find('#long').val();
            isValid = false;
        } else if (modalCreateMeeting.find('#lat').val().trim() == "" || modalCreateMeeting.find('#long').val().trim() == "") {
            modalCreateMeeting.find(".address").parent().find(".errors").html("Địa chỉ không hợp lệ vui lòng chọn lại.");
            modalCreateMeeting.find(".address").val();
            meetingData.address = null;
            isValid = false;
        } else {
            meetingData.longitude = modalCreateMeeting.find('#long').val().trim();
            meetingData.latitude = modalCreateMeeting.find('#lat').val().trim();
        }
    }


    if (!isValid) {
        return false;
    }
    $("#isSpecialDeal").prop("checked", true);
    showPropzyLoading();

    // console.log(meetingData);return false;
    $.ajax({
        url: "/deal/update-meeting",
        type: "post",
        data: JSON.stringify(meetingData)
    }).done(function (response) {
        modalCreateMeeting.modal('hide');
        showPropzyAlert(response.message);
        if (response.result) {
            var intercom = Intercom.getInstance();
            // emit
            intercom.emit('reloadPage', '<?php echo !empty($need_active) ?  json_encode($need_active) : '' ?>');
            //window.location = "/deal/update/" + meetingData.dealId;
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

function saveMeeting(meetingData) {
    var val = [];
    modalCreateMeeting.find(".leadIds:checked").each(function(i){
      val[i] = $(this).val();
    });
    // console.log(val);return false;
    meetingData.leadIds = val;
    // alert('Vô đây nè');
    modalCreateMeeting.find(".errors").html("");
    var isValid = true;
    if (!meetingData.assignTo) {
        modalCreateMeeting.find(".assignTo").parent().find(".errors").html("Chọn người phụ trách meeting.");
        isValid = false;
    }
    if (meetingData.reminderDate == null) {
        modalCreateMeeting.find(".whenDate").parent().parent().find(".errors").html("Chọn ngày / giờ.");
        isValid = false;
    } else {
        var nowTimestamp = moment().unix() * 1000;
        if (meetingData.reminderDate <= nowTimestamp) {
            modalCreateMeeting.find(".whenDate").parent().parent().find(".errors").html("Ngày giờ phải lớn hơn hiện tại.");
            isValid = false;
        }
    }
    if (!meetingData.noteTm.trim()) {
        modalCreateMeeting.find(".noteTm").parent().find(".errors").html("Nhập ghi chú.");
        isValid = false;
    }
    meetingData.tCId = parseInt(modalCreateMeeting.find(".tCId").val());
    if (meetingData.tCId == -1) {
        modalCreateMeeting.find(".tCId").parent().find(".errors").html("Chọn trung tâm giao dịch.");
        isValid = false;
    }

    if (meetingData.tCId == 0) {
        meetingData.address = modalCreateMeeting.find(".address").val();
        if (meetingData.address.trim() == "") {
            modalCreateMeeting.find(".address").parent().find(".errors").html("Chọn địa chỉ");
            modalCreateMeeting.find('#lat').val();
            modalCreateMeeting.find('#long').val();
            isValid = false;
        } else if (modalCreateMeeting.find('#lat').val().trim() == "" || modalCreateMeeting.find('#long').val().trim() == "") {
            modalCreateMeeting.find(".address").parent().find(".errors").html("Địa chỉ không hợp lệ vui lòng chọn lại.");
            modalCreateMeeting.find(".address").val();
            meetingData.address = null;
            isValid = false;
        } else {
            meetingData.longitude = modalCreateMeeting.find('#long').val().trim();
            meetingData.latitude = modalCreateMeeting.find('#lat').val().trim();
        }
    }

    if (!isValid) {
        return false;
    }
    showPropzyLoading();
    $.ajax({
        url: "/deal/create-meeting",
        type: "post",
        data: JSON.stringify(meetingData)
    }).done(function (response) {
        // console.log(response);return false;
        modalCreateMeeting.modal('hide');
        $("#isSpecialDeal").prop("checked", response.result);
        showPropzyAlert(response.message);
        if (response.result) {
            var intercom = Intercom.getInstance();
            // emit
            intercom.emit('reloadPage', '<?php echo !empty($need_active) ?  json_encode($need_active) : '' ?>');
            //window.location = "/deal/update/" + meetingData.dealId;
            timer.submit({leadId: meetingData.leadId});
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
}
/*
 $(".btnCancelMeeting").on("click", function (event) {
 event.preventDefault();
 var meetingData = {
 "id": modalCreateMeeting.find(".meetingId").val(),
 "meetingStatus": {
 "statusId": 3
 }
 };
 $.ajax({
 url: "/deal/change-meeting-status",
 type: "post",
 data: JSON.stringify(meetingData)
 }).done(function (response) {
 modalCreateMeeting.modal('hide');
 $("#isSpecialDeal").prop("checked", response.result);
 showPropzyAlert(response.message);
 if (response.result) {
 //window.location = "/deal/update/" + meetingData.dealId;
 window.location.reload();
 }
 }).always(function () {
 hidePropzyLoading();
 });
 });
 */

$(".btnCancelMeeting").on("click", function (event) {
    // alert('meeting');return false;
    event.preventDefault();
    var meetingId = modalCreateMeeting.find(".meetingId").val();
    $.ajax({
        url: "/deal/delete-meeting/" + meetingId,
        type: "get"
    }).done(function (response) {
        modalCreateMeeting.modal('hide');
        $("#isSpecialDeal").prop("checked", response.result);
        showPropzyAlert(response.message);
        if (response.result) {
            var intercom = Intercom.getInstance();
            // emit
            intercom.emit('reloadPage', '<?php echo !empty($need_active) ?  json_encode($need_active) : '' ?>');
            intercom.emit('closeModalCancleMeeting',meetingId);
            //window.location = "/deal/update/" + meetingData.dealId;
            window.location.reload();
        }
    }).always(function () {
        hidePropzyLoading();
    });
});

$(document).ready(function () {
    $("#btnShowMeeting").on("click", function (event) {
        event.preventDefault();
        var meetingId = $(this).attr("data-meeting-id");
        showUpdateOrCreateMeetingForm(meetingId);
    });
    timer.init();
});
</script>
