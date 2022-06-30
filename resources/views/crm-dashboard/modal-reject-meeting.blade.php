<div id="modalRejectMeeting" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <form id="formCreateMeeting" method="post" >
                <input type="hidden" id="meetingId" name="meetingId" class="meetingId" value="" />
                <input type="hidden" id="taskId" name="taskId" class="taskId" value="" />
                <input type="hidden" id="defineId" name="defineId" class="defineId" value="" />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Vui lòng chọn lý do từ chối meeting</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <div class="reasons_wrapper"></div>
                            <div class="errors errors-reasonId" ></div>
                        </div>
                    </div>                   
                    <div class="form-group text-center">
                        <button class="btn btn-success btnSaveRejectMeeting">Reject</button>
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
<script>
    var ModalRejectMeeting = (function () {
        var modalRejectMeeting = $("#modalRejectMeeting");
        var taskId = null;
        var meetingId = null;
        var showRejectMeetingPopUp = function (taskId, meetingId) {
            showPropzyLoading();
            $.ajax({
                url: "/deal/meeting-detail/" + meetingId,
                type: "get"
            }).done(function (response) {
                $(".btnSaveRejectMeeting").on("click", function (event) {
                    event.preventDefault();
                    var reasonId = parseInt(modalRejectMeeting.find(".reasonId:checked").val());
                    var postData = {
                        "meetingId": meetingId,
                        "reasonId": reasonId,
                        "taskId": taskId
                    };
                    showPropzyLoading();
                    $.ajax({
                        url: "/crm-dashboard/reject-meeting",
                        type: "post",
                        data: JSON.stringify(postData)
                    }).done(function (response) {
                        var message = response.message;
                        if (response.result) {
                            window.location = "/";
                        }else{
                            if(response.data && response.data.dealId){
                                message += "<br />Xem deal: <a href='/deal/detail/"+response.data.dealId+"'></a>";
                            }
                        }
                        modalRejectMeeting.modal("hide");
                        showPropzyAlert(message);
                    }).always(function () {
                        hidePropzyLoading();
                    });

                });
                modalRejectMeeting.modal();
            }).always(function () {
                hidePropzyLoading();
            });
            return false;
        };

        var loadReason = function () {
            $.ajax({
                "url": "/common/get-meeting-reasons",
                "type": "get"
            }).done(function (response) {
                var html = "";
                for (var i = 0; i < response.data.length; i++) {
                    var item = response.data[i];
                    if (item.deleted) {
                        continue;
                    }
                    html += "<div><label ><input type='radio' name='reasonId' class='reasonId' value=" + item.reasonId + "> " + item.reasonName + "</label></div>";
                }
                modalRejectMeeting.find(".reasons_wrapper").html(html);
            }).always(function () {

            });
        };


        return {
            init: function (_taskId, _meetingId) {
                taskId = _taskId;
                meetingId = _meetingId;
                $(".btnRejectMeeting").unbind("click");
                $(".btnRejectMeeting").on("click", function (event) {
                    event.preventDefault();
                    showRejectMeetingPopUp(taskId, meetingId);
                });
                loadReason();
            }
        };
    })();
</script>